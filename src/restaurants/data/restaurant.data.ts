import { query } from "../../db";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { StringifyObject } from "../../utils/stringifyObject.utils";
import { Restaurant, RestaurantParams } from "../models/restaurant.model";

export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    return (await query("SELECT * FROM restaurants;")).rows;
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al obtener lista de restaurantes",
      500,
      "DataError",
      error,
      "getRestaurants"
    );
  }
}

export async function getRestaurantById(id: number): Promise<Restaurant> {
  try {
    console.log("ENTRO A GET: con ", id);
    return (await query("SELECT * FROM restaurants WHERE id = $1;", [id]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al obtener restaurante",
      500,
      "DataError",
      error,
      "getRestaurantById"
    );
  }
}

export async function getRestaurantIdByData(
  name: string,
  address: string,
  category: string
): Promise<number> {
  try {
    return (
      await query(
        "SELECT id FROM restaurants WHERE name = $1 AND address = $2 AND category = $3;",
        [name, address, category]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al obtener restaurante",
      500,
      "DataError",
      error,
      "getRestaurantByData"
    );
  }
}

export async function createRestaurant(
  name: string,
  address: string,
  category: string
): Promise<Restaurant> {
  try {
    return (
      await query(
        "INSERT INTO restaurants (name, address, category) VALUES ($1, $2, $3) RETURNING *;",
        [name, address, category]
      )
    ).rows[0];
  } catch (error) {
    console.log("ERROR EN DATA PARA CREAR");
    throw new ExpressReviewsError(
      "Error al crear nuevo restaurante",
      500,
      "DataError",
      error,
      "createRestaurant"
    );
  }
}

export async function updateRestaurant(
  data: RestaurantParams,
  id: number
): Promise<Restaurant> {
  let dataStringify = StringifyObject(data);
  console.log("dataStringify: ", dataStringify);

  try {
    return (
      await query(
        `UPDATE restaurants SET ${dataStringify} WHERE id = $1 RETURNING *;`,
        [id]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al actualizar el restaurante",
      500,
      "DataError",
      error,
      "updateRestaurant"
    );
  }
}
