import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-[#262626] via-[#262626]/70 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Product Name (Left) */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-black text-white tracking-tight hover:text-neutral-300 transition"
        >
          Rescue<span className="text-neutral-400">Rituals</span>
        </Link>

        {/* Host Button (Right) */}
        <button
          onClick={() => navigate("/host")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold transition active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" /> Host Event
        </button>
      </div>
    </header>
  );
}
