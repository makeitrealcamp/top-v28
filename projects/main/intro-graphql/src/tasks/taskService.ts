import { Task } from './taskModel.ts';

interface TaskInput {
  title: string;
  content: string;
}

export const createTask = async (task: TaskInput): Promise<any> => {
  const newTask = new Task(task);
  return await newTask.save();
};

export const getTasks = async (): Promise<any[]> => {
  return await Task.find();
};  