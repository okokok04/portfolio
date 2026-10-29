import { Star } from './decor';

export default function Ticker({ items = [] }) {
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-paper/10 bg-ink/60 py-2">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.32em] text-paper/60">
            <span>{item}</span>
            <Star className="h-2.5 w-2.5 text-ember" />
          </span>
        ))}
      </div>
    </div>
  );
}