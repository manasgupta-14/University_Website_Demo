import NoticeCard from "./NoticeCard.jsx";

export default function NoticeSection({ status, notices = [], onOpen, onClear, search = "" }) {
    return (
        <section id="notices" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="section-eyebrow">University updates</p>
                    <h2 className="section-title">Announcements & Notices</h2>
                </div>
                <p className="text-sm text-slate-600" aria-live="polite">
                    {status === "ready" ? `${notices.length} notices` : ""}
                </p>
            </div>

            {status === "loading" && (
                <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600" role="status">
                    Loading notices…
                </p>
            )}

            {status === "ready" && notices.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h3 className="font-semibold text-slate-900">No notices found</h3>
                    <p className="mt-2 text-slate-600">Try a different search term or category.</p>
                    <button type="button" onClick={onClear} className="btn-primary mt-4">
                        Clear filters
                    </button>
                </div>
            )}

            {status === "ready" && notices.length > 0 && (
                <ul className="grid gap-5 md:grid-cols-2">
                    {notices.map((notice) => (
                        <NoticeCard
                            key={notice.id}
                            notice={notice}
                            onOpen={onOpen}
                            search={search}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
