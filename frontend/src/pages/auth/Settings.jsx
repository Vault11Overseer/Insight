// frontend/src/pages/Settings.jsx
// SETTINGS

// IMPORTS
import React, { useState, useEffect } from "react";
import Header from "../../components/module/Header";
import { useUserData } from "../../services/UserDataContext";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  // USER CONTEXT
  const { darkMode, setDarkMode, user, setUser } = useUserData();

  // PROFILE STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // PASSWORD STATE
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setUser(data.user);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // =========================
  // UPDATE PASSWORD
  // =========================
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/users/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password update failed");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password updated successfully.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
      {/* HEADER */}
      <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />

      {/* PAGE TITLE */}
      <div className="flex items-center gap-2 mt-10 mb-6">
        <SettingsIcon
          size={38}
          className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}
        />
        <h1 className="text-4xl font-semibold">Settings</h1>
        <p className="text-1xl opacity-90 mt-2 font-bold">
          Manage your account and security.
        </p>
      </div>

      <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />

      {/* PROFILE SETTINGS */}
      <h2 className="section-header">Profile Settings</h2>

      <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

          <button
            type="submit"
            className={`button-set ${
              darkMode ? "button-set-dark" : "button-set-light"
            }`}
          >
            Save Profile
          </button>
        </form>
      </section>

      {/* PASSWORD SETTINGS */}
      <h2 className="section-header">Change Password</h2>

      <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <label className="block font-medium">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

          <label className="block font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

          <label className="block font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`inputs-set ${
              darkMode ? "inputs-set-dark" : "inputs-set-light"
            }`}
          />

          <button
            type="submit"
            className={`button-set ${
              darkMode ? "button-set-dark" : "button-set-light"
            }`}
          >
            Update Password
          </button>
        </form>
      </section>

      {/* MESSAGE */}
      {message && (
        <p className="mt-6 font-semibold opacity-90">{message}</p>
      )}
    </div>
  );
}
