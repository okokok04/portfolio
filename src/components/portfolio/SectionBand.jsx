import { Star } from './decor';

const tones = {
  lime: 'bg-lime text-gold',
  plum: 'bg-plum text-paper',
  ink: 'bg-ink text-lime',
  ember: 'bg-ember text-ink',
};

export default function SectionBand({ word, tone = 'lime', icon = true }) {
  return (
    <div className={`relative overflow-hidden rounded-[18px] px-6 py-9 sm:px-10 sm:py-12 ${tones[tone]}`}>
      {icon && (
        <>
          <Star className="absolute right-6 top-6 h-9 w-9 opacity-70" />
          <Star className="absolute -bottom-8 left-8 h-20 w-20 opacity-25" />
          <Star className="absolute -top-6 left-1/3 h-12 w-12 opacity-30" />
        </>
      )}
      <h2 className="relative text-center font-display text-4xl font-black uppercase tracking-[-0.02em] drop-shadow-[0_3px_0_rgba(0,0,0,0.18)] sm:text-6xl">
        {word}
      </h2>
      <div className="dashed-rule mt-6 h-[2px] w-full opacity-70" />
    </div>
  );
}