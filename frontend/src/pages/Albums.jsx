// frontend/src/pages/Albums.jsx
// ALBUMS
// DONE

// IMPORTS
import React, { useEffect, useState } from "react";
import Header from "../components/module/Header";
import AlbumCard from "../components/module/AlbumCard";
import { getAlbums, createAlbum, deleteAlbum } from "../services/api";
import { useNavigate } from "react-router-dom";
import { LibraryBig, User } from "lucide-react";
import defaultAlbumImage from "/default_album_image.png";
import { useUserData } from "../services/UserDataContext";
import SearchBar from "../components/module/Searchbar";

// ALBUMS
export default function Albums() {
  // ALBUM STATE
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  // DELETE MODAL STATE
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // SEARCH STATE
  const [search, setSearch] = useState("");
  // USER STATE
  const { user, darkMode, setDarkMode, setAlbumsCount, canEditAlbum, } = useUserData();
  // NAVIGATE STATE
  const navigate = useNavigate();

  // FETCH ALBUMS
  /**
   * ⚠️ BORDERLINE LOGIC (KNOWN FUTURE REFACTOR)
   * Fetches ALL albums and filters locally.
   * Do NOT change yet.
   */
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching albums:", err);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  // DERIVED DATA (NO LOGIC REMOVED)
  const userAlbums = albums.filter(
    (album) => album.owner_user_id === user?.id
  );

  const filteredAlbums = userAlbums.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase())
  );

  // NAVIGATION
  const openAlbum = (album) => navigate(`/albums/${album.id}`);

  // DELETE FLOW
  const requestDelete = (album) => {
    if (!canEditAlbum(album)) return;
    setAlbumToDelete(album);
  };

  const confirmDelete = async () => {
    if (!albumToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAlbum(albumToDelete.id);
      setAlbums((prev) => prev.filter((a) => a.id !== albumToDelete.id));
      setAlbumsCount((prev) => Math.max(prev - 1, 0));
      setAlbumToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete album.");
    } finally {
      setIsDeleting(false);
    }
  };

  // IMAGE HANDLING
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
    const input = document.getElementById("cover-image-input");
    if (input) input.value = "";
  };

  // CREATE ALBUM
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newAlbum = await createAlbum(title, description, coverImage);
      setAlbums((prev) => [newAlbum, ...prev]);
      setAlbumsCount((prev) => prev + 1);

      // RESET FORM
      setTitle("");
      setDescription("");
      clearImage();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create album.");
    }
  };

  if (loading) return <p className="p-8">Loading albums…</p>;

  // RENDER
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2 mt-10 mb-6">
        <LibraryBig
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <h1 className="text-4xl font-semibold">Albums</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">
          Manage your personal albums.
        </p>
      </div>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* CREATE FORM */}
      <h2 className="section-header">Create New Album</h2>

      <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
        <form onSubmit={handleCreate} className="space-y-4">
          {/* TITLE */}
          <label className="block font-medium">Album title (required)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Winter Real Estate 2025"
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
            required
          />

          {/* DESCRIPTION */}
          <label className="block font-medium">
            Album description (optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="All the images from the 2025 Winter Real Estate edition"
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

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
                className={`inputs-set cursor-pointer text-center py-8 ${
                  darkMode ? "inputs-set-dark" : "inputs-set-light"
                }`}
              >
                <img
                  src={defaultAlbumImage}
                  alt="Default album"
                  className="mx-auto mb-4 h-28 object-contain"
                />
                <p>
                  If no album image is selected, the default album image above
                  will be used.
                </p>
                <p>
                  <span className="font-semibold">Click to upload</span> or{" "}
                  <span className="font-semibold">drag & drop</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold">PNG, JPG, WEBP</span> up to{" "}
                  <span className="font-semibold">60MB</span>
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

          {/* SUBMIT */}
          <button
            type="submit"
            className={`button-set ${
              darkMode ? "button-set-dark" : "button-set-light"
            }`}
          >
            Create Album
          </button>
        </form>
      </section>

      {/* USER ALBUMS */}
      <section>
        <h2 className="section-header flex items-center gap-2">
          <span>Your Albums</span>
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

      {/* DELETE CONFIRMATION MODAL */}
      {albumToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className={`p-6 rounded-xl w-full max-w-md space-y-4 shadow-2xl ${darkMode ? "bg-zinc-900 text-white border border-zinc-700" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold">Delete Album</h3>
            <p>
              Are you sure you want to delete <span className="font-semibold">"{albumToDelete.title}"</span>?
              <br />
              <span className="text-sm opacity-70">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setAlbumToDelete(null)}
                className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-200 hover:bg-gray-300"}`}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
