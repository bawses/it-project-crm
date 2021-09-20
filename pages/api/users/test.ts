import { Request, Response } from "express";
import { indexHandler, searchHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  if (req.method == "POST"){
    req.method = "GET";
    console.log(req);
    return await indexHandler(req, res, DataType.User);
  }
  return res.status(400).json({success: false});
}