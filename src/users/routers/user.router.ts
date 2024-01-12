import express, { NextFunction, Response } from "express";
import { authenticateHandler } from "../../middlewares/auth.middleware";
import { getUsers } from "../services/user.service";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
const userRouter = express.Router();

userRouter.get("/", authenticateHandler, async (req, res: Response, next: NextFunction) => {
  const userRole = req.userRole as string

  if (userRole === "admin"){
    const users = await getUsers()
    res.status(200).json({ "ok": true, "message": "Lista de usuarios", "data": users})
  } else {
    next(new ExpressReviewsError("No autorizado", 401, "Error on userRouter get /users" ))
  }
} );

export {userRouter}