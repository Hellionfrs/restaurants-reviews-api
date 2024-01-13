import { query } from "../../db"
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";

import { DataCreateReviewInterface, InCreateReviewInterface } from "../models/review.create.interface";
import { InUpdateReviewInterface } from "../models/review.update.interface";

class ReviewData {

  async createReview(data: InCreateReviewInterface, idUser: number, idRestaurant: number): Promise<DataCreateReviewInterface> {
    try {
      const result = await query("INSERT INTO REVIEWS (USERID, RESTAURANTID, SCORE, TITLE, DESCRIPTION) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [
        idUser.toString(),
        idRestaurant.toString(),
        data.score.toString(),
        data.title,
        data.description
      ]);
      return result.rows[0] as DataCreateReviewInterface;
    } catch (error) {
      throw new ExpressReviewsError("Error al crear la reseña", 404, "DataError", error);
    }
  };

  async updateReview(data: InUpdateReviewInterface, id: number): Promise<DataCreateReviewInterface> {
    try {
      let queryString = 'UPDATE REVIEWS SET ';
      const params: string[] = [];
      let index = 1;
      for (const [campo, valor] of Object.entries(data)) {
        if (index > 1) queryString += ', ';
        queryString += `${campo} = $${index}`;
        if (typeof valor === 'string') {
          params.push(valor);
        } else if (typeof valor === 'number') {
          params.push(valor.toString())
        };
        index++;
      };
      params.push(id.toString())
      queryString += ` WHERE ID=$${index} RETURNING *;`;
      console.log(queryString);
      const result = await query(queryString, params);
      return result.rows[0] as DataCreateReviewInterface;
    } catch (error) {
      throw new ExpressReviewsError("Error al actualizar la reseña", 404, "DataError", error);
    }

  };

  async getReviewById(id: number): Promise<DataCreateReviewInterface>{
    try {
      const result = await query("SELECT * FROM REVIEWS WHERE ID=$1;", [id.toString()]);
      return result.rows[0] as DataCreateReviewInterface
    } catch (error) {
      throw new ExpressReviewsError("Error conseguir una reseña", 404, "DataError", error);
    }
  };

  async deleteReviewById(id: string):Promise<void>{
    try{
      await query("DELETE FROM REVIEWS WHERE ID=$1;",[id]);
    }catch(error){
      throw new ExpressReviewsError("Error al eliminar la reseña", 404, "DataError", error);
    }

  };

  async getReviewsByRestaurant(id: string):Promise<DataCreateReviewInterface[]>{
    try{
      const result = await query("SELECT * FROM REVIEWS WHERE RESTAURANTID=$1;",[id]);
      return result.rows as DataCreateReviewInterface[]
    }catch(error){
      throw new ExpressReviewsError("Error al listar las reseñas", 404, "DataError", error);
    }
  }

};


export default new ReviewData();
