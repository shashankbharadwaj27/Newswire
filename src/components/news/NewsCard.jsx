import { useState } from "react";
import { CATEGORY_COLORS, FALLBACK_IMAGE } from "../../utils/constants";

function CategoryBadge({ category }) {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.World;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {category}
    </span>
  );
}

function SafeImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}

/**
 * Standard article card for grid view.
 *
 * @param {Object} article - normalized article object
 * @param {Function} onSelect - called with the article when clicked
 */
export default function NewsCard({ article, onSelect }) {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <SafeImage
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-medium">
            {article.source}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <CategoryBadge category={article.category} />
        <h3
          className="mt-2.5 text-[15px] font-bold text-stone-900 leading-snug group-hover:text-stone-600 transition-colors line-clamp-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {article.title}
        </h3>
        <p className="mt-1.5 text-stone-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
          <span className="font-medium text-stone-600 truncate max-w-[130px]">
            {article.author}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span>{article.time}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── List variant ─────────────────────────────────────────────────────────────
export function NewsListCard({ article, onSelect }) {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex gap-4 p-4 bg-white rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-md transition-all duration-300"
    >
      <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
        <SafeImage
          src={article.image}
          alt={article.title}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={article.category} />
          <span className="text-[10px] text-stone-400 font-medium">
            {article.source}
          </span>
        </div>
        <h3
          className="mt-1.5 text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-600 transition-colors line-clamp-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {article.title}
        </h3>
        <p className="mt-0.5 text-stone-400 text-xs line-clamp-1">
          {article.summary}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
          <span className="font-medium text-stone-500 truncate max-w-[120px]">
            {article.author}
          </span>
          <span>·</span>
          <span>{article.time}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

// Export badge + image for reuse
export { CategoryBadge, SafeImage };