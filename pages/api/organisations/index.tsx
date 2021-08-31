import connectToDatabase from "../../../backend/lib/dbConnect";
import Organisation from "../../../backend/models/Organisation";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response): Promise<void> {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case "GET": {
      try {
        /* find all the data in our database */
        const organisations = await Organisation.find({});
        res.status(200).json({ success: true, data: organisations });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    case "POST": {
      try {
        /* create a new model in the database */
        const organisation = await Organisation.create(req.body);
        res.status(201).json({ success: true, data: organisation });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    default: {
      res.status(400).json({ success: false });
      return;
    }
  }
}
