import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Users, User, Heart, ChevronDown, ChevronRight, BarChart3, X, TreePine, AlertCircle, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseGedcom, buildTreeFromGedcom, getGedcomStats, type GedcomData, type GedcomTreeNode } from "@/lib/gedcomParser";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "gedcom-files";
const FILE_PATH = "current.ged";

const labels: Record<string, Record<string, string>> = {
  title: { nl: 'Volledige Deforce-Vanhyfte stamboom geïmporteerd uit MyHeritage', en: 'Complete Deforce-Vanhyfte family tree imported from MyHeritage', fr: 'Arbre généalogique complet Deforce-Vanhyfte importé de MyHeritage', de: 'Vollständiger Deforce-Vanhyfte Stammbaum importiert aus MyHeritage', es: 'Árbol genealógico completo Deforce-Vanhyfte importado de MyHeritage', sv: 'Komplett Deforce-Vanhyfte släktträd importerat från MyHeritage', pcd: 'Arbe généalogique complet Deforce-Vanhyfte importé d\'MyHeritage', vls: 'Volledige Deforce-Vanhyfte stamboom geïmporteerd uut MyHeritage' },
  subtitle: { nl: 'Upload een .ged bestand van MyHeritage of een ander genealogieprogramma', en: 'Upload a .ged file from MyHeritage or another genealogy program', fr: 'Téléchargez un fichier .ged de MyHeritage ou un autre programme', de: 'Laden Sie eine .ged Datei von MyHeritage hoch', es: 'Sube un archivo .ged de MyHeritage', sv: 'Ladda upp en .ged-fil från MyHeritage', pcd: 'Déposez un fichier .ged', vls: 'Loat een .ged bestond op van MyHeritage' },
  dropzone: { nl: 'Sleep een .ged bestand hierheen of klik om te uploaden', en: 'Drop a .ged file here or click to upload', fr: 'Déposez un fichier .ged ici', de: '.ged Datei hierher ziehen', es: 'Arrastra un archivo .ged aquí', sv: 'Dra en .ged-fil hit', pcd: 'Déposez un fichier .ged ichi', vls: 'Sleep een .ged bestond hiernoartoe' },
  stats: { nl: 'Statistieken', en: 'Statistics', fr: 'Statistiques', de: 'Statistiken', es: 'Estadísticas', sv: 'Statistik', pcd: 'Statistiques', vls: 'Statistieken' },
  persons: { nl: 'Personen', en: 'Individuals', fr: 'Personnes', de: 'Personen', es: 'Personas', sv: 'Personer', pcd: 'Personnes', vls: 'Persoonen' },
  families: { nl: 'Families', en: 'Families', fr: 'Familles', de: 'Familien', es: 'Familias', sv: 'Familjer', pcd: 'Familles', vls: 'Families' },
  tree: { nl: 'Stamboom', en: 'Family Tree', fr: 'Arbre généalogique', de: 'Stammbaum', es: 'Árbol genealógico', sv: 'Släktträd', pcd: 'Arbe généalogique', vls: 'Stamboom' },
  surnames: { nl: 'Familienamen', en: 'Surnames', fr: 'Noms de famille', de: 'Nachnamen', es: 'Apellidos', sv: 'Efternamn', pcd: 'Noms d\'famille', vls: 'Familienoamen' },
  men: { nl: 'Mannen', en: 'Men', fr: 'Hommes', de: 'Männer', es: 'Hombres', sv: 'Män', pcd: 'Hommes', vls: 'Mannen' },
  women: { nl: 'Vrouwen', en: 'Women', fr: 'Femmes', de: 'Frauen', es: 'Mujeres', sv: 'Kvinnor', pcd: 'Femmes', vls: 'Vrouwen' },
  clear: { nl: 'Verwijderen', en: 'Delete', fr: 'Supprimer', de: 'Löschen', es: 'Borrar', sv: 'Radera', pcd: 'Effacher', vls: 'Wissen' },
  replace: { nl: 'Vervang bestand', en: 'Replace file', fr: 'Remplacer', de: 'Ersetzen', es: 'Reemplazar', sv: 'Ersätt', pcd: 'Remplacer', vls: 'Vervang bestond' },
  search: { nl: 'Zoek persoon...', en: 'Search person...', fr: 'Rechercher...', de: 'Person suchen...', es: 'Buscar persona...', sv: 'Sök person...', pcd: 'Chercher...', vls: 'Zeuk persoon...' },
  searchResults: { nl: 'resultaten', en: 'results', fr: 'résultats', de: 'Ergebnisse', es: 'resultados', sv: 'resultat', pcd: 'résultats', vls: 'resultaotn' },
  noResults: { nl: 'Geen personen gevonden', en: 'No persons found', fr: 'Aucune personne trouvée', de: 'Keine Personen gefunden', es: 'No se encontraron personas', sv: 'Inga personer hittades', pcd: 'Nié trouvé', vls: 'Geen persoonen gevoundn' },
  parseError: { nl: 'Kon het bestand niet inlezen. Controleer of het een geldig GEDCOM (.ged) bestand is.', en: 'Could not parse the file. Please check it is a valid GEDCOM (.ged) file.', fr: 'Impossible de lire le fichier.', de: 'Datei konnte nicht gelesen werden.', es: 'No se pudo leer el archivo.', sv: 'Kunde inte läsa filen.', pcd: 'Impossible éd lire ch\'fichier.', vls: 'Kon het bestond nie inlezen.' },
  loading: { nl: 'Stamboom laden...', en: 'Loading family tree...', fr: 'Chargement...', de: 'Stammbaum laden...', es: 'Cargando...', sv: 'Laddar...', pcd: 'Cargement...', vls: 'Stamboom laadn...' },
  noData: { nl: 'Er is nog geen stamboombestand beschikbaar.', en: 'No family tree file available yet.', fr: 'Aucun fichier disponible.', de: 'Noch keine Datei verfügbar.', es: 'Aún no hay archivo disponible.', sv: 'Ingen fil tillgänglig ännu.', pcd: 'Nié d\'fichier disponibe.', vls: 'Ter is nog geen bestond beschikboar.' },
  uploadSuccess: { nl: 'Bestand opgeslagen!', en: 'File saved!', fr: 'Fichier enregistré !', de: 'Datei gespeichert!', es: '¡Archivo guardado!', sv: 'Filen sparad!', pcd: 'Fichier sauvé !', vls: 'Bestond opgesloagn!' },
  deleteConfirm: { nl: 'Weet je zeker dat je het stamboombestand wilt verwijderen?', en: 'Are you sure you want to delete the family tree file?', fr: 'Supprimer le fichier ?', de: 'Datei wirklich löschen?', es: '¿Borrar el archivo?', sv: 'Radera filen?', pcd: 'Effacher ch\'fichier ?', vls: 'Bistou zeker?' },
};

