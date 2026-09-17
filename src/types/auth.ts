import { Request } from "express";

export interface AuthUser {
  id: number;
  email: string;
  role?: number;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}