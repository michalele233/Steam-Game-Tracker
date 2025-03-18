export default function PersonState({ personState }) {
	const states = [
		"Offline",
		"Online",
		"Busy",
		"Away",
		"Snooze",
		"Looking to trade",
		"Looking to play",
	];
	let style;
	switch (personState) {
		case 0:
			style = "text-gray-500";
			break;
		case 1:
			style = "text-green-500";
			break;
		default:
			style = "text-yelow-500";
			break;
	}

	return (
		<p className={style}>
			<span className='font-bold text-secondary'>Person state:</span>{" "}
			{states[personState]}
		</p>
	);
}
