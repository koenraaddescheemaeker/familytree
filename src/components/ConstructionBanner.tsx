import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ConstructionBanner = () => {
  const { language } = useLanguage();

  const messages: Record<string, { title: string; message: string }> = {
    nl: {
      title: "Website in opbouw",
      message: "Deze site is nog volop in opbouw en vertoont nog onregelmatigheden en fouten. Bedankt voor uw begrip."
    },
    en: {
      title: "Website under construction",
      message: "This site is still under construction and may contain irregularities and errors. Thank you for your understanding."
    },
    fr: {
      title: "Site en construction",
      message: "Ce site est encore en construction et peut présenter des irrégularités et des erreurs. Merci de votre compréhension."
    },
    es: {
      title: "Sitio en construcción",
      message: "Este sitio aún está en construcción y puede presentar irregularidades y errores. Gracias por su comprensión."
    },
    de: {
      title: "Website im Aufbau",
      message: "Diese Website befindet sich noch im Aufbau und kann Unregelmäßigkeiten und Fehler aufweisen. Vielen Dank für Ihr Verständnis."
    },
    pcd: {
      title: "Site in opbouw",
      message: "Ech site est incor in construction et présinte des irrégularités et des fautes. Merci pour vo compréhinsion."
    },
    vls: {
      title: "Website in opbouw",
      message: "Dezen site is nog volop in opbouw en vertoont nog onregelmatigheden en fouten. Bedankt vô je begrip."
    },
    sv: {
      title: "Webbplats under uppbyggnad",
      message: "Denna webbplats är fortfarande under uppbyggnad och kan innehålla oregelbundenheter och fel. Tack för din förståelse."
    }
  };

  const content = messages[language] || messages.nl;

  return (
    <div className="bg-gold/10 border-b border-gold/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          <AlertTriangle className="w-5 h-5 text-gold shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{content.title}:</span>{" "}
            {content.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConstructionBanner;
