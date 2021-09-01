import { Request, Response } from "express";
import { idHandler } from "../../../backend/lib/apiHandler";
import Organisation from "../../../backend/models/Organisation";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await idHandler(req, res, Organisation);
}
