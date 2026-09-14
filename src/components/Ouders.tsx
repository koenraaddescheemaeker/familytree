import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, X, BookOpen, Home, Users, Target, Sparkles, FileText } from "lucide-react";
import ReadMore from "@/components/ui/ReadMore";
import ShareButton from "@/components/ui/ShareButton";

import georgesPortret from "@/assets/georges-portret.jpg";
import simonnePortret from "@/assets/simonne-portret.jpg";
import diplomaAutoVoerder from "@/assets/diploma-auto-voerder.jpg";
import ouderlijkHuis from "@/assets/ouderlijk-huis-roeselaarsestraat.jpg";
import georgesSimonneJong from "@/assets/georges-simonne-jong.jpg";
import roeiclubKano from "@/assets/roeiclub-kano.jpg";
import attestLuchtbescherming from "@/assets/attest-luchtbescherming.jpg";
import treinticketGoslar from "@/assets/treinticket-goslar.jpg";
import huwelijk1945 from "@/assets/huwelijk-1945.jpg";
import huisPrincessestraat from "@/assets/huis-princessestraat.jpg";
import kinderenTuin from "@/assets/kinderen-tuin.jpg";
import lidkaartenCollage from "@/assets/lidkaarten-collage.jpg";
import advertentieSportwinkel from "@/assets/advertentie-sportwinkel.jpg";
import dagboekNieuwHuis from "@/assets/dagboek-ons-nieuw-huis.jpg";
import bouwNieuwHuis from "@/assets/bouw-nieuw-huis.jpg";
import ksaActiviteit from "@/assets/ksa-activiteit.jpg";
import gezinsraad1965 from "@/assets/stedelijke-gezinsraad-1965.jpg";
import reisKopenhagen from "@/assets/reis-kopenhagen.jpg";
import koningBosseniers from "@/assets/koning-bosseniers.jpg";
import ordePapegay from "@/assets/orde-van-de-papegay.jpg";

const kinderen = [
  { naam: "Jan (Jan Emiel Louis)", jaren: "°11/11/1945 – †21/03/1946" },
  { naam: "Marc (Marc Marcel Frans)", jaren: "°22/12/1946" },
  { naam: "Luc (Luc Norbert Leopold)", jaren: "°19/04/1948 – †24/08/2024" },
  { naam: "Geert (Geert Marie Lucien)", jaren: "°21/05/1949 – †26/01/2009" },
  { naam: "Ann (Anna-Maria Elisabeth Andrea)", jaren: "°22/07/1950" },
  { naam: "Hans (Hans Daniël Jozef)", jaren: "°31/03/1952" },
  { naam: "Rosemie (Rose-Marie Lucrèce)", jaren: "°21/06/1953" },
  { naam: "Kathy (Marie-Kathelijn Hendrika Francine)", jaren: "°9/11/1954 – †19/10/1999" },
  { naam: "Beatrijs (Beatrix Nicole)", jaren: "°6/12/1955 – †22/01/1957" },
  { naam: "Leen (Marie-Marleen Véronique Bérénice)", jaren: "°18/04/1958" },
  { naam: "Karien (Karina Félice Micheline)", jaren: "°20/01/1962" },
];

