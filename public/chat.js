const socket = io();
const messageContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const username = new URLSearchParams(window.location.search).get('username');

// Listen for incoming messages
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
});

// Emit the username to the server when a user connects
socket.emit('user', { username });

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim(); // Trim removes leading and trailing whitespace
    if (message !== "") {
        // Send the message to the server
        socket.emit('chatMessage', message);
        messageInput.value = ''; // Clear input after sending
    }
}

// Event listener for button click
sendButton.addEventListener('click', sendMessage);

// Allow pressing Enter key to send message
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (if any)
        sendMessage();
    }
});

// Function to display a message in the chat
function outputMessage({ username, message, timestamp }) {
    const div = document.createElement('div');
    div.classList.add('message');

    div.innerHTML = `<p><strong>${username}</strong> <span>${timestamp}</span>: ${message}</p>`;

    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the latest message
}