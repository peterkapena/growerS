import { UserSchema } from "./schema";
import { Request, Response } from "express";

interface Context {
  req: Request;
  res: Response;
  user: UserSchema | null;
}

export default Context;
