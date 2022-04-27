import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  // 👈 export default
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_NAME,
      dbPort: parseInt(process.env.MONGO_PORT, 10),
      dbHost: process.env.MONGO_HOST,
      dbConnect: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
    api: process.env.API,
  };
});
