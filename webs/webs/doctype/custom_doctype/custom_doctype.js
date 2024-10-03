// Copyright (c) 2024, manikandan.mohan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Custom Doctype", {
	after_save(frm) {
        frm.toggle_display("ratingg", false)
        frm.toggle_display("table_multiselect_udvz", false)
        frm.toggle_display("phone", false)
        // frm.set_df_property('school_name', 'read_only', 1)
	},
});

     
// Child Table
frappe.ui.form.on('Custom Doctype Details', { 
    user_details_add: function(frm, cdt, cdn){
        var child = locals[cdt][cdn]
        frm.set_df_property('user_details', 'hidden', 1, frm.docname, 'age', child.name)
    }
})

frappe.listview_settings['Custom Doctype'] = {
    refresh: function(listview) {
       // Hide name filter from Listview
        $("div[data-fieldname = name]").hide();
    },
    // Hide name from Listview
    hide_name_column: true
};