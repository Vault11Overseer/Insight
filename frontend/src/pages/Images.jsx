// frontend/src/pages/Images.jsx
// IMAGES

// IMPORTS
import React, { useState } from "react";
import Header from "../components/module/Header";
import ImageCard from "../components/module/ImageCard";
import SearchBar from "../components/module/Searchbar";
import { uploadImage, deleteImage } from "../services/api";
import { useUserData } from "../services/UserDataContext";
import { ImageUp, User } from "lucide-react";
import defaultImage from "/default_album_image.png";
import { useNavigate } from "react-router-dom"
// IMAGES
export default function Images() {
  // =========================
  // USER STATE
  // =========================
  const {
    user,
    darkMode,
    setDarkMode,
    canEditImage,
    refreshUserImages,
    setImagesCount,
    userImages,
    loadingUserImages,
  } = useUserData();

  // =========================
  // SEARCH STATE
  // =========================
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // UPLOAD FORM STATE
  // =========================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userTags, setUserTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const navigate = useNavigate();

  // =========================
  // IMAGE PREVIEW HANDLING
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const input = document.getElementById("cover-image-input");
    if (input) input.value = "";
  };

  // =========================
  // UPLOAD IMAGE
  // =========================
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Title is required");
    if (!description.trim()) return alert("Description is required");
    if (!imageFile) return alert("Image file is required");
    if (!userTags.trim()) return alert("At least one tag is required");

    setIsUploading(true);

    try {
      await uploadImage(
        imageFile,
        title,
        description,
        [],
        userTags.split(",").map((t) => t.trim())
      );

      await refreshUserImages();
      setImagesCount((prev) => prev + 1);

      // RESET FORM
      setTitle("");
      setDescription("");
      setUserTags("");
      clearImage();
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // =========================
  // DELETE IMAGE (DB + S3)
  // =========================
  const handleDeleteImage = async (image) => {
    if (!canEditImage(image)) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this image? This cannot be undone."
    );
    if (!confirmed) return;

    setDeletingImageId(image.id);

    try {
      await deleteImage(image.id); // BACKEND HANDLES DB + S3
      await refreshUserImages();
      setImagesCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("DELETE IMAGE FAILED:", err);
      alert(err.message || "Failed to delete image");
    } finally {
      setDeletingImageId(null);
    }
  };

  // =========================
  // FILTER USER IMAGES
  // =========================
  const filteredImages = userImages.filter((img) => {
    if (!searchTerm) return true;
    return (
      img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2 mt-10 mb-6">
        <ImageUp
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <h1 className="text-4xl font-semibold">Images</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">
          Upload and manage your images.
        </p>
      </div>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* UPLOAD FORM */}
      <h2 className="section-header">Upload New Image</h2>
      <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
        <form onSubmit={handleUpload} className="space-y-4">
          {/* TITLE */}
          <label className="block font-medium">Title (required)</label>
          <input
            type="text"
            value={title}
            placeholder="San Juan mountains"
            onChange={(e) => setTitle(e.target.value)}
            className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
            required
          />

          {/* DESCRIPTION */}
          <label className="block font-medium">Description (optional)</label>
          <textarea
            rows={3}
            placeholder="This is an image of the San Juan mountain range"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
            required
          />

          {/* TAGS */}
          <label className="block font-medium">Tags (one tag is required, comma separated)</label>
          <input
            type="text"
            value={userTags}
            onChange={(e) => setUserTags(e.target.value)}
            className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
            placeholder="Mountains, san juan, scenery"
          />

          {/* IMAGE FILE */}
          <div className="space-y-2 file-preview-container">
            <label className="block font-medium">Image Upload (required)</label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
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
            <ImageUp size={80} className="mx-auto mb-4 h-28 object-contain opacity-70"/>

                <p>Only upload one image at a time.</p>
                <p>
                  <span className="font-semibold">Click to upload</span> or{" "}
                  <span className="font-semibold">drag & drop</span>
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
            disabled={isUploading}
            className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </section>

      {/* YOUR IMAGES */}
      <section>
        <h2 className="section-header flex items-center gap-2">
          <span>Your Images</span>
          <div className="rounded-full p-2 shadow bg-purple-500 text-white">
            <User size={16} />
          </div>
        </h2>

        {loadingUserImages ? (
          <p className="opacity-70 mt-4">Loading your images...</p>
        ) : userImages.length === 0 ? (
          <p className="opacity-70 mt-4">
            No images found. Upload images to manage them here.
          </p>
        ) : (
          <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className="display-grid mt-6">
              {filteredImages.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  darkMode={darkMode}
                  canEdit={canEditImage(image)}
                  onOpen={(img) => navigate(`/images/${img.id}`)}
                  onDelete={handleDeleteImage}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
