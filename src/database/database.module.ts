import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY_PROD = 1234;
const API_KEY = [{ name: 'Jose' }];

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

@Global()
@Module({
  providers: [
    {
      provide: 'Api_key',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'mongoDB',
      useFactory: async () => {
        const uri = 'mongodb://root:root@localhost:27017/';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('nest-mongo-db');
        return database;
      },
    },
  ],
  exports: ['Api_key', 'mongoDB'],
})
export class DatabaseModule {}
