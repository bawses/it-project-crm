import connectToDatabase from "../../../lib/dbConnect";
import User from "../../../models/User";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response): Promise<void> {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case "GET": {
      try {
        /* find all the data in our database */
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    }

    case "POST": {
      try {
        /* create a new model in the database */
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
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
