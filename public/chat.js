const socket = io();
const messageContainer = document.getElementById('messages');
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim(); // Trim removes leading and trailing whitespace
    if (message !== "") {
        // Logic to send the message
        socket.emit("chatMessage", message); // Emitting "chatMessage" event
        messageInput.value = ""; // Clear input after sending
    }
}

// Event listener for button click
sendButton.addEventListener("click", sendMessage);

// Allow pressing Enter key to send message
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message}</p>`;
    messageContainer.appendChild(div);
}