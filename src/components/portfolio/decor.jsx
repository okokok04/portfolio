export function Paperclip({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 40 90" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <path d="M30 22v40a10 10 0 0 1-20 0V18a7 7 0 0 1 14 0v42a3 3 0 0 1-6 0V26" />
    </svg>
  );
}

export function Tape({ className = '' }) {
  return <div aria-hidden className={`tape ${className}`} />;
}

export function Star({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 0c4 28 18 42 50 50-32 8-46 22-50 50-4-28-18-42-50-50 32-8 46-22 50-50Z" />
    </svg>
  );
}

export function Arrow({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12c30 26 62 30 104 22" />
      <path d="M94 16l16 18-22 12" />
    </svg>
  );
}

export function Fish({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <path d="M22 60c22-28 54-40 90-40 30 0 56 12 72 32-16 22-42 34-72 34-36 0-68-12-90-26Z" />
      <path d="M22 60c14 8 20 22 16 38-12-6-18-18-16-38Z" />
      <path d="M100 24c-5 22-5 50 0 72" />
      <circle cx="146" cy="50" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Scribble({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 220 40" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M6 26c18-22 30 12 48-6s30 16 48-4 30 18 48-6 32 14 62 6" />
    </svg>
  );
}

export function Pencil({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 240 44" className={className}>
      <rect x="18" y="13" width="16" height="18" rx="3" className="fill-coral" />
      <rect x="34" y="14" width="150" height="16" rx="3" className="fill-ember" />
      <rect x="34" y="14" width="150" height="6" rx="3" className="fill-lime" />
      <path d="M184 14l24 8-24 8Z" className="fill-paper" />
      <path d="M202 19.5 208 22l-6 2.5Z" className="fill-ink" />
    </svg>
  );
}