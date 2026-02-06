// frontend/src/pages/Gallery.jsx
// GALLERY PAGE

// IMPORTS
import React, { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import Header from "../components/module/Header";
import SearchBar from "../components/module/Searchbar";
import ImageCard from "../components/module/ImageCard";
import { useUserData } from "../services/UserDataContext";

export default function Gallery() {
  // STATE
  const [search, setSearch] = useState("");
  const { darkMode, setDarkMode } = useUserData();

  /**
   * IMPORTANT:
   * Replace this with your real gallery image source
   * (API call, context, react-query, etc.)
   */
  const images = []; // ← ALL images in the database (Gallery = everything)

  // =========================
  // FILTERED IMAGES
  // =========================
  const filteredImages = images.filter((image) =>
    image.title?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
    

      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2 mt-10 mb-6">
        <GalleryVerticalEnd
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <h1 className="text-4xl font-semibold">Gallery</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">
          Browse, download, or share all images uploaded to Insight.
        </p>
      </div>

      {/* SEARCH BAR — ONLY IF IMAGES EXIST */}
      {images.length > 0 && (
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      )}

      {/* GALLERY GRID */}
      <div className="display-grid">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onOpen={() => {
                /* navigate to ImageView here */
              }}
              darkMode={darkMode}
            />
          ))
        ) : (
          <div
            className={`col-span-full text-center text-lg font-semibold opacity-60 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            No images found.
          </div>
        )}
      </div>
    </div>
  );
}
