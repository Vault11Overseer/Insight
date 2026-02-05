// // frontend/src/pages/auth/Login.jsx
// // LOGIN AUTH

// // IMPORT
// import React, { useState } from "react";
// import { Eye, EyeOff, Sun, Moon } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import Slideshow, { introSlides } from "../../components/module/Slideshow";
// import { login } from "../../services/api";
// import { useUserData } from "../../services/UserDataContext";

// // LOGIN
// export default function Login() {
//   // STATE
//   const { setUser, darkMode, setDarkMode } = useUserData();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("webdevadmin@bcimedia.com"); // pre-fill dev user
//   const [password, setPassword] = useState("devpassword");   // pre-fill dev password
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(() => JSON.parse(localStorage.getItem("rememberMe")) ?? false);

//   const toggleDarkMode = () => setDarkMode(prev => !prev);

//   const persistLogin = (user) => {
//     const storage = rememberMe ? localStorage : sessionStorage;
//     storage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
//     setUser(user);
//     navigate("/dashboard");
//   };

//   // FORM SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userWithToken = await login(email, password);
//       persistLogin(userWithToken);
//     } catch (err) {
//       console.error("Login error:", err);
//       alert(err.message || "An error occurred during login.");
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-slate-100 text-black"}`}>
//       <div className={`flex w-[900px] max-w-full rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500 ${darkMode ? "bg-[linear-gradient(to_right,#262627,#4f4e4f,#262526)]" : "bg-[linear-gradient(to_right,#d1d5db,#e4e4e7,#e4e4e7)]"}`} style={{ maxHeight: "90vh" }}>
//         {/* LEFT SLIDESHOW */}
//         <div className="w-1/2 hidden md:block">
//           <Slideshow slides={introSlides} darkMode={darkMode} containerHeight="80vh" />
//         </div>

//         {/* RIGHT LOGIN FORM */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
//           <div className="flex justify-between items-center">
//             <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Welcome!</h2>
//             <button onClick={toggleDarkMode} className=" flex items-center justify-center ">
//               {darkMode ? <Sun className="text-black bg-gray-300 w-12 h-12 p-2 rounded-full transition-colors duration-300" size={30} /> : <Moon className="text-white bg-black w-12 h-12 p-2 rounded-full transition-colors duration-300" size={30} />}
//             </button>
//           </div>

//           <p className={`text-lg mb-1 ${darkMode ? "text-white" : "text-black"}`}>Sign in to access Insight.</p>
//           <p className={`text-lg mb-6 ${darkMode ? "text-white" : "text-black"}`}>
//             Don't have an account? <Link to="/register" className={`font-medium hover:underline ${darkMode ? "text-[#BDD63B]" : "text-[#1E1C29]"}`}>Register</Link>
//           </p>

//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`} />
//             <div className="relative">
//               <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`} />
//               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-black">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
//             </div>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="accent-[#BDD63B]" />
//               <span className={darkMode ? "text-white" : "text-black"}>Remember Me</span>
//             </label>

//             <button type="submit" className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}>Sign In</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }









// // frontend/src/components/module/submodule/Intro.jsx
// // INTRO

// // IMPORTS
// import { useUserData } from "../../../services/UserDataContext";

// // EXPORT INTRO
// export default function Intro() {

//   // STATE
//   const { user, darkMode, albumsCount, imagesCount } = useUserData();

//   // RETURN
//   return (
//     // WELCOME SECTION
//     <div className="mb-10">
//      <h1 className={`text-3xl font-bold ${ darkMode ? "text-white" : "text-black" }`}>
//           Welcome,{" "}
//         <span
//           className={` ${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//           {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.username || "User"}
//         </span>
//         !
//       </h1>

//       {/* ALBUM COUNT */}
//       <p className={`mt-3 text-lg font-semibold  ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
//         You’ve created{" "}
//         <span className={`font-bold text-xl  ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//           {albumsCount}
//         </span>{" "}
//         albums.
//       </p>

//       {/* IMAGES COUNT */}
//       <p className={`mt-2 text-lg font-semibold ${ darkMode ? "text-gray-200" : "text-gray-800" }`}>
//         You have uploaded{" "}
//           <span className={`font-bold text-xl  ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//             {imagesCount}
//           </span>{" "}
//           images.
//       </p>

//     </div>
//   );
// }










// // frontend/src/components/module/submodule/Navigation.jsx
// // NAVIGATION

// // IMPORTS
// import { useLocation, useNavigate } from "react-router-dom";
// import { Settings, Sun, Moon, ArrowLeft } from "lucide-react";
// import { useUserData } from "../../../services/UserDataContext";

// // EXPORT NAVIGATION
// export default function Navigation({ toggleDarkMode }) {
//   // STATE
//   const { darkMode } = useUserData();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isDashboard = location.pathname === "/dashboard";

//   // LOGOUT (DEV NOW, COGNITO LATER)
//   const handleLogout = async () => {
//     try {
//       // ----------------------------------
//       // FUTURE: Cognito logout goes here
//       // ----------------------------------
//       // Example (later):
//       // await Auth.signOut({ global: true });

//       // DEV AUTH CLEANUP
//       localStorage.removeItem("user");
//       localStorage.removeItem("darkMode");

//       // REDIRECT TO LOGIN
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout failed:", err);
//       alert("Failed to log out");
//     }
//   };

//   // RETURN
//   return (

//     // NAVIGATION CONTAINER
//     <div className="flex flex-wrap items-center gap-3 mb-8 justify-end">


//       {/* USER SETTINGS / BACK BUTTON */}
//       <button
//         onClick={() =>
//           isDashboard ? navigate("/settings") : navigate("/dashboard")
//         }
//         className="pl-3 pr-5 py-1.5 group flex flex-row-reverse items-center rounded-full transition-all duration-300 overflow-hidden bg-[#BDD63B] text-black hover:bg-[#dcfa3e]"
      
//       >
//         {isDashboard ? <Settings size={28} /> : <ArrowLeft size={28} />}

//         <span className="font-semibold whitespace-nowrap max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-[180px] mr-2 text-left">
//           {isDashboard ? "User Settings" : "Back To Dashboard"}
//         </span>
//       </button>


//       {/* LOGOUT BUTTON */}
//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 rounded-lg bg-red-500 text-white transition-colors duration-300 hover:bg-red-700"
//       >Logout</button>



//       {/* DARK / LIGHT MODE TOGGLE */}
//       <button
//         onClick={toggleDarkMode}
//         className="p-2.5 rounded-full transition hover:scale-125"
//         style={{
//           backgroundColor: darkMode ? "white" : "black",
//         }}
//       >
//         {darkMode ? ( <Sun size={20} color="black" /> ) : ( <Moon size={20} color="white" />)}
//       </button>


//     </div>
//   );
// }












// // frontend/src/components/module/Slideshow.jsx
// // SLIDESHOW

// // IMPORT
// import React, { useState, useEffect } from "react";

// // EXPORT SLIDESHOW IMAGES
// export const introSlides = [
//   {
//     image: "/slideshow_images/winter-at-the-strater.jpg",
//     title: "Photo Gallery App",
//     subtitle: "For all BCI users",
//   },
//   {
//     image: "/slideshow_images/durango_road.jpg",
//     title: "Share Images",
//     subtitle: "Stay connected",
//   },
//   {
//     image: "/slideshow_images/durango_train.jpg",
//     title: "Data Insights",
//     subtitle: "Drive decisions",
//   },
// ];

// // EXPORT SLIDESHOW
// export default function Slideshow({ slides = [], darkMode = true, containerHeight = "80vh" }) {
//   // STATE
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const { image, title, subtitle } = slides[currentIndex];

