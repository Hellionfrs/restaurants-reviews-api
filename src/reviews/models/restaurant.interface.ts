import { z } from "zod";



export const CreateRestaurantSchema = z.object(
    {
        name: z.string(),
        address: z.string(),
        category: z.string()
    }
);


type CreateRestaurantType = z.infer<typeof CreateRestaurantSchema>;

export interface InCreateRestaurantInterface extends CreateRestaurantType{};

export interface OutCreateRestaurantInterface extends CreateRestaurantType{};

export interface DataCreateRestaurantInterface extends CreateRestaurantType{
    id:number
};