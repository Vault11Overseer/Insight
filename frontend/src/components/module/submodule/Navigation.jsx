// // frontend/src/components/module/submodule/Navigation.jsx
// // NAVIGATION

// // IMPORTS
// import { useLocation, useNavigate } from "react-router-dom";
// import { Settings, Sun, Moon, ArrowLeft } from "lucide-react";
// import { useUserData } from "../../../services/UserDataContext";

// // EXPORT NAVIGATION
// export default function Navigation() {
//   // STATE
//   const { darkMode, setDarkMode, logout } = useUserData();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isDashboard = location.pathname === "/dashboard";

//   // DARK MODE TOGGLE
//   const toggleDarkMode = () => {setDarkMode((prev) => !prev);};

//   // LOGOUT (DEV NOW, COGNITO LATER)
//   const handleLogout = async () => {
//     try {
//       logout();
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout failed:", err);
//       alert("Failed to log out");
//     }
//   };

//   // RETURN
//   return (
//     // NAVIGATION CONTAINER
//     <div className="navigation-container">
// {/* THIS IS WHAT WE NEED TO FIX */}
//       {/* USER SETTINGS / BACK BUTTON */}
//       <button
//         onClick={() =>
//           isDashboard ? navigate("/settings") : isAlbum ? navigate("/albums") : navigate("/dashboard")
//         }
//         className={`nav-button-back group ${
//           darkMode ? "nav-button-back-dark" : "nav-button-back-light"
//         }`}
//       >
//         {isDashboard ? <Settings size={28} /> : <ArrowLeft size={28} />}
//         <span className="nav-button-back-label group-hover:max-w-[180px]">
//           {isDashboard ? "User Settings" : "Back To Dashboard"}
//         </span>
//       </button>




//       {/* LOGOUT BUTTON */}
//       <button
//         onClick={handleLogout}
//         className="nav-button-logout"
//       >
//         Logout
//       </button>

//       {/* DARK / LIGHT MODE TOGGLE */}
//       <button
//         onClick={toggleDarkMode}
//         className={`theme-toggle-small ${
//           darkMode ? "theme-toggle-dark" : "theme-toggle-light"
//         }`}
//       >
//         {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//     </div>
//   );
// }






// frontend/src/components/module/submodule/Navigation.jsx
// NAVIGATION

// IMPORTS
import { useLocation, useNavigate } from "react-router-dom";
import { Settings, Sun, Moon, ArrowLeft } from "lucide-react";
import { useUserData } from "../../../services/UserDataContext";

// EXPORT NAVIGATION
export default function Navigation() {
  // STATE
  const { darkMode, setDarkMode, logout } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // DARK MODE TOGGLE
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // LOGOUT
  const handleLogout = async () => {
    try {
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to log out");
    }
  };

  // BACK / SETTINGS LOGIC
  let backTarget = "/dashboard";
  let label = "Back To Dashboard";
  let icon = <ArrowLeft size={28} />;

  if (pathname === "/dashboard") {
    backTarget = "/settings";
    label = "User Settings";
    icon = <Settings size={28} />;
  } else if (pathname.startsWith("/albums/") && pathname !== "/albums") {
    // AlbumView
    backTarget = "/albums";
    label = "Back To Albums";
  } else if (pathname.startsWith("/images/") && pathname !== "/images") {
    // ImageView
    backTarget = "/images";
    label = "Back To Images";
  } else if (pathname.startsWith("/gallery/") && pathname !== "/gallery") {
    // Viewing specific image/album in gallery
    backTarget = "/gallery";
    label = "Back To Gallery";
  } else if (["/albums", "/images", "/gallery", "/upload"].includes(pathname)) {
    // Album/Image/Gallery/Upload lists
    backTarget = "/dashboard";
    label = "Back To Dashboard";
  }

  // RETURN
  return (
    <div className="navigation-container">
      {/* USER SETTINGS / BACK BUTTON */}
      <button
        onClick={() => navigate(backTarget)}
        className={`nav-button-back group ${
          darkMode ? "nav-button-back-dark" : "nav-button-back-light"
        }`}
      >
        {icon}
        <span className="nav-button-back-label group-hover:max-w-[180px]">
          {label}
        </span>
      </button>

      {/* LOGOUT BUTTON */}
      <button onClick={handleLogout} className="nav-button-logout">
        Logout
      </button>

      {/* DARK / LIGHT MODE TOGGLE */}
      <button
        onClick={toggleDarkMode}
        className={`theme-toggle-small ${
          darkMode ? "theme-toggle-dark" : "theme-toggle-light"
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
