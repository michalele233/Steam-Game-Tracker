import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import ListControl from "./ListControl";
import ContentContainer from "../UI/ContentContainer";
import FetchError from "../UI/FetchError";

export default function FriendList() {
  const [friendListPage, setFriendListPage] = useState(1);

  const { steamId, setSteamId, apiKey } = useContext(SteamContext);

  const FRIEND_PER_PAGE = 8;

  useEffect(() => {
    setFriendListPage(1);
  }, [steamId]);

  const addNameToFriendList = useCallback(
    async (friends) => {
      const maxFriends = friends.splice(0, 100); // Steam API only allows 100 friends per request
      const friendIds = maxFriends.map((friend) => friend.steamid).join(",");
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
        `http://localhost:3000/getFriendList?key=${apiKey}&steamid=${steamId}`,
        addNameToFriendList,
      ),
    queryKey: ["friendList", steamId],
  });

  const friendsOnPage = friendList?.slice(
    (friendListPage - 1) * FRIEND_PER_PAGE,
    friendListPage * FRIEND_PER_PAGE,
  );
  return (
    <ContentContainer className="h-[620px]">
      {isPending && <p>Loading...</p>}
      {isError && <FetchError error={error} />}
      {friendsOnPage && (
        <div className="flex h-full flex-col items-center space-y-4 p-4 pb-0">
          <h2 className="mb-2 text-2xl">Friend List</h2>
          <ul className="min-h-[480px]">
            {friendsOnPage.map((friend) => (
              <li key={friend.steamid} className="min-w-[300px] py-2">
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
          {friendsOnPage?.length && (
            <ListControl
              listPage={friendListPage}
              setListPage={setFriendListPage}
              listLength={friendsOnPage.length}
              elementsPerPage={FRIEND_PER_PAGE}
            />
          )}
        </div>
      )}
    </ContentContainer>
  );
}
