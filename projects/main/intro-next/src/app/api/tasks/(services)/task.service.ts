import { TaskInput } from '../(domain)';
import { TaskRepository } from '../(domain)/(repositories)/task.respository';
import { TaskDTO } from '../(domain)/taskDTO';

export const TaskService = (taskDataSource: TaskRepository, taskDto) => {
  const getTask = async (id: number) => {
    return await taskDataSource.getTask(id);
  };
  const getTasks = async () => {
    return await taskDataSource.getTasks();
  };
  const createTask = async (task: TaskInput) => {
    const newTask = await taskDataSource.createTask(task);
    return taskDto(newTask);
  };
  const updateTask = async (id: number, task: TaskInput) => {
    return await taskDataSource.updateTask(id, task);
  };
  const deleteTask = async (id: number) => {
    return await taskDataSource.deleteTask(id);
  };

  const getTasksByUser = async (userId: number) => {
    return await taskDataSource.getTasksByUser(userId);
  };
  return {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksByUser,
  };
};
