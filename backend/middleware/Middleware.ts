import connectToDatabase from "../dbConnect";
import { getSession } from "next-auth/client";
import { mutate } from "swr";
import { DataType } from "../../lib/EnumTypes";
import { Database } from "../models/DbMapping";

export const getSessionId = async () => {
  let session = await getSession();
  if (session) {
    return session.user.sub;
  } else {
    return null;
  }
};

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async <T>(
  dataType: DataType,
  createObj: any,
) => {
  await connectToDatabase();
  const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.create(createObj);
    if (!dbResponse) throw new Error("Could not create database record");
  return dbResponse as T;
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async <T>(
  dataType: DataType,
  recordId: string,
) => {
    await connectToDatabase();
  const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.findById(recordId);    
    if (!dbResponse) throw new Error("Could not get database record");
    return dbResponse as T;
};

export const getAllDbRecords = async <T>(dataType: DataType) => {
    await connectToDatabase();
  const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.find({});
    if (!dbResponse) throw new Error("Could not get database records");
    return dbResponse as T[];
}

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async <T>(
  dataType: DataType,
  recordId: string,
  updateObj: any
) => {
    await connectToDatabase();
    const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.findByIdAndUpdate(recordId, updateObj, {
          new: true,
          runValidators: true,
    });
    if (!dbResponse) throw new Error("Could not create database record");
    return dbResponse as T;
//   // This is an update request, update the local data without revalidation
//   mutate(`/api/${dataType}s/${recordId}`, data, false);
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async (dataType: DataType, recordId: string): Promise<void> => {
    await connectToDatabase();
    const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.findByIdAndDelete(recordId);
    if (!dbResponse) throw new Error("Could not delete database record");
};

/* Makes an API call to search through all existing entries in the database for the given dataType */
export const searchDbRecords = async <T>(
    dataType: DataType,
    searchObj: any,
) => {
  await connectToDatabase();
    const dbCollection = Database[dataType];
    var dbResponse = await dbCollection.find(searchObj);
    if (!dbResponse) throw new Error("Could not search database records");
    return dbResponse as T[];
};


// export const doUploadImage = async (imageFile: File) : Promise<string> => {
//   var data = new FormData()
//   data.append('profilePicture', imageFile);

//   const response = await fetch('/api/upload', {
//     method: "POST",
//     body: data
//   })

//   var { imageUrl } = await response.json();
//   return Promise.resolve(imageUrl);
// }
