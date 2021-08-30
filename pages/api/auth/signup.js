import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import Individual from "../../../models/individual";

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(422).json({ error:"Request method is not POST"});
  }

  const data = req.body;
  
  // Get Properties From Data Object
  const {name, email, password } = data;
  console.log(name);
  console.log(email);
  console.log(password);

  // Check for valid properties of email
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at LEAST 7 characters long.',
    });
    return;
  }
  const client = await connectToDatabase();

  // Find user based on email, with email being their unique key identifier
  const existingUser = await Individual.findOne({ email: email });
  console.log(`Existing user: ${existingUser}`)
  if (existingUser) {
    console.log("User already exists!");
    res.status(422).json({ message: 'User exists already!' });
    client.connection.close();
    return;
  }

  console.log("Before Hashing");
  const hashedPassword = await hashPassword(password);
  console.log(`Hash Password: ${hashedPassword}`);
  const result = await Individual.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' , ok: true});
  client.connection.close();
}

export default handler;
