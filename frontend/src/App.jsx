import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import SteamContext from "./contexts/steam-context";
import RecentlyPlayedGames from "./components/RecentlyPlayedGames";
import OwnedGames from "./components/OwnedGames";

import Header from "./UI/Header";
import Wrapper from "./UI/Wrapper";

const App = () => {
	const [steamId, setSteamId] = useState(null);
	const [initialSteamId, setInitialSteamId] = useState(null);
	const [apiKey] = useState(import.meta.env.VITE_APP_STEAM_API_KEY);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const queryClient = new QueryClient();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const steamid = urlParams.get("steamid");
		const authenticated = urlParams.get("isAuthenticated");

		if (steamid && authenticated) {
			setSteamId(steamid);
			setInitialSteamId(steamid);
			setIsAuthenticated(true);
		}
	}, []);

	const mainClasses =
		"grid-rows-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-y-12";

	return (
		<QueryClientProvider client={queryClient}>
			<SteamContext.Provider
				value={{
					initialSteamId,
					apiKey,
					steamId,
					setSteamId,
					isAuthenticated,
					setIsAuthenticated,
				}}>
				<Wrapper>
					<Header />
					{isAuthenticated && (
						<main className={mainClasses}>
							<Profile />
							<FriendList />
							<RecentlyPlayedGames />
							<OwnedGames />
						</main>
					)}
				</Wrapper>
			</SteamContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
