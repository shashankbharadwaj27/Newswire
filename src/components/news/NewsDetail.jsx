import { useEffect } from "react";
import { useState } from "react";
import { CATEGORY_COLORS, FALLBACK_IMAGE } from "../../utils/constants";

function CategoryBadge({ category }) {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.World;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {category}
    </span>
  );
}

/**
 * Full-screen modal showing article detail.
 * Slides up from bottom on mobile, centered on desktop.
 *
 * @param {Object|null} article - null means modal is closed
 * @param {Function} onClose
 */
export default function NewsDetail({ article, onClose }) {
  const [imgSrc, setImgSrc] = useState(article?.image);

  // Sync image when article changes
  useEffect(() => {
    setImgSrc(article?.image);
  }, [article]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (article) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-56 sm:h-72">
          <img
            src={imgSrc}
            alt={article.title}
            className="w-full h-full object-cover sm:rounded-t-2xl"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:rounded-t-2xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-800 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Source pill */}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs bg-black/60 text-white px-2.5 py-1 rounded font-medium">
              {article.source}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <CategoryBadge category={article.category} />

          <h2
            className="mt-3 text-xl sm:text-2xl font-bold text-stone-900 leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {article.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400">
            <span className="font-semibold text-stone-600">{article.author}</span>
            <span>·</span>
            <span>{article.time}</span>
            <span>·</span>
            <span>{article.readTime} read</span>
          </div>

          <p className="mt-4 text-stone-600 text-sm leading-relaxed">
            {article.summary}
          </p>

          {article.content && (
            <p className="mt-3 text-stone-500 text-sm leading-relaxed">
              {article.content}
            </p>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-6 flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Read Full Article on {article.source} →
          </a>
        </div>
      </div>
    </div>
  );
}