export async function fetchData(url, transfromData = null, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(
      `An error occured while fetching the data: ${response.status} ${response.statusText}`,
    );
    error.status = response.status;
    throw error;
  }
  let result = await response.json();
  if (transfromData) {
    result = await transfromData(result);
  }

  return result;
}
