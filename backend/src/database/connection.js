import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDatabase() {
  await mongoose.connect(`${env.mongoUri}/${env.mongoDatabase}`, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  return mongoose.connection.db;
}

export function getDatabase() {
  if (mongoose.connection.readyState !== 1) throw new Error('Database connection has not been initialized.');
  return mongoose.connection.db;
}

export async function closeDatabase() {
  await mongoose.disconnect();
}