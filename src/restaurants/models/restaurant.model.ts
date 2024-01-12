import { z } from "zod";

export const restaurantSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, "Name should have at least 1 character"),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address should be a string",
    })
    .min(6, "Address should have at least 6 characters"),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category should be a string",
    })
    .min(1, "Category should have at least 1 character"),
});

export const restaurantUpdateSchema = restaurantSchema.partial();

export type RestaurantParams = z.infer<typeof restaurantSchema>;

export type Restaurant = RestaurantParams & { id: number };
