import { useEffect, useState, useCallback } from "react";

import { useFetch } from "../hooks/useFetch";

const INITIAL_STATE = {
  friendList: null,
  friendListPage: 1,
};
export default function FriendList({ steamId, setSteamId }) {
  const [{ friendList, friendListPage }, setFriendState] = useState({
    ...INITIAL_STATE,
  });

  const apiKey = import.meta.env.VITE_APP_STEAM_API_KEY;

  const addNameToFriendList = useCallback(
    async (friends) => {
      const fetchPromises = friends.map(async (friend) => {
        const response = await fetch(
          `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamid=${friend.steamid}`,
        );
        if (response.ok) {
          const playerData = await response.json();
          friend.name = playerData.response.players[0].personaname;
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

  const {
    data,
    loading: dataLoading,
    error: dataError,
  } = useFetch(
    `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}&page=${friendListPage}`,
    addNameToFriendList,
  );

  useEffect(() => {
    if (data) {
      setFriendState((prevState) => {
        return {
          ...prevState,
          friendList: [...data],
        };
      });
    }
  }, [data, steamId]);

  useEffect(() => {
    setFriendState({ ...INITIAL_STATE });
  }, [steamId]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      {dataLoading && <p>Loading...</p>}
      {dataError && <p>Profile is private or friend list is not public!</p>}
      {friendList && (
        <div className="flex flex-col items-center gap-3">
          <h2 className="mb-5 text-xl">Friend List</h2>
          <ul className="h-96 w-80 overflow-y-auto">
            {friendList.map((friend) => (
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
        </div>
      )}
    </div>
  );
}
