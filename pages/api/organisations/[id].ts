import { Request, Response } from "express";
import { idHandler } from "../../../backend/middleware/ApiHandlers";
import { DataType, RequestType } from "../../../lib/EnumTypes";
import { getSessionId } from "../../../backend/middleware/Middleware";
import { IOrganisation } from "../../../lib/DataTypes"
import { TESTING } from "../../../backend/middleware/testing";

export default async function handler(req: Request, res: Response) {
  try {
    if (typeof req.query.id !== "string") throw new Error();
    if (!TESTING) {
      let sessionId = await getSessionId();
      if (!sessionId) throw new Error("No valid session");
      // if (!sessionId) {
      //   sessionId = "6132318dcdb5a11c5d2e82a7"
      // }
      if (sessionId !== req.query.id) {
        throw new Error("You are not authenticated for this data");
      }
    }
    var dbResponse = await idHandler<IOrganisation>(req.method as RequestType, DataType.Organisation, req.query.id, req.body);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
    return;
  }
  res.status(200).json({ success: true, data: dbResponse });
}
