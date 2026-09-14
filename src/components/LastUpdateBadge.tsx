import { useLanguage } from "@/contexts/LanguageContext";
import { Clock } from "lucide-react";
import { format, type Locale } from "date-fns";
import { nl, fr, enUS, es } from "date-fns/locale";

const LastUpdateBadge = () => {
  const { language } = useLanguage();

  const localeMap: Record<string, Locale> = {
    nl: nl,
    fr: fr,
    en: enUS,
    es: es,
    vls: nl, // Flemish uses Dutch locale
    pcd: fr, // Picard uses French locale
  };

  const labels: Record<string, { prefix: string; at: string }> = {
    nl: { prefix: "Laatste update", at: "om" },
    fr: { prefix: "Dernière mise à jour", at: "à" },
    en: { prefix: "Last update", at: "at" },
    es: { prefix: "Última actualización", at: "a las" },
    vls: { prefix: "Leste update", at: "om" },
    pcd: { prefix: "Darin·ne mij a jour", at: "à" },
  };

  const date = new Date(__BUILD_TIME__);
  const locale = localeMap[language] || nl;
  const label = labels[language] || labels.nl;

  const formattedDate = format(date, "d MMMM yyyy", { locale });
  const formattedTime = format(date, "HH:mm", { locale });

  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
      <Clock className="w-4 h-4" />
      <span>
        {label.prefix}: {formattedDate} {label.at} {formattedTime}
      </span>
    </div>
  );
};

export default LastUpdateBadge;
