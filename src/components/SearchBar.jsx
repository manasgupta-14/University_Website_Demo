import { CATEGORIES } from "../data/notices.js";

export default function SearchBar({
    search, setSearch, category, setCategory, onClear,
    noticeCount, serviceCount, status,
}) {
    return (
        <section aria-label="Global search and filters" className="search-panel">
            <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-0 flex-1">
                    <label htmlFor="global-search" className="mb-2 block font-semibold text-slate-900">
                        Search notices and services
                    </label>
                    <input
                        id="global-search"
                        type="search"
                        placeholder="Try exam, admission, result…"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="form-control"
                    />
                </div>
                <button
                    type="button"
                    onClick={onClear}
                    disabled={!search && category === "All"}
                    className="btn-secondary"
                >
                    Clear filters
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {CATEGORIES.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                        className={`category-filter ${category === item ? "category-filter-active" : ""}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <p className="mt-4 text-sm text-slate-600" aria-live="polite">
                {status === "loading"
                    ? "Loading university information…"
                    : status === "error"
                        ? "University information is unavailable. Retry to load notices and services."
                        : `Showing ${noticeCount} notices and ${serviceCount} services`}
            </p>
        </section>
    );
}
