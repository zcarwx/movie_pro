import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter your name!");
    login(name);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="border p-2"
      />
      <button className="bg-blue-500 text-white p-2 ml-2">Login</button>
    </form>
  );
}
