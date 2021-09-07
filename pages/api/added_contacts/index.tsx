import { Request, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../components/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await indexHandler(req, res, DataType.AddedContact);
}
