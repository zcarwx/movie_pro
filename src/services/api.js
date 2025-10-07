const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch from TMDB");
  return res.json();
}
