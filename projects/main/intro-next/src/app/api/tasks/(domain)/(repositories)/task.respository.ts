import { Task, TaskInput } from '..';

export interface TaskRepository {
  getTask(id: number): Promise<Task | null>;
  getTasks(): Promise<Task[]>;
  createTask(task: TaskInput): Promise<Task>;
  updateTask(id: number, task: TaskInput): Promise<Task>;
  deleteTask(id: number): Promise<Boolean>;
  getTasksByUser(userId: number): Promise<Task[]>;
}
