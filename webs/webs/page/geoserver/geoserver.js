frappe.pages['geoserver'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'GeoServer',
		single_column: true
	});

	$(frappe.render_template("geoserver", {})).appendTo(page.body)

	// const mywms = L.tileLayer.wms("http://localhost:8080/geoserver/ERPNext/wms", {
	// 	layers: 'ERPNext:country1',
	// 	format: 'image/png',
	// 	transparent: true,
	// 	version: '1.1.0',
	// 	attribution: "country layer"
	// });
	// mywms.addTo(map);

	// var map = L.map("map").setView([38.45, 70.6], 6);
	// var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	// attribution:
	// 	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);
}