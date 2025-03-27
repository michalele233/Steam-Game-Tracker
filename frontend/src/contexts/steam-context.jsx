import { createContext } from "react";

const SteamContext = createContext({
	initialSteamId: null,
	steamId: null,
	setSteamId: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

export default SteamContext;
