// frontend/src/pages/Dashboard.jsx
// DASHBOARD
// DONE

// IMPORTS
import { Images, LibraryBig, GalleryVerticalEnd } from "lucide-react";
import Header from "../components/module/Header";
import { Link } from "react-router-dom";
import { useUserData } from "../services/UserDataContext";

// EXPORT DASHBOARD
export default function Dashboard() {
  // =========================
  // STATE
  // =========================
  const { darkMode, setDarkMode } = useUserData();

  const cardClass = darkMode
    ? "dashboard-card dashboard-card-dark"
    : "dashboard-card dashboard-card-light";

  const iconClass = darkMode
    ? "dashboard-icon-dark"
    : "dashboard-icon-light";

  const dividerClass = darkMode
    ? "dashboard-divider-dark"
    : "dashboard-divider-light";

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header
        navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }}
      />

      {/* TOP TWO-COLUMN SECTION */}
      <div className="section-grid-2">
        {/* IMAGES */}
        <Link to="/images" className={cardClass}>
          <h2 className="dashboard-title">
            <Images size={30} className={iconClass} /> Images
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            Upload, View, Update, and Delete your Images.
          </h6>
        </Link>

        {/* ALBUMS */}
        <Link to="/albums" className={cardClass}>
          <h2 className="dashboard-title">
            <LibraryBig size={30} className={iconClass} /> Albums
          </h2>
          <hr className={dividerClass} />
          <h6 className="dashboard-description">
            Create, View, Update, and Delete your Albums.
          </h6>
        </Link>
      </div>

      {/* GALLERY (FULL WIDTH, BOTTOM) */}
      <div className="w-full mt-10">
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
