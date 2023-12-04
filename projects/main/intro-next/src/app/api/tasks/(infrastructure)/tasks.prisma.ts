import { prisma } from '@/libs/prismaClient';
import { Prisma } from '@prisma/client';
import { TaskRepository } from '../(domain)/(repositories)/task.respository';
import { TaskInput } from '../(domain)';

const createTask = async (taskInput: TaskInput) => {
  const task = await prisma.task.create({
    data: {
      ...taskInput,
    },
  });

  return task;
};

const getTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

const getTask = async (id: number) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
    },
  });

  return task;
};

const updateTask = async (id: number, data: Prisma.TaskUpdateInput) => {
  const task = await prisma.task.update({
    where: {
      id,
    },
    data,
  });

  return task;
};

const deleteTask = async (id: number) => {
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });

  return true;
};

const getTasksByUser = async (userId: number) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  return tasks;
};

export const taskPrismaDataSource: TaskRepository = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTasksByUser,
};
