import ExpressReviewsError from "../../utils/error/ExpressReviewsError";
import * as userDB from "../data/user.data";
import { User, UserParams } from "../models/user.model";

export async function getUser(id: number): Promise<User | undefined> {
  try {
    return await userDB.getUser(id);
  } catch (error) {
    throw error;
  }
}

export async function createUser(data: UserParams) {
  const { username, password, role } = data;

  try {
    const user = await userDB.getUserByNameAPassword(username, password);
    if (user) {
      throw new ExpressReviewsError("usuario ya existe", 403, "service error");
    }
    const userCreated = await userDB.createUser(username, password, role);
    return userCreated;
  } catch (error) {
    throw error;
  }
}

export async function getUsers(): Promise<User[] | undefined> {
  try {
    return await userDB.getUsers()
  } catch (error) {
    throw error
  }
}
