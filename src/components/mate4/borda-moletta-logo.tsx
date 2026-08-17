interface BordaMolettaLogoProps {
  iconSize?: number;
  textClassName?: string;
  className?: string;
}

export function BordaMolettaLogo({
  iconSize = 32,
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
        aria-label="Rei de Xadrez"
      >
        {/* Cruz do rei */}
        <path
          d="M12 2V6"
          stroke="#2F4F3E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 4H14"
          stroke="#2F4F3E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Coroa */}
        <path d="M7 8L12 5L17 8V12H7V8Z" fill="#2F4F3E" />
        {/* Corpo */}
        <path d="M7 18H17V12H7V18Z" fill="#2F4F3E" />
        {/* Base */}
        <rect x="4" y="18" width="16" height="3" rx="1" fill="#2F4F3E" />
        {/* Detalhe em destaque */}
        <path
          d="M10 14H14"
          stroke="#F2F0EB"
          strokeWidth="1.5"
          strokeLinecap="round"
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

