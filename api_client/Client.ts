import { getSession } from "next-auth/client";
import { mutate } from "swr";
import { DataType, RequestType } from "../lib/DataTypes";

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async <T>(dataType: DataType, dataObj: T): Promise<T> => {
  return await doFetch<T, T>(RequestType.POST, dataType, undefined, dataObj);
};

/* Makes an API call to search through all existing entries in the database for the given dataType */
export const searchDb = async <T>(dataType: DataType, isGlobal: boolean, dataObj?: T): Promise<T[]> => {
  if (isGlobal){
    /* Do global fetch */
  }
  return await doFetch<T, T[]>(RequestType.GET, dataType, undefined, dataObj);
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async <T>(dataType: DataType, recordId: string): Promise<T> => {
  return await doFetch<T, T>(RequestType.GET, dataType, recordId, undefined);
};

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async <T>(
  dataType: DataType,
  recordId: string,
  dataObj: T
): Promise<T> => {
  return await doFetch<T, T>(RequestType.PUT, dataType, recordId, dataObj);
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async <T>(dataType: DataType, recordId: string): Promise<T> => {
  return await doFetch<T, T>(RequestType.DELETE, dataType, recordId, undefined);
};

const doFetch = async <T_input, T_output>(
  fetchType: RequestType,
  dataType: DataType,
  recordId?: string,
  dataObj?: T_input,
): Promise<T_output> => {
  var url: string = "";
  var body = dataObj ? JSON.stringify(dataObj) : undefined;

  // Get authentication Id
  const authId = await getSessionId();

  try {
    // Use the right url for each fetchType
    switch (fetchType) {
      case RequestType.POST: {
        url = `/api/${dataType}s`;
        if (dataType === DataType.User) url += "/signup";
        break;
      }
      case RequestType.GET: {
        url = `/api/${dataType}s`;
        if (recordId) url += `/${recordId}`;
        if (authId) url += `?authId=${authId}`;
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

    // Do the API call to the specified url
    console.log(url);
    console.log(dataObj);
    var response = await fetch(url, {
      method: fetchType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    
    // Throw error with status code in case Fetch API call failed
    if (!response.ok) throw new Error(`${response.status}`);

    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    if (!data) throw new Error(`${response.status}`);

    // If this is an update request, update the local data without revalidation
    if (fetchType === RequestType.PUT) {
      mutate(`/api/${dataType}s/${recordId}`, data, false);
    }
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    throw new Error(`Failed to do operation: ${fetchType} for ${dataType}`);
  }
  return data as T_output;
};

export const doRegexSearch = async <T>(dataType: DataType, regex: string) => {
  const authId = await getSessionId();
  var url = `/api/${dataType}s?search=${regex}&authId=${authId}`;

  try {
    var response = await fetch(url, {
      method: RequestType.GET,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Throw error with status code in case Fetch API call failed
    if (!response.ok) throw new Error(`${response.status}`);

    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    if (!data) throw new Error(`${response.status}`);
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: regexSearch for ${dataType}`);
    throw new Error(`Failed to do operation: regexSearch for ${dataType}`);
  }
  return data as T[];
};

// Performs a global get request
export const doGlobalFetch = async <T>(
  fetchType: RequestType,
  dataType: DataType,
  searchObj: Object,
): Promise<T[]> => {
  var url: string = "";

  try {
    if (fetchType == RequestType.POST){ // Only Accepts GET Requests
      url = `/api/${dataType}s/test`;
    }
    else{
      throw new Error("400");
    }
    
    const body = await JSON.stringify(searchObj);

    // Do the API call
    console.log(url);
    var response = await fetch(url, {
      method: fetchType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    console.log(response);
    
    // Throw error with status code in case Fetch API call failed
    if (!response.ok) throw new Error(`${response.status}`);

    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    if (!data) throw new Error(`${response.status}`);
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    throw new Error(`Failed to do operation: ${fetchType} for ${dataType}`);
  }
  return data as T[];
  
}

export const getSessionId = async () => {
  let session = await getSession();
  if (session){
    return session.user.sub;
  } else{
    return null;
  }

}
