const base = "inline-block cursor-pointer rounded-full border-2 font-semibold no-underline transition duration-150 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-45";
const variants = {
  solid: "border-pine bg-pine text-white hover:border-leaf hover:bg-leaf",
  ghost: "border-pine bg-transparent text-pine hover:bg-mist",
  amber: "border-amber bg-amber text-deep hover:border-[#ffc552] hover:bg-[#ffc552]",
  ghostLight: "border-white bg-transparent text-white hover:bg-white/15",
};
const sizes = {
  md: "px-[1.3rem] py-[.7rem]",
  sm: "px-4 py-[.4rem] text-[.9rem]",
};
export const btn = (variant = "solid", size = "md") => `${base} ${variants[variant]} ${sizes[size]}`;
export const linkBtn = (light = false) =>
  `cursor-pointer border-0 bg-transparent p-0 text-left underline ${light ? "font-normal text-white" : "font-semibold text-pine"}`;
const cats = {
  exam: { bar: "border-l-[#c98a00]", tint: "bg-[#fff0c9]" },
  admission: { bar: "border-l-[#2f6bc4]", tint: "bg-[#e1eaf8]" },
  results: { bar: "border-l-[#1a6b52]", tint: "bg-[#d8efe5]" },
  general: { bar: "border-l-[#6b5aa8]", tint: "bg-[#ece8f7]" },
};
export const catStyle = (category) => cats[category.toLowerCase()] ?? { bar: "border-l-leaf", tint: "bg-mist" };
