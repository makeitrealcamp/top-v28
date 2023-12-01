import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '../../users/(domain)/entities/user.entity';
import { HashServiceType } from '../../(adapters)/bcrypt.adapter';
import { UserServiceType } from '../../users/(services)/types';
import { BadRequestError } from '@/libs/errors';

const registerUserSchema = z.object({
  email: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid email'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});

// export default async function registerUser(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { email, password } = registerUserSchema.parse(req.body);
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (user !== null) {
//     return res.send({ user: null, message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   return res.send({ user: newUser, message: 'User created successfully' });
// }

export const AuthService = (
  userService: UserServiceType,
  hashService: HashServiceType
) => {
  const registerUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User | null> => {
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
