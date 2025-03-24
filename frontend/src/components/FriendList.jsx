///TODO: Dostosuj szerokosc przyciskow debilu bo za waski jest i jak bedzie 32 znaki to bedzie sie rozszerzal nie wiem czemu

import { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";

import SteamContext from "../contexts/Steam-context";
import ListControl from "./ListControl";
import ContentContainer from "../UI/ContentContainer";
import FetchError from "../UI/FetchError";
import Button from "../UI/Button";
import ImageComponent from "./ImageComponent";

export default function FriendList() {
	const [friendListPage, setFriendListPage] = useState(1);

	const { steamId, setSteamId, apiKey } = useContext(SteamContext);

	const FRIEND_PER_PAGE = 7;

	useEffect(() => {
		setFriendListPage(1);
	}, [steamId]);

	const addNameToFriendList = useCallback(
		async friends => {
			const maxFriends = friends.splice(0, 100); // Steam API only allows 100 friends per request
			const friendIds = maxFriends.map(friend => friend.steamid).join(",");
			const response = await fetch(
				`http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamids=${friendIds}`
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
		},
		[apiKey]
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
				addNameToFriendList
			),
		queryKey: ["friendList", steamId],
		retry: 0,
	});

	const friendsOnPage = friendList?.slice(
		(friendListPage - 1) * FRIEND_PER_PAGE,
		friendListPage * FRIEND_PER_PAGE
	);
	return (
		<ContentContainer className='md:h-[600px]'>
			{isPending && <p>Loading...</p>}
			{isError && <FetchError error={error} />}
			{friendsOnPage?.length > 0 && (
				<div className='flex h-full flex-col items-center p-4 pb-0'>
					<h2 className='mb-2 text-2xl'>Friend List</h2>
					<ul className='min-h-[420px]'>
						{friendsOnPage.map(friend => (
							<li
								key={friend.steamid}
								className='min-w-[300px] text-sm lg:text-base lg:min-w-[320px] py-2'>
								<Button
									className='size-full p-1.5 hover:scale-110 xs:hover:scale-125 lg:hover:scale-150 transition-transform'
									onClick={() => {
										setSteamId(friend.steamid);
									}}>
									<div className='flex items-center gap-2'>
										<ImageComponent
											src={friend.avatar}
											alt={`${friend.personaname}'s avatar`}
											className='h-8 w-8 rounded-full'></ImageComponent>
										<span>{friend.personaname}</span>
									</div>
								</Button>
							</li>
						))}
					</ul>
					{friendsOnPage?.length && (
						<ListControl
							listPage={friendListPage}
							setListPage={setFriendListPage}
							fullListLength={friendList.length}
							elementsPerPage={FRIEND_PER_PAGE}
						/>
					)}
				</div>
			)}
		</ContentContainer>
	);
}
