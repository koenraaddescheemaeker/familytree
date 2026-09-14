import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SiteQRCode = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const siteUrl = window.location.origin;

  const handleDownload = () => {
    const svg = document.getElementById("site-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 300, 300);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "deforche-qr-code.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">{t('qr.button')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('qr.title')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              id="site-qr-code"
              value={siteUrl}
              size={200}
              level="H"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {t('qr.description')}
          </p>
          <p className="text-xs text-muted-foreground font-mono break-all text-center">
            {siteUrl}
          </p>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            {t('qr.download')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiteQRCode;
