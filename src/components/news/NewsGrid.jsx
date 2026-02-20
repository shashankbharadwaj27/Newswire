import NewsBanner from "./NewsBanner";
import NewsCard, { NewsListCard } from "./NewsCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../common/Pagination";
import Button from "../common/Button";
import { PAGE_SIZE } from "../../utils/constants";

/**
 * Renders the full news feed: banner + cards (grid or list).
 *
 * @param {Array}    articles
 * @param {boolean}  loading
 * @param {string}   error
 * @param {Function} onRetry
 * @param {Function} onSelectArticle
 * @param {"grid"|"list"} viewMode
 * @param {number}   totalResults
 * @param {number}   page
 * @param {Function} onNext
 * @param {Function} onPrev
 * @param {Function} onClearFilters
 */
export default function NewsGrid({
  articles,
  loading,
  error,
  onRetry,
  onSelectArticle,
  viewMode = "grid",
  totalResults = 0,
  page = 1,
  onNext,
  onPrev,
  onClearFilters,
}) {
  // Loading state
  if (loading) return <Loader viewMode={viewMode} count={6} />;

  // Error state
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

  // Empty state
  if (!articles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">📰</div>
        <h3 className="text-lg font-bold text-stone-700">No articles found</h3>
        <p className="text-stone-400 text-sm mt-1">
          Try a different search or category.
        </p>
        {onClearFilters && (
          <Button onClick={onClearFilters} className="mt-5">
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className="fade-in space-y-6">
      {/* Featured banner — only in grid mode */}
      {viewMode === "grid" && featured && (
        <NewsBanner article={featured} onSelect={onSelectArticle} />
      )}

      {/* Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(featured ? rest : articles).map((a) => (
            <NewsCard key={a.id} article={a} onSelect={onSelectArticle} />
          ))}
        </div>
      )}

      {/* List */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {articles.map((a) => (
            <NewsListCard key={a.id} article={a} onSelect={onSelectArticle} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalResults={totalResults}
        pageSize={PAGE_SIZE}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}