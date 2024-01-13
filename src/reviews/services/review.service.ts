import { getRestaurantById } from "../../restaurants/data/restaurant.data";
import { DataCreateReviewInterface, InCreateReviewInterface } from "../models/review.create.interface";
import reviewData from "../data/review.data";
import { InUpdateReviewInterface } from "../models/review.update.interface";
import { DataCreateRestaurantInterface } from "../models/restaurant.interface";
import { getUserById } from "../../users/data/user.data";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { DataRegisterLoginInterface } from "../models/user.interface";


class ReviewServices {

    async createReview(data: InCreateReviewInterface, idRestaurant: number, idUser: number|undefined): Promise<DataCreateReviewInterface> {
        try {
            if(typeof idUser==='undefined')throw new ExpressReviewsError("Usuario no valido", 500, "ValidationError");
            const restaurant: DataCreateRestaurantInterface = await getRestaurantById(idRestaurant);
            if (!restaurant) throw new ExpressReviewsError("Restaurante no valido", 403, "ValidationError");
            const user: DataRegisterLoginInterface = await getUserById(idUser);
            if (!user) throw new ExpressReviewsError("Usuario no identificado", 403, "ValidationError");
            const review: DataCreateReviewInterface = await reviewData.createReview(data, user.id, restaurant.id);
            return review;
        } catch (error) {
            throw error;
        }

    };

    async updateReview(data: InUpdateReviewInterface, id: number, idUser: number | undefined, role: string | undefined): Promise<DataCreateReviewInterface> {
        try {
            if (typeof id === 'undefined' || typeof role === "undefined") throw new ExpressReviewsError("Usuario no valido", 403, "ValidationError");
            const reviewOld: DataCreateReviewInterface = await reviewData.getReviewById(id);
            if (!reviewOld) throw new ExpressReviewsError("Reseña no encontrada", 401, "ValidationError");
            if (role === "admin") {
                const review: DataCreateReviewInterface = await reviewData.updateReview(data, id);
                return review;
            } else {
                if (reviewOld.userid !== idUser) throw new ExpressReviewsError("El usuario no puede concretar la operación", 403, "ValidationError");
                const review: DataCreateReviewInterface = await reviewData.updateReview(data, id);
                return review;
            }

        } catch (error) {
            throw error;
        };
    };

    async deleteReview(id: string, idUser: number|undefined, role: string|undefined): Promise<void> {
        try {
            if (typeof id === 'undefined' || typeof role === "undefined") throw new ExpressReviewsError("Usuario no valido", 403, "ValidationError");
            const reviewOld: DataCreateReviewInterface = await reviewData.getReviewById(Number(id));
            if (!reviewOld) throw new ExpressReviewsError("Reseña no encontrada.", 400, "ErrorValidation");
            if (role === "admin") {
                await reviewData.deleteReviewById(id);
            } else {
                if (reviewOld.userid !== idUser) throw new ExpressReviewsError("El usuario no puede concretar la operación", 403, "ValidationError");
                await reviewData.deleteReviewById(id);
            }
        } catch (error) {
            throw error;
        }
    };

    async listReviewsByRestaurant(id: string): Promise<DataCreateReviewInterface[]> {
        try {
            const reviews: DataCreateReviewInterface[] = await reviewData.getReviewsByRestaurant(id);
            return reviews
        } catch (error) {
            throw error;
        }
    };

};


export default new ReviewServices();
