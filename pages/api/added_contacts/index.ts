import { Request, Response } from "express";
import { getSessionId } from "../../../api_client/Client";
import { indexHandler } from "../../../backend/middleware/ApiHandlers";
import { TESTING } from "../../../backend/middleware/testing";
import { IAddedContact } from "../../../lib/DataTypes";
import { DataType, RequestType } from "../../../lib/EnumTypes";

export default async function handler(req: Request, res: Response) {
  try {
    if (!TESTING) {
      let sessionId = await getSessionId();
      if (!sessionId) throw new Error("No valid session");
      // Only allow creation and get of your own added contacts
      req.body.fromUserId = sessionId;
    }

    var dbResponse = await indexHandler<IAddedContact>(req.method as RequestType, DataType.AddedContact, req.body);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
    return;
  }
  res.status(200).json({ success: true, data: dbResponse });
}
