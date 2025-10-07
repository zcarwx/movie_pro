import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavourites";

export default function Profile() {
  const { user, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Logout
      </button>

      <h3 className="mt-4 font-bold">Your Favorites</h3>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {favorites.map((f) => (
          <li key={f.id} className="flex justify-between">
            {f.title}
            <button
              onClick={() => removeFavorite(f.id)}
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
