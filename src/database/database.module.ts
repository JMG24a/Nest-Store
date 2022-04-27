//external dependencies
import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
//my dependencies
import config from 'src/config';

const API_KEY_PROD = 1234;
const API_KEY = [{ name: 'Jose' }];

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      // 👈 Implement Module
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          mongo: { dbHost, dbName, dbPort, password, user, dbConnect },
        } = configService;
        return {
          uri: `${dbConnect}://${dbHost}:${dbPort}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'Api_key',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'mongoDB',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          mongo: { dbHost, dbName, dbPort, password, user, dbConnect },
        } = configService;
        const uri = `${dbConnect}://${user}:${password}@${dbHost}:${dbPort}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(`${dbName}`);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['Api_key', 'mongoDB'],
})
export class DatabaseModule {}

// ** connect with mongo
// const uri = 'mongodb://root:root@localhost:27017/';

// const client = new MongoClient(uri);
// const run = async () => {
//   await client.connect();
//   const database = client.db('nest-mongo-db');
//   const collectionUsers = database.collection('users');
//   const users = await collectionUsers.find().toArray();
//   console.log(users);
// };
// run();
