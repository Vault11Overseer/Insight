// frontend/src/pages/Dashboard.jsx
// DASHBOARD

// IMPORTS
import { Images, ImageUp, LibraryBig, GalleryVerticalEnd } from "lucide-react";
import Header from "../components/module/Header";
import { Link } from "react-router-dom";
import { useUserData } from "../services/UserDataContext";

// EXPORT DASHBOARD
export default function Dashboard() {
  // STATE
  const { darkMode, setDarkMode } = useUserData();
  const cardClass = darkMode ? "dashboard-card dashboard-card-dark" : "dashboard-card dashboard-card-light";
  const iconClass = darkMode ? "dashboard-icon-dark" : "dashboard-icon-light";
  const dividerClass = darkMode ? "dashboard-divider-dark" : "dashboard-divider-light";

  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode(prev => !prev) }} />

      {/* UPLOAD CARD */}
      <div className="w-full">
        <Link to="/upload" className={cardClass}>
          <h2 className="dashboard-title">
            <ImageUp size={30} className={iconClass} /> Upload
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            Upload your own images.
          </h6>
        </Link>
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="section-grid-2">
        {/* ALBUMS CARD */}
        <Link to="/albums" className={cardClass}>
          <h2 className="dashboard-title">
            <LibraryBig size={30} className={iconClass} /> Albums
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            Create, View, Update, and Delete your albums.
          </h6>
        </Link>

        {/* PERSONAL IMAGES CARD */}
        <Link to="/images" className={cardClass}>
          <h2 className="dashboard-title">
            <Images size={30} className={iconClass} />Images
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            View, Update, and Delete your personal images.
          </h6>
        </Link>
      </div>

      {/* GALLERY CARD */}
      <div className="w-full">
        <Link to="/gallery" className={cardClass}>
          <h2 className="dashboard-title">
            <GalleryVerticalEnd size={30} className={iconClass} /> Gallery
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            Browse, Download, or Share all images uploaded to Insight.
          </h6>
        </Link>
      </div>
    </div>
  );
}
