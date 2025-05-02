import * as mongoose from 'mongoose';
import l from '../common/logger';

const connectionString = process.env.MONGO_URI || '';

const options: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 5000,
};

mongoose
  .connect(connectionString, options)
  .then(() => l.info('Connected to MongoDB!'))
  .catch((err) => l.error('Error connecting to MongoDB:', err));

export default {};
