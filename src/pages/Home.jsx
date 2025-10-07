import React, { useState } from "react";
import { fetchFromTMDB } from "../services/api";
import MovieCard from "../components/MovieCard";
import { useNotification } from "../context/NotificationContext";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { notify } = useNotification();

  const searchMovies = async () => {
    if (!query.trim()) return notify("Enter movie name!");
    try {
      const data = await fetchFromTMDB(`/search/movie&query=${query}`);
      setMovies(data.results);
    } catch {
      notify("Error fetching movies");
    }
  };

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2"
      />
      <button onClick={searchMovies} className="bg-blue-500 text-white p-2 ml-2">
        Search
      </button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
