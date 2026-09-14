import { useLanguage } from "@/contexts/LanguageContext";
import VisitorCounter from "./VisitorCounter";
import SiteQRCode from "./SiteQRCode";
import LastUpdateBadge from "./LastUpdateBadge";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer 
      className="py-8 px-4 border-t border-border bg-background"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="container mx-auto text-center">
        <p className="font-serif text-lg text-primary mb-2">
          {t('footer.title')}
        </p>
        <p className="font-sans text-sm text-muted-foreground">
          {t('footer.copyright')}
        </p>
        <p className="font-sans text-xs text-muted-foreground mt-2">
          {t('footer.based')}{" "}
          <span className="italic">
            {t('footer.bookname')}
          </span>
        </p>
        <div className="mt-4">
          <LastUpdateBadge />
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <VisitorCounter />
          <SiteQRCode />
        </div>
      </div>
    </footer>
  );
};

export default Footer;