// // frontend/src/services/UserDataContext.jsx
// // USER DATA CONTEXT

// // IMPORT
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { getAlbums, getImages } from "./api";

// // STATE
// const UserDataContext = createContext(null);

// // EXPORT
// export function UserDataProvider({ children }) {

//   // =========================
//   // USER AUTH STATE
//   // =========================
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser =
//         localStorage.getItem("user") || sessionStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       console.error("Failed to parse user from storage", error);
//       return null;
//     }
//   });

//   // LOGOUT
// const logout = () => {
//   setUser(null);
//   localStorage.removeItem("user");
//   sessionStorage.removeItem("user");
// };

// // USERDATA CONTEXT
// const canEditAlbum = (album) => {
//   if (!user) return false;
//   return isAdmin || album.owner_user_id === user.id;
// };


//   // =========================
//   // UI STATE
//   // =========================
//   const [darkMode, setDarkMode] = useState(() => {
//     return JSON.parse(localStorage.getItem("darkMode")) ?? true;
//   });

//   // =========================
//   // DATA COUNTS
//   // =========================
//   const [albumsCount, setAlbumsCount] = useState(0);
//   const [imagesCount, setImagesCount] = useState(0);

//   // =========================
//   // DERIVED STATE
//   // =========================
//   const isAuthenticated = !!user;
//   const isAdmin = user?.role === "admin";

//   // =========================
//   // SYNC USER TO STORAGE
//   // =========================
//   useEffect(() => {
//     if (!user) {
//       localStorage.removeItem("user");
//       sessionStorage.removeItem("user");
//       setAlbumsCount(0);
//       setImagesCount(0);
//       return;
//     }

//     // Preserve original storage choice
//     const storage =
//       sessionStorage.getItem("user") !== null
//         ? sessionStorage
//         : localStorage;

//     storage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   // =========================
//   // SYNC DARK MODE
//   // =========================
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//   }, [darkMode]);

//   // =========================
//   // FETCH ALBUM & IMAGE COUNTS
//   // =========================
//   const refreshCounts = useCallback(async () => {
//     if (!user) return;

//     try {
//       const [albums, images] = await Promise.all([
//         getAlbums(),
//         getImages(),
//       ]);

//       // USERS → count only their own
//       // ADMINS → still show personal counts here (dashboard intent)
//       const userAlbumsCount = albums.filter(
//         (a) => a.owner_user_id === user.id
//       ).length;

//       const userImagesCount = images.filter(
//         (img) => img.uploader_user_id === user.id
//       ).length;

//       setAlbumsCount(userAlbumsCount);
//       setImagesCount(userImagesCount);
//     } catch (err) {
//       console.error("Failed to load counts:", err);
//     }
//   }, [user]);

//   // INITIAL LOAD
//   useEffect(() => {
//     refreshCounts();
//   }, [refreshCounts]);

//   // =========================
//   // RETURN CONTEXT PROVIDER
//   // =========================
//   return (
//     <UserDataContext.Provider
//       value={{
//         // AUTH
//         user,
//         setUser,
//         isAuthenticated,
//         isAdmin,
//         logout,

//         // UI
//         darkMode,
//         setDarkMode,

//         // COUNTS
//         albumsCount,
//         imagesCount,
//         refreshCounts,
//       }}
//     >
//       {children}
//     </UserDataContext.Provider>
//   );
// }

// // EXPORT USE CONTEXT
// export function useUserData() {
//   return useContext(UserDataContext);
// }



// frontend/src/services/UserDataContext.jsx
// USER DATA CONTEXT

// IMPORTS
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getAlbums, getImages } from "./api";

// STATE
const UserDataContext = createContext(null);

// EXPORT
export function UserDataProvider({ children }) {
  // =========================
  // USER AUTH STATE
  // =========================
  const [user, setUser] = useState(() => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      return null;
    }
  });

  // =========================
  // DERIVED AUTH STATE
  // =========================
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  // =========================
  // PERMISSIONS
  // =========================
  // CENTRALIZED EDIT LOGIC
  // NOTE: BACKEND IS SOURCE OF TRUTH — THIS IS UI ONLY
  const canEditAlbum = (album) => {
    if (!user || !album) return false;
    if (isAdmin) return true;
    return album.owner_user_id === user.id;
  };

  // =========================
  // UI STATE
  // =========================
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) ?? true;
  });

  // =========================
  // DATA COUNTS (DASHBOARD INTENT)
  // =========================
  const [albumsCount, setAlbumsCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  // =========================
  // SYNC USER TO STORAGE
  // =========================
  useEffect(() => {
    if (!user) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setAlbumsCount(0);
      setImagesCount(0);
      return;
    }

    // PRESERVE ORIGINAL STORAGE CHOICE
    const storage =
      sessionStorage.getItem("user") !== null
        ? sessionStorage
        : localStorage;

    storage.setItem("user", JSON.stringify(user));
  }, [user]);

  // =========================
  // SYNC DARK MODE
  // =========================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // =========================
  // FETCH USER-SCOPED COUNTS
  // =========================
  /**
   * ⚠️ KNOWN FUTURE REFACTOR
   * Currently fetches ALL albums/images and filters locally.
   * This WILL move to:
   *  - GET /albums?scope=mine
   *  - GET /images?scope=mine
   * Do NOT move yet.
   */
  const refreshCounts = useCallback(async () => {
    if (!user) return;

    try {
      const [albums, images] = await Promise.all([
        getAlbums(),
        getImages(),
      ]);

      const userAlbumsCount = albums.filter(
        (a) => a.owner_user_id === user.id
      ).length;

      const userImagesCount = images.filter(
        (img) => img.uploader_user_id === user.id
      ).length;

      setAlbumsCount(userAlbumsCount);
      setImagesCount(userImagesCount);
    } catch (err) {
      console.error("Failed to load counts:", err);
    }
  }, [user]);

  // INITIAL LOAD
  useEffect(() => {
    refreshCounts();
  }, [refreshCounts]);

  // =========================
  // RETURN CONTEXT PROVIDER
  // =========================
  return (
    <UserDataContext.Provider
      value={{
        // AUTH
        user,
        setUser,
        isAuthenticated,
        isAdmin,
        logout,

        // UI
        darkMode,
        setDarkMode,

        // COUNTS
        albumsCount,
        imagesCount,
        setAlbumsCount,
        setImagesCount,
        refreshCounts,

        // PERMISSIONS
        canEditAlbum,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

// EXPORT USE CONTEXT
export function useUserData() {
  return useContext(UserDataContext);
}
