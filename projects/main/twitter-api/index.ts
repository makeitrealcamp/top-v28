import http from 'http';

import { configuration } from './app/config.ts';
import { app } from './app/index.ts';
import { connect } from './app/database.ts';

const { port } = configuration.server;

// Connect to database
connect();

// Create Web Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
