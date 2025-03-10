import { useState } from "react";

import Profile from "./components/Profile";
import FriendList from "./components/FriendList";

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

  return (
    <div className={backgroundStyle}>
      <div className={containerStyle}>
        <h1 className={headerStyle}>Steam Game Tracker</h1>
        <div className={innerFlexContainerStyle}>
          <Profile steamId={steamId}></Profile>
          <FriendList steamId={steamId} setSteamId={setSteamId}></FriendList>
        </div>
      </div>
    </div>
  );
};

export default App;
