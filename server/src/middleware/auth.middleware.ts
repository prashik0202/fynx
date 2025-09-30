import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/customError';

const JWT_SECRET = process.env.JWT_SECRET!;

declare global {
  namespace Express {
    interface Request {
      user? : {
        userId : string;
      }
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: Function) {
  const token = req.cookies['access_token'];

  if (!token) {
    throw new AuthenticationError('Invalid Token or expired');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId : string };
    req.user = { userId : payload.userId };
    next();
  } catch (error) {
    throw new AuthenticationError('Invalid Token or expired');
  }
}