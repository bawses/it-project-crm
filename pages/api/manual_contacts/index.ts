import { Request, Response } from "express";
import { indexHandler, searchHandler } from "../../../backend/ApiHandlers";
import connectToDatabase from "../../../backend/dbConnect";
import ManualContact from "../../../backend/models/ManualContact";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  return await indexHandler(req, res, DataType.ManualContact);
}
