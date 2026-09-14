import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Heart, Home, ZoomIn, X, GitBranch, Play, Sparkles } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import MarcelBiografie from "@/components/MarcelBiografie";
import portretMagdalena from "@/assets/portret-magdalena-geldof.jpg";
import portretMarcel from "@/assets/portret-marcel-deforce.jpg";
import interieurPeterMeter from "@/assets/interieur-peter-meter.png";
import peterMeterPortret from "@/assets/peter-meter-portret.png";
import peterMeterPortretColor from "@/assets/peter-meter-portret-color.jpg";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import stamboomMarcel from "@/assets/stamboom-marcel.jpg";
import trouwboekje from "@/assets/trouwboekje-marcel-magdalena.jpg";
import marcelVideo from "@/assets/marcel-magdalena-ai-video-1.mp4";
import magdalenaVideo from "@/assets/marcel-magdalena-ai-video-2.mp4";

const Grootouders = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const content = {
    nl: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Grootouders • Peter en Grote Meter",
      sectionNumber: "8",
      intro: "Vanaf hier wordt het familieverhaal veel persoonlijker doordat de oude foto's en documenten kunnen aangevuld worden met heel wat eigen herinneringen aan zelf beleefde gesprekken en gebeurtenissen.",
      tradition: "Als oudste kleinkind kreeg ik naar oude gewoonte mijn vader's vader als dooppeter, en mijn moeder's moeder als meter. Bij mijn geboorte in 1946 was de aloude traditie om de eerste kleinzoon ook de naam van de grootvader te geven niet meer gangbaar: in die periode was het algemeen gebruik van toepassing dat de ouders vrijuit een voornaam kozen, maar dan wel een tweede en derde voornaam eraan toevoegden: de namen van de peter en meter. Mijn tweede voornaam is dan ook Marcel.",
      naming: "Zodra ik kon spreken werd mij aangeleerd om mijn grootouders met Peter en Meter aan te spreken. Die termen waren in de familie ook de gebruikelijke aanspreekvorm van alle grootouders – de woorden Opa en Oma waren in Izegem in die tijd nog niet in zwang en de aanspreekvorm 'Pépé' en 'Mémé', die in andere gezinnen destijds ook vrij gebruikelijk was, vonden mijn ouders dan weer te belachelijk. Probleem: ik had twee grootmoeders. Als kleuter heb ik ze intuïtief onderscheiden.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Ingekleurd met AI",
      interiorCaption: "Peter en Meter in hun interieur",
      peterMeterPortretCaption: "Marcel Deforce en Magdalena Geldof",
      trouwboekjeCaption: "Trouwboekje van Marcel August Deforce en Magdalena Geldof — Stad Iseghem, 9 januari 1918. Kerkelijk huwelijk op 10 januari 1918.",
      familyTreeTitle: "Stamboom Marcel Deforce",
      familyTreeCaption: "Klik om te vergroten",
      closeFullscreen: "Sluiten",
    },
    fr: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Grands-parents • Parrain et Grande Marraine",
      sectionNumber: "8",
      intro: "À partir d'ici, l'histoire familiale devient beaucoup plus personnelle car les vieilles photos et documents peuvent être complétés par de nombreux souvenirs personnels de conversations et d'événements vécus.",
      tradition: "En tant que petit-fils aîné, selon la vieille coutume, j'ai eu le père de mon père comme parrain et la mère de ma mère comme marraine. À ma naissance en 1946, la tradition séculaire de donner au premier petit-fils le nom du grand-père n'était plus courante : à cette époque, il était d'usage que les parents choisissent librement un prénom, mais y ajoutent un deuxième et troisième prénom : les noms du parrain et de la marraine. Mon deuxième prénom est donc Marcel.",
      naming: "Dès que j'ai pu parler, on m'a appris à appeler mes grands-parents Parrain et Marraine. Ces termes étaient aussi la forme d'adresse habituelle pour tous les grands-parents dans la famille – les mots Opa et Oma n'étaient pas encore en usage à Izegem à cette époque, et la forme d'adresse 'Pépé' et 'Mémé', qui était assez courante dans d'autres familles à l'époque, mes parents la trouvaient trop ridicule.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Colorisé par IA",
      interiorCaption: "Parrain et Marraine dans leur intérieur",
      peterMeterPortretCaption: "Marcel Deforce et Magdalena Geldof",
      trouwboekjeCaption: "Livret de mariage de Marcel August Deforce et Magdalena Geldof — Ville d'Iseghem, 9 janvier 1918. Mariage religieux le 10 janvier 1918.",
      familyTreeTitle: "Arbre généalogique de Marcel Deforce",
      familyTreeCaption: "Cliquez pour agrandir",
      closeFullscreen: "Fermer",
    },
    en: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Grandparents • Godfather and Great Godmother",
      sectionNumber: "8",
      intro: "From here, the family story becomes much more personal as the old photos and documents can be supplemented with many personal memories of conversations and events I experienced myself.",
      tradition: "As the eldest grandchild, according to old custom, I received my father's father as godfather and my mother's mother as godmother. At my birth in 1946, the ancient tradition of giving the first grandson the grandfather's name was no longer common: at that time, the general practice was that parents freely chose a first name, but added a second and third name: the names of the godfather and godmother. My middle name is therefore Marcel.",
      naming: "As soon as I could speak, I was taught to address my grandparents as Godfather and Godmother. These terms were also the customary form of address for all grandparents in the family – the words Grandpa and Grandma were not yet in use in Izegem at that time, and the form of address 'Pépé' and 'Mémé', which was quite common in other families at the time, my parents found too ridiculous.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Colorized with AI",
      interiorCaption: "Godfather and Godmother in their living room",
      peterMeterPortretCaption: "Marcel Deforce and Magdalena Geldof",
      trouwboekjeCaption: "Marriage booklet of Marcel August Deforce and Magdalena Geldof — City of Iseghem, January 9, 1918. Church wedding on January 10, 1918.",
      familyTreeTitle: "Family Tree of Marcel Deforce",
      familyTreeCaption: "Click to enlarge",
      closeFullscreen: "Close",
    },
    de: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Großeltern • Patenonkel und Große Patentante",
      sectionNumber: "8",
      intro: "Ab hier wird die Familiengeschichte viel persönlicher, da die alten Fotos und Dokumente durch viele eigene Erinnerungen an selbst erlebte Gespräche und Ereignisse ergänzt werden können.",
      tradition: "Als ältester Enkel erhielt ich nach alter Sitte den Vater meines Vaters als Paten und die Mutter meiner Mutter als Patin. Bei meiner Geburt 1946 war die uralte Tradition, dem ersten Enkel den Namen des Großvaters zu geben, nicht mehr üblich: In dieser Zeit war es allgemein üblich, dass die Eltern frei einen Vornamen wählten, aber einen zweiten und dritten Namen hinzufügten: die Namen des Paten und der Patin. Mein zweiter Vorname ist daher Marcel.",
      naming: "Sobald ich sprechen konnte, wurde mir beigebracht, meine Großeltern als Pater und Meter anzusprechen. Diese Begriffe waren in der Familie auch die übliche Anrede für alle Großeltern – die Worte Opa und Oma waren in Izegem zu dieser Zeit noch nicht gebräuchlich.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Mit KI koloriert",
      interiorCaption: "Patenonkel und Patentante in ihrem Interieur",
      peterMeterPortretCaption: "Marcel Deforce und Magdalena Geldof",
      trouwboekjeCaption: "Heiratsbuch von Marcel August Deforce und Magdalena Geldof — Stadt Iseghem, 9. Januar 1918. Kirchliche Trauung am 10. Januar 1918.",
      familyTreeTitle: "Stammbaum von Marcel Deforce",
      familyTreeCaption: "Klicken zum Vergrößern",
      closeFullscreen: "Schließen",
    },
    es: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Abuelos • Padrino y Gran Madrina",
      sectionNumber: "8",
      intro: "A partir de aquí, la historia familiar se vuelve mucho más personal, ya que las viejas fotos y documentos pueden complementarse con muchos recuerdos personales de conversaciones y eventos vividos.",
      tradition: "Como nieto mayor, según la antigua costumbre, recibí al padre de mi padre como padrino y a la madre de mi madre como madrina. En mi nacimiento en 1946, la antigua tradición de dar al primer nieto el nombre del abuelo ya no era común: en ese período era práctica general que los padres eligieran libremente un nombre, pero añadieran un segundo y tercer nombre: los nombres del padrino y la madrina. Mi segundo nombre es por tanto Marcel.",
      naming: "Tan pronto como pude hablar, me enseñaron a dirigirme a mis abuelos como Padrino y Madrina. Estos términos también eran la forma habitual de dirigirse a todos los abuelos en la familia.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Coloreado con IA",
      interiorCaption: "Padrino y Madrina en su interior",
      peterMeterPortretCaption: "Marcel Deforce y Magdalena Geldof",
      trouwboekjeCaption: "Libreta de matrimonio de Marcel August Deforce y Magdalena Geldof — Ciudad de Iseghem, 9 de enero de 1918. Boda religiosa el 10 de enero de 1918.",
      familyTreeTitle: "Árbol genealógico de Marcel Deforce",
      familyTreeCaption: "Haga clic para ampliar",
      closeFullscreen: "Cerrar",
    },
    vls: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Grootouders • Peter en Grote Meter",
      sectionNumber: "8",
      intro: "Vanoaf ier wordt 't familieverhaal vele persoonlijker omdak de oude foto's en documenten kunn'n oangevuld wordn me heel wuk eige herinneringen oan zelf beleefde gesprekken en gebeurtenissen.",
      tradition: "Ols oudste kleinkind kreeg 'k noar oude gewoonte mijn vaders vader ols dooppeter, en mijn moeders moeder ols meter. Bie mijn geboorte in 1946 wos de ouwe traditie om den eerste kleinzôon ook de noame van den grootvader te geven nie me gangboar.",
      naming: "Zodra da'k kost klappn wier me geleerd voe mijn grootouders mee Peter en Meter oan te spreken. Die woorden woarn in de familie ook de gebruikelijke oanspreekvorm voa alle grootouders – de woorden Opa en Oma woarn in Izegem in die tied nog nie in zwang.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Ingekleurd me AI",
      interiorCaption: "Peter en Meter in hunder interieur",
      peterMeterPortretCaption: "Marcel Deforce en Magdalena Geldof",
      trouwboekjeCaption: "Trouwboekje van Marcel August Deforce en Magdalena Geldof — Stad Iseghem, 9 januari 1918. Kerkelijk huwelijk op 10 januari 1918.",
      familyTreeTitle: "Stamboom van Marcel Deforce",
      familyTreeCaption: "Klik voe te vergrotn",
      closeFullscreen: "Slutn",
    },
    pcd: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Grands-parinds • Pèrin et Grand'Mérin",
      sectionNumber: "8",
      intro: "À partir d'ichi, l'histouère d'famile ale devient biacop pus parsonnelle pasqué chés vieus portraits et documints peuv'nt ête complétés aveuc biacop d'souvnirs parsonnels d'conversations et d'évén'mints qu'j'ai véquus mi-même.",
      tradition: "Comme l'pu vieus d'chés tiots-éfants, slon l'vieusse coutume, j'ai r'chu min grand-pèr du côté d'min pèr comme pèrin, et l'mèr ed' ma mèr comme mérin.",
      naming: "Aussitôt qu'j'ai pu parler, on m'a appris à appeler mes grands-parinds Pèrin et Mérin. Chés mots-là étoétent aussi l'forme d'adresse habituelle pour tous chés grands-parinds dins l'famile.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Colorisé par IA",
      interiorCaption: "Pèrin et Mérin dins leu intérieur",
      peterMeterPortretCaption: "Marcel Deforce et Magdalena Geldof",
      trouwboekjeCaption: "Livret d'mariage ed Marcel August Deforce et Magdalena Geldof — Vile d'Iseghem, 9 janvié 1918. Mariage à l'église l'10 janvié 1918.",
      familyTreeTitle: "Arbe généalogique ed Marcel Deforce",
      familyTreeCaption: "Cliquez pour agrandir",
      closeFullscreen: "Fermer",
    },
    sv: {
      title: "Marcel Deforce & Magdalena Geldof",
      subtitle: "Morföräldrar • Gudfar och Stora Gudmor",
      sectionNumber: "8",
      intro: "Härifrån blir familjehistorien mycket mer personlig eftersom de gamla fotografierna och dokumenten kan kompletteras med många egna minnen av samtal och händelser jag själv upplevt.",
      tradition: "Som äldsta barnbarn fick jag enligt gammal sed min fars far som gudfar och min mors mor som gudmor. Vid min födelse 1946 var den urgamla traditionen att ge förste sonsonen farfars namn inte längre bruklig: under denna period var det allmänt bruk att föräldrarna fritt valde ett förnamn, men lade till ett andra och tredje namn: gudföräldrarnas namn. Mitt mellannamn är därför Marcel.",
      naming: "Så snart jag kunde tala lärdes jag att tilltala mina morföräldrar som Peter och Meter. Dessa termer var också den vanliga tilltalssformen för alla morföräldrar i familjen – orden Farfar och Farmor var ännu inte i bruk i Izegem vid den tiden.",
      marcelLabel: "Marcel Deforce",
      marcelYears: "1893–1983",
      magdalenaLabel: "Magdalena Geldof",
      magdalenaYears: "1897–1971",
      aiColorized: "Färglagd med AI",
      interiorCaption: "Gudfar och Gudmor i sitt vardagsrum",
      peterMeterPortretCaption: "Marcel Deforce och Magdalena Geldof",
      trouwboekjeCaption: "Vigselbok för Marcel August Deforce och Magdalena Geldof — Stad Iseghem, 9 januari 1918. Kyrklig vigsel den 10 januari 1918.",
      familyTreeTitle: "Släktträd för Marcel Deforce",
      familyTreeCaption: "Klicka för att förstora",
      closeFullscreen: "Stäng",
    },
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <section
      id="grootouders"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">{t.sectionNumber}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          <div className="mt-4">
            <ShareButton sectionId="grootouders" />
          </div>
        </motion.div>

        {/* Portraits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="text-center">
            <div 
              className="relative inline-block cursor-pointer group"
              onClick={() => setActiveVideo(marcelVideo)}
            >
              <img
                src={portretMarcel}
                alt={t.marcelLabel}
                className="w-64 h-auto mx-auto rounded-lg shadow-elevated group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/30">
                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
                  <Play className="w-4 h-4" />
                  <span>{language === 'en' ? 'Watch AI video' : language === 'fr' ? 'Voir vidéo IA' : 'Bekijk AI-video'}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 italic mt-2">{t.aiColorized}</p>
            <h3 className="font-serif text-xl text-primary mt-2">{t.marcelLabel}</h3>
            <p className="text-muted-foreground">{t.marcelYears}</p>
            <p className="text-sm text-accent mt-1">Peter</p>
          </div>
          <div className="text-center">
            <div 
              className="relative inline-block cursor-pointer group"
              onClick={() => setActiveVideo(magdalenaVideo)}
            >
              <img
                src={portretMagdalena}
                alt={t.magdalenaLabel}
                className="w-64 h-auto mx-auto rounded-lg shadow-elevated group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/30">
                <div className="bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
                  <Play className="w-4 h-4" />
                  <span>{language === 'en' ? 'Watch AI video' : language === 'fr' ? 'Voir vidéo IA' : 'Bekijk AI-video'}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 italic mt-2">{t.aiColorized}</p>
            <h3 className="font-serif text-xl text-primary mt-2">{t.magdalenaLabel}</h3>
            <p className="text-muted-foreground">{t.magdalenaYears}</p>
            <p className="text-sm text-accent mt-1">Grote Meter</p>
          </div>
        </motion.div>

        {/* Interior Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-12"
        >
          <figure className="text-center">
            <img
              src={interieurPeterMeter}
              alt={t.interiorCaption}
              className="w-full max-w-3xl mx-auto rounded-lg shadow-elevated"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground italic">
              {t.interiorCaption}
            </figcaption>
            <p className="text-xs text-muted-foreground/60 italic mt-1">{t.aiColorized}</p>
          </figure>
        </motion.div>

        {/* Peter & Meter portret */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <figure className="text-center max-w-2xl mx-auto">
            <ImageComparisonSlider
              leftImage={peterMeterPortret}
              rightImage={peterMeterPortretColor}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground italic">
              {t.peterMeterPortretCaption}
            </figcaption>
          </figure>
        </motion.div>

        {/* Trouwboekje */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex justify-center"
        >
          <figure className="text-center max-w-md">
            <img
              src={trouwboekje}
              alt={t.trouwboekjeCaption}
              className="w-full rounded-lg shadow-elevated"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground italic">
              {t.trouwboekjeCaption}
            </figcaption>
          </figure>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-lg max-w-3xl mx-auto text-foreground/80 space-y-6"
        >
          <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            {t.intro}
          </p>

          <div className="p-6 bg-card border border-border rounded-lg">
            <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              {language === 'nl' ? 'Peter en Meter' : 
               language === 'fr' ? 'Parrain et Marraine' :
               language === 'de' ? 'Patenonkel und Patentante' :
               language === 'es' ? 'Padrino y Madrina' :
               language === 'vls' ? 'Peter en Meter' :
               language === 'pcd' ? 'Pèrin et Mérin' :
               language === 'sv' ? 'Gudfar och Gudmor' :
               'Godfather and Godmother'}
            </h4>
            <p className="text-foreground/80 mb-4">{t.tradition}</p>
          </div>

          <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
            <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
              <Home className="w-4 h-4" />
              {language === 'nl' ? 'Aanspreekvorm' : 
               language === 'fr' ? 'Forme d\'adresse' :
               language === 'de' ? 'Anredeform' :
               language === 'es' ? 'Forma de tratamiento' :
               language === 'vls' ? 'Oanspreekvorm' :
               language === 'pcd' ? 'Forme d\'adresse' :
               language === 'sv' ? 'Tilltalssätt' :
               'Form of address'}
            </h4>
            <p className="text-foreground/80">{t.naming}</p>
          </div>
        </motion.div>

        {/* Family Tree - Horizontal with Fullscreen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-12"
        >
          <h3 className="font-serif text-2xl text-primary text-center mb-6 flex items-center justify-center gap-2">
            <GitBranch className="w-5 h-5" />
            {t.familyTreeTitle}
          </h3>
          <div className="relative group">
            <div 
              className="cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            >
              <ImageMagnifier
                src={stamboomMarcel}
                alt={t.familyTreeTitle}
                className="overflow-x-auto"
                imgClassName="w-full h-auto rounded-lg shadow-elevated min-w-[800px] md:min-w-0"
                rotation={180}
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-sm">{t.familyTreeCaption}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Marcel Biography */}
        <MarcelBiografie />
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label={t.closeFullscreen}
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="w-full h-full overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={stamboomMarcel}
              alt={t.familyTreeTitle}
              className="max-w-none h-auto max-h-[90vh] object-contain rotate-180"
              style={{ minWidth: '1200px' }}
            />
          </div>
        </motion.div>
      )}
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
              aria-label={t.closeFullscreen}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 text-white rounded px-2 py-1 z-10 text-xs">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'Animated with AI' : language === 'fr' ? 'Animé par IA' : language === 'de' ? 'Animiert mit KI' : 'Geanimeerd met AI'}</span>
              </div>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Grootouders;
