import { useEffect, useState } from "react";

const App = () => {
	const [gameData, setGameData] = useState(null);
	const [steamId, setSteamId] = useState("76561198081891605"); // Przykładowy SteamID

	const fetchGameData = async () => {
		const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;
		const response = await fetch(
			`https://proxy.cors.sh/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
		);
		const data = await response.json();
		setGameData(data.response.players[0]);
	};

	useEffect(() => {
		fetchGameData();
	}, [steamId]);

	return (
		<div className='p-4'>
			<h1 className='text-3xl font-bold mb-4'>Steam Game Tracker</h1>
			{gameData ? (
				<div>
					<h2 className='text-xl'>{gameData.personaname}</h2>
					<img
						src={gameData.avatarfull}
						alt='Avatar'
						className='w-32 h-32 rounded-full'
					/>
					<p>{gameData.steamid}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default App;
