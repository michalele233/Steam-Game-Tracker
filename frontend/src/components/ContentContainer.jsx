export default function ContentContainer({ children }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3">
      {children}
    </div>
  );
}
