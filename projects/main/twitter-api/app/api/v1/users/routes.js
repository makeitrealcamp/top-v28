import { Router } from 'express';

import * as controller from './controller.js';
import { auth } from '../auth.js';
import { checkoutSession, validateCheckoutSession } from '../stripe.js';

// eslint-disable-next-line new-cap
export const router = Router();

router.route('/blue').post(auth, checkoutSession);
router.route('/blue/validate/:session_id').get(auth, validateCheckoutSession);

router.route('/account').put(auth, controller.account);
