import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import router from "./routes/ApiRouter.mjs";

dotenv.config({ path: "../.env" });

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
app.use(
	session({
		secret: "secret",
		saveUninitialized: false,
		resave: false,
	})
);

app.use(router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
