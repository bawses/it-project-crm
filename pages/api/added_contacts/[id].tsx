import { Request, Response } from "express";
import { idHandler } from "../../../backend/lib/apiHandler";
import AddedContact from "../../../backend/models/AddedContact";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await idHandler(req, res, AddedContact);
}
