const socket = io();
const messageContainer = document.getElementById('messages')
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

socket.on('message',message=>{
    console.log(message);
    outputMessage(message)
}
);
    // Function to send a message
    function sendMessage() {
        const message = messageInput.value // Trim removes leading and trailing whitespace
        if (message !== "") {
            // Your logic to send the message goes here
            socket.emit("chat-message", message);
            messageInput.value = ""; // Clear input after sending
        }
    }

    // Event listener for button click
    sendButton.addEventListener("click", sendMessage);

    // Optional: Allow pressing Enter key to send message
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p>${message}</p>`;
        document.querySelector('.messages').appendChild(div);
    }