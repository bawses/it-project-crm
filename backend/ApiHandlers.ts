import { Model } from "mongoose";
import connectToDatabase from "./dbConnect";
import { Request, Response } from "express";
import { Database } from "./models/DbMapping";
import { DataType, GET, POST, PUT, DELETE } from "../lib/DataTypes";

/* API handler for [ID] pages, allowing GET / PUT / DELETE requests */
export async function idHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
  const id = req.query.id;
  const requestType = req.method;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  var dbResponse;
  try {
    switch (requestType) {
      /* Get a model by its ID */
      case GET: {
        dbResponse = await dbCollection.findById(id);
        break;
      }
      /* Edit a model by its ID */
      case PUT: {
        dbResponse = await dbCollection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        break;
      }
      /* Delete a model by its ID */
      case DELETE: {
        dbResponse = await dbCollection.deleteOne({ _id: id });
        break;
      }
      default: {
        throw new Error();
      }
    }
    if (!dbResponse) {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json({ success: true, data: dbResponse });
}

/* API handler for INDEX pages, allowing GET / POST requests */
export async function indexHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
  const requestType = req.method;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  var dbResponse;
  var successStatus: number;
  try {
    switch (requestType) {
      /* Find all the data in our database */
      case GET: {
        dbResponse = await dbCollection.find(req.body);
        successStatus = 200;
        break;
      }
      /* Create a new document/record in the database */
      case POST: {
        dbResponse = await dbCollection.create(req.body);
        successStatus = 201;
        break;
      }
      default: {
        throw new Error();
      }
    }
    if (!dbResponse) {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
  return res.status(successStatus).json({ success: true, data: dbResponse });
}
