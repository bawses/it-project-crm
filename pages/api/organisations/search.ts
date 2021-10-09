import { Request, Response } from "express";
import { searchHandler } from "../../../backend/middleware/ApiHandlers";
import { IOrganisation } from "../../../lib/DataTypes";
import { DataType, RequestType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response) {
  try {
    var dbResponse = await searchHandler<IOrganisation>(req.method as RequestType, DataType.Organisation, req.body);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
    return;
  }
  res.status(200).json({ success: true, data: dbResponse });
}
