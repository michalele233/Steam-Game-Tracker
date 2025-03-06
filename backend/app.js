const express = require("express");
const { fetch } = require("undici");

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

app.get("/getPlayerSummaries", async (req, res) => {
	try {
		const apiKey = req.query.key;
		const steamId = req.query.steamid;

		if (!apiKey || !steamId) {
			throw new Error("Missing required parameters: key, steamid");
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Error fetching player summaries:", error.message || error);
		res
			.status(500)
			.json({ message: "An error occurred", error: error.message });
	}
});

app.get("/getFriendList", async (req, res) => {
	try {
		const apiKey = req.query.key;
		const steamId = req.query.steamid;
		const pageNumber = req.query.page || 1;
		if (!apiKey || !steamId) {
			throw new Error("Missing required parameters: key, steamid");
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${apiKey}&steamid=${steamId}&relationship=friend`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const friends = data.friendslist.friends.slice(
			(pageNumber - 1) * 10,
			pageNumber * 10
		);
		res.json(friends);
	} catch (error) {
		console.error("Error fetching friend list:", error.message || error);
		res
			.status(500)
			.json({ message: "An error occurred", error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
