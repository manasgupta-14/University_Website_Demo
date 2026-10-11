import { useState, useEffect } from "react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Notices", href: "#notices" },
    { name: "Online Services", href: "#services" },
    { name: "Student Support", href: "#support" },
    { name: "Contact", href: "#contact" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const handleClick = (href) => {
        setActiveSection(href.replace("#", ""));
        setIsMenuOpen(false);
    };

    useEffect(() => {
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
    }, []);

    const linkClasses = (href) => {
        const isActive = activeSection === href.slice(1);

        return `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
                ? "bg-pine text-white"
                : "text-slate-700 hover:bg-mist hover:text-pine"
            }`;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur">
            <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
                <a
                    href="#home"
                    onClick={() => handleClick("#home")}
                    className="flex min-w-0 items-center gap-3 font-heading text-lg font-extrabold leading-tight text-pine sm:text-xl"
                >
                    <span aria-hidden="true" className="logo-mark">A</span>
                    <span className="min-w-0">
                        Aarohan Open University
                        <span className="block font-sans text-xs font-medium text-slate-600">
                            Student Information System · Demo
                        </span>
                    </span>
                </a>

                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => handleClick(link.href)}
                            aria-current={
                                activeSection === link.href.slice(1)
                                    ? "location"
                                    : undefined
                            }
                            className={linkClasses(link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
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
                    className="rounded-lg border border-slate-300 px-3 py-2 text-pine transition hover:bg-mist focus:outline-none focus:ring-2 focus:ring-pine md:hidden"
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
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => handleClick(link.href)}
                                aria-current={
                                    activeSection === link.href.slice(1)
                                        ? "location"
                                        : undefined
                                }
                                className={linkClasses(link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;