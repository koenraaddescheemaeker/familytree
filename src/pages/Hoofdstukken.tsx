import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";

type Summary = { nl: string; en?: string; fr?: string };

type Chapter = { id: string; titleKey: string; route?: string; summary: Summary };

const chapters: Chapter[] = [
  {
    id: "voorwoord",
    titleKey: "nav.voorwoord",
    summary: {
      nl: "Waarom dit familieverhaal werd geschreven, door wie, en hoe het onderzoek is opgebouwd.",
      en: "Why this family story was written, by whom, and how the research was built up.",
      fr: "Pourquoi cette histoire familiale a été écrite, par qui, et comment la recherche est structurée.",
    },
  },
  {
    id: "tijdlijn",
    titleKey: "nav.tijdlijn",
    summary: {
      nl: "Een chronologisch overzicht van de belangrijkste gebeurtenissen in de familiegeschiedenis Deforce.",
      en: "A chronological overview of the key events in the Deforce family history.",
      fr: "Un aperçu chronologique des événements majeurs de l'histoire familiale Deforce.",
    },
  },
  {
    id: "zoektocht",
    titleKey: "nav.zoektocht",
    summary: {
      nl: "De speurtocht door archieven, parochieregisters en online bronnen naar de oudste sporen van de familie.",
      en: "The search through archives, parish registers and online sources for the family's oldest traces.",
      fr: "La recherche dans les archives, registres paroissiaux et sources en ligne des traces les plus anciennes.",
    },
  },
  {
    id: "kaart",
    titleKey: "nav.kaart",
    summary: {
      nl: "Interactieve kaart met de plaatsen waar de familie woonde, werkte en trouwde.",
      en: "Interactive map with the places where the family lived, worked and married.",
      fr: "Carte interactive des lieux où la famille a vécu, travaillé et s'est mariée.",
    },
  },
  {
    id: "stamouders",
    titleKey: "nav.stamouders",
    summary: {
      nl: "Bauduin Deleforge en de vroegste generaties: de wortels van de familie in Noord-Frankrijk.",
      en: "Bauduin Deleforge and the earliest generations: the family's roots in northern France.",
      fr: "Bauduin Deleforge et les premières générations : les racines familiales dans le Nord.",
    },
  },
  {
    id: "oorlogen",
    titleKey: "nav.oorlogen",
    summary: {
      nl: "Hoe oorlogen en bezettingen het leven van opeenvolgende generaties tekenden.",
      en: "How wars and occupations marked the lives of successive generations.",
      fr: "Comment les guerres et occupations ont marqué les générations successives.",
    },
  },
  {
    id: "oorlogskaart",
    titleKey: "nav.oorlogskaart",
    summary: {
      nl: "Kaartbeeld van fronten, vluchtroutes en plaatsen die de familie tijdens de oorlogen beleefde.",
      en: "Map of fronts, escape routes and places the family experienced during the wars.",
      fr: "Carte des fronts, routes de fuite et lieux vécus par la famille pendant les guerres.",
    },
  },
  {
    id: "vakmanschap",
    titleKey: "nav.vakmanschap",
    summary: {
      nl: "Ambachten en beroepen: van smid en wever tot meubelmaker en borstelfabrikant.",
      en: "Crafts and trades: from smith and weaver to furniture maker and brush manufacturer.",
      fr: "Métiers et artisanat : du forgeron et tisserand au menuisier et fabricant de brosses.",
    },
  },
  {
    id: "charles-louis",
    titleKey: "nav.charles-louis",
    summary: {
      nl: "Het leven van Charles Louis Deforce, scharnierfiguur tussen Frankrijk en Vlaanderen.",
      en: "The life of Charles Louis Deforce, a pivotal figure between France and Flanders.",
      fr: "La vie de Charles Louis Deforce, figure charnière entre la France et la Flandre.",
    },
  },
  {
    id: "emile-geldof",
    titleKey: "nav.emile-geldof",
    summary: {
      nl: "Emile Geldof en zijn tak van de familie, met stamboom en archiefstukken.",
      en: "Emile Geldof and his branch of the family, with family tree and archive documents.",
      fr: "Emile Geldof et sa branche familiale, avec arbre généalogique et documents d'archives.",
    },
  },
  {
    id: "grootouders",
    titleKey: "nav.grootouders",
    summary: {
      nl: "Marcel Deforce en Magdalena: het centrale voorouderpaar, gehuwd in 1918, met 112 afstammelingen.",
      en: "Marcel Deforce and Magdalena: the central ancestral couple, married in 1918, with 112 descendants.",
      fr: "Marcel Deforce et Magdalena : le couple ancestral central, mariés en 1918, 112 descendants.",
    },
  },
  {
    id: "familiebedrijf",
    titleKey: "nav.familiebedrijf",
    summary: {
      nl: "Opkomst, bloei en verval van het familiebedrijf, met advertenties en bedrijfsdocumenten.",
      en: "Rise, heyday and decline of the family business, with advertisements and company documents.",
      fr: "Essor, apogée et déclin de l'entreprise familiale, avec publicités et documents.",
    },
  },
  {
    id: "ouders",
    titleKey: "nav.ouders",
    summary: {
      nl: "Jooris (Georges) Deforce en Simonne Vandeputte: oorlogsjaren, Goslar, het nieuwe huis, elf kinderen, haar engagement en de Bosseniers.",
      en: "Jooris (Georges) Deforce and Simonne Vandeputte: war years, Goslar, the new house, eleven children, her engagement and the Bosseniers guild.",
      fr: "Jooris (Georges) Deforce et Simonne Vandeputte : années de guerre, Goslar, la nouvelle maison, onze enfants et la gilde des Bosseniers.",
    },
  },
  {
    id: "verschaeve",
    titleKey: "nav.verschaeve",
    summary: {
      nl: "De familie Verschaeve en haar verwevenheid met de Deforce-lijn.",
      en: "The Verschaeve family and its ties with the Deforce line.",
      fr: "La famille Verschaeve et ses liens avec la lignée Deforce.",
    },
  },
  {
    id: "dna-onderzoek",
    titleKey: "nav.dna",
    summary: {
      nl: "Wat DNA-matches toevoegen aan het papieren onderzoek, met anekdotes en verrassende verbanden.",
      en: "What DNA matches add to the paper research, with anecdotes and surprising links.",
      fr: "Ce que les correspondances ADN ajoutent à la recherche papier, avec anecdotes et liens surprenants.",
    },
  },
  {
    id: "generaties",
    titleKey: "nav.generaties",
    summary: {
      nl: "Generatie na generatie naast elkaar gezet in één doorlopende tijdlijn.",
      en: "Generation after generation placed side by side in one continuous timeline.",
      fr: "Génération après génération dans une seule chronologie continue.",
    },
  },
  {
    id: "picardisch",
    titleKey: "nav.picardisch",
    summary: {
      nl: "Het Picardisch (Ch'ti) dialect van de streek van herkomst, met woordenboek en klankvoorbeelden.",
      en: "The Picard (Ch'ti) dialect of the region of origin, with dictionary and sound samples.",
      fr: "Le picard (ch'ti) de la région d'origine, avec dictionnaire et exemples sonores.",
    },
  },
  {
    id: "galerij",
    titleKey: "nav.galerij",
    summary: {
      nl: "De volledige fotogalerij met genummerde, gedateerde en beschreven familiefoto's.",
      en: "The full photo gallery with numbered, dated and captioned family photographs.",
      fr: "La galerie photo complète, numérotée, datée et légendée.",
    },
  },
  {
    id: "historische-kaart",
    titleKey: "nav.historischeKaart",
    summary: {
      nl: "Historische kaarten naast het hedendaagse landschap, met vergelijkingsschuiver.",
      en: "Historical maps next to today's landscape, with comparison slider.",
      fr: "Cartes historiques face au paysage actuel, avec curseur de comparaison.",
    },
  },
  {
    id: "mandelvallei",
    titleKey: "nav.mandelvallei",
    summary: {
      nl: "De Mandelvallei als decor van het dagelijks leven, nijverheid en verhuizingen.",
      en: "The Mandel valley as the setting of daily life, industry and moves.",
      fr: "La vallée de la Mandel, cadre de la vie quotidienne et de l'industrie.",
    },
  },
  {
    id: "izegem-tijdlijn",
    titleKey: "nav.izegemTijdlijn",
    summary: {
      nl: "Izegem door de eeuwen heen: de stad waarin het familieverhaal zich grotendeels afspeelt.",
      en: "Izegem through the centuries: the town where most of the family story takes place.",
      fr: "Izegem à travers les siècles : la ville où se déroule l'essentiel du récit.",
    },
  },
  {
    id: "burgemeesters",
    titleKey: "nav.burgemeesters",
    summary: {
      nl: "De burgemeesters van Izegem en hun rol in de lokale context van de familie.",
      en: "The mayors of Izegem and their role in the family's local context.",
      fr: "Les bourgmestres d'Izegem et leur rôle dans le contexte local.",
    },
  },
  {
    id: "stamboom",
    titleKey: "nav.stamboom",
    summary: {
      nl: "De interactieve stamboom om door alle generaties en takken te navigeren.",
      en: "The interactive family tree to navigate all generations and branches.",
      fr: "L'arbre généalogique interactif pour parcourir générations et branches.",
    },
  },
  {
    id: "gedcom-import",
    titleKey: "nav.gedcomImport",
    summary: {
      nl: "Alle afstammelingen van Bauduin Deleforge en de voorouders van Marc Deforce, uit de GEDCOM-data.",
      en: "All descendants of Bauduin Deleforge and the ancestors of Marc Deforce, from the GEDCOM data.",
      fr: "Tous les descendants de Bauduin Deleforge et les ancêtres de Marc Deforce, d'après le GEDCOM.",
    },
  },
  {
    id: "videos",
    titleKey: "nav.videos",
    summary: {
      nl: "Videogalerij met bewegende beelden, interviews en geanimeerde archieffoto's.",
      en: "Video gallery with moving images, interviews and animated archive photos.",
      fr: "Galerie vidéo : images animées, entretiens et photos d'archives animées.",
    },
  },
  {
    id: "familie",
    titleKey: "nav.bijlagen",
    summary: {
      nl: "Bijlagen: aanvullende documenten, lijsten en verantwoording bij het onderzoek.",
      en: "Appendices: supplementary documents, lists and research notes.",
      fr: "Annexes : documents complémentaires, listes et notes de recherche.",
    },
  },
  {
    id: "grootouderboek",
    titleKey: "nav.grootouderboek",
    route: "/grootouderboek",
    summary: {
      nl: "Het manuscript van Simonne Vandeputte: herinneringen aan haar jeugd, de oorlog en het gezinsleven.",
      en: "The manuscript by Simonne Vandeputte: memories of her youth, the war and family life.",
      fr: "Le manuscrit de Simonne Vandeputte : souvenirs de sa jeunesse, de la guerre et de la vie familiale.",
    },
  },
  {
    id: "bronnen",
    titleKey: "nav.bronnen",
    summary: {
      nl: "Alle geraadpleegde archieven, boeken, websites en getuigenissen.",
      en: "All archives, books, websites and testimonies consulted.",
      fr: "Toutes les archives, livres, sites et témoignages consultés.",
    },
  },
  {
    id: "quiz",
    titleKey: "nav.quiz",
    summary: {
      nl: "Test je kennis van de familiegeschiedenis met vragen per hoofdstuk.",
      en: "Test your knowledge of the family history with questions per chapter.",
      fr: "Testez vos connaissances avec des questions par chapitre.",
    },
  },
  {
    id: "spellen",
    titleKey: "nav.spellen",
    summary: {
      nl: "Spellen rond de stamboom, foto's, dialect en tijdlijn — leren door te spelen.",
      en: "Games around the family tree, photos, dialect and timeline — learning by playing.",
      fr: "Jeux autour de l'arbre, des photos, du dialecte et de la chronologie.",
    },
  },
  {
    id: "gastboek",
    titleKey: "nav.gastenboek",
    summary: {
      nl: "Laat een bericht na of lees reacties van andere familieleden en bezoekers.",
      en: "Leave a message or read reactions from other relatives and visitors.",
      fr: "Laissez un message ou lisez les réactions d'autres visiteurs.",
    },
  },
  {
    id: "contact",
    titleKey: "nav.contact",
    summary: {
      nl: "Aanvullingen, correcties of foto's? Neem contact op met de auteurs.",
      en: "Additions, corrections or photos? Get in touch with the authors.",
      fr: "Ajouts, corrections ou photos ? Contactez les auteurs.",
    },
  },
];

