import connectToDatabase from "../../../lib/dbConnect";
import AddedContact from "../../../models/AddedContact";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response): Promise<void> {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET": {
      try {
        /* find all the data in our database */
        const addedContacts = await AddedContact.find({});
        res.status(200).json({ success: true, data: addedContacts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    case "POST": {
      try {
        /* create a new model in the database */
        const addedContact = await AddedContact.create(req.body);
        res.status(201).json({ success: true, data: addedContact });
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
