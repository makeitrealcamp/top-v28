import { Task } from '.';

export interface TaskDTO {
  id: number;
  title: string;
  description?: string | null;
  status: boolean;
  createdAt: Date;
  likes?: number;
}

export const taskDto = (task: Task): TaskDTO => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.completed,
    createdAt: task.createdAt,
    likes: task.likes,
  };
};
