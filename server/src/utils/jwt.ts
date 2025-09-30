import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supperscretkey";

export function generateAccessToken(userId : string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1m' });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}