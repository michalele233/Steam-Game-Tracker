import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import FriendListControl from "./FriendListControl";
import ContentContainer from "../UI/ContentContainer";

export default function FriendList() {
  const [friendListPage, setFriendListPage] = useState(1);

  const { steamId, setSteamId, apiKey } = useContext(SteamContext);

  useEffect(() => {
    setFriendListPage(1);
  }, [steamId]);

  const addNameToFriendList = useCallback(
    async (friends) => {
      const friendIds = friends.map((friend) => friend.steamid).join(",");
      const response = await fetch(
        `http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamids=${friendIds}`,
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    },
    [apiKey],
  );

  const {
    data: friendList,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () =>
      fetchData(
        `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}&page=${friendListPage}`,
        addNameToFriendList,
      ),
    queryKey: ["friendList", steamId, friendListPage],
  });

  return (
    <ContentContainer className="h-[600px]">
      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Profile is private or friend list is not public! {error.message}</p>
      )}
      {friendList && (
        <div className="flex h-full flex-col items-center space-y-4 p-4 pb-0">
          <h2 className="mb-2 text-2xl">Friend List</h2>
          <ul>
            {friendList.map((friend) => (
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
          {friendList && (
            <FriendListControl
              friendListPage={friendListPage}
              setFriendListPage={setFriendListPage}
              FriendListLength={friendList.length}
            />
          )}
        </div>
      )}
    </ContentContainer>
  );
}
