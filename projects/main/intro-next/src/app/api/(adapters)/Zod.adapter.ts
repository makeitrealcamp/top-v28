import { z, ZodSchema } from 'zod';

export type ValidationAdapter = {
  validate: <T>(data: unknown, schema: ZodSchema<T>) => T;
};

export const ZodValidationAdapter: ValidationAdapter = {
  validate: <T>(data: unknown, schema: ZodSchema<T>): T => {
    return schema.parse(data);
  },
};
