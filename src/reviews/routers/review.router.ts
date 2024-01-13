import express from 'express';

import { CreateReviewRestaurantSchema, } from '../models/review.create.interface';
import reviewsControllers from '../controllers/reviews.controllers';
import { UpdateReviewSchema } from '../models/review.update.interface';
import { ValidateRequestMiddleware } from '../../middlewares/validated.request.middleware';

const reviewRestaurantRouter = express.Router();

reviewRestaurantRouter.post("/restaurant/:id/reviews", ValidateRequestMiddleware(CreateReviewRestaurantSchema), reviewsControllers.CreateReview);
reviewRestaurantRouter.patch("/reviews/:id", ValidateRequestMiddleware(UpdateReviewSchema), reviewsControllers.UpdateReview);
reviewRestaurantRouter.delete("/reviews/:id",reviewsControllers.DeleteReview)



export default reviewRestaurantRouter;
