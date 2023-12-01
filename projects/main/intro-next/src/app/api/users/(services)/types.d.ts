import { User, UserInput } from '../(domain)/entities/user.entity';

export type UserServiceType = {
  getUser: (id: number) => Promise<User | null>;
  getUsers: () => Promise<User[]>;
  createUser: (user: any) => Promise<User | null>;
  updateUser: (id: number, user: UserInput) => Promise<User>;
  deleteUser: (id: number) => Promise<Boolean>;
  getUserByEmail: (email: string) => Promise<User | null>;
};
