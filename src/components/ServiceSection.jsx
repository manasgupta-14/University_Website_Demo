import { useState } from "react";
import { CATEGORIES } from "../data/notices.js";
import ServiceCard from "./ServiceCard.jsx";

export default function ServiceSection({
    status, services = [], category, setCategory, onUse, onClear, search = "",
}) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <section id="services" className="scroll-mt-28 border-y border-slate-200 bg-mist py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="section-eyebrow">Student essentials</p>
                        <h2 className="section-title">Online Services</h2>
                        <p className="mt-1 text-sm text-slate-600">Search and filter university services.</p>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowFilters((previous) => !previous)}
                            aria-expanded={showFilters}
                            aria-controls="service-category-menu"
                            className="btn-secondary"
                        >
                            <span aria-hidden="true">☷</span>
                            <span>{category}</span>
                            <span aria-hidden="true">{showFilters ? "▲" : "▼"}</span>
                        </button>

                        {showFilters && (
                            <div id="service-category-menu" className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Filter by category
                                </p>
                                {CATEGORIES.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        aria-pressed={category === item}
                                        onClick={() => {
                                            setCategory(item);
                                            setShowFilters(false);
                                        }}
                                        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${category === item ? "bg-pine font-semibold text-white" : "text-slate-700 hover:bg-mist"}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {status === "loading" && <p className="mt-6" role="status">Loading services…</p>}
                {status === "error" && <p className="mt-6 text-red-700" role="alert">Services could not be loaded.</p>}

                {status === "ready" && (
                    <>
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-slate-600" aria-live="polite">
                                Showing {services.length} services
                            </p>
                            <button type="button" onClick={onClear} className="text-sm font-semibold text-pine underline underline-offset-4">
                                Clear filters
                            </button>
                        </div>

                        {services.length === 0 ? (
                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-8 text-center">
                                <h3 className="font-semibold text-slate-900">No services found</h3>
                                <p className="mt-2 text-sm text-slate-600">Try another search term or category.</p>
                                <button type="button" onClick={onClear} className="btn-primary mt-4">Clear filters</button>
                            </div>
                        ) : (
                            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {services.map((service) => (
                                    <ServiceCard key={service.id} service={service} onUse={onUse} search={search} />
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
