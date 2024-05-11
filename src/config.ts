import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  // export default
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
    api: process.env.API,
  };
});
