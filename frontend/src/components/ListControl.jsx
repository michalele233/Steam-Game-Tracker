import Button from "../UI/Button";

export default function ListControl({
  listPage,
  setListPage,
  listLength,
  elementsPerPage,
}) {
  const handlePageChange = (symbol) => {
    if (symbol === "-" && listPage > 1) {
      setListPage((prevState) => prevState - 1);
    }
    if (symbol === "+") {
      setListPage((prevState) => prevState + 1);
    }
  };

  const backButtonStyle =
    listPage > 1
      ? "h-9 w-9 bg-white text-black"
      : "h-9 w-9 bg-white text-black invisible";

  const forwardButtonStyle =
    listLength === elementsPerPage
      ? "h-9 w-9 bg-white text-black"
      : "h-9 w-9 bg-white text-black invisible";

  return (
    <div className="mt-4 flex items-center gap-8">
      <Button className={backButtonStyle} onClick={() => handlePageChange("-")}>
        ←
      </Button>
      <p>{listPage}</p>
      <Button
        className={forwardButtonStyle}
        onClick={() => handlePageChange("+")}
      >
        →
      </Button>
    </div>
  );
}
