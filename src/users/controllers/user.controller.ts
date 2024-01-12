import { NextFunction, Request, Response } from "express"
import { getUsers } from "../services/user.service"
import ExpressReviewsError from "../../utils/error/ExpressReviewsError"


export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.userRole as string

  if (userRole === "admin"){
    const users = await getUsers()
    res.status(200).json({ "ok": true, "message": "Lista de usuarios", "data": users})
  } else {
    next(new ExpressReviewsError("No autorizado", 401, "Error on userRouter get /users" ))
  }
}