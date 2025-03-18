require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('user_join', (username) => {
    users.set(socket.id, username);
    io.emit('user_list', Array.from(users.values()));
    socket.broadcast.emit('user_connected', username);
  });

  socket.on('send_message', (message) => {
    const username = users.get(socket.id);
    io.emit('receive_message', {
      text: message,
      sender: username,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('user_list', Array.from(users.values()));
    if (username) {
      socket.broadcast.emit('user_disconnected', username);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});