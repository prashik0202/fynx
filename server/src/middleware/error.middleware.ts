import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/customError";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.name,
      message: error.message,
    })
  }

  console.log(error); // Unexpected errors

  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Something went wrong",
  });
}