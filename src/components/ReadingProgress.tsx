import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGame, ALL_SECTIONS } from "@/contexts/GameContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, ChevronUp, ChevronDown, Check, RotateCcw, X, Eye, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const sectionLabels: Record<string, Record<string, string>> = {
  voorwoord: { nl: "Voorwoord", fr: "Avant-propos", en: "Foreword", es: "Prólogo", pcd: "Avant-propos", vls: "Voorwoord", de: "Vorwort", sv: "Förord" },
  tijdlijn: { nl: "Tijdlijn", fr: "Chronologie", en: "Timeline", es: "Cronología", pcd: "Chronologie", vls: "Tydlyne", de: "Zeitleiste", sv: "Tidslinje" },
  zoektocht: { nl: "Zoektocht", fr: "Recherche", en: "Search", es: "Búsqueda", pcd: "Rechèrche", vls: "Zoektocht", de: "Suche", sv: "Sökandet" },
  "emile-geldof": { nl: "Emile Geldof", fr: "Emile Geldof", en: "Emile Geldof", es: "Emile Geldof", pcd: "Emile Geldof", vls: "Emile Geldof", de: "Emile Geldof", sv: "Emile Geldof" },
  picardisch: { nl: "Picardisch dialect", fr: "Dialecte picard", en: "Picard dialect", es: "Dialecto picardo", pcd: "Dialecte picard", vls: "Picardisch dialect", de: "Pikardischer Dialekt", sv: "Pikardisk dialekt" },
  "historische-kaart": { nl: "Historische kaart", fr: "Carte historique", en: "Historical map", es: "Mapa histórico", pcd: "Carte historique", vls: "Historische koarte", de: "Historische Karte", sv: "Historisk karta" },
  kaart: { nl: "Interactieve kaart", fr: "Carte interactive", en: "Interactive map", es: "Mapa interactivo", pcd: "Carte interactive", vls: "Interactieve koarte", de: "Interaktive Karte", sv: "Interaktiv karta" },
  stamouders: { nl: "Stamouders", fr: "Ancêtres", en: "Ancestors", es: "Ancestros", pcd: "Anchtres", vls: "Stamouders", de: "Stammväter", sv: "Stamfäder" },
  oorlogen: { nl: "Oorlogen", fr: "Guerres", en: "Wars", es: "Guerras", pcd: "Guerres", vls: "Oorlogen", de: "Kriege", sv: "Krig" },
  oorlogskaart: { nl: "Oorlogskaart", fr: "Carte de guerre", en: "War map", es: "Mapa de guerra", pcd: "Carte d'guerre", vls: "Oorlogskoarte", de: "Kriegskarte", sv: "Krigskarta" },
  vakmanschap: { nl: "Vakmanschap", fr: "Artisanat", en: "Craftsmanship", es: "Artesanía", pcd: "Artisanat", vls: "Vakmanschap", de: "Handwerk", sv: "Hantverk" },
  "charles-louis": { nl: "Charles-Louis", fr: "Charles-Louis", en: "Charles-Louis", es: "Charles-Louis", pcd: "Charles-Louis", vls: "Charles-Louis", de: "Charles-Louis", sv: "Charles-Louis" },
  generaties: { nl: "Generaties", fr: "Générations", en: "Generations", es: "Generaciones", pcd: "Générationes", vls: "Generaties", de: "Generationen", sv: "Generationer" },
  galerij: { nl: "Fotogalerij", fr: "Galerie photo", en: "Photo gallery", es: "Galería de fotos", pcd: "Galerie photo", vls: "Fotogalerye", de: "Fotogalerie", sv: "Fotogalleri" },
  videos: { nl: "Videogalerij", fr: "Galerie vidéo", en: "Video gallery", es: "Galería de videos", pcd: "Galerie vidéo", vls: "Videogalerye", de: "Videogalerie", sv: "Videogalleri" },
  stamboom: { nl: "Stamboom", fr: "Arbre généalogique", en: "Family tree", es: "Árbol genealógico", pcd: "Abe généalogique", vls: "Stamboom", de: "Stammbaum", sv: "Släktträd" },
  familie: { nl: "Familie", fr: "Famille", en: "Family", es: "Familia", pcd: "Famille", vls: "Familie", de: "Familie", sv: "Familj" },
  bronnen: { nl: "Bronnen", fr: "Sources", en: "Sources", es: "Fuentes", pcd: "Sources", vls: "Bronnen", de: "Quellen", sv: "Källor" },
  quiz: { nl: "Quiz", fr: "Quiz", en: "Quiz", es: "Quiz", pcd: "Quiz", vls: "Quiz", de: "Quiz", sv: "Quiz" },
  spellen: { nl: "Spellen", fr: "Jeux", en: "Games", es: "Juegos", pcd: "Jeux", vls: "Spellen", de: "Spiele", sv: "Spel" },
  contact: { nl: "Contact", fr: "Contact", en: "Contact", es: "Contacto", pcd: "Contact", vls: "Contact", de: "Kontakt", sv: "Kontakt" },
};

