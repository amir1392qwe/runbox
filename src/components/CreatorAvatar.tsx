function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0][0] + parts[1][0];
}

export default function CreatorAvatar({
  name,
  accent,
  className = "",
}: {
  name: string;
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${accent} font-black text-white ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
