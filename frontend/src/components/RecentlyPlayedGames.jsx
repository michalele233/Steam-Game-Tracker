import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import ContentContainer from "../UI/ContentContainer";
export default function RecentlyPlayedGames() {
  const { steamId, apiKey, setIsPublic } = useContext(SteamContext);

  const {
    data: gamesData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getRecentlyPlayedGames?key=${apiKey}&steamid=${steamId}`,
      ),
    queryKey: ["recentlyPlayedGames", steamId],
  });
  useEffect(() => {
    if (!gamesData && !isPending) setIsPublic(false);
  }, [gamesData]);
  function calculateGameTime(playtime) {
    const hours = Math.floor(playtime / 60);
    const minutes = playtime % 60;

    if (hours === 0) {
      return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
    }

    if (hours === 1) {
      if (minutes === 0) {
        return `${hours} hour`;
      }
      return minutes === 1
        ? `${hours} hour ${minutes} minute`
        : `${hours} hour ${minutes} minutes`;
    }

    if (minutes === 0) {
      return `${hours} hours`;
    }

    return `${hours} hours ${minutes} minutes`;
  }
  return (
    <ContentContainer>
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {gamesData && (
        <div className="mb-8 flex flex-col items-center space-y-4">
          <h2 className="text-2xl">Recently Played Games</h2>
          {gamesData.total_count === 0 && (
            <p>No games played in the last 2 weeks</p>
          )}
          <ul>
            {gamesData.games &&
              gamesData.games.map((game) => (
                <li key={game.appid} className="py-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                      alt={game.name}
                      className="h-10 w-10"
                    />
                    <div>
                      <p>{game.name}</p>
                      <p>{`${calculateGameTime(game.playtime_2weeks)} in last two weeks`}</p>
                      <p>{`${calculateGameTime(game.playtime_forever)} in total`}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </ContentContainer>
  );
}
