import Reveal from '../Reveal';
import ImageGrid from './ImageGrid';

export default function MarketingSpread({ project }) {
  return (
    <div className="mt-8 space-y-8">
      <Reveal>
        <div className="paper paper-noise rounded-[18px] p-6 sm:p-9">
          <div className="space-y-4 text-[15px] leading-[1.9] text-ink/80">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project.metrics && (
            <div className="mt-9 grid gap-6 border-t border-ink/15 pt-7 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-4xl font-black text-cobalt sm:text-5xl">{metric.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{metric.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <ImageGrid items={project.gallery} />
      </Reveal>
    </div>
  );
}