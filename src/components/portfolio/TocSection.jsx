import { Link } from 'react-router-dom';
import { toc } from '@/data/portfolio';
import { Paperclip } from './decor';
import Reveal from './Reveal';

const noteStyles = [
  'bg-[linear-gradient(135deg,#3e2f75,#7a3891)]',
  'bg-[linear-gradient(135deg,#5d3a91,#a04a8f)]',
  'bg-[linear-gradient(135deg,#7a3891,#b8566f)]',
  'bg-[linear-gradient(135deg,#8a4f66,#c2634e)]',
  'bg-[linear-gradient(135deg,#2f3a75,#5b3f9e)]',
];

const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2'];

export default function TocSection() {
  return (
    <section id="muc-luc" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-16 sm:pb-24">
      <Reveal>
        <h2 className="bubble text-center font-display text-5xl font-black sm:text-7xl">Table of contents</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mx-auto mt-4 max-w-xl text-center font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">
          Ten tasks from a channel workflow · click to open a project
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {toc.map((item, i) => {
          const noteClass = `group relative block aspect-square rounded-[6px] p-3 font-heading text-[12px] font-bold uppercase leading-tight tracking-[0.08em] text-white shadow-[0_18px_30px_-18px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 sm:text-[13px] ${noteStyles[i % noteStyles.length]} ${tilts[i % tilts.length]}`;

          const inner = (
            <>
              <Paperclip className="absolute -top-6 left-1/2 h-12 w-4 -translate-x-1/2 text-cobalt brightness-150" />
              <span className="flex h-full items-center justify-center text-center drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]">
                {item.label}
              </span>
            </>
          );

          return (
            <Reveal key={`${item.label}-${i}`} delay={0.03 * i}>
              {/* Ghi chú trỏ tới section trong trang (bắt đầu bằng #) dùng <a>, còn lại là trang dự án. */}
              {item.to.startsWith('#') ? (
                <a href={item.to} className={noteClass}>
                  {inner}
                </a>
              ) : (
                <Link to={item.to} className={noteClass}>
                  {inner}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}