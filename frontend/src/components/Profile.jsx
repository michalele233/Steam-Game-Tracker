import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";
import { getCountryName } from "../util/isoCodeToCountries";

import SteamContext from "../contexts/steam-context";
import ContentContainer from "../UI/ContentContainer";
import FetchError from "../UI/FetchError";
import Button from "../UI/Button";
export default function Profile() {
	const { initialSteamId, steamId, setSteamId, apiKey } =
		useContext(SteamContext);

	const {
		data: profileData,
		isPending,
		isError,
		error,
	} = useQuery({
		queryFn: () =>
			fetchData(
				`http://localhost:3000/getPlayerSummaries?key=${apiKey}&steamids=${steamId}`
			),
		queryKey: ["profile", steamId],
	});
	const getPersonState = state => {
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

	const formatLastLogoff = lastlogoff => {
		const date = new Date(lastlogoff * 1000);
		return date.toLocaleString();
	};

	return (
		<ContentContainer className='h-[410px] md:h-[600px]'>
			{isPending && <p>Loading...</p>}
			{isError && <FetchError error={error} />}
			{profileData && (
				<div className='flex flex-col items-center space-y-4 p-4'>
					<h2 className='mb-8 text-2xl'>{profileData[0].personaname}</h2>
					<img
						src={profileData[0].avatarfull}
						alt='Steam avatar'
						className='mb-7 h-32 w-32 rounded-full'
					/>
					{profileData[0].realname && (
						<p>Real name: {profileData[0].realname}</p>
					)}
					<p>SteamID: {profileData[0].steamid}</p>
					{profileData[0].loccountrycode && (
						<p>Country: {getCountryName(profileData[0].loccountrycode)}</p>
					)}
					<p>
						Profile URL:{" "}
						<a
							href={profileData[0].profileurl}
							className='underline hover:text-[#adadad]'>
							Link to profile!
						</a>
					</p>
					<p>Person state: {getPersonState(profileData[0].personastate)}</p>
					{profileData[0].lastlogoff && (
						<p>Last Online: {formatLastLogoff(profileData[0].lastlogoff)}</p>
					)}
					{steamId !== initialSteamId && (
						<Button
							className='mt-5 bg-white p-3 text-black'
							onClick={() => setSteamId(initialSteamId)}>
							Back to your profile!
						</Button>
					)}
				</div>
			)}
		</ContentContainer>
	);
}
