import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const { name, email, password ,role} = result.data;

    const user = await registerService(name, email, password ,role);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "Email already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { email, password } = result.data;

    const resalt = await loginService(email, password);

    return res.status(200).json({
      message: "Login successful",
      data: resalt,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return res.status(401).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Login failed",
    });
  }
};
