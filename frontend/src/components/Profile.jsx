import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const [{ profileData, friendList }, setSteamData] = useState({
    profileData: null,
    friendList: null,
  });
  const [steamId, setSteamId] = useState("76561198081891605"); // Przykładowy SteamID

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  const {
    data: profileInfo,
    loading: profileLoading,
    error: profileError,
  } = useFetch(
    `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${steamId}`,
  );

  useEffect(() => {
    if (profileInfo) {
      setSteamData((prevGameData) => {
        return {
          ...prevGameData,
          profileData: profileInfo.response.players[0],
        };
      });
    }
  }, [profileInfo, steamId]);

  const {
    data: friendListData,
    loading: friendLoading,
    error: friendError,
  } = useFetch(
    `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}`,
  );

  useEffect(() => {
    if (friendListData) {
      setSteamData((prevGameData) => {
        return {
          ...prevGameData,
          friendList: friendListData.friendslist.friends,
        };
      });
    }
  }, [friendListData, steamId]);

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
    <>
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
        {!friendList ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </div>
    </>
  );
}
