// frontend/src/pages/auth/Login.jsx
// LOGIN AUTH

// IMPORT
import React, { useState } from "react";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Slideshow, { introSlides } from "../../components/module/Slideshow";
import { API_BASE_URL } from "../../services/api";
import { useUserData } from "../../services/UserDataContext";

// LOGIN
export default function Login() {
  // STATE
  const { darkMode, setDarkMode } = useUserData();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@insight.local"); // pre-fill dev user
  const [password, setPassword] = useState("devpassword");   // pre-fill dev password
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => JSON.parse(localStorage.getItem("rememberMe")) ?? false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const persistLogin = (user) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
    navigate("/dashboard");
  };

  // DEV LOGIN
  const handleDevLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Login failed" }));
        alert(`Login failed: ${err.detail}`);
        return;
      }

      const data = await res.json();
      persistLogin(data.user);
    } catch (err) {
      console.error("Dev login error:", err);
      alert("Error connecting to backend.");
    }
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleDevLogin();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-slate-100 text-black"}`}>
      <div className={`flex w-[900px] max-w-full rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500 ${darkMode ? "bg-[linear-gradient(to_right,#262627,#4f4e4f,#262526)]" : "bg-[linear-gradient(to_right,#d1d5db,#e4e4e7,#e4e4e7)]"}`} style={{ maxHeight: "90vh" }}>
        {/* LEFT SLIDESHOW */}
        <div className="w-1/2 hidden md:block">
          <Slideshow slides={introSlides} darkMode={darkMode} containerHeight="80vh" />
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Welcome!</h2>
            <button onClick={toggleDarkMode} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 transition-colors duration-300">
              {darkMode ? <Sun className="text-black" size={30} /> : <Moon className="text-black" size={30} />}
            </button>
          </div>

          <p className={`text-lg mb-1 ${darkMode ? "text-white" : "text-black"}`}>Sign in to access Insight.</p>
          <p className={`text-lg mb-6 ${darkMode ? "text-white" : "text-black"}`}>
            Don't have an account? <Link to="/register" className={`font-medium hover:underline ${darkMode ? "text-[#BDD63B]" : "text-[#1E1C29]"}`}>Register</Link>
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`} />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="accent-[#BDD63B]" />
              <span className={darkMode ? "text-white" : "text-black"}>Remember Me</span>
            </label>

            <button type="submit" className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
