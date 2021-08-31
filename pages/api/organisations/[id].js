import connectToDatabase from "../../../lib/dbConnect";
import Organisation from "../../../models/Organisation";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectToDatabase();

  switch (method) {
    /* Get a model by its ID */
    case "GET": {
      try {
        const organisation = await Organisation.findById(id);
        if (!organisation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: organisation });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const organisation = await Organisation.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!organisation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: organisation });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deletedOrganisation = await Organisation.deleteOne({ _id: id });
        if (!deletedOrganisation) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
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
