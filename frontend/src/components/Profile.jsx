import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Profile({ steamId }) {
  const [profileData, setSteamData] = useState(null);

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
      setSteamData(profileInfo.response.players[0]);
    }
  }, [profileInfo, steamId]);

  useEffect(() => {
    setSteamData(null);
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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      {profileLoading && <p>Loading...</p>}
      {profileError && <p>Error: {profileError}</p>}
      {profileData && (
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
      )}
    </div>
  );
}
