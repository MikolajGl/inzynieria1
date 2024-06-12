const mongoose = require('mongoose');

const db = "mongodb://localhost:27017";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection;
conSuccess.once('open', () => {
    console.log('Database connected:', db);
});

conSuccess.on('error', (err) => {
    console.error('Connection error:', err);
});

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;