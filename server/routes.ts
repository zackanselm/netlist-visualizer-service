import { Application } from 'express';
import usersRouter from './api/controllers/users/router';
import submissionsRouter from './api/controllers/submissions/router';

export default function routes(app: Application): void {
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/submissions', submissionsRouter);
}
