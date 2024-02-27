import axios from "axios";

const BASE_URL = "https://api.quotable.io";

async function quotableApi(endpoint, params = {}) {
  const options = {
    method: "GET",
    url: BASE_URL + endpoint,
    params: params,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getRandomQuote() {
  return await quotableApi("/random");
}
