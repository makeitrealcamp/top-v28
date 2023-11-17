import { getDatabaseConnection } from './databaseInjector.js';


export const connectMongoose = async function () {  
    const { connect: connectMongoose, disconnect: disconnectMongoose } = getDatabaseConnection('mongoose');
    await connectMongoose();
  console.log('Database connected');
};
