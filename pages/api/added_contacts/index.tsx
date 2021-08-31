import { Request, Response } from "express";
import { indexHandler } from "../../../backend/lib/apiHandler";
import AddedContact from "../../../backend/models/AddedContact";

export default async function handler(req: Request, res: Response): Promise<void> {
  return indexHandler(req, res, AddedContact);
}
