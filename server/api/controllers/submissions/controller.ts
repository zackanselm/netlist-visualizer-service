import { Request, Response } from 'express';
import Submission from '../../../models/user';
import SubmissionsService from '../../services/submissions.service';

export class Controller {
  all(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | Submission[]> {
    const userId = req.headers['x-netlist-userid'];
    if (!userId) {
      return new Promise((resolve) => resolve(res.status(401).send()));
    }
    return SubmissionsService.all(userId?.toString() || '').then(
      (submissions) => res.status(200).send(submissions)
    );
  }

  create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    return SubmissionsService.create(req.body)
      .then((result) => {
        if (result) {
          return res.status(201).send({
            id: result.insertedId,
          });
        }

        return res.status(500).send('Failed to create a new submission.');
      })
      .catch((err) => {
        throw err;
      });
  }
}
export default new Controller();
