export default function SectionLabel({ index, label }) {
  return (
    <div className="inline-flex items-center gap-3" data-testid={`section-label-${label?.toLowerCase()}`}>
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
        {index}
      </span>
      <span className="w-8 h-px bg-cyan-400/60" />
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
        {label}
      </span>
    </div>
  );
}
