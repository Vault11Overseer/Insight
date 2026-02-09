// frontend/src/pages/AlbumView.jsx

// IMPORTS
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/module/Header";
import {
  getAlbum,
  getAlbumImages,
  updateAlbumWithCover,
} from "../../services/api";
import defaultAlbumImage from "/default_album_image.png";
import { format } from "date-fns";
import ImageCard from "../../components/module/ImageCard";
import { useUserData } from "../../services/UserDataContext";
import { Album } from "lucide-react";

export default function AlbumView() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { user, canEditAlbum } = useUserData();

  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? true
  );

  // =========================
  // EFFECTS
  // =========================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumData, imagesData] = await Promise.all([
          getAlbum(albumId),
          getAlbumImages(albumId),
        ]);
        setAlbum(albumData);
        setTitle(albumData.title);
        setDescription(albumData.description || "");
        setImages(imagesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [albumId]);

  // =========================
  // HELPERS
  // =========================
  const canEdit = album && canEditAlbum(album);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
    const input = document.getElementById("cover-image-input");
    if (input) input.value = "";
  };

  const handleUpdateAlbum = async (e) => {
    e.preventDefault();
    if (!album) return;

    try {
      const updated = await updateAlbumWithCover(
        album.id,
        { title, description },
        coverImage
      );
      setAlbum(updated);
      setCoverImage(null);
      setCoverPreview(null);
      alert("Album updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update album.");
    }
  };

  if (loading) return <p className="p-8">Loading album…</p>;
  if (!album) return <p className="p-8">Album not found.</p>;

  const filteredImages = images.filter((img) =>
    img.title?.toLowerCase().includes(search.toLowerCase())
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
        <Album
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <div>
          <h1 className="text-4xl font-semibold">
            Album: {album.title}
          </h1>
          <p className="text-sm opacity-80 font-bold">
            Manage your {album.title} album
          </p>
        </div>
      </div>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* ALBUM INFORMATION */}
      <h2 className="section-header">Album Information</h2>

      <section
        className={`form-container ${
          darkMode ? "form-dark" : "form-light"
        } grid grid-cols-1 md:grid-cols-3 gap-8 items-center`}
      >
        <div className="space-y-3 md:col-span-2">
          <p className="view-description">
            {album.description || "No description provided."}
          </p>

          <div className="view-meta">
            <p>Created by {album.owner_user?.username}</p>
            <p>{album.image_count ?? 0} images</p>
            <p>
              Created on{" "}
              {format(new Date(album.created_at), "PPP")}
            </p>
          </div>
        </div>

        <img
          src={coverPreview || album.cover_image_url || defaultAlbumImage}
          alt="Album cover"
          className="w-full h-64 object-contain rounded-xl border"
        />
      </section>

      {/* EDIT ALBUM */}
      {canEdit && (
        <>
          <h2 className="section-header mt-12">Edit Album</h2>

          <section
            className={`form-container ${
              darkMode ? "form-dark" : "form-light"
            }`}
          >
            <form onSubmit={handleUpdateAlbum} className="space-y-4">
              
              {/* ALBUM TITLE */}
              <label className="block font-medium">Album Title (optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="inputs-set inputs-set-light"
                required
              />

              {/* ALBUM DESCRIPTION */}
              <label className="block font-medium">
                Album Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="inputs-set inputs-set-light resize-none"
              />

              {/* COVER IMAGE */}
              {/* <div className="space-y-2 file-preview-container"> */}
                {/* <p className="font-medium"></p>
<label className="block font-medium">
                Album Cover Image (optional)
              </label>
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      className="w-full h-48 object-contain rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="button-remove-image"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    id="cover-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                )} */}
              {/* </div> */}









            {/* COVER IMAGE */}
                      <div className="space-y-2 file-preview-container">
                        <label className="block font-medium">
                          Album cover image (optional)
                        </label>
            
                        {coverPreview ? (
                          <div className="relative">
                            <img
                              src={coverPreview}
                              alt="Cover preview"
                              className="w-full h-48 object-contain rounded-lg border border-gray-400"
                            />
                            <button
                              type="button"
                              onClick={clearImage}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="cover-image-input"
                            className={`inputs-set cursor-pointer text-center py-8 text-slate-700 ${
                              darkMode ? "inputs-set-dark" : "inputs-set-light"
                            }`}
                          >
                            <img
                              src={defaultAlbumImage}
                              alt="Default album"
                              className="mx-auto mb-4 h-28 object-contain inset-0 opacity-70"
                            />
                            <p className="text-slate-700" >
                              If no album image is selected, the original album image above
                              will be used.
                            </p>
                            <p className="text-slate-700">
                              <span className="font-semibold text-slate-700">Click to upload</span> or{" "}
                              <span className="font-semibold text-slate-700">drag & drop</span>
                            </p>
                            <p className="text-sm text-slate-700">
                              <span className="font-semibold text-slate-700">PNG, JPG, WEBP</span> up to{" "}
                              <span className="font-semibold text-slate-700">60MB</span>
                            </p>
                            <input
                              id="cover-image-input"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>









              <button
                type="submit"
                className={`button-set ${
                  darkMode
                    ? "button-set-dark"
                    : "button-set-light"
                }`}
              >
                Save Changes
              </button>
            </form>
          </section>
        </>
      )}

      {/* ALBUM IMAGES */}
      <section className="mt-14">
        <h2 className="section-header">Album Images</h2>

        <input
          type="text"
          placeholder="Search images…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="inputs-set inputs-set-light mb-6"
        />

        {filteredImages.length === 0 ? (
          <p className="opacity-70">
            No images found.
          </p>
        ) : (
          <div className="display-grid">
            {filteredImages.map((img) => (
              <ImageCard
                key={img.id}
                image={img}
                onOpen={(image) =>
                  navigate(`/images/${image.id}`)
                }
              />
            ))}
          </div>
        )}
      </section>





      {/* USER ALBUM IMAGES */}
      <section>
        <h2 className="section-header flex items-center gap-2">
          <span>Album Images</span>
          <div className="rounded-full p-2 shadow bg-purple-500 text-white">
            <User size={16} />
          </div>
        </h2>

        {/* EMPTY STATE */}
        {userAlbums.length === 0 ? (
          <p className="opacity-70">No albums uploaded yet.</p>
        ) : (
          <>
            {/* SEARCH BAR ONLY WHEN ALBUMS EXIST */}
            <SearchBar value={search} onChange={setSearch} />

            {/* ALBUM GRID */}
            <div className="display-grid py-6">
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  canEditAlbum={canEditAlbum(album)}
                  onOpen={openAlbum}
                  onDelete={() => requestDelete(album)}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        )}
      </section>







    </div>
  );
}
