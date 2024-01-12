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
    return await restaurantDB.updateRestaurant(data, id);
  } catch (error) {
    throw error;
  }
}
