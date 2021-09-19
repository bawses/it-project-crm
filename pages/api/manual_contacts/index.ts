import { Request, Response } from "express";
import { indexHandler, searchHandler } from "../../../backend/ApiHandlers";
import connectToDatabase from "../../../backend/dbConnect";
import ManualContact from "../../../backend/models/ManualContact";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  
  if (req.query.owner){
    // Perform operation here that obtains all manual contacts that has the associated owner ID
    req.body = [
      {
        ownerId: req.query.owner
      }
    ]
    console.log(req.body);
    return await searchHandler(req, res, DataType.ManualContact);
  }

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
    return await searchHandler(req, res, DataType.ManualContact);
  }

  return await indexHandler(req, res, DataType.ManualContact);
}
