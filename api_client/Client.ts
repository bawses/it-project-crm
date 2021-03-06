import { getSession } from "next-auth/client";
import { mutate } from "swr";
import { DataType, RequestType } from "../lib/EnumTypes";

export const getSessionId = async () => {
  let session = await getSession();
  if (session) {
    return session.user.sub;
  } else {
    return null;
  }
};

/* Makes an API call to add a new entry into the database for the given dataType */
export const createDbRecord = async <T_output>(
  dataType: DataType,
  dataObj: Object
): Promise<T_output> => {
  return await doFetch<T_output>(RequestType.POST, dataType, undefined, dataObj);
};

/* Makes an API call to search through all existing entries in the database for the given dataType */
export const searchDb = async <T_output>(
  dataType: DataType,
  searchObj: Object
): Promise<T_output[]> => {
  return await doSearch<T_output[]>(dataType, searchObj);
};

/* Makes an API call to find an existing entry in the database for the given dataType */
export const getDbRecordById = async <T_output>(
  dataType: DataType,
  recordId: string
): Promise<T_output> => {
  return await doFetch<T_output>(RequestType.GET, dataType, recordId, undefined);
};

/* Makes an API call to edit an existing entry in the database for the given dataType */
export const updateDbRecord = async <T_output>(
  dataType: DataType,
  recordId: string,
  updateObj: Object
): Promise<T_output> => {
  const data = await doFetch<T_output>(RequestType.PUT, dataType, recordId, updateObj);
  // This is an update request, update the local data without revalidation
  mutate(`/api/${dataType}s/${recordId}`, data, false);
  return data;
};

/* Makes an API call to delete an existing entry in the database for the given dataType */
export const deleteDbRecord = async <T_output>(dataType: DataType, recordId: string) => {
  await doFetch<T_output>(RequestType.DELETE, dataType, recordId, undefined);
};

const doFetch = async <T_output>(
  fetchType: RequestType,
  dataType: DataType,
  recordId?: string,
  dataObj?: Object
): Promise<T_output> => {
  var url: string = "";
  var body = dataObj ? JSON.stringify(dataObj) : undefined;

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

    console.log(url);
    console.log(body);
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
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: ${fetchType} for ${dataType}`);
    throw new Error(`Failed to do operation: ${fetchType} for ${dataType}`);
  }
  // DELETE method also generates data, but will not be the right type, thus the output should not be used
  return data as T_output;
};

const doSearch = async <T_output>(dataType: DataType, searchObj: any) => {
  let authId: string | null = await getSessionId();
  if (!authId) {
    throw new Error("No Valid Session Id!");
  }

  try {
    switch (dataType) {
      case DataType.AddedContact:
        searchObj.fromUserId = authId;
        break;
      case DataType.ManualContact:
        searchObj.ownerId = authId;
        break;
    }
  } catch (err) {
    throw new Error("searchObj is not a correct JavaScript Object");
  }

  try {
    let url = `/api/${dataType}s/search`;
    let body = JSON.stringify(searchObj);
    let response = await fetch(url, {
      method: RequestType.POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    // console.log(response);
    
    // Throw error with status code in case Fetch API call failed
    if (!response.ok) throw new Error(`${response.status}`);

    // Extract the data out of the JSON object in the form of a JavaScript object.
    var { data } = await response.json();
    if (!data) throw new Error(`${response.status}`);
  } catch (error) {
    /* If an error occurs anywhere in the process of making an API call, log it */
    console.error(error);
    console.error(`Failed to do operation: search for ${dataType}`);
    throw new Error(`Failed to do operation: search for ${dataType}`);
  }
  return data as T_output;
};

export const doUploadImage = async (imageFile: File) : Promise<string> => {
  var data = new FormData()
  data.append('profilePicture', imageFile);

  const response = await fetch('/api/upload', {
    method: "POST",
    body: data
  })

  var { imageUrl } = await response.json();
  return Promise.resolve(imageUrl);
}
