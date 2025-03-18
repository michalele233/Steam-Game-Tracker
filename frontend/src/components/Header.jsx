import { useContext } from "react";
import SteamContext from "../contexts/Steam-context";
import Button from "../UI/Button";

import "../css/variables.css";

export default function Header() {
	const { isAuthenticated, setIsAuthenticated, setSteamId } =
		useContext(SteamContext);

	const handleSignIn = () => {
		window.location.href = "http://localhost:3000/auth/steam";
	};

	const handleSignOut = () => {
		window.location.href = "http://localhost:3000/logout";
		setIsAuthenticated(false);
		setSteamId(null);
	};

	const buttonStyles =
		"p-3 justify-center gap-3 w-16 md:w-32 lg:w-64 rounded-md bg-secondary border-none";

	let button = (
		<Button className={buttonStyles} onClick={handleSignIn}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='32'
				height='32'
				className='rounded-full'
				viewBox='0 0 24 24'>
				<path d='M9.406 17.183c.431-1.025-.05-2.206-1.076-2.637l-1.762-.741c.331-.125.654-.182.982-.183 1.518 0 2.765 1.236 2.779 2.754.014 1.538-1.217 2.792-2.753 2.806-1.159.005-2.138-.684-2.571-1.665l1.763.741c1.027.432 2.207-.05 2.638-1.075zm-9.406-17.183v11.043l5.585 2.349c.596-.39 1.283-.599 2.046-.583l3.017-4.221c.048-2.541 2.122-4.588 4.674-4.588 2.583 0 4.678 2.094 4.678 4.677 0 2.581-2.098 4.703-4.732 4.675l-4.115 3.067-.009.004c-.012 1.962-1.593 3.558-3.561 3.577-1.777.015-3.234-1.249-3.56-2.895l-4.023-1.692v8.587h24v-24h-24zm15.322 11.857c-1.752 0-3.179-1.427-3.179-3.18 0-1.753 1.427-3.179 3.179-3.179 1.753 0 3.179 1.426 3.179 3.179s-1.425 3.18-3.179 3.18zm0-.779c1.325 0 2.401-1.077 2.401-2.401 0-1.323-1.076-2.401-2.401-2.401-1.324 0-2.401 1.078-2.401 2.401 0 1.324 1.078 2.401 2.401 2.401z' />
			</svg>
			<span className='text-black hidden md:inline'>Sign in with Steam</span>
		</Button>
	);
	if (isAuthenticated) {
		button = (
			<Button className={buttonStyles} onClick={handleSignOut}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					className='rounded-full'
					viewBox='0 0 24 24'>
					<path d='M9.406 17.183c.431-1.025-.05-2.206-1.076-2.637l-1.762-.741c.331-.125.654-.182.982-.183 1.518 0 2.765 1.236 2.779 2.754.014 1.538-1.217 2.792-2.753 2.806-1.159.005-2.138-.684-2.571-1.665l1.763.741c1.027.432 2.207-.05 2.638-1.075zm-9.406-17.183v11.043l5.585 2.349c.596-.39 1.283-.599 2.046-.583l3.017-4.221c.048-2.541 2.122-4.588 4.674-4.588 2.583 0 4.678 2.094 4.678 4.677 0 2.581-2.098 4.703-4.732 4.675l-4.115 3.067-.009.004c-.012 1.962-1.593 3.558-3.561 3.577-1.777.015-3.234-1.249-3.56-2.895l-4.023-1.692v8.587h24v-24h-24zm15.322 11.857c-1.752 0-3.179-1.427-3.179-3.18 0-1.753 1.427-3.179 3.179-3.179 1.753 0 3.179 1.426 3.179 3.179s-1.425 3.18-3.179 3.18zm0-.779c1.325 0 2.401-1.077 2.401-2.401 0-1.323-1.076-2.401-2.401-2.401-1.324 0-2.401 1.078-2.401 2.401 0 1.324 1.078 2.401 2.401 2.401z' />
				</svg>
				<span className='text-black hidden md:inline'>Sign out</span>
			</Button>
		);
	}
	return (
		<header className='flex mt-5 flex-col gap-5 items-center'>
			<h1 className='text-center text-3xl font-bold sm:text-4xl bg-(image:--background-gradient) bg-clip-text text-transparent'>
				Steam Game Tracker
			</h1>
			{button}
			<p className='text-xl text-center md:hidden'>
				{isAuthenticated
					? "Sign out clicking on a steam button!"
					: "Sign in clicking on a steam button to see your profile informations!"}
			</p>
		</header>
	);
}
