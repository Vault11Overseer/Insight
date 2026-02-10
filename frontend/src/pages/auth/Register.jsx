// frontend/src/pages/auth/Register.jsx
// REGISTER
// DONE

// IMPORTS
import React, { useState } from "react";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Slideshow, { introSlides } from "../../components/module/Slideshow";
import { useUserData } from "../../services/UserDataContext";

// REGISTER
export default function Register() {

  // CONTEXT
  const { darkMode, setDarkMode } = useUserData();
  const navigate = useNavigate();

  // LOCAL STATE
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FORM STATE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // DARK MODE TOGGLE
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // FUTURE: Replace this block with Cognito + backend registration call
      // await register({ firstName, lastName, email, password });

      console.log("REGISTER PAYLOAD:", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      // TEMPORARY MOCK SUCCESS
      alert("Registration submitted! (Cognito signup pending)");
      navigate("/login");

    } catch (err) {
      console.error("REGISTRATION ERROR:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // RENDER
  return (
    // REGISTER PAGE
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

        {/* RIGHT REGISTER FORM */}
        <div className="auth-right">

          {/* HEADER */}
          <div className="auth-header">
            <h2 className="auth-title">Create an account</h2>

           
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
          <p className="auth-subtext mb-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`link hover:text-[19px] ${darkMode ? "link-dark" : "link-light"}`}
            >
              Log in
            </Link>
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="text-red-500 font-semibold mb-4">
              {error}
            </div>
          )}

          {/* FORM */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            {/* NAME FIELDS */}
            <div className="flex gap-3">
              <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
                required
              />

              <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
                required
              />
            </div>

            {/* EMAIL */}
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
                placeholder="Enter your Password"
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

            {/* TERMS */}
            <label className="flex items-center text-lg">
              <input type="checkbox" className={`m-3 transform scale-150 ${
                  darkMode ? "accent-[#BDD63B]" : "accent-[#1e1c29]"
                }`} required />
              I agree to the{" "}
              <Link
                to="#"
                
                className={`link ml-1 ${darkMode ? "link-dark" : "link-light"}`}
              >
                Terms & Conditions
              </Link>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
