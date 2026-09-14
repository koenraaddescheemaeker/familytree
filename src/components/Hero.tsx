import { motion } from "framer-motion";
import familyPortrait from "@/assets/peter-meter-portret-color.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LastUpdateBadge from "@/components/LastUpdateBadge";

const Hero = () => {
  const { t } = useLanguage();

  // Stagger animation variants to reduce simultaneous layout calculations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={familyPortrait}
          alt=""
          className="w-full h-full object-cover object-top opacity-50"
          aria-hidden="true"
          width={1335}
          height={940}
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Content - using viewport-based animation */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground italic font-serif mb-4"
        >
          {t('hero.subtitle')}
        </motion.p>

        <h1
          id="hero-title"
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight"
        >
          {t('hero.title1')}
          <br />
          <span className="text-gradient-gold">{t('hero.title2')}</span>
          <br />
          {t('hero.title3')}
        </h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5 } },
          }}
          className="vintage-divider my-8"
        />

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground/80 font-sans max-w-2xl mx-auto mb-4"
        >
          {t('hero.ancestors')}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-serif italic text-primary mb-8"
        >
          Marcel Deforce & Magdalena Geldof
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-accent font-serif text-lg mb-4"
        >
          {t('hero.author')}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-8">
          <LastUpdateBadge />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="outline"
            size="default"
            className="border-border/60 bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background/80 hover:border-border/80 font-medium px-5 py-3 text-sm rounded-full gap-2 transition-all duration-300"
            onClick={() => {
              const spellenSection = document.getElementById('spellen');
              if (spellenSection) {
                spellenSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Gamepad2 className="w-4 h-4" />
            {t('hero.startGames')}
          </Button>
        </motion.div>

        {/* Scroll indicator - deferred animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
          role="presentation"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;