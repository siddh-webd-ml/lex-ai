import { Scale } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  light?: boolean;
}

export function Logo({ size = 'md', showText = true, light = false }: LogoProps) {
  const iconSize = size === 'lg' ? 36 : size === 'sm' ? 24 : 28;
  const textSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 shadow-md"
        style={{ width: iconSize + 8, height: iconSize + 8 }}
      >
        <Scale size={iconSize} className="text-accent-400" strokeWidth={2.2} />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textSize} ${light ? 'text-white' : 'text-navy-900'}`}>
          Lex<span className="text-accent-500">AI</span>
        </span>
      )}
    </div>
  );
}
