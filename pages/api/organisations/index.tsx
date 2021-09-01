import Organisation from "../../../backend/models/Organisation";
import { Request, Response } from "express";
import { indexHandler } from "../../../backend/lib/apiHandler";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await indexHandler(req, res, Organisation);
}
