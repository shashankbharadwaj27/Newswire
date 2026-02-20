import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../utils/constants";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/searchIcon.svg";

/**
 * @param {string} activeCategory
 * @param {Function} onCategoryChange
 * @param {string} searchInput
 * @param {Function} onSearchChange
 * @param {string} viewMode - "grid" | "list"
 * @param {Function} onViewModeChange
 */
export default function Navbar({
  activeCategory,
  onCategoryChange,
  searchInput,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleCategoryClick = (cat) => {
    onCategoryChange(cat);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo}  alt="Newswire" className="w-8 h-8" />
          <span
            className="text-lg font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Newswire
          </span>
        </Link>

        {/* Search — desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex flex-1 max-w-sm mx-4 relative"
        >
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
            <img src={searchIcon} width="15px" alt="" />
          </span>
          <input
            type="text"
            placeholder="Search articles…"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-10 py-2 text-sm bg-stone-100 border border-transparent rounded-lg focus:outline-none focus:border-stone-300 focus:bg-white transition-all placeholder:text-stone-400"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              ✕
            </button>
          )}
        </form>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2">
          {/* View toggle — desktop */}
          <div className="hidden sm:flex items-center gap-1 bg-stone-100 rounded-lg p-1">
            {["grid", "list"].map((m) => (
              <button
                key={m}
                onClick={() => onViewModeChange(m)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                  viewMode === m
                    ? "bg-white shadow text-stone-900"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-stone-100 text-stone-600 text-lg leading-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 pt-3 border-t border-stone-100 bg-white space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              <img src={searchIcon} width={10} alt="" />
            </span>
            <input
              type="text"
              placeholder="Search…"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 rounded-lg focus:outline-none placeholder:text-stone-400"
            />
          </form>
          <div className="flex gap-2">
            {["grid", "list"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  onViewModeChange(m);
                  setMenuOpen(false);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                  viewMode === m
                    ? "bg-stone-900 text-white border-stone-900"
                    : "text-stone-600 border-stone-200"
                }`}
              >
                {m} View
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="border-t border-stone-100 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeCategory === cat
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}