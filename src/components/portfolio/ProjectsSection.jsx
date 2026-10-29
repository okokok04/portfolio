import { projects } from '@/data/portfolio';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

export default function ProjectsSection() {
  return (
    <section id="du-an" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-16 sm:pb-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="bubble font-display text-5xl font-black sm:text-7xl">Projects</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/50">
            {projects.length} featured channels · click for the numbers
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={0.04 * i} className={i === 0 ? 'sm:col-span-2' : ''}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}