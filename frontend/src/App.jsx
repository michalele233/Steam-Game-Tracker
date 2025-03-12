import { useEffect, useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import SteamContext from "./contexts/Steam-context";
import RecentlyPlayedGames from "./components/RecentlyPlayedGames";
import Header from "./UI/Header";
import Wrapper from "./UI/Wrapper";

const INITIAL_STEAM_ID = "76561198081891605";
const App = () => {
  const [steamId, setSteamId] = useState(INITIAL_STEAM_ID);
  const [isPublic, setIsPublic] = useState(true);
  const [apiKey] = useState(import.meta.env.VITE_APP_STEAM_API_KEY);

  const queryClient = new QueryClient();

  let mainClasses =
    "grid-rows-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-y-12";

  useEffect(() => {
    setIsPublic(true);
  }, [steamId]);
  return (
    <QueryClientProvider client={queryClient}>
      <SteamContext.Provider
        value={{
          initialSteamId: INITIAL_STEAM_ID,
          apiKey,
          steamId,
          setSteamId,
          isPublic,
          setIsPublic,
        }}
      >
        <Wrapper>
          <Header />
          <main className={mainClasses}>
            <Profile />
            <FriendList />
            {isPublic && <RecentlyPlayedGames />}
          </main>
        </Wrapper>
      </SteamContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
