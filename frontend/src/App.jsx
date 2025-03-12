import { useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import SteamContext from "./contexts/Steam-context";
import ContentContainer from "./UI/ContentContainer";
import RecentlyPlayedGames from "./components/RecentlyPlayedGames";
import Header from "./UI/Header";
import Wrapper from "./UI/Wrapper";

const App = () => {
  const [steamId, setSteamId] = useState("76561198081891605");
  const [apiKey] = useState(import.meta.env.VITE_APP_STEAM_API_KEY);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SteamContext.Provider
        value={{
          steamId,
          setSteamId,
          apiKey,
        }}
      >
        <Wrapper>
          <Header />
          <main className="grid-rows-auto grid min-h-screen w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-32 md:gap-y-8">
            <Profile />
            <FriendList />
            <RecentlyPlayedGames />
          </main>
        </Wrapper>
      </SteamContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