const grootouderboek = [
  {
    vraag: "Waar, wanneer en onder welke omstandigheden bent u geboren?",
    antwoord: "Op 18 September 1929 werd ik geboren in Izegem, in een huis nr 325 in de Roeselaarsestraat als tweede meisje in ons gezin waar ze eigenlijk een jongen verwachtten.",
  },
  {
    vraag: "Welke namen kreeg u? Was u naar iemand vernoemd?",
    antwoord: "Op het stadhuis werd ik aangegeven als Adèle op dwingend verzoek van mijn Meter, maar mijn Moeder doopte mij tot Simonne.",
  },
  {
    vraag: "Hoe heetten uw ouders en wat was hun beroep?",
    antwoord: "Vader was geboren te Izegem uit een groot gezin; Norbert Vandeputte, zoon van Emiel Vandeputte en Adèle Dedaele. Na het teloorgaan van de borstelfabriek werd hij winkelier-haarkapper. Moeder, geboren te Emelgem, was schoenstikster en werd prima winkelierster.",
  },
  {
    vraag: "Had u broers en zusters?",
    antwoord: "Een meisje werd 2½ jaar vóór mij geboren, genaamd Elisabeth, wat tot Elza verkort werd. Dan waren er nog tweemaal doodgeboren jongetjes na mij; dit had wel een grote nawerking op ons gezin, wij hadden allemaal zo graag een jongetje gehad.",
  },
  {
    vraag: "Was het gezellig thuis?",
    antwoord: "Vader was muzikant, speelde klarinet en saxofoon, was ook in een zangkoor en in de eerste toneelgroep die in Izegem opgericht werd. Moeder kon heel goed zingen. Er werd bij ons wel gezongen en iets opgevoerd, maar de enige concerten die wij konden bijwonen was de zondagnamiddag op een kiosk op de Grote Markt in de zomer.",
  },
  {
    vraag: "Welke rol speelde godsdienst in het gezinsleven?",
    antwoord: "Mijn Vader was een voorvechter van het socialisme omwille van sociale bewogenheid en voor de gelijkheid van de arbeidersklasse (Anseele, Van Acker, priester Daens). Ons Moeder was zeer vroom-katholiek; bijgevolg hadden wij de twee uitersten in ons gezin. Mijn zuster is atheïst geworden en ik een zeer katholiek kind.",
  },
  {
    vraag: "Waren uw ouders arm of rijk?",
    antwoord: "Mijn ouders waren hardwerkende middenstanders, wij hadden dus een zekere welstand door hun ijver. Doch toen ik bijna 16 was brak de oorlog uit, 10 mei 1940, en toen lag ons leven ondersteboven. Voor mij was het een diepaangrijpende ervaring, zodat ik niet studeren kon (financieel niet mogelijk). Het waren zeer triestige jaren 1940-45, echte hongerwinters.",
  },
  {
    vraag: "Deed u aan sport?",
    antwoord: "In 1934 werd in Izegem de eerste zwemkom geopend en ik was bij de vijf anderen in de klas die mocht gaan zwemmen in de zomer. Ik was toen 10 jaar en ging altijd na school; en in school hadden wij turnen.",
  },
  {
    vraag: "Hoe gingen jongens en meisjes met elkaar om?",
    antwoord: "In 't geheel niet, wij als meisjes mochten niet eens kijken naar een jongen. De eerste jongen die mij aansprak op straat bekende mij dat hij al een hele tijd verliefd op mij was. Hij had zulke mooie grote zwarte ogen die lonkten en dwongen dat ik niet kon weerstaan, een zwarte krullenkop. Ik was 16½ jaar en onmiddellijk ook verliefd — en 5 jaar later ook getrouwd.",
  },
  {
    vraag: "Wanneer kreeg u uw eerste baan?",
    antwoord: "Op mijn 15e, toen mijn oom zei — omdat ik zo'n mooie uitslag had, 92%, de tweede van mijn klas — dat hij een plaatsje vrij had op het bureel van de schoenfabriek, en mijn ouders het geld dringend nodig hadden. Alles ging naar mijn ouders tot de dag waarop ik trouwde. Ik verdiende 2,60 fr per uur.",
  },
  {
    vraag: "Hoe is het verder gegaan met uw 'carrière'?",
    antwoord: "In 1942, toen ik weer eens wenend thuis kwam omdat ik mij zo vernederd voelde, zei mijn vader: dat kan niet meer, gij blijft thuis en gij gaat mijn coiffeursalon overnemen. Hij schreef naar professor Hillaert in Gent en ik mocht er onmiddellijk naartoe; van maandagochtend tot woensdagavond. Eenzame jaren waren dat.",
  },
  {
    vraag: "Waar en hoe ontmoette u opa voor het eerst?",
    antwoord: "In het najaar 1940, in de Roeselaarsestraat, op de fiets. Hij deed me afstappen en zei dat hij allang verliefd was op mij.",
  },
  {
    vraag: "Waar en wanneer werd het huwelijk voltrokken?",
    antwoord: "Gehuwd op 6 juni 1945 op het stadhuis om 5 u 's namiddags, en op 7 juni in mijn parochiekerk H. Hart te Izegem om 10.30 u. Ik had 3 maanden tekort om 21 te zijn.",
  },
  {
    vraag: "Hebt u een huwelijksreis gemaakt?",
    antwoord: "Geen reis; er waren geen centjes. Ik ben op een donderdag gehuwd en de zaterdagmorgen om 7 u op 't werk. Ik had dus één dag vrij.",
  },
  {
    vraag: "Wat hadden we toen nog wel, en nu niet meer?",
    antwoord: "De vriendschap onder de buren. Iedereen stond of zat buiten, er was een grote samenhorigheid onder de mensen; iedereen passeerde te voet of met de fiets en iedereen zei goedendag — daardoor kende iedereen iedereen.",
  },
  {
    vraag: "Wat is het belangrijkste dat u geleerd heeft?",
    antwoord: "Leren leven, opvangen en aanvaarden.",
  },
];

