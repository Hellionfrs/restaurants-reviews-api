import express, { NextFunction, Request, Response } from "express";
import { authRouter } from "./users/routers/auth.router";
import { userRouter } from "./users/routers/user.router";
import { ZodError } from "zod";
import ExpressReviewsError from "./utils/error/ExpressReviewsError";
import restaurantsRouter from "./restaurants/routers/restaurant.router";
import { formatErrors } from "./utils/formatErrors.utils";

const app = express();
const port = 5500;
app.use(express.json());

app.use(authRouter);
app.use("/users", userRouter);
app.use("/restaurants", restaurantsRouter);

app.use(
  (
    error: Error | ZodError | ExpressReviewsError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof ZodError) {
      res.status(400).json({
        ok: false,
        message: "Error en validación",
        details: formatErrors(error.formErrors.fieldErrors),
      });
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
      res.status(500).json({
        ok: false,
        error: {
          message: "Error interno del servidor",
        },
      });
    }
  }
);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
