import { mutate } from "swr";
import { DataType, DataInterface } from "../components/DataTypes";
import { Database } from "../backend/models/DbMapping";

const contentType = "application/json";

/* The POST method adds a new entry in the mongodb database. */
export const createDbRecord = async (dataType: DataType, dataObj: DataInterface) => {
  try {
    const res = await fetch(`/api/${dataType}s`, {
      method: "POST",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(dataObj),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
  } catch (error) {
    console.log(`Failed to add ${dataType}`);
  }
};

export const getDbRecordById = async (dataType: DataType, recordId: string) => {
  const dbCollection = Database[dataType];
  try {
    const dbRecord = await dbCollection.findById(recordId);
    if (!dbRecord) {
      // res.status(400).json({ success: false });
      /* Error status 400 */
      return null;
    }
    // res.status(200).json({ success: true, data: dbRecord });
    return dbRecord;
  } catch (error) {
    // res.status(400).json({ success: false });
    return null;
  }
  return;
};

/* The PUT method edits an existing entry in the mongodb database. */
export const updateDbRecord = async (dataType: DataType, recordId: string, dataObj: DataInterface) => {
  try {
    const res = await fetch(`/api/${dataType}s/${recordId}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(dataObj),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const { data } = await res.json();
    console.log(data);
    // return data;
    mutate(`/api/${dataType}s/${recordId}`, data, false); // Update the local data without a revalidation
  } catch (error) {
    console.log("Failed to update user");
  }
};