const Ouders = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const labels = {
    nl: { subtitle: "Ouders • Hoofdstuk 10", readMore: "Lees meer", readLess: "Lees minder", zoom: "Klik om te vergroten", close: "Sluiten" },
    fr: { subtitle: "Parents • Chapitre 10", readMore: "Lire la suite", readLess: "Lire moins", zoom: "Cliquez pour agrandir", close: "Fermer" },
    en: { subtitle: "Parents • Chapter 10", readMore: "Read more", readLess: "Read less", zoom: "Click to enlarge", close: "Close" },
    sv: { subtitle: "Föräldrar • Kapitel 10", readMore: "Läs mer", readLess: "Läs mindre", zoom: "Klicka för att förstora", close: "Stäng" },
  };
  const t = labels[language as keyof typeof labels] || labels.nl;

  const Figure = ({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) => (
    <figure className={`my-6 ${className}`}>
      <button
        onClick={() => setFullscreenImage(src)}
        className="block w-full group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        aria-label={`${alt} — ${t.zoom}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full rounded-lg shadow-md border border-border/50 transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </button>
      <figcaption className="mt-2 text-xs md:text-sm text-muted-foreground italic text-center">{caption}</figcaption>
    </figure>
  );

  const H3 = ({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) => (
    <h3 className="flex items-center gap-2 text-xl md:text-2xl font-serif font-semibold text-foreground mt-12 mb-4">
      {Icon && <Icon className="w-5 h-5 text-primary flex-shrink-0" />}
      {children}
    </h3>
  );

  return (
    <section
      id="ouders"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">10</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Jooris (Georges) Deforce &amp; Simonne Vandeputte
          </h2>
          <p className="text-muted-foreground">{t.subtitle} • 1921–1984 &amp; 1924–2012</p>
          <div className="mt-4 flex justify-center">
            <ShareButton title="Jooris Deforce & Simonne Vandeputte" sectionId="ouders" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/90 prose-p:leading-relaxed"
        >
          <div className="grid sm:grid-cols-2 gap-6 not-prose">
            <Figure src={georgesPortret} alt="Portret van Jooris (Georges) Deforce" caption="Jooris (Georges) Deforce (1921–1984)" />
            <Figure src={simonnePortret} alt="Portret van Simonne Vandeputte" caption="Simonne Vandeputte (1924–2012)" />
          </div>

          <p>
            Zijn officiële naam op zijn identiteitskaart was het Vlaamse <em>Jooris</em>. In de praktijk werd hij door
            iedereen Georges genoemd; soms met varianten als Georg of Geo. Moeke noemde hem steevast &ldquo;Joss&rdquo;;
            hij noemde haar &ldquo;Simmi&rdquo;. De kinderen noemden hem Vake, ook wel Va.
          </p>

          <H3 icon={Sparkles}>Jooris / Georges: de jeugdjaren</H3>
          <p>
            Zelf vertelde hij nooit veel over zijn jeugdjaren, behalve dat hij van jongs af een zeer uitgebreide
            interesse had in techniek, in machines en toestellen, gereedschappen, ook fotografie en auto&rsquo;s, maar
            vooral ook vliegtuigen en boten. Zijn jongensdroom was piloot te worden, maar hij aanvaardde loyaal zijn lot
            als oudste zoon in een groot gezin. Vanaf zijn 16 jaar, na zijn diploma van &ldquo;lager middelbaar&rdquo;
            behaald te hebben, werd hij medewerker in het atelier van zijn vader. Daar vormde hij zich met volle goesting
            tot geschoold meubelmaker.
          </p>
          <p>
            Zijn jeugdjaren verliepen normaal en zonder veel problemen: naar de lagere school van het nabije
            St.-Jozefscollege, opgroeien met hout, hamers, beitels en zagen als speelgoed. Vervolgens mocht hij nog het
            lager middelbaar volgen in datzelfde college — een soort voorrecht in een tijd waarin de werkende klasse
            het lager onderwijs volgde tot het achtste leerjaar en daarna op 14-jarige leeftijd moest gaan werken. De
            vriendenkring die hij op school opbouwde bestond dan ook voor een groot deel uit de &ldquo;betere
            klasse&rdquo;. Zo werd hij algauw lid en later secretaris van de IRZC, de Izegemse Roei- en Zeilclub: de
            omgeving waar hij met Simonne een jarenlange verkering kon beleven.
          </p>
          <div className="not-prose">
            <Figure
              src={diplomaAutoVoerder}
              alt="Diploma van auto-voerder van Georges Deforce"
              caption="Op zijn 18 jaar volgde hij autorijlessen en verwierf een &lsquo;Diploma van auto-voerder&rsquo;, hoewel er in die tijd nog geen wettelijk verplicht rijbewijs bestond."
            />
          </div>

          <H3 icon={BookOpen}>Het Grootouderboek van Simonne Vandeputte</H3>
          <p>
            In ons familiearchief beschikken we over een uniek document: een invulboek dat omstreeks 1992 door
            kleindochter Barbara Declercq geschonken werd aan haar grootmoeder, Simonne Vandeputte, met de vraag om dit
            in te vullen. Hiermee is een historisch document ontstaan: tegelijk een persoonlijke levensbeschrijving, een
            belangrijk stuk familiegeschiedenis én de weergave van een tijdsbeeld van het leven zoals het was in Izegem
            in de jaren 1930, &rsquo;40 en &rsquo;50.
          </p>
          <p>
            Het boek werd enkele dagen na haar begrafenis ingescand — op de dag dat Moeke 88 zou geworden zijn. Het
            originele boek is teruggeschonken aan Barbara. Er is geen betere manier om dit stuk geschiedenis over de
            jeugdjaren van mijn ouders te vertellen dan door haar zelf aan het woord te laten.
          </p>
          <div className="not-prose">
            <Figure
              src={ouderlijkHuis}
              alt="Het ouderlijk huis in de Roeselaarsestraat 325 in Izegem, 1927"
              caption="Het ouderlijk huis in de Roeselaarsestraat 325 in 1927. Poserend in de voordeur, met de etalage van haar schoenwinkeltje: Alida Timmerman (‘kleine meter’) met haar moeder Eugénie Boucké en haar dochters Elza en Simonne."
            />
            <ReadMore label={`${t.readMore} — transcriptie van het Grootouderboek`} collapsedLabel={t.readLess}>
              <div className="space-y-5 rounded-lg border border-border/60 bg-card/60 p-5 md:p-6">
                {grootouderboek.map((item) => (
                  <div key={item.vraag}>
                    <p className="font-semibold text-foreground">{item.vraag}</p>
                    <p className="text-foreground/85 italic mt-1">{item.antwoord}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/60">
                  Letterlijke transcriptie uit het invulboek, met minimale aanpassingen omwille van de leesbaarheid.
                </p>
              </div>
            </ReadMore>
            <div className="mt-4">
              <a
                href="/grootouderboek"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary/40 bg-card/80 px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/70 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-primary" />
                Bijlage: bekijk de originele scans van het Grootouderboek
              </a>
            </div>
          </div>


          <H3 icon={Heart}>Liefde in tijden van oorlog</H3>
          <p>
            In het najaar van 1940 ontmoette Simonne voor de eerste keer Georges in de Roeselaarsestraat. Hij reed met
            zijn fiets door de straat toen hij naast haar afstapte en vertelde dat hij al geruime tijd verliefd op haar
            was. Zij herinnerde zich vooral zijn grote zwarte ogen, zijn krullen en zijn gestalte. Hun verkering verliep
            langzaam: één keer per week mochten ze elkaar zien. Hij vroeg haar ouders of hij met haar &ldquo;kennis
            mocht hebben&rdquo;; haar moeder vond haar dochter veel te jong. Door foto&rsquo;s mee te brengen, wist hij
            gaandeweg toch toegang tot het gezin te krijgen. Op donderdagavond zaten ze bij haar ouders aan tafel, met
            boeken die ze samen bekeken — later ook meubelboeken, waarin ze het model kozen van de donkerrode
            slaapkamer in palissander die hij zelf zou maken.
          </p>
          <div className="not-prose">
            <Figure src={georgesSimonneJong} alt="Simonne Vandeputte en Georges Deforce als jong koppel" caption="Simonne en Georges, begin jaren 1940" />
          </div>
          <p>
            Georges was lid van de Izegemse Roei- en Zeilclub. Als vakbekwaam meubelmaker bouwde hij zelf zijn eigen
            kano en herstelde hij de kano&rsquo;s van andere clubleden. Algauw kwam hij in het bestuur en werd hij
            secretaris. Tijdens de bezettingsjaren was er voor jongeren weinig ander vertier; in de weekends trokken ze
            op vaartocht op het kanaal Roeselare-Ooigem en verder de Leie op. Vanaf haar zeventiende mocht Simonne op
            zondagnamiddag mee. Ook haar zus Elza en haar verloofde Lucien Bourgeois waren bij de club. Op de foto&rsquo;s
            uit 1941-44 lijkt alles zorgeloos, maar de oorlog bevindt zich net buiten het kader. Misschien was dat
            precies de betekenis van de club: enkele uren waarin de bezetting niet alles bepaalde.
          </p>
          <div className="not-prose">
            <Figure src={roeiclubKano} alt="Leden van de Izegemse Roei- en Zeilclub bij een kano" caption="Sfeerbeeld van de roeiclub IRZC, begin jaren 1940" />
          </div>

          <H3 icon={FileText}>&ldquo;Weggevoerd&rdquo; voor verplichte arbeidsdienst</H3>
          <p>
            Vanaf 6 oktober 1942 konden Belgische mannen van 18 tot 50 jaar op grond van een Duitse
            bezettingsverordening naar Duitsland worden gestuurd voor verplichte arbeidsdienst. Naar schatting werden
            ongeveer 189.000 Belgen als dwangarbeider naar het Duitse Rijk overgebracht. Voor het gezin en het bedrijf
            van Marcel Deforce was het een drama dat de oudste zoon opgeroepen kon worden. Georges werd daarom
            vrijwilliger bij de Passieve Luchtbescherming (&ldquo;Luftschutz&rdquo;) en kreeg het gedaan dat directeur
            Tanghe op 27 januari 1943 een attest schreef om dit engagement formeel te bevestigen — extra echt verklaard
            door de burgemeester.
          </p>
          <div className="not-prose">
            <Figure src={attestLuchtbescherming} alt="Brief van de Luftschutzleitung van de stad Izegem, 1943" caption="Attesten en smeekbrieven om de oproeping voor de arbeidsdienst te vermijden" />
          </div>
          <p>
            Het mocht niet baten: op 3 februari 1943 moest hij vertrekken. Al bij al viel het nog mee. Hij kwam terecht
            in Goslar, een idyllisch stadje in het Harzgebergte, en werd er hulpknecht in de grote beenhouwerij van
            Rudolph Schneider. Hij werd er hartelijk ontvangen, min of meer als lid van het gezin, als vervanger van de
            zoon die naar het leger was gestuurd. Honger heeft hij er dus niet geleden.
          </p>

          <H3 icon={Home}>Een jaar lang &ldquo;ondergedoken&rdquo;</H3>
          <p>
            Na zes maanden dienst mocht hij op 6 augustus 1943 met tien dagen verlof naar huis. Volgens zijn
            retour-treinticket werd hij verwacht op 17 augustus in Schaarbeek met de &ldquo;Sonderzug&rdquo; terug te
            keren. Hij besloot echter om niet terug te keren en dook onder. Overdag werkte hij mee in het meubelatelier
            van zijn vader; als er controle-ambtenaren werden gesignaleerd, kroop hij door een dakvenster en verborg hij
            zich tussen de zaagtanddaken van het atelier. Om nachtelijke controles te vermijden overnachtte hij niet
            thuis, maar bij een buurvrouw, Helene Maes, die hem een kamer verhuurde. Zo kon hij een jaar lang, tot aan de
            bevrijding van Izegem in september 1944, een vrij normaal leven leiden.
          </p>
          <div className="not-prose">
            <Figure src={treinticketGoslar} alt="Treinticket voor de Sonderzug van 6 augustus 1943" caption="Het retour-treinticket voor de Sonderzug van 6 augustus 1943 — hij keerde nooit terug" />
          </div>
          <p>
            In september &rsquo;43 kwam er een brief van de familie Schneider, waarin ze betreurden dat hij niet was
            teruggekomen, maar dat ze daar wel begrip voor konden opbrengen. De brief zelf is verloren gegaan, de
            enveloppe is bewaard gebleven. Vele jaren later, in de jaren &rsquo;70, gingen Georges en Simonne er uit
            nostalgie nog eens op bezoek tijdens een vakantieverblijf in de Harz.
          </p>

          <H3 icon={Users}>Het huwelijk &mdash; het jonge gezin</H3>
          <p>
            Ze trouwden op woensdag 6 juni 1945 op het stadhuis, op 7 juni kerkelijk in de H. Hartkerk in Izegem,
            gevolgd door een feestmaal in familiale kring in Georges&rsquo; ouderlijk huis in de Vanden Bogaerdelaan. Na
            een verkering van zowat vier jaar moest het toch nogal dringend georganiseerd worden, want er was al een
            eerste kind op komst. Het jonge koppel ging in weinig luxueuze omstandigheden inwonen bij Helene Maes, op het
            onderduikadres.
          </p>
          <div className="not-prose">
            <Figure src={huwelijk1945} alt="Huwelijksfoto van Jooris Deforce en Simonne Vandeputte, juni 1945" caption="Jooris Deforce en Simonne Vandeputte op hun huwelijksdag, juni 1945" />
          </div>
          <p>
            Op 11 november 1945 werd zoontje Jan geboren; hij stierf aan wiegendood op 21 maart 1946. In 1947-48 trokken
            ze nog enkele maanden in bij Simonne&rsquo;s ouders in de Roeselaarsestraat. In het voorjaar 1948 gebeurde er
            opeens van alles: op 19 april werd Luc geboren en op 21 april werd de koopovereenkomst afgesloten voor een
            bescheiden rijhuis in de Princessestraat te Emelgem, voor 255.000 frank, grotendeels geleend. De verhuis vond
            al plaats op 4 mei. Mijn vader noteerde in een klein schrift, onder de titel &ldquo;Ons Huis&rdquo;,
            nauwgezet alle details van de aankoop, de verbeteringswerken, de leningen en de afbetalingen tot en met de
            laatste betaling op 1 februari 1953.
          </p>
          <div className="not-prose">
            <Figure src={huisPrincessestraat} alt="Achterzijde van het huis in de Princessestraat met atelier en berghok" caption="Achterzijde van het huis in de Princessestraat, met atelier en berghok" />
          </div>

          <H3 icon={Home}>Het leven in de jaren &rsquo;50 in Emelgem</H3>
          <p>
            Ons moeder had vóór haar huwelijk niet leren koken. Na haar trouwdag moest ze eraan beginnen: ze vroeg raad
            aan haar moeder, raadpleegde kookboeken en begon er, zoals ze zelf schreef, &ldquo;met veel liefde&rdquo;
            aan. Die woorden vatten haar gezinsleven misschien het beste samen. Een korte tijd werkte ze nog als kapster,
            in een minimaal ingericht kapsalon in de voorkamer, maar met de komst van nog meer kinderen werd die
            activiteit steeds verder ingeperkt.
          </p>
          <p>
            Vake installeerde een zandbak in de achtertuin en dat was zowat het enige beschikbare vertier. Nonkel Julien,
            een oom van ons moeder die een leven lang als dagloner had gewerkt, kwam regelmatig babysitten, leerde ons
            geïmproviseerde spelletjes en vertelde hele verhalen over het urenlang stappen naar de boeren (hij beschreef
            afstanden in &ldquo;uren gaans&rdquo;), de liederen die ze zongen en de kermissen in de omliggende dorpen.
            Eén keer per week, op zaterdagnamiddag, gingen we in bad: op het gasvuur werd water opgewarmd en in het
            midden van de keukenvloer werd een grote zinken badkuip gevuld, waarin we één na één, in volgorde van
            leeftijd, in hetzelfde badwater werden gewassen.
          </p>
          <div className="not-prose">
            <Figure src={kinderenTuin} alt="Spelende kinderen in de achtertuin in Emelgem" caption="Spelende kinderen in de achtertuin — de zandbak was zowat het enige vertier" />
          </div>
          <p>
            Intussen was vader Georges een druk bezige en sociaal geëngageerde man. Naast de lange werkdagen in het
            atelier van zijn vader bleef hij actief in tal van verenigingen: de roeiclub IRZC, de fotoclub (secretaris),
            de Jachtclub St.-Hubertusvereniging, een lokale voetbalploeg, de club &ldquo;De Vlinders&rdquo; (later
            opgegaan in de VTB) en niet te vergeten de Gilde van de Koninklijke Bosseniers.
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-4">
            <Figure src={lidkaartenCollage} alt="Collage van lidkaarten van Georges Deforce" caption="Lidkaarten van de vele verenigingen waarin hij actief was" />
            <Figure src={advertentieSportwinkel} alt="Advertentie voor de sportwinkel van Georges Deforce" caption="Advertentie voor de sportwinkel in De Mandelbode" />
          </div>
          <p>
            Hij was heel pragmatisch en gebruikte alle mogelijke connecties om zijn inkomen aan te vullen. Hij begon een
            kleine sportwinkel, RECORD genaamd — eigenlijk niet veel meer dan een klein uitstalraam en enkele
            zelfgetimmerde rekken in de voorkamer. Hij verkocht er alle benodigdheden voor voetbal, atletiek en
            &ldquo;alle sport&rdquo;, ook karabijnen, jachtgeweren, jagerstassen en munitie. Zijn kliënteel bestond
            hoofdzakelijk uit clubgenoten, vrienden en kennissen. In 1954 werd de winkelactiviteit stopgezet omwille van
            de bouw van het nieuwe huis in Izegem.
          </p>

          <H3 icon={Home}>Ons Nieuw Huis (1954-1955)</H3>
          <p>
            Het gezin werd te groot en het huis te klein. In 1954 werd het schriftje &ldquo;Ons Huis&rdquo; omgekeerd en
            werd een nieuw verhaal opgestart: <em>&ldquo;Ten jare 1954 in Februari werd beslist een nieuw huis te bouwen,
            daar we kunnen genieten van de bouwpremie en dat we bij het Woningfonds van de Kroostrijke gezinnen geld
            kunnen lenen aan zeer voordelige prijs.&rdquo;</em> Er werd een stuk grond gekocht in de Slagmeersenstraat,
            15 m breed op 64 m lang.
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-4">
            <Figure src={dagboekNieuwHuis} alt="Handgeschreven dagboekpagina over de bouw van het nieuwe huis" caption="Het dagboek ‘Ons Nieuw Huis’: links elke aankoop van materialen, rechts een verslag van de gebeurtenissen" />
            <Figure src={bouwNieuwHuis} alt="Het nieuwe huis in de Slagmeersenstraat in aanbouw, 1954" caption="Slagmeersenstraat 56 in Izegem — het huis kwam tot stand op één jaar tijd" />
          </div>
          <ReadMore label={t.readMore} collapsedLabel={t.readLess}>
            <div className="space-y-4">
              <p>
                Er werd minimaal een beroep gedaan op aannemers en maximaal zelf gewerkt, te beginnen met het uitgraven
                van de funderingssleuven. Het beton werd zelf gemaakt. Eén van mijn oudste jeugdherinneringen heeft
                hiermee te maken: bij wijze van babysit nam vader af en toe zijn twee oudste zonen op zijn fiets mee naar
                de werf. Ik was toen bijna 8 jaar, Luc 6. Hij plaatste ons bovenop een berg afvalbakstenen, gaf ons elk
                een hamer met de opdracht zoveel mogelijk van die bakstenen tot kleine brokken te kloppen — voor het
                aanmaken van de funderingsbeton. Hij overtuigde ons plechtig dat ons werk een zeer belangrijke bijdrage
                was tot het bouwen van ons nieuwe huis.
              </p>
              <p>
                Het huis kostte alles bij elkaar zowat 300.000 Belgische frank. Toen wij in februari 1955 het huis
                betrokken was het bitter koud. Voor ons als kinderen was het een ervaring van grote luxe: al die
                slaapkamers waar we slechts met twee per kamer moesten slapen, een tweede toilet op de verdieping en
                zelfs een badkamer! Leuk detail: heel modern had ons vader een grote regenput laten installeren en het
                bad aangesloten op het regenwater — zonder filter, zodat we geregeld lichtbruin water hadden waarin
                halfvergane boomblaadjes ronddwarrelden.
              </p>
              <p>
                Het dagboek toont ook de verdere fases: januari 1958 de inrichting van de woonkamer (22.400 fr); 1961 het
                &lsquo;opdoen&rsquo; van zolder, gang, trap en inkomhal (ca. 50.000 fr) en de afwerking van de badkamer
                (24.000 fr); in 1966 een grote dubbele garage, een uitbreiding van de woonkamer en centrale verwarming
                (504.000 fr); en als kroon op het werk in 1969 een volledig nieuwe keuken van de firma Vossaert
                (227.000 fr).
              </p>
            </div>
          </ReadMore>

          <H3 icon={Users}>Het leven in een kroostrijk gezin</H3>
          <p>
            Onze ouders kregen in totaal elf kinderen; in de praktijk waren wij een gezin met negen kinderen, doordat er
            twee heel jong gestorven waren: Jan en Beatrijs.
          </p>
          <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
            {kinderen.map((kind) => (
              <div key={kind.naam} className="rounded-lg border border-border/60 bg-card/60 p-3">
                <p className="font-medium text-foreground text-sm">{kind.naam}</p>
                <p className="text-xs text-muted-foreground">{kind.jaren}</p>
              </div>
            ))}
          </div>
          <p>
            Het management van dit kroostrijke gezin had heel wat voeten in de aarde. Het grote leeftijdsverschil — toen
            mijn jongste zus Karien geboren werd was ik zelf al 16 — maakte dat we op heel wat gebieden in twee ploegen
            werden opgedeeld: de grote en de kleintjes. Al vrij vroeg werd via de CM door Familiehulp een familiale
            helpster ingeschakeld. Normaal werd om de paar maanden iemand anders toegewezen, maar ons Moeke wist na
            stevig onderhandelen te bereiken dat Aline Demeulenaere gedurende verscheidene jaren vrijwel permanent bij
            ons kon blijven. Aline werd veel meer dan een huishoudelijke hulp: ze ging deel uitmaken van het gezin en
            groeide uit tot een goede vriendin van onze ouders. Ook nadat ze trouwde met Theo Vossaert bleef die hechte
            band bestaan — waaruit later vanzelf ook een zakelijke samenwerking ontstond.
          </p>
          <ReadMore label={t.readMore} collapsedLabel={t.readLess}>
            <div className="space-y-4">
              <p>
                Wij werden gedurende vrijwel onze hele lagereschooltijd bijna ieder jaar met twee of drie kinderen
                tegelijk naar een &lsquo;vakantiekolonie&rsquo; gestuurd, georganiseerd via de Christelijke Mutualiteit.
                Ze duurden telkens ongeveer drie maanden. Ik herinner mij verblijven in Oostende, Heverlee, Heusden,
                Lichtaart en Westende. Daarnaast wist ons Moeke haar schoonzussen en schoonbroers zover te krijgen dat
                zij tijdens de schoolvakanties om beurten een van de kinderen een week lieten logeren.
              </p>
              <p>
                In de jaren vijftig en zestig hielden ouders zich veel minder bezig met het organiseren van de vrije tijd
                van hun kinderen. Er stond een schommel in de tuin en we hadden een grote zandbak. Voor het overige
                werden wij geacht zelf te bedenken wat we met onze dagen aanvingen. We verkenden de omgeving, vingen
                kikkers in de beek en stookten vuurtjes, en gingen op onderzoek in de huizen die in de nieuwe wijk in
                aanbouw waren. De belangrijkste afspraak was eenvoudig: tegen etenstijd moesten we weer thuis zijn.
              </p>
              <p>
                Kerstmis vormde ieder jaar een hoogtepunt, met een groot diner waarbij Kleine Meter en familievriendin
                Valérie kwamen helpen koken. Vooraf moesten we allemaal netjes gekleed poseren voor een familiefoto in
                kerstsfeer, die vervolgens als kerst- en nieuwjaarskaart werd verstuurd. Toen we ouder werden volgden we
                muziekschool: Luc en ik speelden klarinet, Geert koos voor de trompet en Ann kreeg pianoles.
              </p>
            </div>
          </ReadMore>
          <div className="not-prose">
            <Figure src={ksaActiviteit} alt="KSA-activiteit in de jaren 1960" caption="In de jaren ’60 vulde de KSA het grootste deel van onze vrije tijd" />
          </div>

          <H3 icon={Sparkles}>Simonne, ambitieus en feministe</H3>
          <p>
            Tijdens mijn jeugd heb ik mijn moeder vooral leren kennen als een vrouw die diep gefrustreerd was over het
            onderwijs dat zij had moeten missen. Ze wist dat ze verstandig genoeg was en voldoende talent bezat om verder
            te studeren; alleen had het leven daar anders over beslist. Wat haar op school niet gegund was, probeerde ze
            later zelf in te halen. Ze ontwikkelde een haast rusteloze ambitie, op de meest uiteenlopende terreinen, maar
            altijd in combinatie met de zorg voor haar gezin.
          </p>
          <p>
            Ze las ontzettend veel en spoorde ook ons aan om iedere week enkele boeken uit de bibliotheek mee te brengen.
            &ldquo;De Bibliotheek&rdquo; was toen nog een parochiale bibliotheek, beheerd door een onderpastoor die
            zorgvuldig waakte over de zedelijke quotering van de boeken. Als ons Moeke vond dat ik op mijn zestiende iets
            van Sartre of Simone de Beauvoir moest lezen, ontleende zij het boek met haar eigen bibliotheekkaart, las het
            eerst zelf en gaf het daarna aan mij door. Zo omzeilde ze op haar eigen rustige maar vastberaden manier het
            toezicht van de onderpastoor.
          </p>
          <ReadMore label={t.readMore} collapsedLabel={t.readLess}>
            <div className="space-y-4">
              <p>
                Een belangrijk onderdeel van haar zelfvorming vond ze bij de volkshogeschool, vooral bij de Stichting
                Lodewijk De Raet. Ze trok daarvoor regelmatig, soms bijna wekelijks, naar Roeselare of Kortrijk. De
                onderwerpen waren bijzonder gevarieerd: politieke verhoudingen, streekontwikkeling, cultuur en taal,
                onderwijsvernieuwing, gemeentebeleid, ruimtelijke ordening, leefmilieu, vrouwenemancipatie,
                vergadertechniek en spreken in het openbaar. &ldquo;Vorming&rdquo; betekende er veel meer dan het
                verwerven van kennis: het ging ook om mondigheid, samenwerking en kritisch denken.
              </p>
              <p>
                Ze werd lid, vervolgens bestuurslid en uiteindelijk voorzitster van het CMBV, de Christelijke
                Middenstands- en Burgervrouwen (vandaag Markant). Voor de gemeenteraadsverkiezingen van 11 oktober 1964
                werd ze gevraagd om op de CVP-lijst van Izegem–Emelgem te staan, aangevoerd door André Bourgeois. Ik
                herinner me hoe ik met haar door de straten van Izegem trok, van deur tot deur met affiches en folders,
                om de mensen ervan te overtuigen nu eens wat meer op vrouwen te stemmen. Verkozen werd ze niet, maar mede
                dankzij de steun van de Bond der Kroostrijke Gezinnen werd ze nadien lid van de Stedelijke Gezinsraad van
                Izegem.
              </p>
              <p>
                Vanaf het begin van de jaren zeventig sloot haar belangstelling voor vrouwenrechten steeds duidelijker
                aan bij de tweede feministische golf. Ze kwam in contact met de &ldquo;Pluralistische Actiegroepen voor
                Gelijke Rechten van Man en Vrouw&rdquo; (PAG), die ijverden voor gelijk loon, politieke
                vertegenwoordiging, vrije toegang tot anticonceptie en een hervorming van het huwelijks- en familierecht.
                Haar feministische overtuiging was voor een groot deel uit verontwaardiging ontstaan: dat Belgische
                vrouwen pas in 1948 volledig parlementair stemrecht kregen, en dat een gehuwde vrouw tot ver in de jaren
                zestig en zeventig voor bepaalde financiële en juridische handelingen afhankelijk bleef van haar
                echtgenoot.
              </p>
              <p>
                Daarnaast liep er nog een rode draad door haar leven: de zoektocht naar een eigen bijverdienste.
                Postorderverkoop, Tupperware party&rsquo;s en uiteindelijk een meer duurzame bijverdienste als
                plaatselijk agente voor de verzekeringsmaatschappij &lsquo;La Concorde&rsquo;. Ze verkocht polissen aan
                familie, vrienden en aan iedereen die aan huis kwam: de bakker, de beenhouwer, de melkboer, de
                krantenman. Ze kon daarbij behoorlijk overtuigend zijn.
              </p>
            </div>
          </ReadMore>
          <div className="not-prose">
            <Figure
              src={gezinsraad1965}
              alt="Stichting van de Stedelijke Gezinsraad van Izegem, 1965"
              caption="1965: stichting van de Stedelijke Gezinsraad — zittend rechts: Simonne Vandeputte, naast burgemeester André Bourgeois"
            />
          </div>

          <H3 icon={Sparkles}>De Golden Sixties: toen de toekomst begon</H3>
          <p>
            Met Expo 58 leek België ineens de toekomst binnen te stappen. Ik was twaalf en mocht de wereldtentoonstelling
            tweemaal bezoeken: eerst tijdens een schoolreis en later nog eens met het gezin. De lonen stegen, er was
            volop werk en steeds meer gezinnen konden zich dingen veroorloven die tot dan toe als luxe hadden gegolden.
            Koelkasten, wasmachines en stofzuigers deden hun intrede. In de woonkamer kreeg het televisietoestel een
            ereplaats: via een grote richtantenne op het dak konden wij een viertal zenders ontvangen — &lsquo;Brussel
            Vlaams&rsquo;, &lsquo;Brussel Frans&rsquo;, &lsquo;Rijsel&rsquo; en &lsquo;Hilversum&rsquo;. Wie van zender
            wilde veranderen, moest ook de antenne verdraaien met een regelknop bij het toestel.
          </p>
          <p>
            Moeke kocht een kleine Fiat en liet vanaf dat ogenblik prompt haar fiets staan; vader koos als gezinswagen
            voor een groter model van Volkswagen. Dankzij hun vriendschap met Urbain Deberdt van &lsquo;Mandel Car
            Toerisme&rsquo; konden ze voordelig deelnemen aan steeds verdere reizen en zelfs cruises. Uit Ierland
            brachten ze een langspeelplaat van The Dubliners mee, op een ogenblik dat de groep hier nog nauwelijks bekend
            was; wekenlang werd die plaat telkens opnieuw opgelegd.
          </p>
          <div className="not-prose">
            <Figure src={reisKopenhagen} alt="Jooris Deforce en Simonne Vandeputte bij het Kleine Zeemeerminbeeld in Kopenhagen" caption="Op reis: bij de Kleine Zeemeermin in Kopenhagen" />
          </div>
          <p>
            Tot grote ergernis van Moeke had Va de gewoonte haar bij iedere gelegenheid een &lsquo;nuttig&rsquo;
            huishoudtoestel cadeau te doen. Zij vond terecht dat zulke apparaten uit het gewone gezinsbudget moesten
            worden betaald. Na vele jaren kreeg ze hem uiteindelijk zover dat hij eens kwam aandragen met een sieraad.
          </p>
          <p>
            Tegen het einde van mijn middelbare studies, in 1965, nam Va mij apart om over mijn toekomst te spreken. Hij
            zou zich niet bemoeien met mijn keuze van studie of beroep — maar geen haar op mijn hoofd mocht eraan denken
            ooit in het familiebedrijf te komen werken. Veel uitleg gaf hij niet; het was eenvoudigweg een taboe. Pas
            later groeide het besef dat hij ons waarschijnlijk wilde beschermen: de verhoudingen binnen het familiebedrijf
            waren lang niet altijd ideaal en ook de toekomst van de meubelfabriek was minder verzekerd dan wij toen
            vermoedden.
          </p>

          <H3 icon={FileText}>Georges, een vader met een &lsquo;dubbele boekhouding&rsquo;</H3>
          <p>
            Tussen al zijn werk en bezigheden door vond vader altijd nog tijd om te noteren, te registreren en te
            klasseren wat hij belangrijk vond. Enerzijds bezat hij een uitgesproken behoefte om de cijfers nauwgezet bij
            te houden; anderzijds wilde hij ook de gebeurtenissen zelf vastleggen en er een samenhangend verhaal van
            maken. Vanaf onze middelbare studies werden ook de studiekosten nauwgezet bijgehouden: voor iedere zoon en
            dochter noteerde hij het wekelijkse zakgeld, de huur van het studentenkot, het bedrag van de studiebeurs en
            alle extra uitgaven.
          </p>
          <p>
            Naast die financiële administratie hield hij er nog een veel persoonlijkere boekhouding op na. Toen ik in
            1972 trouwde, overhandigde hij mij een grote grijze klasseermap: het volledige archief van mijn jeugd.
            Schoolrapporten, gezondheidsboekjes, spaarboekjes, inentingsbewijzen, getuigschriften, klasfoto&rsquo;s — en
            het ontroerendst: iedere brief die ik uit een vakantiekolonie naar huis had gestuurd, elk kaartje van een
            KSA-kamp, iedere boodschap uit Zweden of Duitsland. Voor elk van zijn zonen en dochters had hij zo&rsquo;n
            map aangelegd. Zijn boodschap daarbij was eenvoudig: <em>&ldquo;Nu je volwassen bent en je eigen weg gaat,
            zal ik mij als vader nergens meer mee bemoeien. Maar als je mij ergens voor nodig hebt, zal ik er
            zijn.&rdquo;</em>
          </p>
          <ReadMore label={`${t.readMore} — Pater Fens en de Zweedse Missieprocuur`} collapsedLabel={t.readLess}>
            <div className="space-y-4">
              <p>
                Pater Bertrand Fens was niet alleen een gedreven missionaris, maar blijkbaar ook een bekwaam
                onderhandelaar. Vanuit Uden kwam hij tweemaal per week naar Maastricht om mij privéles Zweeds te geven.
                Samen met de birgittinessen beheerde hij de Zweedse Missieprocuur, een fonds dat in Nederland geld
                inzamelde ter ondersteuning van de katholieke Kerk in Zweden.
              </p>
              <p>
                Omdat een internationale overschrijving in die tijd omslachtig was, stelde hij mijn ouders voor hun
                Belgische bankrekeningnummer in het tijdschrift te laten opnemen. Zo werd Georges Deforce in de praktijk
                de Belgische tussenpersoon van de Zweedse Missieprocuur — met opnieuw een schrift erbij waarin hij iedere
                gift zorgvuldig registreerde. Enkele keren per jaar bracht hij het geld persoonlijk naar Uden. Die ritten
                groeiden uit tot kleine uitstapjes en tot een jarenlange vriendschap, die onder meer leidde tot een reis
                van mijn ouders met pater Fens naar Vadstena in Zweden. In oktober 1973 was hij te gast op de trouw van
                Hans, en toen in 1974 onze zoon Koen werd geboren, kwam hij zelfs naar Heverlee om hem te dopen.
              </p>
            </div>
          </ReadMore>

          <H3 icon={Target}>Georges Deforce bij de schuttersgilde</H3>
          <p>
            Van alle verenigingen waarbij hij betrokken was, nam de Koninklijke Gilde der Bosseniers van de Heilige
            Barbara in Izegem ongetwijfeld de belangrijkste plaats in. De gilde verenigde verschillende dingen die hem
            aanspraken: technische beheersing, concentratie, competitie en kameraadschap, maar ook traditie en
            geschiedenis. Het bewaarde gildeboek begint in 1615; de leden hanteerden oorspronkelijk de <em>bosse</em> of
            handbus, een vroeg vuurwapen waaraan zij hun naam ontleenden.
          </p>
          <p>
            Zijn eerste duidelijk gedocumenteerde succes dateert uit 1959, toen hij kampioen werd in de tweede categorie
            van het verbond. Het hoogtepunt kwam in 1964, toen hij zich tot koning van de gilde schoot. In de lange lijst
            van koningen staat hij tussen Jozef Rebry (1963) en Willy Vandemoortele (1965). Later zou hij ook de functie
            van deken opnemen. Zijn belangstelling beperkte zich niet tot het schieten: hij verdiepte zich ook in de
            geschiedenis van de gilde en onderhield daarover contacten met Bertrand Nolf, archivaris van de Heemkundige
            Kring Ten Mandere.
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-4">
            <Figure src={koningBosseniers} alt="Georges Deforce als koning van de Bosseniersgilde" caption="Koning van de gilde: de nieuwe koning kreeg de oude koningsketting omgehangen" />
            <Figure src={ordePapegay} alt="Krantenartikel: Officier in de Orde van de Papegay, 1984" caption="‘De Gentenaar’, 10 oktober 1984 — met een jammerlijke spelfout in de naam" />
          </div>
          <p>
            Zijn jarenlange inzet werd uiteindelijk in 1984, in zijn laatste levensjaar, ook buiten Izegem erkend door
            zijn opname in de Orde van de Papegay, als officier met gouden palm. Als kind zag ik vooral de uiterlijke
            tekenen van zijn hobby: het geweer, de schietkaarten, de bekers en schalen, en de zondagmiddagen waarop hij
            naar de gilde vertrok. Pas veel later begon ik te begrijpen welke plaats de Bosseniers in zijn leven
            innamen. De vereniging bood ontspanning, maar ook erkenning en verbondenheid — een plaats waar hij niet in de
            eerste plaats echtgenoot, vader of meubelfabrikant was, maar confrater, schutter, koning en later deken.
          </p>

          <div className="not-prose mt-12 rounded-lg border border-border/60 bg-card/60 p-5 md:p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">In memoriam.</strong> Georges overleed op 22 december 1984. Simonne
              overleed onverwacht op 8 september 2012 in de Sint-Jozefskliniek te Izegem, drie jaar nadat zij haar intrek
              had genomen in wzc De Plataan — enkele dagen voor haar 88ste verjaardag.
            </p>
          </div>
        </motion.div>
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Ouders;
