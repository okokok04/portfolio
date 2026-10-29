import Reveal from '../Reveal';
import ImageGrid from './ImageGrid';

export default function GallerySpread({ project }) {
  return (
    <div className="mt-8 space-y-8">
      <Reveal>
        <div className="paper paper-noise rounded-[18px] p-6 sm:p-9">
          <div className="space-y-4 text-[15px] leading-[1.9] text-ink/80">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <ImageGrid items={project.gallery} />
      </Reveal>
    </div>
  );
}