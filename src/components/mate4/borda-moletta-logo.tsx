

interface BordaMolettaLogoProps {
  iconSize?: number;
  textClassName?: string;
  className?: string;
}

export function BordaMolettaLogo({
  iconSize = 28,
  textClassName = "text-xl tracking-[0.08em]",
  className,
}: BordaMolettaLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.8 0-5-2.2-5-5s-2.2-5-5-5-5-5-2.2-5-5-5 5 2.2 5 5 5zM12 0C6.48 0 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0z"
          fill="#2F4F3E"
        />
        <path
          d="M12 2.5C10 2.5 8.5 2.5 8.5 12s3.5 4.5 3.5 4.5 0 0 0 3.5 4.5S20 12 20 12 20 7.5c0 3-2 5-5 5s-5-2-5-5z"
          fill="#2F4F3E"
        />
        <path d="M12 0l-2.5 7.5H7.5L12 14l4.5-6.5" fill="#F2F0EB" />
        <path d="M12 14l-4.5-6.5h5L12 0v14z" fill="#F2F0EB" />
        <path
          d="M15.5 16.5L12 22v-8h5"
          stroke="#2F4F3E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-[Manrope] whitespace-nowrap font-extrabold uppercase text-[#F2F0EB] ${textClassName}`}
      >
        BORDA MOLLETTA OS
      </span>
    </div>
  );
}
