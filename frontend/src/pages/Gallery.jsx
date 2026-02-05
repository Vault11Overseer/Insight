// frontend/src/pages/Gallery.jsx

// =========================
// GALLERY PAGE
// =========================

// IMPORTS
import React, { useState } from "react";
import { Search, GalleryVerticalEnd } from "lucide-react";
import Header from "../components/module/Header";
import SearchBar from "../components/module/Searchbar";
import { useUserData } from "../services/UserDataContext";

export default function Gallery() {
  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const { darkMode, setDarkMode } = useUserData();

  // =========================
  // RENDER
  // =========================
  return (

    // ALBUM CONTAINER
    <div className={`page-set ${ darkMode ? "page-set-dark" : "page-set-light" }`}>

      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

      {/* PAGE HEADER */}
      <div className="flex items-center gap-2 mt-10 mb-6">
      <GalleryVerticalEnd size={30} className={`${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"  }`}/>
        <h1 className="text-4xl font-semibold">Gallery</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">Browse, Download, or Share all images uploaded to Insight.</p>
      </div>

  
      <SearchBar />

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* 
          Image cards go here.
          Do NOT remove this section — just plug your image map back in.
        */}

        {/* Example placeholder */}
        <div
          className={`aspect-square rounded-2xl flex items-center justify-center text-sm opacity-60 border ${
            darkMode
              ? "border-neutral-700 bg-neutral-900"
              : "border-neutral-300 bg-neutral-100"
          }`}
        >
          Image
        </div>
      </div>
    </div>
  );
}

// export default Gallery