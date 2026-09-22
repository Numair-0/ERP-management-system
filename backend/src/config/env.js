import 'dotenv/config';

const port = Number.parseInt(process.env.PORT || '4000', 10);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.isNaN(port) ? 4000 : port,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
  mongoDatabase: process.env.MONGO_DATABASE || 'madarsa_management',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-this-secret',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@markaz.local',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
  allowMultipleDevices: process.env.ALLOW_MULTIPLE_DEVICES !== 'false',
  sessionHours: Number.parseInt(process.env.SESSION_HOURS || '8', 10),
};