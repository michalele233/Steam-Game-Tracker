import { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/steam-context";
export default function Profile() {
  const { steamId } = useContext(SteamContext);

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  const {
    data: profileData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${steamId}`,
      ),
    queryKey: ["profile", steamId],
  });

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
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {profileData && (
        <div className="flex h-full flex-col items-center gap-4 p-4">
          <h2 className="mb-3 text-2xl">{profileData.personaname}</h2>
          <img
            src={profileData.avatarfull}
            alt="Steam avatar"
            className="mb-7 h-32 w-32 rounded-full"
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
          {profileData.lastlogoff && (
            <p>Last Online: {formatLastLogoff(profileData.lastlogoff)}</p>
          )}
        </div>
      )}
    </div>
  );
}
