import { query } from "../../db";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { objStringify } from "../../utils/users.utils";
import { User, UserParams } from "../models/user.model";

export async function getUser(id: number): Promise<User | undefined> {
  try {
    return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}
export async function getUserByNameAPassword(
  username: string,
  password: string
): Promise<User | undefined> {
  try {
    return (
      await query("SELECT * FROM users WHERE username = $1 AND password = $2", [
        username,
        password,
      ])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserByName(
  username: string
): Promise<User | undefined> {
  try {
    return (await query("SELECT * FROM users WHERE username = $1;", [username]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}
export async function createUser(
  username: string,
  password: string,
  role: string
): Promise<User> {
  return (
    await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, password, role]
    )
  ).rows[0];
}

export async function getUsers(): Promise<User[]> {
  return (await query("SELECT * FROM users")).rows;
}


export async function updateUser(userId: number, data: Partial<UserParams>): Promise<User> {
  try {
    let dataStringify = objStringify(data)
    return (await query(`UPDATE users SET ${dataStringify} WHERE id = $1 RETURNING *;`, [userId])).rows[0]
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function deleteUser(userId: number) {
  try {
    return (await query("DELETE FROM users WHERE id= $1 RETURNING *;", [userId])).rows[0]
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserById(id: number) {
  try {
    const result = await query("SELECT * FROM USERS U WHERE U.ID=$1;", [id.toString()]);
    return result.rows[0]
  } catch (error) {
    throw new ExpressReviewsError("Error al conseguir cliente", 404, "DataError", error);
  }
}