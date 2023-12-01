import { User, UserInput } from '../entities/user.entity';

export interface UserRepository {
  getUser(id: number): Promise<User | null>;
  getUsers(): Promise<User[]>;
  createUser(user: UserInput): Promise<User>;
  updateUser(id: number, user: UserInput): Promise<User>;
  deleteUser(id: number): Promise<Boolean>;
  getUserByEmail(email: string): Promise<User | null>;
}
