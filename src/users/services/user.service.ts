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

export async function getUserByName(name: string): Promise<User> {
  try {
    const user = await userDB.getUserByName(name);
    if (!user) {
      throw new ExpressReviewsError(
        "credenciales invalidas",
        403,
        "Error at service"
      );
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByNameAPassword(
  username: string,
  password: string
): Promise<User> {
  try {
    const user = await userDB.getUserByNameAPassword(username, password);
    if (!user) {
      throw new ExpressReviewsError(
        "credenciales invalidas",
        403,
        "Error at service"
      );
    }
    return user;
  } catch (error) {
    throw error;
  }
}
export async function createUser(data: UserParams) {
  const { username, password, role } = data;

  try {
    const user = await userDB.getUserByName(username); // By name
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
    return await userDB.getUsers();
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId: number, data: Partial<UserParams>) {
  try {
    const user = await userDB.getUser(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    const updatedUser = await userDB.updateUser(userId, data);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId: number) {
  try {
    const user = await userDB.getUser(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error");
    }
    const deletedUser = await userDB.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}
