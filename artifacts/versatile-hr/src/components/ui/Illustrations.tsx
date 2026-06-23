// ─── Inline SVG illustrations ─────────────────────────────────────────────────
// All illustrations use the brand palette: #1a3a6b (blue) + #e8630a (orange)
// and transparent backgrounds so they work on any surface.

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground / platform */}
      <ellipse cx="260" cy="390" rx="200" ry="18" fill="#1a3a6b" opacity="0.12" />

      {/* Main building */}
      <rect x="100" y="160" width="200" height="220" rx="6" fill="#1a3a6b" opacity="0.9" />
      <rect x="115" y="175" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="175" y="175" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="235" y="175" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="115" y="230" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="175" y="230" width="50" height="40" rx="3" fill="#e8630a" opacity="0.7" />
      <rect x="235" y="230" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="115" y="285" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="175" y="285" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      <rect x="235" y="285" width="50" height="40" rx="3" fill="white" opacity="0.2" />
      {/* Door */}
      <rect x="175" y="340" width="50" height="40" rx="3" fill="#e8630a" opacity="0.85" />

      {/* Secondary building right */}
      <rect x="315" y="220" width="120" height="160" rx="6" fill="#1a3a6b" opacity="0.6" />
      <rect x="328" y="235" width="30" height="25" rx="2" fill="white" opacity="0.2" />
      <rect x="368" y="235" width="30" height="25" rx="2" fill="white" opacity="0.2" />
      <rect x="328" y="272" width="30" height="25" rx="2" fill="#e8630a" opacity="0.6" />
      <rect x="368" y="272" width="30" height="25" rx="2" fill="white" opacity="0.2" />
      <rect x="328" y="309" width="30" height="25" rx="2" fill="white" opacity="0.2" />
      <rect x="368" y="309" width="30" height="25" rx="2" fill="white" opacity="0.2" />
      <rect x="348" y="346" width="30" height="34" rx="2" fill="#e8630a" opacity="0.7" />

      {/* People silhouettes */}
      {/* Person 1 */}
      <circle cx="170" cy="355" r="14" fill="#e8630a" opacity="0.9" />
      <path d="M145 385 Q155 365 170 368 Q185 365 195 385" fill="#e8630a" opacity="0.9" />
      {/* Briefcase */}
      <rect x="190" y="370" width="14" height="11" rx="2" fill="#f4a259" />
      <path d="M193 370 v-3 h8 v3" stroke="#f4a259" strokeWidth="1.5" fill="none" />

      {/* Person 2 */}
      <circle cx="345" cy="358" r="12" fill="white" opacity="0.9" />
      <path d="M323 385 Q332 366 345 369 Q358 366 367 385" fill="white" opacity="0.9" />
      <rect x="357" y="372" width="12" height="9" rx="2" fill="#e8630a" opacity="0.8" />

      {/* Floating card - stat */}
      <rect x="20" y="190" width="110" height="70" rx="10" fill="white" />
      <rect x="20" y="190" width="110" height="70" rx="10" stroke="#e4e8f0" strokeWidth="1" />
      <rect x="30" y="200" width="20" height="20" rx="5" fill="#e8630a" opacity="0.15" />
      <rect x="34" y="204" width="12" height="12" rx="2" fill="#e8630a" />
      <text x="56" y="213" fontFamily="Inter,sans-serif" fontSize="10" fill="#6b7a9c" fontWeight="600">Employees</text>
      <text x="30" y="240" fontFamily="Inter,sans-serif" fontSize="22" fill="#1a3a6b" fontWeight="700">500+</text>
      <text x="72" y="240" fontFamily="Inter,sans-serif" fontSize="9" fill="#6b7a9c">deployed</text>

      {/* Floating card - clients */}
      <rect x="380" y="155" width="100" height="65" rx="10" fill="white" />
      <rect x="380" y="155" width="100" height="65" rx="10" stroke="#e4e8f0" strokeWidth="1" />
      <rect x="390" y="164" width="16" height="16" rx="4" fill="#1a3a6b" opacity="0.12" />
      <rect x="393" y="167" width="10" height="10" rx="2" fill="#1a3a6b" />
      <text x="412" y="175" fontFamily="Inter,sans-serif" fontSize="9" fill="#6b7a9c" fontWeight="600">Clients</text>
      <text x="390" y="202" fontFamily="Inter,sans-serif" fontSize="20" fill="#1a3a6b" fontWeight="700">30+</text>
      <text x="416" y="202" fontFamily="Inter,sans-serif" fontSize="9" fill="#6b7a9c">trusted</text>

      {/* Floating badge */}
      <rect x="60" y="120" width="90" height="32" rx="16" fill="#e8630a" opacity="0.12" />
      <text x="105" y="140" fontFamily="Inter,sans-serif" fontSize="10" fill="#e8630a" fontWeight="700" textAnchor="middle">15+ Yrs Experience</text>

      {/* Decorative dots */}
      <circle cx="460" cy="300" r="4" fill="#e8630a" opacity="0.3" />
      <circle cx="475" cy="285" r="2.5" fill="#e8630a" opacity="0.2" />
      <circle cx="450" cy="315" r="2" fill="#1a3a6b" opacity="0.2" />
      <circle cx="55" cy="290" r="3.5" fill="#1a3a6b" opacity="0.2" />
      <circle cx="68" cy="308" r="2" fill="#e8630a" opacity="0.2" />

      {/* Road */}
      <rect x="0" y="378" width="520" height="12" rx="3" fill="#1a3a6b" opacity="0.08" />
      <rect x="240" y="381" width="40" height="3" rx="1.5" fill="white" opacity="0.6" />

      {/* Truck */}
      <rect x="390" y="355" width="55" height="28" rx="4" fill="#1a3a6b" opacity="0.75" />
      <rect x="418" y="350" width="27" height="20" rx="3" fill="#1a3a6b" opacity="0.85" />
      <rect x="421" y="353" width="10" height="9" rx="1.5" fill="white" opacity="0.35" />
      <circle cx="400" cy="385" r="5" fill="#e8630a" />
      <circle cx="400" cy="385" r="2.5" fill="white" opacity="0.5" />
      <circle cx="432" cy="385" r="5" fill="#e8630a" />
      <circle cx="432" cy="385" r="2.5" fill="white" opacity="0.5" />
    </svg>
  );
}

