// HTML elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to display a message in the chat
function displayMessage(message, isUser = false) {
	const messageDiv = document.createElement('div');
	messageDiv.className = isUser ? 'user-message' : 'server-message';

	// If the message is from the API and has a rawMessage field, display it
	if (!isUser && message.rawMessage) {
		messageDiv.textContent = message.rawMessage;
	} else {
		messageDiv.textContent = message;
	}

	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send a message to API
function sendMessage() {
	const message = messageInput.value;
	console.log('message >', message);
	if (message.trim() === '') {
		return;
	}

	// Display the user's message in the chat
	displayMessage(message, true);

	// Create a request body with the user's input
	const requestBody = {
		type: 'message',
		info: {
			psid: '2_cac53eb7-76d2-4b42-a4c4-8b748812e685',
			sender: 'user',
			tenantId: 'cac53eb7-76d2-4b42-a4c4-8b748812e685',
			platformName: 'web',
		},
		message: {
			id: '2',
			type: 'text',
			payload: {
				text: message, // Use the user's input as the message text
			},
		},
	};

	// Send the message to the API
	fetch(
		'https://channel-connector.orimon.ai/orimon/v1/conversation/api/message',
		{
			...requestOptions,
			body: JSON.stringify(requestBody),
		}
	)
		.then((response) => response.json())
		.then((result) => {
			// Check if the API response contains a "rawMessage" field
			if (result.data && result.data.rawMessage) {
				// Display the "rawMessage" from the API response
				displayMessage(result.data.rawMessage, false);
				console.log(result);
			} else {
				console.log('No rawMessage found in the API response.');
			}
		})
		// .then((result) => console.log(result))
		.catch((error) => console.log('error', error));

	// Clear input field
	messageInput.value = '';
}

// Event listener for sending a message
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		sendMessage();
	}
});

// Request endpoint
const endpoint =
	'https://channel-connector.orimon.ai/orimon/v1/conversation/api/message';

// API
const myHeaders = new Headers();
myHeaders.append(
	'authorization',
	'apiKey c2c876621d95cffb096571afb759ce2a95d38cfb'
);
myHeaders.append('Content-Type', 'application/json');

// // Body JSON
// const raw = JSON.stringify({
// 	type: 'message',
// 	info: {
// 		psid: '2_cac53eb7-76d2-4b42-a4c4-8b748812e685',
// 		sender: 'user',
// 		tenantId: 'cac53eb7-76d2-4b42-a4c4-8b748812e685',
// 		platformName: 'web',
// 	},
// 	message: {
// 		id: '2',
// 		type: 'text',
// 		payload: {
// 			text: 'what is weed',
// 		},
// 	},
// });

// Request options
const requestOptions = {
	method: 'POST',
	headers: myHeaders,
	// body: raw,
	redirect: 'follow',
};
