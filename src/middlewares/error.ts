import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { formatErrors } from "../utils/formatErrors.utils";
import ExpressReviewsError from "../utils/error/ExpressReviewsError";

export default function errorHandler(
  error: Error | ZodError | ExpressReviewsError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
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
