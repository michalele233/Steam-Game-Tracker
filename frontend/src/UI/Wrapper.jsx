export default function Wrapper({ children }) {
	return (
		<div className='flex min-h-screen justify-center bg-[#250076] bg-(image:--background-gradient) text-secondary'>
			<div className='w-full h-full max-w-md rounded-3xl bg-background bg-(image:--glass-gradient) my-8 shadow-background md:max-w-2xl lg:max-w-4xl xl:max-w-6xl	'>
				{children}
			</div>
		</div>
	);
}
