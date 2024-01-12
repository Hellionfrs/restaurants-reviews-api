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

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", getRestaurants);
restaurantsRouter.post(
  "/",
  ValidateRequestMiddleware(restaurantSchema),
  createRestaurant
);
restaurantsRouter.patch(
  "/:id",
  ValidateRequestMiddleware(restaurantUpdateSchema),
  updateRestaurant
);
restaurantsRouter.delete("/:id", deleteRestaurant);

export default restaurantsRouter;
