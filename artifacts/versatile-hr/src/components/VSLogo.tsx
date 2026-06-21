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
        <rect width="40" height="40" rx="8" fill="#1a3a6b" />
        <path d="M8 10 L20 30 L32 10" stroke="#e8630a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 10 L20 22 L26 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
      </svg>
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span className="font-bold text-base tracking-tight" style={{ color: textColor }}>
            VERSATILE
          </span>
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: subTextColor }}>
            SERVICES
          </span>
        </div>
      )}
    </div>
  );
}
