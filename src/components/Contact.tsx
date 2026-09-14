import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import pasfoto from "@/assets/pasfoto-1.jpg";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <a
            href="https://www.myheritage.nl/site-74993331/deforce-van-hijfte-stamboom"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-background p-6 rounded-lg shadow-card border border-border hover:border-accent transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <ExternalLink className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                MyHeritage
              </h3>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              {t('contact.myheritage')}
            </p>
          </a>

          <a
            href="https://gw.geneanet.org/mdeforce"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-background p-6 rounded-lg shadow-card border border-border hover:border-accent transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <ExternalLink className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                Geneanet
              </h3>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              {t('contact.geneanet')}
            </p>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-background p-8 rounded-lg shadow-card border border-border"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={pasfoto}
              alt="Marc Deforce"
              className="w-32 h-32 rounded-full object-cover border-4 border-accent/30 shadow-lg flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                {t('contact.call')}
              </h3>
              <p className="font-sans text-foreground/80 leading-relaxed mb-6 max-w-2xl">
                {t('contact.calltext')}
              </p>
              <a
                href="mailto:marc.deforce@icloud.com"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-sans font-medium hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                marc.deforce@icloud.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;