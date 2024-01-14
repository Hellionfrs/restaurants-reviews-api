import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurants.controller";

import {
  restaurantSchema,
  restaurantUpdateSchema,
} from "../models/restaurant.model";
import { ValidateRequestMiddleware } from "../../middlewares/validated.request.middleware";
import { authenticateHandler } from "../../middlewares/auth.middleware";

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", getRestaurants);
restaurantsRouter.post(
  "/",
  authenticateHandler,
  ValidateRequestMiddleware(restaurantSchema),
  createRestaurant
);
restaurantsRouter.patch(
  "/:id",
  authenticateHandler,
  ValidateRequestMiddleware(restaurantUpdateSchema),
  updateRestaurant
);
restaurantsRouter.delete("/:id", authenticateHandler, deleteRestaurant);

export default restaurantsRouter;
