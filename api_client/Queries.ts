import { mutate } from "swr";
import { DataType, DataInterface, GET, POST, PUT, DELETE } from "../lib/DataTypes";

const contentType = "application/json";
const requestHeaders = {
  Accept: contentType,
  "Content-Type": contentType,
};

enum FetchType {
  DO_CREATE = "create",
  DO_GET = "get",
  DO_UPDATE = "update",
  DO_DELETE = "delete",
}

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async (dataType: DataType, dataObj: DataInterface): Promise<DataInterface | null> => {
  try {
    const response = await fetch(`/api/${dataType}s`, {
      method: POST,
      headers: requestHeaders,
      body: JSON.stringify(dataObj),
    });

    // Throw error with status code in case Fetch API request failed
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    console.log(`Failed to add ${dataType}`);
    return null;
  }
};

/* Makes an API call to get all existing entries in the database for the given dataType */
export const searchDb = async (dataType: DataType, dataObj: DataInterface): Promise<DataInterface[] | null> => {
  try {
    const response = await fetch(`/api/${dataType}s`, {
      method: GET,
      headers: requestHeaders,
      body: JSON.stringify(dataObj),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    console.log(`Failed to get ${dataType}`);
    return null;
  }
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  try {
    const response = await fetch(`/api/${dataType}s/${recordId}`, {
      method: GET,
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    console.log(`Failed to get ${dataType}`);
    return null;
  }
};

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async (
  dataType: DataType,
  recordId: string,
  dataObj: DataInterface
): Promise<DataInterface | null> => {
  try {
    const response = await fetch(`/api/${dataType}s/${recordId}`, {
      method: PUT,
      headers: requestHeaders,
      body: JSON.stringify(dataObj),
    });

    // Throw error with status code in case Fetch API req failed
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const { data } = await response.json();
    // Update the local data without a revalidation
    mutate(`/api/${dataType}s/${recordId}`, data, false);
    return data;
  } catch (error) {
    console.error(error);
    console.log(`Failed to update ${dataType}`);
    return null;
  }
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
  try {
    const response = await fetch(`/api/${dataType}s/${recordId}`, {
      method: DELETE,
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    console.log(`Failed to delete ${dataType}`);
    return null;
  }
};


async function doFetch(
  fetchType: FetchType,
  dataType: string,
  recordId: string,
  dataObj: DataInterface
): Promise<DataInterface | null> {
  var url: string = "";
  var method;
  var body = dataObj ? JSON.stringify(dataObj) : null;
  try {
    switch (fetchType) {
      case FetchType.DO_CREATE: {
        url = `/api/${dataType}s`;
        method = POST;
      }

      case FetchType.DO_GET: {
      }

      case FetchType.DO_UPDATE: {
      }

      case FetchType.DO_DELETE: {
      }
    }

    var response = await fetch(url, {
      method: POST,
      headers: requestHeaders,
      body: body,
    });

    // Throw error with status code in case Fetch API request failed
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    var { data } = await response.json();
  } catch (error) {
    console.error(error);
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    return null;
  }
  return data;
}
