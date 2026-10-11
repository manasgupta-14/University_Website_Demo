import ServiceCard from "./ServiceCard.jsx";

export default function ServiceSection({
    status,
    services = [],
    onUse,
    onClear,
    search = "",
}) {
    return (
        <section
            id="services"
            className="scroll-mt-28 border-y border-slate-200 bg-mist py-16"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div>
                    <p className="section-eyebrow">Student essentials</p>
                    <h2 className="section-title">Online Services</h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Search and filter university services.
                    </p>
                </div>

                {status === "loading" && (
                    <p className="mt-6" role="status">
                        Loading services…
                    </p>
                )}

                {status === "error" && (
                    <p className="mt-6 text-red-700" role="alert">
                        Services could not be loaded.
                    </p>
                )}

                {status === "ready" && (
                    <>
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-slate-600" aria-live="polite">
                                Showing {services.length} services
                            </p>

                            <button
                                type="button"
                                onClick={onClear}
                                className="text-sm font-semibold text-pine underline underline-offset-4"
                            >
                                Clear filters
                            </button>
                        </div>

                        {services.length === 0 ? (
                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-8 text-center">
                                <h3 className="font-semibold text-slate-900">
                                    No services found
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    Try another search term or category.
                                </p>
                                <button
                                    type="button"
                                    onClick={onClear}
                                    className="btn-primary mt-4"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {services.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        onUse={onUse}
                                        search={search}
                                    />
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}