//   // SLIDESHOW TRANSITION EFFECT
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   if (!slides.length) return null;

// // RETURN
//   return (

//     // SLIDESHOW CONTAINER
//     <div
//       className="relative w-full h-full overflow-hidden"
//       // style={{ height: containerHeight }} // lock container height
//     >
//       {/* IMAGE FILL */}
//       <img
//         src={image}
//         alt={`slide-${currentIndex}`}
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />

//       {/* LOGO */}
//       <div
//         className={`absolute top-5 left-5 px-3 py-3 rounded-lg font-bold text-lg shadow-lg px-5  ${
//           darkMode ? "bg-gradient-to-r from-slate-200 via-zinc-200 to-slate-300 text-black" : "bg-gradient-to-r from-slate-900 via-slate-600 to-zinc-900 text-white" 
//         }`}
//       >
//         {/* Logo Image */}
//         <img
//           src="/bci-favicon-green.ico"
//           alt="Logo"
//           className="inline-block w-6 h-6 mr-2 align-middle"
//         />
//         {/* Text */}
//         INSIGHT - BCI Media.
//       </div>

//       {/* CAPTION */}
//       <div className={`w-[65%] absolute bottom-10 left-1/2 -translate-x-1/2 text-center rounded-lg ${
//           darkMode ? "bg-gradient-to-r from-slate-200 via-zinc-200 to-slate-300 text-black" : "bg-gradient-to-r from-slate-900 via-slate-600 to-zinc-900 text-white" 
//         }`}>
      
      
      
//         <p
//           className={`px-3 py-4 font-bold text-lg  ${
//             darkMode ? "text-black" : "text-white"
//           }`}
//         >
//           {title}
//           <br />
//           {subtitle}
//         </p>
//       </div>

//       {/* DOTS */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, idx) => (
//           <span
//             key={idx}
//             className={`w-2 h-2 rounded-full ${
//               idx === currentIndex
//                 ? "bg-[#BDD63B]" // ACTIVE
//                 : "bg-gray-400" 
//             }`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }









// // frontend/src/pages/auth/Login.jsx
// // LOGIN AUTH

// // IMPORTS
// import React, { useState } from "react";
// import { Eye, EyeOff, Sun, Moon } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import Slideshow, { introSlides } from "../../components/module/Slideshow";
// import { login } from "../../services/api";
// import { useUserData } from "../../services/UserDataContext";

// // LOGIN
// export default function Login() {

//   // CONTEXT
//   const { setUser, darkMode, setDarkMode } = useUserData();
//   const navigate = useNavigate();

//   // LOCAL STATE
//   const [email, setEmail] = useState("webdevadmin@bcimedia.com");
//   const [password, setPassword] = useState("devpassword");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(
//     () => JSON.parse(localStorage.getItem("rememberMe")) ?? false
//   );

//   // DARK MODE TOGGLE
//   const toggleDarkMode = () => setDarkMode(prev => !prev);

//   // PERSIST LOGIN
//   const persistLogin = (user) => {
//     const storage = rememberMe ? localStorage : sessionStorage;
//     storage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
//     setUser(user);
//     navigate("/dashboard");
//   };

//   // FORM SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userWithToken = await login(email, password);
//       persistLogin(userWithToken);
//     } catch (err) {
//       console.error("Login error:", err);
//       alert(err.message || "An error occurred during login.");
//     }
//   };

//   // RENDER
//   return (
//     // LOGIN PAGE
//     <div className={`auth-page ${darkMode ? "page-set-dark" : "page-set-light"}`}>

//       {/* AUTH CONTAINER */}
//       <div className={`auth-container ${darkMode ? "auth-container-dark" : "auth-container-light"}`}>

//         {/* LEFT SLIDESHOW */}
//         <div className="auth-left">
//           <Slideshow
//             slides={introSlides}
//             darkMode={darkMode}
//             containerHeight="80vh"
//           />
//         </div>

//         {/* RIGHT LOGIN FORM */}
//         <div className="auth-right">

//           {/* HEADER */}
//           <div className="auth-header">
//             <h2 className="auth-title">Welcome!</h2>

//             <button
//               onClick={toggleDarkMode}
//               className={`theme-toggle hover:scale-125 ${darkMode ? "theme-toggle-dark" : "theme-toggle-light"}`}
//             >
//               {darkMode ? <Sun size={30} /> : <Moon size={30} />}
//             </button>
//           </div>

//           {/* SUBTEXT */}
//           <p className="auth-subtext pb-2">Sign in to access Insight.</p>
//           <p className="auth-subtext mb-6">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className={`link ${darkMode ? "link-dark" : "link-light"}`}
//             >
//               Register
//             </Link> here!
//           </p>

//           {/* FORM */}
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             />

//             {/* PASSWORD */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {/* REMEMBER ME */}
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className={`m-3 transform scale-150${darkMode ? "accent-[#BDD63B]" : "accent-[#1e1c29]"}`}
//               />
//               Remember Me
//             </label>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
//             >
//               Sign In
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






// // frontend/src/pages/auth/Register.jsx
// // REGISTER

// // IMPORTS
// import React, { useState, useEffect } from "react";
// import { Eye, EyeOff, Sun, Moon } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import Slideshow, { introSlides } from "../../components/module/Slideshow";
// import { useUserData } from "../../services/UserDataContext";

// export default function Register() {
//   // CONTEXT
//   const { darkMode, setDarkMode } = useUserData();
//   const navigate = useNavigate();

//   // LOCAL FORM STATE
//   const [showPassword, setShowPassword] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // DARK MODE 
//   const toggleDarkMode = () => setDarkMode((prev) => !prev);

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Placeholder until real auth is wired
//     console.log({ firstName, lastName, email, password });

//     alert("Registration submitted! (Cognito signup pending)");
//     navigate("/login");
//   };

//   // RENDER
//   return (
//     // REGISTER CONTAINER
//     <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
//       darkMode ? "bg-black text-white" : "bg-white text-black"
//     }`}>
//       <div
//         className={`flex w-[900px] max-w-full rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500 ${
//     darkMode ? "bg-[linear-gradient(to_right,#262627,#4f4e4f,#262526)]" : "bg-[linear-gradient(to_right,#d1d5db,#e4e4e7,#e4e4e7)]"
//   }`}
//   style={{ maxHeight: "90vh" }}>
//         {/* LEFT SLIDESHOW */}
//         <div className="w-1/2 hidden md:block">
//           <Slideshow slides={introSlides} darkMode={darkMode} containerHeight="80vh" />
//         </div>


//         {/* RIGHT FORM */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
//               Create an account
//             </h2>
//             <button onClick={toggleDarkMode} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 transition-colors duration-300">
//                           {darkMode ? <Sun className="text-black" size={30} /> : <Moon className="text-black" size={30} />}
//                         </button>
//           </div>

//           <p className={`text-lg mb-6 ${darkMode ? "text-white" : "text-black"}`}>
//             Already have an account?{" "}
//             <Link to="/login" className={`font-medium hover:underline ${darkMode ? "text-[#BDD63B]" : "text-[#1E1C29]"}`}>
//               Log in
//             </Link>
//           </p>

//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}

//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}

//               />
//             </div>

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}

//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}

//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <label className={`flex items-center text-lg ${darkMode ? "text-white" : "text-black"}`}>
//               <input type="checkbox" className="mr-2 accent-[#BDD63B] " />
//               I agree to the{" "}
//               <Link to="#" className={`ml-1 hover:underline ${darkMode ? "text-[#BDD63B]" : "text-[#1E1C29]"}`}>
//                 Terms & Conditions
//               </Link>
//             </label>

