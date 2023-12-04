import { z } from 'zod';

const registerUserSchema = z.object({
  email: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid email'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});

export interface CreateUserValidatorType {
  email: string;
  password: string;
}

export const createUserValidator = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await registerUserSchema.safeParseAsync({ email, password });

  if (result?.success) {
    return {
      error: null,
      data: result.data,
    };
  } else {
    return {
      error: result.error,
      data: null,
    };
  }
};
