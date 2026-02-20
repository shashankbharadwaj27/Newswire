import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_COLORS } from "../../utils/constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extracts the top N keywords/bigrams from article titles.
 * Filters out common stop words to surface meaningful topics.
 */
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "is","are","was","were","be","been","has","have","had","it","its","as",
  "by","from","that","this","his","her","their","our","we","he","she","they",
  "i","you","not","no","new","over","after","before","up","out","says","say",
  "will","more","than","just","how","what","when","who","all","about","into",
]);

function extractTrendingTopics(articles, topN = 6) {
  const freq = {};

  articles.forEach(({ title }) => {
    if (!title) return;
    const words = title
      .replace(/[^a-zA-Z0-9\s'-]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w.toLowerCase()));

    // Score single words
    words.forEach((w) => {
      const key = w.toLowerCase();
      freq[key] = (freq[key] || 0) + 1;
    });

    // Score bigrams (weighted higher than single words)
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i + 1]}`.toLowerCase();
      freq[bigram] = (freq[bigram] || 0) + 2;
    }
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([phrase]) =>
      phrase.replace(/\b\w/g, (c) => c.toUpperCase())
    );
}

/**
 * Counts articles per source and returns top N with counts.
 */
function extractTopSources(articles, topN = 5) {
  const counts = {};
  articles.forEach(({ source }) => {
    if (!source) return;
    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, count]) => ({ name, count }));
}

/**
 * Counts articles per category from the current feed.
 */
function countByCategory(articles) {
  const counts = {};
  articles.forEach(({ category }) => {
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="skeleton w-4 h-3 rounded" />
          <div
            className="skeleton h-3 rounded"
            style={{ width: `${55 + i * 8}%` }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Dynamic sidebar — all data derived from the live articles prop.
 *
 * @param {Array}    articles         - normalized articles from useNews()
 * @param {boolean}  loading          - show skeletons while fetching
 * @param {Function} onCategoryChange
 * @param {string}   activeCategory
 */
export default function Sidebar({
  articles = [],
  loading = false,
  onCategoryChange,
  activeCategory,
}) {
  const trendingTopics = useMemo(() => extractTrendingTopics(articles), [articles]);
  const topSources     = useMemo(() => extractTopSources(articles), [articles]);
  const categoryCounts = useMemo(() => countByCategory(articles), [articles]);

  return (
    <aside className="w-64 flex-shrink-0 space-y-6">

      {/* ── Trending Topics ── */}
      <div className="bg-white rounded-xl border border-stone-100 p-5">
        <h3
          className="text-sm font-bold text-stone-900 mb-4 tracking-wide uppercase"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Trending
        </h3>

        {loading ? (
          <SidebarSkeleton />
        ) : trendingTopics.length === 0 ? (
          <p className="text-xs text-stone-400">No data yet.</p>
        ) : (
          <ul className="space-y-2.5">
            {trendingTopics.map((topic, i) => (
              <li key={topic} className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-300 w-4 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  to={`/search?q=${encodeURIComponent(topic)}`}
                  className="text-sm text-stone-700 hover:text-stone-900 hover:underline underline-offset-2 transition-colors leading-tight"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Browse Categories ── */}
      <div className="bg-white rounded-xl border border-stone-100 p-5">
        <h3
          className="text-sm font-bold text-stone-900 mb-4 tracking-wide uppercase"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Browse
        </h3>
        <ul className="space-y-1">
          {CATEGORIES.map((cat) => {
            const count = cat === "All"
              ? articles.length
              : (categoryCounts[cat] || 0);
            const colors = CATEGORY_COLORS[cat];

            return (
              <li key={cat}>
                <button
                  onClick={() => onCategoryChange(cat)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center justify-between gap-2 ${
                    activeCategory === cat
                      ? "bg-stone-900 text-white font-medium"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {colors && activeCategory !== cat && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`}
                      />
                    )}
                    {cat}
                  </span>

                  {/* Live article count badge */}
                  {!loading && count > 0 && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        activeCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Top Sources ── */}
      <div className="bg-white rounded-xl border border-stone-100 p-5">
        <h3
          className="text-sm font-bold text-stone-900 mb-4 tracking-wide uppercase"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Top Sources
        </h3>

        {loading ? (
          <SidebarSkeleton />
        ) : topSources.length === 0 ? (
          <p className="text-xs text-stone-400">No sources found.</p>
        ) : (
          <ul className="space-y-2.5">
            {topSources.map(({ name, count }) => (
              <li key={name} className="flex items-center justify-between gap-2">
                <Link
                  to={`/search?q=${encodeURIComponent(name)}`}
                  className="text-sm text-stone-600 hover:text-stone-900 hover:underline underline-offset-2 transition-colors truncate"
                >
                  {name}
                </Link>
                <span className="text-[10px] font-semibold bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </aside>
  );
}