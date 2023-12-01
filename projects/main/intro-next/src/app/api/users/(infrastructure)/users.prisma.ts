import { prisma } from '@/libs/prismaClient';
import { Prisma } from '@prisma/client';
import { UserRepository } from '../(domain)/(repositories)/user.repository';

const createUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUser = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
};

const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
};

const deleteUser = async (id: number) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user.id ? true : false;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

export const userPrismaDataSource: UserRepository = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
