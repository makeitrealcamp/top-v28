import { Router } from 'express';

import * as controller from './controller.js';
import { auth, me, limit } from '../auth.js';
import { upload } from '../upload.js';

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/users/signup POST
 * /api/v1/users/signin POST
 * /api/v1/users/:id GET     - READ ONE
 * /api/v1/users/:id PUT     - UPDATE
 * /api/v1/users/:id DELETE  - DELETE
 */

router.route('/signup').post(limit, upload.single('photo'), controller.signup);
router.route('/signin').post(limit, controller.signin);

router.param('username', controller.username);

router
  .route('/:username')
  .get(auth, me, controller.read)
  .put(auth, me, upload.single('photo'), controller.update)
  .patch(auth, me, upload.single('photo'), controller.update)
  .delete(auth, me, controller.remove);
