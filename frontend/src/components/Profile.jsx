import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../util/http";
import { getCountryName } from "../util/isoCodeToCountries";

import SteamContext from "../contexts/Steam-context";
import ContentContainer from "../UI/ContentContainer";
import FetchError from "../UI/FetchError";
import Button from "../UI/Button";
import PersonState from "./PersonState";
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

	const formatLastLogoff = lastlogoff => {
		const date = new Date(lastlogoff * 1000);
		return date.toLocaleString();
	};

	return (
		<ContentContainer className='md:h-[600px]'>
			{isPending && <p>Loading...</p>}
			{isError && <FetchError error={error} />}
			{profileData && (
				<div className='flex flex-col items-center space-y-4 p-4'>
					<h2 className='mb-8 text-2xl'>{profileData[0].personaname}</h2>
					<img
						src={profileData[0].avatarfull}
						alt='Steam avatar'
						className='mb-7 h-32 w-32 rounded-full border-[1px] border-white'
					/>
					{profileData[0].realname && (
						<p>
							<span className='font-bold'>Real name:</span>{" "}
							{profileData[0].realname}
						</p>
					)}
					<p>
						<span className='font-bold'>SteamID:</span> {profileData[0].steamid}
					</p>
					{profileData[0].loccountrycode && (
						<p>
							<span className='font-bold'>Country:</span>{" "}
							{getCountryName(profileData[0].loccountrycode)}
							<img
								className='inline-block ml-2'
								src={`https://flagsapi.com/${profileData[0].loccountrycode}/flat/16.png`}></img>
						</p>
					)}
					<p className='relative'>
						<span className='font-bold'>Profile URL:</span>{" "}
						<a
							href={profileData[0].profileurl}
							className='text-primary after:content-[""] after:w-0 after:h-[2px] after:absolute after:bottom-0 after:right-0 after:bg-primary hover:after:w-[102px] after:transition-[width] 
							'>
							Link to profile!
						</a>
					</p>
					<PersonState personState={profileData[0].personastate} />
					{profileData[0].lastlogoff && (
						<p>
							<span className='font-bold'>Last Online:</span>{" "}
							{formatLastLogoff(profileData[0].lastlogoff)}
						</p>
					)}
					{steamId !== initialSteamId && (
						<Button
							className='mt-5 p-3'
							onClick={() => setSteamId(initialSteamId)}>
							Back to your profile!
						</Button>
					)}
				</div>
			)}
		</ContentContainer>
	);
}
