import { ObjectId } from 'mongodb';

export default interface User {
  email: string;
  created_at: Date;
  updated_at: Date;
  id?: ObjectId;
}
