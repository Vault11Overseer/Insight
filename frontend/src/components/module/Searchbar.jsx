// frontend/src/components/module/Searchbar.jsx
// SEARCH BAR

// IMPORTS
import { Search as SearchIcon } from "lucide-react";
import { useUserData } from "../../services/UserDataContext";

// EXPORTS
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
}) {

  // CONTEXT
  const { darkMode } = useUserData();

  // RETURN
  return (
    // SEARCH CONTAINER
    <div className="relative w-full">

      {/* ICON */}
      <SearchIcon
        size={18}
        className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none ${
          darkMode ? "text-white" : "text-black"
        }`}
      />

      {/* INPUT */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`inputs-set pl-12 ${
          darkMode ? "inputs-set-dark" : "inputs-set-light"
        }`}
      />
    </div>
  );
}
