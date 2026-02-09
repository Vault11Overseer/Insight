// frontend/src/components/module/ImageCard.jsx
// IMAGE CARD


// IMPORTS
import React from "react";
import { Eye, Trash2, User } from "lucide-react";
import defaultImage from "/default_album_image.png";

// EXPORT IMAGE CARD
export default function ImageCard({ image, onOpen, onDelete, canEdit, darkMode,}) {
  
  // HANDLE OPEN IMAGE
  const handleOpen = (e) => {
    e.stopPropagation();
    onOpen(image);
  };

  // HANDLE DELETE IMAGE
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(image);
    }
  };

  // RESOLVE IMAGE SOURCE
  const imageSrc =
    image.preview_url ||
    image.s3_url ||
    image.url ||
    defaultImage;

  // RENDER
  return (
    <div
      className={`group card ${darkMode ? "card-dark" : "card-light"}`}
      onClick={handleOpen}
    >
      {/* IMAGE */}
      <div className="card-image-wrapper">
        <img
          src={imageSrc}
          alt={image.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          className="card-image"
        />

        {/* HOVER ACTION ICONS */}
        <div
          className="card-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          {/* VIEW ICON */}
          <button
            onClick={handleOpen}
            className={`card-action-icon card-action-scale ${
              darkMode
                ? "card-action-edit-dark"
                : "card-action-edit-light"
            }`}
            title="View Image"
          >
            <Eye size={18} />
          </button>

          {/* DELETE ICON (ONLY IF USER CAN EDIT) */}
          {canEdit && (
            <button
              onClick={handleDelete}
              className="card-action-icon card-action-delete card-action-scale"
              title="Delete Image"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* OWNER BADGE */}
      {image.uploader_user_id && (
        <div className="card-owner-badge">
          <User size={14} />
        </div>
      )}

      {/* IMAGE INFO */}
      <div className="card-body">
        <h3 className="card-title">{image.title}</h3>

        {image.description && (
          <p className="card-description">
            {image.description}
          </p>
        )}
      </div>
    </div>
  );
}
