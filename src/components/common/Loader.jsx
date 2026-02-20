function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-stone-100 bg-white">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-2.5">
        <div className="skeleton h-4 w-20 rounded-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2 mt-3" />
      </div>
    </div>
  );
}

function SkeletonFeatured() {
  return <div className="skeleton rounded-2xl h-96 w-full" />;
}

function SkeletonList() {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-stone-100">
      <div className="skeleton w-24 h-24 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="skeleton h-4 w-20 rounded-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}

/**
 * Loader component that shows skeleton placeholders.
 *
 * @param {"grid"|"list"} viewMode
 * @param {number} count - number of skeleton cards to show
 */
export default function Loader({ viewMode = "grid", count = 6 }) {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <SkeletonList key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SkeletonFeatured />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}