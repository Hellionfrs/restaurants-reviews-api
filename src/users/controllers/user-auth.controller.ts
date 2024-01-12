import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { createUser, getUserByName } from "../services/user.service";
import { userSchema } from "../models/user.model";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";

const jwtSecret = "ultra-secret";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    // const user = await getUser(userId);
    const user = await getUserByName(username);
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const payload = { userId: user.id, userRole: user.role };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });

      res.json({ ok: true, message: "Login exitoso", data: { token } });
    } else {
      throw new ExpressReviewsError(
        "credenciales invalidas",
        403,
        "Error at controllers"
      );
    }
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
    // encriptar password
    const costFactor = 10;
    const dataParsed = userSchema.parse(req.body);
    const newUserParsed = {
      username: dataParsed.username,
      password: await bcrypt.hash(dataParsed.password, costFactor),
      role: dataParsed.role,
    };
    const newUser = await createUser(newUserParsed);
    res
      .status(201)
      .json({ ok: true, message: "Register existoso", data: newUser });
  } catch (error) {
    next(error);
  }
};

export { loginController, signUpController };
