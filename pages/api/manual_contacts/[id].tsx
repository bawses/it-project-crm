import connectToDatabase from "../../../backend/lib/dbConnect";
import ManualContact from "../../../backend/models/ManualContact";
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
        const manualContact = await ManualContact.findById(id);
        if (!manualContact) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: manualContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const manualContact = await ManualContact.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!manualContact) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: manualContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deletedManualContact = await ManualContact.deleteOne({ _id: id });
        if (!deletedManualContact) {
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
