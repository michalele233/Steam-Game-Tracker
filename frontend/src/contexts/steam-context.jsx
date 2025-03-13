import { createContext } from "react";

const SteamContext = createContext({
  initialSteamId: null,
  apiKey: null,
  steamId: null,
  setSteamId: () => {},
});

export default SteamContext;
