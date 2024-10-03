console.log("FRAPPE")

frappe.ui.toolbar.Toolbar.prototype.make = function() {
    // Call the original toolbar make method

	
	$('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/assets/webs/css/query_report.css' // Replace with the path to your CSS file
    }).appendTo('head');

	$('<script/>', {
        src: '/assets/webs/js/suavechatt.js' // Replace with the path to your JS file
    }).appendTo('body');

    $('.navbar > .container').append(`
		
            <a id="toggle-icon-1" class="custom-nav-link" href="#">
                <div style="margin-left: 10px; background-color: #007bff; border-radius: 50%; padding: 14px; color: white;"></div>
            </a>
        
	`);

	$('body').append(`
        <div id="custom-page" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 9999;">
			<div class="main-container" style="background-color: white; width: 70%; height: 80%; margin: 5% auto; padding: 20px;">
    
			<div class="sidebar" id="sidebar">
				<div class="sidebar-header">SuaveChat</div>
				<div class="chat-types">
					<button type="button" id="newChatBtn-gemini-ai-sql" class="btn btn-secondary btn-sm newchat-button">Gemini AI (SQL Generator)</button>
					<button type="button" id="newChatBtn-gemini-ai-casual" class="btn btn-secondary btn-sm newchat-button">Gemini AI (Casual Conversation)</button>
				</div>
			</div>
			

			<div class="chat-container">
				<div class="chat-title">
					<div>
						<span class="option-icon"><img src="/files/icons8-option-96.png" alt="" width="25px" height="22px"></span>
						SQL Query Generator
					</div>
					<!-- <div class="close-icon">
						x
					</div> -->
				</div>
				<div class="chat-body" id="chatBody">
					<!-- Chat messages will appear here -->
					
				</div>
				<div class="chat-footer">
					<input type="text" id="userInput" class="chat-input" placeholder="Type your message...">
					<button id="sendBtn" class="send-btn">Send</button>
					<div class="spinner-border" style="display: none; margin-top: 4px; background-color: #46535f00;" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		</div>
        </div>
    `);

    // Toggle the visibility of the custom page on icon click
    $('#toggle-icon-1').on('click', function(e) {
        e.preventDefault();
        $('#custom-page').toggle();
    });

	// $(document).on('click', function(e) {
	// 	// Check if the clicked target is outside the custom page and the toggle icon
	// 	if (!$(e.target).closest('#custom-page, #toggle-icon-1').length) {
	// 		$('#custom-page').hide();
	// 	}
	// });	
	
}