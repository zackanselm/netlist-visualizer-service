import * as mongoDB from 'mongodb';
import l from '../common/logger';
import User from '../models/user';

export const collections: { users?: mongoDB.Collection<User> } = {};

// eslint-disable-next-line prettier/prettier
const connectionString = `${process.env.MONGO_URI || ''}`;

const options: mongoDB.MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 5000,
};

const client = new mongoDB.MongoClient(connectionString, options);

client
  .connect()
  .then(() => {
    const db = client.db(process.env.MONGO_DB_NAME);

    const usersCollection = db.collection<User>('users');

    collections.users = usersCollection;

    l.info('Connected to MongoDB!');
  })
  .catch((err) => l.error(`Error connecting to MongoDB: ${err}`));
