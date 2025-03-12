import { useContext } from "react";
import SteamContext from "../contexts/Steam-context";

export default function Wrapper({ children }) {
  const { isPublic } = useContext(SteamContext);
  console.log(isPublic);

  const cssClasses = isPublic
    ? "flex justify-center bg-[url(../background-image.png)] text-white"
    : "flex justify-center bg-[url(../background-image.png)] text-white h-screen";

  return (
    <div className={cssClasses}>
      <div className="flex w-full max-w-md flex-col items-center space-y-4 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {children}
      </div>
    </div>
  );
}
