import { getRestaurantById } from "../../restaurants/data/restaurant.data";
import { DataCreateReviewInterface, InCreateReviewInterface } from "../models/review.create.interface";
import reviewData from "../data/review.data";
import { InUpdateReviewInterface } from "../models/review.update.interface";
import { DataCreateRestaurantInterface } from "../models/restaurant.interface";
import { getUserById } from "../../users/data/user.data";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { DataRegisterLoginInterface } from "../models/user.interface";


class ReviewServices {

    async createReview(data: InCreateReviewInterface, idRestaurant: number, idUser: number): Promise<DataCreateReviewInterface> {
        try {
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

    async updateReview(data:InUpdateReviewInterface, id: number):Promise<DataCreateReviewInterface>{
        try{
            const reviewOld: DataCreateReviewInterface = await reviewData.getReviewById(id);
            if(!reviewOld) throw new ExpressReviewsError("Reseña no encontrada",401,"ValidationError");
            const review: DataCreateReviewInterface = await reviewData.updateReview(data,id);
            return review;
        }catch(error){
            throw error;
        };
    };

    async deleteReview(id:string):Promise<void>{
        try{
            const reviewOld: DataCreateReviewInterface = await reviewData.getReviewById(Number(id));
            if(!reviewOld) throw new ExpressReviewsError("Reseña no encontrada.",400,"ErrorValidation");
            await reviewData.deleteReviewById(id);
        }catch(error){
            throw error;
        }
    }

};


export default new ReviewServices();
