import { useState } from "react";

 export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 shadow bg-white px-4 flex items-center justify-between">
      <h1 className="font-bold text-blue-900 text-2xl">
        Nyra Closet
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 font-medium text-gray-700">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Offers</a>
        <a href="#">Contact</a>
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-3xl font-bold"
      >
        {open ? "×" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-5 font-medium text-gray-700 md:hidden">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Offers</a>
          <a href="#">Contact</a>
        </div>
      )}
    </nav>
  );
}

