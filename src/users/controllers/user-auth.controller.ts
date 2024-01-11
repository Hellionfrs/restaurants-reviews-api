import express from "express";
import jwt from "jsonwebtoken";

const jwtSecret = "ultra-secret";
const authRouter = express.Router();

authRouter.get("/", async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || ""
  let userId;

  try {
    const payload = jwt.verify(token, jwtSecret) as {userId: number, iat: number, exp: number}
    userId = payload.userId;
  } catch (error) {
    next(new ExpressReviewsError())
  }
});
export { authRouter };
