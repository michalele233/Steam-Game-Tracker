export default function Wrapper({ children }) {
  return (
    <div className="flex justify-center bg-[url(../background-image.png)] text-white">
      <div className="flex w-full max-w-5xl flex-col items-center gap-4 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)]">
        {children}
      </div>
    </div>
  );
}
