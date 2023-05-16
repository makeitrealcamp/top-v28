const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const songs = [];

/**
 * C(reate), R(ead), U(pdate) and D(elete)
 * GET, POST, PUT, DELETE
 *
 * ENDPOINTS
 *
 * POST    /songs      CREATE
 * GET     /songs      READ (ALL)
 * GET     /songs/:id  READ (ONE)
 * PUT     /songs/:id  UPDATE
 * DELETE  /songs/:id  DELETE
 */

app.use(express.json());

// CREATE
app.post('/songs', async (req, res, next) => {
  // body
  const { body = {} } = req;

  const song = {
    ...body,
    id: uuidv4(),
    // title: body.title,
    // author: body.author,
  };

  songs.push(song);

  res.status(201);
  res.json(song);
});

// READ ALL
app.get('/songs', (req, res, next) => {
  res.json(songs);
});

// READ ONE
app.get('/songs/:id', (req, res, next) => {
  // params
  const { params = {} } = req;
  const { id = '' } = params;

  const song = songs.find(function (element) {
    return id === element.id;
  });

  if (song) {
    res.json(song);
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

// UPDATE
app.put('/songs/:id', (req, res, next) => {
  // params
  const { params = {}, body = {} } = req;
  const { id = '' } = params;

  const index = songs.findIndex(function (element) {
    return id === element.id;
  });

  if (index !== -1) {
    const song = {
      ...songs[index],
      ...body,
    };

    songs[index] = song;

    res.json(song);
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

// DELETE
app.delete('/songs/:id', (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  const index = songs.findIndex(function (element) {
    return id === element.id;
  });

  if (index !== -1) {
    songs.splice(index, 1);
    res.status(204);
    res.end();
  } else {
    next({
      statusCode: 404,
      message: `Song with ${id}, Not Found`,
    });
  }
});

app.use((req, res, next) => {
  next({
    statusCode: 404,
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
