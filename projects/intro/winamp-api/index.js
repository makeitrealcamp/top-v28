const express = require('express');
const app = express();
const port = 3000;

/**
 * C(reate), R(ead), U(pdate) and D(elete)
 * GET, POST, PUT, DELETE
 *
 * POST    /songs      CREATE
 * GET     /songs      READ (ALL)
 * GET     /songs/:id  READ (ONE)
 * PUT     /songs/:id  UPDATE
 * DELETE  /songs/:id  DELETE
 */

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.use((req, res, next) => {
  next({
    statusCode: 400,
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Error' } = err;

  console.log(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