//             <button type="submit" className={`button-set ${ darkMode ? "button-set-dark" : "button-set-light" }`}
// >
//               Create Account
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }












// // frontend/src/pages/auth/Register.jsx
// // REGISTER

// // IMPORTS
// import React, { useState } from "react";
// import { Eye, EyeOff, Sun, Moon } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import Slideshow, { introSlides } from "../../components/module/Slideshow";
// import { useUserData } from "../../services/UserDataContext";

// // REGISTER
// export default function Register() {

//   // CONTEXT
//   const { darkMode, setDarkMode } = useUserData();
//   const navigate = useNavigate();

//   // LOCAL STATE
//   const [showPassword, setShowPassword] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // DARK MODE TOGGLE
//   const toggleDarkMode = () => setDarkMode(prev => !prev);

//   // FORM SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log({ firstName, lastName, email, password });
//     alert("Registration submitted! (Cognito signup pending)");
//     navigate("/login");
//   };

//   // RENDER
//   return (
//     // REGISTER PAGE
//     <div className={`auth-page ${darkMode ? "page-set-dark" : "page-set-light"}`}>

//       {/* AUTH CONTAINER */}
//       <div className={`auth-container ${darkMode ? "auth-container-dark" : "auth-container-light"}`}>

//         {/* LEFT SLIDESHOW */}
//         <div className="auth-left">
//           <Slideshow
//             slides={introSlides}
//             darkMode={darkMode}
//             containerHeight="80vh"
//           />
//         </div>

//         {/* RIGHT REGISTER FORM */}
//         <div className="auth-right">

//           {/* HEADER */}
//           <div className="auth-header">
//             <h2 className="auth-title">Create an account</h2>

//             <button
//               onClick={toggleDarkMode}
//               className={`theme-toggle ${darkMode ? "theme-toggle-dark" : "theme-toggle-light"}`}
//             >
//               {darkMode ? <Sun size={30} /> : <Moon size={30} />}
//             </button>
//           </div>

//           {/* SUBTEXT */}
//           <p className="auth-subtext mb-6">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className={`auth-link ${darkMode ? "auth-link-dark" : "auth-link-light"}`}
//             >
//               Log in
//             </Link>
//           </p>

//           {/* FORM */}
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

//             {/* NAME FIELDS */}
//             <div className="flex gap-3">
//               <input
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//               />

//               <input
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//               />
//             </div>

//             {/* EMAIL */}
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             />

//             {/* PASSWORD */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {/* TERMS */}
//             <label className="flex items-center text-lg">
//               <input type="checkbox" className="mr-2 accent-[#BDD63B]" />
//               I agree to the{" "}
//               <Link
//                 to="#"
//                 className={`auth-link ml-1 ${darkMode ? "auth-link-dark" : "auth-link-light"}`}
//               >
//                 Terms & Conditions
//               </Link>
//             </label>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
//             >
//               Create Account
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }







// // frontend/src/components/module/submodule/Navigation.jsx
// // NAVIGATION

// // IMPORTS
// import { useLocation, useNavigate } from "react-router-dom";
// import { Settings, Sun, Moon, ArrowLeft } from "lucide-react";
// import { useUserData } from "../../../services/UserDataContext";

// // EXPORT NAVIGATION
// export default function Navigation({ toggleDarkMode }) {

//   // STATE
//   const { darkMode } = useUserData();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isDashboard = location.pathname === "/dashboard";

//   // LOGOUT (DEV NOW, COGNITO LATER)
//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem("user");
//       localStorage.removeItem("darkMode");
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

//       {/* USER SETTINGS / BACK BUTTON */}
//       <button
//         onClick={() => isDashboard ? navigate("/settings") : navigate("/dashboard")}
//         className={`nav-button-back group ${darkMode ? "nav-button-back-dark" : "nav-button-back-light"}`}
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
//         className="theme-toggle-small"
//         style={{ backgroundColor: darkMode ? "white" : "black" }}
//       >
//         {darkMode ? <Sun size={20} color="black" /> : <Moon size={20} color="white" />}
//       </button>

//     </div>
//   );
// }







// // frontend/src/components/module/submodule/Intro.jsx
// // INTRO

// // IMPORTS
// import { useUserData } from "../../../services/UserDataContext";

// // EXPORT INTRO
// export default function Intro() {

//   // STATE
//   const { user, darkMode, albumsCount, imagesCount } = useUserData();

//   // RETURN
//   return (
//     // WELCOME SECTION
//     <div className="intro-container">

//       {/* TITLE */}
//       <h1 className={`intro-title ${darkMode ? "text-white" : "text-black"}`}>
//         Welcome,{" "}
//         <span className={`intro-user-name ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//           {user?.first_name && user?.last_name
//             ? `${user.first_name} ${user.last_name}`
//             : user?.username || "User"}
//         </span>
//         !
//       </h1>

//       {/* ALBUM COUNT */}
//       <p className={`intro-count-text ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
//         You’ve created{" "}
//         <span className={`intro-count-number ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//           {albumsCount}
//         </span>{" "}
//         albums.
//       </p>

//       {/* IMAGES COUNT */}
//       <p className={`intro-count-text ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
//         You have uploaded{" "}
//         <span className={`intro-count-number ${darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"}`}>
//           {imagesCount}
//         </span>{" "}
//         images.
//       </p>

//     </div>
//   );
// }







// // frontend/src/components/module/submodule/Searchbar.jsx
// // SEARCH BAR

// // IMPORTS
// import { Search as SearchIcon } from "lucide-react";

// // EXPORTS
// export default function SearchBar({
//   value,
//   onChange,
//   placeholder = "Search…",
// }) {
//   // RETURN
//   return (
//     // SEARCH CONTAINER
//     <div className="relative w-full ">
//       {/* ICON */}
//       <SearchIcon
//         size={18}
//         className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 text-black"
//       />
//       {/* INPUT */}
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-black outline-none shadow"
//       />
//     </div>
//   );
// }






// // frontend/src/pages/Upload.jsx
// // UPLOADS

// // IMPORTS
// import React, { useState, useEffect } from "react";
// import Header from "../components/module/Header";
// import { API_BASE_URL } from "../services/api";
// import defaultImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";
// import {ImageUp} from "lucide-react"

