import { Request, response, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/DataTypes";
import User from "../../../backend/models/User";

async function handler(req: Request, res: Response): Promise<any> {
  // SignUp method has to be of method POST
  if (req.method !== "POST") {
    res.status(422).json({ error: "Request method is not POST" });
  }

  if (req.body.email) {
    let user = await User.findOne(req.body.email);
    if (user) {
      return res.status(400).json({ success: false, error: "User with email already exists" });
    }
  }

  let response = await indexHandler(req, res, DataType.User);
  return response;
}

export default handler;
