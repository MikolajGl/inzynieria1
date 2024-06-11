const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const formatMessage = require('C:\\Users\\Umbra\\Desktop\\main\\server.js');
const io = socketIo(server);



const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('new user')
    socket.emit('message', 'Hello from client!');
    socket.broadcast.emit('message','a user has join a chat');

    socket.on('disconnect',() => {
        io.emit('message','A user has left a chat');
    })
    socket.on('chat-message', message => {
        io.emit('message', message);
    });



});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});