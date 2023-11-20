import { Router } from 'express';

import * as controller from './controller.js';
import { auth, owner } from '../auth.js';
import { upload } from '../upload.js';

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/tweets POST        - CREATE
 * /api/v1/tweets GET         - READ ALL
 * /api/v1/tweets/:id GET     - READ ONE
 * /api/v1/tweets/:id PUT     - UPDATE
 * /api/v1/tweets/:id DELETE  - DELETE
 */

router
  .route('/')
  .post(auth, upload.single('photo'), controller.create)
  .get(controller.all);

router
  .route('/:id')
  .get(auth, controller.id, controller.read)
  .put(auth, controller.id, owner, upload.single('photo'), controller.update)
  .patch(auth, controller.id, owner, upload.single('photo'), controller.update)
  .delete(auth, controller.id, owner, controller.remove);

router.route('/:id/like').patch(auth, controller.id, controller.like);
router.route('/:id/comments').get(auth, controller.id, controller.all);
