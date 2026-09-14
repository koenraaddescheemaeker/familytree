import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, MessageCircle, Link, Check, Mail, Linkedin, Printer, FileDown, QrCode, Download, Copy, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import html2pdf from "html2pdf.js";
import QRCode from "react-qr-code";

// X/Twitter icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareButtonProps {
  title?: string;
  sectionId?: string;
}

const ShareButton = ({ title, sectionId }: ShareButtonProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrSize, setQrSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  const presetColors = [
    { bg: '#ffffff', fg: '#000000' },
    { bg: '#f0f9ff', fg: '#0369a1' },
    { bg: '#fef3c7', fg: '#92400e' },
    { bg: '#dcfce7', fg: '#166534' },
    { bg: '#fce7f3', fg: '#9d174d' },
    { bg: '#1e293b', fg: '#f8fafc' },
  ];

  const qrSizes = {
    small: 128,
    medium: 200,
    large: 300,
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return sectionId ? `${baseUrl}#${sectionId}` : baseUrl;
  };

  const getShareText = () => {
    const defaultTexts: Record<string, string> = {
      nl: "Ontdek de fascinerende familiegeschiedenis van de familie Deforce",
      fr: "Découvrez l'histoire fascinante de la famille Deforce",
      en: "Discover the fascinating family history of the Deforce family",
      de: "Entdecken Sie die faszinierende Familiengeschichte der Familie Deforce",
      es: "Descubre la fascinante historia familiar de la familia Deforce",
      pcd: "Découvrez l'histoire fascinante d'la famille Deforce",
      vls: "Ontdek de boeiende familiegeschiedenis van de familie Deforce",
    };
    return title || defaultTexts[language] || defaultTexts.nl;
  };

  const getEmailSubject = () => {
    const subjects: Record<string, string> = {
      nl: "Bekijk dit verhaal over de familie Deforce",
      fr: "Regardez cette histoire de la famille Deforce",
      en: "Check out this story about the Deforce family",
      de: "Schauen Sie sich diese Geschichte über die Familie Deforce an",
      es: "Mira esta historia de la familia Deforce",
      pcd: "Ertrouvez ch'te histoire d'la famille Deforce",
      vls: "Bekiek dit verhoal over de familie Deforce",
    };
    return subjects[language] || subjects.nl;
  };

  const shareLabels: Record<string, { share: string; facebook: string; twitter: string; whatsapp: string; linkedin: string; copyLink: string; copied: string; email: string; print: string; pdf: string; qrCode: string; qrTitle: string; downloadQr: string; copyQr: string; qrCopied: string; small: string; medium: string; large: string; qrSize: string; addLogo: string; removeLogo: string; colors: string }> = {
    nl: { share: "Deel dit verhaal", facebook: "Deel op Facebook", twitter: "Deel op X", whatsapp: "Deel via WhatsApp", linkedin: "Deel op LinkedIn", copyLink: "Kopieer link", copied: "Gekopieerd!", email: "Deel via e-mail", print: "Afdrukken", pdf: "Download PDF", qrCode: "QR-code genereren", qrTitle: "Scan om te delen", downloadQr: "Download", copyQr: "Kopieer", qrCopied: "QR-code gekopieerd naar klembord!", small: "Klein", medium: "Medium", large: "Groot", qrSize: "Formaat", addLogo: "Logo toevoegen", removeLogo: "Verwijder", colors: "Kleuren" },
    fr: { share: "Partager cette histoire", facebook: "Partager sur Facebook", twitter: "Partager sur X", whatsapp: "Partager via WhatsApp", linkedin: "Partager sur LinkedIn", copyLink: "Copier le lien", copied: "Copié!", email: "Partager par e-mail", print: "Imprimer", pdf: "Télécharger PDF", qrCode: "Générer QR-code", qrTitle: "Scannez pour partager", downloadQr: "Télécharger", copyQr: "Copier", qrCopied: "QR-code copié dans le presse-papiers!", small: "Petit", medium: "Moyen", large: "Grand", qrSize: "Taille", addLogo: "Ajouter logo", removeLogo: "Supprimer", colors: "Couleurs" },
    en: { share: "Share this story", facebook: "Share on Facebook", twitter: "Share on X", whatsapp: "Share via WhatsApp", linkedin: "Share on LinkedIn", copyLink: "Copy link", copied: "Copied!", email: "Share via email", print: "Print", pdf: "Download PDF", qrCode: "Generate QR code", qrTitle: "Scan to share", downloadQr: "Download", copyQr: "Copy", qrCopied: "QR code copied to clipboard!", small: "Small", medium: "Medium", large: "Large", qrSize: "Size", addLogo: "Add logo", removeLogo: "Remove", colors: "Colors" },
    de: { share: "Diese Geschichte teilen", facebook: "Auf Facebook teilen", twitter: "Auf X teilen", whatsapp: "Via WhatsApp teilen", linkedin: "Auf LinkedIn teilen", copyLink: "Link kopieren", copied: "Kopiert!", email: "Per E-Mail teilen", print: "Drucken", pdf: "PDF herunterladen", qrCode: "QR-Code generieren", qrTitle: "Scannen zum Teilen", downloadQr: "Herunterladen", copyQr: "Kopieren", qrCopied: "QR-Code in die Zwischenablage kopiert!", small: "Klein", medium: "Mittel", large: "Groß", qrSize: "Größe", addLogo: "Logo hinzufügen", removeLogo: "Entfernen", colors: "Farben" },
    es: { share: "Compartir esta historia", facebook: "Compartir en Facebook", twitter: "Compartir en X", whatsapp: "Compartir via WhatsApp", linkedin: "Compartir en LinkedIn", copyLink: "Copiar enlace", copied: "¡Copiado!", email: "Compartir por email", print: "Imprimir", pdf: "Descargar PDF", qrCode: "Generar código QR", qrTitle: "Escanea para compartir", downloadQr: "Descargar", copyQr: "Copiar", qrCopied: "¡Código QR copiado al portapapeles!", small: "Pequeño", medium: "Mediano", large: "Grande", qrSize: "Tamaño", addLogo: "Añadir logo", removeLogo: "Eliminar", colors: "Colores" },
    pcd: { share: "Partager ch'te histoire", facebook: "Partager sus Facebook", twitter: "Partager sus X", whatsapp: "Partager via WhatsApp", linkedin: "Partager sus LinkedIn", copyLink: "Copier l'lien", copied: "Copié!", email: "Partager par e-mail", print: "Imprimer", pdf: "Télécharger PDF", qrCode: "Générer QR-code", qrTitle: "Scannez pour partager", downloadQr: "Télécharger", copyQr: "Copier", qrCopied: "QR-code copié dans le presse-papiers!", small: "Petit", medium: "Moyen", large: "Grand", qrSize: "Taille", addLogo: "Ajouter logo", removeLogo: "Supprimer", colors: "Couleurs" },
    vls: { share: "Deel dit verhoal", facebook: "Deel op Facebook", twitter: "Deel op X", whatsapp: "Deel via WhatsApp", linkedin: "Deel op LinkedIn", copyLink: "Kopieer link", copied: "Gekopieerd!", email: "Deel via e-mail", print: "Afdrukken", pdf: "Download PDF", qrCode: "QR-code genereren", qrTitle: "Scan om te delen", downloadQr: "Download", copyQr: "Kopieer", qrCopied: "QR-code gekopieerd naar klembord!", small: "Klein", medium: "Medium", large: "Groot", qrSize: "Formaat", addLogo: "Logo toevoegen", removeLogo: "Verwijder", colors: "Kleuren" },
  };

  const labels = shareLabels[language] || shareLabels.nl;

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
    setOpen(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank", "width=600,height=400");
    setOpen(false);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText() + " " + getShareUrl())}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
    setOpen(false);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(`${getShareText()}\n\n${getShareUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  const printSection = () => {
    setOpen(false);
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${getShareText()}</title>
                <style>
                  body { font-family: Georgia, serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                  img { max-width: 100%; height: auto; }
                  h1, h2, h3, h4 { font-family: system-ui, sans-serif; }
                  @media print { body { padding: 20px; } }
                </style>
              </head>
              <body>
                ${section.innerHTML}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 250);
        }
      }
    } else {
      window.print();
    }
  };

  const downloadPdf = async () => {
    setOpen(false);
    const element = sectionId ? document.getElementById(sectionId) : document.body;
    if (element) {
      const opt = {
        margin: 10,
        filename: `${sectionId || 'deforce-familie'}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      try {
        await html2pdf().set(opt).from(element).save();
      } catch (err) {
        console.error("Failed to generate PDF:", err);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openQrCode = () => {
    setOpen(false);
    setShowQrCode(true);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getQrCodeCanvas = (): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        reject(new Error("QR code not found"));
        return;
      }
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const qrImg = new Image();
      
      qrImg.onload = () => {
        canvas.width = qrImg.width;
        canvas.height = qrImg.height;
        ctx?.drawImage(qrImg, 0, 0);
        
        // If there's a logo, draw it in the center
        if (logoUrl && ctx) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSize = Math.floor(qrImg.width * 0.25); // Logo is 25% of QR size
            const x = (qrImg.width - logoSize) / 2;
            const y = (qrImg.height - logoSize) / 2;
            
            // Draw background color for logo area
            ctx.fillStyle = bgColor;
            ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);
            
            // Draw the logo
            ctx.drawImage(logoImg, x, y, logoSize, logoSize);
            resolve(canvas);
          };
          logoImg.onerror = () => resolve(canvas); // Fallback without logo
          logoImg.src = logoUrl;
        } else {
          resolve(canvas);
        }
      };
      qrImg.onerror = reject;
      qrImg.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    });
  };

  const downloadQrCode = async () => {
    try {
      const canvas = await getQrCodeCanvas();
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `deforce-qr-code-${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Failed to download QR code:", err);
    }
  };

  const copyQrCode = async () => {
    try {
      const canvas = await getQrCodeCanvas();
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          toast.success(labels.qrCopied);
        }
      }, "image/png");
    } catch (err) {
      console.error("Failed to copy QR code:", err);
    }
  };

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          aria-label={labels.share}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          {labels.share}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2" 
        align="center"
        role="menu"
        aria-label={labels.share}
      >
        <div className="flex flex-col gap-1" role="group">
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={copyToClipboard}
            role="menuitem"
            aria-label={copied ? labels.copied : labels.copyLink}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
            ) : (
              <Link className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            )}
            {copied ? labels.copied : labels.copyLink}
          </Button>
          <div className="h-px bg-border my-1" role="separator" aria-hidden="true" />
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={shareViaEmail}
            role="menuitem"
            aria-label={labels.email}
          >
            <Mail className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            {labels.email}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={shareToFacebook}
            role="menuitem"
            aria-label={labels.facebook}
          >
            <Facebook className="w-5 h-5 text-[#1877F2]" aria-hidden="true" />
            {labels.facebook}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={shareToTwitter}
            role="menuitem"
            aria-label={labels.twitter}
          >
            <XIcon className="w-5 h-5" aria-hidden="true" />
            {labels.twitter}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={shareToWhatsApp}
            role="menuitem"
            aria-label={labels.whatsapp}
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
            {labels.whatsapp}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={shareToLinkedIn}
            role="menuitem"
            aria-label={labels.linkedin}
          >
            <Linkedin className="w-5 h-5 text-[#0A66C2]" aria-hidden="true" />
            {labels.linkedin}
          </Button>
          <div className="h-px bg-border my-1" role="separator" aria-hidden="true" />
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={printSection}
            role="menuitem"
            aria-label={labels.print}
          >
            <Printer className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            {labels.print}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={downloadPdf}
            role="menuitem"
            aria-label={labels.pdf}
          >
            <FileDown className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            {labels.pdf}
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 h-10"
            onClick={openQrCode}
            role="menuitem"
            aria-label={labels.qrCode}
          >
            <QrCode className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            {labels.qrCode}
          </Button>
        </div>
      </PopoverContent>
    </Popover>

    <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{labels.qrTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{labels.qrSize}:</span>
            <div className="flex gap-1">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={qrSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setQrSize(size)}
                  className="px-3 h-8"
                >
                  {labels[size]}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{labels.colors}:</span>
            <div className="flex gap-1">
              {presetColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => { setBgColor(color.bg); setFgColor(color.fg); }}
                  className={`w-6 h-6 rounded border-2 transition-all ${bgColor === color.bg && fgColor === color.fg ? 'border-primary scale-110' : 'border-border hover:scale-105'}`}
                  style={{ background: `linear-gradient(135deg, ${color.bg} 50%, ${color.fg} 50%)` }}
                  aria-label={`Color preset ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div 
            className="relative p-4 rounded-lg transition-all duration-200"
            style={{ backgroundColor: bgColor }}
          >
            <QRCode
              id="qr-code-svg"
              value={getShareUrl()}
              size={qrSizes[qrSize]}
              level="H"
              bgColor={bgColor}
              fgColor={fgColor}
            />
            {logoUrl && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 rounded"
                style={{ 
                  width: `${qrSizes[qrSize] * 0.25 + 8}px`, 
                  height: `${qrSizes[qrSize] * 0.25 + 8}px`,
                  backgroundColor: bgColor
                }}
              >
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            {logoUrl ? (
              <Button
                variant="outline"
                size="sm"
                onClick={removeLogo}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                {labels.removeLogo}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <ImagePlus className="w-4 h-4" />
                {labels.addLogo}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {qrSizes[qrSize]} × {qrSizes[qrSize]} px
          </p>
          <p className="text-sm text-muted-foreground text-center break-all max-w-full px-4">
            {getShareUrl()}
          </p>
          <div className="flex gap-2">
            <Button onClick={downloadQrCode} variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              {labels.downloadQr}
            </Button>
            <Button onClick={copyQrCode} size="sm" className="gap-2">
              <Copy className="w-4 h-4" />
              {labels.copyQr}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ShareButton;
