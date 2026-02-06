// frontend/src/services/api.js
// API

// EXPORT
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// AUTH
// AUTH LOGIN
export const login = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(error.detail || "Login failed");
  }

  const data = await res.json();
  const token = data.access_token || data.accessToken;
  const userWithToken = { ...data.user, accessToken: token };
  return userWithToken;
};

// AUTH HEADERS
function getAuthHeaders() {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const token = user?.accessToken || user?.access_token;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// HEALTH CHECK
export const healthCheck = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ HEALTH CHECK ERROR:", err);
    return { status: "error", error: err.message };
  }
};

// ----------------------
// GALLERY
// ----------------------

// GET GALLERY
export const getGallery = async (skip = 0, limit = 100, search = null) => {
  const params = new URLSearchParams({ skip, limit });
  if (search) params.append("search", search);

  const res = await fetch(`${API_BASE_URL}/gallery?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
};

// IMAGES
// GET ALL IMAGES
export const getImages = async (skip = 0, limit = 100) => {
  const params = new URLSearchParams({ skip, limit });
  const res = await fetch(`${API_BASE_URL}/images?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
};

// GET SINGLE IMAGE
export const getImage = async (imageId) => {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch image");
  return res.json();
};

export const uploadImage = async (file, title, description, albumIds = [], userTags = []) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  if (description) formData.append("description", description);
  if (albumIds.length > 0) formData.append("album_ids", albumIds.join(","));
  if (userTags.length > 0) formData.append("user_tags", userTags.join(","));

  const headers = getAuthHeaders();
  delete headers["Content-Type"]; // Let browser set boundary for FormData

  const res = await fetch(`${API_BASE_URL}/images/`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Failed to upload image" }));
    throw new Error(error.detail || "Failed to upload image");
  }

  return res.json();
};

export const updateImage = async (imageId, data) => {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update image");
  return res.json();
};

export const deleteImage = async (imageId) => {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete image");
  return res.json();
};

// ADD/REMOVE IMAGES TO/FROM ALBUMS
export const addImageToAlbum = async (imageId, albumId) => {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}/albums/${albumId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to add image to album");
  return res.json();
};

export const removeImageFromAlbum = async (imageId, albumId) => {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}/albums/${albumId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove image from album");
  return res.json();
};

// =========================
// ALBUMS
// =========================
export const getAlbums = async () => {
  const res = await fetch(`${API_BASE_URL}/albums/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch albums");
  return res.json();
};

export const getAlbum = async (albumId) => {
  const res = await fetch(`${API_BASE_URL}/albums/${albumId}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};

export const getAlbumImages = async (albumId) => {
  const res = await fetch(`${API_BASE_URL}/albums/${albumId}/images`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch album images");
  return res.json();
};

export const createAlbum = async (title, description = null, defaultImage = null) => {
  const formData = new FormData();
  formData.append("title", title);
  if (description) formData.append("description", description);
  if (defaultImage) formData.append("default_image", defaultImage);

  const headers = getAuthHeaders();
  delete headers["Content-Type"]; // Let browser set the boundary for FormData

  const res = await fetch(`${API_BASE_URL}/albums/`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Failed to create album" }));
    throw new Error(error.detail || "Failed to create album");
  }

  return res.json();
};

export const updateAlbum = async (albumId, data) => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.description !== undefined) formData.append("description", data.description);
  if (data.default_image) formData.append("default_image", data.default_image);

  const headers = getAuthHeaders();
  delete headers["Content-Type"]; // Let browser set boundary

  const res = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
    method: "PUT",
    headers,
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update album");
  return res.json();
};

export const deleteAlbum = async (albumId) => {
  const res = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete album");
  return res.json();
};

// =========================
// S3 UPLOAD HELPERS
// =========================
export const uploadFileToS3 = async (file, path) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path); // e.g., avatars/{userId}/avatar.jpg

  const res = await fetch(`${API_BASE_URL}/s3-upload`, {
    method: "POST",
    body: formData,
    headers: getAuthHeaders(), // include auth
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Failed to upload file" }));
    throw new Error(error.detail || "Failed to upload file");
  }

  return res.json(); // returns { s3_key, s3_url }
};

// =========================
// UPDATE ALBUM (EXTENDED)
// =========================
export const updateAlbumWithCover = async (albumId, data, coverFile = null) => {
  let coverData = null;

  if (coverFile) {
    // Upload cover image to S3 first
    coverData = await uploadFileToS3(coverFile, `album_images/${albumId}_cover.jpg`);
  }

  // Append S3 cover key to data if uploaded
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.description !== undefined) formData.append("description", data.description);
  if (coverData?.s3_key) formData.append("default_image", coverFile); // send as file for backend processing

  const headers = getAuthHeaders();
  delete headers["Content-Type"]; // let browser set boundary

  const res = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
    method: "PUT",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Failed to update album" }));
    throw new Error(error.detail || "Failed to update album");
  }

  return res.json();
};


// =========================
// FAVORITES
// =========================
export const getFavorites = async () => {
  const res = await fetch(`${API_BASE_URL}/favorites/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
};

export const addFavorite = async (imageId) => {
  const res = await fetch(`${API_BASE_URL}/favorites/${imageId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
};

export const removeFavorite = async (imageId) => {
  const res = await fetch(`${API_BASE_URL}/favorites/${imageId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
  return res.json();
};

export const checkFavorite = async (imageId) => {
  const res = await fetch(`${API_BASE_URL}/favorites/${imageId}/check`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to check favorite");
  return res.json();
};

// =========================
// SHARE LINKS
// =========================
export const createShareLink = async (resourceType, resourceId, expiresAt = null) => {
  const res = await fetch(`${API_BASE_URL}/share-links/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ resource_type: resourceType, resource_id: resourceId, expires_at: expiresAt }),
  });
  if (!res.ok) throw new Error("Failed to create share link");
  return res.json();
};

export const getShareLink = async (token) => {
  const res = await fetch(`${API_BASE_URL}/share-links/token/${token}`);
  if (!res.ok) throw new Error("Failed to fetch share link");
  return res.json();
};

export const deleteShareLink = async (linkId) => {
  const res = await fetch(`${API_BASE_URL}/share-links/${linkId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete share link");
  return res.json();
};
