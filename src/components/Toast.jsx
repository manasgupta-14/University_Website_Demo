export default function Toast({ message, onClose }) {
    if (!message) return null;
    return (
        <div className="toast-message" role="status" aria-live="polite">
            <span>{message}</span>
            <button type="button" aria-label="Dismiss notification" onClick={onClose}>
                ×
            </button>
        </div>
    );
}
