import { userPrismaDataSource } from '../(infrastructure)/users.prisma';
import { UserService } from './user.service';


export const userService = UserService(userPrismaDataSource);
