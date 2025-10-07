import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 shadow flex justify-between">
      <div className="font-bold">🎬 MovieApp</div>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
                                                                    