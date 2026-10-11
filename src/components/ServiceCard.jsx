import Highlight from "./Highlight.jsx";

export default function ServiceCard({ service, onUse, search = "" }) {
    const categoryClass = {
        Exam: "category-exam",
        Admission: "category-admission",
        Results: "category-results",
        General: "category-general",
    }[service.category] || "category-general";

    return (
        <li className="service-card">
            <span className="mb-3 grid size-12 place-items-center rounded-xl bg-mist text-2xl" aria-hidden="true">
                {service.icon}
            </span>
            <span className={`category-pill ${categoryClass}`}>{service.category}</span>
            <h3 className="mt-3 font-semibold text-slate-900">
                <Highlight text={service.title} query={search} />
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                <Highlight text={service.description} query={search} />
            </p>
            <button type="button" className="btn-secondary mt-4 self-start" onClick={() => onUse(service)}>
                Open
            </button>
        </li>
    );
}
