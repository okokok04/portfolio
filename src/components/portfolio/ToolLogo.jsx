/**
 * Logo phần mềm dùng trong box "Kỹ năng phần mềm".
 * Các app Adobe dùng monogram + màu nhận diện gốc (Pr/Ps/Ae/Au),
 * Canva dùng gradient tím–xanh, DaVinci là vòng màu (color wheel).
 * Toàn bộ vẽ bằng CSS/JSX nên không cần tải file ảnh nào.
 */

const MONOGRAMS = {
  premiere: { bg: '#00005B', fg: '#9999FF', text: 'Pr' },
  photoshop: { bg: '#001E36', fg: '#31A8FF', text: 'Ps' },
  aftereffects: { bg: '#00005B', fg: '#9999FF', text: 'Ae' },
  audition: { bg: '#00005B', fg: '#9999FF', text: 'Au' },
  illustrator: { bg: '#330000', fg: '#FF9A00', text: 'Ai' },
  capcut: { bg: '#101014', fg: '#FFFFFF', text: 'Cc' },
};

export default function ToolLogo({ id, className = '' }) {
  if (id === 'canva') {
    return (
      <span
        className={`flex items-center justify-center rounded-full ring-1 ring-white/20 ${className}`}
        style={{
          background: 'conic-gradient(from 200deg, #00C4CC 0%, #00A0D8 38%, #7D2AE8 72%, #00C4CC 100%)',
        }}
      >
        <span className="text-[8px] font-semibold italic leading-none text-white">Canva</span>
      </span>
    );
  }

  if (id === 'davinci') {
    // Vòng màu của DaVinci Resolve: sáu múi màu quanh một lõi tối.
    return (
      <span
        className={`flex items-center justify-center rounded-full ring-1 ring-white/20 ${className}`}
        style={{
          background:
            'conic-gradient(#ff3b30 0deg 60deg, #ffcc00 60deg 120deg, #34c759 120deg 180deg, #00c7be 180deg 240deg, #0a84ff 240deg 300deg, #bf5af2 300deg 360deg)',
        }}
      >
        <span className="flex h-[58%] w-[58%] items-center justify-center rounded-full bg-[#0b0d12]">
          <span className="text-[7px] font-bold leading-none tracking-tight text-white">Dv</span>
        </span>
      </span>
    );
  }

  if (id === 'ai') {
    return (
      <span
        className={`flex items-center justify-center rounded-[8px] ring-1 ring-white/20 ${className}`}
        style={{ background: 'radial-gradient(circle at 30% 25%, #ffd479 0%, #e07a3f 55%, #8c3b1b 100%)' }}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-[62%] w-[62%] fill-white/95">
          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
          <path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6L15.5 18.5l2.6-.9L19 15Z" opacity="0.8" />
        </svg>
      </span>
    );
  }

  const mark = MONOGRAMS[id];
  if (!mark) return <span className={`rounded-[8px] bg-ink ${className}`} aria-hidden />;

  return (
    <span
      className={`flex items-center justify-center rounded-[8px] ring-1 ring-white/15 ${className}`}
      style={{ backgroundColor: mark.bg }}
    >
      <span
        className="text-[12px] font-bold leading-none tracking-[-0.03em]"
        style={{ color: mark.fg, fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        {mark.text}
      </span>
    </span>
  );
}
