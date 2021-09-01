import { mutate } from "swr";
import { DataType, DataInterface } from "../components/DataTypes";
import { GET, POST, PUT, DELETE } from "../backend/lib/ApiHandlers";

const contentType = "application/json";
const requestHeaders = {
  Accept: contentType,
  "Content-Type": contentType,
};

/* Makes an API call to add a new entry into the database */
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

/* Makes an API call to find an existing entry in the database */
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

/* Makes an API call to edit an existing entry in the database */
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

/* Makes an API call to delete an existing entry in the database */
export const deletedDbRecord = async (dataType: DataType, recordId: string): Promise<DataInterface | null> => {
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
    console.log(`Failed to get ${dataType}`);
    return null;
  }
};
