import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, Printer, ZoomIn, ZoomOut, RotateCcw, FileText, ChevronLeft, ChevronRight, RectangleVertical, RectangleHorizontal, Download, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Orientation = "portrait" | "landscape";
type ImageFormat = "png" | "jpg";

interface PrintPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrintPreview = ({ isOpen, onClose }: PrintPreviewProps) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [zoom, setZoom] = useState(0.6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isDownloading, setIsDownloading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // Dimensions based on orientation
  const dimensions = orientation === "portrait" 
    ? { width: "210mm", height: "297mm", pageHeight: 1123 }
    : { width: "297mm", height: "210mm", pageHeight: 794 };

  const labels: Record<string, { 
    title: string; 
    loading: string; 
    print: string; 
    close: string; 
    zoomIn: string; 
    zoomOut: string; 
    resetZoom: string;
    page: string;
    of: string;
    portrait: string;
    landscape: string;
    downloadImage: string;
    downloadPng: string;
    downloadJpg: string;
    downloading: string;
    downloadError: string;
  }> = {
    nl: {
      title: "Afdrukvoorbeeld",
      loading: "Preview laden...",
      print: "Afdrukken",
      close: "Sluiten",
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen",
      resetZoom: "Zoom resetten",
      page: "Pagina",
      of: "van",
      portrait: "Staand",
      landscape: "Liggend",
      downloadImage: "Als afbeelding downloaden",
      downloadPng: "PNG downloaden",
      downloadJpg: "JPG downloaden",
      downloading: "Downloaden...",
      downloadError: t('errors.downloadFailed')
    },
    fr: {
      title: "Aperçu avant impression",
      loading: "Chargement de l'aperçu...",
      print: "Imprimer",
      close: "Fermer",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      resetZoom: "Réinitialiser le zoom",
      page: "Page",
      of: "sur",
      portrait: "Portrait",
      landscape: "Paysage",
      downloadImage: "Télécharger en image",
      downloadPng: "Télécharger PNG",
      downloadJpg: "Télécharger JPG",
      downloading: "Téléchargement...",
      downloadError: t('errors.downloadFailed')
    },
    en: {
      title: "Print Preview",
      loading: "Loading preview...",
      print: "Print",
      close: "Close",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      resetZoom: "Reset zoom",
      page: "Page",
      of: "of",
      portrait: "Portrait",
      landscape: "Landscape",
      downloadImage: "Download as image",
      downloadPng: "Download PNG",
      downloadJpg: "Download JPG",
      downloading: "Downloading...",
      downloadError: t('errors.downloadFailed')
    },
    es: {
      title: "Vista previa de impresión",
      loading: "Cargando vista previa...",
      print: "Imprimir",
      close: "Cerrar",
      zoomIn: "Acercar",
      zoomOut: "Alejar",
      resetZoom: "Restablecer zoom",
      page: "Página",
      of: "de",
      portrait: "Vertical",
      landscape: "Horizontal",
      downloadImage: "Descargar como imagen",
      downloadPng: "Descargar PNG",
      downloadJpg: "Descargar JPG",
      downloading: "Descargando...",
      downloadError: t('errors.downloadFailed')
    },
    pcd: {
      title: "Aperçu avant impression",
      loading: "Chargement...",
      print: "Imprimer",
      close: "Fermer",
      zoomIn: "Agrandir",
      zoomOut: "Réduire",
      resetZoom: "Réinitialiser",
      page: "Page",
      of: "sur",
      portrait: "Portrait",
      landscape: "Paysage",
      downloadImage: "Télécharger en image",
      downloadPng: "Télécharger PNG",
      downloadJpg: "Télécharger JPG",
      downloading: "Téléchargement...",
      downloadError: t('errors.downloadFailed')
    },
    vls: {
      title: "Afdrukvoorbeeld",
      loading: "Preview loaden...",
      print: "Afdrukken",
      close: "Sluutn",
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen",
      resetZoom: "Zoom resetten",
      page: "Pagina",
      of: "van",
      portrait: "Stoand",
      landscape: "Liggend",
      downloadImage: "Als ofbeeldienge downloadn",
      downloadPng: "PNG downloadn",
      downloadJpg: "JPG downloadn",
      downloading: "Downloaden...",
      downloadError: t('errors.downloadFailed')
    },
    de: {
      title: "Druckvorschau",
      loading: "Vorschau wird geladen...",
      print: "Drucken",
      close: "Schließen",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      resetZoom: "Zoom zurücksetzen",
      page: "Seite",
      of: "von",
      portrait: "Hochformat",
      landscape: "Querformat",
      downloadImage: "Als Bild herunterladen",
      downloadPng: "PNG herunterladen",
      downloadJpg: "JPG herunterladen",
      downloading: "Wird heruntergeladen...",
      downloadError: t('errors.downloadFailed')
    }
  };

  const currentLabels = labels[language] || labels.nl;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setCurrentPage(1);
      
      // Give time for the iframe to load
      const timer = setTimeout(() => {
        if (iframeRef.current) {
          try {
            const doc = iframeRef.current.contentDocument;
            if (doc) {
              // Calculate approximate pages based on content height
              const contentHeight = doc.body?.scrollHeight || 0;
              setTotalPages(Math.max(1, Math.ceil(contentHeight / dimensions.pageHeight)));
            }
          } catch {
            // Cross-origin restriction, estimate pages
            setTotalPages(1);
          }
        }
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, orientation, dimensions.pageHeight]);

  const handlePrint = () => {
    window.print();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(0.6);
  };

  const handlePrevPage = () => {
    if (containerRef.current && currentPage > 1) {
      const pageHeight = dimensions.pageHeight * zoom;
      containerRef.current.scrollTop -= pageHeight;
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (containerRef.current && currentPage < totalPages) {
      const pageHeight = dimensions.pageHeight * zoom;
      containerRef.current.scrollTop += pageHeight;
      setCurrentPage(prev => Math.min(totalPages, prev + 1));
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const pageHeight = dimensions.pageHeight * zoom;
      const scrollTop = containerRef.current.scrollTop;
      const page = Math.floor(scrollTop / pageHeight) + 1;
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    }
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === "portrait" ? "landscape" : "portrait");
    setCurrentPage(1);
  };

  const handleDownloadImage = async (format: ImageFormat) => {
    if (!paperRef.current || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Create a temporary container for capturing
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      document.body.appendChild(tempContainer);

      // Clone the paper element
      const paperClone = paperRef.current.cloneNode(true) as HTMLElement;
      paperClone.style.transform = "none";
      paperClone.style.width = orientation === "portrait" ? "794px" : "1123px"; // A4 at 96dpi
      paperClone.style.height = orientation === "portrait" ? "1123px" : "794px";
      tempContainer.appendChild(paperClone);

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 100));

      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      
      const canvas = await html2canvas(paperClone, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: orientation === "portrait" ? 794 : 1123,
        height: orientation === "portrait" ? 1123 : 794,
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Convert to desired format and download
      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const quality = format === "jpg" ? 0.92 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      const link = document.createElement("a");
      link.download = `familie-deforce-preview.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: t('errors.unexpectedError'),
        description: currentLabels.downloadError,
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Generate print-styled HTML content
  const generatePrintContent = () => {
    const mainContent = document.querySelector("main");
    if (!mainContent) return "";

    // Clone the main content
    const clone = mainContent.cloneNode(true) as HTMLElement;

    // Remove non-printable elements
    clone.querySelectorAll("nav, footer, button, .print\\:hidden, [data-no-print], video, iframe").forEach(el => el.remove());

    // Get all styles
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join("\n");
        } catch {
          return "";
        }
      })
      .join("\n");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Familie Deforce - Afdrukvoorbeeld</title>
        <style>
          ${styles}
          
          /* Force print styles */
          @page {
            size: A4 ${orientation};
            margin: 20mm 15mm;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            background: white !important;
            color: #1a1a1a !important;
            font-family: Georgia, 'Times New Roman', serif !important;
            font-size: 11pt !important;
            line-height: 1.6 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Hide non-essential elements */
          nav, footer, button, .print\\:hidden, 
          [data-no-print], video, iframe,
          .fixed, .sticky, .absolute {
            display: none !important;
          }
          
          /* Show print-only elements */
          .print\\:block, .print-only {
            display: block !important;
          }
          
          /* Typography */
          h1 { font-size: 24pt !important; margin-bottom: 12pt !important; color: #1a365d !important; }
          h2 { font-size: 18pt !important; margin-bottom: 10pt !important; color: #2c5282 !important; }
          h3 { font-size: 14pt !important; margin-bottom: 8pt !important; color: #2d3748 !important; }
          h4 { font-size: 12pt !important; margin-bottom: 6pt !important; }
          
          p { margin-bottom: 8pt !important; text-align: justify !important; }
          
          /* Images */
          img {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
          
          /* Page breaks */
          section, article {
            page-break-inside: avoid !important;
          }
          
          h1, h2, h3, h4 {
            page-break-after: avoid !important;
          }
          
          /* Links - show URL */
          a[href^="http"]:after {
            content: " (" attr(href) ")" !important;
            font-size: 9pt !important;
            color: #4a5568 !important;
          }
          
          /* Remove backgrounds and shadows */
          .bg-background, .bg-card, .bg-muted {
            background: white !important;
          }
          
          .shadow-lg, .shadow-md, .shadow-sm, .shadow-vintage, .shadow-elegant {
            box-shadow: none !important;
          }
          
          /* Border adjustments */
          .border {
            border-color: #e2e8f0 !important;
          }
          
          /* Cards and sections */
          .card, [class*="card"] {
            border: 1px solid #e2e8f0 !important;
            background: white !important;
            padding: 12pt !important;
            margin-bottom: 12pt !important;
          }
        </style>
      </head>
      <body>
        <header style="text-align: center; margin-bottom: 24pt; padding-bottom: 12pt; border-bottom: 2px solid #3182ce;">
          <h1 style="font-size: 28pt; color: #1a365d; margin: 0;">Familie Deforce</h1>
          <p style="font-size: 12pt; color: #4a5568; margin-top: 8pt;">Een familiegeschiedenis van 340 jaar</p>
        </header>
        ${clone.innerHTML}
        <footer style="margin-top: 24pt; padding-top: 12pt; border-top: 1px solid #e2e8f0; text-align: center; font-size: 9pt; color: #718096;">
          <p>Afgedrukt op ${new Date().toLocaleDateString(language === "en" ? "en-US" : language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "nl-NL", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })} | Familie Deforce Genealogie</p>
        </footer>
      </body>
      </html>
    `;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="print-preview-title"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-6 py-4 bg-background border-b border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 id="print-preview-title" className="text-xl font-semibold text-foreground">
                  {currentLabels.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentLabels.page} {currentPage} {currentLabels.of} {totalPages}
                </p>
              </div>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-2">
              {/* Orientation toggle */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setOrientation("portrait")}
                  className={`p-2 rounded-md transition-colors ${orientation === "portrait" ? "bg-primary text-primary-foreground" : "hover:bg-background text-foreground"}`}
                  aria-label={currentLabels.portrait}
                  aria-pressed={orientation === "portrait"}
                >
                  <RectangleVertical className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setOrientation("landscape")}
                  className={`p-2 rounded-md transition-colors ${orientation === "landscape" ? "bg-primary text-primary-foreground" : "hover:bg-background text-foreground"}`}
                  aria-label={currentLabels.landscape}
                  aria-pressed={orientation === "landscape"}
                >
                  <RectangleHorizontal className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-md hover:bg-background transition-colors"
                  aria-label={currentLabels.zoomOut}
                  disabled={zoom <= 0.3}
                >
                  <ZoomOut className="w-4 h-4 text-foreground" aria-hidden="true" />
                </button>
                <span className="px-3 text-sm font-medium text-foreground min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-md hover:bg-background transition-colors"
                  aria-label={currentLabels.zoomIn}
                  disabled={zoom >= 1.5}
                >
                  <ZoomIn className="w-4 h-4 text-foreground" aria-hidden="true" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-md hover:bg-background transition-colors"
                  aria-label={currentLabels.resetZoom}
                >
                  <RotateCcw className="w-4 h-4 text-foreground" aria-hidden="true" />
                </button>
              </div>

              {/* Page navigation */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <button
                    onClick={handlePrevPage}
                    className="p-2 rounded-md hover:bg-background transition-colors disabled:opacity-50"
                    disabled={currentPage <= 1}
                    aria-label="Vorige pagina"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="p-2 rounded-md hover:bg-background transition-colors disabled:opacity-50"
                    disabled={currentPage >= totalPages}
                    aria-label="Volgende pagina"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" aria-hidden="true" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  {currentLabels.close}
                </Button>
                
                {/* Download as image dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2" disabled={isDownloading}>
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          {currentLabels.downloading}
                        </>
                      ) : (
                        <>
                          <Image className="w-4 h-4" aria-hidden="true" />
                          {currentLabels.downloadImage}
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownloadImage("png")} className="gap-2">
                      <Download className="w-4 h-4" />
                      {currentLabels.downloadPng}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadImage("jpg")} className="gap-2">
                      <Download className="w-4 h-4" />
                      {currentLabels.downloadJpg}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  onClick={handlePrint}
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  {currentLabels.print}
                </Button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors ml-2"
                aria-label={currentLabels.close}
              >
                <X className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Preview content */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto p-8 flex justify-center"
            onScroll={handleScroll}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 text-white">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-lg">{currentLabels.loading}</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center"
                }}
              >
                {/* A4 paper simulation */}
                <div 
                  ref={paperRef}
                  className="bg-white shadow-2xl transition-all duration-300"
                  style={{
                    width: dimensions.width,
                    minHeight: dimensions.height,
                    padding: "20mm 15mm",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    srcDoc={generatePrintContent()}
                    className="w-full border-0"
                    style={{ 
                      minHeight: `calc(${dimensions.height} - 40mm)`,
                      pointerEvents: "none"
                    }}
                    title="Print preview"
                  />
                </div>

                {/* Paper shadow effect */}
                <div 
                  className="absolute -bottom-2 left-4 right-4 h-4 bg-black/20 blur-md rounded-full"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </div>

          {/* Footer with page indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center py-3 bg-background/80 backdrop-blur-sm border-t border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>A4 {orientation === "portrait" ? "(210 × 297 mm)" : "(297 × 210 mm)"} - {orientation === "portrait" ? currentLabels.portrait : currentLabels.landscape}</span>
              <span className="mx-2">•</span>
              <span>{currentLabels.page} {currentPage} {currentLabels.of} {totalPages}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrintPreview;
