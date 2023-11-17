import mongoose from 'mongoose';
import { createConnectFunction, createDisconnectFunction } from './databaseConnectFunction.js';


const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {});
  console.log('Mongoose connected to db');
};

const disconnect = async () => {
  await mongoose.disconnect();
  console.log('Mongoose Database disconnected');
};

export const connectMongoose = createConnectFunction(connect);
export const disconnectMongoose = createDisconnectFunction(disconnect);