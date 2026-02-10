// frontend/src/pages/ImageView.jsx

// IMPORTS
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/module/Header";
import { getImage, updateImage } from "../../services/api";
import { format } from "date-fns";
import { useUserData } from "../../services/UserDataContext";
import { Image as ImageIcon } from "lucide-react";

// IMAGE VIEW
export default function ImageView() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  // CONTEXT
  const {
    user,
    darkMode,
    setDarkMode,
    canEditImage,
  } = useUserData();

  // DATA STATE
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // FETCH IMAGE
  // =========================
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getImage(imageId);
        setImage(data);
        setTitle(data.title);
        setDescription(data.description || "");
      } catch (err) {
        console.error("Failed to load image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

  // =========================
  // DERIVED STATE
  // =========================
  const canEdit = image && canEditImage(image);

  // =========================
  // UPDATE IMAGE
  // =========================
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const updated = await updateImage(image.id, {
        title,
        description,
      });

      setImage(updated);
      alert("Image updated successfully.");
    } catch (err) {
      console.error("Failed to update image:", err);
      alert("Failed to update image.");
    }
  };

  if (loading) return <p className="p-8">Loading image…</p>;
  if (!image) return <p className="p-8">Image not found.</p>;

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* IMAGE HEADER */}
      <section className="mt-10 mb-8 flex items-center gap-3">
        <ImageIcon
          size={36}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <div>
          <h1 className="text-4xl font-semibold">{image.title}</h1>
          <p className="opacity-80 font-bold">
            Gallery Image
          </p>
        </div>
      </section>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* IMAGE INFORMATION */}
      <section
        className={`form-container ${darkMode ? "form-dark" : "form-light"} grid grid-cols-1 md:grid-cols-3 gap-8`}
      >
        {/* IMAGE META */}
        <div className="md:col-span-2 space-y-3">
          <p className="view-description">
            <span className="font-bold">Description: </span>
            {image.description || "No description provided."}
          </p>

          <div className="view-meta space-y-1">
            <p>Uploaded by user ID: {image.uploader_user_id}</p>
            <p>Captured on: {image.captured_at ? format(new Date(image.captured_at), "PPP") : "Unknown"}</p>
            <p>Uploaded on: {format(new Date(image.created_at), "PPP")}</p>
            <p>Image ID: {image.id}</p>
          </div>
        </div>

        {/* IMAGE PREVIEW */}
        <img
          src={image.preview_url || image.original_url}
          alt={image.title}
          className="w-full h-64 object-contain rounded-xl border bg-white"
        />
      </section>

      {/* EDIT IMAGE */}
      {canEdit && (
        <>
          <h2 className="section-header mt-12">Edit Image</h2>

          <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
            <form onSubmit={handleUpdateImage} className="space-y-4">
              {/* TITLE */}
              <label className="block font-medium">Image Title</label>
              <input
                type="text"
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
    </div>
  );
}
