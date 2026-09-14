import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, X, Loader2, Check, FileText, Image, Calendar, Users, MapPin, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

interface PdfExportProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Section {
  id: string;
  labelKey: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: "voorwoord", labelKey: "nav.voorwoord", icon: Book },
  { id: "tijdlijn", labelKey: "nav.tijdlijn", icon: Calendar },
  { id: "zoektocht", labelKey: "nav.zoektocht", icon: FileText },
  { id: "stamouders", labelKey: "nav.stamouders", icon: Users },
  { id: "kaart", labelKey: "nav.kaart", icon: MapPin },
  { id: "charles-louis", labelKey: "nav.charles-louis", icon: Users },
  { id: "generaties", labelKey: "nav.generaties", icon: Users },
  { id: "galerij", labelKey: "nav.galerij", icon: Image },
  { id: "stamboom", labelKey: "nav.stamboom", icon: Users },
];

const PdfExport = ({ isOpen, onClose }: PdfExportProps) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  const labels: Record<string, { title: string; subtitle: string; selectAll: string; deselectAll: string; download: string; downloading: string; complete: string; close: string; sections: string; error: string }> = {
    nl: {
      title: "Download PDF",
      subtitle: "Kies welke secties je wilt opnemen in de PDF",
      selectAll: "Alles selecteren",
      deselectAll: "Alles deselecteren",
      download: "Download PDF",
      downloading: "PDF wordt gemaakt...",
      complete: "PDF gedownload!",
      close: "Sluiten",
      sections: "secties geselecteerd",
      error: t('errors.pdfExportFailed')
    },
    fr: {
      title: "Télécharger PDF",
      subtitle: "Choisissez les sections à inclure dans le PDF",
      selectAll: "Tout sélectionner",
      deselectAll: "Tout désélectionner",
      download: "Télécharger PDF",
      downloading: "Création du PDF...",
      complete: "PDF téléchargé!",
      close: "Fermer",
      sections: "sections sélectionnées",
      error: t('errors.pdfExportFailed')
    },
    en: {
      title: "Download PDF",
      subtitle: "Choose which sections to include in the PDF",
      selectAll: "Select all",
      deselectAll: "Deselect all",
      download: "Download PDF",
      downloading: "Creating PDF...",
      complete: "PDF downloaded!",
      close: "Close",
      sections: "sections selected",
      error: t('errors.pdfExportFailed')
    },
    es: {
      title: "Descargar PDF",
      subtitle: "Elige qué secciones incluir en el PDF",
      selectAll: "Seleccionar todo",
      deselectAll: "Deseleccionar todo",
      download: "Descargar PDF",
      downloading: "Creando PDF...",
      complete: "¡PDF descargado!",
      close: "Cerrar",
      sections: "secciones seleccionadas",
      error: t('errors.pdfExportFailed')
    },
    pcd: {
      title: "Télécharger PDF",
      subtitle: "Choisissez les sections à mette dins l'PDF",
      selectAll: "Tout sélectionner",
      deselectAll: "Tout désélectionner",
      download: "Télécharger PDF",
      downloading: "Création du PDF...",
      complete: "PDF téléchargé!",
      close: "Fermer",
      sections: "sections sélectionnées",
      error: t('errors.pdfExportFailed')
    },
    vls: {
      title: "Download PDF",
      subtitle: "Kies welke secties je wilt in de PDF",
      selectAll: "Alles selecteern",
      deselectAll: "Alles deselecteern",
      download: "Download PDF",
      downloading: "PDF wordt gemoakt...",
      complete: "PDF gedownload!",
      close: "Sluutn",
      sections: "secties geselecteerd",
      error: t('errors.pdfExportFailed')
    },
    de: {
      title: "PDF herunterladen",
      subtitle: "Wählen Sie die Abschnitte für das PDF",
      selectAll: "Alle auswählen",
      deselectAll: "Alle abwählen",
      download: "PDF herunterladen",
      downloading: "PDF wird erstellt...",
      complete: "PDF heruntergeladen!",
      close: "Schließen",
      sections: "Abschnitte ausgewählt",
      error: t('errors.pdfExportFailed')
    }
  };

  const currentLabels = labels[language] || labels.nl;

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectAll = () => {
    setSelectedSections(sections.map(s => s.id));
  };

  const deselectAll = () => {
    setSelectedSections([]);
  };

  const handleExport = async () => {
    if (selectedSections.length === 0) return;

    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);

    try {
      // Create a temporary container for the PDF content
      const container = document.createElement("div");
      container.style.width = "210mm";
      container.style.padding = "20mm";
      container.style.background = "#ffffff";
      container.style.fontFamily = "Georgia, serif";

      // Add title page - using safe DOM methods to prevent XSS
      const titlePage = document.createElement("div");
      titlePage.style.cssText = "text-align: center; padding: 60px 0; page-break-after: always;";
      
      const titleH1 = document.createElement("h1");
      titleH1.style.cssText = "font-size: 36px; font-weight: bold; color: #1a365d; margin-bottom: 20px; font-family: Georgia, serif;";
      titleH1.textContent = "Familie Deforce";
      titlePage.appendChild(titleH1);
      
      const subtitleP = document.createElement("p");
      subtitleP.style.cssText = "font-size: 18px; color: #4a5568; margin-bottom: 40px;";
      subtitleP.textContent = "Een familiegeschiedenis van 340 jaar";
      titlePage.appendChild(subtitleP);
      
      const divider = document.createElement("div");
      divider.style.cssText = "width: 100px; height: 2px; background: linear-gradient(to right, #3182ce, #805ad5); margin: 0 auto 40px;";
      titlePage.appendChild(divider);
      
      const dateP = document.createElement("p");
      dateP.style.cssText = "font-size: 14px; color: #718096;";
      const formattedDate = new Date().toLocaleDateString(
        language === "en" ? "en-US" : language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : language === "de" ? "de-DE" : "nl-NL", 
        { year: "numeric", month: "long", day: "numeric" }
      );
      dateP.textContent = `Gegenereerd op ${formattedDate}`;
      titlePage.appendChild(dateP);
      
      container.appendChild(titlePage);

      // Process each selected section
      for (let i = 0; i < selectedSections.length; i++) {
        const sectionId = selectedSections[i];
        const element = document.getElementById(sectionId);
        
        if (element) {
          const sectionClone = element.cloneNode(true) as HTMLElement;
          
          // Clean up the clone for PDF
          sectionClone.querySelectorAll("button, .print\\:hidden, nav, [data-no-print]").forEach(el => el.remove());
          sectionClone.querySelectorAll("video").forEach(video => {
            const placeholder = document.createElement("div");
            placeholder.style.padding = "20px";
            placeholder.style.background = "#f7fafc";
            placeholder.style.border = "1px solid #e2e8f0";
            placeholder.style.borderRadius = "8px";
            placeholder.style.textAlign = "center";
            placeholder.style.color = "#718096";
            placeholder.textContent = "[Video content - bekijk online]";
            video.replaceWith(placeholder);
          });
          
          // Add page break
          const wrapper = document.createElement("div");
          wrapper.style.pageBreakBefore = i > 0 ? "always" : "auto";
          wrapper.appendChild(sectionClone);
          container.appendChild(wrapper);
        }

        setExportProgress(((i + 1) / selectedSections.length) * 80);
      }

      // Temporarily add to DOM (hidden)
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      setExportProgress(85);

      // Generate PDF
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `deforce-familiegeschiedenis-${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      setExportProgress(90);

      await html2pdf().set(opt).from(container).save();

      // Cleanup
      document.body.removeChild(container);

      setExportProgress(100);
      setExportComplete(true);

      // Reset after a delay
      setTimeout(() => {
        setIsExporting(false);
        setExportComplete(false);
        setExportProgress(0);
      }, 2000);

    } catch (err) {
      console.error("Failed to generate PDF:", err);
      toast({
        title: t('errors.unexpectedError'),
        description: currentLabels.error,
        variant: 'destructive',
      });
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-export-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileDown className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="pdf-export-title" className="text-xl font-semibold text-foreground">
                    {currentLabels.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentLabels.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label={currentLabels.close}
              >
                <X className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              </button>
            </div>

            {/* Section selection */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {selectedSections.length} {currentLabels.sections}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAll}
                    className="text-xs"
                  >
                    {currentLabels.selectAll}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={deselectAll}
                    className="text-xs"
                  >
                    {currentLabels.deselectAll}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto" role="group" aria-label={currentLabels.subtitle}>
                {sections.map((section) => {
                  const isSelected = selectedSections.includes(section.id);
                  const Icon = section.icon;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      role="checkbox"
                      aria-checked={isSelected}
                      aria-label={t(section.labelKey)}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {isSelected ? (
                          <Check className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}>
                        {t(section.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer with progress */}
            <div className="p-6 border-t border-border bg-muted/30">
              {isExporting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {exportComplete ? currentLabels.complete : currentLabels.downloading}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(exportProgress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${exportProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isExporting && !exportComplete}
                >
                  {currentLabels.close}
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={handleExport}
                  disabled={selectedSections.length === 0 || isExporting}
                >
                  {isExporting ? (
                    <>
                      {exportComplete ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      )}
                      {exportComplete ? currentLabels.complete : currentLabels.downloading}
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" aria-hidden="true" />
                      {currentLabels.download}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PdfExport;
