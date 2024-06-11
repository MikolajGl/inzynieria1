const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

let users = [];
let messages = [];

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

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});