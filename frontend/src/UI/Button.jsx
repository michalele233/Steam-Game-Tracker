export default function Button({ children, className, ...props }) {
	const defaultClasses =
		"flex items-center text-black rounded-md hover:cursor-pointer border-[1px] border-white bg-primary hover:bg-primary-light transition-colors duration-300";
	const combinedClasses = `${defaultClasses} ${className || ""}`;
	return (
		<button className={combinedClasses} {...props}>
			{children}
		</button>
	);
}
