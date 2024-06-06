frappe.ui.form.on("Service Request", {

    before_load:function(frm) {
        removeColumns(frm)   
    },
});

function removeColumns(frm) {
    frappe.call({
        method: "webs.webs.doctype.service_request.service_request.show_or_hide_fields",
        args: {
            doc: frm.doc
        },
        callback: function(r) {
            let res = r.message
            for (let i in res){
                var df=frappe.meta.get_docfield("Service Details", res[i],frm.doc.name);
                df.hidden=1;
            }
            
        }
    });   
}