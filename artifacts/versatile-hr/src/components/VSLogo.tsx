interface VSLogoProps {
  variant?: "full" | "icon";
  className?: string;
  iconSize?: number;
  light?: boolean;
}

export function VSLogo({ variant = "full", className = "", iconSize = 36, light = false }: VSLogoProps) {
  const textColor = light ? "#ffffff" : "#1a3a6b";
  const subTextColor = light ? "rgba(255,255,255,0.75)" : "#e8630a";

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="9" fill="#1a3a6b" />
        {/* V shape - outer */}
        <path d="M7 10 L20 30 L33 10" stroke="#e8630a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* V shape - inner highlight */}
        <path d="M13 10 L20 23 L27 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
        {/* Dot accent */}
        <circle cx="20" cy="30" r="2.5" fill="#e8630a" />
      </svg>
      {variant === "full" && (
        <div className="flex flex-col leading-none gap-0.5">
          <span className="font-bold text-[15px] tracking-[0.06em]" style={{ color: textColor }}>
            VERSATILE
          </span>
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: subTextColor }}>
            SERVICES
          </span>
        </div>
      )}
    </div>
  );
}
