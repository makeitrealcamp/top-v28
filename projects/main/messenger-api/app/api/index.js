import express from 'express';

import { router as users } from './users/routes.js';
import { router as messages } from './messages/routes.js';
import { router as conversations } from './conversations/routes.js';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/users', users);
router.use('/messages', messages);
router.use('/conversations', conversations);
