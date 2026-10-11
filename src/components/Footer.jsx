export default function Footer({ onDemo }) {
    return (
        <footer id="contact" className="scroll-mt-28 border-t-4 border-amber bg-deep px-4 pb-6 pt-12 text-slate-100 sm:px-6">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-3 text-lg font-bold text-white">Aarohan Open University</h2>
                    <address className="not-italic leading-7 text-slate-300">
                        University Road, Sample City, State 000000<br />
                        Phone: 000-0000-000<br />
                        Email: help@example.edu
                    </address>
                </div>

                <nav aria-label="Useful links">
                    <h2 className="mb-3 text-lg font-bold text-white">Useful Links</h2>
                    <ul className="space-y-2">
                        <li><a className="footer-link" href="#notices">Notices</a></li>
                        <li><a className="footer-link" href="#services">Online Services</a></li>
                        <li><a className="footer-link" href="#support">Student Support</a></li>
                        <li>
                            <button type="button" onClick={() => onDemo("Demo privacy policy: no personal information is collected or stored by this frontend-only website.")} className="footer-link">
                                Privacy Policy
                            </button>
                        </li>
                    </ul>
                </nav>

                <p className="border-t border-white/15 pt-4 text-sm text-slate-300 md:col-span-2">
                    © 2026 Aarohan Open University (demo). Built for a frontend assignment. Not affiliated with any real university.
                </p>
            </div>
        </footer>
    );
}
