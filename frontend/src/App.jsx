import { useEffect, useState } from "react";

const App = () => {
  const [{ profileData, friendList }, setSteamData] = useState({
    profileData: null,
    friendList: null,
  });
  const [steamId, setSteamId] = useState("76561198081891605"); // Przykładowy SteamID

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  const fetchProfileData = async () => {
    const response = await fetch(
      `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${steamId}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }
    const data = await response.json();
    setSteamData((prevGameData) => {
      return {
        ...prevGameData,
        profileData: data.response.players[0],
      };
    });
  };

  const fetchFriendList = async () => {
    const response = await fetch(
      `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }
    const data = await response.json();
    setSteamData((prevGameData) => {
      return {
        ...prevGameData,
        friendList: data.friendslist.friends,
      };
    });
  };

  useEffect(() => {
    fetchProfileData();
    fetchFriendList();
  }, [steamId]);

  const getPersonaState = (state) => {
    const states = [
      "Offline",
      "Online",
      "Busy",
      "Away",
      "Snooze",
      "Looking to trade",
      "Looking to play",
    ];
    return states[state];
  };

  const formatLastLogoff = (lastlogoff) => {
    const date = new Date(lastlogoff * 1000);
    return date.toLocaleString();
  };

  const getFriendName = async (steamid) => {
    const response = await fetch(
      `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${steamid}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }
    const data = await response.json();
    return data.response.players[0].personaname;
  };
  return (
    <div className="flex h-screen justify-center bg-[url(../public/background-image.png)] text-white">
      <div className="flex w-[75%] flex-col items-center gap-12 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)]">
        <h1 className="mb-4 pt-3 text-4xl font-bold">Steam Game Tracker</h1>
        <div className="flex items-center gap-15">
          {profileData ? (
            <div className="flex flex-col items-center gap-3">
              <h2 className="mb-5 text-xl">{profileData.personaname}</h2>
              <img
                src={profileData.avatarfull}
                alt="Steam avatar"
                className="mb-5 h-32 w-32 rounded-full"
              />
              <p>SteamID: {profileData.steamid}</p>
              <p>
                Profile URL:{" "}
                <a
                  href={profileData.profileurl}
                  className="underline hover:text-[#adadad]"
                >
                  Link to a steam profile!
                </a>
              </p>
              <p>Person state: {getPersonaState(profileData.personastate)}</p>
              <p>Last Online: {formatLastLogoff(profileData.lastlogoff)}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {friendList ? (
            <div className="flex flex-col items-center gap-3">
              <h2 className="mb-5 text-xl">Friend List</h2>
              <ul className="h-96 w-80 overflow-y-auto">
                {friendList.map((friend) => (
                  <li key={friend.steamid} className="mb-2">
                    {friend.steamid}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