export function HRIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="20" fill="#eef2ff" />
      <circle cx="60" cy="40" r="16" fill="#1a3a6b" opacity="0.9" />
      <circle cx="60" cy="40" r="10" fill="white" opacity="0.2" />
      <path d="M28 90 Q40 65 60 68 Q80 65 92 90" fill="#1a3a6b" opacity="0.85" />
      <circle cx="35" cy="50" r="11" fill="#1a3a6b" opacity="0.5" />
      <path d="M14 85 Q22 64 35 66 Q48 64 56 85" fill="#1a3a6b" opacity="0.4" />
      <circle cx="85" cy="50" r="11" fill="#1a3a6b" opacity="0.5" />
      <path d="M64 85 Q72 64 85 66 Q98 64 106 85" fill="#1a3a6b" opacity="0.4" />
      <rect x="40" y="93" width="40" height="16" rx="5" fill="#e8630a" opacity="0.2" />
      <rect x="44" y="97" width="32" height="8" rx="3" fill="#e8630a" opacity="0.5" />
    </svg>
  );
}

export function HousekeepingIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="20" fill="#f0fff4" />
      {/* Building outline */}
      <rect x="20" y="35" width="80" height="70" rx="4" fill="#1a3a6b" opacity="0.08" stroke="#1a3a6b" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="30" y="48" width="20" height="16" rx="2" fill="#1a3a6b" opacity="0.2" />
      <rect x="58" y="48" width="20" height="16" rx="2" fill="#1a3a6b" opacity="0.2" />
      <rect x="86" y="48" width="14" height="16" rx="2" fill="#e8630a" opacity="0.3" />
      {/* Mop */}
      <line x1="78" y1="25" x2="50" y2="95" stroke="#e8630a" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="47" cy="98" rx="14" ry="5" fill="#e8630a" opacity="0.3" />
      <line x1="38" y1="96" x2="42" y2="104" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="98" x2="46" y2="107" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      <line x1="54" y1="96" x2="50" y2="104" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      {/* Sparkles */}
      <circle cx="85" cy="28" r="3" fill="#e8630a" opacity="0.6" />
      <circle cx="95" cy="42" r="2" fill="#1a3a6b" opacity="0.4" />
      <circle cx="30" cy="32" r="2.5" fill="#e8630a" opacity="0.5" />
    </svg>
  );
}

