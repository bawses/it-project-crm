import { Request, Response } from "express";
import { searchHandler } from "../../../backend/middleware/ApiHandlers";
import { DataType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await searchHandler(req, res, DataType.AddedContact);
}
