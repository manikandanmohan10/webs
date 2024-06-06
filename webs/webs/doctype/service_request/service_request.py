# Copyright (c) 2024, manikandan.mohan@softsuave.com and contributors
# For license information, please see license.txt
import json
import frappe
from frappe.model.document import Document
from frappe.website.website_generator import WebsiteGenerator
from webs.webs.constant import hidden_fields

@frappe.whitelist()
def get_service_request_data():
	service_request = get_name_of_doc()

	service = [{
    'description': s.description or '',
    'price': s.price or '',
    'quantity': s.quantity or '',
	'total': s.total or '',
	} for s in service_request.service_details]
	return {
		"customer_name": service_request.customer_name or '',
		"requested_date": service_request.requested_date or '',
		"status": service_request.status or '',
  		"service_details": service
	}

def get_name_of_doc():
    referrer_url = frappe.request.referrer
    parts = referrer_url.split('/')
    name = parts[-1]
    return frappe.get_doc("Service Request", name)

def get_hidden_fields():
	''' hidden_fields return as a list'''
	return hidden_fields 

@frappe.whitelist()
def show_or_hide_fields(doc = '', web_page = False):
	
	if not doc:
		doc = get_name_of_doc()
		status = doc.status
	else:
		doc = json.loads(doc)
		status = doc['status']
	if status == 'Approved' and web_page:
		return get_hidden_fields()
	elif status == 'Rejected' and not web_page:
		return get_hidden_fields()
	
class ServiceRequest(Document):
	def on_update(self):
		self.route = '/sr/'+ self.name
		frappe.db.set_value('Service Request', self.name, 'route', '/sr/'+ self.name)



