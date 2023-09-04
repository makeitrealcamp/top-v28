import { Router } from 'express';

import { router as tweets } from './tweets/routes.ts';
import { router as users } from './users/routes.ts';
import { router as comments } from './comments/routes.ts';

// eslint-disable-next-line new-cap
export const router = Router();

router.use('/tweets', tweets);
router.use('/users', users);
router.use('/comments', comments);
