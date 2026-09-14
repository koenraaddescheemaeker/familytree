import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, FileText, Image, Film, User, MapPin, Calendar, 
  Clock, Hash, ChevronRight, History, Trash2, ArrowUp, ArrowDown, Bell
} from "lucide-react";
import { useSearch, SearchResult, SearchResultType, FilterType } from "@/hooks/useSearch";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const typeIcons: Record<SearchResultType, React.ReactNode> = {
  section: <FileText className="w-4 h-4" />,
  photo: <Image className="w-4 h-4" />,
  video: <Film className="w-4 h-4" />,
  text: <FileText className="w-4 h-4" />,
  person: <User className="w-4 h-4" />,
  place: <MapPin className="w-4 h-4" />,
  event: <Calendar className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  year: <Clock className="w-4 h-4" />,
  update: <Bell className="w-4 h-4" />,
};

const typeLabels: Record<SearchResultType, Record<Language, string>> = {
  section: { nl: "Sectie", fr: "Section", pcd: "Séctione", vls: "Sectie", en: "Section", es: "Sección", de: "Abschnitt", sv: "Avsnitt" },
  photo: { nl: "Foto", fr: "Photo", pcd: "Foto", vls: "Foto", en: "Photo", es: "Foto", de: "Foto", sv: "Foto" },
  video: { nl: "Video", fr: "Vidéo", pcd: "Vidéo", vls: "Video", en: "Video", es: "Vídeo", de: "Video", sv: "Video" },
  text: { nl: "Tekst", fr: "Texte", pcd: "Técste", vls: "Tekst", en: "Text", es: "Texto", de: "Text", sv: "Text" },
  person: { nl: "Persoon", fr: "Personne", pcd: "Personne", vls: "Persoon", en: "Person", es: "Persona", de: "Person", sv: "Person" },
  place: { nl: "Plaats", fr: "Lieu", pcd: "Lieu", vls: "Plek", en: "Place", es: "Lugar", de: "Ort", sv: "Plats" },
  event: { nl: "Gebeurtenis", fr: "Événement", pcd: "Événemint", vls: "Gebeurtenis", en: "Event", es: "Evento", de: "Ereignis", sv: "Händelse" },
  document: { nl: "Document", fr: "Document", pcd: "Documint", vls: "Document", en: "Document", es: "Documento", de: "Dokument", sv: "Dokument" },
  year: { nl: "Jaar", fr: "Année", pcd: "Année", vls: "Jaar", en: "Year", es: "Año", de: "Jahr", sv: "År" },
  update: { nl: "Update", fr: "Mise à jour", pcd: "Mise à jour", vls: "Update", en: "Update", es: "Actualización", de: "Aktualisierung", sv: "Uppdatering" },
};

