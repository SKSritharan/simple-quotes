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

export async function getQuotesByTag(tag) {
  return await quotableApi("/quotes", { tags: tag });
}

export async function searchQuotes(query) {
  return await quotableApi("/search/quotes", { query: query });
}

export async function listQuotes(page = 1, limit = 10) {
  return await quotableApi("/quotes", { page, limit });
}

export async function getQuote(id) {
  return await quotableApi("/quotes/" + id);
}
