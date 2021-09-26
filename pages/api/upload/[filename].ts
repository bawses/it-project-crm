import { Request, Response } from "express";
import mongoose from "mongoose";
import connectToDatabase from "../../../backend/dbConnect";
import Grid from "gridfs-stream";

export default async function handler(req: Request, res: Response): Promise<any> {
  let conn = await connectToDatabase();
  let gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
  try{
    const file = await gfs.files.findOne({filename: req.params.filename});
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch(error){
    res.send("Image Not Found!");
  }
}
