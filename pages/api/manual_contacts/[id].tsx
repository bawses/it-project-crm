import { Request, Response } from "express";
import { idHandler } from "../../../backend/lib/apiHandler";
import ManualContact from "../../../backend/models/ManualContact";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await idHandler(req, res, ManualContact);
}