// // EXPORTS
// export default function Upload() {
//   // USER STATE
//   const { user: currentUser, darkMode, setDarkMode } = useUserData();
//   const [title, setTitle] = useState("");
//   // IMAGE STATE
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [userTags, setUserTags] = useState("");
//   const [albumId, setAlbumId] = useState("");
//   const [albums, setAlbums] = useState([]);
//   const [recentUploads, setRecentUploads] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // LOAD USER ALBUMS
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/albums/`);
//         const data = await res.json();
//         setAlbums(
//           Array.isArray(data)
//             ? data.filter((a) => a.owner_user_id === currentUser?.id)
//             : []
//         );
//       } catch (err) {
//         console.error("Failed to fetch albums", err);
//       }
//     };
//     if (currentUser) fetchAlbums();
//   }, [currentUser]);

//   // IMAGE UPLOAD PREVIEW
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);

//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     const input = document.getElementById("image-input");
//     if (input) input.value = "";
//   };

//   // UPLOAD IMAGE HANDLER
//   const handleUpload = async (e) => {
//   e.preventDefault();

//   // IS USER LOGGED IN
//   if (!currentUser) {
//     alert("You must be logged in to upload images.");
//     return;
//   }
//   // VALIDATION
//   if (!title.trim()) return alert("Title is required");
//   if (!description.trim()) return alert("Description is required");
//   if (!imageFile) return alert("Image file is required");
//   if (!userTags.trim()) return alert("Please provide at least one tag");

//   setLoading(true);
//   // TRY / EXCEPT
//     try {
//       // BACKEND FIELD NAMES: THE BACKEND EXPECTS THESE SPECIFIC FORM FIELD NAMES
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       // BACKEND EXPECTS THE FILE FIELD TO BE NAMED `file`
//       formData.append("file", imageFile);
//       // USER TAGS AS A COMMA-SEPARATED STRING
//       formData.append("user_tags", userTags);

//       // BACKEND EXPECTS COMMA-SEPARATED ALBUM IDS IN `album_ids`
//       if (albumId) {
//         formData.append("album_ids", albumId);
//       }

//     const res = await fetch(`${API_BASE_URL}/images/`, {
//       method: "POST",
//       credentials: "include", // ✅ IMPORTANT
//       body: formData,
//     });

//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       throw new Error(err.detail || "Failed to upload image");
//     }

//     const newImage = await res.json();

//     setRecentUploads((prev) => [newImage, ...prev]);

//     // RESET FORM
//     setTitle("");
//     setDescription("");
//     setImageFile(null);
//     setImagePreview(null);
//     setUserTags("");
//     setAlbumId("");

//     const input = document.getElementById("image-input");
//     if (input) input.value = "";
//   } catch (err) {
//     console.error(err);
//     alert(err.message || "Upload failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   // UPDATE EXISTING IMAGE
//   const handleUpdateImage = async (imageId, updates) => {
//     try {
//       // The backend `PUT /images/{id}` expects JSON body (ImageUpdate schema).
//       const payload = {};
//       if (updates.title) payload.title = updates.title;
//       if (updates.description) payload.description = updates.description;
//       if (updates.user_tags !== undefined) payload.user_tags = updates.user_tags;

//       const res = await fetch(`${API_BASE_URL}/images/${imageId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to update image");

//       const updated = await res.json();
//       setRecentUploads((prev) => prev.map((img) => (img.id === updated.id ? updated : img)));
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Update failed");
//     }
//   };

//   // RENDER
//   return (
//     // UPLOAD CONTAINER
//     <div className={`page-set ${ darkMode ? "page-set-dark" : "page-set-light" }`}>

//       {/* HEADER */}
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

//       {/* PAGE HEADER */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//       <ImageUp size={30} className={`${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"  }`}/>
//         <h1 className="text-4xl font-semibold">Uploads</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">
//           Upload your very own images.<br />
//           Add them to your albums now, or later but they all end up in the Gallery.
//         </p>
//       </div>

//       {/* UPLOAD FORM */}
//       <section className={`bg-set ${darkMode ? "bg-set-dark" : "bg-set-light" }`}>
//         <form
//           onSubmit={handleUpload}
//           className="p-6 rounded-2xl space-y-4"
//         >
//           {/* FORM HEADER */}
//           <h2 className="text-xl font-semibold">Upload New Image</h2>

//           {/* TITLE INPUT */}
//           <input
//             type="text"
//             placeholder="Image Title (Required)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             required
//           />

//           {/* DESCRIPTION INPUT */}
//           <textarea
//             placeholder="Image Description (Required)"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             rows={3}
//             required
//           />

//           {/* TAGS INPUT */}
//           <input
//             type="text"
//             placeholder="Image Tags (Comma-separated, at least one tag is Required)"
//             value={userTags}
//             onChange={(e) => setUserTags(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             required
//           />

//           {/* ALBUM COVER INPUT */}
//           <select
//             value={albumId}
//             onChange={(e) => setAlbumId(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//           >
//             <option value="">Add to Album (optional)</option>
//             {albums.map((a) => (
//               <option key={a.id} value={a.id}>{a.title}</option>
//             ))}
//           </select>

//           {/* IMAGE PREVIEW */}
//           <div className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}

// >
//             {imagePreview ? (
//               <div className="relative">
//                 <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain rounded-lg border-2 border-gray-300" />
//                 <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 hover:scale-105 text-white px-3 py-1 rounded text-sm">Remove</button>
//               </div>
//             ) : (
//               <label htmlFor="image-input" className={"flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"}>
//                 <div className="flex flex-col items-center justify-center text-center pt-5 pb-6 text-black">
//                   <p className="mb-2 text-sm text-xl text-center opacity-70">Click or drag & drop to upload your image.</p>
//                   <p>Accepted Image Typres: PNG, JPG, JPEG, SVG</p>
//                   <p>Upload File Size: 20 GIGS</p>
//                 </div>
//                 <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" required />
//               </label>
//             )}
//           </div>

//           {/* UPLOAD IMAGE BUTTON */}
//           <button type="submit" className={`button-set ${ darkMode ? "button-set-dark" : "button-set-light" }`}>
//             Upload Image
//           </button>

//           {/* FORM END */}
//         </form>
//       </section>





//       {/* RECENT UPLOADS */}
//       {recentUploads.length > 0 && (
//         <section className="my-10 space-y-6">
//           {recentUploads.map((img) => (
//             <div key={img.id} className={`p-6 rounded-2xl shadow space-y-4 ${darkMode ? "bg-[#BDD63B] text-black" : "bg-[#263248] text-white"}`}>
//               <h3 className="text-lg font-semibold">{img.title}</h3>
//               <img src={img.preview_url || defaultImage} alt={img.title} className="w-full h-48 object-contain rounded-lg" />
//               <p>{img.description}</p>
//               <p className="opacity-70">Tags: {img.user_tags?.join(", ")}</p>
//               <p className="opacity-70">Album: {img.album_title || "None"}</p>
//               <p className="opacity-70">Uploaded: {new Date(img.created_at).toLocaleString()}</p>

//               {/* Edit inline */}
//               <button
//                 onClick={() => {
//                   const newTitle = prompt("New title", img.title) || img.title;
//                   const newDescription = prompt("New description", img.description) || img.description;
//                   const newTags = prompt("Tags (comma-separated)", img.user_tags?.join(", ") || "") || "";
//                   handleUpdateImage(img.id, {
//                     title: newTitle,
//                     description: newDescription,
//                     user_tags: newTags
//                   });
//                 }}
//                 className="px-4 py-1 rounded-full border border-white hover:bg-white hover:text-black transition"
//               >
//                 Edit Info
//               </button>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// }








// // frontend/src/pages/Album.jsx
// // ALBUM

// // IMPORTS
// import React, { useEffect, useState } from "react";
// import Header from "../components/module/Header";
// import AlbumCard from "../components/module/AlbumCard";
// import { API_BASE_URL, createAlbum, deleteAlbum } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { LibraryBig } from "lucide-react";
// import defaultAlbumImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";

// // EXPORT
// export default function Albums() {
//   // USER STATE
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // ALBUM STATE
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverImagePreview, setCoverImagePreview] = useState(null);
//   // CURRENT USER STATE
//   const { user: currentUser, darkMode, setDarkMode, setAlbumsCount } = useUserData();
//   const navigate = useNavigate();

