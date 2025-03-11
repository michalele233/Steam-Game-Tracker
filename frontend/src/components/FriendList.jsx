import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/steam-context";

export default function FriendList() {
  const [friendListPage, setFriendListPage] = useState(1);

  const { steamId, setSteamId } = useContext(SteamContext);

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  useEffect(() => {
    setFriendListPage(1);
  }, [steamId]);

  const addNameToFriendList = useCallback(
    async (friends) => {
      const fetchPromises = friends.map(async (friend) => {
        const response = await fetch(
          `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${friend.steamid}`,
        );
        if (response.ok) {
          const playerData = await response.json();
          friend.name = playerData.personaname;
        } else {
          friend.name = friend.steamid; // Fallback to SteamID if there's an error
        }
        return friend;
      });
      const updatedFriends = await Promise.all(fetchPromises);
      return updatedFriends;
    },
    [apiKey],
  );

  const { data, isPending, isError, error } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}&page=${friendListPage}`,
        addNameToFriendList,
      ),
    queryKey: ["friendList", steamId, friendListPage],
  });

  const handlePageChange = (symbol) => {
    if (symbol === "-" && friendListPage > 1) {
      setFriendListPage((prevState) => prevState - 1);
    }
    if (symbol === "+") {
      setFriendListPage((prevState) => prevState + 1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Profile is private or friend list is not public! {error.message}</p>
      )}
      {data && (
        <div className="flex flex-col items-center gap-3 p-4">
          <h2 className="mb-3 text-2xl">Friend List</h2>
          <ul className="h-85 w-80">
            {data.map((friend) => (
              <li key={friend.steamid} className="py-1">
                <button
                  className="h-full w-full rounded-md hover:cursor-pointer hover:bg-white hover:text-black"
                  onClick={() => {
                    setSteamId(friend.steamid);
                  }}
                >
                  {friend.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-8">
            <button
              className="h-7 w-7 rounded-md bg-white text-black hover:cursor-pointer"
              onClick={() => handlePageChange("-")}
            >
              ←
            </button>
            <button
              className="h-7 w-7 rounded-md bg-white text-black hover:cursor-pointer"
              onClick={() => handlePageChange("+")}
            >
              →
            </button>
          </div>
          <p>{friendListPage}</p>
        </div>
      )}
    </div>
  );
}
