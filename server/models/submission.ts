import { ObjectId } from 'mongodb';

export default interface Submission {
  netlistJson: string;
  created_at: Date;
  updated_at: Date;
  id?: ObjectId;
}
