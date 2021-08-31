import { hash, compare } from "bcryptjs";
import axios from "axios";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function createUser(name: string, email: string, password: string) {
  const response = await axios.post("/api/auth/signup", { name, email, password });
  const { data } = response;

  if (!data.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}
