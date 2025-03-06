import { useEffect, useState, useCallback } from "react";

import { useFetch } from "../hooks/useFetch";
export default function FriendList({ steamId, setSteamId }) {
  const [friendList, setFriendList] = useState(null);
  const [friendListPage, setFriendListPage] = useState(1);

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  const addNameToFriendList = useCallback(
    async (friends) => {
      for (const friend of friends) {
        const response = await fetch(
          `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${friend.steamid}`,
        );
        if (response.ok) {
          const playerData = await response.json();
          friend.name = playerData.response.players[0].personaname;
        } else {
          friend.name = friend.steamid; // Fallback to SteamID if there's an error
        }
      }
      return friends;
    },
    [apiKey],
  );

  const {
    data: friendListData,
    loading: friendLoading,
    error: friendError,
  } = useFetch(
    `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}&page=${friendListPage}`,
    addNameToFriendList,
  );

  useEffect(() => {
    if (friendListData) {
      setFriendList(friendListData);
    }
  }, [friendListData, steamId]);
  return (
    <>
      {friendLoading && <p>Loading...</p>}
      {friendError && <p>Error: {friendError}</p>}
      {friendList && (
        <div className="flex flex-col items-center gap-3">
          <h2 className="mb-5 text-xl">Friend List</h2>
          <ul className="h-96 w-80 overflow-y-auto">
            {friendList.map((friend) => (
              <li key={friend.steamid} className="mb-2">
                <button onClick={() => setSteamId(friend.steamid)}>
                  {friend.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
