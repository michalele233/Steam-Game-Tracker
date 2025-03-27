import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import SteamContext from "./contexts/Steam-context";

import Header from "./components/Header";
import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import OwnedGames from "./components/OwnedGames";
import RecentlyPlayedGames from "./components/RecentlyPlayedGames";
import Footer from "./components/Footer";

import Wrapper from "./UI/Wrapper";

const App = () => {
	const [steamId, setSteamId] = useState(null);
	const [initialSteamId, setInitialSteamId] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const queryClient = new QueryClient();

	useEffect(() => {
		const fetchAuthStatus = async () => {
			try {
				const response = await fetch("https://michalele23.live/auth/status", {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setSteamId(data.steamid);
					setInitialSteamId(data.steamid);
					setIsAuthenticated(data.isAuthenticated);
				}
			} catch (error) {
				console.error("Failed to fetch authentication status:", error);
			}
		};
		fetchAuthStatus();
	}, []);

	const mainClasses =
		"grid-rows-auto grid my-5 md:mt-0 w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-y-12";

	return (
		<QueryClientProvider client={queryClient}>
			<SteamContext.Provider
				value={{
					initialSteamId,
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
					<Footer />
				</Wrapper>
			</SteamContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
