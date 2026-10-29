export default function Backdrop() {
  return (
    <>
      <div aria-hidden className="desk fixed inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(130%_85%_at_50%_-10%,rgba(122,79,214,0.32),transparent_65%)]"
      />
      <div aria-hidden className="grain-layer" />
    </>
  );
}