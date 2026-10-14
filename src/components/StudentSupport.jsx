import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { quickLinks } from "../data/services.js";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Toast from "./Toast.jsx";

export default function StudentSupport() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    useEffect(() => {
        if (!toast) return undefined;
        const timer = window.setTimeout(() => setToast(""), 3500);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const normalizedSearch = search.trim().toLowerCase();
    const filteredLinks = quickLinks.filter((link) =>
        `${link.label} ${link.hint || ""}`.toLowerCase().includes(normalizedSearch)
    );

    const openDemo = (message) => setToast(message || "This is a demonstration action.");

    const handleClick = (link) => {
        if (link.to) {
            navigate(link.to);
        } else if (link.target) {
            // Section on this page (e.g. footer/contact) -> scroll; otherwise it lives on Home.
            const el = document.getElementById(link.target);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else navigate(`/#${link.target}`);
        } else {
            openDemo(link.note);
        }
    };

    return (
        <>
            <Navbar />

            <section id="support" className="hero-section scroll-mt-28 px-4 pb-20 pt-12 text-white sm:px-6 sm:pt-14">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-100">
                        Here to help
                    </p>
                    <h1 className="mb-3 text-3xl font-bold leading-tight md:text-5xl">Student Support</h1>
                    <p className="max-w-xl text-slate-100">
                        Common student actions, one click away.
                    </p>
                </div>
            </section>

            <main>
                <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
                    <section aria-label="Search student support" className="search-panel">
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="min-w-0 flex-1">
                                <label htmlFor="support-search" className="mb-2 block font-semibold text-slate-900">
                                    Search student support
                                </label>
                                <input
                                    id="support-search"
                                    type="search"
                                    placeholder="Try result, admit card, admission…"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                disabled={!search}
                                className="btn-secondary"
                            >
                                Clear search
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-slate-600" aria-live="polite">
                            Showing {filteredLinks.length} of {quickLinks.length} support actions
                        </p>
                    </section>
                </div>

                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                    <p className="section-eyebrow">Student essentials</p>
                    <h2 className="section-title">Support Actions</h2>

                    {filteredLinks.length ? (
                        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredLinks.map((link) => (
                                <li key={link.label}>
                                    <button type="button" onClick={() => handleClick(link)} className="support-card">
                                        <span className="support-icon" aria-hidden="true">{link.icon}</span>
                                        <span className="min-w-0">
                                            <span className="block font-semibold text-slate-900">{link.label}</span>
                                            <span className="mt-1 block text-sm leading-5 text-slate-600">{link.hint}</span>
                                        </span>
                                        <span className="support-arrow" aria-hidden="true">→</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <h3 className="font-semibold text-slate-900">No support links found</h3>
                            <p className="mt-2 text-sm text-slate-600">Try a different search term.</p>
                            <button type="button" onClick={() => setSearch("")} className="btn-primary mt-4">
                                Clear search
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <Footer onDemo={openDemo} />
            <Toast message={toast} onClose={() => setToast("")} />
        </>
    );
}
