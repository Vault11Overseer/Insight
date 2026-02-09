// USER DATA CONTEXT

// IMPORTS
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getAlbums,
  getImages,
  uploadImage,
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "./api";

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

  const canEditImage = (image) => {
    if (!user || !image) return false;
    if (isAdmin) return true;
    return image.uploader_user_id === user.id;
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
  // USER-SCOPED IMAGES
  // =========================
  const [userImages, setUserImages] = useState([]);
  const [loadingUserImages, setLoadingUserImages] = useState(true);

  const refreshUserImages = useCallback(async () => {
    if (!user) return;

    setLoadingUserImages(true);
    try {
      const allImages = await getImages();
      const filtered = allImages.filter((img) =>
        isAdmin ? true : img.uploader_user_id === user.id
      );
      setUserImages(filtered);
      setImagesCount(filtered.length);
    } catch (err) {
      console.error("Failed to fetch user images:", err);
      setUserImages([]);
      setImagesCount(0);
    } finally {
      setLoadingUserImages(false);
    }
  }, [user, isAdmin]);

  // =========================
  // SYNC USER TO STORAGE
  // =========================
  useEffect(() => {
    if (!user) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setAlbumsCount(0);
      setImagesCount(0);
      setUserImages([]);
      return;
    }

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
      const [albums, images] = await Promise.all([getAlbums(), getImages()]);
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

  // =========================
  // FAVORITES STATE
  // =========================
  const [favorites, setFavorites] = useState([]);

  const refreshFavorites = useCallback(async () => {
    if (!user) return;
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = async (imageId) => {
    try {
      await addFavorite(imageId);
      await refreshFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromFavorites = async (imageId) => {
    try {
      await removeFavorite(imageId);
      await refreshFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (imageId) => {
    return favorites.some((f) => f.image_id === imageId);
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    refreshUserImages();
    refreshCounts();
    refreshFavorites();
  }, [refreshUserImages, refreshCounts, refreshFavorites]);

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

        // IMAGES
        userImages,
        refreshUserImages,
        loadingUserImages,

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
        canEditImage,

        // FAVORITES
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
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
