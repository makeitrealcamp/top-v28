import http from 'http';

import { configuration } from './app/config.js';
import { app } from './app/index.js';

const { port } = configuration.server;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
