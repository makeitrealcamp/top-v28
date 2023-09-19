import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import swaggerUI from 'swagger-ui-express';
import multer from 'multer';

import { router as api } from './api/v1/index.js';
import { swaggerDefinition } from './api/v1/docs.js';
import { logger, HTTPlogger } from './logger.js';
import { payments } from './api/v1/stripe.js';

export const app = express();

// Reduce Fingerprinting
app.disable('x-powered-by');

// Request ID
app.use((req, res, next) => {
  const id = uuidv4();
  req.id = id;
  res.setHeader('X-Request-Id', id);

  next();
});

// Log HTTP Requests
app.use(HTTPlogger);

// CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

// Use Helmet!
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Parse JSON body
app.use(express.json());

// Ednpoints
app.use('/api', api);
app.use('/api/v1', api);

// Payments
app.use('/api/v1/payments', payments);

// Docs
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

// Uploads
app.use('/api/uploads', express.static('uploads'));

// No route found handler
app.use((req, res, next) => {
  next({
    message: 'Route Not Found',
    status: 404,
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message = '', error } = err;
  let { status = 500 } = err;

  const data = {
    message,
    status,
    error,
    traceId: req.id,
    body: req.body,
    headers: req.headers,
  };

  // Error Multer
  if (err instanceof multer.MulterError) {
    status = 400;
  }

  if (status < 500) {
    logger.warn(data);
  } else {
    logger.error(data);
  }

  res.status(status);
  res.json({
    error: {
      message,
      status,
      error,
    },
  });
});
