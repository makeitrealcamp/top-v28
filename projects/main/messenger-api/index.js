import http from 'http';

import { config } from './app/config.js';
import { app } from './app/index.js';

const { port } = config;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