// // FETCH ALBUMS  
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/albums/`);
//         const data = await res.json();
//         setAlbums(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//         setAlbums([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // CHECK IF USER CAN EDIT ALBUM
//   const canEdit = (album) =>
//     album.owner_user_id === currentUser?.id ||
//     currentUser?.role === "admin";

//   const handleOpenAlbum = (album) => {
//     navigate(`/albums/${album.id}`);
//   };

//   // DELETE ALBUM
//   const handleDeleteAlbum = async (album) => {
//     if (!window.confirm(`Delete "${album.title}"?`)) return;

//     try {
//       await deleteAlbum(album.id);

//       setAlbums((prev) => prev.filter((a) => a.id !== album.id));
//     } catch (err) {
//       console.error("Error deleting album:", err);
//       alert("Failed to delete album.");
//     }
//   };

//   // IMAGE UPDATE
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       // Create preview URL
//       // CREATE PREVIEW URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setCoverImage(null);
//       setCoverImagePreview(null);
//     }
//   };

//   // IMAGE DELETE
//   const handleRemoveImage = () => {
//     setCoverImage(null);
//     setCoverImagePreview(null);
//     // RESET FILE INPUT
//     const fileInput = document.getElementById("cover-image-input");
//     if (fileInput) fileInput.value = "";
//   };

//   // CREATE ALBUM
//   const handleCreateAlbum = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const newAlbum = await createAlbum(title, description, coverImage);
//       setAlbums((prev) => [newAlbum, ...prev]);
//       setAlbumsCount((prev) => prev + 1);

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCoverImage(null);
//       setCoverImagePreview(null);
//       const fileInput = document.getElementById("cover-image-input");
//       if (fileInput) fileInput.value = "";
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to create album.");
//     }
//   };

//   if (loading) return <p className="p-8">Loading albums…</p>;

//   console.log(albums)


//   // RENDER
//   return (

//     // ALBUM CONTAINER
//     <div className={`page-set ${ darkMode ? "page-set-dark" : "page-set-light" }`}>

//       {/* HEADER */}
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

//       {/* PAGE HEADER */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//       <LibraryBig size={30} className={`${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"  }`}/>
//         <h1 className="text-4xl font-semibold">Albums</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">Manage your personal albums.</p>
//       </div>

//       {/* CREATE ALBUM FORM */}
//       <section className={`bg-set ${darkMode ? "bg-set-dark" : "bg-set-light" }`}>

//         <form
//           onSubmit={handleCreateAlbum}
//           className="w-full p-6 rounded-2xl space-y-4"
//         >
//           <h2 className="text-xl font-semibold">Create New Album</h2>
//           {/* TITLE INPUT */}
//           <input
//             type="text"
//             placeholder="Album title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             required
//           />
//           {/* DESCRIPTION INPUT */}
//           <textarea
//             placeholder="Album description (optional)"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             rows={3}
//           />

//           {/* COVER IMAGE UPLOAD */}
//           <div className="space-y-2 ">
//             <p className="block text-l font-medium">
//               Album Cover Image (optional)
//             </p>
//             <p className="text-l opacity-70">
//               {coverImage
//                 ? "Custom image selected. Click 'Remove' to use default image."
//                 : "If no image is selected, the default album image will be used."}
//             </p>

//             {coverImagePreview ? (
//               <div className="relative ">
//                 <img
//                   src={coverImagePreview}
//                   alt="Cover preview"
//                   className="w-full h-48 object-contain rounded-lg border-2 border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <div className="relative">
//                 <label htmlFor="cover-image-input" >
//                   <div className={`inputs-set flex flex-col items-center justify-center pt-5 pb-6 text black ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`} >
          
//                     <svg
//                       className="w-8 h-8 mb-2 opacity-50 "
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <p className="mb-2 text-sm text-xl opacity-70">
//                       <span className="font-semibold ">Click to upload</span> or
//                       drag and drop
//                     </p>
//                     <p className="text-bold text-black opacity-50 ">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </div>
//                   <input
//                     id="cover-image-input"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//                 {!coverImage && (
//                   <div className={`inputs-set mt-2 p-2 ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`} >
                  
//                     Default image preview:
//                     <img
//                       src={defaultAlbumImage}
//                       alt="Default album"
//                       className="mt-2 w-full p-2 h-24 object-contain rounded border-12"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* UPLOAD IMAGE BUTTON */}
//           <button type="submit" className={`button-set ${ darkMode ? "button-set-dark" : "button-set-light" }`}>
//             Create Album
//           </button>
//         </form>
//       </section>

//       {/* YOUR ALBUMS */}
//       <section className="my-10">
//         <h2 className="text-2xl font-semibold mb-6">Your Albums</h2>

//         {albums.filter((a) => a.owner_user_id === currentUser?.id).length ===
//         0 ? (
//           <p className="opacity-70">No Albums uploaded as of yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
//             {albums
//               .filter((a) => a.owner_user_id === currentUser?.id)
//               .map((album) => (
//                 <AlbumCard
//                   key={album.id}
//                   album={album}
//                   canEdit={canEdit(album)}
//                   onOpen={handleOpenAlbum}
//                   onDelete={handleDeleteAlbum}
//                   darkMode={darkMode}
//                 />
//               ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }







// // frontend/src/services/UserDataContext.jsx
// // USER DATA CONTEXT


// // IMPORT
// import React, {createContext, useContext, useEffect, useState,} from "react";
// import { getAlbums, getImages } from "./api";
  
// // STATE
// const UserDataContext = createContext(null);

// // EXPORT
// export function UserDataProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       console.error("Failed to parse user from storage", error);
//       return null;
//     }
//   });
//   const [albumsCount, setAlbumsCount] = useState(0);
//   const [imagesCount, setImagesCount] = useState(0);
//   const [darkMode, setDarkMode] = useState(() => {
//     return JSON.parse(localStorage.getItem("darkMode")) ?? true;
//   });

//   // SYNC DARK MODE
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//   }, [darkMode]);

//   // FETCH ALBUM AND IMAGE COUNT
//   useEffect(() => {
//     if (!user) return;

//     const fetchCounts = async () => {
//       try {
//         // Use API service functions that include the auth header
//         const [albums, images] = await Promise.all([
//           getAlbums(),
//           getImages(),
//         ]);

//         // Filter counts on the client side
//         const userAlbumsCount = albums.filter(
//           (a) => a.owner_user_id === user.id
//         ).length;
//         const userImagesCount = images.filter(
//           (img) => img.uploader_user_id === user.id
//         ).length;

//         setAlbumsCount(userAlbumsCount);
//         setImagesCount(userImagesCount);
//       } catch (err) {
//         console.error("Failed to load counts:", err);
//       }
//     };

//     fetchCounts();
//   }, [user]);

//   // RETURN CONTEXT TO PROVIDER
//   return (
//     <UserDataContext.Provider
//       value={{
//         user,
//         setUser, // Expose setUser to consumers
//         albumsCount,
//         setAlbumsCount,
//         imagesCount,
//         darkMode,
//         setDarkMode,
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







// frontend/src/pages/Albums.jsx
// // ALBUM

// // IMPORTS
// import React, { useEffect, useState } from "react";
// import Header from "../components/module/Header";
// import AlbumCard from "../components/module/AlbumCard";
// import { getAlbums, createAlbum, deleteAlbum } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { LibraryBig } from "lucide-react";
// import defaultAlbumImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";

// // EXPORT
// export default function Albums() {
//   // USER STATE
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // ALBUM STATE
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverImagePreview, setCoverImagePreview] = useState(null);
//   // CURRENT USER STATE
//   const { user: currentUser, darkMode, setDarkMode, setAlbumsCount } = useUserData();
//   const navigate = useNavigate();

//   // FETCH ALBUMS  
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const data = await getAlbums();
//         setAlbums(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//         setAlbums([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // CHECK IF USER CAN EDIT ALBUM
//   const canEdit = (album) =>
//     album.owner_user_id === currentUser?.id ||
//     currentUser?.role === "admin";

