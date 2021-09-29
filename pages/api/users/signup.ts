import { Request, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/EnumTypes";
import User from "../../../backend/models/User";
import connectToDatabase from "../../../backend/dbConnect";

async function handler(req: Request, res: Response): Promise<any> {
  // SignUp method has to be of method POST
  if (req.method !== "POST") {
    res.status(422).json({ error: "Request method is not POST" });
  }

  try {
    await connectToDatabase();
    if (!req.body.email) {
      throw new Error("No email provided");
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User with email already exists");
    }
    var response = await indexHandler(req, res, DataType.User);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
  return response;
}

export default handler;
