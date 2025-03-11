import Button from "../UI/Button";

export default function FriendListControl({
  friendListPage,
  setFriendListPage,
  FriendListLength,
}) {
  const handlePageChange = (symbol) => {
    if (symbol === "-" && friendListPage > 1) {
      setFriendListPage((prevState) => prevState - 1);
    }
    if (symbol === "+") {
      setFriendListPage((prevState) => prevState + 1);
    }
  };

  const backButtonStyle =
    friendListPage > 1
      ? "h-7 w-7 bg-white text-black"
      : "h-7 w-7 bg-white text-black invisible";

  const forwardButtonStyle =
    FriendListLength === 8
      ? "h-7 w-7 bg-white text-black"
      : "h-7 w-7 bg-white text-black invisible";

  return (
    <div className="mt-4 flex gap-8">
      <Button className={backButtonStyle} onClick={() => handlePageChange("-")}>
        ←
      </Button>
      <p>{friendListPage}</p>
      <Button
        className={forwardButtonStyle}
        onClick={() => handlePageChange("+")}
      >
        →
      </Button>
    </div>
  );
}
