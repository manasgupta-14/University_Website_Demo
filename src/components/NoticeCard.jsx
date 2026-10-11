import Highlight from "./Highlight.jsx";
import { formatDate } from "../utils/formatDate.js";

export default function NoticeCard({ notice, onOpen, search = "" }) {
    const categoryClass = {
        Exam: "category-exam",
        Admission: "category-admission",
        Results: "category-results",
        General: "category-general",
    }[notice.category] || "category-general";

    return (
        <li className={`notice-card ${categoryClass}`}>
            <span className="category-pill">{notice.category}</span>
            <p className="mt-3 text-sm text-slate-600">{formatDate(notice.date)}</p>
            <h3 className="my-3 text-lg font-bold text-slate-900">
                <Highlight text={notice.title} query={search} />
            </h3>
            <p className="mb-4 leading-6 text-slate-600">
                <Highlight text={notice.summary} query={search} />
            </p>
            <button type="button" onClick={() => onOpen(notice)} className="btn-primary">
                View details
            </button>
        </li>
    );
}
