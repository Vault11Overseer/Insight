// frontend/src/pages/Album.jsx
// ALBUM

// IMPORTS
import React, { useEffect, useState } from "react";
import Header from "../components/module/Header";
import AlbumCard from "../components/module/AlbumCard";
import { API_BASE_URL, createAlbum, deleteAlbum } from "../services/api";
import { useNavigate } from "react-router-dom";
import { LibraryBig } from "lucide-react";
import defaultAlbumImage from "/default_album_image.png";
import { useUserData } from "../services/UserDataContext";

// EXPORT
export default function Albums() {
  // USER STATE
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  // ALBUM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  // CURRENT USER STATE
  const { user: currentUser, darkMode, setDarkMode, setAlbumsCount } = useUserData();
  const navigate = useNavigate();

// FETCH ALBUMS  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/albums/`);
        const data = await res.json();
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

  // CHECK IF USER CAN EDIT ALBUM
  const canEdit = (album) =>
    album.owner_user_id === currentUser?.id ||
    currentUser?.role === "admin";

  const handleOpenAlbum = (album) => {
    navigate(`/albums/${album.id}`);
  };

  // DELETE ALBUM
  const handleDeleteAlbum = async (album) => {
    if (!window.confirm(`Delete "${album.title}"?`)) return;

    try {
      await deleteAlbum(album.id);

      setAlbums((prev) => prev.filter((a) => a.id !== album.id));
    } catch (err) {
      console.error("Error deleting album:", err);
      alert("Failed to delete album.");
    }
  };

  // IMAGE UPDATE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      // Create preview URL
      // CREATE PREVIEW URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverImage(null);
      setCoverImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("cover-image-input");
    if (fileInput) fileInput.value = "";
  };

  // CREATE ALBUM
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newAlbum = await createAlbum(title, description, coverImage);
      setAlbums((prev) => [newAlbum, ...prev]);
      setAlbumsCount((prev) => prev + 1);

      // Reset form
      setTitle("");
      setDescription("");
      setCoverImage(null);
      setCoverImagePreview(null);
      const fileInput = document.getElementById("cover-image-input");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create album.");
    }
  };

  if (loading) return <p className="p-8">Loading albums…</p>;

  console.log(albums)


  // RENDER
  return (

    // ALBUM CONTAINER
    <div className={`page-set ${ darkMode ? "page-set-dark" : "page-set-light" }`}>

      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

      {/* PAGE HEADER */}
      <div className="flex items-center gap-2 mt-10 mb-6">
      <LibraryBig size={30} className={`${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"  }`}/>
        <h1 className="text-4xl font-semibold">Albums</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">Manage your personal albums.</p>
      </div>

      {/* CREATE ALBUM FORM */}
      <section className={`bg-set ${darkMode ? "bg-set-dark" : "bg-set-light" }`}>

        <form
          onSubmit={handleCreateAlbum}
          className="w-full p-6 rounded-2xl space-y-4"
        >
          <h2 className="text-xl font-semibold">Create New Album</h2>
          {/* TITLE INPUT */}
          <input
            type="text"
            placeholder="Album title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
            required
          />
          {/* DESCRIPTION INPUT */}
          <textarea
            placeholder="Album description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
            rows={3}
          />

          {/* COVER IMAGE UPLOAD */}
          <div className="space-y-2 ">
            <p className="block text-l font-medium">
              Album Cover Image (optional)
            </p>
            <p className="text-l opacity-70">
              {coverImage
                ? "Custom image selected. Click 'Remove' to use default image."
                : "If no image is selected, the default album image will be used."}
            </p>

            {coverImagePreview ? (
              <div className="relative ">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full h-48 object-contain rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="relative">
                <label htmlFor="cover-image-input" >
                  <div className={`inputs-set flex flex-col items-center justify-center pt-5 pb-6 text black ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`} >
          
                    <svg
                      className="w-8 h-8 mb-2 opacity-50 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-xl opacity-70">
                      <span className="font-semibold ">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-bold text-black opacity-50 ">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id="cover-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {!coverImage && (
                  <div className={`inputs-set mt-2 p-2 ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`} >
                  
                    Default image preview:
                    <img
                      src={defaultAlbumImage}
                      alt="Default album"
                      className="mt-2 w-full p-2 h-24 object-contain rounded border-12"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* UPLOAD IMAGE BUTTON */}
          <button type="submit" className={`button-set ${ darkMode ? "button-set-dark" : "button-set-light" }`}>
            Create Album
          </button>
        </form>
      </section>

      {/* YOUR ALBUMS */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-6">Your Albums</h2>

        {albums.filter((a) => a.owner_user_id === currentUser?.id).length ===
        0 ? (
          <p className="opacity-70">No Albums uploaded as of yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {albums
              .filter((a) => a.owner_user_id === currentUser?.id)
              .map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  canEdit={canEdit(album)}
                  onOpen={handleOpenAlbum}
                  onDelete={handleDeleteAlbum}
                  darkMode={darkMode}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
