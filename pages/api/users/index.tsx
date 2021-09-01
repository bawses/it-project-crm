import { Request, Response } from "express";
import { indexHandler } from "../../../backend/lib/apiHandler";
import User from "../../../backend/models/User";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await indexHandler(req, res, User);
}