//   const handleOpenAlbum = (album) => {
//     navigate(`/albums/${album.id}`);
//   };

//   // DELETE ALBUM
//   const handleDeleteAlbum = async (album) => {
//     if (!window.confirm(`Delete "${album.title}"?`)) return;

//     try {
//       await deleteAlbum(album.id);
//       setAlbums((prev) => prev.filter((a) => a.id !== album.id));
//     } catch (err) {
//       console.error("Error deleting album:", err);
//       alert("Failed to delete album.");
//     }
//   };

//   // IMAGE UPDATE
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setCoverImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setCoverImage(null);
//       setCoverImagePreview(null);
//     }
//   };

//   // IMAGE DELETE
//   const handleRemoveImage = () => {
//     setCoverImage(null);
//     setCoverImagePreview(null);
//     const fileInput = document.getElementById("cover-image-input");
//     if (fileInput) fileInput.value = "";
//   };

//   // CREATE ALBUM
//   const handleCreateAlbum = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const newAlbum = await createAlbum(title, description, coverImage);
//       setAlbums((prev) => [newAlbum, ...prev]);
//       setAlbumsCount((prev) => prev + 1);

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCoverImage(null);
//       setCoverImagePreview(null);
//       const fileInput = document.getElementById("cover-image-input");
//       if (fileInput) fileInput.value = "";
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to create album.");
//     }
//   };

//   if (loading) return <p className="p-8">Loading albums…</p>;

//   // RENDER
//   return (
//     // ALBUM CONTAINER
//     <div className={`page-set ${ darkMode ? "page-set-dark" : "page-set-light" }`}>

//       {/* HEADER */}
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

//       {/* PAGE HEADER */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//         <LibraryBig size={38} className={`${ darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]" }`} />
//         <h1 className="text-4xl font-semibold">Albums</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">Manage your personal albums.</p>
//       </div>

//       {/* CREATE ALBUM FORM */}
//       <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
//         <form onSubmit={handleCreateAlbum} className="space-y-4 w-full">
//           <h2 className="text-xl font-semibold">Create New Album</h2>

//           {/* TITLE INPUT */}
//           <input
//             type="text"
//             placeholder="Album title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             required
//           />

//           {/* DESCRIPTION INPUT */}
//           <textarea
//             placeholder="Album description (optional)"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`inputs-set ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}
//             rows={3}
//           />

//           {/* COVER IMAGE UPLOAD */}
//           <div className="space-y-2">
//             <p className="block text-l font-medium">
//               Album Cover Image (optional)
//             </p>
//             <p className="text-l opacity-70">
//               {coverImage
//                 ? "Custom image selected. Click 'Remove' to use default image."
//                 : "If no image is selected, the default album image will be used."}
//             </p>

//             {coverImagePreview ? (
//               <div className="relative">
//                 <img
//                   src={coverImagePreview}
//                   alt="Cover preview"
//                   className="w-full h-48 object-contain rounded-lg border-2 border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <div className="relative">
//                 <label htmlFor="cover-image-input">
//                   <div className={`inputs-set flex flex-col items-center justify-center pt-5 pb-6 text-black ${ darkMode ? "inputs-set-dark" : "inputs-set-light" }`}>
//                     <svg
//                       className="w-8 h-8 mb-2 opacity-50"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <p className="mb-2 text-sm text-xl opacity-70">
//                       <span className="font-semibold">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="text-bold opacity-50">PNG, JPG, GIF up to 10MB</p>
//                   </div>
//                   <input
//                     id="cover-image-input"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>

//                 {!coverImage && (
//                   <div className={` mt-2  ${ darkMode ? "text-white" : "text-black" }`}>
//                     Default image preview:
//                     <img
//   src={defaultAlbumImage}
//   alt="Default album"
//   className={`mt-2 w-full p-2 h-24 object-contain rounded border-12 filter ${darkMode ? "invert" : ""}`}
// />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* CREATE ALBUM BUTTON */}
//           <button type="submit" className={`button-set ${ darkMode ? "button-set-dark" : "button-set-light" }`}>
//             Create Album
//           </button>
//         </form>
//       </section>

//       {/* YOUR ALBUMS */}
//       <section className="my-10">
//         <h2 className="text-2xl font-semibold mb-6">Your Albums</h2>
//         {albums.filter((a) => a.owner_user_id === currentUser?.id).length === 0 ? (
//           <p className="opacity-70">No Albums uploaded as of yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
//             {albums
//               .filter((a) => a.owner_user_id === currentUser?.id)
//               .map((album) => (
//                 <AlbumCard
//                   key={album.id}
//                   album={album}
//                   canEdit={canEdit(album)}
//                   onOpen={handleOpenAlbum}
//                   onDelete={handleDeleteAlbum}
//                   darkMode={darkMode}
//                 />
//               ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }





// // // ALBUM

// // IMPORTS
// import React, { useEffect, useState } from "react";
// import Header from "../components/module/Header";
// import AlbumCard from "../components/module/AlbumCard";
// import { getAlbums, createAlbum, deleteAlbum } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { LibraryBig } from "lucide-react";
// import defaultAlbumImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";

// // EXPORT
// export default function Albums() {
//   // USER STATE
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ALBUM STATE
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverImagePreview, setCoverImagePreview] = useState(null);

//   // CURRENT USER STATE
//   const { user: currentUser, darkMode, setDarkMode, setAlbumsCount } = useUserData();
//   const navigate = useNavigate();

//   // FETCH ALBUMS
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const data = await getAlbums();
//         setAlbums(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//         setAlbums([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAlbums();
//   }, []);

//   // CHECK IF USER CAN EDIT ALBUM
//   const canEdit = (album) =>
//     album.owner_user_id === currentUser?.id ||
//     currentUser?.role === "admin";

//   const handleOpenAlbum = (album) => {
//     navigate(`/albums/${album.id}`);
//   };

//   // DELETE ALBUM
//   const handleDeleteAlbum = async (album) => {
//     if (!window.confirm(`Delete "${album.title}"?`)) return;

//     try {
//       await deleteAlbum(album.id);
//       setAlbums((prev) => prev.filter((a) => a.id !== album.id));
//       setAlbumsCount((prev) => prev - 1);
//     } catch (err) {
//       console.error("Error deleting album:", err);
//       alert("Failed to delete album.");
//     }
//   };

//   // IMAGE UPDATE
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setCoverImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setCoverImage(null);
//       setCoverImagePreview(null);
//     }
//   };

//   // IMAGE DELETE
//   const handleRemoveImage = () => {
//     setCoverImage(null);
//     setCoverImagePreview(null);
//     const fileInput = document.getElementById("cover-image-input");
//     if (fileInput) fileInput.value = "";
//   };

//   // CREATE ALBUM
//   const handleCreateAlbum = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const newAlbum = await createAlbum(title, description, coverImage);
//       setAlbums((prev) => [newAlbum, ...prev]);
//       setAlbumsCount((prev) => prev + 1);

//       // RESET FORM
//       setTitle("");
//       setDescription("");
//       setCoverImage(null);
//       setCoverImagePreview(null);
//       const fileInput = document.getElementById("cover-image-input");
//       if (fileInput) fileInput.value = "";
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to create album.");
//     }
//   };

//   if (loading) return <p className="p-8">Loading albums…</p>;

//   // RENDER
//   return (
//     // ALBUM CONTAINER
//     <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>

//       {/* HEADER */}
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

