export default function ContentContainer({ children, className }) {
	const defaultClasses = "flex items-center justify-center min-h-[200px]";
	const combinedClasses = `${defaultClasses} ${className || ""}`;
	return <div className={combinedClasses}>{children}</div>;
}
