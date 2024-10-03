(() => {
  // ../webs/webs/public/js/query_report.js
  frappe.provide("frappe.widget.utils");
  frappe.provide("frappe.views");
  frappe.provide("frappe.query_reports");
  frappe.standard_pages["query-report"] = function() {
    var wrapper = frappe.container.add_page("query-report");
    frappe.ui.make_app_page({
      parent: wrapper,
      title: __("Query Report"),
      single_column: true
    });
    frappe.query_report = new frappe.views.QueryReport({
      parent: wrapper
    });
    $(wrapper).bind("show", function() {
      frappe.query_report.show();
    });
  };
  frappe.require("/assets/frappe/js/frappe/views/reports/query_report.js", () => {
    console.log("Inside the require function");
  });
})();
//# sourceMappingURL=report_.bundle.43GIMWDS.js.map
