import http from 'http';

import { config } from './app/config.js';
import { app } from './app/index.js';
import { connect } from './app/database.js';

const { port } = config;

const server = http.createServer(app);

// Connect to the database
connect();

// Start the Web server
server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
