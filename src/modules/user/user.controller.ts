import { Request, Response } from "express";
import {
  // createUserService,
  getUserByIdService,
  getUsersService,
  userUpdateService,
} from "./user.service";
import { updateSchema } from "./user.schema";
import { deleteUserRepository } from "./user.repository";

export const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(Number(id));
    res.json({
      data: user,
      message: `User by id ${id}`,
    });
  } catch (error) {}
};

export const list = async (req: Request, res: Response) => {
  try {
    const user = await getUsersService();
    res.status(200).json({
      data: user,
      message: "all user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
// export const create = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const user = await createUserService(name, email, password);

//     res.status(201).json({
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to create user",
//     });
//   }
// };
export const update = async (req: Request, res: Response) => {
  try {
    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { name, email, password, role } = result.data;
    const id = Number(req.params.id);
    const user = await userUpdateService(id, name, email, password, role);

    return res.status(200).json({
      message: "Update success",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const Delete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await deleteUserRepository(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete Success",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
