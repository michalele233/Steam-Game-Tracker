import express from "express";
import apiKey from "../getApiKey.js";

const apiRouter = express.Router();

class HttpError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

const handleHttpResponse = async response => {
	if (!response.ok) {
		throw new HttpError(
			`HTTP error! status: ${response.status}`,
			response.status
		);
	}
	return response.json();
};

apiRouter.get("/getPlayerSummaries", async (req, res) => {
	try {
		const steamIds = req.query.steamids;

		if (!steamIds) {
			throw new HttpError("Missing required parameters: steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamIds}`
		);

		const data = await handleHttpResponse(response);

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

apiRouter.get("/getFriendList", async (req, res) => {
	try {
		const steamId = req.query.steamid;

		if (!steamId) {
			throw new HttpError("Missing required parameters: steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${apiKey}&steamid=${steamId}&relationship=friend`
		);

		const data = await handleHttpResponse(response);
		if (data.friendslist.friends) {
			return res.json(data.friendslist.friends);
		}
		res.json(data);
	} catch (error) {
		console.error("Error fetching friend list:", error.message || error);
		res.status(error.status || 500).json({
			message: "An error occurred",
			error: error.message,
		});
	}
});

apiRouter.get("/getRecentlyPlayedGames", async (req, res) => {
	try {
		const steamId = req.query.steamid;
		const COUNT = 5; //numbers of games to display

		if (!steamId) {
			throw new HttpError("Missing required parameters: key, steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&count=${COUNT}`
		);

		const data = await handleHttpResponse(response);

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

apiRouter.get("/getOwnedGames", async (req, res) => {
	try {
		const steamId = req.query.steamid;

		if (!apiKey || !steamId) {
			throw new HttpError("Missing required parameters: steamid", 400);
		}

		const response = await fetch(
			`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`
		);

		const data = await handleHttpResponse(response);

		if (data.response && data.response.games) {
			data.response.games = data.response.games.filter(
				game => game.playtime_forever > 0
			);
			data.response.games.sort(
				(a, b) => b.playtime_forever - a.playtime_forever
			);
		}

		res.json(data.response);
	} catch (error) {
		console.error(
			"Error fetching players owned games:",
			error.message || error
		);
		res.status(error.status || 500).json({
			message: "An error occurred",
			error: error.message,
		});
	}
});
export default apiRouter;