//       {/* PAGE HEADER */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//         <LibraryBig size={38} className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"} />
//         <h1 className="text-4xl font-semibold">Albums</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">Manage your personal albums.</p>
//       </div>

//       {/* CREATE ALBUM FORM */}
//       <section className={`album-form-container ${darkMode ? "form-dark" : "form-light"}`}>
//         <form onSubmit={handleCreateAlbum} className="space-y-4 w-full">
//           <h2 className="text-xl font-bold font-semibold">Create New Album</h2>

//           {/* TITLE INPUT */}
//           <p className="block text-l font-medium">Album Title (REQUIRED)</p>

//           <input
//             type="text"
//             placeholder="Album title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             required
//           />

//           {/* DESCRIPTION INPUT */}
//           <p className="block text-l font-medium">Album Description (OPTIONAL)</p>
//           <textarea
//             placeholder="Winter Real Estate Album"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             rows={3}
//           />

//           {/* COVER IMAGE UPLOAD */}
//           <div className="space-y-2 file-preview-container">
//             <p className="block text-l font-medium">Album Cover Image (OPTIONAL)</p>
//             <p className="text-l opacity-70">
//               {coverImage
//                 ? <p>Custom image selected. <br />Click 'Remove' to use default image.</p>
//                 : <p></p>}
//             </p>

//             {coverImagePreview ? (
//               <div className="relative">
//                 <img
//                   src={coverImagePreview}
//                   alt="Cover preview"
//                   className="w-full h-48 object-contain rounded-lg border-2 border-gray-300"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <div className="relative">
//                 <label htmlFor="cover-image-input">
//                   <div className="inputs-set  text-black py-8 px-4 text-center">
//                     <p className="font-medium">If no album image is selected, the default album image will be used:</p>

//                     <img
//                       src={defaultAlbumImage}
//                       alt="Default album"
//                       className={`my-6 w-full p-2 h-28 object-contain rounded border-12 ${darkMode ? 'filter invert' : ''}`}
//                     />
                    
//                     <p className=" mb-2 text-sm text-xl opacity-70 ">
//                       <span className=" font-semibold ">Click to upload</span> or drag and drop your album cover image.
//                     </p>
//                     <p className=" text-bold opacity-50 ">PNG, JPG, WEBP up to 60MB</p>
//                   </div>
//                   <input
//                     id="cover-image-input"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>

//                 {!coverImage && (
//                   <div className={darkMode ? "mb-6 default-image-dark" : " mb-6 default-image-light"}>
                    
//                   </div>

//                 )}
//               </div>
//             )}
//           </div>

//           {/* CREATE ALBUM BUTTON */}
//           <button type="submit" className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}>
//             Create Album
//           </button>
//         </form>
//       </section>

//       {/* YOUR ALBUMS */}
//       <section className="my-10">
//         <h2 className="album-section-header">Your Albums</h2>
//         {albums.filter((a) => a.owner_user_id === currentUser?.id).length === 0 ? (
//           <p className="opacity-70">No Albums uploaded as of yet.</p>
//         ) : (
//           <div className="album-grid">
//             {albums
//               .filter((a) => a.owner_user_id === currentUser?.id)
//               .map((album) => (
//                 <AlbumCard
//                   key={album.id}
//                   album={album}
//                   canEdit={canEdit(album)}
//                   onOpen={handleOpenAlbum}
//                   onDelete={handleDeleteAlbum}
//                   darkMode={darkMode}
//                 />
//               ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }





// // frontend/src/components/module/Header.jsx
// // HEADER

// // IMPORTS
// // import React from "react";
// import Intro from "./submodule/Intro";
// import Navigation from "./submodule/Navigation";
// // import { useUserData } from "../../services/UserDataContext";

// // HEADER FUNCTION
// export default function Header({ navigationProps }) {
//   // RETURN
//   return (
//     <div className="w-full flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//       {/* LEFT COLUMN: INTRO */}
//       <div className="w-full md:flex-1 md:flex md:justify-start">
//         <Intro />
//       </div>

//       {/* RIGHT COLUMN: NAVIGATION */}
//       <div className="w-full md:flex-1 md:flex md:justify-end">
//         <Navigation toggleDarkMode={navigationProps?.toggleDarkMode} />
//       </div>
//     </div>
//   );
// }








// // frontend/src/pages/Albums.jsx
// // ALBUMS

// // IMPORTS
// import React, { useEffect, useState } from "react";
// import Header from "../components/module/Header";
// import AlbumCard from "../components/module/AlbumCard";
// import { getAlbums, createAlbum, deleteAlbum } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { LibraryBig } from "lucide-react";
// import defaultAlbumImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";

// // EXPORT
// export default function Albums() {
//   // USER STATE
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ALBUM FORM STATE
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverImagePreview, setCoverImagePreview] = useState(null);

//   // CURRENT USER STATE
//   const { user: currentUser, darkMode, setDarkMode, setAlbumsCount } = useUserData();
//   const navigate = useNavigate();

//   // FETCH ALL ALBUMS
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const data = await getAlbums();
//         setAlbums(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//         setAlbums([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAlbums();
//   }, []);

//   // CAN EDIT
//   const canEdit = (album) =>
//     album.owner_user_id === currentUser?.id || currentUser?.role === "admin";

//   // OPEN ALBUM
//   const handleOpenAlbum = (album) => navigate(`/albums/${album.id}`);

//   // DELETE ALBUM
//   const handleDeleteAlbum = async (album) => {
//     if (!window.confirm(`Delete "${album.title}"?`)) return;
//     try {
//       await deleteAlbum(album.id);
//       setAlbums((prev) => prev.filter((a) => a.id !== album.id));
//       setAlbumsCount((prev) => prev - 1);
//     } catch (err) {
//       console.error("Error deleting album:", err);
//       alert("Failed to delete album.");
//     }
//   };

//   // IMAGE CHANGE
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setCoverImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setCoverImage(null);
//       setCoverImagePreview(null);
//     }
//   };

//   // IMAGE REMOVE
//   const handleRemoveImage = () => {
//     setCoverImage(null);
//     setCoverImagePreview(null);
//     const fileInput = document.getElementById("cover-image-input");
//     if (fileInput) fileInput.value = "";
//   };

//   // CREATE ALBUM
//   const handleCreateAlbum = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const newAlbum = await createAlbum(title, description, coverImage);
//       setAlbums((prev) => [newAlbum, ...prev]);
//       setAlbumsCount((prev) => prev + 1);

//       // RESET FORM
//       setTitle("");
//       setDescription("");
//       handleRemoveImage();
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to create album.");
//     }
//   };

//   if (loading) return <p className="p-8">Loading albums…</p>;

//   return (
//     <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((prev) => !prev) }} />

//       {/* PAGE HEADER */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//         <LibraryBig size={38} className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"} />
//         <h1 className="text-4xl font-semibold">Albums</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">Manage your personal albums.</p>
//       </div>

//       {/* CREATE ALBUM FORM */}
//       <section className={`album-form-container ${darkMode ? "form-dark" : "form-light"}`}>
//         <form onSubmit={handleCreateAlbum} className="space-y-4 w-full">
//           <h2 className="text-xl font-bold font-semibold">Create New Album</h2>

//           {/* TITLE */}
//           <p className="block text-l font-medium">Album Title (REQUIRED)</p>
//           <input
//             type="text"
//             placeholder="Album title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             required
//           />

//           {/* DESCRIPTION */}
//           <p className="block text-l font-medium">Album Description (OPTIONAL)</p>
//           <textarea
//             placeholder="Winter Real Estate Album"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             rows={3}
//           />

