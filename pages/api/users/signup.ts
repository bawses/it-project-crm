import { hash as hashPassword } from "bcryptjs";
import connectToDatabase from "../../../backend/dbConnect";
import User from "../../../backend/models/User";
import { Request, Response } from "express";

async function handler(req: Request, res: Response): Promise<void> {
  if (req.method !== "POST") {
    res.status(422).json({ error: "Request method is not POST" });
  }

  const data = req.body;

  // Get Properties From Data Object
  const { name, email, password } = data;
  console.log(name);
  console.log(email);
  console.log(password);

  // Check for valid properties of email
  if (!email || !email.includes("@") || !password || password.trim().length < 7) {
    res.status(422).json({
      message: "Invalid input - password should also be at LEAST 7 characters long.",
    });
    return;
  }
  await connectToDatabase();

  // Find user based on email, with email being their unique key identifier
  const existingUser = await User.findOne({ email: email });
  console.log(`Existing user: ${existingUser}`);
  if (existingUser) {
    console.log("User already exists!");
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  // before hashing 
  console.log("Before Hashing");
  const hashedPassword = await hashPassword(password, 10);
  console.log(`Hash Password: ${hashedPassword}`);
  const result = await User.create({
    name: name,
    email: [email],
    passwordHash: hashedPassword,
  });

  res.status(201).json({ message: "Created user!", ok: true });
}

export default handler;
