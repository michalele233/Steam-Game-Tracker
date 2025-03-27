import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import SteamStrategy from "passport-steam";

import apiRouter from "./routes/apiRoutes.mjs";
import steamRouter from "./routes/steamAuthRoutes.mjs";
import apiKey from "../getApiKey.js";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3000;
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "https://michalele233.github.io");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(
	new SteamStrategy(
		{
			returnURL: "http://51.21.65.188:3000/auth/steam/return",
			realm: "http://51.21.65.188:3000/",
			apiKey: apiKey,
		},
		function (identifier, profile, done) {
			process.nextTick(function () {
				profile.id = identifier;
				return done(null, profile);
			});
		}
	)
);

app.use(express.json());

app.use(
	session({
		secret: "secret",
		saveUninitialized: false,
		resave: false,
		cookie: { secure: false, httpOnly: true }, //secure:true for https then add sameSite: "None" for cross-site cookies
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(apiRouter);
app.use(steamRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
