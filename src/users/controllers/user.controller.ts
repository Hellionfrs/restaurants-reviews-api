import { userSchema } from './../models/user.model';
import { NextFunction, Request, Response } from "express"
import { deleteUser, getUsers, updateUser } from "../services/user.service"
import ExpressReviewsError from "../../utils/error/ExpressReviewsError"
import bcrypt from "bcrypt";


export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.userRole as string

  if (userRole === "admin"){
    const users = await getUsers()
    res.status(200).json({ "ok": true, "message": "Lista de usuarios", "data": users})
  } else {
    next(new ExpressReviewsError("No autorizado", 401, "Error on userRouter get /users" ))
  }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  let costFactor = 10
  try {
    const userId = Number(req.params['id'])
    // validando el body
    const data = userSchema.partial().parse(req.body)
    // new userData
    if (data.password) {
      data.password = await bcrypt.hash(data.password, costFactor)
    }
    const updatedUser = await updateUser(userId, data)
    res.status(201).json({ok:true, message: "Actualizacion exitosa", data: updatedUser})
  } catch (error){
    next(error)
  }
}

export const deleteUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const userId = Number(req.params['id'])
    const deletedUser = await deleteUser(userId)
    res.status(200).json({ok:true, message: "Eliminacion exitosa", data: deletedUser})
  } catch (error) {
    next(error)
  }
}