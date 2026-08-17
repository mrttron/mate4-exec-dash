

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
      <img
        src={kingLogo}
        alt="Borda Moletta OS"
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
        loading="eager"
      />
      <span
        className={`font-[Manrope] whitespace-nowrap font-extrabold uppercase text-[#F2F0EB] ${textClassName}`}
      >
        BORDA MOLLETTA OS
      </span>
    </div>
  );
}