const l = (key: string, lang: string) => labels[key]?.[lang] || labels[key]?.['nl'] || key;

// ─── Tree Node ─────────────────────────────────────────
const GedcomTreeNodeComponent = ({ node, level = 0 }: { node: GedcomTreeNode; level?: number }) => {
  const [expanded, setExpanded] = useState(level < 2);
  const hasKids = node.children.length > 0;

  const colors = [
    "border-amber-500/50 bg-amber-500/10",
    "border-primary/50 bg-primary/10",
    "border-accent/50 bg-accent/10",
    "border-emerald-500/50 bg-emerald-500/10",
    "border-rose-500/50 bg-rose-500/10",
    "border-violet-500/50 bg-violet-500/10",
  ];
  const color = colors[Math.min(level, colors.length - 1)];

  return (
    <div className="relative">
      {level > 0 && (
        <div className="absolute left-0 top-0 w-6 h-1/2 border-l-2 border-b-2 border-border rounded-bl-lg -translate-x-6" />
      )}

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: Math.min(level * 0.03, 0.3) }}
        className={`relative border-2 rounded-lg p-3 mb-2 ${color} transition-shadow hover:shadow-md`}
      >
        {hasKids && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -left-3 top-4 w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center hover:bg-muted z-10"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-background border-2 border-current flex items-center justify-center shrink-0">
            <User className={`w-4 h-4 ${node.sex === 'F' ? 'text-rose-500' : node.sex === 'M' ? 'text-blue-500' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-base font-semibold text-foreground truncate">{node.name}</h4>
            {(node.birth || node.death) && (
              <p className="text-sm text-muted-foreground">
                {node.birth && <>° {node.birth}</>}
                {node.birth && node.death && " — "}
                {node.death && <>† {node.death}</>}
              </p>
            )}
            {(node.birthPlace || node.deathPlace) && (
              <p className="text-xs text-muted-foreground">📍 {node.birthPlace || node.deathPlace}</p>
            )}
            {node.spouse && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                <span className="truncate">{node.spouse}</span>
                {node.marriageDate && <span className="text-xs">({node.marriageDate})</span>}
              </div>
            )}
            {node.occupation && <p className="text-xs text-accent mt-1">🔨 {node.occupation}</p>}
          </div>
          {hasKids && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-background px-2 py-1 rounded-full shrink-0">
              <Users className="w-3 h-3" /> {node.children.length}
            </span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {hasKids && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-8 pl-4 border-l-2 border-border"
          >
            {node.children.map(child => (
              <GedcomTreeNodeComponent key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────
interface GedcomImportProps {
  isAdmin?: boolean;
}

const GedcomImport = ({ isAdmin = false }: GedcomImportProps) => {
  const { language } = useLanguage();
  const [gedcomData, setGedcomData] = useState<GedcomData | null>(null);
  const [trees, setTrees] = useState<GedcomTreeNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load existing GEDCOM from storage on mount
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        // Private bucket: only signed-in users can download the GEDCOM file
        const { data: blob, error: downloadError } = await supabase.storage.from(BUCKET).download(FILE_PATH);
        if (!downloadError && blob) {
          const text = await blob.text();
          // Check if it's actually GEDCOM content (not an error page)
          if (text.includes("0 HEAD") || text.includes("0 @")) {
            const parsed = parseGedcom(text);
            if (parsed.individuals.size > 0) {
              setGedcomData(parsed);
              setTrees(buildTreeFromGedcom(parsed));
            }
          }
        }
      } catch {
        // No file found or parse error - that's OK
      } finally {
        setIsLoading(false);
      }
    };
    loadFromStorage();
  }, []);

  // Filter tree nodes recursively based on search query
  const filterTree = useCallback((nodes: GedcomTreeNode[], query: string): GedcomTreeNode[] => {
    if (!query.trim()) return nodes;
    const q = query.toLowerCase();
    const filter = (node: GedcomTreeNode): GedcomTreeNode | null => {
      const matches = node.name.toLowerCase().includes(q) ||
        node.birth?.toLowerCase().includes(q) ||
        node.death?.toLowerCase().includes(q) ||
        node.birthPlace?.toLowerCase().includes(q) ||
        node.deathPlace?.toLowerCase().includes(q) ||
        node.occupation?.toLowerCase().includes(q) ||
        node.spouse?.toLowerCase().includes(q);
      const filteredChildren = node.children.map(filter).filter(Boolean) as GedcomTreeNode[];
      if (matches || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    };
    return nodes.map(filter).filter(Boolean) as GedcomTreeNode[];
  }, []);

  const filteredTrees = useMemo(() => filterTree(trees, searchQuery), [trees, searchQuery, filterTree]);

  // Flat search across ALL individuals in the GEDCOM data
  const flatSearchResults = useMemo(() => {
    if (!searchQuery.trim() || !gedcomData) return [];
    const q = searchQuery.toLowerCase();
    const results: Array<{ id: string; name: string; sex: string; birth?: string; death?: string; birthPlace?: string; deathPlace?: string; occupation?: string; spouseName?: string; parents: string[]; children: string[]; siblings: string[] }> = [];
    gedcomData.individuals.forEach((ind, id) => {
      const fullNameLower = ind.fullName.toLowerCase();
      // Also match on just first name + surname (skip middle names)
      const givenLower = (ind.givenName || '').toLowerCase();
      const surnameLower = (ind.surname || '').toLowerCase();
      const firstGiven = givenLower.split(' ')[0]; // first name only
      const shortName = `${firstGiven} ${surnameLower}`.trim();
      if (
        fullNameLower.includes(q) ||
        shortName.includes(q) ||
        (givenLower && givenLower.includes(q)) ||
        (surnameLower && surnameLower.includes(q)) ||
        ind.birthDate?.toLowerCase().includes(q) ||
        ind.deathDate?.toLowerCase().includes(q) ||
        ind.birthPlace?.toLowerCase().includes(q) ||
        ind.deathPlace?.toLowerCase().includes(q) ||
        ind.occupation?.toLowerCase().includes(q)
      ) {
        // Find spouse name
        let spouseName: string | undefined;
        if (ind.familySpouse) {
          for (const famId of ind.familySpouse) {
            const fam = gedcomData.families.get(famId);
            if (fam) {
              const partnerId = fam.husbandId === id ? fam.wifeId : fam.husbandId;
              if (partnerId) {
                const partner = gedcomData.individuals.get(partnerId);
                if (partner) spouseName = partner.fullName;
              }
            }
          }
        }
        // Find parents
        const parents: string[] = [];
        if (ind.familyChild) {
          for (const famId of ind.familyChild) {
            const fam = gedcomData.families.get(famId);
            if (fam) {
              if (fam.husbandId) {
                const father = gedcomData.individuals.get(fam.husbandId);
                if (father) parents.push(father.fullName);
              }
              if (fam.wifeId) {
                const mother = gedcomData.individuals.get(fam.wifeId);
                if (mother) parents.push(mother.fullName);
              }
            }
          }
        }
        // Find children
        const children: string[] = [];
        if (ind.familySpouse) {
          for (const famId of ind.familySpouse) {
            const fam = gedcomData.families.get(famId);
            if (fam) {
              for (const childId of fam.childIds) {
                const child = gedcomData.individuals.get(childId);
                if (child) children.push(child.fullName);
              }
            }
          }
        }
        // Find siblings
        const siblings: string[] = [];
        if (ind.familyChild) {
          for (const famId of ind.familyChild) {
            const fam = gedcomData.families.get(famId);
            if (fam) {
              for (const sibId of fam.childIds) {
                if (sibId !== id) {
                  const sib = gedcomData.individuals.get(sibId);
                  if (sib) siblings.push(sib.fullName);
                }
              }
            }
          }
        }
        results.push({
          id,
          name: ind.fullName,
          sex: ind.sex || '?',
          birth: ind.birthDate,
          death: ind.deathDate,
          birthPlace: ind.birthPlace,
          deathPlace: ind.deathPlace,
          occupation: ind.occupation,
          spouseName,
          parents,
          children,
          siblings,
        });
      }
    });
    results.sort((a, b) => a.name.localeCompare(b.name));
    return results;
  }, [gedcomData, searchQuery]);

  const matchCount = flatSearchResults.length;

  const processGedcomText = useCallback((text: string): { data: GedcomData; trees: GedcomTreeNode[] } | null => {
    try {
      const data = parseGedcom(text);
      if (data.individuals.size === 0) return null;
      const trees = buildTreeFromGedcom(data);
      return { data, trees };
    } catch {
      return null;
    }
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    const text = await file.text();
    const result = processGedcomText(text);
    
    if (!result) {
      setError(l('parseError', language));
      return;
    }

    // If admin, save to storage
    if (isAdmin) {
      setIsSaving(true);
      try {
        const blob = new Blob([text], { type: 'text/plain' });
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(FILE_PATH, blob, { upsert: true });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          setError(`Upload failed: ${uploadError.message}`);
          setIsSaving(false);
          return;
        }
      } catch (err) {
        console.error('Storage error:', err);
        setError('Upload failed');
        setIsSaving(false);
        return;
      }
      setIsSaving(false);
    }

    setGedcomData(result.data);
    setTrees(result.trees);
  }, [language, isAdmin, processGedcomText]);

  const handleDelete = useCallback(async () => {
    if (!confirm(l('deleteConfirm', language))) return;
    
    const { error: delError } = await supabase.storage
      .from(BUCKET)
      .remove([FILE_PATH]);
    
    if (delError) {
      console.error('Delete error:', delError);
      return;
    }
    
    setGedcomData(null);
    setTrees([]);
    setSearchQuery("");
  }, [language]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const stats = gedcomData ? getGedcomStats(gedcomData) : null;

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{l('loading', language)}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 flex items-center gap-3">
            <TreePine className="w-8 h-8" />
            {l('title', language)}
          </h2>
          <p className="text-muted-foreground mb-8">{l('subtitle', language)}</p>
        </motion.div>

        {/* Upload zone - only for admins when no data or replacing */}
        {isAdmin && !gedcomData && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}
          >
            {isSaving ? (
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            ) : (
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            )}
            <p className="text-lg text-muted-foreground">{l('dropzone', language)}</p>
            <p className="text-sm text-muted-foreground mt-2">.ged (GEDCOM 5.5 / 5.5.1)</p>
            <input ref={fileRef} type="file" accept=".ged" className="hidden" onChange={onFileChange} />
          </div>
        )}

        {/* No data message for non-admins */}
        {!gedcomData && !isAdmin && (
          <div className="text-center py-12 text-muted-foreground">
            <TreePine className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>{l('noData', language)}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-3 text-destructive">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {gedcomData && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header with admin controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  {gedcomData.source ? `Bron: ${gedcomData.source}` : 'GEDCOM geladen'}
                </span>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-1" /> {l('replace', language)}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
                    <X className="w-4 h-4 mr-1" /> {l('clear', language)}
                  </Button>
                  <input ref={fileRef} type="file" accept=".ged" className="hidden" onChange={onFileChange} />
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={<Users className="w-5 h-5" />} label={l('persons', language)} value={stats.totalIndividuals} />
              <StatCard icon={<Heart className="w-5 h-5" />} label={l('families', language)} value={stats.totalFamilies} />
              <StatCard icon={<User className="w-5 h-5 text-blue-500" />} label={l('men', language)} value={stats.males} />
              <StatCard icon={<User className="w-5 h-5 text-rose-500" />} label={l('women', language)} value={stats.females} />
            </div>

            {/* Surnames */}
            {stats.surnames.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> {l('surnames', language)} ({stats.surnames.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stats.surnames.map(s => (
                    <span key={s} className="px-2 py-1 bg-background border border-border rounded-full text-xs text-foreground">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tree view */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <TreePine className="w-6 h-6" /> {l('tree', language)}
              </h3>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={l('search', language)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchQuery.trim() && (
                <p className="text-sm text-muted-foreground mb-3">
                  {matchCount} {l('searchResults', language)}
                </p>
              )}

              {/* Flat search results when searching */}
              {searchQuery.trim() && flatSearchResults.length > 0 && (
                <div className="space-y-2 mb-6">
                  {flatSearchResults.map(person => (
                    <div key={person.id} className="border border-border rounded-lg p-3 bg-background hover:shadow-md transition-shadow flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-muted border-2 border-border flex items-center justify-center shrink-0">
                        <User className={`w-4 h-4 ${person.sex === 'F' ? 'text-rose-500' : person.sex === 'M' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-semibold text-foreground">{person.name}</h4>
                        {(person.birth || person.death) && (
                          <p className="text-sm text-muted-foreground">
                            {person.birth && <>° {person.birth}</>}
                            {person.birth && person.death && " — "}
                            {person.death && <>† {person.death}</>}
                          </p>
                        )}
                        {(person.birthPlace || person.deathPlace) && (
                          <p className="text-xs text-muted-foreground">📍 {person.birthPlace || person.deathPlace}</p>
                        )}
                        {person.spouseName && (
                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                            <span className="truncate">{person.spouseName}</span>
                          </div>
                        )}
                        {person.parents.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            <span className="font-medium">👨‍👩‍👧 Ouders:</span> {person.parents.join(' & ')}
                          </div>
                        )}
                        {person.children.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            <span className="font-medium">👶 Kinderen:</span> {person.children.join(', ')}
                          </div>
                        )}
                        {person.siblings.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            <span className="font-medium">👫 Broers/zussen:</span> {person.siblings.join(', ')}
                          </div>
                        )}
                        {person.occupation && <p className="text-xs text-accent mt-1">🔨 {person.occupation}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery.trim() && flatSearchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-8">{l('noResults', language)}</p>
              )}

              {/* Tree view when not searching */}
              {!searchQuery.trim() && (
                <div className="space-y-4">
                  {trees.map(tree => (
                    <GedcomTreeNodeComponent key={tree.id} node={tree} level={0} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="bg-background border border-border rounded-lg p-4 text-center">
    <div className="flex justify-center mb-2 text-primary">{icon}</div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export default GedcomImport;