import { z } from 'zod';

const TaskSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable().optional(),
    completed: z.boolean(),
    userId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

const TaskInputSchema = TaskSchema.omit({
  id: true,
  completed: true,
  createdAt: true,
  updatedAt: true,
});

export type Task = z.infer<typeof TaskSchema>;

export type TaskInput = z.infer<typeof TaskInputSchema>;

export { TaskSchema, TaskInputSchema };
