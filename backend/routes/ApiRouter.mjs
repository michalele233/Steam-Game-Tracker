import express from "express";

const router = express.Router();

router.get("/getPlayerSummaries", async (req, res) => {
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
		res.json(data.response.players[0]);
	} catch (error) {
		console.error("Error fetching player summaries:", error.message || error);
		res
			.status(500)
			.json({ message: "An error occurred", error: error.message });
	}
});

router.get("/getFriendList", async (req, res) => {
	try {
		const FRIEND_AMMOUNT = 8;

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
			(pageNumber - 1) * FRIEND_AMMOUNT,
			pageNumber * FRIEND_AMMOUNT
		);
		res.json(friends);
	} catch (error) {
		console.error("Error fetching friend list:", error.message || error);
		res
			.status(500)
			.json({ message: "An error occurred", error: error.message });
	}
});

export default router;
