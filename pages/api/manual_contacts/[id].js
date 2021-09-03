import connectToDatabase from "../../../lib/dbConnect";
import ManualContact from "../../../models/ManualContact";

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
        const manualContact = await ManualContact.findById(id);
        if (!manualContact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: manualContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    /* Edit a model by its ID */
    case "PUT": {
      try {
        const manualContact = await ManualContact.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!manualContact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: manualContact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }

    /* Delete a model by its ID */
    case "DELETE": {
      try {
        const deletedManualContact = await ManualContact.deleteOne({ _id: id });
        if (!deletedManualContact) {
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
