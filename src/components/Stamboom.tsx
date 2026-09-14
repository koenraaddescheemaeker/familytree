import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, User, Users, Heart, Search, X, Printer, Maximize2, Minimize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
interface FamilyMember {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  spouse?: string;
  spouseBirth?: string;
  location?: string;
  profession?: string;
  children?: FamilyMember[];
  notes?: string;
}

const familyTree: FamilyMember = {
  id: "1",
  name: "Hubert Deleforge",
  birth: "1662",
  death: "1729",
  spouse: "Antoinette Follet",
  spouseBirth: "~1665",
  location: "Hallennes-lez-Haubourdin → Izegem",
  profession: "Boquillon (houtarbeider)",
  notes: "Huwelijksakte 18 april 1685 te Lille. Migratie naar Izegem in 1699. Stamouders van de Izegemse tak.",
  children: [
    {
      id: "2a",
      name: "Antonia Deleforge",
      birth: "~1686",
      death: "na 1750",
      spouse: "Philippe Charles Rousseau",
      location: "Izegem",
      notes: "Huwde in 1714 met Philippe Charles Rousseau, eveneens een immigrant uit Bondues. Zij kregen samen 10 kinderen.",
    },
    {
      id: "2b",
      name: "Jacobus Franciscus Deleforge",
      birth: "1694",
      death: "1772",
      spouse: "Veronica Barbier",
      location: "Izegem → Ardooie",
      profession: "Landbouwer & dagloner",
      notes: "Onze rechtstreekse voorvader. Trouwde op 30 april 1718 te Izegem. Vestigde zich later in Ardooie. 9 kinderen.",
      children: [
        {
          id: "3",
          name: "Georgius Delforce",
          birth: "1731",
          death: "1807",
          spouse: "Maria Catharina Bonte",
          location: "Ardooie / Emelgem",
          profession: "Timmerman",
          notes: "Eerste generatie in de houtbewerking als beroep.",
          children: [
            {
              id: "4",
              name: "Petrus Augustinus Delforge",
              birth: "1773",
              death: "1840",
              spouse: "Maria Theresia Maertens",
              location: "Emelgem",
              profession: "Timmerman & schrijnwerker",
              children: [
                {
                  id: "5",
                  name: "Jean François Deforche",
                  birth: "1815",
                  death: "1871",
                  spouse: "Francisca Vandewalle",
                  location: "Emelgem",
                  profession: "Timmerman & schrijnwerker",
                  notes: "De eerste voorouder waarvan we het beroep eenduidig met akten kunnen onderbouwen. Hij werkte structureel in ateliers en op bouwwerven.",
                  children: [
                    {
                      id: "6",
                      name: "Charles Louis Deforce",
                      birth: "1857",
                      death: "1938",
                      spouse: "Marie Leonie Vandenbroucke (1e), Leonie Plancke (2e), Silvia Maria Van Coillie (3e)",
                      location: "Emelgem / Izegem",
                      profession: "Meubelmaker",
                      notes: "Legerdienst 1877-1880 als mineur de 1e classe. 8 kinderen bij 1e huwelijk (3 overleefd). Overleed op 6 maart 1938.",
                      children: [
                        {
                          id: "7a",
                          name: "Achille Cyrille Deforce",
                          birth: "1885",
                          death: "1885",
                          location: "Emelgem",
                          notes: "†5 maanden oud"
                        },
                        {
                          id: "7b",
                          name: "Jean François Cyrille Deforce",
                          birth: "1886",
                          death: "1955",
                          location: "Izegem",
                          profession: "Timmerman/meubelmaker",
                          notes: "Overleefde kinderleeftijd"
                        },
                        {
                          id: "7c",
                          name: "Alois Constant Deforce",
                          birth: "1887",
                          death: "1893",
                          notes: "†6 jaar oud"
                        },
                        {
                          id: "7d",
                          name: "Maria Magdalena Deforce",
                          birth: "1889",
                          death: "1970",
                          location: "Izegem",
                          notes: "\"Tante Leine\" - overleefde kinderleeftijd"
                        },
                        {
                          id: "7e",
                          name: "Odile Camille Deforce",
                          birth: "1891",
                          death: "1891",
                          notes: "†enkele maanden oud"
                        },
                        {
                          id: "7f",
                          name: "Elisa Palmyre Deforce",
                          birth: "1893",
                          death: "1893",
                          notes: "†enkele maanden oud"
                        },
                        {
                          id: "7g",
                          name: "Marcel August Deforce",
                          birth: "1894",
                          death: "1963",
                          spouse: "Magdalena Geldof",
                          location: "Izegem (Vandenbogaerdelaan 27)",
                          profession: "Meubelmaker",
                          notes: "Grootvader van de auteur. 112 afstammelingen bij de reünie van 2024.",
                          children: [
                            { id: "8a", name: "Marc Deforce", birth: "1946", location: "België", notes: "Auteur van dit familieonderzoek, ter gelegenheid van zijn 80ste verjaardag in december 2026" },
                            { id: "8b", name: "Andere kinderen", notes: "Diverse afstammelingen verspreid over België en de wereld" },
                          ]
                        },
                        {
                          id: "7h",
                          name: "Joseph Constant Deforce",
                          birth: "1896",
                          death: "1897",
                          notes: "†baby"
                        },
                        {
                          id: "7i",
                          name: "Alberic Camiel Deforce",
                          birth: "1899",
                          death: "1920",
                          notes: "Zoon uit 2e huwelijk met Leonie Plancke"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "2c",
      name: "Albert Delforge",
      birth: "?",
      death: "1752",
      spouse: "Judoca Reynaert",
      location: "Ingelmunster",
      notes: "Getrouwd te Ingelmunster op 18 april 1719. Stamvader van een talrijk nageslacht in Ingelmunster.",
    },
    {
      id: "2d",
      name: "Hubert Delforge (junior)",
      birth: "~1700",
      death: "na 1750",
      spouse: "Isabella De Man",
      location: "Izegem",
      notes: "Jongste zoon. Trouwde met de Izegemse Isabella De Man en kreeg met haar 14 kinderen.",
    }
  ]
};

// Helper function to check if a member matches the search
const memberMatchesSearch = (member: FamilyMember, searchTerm: string): boolean => {
  const term = searchTerm.toLowerCase();
  return (
    member.name.toLowerCase().includes(term) ||
    (member.spouse?.toLowerCase().includes(term) ?? false) ||
    (member.location?.toLowerCase().includes(term) ?? false) ||
    (member.profession?.toLowerCase().includes(term) ?? false) ||
    (member.birth?.includes(term) ?? false) ||
    (member.death?.includes(term) ?? false)
  );
};

// Helper function to check if any descendant matches
const hasMatchingDescendant = (member: FamilyMember, searchTerm: string): boolean => {
  if (memberMatchesSearch(member, searchTerm)) return true;
  if (member.children) {
    return member.children.some(child => hasMatchingDescendant(child, searchTerm));
  }
  return false;
};

// Helper function to get all matching member IDs
const getMatchingIds = (member: FamilyMember, searchTerm: string): Set<string> => {
  const matches = new Set<string>();
  
  const traverse = (m: FamilyMember) => {
    if (memberMatchesSearch(m, searchTerm)) {
      matches.add(m.id);
    }
    m.children?.forEach(traverse);
  };
  
  traverse(member);
  return matches;
};

// Helper function to get IDs that should be expanded
const getExpandedIds = (member: FamilyMember, searchTerm: string): Set<string> => {
  const expanded = new Set<string>();
  
  const traverse = (m: FamilyMember): boolean => {
    let shouldExpand = memberMatchesSearch(m, searchTerm);
    
    if (m.children) {
      for (const child of m.children) {
        if (traverse(child)) {
          shouldExpand = true;
        }
      }
    }
    
    if (shouldExpand && m.children && m.children.length > 0) {
      expanded.add(m.id);
    }
    
    return shouldExpand;
  };
  
  traverse(member);
  return expanded;
};

// Highlight matching text
const HighlightText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
  if (!searchTerm) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={i} className="bg-accent/40 text-foreground rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

interface TreeNodeProps {
  member: FamilyMember; 
  level?: number;
  isLast?: boolean;
  searchTerm?: string;
  matchingIds?: Set<string>;
  expandedIds?: Set<string>;
}

const TreeNode = React.forwardRef<HTMLDivElement, TreeNodeProps>(({ 
  member, 
  level = 0,
  isLast = false,
  searchTerm = "",
  matchingIds = new Set<string>(),
  expandedIds = new Set<string>(),
}, ref) => {
  const isSearching = searchTerm.length > 0;
  const isMatch = matchingIds.has(member.id);
  const shouldAutoExpand = expandedIds.has(member.id);
  
  const [isManualExpanded, setIsManualExpanded] = useState<boolean | null>(null);
  
  // Determine if expanded: manual override > search auto-expand > default (level < 3)
  const isExpanded = isManualExpanded !== null 
    ? isManualExpanded 
    : (isSearching ? shouldAutoExpand : level < 3);
  
  const hasChildren = member.children && member.children.length > 0;

  const getLevelColor = (lvl: number, highlight: boolean) => {
    if (highlight) {
      return "border-accent bg-accent/20 ring-2 ring-accent ring-offset-2";
    }
    const colors = [
      "border-accent bg-accent/10",
      "border-primary/60 bg-primary/5",
      "border-amber-500/60 bg-amber-500/5",
      "border-emerald-500/60 bg-emerald-500/5",
      "border-rose-500/60 bg-rose-500/5",
      "border-violet-500/60 bg-violet-500/5",
      "border-sky-500/60 bg-sky-500/5",
    ];
    return colors[lvl % colors.length];
  };

  return (
    <div ref={ref} className="relative stamboom-print-container">
      {/* Connecting lines */}
      {level > 0 && (
        <div className="absolute left-0 top-0 -translate-x-6 h-full print:hidden">
          <div className="absolute top-6 -left-0 w-6 h-px bg-border" />
          {!isLast && (
            <div className="absolute top-6 -left-0 w-px h-full bg-border" />
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: level * 0.05 }}
        className={`relative border-2 rounded-lg p-4 mb-3 ${getLevelColor(level, isMatch)} transition-all hover:shadow-md stamboom-tree-node stamboom-gen-${Math.min(level, 6)}`}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => setIsManualExpanded(!isExpanded)}
            className="absolute -left-3 top-4 w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors z-10 stamboom-expand-btn"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-foreground" />
            )}
          </button>
        )}

        {/* Member Info */}
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-background border-2 ${isMatch ? 'border-accent' : 'border-current'} flex items-center justify-center print:hidden`}>
            <User className={`w-5 h-5 ${isMatch ? 'text-accent' : ''}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-lg font-semibold text-primary truncate stamboom-member-name">
              <HighlightText text={member.name} searchTerm={searchTerm} />
            </h4>
            
            {(member.birth || member.death) && (
              <p className="text-sm text-muted-foreground stamboom-member-dates">
                {member.birth && <>° <HighlightText text={member.birth} searchTerm={searchTerm} /></>}
                {member.birth && member.death && " — "}
                {member.death && <>† <HighlightText text={member.death} searchTerm={searchTerm} /></>}
              </p>
            )}

            {member.spouse && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground stamboom-member-spouse">
                <Heart className="w-3 h-3 text-rose-500 flex-shrink-0 print:hidden" />
                <span className="truncate">
                  <span className="hidden print:inline">⚭ </span>
                  <HighlightText text={member.spouse} searchTerm={searchTerm} />
                </span>
              </div>
            )}

            {member.location && (
              <p className="text-xs text-muted-foreground mt-1 stamboom-member-location">
                📍 <HighlightText text={member.location} searchTerm={searchTerm} />
              </p>
            )}

            {member.profession && (
              <p className="text-xs text-accent mt-1 stamboom-member-profession">
                🔨 <HighlightText text={member.profession} searchTerm={searchTerm} />
              </p>
            )}

            {member.notes && (
              <p className="text-xs italic text-muted-foreground mt-2 bg-background/50 p-2 rounded stamboom-member-notes">
                {member.notes}
              </p>
            )}
          </div>

          {hasChildren && (
            <div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-1 rounded-full print:hidden">
              <Users className="w-3 h-3" />
              <span>{member.children?.length}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-8 pl-4 border-l-2 border-border stamboom-connector stamboom-children"
          >
            {member.children?.map((child, index) => (
              <TreeNode
                key={child.id}
                member={child}
                level={level + 1}
                isLast={index === (member.children?.length ?? 0) - 1}
                searchTerm={searchTerm}
                matchingIds={matchingIds}
                expandedIds={expandedIds}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print-only: Always show children */}
      {hasChildren && !isExpanded && (
        <div className="hidden print:block ml-8 pl-4 border-l-2 border-border stamboom-connector stamboom-children">
          {member.children?.map((child, index) => (
            <TreeNode
              key={`print-${child.id}`}
              member={child}
              level={level + 1}
              isLast={index === (member.children?.length ?? 0) - 1}
              searchTerm=""
              matchingIds={new Set()}
              expandedIds={new Set()}
            />
          ))}
        </div>
      )}
    </div>
  );
});

TreeNode.displayName = 'TreeNode';
const Stamboom = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { language } = useLanguage();

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  const content = {
    nl: {
      subtitle: "Familieverbanden",
      title: "Interactieve Stamboom",
      description: "Van Hubert Deleforge (1685) tot de hedendaagse Deforce familie — klik op de knoppen om generaties uit te vouwen",
      searchPlaceholder: "Zoek op naam, partner, locatie of beroep...",
      noResults: "Geen resultaten gevonden voor",
      resultsFound: "gevonden",
      result: "resultaat",
      results: "resultaten",
      printButton: "Stamboom afdrukken",
      printTitle: "Stamboom Familie Deforce",
      fullscreenButton: "Volledig scherm",
      exitFullscreen: "Sluiten",
      legend: {
        stamouders: "Stamouders",
        gen2: "2e generatie",
        gen3: "3e generatie",
        expand: "Klik om uit te vouwen"
      },
      timeline: [
        { year: "1685", event: "Huwelijk stamouders" },
        { year: "~1750", event: "Migratie naar Vlaanderen" },
        { year: "1857", event: "Geboorte Charles Louis" },
        { year: "2024", event: "112 afstammelingen" },
      ],
      note: "Let op:",
      noteText: "Deze visualisatie toont de directe lijn van Hubert Deleforge naar de hedendaagse familie. De volledige stamboom bevat meer dan 2.000 familienamen over 15+ generaties."
    },
    fr: {
      subtitle: "Liens familiaux",
      title: "Arbre Généalogique Interactif",
      description: "De Hubert Deleforge (1685) à la famille Deforce d'aujourd'hui — cliquez sur les boutons pour développer les générations",
      searchPlaceholder: "Rechercher par nom, conjoint, lieu ou profession...",
      noResults: "Aucun résultat trouvé pour",
      resultsFound: "trouvé(s)",
      result: "résultat",
      results: "résultats",
      printButton: "Imprimer l'arbre",
      printTitle: "Arbre Généalogique Famille Deforce",
      fullscreenButton: "Plein écran",
      exitFullscreen: "Fermer",
      legend: {
        stamouders: "Ancêtres fondateurs",
        gen2: "2e génération",
        gen3: "3e génération",
        expand: "Cliquez pour développer"
      },
      timeline: [
        { year: "1685", event: "Mariage des ancêtres" },
        { year: "~1750", event: "Migration vers la Flandre" },
        { year: "1857", event: "Naissance Charles Louis" },
        { year: "2024", event: "112 descendants" },
      ],
      note: "Remarque:",
      noteText: "Cette visualisation montre la lignée directe de Hubert Deleforge à la famille actuelle. L'arbre généalogique complet contient plus de 2.000 noms de famille sur 15+ générations."
    },
    pcd: {
      subtitle: "Lins familiaux",
      title: "Abe Généalogique Interactif",
      description: "D'Hubert Deleforge (1685) à la famille Deforce d'aujord'hui — cliquez sus les boutons pour développer les générationes",
      searchPlaceholder: "Kérquer par nom, conjoint, place ou métier...",
      noResults: "Pont d'résultats trouvés pour",
      resultsFound: "trouvé(s)",
      result: "résultat",
      results: "résultats",
      printButton: "Imprimer l'abe",
      printTitle: "Abe Généalogique Famille Deforce",
      fullscreenButton: "Plein écran",
      exitFullscreen: "Fermer",
      legend: {
        stamouders: "Anchtres fondateurs",
        gen2: "2e généatione",
        gen3: "3e généatione",
        expand: "Cliquez pour développer"
      },
      timeline: [
        { year: "1685", event: "Mariage des anchtres" },
        { year: "~1750", event: "Migratione vers la Flandre" },
        { year: "1857", event: "Naissance Charles Louis" },
        { year: "2024", event: "112 deschindants" },
      ],
      note: "Remarque:",
      noteText: "Chte visualisatione montre la lignée directe d'Hubert Deleforge à la famille actuelle. L'abe généalogique complet contint pus d'2.000 noms d'famille sus 15+ générationes."
    },
    vls: {
      subtitle: "Familieverbânden",
      title: "Interactieve Stamboom",
      description: "Van Hubert Deleforge (1685) tot de hedendoagse Deforce familie — klikt op de knoppen om generoasjes uut te vouwen",
      searchPlaceholder: "Zoekt op noame, partner, ploatse of beroep...",
      noResults: "Geen resultaten gevonden vôo",
      resultsFound: "gevonden",
      result: "resultaat",
      results: "resultaten",
      printButton: "Stamboom ofdrukken",
      printTitle: "Stamboom Familie Deforce",
      fullscreenButton: "Volledig scherm",
      exitFullscreen: "Sluuten",
      legend: {
        stamouders: "Stamouders",
        gen2: "2e generoasje",
        gen3: "3e generoasje",
        expand: "Klikt om uut te vouwen"
      },
      timeline: [
        { year: "1685", event: "Huweliek stamouders" },
        { year: "~1750", event: "Migroasje noar Vloanderen" },
        { year: "1857", event: "Geboarte Charles Louis" },
        { year: "2024", event: "112 ofstammelingen" },
      ],
      note: "Let op:",
      noteText: "Deze visualisoasje toont de directe lien van Hubert Deleforge noar de hedendoagse familie. De volledige stamboom bevat meer dan 2.000 familienoamen over 15+ generoasjes."
    },
    en: {
      subtitle: "Family Connections",
      title: "Interactive Family Tree",
      description: "From Hubert Deleforge (1685) to the present-day Deforce family — click the buttons to expand generations",
      searchPlaceholder: "Search by name, spouse, location or profession...",
      noResults: "No results found for",
      resultsFound: "found",
      result: "result",
      results: "results",
      printButton: "Print family tree",
      printTitle: "Deforce Family Tree",
      fullscreenButton: "Full screen",
      exitFullscreen: "Close",
      legend: {
        stamouders: "Founding ancestors",
        gen2: "2nd generation",
        gen3: "3rd generation",
        expand: "Click to expand"
      },
      timeline: [
        { year: "1685", event: "Marriage of founding ancestors" },
        { year: "~1750", event: "Migration to Flanders" },
        { year: "1857", event: "Birth of Charles Louis" },
        { year: "2024", event: "112 descendants" },
      ],
      note: "Note:",
      noteText: "This visualization shows the direct line from Hubert Deleforge to the present-day family. The complete family tree contains more than 2,000 family names across 15+ generations."
    },
    es: {
      subtitle: "Conexiones Familiares",
      title: "Árbol Genealógico Interactivo",
      description: "Desde Hubert Deleforge (1685) hasta la familia Deforce actual — haga clic en los botones para expandir generaciones",
      searchPlaceholder: "Buscar por nombre, cónyuge, ubicación o profesión...",
      noResults: "No se encontraron resultados para",
      resultsFound: "encontrado(s)",
      result: "resultado",
      results: "resultados",
      printButton: "Imprimir árbol",
      printTitle: "Árbol Genealógico Familia Deforce",
      fullscreenButton: "Pantalla completa",
      exitFullscreen: "Cerrar",
      legend: {
        stamouders: "Ancestros fundadores",
        gen2: "2ª generación",
        gen3: "3ª generación",
        expand: "Haga clic para expandir"
      },
      timeline: [
        { year: "1685", event: "Matrimonio de ancestros fundadores" },
        { year: "~1750", event: "Migración a Flandes" },
        { year: "1857", event: "Nacimiento de Charles Louis" },
        { year: "2024", event: "112 descendientes" },
      ],
      note: "Nota:",
      noteText: "Esta visualización muestra la línea directa desde Hubert Deleforge hasta la familia actual. El árbol genealógico completo contiene más de 2.000 apellidos en más de 15 generaciones."
    },
    de: {
      subtitle: "Familienverbindungen",
      title: "Interaktiver Stammbaum",
      description: "Von Hubert Deleforge (1685) bis zur heutigen Familie Deforce — klicken Sie auf die Schaltflächen, um Generationen zu erweitern",
      searchPlaceholder: "Suche nach Name, Partner, Ort oder Beruf...",
      noResults: "Keine Ergebnisse gefunden für",
      resultsFound: "gefunden",
      result: "Ergebnis",
      results: "Ergebnisse",
      printButton: "Stammbaum drucken",
      printTitle: "Stammbaum Familie Deforce",
      fullscreenButton: "Vollbildmodus",
      exitFullscreen: "Schließen",
      legend: {
        stamouders: "Stammeltern",
        gen2: "2. Generation",
        gen3: "3. Generation",
        expand: "Klicken zum Erweitern"
      },
      timeline: [
        { year: "1685", event: "Hochzeit der Stammeltern" },
        { year: "~1750", event: "Migration nach Flandern" },
        { year: "1857", event: "Geburt von Charles Louis" },
        { year: "2024", event: "112 Nachkommen" },
      ],
      note: "Hinweis:",
      noteText: "Diese Visualisierung zeigt die direkte Linie von Hubert Deleforge zur heutigen Familie. Der vollständige Stammbaum enthält mehr als 2.000 Familiennamen über 15+ Generationen."
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  const { matchingIds, expandedIds, resultCount } = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return { matchingIds: new Set<string>(), expandedIds: new Set<string>(), resultCount: 0 };
    }
    const matching = getMatchingIds(familyTree, searchTerm);
    const expanded = getExpandedIds(familyTree, searchTerm);
    return { matchingIds: matching, expandedIds: expanded, resultCount: matching.size };
  }, [searchTerm]);

  return (
    <>
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-primary">
                {t.title}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.printButton}</span>
                </Button>
                <Button
                  onClick={toggleFullscreen}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Minimize2 className="w-4 h-4" />
                  {t.exitFullscreen}
                </Button>
              </div>
            </div>

            {/* Search in Fullscreen */}
            <div className="sticky top-[57px] z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-2"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchTerm.length >= 2 && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {resultCount === 0 ? (
                    <>{t.noResults} "<strong>{searchTerm}</strong>"</>
                  ) : (
                    <><strong>{resultCount}</strong> {resultCount === 1 ? t.result : t.results} {t.resultsFound}</>
                  )}
                </p>
              )}
            </div>

            {/* Scrollable Tree Content */}
            <div className="overflow-auto h-[calc(100vh-130px)] p-4 md:p-8">
              <div className="max-w-4xl mx-auto">
                {/* Legend in Fullscreen */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded border-2 border-accent bg-accent/10" />
                    <span>{t.legend.stamouders}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded border-2 border-primary/60 bg-primary/5" />
                    <span>{t.legend.gen2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded border-2 border-amber-500/60 bg-amber-500/5" />
                    <span>{t.legend.gen3}</span>
                  </div>
                </div>

                {/* Tree */}
                <div className="bg-secondary/30 rounded-xl p-4 md:p-6 border border-border">
                  <TreeNode 
                    member={familyTree} 
                    searchTerm={searchTerm.length >= 2 ? searchTerm : ""}
                    matchingIds={matchingIds}
                    expandedIds={expandedIds}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="stamboom" className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Print-only header */}
        <div className="hidden print:block">
          <h1 className="stamboom-print-header">{t.printTitle}</h1>
          <p className="stamboom-print-subtitle">{t.description}</p>
          <p className="stamboom-print-date">
            {language === 'nl' ? 'Afgedrukt op' : language === 'fr' ? 'Imprimé le' : language === 'en' ? 'Printed on' : language === 'de' ? 'Gedruckt am' : language === 'es' ? 'Impreso el' : 'Geprent op'}: {new Date().toLocaleDateString(language === 'nl' ? 'nl-BE' : language === 'fr' ? 'fr-BE' : language === 'en' ? 'en-GB' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : 'nl-BE')}
          </p>
          {/* Print legend */}
          <div className="stamboom-print-legend">
            <div className="stamboom-print-legend-item">
              <div className="stamboom-print-legend-color" style={{ borderColor: '#8B5A2B', backgroundColor: '#FFF8E7' }} />
              <span>{t.legend.stamouders}</span>
            </div>
            <div className="stamboom-print-legend-item">
              <div className="stamboom-print-legend-color" style={{ borderColor: '#2563EB', backgroundColor: '#EFF6FF' }} />
              <span>{t.legend.gen2}</span>
            </div>
            <div className="stamboom-print-legend-item">
              <div className="stamboom-print-legend-color" style={{ borderColor: '#D97706', backgroundColor: '#FFFBEB' }} />
              <span>{t.legend.gen3}</span>
            </div>
            <div className="stamboom-print-legend-item">
              <div className="stamboom-print-legend-color" style={{ borderColor: '#059669', backgroundColor: '#ECFDF5' }} />
              <span>4e+</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 print:hidden"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {t.title}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="vintage-divider mt-6" />
          
          {/* Action Buttons */}
          <div className="mt-6 print:hidden flex gap-3 justify-center flex-wrap">
            <Button
              onClick={toggleFullscreen}
              variant="default"
              className="gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              {t.fullscreenButton}
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              {t.printButton}
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="print:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-3 text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          <AnimatePresence>
            {searchTerm.length >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-sm text-muted-foreground mt-3"
              >
                {resultCount === 0 ? (
                  <>{t.noResults} "<strong>{searchTerm}</strong>"</>
                ) : (
                  <><strong>{resultCount}</strong> {resultCount === 1 ? t.result : t.results} {t.resultsFound}</>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 print:hidden">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded border-2 border-accent bg-accent/10" />
            <span>{t.legend.stamouders}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded border-2 border-primary/60 bg-primary/5" />
            <span>{t.legend.gen2}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded border-2 border-amber-500/60 bg-amber-500/5" />
            <span>{t.legend.gen3}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronDown className="w-4 h-4" />
            <span>{t.legend.expand}</span>
          </div>
        </div>

        {/* Tree */}
        <div className="bg-secondary/30 rounded-xl p-6 md:p-8 shadow-vintage border border-border">
          <TreeNode 
            member={familyTree} 
            searchTerm={searchTerm.length >= 2 ? searchTerm : ""}
            matchingIds={matchingIds}
            expandedIds={expandedIds}
          />
        </div>

        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {t.timeline.map((item) => (
            <div
              key={item.year}
              className="text-center p-4 bg-background rounded-lg border border-border"
            >
              <div className="font-serif text-xl text-accent">{item.year}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.event}</div>
            </div>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-4 bg-accent/10 rounded-lg border-l-4 border-accent"
        >
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{t.note}</strong> {t.noteText}
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Stamboom;
