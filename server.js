const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function formatTimestamp() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

io.on('connection', (socket) => {
    let username;

    // Handle user joining with a nickname
    socket.on('user', (data) => {
        username = data.username;
        socket.emit('message', { username: 'System', message: `Welcome to the chat, ${username}!`, timestamp: formatTimestamp() });
        socket.broadcast.emit('message', { username: 'System', message: `${username} has joined the chat`, timestamp: formatTimestamp() });
    });

    // Handle chat messages
    socket.on('chatMessage', (message) => {
        io.emit('message', { username, message, timestamp: formatTimestamp() });
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        if (username) {
            io.emit('message', { username: 'System', message: `${username} has left the chat`, timestamp: formatTimestamp() });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});