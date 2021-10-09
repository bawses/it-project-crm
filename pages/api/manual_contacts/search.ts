import { Request, Response } from "express";
import { getSessionId } from "../../../api_client/Client";
import { searchHandler } from "../../../backend/middleware/ApiHandlers";
import { TESTING } from "../../../backend/middleware/testing";
import { IManualContact } from "../../../lib/DataTypes";
import { DataType, RequestType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response) {
  try {
    if (!TESTING) {
      let sessionId = await getSessionId();
      if (!sessionId) throw new Error("No valid session");
      // only allow searching for your own manual contacts
      req.body.ownerId = sessionId;
    }
    var dbResponse = await searchHandler<IManualContact>(req.method as RequestType, DataType.ManualContact, req.body);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
    return;
  }
  res.status(200).json({ success: true, data: dbResponse });
}
