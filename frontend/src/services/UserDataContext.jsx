// frontend/src/services/UserDataContext.jsx
// USER DATA CONTEXT


// IMPORT
import React, {createContext, useContext, useEffect, useState,} from "react";
import { getAlbums, getImages } from "./api";
  
// STATE
const UserDataContext = createContext(null);

// EXPORT
export function UserDataProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      return null;
    }
  });
  const [albumsCount, setAlbumsCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) ?? true;
  });

  // SYNC DARK MODE
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // FETCH ALBUM AND IMAGE COUNT
  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      try {
        // Use API service functions that include the auth header
        const [albums, images] = await Promise.all([
          getAlbums(),
          getImages(),
        ]);

        // Filter counts on the client side
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
    };

    fetchCounts();
  }, [user]);

  // RETURN CONTEXT TO PROVIDER
  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser, // Expose setUser to consumers
        albumsCount,
        setAlbumsCount,
        imagesCount,
        darkMode,
        setDarkMode,
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
