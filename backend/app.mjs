import express from "express";
import router from "./routes/routes.mjs";

const app = express();
const port = 3000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
