import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { useSearch } from "../hooks/useSearch";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsGrid from "../components/news/NewsGrid";
import NewsDetail from "../components/news/NewsDetail";

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [viewMode, setViewMode] = useState("grid");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { inputValue, searchQuery, setInputValue } = useSearch();
  const effectiveQuery = searchQuery || initialQuery;

  const { articles, loading, error, totalResults, page, nextPage, prevPage, refetch } =
    useNews("All", effectiveQuery);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        activeCategory="All"
        onCategoryChange={() => {}}
        searchInput={inputValue || initialQuery}
        onSearchChange={setInputValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">
            Search Results
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-stone-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {effectiveQuery ? `"${effectiveQuery}"` : "Search"}
          </h1>
          {!loading && effectiveQuery && (
            <p className="text-stone-400 text-sm mt-1">
              {totalResults.toLocaleString()} result{totalResults !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {!effectiveQuery ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-stone-500 text-sm">Enter a keyword to search articles.</p>
          </div>
        ) : (
          <NewsGrid
            articles={articles}
            loading={loading}
            error={error}
            onRetry={refetch}
            onSelectArticle={setSelectedArticle}
            viewMode={viewMode}
            totalResults={totalResults}
            page={page}
            onNext={nextPage}
            onPrev={prevPage}
          />
        )}
      </main>

      <Footer />
      <NewsDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}