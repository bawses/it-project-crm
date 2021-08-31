import { Request, Response } from "express";
import { indexHandler } from "../../../backend/lib/apiHandler";
import Organisation from "../../../backend/models/Organisation";

export default async function handler(req: Request, res: Response): Promise<void> {
  return indexHandler(req, res, Organisation);
}
