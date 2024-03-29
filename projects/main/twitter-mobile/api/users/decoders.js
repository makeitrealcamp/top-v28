import { UserOutput } from './types';

export async function decodeUserOutput(payload) {
  try {
    const data = await UserOutput.parseAsync(payload);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
