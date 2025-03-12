export default function ContentContainer({ children, className }) {
  const defaultClasses = "flex items-center justify-center";
  const combinedClasses = `${defaultClasses} ${className || ""}`;
  return <div className={combinedClasses}>{children}</div>;
}
