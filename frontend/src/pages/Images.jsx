// frontend/src/pages/Images.jsx
// IMAGES

// IMPORTS
import React, { useEffect, useState } from "react";
import Header from "../components/module/Header";
import ImageCard from "../components/module/ImageCard";
import SearchBar from "../components/module/Searchbar";
import {
  uploadImage,
  deleteImage,
  getAlbums,
} from "../services/api";
import { useUserData } from "../services/UserDataContext";
import { ImageUp, SquareUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  // =========================
  // SEARCH STATE
  // =========================
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // UPLOAD FORM STATE
  // =========================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState(""); // OPTIONAL LOCATION
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userTags, setUserTags] = useState("");
  const [selectedAlbumIds, setSelectedAlbumIds] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);

  // =========================
  // LOAD USER ALBUMS (FOR SELECT)
  // =========================
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(
          data.filter(
            (a) => a.owner_user_id === user?.id || user?.role === "admin"
          )
        );
      } catch (err) {
        console.error("FAILED TO LOAD ALBUMS:", err);
      }
    };

    if (user) fetchAlbums();
  }, [user]);

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
    const input = document.getElementById("image-upload-input");
    if (input) input.value = "";
  };

  // =========================
  // ALBUM SELECT HANDLING
  // =========================
  const toggleAlbum = (albumId) => {
    setSelectedAlbumIds((prev) =>
      prev.includes(albumId)
        ? prev.filter((id) => id !== albumId)
        : [...prev, albumId]
    );
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
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("title", title);
      formData.append("description", description);
      if (locationName && locationName.trim()) {
        formData.append("location_name", locationName.trim());
      }
      selectedAlbumIds.forEach((id) => formData.append("album_ids", id));
      userTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)
        .forEach((tag) => formData.append("user_tags", tag));

      await uploadImage(formData);

      await refreshUserImages();
      setImagesCount((prev) => prev + 1);

      // RESET FORM
      setTitle("");
      setDescription("");
      setLocationName("");
      setUserTags("");
      setSelectedAlbumIds([]);
      clearImage();
    } catch (err) {
      console.error("UPLOAD FAILED:", err);
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
      await deleteImage(image.id);
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
          <label className="block font-medium">Image title (required)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inputs-set"
            required
          />

          {/* DESCRIPTION */}
          <label className="block font-medium">Image description (required)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="inputs-set resize-none"
            required
          />

          {/* LOCATION */}
          <label className="block font-medium">
            Location (optional – city, place, landmark)
          </label>
          <input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="inputs-set"
            placeholder="San Juan Mountains, CO"
          />

          {/* TAGS */}
          <label className="block font-medium">
            Image tags (comma separated, at least one)
          </label>
          <input
            value={userTags}
            onChange={(e) => setUserTags(e.target.value)}
            className="inputs-set"
          />

          {/* ALBUM SELECT */}
          <label className="block font-medium">
            Add to Albums (optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {albums.map((album) => (
              <label key={album.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAlbumIds.includes(album.id)}
                  onChange={() => toggleAlbum(album.id)}
                />
                <span>{album.title}</span>
              </label>
            ))}
          </div>

          {/* IMAGE FILE */}
          <div className="space-y-2 file-preview-container">
            <label className="block font-medium">Image Upload (required)</label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-lg border"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload-input"
                className="inputs-set cursor-pointer text-center py-8"
              >
                <ImageUp size={64} className="mx-auto mb-4 opacity-70" />
                <p>Click to upload or drag & drop</p>
                <input
                  id="image-upload-input"
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
            className="button-set"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </section>

      {/* YOUR IMAGES */}
      <section className="mt-14">
        <h2 className="section-header flex items-center gap-2">
          <span>Your Images</span>
          <div className="rounded-full p-2 shadow bg-purple-500 text-white">
            <SquareUser size={16} />
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
                  canEdit={canEditImage(image)}
                  onOpen={() => navigate(`/images/${image.id}`)}
                  onDelete={handleDeleteImage}
                  deleting={deletingImageId === image.id}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
