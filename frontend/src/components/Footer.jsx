export default function Footer() {
	function getYear() {
		return new Date().getFullYear();
	}
	return (
		<footer className='relative text-s text-gray-400 h-[200px]'>
			<p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
				&copy; {getYear()} Michał Pieszko
			</p>
		</footer>
	);
}
