import connectToDatabase from "../../../lib/dbConnect";
import ManualContact from "../../../models/ManualContact";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET": {
      try {
        /* find all the data in our database */
        const manualContacts = await ManualContact.find({});
        res.status(200).json({ success: true, data: manualContacts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    case "POST": {
      try {
        /* create a new model in the database */
        const manualContact = await ManualContact.create(req.body);
        res.status(201).json({ success: true, data: manualContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    default: {
      res.status(400).json({ success: false });
      break;
    }
  }
}
