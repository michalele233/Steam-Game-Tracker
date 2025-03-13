import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import ListControl from "./ListControl";
import ContentContainer from "../UI/ContentContainer";
import FetchError from "../UI/FetchError";
export default function OwnedGames() {
  const { steamId, apiKey } = useContext(SteamContext);
  const [ownedGamesPage, setOwnedGamesPage] = useState(1);

  const GAMES_PER_PAGE = 5;

  const {
    data: gamesData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getOwnedGames?key=${apiKey}&steamid=${steamId}`,
      ),
    queryKey: ["ownedGames", steamId],
  });

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
  const gamesOnPage = gamesData?.games?.slice(
    (ownedGamesPage - 1) * GAMES_PER_PAGE,
    ownedGamesPage * GAMES_PER_PAGE,
  );
  return (
    <ContentContainer className="md:h-[720px]">
      {isPending && <p>Loading...</p>}
      {isError && <FetchError error={error} />}
      {gamesData && (
        <div className="mb-8 flex flex-col items-center space-y-4">
          <h2 className="text-2xl">Owned Games</h2>
          {(gamesData.total_count === 0 ||
            Object.keys(gamesData).length === 0 ||
            gamesData.games.length === 0) && (
            <p className="text-center">
              No games played ever or owned games data is private!
            </p>
          )}
          {gamesOnPage && gamesOnPage?.length > 0 && (
            <ul className="min-h-[600px]">
              {gamesOnPage.map((game) => (
                <li key={game.appid} className="w-[300px]">
                  <div className="flex h-[120px] w-full items-center gap-4">
                    <img
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                      alt={game.name}
                      className="h-10 w-10"
                    />
                    <div>
                      <p>{game.name}</p>
                      <p>{`${calculateGameTime(game.playtime_forever)} in total`}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {gamesOnPage && gamesOnPage?.length > 0 && (
            <ListControl
              listPage={ownedGamesPage}
              setListPage={setOwnedGamesPage}
              listLength={gamesOnPage.length}
              elementsPerPage={GAMES_PER_PAGE}
            />
          )}
        </div>
      )}
    </ContentContainer>
  );
}
