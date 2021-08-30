import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export async function connectToDatabase() {
	const client = await mongoose.connect(
		`${process.env.MONGO_URI}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}