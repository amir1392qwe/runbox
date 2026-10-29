interface IconProps {
  className?: string;
}

/** ضربه سایبری — Cyber Strike */
export function CyberStrikeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyberGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="url(#cyberGrad)" strokeWidth="1.5" opacity="0.35" />
      <g stroke="url(#cyberGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M100 40 L130 70 L115 70 L115 110 L145 140 L120 140 L100 160 L80 140 L55 140 L85 110 L85 70 L70 70 Z" />
      </g>
      <circle cx="100" cy="100" r="6" fill="url(#cyberGrad)" />
      <g stroke="#22d3ee" strokeWidth="1" opacity="0.5">
        <line x1="30" y1="50" x2="55" y2="50" />
        <line x1="145" y1="150" x2="170" y2="150" />
      </g>
    </svg>
  );
}

/** سپاه سایه — Shadow Legion */
export function ShadowLegionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <path d="M100 35 L150 60 L150 110 C150 145 128 168 100 178 C72 168 50 145 50 110 L50 60 Z"
        fill="url(#shadowGrad)" stroke="#a78bfa" strokeWidth="2" opacity="0.9" />
      <path d="M100 60 L100 150 M75 90 L125 90" stroke="#0a0a0a" strokeWidth="4" opacity="0.5" />
      <circle cx="85" cy="95" r="5" fill="#22d3ee" />
      <circle cx="115" cy="95" r="5" fill="#22d3ee" />
      <path d="M75 130 Q100 150 125 130" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.7" />
    </svg>
  );
}

/** مسابقه‌دهندگان پوچی — Void Racers */
export function VoidRacersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="voidGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <g opacity="0.5" stroke="url(#voidGrad)" strokeWidth="2">
        <line x1="20" y1="70" x2="70" y2="70" />
        <line x1="15" y1="100" x2="80" y2="100" />
        <line x1="20" y1="130" x2="70" y2="130" />
      </g>
      <path d="M80 100 L140 75 L160 85 L150 100 L160 115 L140 125 Z" fill="url(#voidGrad)" />
      <circle cx="90" cy="100" r="10" fill="#0a0a0a" stroke="url(#voidGrad)" strokeWidth="2" />
      <path d="M40 100 L80 100" stroke="url(#voidGrad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** افسانه اژدهای آتشین — Dragon's Ember */
export function DragonEmberIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dragonGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <path d="M100 45 C130 55 150 85 145 115 C143 130 130 140 118 132 C124 120 120 105 108 100 C112 112 105 122 95 122 C85 122 80 110 85 100 C74 106 70 120 78 132 C64 138 52 128 52 112 C52 82 72 55 100 45 Z"
        fill="url(#dragonGrad)" opacity="0.9" />
      <circle cx="95" cy="90" r="4" fill="#0a0a0a" />
      <path d="M100 132 L100 165 M85 150 L115 150" stroke="url(#dragonGrad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** امپراتوری ستاره‌ای — Starborn Empire */
export function StarbornEmpireIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="empireGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <g fill="url(#empireGrad)">
        <polygon points="100,40 108,70 100,60 92,70" />
        <polygon points="100,160 108,130 100,140 92,130" />
        <polygon points="40,100 70,92 60,100 70,108" />
        <polygon points="160,100 130,92 140,100 130,108" />
      </g>
      <circle cx="100" cy="100" r="26" fill="none" stroke="url(#empireGrad)" strokeWidth="3" />
      <circle cx="100" cy="100" r="8" fill="url(#empireGrad)" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="url(#empireGrad)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** نبرد ارواح — Ghost Duel */
export function GhostDuelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ghostGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0a" />
      <path d="M100 45 C130 45 150 70 150 100 L150 140 L138 130 L126 140 L114 130 L100 142 L86 130 L74 140 L62 130 L50 140 L50 100 C50 70 70 45 100 45 Z"
        fill="url(#ghostGrad)" opacity="0.9" />
      <ellipse cx="85" cy="95" rx="6" ry="8" fill="#0a0a0a" />
      <ellipse cx="115" cy="95" rx="6" ry="8" fill="#0a0a0a" />
      <path d="M85 115 Q100 122 115 115" stroke="#0a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export const gameIconMap = {
  cyber: CyberStrikeIcon,
  shadow: ShadowLegionIcon,
  void: VoidRacersIcon,
  dragon: DragonEmberIcon,
  empire: StarbornEmpireIcon,
  ghost: GhostDuelIcon,
} as const;

export type GameIconId = keyof typeof gameIconMap;

export default function GameIcon({
  id,
  className,
}: {
  id: GameIconId;
  className?: string;
}) {
  const Icon = gameIconMap[id];
  return <Icon className={className} />;
}
