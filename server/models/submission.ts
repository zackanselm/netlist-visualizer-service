import { ObjectId } from 'mongodb';

export default interface Submission {
  netlist_json: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  id?: ObjectId;
}
