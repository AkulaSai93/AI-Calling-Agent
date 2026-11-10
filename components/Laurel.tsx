const LEAF = "M0 0 C4.5 -4 4.5 -10 0 -15 C-4.5 -10 -4.5 -4 0 0Z";

// [x, y, rotation] for each leaf along the stem
const leaves: [number, number, number][] = [
  [25, 72, -62], [18, 60, -52], [13.5, 47, -40], [12.5, 34, -26], [14.5, 21, -12],
  [26, 70, 18], [19.5, 57, 14], [16, 44, 10], [15.5, 31, 8], [19, 8, 4],
];

export default function Laurel({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 84"
      aria-hidden
      className={`shrink-0 fill-current ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path d="M30 80 C14 66 8 40 19 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <path key={i} d={LEAF} transform={`translate(${x} ${y}) rotate(${r})`} />
      ))}
    </svg>
  );
}
