import AnimatedSection from "./AnimatedSection";

interface Props {
  index: string;
  label: string;
  title: string;
}

export default function SectionHeader({ index, label, title }: Props) {
  return (
    <AnimatedSection className="mb-10">
      <span
        className="block text-[10px] font-bold tracking-[2px] uppercase mb-1"
        style={{ color: "#00ff88" }}
      >
        {index} — {label}
      </span>
      <h2 className="text-[26px] font-black text-white mt-1">{title}</h2>
      <div
        className="mt-2 rounded-sm"
        style={{ width: 32, height: 2, background: "#00ff88" }}
      />
    </AnimatedSection>
  );
}
