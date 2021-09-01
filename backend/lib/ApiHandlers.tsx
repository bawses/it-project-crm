import { Model } from "mongoose";
import connectToDatabase from "./dbConnect";
import { Request, Response } from "express";
import { DataType } from "../../components/DataTypes";
import { Database } from "../models/DbMapping";

const REQ_FAILURE = 400;
const REQ_SUCCESS = 200;
const REQ_SUCCESS_CREATION = 201;

/* API handler for generic GET / PUT / DELETE requests on _id pages */
export async function idHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
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
          throw new Error();
        }
        return res.status(REQ_SUCCESS).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(REQ_FAILURE).json({ success: false });
      }
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const dbRecord = await dbCollection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!dbRecord) {
          throw new Error();
        }
        return res.status(REQ_SUCCESS).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(REQ_FAILURE).json({ success: false });
      }
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deleted_dbRecord = await dbCollection.deleteOne({ _id: id });
        if (!deleted_dbRecord) {
          throw new Error();
        }
        return res.status(REQ_SUCCESS).json({ success: true, data: deleted_dbRecord });
      } catch (error) {
        return res.status(REQ_FAILURE).json({ success: false });
      }
    }

    default: {
      return res.status(REQ_FAILURE).json({ success: false });
    }
  }
}

/* API handler for generic GET / POST requests on index pages */
export async function indexHandler(req: Request, res: Response, dataType: DataType): Promise<Response> {
  const { method } = req;

  await connectToDatabase();
  const dbCollection: Model<any, {}, {}> = Database[dataType];

  /* Find all the data in our database */
  switch (method) {
    case "GET": {
      try {
        const dbRecords = await dbCollection.find({});
        return res.status(REQ_SUCCESS).json({ success: true, data: dbRecords });
      } catch (error) {
        return res.status(REQ_FAILURE).json({ success: false });
      }
    }

    /* Create a new document/record in the database */
    case "POST": {
      try {
        const dbRecord = await dbCollection.create(req.body);
        return res.status(REQ_SUCCESS_CREATION).json({ success: true, data: dbRecord });
      } catch (error) {
        return res.status(REQ_FAILURE).json({ success: false });
      }
    }

    default: {
      return res.status(REQ_FAILURE).json({ success: false });
    }
  }
}
