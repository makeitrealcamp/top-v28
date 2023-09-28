import { Router } from 'express';

import { router as tweets } from './tweets/routes.js';
import { router as users } from './users/routes.js';

// eslint-disable-next-line new-cap
export const router = Router();

router.use('/tweets', tweets);
router.use('/users', users);
