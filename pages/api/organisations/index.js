import dbConnect from "../../../lib/dbConnect";
import Organisation from "../../../models/Organisation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        /* find all the data in our database */
        const organisations = await Organisation.find({});
        res.status(200).json({ success: true, data: organisations });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    case "POST": {
      try {
        /* create a new model in the database */
        const organisation = await Organisation.create(req.body);
        res.status(201).json({ success: true, data: organisation });
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
