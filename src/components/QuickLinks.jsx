import { quickLinks } from "../data/services.js";
export default function QuickLinks({ onDemo }) {
  const go = (link) => {
    if (link.target) {
      document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      onDemo(link.note);
    }
  };
  return (
    <section id="support" className="bg-deep py-14 text-white" aria-labelledby="support-h">
      <div className="wrap">
        <h2 id="support-h" className="text-white">Student support</h2>
        <p className="max-w-[56ch]">Common things students need, one click away.</p>
        <div className="mt-5 grid grid-cols-3 gap-[.8rem] max-[900px]:grid-cols-2 max-[760px]:grid-cols-1">
          {quickLinks.map((l) => (
            <button key={l.label} className="cursor-pointer rounded-xl border-[1.5px] border-l-[6px] border-[#3b6b60] border-l-amber bg-pine px-[1.2rem] py-[1.1rem] text-left font-semibold text-white transition duration-150 hover:bg-amber hover:text-deep" onClick={() => go(l)}>{l.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
