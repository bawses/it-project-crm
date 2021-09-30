import { Request, Response } from "express";
import upload from "../../../backend/uploadToDb";

function runUpload(req: Request, res: Response, fn: Function): Promise<any>{
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error){
        return reject(result);
      }
      return resolve(result);
    })
  })
}

export default async function handler(req: Request, res: Response): Promise<Response> {
  if (req.method !== "POST"){
    return res.status(400).send("Only accepting POST requests.")
  }
  
  await runUpload(req, res, upload.single("file"));

  if (req.file === undefined) return res.status(400).send("You must send through a file");

  const imgURI = `http://localhost:3000/file/${req.file.filename}`;
  return res.send(imgURI);
}
