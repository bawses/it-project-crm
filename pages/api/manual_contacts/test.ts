import { Request, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  if (req.method == "POST"){
    req.method = "GET";
    return await indexHandler(req, res, DataType.ManualContact);
  }
  return res.status(400).json({success: false});
}