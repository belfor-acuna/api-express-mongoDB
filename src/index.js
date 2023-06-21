import express  from "express";
import authRoutes from "./routes/auth.routes.js";
import studentRoute from "./routes/student.route.js"
import {PORT} from "./configs/environments.js";
import connectDB from "./configs/mongo.js";

const app = express();

app.use(express.json);
app.use("/auth", authRoutes);
app.use("",studentRoute);

async function startSever() {
	const isConnected = await connectDB();
	if (isConnected) {
		app.listen(PORT, () => {
			console.log(`Server started on ${PORT}`);
		});
	} else {
        console.log(`Server did not start on ${PORT}`)
		process.exit();
	}
}

startSever();