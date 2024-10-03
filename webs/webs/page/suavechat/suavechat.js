frappe.pages['suavechat'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'SuaveChat',
		single_column: true
	});

	$(frappe.render_template("suavechat", {})).appendTo(page.body)

	// page.remove_title()

	$(document).ready(function() {
		var selectedText = 'SQL';
		function appendMessage(sender, message) {
			const messageElement = `
				<div class="message ${sender}">
					<div class="message-content">${message}</div>
				</div>
			`;
			$('#chatBody').append(messageElement);
			$('#chatBody').scrollTop($('#chatBody')[0].scrollHeight);
		}

		let isProcessing = false;

		$('#sendBtn').on('click', function() {
			document.querySelector('.spinner-border').style.display = 'block';
			document.querySelector('.send-btn').style.display = 'none';
			isProcessing = true;

			const userInput = $('#userInput').val().trim();
			if (userInput) {
				appendMessage('user', userInput);
				$('#userInput').val('');

				setTimeout(() => {
					frappe.call({
						args: {user_input: userInput, selected_type: selectedText},
						method: "webs.webs.utils.langchain_api.get_langchain_response",
						callback: function(res){
							appendMessage('bot', res.message);

							document.querySelector('.spinner-border').style.display = 'none';
							document.querySelector('.send-btn').style.display = 'block';

							isProcessing = false;
						}
					})
				}, 0);
			}
		});

		$('#userInput').on('keypress', function(e) {
			if(isProcessing && e.which == 13){
				e.preventDefault();
			}
			else if (e.which == 13) {
				$('#sendBtn').click();
			}
		});

		// let isProcessing = false;  // Flag to track spinner status

		// $('#sendBtn').on('click', function() {
		// 	// Set flag to true and show spinner, hide button
		// 	isProcessing = true;
		// 	document.querySelector('.spinner-border').style.display = 'block';
		// 	document.querySelector('.send-btn').style.display = 'none';
			
		// 	const userInput = $('#userInput').val().trim();
		// 	if (userInput) {
		// 		appendMessage('user', userInput);
		// 		$('#userInput').val('');

		// 		// Disable enter key while processing
		// 		$(document).on('keypress', function(event) {
		// 			if (event.which === 13) {
		// 				event.preventDefault();  // Block Enter key
		// 			}
		// 		});

		// 		// Simulate bot response
		// 		setTimeout(() => {
		// 			frappe.call({
		// 				args: { user_input: userInput, selected_type: selectedText },
		// 				method: "webs.webs.utils.langchain_api.get_langchain_response",
		// 				callback: function(res){
		// 					appendMessage('bot', res.message);

		// 					// Hide spinner, show button, and reset flag
		// 					document.querySelector('.spinner-border').style.display = 'none';
		// 					document.querySelector('.send-btn').style.display = 'block';
		// 					isProcessing = false;

		// 					// Re-enable Enter key after processing
		// 					// $(document).off('keypress');  // Remove the event listener
		// 				}
		// 			});
		// 		}, 0);
		// 	}
		// });

		// // Optional: Also block Enter key press when user focuses on input and spinner is active
		// $('#userInput').on('input', function(event) {
		// 	if (isProcessing && event.which === 13) {
		// 		event.preventDefault();  // Block Enter key
		// 	}
		// });

		$('.option-icon').on('click', function() {
			alert("HEY")
			document.querySelector('.sidebar').style.removeProperty('display');
		});

		$('#newChatBtn-sql').on('click', function() {
			$('#chatBody').empty();
			selectedText = $('#newChatBtn-sql').text()
			$('.chat-title').text(selectedText)
		});

		$('#newChatBtn-gemini-ai-sql').on('click', function() {
			$('#chatBody').empty();
			selectedText = $('#newChatBtn-gemini-ai-sql').text()
			$('.chat-title').text(selectedText)
		});

		$('#newChatBtn-gemini-ai-casual').on('click', function() {
			$('#chatBody').empty();
			selectedText = $('#newChatBtn-gemini-ai-casual').text()
			$('.chat-title').text(selectedText)
		});
	});
}
