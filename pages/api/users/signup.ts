import { hash as hashPassword } from "bcryptjs";
import { Request, response, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";

function validateCreateObject(req: Request) : boolean{
  const {email, passwordHash} = req.body;
  if (!email || !email.includes("@") || !passwordHash || passwordHash.trim().length < 7) {
    return false;
  }
  return true;
}

async function handler(req: Request, res: Response): Promise<any> { // Change any type later
  // SignUp method has to be of method POST
  if (req.method !== "POST") {
    res.status(422).json({ error: "Request method is not POST" });
  }
  // Hash Password
  const hashedPassword = await hashPassword(req.body.passwordHash, 10);
  console.log(`After Hash Password: ${hashedPassword}`);
  req.body.passwordHash = hashedPassword;
  return await indexHandler(req, res, DataType.User, validateCreateObject);
}

export default handler;
