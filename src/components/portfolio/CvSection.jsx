import { Suspense, lazy } from 'react';
import { certificates, education, experience, softSkillGroups, tooling, tools } from '@/data/portfolio';
import { Arrow, Star } from './decor';
import Reveal from './Reveal';
import ToolLogo from './ToolLogo';

// three.js only loads when the education block actually needs it, keeping the home bundle light.
const CampusMap3D = lazy(() => import('./CampusMap3D'));

export default function CvSection() {
  return (
    <section id="cv" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-16 sm:pb-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-lime">02 — CV</p>
      </Reveal>

      <div className="mt-9 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="paper paper-noise h-full rounded-[16px] p-6">
            <h3 className="sticker-text font-display text-3xl font-black">Education</h3>
            {education.map((item) => (
              <div key={item.school} className="mt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">{item.period}</p>
                <p className="mt-2 font-heading text-lg font-semibold text-ink">{item.school}</p>
                <p className="text-sm text-ink/70">{item.major}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/60">{item.note}</p>
              </div>
            ))}

            {/* Certificates — same typographic rhythm as the education block above. */}
            <div className="mt-6 border-t border-ink/15 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Certificates</p>
              <ul className="mt-3 space-y-3">
                {certificates.map((item) => (
                  <li key={item.title} className="relative pl-4">
                    <span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full bg-coral" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">{item.period}</p>
                    <p className="mt-0.5 font-heading text-[14px] font-semibold leading-snug text-ink">{item.title}</p>
                    <p className="text-[12px] leading-relaxed text-ink/60">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>

            {education.map((item) => (
              <div key={`campus-${item.school}`} className="mt-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  Campus map · {item.school}
                </p>
                <Suspense
                  fallback={
                    <div className="aspect-[4/3] w-full animate-pulse rounded-[12px] bg-ink/10" />
                  }
                >
                  <CampusMap3D className="aspect-[4/3] w-full" />
                </Suspense>
                <p className="mt-2 text-[11px] leading-relaxed text-ink/45">
                  Interactive 3D map — drag to rotate, scroll to zoom. The red marker is the Assembly Hall,
                  where the graduation ceremony takes place.
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="paper paper-noise h-full rounded-[16px] p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="sticker-text font-display text-3xl font-black">Experience</h3>
              <Arrow className="h-8 w-12 shrink-0 -scale-x-100 text-cobalt" />
            </div>
            <ol className="relative mt-6 space-y-6 border-l border-ink/20 pl-5">
              {experience.map((item) => (
                <li key={item.company} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-2 border-coral bg-paper" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">{item.period}</p>
                  <p className="mt-1 font-heading text-[15px] font-bold uppercase text-ink">{item.company}</p>
                  <p className="text-[13px] italic text-ink/60">{item.role}</p>
                  <ul className="mt-2 space-y-1">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-[13px] leading-relaxed text-ink/70">
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-coral" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="paper paper-noise h-full rounded-[16px] p-6">
            <h3 className="sticker-text font-display text-3xl font-black">Software skills</h3>

            {/* Tools in daily use */}
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {tools
                .filter((tool) => tool.used)
                .map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-start gap-2.5 rounded-[12px] bg-ink p-2.5 text-paper"
                  >
                    <ToolLogo id={tool.id} className="h-8 w-8 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-heading text-[13px] font-semibold leading-tight">{tool.name}</p>
                      <p className="mt-0.5 text-[10px] leading-snug text-paper/50">{tool.role}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Suggested additions for YouTube content production */}
            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                Worth adding
              </p>
              <ul className="mt-2 space-y-1.5">
                {tools
                  .filter((tool) => !tool.used)
                  .map((tool) => (
                    <li key={tool.id} className="flex items-center gap-2.5 text-[12px] text-ink/70">
                      <ToolLogo id={tool.id} className="h-5 w-5 shrink-0" />
                      <span className="font-heading font-semibold text-ink">{tool.name}</span>
                      <span className="text-ink/45">{tool.role}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Soft skills, grouped by part of the job */}
            <div className="mt-6 border-t border-ink/15 pt-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-ember" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Soft skills</p>
              </div>
              <div className="mt-3 space-y-3">
                {softSkillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="font-heading text-[12px] font-semibold text-ink/70">{group.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-ink/15 bg-ink/[0.04] px-2.5 py-1 text-[11px] leading-none text-ink/65"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Building tools to shorten the repetitive parts */}
            <div className="mt-5 rounded-[12px] border border-cobalt/25 bg-cobalt/[0.06] p-3.5">
              <p className="font-heading text-[13px] font-semibold text-ink">{tooling.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink/60">{tooling.body}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {tooling.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[6px] bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-paper/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
