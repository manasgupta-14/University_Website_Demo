import { formatDate } from "../utils/formatDate.js";

export default function Hero({ notices = [], onOpen, status = "ready" }) {
    return (
        <section id="home" className="hero-section scroll-mt-28 px-4 py-14 text-white sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-100">
                        Flexible learning • Student-first support
                    </p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
                        Learn on your schedule, from anywhere
                    </h1>
                    <p className="mb-6 max-w-xl text-slate-200">
                        Aarohan Open University offers distance learning programmes.
                        Check notices, exam dates and student services online.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="#notices" className="btn-amber">View Notices</a>
                        <a href="#services" className="btn-outline-light">Explore Services</a>
                    </div>
                    <p className="mt-5 text-xs text-slate-300">
                        Demo university website — not affiliated with VMOU or any real university.
                    </p>
                </div>

                <div className="hero-card rounded-2xl border border-white/15 bg-white p-5 text-slate-900 shadow-xl sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold">Latest Notices</h2>
                        <a href="#notices" className="text-sm font-semibold text-pine underline underline-offset-4">
                            View all
                        </a>
                    </div>
                    {status === "loading" ? (
                        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600" role="status">
                            Loading latest notices…
                        </p>
                    ) : status === "error" ? (
                        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                            Latest notices are temporarily unavailable.
                        </p>
                    ) : notices.length ? (
                        <ul className="divide-y divide-slate-200">
                            {notices.slice(0, 3).map((notice) => (
                                <li key={notice.id} className="py-3">
                                    <button
                                        type="button"
                                        onClick={() => onOpen(notice)}
                                        className="text-left font-semibold text-slate-800 hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                                    >
                                        {notice.title}
                                    </button>
                                    <p className="mt-1 text-sm text-slate-600">
                                        {formatDate(notice.date)} · {notice.category}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                            No sample notices are available.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
