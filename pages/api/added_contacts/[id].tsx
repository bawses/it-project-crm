import { Request, Response } from "express";
import { idHandler } from "../../../backend/lib/ApiHandlers";
import { DataType } from "../../../components/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await idHandler(req, res, DataType.AddedContact);
}
