import { workflow } from '@/data/portfolio';
import Reveal from './Reveal';
import SectionBand from './SectionBand';
import { Star } from './decor';

// Thay cho khối "Logo folio" cũ: 7 bước làm một video, kèm đầu ra và chỉ số
// mà bước đó tác động — đúng thứ nhà tuyển dụng vị trí sản xuất nội dung cần thấy.
export default function WorkflowSection() {
  return (
    <section id="quy-trinh" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-16 sm:pb-24">
      <Reveal>
        <SectionBand word="Process" tone="ember" />
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-paper/65">{workflow.note}</p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, i) => (
          <Reveal key={step.no} delay={0.03 * i}>
            <div className="paper paper-noise flex h-full flex-col rounded-[14px] p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-3xl font-black leading-none text-ember">{step.no}</span>
                <span className="rounded-full bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-lime">
                  {step.metric}
                </span>
              </div>
              <p className="mt-4 font-heading text-[15px] font-bold leading-snug text-ink">{step.title}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink/65">{step.detail}</p>
              <div className="mt-auto flex items-start gap-2 border-t border-ink/10 pt-3">
                <Star className="mt-[3px] h-3 w-3 shrink-0 text-cobalt" />
                <p className="text-[11.5px] leading-relaxed text-ink/55">{step.output}</p>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Ô thứ 8: gộp phần tool tự dựng, nối quy trình với phần CV. */}
        <Reveal delay={0.03 * workflow.steps.length}>
          <div className="flex h-full flex-col justify-between rounded-[14px] border border-lime/30 bg-ink p-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime/70">STEP 08</p>
              <p className="mt-3 font-heading text-[15px] font-bold leading-snug text-paper">
                Automate the repetitive parts
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-paper/55">
                Anything I do more than three times gets a tool: pull channel numbers, export reports, suggest
                titles, batch-process thumbnails.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Apps Script', 'API', 'Dashboard', 'AI agent'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-[5px] border border-paper/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-paper/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

