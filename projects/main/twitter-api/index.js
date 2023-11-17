import http from 'http';

import { configuration } from './app/config.js';
import { app } from './app/index.js';
import { connectMongoose } from './app/database/index.js';


const { port } = configuration.server;

// Connect to database
connectMongoose();

// Create Web Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
