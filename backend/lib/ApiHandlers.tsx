import { get, Model } from "mongoose";
import connectToDatabase from "./dbConnect";
import { Request, Response } from "express";
import { DataType } from "../../components/DataTypes";
import { Database } from "../models/DbMapping";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

/* API handler for generic GET / PUT / DELETE requests on _id pages */
export async function idHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
  const id = req.query.id;
  const requestType = req.method;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  switch (requestType) {
    /* Get a model by its ID */
    case GET: {
      try {
        const dbRecord = await dbCollection.findById(id);
        if (!dbRecord) {
          throw new Error();
        }
        return res.status(200).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    }

    /* Edit a model by its ID */
    case PUT: {
      try {
        const dbRecord = await dbCollection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!dbRecord) {
          throw new Error();
        }
        return res.status(200).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    }

    /* Delete a model by its ID */
    case DELETE: {
      try {
        const deleted_dbRecord = await dbCollection.deleteOne({ _id: id });
        if (!deleted_dbRecord) {
          throw new Error();
        }
        return res.status(200).json({ success: true, data: deleted_dbRecord });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
}

/* API handler for generic GET / POST requests on index pages */
export async function indexHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
  const requestType = req.method;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  /* Find all the data in our database */
  switch (requestType) {
    case GET: {
      try {
        const dbRecords = await dbCollection.find({});
        return res.status(200).json({ success: true, data: dbRecords });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    }

    /* Create a new document/record in the database */
    case POST: {
      try {
        const dbRecord = await dbCollection.create(req.body);
        return res.status(201).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
}