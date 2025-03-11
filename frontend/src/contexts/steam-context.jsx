import { createContext } from "react";

const SteamContext = createContext({
  steamId: null,
  setSteamId: () => {},
});

export default SteamContext;
