import { ConfigurationError } from './errors';

export const config = {
  getNextAuthSecret: () => {
    if (!process.env.NEXTAUTH_SECRET) {
      throw new ConfigurationError('NEXT_NEXTAUTH_SECRET is not defined');
    }
    return process.env.NEXTAUTH_SECRET;
  },
  getGithubClientId: () => {
    if (!process.env.GITHUB_ID) {
      throw new ConfigurationError('GITHUB_ID is not defined');
    }

    return process.env.GITHUB_ID;
  },
  getGithubSecret: () => {
    if (!process.env.GITHUB_SECRET) {
      throw new ConfigurationError('GITHUB_SECRET is not defined');
    }
    return process.env.GITHUB_SECRET;
  },
  getApiUrl: () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new ConfigurationError('API_URL is not defined');
    }
    return process.env.NEXT_PUBLIC_API_URL;
  },
};
