import { createTask, getTasks } from '../tasks/taskService.ts';

export interface TaskInput {
  title: string;
  content: string;
}
export const resolvers = {
  Query: {
    getAllTasks: async (parent,args, context) => {
        console.log({context});
        if(!context.token){
            throw new Error('Unauthorized');
        }
      return await getTasks();
    },
  },

  Mutation: {
    createTask: async (_, { title, content }: TaskInput) => {
      return await createTask({ title, content });
    },
  },
};
