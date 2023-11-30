import { taskDto } from '../(domain)/taskDTO';
import { taskPrismaDataSource } from '../(infrastructure)/tasks.prisma';
import { TaskService } from './task.service';




export const taskService = TaskService(taskPrismaDataSource, taskDto);
