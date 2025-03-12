import { createContext } from "react";

const SteamContext = createContext({
  steamId: null,
  setSteamId: () => {},
  apiKey: null,
});

export default SteamContext;
