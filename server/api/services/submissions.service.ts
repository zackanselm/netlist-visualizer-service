import { InsertOneResult } from 'mongodb';
import Submission from '../../models/submission';
import L from '../../common/logger';
import { collections } from '../../store/connection';

export class SubmissionsService {
  async all(user_id: string): Promise<Submission[]> {
    const submissions =
      (await collections?.submissions?.find({ user_id }).toArray()) || [];

    L.debug(submissions, 'fetch all submissions for user');

    return submissions;
  }

  async create(
    newSubmission: Submission
  ): Promise<InsertOneResult<Submission> | undefined> {
    const result = await collections?.submissions?.insertOne({
      ...newSubmission,
      created_at: new Date(),
      updated_at: new Date(),
    });

    L.debug(`create submission: ${JSON.stringify(result)}`);

    return result;
  }
}

export default new SubmissionsService();