export function TransportIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="20" fill="#fff7ed" />
      {/* Road */}
      <rect x="0" y="82" width="120" height="18" rx="0" fill="#1a3a6b" opacity="0.08" />
      <rect x="50" y="89" width="20" height="4" rx="2" fill="white" opacity="0.6" />
      {/* Truck body */}
      <rect x="12" y="55" width="64" height="30" rx="5" fill="#1a3a6b" opacity="0.85" />
      {/* Cab */}
      <rect x="58" y="45" width="30" height="28" rx="4" fill="#1a3a6b" />
      <rect x="62" y="49" width="12" height="12" rx="2" fill="white" opacity="0.35" />
      {/* Wheels */}
      <circle cx="28" cy="87" r="8" fill="#1a3a6b" />
      <circle cx="28" cy="87" r="4" fill="#e8630a" />
      <circle cx="58" cy="87" r="8" fill="#1a3a6b" />
      <circle cx="58" cy="87" r="4" fill="#e8630a" />
      <circle cx="80" cy="87" r="8" fill="#1a3a6b" />
      <circle cx="80" cy="87" r="4" fill="#e8630a" />
      {/* Headlight */}
      <circle cx="89" cy="63" r="4" fill="#f4a259" opacity="0.9" />
      {/* Route dots */}
      <circle cx="100" cy="40" r="5" fill="#e8630a" opacity="0.8" />
      <circle cx="108" cy="55" r="3.5" fill="#e8630a" opacity="0.5" />
      <circle cx="104" cy="30" r="2.5" fill="#1a3a6b" opacity="0.3" />
    </svg>
  );
}

export function GreenIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="20" fill="#f0fff4" />
      {/* Ground */}
      <ellipse cx="60" cy="100" rx="45" ry="8" fill="#1a3a6b" opacity="0.08" />
      {/* Tree 1 */}
      <rect x="56" y="68" width="8" height="28" rx="3" fill="#1a3a6b" opacity="0.5" />
      <ellipse cx="60" cy="58" rx="22" ry="18" fill="#1a3a6b" opacity="0.7" />
      <ellipse cx="60" cy="52" rx="16" ry="14" fill="#1a3a6b" opacity="0.4" />
      {/* Tree 2 */}
      <rect x="90" y="78" width="6" height="18" rx="2" fill="#1a3a6b" opacity="0.4" />
      <ellipse cx="93" cy="68" rx="14" ry="12" fill="#e8630a" opacity="0.3" />
      {/* Tree 3 */}
      <rect x="24" y="76" width="6" height="20" rx="2" fill="#1a3a6b" opacity="0.4" />
      <ellipse cx="27" cy="66" rx="13" ry="11" fill="#1a3a6b" opacity="0.45" />
      {/* Sun */}
      <circle cx="90" cy="28" r="12" fill="#e8630a" opacity="0.7" />
      <line x1="90" y1="10" x2="90" y2="6" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      <line x1="104" y1="22" x2="107" y2="19" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      <line x1="108" y1="38" x2="112" y2="38" stroke="#e8630a" strokeWidth="2" strokeLinecap="round" />
      {/* Leaf accent */}
      <path d="M30 35 Q45 20 55 35 Q45 42 30 35Z" fill="#e8630a" opacity="0.25" />
    </svg>
  );
}