const ReadingProgress = () => {
  const { visitedSections, resetReadingProgress, triggerCelebration } = useGame();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    return localStorage.getItem('deforce_progress_hidden') === 'true';
  });

  const totalSections = ALL_SECTIONS.length;
  const visitedCount = visitedSections.size;
  const progressPercent = Math.round((visitedCount / totalSections) * 100);

  const labels = {
    nl: { title: "Leesvoortgang", sections: "secties", of: "van", reset: "Reset voortgang", resetConfirm: "Voortgang gereset", show: "Toon voortgang", hide: "Verberg", celebrate: "Speel viering af" },
    fr: { title: "Progression de lecture", sections: "sections", of: "sur", reset: "Réinitialiser", resetConfirm: "Progression réinitialisée", show: "Afficher progression", hide: "Masquer", celebrate: "Rejouer la célébration" },
    en: { title: "Reading progress", sections: "sections", of: "of", reset: "Reset progress", resetConfirm: "Progress reset", show: "Show progress", hide: "Hide", celebrate: "Replay celebration" },
    es: { title: "Progreso de lectura", sections: "secciones", of: "de", reset: "Reiniciar progreso", resetConfirm: "Progreso reiniciado", show: "Mostrar progreso", hide: "Ocultar", celebrate: "Reproducir celebración" },
    pcd: { title: "Progression d'lecture", sections: "sections", of: "sus", reset: "Réinitialiser", resetConfirm: "Progression réinitialisée", show: "Afficher progression", hide: "Masquer", celebrate: "Rejouer la célébration" },
    vls: { title: "Leesvoortgang", sections: "secties", of: "van", reset: "Reset voortgang", resetConfirm: "Voortgang gereset", show: "Tôon voortgang", hide: "Verberg", celebrate: "Speel viering af" },
    de: { title: "Lesefortschritt", sections: "Bereiche", of: "von", reset: "Fortschritt zurücksetzen", resetConfirm: "Fortschritt zurückgesetzt", show: "Fortschritt anzeigen", hide: "Ausblenden", celebrate: "Feier abspielen" },
    sv: { title: "Läsframsteg", sections: "sektioner", of: "av", reset: "Återställ framsteg", resetConfirm: "Framsteg återställt", show: "Visa framsteg", hide: "Dölj", celebrate: "Spela upp firande" },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.nl;

  const handleReset = () => {
    resetReadingProgress();
    toast.success(currentLabels.resetConfirm);
  };

  const toggleHidden = () => {
    const newValue = !isHidden;
    setIsHidden(newValue);
    localStorage.setItem('deforce_progress_hidden', newValue.toString());
    if (newValue) {
      setIsExpanded(false);
    }
  };

  // Minimized state - just show a small button
  if (isHidden) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleHidden}
                  className="rounded-full bg-card shadow-lg border-border h-10 w-10"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{currentLabels.show}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header - always visible */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center justify-between gap-3 p-3 hover:bg-muted/50 rounded-none"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <BookOpen className="w-5 h-5 text-primary" />
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {visitedCount}
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">{currentLabels.title}</p>
                <p className="text-sm font-medium">
                  {visitedCount} {currentLabels.of} {totalSections}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground w-8">
                {progressPercent}%
              </span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleHidden}
            className="h-full px-2 hover:bg-muted/50 rounded-none border-l border-border"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Expanded section list */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto border-t border-border">
                <div className="p-2 space-y-1">
                  {ALL_SECTIONS.map((sectionId) => {
                    const isVisited = visitedSections.has(sectionId);
                    const label = sectionLabels[sectionId]?.[language] || sectionLabels[sectionId]?.nl || sectionId;
                    
                    return (
                      <a
                        key={sectionId}
                        href={`#${sectionId}`}
                        onClick={() => setIsExpanded(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isVisited 
                            ? "bg-accent/10 text-foreground" 
                            : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isVisited 
                            ? "border-accent bg-accent" 
                            : "border-muted-foreground/30"
                        }`}>
                          {isVisited && <Check className="w-3 h-3 text-accent-foreground" />}
                        </div>
                        <span className={isVisited ? "font-medium" : ""}>{label}</span>
                      </a>
                    );
                  })}
                </div>
                
                {/* Action buttons */}
                <div className="p-2 border-t border-border space-y-1">
                  {/* Celebrate button - only when all sections visited */}
                  {visitedCount >= totalSections && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        triggerCelebration();
                        setIsExpanded(false);
                      }}
                      className="w-full text-gold hover:text-gold hover:bg-gold/10"
                    >
                      <PartyPopper className="w-4 h-4 mr-2" />
                      {currentLabels.celebrate}
                    </Button>
                  )}
                  
                  {/* Reset button */}
                  {visitedCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="w-full text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {currentLabels.reset}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReadingProgress;