import Auth from '@/components/Auth';
import { AuthService } from './auth.service';
import { userService } from '../../users/(services)';
import { BcryptAdapter } from '../../(adapters)/bcrypt.adapter';

export const authService = AuthService(userService, BcryptAdapter);
