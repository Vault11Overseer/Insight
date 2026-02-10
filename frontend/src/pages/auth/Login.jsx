// frontend/src/pages/auth/Login.jsx
// LOGIN AUTH
// DONE

// IMPORTS
import React, { useState } from "react";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Slideshow, { introSlides } from "../../components/module/Slideshow";
import { login } from "../../services/api";
import { useUserData } from "../../services/UserDataContext";

// LOGIN
export default function Login() {

  // CONTEXT
  const { setUser, darkMode, setDarkMode } = useUserData();
  const navigate = useNavigate();

  // LOCAL STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const [rememberMe, setRememberMe] = useState(
    () => JSON.parse(localStorage.getItem("rememberMe")) ?? false
  );

  // DARK MODE TOGGLE
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // PERSIST LOGIN
  const persistLogin = (user) => {
    // CLEAR BOTH STORAGES FIRST (SAFETY)
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));

    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
    setUser(user);
    navigate("/dashboard");
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userWithToken = await login(email, password);
      persistLogin(userWithToken);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login.");
    }
  };

  // RENDER
  return (
    // LOGIN PAGE
    <div className={`auth-page ${darkMode ? "page-set-dark" : "page-set-light"}`}>

      {/* AUTH CONTAINER */}
      <div className={`auth-container ${darkMode ? "auth-container-dark" : "auth-container-light"}`}>

        {/* LEFT SLIDESHOW */}
        <div className="auth-left">
          <Slideshow
            slides={introSlides}
            darkMode={darkMode}
            containerHeight="80vh"
          />
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="auth-right">

          {/* HEADER */}
          <div className="auth-header">
            <h2 className="auth-title">Welcome!</h2>

            <button
              onClick={toggleDarkMode}
              className={`theme-toggle transform transition-transform duration-200 hover:scale-105 cursor-pointer ${
                darkMode ? "theme-toggle-dark" : "theme-toggle-light"
              }`}
            >
              {darkMode  ? <Sun size={30} /> : <Moon size={30} />}
            </button>
          </div>

          {/* SUBTEXT */}
          <p className="auth-subtext pb-2">Sign in to access Insight.</p>
          <p className="auth-subtext mb-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`link hover:text-[19px] ${darkMode ? "link-dark" : "link-light"}`}
            >
              Register
            </Link>{" "}
            here!
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-2">
              {error}
            </p>
          )}

          {/* FORM */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105 ${darkMode ? "text-[#bdd63b] border-2 border-slate-400 bg-slate-100 rounded-xl p-0.5" : "text-[#1E3A8A] border-2 border-slate-400 bg-white rounded-xl p-0.5 "}`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* REMEMBER ME */}
            <label className={`flex items-center link ${
                  darkMode ? "link-dark" : "link-light"
                }`}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`m-3 transform scale-150 ${
                  darkMode ? "accent-[#BDD63B]" : "accent-[#1e1c29]"
                }`}
              />
              Remember Me
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
            >
              Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
