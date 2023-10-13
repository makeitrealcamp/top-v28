import express from 'express';

import { router as users } from './users/routes.js';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/users', users);
