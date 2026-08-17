import kingLogo from "@/assets/borda-moletta-king.png";

interface BordaMolettaLogoProps {
  iconSize?: number;
  textClassName?: string;
  className?: string;
}

export function BordaMolettaLogo({
  iconSize = 28,
  textClassName = "text-xl",
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
        className={`font-[Manrope] font-extrabold uppercase text-[#F2F0EB] ${textClassName}`}
        style={{ letterSpacing: "0.12em" }}
      >
        BORDA MOLLETTA OS
      </span>
    </div>
  );
}
