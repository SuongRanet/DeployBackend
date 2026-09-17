import {
  getUserByEmailRepository,
  loginRepository,
  registerRepository,
} from "./auth.repository";
import argon2 from "argon2";
import {
  assignRoleRepository,
  getRoleByNameRepository,
} from "./role.repository";
import jwt from "jsonwebtoken";

// register
export const registerService = async (
  name: string,
  email: string,
  password: string,
  role: number | null | undefined,
) => {
  const existingUser = await getUserByEmailRepository(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const user = await registerRepository(name, email, hashedPassword);

  const normalRole = await getRoleByNameRepository(role ?? undefined);

  await assignRoleRepository(user.id, normalRole.id);

  return user;
};

// login Service
export const loginService = async (email: string, password: string) => {
  const user = await loginRepository(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await argon2.verify(user.password, password);

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
