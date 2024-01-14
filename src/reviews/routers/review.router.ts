import express from 'express';

import { CreateReviewRestaurantSchema, } from '../models/review.create.interface';
import reviewsControllers from '../controllers/reviews.controllers';
import { UpdateReviewSchema } from '../models/review.update.interface';
import { ValidateRequestMiddleware } from '../../middlewares/validated.request.middleware';
import { adminAuthorizacion, authenticateHandler } from '../../middlewares/auth.middleware';

const reviewRestaurantRouter = express.Router();

reviewRestaurantRouter.get("/restaurant/:id/reviews", reviewsControllers.ListReview);
reviewRestaurantRouter.post("/restaurant/:id/reviews", authenticateHandler, ValidateRequestMiddleware(CreateReviewRestaurantSchema), reviewsControllers.CreateReview);
reviewRestaurantRouter.patch("/reviews/:id", authenticateHandler, ValidateRequestMiddleware(UpdateReviewSchema), reviewsControllers.UpdateReview);
reviewRestaurantRouter.delete("/reviews/:id", authenticateHandler, adminAuthorizacion, reviewsControllers.DeleteReview)



export default reviewRestaurantRouter;