const filterLabels: Record<FilterType, Record<Language, string>> = {
  all: { nl: "Alles", fr: "Tout", pcd: "Tout", vls: "Alles", en: "All", es: "Todo", de: "Alle", sv: "Allt" },
  section: { nl: "Secties", fr: "Sections", pcd: "Séctiones", vls: "Secties", en: "Sections", es: "Secciones", de: "Abschnitte", sv: "Avsnitt" },
  photo: { nl: "Foto's", fr: "Photos", pcd: "Fotos", vls: "Foto's", en: "Photos", es: "Fotos", de: "Fotos", sv: "Foton" },
  video: { nl: "Video's", fr: "Vidéos", pcd: "Vidéos", vls: "Video's", en: "Videos", es: "Vídeos", de: "Videos", sv: "Videor" },
  text: { nl: "Teksten", fr: "Textes", pcd: "Técstes", vls: "Teksten", en: "Texts", es: "Textos", de: "Texte", sv: "Texter" },
  person: { nl: "Personen", fr: "Personnes", pcd: "Personnes", vls: "Personen", en: "People", es: "Personas", de: "Personen", sv: "Personer" },
  place: { nl: "Plaatsen", fr: "Lieux", pcd: "Lieus", vls: "Plekken", en: "Places", es: "Lugares", de: "Orte", sv: "Platser" },
  event: { nl: "Gebeurtenissen", fr: "Événements", pcd: "Événemints", vls: "Gebeurtenissen", en: "Events", es: "Eventos", de: "Ereignisse", sv: "Händelser" },
  document: { nl: "Documenten", fr: "Documents", pcd: "Documints", vls: "Documenten", en: "Documents", es: "Documentos", de: "Dokumente", sv: "Dokument" },
  year: { nl: "Jaren", fr: "Années", pcd: "Années", vls: "Jaren", en: "Years", es: "Años", de: "Jahre", sv: "År" },
  update: { nl: "Updates", fr: "Mises à jour", pcd: "Mises à jour", vls: "Updates", en: "Updates", es: "Actualizaciones", de: "Aktualisierungen", sv: "Uppdateringar" },
};

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const navigate = useNavigate();
  const { 
    query, 
    setQuery, 
    results, 
    clearSearch, 
    selectedFilter, 
    setSelectedFilter,
    resultCounts,
    recentSearches,
    selectRecentSearch,
    clearRecentSearches,
  } = useSearch();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    setSelectedIndex(-1);
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => {
          const max = results.length - 1;
          return prev < max ? prev + 1 : 0;
        });
      }
      
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => {
          return prev > 0 ? prev - 1 : results.length - 1;
        });
      }
      
      if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll('[data-result-item]');
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Handle click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleResultClick = (result: SearchResult) => {
    onClose();
    clearSearch();

    // Route links (e.g. /grootouderboek) -> navigate
    if (result.href.startsWith("/")) {
      navigate(result.href);
      return;
    }

    // Scroll to the section
    const element = document.querySelector(result.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRecentClick = (search: string) => {
    selectRecentSearch(search);
  };

  // Highlight matching text
  const highlightMatch = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery.trim()) return text;
    
    const terms = searchQuery.toLowerCase().trim().split(/\s+/);
    let result = text;
    
    // Simple highlight - find and wrap matching terms
    for (const term of terms) {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '|||$1|||');
    }
    
    const parts = result.split('|||');
    return parts.map((part, i) => {
      const isMatch = terms.some(term => part.toLowerCase() === term.toLowerCase());
      return isMatch ? (
        <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      );
    });
  };

  const getTitle = (result: SearchResult): string => {
    return language === "nl" ? result.titleNL : 
           language === "fr" ? result.titleFR : 
           language === "en" ? (result.titleEN || result.titleNL) : 
           language === "es" ? (result.titleES || result.titleNL) : 
           language === "vls" ? (result.titleVLS || result.titleNL) : 
           result.titlePCD || result.titleFR;
  };

  const getDescription = (result: SearchResult): string => {
    return language === "nl" ? result.descriptionNL : 
           language === "fr" ? result.descriptionFR : 
           language === "en" ? (result.descriptionEN || result.descriptionNL) : 
           language === "es" ? (result.descriptionES || result.descriptionNL) : 
           language === "vls" ? (result.descriptionVLS || result.descriptionNL) : 
           result.descriptionPCD || result.descriptionFR;
  };

   const getPlaceholder = (): string => {
    switch (language) {
      case 'nl': return "Zoek personen, plaatsen, gebeurtenissen, foto's...";
      case 'fr': return "Rechercher des personnes, lieux, événements, photos...";
      case 'pcd': return "Kérquer des personnes, lieus, événemints, fotos...";
      case 'vls': return "Zoekt personen, plekken, gebeurtenissen, foto's...";
      case 'en': return "Search people, places, events, photos...";
      case 'es': return "Buscar personas, lugares, eventos, fotos...";
      case 'de': return "Suche Personen, Orte, Ereignisse, Fotos...";
      case 'sv': return "Sök personer, platser, händelser, foton...";
      default: return "Zoek personen, plaatsen, gebeurtenissen, foto's...";
    }
  };

  const getNoResultsText = (): string => {
    switch (language) {
      case 'nl': return "Geen resultaten gevonden";
      case 'fr': return "Aucun résultat trouvé";
      case 'pcd': return "Pont d'résultats trouvés";
      case 'vls': return "Geen resultaten gevunden";
      case 'en': return "No results found";
      case 'es': return "No se encontraron resultados";
      case 'de': return "Keine Ergebnisse gefunden";
      case 'sv': return "Inga resultat hittades";
      default: return "Geen resultaten gevonden";
    }
  };

  const getHelpText = (): string => {
    switch (language) {
      case 'nl': return "Doorzoek de volledige familiegeschiedenis";
      case 'fr': return "Recherchez dans toute l'histoire familiale";
      case 'pcd': return "Kérquez dins toute l'histoère familiére";
      case 'vls': return "Doorzoekt de volledige familiegeschiedenis";
      case 'en': return "Search the complete family history";
      case 'es': return "Busque en toda la historia familiar";
      case 'de': return "Durchsuche die gesamte Familiengeschichte";
      case 'sv': return "Sök i hela familjehistorien";
      default: return "Doorzoek de volledige familiegeschiedenis";
    }
  };

  const getResultsText = (): string => {
    switch (language) {
      case 'nl': return "resultaten";
      case 'fr': return "résultats";
      case 'pcd': return "résultats";
      case 'vls': return "resultaten";
      case 'en': return "results";
      case 'es': return "resultados";
      case 'de': return "Ergebnisse";
      case 'sv': return "resultat";
      default: return "resultaten";
    }
  };

  const getRecentText = (): string => {
    switch (language) {
      case 'nl': return "Recente zoekopdrachten";
      case 'fr': return "Recherches récentes";
      case 'pcd': return "Récherches récintes";
      case 'vls': return "Recente zoekopdrachten";
      case 'en': return "Recent searches";
      case 'es': return "Búsquedas recientes";
      case 'de': return "Letzte Suchen";
      case 'sv': return "Senaste sökningar";
      default: return "Recente zoekopdrachten";
    }
  };

  const getClearText = (): string => {
    switch (language) {
      case 'nl': return "Wissen";
      case 'fr': return "Effacer";
      case 'pcd': return "Effacher";
      case 'vls': return "Wissen";
      case 'en': return "Clear";
      case 'es': return "Borrar";
      case 'de': return "Löschen";
      case 'sv': return "Rensa";
      default: return "Wissen";
    }
  };

  const getSuggestionsText = (): string => {
    switch (language) {
      case 'nl': return "Probeer te zoeken naar";
      case 'fr': return "Essayez de rechercher";
      case 'pcd': return "Essayez d'kérquer";
      case 'vls': return "Probeert te zoeken naar";
      case 'en': return "Try searching for";
      case 'es': return "Intente buscar";
      case 'de': return "Versuche zu suchen nach";
      default: return "Probeer te zoeken naar";
    }
  };

  const suggestions = [
    { nl: "Charles Louis", fr: "Charles Louis", en: "Charles Louis", es: "Charles Louis" },
    { nl: "Westrozebeke", fr: "Westrozebeke", en: "Westrozebeke", es: "Westrozebeke" },
    { nl: "1685", fr: "1685", en: "1685", es: "1685" },
    { nl: "Izegem", fr: "Izegem", en: "Izegem", es: "Izegem" },
    { nl: "reünie", fr: "réunion", en: "reunion", es: "reunión" },
  ];

  // Get active filters for display
  const activeFilters = Object.entries(resultCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => (b[1] as number) - (a[1] as number));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-12 md:pt-24 bg-black/70 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={language === 'nl' ? 'Zoekvenster' : language === 'fr' ? 'Fenêtre de recherche' : language === 'de' ? 'Suchfenster' : language === 'es' ? 'Ventana de búsqueda' : language === 'en' ? 'Search dialog' : 'Zoekvenster'}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl mx-4 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="relative border-b border-border" role="search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={getPlaceholder()}
                aria-label={getPlaceholder()}
                aria-describedby="search-help"
                aria-autocomplete="list"
                aria-controls="search-results"
                className="w-full pl-12 pr-12 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
              />
              <span id="search-help" className="sr-only">{getHelpText()}</span>
              {query && (
                <button
                  onClick={clearSearch}
                  aria-label={getClearText()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            {query && activeFilters.length > 1 && (
              <div className="px-4 py-2 border-b border-border flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-colors",
                    selectedFilter === 'all'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {filterLabels.all[language]} ({results.length})
                </button>
                {activeFilters.map(([type, count]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type as FilterType)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1",
                      selectedFilter === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {typeIcons[type as SearchResultType]}
                    {filterLabels[type as FilterType]?.[language] || type} ({count})
                  </button>
                ))}
              </div>
            )}

            {/* Results */}
            <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto" id="search-results" role="region" aria-label={`${results.length} ${getResultsText()}`}>
              {/* No results */}
              {query && results.length === 0 && (
                <div className="p-8 text-center" role="status" aria-live="polite">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" aria-hidden="true" />
                  <p className="text-muted-foreground mb-4">{getNoResultsText()}</p>
                  <p className="text-sm text-muted-foreground/70 mb-2">{getSuggestionsText()}:</p>
                  <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={getSuggestionsText()}>
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(suggestion[language as keyof typeof suggestion] || suggestion.nl)}
                        className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
                      >
                        {suggestion[language as keyof typeof suggestion] || suggestion.nl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results list */}
              {results.length > 0 && (
                <ul className="py-2" role="listbox" aria-label={`${results.length} ${getResultsText()}`}>
                  {results.map((result, index) => (
                    <li key={result.id} data-result-item role="option" aria-selected={selectedIndex === index}>
                      <button
                        onClick={() => handleResultClick(result)}
                        className={cn(
                          "w-full px-4 py-3 flex items-start gap-4 transition-colors text-left",
                          selectedIndex === index 
                            ? "bg-primary/10" 
                            : "hover:bg-muted/50"
                        )}
                      >
                        {/* Thumbnail or Icon */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {result.thumbnail && result.type !== "video" ? (
                            <img
                              src={result.thumbnail}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-primary">
                              {typeIcons[result.type]}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-1">
                              {typeIcons[result.type]}
                              {typeLabels[result.type][language]}
                            </span>
                            {result.category && (
                              <span className="text-xs text-muted-foreground">
                                • {result.category}
                              </span>
                            )}
                            {result.year && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {result.year}
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-foreground truncate">
                            {highlightMatch(getTitle(result), query)}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {highlightMatch(getDescription(result), query)}
                          </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Empty state with recent searches and suggestions */}
              {!query && (
                <div className="p-4">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <History className="w-4 h-4" />
                          {getRecentText()}
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          {getClearText()}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => handleRecentClick(search)}
                            className="px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors flex items-center gap-1"
                          >
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick suggestions */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      {getSuggestionsText()}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => setQuery(suggestion[language as keyof typeof suggestion] || suggestion.nl)}
                          className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {suggestion[language as keyof typeof suggestion] || suggestion.nl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Help text */}
                  <div className="mt-8 text-center">
                    <Search className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">{getHelpText()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {results.length > 0 && (
                  <>
                    {results.length}{" "}
                    {getResultsText()}
                  </>
                )}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border flex items-center">
                    <ArrowUp className="w-3 h-3" />
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border flex items-center">
                    <ArrowDown className="w-3 h-3" />
                  </kbd>
                  <span className="ml-1">navigeren</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                    Enter
                  </kbd>
                  <span className="ml-1">selecteren</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                    ESC
                  </kbd>
                  <span className="ml-1">sluiten</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDialog;
