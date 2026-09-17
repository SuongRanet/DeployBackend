import { Role } from "../../constants/enums";
import {
  createUserRepository,
  getUsersRepository,
  getUserByIdRepository,
  getUserByEmailRepository,
  userUpdateRepository,
  userRoleUpdateRepository,
  deleteUserRepository,
} from "./user.repository";

import argon2 from "argon2";

// export const createUserService = async (
//   name: string,
//   email: string,
//   password: string,
// ) => {
//   // Business logic

//   const existingUser = await getUserByEmailRepository(email);

//   if (existingUser) {
//     throw new Error("Email already exists");
//   }

//   return await createUserRepository(name, email, password);
// };

export const getUsersService = async () => {
  
  return await getUsersRepository();
};

export const getUserByIdService = async (id: number) => {
  const user = await getUserByIdRepository(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const userUpdateService = async (
  id: number,
  name: string,
  email: string,
  password: string | null,
  role?: Role,
) => {
  const hashedPassword = password ? await argon2.hash(password) : null;

  const user = await userUpdateRepository(id, name, email, hashedPassword);

  if (!user) {
    throw new Error("User not found");
  }
  if (role !== undefined) {
    await userRoleUpdateRepository(id, role);
  }
  return user;
};

export const userDeleteService = async (id: number) => {
  const user = await deleteUserRepository(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};