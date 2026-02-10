// frontend/src/components/module/AlbumCard.jsx
// ALBUM CARD
// DONE

// IMPORTS
import { BookUser, Trash2, Pencil, Image as ImageIcon } from "lucide-react";
import defaultImage from "/default_album_image.png";
import { useNavigate } from "react-router-dom";

// EXPORT ALBUM CARD
export default function AlbumCard({
  album,
  canEdit,
  onOpen,
  onDelete,
  darkMode,
}) {
  // NAVIGATE STATE
  const navigate = useNavigate();

  // HANDLE OPEN ALBUM
  const handleOpen = (e) => {
    e.stopPropagation();
    navigate(`/albums/${album.id}`); // AlbumView page
  };

  // HANDLE DELETE
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(album);
  };

  // IMAGE COUNT (SUPPORT MULTIPLE BACKEND SHAPES)
  const imageCount =
    album.image_count !== undefined && album.image_count !== null
      ? Number(album.image_count)
      : Array.isArray(album.images)
      ? album.images.length
      : Array.isArray(album.image_ids)
      ? album.image_ids.length
      : 0;

  // RENDER
  return (
    <div
      className={`group card ${darkMode ? "card-dark" : "card-light"}`}
      onClick={() => onOpen(album)}
    >
      {/* IMAGE */}
      <div className="card-image-wrapper">
        <img
          src={album.cover_image_url?.trim() || defaultImage}
          alt={album.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          className="card-image bg-white"
        />

         {/* OWNER BADGE */}
      {album.owner_user_id && (
        <div className="card-owner-badge">
          <BookUser size={14} />
        </div>
      )}

        {/* HOVER ACTION ICONS */}
        <div className="card-overlay" onClick={(e) => e.stopPropagation()}>
          {/* EDIT ICON */}
          <button
            onClick={handleOpen}
            className={`card-action-icon card-action-scale ${
              darkMode
                ? "card-action-edit-dark"
                : "card-action-edit-light"
            }`}
            title="View / Edit Album"
          >
            <Pencil size={18} />
          </button>

          {/* DELETE ICON */}
          <button
            onClick={handleDelete}
            className="card-action-icon card-action-delete card-action-scale"
            title="Delete Album"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

     


        
      {/* ALBUM TITLE */}
      <div className="card-body">
        {/* IMAGE COUNT */}
        <div className="">
          <span className="flex flex-row gap-1 items-center">
             {imageCount} <ImageIcon size={14} /> {imageCount === 1 ? "Image" : "Images"} 
          </span>
        </div>

        {/* ALBUM TITLE */}
        <h3 className="card-title">
          {album.title}
        </h3>

        

        {/* ALBUM DESCRIPTION */}
        {album.description && (
          <p className="card-description">
            {album.description}
          </p>
        )}

        
      </div>
    </div>
  );
}
