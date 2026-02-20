import { useState } from "react";
import { useNews } from "../hooks/useNews";
import { useSearch } from "../hooks/useSearch";
import { formatTodayLong } from "../utils/formatDate";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import NewsGrid from "../components/news/NewsGrid";
import NewsDetail from "../components/news/NewsDetail";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { inputValue, searchQuery, setInputValue, clearSearch } = useSearch();

  const {
    articles,
    loading,
    error,
    totalResults,
    page,
    nextPage,
    prevPage,
    refetch,
  } = useNews(activeCategory, searchQuery);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    clearSearch();
  };

  const handleClearFilters = () => {
    setActiveCategory("All");
    clearSearch();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchInput={inputValue}
        onSearchChange={setInputValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">
            {formatTodayLong()}
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <h1
              className="text-3xl md:text-4xl font-bold text-stone-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory === "All"
                ? "Today's Headlines"
                : activeCategory}
            </h1>
          </div>
          {!loading && (
            <p className="text-stone-400 text-sm mt-1">
              {totalResults.toLocaleString()} article
              {totalResults !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Two-column layout: main feed + sidebar */}
        <div className="flex gap-8">
          {/* Main feed */}
          <main className="flex-1 min-w-0">
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
              onClearFilters={handleClearFilters}
            />
          </main>

          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar
              articles={articles}
              loading={loading}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* Article modal */}
      <NewsDetail
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}