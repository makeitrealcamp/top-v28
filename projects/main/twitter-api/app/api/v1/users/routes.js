import { Router } from 'express';

import * as controller from './controller.js';

// eslint-disable-next-line new-cap
export const router = Router();

/**
 * /api/v1/users/signup POST
 * /api/v1/users/signin POST
 * /api/v1/users/:id GET     - READ ONE
 * /api/v1/users/:id PUT     - UPDATE
 * /api/v1/users/:id DELETE  - DELETE
 */

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.remove);
