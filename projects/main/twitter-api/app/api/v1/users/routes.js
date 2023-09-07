import { Router } from 'express';

import * as controller from './controller.js';
import { auth, me, limit, activate } from '../auth.js';

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/users/signup POST
 * /api/v1/users/signin POST
 * /api/v1/users/:id GET     - READ ONE
 * /api/v1/users/:id PUT     - UPDATE
 * /api/v1/users/:id DELETE  - DELETE
 */

router.route('/signup').post(limit, controller.signup, controller.confirmation);
router.route('/signin').post(limit, controller.signin);
router.route('/confirmation').post(controller.confirmation);
router.route('/activate/:token').get(activate, controller.activate);

router.param('username', controller.username);

router
  .route('/:username')
  .get(auth, me, controller.read)
  .put(auth, me, controller.update)
  .patch(auth, me, controller.update)
  .delete(auth, me, controller.remove);
