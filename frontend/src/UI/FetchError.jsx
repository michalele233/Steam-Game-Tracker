export default function FetchError({ error }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4 p-4 pb-0">
        <h2 className="mb-2 text-2xl">Error</h2>
        <p>
          {error.status === 401
            ? "Friends data is private and we couldn't fetch friends list!"
            : error.message}
        </p>
      </div>
    </>
  );
}
