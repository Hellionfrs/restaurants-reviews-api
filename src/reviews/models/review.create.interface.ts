import { z } from "zod";


// Create review
export const  CreateReviewRestaurantSchema = z.object(
    {
        score: z.number().min(1).max(5),
        title: z.string(),
        description: z.string()
    }
);


type CreateReviewRestaurantType = z.infer<typeof CreateReviewRestaurantSchema>;

export interface InCreateReviewInterface extends CreateReviewRestaurantType{};

export interface OutCreateReviewInteface extends CreateReviewRestaurantType{
    id: number,
    userId: number,
    restaurantId: number
};

export interface DataCreateReviewInterface extends CreateReviewRestaurantType{
    id:number,
    userid: number,
    restaurantid: number
};