//           {/* COVER IMAGE */}
//           <div className="space-y-2 file-preview-container">
//             <p className="block text-l font-medium">Album Cover Image (OPTIONAL)</p>

//             {coverImagePreview ? (
//               <div className="relative">
//                 <img src={coverImagePreview} alt="Cover preview" className="w-full h-48 object-contain rounded-lg border-2 border-gray-300" />
//                 <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Remove</button>
//               </div>
//             ) : (
//               <div className="relative">
//                 <label htmlFor="cover-image-input" className="cursor-pointer">
//                   <div className="inputs-set text-black py-8 px-4 text-center">
//                     <img
//                       src={defaultAlbumImage}
//                       alt="Default album"
//                       className={`my-6 w-full p-2 h-28 object-contain rounded ${darkMode ? "filter invert" : ""}`}
//                     />
//                     <p className="mb-2 text-sm opacity-70">
//                       <span className="font-semibold">Click to upload</span> or drag and drop your album cover image.
//                     </p>
//                     <p className="text-bold opacity-50">PNG, JPG, WEBP up to 60MB</p>
//                   </div>
//                   <input id="cover-image-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//                 </label>
//               </div>
//             )}
//           </div>

//           <button type="submit" className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}>Create Album</button>
//         </form>
//       </section>

//       {/* USER ALBUMS */}
//       <section className="my-10">
//         <h2 className="album-section-header">Your Albums</h2>
//         {albums.filter((a) => a.owner_user_id === currentUser?.id).length === 0 ? (
//           <p className="opacity-70">No Albums uploaded as of yet.</p>
//         ) : (
//           <div className="album-grid">
//             {albums.filter((a) => a.owner_user_id === currentUser?.id).map((album) => (
//               <AlbumCard
//                 key={album.id}
//                 album={album}
//                 canEdit={canEdit(album)}
//                 onOpen={handleOpenAlbum}
//                 onDelete={handleDeleteAlbum}
//                 darkMode={darkMode}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }







// // frontend/src/pages/Albums.jsx
// // ALBUMS

// // IMPORTS
// import React, { useEffect, useState } from "react";
// import Header from "../components/module/Header";
// import AlbumCard from "../components/module/AlbumCard";
// import { getAlbums, createAlbum, deleteAlbum } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { LibraryBig } from "lucide-react";
// import defaultAlbumImage from "/default_album_image.png";
// import { useUserData } from "../services/UserDataContext";

// // ALBUMS
// export default function Albums() {
//   // DATA STATE
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // FORM STATE
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   // USER STATE
//   const { user, darkMode, setDarkMode, setAlbumsCount, canEditAlbum } = useUserData();
//   const navigate = useNavigate();

//   // FETCH ALBUMS
//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const data = await getAlbums();
//         setAlbums(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching albums:", err);
//         setAlbums([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   // // PERMISSIONS
//   // const canEdit = (album) =>
//   //   album.owner_user_id === user?.id || user?.role === "admin";

//   // NAVIGATION
//   const openAlbum = (album) => navigate(`/albums/${album.id}`);

//   // DELETE
//   const handleDelete = async (album) => {
//     if (!window.confirm(`Delete "${album.title}"?`)) return;

//     try {
//       await deleteAlbum(album.id);
//       setAlbums((prev) => prev.filter((a) => a.id !== album.id));
//       setAlbumsCount((prev) => Math.max(prev - 1, 0));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete album.");
//     }
//   };

//   // IMAGE HANDLING
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setCoverImage(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setCoverPreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const clearImage = () => {
//     setCoverImage(null);
//     setCoverPreview(null);
//     const input = document.getElementById("cover-image-input");
//     if (input) input.value = "";
//   };

//   // CREATE
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const newAlbum = await createAlbum(title, description, coverImage);
//       setAlbums((prev) => [newAlbum, ...prev]);
//       setAlbumsCount((prev) => prev + 1);

//       // RESET
//       setTitle("");
//       setDescription("");
//       clearImage();
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to create album.");
//     }
//   };

//   if (loading) return <p className="p-8">Loading albums…</p>;

//   return (
//     // PAGE
//     <div className={`page-set ${darkMode ? "page-set-dark" : "page-set-light"}`}>
//       {/* HEADER */}
//       <Header navigationProps={{ toggleDarkMode: () => setDarkMode((p) => !p) }} />
//       {/* TITLE */}
//       <div className="flex items-center gap-2 mt-10 mb-6">
//         <LibraryBig size={38} className={darkMode ? "text-[#BDD63B]" : "text-[#1E3A8A]"} />
//         <h1 className="text-4xl font-semibold">Albums</h1>
//         <p className="text-1xl opacity-90 mt-2 font-bold">
//           Manage your personal albums.
//         </p>
//       </div>
//       {/* HR */}
//       <hr className={`hr ${darkMode ? "hr-dark" : "hr-light"}`} />
//       {/* SUBTITLE */}
//       <h2 className="section-header">Create New Album</h2>

//       {/* CREATE FORM */}
//       <section className={`form-container ${darkMode ? "form-dark" : "form-light"}`}>
//         <form onSubmit={handleCreate} className="space-y-4">

//           {/* TITLE */}
//           <label className="block font-medium">
//             Album title (required)
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Winter Real Estate 2025"
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//             required
//           />

//           {/* DESCRIPTION */}
//           <label className="block font-medium">
//             Album description (optional)
//           </label>
//           <textarea
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="All the images from the 2025 Winter Real Estate edition"
//             className={`inputs-set ${darkMode ? "inputs-set-dark" : "inputs-set-light"}`}
//           />

//           {/* COVER IMAGE */}
//           <div className="space-y-2 file-preview-container">
//             <label className="block font-medium">
//               Album cover image (optional)
//             </label>

//             {coverPreview ? (
//               <div className="relative">
//                 <img
//                   src={coverPreview}
//                   alt="Cover preview"
//                   className="w-full h-48 object-contain rounded-lg border border-gray-400"
//                 />
//                 <button
//                   type="button"
//                   onClick={clearImage}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <label
//                 htmlFor="cover-image-input"
//                 className={`inputs-set cursor-pointer text-center py-8 ${
//                   darkMode ? "inputs-set-dark" : "inputs-set-light"
//                 }`}
//               >
//                 <img
//                   src={defaultAlbumImage}
//                   alt="Default album"
//                   className={`mx-auto mb-4 h-28 object-contain `}
//                 />
//                 <p>If no album image is seleceted the default album image above will be used.</p>
//                 <p>
//                   <span className="font-semibold">Click to upload</span> or <span className="font-semibold">drag & drop</span> your album cover image
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-semibold">PNG, JPG, WEBP</span> up to <span className="font-semibold">60MB</span>
//                 </p>
//                 <input
//                   id="cover-image-input"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             className={`button-set ${darkMode ? "button-set-dark" : "button-set-light"}`}
//           >
//             Create Album
//           </button>
//         </form>
//       </section>

//       {/* USER ALBUMS */}
//       <section className="my-10">
//         <h2 className="section-header">Your Albums</h2>

//         {albums.filter((a) => a.owner_user_id === user?.id).length === 0 ? (
//           <p className="opacity-70">No albums uploaded yet.</p>
//         ) : (
//           <div className="album-grid">
//             {albums
//               .filter((a) => a.owner_user_id === user?.id)
//               .map((album) => (
//                 <AlbumCard
//                   key={album.id}
//                   album={album}
//                   canEditAlbum={canEditAlbum(album)}
//                   onOpen={openAlbum}
//                   onDelete={handleDelete}
//                   darkMode={darkMode}
//                 />
//               ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }







