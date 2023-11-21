import * as userRepository from './repository.prisma.js';


export const createUser = async (data, password) => {
    console.log({ data });
    return await userRepository.createUser(data, password);
};