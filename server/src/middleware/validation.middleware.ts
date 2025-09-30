import { ZodObject, ZodError, success } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = 
  (schema: ZodObject, type: "body" | "params" | "query" = "body") => 
  (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req[type]); // parse body/ param / query
    next();
  } catch (error) {
    if(error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }))
      })
    }
    next(error);
  }
}