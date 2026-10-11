import { useEffect, useRef } from "react";
import { formatDate } from "../utils/formatDate.js";

export default function NoticeModal({ notice, onClose }) {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (!notice) return undefined;

        closeButtonRef.current?.focus();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [notice, onClose]);

    if (!notice) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/65 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="notice-dialog-title"
                aria-describedby="notice-dialog-description"
                className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
                <div className="flex items-start justify-between gap-4">
                    <span className="category-pill">{notice.category}</span>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close notice details"
                        className="rounded-lg px-3 py-1 text-xl text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-pine"
                    >
                        ×
                    </button>
                </div>

                <p className="mt-4 text-sm text-slate-600">{formatDate(notice.date)}</p>
                <h2 id="notice-dialog-title" className="my-3 text-2xl font-bold text-slate-900">
                    {notice.title}
                </h2>
                <p id="notice-dialog-description" className="leading-7 text-slate-700">
                    {notice.details}
                </p>
                <p className="mt-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                    Sample notice — content is fictional and provided for this frontend demonstration.
                </p>
                <button type="button" onClick={onClose} className="btn-primary mt-5">
                    Close
                </button>
            </section>
        </div>
    );
}
