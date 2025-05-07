import { Request, Response } from 'express';
import User from '../../../models/user';
import UsersService from '../../services/users.service';

export class Controller {
  all(
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | User[]> {
    return UsersService.all().then((users) => res.status(200).send(users));
  }

  byId(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | User> {
    return UsersService.byId(req.params.id).then((result) => {
      if (result) {
        return res.status(200).send(result);
      }

      return res
        .status(404)
        .send(`Unable to find user with id: ${req.params.id}`);
    });
  }

  create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    return UsersService.create(req.body).then((result) => {
      if (result) {
        return res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`);
      }

      return res.status(500).send('Failed to create a new user.');
    });
  }

  update(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    return UsersService.update(req.params.id, req.body).then((result) => {
      if (result) {
        return res.status(200).send({
          id: req.params.id,
        });
      }

      return res.status(304).send('Failed to update user.');
    });
  }
}
export default new Controller();
