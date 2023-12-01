import bcrypt from 'bcryptjs';

export type HashServiceType = {
  hash: (password: string) => Promise<string>;
  compare: (password: string, hashedPassword: string) => Promise<boolean>;
};

export const BcryptAdapter = {
  hash: async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },
  compare: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  },
};
