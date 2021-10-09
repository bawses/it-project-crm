import { DataType, RequestType } from "../../lib/EnumTypes";
import connectToDatabase from "../dbConnect";
import { Database } from "../models/DbMapping";
import { createDbRecord, getDbRecordById, getAllDbRecords, updateDbRecord, deleteDbRecord, searchDbRecords } from "./Middleware";

/* API handler for [ID] pages, allowing GET / PUT / DELETE requests */
export async function idHandler <T>(
  requestType: RequestType,
  dataType: DataType,
  id: string,
  updateObj: any,
) {
  var dbResponse: T | void;
  switch (requestType) {
    /* Get a model by its ID */
    case RequestType.GET: {
      dbResponse = await getDbRecordById<T>(dataType, id);
      break;
    }
    /* Edit a model by its ID */
    case RequestType.PUT: {
      dbResponse = await updateDbRecord<T>(dataType, id, updateObj);
      break;
    }
    /* Delete a model by its ID */
    case RequestType.DELETE: {
      await deleteDbRecord(dataType, id);
      break;
    }
    default: {
      throw new Error("Invalid request type. Must be GET, PUT, or DELETE.");
    }
  }
  return dbResponse;
}

/* API handler for INDEX pages, allowing GET / POST requests */
export async function indexHandler <T>(
  requestType: RequestType,
  dataType: DataType,
  createObj: any,
) {
  var dbResponse: T | T[];
    switch (requestType) {
      /* Find all the data in our database */
      case RequestType.GET: {
        dbResponse = await getAllDbRecords<T>(dataType);
        break;
      }
      /* Create a new document/record in the database *assumes no duplicates* */
      case RequestType.POST: {
        dbResponse = await createDbRecord<T>(dataType, createObj);
        break;
      }
      default: {
        throw new Error("Invalid request type. Must be GET or POST.");
      }
    }
  return dbResponse;
}

export async function searchHandler <T>(
  requestType: RequestType,
  dataType: DataType,
  searchObj: any
) {
  /* Search through all the data for this data type in the database */
  if (requestType !== RequestType.POST) {
    throw new Error("Invalid request type. Must be POST.");
  }
  var dbResponse = await searchDbRecords<T>(dataType, searchObj);
  return dbResponse;
}

export async function signUpHandler <T>(
  requestType: RequestType,
  dataType: DataType,
  signUpObj: any,
) {
  if (requestType !== RequestType.POST) {
    throw new Error("Invalid request type. Must be POST.");
  }

  await connectToDatabase();
  if (!signUpObj.email) {
    throw new Error("No email provided");
  }
  const dbCollection = Database[dataType];
  let account = await dbCollection.findOne({ email: signUpObj.email });
  if (account) {
    throw new Error("Account with email already exists");
  }

  var dbResponse = await createDbRecord<T>(dataType, signUpObj);
  return dbResponse;
}