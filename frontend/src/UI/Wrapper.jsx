export default function Wrapper({ children }) {
	return (
		<div className='flex min-h-screen justify-center bg-[#250076] bg-(image:--background-gradient) text-secondary font-primary'>
			<div className='w-full h-full max-w-md rounded-3xl bg-background bg-(image:--glass-gradient) backdrop-blur-sm my-8 shadow-background sm:max-w-[36rem] md:max-w-[42rem] lg:max-w-4xl xl:max-w-6xl	'>
				{children}
			</div>
		</div>
	);
}
