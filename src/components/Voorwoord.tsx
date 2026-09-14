import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import marcDeforce from "@/assets/pasfoto-1.jpg";

const Voorwoord = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const authorCaption: Record<string, string> = {
    nl: "Marc Deforce, auteur en familiearchivaris",
    fr: "Marc Deforce, auteur et archiviste familial",
    en: "Marc Deforce, author and family archivist",
    es: "Marc Deforce, autor y archivero familiar",
    de: "Marc Deforce, Autor und Familienarchivar",
    pcd: "Marc Deforce, auteur et archiviste d'famile",
    vls: "Marc Deforce, schriver en familiearchivaris",
    sv: "Marc Deforce, författare och familjens arkivarie"
  };

  return (
    <section id="voorwoord" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('voorwoord.title')}
          </h2>
          <p className="font-serif text-xl italic text-accent">
            {t('voorwoord.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none text-foreground/85 font-sans leading-relaxed"
        >
          {/* Author photo with intro text */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative group">
                <img
                  src={marcDeforce}
                  alt="Marc Deforce"
                  className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-lg shadow-lg border-2 border-accent/30"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2 font-serif italic max-w-[160px]">
                {authorCaption[language] || authorCaption.nl}
              </p>
            </div>
            <div className="flex-1 space-y-6">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-primary first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {t('voorwoord.p1')}
              </p>
              <p>{t('voorwoord.p2')}</p>
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 overflow-hidden"
              >
                <p>{t('voorwoord.p4')}</p>
                <p>{t('voorwoord.p5')}</p>
                <p>{t('voorwoord.p6')}</p>
                <p>{t('voorwoord.p7')}</p>
                <p>{t('voorwoord.p8')}</p>
                <p>{t('voorwoord.p9')}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-primary font-serif text-xl my-8">
            {t('voorwoord.quote')}
          </blockquote>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 overflow-hidden"
              >
                <p>{t('voorwoord.p10')}</p>
                <p>{t('voorwoord.p11')}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && <p>{t('voorwoord.p3')}</p>}

          <div className="flex justify-center my-8">
            <Button
              variant="outline"
              onClick={() => {
                if (expanded) {
                  // Scroll naar sectie-top bij inklappen
                  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setExpanded(!expanded);
              }}
              className="gap-2"
            >
              {expanded ? (
                <>
                  {t('voorwoord.readLess')}
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  {t('voorwoord.readMore')}
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-right font-serif italic text-primary flex-1">
              {t('voorwoord.author')}
              <br />
              <span className="text-muted-foreground text-sm">
                {t('voorwoord.occasion')}
              </span>
            </p>
            <ShareButton sectionId="voorwoord" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Voorwoord;
