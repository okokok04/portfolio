import { Arrow, Star } from '../decor';
import Reveal from '../Reveal';

// "171K" → 171000, "1.2M" → 1200000. Dùng để vẽ thanh so sánh view giữa các video.
function parseViews(value) {
  if (!value) return 0;
  const n = parseFloat(String(value).replace(/,/g, ''));
  if (Number.isNaN(n)) return 0;
  if (/m/i.test(value)) return n * 1_000_000;
  if (/k/i.test(value)) return n * 1_000;
  return n;
}

// Số lần vượt trung bình kênh, làm tròn 1 chữ số và bỏ ".0" cho gọn.
function ratioLabel(topViews, avg) {
  const avgViews = parseViews(avg);
  if (!avgViews || !topViews) return null;
  const ratio = Math.round((topViews / avgViews) * 10) / 10;
  return Number.isInteger(ratio) ? `${ratio}` : ratio.toFixed(1);
}

// Trang chi tiết cho dự án kênh YouTube: số liệu kênh → cách làm → công thức
// tiêu đề → lưới thumbnail thật, video nhiều view nhất được đưa lên đầu và phóng to.
export default function YoutubeSpread({ project }) {
  const { channel, videos = [] } = project;

  // Video đầu tiên là video nhiều view nhất (dữ liệu đã sort sẵn trong portfolio.js).
  const [top, ...rest] = videos;
  const topViews = parseViews(top?.views);

  return (
    <div className="mt-8 space-y-8">
      {channel && (
        <Reveal>
          <div className="paper paper-noise rounded-[18px] p-6 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5 border-b border-ink/15 pb-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">YouTube channel</p>
                <p className="mt-2 font-heading text-xl font-bold text-ink">{channel.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">
                  {channel.handle} · since {channel.since}
                </p>
              </div>
              <a
                href={channel.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-[40px] items-center gap-2 rounded-full bg-ember px-5 py-2.5 font-heading text-[13px] font-semibold text-white transition hover:bg-coral"
              >
                Open channel on YouTube
                <Arrow className="h-4 w-7 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Ô số liệu có `lead: true` được phóng to + tô màu để chỉ số nổi bật đọc được ngay. */}
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={
                    metric.lead
                      ? 'relative rounded-[12px] border border-ember/30 bg-ember/[0.07] p-3 sm:-m-1 sm:p-4'
                      : ''
                  }
                >
                  {metric.lead && (
                    <span className="mb-1 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ember">
                      <Star className="h-2.5 w-2.5" />
                      Highlight
                    </span>
                  )}
                  <p
                    className={`font-display font-black leading-none ${
                      metric.lead ? 'text-4xl text-ember sm:text-5xl' : 'text-3xl text-cobalt sm:text-4xl'
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Average views per video is the number I use to compare channels. */}
            <p className="mt-6 flex items-center gap-2 border-t border-ink/15 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              <Star className="h-3 w-3 shrink-0 text-ember" />
              {channel.views} total views · {channel.videos} videos · {channel.avg} avg views / video
            </p>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <div className="paper paper-noise rounded-[18px] p-6 sm:p-9">
          <div className="space-y-4 text-[15px] leading-[1.9] text-ink/80">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project.focus && (
            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">What I own</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink/15 bg-ink/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/65"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.formulas && (
            <div className="mt-7 rounded-[12px] bg-ink p-4 sm:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
                Title formulas in use
              </p>
              <ul className="mt-3 space-y-2">
                {project.formulas.map((line) => (
                  <li key={line} className="font-mono text-[11.5px] leading-relaxed text-lime">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Reveal>

      {videos.length > 0 && (
        <Reveal delay={0.1}>
          <div className="paper paper-noise rounded-[18px] p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3 px-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink/50">
                Most-viewed videos · click to watch
              </p>
              <a
                href={channel ? `${channel.url}/videos` : '#'}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-cobalt transition hover:text-ember"
              >
                All videos →
              </a>
            </div>

            {/* Video nhiều view nhất: card lớn, gắn nhãn TOP và hiện thanh so sánh view. */}
            {top && (
              <a
                href={`https://www.youtube.com/watch?v=${top.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-4 grid gap-4 overflow-hidden rounded-[14px] border border-ember/25 bg-ember/[0.05] p-3 transition hover:border-ember/60 sm:grid-cols-[1.15fr_0.85fr] sm:items-center sm:p-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-ink">
                  <img
                    src={top.thumb}
                    alt={top.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-ember px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.9)]">
                    <Star className="h-2.5 w-2.5" />
                    Top views
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-[4px] bg-ink/85 px-1.5 py-0.5 font-mono text-[10px] text-paper/90">
                    {top.duration}
                  </span>
                </div>
                <div className="min-w-0 px-1 pb-1">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ember">
                    Best performing upload
                  </p>
                  <p className="mt-1.5 font-heading text-[15px] font-bold leading-snug text-ink">
                    {top.title}
                  </p>
                  <p className="mt-2 flex items-baseline gap-2 font-display text-3xl font-black leading-none text-ember">
                    {top.views}
                    <span className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-ink/45">
                      views
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                    ≈ {ratioLabel(topViews, channel?.avg) ?? '—'}× channel average
                  </p>
                </div>
              </a>
            )}

            {/* Các video còn lại: sắp theo view giảm dần, kèm thanh so sánh với video top. */}
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((video, i) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block overflow-hidden rounded-[12px] border border-ink/10 bg-ink/5"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
                    {/* Thumbnails are pre-downloaded into public/images/youtube so we do not depend on i.ytimg.com. */}
                    <img
                      src={video.thumb}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-2 top-2 rounded-[4px] bg-ink/80 px-1.5 py-0.5 font-mono text-[9.5px] text-paper/80">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-[4px] bg-ink/85 px-1.5 py-0.5 font-mono text-[10px] text-paper/90">
                      {video.duration}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember/90 text-white opacity-0 transition group-hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 font-heading text-[12.5px] font-semibold leading-snug text-ink">
                      {video.title}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
                        {video.views}
                      </span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                        <span
                          className="block h-full rounded-full bg-cobalt/70"
                          style={{ width: `${topViews ? Math.max(4, (parseViews(video.views) / topViews) * 100) : 0}%` }}
                        />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
