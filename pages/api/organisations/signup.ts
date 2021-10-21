import { Request, Response } from "express";
import { indexHandler } from "../../../backend/ApiHandlers";
import { DataType } from "../../../lib/EnumTypes";
import Organisation from "../../../backend/models/Organisation";
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
    let organisation = await Organisation.findOne({ email: req.body.email });
    if (organisation) {
      throw new Error("Organisation with email already exists");
    }
    var response = await indexHandler(req, res, DataType.Organisation);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
  return response;
}

export default handler;