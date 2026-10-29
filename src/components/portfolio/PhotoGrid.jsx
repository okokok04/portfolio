import { Image } from '@/components/ui/image';
import { artwork } from '@/data/portfolio';
import Reveal from './Reveal';
import SectionBand from './SectionBand';

export default function PhotoGrid() {
  return (
    <section id="thu-vien" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-16 sm:pb-24">
      <Reveal>
        <SectionBand word="Artist" tone="lime" />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="paper paper-noise mt-8 rounded-[18px] p-4 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink/50">
            Artist — Visual &amp; Digital
          </p>
          <div className="mt-5 grid auto-rows-[120px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-4">
            {artwork.map((shot) => (
              <div key={shot.src} className={`overflow-hidden rounded-[10px] bg-ink/10 ${shot.span || ''}`}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
