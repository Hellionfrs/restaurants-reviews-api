import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ExpressReviewsError from "../utils/error/ExpressReviewsError";

const jwtSecret = "ultra-secret";

export const authenticateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  let userId;

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      iat: number;
      exp: number;
    };
    userId = payload.userId;
    if (!userId) {
      next("error");
    }
  } catch (error) {
    new ExpressReviewsError("no autorizado", 401, "controller error");
  }
};
