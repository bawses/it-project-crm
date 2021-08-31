import connectToDatabase from "../../../backend/lib/dbConnect";
import User from "../../../backend/models/User";
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
        const user = await User.findById(id);
        if (!user) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
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
