import os
import frappe
import socket
import markdown
import logging

from sqlalchemy import create_engine

from langchain.sql_database import SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from langchain.chains.sql_database.query import create_sql_query_chain
from langchain_google_genai import GoogleGenerativeAI


logfile = "output.log"
logging.basicConfig(
    filename=logfile,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


# GEMINI API ENDPOINT
GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/tunedModels/gemini15flash001tuningantonysep26-ssgnw0:generateContent?key=AIzaSyC8Bq5TbNlGdfJEpmf-BNt8dJ-Oz7bxDqw"

# GEMINI API KEY
GEMINI_API_KEY = "AIzaSyC8Bq5TbNlGdfJEpmf-BNt8dJ-Oz7bxDqw"

os.environ['GOOGLE_API_KEY'] = GEMINI_API_KEY


class LangChainLLM:
    def __init__(self):
        self.logged_in_user = frappe.session.user
        self.roles_list = frappe.get_roles(self.logged_in_user)
        self.connection_string = self._create_connection_string()
        self.required_tables = [
            "tabCompany"
        ]
        self.gemini_ai = self._initialize_gemini_ai(GEMINI_ENDPOINT)

    def _initialize_gemini_ai(self, URL):
        return GoogleGenerativeAI(
            model="tunedModels/gemini15flash001tuningantonysep26-ssgnw0",
            google_api_key=GEMINI_API_KEY
        )

    def _to_markdown(self, text):
        markdown_html = markdown.markdown(text, extensions=['markdown.extensions.tables'])

        return markdown_html
    
    def _get_db_user(self):
        roles_list = frappe.get_roles(frappe.session.user)
        if 'CEO' in roles_list or frappe.session.user == 'Administrator':
            return 'admin_user'
        elif 'Accounts User' in roles_list or 'Accounts Manager' in roles_list:
            return 'accounts_user'
        elif 'HR User' in roles_list or 'HR Manager' in roles_list:
            return 'hr_user'
        else:
            return 'employee_user'

    def _create_connection_string(self):
        # db_user = self._get_db_user()
        db_user = "root"
        host = socket.gethostbyname(frappe.conf.db_host)
        port = frappe.conf.db_port
        user = db_user
        password = "123"
        database = frappe.conf.db_name
        return f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"
    
    def _initialize_sql_engine(self):
        engine = create_engine(self.connection_string)
        return engine

    def _db_connect(self):
        engine = self._initialize_sql_engine()
        db = SQLDatabase(engine=engine)
        return db

    def _get_ignore_tables(self, db):
        all_tables = db.get_usable_table_names()
        return [table for table in all_tables if table not in self.required_tables]

    def _db_connect_filtered(self):
        db = self._db_connect()
        ignore_tables = self._get_ignore_tables(db)
        engine = self._initialize_sql_engine()
        filtered_db = SQLDatabase(engine=engine, ignore_tables=ignore_tables)
        return filtered_db

    def get_connected_chain(self):
        db = self._db_connect_filtered()
        execute_query = QuerySQLDataBaseTool(db=db)
        write_query = create_sql_query_chain(
            llm=self.gemini_ai,
            db=db
        )
        chain = write_query | execute_query
        return chain

    def execute_sql_chain_with_response(self, user_input):
        prompt_ = user_input + "Do Not add any additional condition to the SQL query"
        chain = self.get_connected_chain()
        response = chain.invoke({"question": prompt_})
        
        if 'denied' in response:
            return "Access Denied: You do not have the necessary permissions to perform this action. Please contact your administrator for assistance.", False

        return response
        
    def gemini_api_response(self, user_input):
        response = self.execute_sql_chain_with_response(user_input)

        updated_user_input = f"""
        This is the question `{user_input}` and this is the response `{response}`. 
        Now convert this into human readable format and Give me the response in markdown format.

        -- Additional Information
        Provide concise answers with no additional information
        And Do not give any hallucinated response
        If the [response] is empty or null or Not Available. Just give the response as Not available or No data
        """
        
        llm_response = self.gemini_ai.invoke(updated_user_input)

        return self._to_markdown(llm_response)
    
    def gemini_api_casual_response(self, user_input):
        response = self.gemini_ai.invoke(user_input)
        return self._to_markdown(response)

@frappe.whitelist()
def get_langchain_response(user_input, selected_type):
    try:
        langchain = LangChainLLM()
        if 'casual' in selected_type.lower():
            response = langchain.gemini_api_casual_response(user_input)
        elif 'sql' in selected_type.lower():
            response = langchain.gemini_api_response(user_input)
        return response

    except Exception as e:
        return str(e)

