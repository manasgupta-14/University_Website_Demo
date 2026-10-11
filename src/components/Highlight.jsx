export default function Highlight({ text = "", query = "" }) {
    const value = String(text ?? "");
    const term = query.trim();
    if (!term) return value;

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = value.split(new RegExp(`(${escaped})`, "ig"));

    return parts.map((part, index) =>
        part.toLowerCase() === term.toLowerCase() ? (
            <mark className="search-highlight" key={`${part}-${index}`}>{part}</mark>
        ) : (
            part
        )
    );
}
