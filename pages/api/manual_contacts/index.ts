import { Request, Response } from "express";
import { indexHandler, searchHandler } from "../../../backend/ApiHandlers";
import connectToDatabase from "../../../backend/dbConnect";
import ManualContact from "../../../backend/models/ManualContact";
import { DataType } from "../../../lib/DataTypes";

export default async function handler(req: Request, res: Response): Promise<Response> {
  console.log(req.query);
  if (req.query.authId){
    // Perform operation here that obtains all manual contacts that has the associated owner ID
    req.body = [
      {
        ownerId: req.query.authId
      }
    ]
    
    if (req.query.search) {
      req.body.concat([
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
      ])
    }
    console.log(req.body);
    return await searchHandler(req, res, DataType.ManualContact);
  }
  else if (req.method !== "GET"){
    return await indexHandler(req, res, DataType.ManualContact);
  }
  return res.status(400).json({success: false});
}
