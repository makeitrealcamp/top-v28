import { Request } from 'express';

export type Configuration = {
  server: ServerConfiguration;
  pagination: PaginationConfiguration;
  order: OrderConfiguration;
  token: TokenConfiguration;
  rateLimit: RateLimitConfiguration;
};

export type ServerConfiguration = {
  port: number;
};

export type PaginationConfiguration = {
  limit: string;
  offset: string;
};

export type OrderConfiguration = {
  options: [OrderOptions.ASC, OrderOptions.DESC];
  direction: OrderOptions.ASC | OrderOptions.DESC;
  orderBy: string;
};

export type TokenConfiguration = {
  secret: string;
  expires: string;
};

export type RateLimitConfiguration = {
  points: number;
  duration: number;
};

export enum OrderOptions {
  ASC = 'asc',
  DESC = 'desc',
}

export type RequestWithId = Request & { id: string };
export type RequestWithDecoded = Request & { decoded: Record<string, string> };

export type APIError = Error & { status: number; error: Error };
