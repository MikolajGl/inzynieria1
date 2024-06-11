const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

let users = [];
let messages = [];

const PORT = process.env.PORT || 3000;

app.post('/login', (req, res) => {
    const { username } = req.body;
    if (users.includes(username)) {
        res.json({ success: true });
    } else {
        users.push(username);
        res.json({ success: true });
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Wyślij historię wiadomości po połączeniu
    socket.emit('history', messages);

    // Obsługa nowej wiadomości
    socket.on('message', (data) => {
        messages.push(data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});