export function FoodIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="20" fill="#fffbeb" />
      {/* Table */}
      <rect x="15" y="82" width="90" height="8" rx="3" fill="#1a3a6b" opacity="0.2" />
      <rect x="22" y="90" width="6" height="18" rx="2" fill="#1a3a6b" opacity="0.15" />
      <rect x="92" y="90" width="6" height="18" rx="2" fill="#1a3a6b" opacity="0.15" />
      {/* Bowl */}
      <ellipse cx="60" cy="80" rx="30" ry="8" fill="#1a3a6b" opacity="0.8" />
      <path d="M30 75 Q30 55 60 55 Q90 55 90 75" fill="#1a3a6b" opacity="0.8" />
      <ellipse cx="60" cy="75" rx="28" ry="6" fill="white" opacity="0.15" />
      {/* Food in bowl */}
      <circle cx="50" cy="68" r="6" fill="#e8630a" opacity="0.7" />
      <circle cx="63" cy="65" r="7" fill="#f4a259" opacity="0.8" />
      <circle cx="73" cy="69" r="5" fill="#e8630a" opacity="0.6" />
      {/* Steam lines */}
      <path d="M48 52 Q50 46 48 40" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M60 50 Q62 43 60 36" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M72 52 Q74 46 72 40" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* Fork and spoon */}
      <line x1="22" y1="56" x2="22" y2="80" stroke="#1a3a6b" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <line x1="98" y1="56" x2="98" y2="80" stroke="#1a3a6b" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="98" cy="53" rx="4" ry="5" fill="#1a3a6b" opacity="0.4" />
    </svg>
  );
}

export function WorkflowIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Step nodes */}
      {[60, 180, 300, 420].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={100} r={36} fill={i % 2 === 0 ? "#1a3a6b" : "#e8630a"} opacity="0.9" />
          <circle cx={cx} cy={100} r={28} fill="white" opacity="0.12" />
          <text x={cx} y={105} textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="700" fill="white">
            {i + 1}
          </text>
        </g>
      ))}
      {/* Connector lines */}
      {[120, 240, 360].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={100} x2={x + 24} y2={100} stroke="#1a3a6b" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.3" />
          <polygon points={`${x + 24},96 ${x + 32},100 ${x + 24},104`} fill="#1a3a6b" opacity="0.35" />
        </g>
      ))}
      {/* Labels */}
      {["Consultation", "Proposal", "Onboarding", "Delivery"].map((label, i) => (
        <text key={i} x={60 + i * 120} y={150} textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#6b7a9c" fontWeight="600">
          {label}
        </text>
      ))}
    </svg>
  );
}

export function StatsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 120" fill="none">
      {/* Bar chart */}
      <rect x="20" y="60" width="30" height="50" rx="4" fill="#1a3a6b" opacity="0.7" />
      <rect x="60" y="35" width="30" height="75" rx="4" fill="#1a3a6b" opacity="0.85" />
      <rect x="100" y="20" width="30" height="90" rx="4" fill="#e8630a" opacity="0.85" />
      <rect x="140" y="45" width="30" height="65" rx="4" fill="#1a3a6b" opacity="0.7" />
      <rect x="180" y="30" width="30" height="80" rx="4" fill="#e8630a" opacity="0.6" />
      <rect x="220" y="15" width="30" height="95" rx="4" fill="#1a3a6b" opacity="0.9" />
      {/* Trend line */}
      <polyline points="35,55 75,30 115,16 155,40 195,25 235,10" stroke="#e8630a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
      {/* Dots on line */}
      {[[35,55],[75,30],[115,16],[155,40],[195,25],[235,10]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#e8630a" opacity="0.9" />
      ))}
      {/* Axis */}
      <line x1="10" y1="110" x2="270" y2="110" stroke="#1a3a6b" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}
