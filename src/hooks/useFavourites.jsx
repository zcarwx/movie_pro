import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const addFavorite = (movie) => saveFavorites([...favorites, movie]);
  const removeFavorite = (id) => saveFavorites(favorites.filter((m) => m.id !== id));

  return { favorites, addFavorite, removeFavorite };
}
