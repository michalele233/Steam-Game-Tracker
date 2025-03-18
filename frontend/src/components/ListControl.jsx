import Button from "../UI/Button";

export default function ListControl({
	listPage,
	setListPage,
	fullListLength,
	elementsPerPage,
}) {
	const handlePageChange = symbol => {
		if (symbol === "-" && listPage > 1) {
			setListPage(prevState => prevState - 1);
		}
		if (symbol === "+") {
			setListPage(prevState => prevState + 1);
		}
	};
	const visibleStyle = "h-9 w-9 justify-center";
	const invisibleStyle = "h-9 w-9 invisible justify-center";

	const backButtonStyle = listPage > 1 ? visibleStyle : invisibleStyle;

	const forwardButtonStyle =
		elementsPerPage * listPage < fullListLength ? visibleStyle : invisibleStyle;

	return (
		<div className='mt-4 flex items-center gap-8'>
			<Button className={backButtonStyle} onClick={() => handlePageChange("-")}>
				←
			</Button>
			<p>{listPage}</p>
			<Button
				className={forwardButtonStyle}
				onClick={() => handlePageChange("+")}>
				→
			</Button>
		</div>
	);
}
