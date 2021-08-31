import { mutate } from "swr";
import { IUser } from "../components/interfaces";
const contentType = "application/json";

/* The PUT method edits an existing entry in the mongodb database. */
export const editUser = async (id: String, userObject: IUser) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(userObject),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const { data } = await res.json();
    console.log(data);
    // return data;
    mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
  } catch (error) {
    console.log("Failed to update user");
  }
};

/* The POST method adds a new entry in the mongodb database. */
export const createUser = async (userObject: IUser) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(userObject),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
  } catch (error) {
    console.log("Failed to add user");
  }
};
