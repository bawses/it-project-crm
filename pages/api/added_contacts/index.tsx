import { Request, Response } from "express";
import { indexHandler } from "../../../backend/lib/ApiHandlers";
import { DataType } from "../../../components/DataTypes";

export default async function handler(req: Request, res: Response): Promise<void> {
  return await indexHandler(req, res, DataType.AddedContact);
}
