import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Backdrop from '@/components/portfolio/Backdrop';
import ContactSection from '@/components/portfolio/ContactSection';
import Nav from '@/components/portfolio/Nav';
import Reveal from '@/components/portfolio/Reveal';
import BrandingSpread from '@/components/portfolio/project/BrandingSpread';
import GallerySpread from '@/components/portfolio/project/GallerySpread';
import MarketingSpread from '@/components/portfolio/project/MarketingSpread';
import YoutubeSpread from '@/components/portfolio/project/YoutubeSpread';
import { projects } from '@/data/portfolio';
import PageNotFound from '@/lib/PageNotFound';

const spreads = {
  branding: BrandingSpread,
  marketing: MarketingSpread,
  gallery: GallerySpread,
  youtube: YoutubeSpread,
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const project = projects.find((item) => item.slug === slug);
  const others = projects.filter((item) => item.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (project) return undefined;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    // Cleanup phải trả về void — removeChild() trả về node bị xoá nên bọc ngoặc nhọn.
    return () => {
      document.head.removeChild(meta);
    };
  }, [project]);

  if (!project) {
    return <PageNotFound />;
  }

  const Spread = spreads[project.type] || GallerySpread;

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <Nav />

      <main className="mx-auto max-w-[1200px] px-5 pb-16 pt-8 sm:pt-12">
        <Reveal>
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.26em] text-paper/50 transition hover:text-ember"
          >
            ← Back home
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="paper paper-noise mt-6 rounded-[18px] p-6 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">{project.category}</p>
            <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] text-ink sm:text-7xl">
              {project.title}
            </h1>
            <div className="mt-5 h-[2px] w-full bg-gold/40" />
            <p className="mt-6 max-w-3xl text-[15px] leading-[1.9] text-ink/80">{project.intro}</p>

            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] sm:grid-cols-4">
              <div>
                <dt className="text-ink/45">Year</dt>
                <dd className="mt-1 text-ink">{project.year}</dd>
              </div>
              <div>
                <dt className="text-ink/45">Role</dt>
                <dd className="mt-1 text-ink">{project.role}</dd>
              </div>
              <div>
                <dt className="text-ink/45">Category</dt>
                <dd className="mt-1 text-ink">{project.category}</dd>
              </div>
              {/* YouTube projects show subscribers, others show the legacy note. */}
              <div>
                <dt className="text-ink/45">{project.channel ? 'Channel' : 'Media'}</dt>
                <dd className="mt-1 text-ink">
                  {project.channel ? `${project.channel.subs} subs` : '—'}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Spread project={project} />

        <Reveal>
          <div className="mt-16">
            <h2 className="font-display text-3xl font-black text-paper sm:text-4xl">Other projects</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to={`/du-an/${other.slug}`}
                  className="paper paper-noise group flex items-center justify-between gap-3 rounded-[14px] px-5 py-4 transition hover:-translate-y-1"
                >
                  <span className="font-heading text-sm font-bold uppercase text-ink">{other.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40 transition group-hover:text-ember">
                    view →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <ContactSection />
    </div>
  );
}