import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Dna } from "lucide-react";
import ReadMore from "@/components/ui/ReadMore";
import ShareButton from "@/components/ui/ShareButton";
import dnaMyheritageKit from "@/assets/dna-myheritage-kit.jpg";
import dnaEtniciteit from "@/assets/dna-etniciteit.png";
import dnaEtniciteitKaart from "@/assets/dna-etniciteit-kaart.jpg";
import dnaEtniciteitLijst from "@/assets/dna-etniciteit-lijst.jpg";
import dnaMatches from "@/assets/dna-matches.png";
import dnaGeldofMatch from "@/assets/dna-geldof-match.png";
import dnaDeleforgeBoek from "@/assets/dna-deleforge-boek.jpg";
import mauriceDeleforgePortrait from "@/assets/maurice-deleforge-portrait.png";


import aiFotoVoorbeeld2 from "@/assets/ai-foto-voorbeeld-2.jpg";
import huwelijksfotoAiBewerkt from "@/assets/huwelijksfoto-ai-bewerkt.png";
import huwelijksfotoOrigineel from "@/assets/huwelijksfoto-origineel-1945.jpg";
import houtsnijdersGroepOrigineel from "@/assets/houtsnijders-groep.jpg";
import juwelenkistje from "@/assets/juwelenkistje.jpg";
import stamboomMauriceDeleforge from "@/assets/stamboom-maurice-deleforge.jpg";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import telegramHuwelijk1945 from "@/assets/telegram-huwelijk-1945.jpg";
import huwelijksgedicht1945P1 from "@/assets/huwelijksgedicht-1945-p1.jpg";
import huwelijksgedicht1945P2 from "@/assets/huwelijksgedicht-1945-p2.jpg";
import doopakteAliceBoucke from "@/assets/doopakte-alice-boucke-1892.jpg";
import doopakteCyprianusRoose from "@/assets/doopakte-cyprianus-roose-1752.png";
import eugenieBoucke from "@/assets/eugenie-boucke.jpg";

