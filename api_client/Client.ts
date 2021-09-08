import { mutate } from "swr";
import { DataType, DataInterface, GET, POST, PUT, DELETE } from "../lib/DataTypes";

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async (dataType: DataType, dataObj: DataInterface): Promise<DataInterface | null> => {
  return doFetch(POST, dataType, undefined, dataObj);
};

/* Makes an API call to search through all existing entries in the database for the given dataType */
export const searchDb = async (dataType: DataType, dataObj: DataInterface): Promise<DataInterface[] | null> => {
  return doFetch(GET, dataType, undefined, dataObj);
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  return doFetch(GET, dataType, recordId, undefined);
};

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async (
  dataType: DataType,
  recordId: string,
  dataObj: DataInterface
): Promise<DataInterface | null> => {
  return doFetch(PUT, dataType, recordId, dataObj);
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  return doFetch(DELETE, dataType, recordId, undefined);
};

async function doFetch(fetchType: string, dataType: string, recordId?: string, dataObj?: DataInterface): Promise<any> {
  var url: string = "";
  var body = dataObj ? JSON.stringify(dataObj) : undefined;
  try {
    // Use the right url for each fetchType
    switch (fetchType) {
      case POST: {
        url = `/api/${dataType}s`;
        break;
      }
      case GET: {
        if (recordId) {
          url = `/api/${dataType}s/${recordId}`;
        } else {
          url = `/api/${dataType}s`;
        }
        break;
      }
      case PUT: {
        url = `/api/${dataType}s/${recordId}`;
        break;
      }
      case DELETE: {
        url = `/api/${dataType}s/${recordId}`;
        break;
      }
      default: {
        throw new Error("400");
      }
    }

    // Do the API call
    var response = await fetch(url, {
      method: fetchType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    // Throw error with status code in case Fetch API call failed
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    // If this is an update request, update the local data without revalidation
    if (fetchType === PUT) {
      mutate(`/api/${dataType}s/${recordId}`, data, false);
    }
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    // console.error(`Object`)
    return null;
  }
  return data;
}
