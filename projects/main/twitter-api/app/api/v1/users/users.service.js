import { encryptPassword } from './model.js';
import * as userRepository from './repository.prisma.js';


export const createUser = async (body) => {

    const { success, data, error } = await UserSchema.safeParseAsync({
        ...body,
        profilePhoto: req.file?.path,
      });
  
      if (!success) {
        throw new Error({
          message: 'Validator error',
          status: 400,
          error,
        });
      }
  
      const password = await encryptPassword(data.password);

    return await userRepository.createUser(data, password);
};