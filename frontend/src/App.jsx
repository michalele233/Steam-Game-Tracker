import Profile from "./components/Profile";

const App = () => {
  const backgroundStyle =
    "flex h-screen justify-center bg-[url(../../public/background-image.png)] text-white";
  const containerStyle =
    "flex w-[75%] flex-col items-center gap-12 bg-[#1b1819] py-2 shadow-[0px_0px_70px_10px_rgba(0,0,0,1)]";

  return (
    <div className={backgroundStyle}>
      <div className={containerStyle}>
        <Profile></Profile>
      </div>
    </div>
  );
};

export default App;
