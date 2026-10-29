import { Paperclip } from './decor';

export default function PaperCard({ children, className = '', clip = false, clipClass = 'text-cobalt', tilt = '' }) {
  return (
    <div className={`paper paper-noise relative rounded-[16px] ${tilt} ${className}`}>
      {clip && (
        <Paperclip className={`absolute -top-5 left-1/2 h-10 w-4 -translate-x-1/2 drop-shadow ${clipClass}`} />
      )}
      {children}
    </div>
  );
}