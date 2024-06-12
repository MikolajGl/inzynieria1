const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const Message = require('C:\\Users\\Umbra\\Desktop\\main\\public\\db.js');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function formatTimestamp() {
    const now = new Date();
    return `${now.getDay()}:${now.getMonth()}:${now.getFullYear()}:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

io.on('connection', async (socket) => {
    let username;

    // Send all previous messages to the newly connected user
    try {
        const messages = await Message.find();
        messages.forEach((message) => {
            socket.emit('message', message);
        });
    } catch (err) {
        console.error('Error retrieving messages:', err);
    }

    // Handle user joining with a nickname
    socket.on('user', (data) => {
        username = data.username;
        const welcomeMessage = { username: 'System', message: `Welcome to the chat, ${username}!`, timestamp: formatTimestamp() };
        socket.emit('message', welcomeMessage);

        const joinMessage = { username: 'System', message: `${username} has joined the chat`, timestamp: formatTimestamp() };
        socket.broadcast.emit('message', joinMessage);
    });

    // Handle chat messages
    socket.on('chatMessage', (message) => {
        const chatMessage = { username, message, timestamp: formatTimestamp() };
        io.emit('message', chatMessage);

        // Save the chat message to the database
        const msg = new Message(chatMessage);
        msg.save().catch((err) => console.error('Error saving message:', err));
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        if (username) {
            const leaveMessage = { username: 'System', message: `${username} has left the chat`, timestamp: formatTimestamp() };
            io.emit('message', leaveMessage);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});