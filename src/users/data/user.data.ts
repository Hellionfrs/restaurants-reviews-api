import { query } from "../../db";
import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import { User } from "../models/user.model";

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
    return (await query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]))
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
  return (await query("SELECT * FROM users")).rows
}