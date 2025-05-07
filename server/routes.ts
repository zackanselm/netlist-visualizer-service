import { Application } from 'express';
import userssRouter from './api/controllers/users/router';

export default function routes(app: Application): void {
  app.use('/api/v1/users', userssRouter);
}
