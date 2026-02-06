// frontend/src/components/module/submodule/Intro.jsx
// INTRO
// DONE

// IMPORTS
import { useUserData } from "../../../services/UserDataContext";

// EXPORT INTRO
export default function Intro() {

  // STATE
  const { user, darkMode, albumsCount, imagesCount } = useUserData();

  // GUARD: USER NOT LOADED YET
  if (!user) {
    return (
      <div className="intro-container">
        <h1 className={`intro-title ${darkMode ? "text-white" : "text-black"}`}>
          Welcome!
        </h1>
      </div>
    );
  }

  // RETURN
  return (
    // WELCOME SECTION
    <div className="intro-container">

      {/* TITLE */}
      <h1 className={`intro-title ${darkMode ? "text-white" : "text-black"}`}>
        Welcome,{" "}
        <span className={`intro-user-name ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
          {user.first_name && user.last_name
            ? `${user.first_name} ${user.last_name}`
            : user.username || "User"}
        </span>
        !
      </h1>

      {/* ALBUM COUNT */}
      <p className={`intro-count-text ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        You’ve created{" "}
        <span className={`intro-count-number ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
          {albumsCount}
        </span>{" "}
        albums.
      </p>

      {/* IMAGES COUNT */}
      <p className={`intro-count-text ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        You have uploaded{" "}
        <span className={`intro-count-number ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
          {imagesCount}
        </span>{" "}
        images.
      </p>

    </div>
  );
}
