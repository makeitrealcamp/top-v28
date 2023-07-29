import { Router } from 'express';

import * as controller from './controller.js';
import { router as commentsRouter } from '../comments/routes.js';
// import { all as commentsAll } from '../comments/controller.js';

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/tweets POST        - CREATE
 * /api/v1/tweets GET         - READ ALL
 * /api/v1/tweets/:id GET     - READ ONE
 * /api/v1/tweets/:id PUT     - UPDATE
 * /api/v1/tweets/:id DELETE  - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);

router.use('/:tweetId/comments', commentsRouter);
// router.route('/:tweetId/comments').get(commentsAll);