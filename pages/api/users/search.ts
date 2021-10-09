import { Request, Response } from "express";
import { searchHandler } from "../../../backend/middleware/ApiHandlers";
import { IUser } from "../../../lib/DataTypes";
import { DataType, RequestType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response) {
  try {
    var dbResponse = await searchHandler<IUser>(req.method as RequestType, DataType.User, req.body);
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
  return res.status(200).json({ success: true, data: dbResponse });
}
