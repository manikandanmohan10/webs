# Copyright (c) 2024, manikandan.mohan@softsuave.com and contributors
# For license information, please see license.txt

import frappe
from frappe.utils.data import validate_duration_format
from frappe.model.document import Document


class CustomDoctype(Document):
	def validate(self):
		self.meta.fields[-1].hidden = 1
		frappe.msgprint("Hey there")

	def after_save(self):
		frappe.msgprint(self.name + "Created successfully")
