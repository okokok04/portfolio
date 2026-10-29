import { profile } from '@/data/portfolio';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Arrow, Star } from './decor';
import Reveal from './Reveal';

// Icon social vẽ bằng SVG thuần để không phải thêm thư viện icon.
const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M21.9 4.3 18.9 19c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.2 12.9l-4.4-1.4c-1-.3-1-1 .2-1.4l17.2-6.6c.8-.3 1.5.2 1.3 1.1Z" />
    </svg>
  ),
};

// `chip` là màu nền của ô icon, `tone` là màu đường dẫn — giữ đúng màu thương hiệu.
const iconTones = {
  facebook: { chip: 'bg-[#1877F2]/15', tone: 'text-[#1877F2]' },
  instagram: { chip: 'bg-[#E1306C]/15', tone: 'text-[#E1306C]' },
  telegram: { chip: 'bg-[#229ED9]/15', tone: 'text-[#229ED9]' },
};

// Hàng liên hệ trực tiếp: icon → nhãn nhỏ → giá trị lớn → mũi tên.
const contactRows = [
  { id: 'email', Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { id: 'phone', Icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
];

export default function ContactSection() {
  return (
    <footer id="lien-he" className="scroll-mt-24 border-t border-paper/10 bg-ink/70">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Star className="h-3.5 w-3.5 text-ember" />
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/50">04 — CONTACT</p>
            </div>
            <p className="hidden items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-lime sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Open to work
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
          {/* Cột trái: lời mời + hai kênh liên hệ chính, mỗi kênh là một card bấm được. */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="bubble font-display text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                Let&apos;s work
                <br />
                together
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-6 max-w-lg text-[14px] leading-[1.85] text-paper/60">
                Open to YouTube SEO, channel strategy and content production roles — full-time or freelance.
                Email is the fastest way to reach me.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 space-y-3">
              {contactRows.map(({ id, Icon, label, value, href }) => (
                <a
                  key={id}
                  href={href}
                  className="group flex items-center gap-4 rounded-[14px] border border-paper/12 px-4 py-4 transition hover:border-ember/60 hover:bg-paper/[0.04] sm:px-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper/[0.08] text-ember">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.26em] text-paper/40">
                      {label}
                    </span>
                    <span className="mt-1 block truncate font-heading text-[15px] font-semibold text-paper sm:text-lg">
                      {value}
                    </span>
                  </span>
                  <Arrow className="h-5 w-9 shrink-0 text-paper/25 transition-transform group-hover:translate-x-1 group-hover:text-ember" />
                </a>
              ))}
            </Reveal>
          </div>

          {/* Cột phải: card social cao bằng cột trái, thông tin địa điểm neo xuống đáy. */}
          <Reveal delay={0.15} className="h-full">
            <div className="flex h-full flex-col rounded-[18px] border border-paper/12 bg-paper/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-paper/45">Socials</p>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/30">03 channels</span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {profile.socials.map((social) => {
                  const tone = iconTones[social.id] || { chip: 'bg-paper/10', tone: 'text-paper/60' };
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-3 rounded-[12px] px-2 py-2.5 transition hover:bg-paper/[0.06]"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${tone.chip} ${tone.tone}`}
                        >
                          {socialIcons[social.id]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[13px] font-semibold leading-tight text-paper">
                            {social.label}
                          </span>
                          <span className="block truncate font-mono text-[10.5px] text-paper/45">
                            {social.handle}
                          </span>
                        </span>
                        <Arrow className="h-4 w-7 shrink-0 text-paper/20 transition-transform group-hover:translate-x-1 group-hover:text-ember" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-paper/10 pt-5">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-paper/40">Based in</p>
                <p className="mt-1.5 flex items-start gap-2 font-heading text-[13px] leading-snug text-paper/75">
                  <MapPin className="mt-[2px] h-3.5 w-3.5 shrink-0 text-lime" />
                  {profile.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-paper/40">
            Channel data updated 10/2026 · source: YouTube
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-paper/40">
            © {profile.year} {profile.name} · {profile.role}
          </p>
        </div>
      </div>
    </footer>
  );
}
