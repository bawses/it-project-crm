import connectToDatabase from "./dbConnect";
import { Request, Response } from "express";
import { Database } from "./models/DbMapping";
import { DataType, RequestType } from "../lib/EnumTypes";

/* API handler for [ID] pages, allowing GET / PUT / DELETE requests */
export async function idHandler(
  req: Request,
  res: Response,
  dataType: DataType
): Promise<Response> {
  const id = req.query.id;
  const requestType = req.method;

  await connectToDatabase();
  const dbCollection = Database[dataType];

  var dbResponse;
  try {
    switch (requestType) {
      /* Get a model by its ID */
      case RequestType.GET: {
        dbResponse = await dbCollection.findById(id);
        break;
      }
      /* Edit a model by its ID */
      case RequestType.PUT: {
        if (dataType === DataType.User || dataType === DataType.ManualContact) {
          // remove field if necessary
          if (req.body.organisation) {
            if (req.body.organisation._id === "delete") {
              req.body.organisation = undefined;
            }
          }
        }
        dbResponse = await dbCollection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        break;
      }
      /* Delete a model by its ID */
      case RequestType.DELETE: {
        dbResponse = await dbCollection.deleteOne({ _id: id });
        break;
      }
      default: {
        throw new Error("Invalid request type. Must be GET, PUT, or DELETE.");
      }
    }
    if (!dbResponse) {
      throw new Error("Error occurred in database operations.");
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(200).json({ success: true, data: dbResponse });
}

/* API handler for INDEX pages, allowing GET / POST requests */
export async function indexHandler(
  req: Request,
  res: Response,
  dataType: DataType
): Promise<Response> {
  const requestType = req.method;

  // Connect to Database and select appropriate collection for use according to datatype
  await connectToDatabase();
  const dbCollection = Database[dataType];

  var dbResponse;
  var successStatus: number;
  try {
    switch (requestType) {
      /* Find all the data in our database */
      case RequestType.GET: {
        const findObj = req.body || {};
        dbResponse = await dbCollection.find(findObj);
        successStatus = 200;
        break;
      }
      /* Create a new document/record in the database *assumes no duplicates* */
      case RequestType.POST: {
        dbResponse = await dbCollection.create(req.body);
        successStatus = 201;
        break;
      }
      default: {
        throw new Error("Invalid request type. Must be GET or POST.");
      }
    }
    if (!dbResponse) {
      throw new Error("Error occurred in database operations.");
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(successStatus).json({ success: true, data: dbResponse });
}

export async function searchHandler(
  req: Request,
  res: Response,
  dataType: DataType
): Promise<Response> {
  const requestType = req.method;

  // Connect to Database and select appropriate collection for use according to datatype
  await connectToDatabase();
  const dbCollection = Database[dataType];

  var dbResponse;
  var successStatus: number;
  try {
    /* Find all the data in our database */
    if (requestType === RequestType.POST) {
      dbResponse = await dbCollection.find(req.body);
      successStatus = 200;
    } else {
      throw new Error("Invalid request type. Must be POST.");
    }
    if (!dbResponse) {
      throw new Error("Error occurred in database operations.");
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
  return res.status(successStatus).json({ success: true, data: dbResponse });
}
