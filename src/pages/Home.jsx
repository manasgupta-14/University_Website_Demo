import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NoticeSection from "../components/NoticeSection.jsx";
import NoticeModal from "../components/NoticeModal.jsx";
import ServiceSection from "../components/ServiceSection.jsx";
import Toast from "../components/Toast.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation, useNavigate } from "react-router";
import { fetchData } from "../data/api.js";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({ notices: [], services: [] });
    const [status, setStatus] = useState("loading");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [toast, setToast] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;
        fetchData({ retry: attempt > 0 })
            .then((result) => {
                if (cancelled) return;
                setData(result);
                setStatus("ready");
            })
            .catch((error) => {
                if (cancelled) return;
                console.error("Unable to load demo data:", error);
                setStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, [attempt]);

   
    useEffect(() => {
        if (!location.hash || status === "loading") return;
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, [location.key, location.hash, status]);

    useEffect(() => {
        if (!toast) return undefined;
        const timer = window.setTimeout(() => setToast(""), 3500);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const clearFilters = useCallback(() => {
        setSearch("");
        setCategory("All");
    }, []);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredNotices = useMemo(
        () =>
            data.notices.filter((notice) => {
                const matchesCategory =
                    category === "All" || notice.category === category;
                const searchableText =
                    `${notice.title} ${notice.summary} ${notice.details} ${notice.category}`.toLowerCase();
                return matchesCategory && searchableText.includes(normalizedSearch);
            }),
        [data.notices, category, normalizedSearch]
    );

    const filteredServices = useMemo(
        () =>
            data.services.filter((service) => {
                const matchesCategory =
                    category === "All" || service.category === category;
                const searchableText =
                    `${service.title} ${service.description} ${service.category}`.toLowerCase();
                return matchesCategory && searchableText.includes(normalizedSearch);
            }),
        [data.services, category, normalizedSearch]
    );

    const openDemo = (message) => {
        setToast(message || "This is a demonstration action.");
    };

    return (
        <>
            <Navbar />
            <Hero notices={data.notices} onOpen={setSelectedNotice} status={status} />

            <main>
                <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-2 sm:px-6">
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                        onClear={clearFilters}
                        noticeCount={filteredNotices.length}
                        serviceCount={filteredServices.length}
                        status={status}
                    />
                </div>

                {status === "error" ? (
                    <section className="mx-auto max-w-4xl px-4 py-12 text-center" role="alert">
                        <h2 className="text-xl font-bold">We couldn’t load the university information.</h2>
                        <p className="mt-2 text-slate-600">
                            Please try again. This demo can also show a sample error when the URL contains ?error.
                        </p>
                        <button
                            type="button"
                            onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}
                            className="btn-primary mt-5"
                        >
                            Retry loading
                        </button>
                    </section>
                ) : (
                    <>
                        <NoticeSection
                            status={status}
                            notices={filteredNotices}
                            search={search}
                            onOpen={setSelectedNotice}
                            onClear={clearFilters}
                        />

                        <ServiceSection
                            status={status}
                            services={filteredServices}
                            category={category}
                            setCategory={setCategory}
                            search={search}
                            onClear={clearFilters}
                            onUse={(service) =>
                                service.id === "admission"
                                    ? navigate("/register")
                                    : openDemo(`${service.title}: this is a demo action; no external service is connected.`)
                            }
                        />
                    </>
                )}

                
            </main>

            <NoticeModal
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
            />

            <Footer onDemo={openDemo} />

            <Toast message={toast} onClose={() => setToast("")} />
        </>
    );
}

export default Home;
