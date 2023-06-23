import mongoose from "mongoose";
import { MONGO_URI } from "./environments.js";

export default function connectDB() {
	return mongoose
		.connect(MONGO_URI)
		.then(async () => {
			console.log(`MongoDB connected successfully in route ${MONGO_URI}`);
			await registerModels();
			return true;
		})
		.catch((error) => {
			console.log(`MongoDB not connected. Error: ${error}`);
			return false;
		});
}

async function registerModels() {
	await import("../models/user.model.js");
	await import("../models/messages.model.js");
}
