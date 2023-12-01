import { UserRepository } from '../(domain)/(repositories)/user.repository';
import { UserInput } from '../(domain)/entities/user.entity';
import { UserServiceType } from './types';

export const UserService = (
  userDataSource: UserRepository
): UserServiceType => {
  const getUser = async (id: number) => {
    return await userDataSource.getUser(id);
  };
  const getUsers = async () => {
    return await userDataSource.getUsers();
  };
  const createUser = async (user: UserInput) => {
    const newUser = await userDataSource.createUser(user);
    return newUser;
  };
  const updateUser = async (id: number, user: UserInput) => {
    return await userDataSource.updateUser(id, user);
  };
  const deleteUser = async (id: number) => {
    return await userDataSource.deleteUser(id);
  };
  const getUserByEmail = async (email: string) => {
    return await userDataSource.getUserByEmail(email);
  };

  return {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
  };
};
