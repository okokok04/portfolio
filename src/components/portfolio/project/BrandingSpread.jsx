import Reveal from '../Reveal';
import ImageGrid from './ImageGrid';

export default function BrandingSpread({ project }) {
  return (
    <div className="mt-8 space-y-8">
      <Reveal>
        <div className="paper paper-noise rounded-[18px] p-6 sm:p-9">
          <div className="grid gap-9 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4 text-[15px] leading-[1.9] text-ink/80">
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {project.palette && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">Palette</p>
                <div className="mt-4 space-y-3">
                  {project.palette.map((color) => (
                    <div key={color.hex} className="flex items-center gap-3">
                      <span
                        className="h-11 w-11 shrink-0 rounded-[6px] border border-ink/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60">
                        {color.name} · {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <ImageGrid items={project.gallery} />
      </Reveal>
    </div>
  );
}