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
 * Hero/featured article card shown at the top of the feed.
 *
 * @param {Object} article - normalized article object
 * @param {Function} onSelect - called when user clicks
 */
export default function NewsBanner({ article, onSelect }) {
  const [imgSrc, setImgSrc] = useState(article.image);

  return (
    <div
      onClick={() => onSelect(article)}
      className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      style={{ minHeight: 420 }}
    >
      {/* Background image */}
      <img
        src={imgSrc}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* "Top Story" pill */}
      <div className="absolute top-4 right-4 bg-white/90 text-stone-800 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
        Top Story
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <CategoryBadge category={article.category} />

        <h2
          className="mt-3 text-2xl md:text-3xl font-bold text-white leading-tight group-hover:underline decoration-2 underline-offset-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {article.title}
        </h2>

        <p className="mt-2 text-white/70 text-sm line-clamp-2">
          {article.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
          <span className="font-medium text-white/80">{article.author}</span>
          <span>·</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">
            {article.source}
          </span>
          <span>·</span>
          <span>{article.time}</span>
          <span>·</span>
          <span>{article.readTime} read</span>
        </div>
      </div>
    </div>
  );
}