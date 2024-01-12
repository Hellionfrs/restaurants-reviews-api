import { NextFunction, Request, Response } from "express";
import * as restaurantService from "../services/restaurant.service";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";

export async function getRestaurants(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const restaurant = await restaurantService.getRestaurants();
    res
      .status(200)
      .json({ ok: true, message: "Lista de restaurantes", data: restaurant });
  } catch (error) {
    if (error instanceof ExpressReviewsError) {
      next(error);
    } else {
      next(
        new ExpressReviewsError(
          "Error al obtener lista de restaurantes",
          500,
          "ControllerError",
          error
        )
      );
    }
  }
}

export async function createRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dataRestaurant = req.body;
    const restaurantId = await restaurantService.getRestaurantIdByData(
      dataRestaurant
    );
    if (restaurantId) {
      next(
        new ExpressReviewsError(
          "El restaurante ya existe",
          418,
          "ControllerError",
          Error
        )
      );
    }
    const newRestaurant = await restaurantService.createRestaurant(
      dataRestaurant
    );
    res.status(201).json({
      ok: true,
      message: "Restaurante creado exitosamente",
      data: newRestaurant,
    });
  } catch (error) {
    if (error instanceof ExpressReviewsError) {
      next(error);
    } else {
      next(
        new ExpressReviewsError(
          "No se pudo añadir el nuevo restaurante",
          500,
          "ControllerError",
          error
        )
      );
    }
  }
}

export async function updateRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const restaurantId = req.params["id"];
    const restaurant = await restaurantService.getRestaurantById(
      parseInt(restaurantId)
    );

    if (!restaurant) {
      next(
        new ExpressReviewsError(
          "El restaurante no existe",
          500,
          "ControllerError",
          Error
        )
      );
    }

    const dataRestaurant = req.body;
    const updatedRestaurant = await restaurantService.updateRestaurant(
      dataRestaurant,
      parseInt(restaurantId)
    );

    res.status(201).json({
      ok: true,
      message: "Restaurante actualizado exitosamente",
      data: updatedRestaurant,
    });
  } catch (error) {
    if (error instanceof ExpressReviewsError) {
      next(error);
    } else {
      next(
        new ExpressReviewsError(
          "El restaurante no se pudo actualizar ",
          500,
          "ControllerError",
          error
        )
      );
    }
  }
}

export async function deleteRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const restaurantId = req.params["id"];
    const restaurant = await restaurantService.getRestaurantById(
      parseInt(restaurantId)
    );

    if (!restaurant) {
      next(
        new ExpressReviewsError(
          "El restaurante no existe",
          500,
          "ControllerError",
          Error
        )
      );
    }

    const deletedRestaurant = await restaurantService.deleteRestaurant(
      parseInt(restaurantId)
    );

    res.status(200).json({
      ok: true,
      message: "Restaurante eliminado exitosamente",
      data: deletedRestaurant,
    });
  } catch (error) {
    if (error instanceof ExpressReviewsError) {
      next(error);
    } else {
      next(
        new ExpressReviewsError(
          "El restaurante no se pudo eliminar ",
          500,
          "ControllerError",
          error
        )
      );
    }
  }
}
