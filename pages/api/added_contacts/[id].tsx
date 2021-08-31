import connectToDatabase from "../../../lib/dbConnect";
import AddedContact from "../../../models/AddedContact";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response): Promise<void> {
  const {
    query: { id },
    method,
  } = req;

  await connectToDatabase();

  switch (method) {
    /* Get a model by its ID */
    case "GET": {
      try {
        const addedContact = await AddedContact.findById(id);
        if (!addedContact) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: addedContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const addedContact = await AddedContact.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!addedContact) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: addedContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deleted_AddedContact = await AddedContact.deleteOne({ _id: id });
        if (!deleted_AddedContact) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: {} });
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
