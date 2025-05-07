import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response<any, Record<string, any>> {
  const errors = err.errors || [{ message: err.message }];
  return res.status(err.status || 500).json({ errors });
}
