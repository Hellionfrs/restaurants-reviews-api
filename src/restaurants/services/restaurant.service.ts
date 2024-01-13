import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import * as restaurantDB from "../data/restaurant.data";
import { Restaurant, RestaurantParams } from "../models/restaurant.model";

export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    return await restaurantDB.getRestaurants();
  } catch (error) {
    throw error;
  }
}

export async function getRestaurantById(id: number): Promise<Restaurant> {
  try {
    return await restaurantDB.getRestaurantById(id);
  } catch (error) {
    throw error;
  }
}

export async function getRestaurantIdByData(
  data: RestaurantParams
): Promise<number | undefined> {
  const { name, address, category } = data;
  try {
    return await restaurantDB.getRestaurantIdByData(name, address, category);
  } catch (error) {
    throw error;
  }
}

export async function createRestaurant(
  data: RestaurantParams
): Promise<Restaurant> {
  const { name, address, category } = data;
  try {
    const restaurantId = await getRestaurantIdByData(data);
    if (restaurantId) {
      throw new ExpressReviewsError(
        "El restaurante ya existe",
        500,
        "ServiceError",
        Error
      );
    }
    return await restaurantDB.createRestaurant(name, address, category);
  } catch (error) {
    throw error;
  }
}

export async function updateRestaurant(
  data: RestaurantParams,
  id: number
): Promise<Restaurant> {
  try {
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      throw new ExpressReviewsError(
        "El restaurante no existe",
        500,
        "ServiceError",
        Error
      );
    }
    return await restaurantDB.updateRestaurant(data, id);
  } catch (error) {
    throw error;
  }
}

export async function deleteRestaurant(id: number): Promise<Restaurant> {
  try {
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      throw new ExpressReviewsError(
        "El restaurante no existe",
        500,
        "ServiceError",
        Error
      );
    }
    return await restaurantDB.deleteRestaurant(id);
  } catch (error) {
    throw error;
  }
}
