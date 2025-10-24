import { NextFunction, Request, Response } from 'express';

class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  _next: NextFunction // important to have 4 args and classic function declaration
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({ status, message });
}
