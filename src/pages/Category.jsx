import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsGrid from "../components/news/NewsGrid";
import NewsDetail from "../components/news/NewsDetail";
import { useSearch } from "../hooks/useSearch";

export default function Category() {
  const { category } = useParams(); // e.g. /category/technology
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { inputValue, setInputValue } = useSearch();

  // Capitalise first letter to match our constants
  const displayCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const { articles, loading, error, totalResults, page, nextPage, prevPage, refetch } =
    useNews(displayCategory, "");

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        activeCategory={displayCategory}
        onCategoryChange={(cat) =>
          cat === "All" ? navigate("/") : navigate(`/category/${cat.toLowerCase()}`)
        }
        searchInput={inputValue}
        onSearchChange={setInputValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">
            Category
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-stone-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {displayCategory}
          </h1>
          {!loading && (
            <p className="text-stone-400 text-sm mt-1">
              {totalResults.toLocaleString()} article{totalResults !== 1 ? "s" : ""}
            </p>
          )}
        </div>

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
      </main>

      <Footer />
      <NewsDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}