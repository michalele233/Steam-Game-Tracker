import { useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import SteamContext from "./contexts/steam-context";
import ContentContainer from "./components/ContentContainer";

const App = () => {
  const [steamId, setSteamId] = useState("76561198081891605");

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SteamContext.Provider
        value={{
          steamId,
          setSteamId,
        }}
      >
        <div className="flex h-dvh w-dvw justify-center bg-[url(../background-image.png)] text-white">
          <div className="flex h-full w-[75%] flex-col items-center gap-4 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)]">
            <header>
              <h1 className="mb-2 pt-3 text-4xl font-bold">
                Steam Game Tracker
              </h1>
            </header>
            <main className="flex size-full items-center justify-around">
              <ContentContainer>
                <Profile />
              </ContentContainer>
              <ContentContainer>
                <FriendList />
              </ContentContainer>
            </main>
          </div>
        </div>
      </SteamContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
