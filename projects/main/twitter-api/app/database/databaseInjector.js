import { connectPrisma, disconnectPrisma } from './prismaConnection.js';
import { connectMongoose, disconnectMongoose } from './mongooseConnection.js';

export const getDatabaseConnection = (type) => {
  switch (type) {
    case 'prisma':
      return { connect: connectPrisma, disconnect: disconnectPrisma };
    case 'mongoose':
      return { connect: connectMongoose, disconnect: disconnectMongoose };
    default:
      throw new Error('Unknown database type');
  }
};