const DNAOnderzoek = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const readMoreLabel = language === 'en' ? 'Read more' : language === 'fr' ? 'Lire la suite' : language === 'sv' ? 'Läs mer' : 'Lees meer';
  const readLessLabel = language === 'en' ? 'Read less' : language === 'fr' ? 'Lire moins' : language === 'sv' ? 'Läs mindre' : 'Lees minder';

  const content = {
    nl: {
      sectionTitle: "DNA-onderzoek in onze stamboom",
      intro: "Ik ben jarenlang uitsluitend bezig geweest met genealogie via klassieke bronnen: oude parochieregisters, notariële akten, doop-, trouw- en begraafboeken, bevolkingsregisters, militaire lijsten en allerlei andere archieven. Het speurwerk had iets romantisch: telkens opnieuw bladeren, vergelijken, corrigeren, puzzelen. Deze documenten blijven voor mij de absolute basis. Toch voel je soms de beperkingen: schrijffouten, onleesbare registers, verwarrende naamvarianten, soms bewuste verzwijgingen of gewoon documenten die nooit bewaard zijn gebleven.",
      intro2: "Toen ik later ook DNA-onderzoek begon te verkennen, merkte ik dat dit een nieuwe laag toevoegde aan de papieren stamboom. DNA vervangt de archieven niet, maar versterkt ze aanzienlijk. In theorie kan je daarmee verwantschap bevestigen, fouten uit bronnen rechtzetten, verdwenen familieleden terugvinden of hypotheses toetsen over migratie en afstamming. Het is een tweede lens om naar dezelfde familiegeschiedenis te kijken — één die niet liegt, en die ook geen documenten nodig heeft om te kunnen spreken. In de praktijk is het wel wat ingewikkelder.",
      howTitle: "Hoe werkt het DNA-onderzoek in de praktijk?",
      howText: "Op onze familiewebsite bij MyHeritage ben ik aangesloten op het DNA-project, nadat ik mijn eigen DNA-staal heb ingestuurd. Ik herinner me nog dat ik dacht: \"Het klinkt ingewikkeld\", maar de procedure bleek verrassend eenvoudig:",
      howStep1: "MyHeritage stuurt je een testkit met een simpele wangswab. Geen bloed, geen speeksel, geen gedoe. Je veegt langs de binnenkant van je wang, stopt het in een buisje en stuurt het naar hun lab.",
      howStep2: "In het lab wordt je DNA uitgelezen. De genetische markers worden omgezet in digitale data. Algoritmes vergelijken jouw profiel met miljoenen anderen en schatten je etniciteit en mogelijke verwantschappen in.",
      resultsIntro: "Nadien zie je op de site/app twee soorten resultaten verschijnen:",
      ethnicityTitle: "1. Etniciteitsschatting (Ethnicity Estimate / Genetic Groups)",
      ethnicityText: "Deze schatting toont in percentages uit welke regio's je DNA afkomstig lijkt. MyHeritage heeft duizenden groepen wereldwijd, waardoor je soms verrassend fijne uitsplitsingen krijgt — niet alleen continenten, maar microregio's en historische populaties. Dit is vooral interessant voor families die ver van hun roots geëmigreerd zijn. De herkomst van óns genetisch materiaal situeert zich — heel logisch — over een groot deel van Europa:",
      matchesTitle: "2. DNA-matches (familieleden / verwantschap)",
      matchesText: "Je krijgt een lange lijst met mensen van wie een stuk van het DNA overlapt met dat van jou. Hoe groter de overlap, hoe dichter de verwantschap. Soms zijn het verre neven of nichten die je nooit gekend hebt. In theorie kan je zo compleet nieuwe familietakken ontdekken, of onverwachte verwantschappen bevestigen.",
      experienceTitle: "Mijn eigen ervaring met matches",
      experienceText1: "In DNA-match-lijsten ben je afhankelijk van de bereidheid van anderen om ook mee te doen. Wanneer iemand uit dezelfde familietak zijn DNA instuurt, verschijnt hij of zij plots als match. Dat levert soms verrassingen op.",
      experienceText2: "Toen ik voor het eerst keek, schrok ik van het aantal: 6009 overeenkomsten! Mijn eerste gedachte was: hoeveel verborgen familie zit hier? Maar in de praktijk bleek het minder spectaculair dan het getal doet vermoeden.",
      experienceText3: "De overgrote meerderheid van die matches deelt slechts een minuscuul stukje DNA met mij — zó klein dat je er weinig uit leert. Het zegt hooguit dat we ergens in een ver verleden een gemeenschappelijke voorouder hadden, maar dat is genealogisch niet bruikbaar zonder bijkomende gegevens.",
      experienceText4: "Een klein handvol — hooguit enkele tientallen — bleken tot nu toe echte verre verwanten die ik nog niet kende. Sommige van hen beschikten over een uitgewerkte stamboom op MyHeritage, waardoor we hen konden koppelen aan onze eigen familie, vaak een aantal generaties terug in de tijd. Dat leverde soms wel eens enthousiaste mailtjes en kleine ontdekkingen op. Maar eerlijk gezegd: de duizenden andere matches zijn genealogisch doodlopend, omdat de meeste mensen hun stamboom nauwelijks hebben uitgewerkt.",
      experienceText5: "Per saldo hou ik een vijftal aantoonbare verwantschappen over die écht genealogische betekenis hebben. Ze bevestigen wat ik in archieven al wist, soms zelfs op een prettige manier. Het blijft leuk om zo'n onverwachte verre neef of nicht te ontmoeten. Zo bij voorbeeld leerde ik Steven Timmerman kennen, een achterneef waarvan ik nog nooit gehoord had en die in Duitsland woont:",
      timmermanTitle: "Verwantschap met Steven Timmerman",
      geldofTitle: "Verwantschap met Christine Geldof",
      geldofText: "Een tweede duidelijke match levert een leuke anecdote op: ik kan er namelijk door bewijzen dat ik de zoon van mijn vader ben, ook al is er van mijn vader nooit een DNA-staal afgenomen! Een achternicht leverde wel een DNA-staal in: de verwantschap met Christine Geldof — we hebben allebei Emile Geldof als gemeenschappelijke overgrootvader — toont aan dat het 'Geldof-DNA' alleen door mijn vader (hij verkreeg het via zijn moeder) kan doorgegeven zijn.",
      dnaFamilyTitle: "DNA als hulpmiddel voor familieverhalen",
      dnaFamilyText1: "Wat mij wel fascineert, is het potentieel van DNA om oude familieverhalen te bevestigen of ontkrachten — verhalen die in veel families bestaan, maar nooit konden worden bewezen: buitenechtelijke kinderen, stiekeme adopties, onbekende verwantschappen of migraties die nooit op papier zijn gezet. In theorie kan DNA zulke mysteries oplossen en een zekerheid bieden die papier nooit kan geven.",
      dnaFamilyText2: "Ook het terugvinden van verdwenen familietakken zou een mogelijkheid kunnen zijn, net zoals het uitzoeken of er verwantschap bestaat tot familietakken die we terugvinden zonder ze met papieren bewijsstukken aan onze stamboom en aan een gemeenschappelijke voorvader te kunnen koppelen. Maar om dat via DNA te kunnen doen ben je wel afhankelijk van deelname van mensen uit die familietak…",
      projectsText: "Ik kan alvast twee projecten bedenken die we ooit eens zouden moeten uitvoeren. Vooreerst: via DNA nagaan of er bij de vele Deleforge's die vandaag nog leven in de regio Nord-Pas de Calais verwantschap kan gevonden worden met een gemeenschappelijke stamvader.",
      deleforgeTitle: "Maurice Deleforge — een gemiste kans",
      deleforgeText1: "Er is ook een tweede zaak die me intrigeert: heel toevallig, het moet ergens in 2019 of 2020 geweest zijn, vind ik een verwijzing naar een artikel in de krant Le Monde over een zekere Maurice Deleforge die op bijna 85-jarige leeftijd is overleden te Rijsel op 15 oktober 2018. Hij had in Frankrijk blijkbaar een ruime bekendheid, als professor en \"Directeur des Etudes\" van de \"Ecole Supérieure de Journalisme de Lille\". Grasduinend op het internet kwam ik te weten dat hij niet alleen een door zijn studenten en oud-studenten op handen gedragen docent was, maar ook dat hij een hele reeks boeken had geschreven over maatschappelijke en historische thema's.",
      deleforgeText2: "De man werd blijkbaar zozeer geëerd dat de Ecole Supérieure zowel de bibliotheek als een jaarlijkse prijs naar hem heeft vernoemd:",
      deleforgeQuote: "La bibliothèque porte le nom d'une figure emblématique de l'école, Maurice Deleforge, professeur de français et directeur des études entre 1961 et 1994. Depuis sa disparition en 2018, le prix Maurice-Deleforge, remis par l'ESJ Lille et le Réseau ESJ, l'association des alumni, récompense les élèves du Master généraliste dont les qualités d'écriture reflètent l'amour et le respect de la langue française qu'a prodigués Maurice à des milliers de journalistes.",
      deleforgeText3: "In 2008 schreef hij nog een boek — over zijn familiegeschiedenis — dat hij uitgaf in eigen beheer, met de titel \"Labaobou, Chronique des Deleforge par l'un d'eux\". Dat was natuurlijk een enorm gemiste kans: had ik die man een paar jaar eerder ontdekt dan had ik nog contact kunnen opnemen en met hem corresponderen over onze eventueel mogelijke verwantschap.",
      kitCaption: "MyHeritage DNA-testkit",
      ethnicityCaption: "Etniciteitsschatting op basis van DNA-analyse",
      matchesCaption: "DNA-matches op MyHeritage",
      geldofCaption: "Verwantschap via Emile Geldof",
      deleforgeBoekCaption: "\"Labaobou, Chronique des Deleforge par l'un d'eux\" — het boek van Maurice Deleforge (2008)",
      deleforgeSquareCaption: "Maurice Deleforge (1933–2018), professor en auteur",
      deleforgeText4: "Mijn frustratie werd nog groter toen ik zijn boek gelezen had. Het was een heel literair en nogal romantiserend familieverhaal, dat zich afspeelt in Marcq-en-Baroeul, Loos en andere naburige gemeenten die aansluiten met onze voorouderlijke woonplaatsen. Het zou dus niet verwonderlijk zijn mochten we, een aantal generaties terug, een band naar onze voorouders terug kunnen vinden. Maar de beknopte stamboom die hij publiceert gaat weliswaar terug tot voorbij 1670, maar blijft volledig losstaan naast onze stamboom!",
      deleforgeText5: "Het vervelende is dat deze stamboom als geheel niet in uitgewerkte vorm terug te vinden is op de klassieke genealogische sites als Geneanet en MyHeritage: al mijn naspeuringen hebben niets opgeleverd. Om een lang verhaal kort te maken en terug te keren naar het thema DNA: het zou echt een uitdaging zijn om via DNA-onderzoek van één of enkele van zijn kinderen of kleinkinderen te kunnen vaststellen of we nu al dan niet verwant zijn. Ooit zou er eens iemand hier werk moeten van maken...",
      samenwerkingTitle: "De kracht van samenwerking",
      samenwerkingText: "DNA-onderzoek komt pas volledig tot leven wanneer veel mensen deelnemen en hun gegevens koppelen aan uitgewerkte stambomen. Een individuele test is interessant, maar het wordt pas echt waardevol wanneer genetische matches ook een papieren verleden delen. Samen bouw je een genetische kaart van de familie, die zich voortdurend verder uitbreidt.",
      samenwerkingRealistisch: "Toch is het belangrijk realistisch te blijven:",
      samenwerkingPunt1: "Hoe verder je teruggaat in tijd, hoe moeilijker het wordt om via DNA verwantschap te bewijzen. Autosomaal DNA verliest zich na verloop van generaties: kleine stukjes verdwijnen, worden versnipperd of zijn statistisch niet meer aantoonbaar. Een test kan dus bijna nooit met zekerheid zeggen dat je 6, 7 of 8 generaties geleden een voorouder in een bepaalde regio had.",
      samenwerkingPunt2: "Ik heb geleerd DNA-etniciteit te bekijken als richtingaanwijzer, niet als absolute waarheid. Het biedt hypothesen die je moet combineren met archiefonderzoek en historische gegevens.",
      samenwerkingPunt3: "De grootste kracht van DNA zit voor mij in matches en verwantschap, niet in \"etniciteit\". De echte waarde ontstaat wanneer een match een bruikbare stamboom heeft — en we elkaar kunnen helpen.",
      samenwerkingPunt4: "Ik ben me zeer bewust van privacy: je deelt genetische data die niet alleen voor jezelf, maar ook voor familieleden gevoelig kunnen zijn. Je moet dus zorgvuldig afwegen hoe je gegevens beheert en met wie je ze deelt.",
      samenwerkingPunt5: "DNA mag nooit worden gebruikt om brede claims te maken over \"ras\", \"zuiverheid\" of grote migratieverhalen. Zulke interpretaties zijn vaak historisch naïef en wetenschappelijk te kort door de bocht.",
      overervingCaption: "DNA-overerving doorheen de generaties",
      eindreflectieTitle: "Eindreflectie",
      eindreflectieText1: "Voor mij voelt DNA-onderzoek als een fascinerende aanvulling op wat ik al jaren via archieven reconstrueer. Het is niet spectaculair in de zin dat het mijn stamboom plots herschreef. Maar het bevestigt, nuanceert, opent kleine zijpaadjes, en geeft soms een glimp van verwantschap die anders verborgen zou blijven.",
      eindreflectieText2: "Ik heb nog geen grote onthullingen ontdekt — geen verloren familieleden, geen geheime afkomst, geen dramatische verrassingen. Maar wie weet wat er verschijnt wanneer in de toekomst méér mensen uit onze uitgebreide familietakken hun DNA laten testen?",
      eindreflectieText3: "Mijn genealogie blijft dus stevig op archiefmateriaal rusten, maar met DNA als stille getuige op de achtergrond, klaar om te spreken wanneer het kan.",
      chatgptTitle: "ChatGPT als hulpmiddel bij het schrijven van familiegeschiedenis",
      chatgptIntro: "Bij het schrijven van dit boek heb ik regelmatig gebruik gemaakt van ChatGPT om stukken tekst te herformuleren of om oude foto's te verbeteren in kwaliteit en zelfs oude zwart-wit- of sepiafoto's om te zetten naar kleur. Soms bracht dit nieuwe inspiratie op, maar dikwijls vond ik onjuiste of gefantaseerde conclusies in teksten of gezichtsvervormingen in foto's. Zowat alle A.I.-teksten moest ik grondig evalueren en herschrijven om ze beter in lijn te brengen met het bronnenmateriaal en om onjuiste gevolgtrekkingen te verwijderen of te nuanceren. Daarom schreef ik een uitgebreide prompt om ChatGPT zelf een artikel te doen schrijven over een verantwoord gebruik van ChatGPT. Ziehier het resultaat (maar toch ook weer een beetje door mezelf bijgestuurd):",
      chatgptKansenTitle: "Kansen, valkuilen en verantwoordelijk gebruik",
      chatgptKansenText: "De opkomst van artificiële intelligentie, en meer bepaald taalmodellen zoals ChatGPT, biedt genealogen en familiehistorici nieuwe mogelijkheden. Wie jarenlang archieven heeft doorploegd, notities heeft gemaakt en fragmentarische verhalen heeft verzameld, herkent het probleem: veel feiten, maar moeite om er een helder, leesbaar en samenhangend verhaal van te maken. ChatGPT kan daarbij een waardevol hulpmiddel zijn — mits het met kennis van zaken en de nodige voorzichtigheid wordt ingezet.",
      chatgptWatKanTitle: "Wat ChatGPT wél goed kan",
      chatgptWatKanText: "ChatGPT is bijzonder sterk in structureren, herschrijven en verwoorden. Op basis van door de gebruiker aangeleverde gegevens kan het:",
      chatgptWatKan1: "losse notities omzetten in een vlot leesbare tekst;",
      chatgptWatKan2: "lange, technische beschrijvingen herschrijven tot begrijpelijke hoofdstukken;",
      chatgptWatKan3: "stijl en toon aanpassen (zakelijk, verhalend, beter toegankelijk maken voor niet-genealogen);",
      chatgptWatKan4: "herhalingen vermijden en chronologie verduidelijken.",
      chatgptMeerwaarde: "Voor veel familieonderzoekers ligt hier de grootste meerwaarde: ChatGPT fungeert als een redactionele assistent, niet als een onderzoeker. Het helpt om jarenlang werk eindelijk in boekvorm te gieten en toegankelijk te maken voor kinderen en kleinkinderen die niet vertrouwd zijn met archiefterminologie of voetnoten.",
      chatgptValkuilTitle: "De valkuil: schijnbare logica en onjuiste conclusies",
      chatgptValkuilText: "Tegelijk schuilt hier een reëel gevaar. ChatGPT werkt niet als een historicus, maar als een taalmodel dat waarschijnlijk klinkende verbanden legt. Wanneer het feitenmateriaal onvolledig, ambigu of suggestief is, kan het:",
      chatgptValkuil1: "causale verbanden suggereren die niet bewezen zijn;",
      chatgptValkuil2: "vermoedens stilzwijgend als feiten formuleren;",
      chatgptValkuil3: "chronologische hiaten \"opvullen\" met aannames;",
      chatgptValkuil4: "migraties, beroepen of sociale status logisch laten lijken, zonder harde bron.",
      chatgptValkuilUitleg: "Bij genealogie is dat bijzonder riskant. Familiegeschiedenis zit vol schijnbaar logische, maar historisch onjuiste aannames: dezelfde naam is niet automatisch dezelfde persoon; een verhuis heeft niet noodzakelijk één duidelijke oorzaak; een beroep in een akte zegt niet altijd iets over levenslang sociaal statuut. Daarom geldt een belangrijke regel: ChatGPT mag nooit conclusies trekken die niet expliciet door de gebruiker zijn onderbouwd met bronnen. De eindverantwoordelijkheid blijft altijd bij de auteur.",
      chatgptBestTitle: "Best practices bij tekstgebruik",
      chatgptBestText: "Verantwoord gebruik van ChatGPT betekent onder meer:",
      chatgptBest1: "feiten en interpretaties duidelijk van elkaar scheiden;",
      chatgptBest2: "vermoedens expliciet als hypothese laten formuleren;",
      chatgptBest3: "elke herschreven tekst opnieuw kritisch nalezen;",
      chatgptBest4: "bronverwijzingen zelf toevoegen en controleren;",
      chatgptBest5: "ChatGPT niet laten \"samenvatten\" wat het zelf niet onderzocht heeft.",
      chatgptBestUitleg: "Wie ChatGPT vraagt om een tekst te herschrijven, doet er goed aan om expliciet te zeggen: \"verander de stijl, niet de inhoud\" — en dat ook effectief te controleren.",
      chatgptFotoTitle: "Oude foto's bewerken met AI: tussen herstel en vervalsing",
      chatgptFotoText: "Ook bij het bewerken en verbeteren van oude foto's biedt AI indrukwekkende mogelijkheden. Vervaagde beelden kunnen scherper worden, contrasten hersteld, beschadigingen weggewerkt en gezichten opnieuw leesbaar gemaakt. Voor familiegeschiedenis is dit vaak een emotionele meerwaarde: voorouders worden letterlijk opnieuw zichtbaar.",
      chatgptFotoCaption: "Voorbeelden van AI-bewerkte oude foto's",
      chatgptVoordelenTitle: "De voordelen",
      chatgptVoordeel1: "foto's worden beter reproduceerbaar in druk;",
      chatgptVoordeel2: "details (kledij, gelaatsuitdrukking, omgeving) worden duidelijker;",
      chatgptVoordeel3: "beschadigde foto's worden gered van verdere vergetelheid;",
      chatgptVoordeel4: "jongere generaties voelen meer verbondenheid met het beeldmateriaal.",
      chatgptVoordelenCaption: "Groepsfoto bij het huwelijk van mijn ouders, Jooris (Georges) Deforce & Simonne Vandeputte op 7 juni 1945. Een unieke foto, de enige die we nog terugvonden; maar van heel slechte kwaliteit. In de door GROK verbeterde en ingekleurde versie is de meerderheid van de gezichten nog herkenbaar maar toch duidelijk vervormd. Dit was mijn eenvoudige prompt voor GROK om die foto te verbeteren: \"maak die foto scherper, gekleurd, als met een moderne digitale camera genomen. Behoud de gezichten zo getrouw mogelijk.\"",
      chatgptRisicoTitle: "De risico's",
      chatgptRisicoText: "Maar ook hier is voorzichtigheid geboden. AI-gestuurde beeldverbetering voegt soms informatie toe die er nooit was:",
      chatgptRisico1: "rimpels of gelaatstrekken worden \"verzonnen\";",
      chatgptRisico2: "uniformen of stoffen krijgen een textuur die niet historisch correct is;",
      chatgptRisico3: "schaduwen, lichtval of zelfs gezichtsuitdrukkingen worden aangepast;",
      chatgptRisico4: "kleuren worden geïnterpreteerd, niet gereconstrueerd.",
      chatgptRisicoUitleg: "Het resultaat oogt realistischer, maar is niet altijd historisch correct. De foto wordt dan geen bron meer, maar een interpretatie van een bron.",
      chatgptVerantwoordTitle: "Verantwoord omgaan met fotobewerking",
      chatgptVerantwoordIntro: "Een goede praktijk is om:",
      chatgptVerantwoord1: "altijd het originele beeld te bewaren;",
      chatgptVerantwoord2: "bewerkte foto's duidelijk als zodanig te labelen;",
      chatgptVerantwoord3: "geen gezichtskenmerken of context te laten wijzigen;",
      chatgptVerantwoord4: "verbeteringen te beperken tot scherpte, contrast en leesbaarheid;",
      chatgptVerantwoord5: "geen esthetische \"verfraaiing\" na te streven.",
      chatgptBesluitTitle: "Besluit",
      chatgptBesluitText1: "ChatGPT en andere AI-toepassingen zijn geen bedreiging voor de familiegeschiedenis, maar ook geen neutrale hulpmiddelen. Ze versterken wat de gebruiker aanreikt — zowel de kwaliteit als de fouten.",
      chatgptBesluitText2: "Wie AI inzet als schrijfhulp, redacteur en technisch assistent, en niet als bron of onderzoeker, wint aan helderheid, leesbaarheid en bereik. Wie de kritische controle loslaat, riskeert echter dat zijn familiegeschiedenis onbedoeld evolueert van documentatie naar fictie.",
      chatgptBesluitText3: "Familiegeschiedenis blijft mensenwerk. AI kan helpen om dat werk beter te tonen — maar nooit om het denken, twijfelen en controleren te vervangen.",
      anecdotesTitle: "Enkele anecdotes",
      anecdoteGustaafTitle: "ca. 1875 Gustaaf Timmerman",
      anecdoteGustaafIntro: "(verteld door Alida Timmerman, Kleine Meter)",
      anecdoteStrynckxTitle: "1887 - Modest Strynckx",
      anecdoteStrynckxText1: "OPGEHANGEN - Den 15 November 1887 heeft Modest Strynckx-Hostekint, borstelmaker bij Em. Gheysens, gepoogd zich op te hangen. Hij werd in tijde afgesneden en naar St. Anne gedaan, naar het zothuis. Sedert eenigen tijd had hij tekens van krankzinnigheid gegeven en onlangs heeft men hem moeten ontwapenen. Hij was op het punt met eene hap en een mes zijn vrouw en zes kinderen te vermoorden.",
      anecdoteStrynckxText2: "OPGEHANGEN - Den 21 april 1889, Paaschen, 's noens verhangt zich Modest Strynckx, in de Krekelstraat, laat weduwe en 5 kleine kinderen in de armoede. Begraven 3° Paaschdag.",
      anecdoteStrynckxSource: "uit: Dagboek van Jules Lafaut, uittreksels gepubliceerd in Ten Mandere nr. 76, november 1986",
      anecdoteOnweerTitle: "1895 - Schrikkelijk onweer, branden, ongelukken",
      anecdoteOnweerText1: "Zaterdagavond, 10 Augustus 1895, heeft geheel het land door een groot onweer gepaard met donder en bliksem plaats gehad. Gedurende heel den dag had een sterke hitte geheerscht, de donderbeetjes krielden bij de macht en elkeen was donder verwachtende. Van 6 tot 9 uren heeft het onweder gewoed en aan den gang geweest, meer dan wij het in vele jaren geweten hebben. Men moet opklimmen tot 1855 om te kunnen spreken van een onweder gelijk dat van heden.",
      anecdoteOnweerText2: "Op Klein-Harelbeke is de bliksem gevallen op een tweewoonst bewoond door Emiel Geldhof-Vanderheeren en zijnen broeder Henri Geldhof-Couckhuyt. Louise Couckhuyt zat met haar kind van 20 maanden op den schoot, zij werd door den bliksem gedood alsook haar 7 jarige dochter Marie, die nevens haar stond. Het klein kind wierd van haren schoot geworpen zonder letsel te bekomen. In weinige ogenblikken waren beide huizen door den brand vernield. Zij behoorden toe aan Felix Neyrinck.",
      anecdoteOnweerSource: "uit: Dagboek van Jules Lafaut, uittreksels gepubliceerd in Ten Mandere nr. 76, november 1986",
      anecdoteOnweerReconstructieTitle: "Reconstructie van die zaterdagavond 10 augustus 1895",
      anecdoteOnweerReconstructieText: "Hier is een reconstructie van wat er die zaterdagavond 10 augustus 1895 en de dagen eromheen in West-Vlaanderen speelde, gebaseerd op historische bronnen en krantenarchieven (zoals De Westvlaming en de Gazette van Brugge).",
      anecdoteOnweerHitte: "1. De verzengende hitte aan de kust",
      anecdoteOnweerHitteText: "In de kuststeden zoals Oostende en Blankenberge was het die zaterdag ongekend druk. De kranten meldden dat de treinen vanuit het binnenland \"overladen\" waren met mensen die koelte zochten aan de zee. Hoewel Oostende 34,7°C mat, zorgde de avond aan de kust voor een klein beetje verlichting door de zeebries, maar de \"zwoelheid\" bleef hangen tot diep in de nacht.",
      anecdoteOnweerOpkomst: "2. Onweer op komst?",
      anecdoteOnweerOpkomstText: "Rond die zaterdagavond hing er een enorme elektrische spanning in de lucht. In de regio Brugge en het zuiden van de provincie (regio Kortrijk) werd er in de verslagen van die week gesproken over \"dreigende luchten\". Men snakte naar onweer om de lucht te zuiveren, maar vaak bleef het bij wat \"weerlichten\" aan de horizon zonder dat er echt regen viel die de hitte brak.",
      anecdoteOnweerImpact: "3. Impact op het dagelijks leven (uit de kranten)",
      anecdoteOnweerOogst: "Oogst: De boeren in de West-Vlaamse polders waren volop bezig met de oogst. Krantenberichten uit die week waarschuwden voor de gevaren van werken in de volle zon; er werden verschillende gevallen van zonnesteek gemeld bij landarbeiders.",
      anecdoteOnweerWater: "Drinkwater: In sommige kleinere dorpen in de provincie begon men zich die week zorgen te maken over de waterstand in de putten, omdat het al een hele tijd niet substantieel geregend had.",
      anecdoteOnweerToerisme: "Toerisme: In de kranten werd met enige trots gemeld dat de Belgische kust \"het Parijs van de Noordzee\" was geworden, met duizenden toeristen die tot laat in de avond op de zeedijken flaneerden omdat het binnen in de hotels en huizen niet uit te houden was van de hitte.",
      anecdoteOnweerAnekdote: "4. Een specifieke anekdote uit die tijd",
      anecdoteOnweerAnekdoteText: "In de lokale berichtgeving werd vaak geklaagd dat de \"ijskelders\" (waar men ijsblokken bewaarde voor koeling) in de steden leeg begonnen te raken door de aanhoudende hitte die al sinds 9 augustus duurde.",
      anecdoteOnweerSamenvatting: "Samenvattend voor zaterdagavond 10 augustus 1895:",
      anecdoteOnweerSamenvattingText: "Het was een avond van uitersten. De zon ging onder in een vuurrode gloed, de terrassen in de steden zaten overvol, en de West-Vlamingen beleefden een van de warmste nachten die ze in de 19e eeuw hadden meegemaakt. Het was een avond waarop niemand binnen wilde blijven.",
      anecdoteOnweerBron: "Bron: Perplexity",
      anecdoteJuwelenkistjeTitle: "1917 Het juwelenkistje",
      anecdoteJuwelenkistjeText: "Ergens in het jaar 2015 kreeg ik dit juwelenkistje, dat Marcel Deforce in 1917 maakte voor zijn verloofde, Madeleine Geldof, overhandigd door mijn tante Monique Deforce als een goed te bewaren erfstuk. Waarom ik dit kreeg? Omdat het kistje gemerkt is met de initialen \"MD\". Dat sloeg destijds uiteraard op de maker ervan: Marcel Deforce. Toen na jarenlang gebruik het kistje niet langer meer dienst deed als bewaarplek voor haar juwelen, gaf grote meter het door aan haar dochter Monique; logisch: ook haar initialen waren \"MD\". Monique vertelde me dat ze er haar afgeknipte paardenstaart jarenlang in bewaarde. Nu gebruikte ze het kistje niet meer en zocht er een zinnige bestemming voor. Ze besloot dus om het door te geven aan de volgende generatie, aan iemand met dezelfde initialen... Ik bewaar dit kunstig en intussen echt wel antiek object zorgvuldig voor het nageslacht en het lijkt me haast vanzelfsprekend dat de volgende erfgenaam ervan mijn kleindochter Marie Deforce zal zijn. (Tenzij de familie ervoor zou opteren om alle bewaarde erfgoed-objecten in één verzameling te bewaren...)",
      anecdoteHuwelijksgedichtTitle: "7 Juni 1945 - Huwelijksgedicht",
      anecdoteHuwelijksgedichtIntro: "Toen mijn ouders, Jooris Deforce & Simonne Vandeputte in juni 1945 trouwden, was het nog volop de traditie dat er gelukwenstelegrammen werden gestuurd door familie en kennissen die niet naar het feest kwamen, omdat ze verhinderd waren of niet op het feestmaal waren uitgenodigd. Speciaal voor dat soort gelegenheden had de RTT (de Regie van Telegraaf en Telefoon) enkele modellen van mooi versierde telegramformulieren beschikbaar.",
      anecdoteHuwelijksgedichtText1: "Die telegrammen werden dan tijdens het feestmaal voorgelezen, afgewisseld met de gebruikelijke toespraken. Kennissen en verre verwanten hielden het beleefd en soms nogal plechtig. Directe familieleden en intieme vrienden durfden het wel iets vrijpostiger formuleren. Typisch voor die tijd mocht het wat ondeugend zijn, maar niet té: je moest de grens met de schunnigheid wel in de gaten houden.",
      anecdoteHuwelijksgedichtText2: "In mijn familiearchief vond ik nog een heel bundel van die telegrammen, en ook de toespraak door Emiel Geldof (toen 80 jaar oud), grootvader van de bruidegom, in de vorm van een gelegenheidsgedicht in 13 verzen.",
      anecdoteHuwelijksgedichtTelegramCaption: "Gelukwenstelegram bij het huwelijk, 1945",
      anecdoteHuwelijksgedichtCaption: "Huwelijksgedicht door Emiel Geldof, pagina 1",
      anecdoteHuwelijksgedichtPageCaption: "Huwelijksgedicht door Emiel Geldof, pagina 2",
      anecdoteHuwelijksgedichtTranscriptieBtn: "📜 Transcriptie van het gedicht",
      anecdoteHuwelijksgedichtTranscriptie: `Huwelijksdicht
aan G. Deforce-Vandeputte, Heyghem 7 juni 1945

1. Het is van nu niet maar van over duizend jaren
Dat zich in rechte min twee jonge lieden paren
Als gij leeft in goede vriendschap liefde peis en vrede
Dan hebt gij en draagt gij uw toekomende geluk mede.

2. Ik moet aan deze jonge koppel menschen
Eenen grooten schoonen proficiat wenschen
Alhier welgekomen en zeer wel gezind
Omdat Mynheer de Paster dezen morgen hen bind.

3. Wanneer God den eersten mensch had geschapen
Op deze wereld met allerhande dieren en ook apen
Alsook met boomen, vruchten en alle soorten van bloemen
En ik kan nog veel andere dingen noemen.

4. Dan sprak Adam tot Onze Lieven Heer
Hebt gij daar geen schoon vrouwtje meer
Ik ben en sta hier gansch moeder ziel alleene
Dat ik later moeste komen zwak te beene.

5. Dan nam God eene van zijne ribben en algauw
Maakte Hij daarvan eene schoone vrouw
Hij gaf ze hem en zegt hen nu
Gaat en wandelt, wast en vermenigvuldig u.

6. Hij nam Eva en drukte haar aan zijn borst
Versch gewasschen en niet bemorst
En op iedere wang een zoen
Wat had zij nog meer van doen.

7. Ha zegt hij wat eene groote vreugd
Ik heb er van toch zulken deugd
Te mogen in een zacht bedde gaan
Met eene schoone vrouw zonder kleeren aan.

8. Nu Gorges bemind uwe lieftallige vrouw
Weest malkander altijd getrouw
Simonne zijt onderdanig aan uw man
Hij zal u geven wat gij vraagd me en dan.

9. Alzoo kunt gij een gelukkig leven genieten
Dan zal het u niet verdrieten
Met hard en neerstig te werken
Dat zal uwe lidmaten versterken.

10. De man met werken aan hout, koper en staal
Bij zijn vader en broeders allemaal
De vrouw met neerstig te zijn spaarzaam en net
Zoowel in huis als in bed.

11. Ge moet veel kinders koopen
Die gauw alleene loopen
En rap en zeere groeien
Dan zal het huwelijk bloeien.

12. Jonge trouwers ik wench u veel plezier
Drinkt maar een goed teugschen bier
Maar drinkt alsjeblieft niet te veel
Dat het staat tot aan de keel.

13. Nu lieve vrienden om te sluiten
Wil ik hier de waarheid uiten
Dat iedereen doe zijn best
O.L.H. zal doen de rest.

E.G.`,
      anecdoteSchandaalTitle: "1892 – Een schandaal in de familie",
      anecdoteSchandaalIntro: "In de familie van mijn moederskant circuleerde ooit een zacht uitgesproken roddel, nooit hardop verteld aan een tafel waar kinderen bij zaten. Maar naarmate ze ouder werd kon mijn moeder, Simonne Vandeputte, het niet laten om het familieschandaal waarover in haar jeugdjaren gefluisterd werd toch eens door te vertellen. Het ging over haar grootmoeder, Eugénie Boucké.",
      anecdoteSchandaalText1: "Eugénie, afkomstig uit Klerken en naar Izegem gekomen voor een betrekking als dienstmeid, was in 1877, op 25 jarige leeftijd, getrouwd met Gustavus Jacobus Timmerman. Ze kregen samen tussen 1879 en 1889 zeven kinderen, waaronder dus mijn grootmoeder Alida Timmerman. Tot nu toe alles naar behoren dus.",
      anecdoteSchandaalText2: "Toen haar man in 1890 overleed was zij 38 jaar oud. Twee jaar later, in mei 1892 kreeg zij nog een dochter: Alice Rosalia, van een onbekende vader, want ze was niet hertrouwd. Het kind werd amper 5 jaar oud, en overleed in september 1897. Het verhaal over \"Alice'ke\" bleef in de familie nog lang de ronde doen, maar meer details over de mogelijke vader zijn nooit bekend geworden en over haar verdere levensloop is niets meer geweten. Ze werd 82 jaar oud en overleed in juni 1934.",
      anecdoteSchandaalAkteCaption: "Geboorteakte Alice Rosalia Boucké, BS-G Izegem 1892, nr 138",
      anecdoteSchandaalZwijgenTitle: "Het discrete zwijgen van de akten",
      anecdoteSchandaalZwijgenText1: "Voor genealogisch onderzoek is een roddel nooit genoeg. Maar als ik de geboorteakte nader bekijk, dan zie ik hoe dit intieme familieverhaal deel uitmaakt van een groter maatschappelijk stilzwijgen. De akte schrijft geen drama, geen verwijt en geen beschuldiging. Ze noteert slechts dat een vroedvrouw een pasgeboren meisje is komen tonen aan de burgerlijke stand, dat het kind \"vrouwelijk\" is, dat het geboren is in de woning van de moeder, en dat het de namen draagt van Alice Rosalia.",
      anecdoteSchandaalZwijgenText2: "De moeder is weduwe, veertig jaar oud. Haar man is twee jaar eerder gestorven. Iedereen weet wat dit betekent. De ambtenaar weet het, de vroedvrouw weet het, de getuigen weten het. En toch staat er niets. Geen vader. Geen verklaring. Geen context. De aangifte gebeurt door vroedvrouw Romanie Nollet. De getuigen zijn: Petrus Sette, en Pieter Lescauwier, alle twee politieagent. Ambtenaren dus; ze zijn erbij gehaald bij afwezigheid van enige familie.",
      anecdoteSchandaalZwijgenText3: "Het is precies deze stilte die in veel families de roddels voedt. Waar de registers zwijgen, nemen gesprekken het over. Niet agressief, maar behoedzaam, bijna beschermend: men erkent dat de moeder geen andere keuze had, dat de samenleving hard was voor vrouwen die alleen achterbleven en toch moeder werden.",
      anecdoteSchandaalZwijgenText4: "Het is een vorm van mededogen, bijna modern in zijn poging om geen morele last op het kind te leggen. Men wist dat een kind dat eenmaal als \"natuurlijk\" of \"onecht\" bestempeld werd, dat stempel zijn hele leven mee kon dragen: bij erfenissen, bij schoolinschrijvingen, bij huwelijk.",
      anecdoteSchandaalZwijgenText5: "Daarom koos men de weg van de neutraliteit: geen vader ingevuld is op zichzelf meer dan voldoende informatie. In een tijd waarin bijna alle wettige geboorten plaatsvonden binnen het huwelijk, betekende de afwezigheid van een echtgenoot al alles wat men moest weten.",
      anecdoteSchandaalGeschiedenisTitle: "Een kleine geschiedenis in een groter verhaal",
      anecdoteSchandaalGeschiedenisText1: "Wanneer je langer in de archieven werkt, zie je hoe vaak kinderen zonder vader verschijnen. In sommige dorpen in de negentiende eeuw gaat het om tien tot twintig procent van de geboorten. Soldaten, seizoenarbeiders, weduwen die niet konden hertrouwen, dienstmeiden, meisjes die werkten in grootkeukens of fabrieken. Geen van hen vond een plaats in de officiële taal van de registers. Alleen hun kinderen.",
      anecdoteSchandaalGeschiedenisText2: "De akte van Alice is daarom geen uitzondering, maar een venster. Ze toont hoe de samenleving probeerde om leven mogelijk te maken zonder moraliserende taal. Ze laat zien dat men het stigma van vroeger verzachtte: geen veroordeling, geen expliciete beschuldiging, geen schande in schrift. Alleen het feit. Een geboorte hoefde geen bewijs van schuld te zijn.",
      anecdoteSchandaalVroegerTitle: "Vroeger was het minder discreet",
      anecdoteSchandaalVroegerText1: "In de periode vóór de Franse revolutie, toen de geboortes door de pastoor in de doopregisters van de parochie genoteerd werden, vinden we ettelijke voorbeelden waar onomwonden \"filius illegitimus\" (onwettige zoon) of \"filia illegitima\" (onwettige dochter\") geschreven staat. Soms zelfs onomwonden met de naam van de vader erbij! Andere termen die ook voorkomen zijn bv: natuurlijk kind, onecht, onwettig, volgens zeggen van de moeder, vader onbekend, uit hoererij, uit overspel (soms!), geboren uit zonde, verwekt in ontucht, zonder huwelijksband.",
      anecdoteSchandaalVroegerText2: "Vroedvrouwen werden door de geestelijkheid dubbel onder druk gezet: vooreerst — en dat gold bij àlle geboortes — was het uiterst belangrijk dat een boreling niet zou sterven zonder gedoopt te zijn. Dus bij risico-bevallingen moest de vroedvrouw zodra er een vermoeden was dat het kind de bevalling niet zou overleven zelf het kind dopen. Een \"nooddoop\".",
      anecdoteSchandaalVroegerText3: "Als het kind het overleefde werd de doop daarna in de kerk nog eens overgedaan door de pastoor, \"sub conditione\" werd daarbij in de akte genoteerd, dit betekent: \"onder voorwaarde…\" (…dat de nooddoop niet helemaal correct volgens de regels was verlopen) want men kan maar één keer geldig gedoopt worden.",
      anecdoteSchandaalVroegerText4: "Ten tweede, als de vroedvrouw geroepen werd om te assisteren bij de bevalling van een ongehuwde moeder moest zij te allen prijze tijdens de pijn van de weeën en de bevalling, de aanstaande ongehuwde moeder doen bekennen wie de vader van haar kind was. Als die bekentenis er kwam moest zij dat bij de pastoor onder ede verklaren en werd dat dan ook in de akte genoteerd!",
      anecdoteSchandaalVoorbeeldTitle: "Een mooi voorbeeld: Doopakte van Cyprianus Roose, PR_D Izegem, 24 november 1752",
      anecdoteSchandaalVoorbeeldText: "Gedoopt: Cyprianus, een onwettig kind van Maria Catharina Roose, met als getuigen Maria Ludovica Ibelé en Anna Maria De Coutere. Tijdens de bevalling, in noodsituatie, heeft de vroedvrouw Maria Veronica Dervaux onder ede verklaard dat de moeder haar had genoemd wie de vader was: Cyprianus Larmasauw, een jongeman, zoon van Martinus en Maria Joanna Van Aelbroeck.",
      anecdoteSchandaalVoorbeeldCaption: "Doopakte van Cyprianus Roose, Izegem 1752",
      anecdoteSchandaalSlotText: "De kerk had dus een uitgesproken morele positie ten opzichte van ongehuwde moeders en overspel. Daarom zien we in veel parochieregisters uitgesproken vermeldingen van illegitimiteit en een duidelijke scheiding tussen wettige en natuurlijke kinderen, met soms zelfs moraliserende of stigmatiserende termen. Maar belangrijk: het kind werd gedoopt, want de doop is een sacrament dat het recht op religieuze erkenning had, los van de vraag wie de vader was.",
    },
    en: {
      sectionTitle: "DNA research in our family tree",
      intro: "For years, I worked exclusively with genealogy through classical sources: old parish registers, notarial deeds, baptismal, marriage and burial books, population registers, military lists and all kinds of other archives. The research had something romantic about it: constantly browsing, comparing, correcting, puzzling. These documents remain the absolute foundation for me. Yet sometimes you feel the limitations: spelling errors, illegible registers, confusing name variants, sometimes deliberate concealments or simply documents that were never preserved.",
      intro2: "When I later began exploring DNA research, I noticed it added a new layer to the paper family tree. DNA does not replace the archives but strengthens them considerably. In theory, you can confirm kinship, correct errors from sources, find lost family members or test hypotheses about migration and descent. It is a second lens to look at the same family history — one that does not lie, and that needs no documents to speak. In practice, it is somewhat more complicated.",
      howTitle: "How does DNA research work in practice?",
      howText: "On our family website at MyHeritage, I joined the DNA project after submitting my own DNA sample. I remember thinking: \"It sounds complicated,\" but the procedure turned out to be surprisingly simple:",
      howStep1: "MyHeritage sends you a test kit with a simple cheek swab. No blood, no saliva, no fuss. You swipe the inside of your cheek, put it in a tube and send it to their lab.",
      howStep2: "In the lab, your DNA is read out. The genetic markers are converted into digital data. Algorithms compare your profile with millions of others and estimate your ethnicity and possible kinship.",
      resultsIntro: "Afterwards, you see two types of results appear on the site/app:",
      ethnicityTitle: "1. Ethnicity Estimate / Genetic Groups",
      ethnicityText: "This estimate shows in percentages from which regions your DNA appears to originate. MyHeritage has thousands of groups worldwide, giving you sometimes surprisingly fine breakdowns — not just continents, but micro-regions and historical populations. The origin of our genetic material is — quite logically — spread across a large part of Europe:",
      matchesTitle: "2. DNA matches (family members / kinship)",
      matchesText: "You get a long list of people whose DNA partially overlaps with yours. The greater the overlap, the closer the kinship. Sometimes they are distant cousins you never knew. In theory, you can discover completely new family branches or confirm unexpected kinships.",
      experienceTitle: "My own experience with matches",
      experienceText1: "In DNA match lists, you depend on the willingness of others to participate. When someone from the same family branch submits their DNA, they suddenly appear as a match. This sometimes produces surprises.",
      experienceText2: "When I first looked, I was startled by the number: 6,009 matches! My first thought was: how much hidden family is here? But in practice, it turned out less spectacular than the number suggests.",
      experienceText3: "The vast majority of those matches share only a minuscule piece of DNA with me — so small that you learn little from it. It merely suggests we had a common ancestor somewhere in the distant past, but that is genealogically unusable without additional data.",
      experienceText4: "A small handful — at most a few dozen — turned out to be real distant relatives I didn't yet know. Some of them had an elaborate family tree on MyHeritage, allowing us to link them to our own family, often several generations back. But honestly: the thousands of other matches are genealogical dead ends.",
      experienceText5: "On balance, I have about five demonstrable kinships that have real genealogical significance. They confirm what I already knew from archives, sometimes in a pleasant way. It remains fun to meet such an unexpected distant cousin. For example, I met Steven Timmerman, a distant cousin I had never heard of, living in Germany:",
      timmermanTitle: "Kinship with Steven Timmerman",
      geldofTitle: "Kinship with Christine Geldof",
      geldofText: "A second clear match provides a fun anecdote: through it I can prove that I am my father's son, even though a DNA sample was never taken from my father! A distant cousin did submit a DNA sample: the kinship with Christine Geldof — we both have Emile Geldof as a common great-grandfather — shows that the 'Geldof DNA' can only have been passed on through my father (he received it via his mother).",
      dnaFamilyTitle: "DNA as a tool for family stories",
      dnaFamilyText1: "What fascinates me is the potential of DNA to confirm or debunk old family stories — stories that exist in many families but could never be proven: illegitimate children, secret adoptions, unknown kinships or migrations never recorded on paper. In theory, DNA can solve such mysteries and provide certainty that paper never can.",
      dnaFamilyText2: "Finding lost family branches would also be a possibility, as would determining whether kinship exists with family branches we find but cannot link to our family tree with paper evidence.",
      projectsText: "I can think of two projects we should undertake someday. First: using DNA to determine whether kinship can be found among the many Deleforge's still living in the Nord-Pas de Calais region with a common ancestor.",
      deleforgeTitle: "Maurice Deleforge — a missed opportunity",
      deleforgeText1: "There is also a second matter that intrigues me: quite by chance, it must have been around 2019 or 2020, I found a reference to an article in Le Monde about a certain Maurice Deleforge who died at nearly 85 years of age in Lille on 15 October 2018. He apparently had considerable fame in France, as a professor and \"Directeur des Etudes\" of the \"Ecole Supérieure de Journalisme de Lille\".",
      deleforgeText2: "The man was apparently so revered that the Ecole Supérieure named both its library and an annual prize after him:",
      deleforgeQuote: "La bibliothèque porte le nom d'une figure emblématique de l'école, Maurice Deleforge, professeur de français et directeur des études entre 1961 et 1994. Depuis sa disparition en 2018, le prix Maurice-Deleforge, remis par l'ESJ Lille et le Réseau ESJ, l'association des alumni, récompense les élèves du Master généraliste dont les qualités d'écriture reflètent l'amour et le respect de la langue française qu'a prodigués Maurice à des milliers de journalistes.",
      deleforgeText3: "In 2008 he wrote a book — about his family history — which he self-published, titled \"Labaobou, Chronique des Deleforge par l'un d'eux\". That was of course an enormous missed opportunity: had I discovered this man a few years earlier, I could have contacted him and corresponded about our possibly shared ancestry.",
      kitCaption: "MyHeritage DNA test kit",
      ethnicityCaption: "Ethnicity estimate based on DNA analysis",
      matchesCaption: "DNA matches on MyHeritage",
      geldofCaption: "Kinship via Emile Geldof",
      deleforgeBoekCaption: "\"Labaobou, Chronique des Deleforge par l'un d'eux\" — the book by Maurice Deleforge (2008)",
      deleforgeSquareCaption: "Maurice Deleforge (1933–2018), professor and author",
      deleforgeText4: "My frustration grew even greater after reading his book. It was a very literary and rather romanticized family story, set in Marcq-en-Baroeul, Loos and other neighboring municipalities that connect with our ancestral residences. It would therefore not be surprising if, a number of generations back, we could find a link to our ancestors. But the concise family tree he publishes does go back beyond 1670, yet remains completely separate from our own family tree!",
      deleforgeText5: "The annoying thing is that this family tree as a whole cannot be found in elaborated form on the classic genealogical sites like Geneanet and MyHeritage: all my investigations have yielded nothing. To make a long story short and return to the DNA theme: it would truly be a challenge to use DNA research from one or some of his children or grandchildren to determine whether or not we are related. Someday someone should take this on...",
      samenwerkingTitle: "The power of collaboration",
      samenwerkingText: "DNA research only truly comes to life when many people participate and link their data to elaborated family trees. An individual test is interesting, but it only becomes truly valuable when genetic matches also share a documented past. Together you build a genetic map of the family, which continues to expand.",
      samenwerkingRealistisch: "However, it is important to remain realistic:",
      samenwerkingPunt1: "The further back you go in time, the harder it becomes to prove kinship via DNA. Autosomal DNA gets lost over generations: small pieces disappear, become fragmented or are no longer statistically demonstrable. A test can therefore almost never say with certainty that you had an ancestor in a particular region 6, 7 or 8 generations ago.",
      samenwerkingPunt2: "I have learned to view DNA ethnicity as a directional indicator, not as absolute truth. It offers hypotheses that you must combine with archival research and historical data.",
      samenwerkingPunt3: "The greatest power of DNA lies for me in matches and kinship, not in \"ethnicity\". The real value arises when a match has a usable family tree — and we can help each other.",
      samenwerkingPunt4: "I am very aware of privacy: you share genetic data that can be sensitive not only for yourself but also for family members. You must therefore carefully consider how you manage data and with whom you share it.",
      samenwerkingPunt5: "DNA should never be used to make broad claims about \"race\", \"purity\" or grand migration stories. Such interpretations are often historically naive and scientifically oversimplified.",
      overervingCaption: "DNA inheritance through the generations",
      eindreflectieTitle: "Final reflection",
      eindreflectieText1: "For me, DNA research feels like a fascinating complement to what I have been reconstructing through archives for years. It is not spectacular in the sense that it suddenly rewrote my family tree. But it confirms, nuances, opens small side paths, and sometimes gives a glimpse of kinship that would otherwise remain hidden.",
      eindreflectieText2: "I have not yet discovered any major revelations — no lost family members, no secret ancestry, no dramatic surprises. But who knows what will appear when in the future more people from our extended family branches have their DNA tested?",
      eindreflectieText3: "My genealogy therefore remains firmly rooted in archival material, but with DNA as a silent witness in the background, ready to speak when it can.",
      chatgptTitle: "ChatGPT as a tool for writing family history",
      chatgptIntro: "While writing this book, I regularly used ChatGPT to reformulate pieces of text or to improve old photos in quality and even convert old black-and-white or sepia photos to color. Sometimes this brought new inspiration, but often I found incorrect or fabricated conclusions in texts or facial distortions in photos. Almost all AI texts had to be thoroughly evaluated and rewritten to better align with the source material and to remove or nuance incorrect inferences. That is why I wrote an extensive prompt to have ChatGPT itself write an article about responsible use of ChatGPT. Here is the result (but again slightly adjusted by myself):",
      chatgptKansenTitle: "Opportunities, pitfalls and responsible use",
      chatgptKansenText: "The rise of artificial intelligence, and more specifically language models like ChatGPT, offers genealogists and family historians new possibilities. Anyone who has plowed through archives for years, taken notes and collected fragmentary stories recognizes the problem: many facts, but difficulty creating a clear, readable and coherent story. ChatGPT can be a valuable tool in this — provided it is used with knowledge and the necessary caution.",
      chatgptWatKanTitle: "What ChatGPT does well",
      chatgptWatKanText: "ChatGPT is particularly strong at structuring, rewriting and articulating. Based on data provided by the user, it can:",
      chatgptWatKan1: "convert loose notes into smoothly readable text;",
      chatgptWatKan2: "rewrite long, technical descriptions into understandable chapters;",
      chatgptWatKan3: "adjust style and tone (businesslike, narrative, more accessible for non-genealogists);",
      chatgptWatKan4: "avoid repetitions and clarify chronology.",
      chatgptMeerwaarde: "For many family researchers, this is where the greatest added value lies: ChatGPT functions as an editorial assistant, not as a researcher. It helps to finally put years of work into book form and make it accessible for children and grandchildren who are not familiar with archival terminology or footnotes.",
      chatgptValkuilTitle: "The pitfall: apparent logic and incorrect conclusions",
      chatgptValkuilText: "At the same time, there is a real danger here. ChatGPT does not work as a historian, but as a language model that creates plausible-sounding connections. When factual material is incomplete, ambiguous or suggestive, it can:",
      chatgptValkuil1: "suggest causal connections that are not proven;",
      chatgptValkuil2: "silently formulate assumptions as facts;",
      chatgptValkuil3: "\"fill in\" chronological gaps with assumptions;",
      chatgptValkuil4: "make migrations, professions or social status seem logical, without hard sources.",
      chatgptValkuilUitleg: "In genealogy, this is particularly risky. Family history is full of apparently logical but historically incorrect assumptions: the same name is not automatically the same person; a move does not necessarily have one clear cause; a profession in a deed does not always say something about lifelong social status. Therefore, an important rule applies: ChatGPT should never draw conclusions that are not explicitly substantiated by the user with sources. The final responsibility always lies with the author.",
      chatgptBestTitle: "Best practices for text use",
      chatgptBestText: "Responsible use of ChatGPT means, among other things:",
      chatgptBest1: "clearly separate facts from interpretations;",
      chatgptBest2: "explicitly formulate assumptions as hypotheses;",
      chatgptBest3: "critically re-read every rewritten text;",
      chatgptBest4: "add and verify source references yourself;",
      chatgptBest5: "do not let ChatGPT \"summarize\" what it has not itself researched.",
      chatgptBestUitleg: "Anyone who asks ChatGPT to rewrite a text should explicitly say: \"change the style, not the content\" — and actually verify this.",
      chatgptFotoTitle: "Editing old photos with AI: between restoration and falsification",
      chatgptFotoText: "AI also offers impressive possibilities when editing and improving old photos. Faded images can be sharpened, contrasts restored, damage removed and faces made readable again. For family history, this is often an emotional added value: ancestors literally become visible again.",
      chatgptFotoCaption: "Examples of AI-edited old photos",
      chatgptVoordelenTitle: "The advantages",
      chatgptVoordeel1: "photos become better reproducible in print;",
      chatgptVoordeel2: "details (clothing, facial expressions, surroundings) become clearer;",
      chatgptVoordeel3: "damaged photos are saved from further oblivion;",
      chatgptVoordeel4: "younger generations feel more connected to the visual material.",
      chatgptVoordelenCaption: "Group photo at the wedding of my parents, Jooris (Georges) Deforce & Simonne Vandeputte on June 7, 1945. A unique photo, the only one we could still find; but of very poor quality. In the GROK improved and colorized version, the majority of faces are still recognizable but clearly distorted. This was my simple prompt for GROK to improve the photo: \"make the photo sharper, colored, as if taken with a modern digital camera. Keep the faces as faithful as possible.\"",
      chatgptRisicoTitle: "The risks",
      chatgptRisicoText: "But caution is also needed here. AI-driven image enhancement sometimes adds information that was never there:",
      chatgptRisico1: "wrinkles or facial features are \"invented\";",
      chatgptRisico2: "uniforms or fabrics get a texture that is not historically correct;",
      chatgptRisico3: "shadows, lighting or even facial expressions are altered;",
      chatgptRisico4: "colors are interpreted, not reconstructed.",
      chatgptRisicoUitleg: "The result looks more realistic, but is not always historically correct. The photo then becomes not a source, but an interpretation of a source.",
      chatgptVerantwoordTitle: "Responsible photo editing",
      chatgptVerantwoordIntro: "Good practice is to:",
      chatgptVerantwoord1: "always preserve the original image;",
      chatgptVerantwoord2: "clearly label edited photos as such;",
      chatgptVerantwoord3: "not allow facial features or context to be changed;",
      chatgptVerantwoord4: "limit improvements to sharpness, contrast and readability;",
      chatgptVerantwoord5: "not pursue aesthetic \"embellishment\".",
      chatgptBesluitTitle: "Conclusion",
      chatgptBesluitText1: "ChatGPT and other AI applications are not a threat to family history, but neither are they neutral tools. They amplify what the user provides — both the quality and the errors.",
      chatgptBesluitText2: "Those who use AI as a writing aid, editor and technical assistant, and not as a source or researcher, gain clarity, readability and reach. Those who let go of critical control risk their family history unintentionally evolving from documentation to fiction.",
      chatgptBesluitText3: "Family history remains human work. AI can help show that work better — but never replace the thinking, doubting and checking.",
      anecdotesTitle: "Some anecdotes",
      anecdoteGustaafTitle: "ca. 1875 Gustaaf Timmerman",
      anecdoteGustaafIntro: "(told by Alida Timmerman, Kleine Meter)",
      anecdoteStrynckxTitle: "1887 - Modest Strynckx",
      anecdoteStrynckxText1: "HANGED - On November 15, 1887, Modest Strynckx-Hostekint, brush maker at Em. Gheysens, attempted to hang himself. He was cut down in time and taken to St. Anne, to the asylum. For some time he had shown signs of insanity and recently they had to disarm him. He was on the point of murdering his wife and six children with a chopper and a knife.",
      anecdoteStrynckxText2: "HANGED - On April 21, 1889, Easter, at noon Modest Strynckx hangs himself in the Krekelstraat, leaving a widow and 5 small children in poverty. Buried on the 3rd day of Easter.",
      anecdoteStrynckxSource: "from: Diary of Jules Lafaut, excerpts published in Ten Mandere no. 76, November 1986",
      anecdoteOnweerTitle: "1895 - Terrible storm, fires, accidents",
      anecdoteOnweerText1: "Saturday evening, August 10, 1895, a great storm accompanied by thunder and lightning occurred throughout the entire country. Throughout the day a strong heat had prevailed, the fireflies swarmed in abundance and everyone was expecting thunder. From 6 to 9 o'clock the storm raged, more than we had known in many years. One must go back to 1855 to be able to speak of a storm like today's.",
      anecdoteOnweerText2: "At Klein-Harelbeke, lightning struck a semi-detached house inhabited by Emiel Geldhof-Vanderheeren and his brother Henri Geldhof-Couckhuyt. Louise Couckhuyt was sitting with her 20-month-old child on her lap; she was killed by lightning as was her 7-year-old daughter Marie, who was standing next to her. The small child was thrown from her lap without injury. Within moments both houses were destroyed by fire. They belonged to Felix Neyrinck.",
      anecdoteOnweerSource: "from: Diary of Jules Lafaut, excerpts published in Ten Mandere no. 76, November 1986",
      anecdoteOnweerReconstructieTitle: "Reconstruction of that Saturday evening, August 10, 1895",
      anecdoteOnweerReconstructieText: "Here is a reconstruction of what happened that Saturday evening, August 10, 1895, and the surrounding days in West Flanders, based on historical sources and newspaper archives (such as De Westvlaming and the Gazette van Brugge).",
      anecdoteOnweerHitte: "1. The scorching heat at the coast",
      anecdoteOnweerHitteText: "In the coastal towns such as Ostend and Blankenberge, it was unprecedentedly busy that Saturday. The newspapers reported that the trains from the interior were \"overloaded\" with people seeking coolness at the sea. Although Ostend measured 34.7°C, the evening at the coast brought a little relief from the sea breeze, but the \"sultriness\" lingered deep into the night.",
      anecdoteOnweerOpkomst: "2. Storm approaching?",
      anecdoteOnweerOpkomstText: "Around that Saturday evening, there was an enormous electrical tension in the air. In the Bruges region and the south of the province (Kortrijk area), the reports of that week spoke of \"threatening skies\". People craved a thunderstorm to purify the air, but often it remained at some \"heat lightning\" on the horizon without any rain actually falling to break the heat.",
      anecdoteOnweerImpact: "3. Impact on daily life (from the newspapers)",
      anecdoteOnweerOogst: "Harvest: The farmers in the West Flemish polders were busy with the harvest. Newspaper reports from that week warned of the dangers of working in full sun; several cases of sunstroke were reported among farm workers.",
      anecdoteOnweerWater: "Drinking water: In some smaller villages in the province, people began to worry that week about the water level in the wells, as it had not rained substantially for quite some time.",
      anecdoteOnweerToerisme: "Tourism: The newspapers reported with some pride that the Belgian coast had become \"the Paris of the North Sea\", with thousands of tourists strolling on the seawalls late into the evening because it was unbearable inside the hotels and houses due to the heat.",
      anecdoteOnweerAnekdote: "4. A specific anecdote from that time",
      anecdoteOnweerAnekdoteText: "In local reporting, there were frequent complaints that the \"ice cellars\" (where ice blocks were stored for cooling) in the cities were starting to run empty due to the persistent heat that had lasted since August 9.",
      anecdoteOnweerSamenvatting: "In summary for Saturday evening, August 10, 1895:",
      anecdoteOnweerSamenvattingText: "It was an evening of extremes. The sun set in a fiery red glow, the terraces in the cities were packed, and the West Flemings experienced one of the warmest nights they had known in the 19th century. It was an evening when nobody wanted to stay indoors.",
      anecdoteOnweerBron: "Source: Perplexity",
      anecdoteJuwelenkistjeTitle: "1917 The jewelry box",
      anecdoteJuwelenkistjeText: "Somewhere in 2015 I received this jewelry box, which Marcel Deforce made in 1917 for his fiancée, Madeleine Geldof, handed to me by my aunt Monique Deforce as a heritage piece to be carefully preserved. Why did I receive it? Because the box is marked with the initials \"MD\". That originally referred to the maker: Marcel Deforce. When after years of use the box no longer served as a storage place for her jewelry, grandmother passed it on to her daughter Monique; logical: her initials were also \"MD\". Monique told me she kept her cut-off ponytail in it for years. Now she no longer used the box and was looking for a meaningful destination. She decided to pass it on to the next generation, to someone with the same initials... I carefully preserve this artfully crafted and by now truly antique object for posterity and it seems almost self-evident that the next heir will be my granddaughter Marie Deforce. (Unless the family would opt to keep all preserved heritage objects in one collection...)",
      anecdoteHuwelijksgedichtTitle: "June 7, 1945 - Wedding Poem",
      anecdoteHuwelijksgedichtIntro: "When my parents, Jooris Deforce & Simonne Vandeputte married in June 1945, it was still very much the tradition to send congratulatory telegrams by family and acquaintances who could not attend the celebration, because they were prevented or not invited to the wedding dinner. Especially for such occasions, the RTT (the Belgian Telegraph and Telephone Agency) had several models of beautifully decorated telegram forms available.",
      anecdoteHuwelijksgedichtText1: "These telegrams were then read aloud during the wedding dinner, alternating with the customary speeches. Acquaintances and distant relatives kept it polite and sometimes rather solemn. Direct family members and intimate friends dared to be somewhat more forward. Typical of the era, it could be slightly naughty, but not too much: one had to watch the line with vulgarity.",
      anecdoteHuwelijksgedichtText2: "In my family archive I still found a whole bundle of those telegrams, as well as the speech by Emiel Geldof (then 80 years old), grandfather of the groom, in the form of an occasional poem in 13 verses.",
      anecdoteHuwelijksgedichtTelegramCaption: "Congratulatory telegram at the wedding, 1945",
      anecdoteHuwelijksgedichtCaption: "Wedding poem by Emiel Geldof, page 1",
      anecdoteHuwelijksgedichtPageCaption: "Wedding poem by Emiel Geldof, page 2",
      anecdoteHuwelijksgedichtTranscriptieBtn: "📜 Transcription of the poem",
      anecdoteHuwelijksgedichtTranscriptie: `Wedding Poem
to G. Deforce-Vandeputte, Heyghem 7 June 1945

1. It is not from now but from over a thousand years
That two young people unite in true love
If you live in good friendship, love, peace and harmony
Then you have and carry your future happiness with you.

2. I must wish this young couple
A great and beautiful congratulations
Welcome here and very well disposed
Because this morning the Pastor binds them.

3. When God had created the first man
On this world with all kinds of animals and also apes
As well as with trees, fruits and all sorts of flowers
And I can name many other things.

4. Then Adam spoke to Our Dear Lord
Have you no pretty wife left
I am and stand here all alone
That I later had to come weak on my legs.

5. Then God took one of his ribs and soon
He made from it a beautiful woman
He gave her to him and says to them now
Go and walk, grow and multiply.

6. He took Eve and pressed her to his chest
Freshly washed and unsoiled
And on each cheek a kiss
What more did she need.

7. Ah he says what a great joy
I take such delight in it
To be able to go into a soft bed
With a beautiful woman without clothes on.

8. Now Georges love your lovely wife
Be always faithful to each other
Simonne be obedient to your husband
He will give you what you ask now and then.

9. Thus you can enjoy a happy life
Then it will not grieve you
To work hard and diligently
That will strengthen your limbs.

10. The man working with wood, copper and steel
With his father and brothers all together
The wife being diligent, thrifty and neat
Both in house and in bed.

11. You must buy many children
Who soon walk on their own
And grow quickly
Then the marriage will flourish.

12. Young newlyweds I wish you much pleasure
Just drink a good sip of beer
But please do not drink too much
That it reaches up to your throat.

13. Now dear friends to conclude
I want to speak the truth here
That everyone does their best
Our Dear Lord will do the rest.

E.G.`,
      anecdoteSchandaalTitle: "1892 – A scandal in the family",
      anecdoteSchandaalIntro: "On my mother's side of the family, a softly spoken piece of gossip once circulated, never told aloud at a table where children were present. But as she grew older, my mother, Simonne Vandeputte, could not resist retelling the family scandal that had been whispered about during her youth. It was about her grandmother, Eugénie Boucké.",
      anecdoteSchandaalText1: "Eugénie, originally from Klerken and having come to Izegem for a position as a maid, had married Gustavus Jacobus Timmerman in 1877 at the age of 25. Together they had seven children between 1879 and 1889, including my grandmother Alida Timmerman. So far, everything was proper.",
      anecdoteSchandaalText2: "When her husband died in 1890, she was 38 years old. Two years later, in May 1892, she had another daughter: Alice Rosalia, from an unknown father, as she had not remarried. The child barely reached 5 years old and died in September 1897. The story of \"Alice'ke\" continued to circulate in the family for a long time, but more details about the possible father were never revealed. She lived to be 82 and died in June 1934.",
      anecdoteSchandaalAkteCaption: "Birth certificate of Alice Rosalia Boucké, Civil Registry Izegem 1892, no. 138",
      anecdoteSchandaalZwijgenTitle: "The discreet silence of the records",
      anecdoteSchandaalZwijgenText1: "For genealogical research, gossip is never enough. But when I look more closely at the birth certificate, I see how this intimate family story is part of a larger societal silence. The record writes no drama, no reproach and no accusation. It merely notes that a midwife came to present a newborn girl to the civil registry, that the child is \"female\", that it was born in the mother's home, and that it bears the names Alice Rosalia.",
      anecdoteSchandaalZwijgenText2: "The mother is a widow, forty years old. Her husband died two years earlier. Everyone knows what this means. The official knows it, the midwife knows it, the witnesses know it. And yet nothing is written. No father. No explanation. No context. The declaration is made by midwife Romanie Nollet. The witnesses are: Petrus Sette and Pieter Lescauwier, both police officers. Civil servants, therefore; they were brought in due to the absence of any family.",
      anecdoteSchandaalZwijgenText3: "It is precisely this silence that feeds gossip in many families. Where the registers are silent, conversations take over. Not aggressively, but cautiously, almost protectively: people acknowledged that the mother had no other choice, that society was hard on women who were left alone and yet became mothers.",
      anecdoteSchandaalZwijgenText4: "It is a form of compassion, almost modern in its attempt not to place a moral burden on the child. People knew that a child once labelled as \"natural\" or \"illegitimate\" could carry that label throughout its life: in inheritances, school enrolments, marriage.",
      anecdoteSchandaalZwijgenText5: "That is why the path of neutrality was chosen: no father filled in is in itself more than sufficient information. In an era when almost all legitimate births took place within marriage, the absence of a husband already said everything one needed to know.",
      anecdoteSchandaalGeschiedenisTitle: "A small history in a larger story",
      anecdoteSchandaalGeschiedenisText1: "When you work longer in the archives, you see how often children without a father appear. In some villages in the nineteenth century, it concerns ten to twenty percent of births. Soldiers, seasonal workers, widows who could not remarry, maids, girls who worked in large kitchens or factories. None of them found a place in the official language of the registers. Only their children.",
      anecdoteSchandaalGeschiedenisText2: "Alice's birth certificate is therefore not an exception, but a window. It shows how society tried to make life possible without moralizing language. It shows that the stigma of earlier times was softened: no condemnation, no explicit accusation, no shame in writing. Only the fact. A birth did not have to be proof of guilt.",
      anecdoteSchandaalVroegerTitle: "In earlier times it was less discreet",
      anecdoteSchandaalVroegerText1: "In the period before the French Revolution, when births were recorded by the parish priest in the baptismal registers, we find numerous examples where \"filius illegitimus\" (illegitimate son) or \"filia illegitima\" (illegitimate daughter) is written bluntly. Sometimes even with the father's name! Other terms that also appear include: natural child, illegitimate, according to the mother's statement, father unknown, born of prostitution, from adultery (sometimes!), born in sin, conceived in fornication, without marriage bond.",
      anecdoteSchandaalVroegerText2: "Midwives were put under double pressure by the clergy: firstly — and this applied to all births — it was extremely important that a newborn would not die unbaptized. So in risky deliveries, the midwife had to baptize the child herself as soon as there was a suspicion the child would not survive. An \"emergency baptism\".",
      anecdoteSchandaalVroegerText3: "If the child survived, the baptism was then repeated in church by the parish priest, \"sub conditione\" was noted in the record, meaning: \"under the condition...\" (that the emergency baptism may not have been performed entirely correctly) because one can only be validly baptized once.",
      anecdoteSchandaalVroegerText4: "Secondly, if the midwife was called to assist at the delivery of an unmarried mother, she had to at all costs, during the pain of contractions and delivery, make the unmarried mother-to-be confess who the father of her child was. If the confession came, she had to declare it under oath to the parish priest, and it was then recorded in the register!",
      anecdoteSchandaalVoorbeeldTitle: "A fine example: Baptismal record of Cyprianus Roose, PR_D Izegem, 24 November 1752",
      anecdoteSchandaalVoorbeeldText: "Baptized: Cyprianus, an illegitimate child of Maria Catharina Roose, with as witnesses Maria Ludovica Ibelé and Anna Maria De Coutere. During the delivery, in an emergency situation, midwife Maria Veronica Dervaux declared under oath that the mother had named the father: Cyprianus Larmasauw, a young man, son of Martinus and Maria Joanna Van Aelbroeck.",
      anecdoteSchandaalVoorbeeldCaption: "Baptismal record of Cyprianus Roose, Izegem 1752",
      anecdoteSchandaalSlotText: "The Church thus held a pronounced moral position regarding unmarried mothers and adultery. That is why we see in many parish registers explicit mentions of illegitimacy and a clear distinction between legitimate and natural children, sometimes even with moralizing or stigmatizing terms. But importantly: the child was baptized, because baptism is a sacrament that gave the right to religious recognition, regardless of who the father was.",
    },
    fr: {
      sectionTitle: "Recherche ADN dans notre arbre généalogique",
      intro: "Pendant des années, je me suis exclusivement consacré à la généalogie par des sources classiques : anciens registres paroissiaux, actes notariés, registres de baptême, mariage et sépulture, registres de population, listes militaires et toutes sortes d'autres archives. La recherche avait quelque chose de romantique. Ces documents restent pour moi la base absolue. Pourtant, on ressent parfois les limites : fautes d'orthographe, registres illisibles, variantes de noms déroutantes, parfois des dissimulations volontaires ou simplement des documents jamais conservés.",
      intro2: "Lorsque j'ai commencé à explorer la recherche ADN, j'ai remarqué qu'elle ajoutait une nouvelle couche à l'arbre généalogique papier. L'ADN ne remplace pas les archives mais les renforce considérablement. En théorie, on peut confirmer des parentés, corriger des erreurs, retrouver des membres de famille disparus ou tester des hypothèses sur la migration et la descendance. C'est un second regard sur la même histoire familiale — qui ne ment pas.",
      howTitle: "Comment fonctionne la recherche ADN en pratique ?",
      howText: "Sur notre site familial chez MyHeritage, je me suis inscrit au projet ADN après avoir envoyé mon propre échantillon. Je me souviens avoir pensé : \"Ça a l'air compliqué\", mais la procédure s'est avérée étonnamment simple :",
      howStep1: "MyHeritage vous envoie un kit de test avec un simple écouvillon buccal. Pas de sang, pas de salive, pas de complications.",
      howStep2: "Au laboratoire, votre ADN est lu. Les marqueurs génétiques sont convertis en données numériques. Des algorithmes comparent votre profil avec des millions d'autres.",
      resultsIntro: "Ensuite, deux types de résultats apparaissent :",
      ethnicityTitle: "1. Estimation d'ethnicité",
      ethnicityText: "Cette estimation montre en pourcentages de quelles régions votre ADN semble provenir. L'origine de notre matériel génétique se situe — très logiquement — sur une grande partie de l'Europe :",
      matchesTitle: "2. Correspondances ADN (parenté)",
      matchesText: "Vous obtenez une longue liste de personnes dont l'ADN chevauche partiellement le vôtre. Plus le chevauchement est important, plus la parenté est proche.",
      experienceTitle: "Mon expérience personnelle avec les correspondances",
      experienceText1: "Dans les listes de correspondances ADN, vous dépendez de la volonté des autres à participer.",
      experienceText2: "Quand j'ai regardé pour la première fois, j'ai été surpris par le nombre : 6 009 correspondances !",
      experienceText3: "La grande majorité ne partage qu'un minuscule morceau d'ADN avec moi — si petit qu'on n'en apprend rien.",
      experienceText4: "Une petite poignée — tout au plus quelques dizaines — se sont avérés être de vrais parents éloignés que je ne connaissais pas encore.",
      experienceText5: "Au final, je retiens une petite cinq parentés démontrables qui ont une véritable signification généalogique. Par exemple, j'ai rencontré Steven Timmerman, un cousin éloigné vivant en Allemagne :",
      timmermanTitle: "Parenté avec Steven Timmerman",
      geldofTitle: "Parenté avec Christine Geldof",
      geldofText: "Une deuxième correspondance claire fournit une anecdote amusante : je peux prouver que je suis le fils de mon père, même si un échantillon ADN n'a jamais été prélevé de mon père ! La parenté avec Christine Geldof — nous avons tous les deux Emile Geldof comme arrière-grand-père commun — montre que l'ADN 'Geldof' ne peut avoir été transmis que par mon père.",
      dnaFamilyTitle: "L'ADN comme outil pour les histoires familiales",
      dnaFamilyText1: "Ce qui me fascine, c'est le potentiel de l'ADN pour confirmer ou infirmer d'anciennes histoires familiales — des histoires qui existent dans beaucoup de familles mais n'ont jamais pu être prouvées.",
      dnaFamilyText2: "Retrouver des branches familiales disparues serait également une possibilité.",
      projectsText: "Je peux déjà imaginer deux projets que nous devrions entreprendre un jour. D'abord : utiliser l'ADN pour vérifier s'il existe une parenté parmi les nombreux Deleforge vivant encore dans la région Nord-Pas de Calais.",
      deleforgeTitle: "Maurice Deleforge — une occasion manquée",
      deleforgeText1: "Il y a aussi une deuxième affaire qui m'intrigue : tout à fait par hasard, ce devait être vers 2019 ou 2020, je trouve une référence à un article dans Le Monde sur un certain Maurice Deleforge, décédé à près de 85 ans à Lille le 15 octobre 2018. Il avait en France une renommée considérable, comme professeur et « Directeur des Études » de l'École Supérieure de Journalisme de Lille.",
      deleforgeText2: "L'homme était apparemment si vénéré que l'École Supérieure a donné son nom à la bibliothèque et à un prix annuel :",
      deleforgeQuote: "La bibliothèque porte le nom d'une figure emblématique de l'école, Maurice Deleforge, professeur de français et directeur des études entre 1961 et 1994.",
      deleforgeText3: "En 2008, il a encore écrit un livre — sur son histoire familiale — publié à compte d'auteur, intitulé « Labaobou, Chronique des Deleforge par l'un d'eux ». C'était évidemment une occasion manquée énorme.",
      kitCaption: "Kit de test ADN MyHeritage",
      ethnicityCaption: "Estimation d'ethnicité basée sur l'analyse ADN",
      matchesCaption: "Correspondances ADN sur MyHeritage",
      geldofCaption: "Parenté via Emile Geldof",
      deleforgeBoekCaption: "« Labaobou, Chronique des Deleforge par l'un d'eux » — le livre de Maurice Deleforge (2008)",
      deleforgeSquareCaption: "Maurice Deleforge (1933–2018), professeur et auteur",
      deleforgeText4: "Ma frustration a encore grandi après avoir lu son livre. C'était un récit familial très littéraire et assez romancé, qui se déroule à Marcq-en-Baroeul, Loos et d'autres communes voisines qui jouxtent nos lieux ancestraux. Il ne serait donc pas étonnant si, quelques générations en arrière, nous pouvions retrouver un lien vers nos ancêtres. Mais l'arbre généalogique sommaire qu'il publie remonte certes au-delà de 1670, mais reste complètement séparé du nôtre !",
      deleforgeText5: "L'ennui, c'est que cet arbre généalogique dans son ensemble ne se retrouve pas sous forme élaborée sur les sites généalogiques classiques comme Geneanet et MyHeritage : toutes mes recherches n'ont rien donné. Pour faire court et revenir au thème de l'ADN : ce serait un véritable défi d'utiliser la recherche ADN sur un ou plusieurs de ses enfants ou petits-enfants pour déterminer si nous sommes apparentés ou non. Un jour, quelqu'un devrait s'en occuper...",
      samenwerkingTitle: "La force de la collaboration",
      samenwerkingText: "La recherche ADN ne prend véritablement vie que lorsque de nombreuses personnes participent et relient leurs données à des arbres généalogiques élaborés. Un test individuel est intéressant, mais il ne devient vraiment précieux que lorsque les correspondances génétiques partagent aussi un passé documenté. Ensemble, on construit une carte génétique de la famille, qui continue de s'étendre.",
      samenwerkingRealistisch: "Il est toutefois important de rester réaliste :",
      samenwerkingPunt1: "Plus on remonte dans le temps, plus il est difficile de prouver la parenté via l'ADN. L'ADN autosomique se perd au fil des générations : de petits morceaux disparaissent, se fragmentent ou ne sont plus statistiquement détectables.",
      samenwerkingPunt2: "J'ai appris à considérer l'ethnicité ADN comme un indicateur directionnel, pas comme une vérité absolue.",
      samenwerkingPunt3: "La plus grande force de l'ADN réside pour moi dans les correspondances et la parenté, pas dans l'\"ethnicité\". La vraie valeur apparaît quand une correspondance dispose d'un arbre généalogique exploitable — et que nous pouvons nous aider mutuellement.",
      samenwerkingPunt4: "Je suis très conscient de la vie privée : vous partagez des données génétiques qui peuvent être sensibles non seulement pour vous-même, mais aussi pour les membres de votre famille.",
      samenwerkingPunt5: "L'ADN ne devrait jamais être utilisé pour faire de grandes déclarations sur la « race », la « pureté » ou de grands récits migratoires. De telles interprétations sont souvent historiquement naïves et scientifiquement simplistes.",
      overervingCaption: "L'héritage ADN à travers les générations",
      eindreflectieTitle: "Réflexion finale",
      eindreflectieText1: "Pour moi, la recherche ADN est un complément fascinant à ce que je reconstitue depuis des années à travers les archives. Ce n'est pas spectaculaire au sens où elle aurait soudainement réécrit mon arbre. Mais elle confirme, nuance, ouvre de petits chemins de traverse, et donne parfois un aperçu de parenté qui resterait autrement cachée.",
      eindreflectieText2: "Je n'ai pas encore fait de grandes révélations — pas de membres de famille perdus, pas d'ascendance secrète, pas de surprises dramatiques. Mais qui sait ce qui apparaîtra quand, à l'avenir, davantage de personnes de nos branches familiales étendues feront tester leur ADN ?",
      eindreflectieText3: "Ma généalogie reste donc fermement ancrée dans le matériel d'archives, mais avec l'ADN comme témoin silencieux en arrière-plan, prêt à parler quand il le peut.",
      chatgptTitle: "ChatGPT comme outil pour écrire l'histoire familiale",
      chatgptIntro: "En écrivant ce livre, j'ai régulièrement utilisé ChatGPT pour reformuler des passages de texte ou pour améliorer la qualité de vieilles photos et même convertir d'anciennes photos en noir et blanc ou sépia en couleur. Parfois cela apportait une nouvelle inspiration, mais souvent je trouvais des conclusions incorrectes ou inventées dans les textes ou des déformations faciales dans les photos. Presque tous les textes IA ont dû être évalués et réécrits en profondeur.",
      chatgptKansenTitle: "Opportunités, pièges et usage responsable",
      chatgptKansenText: "L'essor de l'intelligence artificielle offre aux généalogistes et historiens familiaux de nouvelles possibilités. ChatGPT peut être un outil précieux — à condition d'être utilisé avec discernement et prudence.",
      chatgptWatKanTitle: "Ce que ChatGPT fait bien",
      chatgptWatKanText: "ChatGPT est particulièrement fort pour structurer, réécrire et formuler. Il peut :",
      chatgptWatKan1: "transformer des notes éparses en un texte fluide ;",
      chatgptWatKan2: "réécrire des descriptions longues et techniques en chapitres compréhensibles ;",
      chatgptWatKan3: "adapter le style et le ton ;",
      chatgptWatKan4: "éviter les répétitions et clarifier la chronologie.",
      chatgptMeerwaarde: "Pour beaucoup de chercheurs familiaux, c'est là que réside la plus grande valeur ajoutée : ChatGPT fonctionne comme un assistant rédactionnel, pas comme un chercheur.",
      chatgptValkuilTitle: "Le piège : logique apparente et conclusions erronées",
      chatgptValkuilText: "En même temps, un danger réel se cache ici. ChatGPT ne travaille pas comme un historien, mais comme un modèle linguistique qui crée des liens plausibles. Il peut :",
      chatgptValkuil1: "suggérer des liens causaux non prouvés ;",
      chatgptValkuil2: "formuler silencieusement des suppositions comme des faits ;",
      chatgptValkuil3: "« combler » des lacunes chronologiques avec des hypothèses ;",
      chatgptValkuil4: "rendre plausibles des migrations ou statuts sociaux sans source solide.",
      chatgptValkuilUitleg: "En généalogie, c'est particulièrement risqué. L'histoire familiale est pleine d'hypothèses apparemment logiques mais historiquement incorrectes. Règle importante : ChatGPT ne devrait jamais tirer de conclusions non étayées par l'utilisateur avec des sources.",
      chatgptBestTitle: "Bonnes pratiques pour l'utilisation de textes",
      chatgptBestText: "Un usage responsable de ChatGPT signifie notamment :",
      chatgptBest1: "séparer clairement faits et interprétations ;",
      chatgptBest2: "formuler explicitement les suppositions comme des hypothèses ;",
      chatgptBest3: "relire critiquement chaque texte réécrit ;",
      chatgptBest4: "ajouter et vérifier soi-même les références aux sources ;",
      chatgptBest5: "ne pas laisser ChatGPT « résumer » ce qu'il n'a pas lui-même étudié.",
      chatgptBestUitleg: "Quiconque demande à ChatGPT de réécrire un texte devrait dire explicitement : « changez le style, pas le contenu » — et vérifier effectivement.",
      chatgptFotoTitle: "Retoucher de vieilles photos avec l'IA : entre restauration et falsification",
      chatgptFotoText: "L'IA offre également des possibilités impressionnantes pour éditer et améliorer de vieilles photos. Les images floues peuvent être aiguisées, les contrastes restaurés, les dommages effacés et les visages rendus à nouveau lisibles. Pour l'histoire familiale, c'est souvent une valeur ajoutée émotionnelle : les ancêtres redeviennent littéralement visibles.",
      chatgptFotoCaption: "Exemples de photos anciennes retouchées par IA",
      chatgptVoordelenTitle: "Les avantages",
      chatgptVoordeel1: "les photos deviennent mieux reproductibles à l'impression ;",
      chatgptVoordeel2: "les détails (vêtements, expression du visage, environnement) deviennent plus clairs ;",
      chatgptVoordeel3: "les photos endommagées sont sauvées de l'oubli ;",
      chatgptVoordeel4: "les jeunes générations se sentent plus connectées au matériel visuel.",
      chatgptVoordelenCaption: "Photo de groupe au mariage de mes parents, Jooris (Georges) Deforce & Simonne Vandeputte le 7 juin 1945. Une photo unique, la seule que nous avons retrouvée ; mais de très mauvaise qualité. Dans la version améliorée et colorisée par GROK, la majorité des visages est encore reconnaissable mais clairement déformée. Voici le prompt simple que j'ai utilisé pour GROK afin d'améliorer cette photo : « rends la photo plus nette, en couleur, comme prise avec un appareil photo numérique moderne. Conserve les visages aussi fidèlement que possible. »",
      chatgptRisicoTitle: "Les risques",
      chatgptRisicoText: "Mais la prudence est également de mise. L'amélioration d'image par IA ajoute parfois des informations qui n'existaient jamais :",
      chatgptRisico1: "des rides ou traits du visage sont « inventés » ;",
      chatgptRisico2: "les uniformes ou tissus reçoivent une texture qui n'est pas historiquement correcte ;",
      chatgptRisico3: "les ombres, l'éclairage ou même les expressions faciales sont modifiés ;",
      chatgptRisico4: "les couleurs sont interprétées, pas reconstruites.",
      chatgptRisicoUitleg: "Le résultat paraît plus réaliste, mais n'est pas toujours historiquement correct. La photo devient alors non plus une source, mais une interprétation d'une source.",
      chatgptVerantwoordTitle: "Usage responsable de la retouche photo",
      chatgptVerantwoordIntro: "Une bonne pratique consiste à :",
      chatgptVerantwoord1: "toujours conserver l'image originale ;",
      chatgptVerantwoord2: "clairement étiqueter les photos retouchées comme telles ;",
      chatgptVerantwoord3: "ne pas laisser modifier les traits du visage ou le contexte ;",
      chatgptVerantwoord4: "limiter les améliorations à la netteté, au contraste et à la lisibilité ;",
      chatgptVerantwoord5: "ne pas rechercher d'« embellissement » esthétique.",
      chatgptBesluitTitle: "Conclusion",
      chatgptBesluitText1: "ChatGPT et autres applications IA ne sont ni une menace pour l'histoire familiale, ni des outils neutres. Ils amplifient ce que l'utilisateur fournit — tant la qualité que les erreurs.",
      chatgptBesluitText2: "Celui qui utilise l'IA comme aide à l'écriture, rédacteur et assistant technique, et non comme source ou chercheur, gagne en clarté, lisibilité et portée. Celui qui abandonne le contrôle critique risque que son histoire familiale évolue involontairement de la documentation vers la fiction.",
      chatgptBesluitText3: "L'histoire familiale reste un travail humain. L'IA peut aider à mieux montrer ce travail — mais jamais à remplacer la réflexion, le doute et la vérification.",
      anecdotesTitle: "Quelques anecdotes",
      anecdoteGustaafTitle: "ca. 1875 Gustaaf Timmerman",
      anecdoteGustaafIntro: "(raconté par Alida Timmerman, Kleine Meter)",
      anecdoteStrynckxTitle: "1887 - Modest Strynckx",
      anecdoteStrynckxText1: "PENDU - Le 15 novembre 1887, Modest Strynckx-Hostekint, fabricant de brosses chez Em. Gheysens, a tenté de se pendre. Il a été décroché à temps et envoyé à Ste-Anne, à l'asile. Depuis quelque temps il montrait des signes de folie et récemment on avait dû le désarmer. Il était sur le point de tuer sa femme et ses six enfants avec une hache et un couteau.",
      anecdoteStrynckxText2: "PENDU - Le 21 avril 1889, Pâques, à midi Modest Strynckx se pend dans la Krekelstraat, laissant une veuve et 5 petits enfants dans la misère. Enterré le 3e jour de Pâques.",
      anecdoteStrynckxSource: "extrait de : Journal de Jules Lafaut, extraits publiés dans Ten Mandere n° 76, novembre 1986",
      anecdoteOnweerTitle: "1895 - Terrible orage, incendies, accidents",
      anecdoteOnweerText1: "Le samedi soir, 10 août 1895, un grand orage accompagné de tonnerre et d'éclairs a eu lieu dans tout le pays. Toute la journée une forte chaleur avait régné, les vers luisants pullulaient et chacun s'attendait au tonnerre. De 6 à 9 heures l'orage a fait rage, plus que nous ne l'avions connu depuis de nombreuses années.",
      anecdoteOnweerText2: "À Klein-Harelbeke, la foudre est tombée sur une maison mitoyenne habitée par Emiel Geldhof-Vanderheeren et son frère Henri Geldhof-Couckhuyt. Louise Couckhuyt était assise avec son enfant de 20 mois sur les genoux ; elle fut tuée par la foudre ainsi que sa fille Marie, 7 ans, qui se tenait à côté d'elle. Le petit enfant fut projeté de ses genoux sans blessure. En quelques instants les deux maisons furent détruites par le feu.",
      anecdoteOnweerSource: "extrait de : Journal de Jules Lafaut, extraits publiés dans Ten Mandere n° 76, novembre 1986",
      anecdoteOnweerReconstructieTitle: "Reconstitution de ce samedi soir 10 août 1895",
      anecdoteOnweerReconstructieText: "Voici une reconstitution de ce qui se passait ce samedi soir 10 août 1895 et les jours environnants en Flandre occidentale, basée sur des sources historiques et des archives de journaux (comme De Westvlaming et la Gazette van Brugge).",
      anecdoteOnweerHitte: "1. La chaleur torride à la côte",
      anecdoteOnweerHitteText: "Dans les villes côtières comme Ostende et Blankenberge, ce samedi était d'une affluence sans précédent. Les journaux rapportaient que les trains de l'intérieur étaient « surchargés » de gens cherchant la fraîcheur à la mer. Bien qu'Ostende mesurât 34,7°C, la soirée à la côte apporta un peu de soulagement grâce à la brise marine, mais la « moiteur » persista jusqu'au cœur de la nuit.",
      anecdoteOnweerOpkomst: "2. L'orage approche ?",
      anecdoteOnweerOpkomstText: "Autour de ce samedi soir, une énorme tension électrique régnait dans l'air. Dans la région de Bruges et le sud de la province (région de Courtrai), les comptes rendus de cette semaine parlaient de « cieux menaçants ». On aspirait à un orage pour purifier l'air, mais souvent il ne s'agissait que de quelques « éclairs de chaleur » à l'horizon sans qu'une pluie véritable ne vienne briser la chaleur.",
      anecdoteOnweerImpact: "3. Impact sur la vie quotidienne (d'après les journaux)",
      anecdoteOnweerOogst: "Récolte : Les agriculteurs des polders de Flandre occidentale étaient en pleine moisson. Les articles de journaux de cette semaine mettaient en garde contre les dangers du travail en plein soleil ; plusieurs cas d'insolation furent signalés chez les ouvriers agricoles.",
      anecdoteOnweerWater: "Eau potable : Dans certains petits villages de la province, on commençait cette semaine à s'inquiéter du niveau d'eau dans les puits, car il n'avait pas plu substantiellement depuis longtemps.",
      anecdoteOnweerToerisme: "Tourisme : Les journaux rapportaient avec une certaine fierté que la côte belge était devenue « le Paris de la mer du Nord », avec des milliers de touristes se promenant sur les digues tard le soir car il était insupportable de rester à l'intérieur des hôtels et des maisons à cause de la chaleur.",
      anecdoteOnweerAnekdote: "4. Une anecdote spécifique de l'époque",
      anecdoteOnweerAnekdoteText: "Dans les reportages locaux, on se plaignait fréquemment que les « glacières » (où l'on conservait des blocs de glace pour le refroidissement) des villes commençaient à se vider en raison de la chaleur persistante qui durait depuis le 9 août.",
      anecdoteOnweerSamenvatting: "En résumé pour le samedi soir 10 août 1895 :",
      anecdoteOnweerSamenvattingText: "C'était une soirée d'extrêmes. Le soleil se couchait dans une lueur rouge feu, les terrasses des villes étaient bondées, et les Flamands occidentaux vivaient l'une des nuits les plus chaudes qu'ils aient connues au XIXe siècle. C'était une soirée où personne ne voulait rester à l'intérieur.",
      anecdoteOnweerBron: "Source : Perplexity",
      anecdoteJuwelenkistjeTitle: "1917 Le coffret à bijoux",
      anecdoteJuwelenkistjeText: "Quelque part en 2015, j'ai reçu ce coffret à bijoux, que Marcel Deforce avait fabriqué en 1917 pour sa fiancée, Madeleine Geldof, remis par ma tante Monique Deforce comme un objet patrimonial à conserver précieusement. Pourquoi l'ai-je reçu ? Parce que le coffret est marqué des initiales « MD ». Cela désignait à l'origine le fabricant : Marcel Deforce. Quand après des années le coffret ne servait plus de rangement pour ses bijoux, grand-mère l'a donné à sa fille Monique ; logique : ses initiales étaient aussi « MD ». Monique m'a raconté qu'elle y avait conservé sa queue de cheval coupée pendant des années. Maintenant elle n'utilisait plus le coffret et cherchait une destination sensée. Elle a décidé de le transmettre à la génération suivante, à quelqu'un avec les mêmes initiales... Je conserve soigneusement cet objet artistique et désormais véritablement antique pour la postérité et il me semble presque évident que la prochaine héritière sera ma petite-fille Marie Deforce.",
      anecdoteHuwelijksgedichtTitle: "7 juin 1945 - Poème de mariage",
      anecdoteHuwelijksgedichtIntro: "Quand mes parents, Jooris Deforce & Simonne Vandeputte se sont mariés en juin 1945, c'était encore pleinement la tradition d'envoyer des télégrammes de félicitations par la famille et les connaissances qui ne pouvaient pas assister à la fête, parce qu'ils étaient empêchés ou n'étaient pas invités au repas de noces. Spécialement pour ce genre d'occasions, la RTT (la Régie du Télégraphe et du Téléphone) disposait de plusieurs modèles de formulaires de télégrammes joliment décorés.",
      anecdoteHuwelijksgedichtText1: "Ces télégrammes étaient ensuite lus à haute voix pendant le repas de noces, alternant avec les discours habituels. Les connaissances et parents éloignés restaient polis et parfois assez solennels. Les membres directs de la famille et les amis intimes osaient être un peu plus audacieux. Typique de l'époque, cela pouvait être légèrement coquin, mais pas trop : il fallait surveiller la limite avec la vulgarité.",
      anecdoteHuwelijksgedichtText2: "Dans mes archives familiales, j'ai encore trouvé tout un paquet de ces télégrammes, ainsi que le discours d'Emiel Geldof (alors âgé de 80 ans), grand-père du marié, sous la forme d'un poème de circonstance en 13 strophes.",
      anecdoteHuwelijksgedichtTelegramCaption: "Télégramme de félicitations au mariage, 1945",
      anecdoteHuwelijksgedichtCaption: "Poème de mariage par Emiel Geldof, page 1",
      anecdoteHuwelijksgedichtPageCaption: "Poème de mariage par Emiel Geldof, page 2",
      anecdoteHuwelijksgedichtTranscriptieBtn: "📜 Transcription du poème",
      anecdoteHuwelijksgedichtTranscriptie: `Poème de mariage
à G. Deforce-Vandeputte, Heyghem 7 juin 1945

1. Ce n'est pas d'aujourd'hui mais de plus de mille ans
Que deux jeunes gens s'unissent en véritable amour
Si vous vivez dans l'amitié, l'amour, la paix et l'harmonie
Alors vous portez en vous votre bonheur futur.

2. Je dois souhaiter à ce jeune couple
De grandes et belles félicitations
Bienvenus ici et très bien disposés
Car ce matin le Curé les unit.

3. Quand Dieu eut créé le premier homme
Sur cette terre avec toutes sortes d'animaux et aussi des singes
Ainsi qu'avec des arbres, des fruits et toutes sortes de fleurs
Et je peux encore nommer bien d'autres choses.

4. Alors Adam parla à Notre Seigneur
N'avez-vous plus de jolie femme
Je suis et me tiens ici tout seul
Que je devais plus tard venir faible sur mes jambes.

5. Alors Dieu prit une de ses côtes et bientôt
Il en fit une belle femme
Il la lui donna et leur dit maintenant
Allez et marchez, croissez et multipliez-vous.

6. Il prit Ève et la pressa contre sa poitrine
Fraîchement lavée et sans tache
Et sur chaque joue un baiser
Que lui fallait-il de plus.

7. Ah dit-il quelle grande joie
J'en éprouve un tel plaisir
De pouvoir aller dans un lit doux
Avec une belle femme sans vêtements.

8. Maintenant Georges aimez votre charmante épouse
Soyez toujours fidèles l'un à l'autre
Simonne soyez soumise à votre mari
Il vous donnera ce que vous demanderez de temps en temps.

9. Ainsi vous pourrez jouir d'une vie heureuse
Alors cela ne vous chagrinerez pas
De travailler dur et assidûment
Cela renforcera vos membres.

10. L'homme travaillant le bois, le cuivre et l'acier
Avec son père et ses frères tous ensemble
La femme étant assidue, économe et soignée
Aussi bien dans la maison qu'au lit.

11. Vous devez acheter beaucoup d'enfants
Qui bientôt marchent tout seuls
Et grandissent vite
Alors le mariage fleurira.

12. Jeunes mariés je vous souhaite beaucoup de plaisir
Buvez donc une bonne gorgée de bière
Mais s'il vous plaît ne buvez pas trop
Que cela monte jusqu'à la gorge.

13. Maintenant chers amis pour conclure
Je veux dire ici la vérité
Que chacun fasse de son mieux
Notre Seigneur fera le reste.

E.G.`,
      anecdoteSchandaalTitle: "1892 – Un scandale dans la famille",
      anecdoteSchandaalIntro: "Du côté maternel de ma famille circulait autrefois un ragot murmuré à voix basse. Il s'agissait de sa grand-mère, Eugénie Boucké.",
      anecdoteSchandaalText1: "Eugénie, originaire de Klerken, avait épousé Gustavus Jacobus Timmerman en 1877. Ensemble, ils eurent sept enfants entre 1879 et 1889, dont ma grand-mère Alida Timmerman.",
      anecdoteSchandaalText2: "Lorsque son mari mourut en 1890, elle avait 38 ans. Deux ans plus tard, en mai 1892, elle eut encore une fille : Alice Rosalia, d'un père inconnu. L'enfant n'atteignit que 5 ans et mourut en septembre 1897. Elle vécut jusqu'à 82 ans et mourut en juin 1934.",
      anecdoteSchandaalAkteCaption: "Acte de naissance d'Alice Rosalia Boucké, État civil Izegem 1892, n° 138",
      anecdoteSchandaalZwijgenTitle: "Le silence discret des actes",
      anecdoteSchandaalZwijgenText1: "L'acte ne note ni drame, ni reproche, ni accusation. Il note simplement qu'une sage-femme est venue présenter une nouveau-née à l'état civil.",
      anecdoteSchandaalZwijgenText2: "La mère est veuve, âgée de quarante ans. Tout le monde sait ce que cela signifie. Et pourtant rien n'est écrit. Pas de père. Pas d'explication.",
      anecdoteSchandaalZwijgenText3: "C'est précisément ce silence qui nourrit les ragots dans de nombreuses familles.",
      anecdoteSchandaalZwijgenText4: "C'est une forme de compassion, presque moderne dans sa tentative de ne pas imposer un fardeau moral à l'enfant.",
      anecdoteSchandaalZwijgenText5: "C'est pourquoi on choisit la voie de la neutralité : ne pas indiquer de père est en soi une information plus que suffisante.",
      anecdoteSchandaalGeschiedenisTitle: "Une petite histoire dans un plus grand récit",
      anecdoteSchandaalGeschiedenisText1: "Quand on travaille longtemps dans les archives, on voit à quel point les enfants sans père apparaissent fréquemment. Dans certains villages au XIXe siècle, cela concerne dix à vingt pour cent des naissances.",
      anecdoteSchandaalGeschiedenisText2: "L'acte d'Alice n'est donc pas une exception, mais une fenêtre. Seul le fait. Une naissance n'avait pas à être une preuve de culpabilité.",
      anecdoteSchandaalVroegerTitle: "Autrefois c'était moins discret",
      anecdoteSchandaalVroegerText1: "Avant la Révolution française, on trouve de nombreux exemples où « filius illegitimus » ou « filia illegitima » est inscrit sans détour. Parfois même avec le nom du père !",
      anecdoteSchandaalVroegerText2: "Les sages-femmes étaient doublement mises sous pression par le clergé : il était extrêmement important qu'un nouveau-né ne meure pas sans être baptisé.",
      anecdoteSchandaalVroegerText3: "Si l'enfant survivait, le baptême était refait à l'église par le curé, « sub conditione ».",
      anecdoteSchandaalVroegerText4: "Deuxièmement, la sage-femme devait faire avouer à la mère célibataire qui était le père de son enfant.",
      anecdoteSchandaalVoorbeeldTitle: "Un bel exemple : Acte de baptême de Cyprianus Roose, Izegem, 24 novembre 1752",
      anecdoteSchandaalVoorbeeldText: "Baptisé : Cyprianus, un enfant illégitime de Maria Catharina Roose. La sage-femme Maria Veronica Dervaux a déclaré sous serment que la mère avait nommé le père : Cyprianus Larmasauw.",
      anecdoteSchandaalVoorbeeldCaption: "Acte de baptême de Cyprianus Roose, Izegem 1752",
      anecdoteSchandaalSlotText: "L'Église avait donc une position morale prononcée. Mais important : l'enfant était baptisé, car le baptême est un sacrement qui donnait droit à la reconnaissance religieuse.",
    },
    sv: {
      sectionTitle: "DNA-forskning i vårt släktträd",
      intro: "I många år arbetade jag uteslutande med genealogi genom klassiska källor: gamla kyrkböcker, notariehandlingar, dop-, vigsel- och begravningsböcker, folkbokföringsregister, militärlistor och alla möjliga andra arkiv. Forskningen hade något romantiskt över sig. Dessa dokument förblir den absoluta grunden för mig. Ändå känner man ibland begränsningarna: stavfel, oläsliga register, förvirrande namnvarianter, ibland medvetna förtiganden.",
      intro2: "När jag senare började utforska DNA-forskning märkte jag att det lade till ett nytt lager till släktträdet på papper. DNA ersätter inte arkiven men förstärker dem avsevärt. I teorin kan man bekräfta släktskap, rätta fel, hitta försvunna familjemedlemmar eller testa hypoteser om migration och härstamning.",
      howTitle: "Hur fungerar DNA-forskning i praktiken?",
      howText: "På vår familjewebbplats hos MyHeritage anslöt jag mig till DNA-projektet efter att ha skickat in mitt eget DNA-prov. Jag minns att jag tänkte: \"Det låter komplicerat\", men proceduren visade sig vara förvånansvärt enkel:",
      howStep1: "MyHeritage skickar dig ett testkit med en enkel kindsvabb. Inget blod, ingen saliv, inget krångel.",
      howStep2: "I labbet läses ditt DNA av. De genetiska markörerna omvandlas till digital data. Algoritmer jämför din profil med miljoner andra.",
      resultsIntro: "Därefter ser du två typer av resultat:",
      ethnicityTitle: "1. Etnicitetsuppskattning",
      ethnicityText: "Denna uppskattning visar i procent från vilka regioner ditt DNA verkar komma. Ursprunget för vårt genetiska material ligger — helt logiskt — över en stor del av Europa:",
      matchesTitle: "2. DNA-matchningar (släktskap)",
      matchesText: "Du får en lång lista över personer vars DNA delvis överlappar med ditt. Ju större överlappning, desto närmare släktskapet.",
      experienceTitle: "Min egen erfarenhet av matchningar",
      experienceText1: "I DNA-matchlistor är man beroende av andras vilja att delta.",
      experienceText2: "När jag först tittade blev jag förvånad över antalet: 6 009 matchningar!",
      experienceText3: "Den stora majoriteten delar bara en pytteliten bit DNA med mig.",
      experienceText4: "En liten handfull — högst några dussin — visade sig vara riktiga avlägsna släktingar jag inte kände.",
      experienceText5: "Sammanlagt har jag ungefär fem påvisbara släktskap som har verklig genealogisk betydelse. Till exempel lärde jag känna Steven Timmerman, en avlägsen kusin som bor i Tyskland:",
      timmermanTitle: "Släktskap med Steven Timmerman",
      geldofTitle: "Släktskap med Christine Geldof",
      geldofText: "En andra tydlig matchning ger en rolig anekdot: genom den kan jag bevisa att jag är min fars son, även om ett DNA-prov aldrig togs från min far! Släktskapet med Christine Geldof — vi har båda Emile Geldof som gemensam farfars far — visar att 'Geldof-DNA:t' bara kan ha förts vidare genom min far.",
      dnaFamilyTitle: "DNA som verktyg för familjeberättelser",
      dnaFamilyText1: "Det som fascinerar mig är DNA:s potential att bekräfta eller vederlägga gamla familjeberättelser — berättelser som finns i många familjer men aldrig kunnat bevisas.",
      dnaFamilyText2: "Att hitta försvunna familjegrenar skulle också vara en möjlighet.",
      projectsText: "Jag kan redan tänka mig två projekt vi borde genomföra någon gång. Först: använda DNA för att undersöka om det finns släktskap bland de många Deleforge som fortfarande lever i regionen Nord-Pas de Calais.",
      deleforgeTitle: "Maurice Deleforge — en missad chans",
      deleforgeText1: "Det finns också en andra sak som intrigerar mig: helt av en slump, det måste ha varit runt 2019 eller 2020, hittar jag en hänvisning till en artikel i Le Monde om en viss Maurice Deleforge som avled vid nästan 85 års ålder i Lille den 15 oktober 2018.",
      deleforgeText2: "Mannen var tydligen så vördad att École Supérieure namngav både sitt bibliotek och ett årligt pris efter honom:",
      deleforgeQuote: "La bibliothèque porte le nom d'une figure emblématique de l'école, Maurice Deleforge, professeur de français et directeur des études entre 1961 et 1994.",
      deleforgeText3: "År 2008 skrev han ännu en bok — om sin familjehistoria — som han gav ut i egen regi, med titeln \"Labaobou, Chronique des Deleforge par l'un d'eux\". Det var naturligtvis en enormt missad chans.",
      kitCaption: "MyHeritage DNA-testkit",
      ethnicityCaption: "Etnicitetsuppskattning baserad på DNA-analys",
      matchesCaption: "DNA-matchningar på MyHeritage",
      geldofCaption: "Släktskap via Emile Geldof",
      deleforgeBoekCaption: "\"Labaobou, Chronique des Deleforge par l'un d'eux\" — Maurice Deleforges bok (2008)",
      deleforgeSquareCaption: "Maurice Deleforge (1933–2018), professor och författare",
      deleforgeText4: "Min frustration blev ännu större efter att ha läst hans bok. Det var en mycket litterär och ganska romantiserad familjeberättelse, som utspelar sig i Marcq-en-Baroeul, Loos och andra angränsande kommuner som ansluter till våra förfäders bosättningsorter. Det skulle alltså inte vara förvånande om vi, några generationer tillbaka, kunde hitta en koppling till våra förfäder. Men det kortfattade släktträd han publicerar går visserligen tillbaka förbi 1670, men står helt fristående från vårt eget!",
      deleforgeText5: "Det besvärliga är att detta släktträd som helhet inte finns i utarbetad form på de klassiska genealogiska sajterna som Geneanet och MyHeritage: alla mina efterforskningar har inte gett något. För att göra en lång historia kort och återvända till DNA-temat: det skulle verkligen vara en utmaning att via DNA-forskning av ett eller flera av hans barn eller barnbarn kunna fastställa om vi är besläktade eller inte. Någon gång borde någon ta sig an detta...",
      samenwerkingTitle: "Kraften i samarbete",
      samenwerkingText: "DNA-forskning kommer först verkligt till liv när många människor deltar och kopplar sina uppgifter till utarbetade släktträd. Ett individuellt test är intressant, men det blir först riktigt värdefullt när genetiska matchningar också delar en dokumenterad historia. Tillsammans bygger man en genetisk karta över familjen, som ständigt utvidgas.",
      samenwerkingRealistisch: "Det är dock viktigt att vara realistisk:",
      samenwerkingPunt1: "Ju längre tillbaka i tiden man går, desto svårare blir det att bevisa släktskap via DNA. Autosomalt DNA försvinner med generationerna.",
      samenwerkingPunt2: "Jag har lärt mig att se DNA-etnicitet som en riktningsindikator, inte som absolut sanning.",
      samenwerkingPunt3: "Den största kraften i DNA ligger för mig i matchningar och släktskap, inte i \"etnicitet\". Det verkliga värdet uppstår när en matchning har ett användbart släktträd.",
      samenwerkingPunt4: "Jag är mycket medveten om integritet: du delar genetiska data som kan vara känsliga inte bara för dig själv utan även för familjemedlemmar.",
      samenwerkingPunt5: "DNA bör aldrig användas för att göra breda påståenden om \"ras\", \"renhet\" eller stora migrationssagor. Sådana tolkningar är ofta historiskt naiva och vetenskapligt förenklande.",
      overervingCaption: "DNA-arv genom generationerna",
      eindreflectieTitle: "Slutreflektion",
      eindreflectieText1: "För mig känns DNA-forskning som ett fascinerande komplement till vad jag i åratal rekonstruerat via arkiv. Det är inte spektakulärt i den meningen att det plötsligt skrev om mitt släktträd. Men det bekräftar, nyanserar, öppnar små sidovägar, och ger ibland en glimt av släktskap som annars skulle förbli dold.",
      eindreflectieText2: "Jag har ännu inte upptäckt några stora avslöjanden — inga förlorade familjemedlemmar, ingen hemlig härstamning, inga dramatiska överraskningar. Men vem vet vad som dyker upp när fler människor från våra utvidgade familjegrenar i framtiden låter testa sitt DNA?",
      eindreflectieText3: "Min genealogi vilar alltså stadigt på arkivmaterial, men med DNA som tyst vittne i bakgrunden, redo att tala när det kan.",
      chatgptTitle: "ChatGPT som hjälpmedel vid skrivandet av familjehistoria",
      chatgptIntro: "Under skrivandet av denna bok använde jag regelbundet ChatGPT för att omformulera textavsnitt eller för att förbättra kvaliteten på gamla foton och till och med konvertera gamla svartvita eller sepiafotografier till färg. Ibland gav detta ny inspiration, men ofta hittade jag felaktiga eller påhittade slutsatser.",
      chatgptKansenTitle: "Möjligheter, fallgropar och ansvarsfullt användande",
      chatgptKansenText: "Framväxten av artificiell intelligens erbjuder genealoger och familjehistoriker nya möjligheter. ChatGPT kan vara ett värdefullt verktyg — förutsatt att det används med kunskap och nödvändig försiktighet.",
      chatgptWatKanTitle: "Vad ChatGPT gör bra",
      chatgptWatKanText: "ChatGPT är särskilt starkt på att strukturera, skriva om och formulera. Det kan:",
      chatgptWatKan1: "omvandla lösa anteckningar till lättläst text;",
      chatgptWatKan2: "skriva om långa, tekniska beskrivningar till begripliga kapitel;",
      chatgptWatKan3: "anpassa stil och ton;",
      chatgptWatKan4: "undvika upprepningar och förtydliga kronologin.",
      chatgptMeerwaarde: "För många familjeforskare ligger det största mervärdet här: ChatGPT fungerar som en redaktionell assistent, inte som en forskare.",
      chatgptValkuilTitle: "Fallgropen: skenbar logik och felaktiga slutsatser",
      chatgptValkuilText: "Samtidigt döljer sig en verklig fara här. ChatGPT arbetar inte som en historiker, utan som en språkmodell som skapar rimligt klingande samband. Det kan:",
      chatgptValkuil1: "föreslå orsakssamband som inte är bevisade;",
      chatgptValkuil2: "tyst formulera antaganden som fakta;",
      chatgptValkuil3: "\"fylla i\" kronologiska luckor med antaganden;",
      chatgptValkuil4: "göra migrationer eller social status rimliga utan hårda källor.",
      chatgptValkuilUitleg: "Inom genealogi är detta särskilt riskabelt. Viktig regel: ChatGPT bör aldrig dra slutsatser som inte uttryckligen är underbyggda av användaren med källor.",
      chatgptBestTitle: "Bästa praxis för textanvändning",
      chatgptBestText: "Ansvarsfull användning av ChatGPT innebär bland annat:",
      chatgptBest1: "tydligt skilja fakta från tolkningar;",
      chatgptBest2: "uttryckligen formulera antaganden som hypoteser;",
      chatgptBest3: "kritiskt läsa om varje omskriven text;",
      chatgptBest4: "själv lägga till och kontrollera källhänvisningar;",
      chatgptBest5: "inte låta ChatGPT \"sammanfatta\" vad det själv inte forskat om.",
      chatgptBestUitleg: "Den som ber ChatGPT att skriva om en text bör uttryckligen säga: \"ändra stilen, inte innehållet\" — och faktiskt kontrollera detta.",
      chatgptFotoTitle: "Redigera gamla foton med AI: mellan restaurering och förfalskning",
      chatgptFotoText: "AI erbjuder också imponerande möjligheter vid redigering och förbättring av gamla foton. Suddiga bilder kan skärpas, kontraster återställas, skador avlägsnas och ansikten göras läsbara igen. För familjehistoria är detta ofta ett emotionellt mervärde.",
      chatgptFotoCaption: "Exempel på AI-redigerade gamla foton",
      chatgptVoordelenTitle: "Fördelarna",
      chatgptVoordeel1: "foton blir bättre reproducerbara i tryck;",
      chatgptVoordeel2: "detaljer (kläder, ansiktsuttryck, omgivning) blir tydligare;",
      chatgptVoordeel3: "skadade foton räddas från ytterligare glömska;",
      chatgptVoordeel4: "yngre generationer känner större samhörighet med bildmaterialet.",
      chatgptVoordelenCaption: "Gruppfoto vid mina föräldrars bröllop, Jooris (Georges) Deforce & Simonne Vandeputte den 7 juni 1945. Ett unikt foto, det enda vi hittade; men av mycket dålig kvalitet. I den av GROK förbättrade och kolorerade versionen är majoriteten av ansiktena fortfarande igenkännliga men tydligt förvrängda. Detta var min enkla prompt till GROK för att förbättra fotot: \"gör fotot skarpare, i färg, som taget med en modern digitalkamera. Behåll ansiktena så trogna som möjligt.\"",
      chatgptRisicoTitle: "Riskerna",
      chatgptRisicoText: "Men även här krävs försiktighet. AI-driven bildförbättring lägger ibland till information som aldrig fanns:",
      chatgptRisico1: "rynkor eller ansiktsdrag \"uppfinns\";",
      chatgptRisico2: "uniformer eller tyger får en textur som inte är historiskt korrekt;",
      chatgptRisico3: "skuggor, ljus eller till och med ansiktsuttryck ändras;",
      chatgptRisico4: "färger tolkas, inte rekonstrueras.",
      chatgptRisicoUitleg: "Resultatet ser mer realistiskt ut, men är inte alltid historiskt korrekt. Fotot blir då inte längre en källa, utan en tolkning av en källa.",
      chatgptVerantwoordTitle: "Ansvarsfull fotoredigering",
      chatgptVerantwoordIntro: "God praxis är att:",
      chatgptVerantwoord1: "alltid bevara originalbilden;",
      chatgptVerantwoord2: "tydligt märka redigerade foton som sådana;",
      chatgptVerantwoord3: "inte låta ansiktsdrag eller kontext ändras;",
      chatgptVerantwoord4: "begränsa förbättringar till skärpa, kontrast och läsbarhet;",
      chatgptVerantwoord5: "inte eftersträva estetisk \"försköning\".",
      chatgptBesluitTitle: "Slutsats",
      chatgptBesluitText1: "ChatGPT och andra AI-tillämpningar är inget hot mot familjehistorien, men inte heller neutrala verktyg. De förstärker det användaren tillhandahåller — både kvaliteten och felen.",
      chatgptBesluitText2: "Den som använder AI som skrivhjälp, redaktör och teknisk assistent, och inte som källa eller forskare, vinner i klarhet, läsbarhet och räckvidd. Den som släpper den kritiska kontrollen riskerar att familjehistorien oavsiktligt utvecklas från dokumentation till fiktion.",
      chatgptBesluitText3: "Familjehistoria förblir människoarbete. AI kan hjälpa att visa det arbetet bättre — men aldrig ersätta tänkandet, tvivlandet och kontrollerandet.",
      anecdotesTitle: "Några anekdoter",
      anecdoteGustaafTitle: "ca. 1875 Gustaaf Timmerman",
      anecdoteGustaafIntro: "(berättad av Alida Timmerman, Kleine Meter)",
      anecdoteStrynckxTitle: "1887 - Modest Strynckx",
      anecdoteStrynckxText1: "HÄNGD - Den 15 november 1887 försökte Modest Strynckx-Hostekint, borstmakare hos Em. Gheysens, hänga sig. Han skars ned i tid och fördes till St. Anne, till dårhuset. Sedan en tid hade han visat tecken på galenskap och nyligen hade man tvingats avväpna honom. Han var på väg att mörda sin hustru och sex barn med en yxa och en kniv.",
      anecdoteStrynckxText2: "HÄNGD - Den 21 april 1889, påsk, vid middagstid hänger sig Modest Strynckx i Krekelstraat, lämnar änka och 5 små barn i fattigdom. Begravd 3:e påskdagen.",
      anecdoteStrynckxSource: "ur: Jules Lafauts dagbok, utdrag publicerade i Ten Mandere nr. 76, november 1986",
      anecdoteOnweerTitle: "1895 - Fruktansvärt oväder, bränder, olyckor",
      anecdoteOnweerText1: "Lördagskväll, 10 augusti 1895, drabbade ett stort oväder med åska och blixt hela landet. Under hela dagen hade en stark hetta härskat, eldflugorna myllrade och alla väntade åska. Från klockan 6 till 9 rasade ovädret, värre än vi upplevt på många år.",
      anecdoteOnweerText2: "Vid Klein-Harelbeke slog blixten ner i ett parhus bebott av Emiel Geldhof-Vanderheeren och hans bror Henri Geldhof-Couckhuyt. Louise Couckhuyt satt med sitt 20 månader gamla barn i knäet; hon dödades av blixten liksom hennes 7-åriga dotter Marie som stod bredvid. Det lilla barnet kastades från hennes knä utan skador. Inom några ögonblick var båda husen förstörda av eld.",
      anecdoteOnweerSource: "ur: Jules Lafauts dagbok, utdrag publicerade i Ten Mandere nr. 76, november 1986",
      anecdoteOnweerReconstructieTitle: "Rekonstruktion av den lördagskvällen 10 augusti 1895",
      anecdoteOnweerReconstructieText: "Här är en rekonstruktion av vad som hände den lördagskvällen 10 augusti 1895 och dagarna däromkring i Västflandern, baserad på historiska källor och tidningsarkiv (som De Westvlaming och Gazette van Brugge).",
      anecdoteOnweerHitte: "1. Den brännande hettan vid kusten",
      anecdoteOnweerHitteText: "I kuststäderna som Ostende och Blankenberge var det den lördagen ovanligt livligt. Tidningarna rapporterade att tågen från inlandet var \"överlastade\" med människor som sökte svalka vid havet. Även om Ostende uppmätte 34,7°C, gav kvällen vid kusten lite lättnad tack vare havsbrisen, men \"kvalmigheten\" dröjde sig kvar djupt in på natten.",
      anecdoteOnweerOpkomst: "2. Oväder på väg?",
      anecdoteOnweerOpkomstText: "Runt den lördagskvällen hängde en enorm elektrisk spänning i luften. I Brugge-regionen och södra delen av provinsen (Kortrijk-området) talades det i rapporterna den veckan om \"hotfulla himlar\". Man längtade efter åskväder för att rena luften, men ofta blev det bara lite \"kornblixtar\" vid horisonten utan att det verkligen regnade.",
      anecdoteOnweerImpact: "3. Påverkan på det dagliga livet (från tidningarna)",
      anecdoteOnweerOogst: "Skörd: Bönderna i de västflandriska poldrarna var mitt i skörden. Tidningsrapporter från den veckan varnade för farorna med att arbeta i full sol; flera fall av solsting rapporterades bland lantarbetare.",
      anecdoteOnweerWater: "Dricksvatten: I vissa mindre byar i provinsen började man den veckan oroa sig för vattennivån i brunnarna, eftersom det inte hade regnat ordentligt på länge.",
      anecdoteOnweerToerisme: "Turism: Tidningarna rapporterade med viss stolthet att den belgiska kusten hade blivit \"Nordsjöns Paris\", med tusentals turister som promenerade på strandvallarna sent på kvällen eftersom det var outhärdligt att vara inomhus i hotellen och husen på grund av hettan.",
      anecdoteOnweerAnekdote: "4. En specifik anekdot från den tiden",
      anecdoteOnweerAnekdoteText: "I den lokala rapporteringen klagades det ofta på att \"iskällarna\" (där isblock förvarades för kylning) i städerna började bli tomma på grund av den ihållande hettan som pågått sedan den 9 augusti.",
      anecdoteOnweerSamenvatting: "Sammanfattning för lördagskvällen 10 augusti 1895:",
      anecdoteOnweerSamenvattingText: "Det var en kväll av ytterligheter. Solen gick ner i ett eldrött sken, uteserveringarna i städerna var överfulla, och västflandrarna upplevde en av de varmaste nätterna de hade upplevt under 1800-talet. Det var en kväll då ingen ville stanna inomhus.",
      anecdoteOnweerBron: "Källa: Perplexity",
      anecdoteJuwelenkistjeTitle: "1917 Smyckeskrinnet",
      anecdoteJuwelenkistjeText: "Någonstans under 2015 fick jag detta smyckeskrin, som Marcel Deforce tillverkade 1917 för sin fästmö Madeleine Geldof, överlämnat av min tant Monique Deforce som ett arvobjekt att noga bevara. Varför fick jag det? Eftersom skrinet är märkt med initialerna \"MD\". Det syftade ursprungligen på tillverkaren: Marcel Deforce. När skrinet efter åratal inte längre användes för juveler, gav mormor det vidare till sin dotter Monique; logiskt: även hennes initialer var \"MD\". Monique berättade att hon förvarade sin avklippta hästsvans i det i åratal. Nu använde hon inte längre skrinet och sökte en meningsfull destination. Hon beslöt att ge det vidare till nästa generation, till någon med samma initialer... Jag bevarar detta konstnärligt tillverkade och numera verkligt antika föremål omsorgsfullt för eftervärlden och det förefaller mig nästan självklart att nästa arvtagare blir min barnbarnsdotter Marie Deforce.",
      anecdoteHuwelijksgedichtTitle: "7 juni 1945 - Bröllopsdikt",
      anecdoteHuwelijksgedichtIntro: "När mina föräldrar, Jooris Deforce & Simonne Vandeputte gifte sig i juni 1945, var det fortfarande fullt tradition att skicka lyckönskningstelegram från familj och bekanta som inte kunde komma till festen, för att de var förhindrade eller inte var inbjudna till bröllopsmiddagen. Speciellt för sådana tillfällen hade RTT (Belgiens telegraf- och telefonverk) flera modeller av vackert dekorerade telegramformulär tillgängliga.",
      anecdoteHuwelijksgedichtText1: "Dessa telegram lästes sedan upp under bröllopsmiddagen, omväxlande med de sedvanliga talen. Bekanta och avlägsna släktingar höll det artigt och ibland ganska högtidligt. Direkta familjemedlemmar och nära vänner vågade vara lite djärvare. Typiskt för tiden fick det vara lite busigt, men inte för mycket: man fick vakta gränsen till det opassande.",
      anecdoteHuwelijksgedichtText2: "I mitt familjearkiv hittade jag fortfarande en hel bunt av dessa telegram, samt talet av Emiel Geldof (då 80 år gammal), brudgummens farfar, i form av en tillfällighetsdikt i 13 verser.",
      anecdoteHuwelijksgedichtTelegramCaption: "Lyckönskningstelegram vid bröllopet, 1945",
      anecdoteHuwelijksgedichtCaption: "Bröllopsdikt av Emiel Geldof, sida 1",
      anecdoteHuwelijksgedichtPageCaption: "Bröllopsdikt av Emiel Geldof, sida 2",
      anecdoteHuwelijksgedichtTranscriptieBtn: "📜 Transkription av dikten",
      anecdoteHuwelijksgedichtTranscriptie: `Bröllopsdikt
till G. Deforce-Vandeputte, Heyghem 7 juni 1945

1. Det är inte från nu utan från över tusen år
Att två unga människor förenas i sann kärlek
Om ni lever i god vänskap, kärlek, frid och harmoni
Då bär ni er framtida lycka med er.

2. Jag måste önska detta unga par
Stora och vackra gratulationer
Välkomna här och mycket väl sinnade
Eftersom pastorn binder dem denna morgon.

3. När Gud hade skapat den första människan
På denna värld med alla slags djur och även apor
Liksom med träd, frukter och alla sorters blommor
Och jag kan nämna många andra saker.

4. Då talade Adam till Vår Herre
Har ni ingen vacker hustru kvar
Jag är och står här helt ensam
Att jag senare fick komma svag på benen.

5. Då tog Gud ett av hans revben och snart
Skapade Han därav en vacker kvinna
Han gav henne till honom och säger nu till dem
Gå och vandra, väx och föröka er.

6. Han tog Eva och tryckte henne mot sitt bröst
Nytvättad och obefläckad
Och på varje kind en kyss
Vad mer behövde hon.

7. Ah säger han vilken stor glädje
Jag har sådan fröjd av det
Att kunna gå i en mjuk säng
Med en vacker kvinna utan kläder på.

8. Nu Georges älska din älskliga hustru
Var alltid trogna mot varandra
Simonne var lydig mot din man
Han ska ge dig vad du ber om då och då.

9. Så kan ni njuta av ett lyckligt liv
Då ska det inte plåga er
Att arbeta hårt och flitigt
Det ska stärka era lemmar.

10. Mannen arbetar med trä, koppar och stål
Med sin far och bröder alla tillsammans
Hustrun flitigt, sparsam och prydlig
Både i huset och i sängen.

11. Ni måste köpa många barn
Som snart går på egen hand
Och växer snabbt
Då ska äktenskapet blomstra.

12. Unga nygifta jag önskar er mycket nöje
Drick bara en god klunk öl
Men snälla drick inte för mycket
Att det når upp till halsen.

13. Nu kära vänner för att avsluta
Vill jag här tala sanning
Att var och en gör sitt bästa
Vår Herre ska göra resten.

E.G.`,
      anecdoteSchandaalTitle: "1892 – En skandal i familjen",
      anecdoteSchandaalIntro: "På min mors sida cirkulerade en gång ett lågmält skvaller. Det handlade om hennes farmor, Eugénie Boucké.",
      anecdoteSchandaalText1: "Eugénie, från Klerken, hade gift sig med Gustavus Jacobus Timmerman 1877. Tillsammans fick de sju barn mellan 1879 och 1889.",
      anecdoteSchandaalText2: "När hennes man dog 1890 var hon 38 år. Två år senare fick hon en dotter: Alice Rosalia, av en okänd fader. Barnet blev knappt 5 år. Hon blev 82 år och dog 1934.",
      anecdoteSchandaalAkteCaption: "Födelsebevis för Alice Rosalia Boucké, Izegem 1892, nr 138",
      anecdoteSchandaalZwijgenTitle: "Dokumentens diskreta tystnad",
      anecdoteSchandaalZwijgenText1: "Dokumentet skriver inget drama, ingen förebråelse och ingen anklagelse.",
      anecdoteSchandaalZwijgenText2: "Modern är änka, fyrtio år gammal. Alla vet vad detta betyder. Och ändå står det ingenting. Ingen far.",
      anecdoteSchandaalZwijgenText3: "Det är just denna tystnad som i många familjer föder skvaller.",
      anecdoteSchandaalZwijgenText4: "Det är en form av medkänsla, nästan modern i sitt försök att inte lägga en moralisk börda på barnet.",
      anecdoteSchandaalZwijgenText5: "Därför valde man neutralitetens väg: ingen far angiven är i sig tillräcklig information.",
      anecdoteSchandaalGeschiedenisTitle: "En liten historia i en större berättelse",
      anecdoteSchandaalGeschiedenisText1: "I vissa byar under 1800-talet rör det sig om tio till tjugo procent av födslarna utan far.",
      anecdoteSchandaalGeschiedenisText2: "Alices födelsebevis är inget undantag, utan ett fönster. En födelse behövde inte vara bevis på skuld.",
      anecdoteSchandaalVroegerTitle: "Förr var det mindre diskret",
      anecdoteSchandaalVroegerText1: "Före Franska revolutionen finner vi talrika exempel där \"filius illegitimus\" skrivs rakt på. Ibland med faderns namn!",
      anecdoteSchandaalVroegerText2: "Barnmorskor pressades av prästerskapet: det var ytterst viktigt att en nyfödd inte skulle dö odöpt.",
      anecdoteSchandaalVroegerText3: "Om barnet överlevde upprepades dopet i kyrkan, \"sub conditione\".",
      anecdoteSchandaalVroegerText4: "Barnmorskan måste få den ogifta modern att bekänna vem fadern var.",
      anecdoteSchandaalVoorbeeldTitle: "Ett fint exempel: Dopbevis för Cyprianus Roose, Izegem, 24 november 1752",
      anecdoteSchandaalVoorbeeldText: "Döpt: Cyprianus, ett oäkta barn till Maria Catharina Roose. Barnmorskan förklarade under ed att modern namngett fadern: Cyprianus Larmasauw.",
      anecdoteSchandaalVoorbeeldCaption: "Dopbevis för Cyprianus Roose, Izegem 1752",
      anecdoteSchandaalSlotText: "Kyrkan hade en uttalad moralisk position. Men viktigt: barnet döptes, för dopet gav rätt till religiöst erkännande.",
    },
  };

  const t = content[language as keyof typeof content] || content.nl;

  const ethnicityData = [
    { region: "Nederlands", pct: "44,0%" },
    { region: "Frans", pct: "16,1%" },
    { region: "Engels", pct: "13,7%" },
    { region: "Duits", pct: "8,2%" },
    { region: "Bretons", pct: "5,1%" },
    { region: "Deens", pct: "4,3%" },
    { region: "Schots en Welsh", pct: "2,5%" },
    { region: "Portugees", pct: "1,9%" },
    { region: "Zweeds", pct: "1,9%" },
    { region: "Noord-Italiaans", pct: "1,2%" },
    { region: "Sardijns", pct: "1,1%" },
  ];

  const timmermanTree = [
    { left: "Gustavus Jacobus Timmerman", leftDate: "1850–1890", right: "Eugénia Boucké", rightDate: "1852–1934", married: "1877" },
    { left: "Frans Timmerman", leftDate: "1881–1938", right: "Alida Timmerman", rightDate: "1886–1977" },
    { left: "Albert Timmerman", leftDate: "1919–2011", right: "Simonne Adèle Vandeputte", rightDate: "1924–2012" },
    { left: "Rudy Timmerman", leftDate: "", right: "Marc Deforce", rightDate: "1946" },
    { left: "Steven Timmerman", leftDate: "", right: "", rightDate: "" },
  ];

  const geldofTree = [
    { left: "Emile Geldof", date: "1865–1951" },
    { left: "Maria Theresia Vanderheeren", date: "1868–1926" },
    { left: "Maurice Geldof", date: "1902–1979" },
    { left: "Magdalena Geldof", date: "1897–1971" },
    { left: "Robrecht Geldof", date: "1928–1997" },
    { left: "Jooris Joseph (Georges) Deforce", date: "1921–1984" },
    { left: "Christine Geldof", date: "1955" },
    { left: "Marc Deforce", date: "1946" },
  ];

  return (
    <section id="dna-onderzoek" ref={ref} className="py-16 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-primary flex items-center gap-3">
              <Dna className="w-8 h-8" />
              {t.sectionTitle}
            </h2>
            <ShareButton sectionId="dna-onderzoek" title={t.sectionTitle} />
          </div>

          {/* Intro */}
          <div className="prose prose-lg text-foreground/80 space-y-4 mb-8">
            <p>{t.intro}</p>
            <p>{t.intro2}</p>
          </div>

          {/* Hoe werkt het */}
          <h3 className="font-serif text-2xl text-primary mb-4">{t.howTitle}</h3>
          <div className="md:flex md:gap-6 mb-6">
            <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0 cursor-pointer" onClick={() => setFullscreenImage(dnaMyheritageKit)}>
              <img
                src={dnaMyheritageKit}
                alt={t.kitCaption}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.kitCaption}
              </figcaption>
            </figure>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <p>{t.howText}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t.howStep1}</li>
                <li>{t.howStep2}</li>
              </ul>
            </div>
          </div>

          <p className="prose prose-lg text-foreground/80 mb-6">{t.resultsIntro}</p>

          {/* Etniciteit */}
          <h3 className="font-serif text-xl text-primary mb-4">{t.ethnicityTitle}</h3>
          <div className="prose prose-lg text-foreground/80 mb-4">
            <p>{t.ethnicityText}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {ethnicityData.map((row, i) => (
                    <tr key={i} className={i < ethnicityData.length - 1 ? "border-b border-border/50" : ""}>
                      <td className="py-2 text-foreground font-medium">{row.region}</td>
                      <td className="py-2 text-right text-primary font-semibold">{row.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4">
              <figure className="w-1/2 cursor-pointer" onClick={() => setFullscreenImage(dnaEtniciteitKaart)}>
                <img
                  src={dnaEtniciteitKaart}
                  alt={t.ethnicityCaption + ' - kaart'}
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
              </figure>
              <figure className="w-1/2 cursor-pointer" onClick={() => setFullscreenImage(dnaEtniciteitLijst)}>
                <img
                  src={dnaEtniciteitLijst}
                  alt={t.ethnicityCaption + ' - lijst'}
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
              </figure>
            </div>
            <p className="text-sm text-muted-foreground italic mt-2 text-center">{t.ethnicityCaption}</p>
          </div>

          {/* DNA Matches */}
          <h3 className="font-serif text-xl text-primary mb-4">{t.matchesTitle}</h3>
          <div className="md:flex md:gap-6 mb-8">
            <div className="prose prose-lg text-foreground/80 md:w-2/3">
              <p>{t.matchesText}</p>
            </div>
            <figure className="md:w-1/3 shrink-0 cursor-pointer" onClick={() => setFullscreenImage(dnaMatches)}>
              <img
                src={dnaMatches}
                alt={t.matchesCaption}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.matchesCaption}
              </figcaption>
            </figure>
          </div>

          {/* Ervaring met matches */}
          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <h3 className="font-serif text-xl text-primary">{t.experienceTitle}</h3>
              <p>{t.experienceText1}</p>
              <p>{t.experienceText2}</p>
              <p>{t.experienceText3}</p>
              <p>{t.experienceText4}</p>
              <p>{t.experienceText5}</p>

              {/* Timmerman tabel */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.timmermanTitle}</h4>
              <div className="bg-card/50 rounded-lg p-4 border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {timmermanTree.map((row, i) => (
                      <tr key={i} className={i < timmermanTree.length - 1 ? "border-b border-border/50" : ""}>
                        <td className="py-2 text-foreground font-medium">{row.left}</td>
                        <td className="py-2 text-muted-foreground text-xs">{row.leftDate}</td>
                        {row.married && <td className="py-2 text-center text-muted-foreground">⚭ {row.married}</td>}
                        {!row.married && <td className="py-2"></td>}
                        <td className="py-2 text-foreground">{row.right}</td>
                        <td className="py-2 text-muted-foreground text-xs">{row.rightDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Geldof match */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.geldofTitle}</h4>
              <p>{t.geldofText}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-card/50 rounded-lg p-4 border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {geldofTree.map((row, i) => (
                        <tr key={i} className={i < geldofTree.length - 1 ? "border-b border-border/50" : ""}>
                          <td className="py-2 text-foreground font-medium">{row.left}</td>
                          <td className="py-2 text-right text-muted-foreground text-xs">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(dnaGeldofMatch)}>
                  <img
                    src={dnaGeldofMatch}
                    alt={t.geldofCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.geldofCaption}
                  </figcaption>
                </figure>
              </div>

              {/* DNA als hulpmiddel */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.dnaFamilyTitle}</h4>
              <p>{t.dnaFamilyText1}</p>
              <p>{t.dnaFamilyText2}</p>
              <p>{t.projectsText}</p>

              {/* Deleforge */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.deleforgeTitle}</h4>
              <p>{t.deleforgeText1}</p>
              <p>{t.deleforgeText2}</p>

              <blockquote className="border-l-4 border-primary/40 pl-4 italic bg-secondary/30 py-3 rounded-r-lg text-sm">
                {t.deleforgeQuote}
              </blockquote>

              <p>{t.deleforgeText3}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(dnaDeleforgeBoek)}>
                  <img
                    src={dnaDeleforgeBoek}
                    alt={t.deleforgeBoekCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.deleforgeBoekCaption}
                  </figcaption>
                </figure>
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(mauriceDeleforgePortrait)}>
                  <img
                    src={mauriceDeleforgePortrait}
                    alt={t.deleforgeSquareCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.deleforgeSquareCaption}
                  </figcaption>
                </figure>
              </div>

              {/* Vervolg Deleforge */}
              <p>{t.deleforgeText4}</p>

              <figure className="my-6 cursor-pointer" onClick={() => setFullscreenImage(stamboomMauriceDeleforge)}>
                <img
                  src={stamboomMauriceDeleforge}
                  alt="Stamboom Maurice Deleforge"
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                  {language === 'en' ? 'Family tree of Maurice Deleforge' : language === 'fr' ? 'Arbre généalogique de Maurice Deleforge' : language === 'sv' ? 'Släktträd för Maurice Deleforge' : 'Stamboom van Maurice Deleforge'}
                </figcaption>
              </figure>

              <p>{t.deleforgeText5}</p>

              {/* De kracht van samenwerking */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.samenwerkingTitle}</h4>
              <p>{t.samenwerkingText}</p>
              <p>{t.samenwerkingRealistisch}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t.samenwerkingPunt1}</li>
                <li>{t.samenwerkingPunt2}</li>
                <li>{t.samenwerkingPunt3}</li>
                <li>{t.samenwerkingPunt4}</li>
                <li>{t.samenwerkingPunt5}</li>
              </ul>



              {/* Eindreflectie */}
              <h4 className="font-serif text-lg text-primary !mt-6">{t.eindreflectieTitle}</h4>
              <p>{t.eindreflectieText1}</p>
              <p>{t.eindreflectieText2}</p>
              <p>{t.eindreflectieText3}</p>

              {/* ChatGPT als hulpmiddel */}
              <h4 className="font-serif text-lg text-primary !mt-8">{t.chatgptTitle}</h4>
              <p>{t.chatgptIntro}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptKansenTitle}</h5>
              <p>{t.chatgptKansenText}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptWatKanTitle}</h5>
              <p>{t.chatgptWatKanText}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptWatKan1}</li>
                <li>{t.chatgptWatKan2}</li>
                <li>{t.chatgptWatKan3}</li>
                <li>{t.chatgptWatKan4}</li>
              </ul>
              <p>{t.chatgptMeerwaarde}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptValkuilTitle}</h5>
              <p>{t.chatgptValkuilText}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptValkuil1}</li>
                <li>{t.chatgptValkuil2}</li>
                <li>{t.chatgptValkuil3}</li>
                <li>{t.chatgptValkuil4}</li>
              </ul>
              <p>{t.chatgptValkuilUitleg}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptBestTitle}</h5>
              <p>{t.chatgptBestText}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptBest1}</li>
                <li>{t.chatgptBest2}</li>
                <li>{t.chatgptBest3}</li>
                <li>{t.chatgptBest4}</li>
                <li>{t.chatgptBest5}</li>
              </ul>
              <p>{t.chatgptBestUitleg}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptFotoTitle}</h5>
              <p>{t.chatgptFotoText}</p>

              <div className="my-6 cursor-pointer" onClick={() => setFullscreenImage(aiFotoVoorbeeld2)}>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <ImageComparisonSlider
                    leftImage={houtsnijdersGroepOrigineel}
                    rightImage={aiFotoVoorbeeld2}
                    leftLabel={language === 'en' ? 'Original' : language === 'fr' ? 'Original' : language === 'sv' ? 'Original' : 'Origineel'}
                    rightLabel={language === 'en' ? 'AI Edited' : language === 'fr' ? 'Retouché par IA' : language === 'sv' ? 'AI-redigerad' : 'AI-bewerkt'}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic text-center">{t.chatgptFotoCaption}</p>

              {/* De voordelen */}
              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptVoordelenTitle}</h5>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptVoordeel1}</li>
                <li>{t.chatgptVoordeel2}</li>
                <li>{t.chatgptVoordeel3}</li>
                <li>{t.chatgptVoordeel4}</li>
              </ul>

              {/* Huwelijksfoto origineel vs AI-bewerkt slider */}
              <div className="my-6 cursor-pointer" onClick={() => setFullscreenImage(huwelijksfotoAiBewerkt)}>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <ImageComparisonSlider
                    leftImage={huwelijksfotoOrigineel}
                    rightImage={huwelijksfotoAiBewerkt}
                    leftLabel={language === 'en' ? 'Original' : language === 'fr' ? 'Original' : language === 'sv' ? 'Original' : 'Origineel'}
                    rightLabel={language === 'en' ? 'AI Edited' : language === 'fr' ? 'Retouché par IA' : language === 'sv' ? 'AI-redigerad' : 'AI-bewerkt'}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic text-center">{t.chatgptVoordelenCaption}</p>

              {/* De risico's */}
              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptRisicoTitle}</h5>
              <p>{t.chatgptRisicoText}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptRisico1}</li>
                <li>{t.chatgptRisico2}</li>
                <li>{t.chatgptRisico3}</li>
                <li>{t.chatgptRisico4}</li>
              </ul>
              <p>{t.chatgptRisicoUitleg}</p>

              {/* Verantwoord omgaan */}
              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptVerantwoordTitle}</h5>
              <p>{t.chatgptVerantwoordIntro}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t.chatgptVerantwoord1}</li>
                <li>{t.chatgptVerantwoord2}</li>
                <li>{t.chatgptVerantwoord3}</li>
                <li>{t.chatgptVerantwoord4}</li>
                <li>{t.chatgptVerantwoord5}</li>
              </ul>

              {/* Besluit */}
              <h5 className="font-serif text-base text-primary !mt-5">{t.chatgptBesluitTitle}</h5>
              <p>{t.chatgptBesluitText1}</p>
              <p>{t.chatgptBesluitText2}</p>
              <p>{t.chatgptBesluitText3}</p>
            </div>
          </ReadMore>

          {/* Enkele anecdotes */}
          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4 mt-8">
              <h3 className="font-serif text-2xl text-primary">{t.anecdotesTitle}</h3>

              <h5 className="font-serif text-base text-primary !mt-5">{t.anecdoteGustaafTitle}</h5>
              <p className="italic text-muted-foreground">{t.anecdoteGustaafIntro}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.anecdoteStrynckxTitle}</h5>
              <p>{t.anecdoteStrynckxText1}</p>
              <p>{t.anecdoteStrynckxText2}</p>
              <p className="text-sm text-muted-foreground italic">{t.anecdoteStrynckxSource}</p>

              <h5 className="font-serif text-base text-primary !mt-5">{t.anecdoteOnweerTitle}</h5>
              <p>{t.anecdoteOnweerText1}</p>
              <p>{t.anecdoteOnweerText2}</p>
              <p className="text-sm text-muted-foreground italic">{t.anecdoteOnweerSource}</p>

              <ReadMore label={t.anecdoteOnweerReconstructieTitle} collapsedLabel={t.anecdoteOnweerReconstructieTitle}>
                <div className="space-y-3 text-sm leading-relaxed pl-2 border-l-2 border-primary/20">
                  <p className="italic">{t.anecdoteOnweerReconstructieText}</p>
                  <h6 className="font-semibold text-primary">{t.anecdoteOnweerHitte}</h6>
                  <p>{t.anecdoteOnweerHitteText}</p>
                  <h6 className="font-semibold text-primary">{t.anecdoteOnweerOpkomst}</h6>
                  <p>{t.anecdoteOnweerOpkomstText}</p>
                  <h6 className="font-semibold text-primary">{t.anecdoteOnweerImpact}</h6>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t.anecdoteOnweerOogst}</li>
                    <li>{t.anecdoteOnweerWater}</li>
                    <li>{t.anecdoteOnweerToerisme}</li>
                  </ul>
                  <h6 className="font-semibold text-primary">{t.anecdoteOnweerAnekdote}</h6>
                  <p>{t.anecdoteOnweerAnekdoteText}</p>
                  <h6 className="font-semibold text-primary">{t.anecdoteOnweerSamenvatting}</h6>
                  <p>{t.anecdoteOnweerSamenvattingText}</p>
                  <p className="text-xs text-muted-foreground italic">{t.anecdoteOnweerBron}</p>
                </div>
              </ReadMore>

              <h5 className="font-serif text-base text-primary !mt-5">{t.anecdoteJuwelenkistjeTitle}</h5>
              <div className="md:flex md:gap-6">
                <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0 cursor-pointer" onClick={() => setFullscreenImage(juwelenkistje)}>
                  <img
                    src={juwelenkistje}
                    alt={t.anecdoteJuwelenkistjeTitle}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                </figure>
                <p>{t.anecdoteJuwelenkistjeText}</p>
              </div>

              {/* Huwelijksgedicht 1945 */}
              <h5 className="font-serif text-base text-primary !mt-5">{t.anecdoteHuwelijksgedichtTitle}</h5>
              <p>{t.anecdoteHuwelijksgedichtIntro}</p>

              <figure className="my-4 cursor-pointer rounded-lg p-1" onClick={() => setFullscreenImage(telegramHuwelijk1945)}>
                <img
                  src={telegramHuwelijk1945}
                  alt={t.anecdoteHuwelijksgedichtTelegramCaption}
                  className="w-full md:w-2/3 mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                  {t.anecdoteHuwelijksgedichtTelegramCaption}
                </figcaption>
              </figure>

              <p>{t.anecdoteHuwelijksgedichtText1}</p>
              <p>{t.anecdoteHuwelijksgedichtText2}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <figure className="cursor-pointer rounded-lg p-1" onClick={() => setFullscreenImage(huwelijksgedicht1945P1)}>
                  <img
                    src={huwelijksgedicht1945P1}
                    alt={t.anecdoteHuwelijksgedichtCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.anecdoteHuwelijksgedichtCaption}
                  </figcaption>
                </figure>
                <figure className="cursor-pointer rounded-lg p-1" onClick={() => setFullscreenImage(huwelijksgedicht1945P2)}>
                  <img
                    src={huwelijksgedicht1945P2}
                    alt={t.anecdoteHuwelijksgedichtPageCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.anecdoteHuwelijksgedichtPageCaption}
                  </figcaption>
                </figure>
              </div>

              <ReadMore label={t.anecdoteHuwelijksgedichtTranscriptieBtn} collapsedLabel={t.anecdoteHuwelijksgedichtTranscriptieBtn}>
                <div className="bg-muted/30 rounded-lg p-4 border border-primary/10">
                  <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-foreground">{t.anecdoteHuwelijksgedichtTranscriptie}</pre>
                </div>
              </ReadMore>

              {/* 1892 - Een schandaal in de familie */}
              <h5 className="font-serif text-base text-primary !mt-8">{t.anecdoteSchandaalTitle}</h5>
              <p>{t.anecdoteSchandaalIntro}</p>
              <p>{t.anecdoteSchandaalText1}</p>
              <p>{t.anecdoteSchandaalText2}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(eugenieBoucke)}>
                  <img
                    src={eugenieBoucke}
                    alt="Eugénie Boucké"
                    className="w-full max-w-[280px] mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">Eugénie Boucké</figcaption>
                </figure>
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(doopakteAliceBoucke)}>
                  <img
                    src={doopakteAliceBoucke}
                    alt={t.anecdoteSchandaalAkteCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.anecdoteSchandaalAkteCaption}
                  </figcaption>
                </figure>
              </div>

              <h6 className="font-semibold text-primary mt-4">{t.anecdoteSchandaalZwijgenTitle}</h6>
              <p>{t.anecdoteSchandaalZwijgenText1}</p>
              <p>{t.anecdoteSchandaalZwijgenText2}</p>
              <p>{t.anecdoteSchandaalZwijgenText3}</p>
              <p>{t.anecdoteSchandaalZwijgenText4}</p>
              <p>{t.anecdoteSchandaalZwijgenText5}</p>

              <h6 className="font-semibold text-primary mt-4">{t.anecdoteSchandaalGeschiedenisTitle}</h6>
              <p>{t.anecdoteSchandaalGeschiedenisText1}</p>
              <p>{t.anecdoteSchandaalGeschiedenisText2}</p>

              <h6 className="font-semibold text-primary mt-4">{t.anecdoteSchandaalVroegerTitle}</h6>
              <p>{t.anecdoteSchandaalVroegerText1}</p>
              <p>{t.anecdoteSchandaalVroegerText2}</p>
              <p>{t.anecdoteSchandaalVroegerText3}</p>
              <p>{t.anecdoteSchandaalVroegerText4}</p>

              <h6 className="font-semibold text-primary mt-4">{t.anecdoteSchandaalVoorbeeldTitle}</h6>
              <p>{t.anecdoteSchandaalVoorbeeldText}</p>

              <figure className="my-4 cursor-pointer" onClick={() => setFullscreenImage(doopakteCyprianusRoose)}>
                <img
                  src={doopakteCyprianusRoose}
                  alt={t.anecdoteSchandaalVoorbeeldCaption}
                  className="w-full md:w-2/3 mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                  {t.anecdoteSchandaalVoorbeeldCaption}
                </figcaption>
              </figure>

              <p>{t.anecdoteSchandaalSlotText}</p>
            </div>
          </ReadMore>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain"
          />
        </motion.div>
      )}
    </section>
  );
};

export default DNAOnderzoek;