const ui = {
  title: {
    nl: "Hoofdstukoverzicht", en: "Chapter overview", fr: "Aperçu des chapitres",
    es: "Índice de capítulos", de: "Kapitelübersicht", sv: "Kapitelöversikt",
    pcd: "Aperchu dés capitres", vls: "Hoofdstukoverzicht",
  } as Record<string, string>,
  intro: {
    nl: "Alle hoofdstukken van de familiegeschiedenis Deforce in één oogopslag, met een korte samenvatting en een directe link.",
    en: "All chapters of the Deforce family history at a glance, with a short summary and a direct link.",
    fr: "Tous les chapitres de l'histoire familiale Deforce en un coup d'œil, avec un résumé et un lien direct.",
    es: "Todos los capítulos de la historia familiar Deforce de un vistazo, con resumen y enlace directo.",
    de: "Alle Kapitel der Familiengeschichte Deforce auf einen Blick, mit Kurzfassung und Direktlink.",
    sv: "Alla kapitel i släkthistorien Deforce i en översikt, med sammanfattning och direktlänk.",
    pcd: "Tous chés capitres d'l'histoère d'el famile Deforce, avec un p'tit résumé pi un lien.",
    vls: "Alle hoofdstukken van 't familieverhoal in ien oogopslag, mè e korte samenvattienge en e directe link.",
  } as Record<string, string>,
  back: {
    nl: "Terug naar de startpagina", en: "Back to home", fr: "Retour à l'accueil",
    es: "Volver al inicio", de: "Zurück zur Startseite", sv: "Tillbaka till startsidan",
    pcd: "Ertour à l'accueil", vls: "Were noar 't begin",
  } as Record<string, string>,
  read: {
    nl: "Lees hoofdstuk", en: "Read chapter", fr: "Lire le chapitre",
    es: "Leer capítulo", de: "Kapitel lesen", sv: "Läs kapitlet",
    pcd: "Lire el capitre", vls: "Lees 't hoofdstuk",
  } as Record<string, string>,
};

const pick = (map: Record<string, string>, lang: string) => map[lang] ?? map.nl;
const pickSummary = (s: Summary, lang: string) =>
  lang === "en" || lang === "de" || lang === "sv" || lang === "es"
    ? s.en ?? s.nl
    : lang === "fr" || lang === "pcd"
      ? s.fr ?? s.nl
      : s.nl;

const Hoofdstukken = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${pick(ui.title, language)} — Deforce familiegeschiedenis`;
    return () => {
      document.title = prevTitle;
    };
  }, [language]);

  const goTo = (chapter: Chapter) => {
    if (chapter.route) {
      navigate(chapter.route);
      return;
    }
    navigate(`/#${chapter.id}`);
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(chapter.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 40) {
        setTimeout(tick, 150);
      }
    };
    setTimeout(tick, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollToTop />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {pick(ui.back, language)}
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-7 h-7 text-primary" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {pick(ui.title, language)}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {pick(ui.intro, language)}
          </p>
        </header>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => goTo(chapter)}
                className="group h-full w-full text-left flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-elevated hover:border-primary/50 transition-all"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-primary/80 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {t(chapter.titleKey)}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {pickSummary(chapter.summary, language)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-1">
                  {pick(ui.read, language)}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export default Hoofdstukken;
