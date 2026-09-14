import { Language } from "@/contexts/LanguageContext";

interface FlagIconProps {
  language: Language;
  className?: string;
}

const FlagIcon = ({ language, className = "w-5 h-5" }: FlagIconProps) => {
  const flags: Record<Language, JSX.Element> = {
    nl: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="8" fill="#AE1C28"/>
        <rect y="8" width="32" height="8" fill="#FFFFFF"/>
        <rect y="16" width="32" height="8" fill="#21468B"/>
      </svg>
    ),
    vls: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="24" fill="#FFD90F"/>
        <path d="M16 4 L18 10 L24 10 L19 14 L21 20 L16 16 L11 20 L13 14 L8 10 L14 10 Z" fill="#000000"/>
      </svg>
    ),
    fr: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="10.67" height="24" fill="#002395"/>
        <rect x="10.67" width="10.67" height="24" fill="#FFFFFF"/>
        <rect x="21.33" width="10.67" height="24" fill="#ED2939"/>
      </svg>
    ),
    pcd: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="24" fill="#FFD700"/>
        <rect width="32" height="8" fill="#1E4D8C"/>
        <rect y="16" width="32" height="8" fill="#E63946"/>
      </svg>
    ),
    en: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="24" fill="#012169"/>
        <path d="M0 0 L32 24 M32 0 L0 24" stroke="#FFFFFF" strokeWidth="4"/>
        <path d="M0 0 L32 24 M32 0 L0 24" stroke="#C8102E" strokeWidth="2"/>
        <path d="M16 0 V24 M0 12 H32" stroke="#FFFFFF" strokeWidth="6"/>
        <path d="M16 0 V24 M0 12 H32" stroke="#C8102E" strokeWidth="3.6"/>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="6" fill="#AA151B"/>
        <rect y="6" width="32" height="12" fill="#F1BF00"/>
        <rect y="18" width="32" height="6" fill="#AA151B"/>
      </svg>
    ),
    de: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="8" fill="#000000"/>
        <rect y="8" width="32" height="8" fill="#DD0000"/>
        <rect y="16" width="32" height="8" fill="#FFCC00"/>
      </svg>
    ),
    sv: (
      <svg viewBox="0 0 32 24" className={className}>
        <rect width="32" height="24" fill="#006AA7"/>
        <rect x="10" y="0" width="4" height="24" fill="#FECC00"/>
        <rect x="0" y="10" width="32" height="4" fill="#FECC00"/>
      </svg>
    ),
  };

  return (
    <span className="inline-flex items-center justify-center rounded-sm overflow-hidden shadow-sm border border-border/30">
      {flags[language]}
    </span>
  );
};

export default FlagIcon;
