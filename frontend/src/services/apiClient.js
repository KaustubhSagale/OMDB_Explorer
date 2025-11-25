import axios from "axios";


const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


export async function searchMovies(title) {
  if (!title || title.trim() === "") return { results: [] };

  try {
    const response = await axios.get(`${BASE_URL}/api/search`, {
      params: { query: title }
    });
    return response.data;
  } catch (err) {
    console.error("Search request failed:", err);
    return { results: [], error: "Search failed" };
  }
}


export async function getMovieDetails(id) {
  if (!id) return null;

  try {
    const response = await axios.get(`${BASE_URL}/api/movie`, {
      params: { id }
    });
    return response.data;
  } catch (err) {
    console.error("Movie details fetch failed:", err);
    return null;
  }
}
