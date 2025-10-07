import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromTMDB } from "../services/api";
import useFavorites from "../hooks/useFavourites";
import { useNotification } from "../context/NotificationContext";

export default function MovieDetail() {
  const { id } = useParams(); // get the movie id from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { notify } = useNotification();

  const isFavorite = favorites.some((m) => m.id === Number(id));

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await fetchFromTMDB(`/movie/${id}`);
        setMovie(data);
      } catch (err) {
        notify("Error loading movie details");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  const handleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      removeFavorite(movie.id);
      notify("Removed from favorites");
    } else {
      addFavorite({ id: movie.id, title: movie.title });
      notify("Added to favorites");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!movie) return <p className="p-4">Movie not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-600 italic mb-2">{movie.tagline}</p>
          <p className="mb-4">{movie.overview}</p>
          <p>
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <button
            onClick={handleFavorite}
            className={`mt-4 px-4 py-2 rounded ${
              isFavorite ? "bg-red-500" : "bg-blue-500"
            } text-white`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
