import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import SteamStrategy from "passport-steam";
import cors from "cors";

import apiRouter from "./routes/apiRoutes.mjs";
import steamRouter from "./routes/steamAuthRoutes.mjs";
import getApiKey from "./getApiKey.js";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3000;

let apiKey;

app.set("trust proxy", 1);

// Funkcja do inicjalizacji klucza API
async function initializeApiKey() {
	try {
		apiKey = await getApiKey();
	} catch (error) {
		console.error("Failed to fetch API Key:", error.message);
		throw new Error("API Key initialization failed");
	}
}

app.use(
	cors({
		origin: "https://michalele233.github.io",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// Middleware JSON
app.use(express.json());

// Middleware sesji
app.use(
	session({
		secret: "secret",
		saveUninitialized: false,
		resave: false,
		cookie: { secure: true, httpOnly: true, sameSite: "none" },
	})
);

app.use((req, res, next) => {
	console.log("X-Forwarded-Proto:", req.headers["x-forwarded-proto"]);
	console.log("Host:", req.headers["host"]);
	console.log("Cookies:", req.headers["cookie"]);
	console.log("Session ID:", req.sessionID);
	console.log("Session data:", req.session);
	next();
});

// Konfiguracja Passport.js
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

// Inicjalizacja klucza API i Passport.js
(async () => {
	try {
		await initializeApiKey(); // Inicjalizacja klucza API

		// Konfiguracja strategii Steam
		passport.use(
			new SteamStrategy(
				{
					returnURL: "https://michalele23.live/auth/steam/return",
					realm: "https://michalele23.live/",
					apiKey: apiKey, // Użycie zainicjalizowanego klucza API
				},
				function (identifier, profile, done) {
					process.nextTick(function () {
						profile.id = identifier;
						return done(null, profile);
					});
				}
			)
		);

		// Inicjalizacja Passport.js
		app.use(passport.initialize());
		app.use(passport.session());

		// Routing
		app.use(apiRouter);
		app.use(steamRouter);

		// Uruchomienie serwera
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("Failed to initialize application:", error.message);
		process.exit(1); // Zakończ aplikację, jeśli inicjalizacja się nie powiedzie
	}
})();
