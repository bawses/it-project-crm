import { Request, Response } from "express";
import { indexHandler, searchHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  if (req.query.search) {
    req.body = [
      {
        "name.firstName": {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        "name.lastName": {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
    return await searchHandler(req, res, DataType.User);
  }
  return await indexHandler(req, res, DataType.User);
}
