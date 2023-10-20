import http from 'http';
import { Server } from 'socket.io';

import { config } from './app/config.js';
import { app } from './app/index.js';
import { connect } from './app/database.js';

const { port } = config;

// Create Web Server
const server = http.createServer(app);

// Connect to the database
connect();

// Create Socket Server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`⚡ User disconnected: ${socket.id}`);
  });

  socket.on('message', (payload) => {
    socket.broadcast.emit('message', payload);
  });
});

// Start the Web server
server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
