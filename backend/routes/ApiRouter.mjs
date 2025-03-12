import express from "express";

const router = express.Router();

class HttpError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

router.get("/getPlayerSummaries", async (req, res) => {
	try {
		const apiKey = req.query.key;
		const steamIds = req.query.steamids;

		if (!apiKey || !steamIds) {
			throw new HttpError("Missing required parameters: key, steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamIds}`
		);

		if (!response.ok) {
			throw new HttpError(
				`HTTP error! status: ${response.status}`,
				response.status
			);
		}

		const data = await response.json();
		if (data.response.players.length > 1) {
			data.response.players.sort((a, b) => {
				return steamIds.indexOf(a.steamid) - steamIds.indexOf(b.steamid);
			});
		}
		res.json(data.response.players);
	} catch (error) {
		console.error("Error fetching player summaries:", error.message || error);
		res.status(error.status || 500).json({
			message: "An error occurred",
			error: error.message,
		});
	}
});

router.get("/getFriendList", async (req, res) => {
	try {
		const FRIEND_AMMOUNT = 8;

		const apiKey = req.query.key;
		const steamId = req.query.steamid;
		const pageNumber = req.query.page || 1;
		if (!apiKey || !steamId) {
			throw new HttpError("Missing required parameters: key, steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${apiKey}&steamid=${steamId}&relationship=friend`
		);

		if (!response.ok) {
			throw new HttpError(
				`HTTP error! status: ${response.status}`,
				response.status
			);
		}

		const data = await response.json();
		const friends = data.friendslist.friends.slice(
			(pageNumber - 1) * FRIEND_AMMOUNT,
			pageNumber * FRIEND_AMMOUNT
		);
		res.json(friends);
	} catch (error) {
		console.error("Error fetching friend list:", error.message || error);
		res.status(error.status || 500).json({
			message: "An error occurred",
			error: error.message,
		});
	}
});

router.get("/getRecentlyPlayedGames", async (req, res) => {
	try {
		const apiKey = req.query.key;
		const steamId = req.query.steamid;
		const count = 5; //numbers of games to display

		if (!apiKey || !steamId) {
			throw new HttpError("Missing required parameters: key, steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&count=${count}`
		);

		if (!response.ok) {
			throw new HttpError(
				`HTTP error! status: ${response.status}`,
				response.status
			);
		}

		const data = await response.json();
		if (Object.keys(data.response).length === 0) {
			return res.json(null);
		}
		res.json(data.response);
	} catch (error) {
		console.error(
			"Error fetching players recently played games:",
			error.message || error
		);
		res.status(error.status || 500).json({
			message: "An error occurred",
			error: error.message,
		});
	}
});

export default router;
