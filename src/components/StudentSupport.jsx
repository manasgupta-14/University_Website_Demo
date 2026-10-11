import { quickLinks } from "../data/services.js";

export default function StudentSupport({ search = "", onDemo }) {
    const normalizedSearch = search.trim().toLowerCase();
    const filteredLinks = quickLinks.filter((link) =>
        `${link.label} ${link.note || ""}`.toLowerCase().includes(normalizedSearch)
    );

    const handleClick = (link) => {
        if (link.target) {
            document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" }); 
        } else {
            onDemo(link.note);
        }
    };

    return (
        <section id="support" className="support-section scroll-mt-28 py-16 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <p className="section-eyebrow text-amber-300">Here to help</p>
                <h2 className="section-title text-white">Student Support</h2>
                <p className="mt-2 text-slate-200">Common student actions, one click away.</p>

                {filteredLinks.length ? (
                    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredLinks.map((link) => (
                            <li key={link.label}>
                                <button
                                    type="button"
                                    onClick={() => handleClick(link)}
                                    className="h-full w-full rounded-xl border border-white/20 border-l-4 border-l-amber-400 bg-white/5 p-5 text-left font-semibold text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-6 rounded-lg border border-white/20 p-5 text-sm text-slate-200">
                        No support links match your search. Clear the search to see all links.
                    </p>
                )}
            </div>
        </section>
    );
}
