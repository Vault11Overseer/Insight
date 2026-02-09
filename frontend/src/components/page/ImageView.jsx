import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/module/Header";
import { getImage, updateImage } from "../../services/api";
import { format } from "date-fns";
import { useUserData } from "../../services/UserDataContext";

export default function ImageView() {
  const { imageId } = useParams();
  const { user } = useUserData();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    const fetchImage = async () => {
      try {
        const data = await getImage(imageId);
        setImage(data);
        setTitle(data.title);
        setDescription(data.description || "");
      } catch (err) {
        console.error("Error loading image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

  // =========================
  // HELPERS
  // =========================
  const canEdit =
    image &&
    (image.uploader_user_id === user?.id || user?.role === "admin");

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const updated = await updateImage(image.id, { title, description });
      setImage(updated);
      alert("Image updated successfully!");
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
      <Header
        introProps={{
          user,
          darkMode,
          albumsCount: 0,
          imagesCount: 1,
        }}
        navigationProps={{
          darkMode,
          toggleDarkMode: () => setDarkMode((prev) => !prev),
        }}
      />

      {/* IMAGE HEADER */}
      <section className="view-header">
        <div className="view-info">
          <h1 className="view-title">{image.title}</h1>
          <p className="view-description">
            {image.description || "No description provided."}
          </p>

          <div className="view-meta">
            <p>Uploaded by user #{image.uploader_user_id}</p>
            <p>Created on {format(new Date(image.created_at), "PPP")}</p>
            <p>Image ID: {image.id}</p>
          </div>
        </div>

        <img
          src={image.url}
          alt={image.title}
          className="view-cover h-64"
        />
      </section>

      {/* EDIT IMAGE */}
      {canEdit && (
        <section className="view-edit-section">
          <form
            onSubmit={handleUpdateImage}
            className={`form-container ${darkMode ? "form-dark" : "form-light"}`}
          >
            <h2 className="view-form-title">Edit Image</h2>

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

            <button
              type="submit"
              className={`button-set ${
                darkMode ? "button-set-dark" : "button-set-light"
              }`}
            >
              Save Changes
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
