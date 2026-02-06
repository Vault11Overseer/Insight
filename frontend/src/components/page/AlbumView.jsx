// frontend/src/pages/AlbumView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/module/Header";
import { getAlbum, getAlbumImages, updateAlbumWithCover } from "../../services/api";
import defaultAlbumImage from "/default_album_image.png";
import { format } from "date-fns";
import ImageCard from "../../components/module/ImageCard";
import { useUserData } from "../../services/UserDataContext";

export default function AlbumView() {
  const { albumId } = useParams();
  const { user, canEditAlbum } = useUserData();

  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) ?? true);

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
      const updated = await updateAlbumWithCover(album.id, { title, description }, coverImage);
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

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header
        introProps={{
          user,
          darkMode,
          albumsCount: 0,
          imagesCount: album.image_count ?? 0,
        }}
        navigationProps={{
          darkMode,
          toggleDarkMode: () => setDarkMode((prev) => !prev),
        }}
      />

      {/* ALBUM HEADER */}
      <section className="view-header grid grid-cols-1 md:grid-cols-3 gap-8 items-center my-10">
        <div className="view-info md:col-span-2 space-y-3">
          <h1 className="view-title">{album.title}</h1>
          <p className="view-description">{album.description || "No description provided."}</p>
          <div className="view-meta text-sm opacity-70 space-y-1">
            <p>Created by {album.owner_user?.username}</p>
            <p>{album.image_count ?? 0} images</p>
            <p>Created on {format(new Date(album.created_at), "PPP")}</p>
          </div>
        </div>

        <img
          src={coverPreview || album.cover_image_url || defaultAlbumImage}
          alt="Album cover"
          className="view-cover rounded-xl border"
        />
      </section>

      {/* IMAGES GRID */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-6">Album Images</h2>
        {images.length === 0 ? (
          <p className="opacity-70">No images in this album.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <ImageCard key={img.id} image={img} onOpen={() => {}} />
            ))}
          </div>
        )}
      </section>

      {/* EDIT FORM */}
      {canEdit && (
        <section className="view-edit-section my-10 max-w-2xl">
          <form
            onSubmit={handleUpdateAlbum}
            className={`form-container ${darkMode ? "form-dark" : "form-light"}`}
          >
            <h2 className="view-form-title">Edit Album</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inputs-set inputs-set-light"
              required
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="inputs-set inputs-set-light resize-none"
              rows={3}
            />

            {/* COVER IMAGE */}
            <div className="view-cover-input space-y-2">
              <p className="font-medium">Album Cover Image</p>

              {coverPreview ? (
                <div className="relative">
                  <img src={coverPreview} className="view-cover rounded-lg" />
                  <button type="button" onClick={handleRemoveImage} className="button-remove-image">
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
              )}
            </div>

            <button type="submit" className={`button-set ${darkMode ? "button-set-light" : "button-set-dark"}`}>
              Save Changes
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
