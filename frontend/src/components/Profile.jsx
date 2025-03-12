import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import ContentContainer from "../UI/ContentContainer";
export default function Profile() {
  const { steamId, apiKey } = useContext(SteamContext);

  const {
    data: profileData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamids=${steamId}`,
      ),
    queryKey: ["profile", steamId],
  });
  const getPersonState = (state) => {
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
    <ContentContainer className="h-[410px] md:h-[600px]">
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {profileData && (
        <div className="flex flex-col items-center space-y-4 p-4">
          <h2 className="mb-3 text-2xl">{profileData[0].personaname}</h2>
          <img
            src={profileData[0].avatarfull}
            alt="Steam avatar"
            className="mb-7 h-32 w-32 rounded-full"
          />
          <p>SteamID: {profileData[0].steamid}</p>
          <p>
            Profile URL:{" "}
            <a
              href={profileData[0].profileurl}
              className="underline hover:text-[#adadad]"
            >
              Link to profile!
            </a>
          </p>
          <p>Person state: {getPersonState(profileData[0].personastate)}</p>
          {profileData[0].lastlogoff && (
            <p>Last Online: {formatLastLogoff(profileData[0].lastlogoff)}</p>
          )}
        </div>
      )}
    </ContentContainer>
  );
}
