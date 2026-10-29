import { Image } from '@/components/ui/image';

export default function ImageGrid({ items = [] }) {
  return (
    <div className="grid auto-rows-[130px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4">
      {items.map((item) => (
        <div key={item.alt} className={`overflow-hidden rounded-[10px] bg-ink/10 ${item.span || ''}`}>
          <Image src={item.src} alt={item.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}