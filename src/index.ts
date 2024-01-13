import express, { NextFunction, Request, Response } from "express";
import { authRouter } from "./users/routers/auth.router";
import { userRouter } from "./users/routers/user.router";
import { ZodError } from "zod";
import ExpressReviewsError from "./utils/error/ExpressReviewsError";

const app = express();
const port = 5500;
app.use(express.json());
app.use(authRouter);
app.use("/users", userRouter);
app.use(
  (
    error: Error | ZodError | ExpressReviewsError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (error instanceof ZodError) {
      res.status(400).json({
        ok: false,
        message: "wrong type of fields",
        details: error.formErrors.fieldErrors,
      });
      return;
    } else if (error instanceof ExpressReviewsError) {
      res.status(error.statusCode).json({
        ok: false,
        message: error.message,
        details: {
          type: error.type,
          details: error.details,
          timestamp: error.timesTamp,
          techInfo: error.techInfo,
        },
      });
    } else {
      res.status(500).send({
        ok: false,
        message: error.message,
      });
    }
  }
);
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
