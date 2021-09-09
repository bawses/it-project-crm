import { mutate } from "swr";
import { DataType, DataInterface, RequestType } from "../lib/DataTypes";

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async (dataType: DataType, dataObj: DataInterface): Promise<DataInterface | null> => {
  return doFetch(RequestType.POST, dataType, undefined, dataObj);
};

/* Makes an API call to search through all existing entries in the database for the given dataType */
export const searchDb = async (dataType: DataType, dataObj?: DataInterface): Promise<DataInterface[] | null> => {
  return doFetch(RequestType.GET, dataType, undefined, dataObj);
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  return doFetch(RequestType.GET, dataType, recordId, undefined);
};

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async (
  dataType: DataType,
  recordId: string,
  dataObj: DataInterface
): Promise<DataInterface | null> => {
  return doFetch(RequestType.PUT, dataType, recordId, dataObj);
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  return doFetch(RequestType.DELETE, dataType, recordId, undefined);
};

export const doFetch = async (
  fetchType: RequestType,
  dataType: string,
  recordId?: string,
  dataObj?: DataInterface
): Promise<any> => {
  var url: string = "";
  var body = dataObj ?  JSON.stringify(dataObj) : undefined;
  try {
    // Use the right url for each fetchType
    switch (fetchType) {
      case RequestType.POST: {
        url = `/api/${dataType}s`;   

        if (dataType === 'user'){
          url = url.concat('/signup');
          console.log(url);
        }   
        break;
      }
      case RequestType.GET: {
        url = recordId ? `/api/${dataType}s/${recordId}` : `/api/${dataType}s`;
        break;
      }
      case RequestType.PUT: {
        url = `/api/${dataType}s/${recordId}`;
        break;
      }
      case RequestType.DELETE: {
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
    console.log(response)
    // Throw error with status code in case Fetch API call failed
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    // If this is an update request, update the local data without revalidation
    if (fetchType === RequestType.PUT) {
      mutate(`/api/${dataType}s/${recordId}`, data, false);
    }
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    return error;
  }
  return data;
};
