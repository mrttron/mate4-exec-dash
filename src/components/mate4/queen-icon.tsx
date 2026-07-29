export function QueenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="3.4" r="1.6" />
      <path d="M5.2 6.2 7.4 12h9.2l2.2-5.8-3.9 3-2.9-3.7-2.9 3.7-3.9-3Z" />
      <path d="M7.4 12h9.2l.9 4H6.5l.9-4Z" />
      <path d="M5.4 20.6h13.2M6.5 16h11l1.1 4.6H5.4L6.5 16Z" />
    </svg>
  );
}
