import { NextFunction, Request, Response } from "express";
import { InCreateReviewInterface, OutCreateReviewInteface } from "../models/review.create.interface";
import { ResponseEndPointInterface } from "../../utils/response/Interface.response";
import { InUpdateReviewInterface } from "../models/review.update.interface";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import ReviewServices from "../services/review.service"



class ReviewController {

    async CreateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const requestData: InCreateReviewInterface = req.body;
            const idRestaurant: number = Number(req.params['id']);
            const idUser = req.userId;
            const review = await ReviewServices.createReview(requestData, idRestaurant, idUser);
            const responseData: OutCreateReviewInteface = {
                id: review.id,
                userId: review.userid,
                restaurantId: review.restaurantid,
                score: review.score,
                title: review.title,
                description: review.description
            };
            const responseEndPoint: ResponseEndPointInterface = {
                ok: true,
                message: "Reseña publicada con éxito.",
                data: responseData
            };
            res.status(200).json(responseEndPoint)
        } catch (error) {
            if (error instanceof ExpressReviewsError) {
                next(error)
            } else {
                next(new ExpressReviewsError("Error al publicar una reseña", 500, "ControllerError", error));
            }
        }
    };

    async UpdateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const requestData: InUpdateReviewInterface = req.body;
            const idReview: number = Number(req.params['id'])

            const idUser = req.userId
            const role = req.userRole

            const review = await ReviewServices.updateReview(requestData, idReview, idUser, role);
            const responseData: OutCreateReviewInteface = {
                id: review.id,
                userId: review.userid,
                restaurantId: review.restaurantid,
                score: review.score,
                title: review.title,
                description: review.description
            };
            const responseEndPoint: ResponseEndPointInterface = {
                ok: true,
                message: "Reseña actualizada con éxito.",
                data: responseData
            };
            res.status(200).json(responseEndPoint);
        } catch (error) {
            if (error instanceof ExpressReviewsError) {
                next(error)
            } else {
                next(new ExpressReviewsError("Error al publicar una reseña", 500, "ControllerError", error));
            }
        }
    };

    async DeleteReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const idReview: string = req.params['id'];

            const idUser = req.userId
            const role = req.userRole

            await ReviewServices.deleteReview(idReview, idUser, role);
            const responseEndPoint: ResponseEndPointInterface = {
                ok: true,
                message: "Reseña eliminada con éxito.",
                data: {}
            };
            res.status(200).json(responseEndPoint)
        } catch (error) {
            if (error instanceof ExpressReviewsError) {
                next(error)
            } else {
                next(new ExpressReviewsError("Error al publicar una reseña", 500, "ControllerError", error));
            }
        }
    };

    async ListReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const idRestaurant = req.params['id'];
            const reviews = await ReviewServices.listReviewsByRestaurant(idRestaurant)
            const responseEndPoint: ResponseEndPointInterface = {
                ok: true,
                message: "Listado exito de revisiones por restaurant.",
                data: reviews
            };
            res.status(200).json(responseEndPoint);
        } catch (error) {
            if (error instanceof ExpressReviewsError) {
                next(error)
            } else {
                next(new ExpressReviewsError("Error al publicar una reseña", 500, "ControllerError", error));
            }
        }
    }
};


export default new ReviewController();
