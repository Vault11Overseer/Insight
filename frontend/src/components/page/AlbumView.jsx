// frontend/src/pages/AlbumView.jsx

// IMPORTS
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/module/Header";
import {
  getAlbum,
  getAlbumImages,
  updateAlbumWithCover,
  removeAlbumCover,
  deleteImage,
} from "../../services/api";
import defaultAlbumImage from "/default_album_image.png";
import { format } from "date-fns";
import ImageCard from "../../components/module/ImageCard";
import { useUserData } from "../../services/UserDataContext";
import { Album, Images } from "lucide-react";
import SearchBar from "../module/Searchbar";

// ALBUM VIEW
export default function AlbumView() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  // CONTEXT
  const { user, darkMode, setDarkMode, canEditAlbum, canEditImage } = useUserData();

  // DATA STATE
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingImageId, setDeletingImageId] = useState(null);
  

  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // COVER IMAGE STATE
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // =========================
  // FETCH ALBUM + IMAGES
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumData, imageData] = await Promise.all([
          getAlbum(albumId),
          getAlbumImages(albumId),
        ]);

        setAlbum(albumData);
        setImages(imageData);
        setTitle(albumData.title);
        setDescription(albumData.description || "");
      } catch (err) {
        console.error("Failed to load album:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  // =========================
  // DERIVED STATE
  // =========================
  const canEdit = album && canEditAlbum(album);

  const filteredImages = images.filter((img) =>
    img.title?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // COVER IMAGE HANDLING
  // =========================
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setRemoveCover(false);

    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearCoverImage = () => {
    setCoverFile(null);
    setCoverPreview(null);
    setRemoveCover(true);

    const input = document.getElementById("cover-image-input");
    if (input) input.value = "";
  };

  // =========================
  // UPDATE ALBUM
  // =========================
  const handleSave = async (e) => {
    e.preventDefault();
    if (!album) return;

    try {
      let updated;

      if (removeCover) {
        updated = await removeAlbumCover(album.id);
      } else {
        updated = await updateAlbumWithCover(
          album.id,
          { title, description },
          coverFile
        );
      }

      setAlbum(updated);
      setCoverFile(null);
      setCoverPreview(null);
      setRemoveCover(false);
      alert("Album updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update album.");
    }
  };

  // =========================
  // DELETE IMAGE
  // =========================
  const handleDeleteImage = async (imageToDelete) => {
    if (!canEditImage(imageToDelete)) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this image? This cannot be undone."
    );
    if (!confirmed) return;

    setDeletingImageId(imageToDelete.id);
    try {
      await deleteImage(imageToDelete.id);
      setImages((prev) => prev.filter((img) => img.id !== imageToDelete.id));
    } catch (err) {
      console.error("DELETE IMAGE FAILED:", err);
      alert(err.message || "Failed to delete image.");
    } finally {
      setDeletingImageId(null);
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
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* PAGE TITLE */}
       <div className="flex items-center gap-2 mt-10 mb-6">
        <Album
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <h1 className="text-4xl font-semibold">Album - <span className="">{album.title}</span></h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">
           Manage this album
        </p>
      </div>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* ALBUM INFORMATION */}
      <h2 className="section-header">Album Information</h2>

      <section className={`form-container ${darkMode ? "form-dark" : "form-light"} grid grid-cols-1 md:grid-cols-3 gap-8`}>
        <div className="md:col-span-2 space-y-3">
          <h3><span className="font-bold">Album title : </span>{album.title}</h3>

          <div className="view-meta">
            <p className="view-description"><span className="font-bold">Album description : </span>{album.description || "No description provided."}</p>
            <p>Album owner : {album.owner_user_id}</p>
            <p>Album image count : {album.image_count ?? images.length} images</p>
            <p>Created on : {format(new Date(album.created_at), "PPP")}</p>
          </div>
        </div>

        <img
          src={coverPreview || album.cover_image_url || defaultAlbumImage}
          alt="Album cover"
          // className="w-full h-64 object-contain rounded-xl border"
          className={`w-full h-48 object-contain rounded-lg border ${darkMode ? "form-dark bg-white " : "form-light bg-white "}`}

        />
      </section>

      {/* EDIT ALBUM */}
      {canEdit && (
        <>
          <h2 className="section-header mt-12">Edit Album</h2>

          <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
            <form onSubmit={handleSave} className="space-y-4">
              {/* TITLE */}
              <label className="block font-medium">Album Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="inputs-set"
                required
              />

              {/* DESCRIPTION */}
              <label className="block font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="inputs-set resize-none"
              />

              {/* COVER IMAGE */}
              <div className="space-y-2 file-preview-container">
                <label className="block font-medium">Album Cover Image</label>

                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      className="w-full h-48 object-contain rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={clearCoverImage}
                      className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="cover-image-input"
                    className="inputs-set cursor-pointer text-center py-8"
                  >
                    <img
                      src={defaultAlbumImage}
                      className="mx-auto mb-4 h-28 object-contain opacity-70"
                    />
                    <p>Click to upload or drag & drop</p>
                    <input
                      id="cover-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* SAVE */}
              <button
                type="submit"
                className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
              >
                Save Changes
              </button>
            </form>
          </section>
        </>
      )}



      {/* USER ALBUMS */}
      <section className="mt-14">
        <h2 className="section-header flex items-center gap-2">
          <span>Album Images</span>
          <div className="rounded-full p-2 shadow bg-purple-900 text-white">
            <Images size={16} />
          </div>
        </h2>

        {/* EMPTY STATE */}
        {images.length === 0 ? (
          <p className="opacity-70">No images are associated with this album yet.</p>
        ) : (
          <>
            {/* SEARCH BAR ONLY WHEN ALBUMS EXIST */}
            <SearchBar value={search} onChange={setSearch} />

            {/* ALBUM GRID */}
            <div className="display-grid py-6">
              {filteredImages.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  canEdit={canEditImage(img)}
                  onOpen={() => navigate(`/images/${img.id}`)}
                  onDelete={handleDeleteImage}
                  deleting={deletingImageId === img.id}
                />
              ))}
            </div>
          </>
        )}
      </section>


    </div>
  );
}
