import http from 'http';
import { Server } from 'socket.io';

import { config } from './app/config.js';
import { app } from './app/index.js';
import { connect } from './app/database.js';
import client, { connect as cacheConnect } from './app/cache.js';

const { port } = config;

// Create Web Server
const server = http.createServer(app);

// Connect to the database
connect();

// Connect REDIS Client
cacheConnect();

// Create Socket Server
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
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

  socket.on('online', async (user) => {
    console.log(`⚡ User online: ${user.id}`);
    await client.hSet('users', `user-${user.id}`, user.id);

    socket.broadcast.emit('online', user);
  });

  socket.on('offline', async (user) => {
    await client.hDel('users', `user-${user.id}`);

    socket.broadcast.emit('offline', user);
  });
});

// Start the Web server
server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
