export default function Wrapper({ children }) {
	return (
		<div className='flex items-center min-h-lvh overflow-hidden justify-center bg-[#250076] bg-(image:--background-gradient) text-secondary font-primary'>
			<div className='w-full h-full max-w-xs rounded-3xl bg-background bg-(image:--glass-gradient) backdrop-blur-sm my-8 shadow-background xs:max-w-md sm:max-w-[36rem] md:max-w-[42rem] lg:max-w-4xl xl:max-w-6xl p-3'>
				{children}
			</div>
		</div>
	);
}
