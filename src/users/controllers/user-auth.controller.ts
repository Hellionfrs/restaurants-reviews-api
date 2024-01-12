import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { getUserByNameAPassword } from "../data/user.data";
import { createUser } from "../services/user.service";
import { userSchema } from "../models/user.model";

const jwtSecret = "ultra-secret";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    // const user = await getUser(userId);
    const user = await getUserByNameAPassword(username, password);
    if (!user) {
      throw new ExpressReviewsError(
        "credenciales invalidad",
        403,
        "Error at controllers"
      );
    }
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
    res.json({ ok: true, message: "Login exitoso", data: { token } });
  } catch (error) {
    next(error);
  }
};

const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUser(userSchema.parse(req.body));
    res.status(201).json({ok: true, message: "Register existoso", data: newUser});
  } catch (error) {
    next(error);
  }
};

export { loginController, signUpController };
