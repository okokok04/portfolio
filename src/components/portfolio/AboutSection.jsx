import { Image } from '@/components/ui/image';
import { img, profile, softSkills } from '@/data/portfolio';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Fish, Paperclip, Scribble, Star } from './decor';
import Reveal from './Reveal';

const contactRows = [
  { id: 'email', Icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { id: 'phone', Icon: Phone, label: profile.phone, href: `tel:${profile.phoneHref}` },
  { id: 'place', Icon: MapPin, label: profile.location, href: null },
];

// Two positioning chips shown under the bio: "YouTube SEO" + "Content production".
const positioning = profile.tagline.split('+').map((item) => item.trim());

export default function AboutSection() {
  return (
    <section id="gioi-thieu" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-16 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-lime">01 — ABOUT</p>
      </Reveal>

      <div className="mt-9 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="relative">
          <div className="paper paper-noise -rotate-2 rounded-[16px] p-3 pb-14">
            <Paperclip className="absolute -top-5 left-1/2 h-11 w-4 -translate-x-1/2 text-cobalt" />
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[10px]">
              <Image
                src={img.aboutPhoto}
                alt={`Portrait of ${profile.name}`}
                className="h-full w-full object-cover object-[center_28%]"
              />
            </div>
            <p className="absolute bottom-4 left-5 font-hand text-2xl text-ink/70">{profile.name}</p>
            <p className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">{profile.role}</p>
          </div>
          <Fish className="absolute -right-5 -top-7 h-14 w-20 text-cobalt" />
          <Star className="absolute -bottom-4 -left-4 h-7 w-7 text-ember" />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="bubble font-display text-5xl font-black leading-none sm:text-6xl">Hi there!</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-paper/80">{profile.bio}</p>
          </Reveal>

          {/* Định vị nghề nghiệp: SEO YouTube + sản xuất nội dung. */}
          <Reveal delay={0.08}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {positioning.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-lime/35 bg-lime/[0.08] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-lime"
                >
                  <Star className="h-3 w-3 shrink-0 text-lime" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-3">
              {contactRows.map(({ id, Icon, label, href }) => (
                <li key={id} className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-paper/70">
                  <Icon className="h-4 w-4 shrink-0 text-lime" />
                  {href ? (
                    <a href={href} className="transition hover:text-ember">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
          <Scribble className="mt-10 h-8 w-52 text-lime/70" />
        </div>
      </div>
    </section>
  );
}
