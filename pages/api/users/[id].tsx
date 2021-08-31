import User from "../../../backend/models/User";
import { Request, Response } from "express";
import { idHandler } from "../../../backend/lib/apiHandler";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await idHandler(req, res, User);
}
