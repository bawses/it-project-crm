import { Request, response, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";

async function handler(req: Request, res: Response): Promise<any> { // Change any type later
  // SignUp method has to be of method POST
  if (req.method !== "POST") {
    res.status(422).json({ error: "Request method is not POST" });
  }

  let response = await indexHandler(req, res, DataType.User);
  return response;
}

export default handler;
