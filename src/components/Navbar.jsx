import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { getCurrentUser, logoutUser } from "../data/auth.js";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Notices", href: "#notices" },
    { name: "Online Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

function Navbar() {
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const isSupport = pathname === "/studentsupport";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [user, setUser] = useState(getCurrentUser());

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        setIsMenuOpen(false);
    };

    const handleClick = (href) => {
        setActiveSection(href.replace("#", ""));
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isHome) return undefined;
        const sections = navLinks
            .map((link) => document.getElementById(link.href.slice(1)))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [isHome]);

    const pill = (isActive) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
            ? "bg-blue-500 text-white"
            : "text-slate-700 hover:bg-mist hover:text-blue-600"
        }`;

    // Section links work from every page: on Home they scroll, elsewhere they go to "/#section".
    const sectionLink = (link, extra = {}) => {
        const isActive = isHome && activeSection === link.href.slice(1);
        return (
            <Link
                key={link.name}
                to={`/${link.href}`}
                onClick={() => handleClick(link.href)}
                aria-current={isActive ? "location" : undefined}
                className={pill(isActive)}
                {...extra}
            >
                {link.name}
            </Link>
        );
    };

    const supportLink = (
        <Link
            to="/studentsupport"
            onClick={() => setIsMenuOpen(false)}
            aria-current={isSupport ? "page" : undefined}
            className={pill(isSupport)}
        >
            Student Support
        </Link>
    );

    return (

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur">
            <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
                <Link
                    to="/#home"
                    onClick={() => handleClick("#home")}
                    className="flex min-w-0 items-center gap-3 font-heading text-lg font-extrabold leading-tight text-blue-800 sm:text-xl"
                >
                    <span aria-hidden="true" className="logo-mark">A</span>
                    <span className="min-w-0">
                        Aarohan Open University
                        <span className="block font-sans text-xs font-medium text-slate-600">
                            Student Information System · Demo
                        </span>
                    </span>
                </Link>

                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.slice(0, 3).map((link) => sectionLink(link))}
                    {supportLink}
                    {sectionLink(navLinks[3])}
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    {user ? (
                        <>
                            <span className="text-sm font-semibold text-slate-700">Hi, {user.name}</span>
                            <button type="button" onClick={handleLogout} className="btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-blue-700 transition hover:bg-mist focus:outline-none focus:ring-2 focus:ring-blue-600 md:hidden"
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg md:hidden"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {navLinks.slice(0, 3).map((link) => sectionLink(link))}
                        {supportLink}
                        {sectionLink(navLinks[3])}
                        {user ? (
                            <button type="button" onClick={handleLogout} className="btn-secondary mt-2">
                                Logout ({user.name})
                            </button>
                        ) : (
                            <div className="mt-2 flex gap-2">
                                <Link to="/login" className="btn-secondary flex-1">Login</Link>
                                <Link to="/register" className="btn-primary flex-1">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;