import express from 'express';

import * as controller from './controller.js';
import { auth } from '../auth.js';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.post('/', auth, controller.create);
