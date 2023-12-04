import { User } from '../../users/(domain)/entities/user.entity';
import { HashServiceType } from '../../(adapters)/bcrypt.adapter';
import { UserServiceType } from '../../users/(services)/types';
import { BadRequestError } from '@/libs/errors';


export const AuthService = (
  userService: UserServiceType,
  hashService: HashServiceType,
  validator: any
) => {
  const registerUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | null> => {
    const { error, data } = validator.createUserValidator({
      email,
      password,
    });
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user = await userService.getUserByEmail(email);

    if (user !== null) {
      throw new BadRequestError('User already exists');
    }

    const hashedPassword = await hashService.hash(password);

    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
    });

    return newUser;
  };
  const loginUser = async ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }): Promise<User> => {
    if (!email || !password) {
      throw new BadRequestError('Invalid credentials');
    }

    const user = await userService.getUserByEmail(email);

    if (user === null) {
      throw new BadRequestError('User not found');
    }
    const isMatch = await hashService.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    return user;
  };
  return {
    registerUser,
    loginUser,
  };
};
