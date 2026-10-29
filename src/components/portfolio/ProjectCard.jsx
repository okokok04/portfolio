import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Arrow } from './decor';

// Card dự án: dự án YouTube hiện thêm dải số liệu kênh để người xem thấy
// ngay quy mô kênh mà không cần mở trang chi tiết.
export default function ProjectCard({ project, index, className = '' }) {
  const { channel } = project;

  return (
    <Link
      to={`/du-an/${project.slug}`}
      className={`group paper paper-noise block overflow-hidden rounded-[16px] p-3 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[12px]">
        <div className="aspect-[4/3] w-full">
          <Image
            src={project.cover}
            alt={`${project.title} — featured thumbnail`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
          {String(index + 1).padStart(2, '0')}
        </span>
        {channel && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-coral px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            YouTube
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">{project.category}</p>
          <h3 className="mt-2 font-display text-3xl font-black uppercase leading-none text-ink">{project.title}</h3>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/65">{project.subtitle}</p>

          {channel && (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/10 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50">
              <span className="font-semibold text-ink">{channel.subs} subs</span>
              <span>{channel.views} views</span>
              <span>{channel.videos} video</span>
            </div>
          )}
        </div>
        <Arrow className="h-6 w-11 shrink-0 text-ember transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
