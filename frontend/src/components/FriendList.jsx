import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/steam-context";
import FriendListControl from "./FriendListControl";

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
          friend.personaname = playerData.personaname;
          friend.avatar = playerData.avatar;
          friend.lastlogoff = playerData.lastlogoff;
          friend.personastate = playerData.personastate;
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

  return (
    <>
      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Profile is private or friend list is not public! {error.message}</p>
      )}
      {data && (
        <>
          <div className="flex h-full flex-col items-center gap-2 p-4 pb-0">
            <h2 className="mb-2 text-2xl">Friend List</h2>
            <ul className="h-120 w-60">
              {data.map((friend) => (
                <li key={friend.steamid} className="py-2">
                  <button
                    className="size-full rounded-md p-1.5 hover:cursor-pointer hover:bg-white hover:text-black"
                    onClick={() => {
                      setSteamId(friend.steamid);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={friend.avatar}
                        alt="Steam avatar"
                        className="h-8 w-8 rounded-full"
                      ></img>
                      <span>{friend.personaname}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {data && (
              <FriendListControl
                friendListPage={friendListPage}
                setFriendListPage={setFriendListPage}
                FriendListLength={data.length}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
