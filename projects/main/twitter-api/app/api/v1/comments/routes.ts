import { Router } from 'express';

import * as controller from './controller.js';
import { auth, owner } from '../auth.js';

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

/**
 * /api/v1/comments POST        - CREATE
 * /api/v1/comments GET         - READ ALL
 * /api/v1/comments/:id GET     - READ ONE
 * /api/v1/comments/:id PUT     - UPDATE
 * /api/v1/comments/:id DELETE  - DELETE
 */

router.route('/').post(auth, controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, owner, controller.update)
  .patch(auth, owner, controller.update)
  .delete(auth, owner, controller.remove);
