import { useState } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";
import SteamContext from "./contexts/steam-context";

const App = () => {
  const [steamId, setSteamId] = useState("76561198081891605");

  // Styling properties
  const backgroundStyle =
    "flex h-screen justify-center bg-[url(../background-image.png)] text-white";
  const containerStyle =
    "flex w-[75%] flex-col items-center gap-12 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)]";
  const headerStyle = "mb-4 pt-3 text-4xl font-bold";
  const innerFlexContainerStyle =
    "w-full min-h-1/3 flex items-center justify-around";

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SteamContext.Provider
        value={{
          steamId,
          setSteamId,
        }}
      >
        <div className={backgroundStyle}>
          <div className={containerStyle}>
            <h1 className={headerStyle}>Steam Game Tracker</h1>
            <div className={innerFlexContainerStyle}>
              <Profile />
              <FriendList />
            </div>
          </div>
        </div>
      </SteamContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
