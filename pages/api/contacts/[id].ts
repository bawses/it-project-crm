import { Request, Response } from "express";
import { idHandler } from "../../../backend/middleware/ApiHandlers";
import { DataType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await idHandler(req, res, DataType.AddedContact);
}
