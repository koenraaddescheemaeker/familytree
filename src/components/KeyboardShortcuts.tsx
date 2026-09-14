import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts = ({ isOpen, onClose }: KeyboardShortcutsProps) => {
  const { language } = useLanguage();

  const translations: Record<string, {
    title: string;
    description: string;
    categories: {
      navigation: string;
      accessibility: string;
      general: string;
    };
    shortcuts: {
      search: string;
      highContrast: string;
      fontSize: string;
      theme: string;
      mute: string;
      help: string;
      closePopup: string;
      downloadPdf: string;
      printPreview: string;
    };
  }> = {
    nl: {
      title: "Sneltoetsen",
      description: "Gebruik deze toetsencombinaties voor snelle navigatie",
      categories: {
        navigation: "Navigatie",
        accessibility: "Toegankelijkheid",
        general: "Algemeen",
      },
      shortcuts: {
        search: "Zoeken openen",
        highContrast: "Hoog contrast aan/uit",
        fontSize: "Tekstgrootte wisselen",
        theme: "Donker/licht thema",
        mute: "Geluid dempen",
        help: "Sneltoetsen tonen",
        closePopup: "Popup sluiten",
        downloadPdf: "PDF downloaden",
        printPreview: "Afdrukvoorbeeld openen",
      },
    },
    fr: {
      title: "Raccourcis clavier",
      description: "Utilisez ces combinaisons de touches pour une navigation rapide",
      categories: {
        navigation: "Navigation",
        accessibility: "Accessibilité",
        general: "Général",
      },
      shortcuts: {
        search: "Ouvrir la recherche",
        highContrast: "Contraste élevé",
        fontSize: "Changer la taille du texte",
        theme: "Thème sombre/clair",
        mute: "Couper le son",
        help: "Afficher les raccourcis",
        closePopup: "Fermer la popup",
        downloadPdf: "Télécharger PDF",
        printPreview: "Aperçu avant impression",
      },
    },
    en: {
      title: "Keyboard Shortcuts",
      description: "Use these key combinations for quick navigation",
      categories: {
        navigation: "Navigation",
        accessibility: "Accessibility",
        general: "General",
      },
      shortcuts: {
        search: "Open search",
        highContrast: "Toggle high contrast",
        fontSize: "Cycle font size",
        theme: "Toggle dark/light theme",
        mute: "Toggle mute",
        help: "Show shortcuts",
        closePopup: "Close popup",
        downloadPdf: "Download PDF",
        printPreview: "Open print preview",
      },
    },
    es: {
      title: "Atajos de teclado",
      description: "Usa estas combinaciones de teclas para navegación rápida",
      categories: {
        navigation: "Navegación",
        accessibility: "Accesibilidad",
        general: "General",
      },
      shortcuts: {
        search: "Abrir búsqueda",
        highContrast: "Alternar alto contraste",
        fontSize: "Cambiar tamaño de texto",
        theme: "Alternar tema oscuro/claro",
        mute: "Alternar silencio",
        help: "Mostrar atajos",
        closePopup: "Cerrar popup",
        downloadPdf: "Descargar PDF",
        printPreview: "Vista previa de impresión",
      },
    },
    pcd: {
      title: "Raccourcis clavier",
      description: "Utilisez ches combinaisons d'touches pour ène navigation rapide",
      categories: {
        navigation: "Navigation",
        accessibility: "Accessibilité",
        general: "Général",
      },
      shortcuts: {
        search: "Ouvrir el' recherche",
        highContrast: "Haut contraste",
        fontSize: "Canger l'taille du tecse",
        theme: "Thème sombre/clair",
        mute: "Couper l'son",
        help: "Montrer ches raccourcis",
        closePopup: "Fermer l'popup",
        downloadPdf: "Télécharger PDF",
        printPreview: "Aperçu avant impression",
      },
    },
    vls: {
      title: "Sneltoetsen",
      description: "Gebruuk deze toetsencombinaties vôor snelle navigatie",
      categories: {
        navigation: "Navigatie",
        accessibility: "Toegankelikheid",
        general: "Algemeên",
      },
      shortcuts: {
        search: "Zoeken openen",
        highContrast: "Hôog contrast aan/uut",
        fontSize: "Tekstgrootte wisseln",
        theme: "Donker/licht thema",
        mute: "Geluid dempen",
        help: "Sneltoetsen tônen",
        closePopup: "Popup sluutn",
        downloadPdf: "PDF downlôaden",
        printPreview: "Afdrukvoorbeeld openen",
      },
    },
    de: {
      title: "Tastenkürzel",
      description: "Verwenden Sie diese Tastenkombinationen für schnelle Navigation",
      categories: {
        navigation: "Navigation",
        accessibility: "Barrierefreiheit",
        general: "Allgemein",
      },
      shortcuts: {
        search: "Suche öffnen",
        highContrast: "Hoher Kontrast ein/aus",
        fontSize: "Schriftgröße wechseln",
        theme: "Dunkel/Hell-Thema",
        mute: "Ton stummschalten",
        help: "Tastenkürzel anzeigen",
        closePopup: "Popup schließen",
        downloadPdf: "PDF herunterladen",
        printPreview: "Druckvorschau öffnen",
      },
    },
  };

  const t = translations[language] || translations.nl;

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const ShortcutKey = ({ children }: { children: React.ReactNode }) => (
    <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-secondary text-secondary-foreground text-xs font-mono font-medium rounded border border-border shadow-sm">
      {children}
    </kbd>
  );

  const ShortcutRow = ({ keys, description }: { keys: React.ReactNode; description: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-foreground/80">{description}</span>
      <div className="flex items-center gap-1">
        {keys}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[85vh] overflow-auto bg-card border border-border rounded-xl shadow-elevated z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Keyboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Navigation */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  {t.categories.navigation}
                </h3>
                <div className="bg-secondary/30 rounded-lg px-4">
                  <ShortcutRow
                    keys={<><ShortcutKey>Ctrl</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>K</ShortcutKey></>}
                    description={t.shortcuts.search}
                  />
                  <ShortcutRow
                    keys={<><ShortcutKey>Ctrl</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>P</ShortcutKey></>}
                    description={t.shortcuts.downloadPdf}
                  />
                  <ShortcutRow
                    keys={<><ShortcutKey>Ctrl</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>Shift</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>P</ShortcutKey></>}
                    description={t.shortcuts.printPreview}
                  />
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  {t.categories.accessibility}
                </h3>
                <div className="bg-secondary/30 rounded-lg px-4">
                  <ShortcutRow
                    keys={<><ShortcutKey>Alt</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>H</ShortcutKey></>}
                    description={t.shortcuts.highContrast}
                  />
                  <ShortcutRow
                    keys={<><ShortcutKey>Alt</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>T</ShortcutKey></>}
                    description={t.shortcuts.fontSize}
                  />
                  <ShortcutRow
                    keys={<><ShortcutKey>Alt</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>D</ShortcutKey></>}
                    description={t.shortcuts.theme}
                  />
                  <ShortcutRow
                    keys={<><ShortcutKey>Alt</ShortcutKey><span className="text-muted-foreground mx-0.5">+</span><ShortcutKey>M</ShortcutKey></>}
                    description={t.shortcuts.mute}
                  />
                </div>
              </div>

              {/* General */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  {t.categories.general}
                </h3>
                <div className="bg-secondary/30 rounded-lg px-4">
                  <ShortcutRow
                    keys={<ShortcutKey>?</ShortcutKey>}
                    description={t.shortcuts.help}
                  />
                  <ShortcutRow
                    keys={<ShortcutKey>Esc</ShortcutKey>}
                    description={t.shortcuts.closePopup}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
