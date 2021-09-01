import { Model } from "mongoose";
import connectToDatabase from "./DbConnect";
import { Request, Response } from "express";
import { DataType } from "../../components/DataTypes";
import { Database } from "../models/DbMapping";

/* API handler for generic GET / PUT / DELETE requests on _id pages */
export async function idHandler(req: Request, res: Response, dataType: DataType): Promise<void> {
  const {
    query: { id },
    method,
  } = req;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  switch (method) {
    /* Get a model by its ID */
    case "GET": {
      try {
        const dbRecord = await dbCollection.findById(id);
        if (!dbRecord) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: dbRecord });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const dbRecord = await dbCollection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!dbRecord) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: dbRecord });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deleted_dbRecord = await dbCollection.deleteOne({ _id: id });
        if (!deleted_dbRecord) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    default: {
      res.status(400).json({ success: false });
      return;
    }
  }
}

/* API handler for generic GET / POST requests on index pages */
export async function indexHandler(req: Request, res: Response, dataType: DataType): Promise<void> {
  const { method } = req;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  /* Find all the data in our database */
  switch (method) {
    case "GET": {
      try {
        const dbRecords = await dbCollection.find({});
        res.status(200).json({ success: true, data: dbRecords });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Create a new document/record in the database */
    case "POST": {
      try {
        const dbRecord = await dbCollection.create(req.body);
        res.status(201).json({ success: true, data: dbRecord });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    default: {
      res.status(400).json({ success: false });
      return;
    }
  }
}
