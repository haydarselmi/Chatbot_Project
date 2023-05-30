// window.onload = function() {
// 	const messagesList = document.getElementById('messages-list');
// 	const socketPort = document.getElementById('port');
// 	const messageInput = document.getElementById('message-input');
// 	const sendButton = document.getElementById('send-button');

// 	const socket = new WebSocket('ws://localhost:' + socketPort.innerHTML);
// 	socket.addEventListener('open', () => {
// 		socket.onmessage = ({ data }) => {
// 			console.log('message from server : ' + data);
// 			const messageElement = document.createElement('li');
// 			messageElement.innerText = data;
// 			messagesList.appendChild(messageElement);
// 		};

// 		sendButton.addEventListener('click', function() {
// 			socket.send(messageInput.value);
// 			const messageElement = document.createElement('li');
// 			messageElement.innerText = messageInput.value;
// 			messageElement.setAttribute('class', 'user-message');
// 			messagesList.appendChild(messageElement);
// 			messageInput.value = '';
// 		});
// 	});
// };
window.onload = function() {
	const messagesList = document.getElementById('messages-list');
	const socketPort = document.getElementById('port');
	const messageInput = document.getElementById('message-input');
	const sendButton = document.getElementById('send-button');

	const socket = new WebSocket('ws://localhost:' + socketPort.innerHTML);
	socket.addEventListener('open', () => {
		socket.onmessage = ({ data }) => {
			console.log('message from server : ' + data);
			const messageElement = document.createElement('li');
			messageElement.innerText = data;
			messageElement.setAttribute('class', 'message-item bot-message');
			messagesList.appendChild(messageElement);
		};

		sendButton.addEventListener('click', sendMessage);
		messageInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				sendMessage();
			}
		});
	});

	function sendMessage() {
		socket.send(messageInput.value);
		const messageElement = document.createElement('li');
		messageElement.innerText = messageInput.value;
		messageElement.setAttribute('class', 'message-item user-message');
		messagesList.appendChild(messageElement);
		messageInput.value = '';
	}
};

