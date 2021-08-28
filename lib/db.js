import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	const client = await MongoClient.connect(
		"mongodb+srv://Ley:f1fy76tQZP5Q8rgE@cluster-0.9apom.mongodb.net/CRM?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}