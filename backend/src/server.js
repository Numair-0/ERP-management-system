import app from './app.js';
import { env } from './config/env.js';
import { closeDatabase, connectDatabase } from './database/connection.js';
import { initializeDatabase } from './database/initialize.js';

async function startServer() {
  await connectDatabase();
  await initializeDatabase();

  const server = app.listen(env.port);
  await new Promise((resolve, reject) => {
    const handleError = (error) => {
      server.removeListener('listening', handleListening);
      reject(error);
    };
    const handleListening = () => {
      server.removeListener('error', handleError);
      resolve();
    };

    server.once('error', handleError);
    server.once('listening', handleListening);
  });

  console.log(`Madarsa Management API listening on port ${env.port}`);

  const shutdown = async () => {
    await closeDatabase();
    server.close();
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

startServer().catch(async (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${env.port} is already in use. Stop the process using it or set a different PORT in backend/.env.`);
  } else if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
    console.error(`Cannot reach MongoDB at ${env.mongoUri}. Start MongoDB (or set MONGO_URI in backend/.env to your MongoDB/Atlas URL) and try again.`);
  } else {
    console.error('Unable to start Madarsa Management API:', error.message);
  }

  await closeDatabase();
  process.exitCode = 1;
});