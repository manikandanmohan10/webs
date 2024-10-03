(() => {
  // ../webs/webs/public/js/query_report.js
  frappe.ui.form.on("Report", {
    onload_post_render: function() {
      if (typeof frappe.views.QueryReport !== "undefined") {
        frappe.views.QueryReport = frappe.views.QueryReport.extend({
          refresh: function() {
            console.log("Custom Refresh Logic");
            this._super();
          }
        });
      } else {
        console.error("QueryReport is still undefined.");
      }
    }
  });
})();
//# sourceMappingURL=report.bundle.XFUDTVXD.js.map
