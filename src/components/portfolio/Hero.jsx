import { Image } from '@/components/ui/image';
import { img, profile } from '@/data/portfolio';
import { Arrow, Fish, Paperclip, Pencil, Star, Tape } from './decor';
import Ticker from './Ticker';

const tickerItems = [
  profile.year,
  profile.role,
  'Available for freelance',
  'Content production',
  'Channel growth',
  profile.location,
  profile.name,
];

export default function Hero() {
  return (
    <section className="relative pt-6">
      <Ticker items={tickerItems} />

      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="relative">
          <div className="flex items-center gap-3">
            <Tape className="h-6 w-16 -rotate-3" />
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/60">
              {profile.year} — {profile.role}
            </p>
          </div>

          <h1 className="mt-6 font-display text-[19vw] font-black leading-[0.8] tracking-[-0.03em] sm:text-[13vw] lg:text-[8.6rem]">
            <span className="bubble block">Port</span>
            <span className="outline-paper block">folio</span>
          </h1>

          <p className="mt-8 max-w-md font-hand text-2xl leading-snug text-lime sm:text-3xl">
            I build YouTube channels that get found, get watched, and keep growing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#du-an"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ember px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(0,0,0,0.95)] transition hover:bg-coral"
            >
              View projects
              <Arrow className="h-5 w-9 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#lien-he"
              className="inline-flex min-h-[44px] items-center rounded-full border border-paper/25 px-6 py-3 font-heading text-sm font-semibold text-paper transition hover:border-paper/60 hover:bg-paper/10"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="floaty-slow">
            <div className="paper paper-noise rotate-[2.5deg] rounded-[16px] p-3 pb-14">
              <Paperclip className="absolute -top-5 left-1/2 h-11 w-4 -translate-x-1/2 text-cobalt" />
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[10px]">
                <Image src={img.heroPhoto} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 px-1 font-hand text-xl text-ink/55">{profile.name} — {profile.role}</p>
            </div>
          </div>
          <Fish className="absolute -bottom-8 -left-7 h-16 w-24 text-cobalt" />
          <Star className="absolute -right-3 -top-5 h-8 w-8 text-ember" />
        </div>
      </div>

      <Pencil className="pointer-events-none mx-auto hidden h-10 w-56 rotate-[6deg] opacity-90 lg:block" />
    </section>
  );
}
