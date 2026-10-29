import { Link } from 'react-router-dom';
import { profile } from '@/data/portfolio';
import { Star } from './decor';

const links = [
  { label: 'About', href: '#gioi-thieu' },
  { label: 'CV', href: '#cv' },
  { label: 'Contents', href: '#muc-luc' },
  { label: 'Projects', href: '#du-an' },
  { label: 'Process', href: '#quy-trinh' },
  { label: 'Contact', href: '#lien-he' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-paper transition hover:text-ember sm:text-[11px] sm:tracking-[0.2em]"
        >
          <Star className="h-3 w-3 shrink-0 text-ember" />
          {profile.name}
        </Link>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 transition hover:bg-paper/10 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-1 hidden min-h-[36px] shrink-0 items-center rounded-full bg-ember px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-coral sm:inline-flex"
          >
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
