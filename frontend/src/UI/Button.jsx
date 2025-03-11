export default function Button({ children, className, ...props }) {
  const defaultClasses = "rounded-md hover:cursor-pointer";
  const combinedClasses = `${defaultClasses} ${className || ""}`;
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
