import { AuthService } from './auth.service';
import { userService } from '../../users/(services)';
import { BcryptAdapter } from '../../(adapters)/bcrypt.adapter';
import * as validator from '../(validators)/userValidator';

export const authService = AuthService(userService, BcryptAdapter, validator);
