
import * as userRepository from './repository.prisma.js';

import {
  encryptPassword,
  verifyPassword,
  UserSchema,
  LoginSchema,
} from './model.js';
import { signToken } from '../auth.js';
import { UnauthorizedError } from '../../../error/customErrors.js';


export const createUser = async ({ name, username, email, password }, filePath) => {

  const { success, data, error } = await UserSchema.safeParseAsync({
    name, username, email, password,
    profilePhoto: filePath,
  });

  if (!success) {
    throw new Error({
      message: 'Validator error',
      status: 400,
      error,
    });
  }

  const encryptedPassword = await encryptPassword(data.password);
  console.log({ data, password });

  return await userRepository.createUser(data, encryptedPassword);
};

export const loginUser = async ({ email, password }) => {
  const { success, data, error } = await LoginSchema.safeParseAsync({ email, password });
  if (!success) {
    throw new Error({
      message: 'Validator error',
      status: 400,
      error,
    });
  }
  // console.log({ success, data, error });

  const { email: validEmail, password: validPassword } = data;


  const user = await userRepository.findUser(validEmail);

  if (user === null) {
    throw new Error({
      message: 'Invalid email or password',
      status: 400,
    });
  }

  const passwordMatch = await verifyPassword(validPassword, user.password);

  if (!passwordMatch) {
    throw new UnauthorizedError('Invalid email or password');

  }

  const { id, username } = user;
  const token = signToken({ id, username });
  console.log({ token, user });
  return {
    token,
    user,
  };
};