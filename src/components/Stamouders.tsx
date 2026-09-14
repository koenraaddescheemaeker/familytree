import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ui/ShareButton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import izegemKaart from "@/assets/izegem-1643.jpg";
import oudeKerk from "@/assets/oude-kerk.jpg";

import marktLille from "@/assets/markt-lille-1680.jpg";
import boerenhuisInterieur from "@/assets/vlaams-boerenhuis-interieur-1685.jpg";
import vlaamseMarkt from "@/assets/vlaamse-markt-1685.jpg";
import vlaamseMaaltijd from "@/assets/vlaamse-maaltijd-1685.jpg";
import migratieReis from "@/assets/migratie-reis-1699.jpg";
import dorpspleinZondagsmis from "@/assets/dorpsplein-zondagsmis-1685.jpg";
import kerkMis from "@/assets/kerk-mis-1685.jpg";
import schoolVerfransing from "@/assets/school-verfransing-1850.jpg";
import standenmaatschappij from "@/assets/standenmaatschappij-1685.jpg";
import lodewijkXivLeger from "@/assets/lodewijk-xiv-leger-1685.jpg";
import huwelijksceremonieNotaris from "@/assets/huwelijksceremonie-notaris-1685.jpg";
import bestormingBastille from "@/assets/bestorming-bastille-1789.jpg";
import huwelijkscontractPagina1 from "@/assets/huwelijkscontract-1685-pagina-1.jpg";
import huwelijkscontractPagina2 from "@/assets/huwelijkscontract-1685-pagina-2.jpg";
import huwelijkscontractPagina3 from "@/assets/huwelijkscontract-1685-pagina-3.jpg";
import huwelijkscontractPagina4 from "@/assets/huwelijkscontract-1685-pagina-4.jpg";
import huwelijkscontractPagina5 from "@/assets/huwelijkscontract-1685-pagina-5.jpg";

import AiLabel from "@/components/ui/AiLabel";
import HallennesKaart from "@/components/HallennesKaart";
const Stamouders = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const contentNL = {
    // Nieuwe sectie: Frans-Vlaanderen rond 1685
    frenchFlandersTitle: "Frans-Vlaanderen omstreeks 1685: Een streek in beroering",
    frenchFlandersExplainerTitle: "Wat is Frans-Vlaanderen?",
    frenchFlandersExplainer: "Frans-Vlaanderen (Flandre française) is het historische deel van Vlaanderen dat nu in Noord-Frankrijk ligt. Het omvat de regio rond Rijsel (Lille), Duinkerken (Dunkerque) en Hazebroek (Hazebrouck). Dit gebied werd in 1668 door Lodewijk XIV veroverd en bij Frankrijk gevoegd. Tot diep in de 20e eeuw werd hier nog Vlaams gesproken. Let op: Frans-Vlaanderen is niet hetzelfde als Wallonië, dat een apart Franstalig gebied in België is.",
    frenchFlandersIntro: "Om te begrijpen waarom Hubert Deleforge en Antoinette Follet hun geboortegrond verlieten, moeten we de wereld kennen waarin zij leefden. De Châtellenie de Lille — het gebied rond Rijsel waar Hallennes en Capinghem lagen — was in 1685 een streek die nog natrilde van decennia van oorlog, verovering en gedwongen verandering.",
    
    geographyTitle: "Geografische situering",
    geographyP1: "De Châtellenie de Lille strekte zich uit over een gebied van ongeveer 900 vierkante kilometer, begrensd door de Leie in het noorden, de Deûle in het oosten, en de Scarpe in het zuiden. Het was een vruchtbaar laaglandgebied met talrijke beekjes, moerassen en bospartijen. De dorpen Hallennes-lez-Haubourdin en Capinghem lagen op slechts enkele kilometers van Rijsel, de hoofdstad van het gebied.",
    geographyP2: "Het landschap werd gekenmerkt door een mozaïek van akkerland, weilanden en bossen. De Bois d'Haubourdin — het bos waar Hubert's familie als houthakkers werkte — was een van de vele bosgebieden die de streek doorsneden. Deze bossen leverden niet alleen hout, maar ook onderdak aan vogelvrijverklaarden en deserteurs tijdens de oorlogsjaren.",
    
    politicalTitle: "Politieke omwentelingen",
    politicalP1: "Tot 1668 behoorde de streek tot de Spaanse Nederlanden, een restant van het oude Bourgondische rijk. De Vrede van Aken (1668) droeg het gebied over aan Frankrijk, maar deze overdracht was allesbehalve vreedzaam. Lodewijk XIV beschouwde de Nederlanden als zijn rechtmatige erfenis en was vastbesloten het hele gebied te annexeren.",
    politicalP2: "De Franse annexatie betekende een complete omwenteling voor de lokale bevolking. De taal van de rechtbanken veranderde van Vlaams naar Frans. De lokale coutumes (gewoonterecht) werden herzien. Nieuwe belastingen werden ingevoerd. Franse ambtenaren vervingen de lokale bestuurders. De intendant de Flandre kreeg onbeperkte macht over het dagelijks leven.",
    politicalP3: "Bijzonder ingrijpend was de francisation: het systematische beleid om de Vlaamse taal en cultuur te vervangen door de Franse. Hoewel in de streek rond Rijsel al eeuwenlang Picardisch (een romaanse taal verwant aan het Frans) werd gesproken, werden nu ook de laatste sporen van Vlaamse invloed uitgewist.",
    
    economicTitle: "Economische realiteit",
    economicP1: "De economie van de streek steunde op drie pijlers: landbouw, textielproductie en ambachten. De landbouw produceerde graan, vlas en hop. De textielindustrie — vooral linnenproductie — gaf werk aan duizenden wevers, spinners en blekers. De ambachtssector omvatte smeden, timmerlieden, kuipers, schrijnwerkers en houthakkers.",
    economicP2: "De oorlogen van Lodewijk XIV verwoestten deze economie. Legers trokken door het land en eisten voedsel, paarden en onderdak. Soldaten werden ingekwartierd bij burgers. Boerderijen werden geplunderd of in brand gestoken. De textielhandel met de Nederlanden — de traditionele afzetmarkt — werd door de oorlog afgebroken.",
    economicP3: "Daarbij kwamen buitengewone belastingen. De taille (grondbelasting), de gabelle (zoutbelasting) en de capitatie (hoofdelijke belasting) drukten zwaar op de bevolking. Vooral de contributies — gedwongen oorlogsbijdragen — konden hele dorpen in één keer ruïneren.",
    economicTable: [
      { item: "Graan (tarwe)", price: "12-15 sols per rasière", note: "Verdubbeld sinds 1660" },
      { item: "Dagloon arbeider", price: "6-8 sols per dag", note: "Ongewijzigd" },
      { item: "Jaarlijkse taille", price: "10-20 livres per huishouden", note: "Verdriedubbeld sinds 1668" },
      { item: "Inkwartiering", price: "Variabel", note: "Kon maanden duren" },
    ],
    
    religiousTitle: "Religieuze repressie",
    religiousP1: "Het jaar 1685 markeerde een keerpunt in de Franse religieuze politiek. Op 18 oktober — precies zes maanden na het huwelijk van Hubert en Antoinette — ondertekende Lodewijk XIV het Edict van Fontainebleau, waarmee het Edict van Nantes werd herroepen. Dit betekende het einde van alle religieuze tolerantie in Frankrijk.",
    religiousP2: "Hoewel de streek rond Rijsel overwegend katholiek was, had de herroeping ook hier gevolgen. De protestantse minderheden — vooral in de textielsteden — vluchtten naar de Nederlanden, Engeland of Duitsland. Dit veroorzaakte een braindrain van geschoolde ambachtslieden en kapitaalkrachtige kooplieden.",
    religiousP3: "Voor de katholieke bevolking betekende de herroeping een verstikkend klimaat van religieuze controle. De bisschop van Doornik — onder wiens jurisdictie de streek viel — kreeg uitgebreide bevoegdheden. Doopregisters, huwelijksregisters en overlijdensregisters werden verplicht. De pastoor werd een verlengstuk van de staat.",
    religiousP4: "Bijzonder wrang was de situatie voor gemengde gezinnen. Wie een protestantse voorouder had, werd met wantrouwen bekeken. Wie een familielid had dat naar de Nederlanden was gevlucht, kon in de problemen komen. De dragonnades — de gedwongen inkwartiering van soldaten bij protestantse gezinnen om hen tot bekering te dwingen — waren in de streek rond Rijsel minder heftig dan in het zuiden van Frankrijk, maar de dreiging was altijd aanwezig.",
    
    socialTitle: "Sociale structuur",
    socialP1: "De maatschappij rond Rijsel was streng hiërarchisch geordend. Aan de top stonden de adel en de hogere geestelijkheid, gevolgd door de rijke kooplieden en de juristen. Daaronder kwam de kleine burgerij: zelfstandige ambachtslieden, winkeliers en boeren met eigen grond. Onderaan stonden de dagloners, knechten, dienstmeiden en armen.",
    socialP2: "De familie Deleforge behoorde tot de zelfstandige ambachtslieden. Als boquillons (houthakkers) en houtzagers hadden zij een vast beroep met een eigen gereedschap en een zekere mate van onafhankelijkheid. De familie Follet stond hoger op de sociale ladder: Jean Follet was maître-chirurgien, een gerespecteerd ambacht dat zowel medische kennis als handvaardigheid vereiste.",
    socialP3: "Het huwelijk van Hubert en Antoinette was dus een sociaal gemengd huwelijk. Dat de families van beide kanten een gelijke bruidsschat van 400 pond parisis inbrachten, wijst erop dat zij elkaar als gelijkwaardig beschouwden — of dat de Follets bereid waren een iets lagere sociale status te accepteren in ruil voor andere voordelen.",
    
    dailyLifeTitle: "Het dagelijks leven",
    dailyLifeP1: "Het leven in een dorp als Hallennes rond 1685 was hard maar voorspelbaar — althans in vredestijd. De dag begon bij zonsopgang en eindigde bij zonsondergang. Het jaar volgde het ritme van de seizoenen: zaaien in het voorjaar, hooien in de zomer, oogsten in de herfst, hout hakken in de winter.",
    dailyLifeP2: "De meeste huizen waren van leem en hout, met strodaken. Zij bestonden uit één of twee vertrekken, waarin het hele gezin leefde, at en sliep. De keuken was het hart van het huis, waar op een open vuur werd gekookt. Verlichting kwam van kaarsen of olielampen.",
    dailyLifeP3: "Het dieet bestond voornamelijk uit brood, bonen, erwten, kool en spek. Vlees was een luxe, voorbehouden aan feestdagen. Bier was de dagelijkse drank — veiliger dan water. Koffie en thee waren onbekend; wijn was duur en zeldzaam.",
    dailyLifeP4: "De zondag was de dag van de kerk en van de gemeenschap. Na de mis verzamelden de dorpelingen zich op het plein, waar nieuws werd uitgewisseld, zaken werden gedaan en huwelijken werden besproken. Het was ook de dag waarop de pastoor de koninklijke edicten voorlas — de enige manier waarop de meeste dorpelingen nieuws uit Parijs of Versailles hoorden.",
    
    migrationTitle: "De migratieroute naar Vlaanderen",
    migrationP1: "De migratie van Hubert en Antoinette naar Izegem rond 1699 paste in een grotere beweging. Duizenden Fransen — zowel protestanten als katholieken — trokken in de laatste decennia van de zeventiende eeuw naar de Zuidelijke Nederlanden, de Republiek, Engeland of Duitsland.",
    migrationP2: "De route van Hallennes naar Izegem was relatief kort: ongeveer 50 kilometer, die in twee à drie dagen te voet kon worden afgelegd. De weg liep via Menen en Kortrijk, of via Tourcoing en Moeskroen. Beide routes kruisten de grens tussen Frankrijk en de Spaanse Nederlanden — een grens die in die jaren door oorlog en diplomatie voortdurend verschoof.",
    migrationP3: "Waarom precies Izegem? Het antwoord ligt waarschijnlijk in de bossen van de Mandelvallei en de aanwezigheid van een gemeenschap van houthakkers. Hubert vond er werk als boquillon — hetzelfde beroep dat zijn familie al generaties uitoefende. Bovendien was Izegem ver genoeg van de grens om relatief veilig te zijn, maar dicht genoeg om contacten met de oude streek te onderhouden.",
    
    // De Verfransing van Frans-Vlaanderen
    francisationTitle: "De verfransing van Frans-Vlaanderen",
    francisationIntro: "De overgang van Frans-Vlaanderen van een Vlaamstalig naar een Franstalig gebied was geen natuurlijk proces, maar het resultaat van een systematisch taalbeleid dat meer dan twee eeuwen zou duren. Dit proces van verfransing zou ook de familienaam van de Deleforges treffen.",
    francisationTimeline: [
      { year: "1659", event: "Vrede van de Pyreneeën", description: "Frankrijk verwerft de eerste delen van Vlaanderen. De taalgrens begint te verschuiven." },
      { year: "1668", event: "Vrede van Aken", description: "Rijsel en omgeving worden definitief Frans. De lokale Vlaamse dialecten komen onder druk." },
      { year: "1684", event: "Ordonnantie van Villers-Cotterêts uitgebreid", description: "Frans wordt de enige toegestane taal in rechtbanken en officiële documenten." },
      { year: "1789", event: "Franse Revolutie", description: "De revolutionairen zien taaldiversiteit als een bedreiging voor de eenheid. 'Un peuple, une langue' wordt het motto." },
      { year: "1794", event: "Rapport Barère", description: "Vlaamse en andere minderheidstalen worden bestempeld als 'de talen van de contrarevolutie'." },
      { year: "1833", event: "Wet Guizot", description: "Verplicht lager onderwijs wordt ingevoerd — uitsluitend in het Frans. Kinderen worden gestraft voor het spreken van Vlaams." },
    ],
    francisationImpactTitle: "Het 'signe'-systeem",
    francisationImpactP1: "Een bijzonder vernederend instrument was het zogenaamde 'signe'-systeem in de scholen. Een kind dat Vlaams sprak, kreeg een houten bord om de nek gehangen met daarop 'Parlez français' of 'Il est défendu de parler flamand'. Dit kind moest dan een ander kind betrappen dat Vlaams sprak om het bord door te geven. Aan het einde van de dag werd het kind met het bord gestraft.",
    francisationImpactP2: "Dit systeem — dat tot ver in de twintigste eeuw zou voortduren — creëerde een generatie die zich schaamde voor haar moedertaal. Ouders stopten met het spreken van Vlaams thuis om hun kinderen de vernedering te besparen.",
    francisationFamilyTitle: "Impact op de familienaam",
    francisationFamilyP1: "De verfransing verklaart ook de evolutie van onze familienaam. In Franse documenten werd 'Deleforge' geschreven — een verfranste spelling. Toen de familie naar Vlaanderen migreerde, werd dit 'Deforce' of 'De Force', en later in de Vlaamse registers 'Deforche'. De naam volgde als het ware de taalgrenzen.",
    francisationFamilyP2: "Het is ironisch dat de familie vertrok uit een gebied dat zijn Vlaamse karakter verloor, om zich te vestigen in een streek die zijn Vlaamse identiteit zou behouden. De keuze van Hubert om naar Izegem te trekken was wellicht ook een keuze voor een taal en cultuur die in zijn geboortestreek werden onderdrukt.",
    
    // De Franse Revolutie
    frenchRevolutionTitle: "De Franse Revolutie (1789-1799): Omwenteling en terreur",
    frenchRevolutionIntro: "Hoewel de familie Deleforge al rond 1699 naar Vlaanderen was gemigreerd, bleven de nazaten in Frans-Vlaanderen achter en doorleefden zij een van de meest turbulente periodes uit de Europese geschiedenis. De Franse Revolutie zou het aangezicht van de regio voorgoed veranderen.",
    
    frenchRevolutionCausesTitle: "Oorzaken van de Revolutie",
    frenchRevolutionCausesP1: "In de jaren 1780 verkeerde Frankrijk in een diepe crisis. De schatkist was leeg door kostbare oorlogen — onder andere de steun aan de Amerikaanse Revolutie. De oogsten mislukten in 1788, waardoor de broodprijzen naar ongekende hoogtes stegen. In Frans-Vlaanderen, waar de textielindustrie al onder druk stond door Engelse concurrentie, leidde dit tot wijdverbreide honger en werkloosheid.",
    frenchRevolutionCausesP2: "De standenmaatschappij — met de geprivilegieerde adel en geestelijkheid tegenover de belaste Derde Stand — was niet langer houdbaar. Toen koning Lodewijk XVI in mei 1789 de Staten-Generaal bijeenriep om de financiële crisis te bezweren, was de vonk aangestoken.",
    
    frenchRevolutionEventsTitle: "Revolutionaire gebeurtenissen in Frans-Vlaanderen",
    frenchRevolutionEventsP1: "Op 14 juli 1789 werd de Bastille bestormd in Parijs. Het nieuws bereikte Rijsel binnen dagen en leidde tot spontane volksopstanden. De 'Grande Peur' (Grote Angst) greep om zich heen: geruchten over adellijke samenzweringen en buitenlandse invasies deden boeren hun landheren aanvallen en archieven verbranden.",
    frenchRevolutionEventsP2: "In de Kasselrij van Rijsel werden kloosters gesloten, kerkelijke goederen genationaliseerd en de oude Vlaamse tradities verboden. De guillotine werd opgesteld op de Place du Lion d'Or in Rijsel. Tussen 1793 en 1794 werden hier tientallen 'vijanden van de revolutie' onthoofd — edellieden, priesters, maar ook gewone burgers die verdacht werden van anti-revolutionaire sympathieën.",
    
    frenchRevolutionTerrorTitle: "De Terreur (1793-1794)",
    frenchRevolutionTerrorP1: "Het Schrikbewind onder Robespierre trof Frans-Vlaanderen hard. De regio lag aan de frontlinie van de oorlog tegen Oostenrijk en de Verenigde Provinciën. Repressentanten-in-opdracht ('représentants en mission') kregen vrijwel onbeperkte macht om 'contrarevolutionairen' op te sporen.",
    frenchRevolutionTerrorP2: "Het katholicisme werd tijdelijk verboden. Kerken werden geplunderd, omgedoopt tot 'Tempels van de Rede' of gebruikt als opslagplaatsen. Priesters die weigerden de eed op de grondwet af te leggen, werden verbannen of geëxecuteerd. In veel dorpen rond Rijsel, Duinkerke en Hazebroek werden de klokkentorens gesloopt — symbolen van het ancien régime.",
    frenchRevolutionTerrorP3: "De kalender werd hervormd: 1792 werd 'Jaar I' van de Republiek. Zondag werd afgeschaft. Christelijke feestdagen werden vervangen door revolutionaire vieringen. Namen van plaatsen en personen werden 'ontkerkt' — Jean werd 'Brutus', Marie werd 'Liberté'.",
    
    frenchRevolutionLanguageTitle: "Taalrepressie in naam van de eenheid",
    frenchRevolutionLanguageP1: "De revolutionairen zagen regionale talen als een bedreiging voor de nationale eenheid. Het beruchte Rapport Barère van januari 1794 verklaarde: 'Het federalisme en het bijgeloof spreken Bretons; de emigratie en de haat jegens de Republiek spreken Duits; de contrarevolutie spreekt Italiaans, en het fanatisme spreekt Baskisch. Laten we deze instrumenten van schade en dwaling vernietigen.'",
    frenchRevolutionLanguageP2: "Hoewel het Vlaams in dit specifieke rapport niet werd genoemd, viel het onder dezelfde repressie. De lokale Picardische en Vlaamse dialecten werden vervolgd. Alleen Frans was toegestaan in officiële documenten, onderwijs en rechtspraak. Dit beleid zou de basis leggen voor de latere systematische verfransing van de 19e en 20e eeuw.",
    
    frenchRevolutionImpactTitle: "Nalatenschap voor Frans-Vlaanderen",
    frenchRevolutionImpactP1: "De Revolutie bracht fundamentele veranderingen: de feodale rechten werden afgeschaft, de kerk verloor haar landgoederen en macht, en burgerlijke gelijkheid werd grondwettelijk vastgelegd. Maar de prijs was hoog: duizenden slachtoffers, verwoeste kerken, verscheurde families en een trauma dat generaties zou duren.",
    frenchRevolutionImpactP2: "Voor de achtergebleven Deleforges in Frans-Vlaanderen betekende de Revolutie een definitieve breuk met het verleden. De oude kerk waarin hun voorouders waren gedoopt, was geplunderd of afgebroken. De parochieregisters — onze belangrijkste genealogische bronnen — waren deels vernietigd. De traditionele maatschappij waarin hun voorouders hadden geleefd, bestond niet meer.",
    frenchRevolutionImpactP3: "Het is veelzeggend dat de migratie van Hubert en Antoinette naar Vlaanderen, een eeuw eerder, hen had behoed voor deze catastrofe. Hun nakomelingen in Izegem leefden onder Oostenrijks en later Nederlands bewind, waar de revolutionaire terreur nooit in dezelfde mate toesloeg.",
    
    frenchRevolutionTimeline: [
      { year: "1788", event: "Mislukte oogst", description: "Broodprijzen verdubbelen. Hongeroproeren in heel Frans-Vlaanderen." },
      { year: "14 juli 1789", event: "Bestorming Bastille", description: "Begin van de Revolutie. Nieuws bereikt Rijsel binnen dagen." },
      { year: "Aug 1789", event: "Afschaffing feodalisme", description: "Adellijke privileges worden opgeheven. Boeren weigeren pacht te betalen." },
      { year: "1790", event: "Grondwet Geestelijkheid", description: "Priesters moeten eed afleggen. Velen weigeren en worden vervolgd." },
      { year: "1792", event: "Oorlog & Republiek", description: "Frankrijk verklaart oorlog aan Oostenrijk. De monarchie wordt afgeschaft." },
      { year: "1793-1794", event: "De Terreur", description: "Massale executies. Guillotine in Rijsel. Kerken geplunderd en gesloten." },
      { year: "1794", event: "Rapport Barère", description: "Regionale talen worden verboden. Alleen Frans toegestaan." },
      { year: "1799", event: "Napoleon grijpt macht", description: "Einde van de Revolutie. Begin van het Keizerrijk." },
    ],
    
    // Bestaande content
    unrestP1: "In de tweede helft van de zeventiende eeuw hing er over de dorpen rond Rijsel een sluier van onrust. Het was een streek waar generaties lang een stille, taaie orde had bestaan: kleine landbouwers, ambachtslieden, houtbewerkers, pachters en wevers die in een herkenbaar ritme leefden. Maar toen Hubert Deleforge in 1662 geboren werd in Hallennes-lez-Haubourdin, was dat ritme al gebroken.",
    unrestP2: "Hallennes en Capinghem, het geboortedorp van Antoinette Follet, lagen in het hart van de oude Châtellenie de Lille, een gebied dat eeuwenlang deel van het graafschap Vlaanderen was geweest, maar waar Picardisch de omgangstaal en Frans de taal van de administratie vormden. Het was een wereld van grensidentiteiten, waar men leerde leven met overlappende heerschappen en wisselende trouw.",
    unrestP3: "Hubert groeide op in een tijd waarin oorlog niet langer iets was dat men van horen zeggen kende. De legers van Lodewijk XIV trokken door de streek, soms maandenlang zichtbaar in de velden. Er waren jaren dat er nauwelijks geoogst kon worden; andere jaren domineerden de inkwartieringen, waarbij soldaten ondergebracht werden bij families die al weinig te verdelen hadden.",
    unrestP4: "De Devolutieoorlog (1667-1668) bracht de streek onder Frans bestuur. De Hollandse Oorlog (1672-1678) maakte de situatie nog erger. De Negenjarige Oorlog (1688-1697) verwoestte hele dorpen. Tegen het einde van de zeventiende eeuw was het duidelijk: wie kon vertrekken, deed dat.",
    unrestP5: "In 1685, het jaar van Huberts huwelijk met Antoinette, herriep Lodewijk XIV het Edict van Nantes. Dit betekende het einde van de religieuze tolerantie voor protestanten. Hoewel de meeste bewoners van de streek katholiek waren, creëerde de herroeping een klimaat van angst en controle. De kerk kreeg meer macht, de staat meer greep op het dagelijks leven.",
    schemaHeaders: ["Periode", "Context", "Effect op familie"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes nog deel van de Spaanse Nederlanden", effect: "Relatief stabiele situatie" },
      { period: "1668-1678", context: "Onder Frans bestuur (Vrede van Aken)", effect: "Meer druk; hogere lasten" },
      { period: "1678-1685", context: "Volledige integratie in Frankrijk", effect: "Religieuze controle en gedwongen bekeringen" },
      { period: "1685-1697", context: "Herroeping Edict van Nantes; Negenjarige Oorlog", effect: "Religieuze vervolging; migratiegolf" },
      { period: "1697-1700", context: "Streek verwoest ondanks Vrede van Rijswijk", effect: "Hubert migreert naar Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Spaanse Successieoorlog", effect: "Familie wortelt in Vlaanderen" },
    ],
    deleforgeTitle: "Familie Deleforge",
    deleforgeP1: "De familie Deleforge had wortels in het ambacht: bosbouw, houtbewerking, het beheer van pachthoeven, het onderhoud van houtkanten en klein timmerwerk. Het waren zelfstandigen die hun plaats kenden in de dorpsgemeenschap, maar die ook afhankelijk waren van stabiele lokale omstandigheden.",
    deleforgeP2: "De oudste bekende voorvader was Bauduin Deleforge, die rond 1550 werd geboren en in 1613 overleed in Halluin. Zijn zoon Hypolite trouwde rond 1620 in Santes. Diens zoon Hubert senior huwde Marie Grimbel uit Beaucamps-Ligny. Zij waren de ouders van onze stamvader Hubert.",
    folletTitle: "Familie Follet",
    folletP1: "Antoinettes vader, meester-chirurgijn Jean Follet, genoot aanzien tot buiten Capinghem. Chirurgijnen waren in de zeventiende eeuw hoogopgeleide ambachtslui die wonden behandelden, beenderen zetten en soms kleine operaties uitvoerden. Jean Follet had in de hele streek een grote faam als hardnekkige genezer.",
    folletP2: "De moeder van Antoinette was Jeanne Lambin, afkomstig uit Quesnoy-sur-Deûle. Bij het huwelijkscontract van 1685 was zij weduwe. Ze werd bijgestaan door haar zoon Antoine, zelf ook chirurgijn, en haar broer Laurens Ricourt.",
    contractIntro: "Dit contract is het allerbelangrijkste historische familiedocument. Het werd opgesteld op 18 april 1685 voor notaris Jacques Anselme Le Francq te Lille en volgt de coutume de Lille, een rechtsstelsel dat meer bescherming bood aan vrouwen dan in vele omringende regio's. Het contract is bewaard gebleven in de Archives Départementales du Nord.",
    groomTitle: "Bruidegomskant:",
    groomItems: [
      "Hubert Deleforge, jonge man uit Hallennes",
      "Bijgestaan door zijn ouders Hubert Deleforge en Marie Grimbel",
      "Oom Pierre Cordon uit Loos als getuige",
      "Bruidsschat: 400 pond parisis, 3 rasières tarwe, 2 paar lakens, 6 el lakenstof"
    ],
    brideTitle: "Bruidskant:",
    brideItems: [
      "Antoinette Follet, dochter van wijlen meester Jean Follet uit Capinghem",
      "Bijgestaan door moeder Jeanne Lambin, broer Antoine (chirurgijn), oom Laurens Ricourt",
      "Bruidsschat: 400 pond parisis, 2 paar lijkwaden, 6 servetten, kleding voor de trouwdag"
    ],
    specialTitle: "Bijzondere bepalingen:",
    specialItems: [
      "Antoinette behoudt recht op haar sieraden en persoonlijke goederen",
      "De bruidsschat moet terugbetaald worden bij kinderloosheid",
      "Verworven goederen worden gedeeld volgens vastgelegde proporties",
      "De moeder van de bruid kent haar dochter het huurrecht toe van een hoeve van twee bonniers (~2,5 hectare)"
    ],
    contractEnd: "De totale waarde van de bruidsschat — 800 pond parisis — komt overeen met ongeveer twee tot drie jaarlonen van een goed verdienende ambachtsman. Dit wijst erop dat beide families tot de welstellende middenklasse behoorden.",
    arrivalP1: "Izegem was rond 1700 geen grote stad, maar een dorp in ontwikkeling. Het kende een actieve gemeenschap van boeren, ambachtslui en houtwerkers. De nabijgelegen Mandelvallei bood hout, water, turf en werkgelegenheid.",
    arrivalP2: "Voor iemand met Hubert's vaardigheden was dit een plaats waar men letterlijk opnieuw kon beginnen. In de eerste jaren van de achttiende eeuw vinden we Hubert terug als boquillon (houthakker), een beroep dat in de streek rond de Mandel welbekend was.",
    arrivalP3: "De keuze om rond 1699 naar Izegem te trekken heeft de loop van onze familiegeschiedenis bepaald. Zonder die stap zou de Izegemse tak van de familie Deleforge/Deforce nooit zijn ontstaan.",
    integrationIntro: "De familie integreerde zich snel in West-Vlaanderen, binnen het tijdsbestek van één generatie:",
    integrationItems: [
      { name: "Dochter Antonia", text: "huwde in 1714 met Philippe Charles Rousseau, eveneens een immigrant uit Bondues. Zij kregen samen 10 kinderen." },
      { name: "Jacobus Franciscus", text: "(onze rechtstreekse voorvader) trouwde in 1718 met Veronica Barbier en vestigde zich in Ardooie. Zij kregen 9 kinderen." },
      { name: "Zoon Albert", text: "trouwde in 1719 met Judoca Reynaert uit Ingelmunster en werd er stamvader van een talrijk nageslacht." },
      { name: "De jongste zoon Hubert", text: "trouwde met de Izegemse Isabella De Man en kreeg met haar 14 kinderen." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Oudste bekende voorvader" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Zoon van Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Historische kaart van Izegem in 1643 door Antonius Sanderus",
    imgIzegemCaption: "Historische kaart van Izegem in 1643 door Antonius Sanderus",
    imgKerkAlt: "De Oude Sint-Tillokerk, heropgebouwd vanaf 1604, in 1852 afgebroken",
    imgKerkCaption: "De Oude Sint-Tillokerk (1604-1852) — Lithografie van Deroeck",
  };

  const contentFR = {
    // Nouvelle section: Flandre française vers 1685
    frenchFlandersTitle: "La Flandre française vers 1685 : Une région en tourmente",
    frenchFlandersExplainerTitle: "Qu'est-ce que la Flandre française ?",
    frenchFlandersExplainer: "La Flandre française est la partie historique de la Flandre située aujourd'hui dans le nord de la France. Elle comprend la région autour de Lille, Dunkerque et Hazebrouck. Ce territoire fut conquis par Louis XIV en 1668 et rattaché à la France. Jusqu'au milieu du XXe siècle, on y parlait encore le flamand. Attention : la Flandre française n'est pas la Wallonie, qui est une région francophone distincte en Belgique.",
    frenchFlandersIntro: "Pour comprendre pourquoi Hubert Deleforge et Antoinette Follet quittèrent leur terre natale, nous devons connaître le monde dans lequel ils vivaient. La Châtellenie de Lille — la région autour de Lille où se trouvaient Hallennes et Capinghem — était en 1685 une contrée encore tremblante de décennies de guerre, de conquête et de changements forcés.",
    
    geographyTitle: "Situation géographique",
    geographyP1: "La Châtellenie de Lille s'étendait sur une superficie d'environ 900 kilomètres carrés, bordée par la Lys au nord, la Deûle à l'est et la Scarpe au sud. C'était une région de plaine fertile parsemée de nombreux ruisseaux, marécages et bosquets. Les villages de Hallennes-lez-Haubourdin et Capinghem se trouvaient à quelques kilomètres seulement de Lille, la capitale de la région.",
    geographyP2: "Le paysage se caractérisait par une mosaïque de terres arables, de prairies et de forêts. Le Bois d'Haubourdin — la forêt où travaillait la famille d'Hubert comme bûcherons — était l'un des nombreux massifs forestiers qui traversaient la région. Ces forêts fournissaient non seulement du bois, mais aussi un refuge pour les hors-la-loi et les déserteurs pendant les années de guerre.",
    
    politicalTitle: "Bouleversements politiques",
    politicalP1: "Jusqu'en 1668, la région appartenait aux Pays-Bas espagnols, vestige de l'ancien empire bourguignon. Le Traité d'Aix-la-Chapelle (1668) transféra le territoire à la France, mais ce transfert fut loin d'être pacifique. Louis XIV considérait les Pays-Bas comme son héritage légitime et était déterminé à annexer l'ensemble du territoire.",
    politicalP2: "L'annexion française signifia un bouleversement complet pour la population locale. La langue des tribunaux passa du flamand au français. Les coutumes locales (droit coutumier) furent révisées. De nouveaux impôts furent introduits. Des fonctionnaires français remplacèrent les administrateurs locaux. L'intendant de Flandre reçut des pouvoirs illimités sur la vie quotidienne.",
    politicalP3: "La francisation fut particulièrement marquante : la politique systématique de remplacement de la langue et de la culture flamandes par le français. Bien que le picard (une langue romane apparentée au français) soit parlé depuis des siècles dans la région lilloise, les dernières traces d'influence flamande furent alors effacées.",
    
    economicTitle: "Réalité économique",
    economicP1: "L'économie de la région reposait sur trois piliers : l'agriculture, la production textile et l'artisanat. L'agriculture produisait des céréales, du lin et du houblon. L'industrie textile — surtout la production de lin — employait des milliers de tisserands, fileurs et blanchisseurs. Le secteur artisanal comprenait des forgerons, charpentiers, tonneliers, menuisiers et bûcherons.",
    economicP2: "Les guerres de Louis XIV dévastèrent cette économie. Les armées traversaient le pays et exigeaient nourriture, chevaux et logement. Des soldats étaient logés chez des civils. Des fermes étaient pillées ou incendiées. Le commerce textile avec les Pays-Bas — le marché traditionnel — fut interrompu par la guerre.",
    economicP3: "S'ajoutaient des impôts extraordinaires. La taille (impôt foncier), la gabelle (taxe sur le sel) et la capitation (impôt par tête) pesaient lourdement sur la population. Les contributions de guerre forcées pouvaient ruiner des villages entiers d'un seul coup.",
    economicTable: [
      { item: "Blé (froment)", price: "12-15 sols par rasière", note: "Doublé depuis 1660" },
      { item: "Salaire journalier ouvrier", price: "6-8 sols par jour", note: "Inchangé" },
      { item: "Taille annuelle", price: "10-20 livres par ménage", note: "Triplée depuis 1668" },
      { item: "Logement de soldats", price: "Variable", note: "Pouvait durer des mois" },
    ],
    
    religiousTitle: "Répression religieuse",
    religiousP1: "L'année 1685 marqua un tournant dans la politique religieuse française. Le 18 octobre — exactement six mois après le mariage d'Hubert et Antoinette — Louis XIV signa l'Édit de Fontainebleau, révoquant l'Édit de Nantes. Cela signifiait la fin de toute tolérance religieuse en France.",
    religiousP2: "Bien que la région lilloise fût majoritairement catholique, la révocation eut aussi des conséquences ici. Les minorités protestantes — surtout dans les villes textiles — fuirent vers les Pays-Bas, l'Angleterre ou l'Allemagne. Cela provoqua une fuite des cerveaux d'artisans qualifiés et de marchands aisés.",
    religiousP3: "Pour la population catholique, la révocation signifiait un climat étouffant de contrôle religieux. L'évêque de Tournai — sous la juridiction duquel tombait la région — reçut des pouvoirs étendus. Les registres de baptême, mariage et décès devinrent obligatoires. Le curé devint un prolongement de l'État.",
    religiousP4: "La situation des familles mixtes était particulièrement amère. Quiconque avait un ancêtre protestant était regardé avec méfiance. Quiconque avait un membre de famille qui avait fui vers les Pays-Bas pouvait avoir des ennuis. Les dragonnades — le logement forcé de soldats chez les familles protestantes pour les forcer à se convertir — étaient moins violentes dans la région lilloise que dans le sud de la France, mais la menace était toujours présente.",
    
    socialTitle: "Structure sociale",
    socialP1: "La société autour de Lille était strictement hiérarchisée. Au sommet se trouvaient la noblesse et le haut clergé, suivis des riches marchands et juristes. En dessous venait la petite bourgeoisie : artisans indépendants, boutiquiers et paysans propriétaires. Au bas de l'échelle se trouvaient les journaliers, valets, servantes et pauvres.",
    socialP2: "La famille Deleforge appartenait aux artisans indépendants. En tant que boquillons (bûcherons) et scieurs de bois, ils avaient un métier établi avec leurs propres outils et un certain degré d'indépendance. La famille Follet était plus haut placée sur l'échelle sociale : Jean Follet était maître-chirurgien, un métier respecté qui exigeait à la fois des connaissances médicales et une habileté manuelle.",
    socialP3: "Le mariage d'Hubert et Antoinette était donc un mariage socialement mixte. Le fait que les deux familles aient apporté une dot égale de 400 livres parisis indique qu'elles se considéraient comme égales — ou que les Follet étaient prêts à accepter un statut social légèrement inférieur en échange d'autres avantages.",
    
    dailyLifeTitle: "La vie quotidienne",
    dailyLifeP1: "La vie dans un village comme Hallennes vers 1685 était dure mais prévisible — du moins en temps de paix. La journée commençait au lever du soleil et se terminait au coucher du soleil. L'année suivait le rythme des saisons : semailles au printemps, fenaison en été, moisson en automne, coupe du bois en hiver.",
    dailyLifeP2: "La plupart des maisons étaient en torchis et bois, avec des toits de chaume. Elles se composaient d'une ou deux pièces, où toute la famille vivait, mangeait et dormait. La cuisine était le cœur de la maison, où l'on cuisinait sur un feu ouvert. L'éclairage provenait de chandelles ou de lampes à huile.",
    dailyLifeP3: "Le régime alimentaire se composait principalement de pain, haricots, pois, choux et lard. La viande était un luxe, réservé aux jours de fête. La bière était la boisson quotidienne — plus sûre que l'eau. Le café et le thé étaient inconnus ; le vin était cher et rare.",
    dailyLifeP4: "Le dimanche était le jour de l'église et de la communauté. Après la messe, les villageois se rassemblaient sur la place, où l'on échangeait des nouvelles, on faisait des affaires et on discutait des mariages. C'était aussi le jour où le curé lisait les édits royaux — la seule façon dont la plupart des villageois entendaient des nouvelles de Paris ou Versailles.",
    
    migrationTitle: "La route migratoire vers la Flandre",
    migrationP1: "La migration d'Hubert et Antoinette vers Izegem vers 1699 s'inscrivait dans un mouvement plus large. Des milliers de Français — protestants comme catholiques — partirent vers les Pays-Bas méridionaux, la République, l'Angleterre ou l'Allemagne dans les dernières décennies du XVIIe siècle.",
    migrationP2: "La route de Hallennes à Izegem était relativement courte : environ 50 kilomètres, qui pouvaient être parcourus en deux ou trois jours à pied. Le chemin passait par Menin et Courtrai, ou par Tourcoing et Mouscron. Les deux routes traversaient la frontière entre la France et les Pays-Bas espagnols — une frontière qui se déplaçait constamment par la guerre et la diplomatie à cette époque.",
    migrationP3: "Pourquoi précisément Izegem ? La réponse réside probablement dans les forêts de la vallée de la Mandel et la présence d'une communauté de bûcherons. Hubert y trouva du travail comme boquillon — le même métier que sa famille exerçait depuis des générations. De plus, Izegem était assez loin de la frontière pour être relativement sûr, mais assez proche pour maintenir des contacts avec l'ancienne région.",

    // La francisation de la Flandre française
    francisationTitle: "La francisation de la Flandre française",
    francisationIntro: "La transition de la Flandre française d'une région néerlandophone à une région francophone ne fut pas un processus naturel, mais le résultat d'une politique linguistique systématique qui durerait plus de deux siècles. Ce processus de francisation affecterait également le nom de famille des Deleforge.",
    francisationTimeline: [
      { year: "1659", event: "Traité des Pyrénées", description: "La France acquiert les premières parties de la Flandre. La frontière linguistique commence à se déplacer." },
      { year: "1668", event: "Traité d'Aix-la-Chapelle", description: "Lille et ses environs deviennent définitivement français. Les dialectes flamands locaux sont mis sous pression." },
      { year: "1684", event: "Extension de l'ordonnance de Villers-Cotterêts", description: "Le français devient la seule langue autorisée dans les tribunaux et documents officiels." },
      { year: "1789", event: "Révolution française", description: "Les révolutionnaires voient la diversité linguistique comme une menace pour l'unité. 'Un peuple, une langue' devient la devise." },
      { year: "1794", event: "Rapport Barère", description: "Le flamand et autres langues minoritaires sont qualifiés de 'langues de la contre-révolution'." },
      { year: "1833", event: "Loi Guizot", description: "L'enseignement primaire obligatoire est introduit — exclusivement en français. Les enfants sont punis pour avoir parlé flamand." },
    ],
    francisationImpactTitle: "Le système du 'signe'",
    francisationImpactP1: "Un instrument particulièrement humiliant était le système dit du 'signe' dans les écoles. Un enfant qui parlait flamand recevait une planche en bois autour du cou avec l'inscription 'Parlez français' ou 'Il est défendu de parler flamand'. Cet enfant devait alors surprendre un autre enfant parlant flamand pour lui passer la planche. À la fin de la journée, l'enfant portant le signe était puni.",
    francisationImpactP2: "Ce système — qui persisterait jusqu'au XXe siècle — créa une génération qui avait honte de sa langue maternelle. Les parents cessèrent de parler flamand à la maison pour épargner à leurs enfants cette humiliation.",
    francisationFamilyTitle: "Impact sur le nom de famille",
    francisationFamilyP1: "La francisation explique également l'évolution de notre nom de famille. Dans les documents français, on écrivait 'Deleforge' — une orthographe francisée. Lorsque la famille migra vers la Flandre, cela devint 'Deforce' ou 'De Force', puis plus tard 'Deforche' dans les registres flamands. Le nom suivait en quelque sorte les frontières linguistiques.",
    francisationFamilyP2: "Il est ironique que la famille soit partie d'une région qui perdait son caractère flamand pour s'installer dans une contrée qui conserverait son identité flamande. Le choix d'Hubert de s'établir à Izegem était peut-être aussi un choix pour une langue et une culture qui étaient réprimées dans sa région natale.",
    
    // La Révolution française
    frenchRevolutionTitle: "La Révolution française (1789-1799) : Bouleversement et Terreur",
    frenchRevolutionIntro: "Bien que la famille Deleforge ait migré vers la Flandre vers 1699, les descendants restés en Flandre française vécurent l'une des périodes les plus turbulentes de l'histoire européenne. La Révolution française allait transformer définitivement le visage de la région.",
    
    frenchRevolutionCausesTitle: "Causes de la Révolution",
    frenchRevolutionCausesP1: "Dans les années 1780, la France traversait une crise profonde. Le trésor était vide à cause de guerres coûteuses — notamment le soutien à la Révolution américaine. Les récoltes échouèrent en 1788, faisant grimper les prix du pain à des niveaux sans précédent. En Flandre française, où l'industrie textile était déjà sous pression de la concurrence anglaise, cela provoqua une famine et un chômage généralisés.",
    frenchRevolutionCausesP2: "La société d'ordres — avec la noblesse et le clergé privilégiés face au Tiers État accablé d'impôts — n'était plus tenable. Lorsque le roi Louis XVI convoqua les États généraux en mai 1789 pour résoudre la crise financière, l'étincelle était allumée.",
    
    frenchRevolutionEventsTitle: "Événements révolutionnaires en Flandre française",
    frenchRevolutionEventsP1: "Le 14 juillet 1789, la Bastille fut prise à Paris. La nouvelle atteignit Lille en quelques jours et déclencha des soulèvements populaires spontanés. La 'Grande Peur' se répandit : des rumeurs de complots nobiliaires et d'invasions étrangères poussèrent les paysans à attaquer leurs seigneurs et à brûler les archives.",
    frenchRevolutionEventsP2: "Dans la Châtellenie de Lille, les monastères furent fermés, les biens de l'Église nationalisés et les anciennes traditions flamandes interdites. La guillotine fut installée sur la Place du Lion d'Or à Lille. Entre 1793 et 1794, des dizaines d' 'ennemis de la révolution' y furent décapités — nobles, prêtres, mais aussi de simples citoyens soupçonnés de sympathies contre-révolutionnaires.",
    
    frenchRevolutionTerrorTitle: "La Terreur (1793-1794)",
    frenchRevolutionTerrorP1: "La Terreur sous Robespierre frappa durement la Flandre française. La région se trouvait en première ligne de la guerre contre l'Autriche et les Provinces-Unies. Les représentants en mission reçurent des pouvoirs quasi illimités pour traquer les 'contre-révolutionnaires'.",
    frenchRevolutionTerrorP2: "Le catholicisme fut temporairement interdit. Les églises furent pillées, rebaptisées 'Temples de la Raison' ou utilisées comme entrepôts. Les prêtres qui refusaient de prêter serment à la constitution furent bannis ou exécutés. Dans de nombreux villages autour de Lille, Dunkerque et Hazebrouck, les clochers furent démolis — symboles de l'ancien régime.",
    frenchRevolutionTerrorP3: "Le calendrier fut réformé : 1792 devint l'An I de la République. Le dimanche fut aboli. Les fêtes chrétiennes furent remplacées par des célébrations révolutionnaires. Les noms de lieux et de personnes furent 'déchristianisés' — Jean devint 'Brutus', Marie devint 'Liberté'.",
    
    frenchRevolutionLanguageTitle: "Répression linguistique au nom de l'unité",
    frenchRevolutionLanguageP1: "Les révolutionnaires voyaient les langues régionales comme une menace pour l'unité nationale. Le tristement célèbre Rapport Barère de janvier 1794 déclarait : 'Le fédéralisme et la superstition parlent breton ; l'émigration et la haine de la République parlent allemand ; la contre-révolution parle italien, et le fanatisme parle basque. Détruisons ces instruments de dommage et d'erreur.'",
    frenchRevolutionLanguageP2: "Bien que le flamand ne fût pas spécifiquement mentionné dans ce rapport, il tomba sous la même répression. Les dialectes picards et flamands locaux furent persécutés. Seul le français était autorisé dans les documents officiels, l'enseignement et la justice. Cette politique poserait les bases de la francisation systématique des XIXe et XXe siècles.",
    
    frenchRevolutionImpactTitle: "Héritage pour la Flandre française",
    frenchRevolutionImpactP1: "La Révolution apporta des changements fondamentaux : les droits féodaux furent abolis, l'Église perdit ses terres et son pouvoir, et l'égalité civile fut constitutionnellement garantie. Mais le prix fut élevé : des milliers de victimes, des églises dévastées, des familles déchirées et un traumatisme qui durerait des générations.",
    frenchRevolutionImpactP2: "Pour les Deleforge restés en Flandre française, la Révolution signifia une rupture définitive avec le passé. La vieille église où leurs ancêtres avaient été baptisés fut pillée ou démolie. Les registres paroissiaux — nos principales sources généalogiques — furent partiellement détruits. La société traditionnelle dans laquelle leurs ancêtres avaient vécu n'existait plus.",
    frenchRevolutionImpactP3: "Il est significatif que la migration d'Hubert et Antoinette vers la Flandre, un siècle plus tôt, les ait préservés de cette catastrophe. Leurs descendants à Izegem vivaient sous domination autrichienne puis néerlandaise, où la terreur révolutionnaire ne frappa jamais avec la même intensité.",
    
    frenchRevolutionTimeline: [
      { year: "1788", event: "Récolte ratée", description: "Les prix du pain doublent. Émeutes de la faim dans toute la Flandre française." },
      { year: "14 juillet 1789", event: "Prise de la Bastille", description: "Début de la Révolution. La nouvelle atteint Lille en quelques jours." },
      { year: "Août 1789", event: "Abolition du féodalisme", description: "Les privilèges nobiliaires sont supprimés. Les paysans refusent de payer le fermage." },
      { year: "1790", event: "Constitution civile du clergé", description: "Les prêtres doivent prêter serment. Beaucoup refusent et sont persécutés." },
      { year: "1792", event: "Guerre & République", description: "La France déclare la guerre à l'Autriche. La monarchie est abolie." },
      { year: "1793-1794", event: "La Terreur", description: "Exécutions massives. Guillotine à Lille. Églises pillées et fermées." },
      { year: "1794", event: "Rapport Barère", description: "Les langues régionales sont interdites. Seul le français est autorisé." },
      { year: "1799", event: "Napoléon prend le pouvoir", description: "Fin de la Révolution. Début de l'Empire." },
    ],

    unrestP1: "Dans la seconde moitié du XVIIe siècle, un voile d'inquiétude planait sur les villages autour de Lille. C'était une région où un ordre silencieux et tenace avait existé pendant des générations : petits agriculteurs, artisans, travailleurs du bois, fermiers et tisserands qui vivaient dans un rythme reconnaissable. Mais quand Hubert Deleforge naquit en 1662 à Hallennes-lez-Haubourdin, ce rythme était déjà brisé.",
    unrestP2: "Hallennes et Capinghem, le village natal d'Antoinette Follet, se trouvaient au cœur de l'ancienne Châtellenie de Lille, une région qui avait fait partie du comté de Flandre pendant des siècles, mais où le picard était la langue courante et le français la langue de l'administration. C'était un monde d'identités frontalières, où l'on apprenait à vivre avec des suzerainetés qui se chevauchaient et des allégeances changeantes.",
    unrestP3: "Hubert grandit à une époque où la guerre n'était plus quelque chose qu'on ne connaissait que par ouï-dire. Les armées de Louis XIV traversaient la région, parfois visibles dans les champs pendant des mois. Il y avait des années où l'on pouvait à peine récolter ; d'autres années étaient dominées par les logements forcés, où les soldats étaient hébergés chez des familles qui avaient déjà peu à partager.",
    unrestP4: "La Guerre de Dévolution (1667-1668) plaça la région sous administration française. La Guerre de Hollande (1672-1678) aggrava la situation. La Guerre de Neuf Ans (1688-1697) dévasta des villages entiers. Vers la fin du XVIIe siècle, c'était clair : ceux qui pouvaient partir, partaient.",
    unrestP5: "En 1685, l'année du mariage de Hubert avec Antoinette, Louis XIV révoqua l'Édit de Nantes. Cela signifiait la fin de la tolérance religieuse pour les protestants. Bien que la plupart des habitants de la région fussent catholiques, la révocation créa un climat de peur et de contrôle. L'Église gagna plus de pouvoir, l'État plus d'emprise sur la vie quotidienne.",
    schemaHeaders: ["Période", "Contexte", "Effet sur la famille"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes encore partie des Pays-Bas espagnols", effect: "Situation relativement stable" },
      { period: "1668-1678", context: "Sous administration française (Paix d'Aix-la-Chapelle)", effect: "Plus de pression ; charges plus élevées" },
      { period: "1678-1685", context: "Intégration complète à la France", effect: "Contrôle religieux et conversions forcées" },
      { period: "1685-1697", context: "Révocation de l'Édit de Nantes ; Guerre de Neuf Ans", effect: "Persécution religieuse ; vague migratoire" },
      { period: "1697-1700", context: "Région dévastée malgré la Paix de Ryswick", effect: "Hubert migre vers Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Guerre de Succession d'Espagne", effect: "La famille s'enracine en Flandre" },
    ],
    deleforgeTitle: "Famille Deleforge",
    deleforgeP1: "La famille Deleforge avait des racines dans l'artisanat : sylviculture, travail du bois, gestion de fermes, entretien des haies et petite menuiserie. C'étaient des indépendants qui connaissaient leur place dans la communauté villageoise, mais qui dépendaient aussi de conditions locales stables.",
    deleforgeP2: "Le plus ancien ancêtre connu était Bauduin Deleforge, né vers 1550 et décédé en 1613 à Halluin. Son fils Hypolite se maria vers 1620 à Santes. Son fils Hubert senior épousa Marie Grimbel de Beaucamps-Ligny. Ils étaient les parents de notre ancêtre fondateur Hubert.",
    folletTitle: "Famille Follet",
    folletP1: "Le père d'Antoinette, le maître-chirurgien Jean Follet, jouissait d'une renommée au-delà de Capinghem. Les chirurgiens au XVIIe siècle étaient des artisans hautement qualifiés qui traitaient les blessures, réduisaient les fractures et parfois pratiquaient de petites opérations. Jean Follet avait une grande réputation de guérisseur tenace dans toute la région.",
    folletP2: "La mère d'Antoinette était Jeanne Lambin, originaire de Quesnoy-sur-Deûle. Lors du contrat de mariage de 1685, elle était veuve. Elle était assistée par son fils Antoine, lui aussi chirurgien, et son frère Laurens Ricourt.",
    contractIntro: "Ce contrat est le document historique familial le plus important. Il fut rédigé le 18 avril 1685 devant le notaire Jacques Anselme Le Francq à Lille et suit la coutume de Lille, un système juridique qui offrait plus de protection aux femmes que dans de nombreuses régions environnantes. Le contrat est conservé aux Archives Départementales du Nord.",
    groomTitle: "Côté marié :",
    groomItems: [
      "Hubert Deleforge, jeune homme de Hallennes",
      "Assisté par ses parents Hubert Deleforge et Marie Grimbel",
      "Oncle Pierre Cordon de Loos comme témoin",
      "Dot : 400 livres parisis, 3 rasières de blé, 2 paires de draps, 6 aunes de tissu"
    ],
    brideTitle: "Côté mariée :",
    brideItems: [
      "Antoinette Follet, fille de feu maître Jean Follet de Capinghem",
      "Assistée par sa mère Jeanne Lambin, son frère Antoine (chirurgien), son oncle Laurens Ricourt",
      "Dot : 400 livres parisis, 2 paires de linceuls, 6 serviettes, vêtements pour le jour du mariage"
    ],
    specialTitle: "Dispositions spéciales :",
    specialItems: [
      "Antoinette conserve le droit à ses bijoux et biens personnels",
      "La dot doit être remboursée en cas d'absence d'enfants",
      "Les biens acquis sont partagés selon des proportions fixées",
      "La mère de la mariée accorde à sa fille le droit de bail d'une ferme de deux bonniers (~2,5 hectares)"
    ],
    contractEnd: "La valeur totale de la dot — 800 livres parisis — correspond à environ deux à trois années de salaire d'un artisan bien rémunéré. Cela indique que les deux familles appartenaient à la classe moyenne aisée.",
    arrivalP1: "Izegem vers 1700 n'était pas une grande ville, mais un village en développement. Il connaissait une communauté active d'agriculteurs, d'artisans et de travailleurs du bois. La vallée de la Mandel voisine offrait du bois, de l'eau, de la tourbe et de l'emploi.",
    arrivalP2: "Pour quelqu'un avec les compétences de Hubert, c'était un endroit où l'on pouvait littéralement recommencer. Dans les premières années du XVIIIe siècle, nous retrouvons Hubert comme boquillon (bûcheron), un métier bien connu dans la région de la Mandel.",
    arrivalP3: "Le choix de partir vers Izegem vers 1699 a déterminé le cours de notre histoire familiale. Sans cette étape, la branche d'Izegem de la famille Deleforge/Deforce n'aurait jamais existé.",
    integrationIntro: "La famille s'intégra rapidement en Flandre Occidentale, en l'espace d'une génération :",
    integrationItems: [
      { name: "La fille Antonia", text: "épousa en 1714 Philippe Charles Rousseau, également un immigrant de Bondues. Ils eurent ensemble 10 enfants." },
      { name: "Jacobus Franciscus", text: "(notre ancêtre direct) épousa en 1718 Veronica Barbier et s'installa à Ardooie. Ils eurent 9 enfants." },
      { name: "Le fils Albert", text: "épousa en 1719 Judoca Reynaert d'Ingelmunster et devint l'ancêtre d'une nombreuse descendance." },
      { name: "Le plus jeune fils Hubert", text: "épousa Isabella De Man d'Izegem et eut avec elle 14 enfants." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Plus ancien ancêtre connu" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Fils de Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Carte historique d'Izegem en 1643 par Antonius Sanderus",
    imgIzegemCaption: "Carte historique d'Izegem en 1643 par Antonius Sanderus",
    imgKerkAlt: "L'ancienne église Saint-Tillo, reconstruite à partir de 1604, démolie en 1852",
    imgKerkCaption: "L'ancienne église Saint-Tillo (1604-1852) — Lithographie de Deroeck",
  };

  const contentPCD = {
    // Nouvelle section: Flandre française vers 1685
    frenchFlandersTitle: "La Flandre française vers 1685 : Eune région in tourmente",
    frenchFlandersExplainerTitle: "Qu'ch'est qu'la Flandre française ?",
    frenchFlandersExplainer: "La Flandre française ch'est la partie historique d'la Flandre qu'i s'trouve à ch't'heure dins l'nord d'la France. Ale incllut la région autour d'Lille, Dunkerque et Hazebrouck. Ch'territoire fut conquis par Louis XIV in 1668 et rattaché à la France. Jusqu'au mitan du XXe siècle, on y parlot incore l'flamand. Attintione : la Flandre française ch'n'est point la Wallonie, qu'i est eune région francophone à part in Belgique.",
    frenchFlandersIntro: "Pour comprinde pourquoé Hubert Deleforge et Antoinette Follet i quittirint leu terre natale, i faut qu'on connosse el monde oùsqu'i vivoéent. La Châtellenie d'Lille — la région autour d'Lille oùsqu'étoéent Hallennes et Capinghem — étot in 1685 eune contrée qu'i tremblot incore d'décennies d'guerre, d'conquête et d'changemints forcés.",
    
    geographyTitle: "Situation géographique",
    geographyP1: "La Châtellenie d'Lille ale s'étindot sus eune superficie d'environ 900 kilométres carrés, bordée par la Lys au nord, la Deûle à l'est et la Scarpe au sud. Ch'étot eune région d'plaine fertile aveuc gramint d'tiots ruissiaux, marécages et bosquets.",
    geographyP2: "L'paysage i s'caractérisot par eune mosaïque d'terres arables, d'prairies et d'forêts. L'Bos d'Haubourdin — la forêt oùsqu'la famille d'Hubert travaillot comme boquillons — étot l'un des nombreux massifs forestiers qu'i traversoéent la région.",
    
    politicalTitle: "Bouleversemints politiques",
    politicalP1: "Jusqu'in 1668, la région ale appartenot aux Pays-Bas espagnols. L'Traité d'Aix-la-Chapelle (1668) transféra l'territoire à la France, mais ch'transfert i fut loin d'éte pacifique.",
    politicalP2: "L'annexione française signifiot in bouleversemint complet pour la populatione locale. La langue des tribunaux ale passa du flamand au français. Les coutumes locales furint révisées.",
    politicalP3: "La francisatione ale fut gramint marquante : la politique systématique d'rimplacemint d'la langue et d'la culture flamandes par l'français.",
    
    economicTitle: "Réalité économique",
    economicP1: "L'économie d'la région ale r'posot sus troés piliers : l'agriculture, la productione textile et l'artisanat.",
    economicP2: "Les guerres d'Louis XIV i dévastérint ch'te économie. Les armées i traversoéent l'pays et exigeoéent nourriture, ch'vaux et logement.",
    economicP3: "I s'ajoutoéent des impôts extraordinaires. La taille, la gabelle et la capitation i p'soéent lourdement sus la populatione.",
    economicTable: [
      { item: "Blé (froment)", price: "12-15 sols par rasiére", note: "Doublé d'puis 1660" },
      { item: "Salaire journalier d'ouvrier", price: "6-8 sols par jour", note: "Inchangé" },
      { item: "Taille annuelle", price: "10-20 livres par ménage", note: "Triplée d'puis 1668" },
      { item: "Logement d'soldats", price: "Variable", note: "Cha pouvot durer des moés" },
    ],
    
    religiousTitle: "Répressione religieuse",
    religiousP1: "L'année 1685 ale marqua in tournant dins la politique religieuse française. L'18 octobre, Louis XIV i signa l'Édit d'Fontainebleau, révoquant l'Édit d'Nantes.",
    religiousP2: "Bin qu'la région lilloise fusse majoritairemint catholique, la révocatione ale eut aussi des conséquinces ichi.",
    religiousP3: "Pour la populatione catholique, la révocatione signifiot in climat étouffant d'contrôle religieux.",
    religiousP4: "La situation des familles mixtes ale étot gramint améré.",
    
    // La francisatione
    francisationTitle: "La francisatione d'la Flandre française",
    francisationIntro: "La transitione d'la Flandre française d'eune région néerlandophone à eune région francophone n'fut point in processus naturel, mais l'résultat d'eune politique linguistique systématique qu'i dura pus d'deux siècles.",
    francisationTimeline: [
      { year: "1659", event: "Traité des Pyrénées", description: "La France ale acquiert les premiéres parties d'la Flandre." },
      { year: "1668", event: "Traité d'Aix-la-Chapelle", description: "Lille et ses invirons i devinrent définitivemint français." },
      { year: "1684", event: "Extensione d'l'ordonnance d'Villers-Cotterêts", description: "L'français i devient la seule langue autorisée dins les tribunaux." },
      { year: "1789", event: "Révolutione française", description: "'Un peuple, eune langue' cha devient la devise." },
      { year: "1794", event: "Rapport Barère", description: "L'flamand i est qualifié d'langue d'la contre-révolutione." },
      { year: "1833", event: "Loi Guizot", description: "L'inseigmint primaire obligatoire — exclusivemint in français." },
    ],
    francisationImpactTitle: "L'systéme du 'signe'",
    francisationImpactP1: "In instrumint gramint humiliant étot l'systéme dit du 'signe' dins les écoles. In tiot garchon ou eune tiote fille qui parlot flamand i r'cevot eune planche autour du cou.",
    francisationImpactP2: "Ch'systéme i créa eune génératione qu'ale avot honte d'sa langue maternelle.",
    francisationFamilyTitle: "Impact sus l'nom d'famille",
    francisationFamilyP1: "La francisatione ale explique égalemint l'évolutione d'note nom d'famille. 'Deleforge' i devint 'Deforce' puis 'Deforche'.",
    francisationFamilyP2: "Ch'est ironique qu'la famille soit partie d'eune région qu'ale perdot sin caractère flamand pour s'installer dins eune contrée qu'ale conserverot sin identité flamande.",
    
    // La Révolutione française
    frenchRevolutionTitle: "La Révolutione française (1789-1799) : Bouleversemint et Terreur",
    frenchRevolutionIntro: "Bin qu'la famille Deleforge eut migré vers la Flandre vers 1699, les deschindants restés in Flandre française i vécurint l'eune des périodes les pus turbulintes d'l'histoère européenne.",
    frenchRevolutionCausesTitle: "Causes d'la Révolutione",
    frenchRevolutionCausesP1: "Dins les années 1780, la France ale traversot eune crise profonde. L'trésor i étot vide à cause d'guerres coûteuses. Les récoltes i échouérint in 1788.",
    frenchRevolutionCausesP2: "La société d'ordres — aveuc la noblesse et l'clergé privilégiés face au Tiers État — ale n'étot pus tenable.",
    frenchRevolutionEventsTitle: "Événemints révolutionnaires",
    frenchRevolutionEventsP1: "L'14 juillet 1789, la Bastille ale fut prise à Paris. La nouvelle ale atteignit Lille in quéques jours. La 'Grande Peur' ale s'répandit.",
    frenchRevolutionEventsP2: "Dins la Châtellenie d'Lille, les monastéres i furint fermés, les biens d'l'Église nationalisés. La guillotine ale fut installée sus la Place du Lion d'Or à Lille.",
    frenchRevolutionTerrorTitle: "La Terreur (1793-1794)",
    frenchRevolutionTerrorP1: "La Terreur sous Robespierre ale frappa duremint la Flandre française. Les représintants in mission i r'çurint des pouvoèrs quasi illimités.",
    frenchRevolutionTerrorP2: "L'catholicisme i fut temporaèremint interdit. Les églises i furint pillées. Les prêtes qu'i refusoéent d'prêter sermint i furint bannis ou exécutés.",
    frenchRevolutionTerrorP3: "L'calendrier i fut réformé : 1792 i d'vint l'An I d'la République. L'dimanche i fut aboli.",
    frenchRevolutionLanguageTitle: "Répressione linguistique",
    frenchRevolutionLanguageP1: "L'fédéralisme et la superstitione i parlent breton ; l'émigratione et la haine d'la République i parlent allmand ; la contre-révolutione ale parle italien, et l'fanatisme i parle basque. Détruisons ches instrumints d'dommage et d'erreur.",
    frenchRevolutionLanguageP2: "Bin qu'l'flamand n'fusse point spécifiquemint mintionné, i tombèt sous la même répressione.",
    frenchRevolutionImpactTitle: "Héritage pour la Flandre française",
    frenchRevolutionImpactP1: "La Révolutione ale apporta des changemints fondamintaux : les droéts féodaux i furint abolis, l'Église ale perdit ses terres.",
    frenchRevolutionImpactP2: "Pour les Deleforge restés in Flandre française, la Révolutione ale signifia eune rupture définitive aveuc l'passé.",
    frenchRevolutionImpactP3: "I est significatif qu'la migratione d'Hubert et Antoinette vers la Flandre, in siécle pus tôt, les eut préservés d'chte catastrophe.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Récolte ratée", description: "Les prix du pain i doublérent. Émeutes d'la faim dins toute la Flandre française." },
      { year: "14 juillet 1789", event: "Prise d'la Bastille", description: "Début d'la Révolutione." },
      { year: "Août 1789", event: "Abolitione du féodalisme", description: "Les priviléges nobiliaires i sont supprimés." },
      { year: "1790", event: "Constitutione civile du clergé", description: "Les prêtes i doévent prêter sermint." },
      { year: "1792", event: "Guerre & République", description: "La France ale déclare la guerre à l'Autriche. La monarchie ale est abolie." },
      { year: "1793-1794", event: "La Terreur", description: "Exécutiones massives. Guillotine à Lille." },
      { year: "1794", event: "Rapport Barère", description: "Les langues régionales i sont interdites." },
      { year: "1799", event: "Napoléon prind l'pouvoèr", description: "Fin d'la Révolutione." },
    ],
    
    socialTitle: "Structure sociale",
    socialP1: "La société autour d'Lille ale étot strictemint hiérarchisée. Au sommet i s'trouvoéent la noblesse et l'haut clergé.",
    socialP2: "La famille Deleforge ale appartenot aux artisans indépindants. In tant qu'boquillons et scieurs d'bos, i avoéent in métier établi.",
    socialP3: "L'mariage d'Hubert et Antoinette i étot donc in mariage socialemint mixte.",
    
    dailyLifeTitle: "La vie d'tertous les jours",
    dailyLifeP1: "La vie dins in village comme Hallennes vers 1685 ale étot dure mais prévisible. La journée ale commincot au lever du soleil.",
    dailyLifeP2: "La plupart des maisons i étoéent in torchis et bos, aveuc des tots d'chaume.",
    dailyLifeP3: "L'minger i s'composot principalemint d'pain, haricots, poids, choux et lard.",
    dailyLifeP4: "L'dimanche i étot l'jour d'l'église et d'la communauté.",
    
    migrationTitle: "La route migratoire vers la Flandre",
    migrationP1: "La migratione d'Hubert et Antoinette vers Izegem vers 1699 ale s'inscrivot dins in mouvemint pus large.",
    migrationP2: "La route d'Hallennes à Izegem ale étot relativemint courte : environ 50 kilométres.",
    migrationP3: "Pourquoé précisémint Izegem ? La réponse ale réside probablemint dins les forêts d'la vallée d'la Mandel.",

    unrestP1: "Dins la seconde moétié du XVIIe siécle, in voéle d'inquiétude i planot sus les villages autour d'Lille. Ch'étot eune région oùsqu'in ordre silincieux et tinace avot existé pindant des générationes : tiots agriculteurs, artisans, travailleurs du bos, fermiers et tisseurs qu'i vivoéent dins in rythme recognoissable. Mais quand Hubert Deleforge i naquît in 1662 à Hallennes-lez-Haubourdin, ch'rythme i étot déjà brisé.",
    unrestP2: "Hallennes et Capinghem, l'village natal d'Antoinette Follet, i s'trouvoéent au cœur d'l'ancienne Châtellenie d'Lille, eune région qu'ale avot fait partie du comté d'Flandre pindant des siécles, mais oùsqu'l'picard i étot la langue courante et l'français la langue d'l'administration. Ch'étot in monde d'idintités frontiéres, oùsqu'on appernot à vive aveuc des suzerainetés qu'i s'chevauchoéent et des allégeances changeantes.",
    unrestP3: "Hubert i grandit à eune époque oùsqu'la guerre n'étot pus quéque chose qu'on n'connossot qu'par ouï-dire. Les armées d'Louis XIV i traversoéent la région, des foés visibles dins les champs pindant des moés. I y avot des années oùsqu'on pouvot à peine récolter ; d'autes années i étoéent dominées par les logemints forcés, oùsqu'les soldats étoéent hébergés chez des familles qu'ale avoéent déjà peu à partager.",
    unrestP4: "La Guerre d'Dévolution (1667-1668) ale plaça la région sous administration française. La Guerre d'Hollande (1672-1678) ale aggrava la situation. La Guerre d'Neuf Ans (1688-1697) ale dévasta des villages intiers. Vers la fin du XVIIe siécle, ch'étot clair : cheux qu'i pouvoéent partir, i partoéent.",
    unrestP5: "In 1685, l'année du mariage d'Hubert aveuc Antoinette, Louis XIV i révoqua l'Édit d'Nantes. Cha signifiot la fin d'la tolérance religieuse pour les protestants. Bin qu'la plupart des habitants d'la région fusséent catholiques, la révocation ale créa in climat d'peur et d'contrôle.",
    schemaHeaders: ["Période", "Contexte", "Effet sus la famille"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes incore partie des Pays-Bas espagnols", effect: "Situation relativemint stable" },
      { period: "1668-1678", context: "Sous administration française (Paix d'Aix-la-Chapelle)", effect: "Pus d'pression ; charges pus élevées" },
      { period: "1678-1685", context: "Intégration compléte à la France", effect: "Contrôle religieux et conversiones forcées" },
      { period: "1685-1697", context: "Révocation d'l'Édit d'Nantes ; Guerre d'Neuf Ans", effect: "Persécution religieuse ; vague migratoire" },
      { period: "1697-1700", context: "Région dévastée malgré la Paix d'Ryswick", effect: "Hubert i migre vers Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Guerre d'Succession d'Espagne", effect: "La famille ale s'inracine in Flandre" },
    ],
    deleforgeTitle: "Famille Deleforge",
    deleforgeP1: "La famille Deleforge ale avot des racines dins l'artisanat : sylviculture, travail du bos, gestion d'fermes, intretien des haies et tiote menuiserie.",
    deleforgeP2: "L'pus ancien anchtre connu i étot Bauduin Deleforge, né vers 1550 et décédé in 1613 à Halluin. Sin fils Hypolite i s'maria vers 1620 à Santes.",
    folletTitle: "Famille Follet",
    folletP1: "L'pére d'Antoinette, l'maître-chirurgien Jean Follet, i jouissot d'eune gramint bonne rinommée au-d'là d'Capinghem.",
    folletP2: "La mére d'Antoinette ale étot Jeanne Lambin, originaire d'Quesnoy-sur-Deûle.",
    contractIntro: "Ch'contrat ch'est l'documint historique familial l'pus important. I fut rédigé l'18 avril 1685 d'vant l'notaire Jacques Anselme Le Francq à Lille.",
    groomTitle: "Côté marié :",
    groomItems: ["Hubert Deleforge, jonne homme d'Hallennes", "Assisté par ses parints Hubert Deleforge et Marie Grimbel", "Sin nonque Pierre Cordon d'Loos comme témoin", "Dot : 400 livres parisis, 3 rasiéres d'blé, 2 paires d'draps, 6 aunes d'tissu"],
    brideTitle: "Côté mariée :",
    brideItems: ["Antoinette Follet, fille d'feu maître Jean Follet d'Capinghem", "Assistée par sa mére Jeanne Lambin, sin fréte Antoine (chirurgien), sin nonque Laurens Ricourt", "Dot : 400 livres parisis, 2 paires d'linceuls, 6 serviettes, vêtimints pour l'jour du mariage"],
    specialTitle: "Dispositiones spéciales :",
    specialItems: ["Antoinette ale conserve l'droit à ses bijoux et biens personnéls", "La dot ale doit éte rimboursée in cas d'absince d'éfants", "Les biens acquis i sont partagés selon des proportiones fixées", "La mére d'la mariée ale accorde à s'fille l'droit d'bail d'eune ferme d'deux bonniers (~2,5 hectares)"],
    contractEnd: "La valeur totale d'la dot — 800 livres parisis — cha correspond à environ deux à troés années d'salaire d'in artisan bin rémunéré.",
    arrivalP1: "Izegem vers 1700 i n'étot point eune grande ville, mais in village in développemint.",
    arrivalP2: "Pour quéqu'un aveuc les compétinces d'Hubert, ch'étot in indroit oùsqu'on pouvot littéralemint rec'mincer.",
    arrivalP3: "L'choés d'partir vers Izegem vers 1699 i a déterminé l'cours d'note histoère familiére.",
    integrationIntro: "La famille ale s'intégra vite in Flandre Occidentale, in l'espace d'eune génératione :",
    integrationItems: [
      { name: "La fille Antonia", text: "ale épousa in 1714 Philippe Charles Rousseau, égalemint in immigrant d'Bondues. I eurint insimble 10 éfants." },
      { name: "Jacobus Franciscus", text: "(note anchtre direct) i épousa in 1718 Veronica Barbier et s'installa à Ardooie. I eurint 9 éfants." },
      { name: "L'fils Albert", text: "i épousa in 1719 Judoca Reynaert d'Ingelmunster et d'vint l'anchtre d'eune nombreuse deschindance." },
      { name: "L'pus jonne fils Hubert", text: "i épousa Isabella De Man d'Izegem et eut aveuc elle 14 éfants." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Pus ancien anchtre connu" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Fils d'Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Carte historique d'Izegem in 1643 par Antonius Sanderus",
    imgIzegemCaption: "Carte historique d'Izegem in 1643 par Antonius Sanderus",
    imgKerkAlt: "L'ancienne église Saint-Tillo, reconstruite à partir d'1604, démolie in 1852",
    imgKerkCaption: "L'ancienne église Saint-Tillo (1604-1852) — Lithographie d'Deroeck",
  };

  const contentVLS = {
    // Nieuwe sectie: Frans-Vloanderen rond 1685
    frenchFlandersTitle: "Frans-Vloanderen rond 1685: E streeke in beroeringe",
    frenchFlandersExplainerTitle: "Wa is Frans-Vloanderen?",
    frenchFlandersExplainer: "Frans-Vloanderen (Flandre française) is 't historische deel van Vloanderen da nui in Nôord-Frankryk ligt. 't Omvat de regio rond Rysel (Lille), Duunkerke (Dunkerque) en Hazebroek (Hazebrouck). Dit gebied wier in 1668 deur Lodewyk XIV veroverd en by Frankryk gevoegd. Tot diep in de 20ste ieuw wier hier nog Vlaamsch gesprôoken. Let op: Frans-Vloanderen is nie 't zelfde as Wallonië, da is e appart Franstalig gebied in België.",
    frenchFlandersIntro: "Om te verstoan woarom da Hubert Deleforge en Antoinette Follet under geboortegrond verlieten, moetn me de wereld kennen woarin da ze leefden. De Châtellenie de Lille — 't gebied rond Rysel woar da Hallennes en Capinghem loagen — was in 1685 e streeke die nog noatrilde van tientallen joaren van oorlog, veroveringe en gedwongen veranderinge.",
    
    geographyTitle: "Geografische situeringe",
    geographyP1: "De Châtellenie de Lille strekte em uut over e gebied van omtrent 900 vierkante kilometer, begrènsd deur de Leie in 't nôorden, de Deûle in 't ôosten, en de Scarpe in 't zuudn. 't Was e vruchtboar loaglandgebied mee vele beekskes, moerassen en bospartietsjes.",
    geographyP2: "'t Landschap wier gekenmerkt deur e mozaïek van akkerland, weilandn en bosschen. Den Bois d'Haubourdin — 't bos woar da Hubert zyn familie as houthakkers werkten — was ien van de vele bosgebiedn die de streeke deursneden.",
    
    politicalTitle: "Politieke omwintelinge",
    politicalP1: "Tot 1668 behoorde de streeke tot de Spaansche Nederlandn, e restant van 't oude Bourgondische ryk. De Vrede van Oaken (1668) droeg 't gebied over an Frankryk, mo diene overdracht was allesbehalve vreedzaam.",
    politicalP2: "De Fransche annexoasje betekende e complete omwintelinge veur de lokoale bevolkinge. De tale van de rechtbanken veranderde van Vlaamsch noar Fransch. De lokoale coutumes wierden herzien.",
    politicalP3: "Pertank 't meest ingrypend was de francisoasje: 't systematisch beleid om de Vlaamsche tale en cultuur te vervangn deur de Fransche.",
    
    economicTitle: "Economische realiteit",
    economicP1: "De economie van de streeke steunde op drie pylers: landbouw, textielproducsje en ambachtn.",
    economicP2: "De oorlogn van Lodewyk XIV verwoestten diene economie. Legers trokken deur 't land en eistn voedsel, peirdn en onderdak.",
    economicP3: "Doarby kwoamn buutengewôone belaastingn. De taille, de gabelle en de capitoasje drukten zwoar op de bevolkinge.",
    economicTable: [
      { item: "Groan (tarwe)", price: "12-15 sols per rasière", note: "Verdubbeld sinds 1660" },
      { item: "Daglôon arbeider", price: "6-8 sols per dag", note: "Ongewyzigd" },
      { item: "Joarlyksche taille", price: "10-20 livres per uushôodn", note: "Verdriedubbeld sinds 1668" },
      { item: "Inkwartieringe", price: "Variabel", note: "Kust moanden duurn" },
    ],
    
    religiousTitle: "Religieuze repressie",
    religiousP1: "'t Joar 1685 markeerde e keerpunt in de Fransche religieuze politiek. Op 18 oktober ondertekende Lodewyk XIV 't Edict van Fontainebleau.",
    religiousP2: "Alhoewel da de streeke rond Rysel overwegend katholiek was, ad de herroepinge ook hier gevolgen.",
    religiousP3: "Veur de katholieke bevolkinge betekende de herroepinge e verstikkend klimoat van religieuze controle.",
    religiousP4: "Pertank wrang was de situoasje veur gemengde gezinnen.",
    
    socialTitle: "Sociale structuur",
    socialP1: "De moatschappy rond Rysel was streng hiërarchisch geordend. An de top stonden de adel en de hôogere geestelykheid.",
    socialP2: "De familie Deleforge behoorde tot de zelfstandige ambachtsliedn. As boquillons en houtzoagers addn ze e vast beroep.",
    socialP3: "'t Huwelyk van Hubert en Antoinette was dus e sociaal gemengd huwelyk.",
    
    dailyLifeTitle: "'t Doageliks levn",
    dailyLifeP1: "'t Levn in e dorp gelyk Hallennes rond 1685 was hard mo veurspelboar. De dag begust by zonsopgang.",
    dailyLifeP2: "De meeste uuzn woarn van leem en hout, mee strôodoakn.",
    dailyLifeP3: "'t Eetn bestond veurnoamelyk uut brôod, bôonn, erwetn, kôole en spek.",
    dailyLifeP4: "De zundag was de dag van de kerke en van de gemeenschap.",
    
    migrationTitle: "De migroasjeroute noar Vloandern",
    migrationP1: "De migroasje van Hubert en Antoinette noar Izegem rond 1699 paste in e grôotere beweginge.",
    migrationP2: "De route van Hallennes noar Izegem was relatieft kort: omtrent 50 kilometer.",
    migrationP3: "Woarom pertank Izegem? 't Antwoord ligt woarschynlyk in de bosschen van de Mandelvallei.",

    // De Verfransinge
    francisationTitle: "De verfransinge van Frans-Vloandern",
    francisationIntro: "De overgang van Frans-Vloandern van e Vlaamstalig noar e Franstalig gebied was geen natuurlyk proces, mo 't resultaat van e systematisch taalbeleid da mee dan twie ieuwn zou duurn.",
    francisationTimeline: [
      { year: "1659", event: "Vrede van de Pyreneeën", description: "Frankryk verwèrft de eeste deln van Vloandern." },
      { year: "1668", event: "Vrede van Oakn", description: "Rysel en omgevinge wordn definitief Frans." },
      { year: "1684", event: "Ordonnansje van Villers-Cotterêts uutgebreid", description: "Frans wordt de ienige toegeloatn tale in rechtbankn." },
      { year: "1789", event: "Fransche Revolusje", description: "'Un peuple, une langue' wordt 't motto." },
      { year: "1794", event: "Rapport Barère", description: "Vlaamsch wordt bestempeld as 'de tale van de contrarevolusje'." },
      { year: "1833", event: "Wet Guizot", description: "Verplicht loager onderwys — uutsluitend in 't Frans." },
    ],
    francisationImpactTitle: "'t 'Signe'-systeem",
    francisationImpactP1: "E pertank vernederend instrument was 't zogenoamde 'signe'-systeem in de schôoln. E kind da Vlaamsch sprak, kreeg e houtn bord om de nekke gehangn mee 'Parlez français'.",
    francisationImpactP2: "Dit systeem creëerde e generoasje die em schoamde veur under moedertale.",
    francisationFamilyTitle: "Impact op de familienoam",
    francisationFamilyP1: "De verfransinge verkloart ook de evolusje van uuze familienoam. In Fransche dokementn wier 'Deleforge' geschrevn — e verfranste spellinge. Tonne da de familie noar Vloandern migreerde, wier dit 'Deforce' of 'De Force', en later in de Vlaamsche registers 'Deforche'.",
    francisationFamilyP2: "'t Is ironisch da de familie vertrok uut e gebied da zyn Vlaamsche karakter verloor, om em te vestign in e streeke die zyn Vlaamsche identiteit zou behôodn.",
    
    // De Fransche Revolusje
    frenchRevolutionTitle: "De Fransche Revolusje (1789-1799): Omwintelinge en terreur",
    frenchRevolutionIntro: "Alhoewel da de familie Deleforge ol rond 1699 noar Vloandern gemigreerd was, blevn de noazoatn in Frans-Vloandern achter en deurleefdn ze iene van de meest turbulente periodes uut de Europeesche geschiedenisse.",
    frenchRevolutionCausesTitle: "Oorzaakn van de Revolusje",
    frenchRevolutionCausesP1: "In de joarn 1780 verkeerde Frankryk in e diepe crisis. De schatkiste was leeg deur kostboar oorlogn. De oogstn misluktn in 1788.",
    frenchRevolutionCausesP2: "De standenmoatschappy — mee de geprivilegieerde adel en geestelykheid tegenover de belaaste Derde Stand — was nie mee houdboar.",
    frenchRevolutionEventsTitle: "Revolutionnaire gebeurtenissn",
    frenchRevolutionEventsP1: "Op 14 juli 1789 wier de Bastille bestormd in Parys. 't Nieuws bereikte Rysel binnn doagn. De 'Grande Peur' greep om em heen.",
    frenchRevolutionEventsP2: "In de Kasselry van Rysel wierdn kloosters geslôotn, kerkelyke goedern genatjonalizeerd. De guillotine wier opgesteld op de Place du Lion d'Or in Rysel.",
    frenchRevolutionTerrorTitle: "De Terreur (1793-1794)",
    frenchRevolutionTerrorP1: "'t Schrikbewind onder Robespierre trof Frans-Vloandern hard. Repressentantn-in-opdracht kregn vrywal onbeperkte macht.",
    frenchRevolutionTerrorP2: "'t Katholicisme wier tydelyk verbôodn. Kerkn wierdn geplunderd. Priesters die weigerdnde eed af te leggn wierdn verbannn of geëxecuteerd.",
    frenchRevolutionTerrorP3: "De kalender wier hervormd: 1792 wier 'Joar I' van de Republiek. Zundag wier afgeschaft.",
    frenchRevolutionLanguageTitle: "Taalrepressie",
    frenchRevolutionLanguageP1: "'t Federalisme en 't bygeloof sprekn Bretons; de emigroasje en de hoat jegens de Republiek sprekn Duuts; de contrarevolusje spreekt Italioans, en 't fanatisme spreekt Baskisch. Loat ons diene instrumentn van schoade en dwalinge vernietignn.",
    frenchRevolutionLanguageP2: "Alhoewel 't Vlaamsch in dit specifieke rapport nie wier genoemd, viel 't onder dezelfde repressie.",
    frenchRevolutionImpactTitle: "Noalaotnschap veur Frans-Vloandern",
    frenchRevolutionImpactP1: "De Revolusje brogt fundamentele veranderingn: de feodale rechtn wierdn afgeschaft, de kerke verloor hoar landgoedernn en macht.",
    frenchRevolutionImpactP2: "Veur de achtergeblevn Deleforges in Frans-Vloandern betekende de Revolusje e definitieve breuke mee 't verledn.",
    frenchRevolutionImpactP3: "'t Is veelzeggend da de migroasje van Hubert en Antoinette noar Vloandern, e ieuw vroeger, under ad behoed veur diene catastrofe.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Mislukte oogst", description: "Brôodpryzn verdubbeldnn. Hongeroproern in heel Frans-Vloandern." },
      { year: "14 juli 1789", event: "Bestorminge Bastille", description: "Begin van de Revolusje." },
      { year: "Aug 1789", event: "Afschaffinge feodalisme", description: "Adellyke privilegies wierdn opgehevn." },
      { year: "1790", event: "Grondwet Geestelykheid", description: "Priesters moestn eed afleggn." },
      { year: "1792", event: "Oorlog & Republiek", description: "Frankryk verkloart oorlog an Ôostnryk. De monarchie wier afgeschaft." },
      { year: "1793-1794", event: "De Terreur", description: "Massale executjes. Guillotine in Rysel." },
      { year: "1794", event: "Rapport Barère", description: "Regionoale taln wierdn verbôodn." },
      { year: "1799", event: "Napoleon grypt macht", description: "Inde van de Revolusje." },
    ],

    unrestP1: "In de twiede helft van de zeventienste ieuw hong d'r over de dorpn rond Rysel e sluuier van onrust. 't Was e streeke woar da generoasjes lange e stille, toaie orde bestoan ad: kleene landbouwers, ambachtsliedn, houtwerkers, pachters en wevers die in e herkenboar ritme leefdn. Mo tonne da Hubert Deleforge in 1662 gebôorn wier in Hallennes-lez-Haubourdin, was da ritme ol gebrokn.",
    unrestP2: "Hallennes en Capinghem, 't geboortedorp van Antoinette Follet, loagn in 't herte van de oude Châtellenie de Lille, e gebied da ieuwenlaank deel van 't groafschap Vloandern gewist was, mo woar Pikoardisch de omgangstale en Frans de tale van de administroasje vormdn.",
    unrestP3: "Hubert groeide op in e tied woarin da oorlog nie mee iets was da me van hôorn zeggn kende. De legers van Lodewyk XIV trokken deur de streeke, soms moandnlank zichtboar in de veldn.",
    unrestP4: "De Devolutieoorlog (1667-1668) brogt de streeke onder Frans bestier. De Hollandse Oorlog (1672-1678) moakte de situoasje nog erger. De Negenjoarige Oorlog (1688-1697) verwoestte hele dorpn. Tegn 't inde van de zeventienste ieuw was 't kloar: wie dat kust vertrekkn, dé dat.",
    unrestP5: "In 1685, 't joar van Hubert zyn huwelyk mee Antoinette, herriep Lodewyk XIV 't Edict van Nantes. Dit betekende 't inde van de religieuze toleransje veur protestantn.",
    schemaHeaders: ["Periode", "Context", "Effect op familie"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes nog deel van de Spaansche Nederlandn", effect: "Relatieft stabiele situoasje" },
      { period: "1668-1678", context: "Onder Frans bestier (Vrede van Oakn)", effect: "Mee druk; hôogere lastn" },
      { period: "1678-1685", context: "Volledige integroasje in Frankryk", effect: "Religieuze controle en gedwongn bekeringn" },
      { period: "1685-1697", context: "Herroepinge Edict van Nantes; Negenjoarige Oorlog", effect: "Religieuze vervolginge; migroasjegolf" },
      { period: "1697-1700", context: "Streeke verwoest ondanks Vrede van Ryswyk", effect: "Hubert migreert noar Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Spaansche Successieoorlog", effect: "Familie wortelt in Vloandern" },
    ],
    deleforgeTitle: "Familie Deleforge",
    deleforgeP1: "De familie Deleforge ad wortels in 't ambacht: bosbuuw, houtbewerkinge, 't beheer van pachthoevn, 't onderhôod van houtkantnn en klein timmerwèrk.",
    deleforgeP2: "De oudste bekinde veurvader was Bauduin Deleforge, die rond 1550 gebôorn wier en in 1613 overlieed in Halluin. Zyn zeune Hypolite trouwde rond 1620 in Santes.",
    folletTitle: "Familie Follet",
    folletP1: "Antoinette hoar vader, meester-chirurgyn Jean Follet, genoot anzien tot buutn Capinghem. Chirurgyns woarn in de zeventienste ieuw hôogopgeleide ambachtslui.",
    folletP2: "De moeder van Antoinette was Jeanne Lambin, afkomstig uut Quesnoy-sur-Deûle.",
    contractIntro: "Dit contract is 't allerbelangrikste historische familiedokement. 't Wier opgesteld op 18 april 1685 veur notaris Jacques Anselme Le Francq te Rysel.",
    groomTitle: "Bruidegomskant:",
    groomItems: ["Hubert Deleforge, jongn man uut Hallennes", "Bygstoan deur zyn ouders Hubert Deleforge en Marie Grimbel", "Nonkel Pierre Cordon uut Loos as getuuge", "Bruudsschat: 400 pond parisis, 3 rasieren tarwe, 2 poar loakns, 6 el loakenstof"],
    brideTitle: "Bruidskant:",
    brideItems: ["Antoinette Follet, dochter van wyln meester Jean Follet uut Capinghem", "Bygstoan deur hoar moeder Jeanne Lambin, hoar broer Antoine (chirurgyn), hoar nonkel Laurens Ricourt", "Bruudsschat: 400 pond parisis, 2 poar lykwoadn, 6 servettn, kliedern veur de trouwdag"],
    specialTitle: "Byzondere bepoalingn:",
    specialItems: ["Antoinette behôot recht op hoar sieroadn en persôonlyke goedernn", "De bruudsschat moet teruggegevn wordn by kinderloosheid", "Verworvn goedernn wordn gedeeld volgns vastgelegde proporties", "De moeder van de bruud geeft hoar dochter 't uurrecht van e hoeve van twie bonniers (~2,5 hectoare)"],
    contractEnd: "De totoale wèrde van de bruudsschat — 800 pond parisis — komt overeen mee omtrent twie tot drie joarlôonn van e goed verdienende ambachtsman.",
    arrivalP1: "Izegem was rond 1700 geen grôote stad, mo e dorp in ontwikkelinge. 't Kende e aktieve gemeenschap van boern, ambachtslui en houtwerkers.",
    arrivalP2: "Veur iemand mee Hubert zyn voardighedn was dit e ploatse woar da me letterlyk opnuuw kust beginnn.",
    arrivalP3: "De keuze om rond 1699 noar Izegem te trekkn eit de lôop van uuze familiegeschiedenisse bepoald.",
    integrationIntro: "De familie integreerde em snel in West-Vloandern, binnn 't tydsbestek van iene generoasje:",
    integrationItems: [
      { name: "Dochter Antonia", text: "trouwde in 1714 mee Philippe Charles Rousseau, ook e immigrant uut Bondues. Zy kregn soamn 10 kinders." },
      { name: "Jacobus Franciscus", text: "(uuze rechtstreekse veurvader) trouwde in 1718 mee Veronica Barbier en vestigde em in Ardooie. Zy kregn 9 kinders." },
      { name: "Zeune Albert", text: "trouwde in 1719 mee Judoca Reynaert uut Ingelmunster en wier der stamvader van e talryk noageslacht." },
      { name: "De jongste zeune Hubert", text: "trouwde mee de Izegemse Isabella De Man en kreeg mee hoar 14 kinders." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Oudste bekinde veurvader" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Zeune van Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Historische koarte van Izegem in 1643 deur Antonius Sanderus",
    imgIzegemCaption: "Historische koarte van Izegem in 1643 deur Antonius Sanderus",
    imgKerkAlt: "D'Oude Sint-Tillokèrke, heropgebouwd vanof 1604, in 1852 afgebrokn",
    imgKerkCaption: "D'Oude Sint-Tillokèrke (1604-1852) — Lithografie van Deroeck",
  };

  const contentEN = {
    // New section: French Flanders around 1685
    frenchFlandersTitle: "French Flanders around 1685: A Region in Turmoil",
    frenchFlandersExplainerTitle: "What is French Flanders?",
    frenchFlandersExplainer: "French Flanders (Flandre française) is the historic part of Flanders now located in northern France. It includes the region around Lille, Dunkirk (Dunkerque), and Hazebrouck. This territory was conquered by Louis XIV in 1668 and annexed to France. Flemish was still spoken here until well into the 20th century. Note: French Flanders is not the same as Wallonia, which is a separate French-speaking region in Belgium.",
    frenchFlandersIntro: "To understand why Hubert Deleforge and Antoinette Follet left their homeland, we must know the world in which they lived. The Châtellenie de Lille — the area around Lille where Hallennes and Capinghem were located — was in 1685 a region still trembling from decades of war, conquest and forced change.",
    
    geographyTitle: "Geographic Location",
    geographyP1: "The Châtellenie de Lille extended over an area of about 900 square kilometers, bordered by the Lys in the north, the Deûle in the east, and the Scarpe in the south. It was a fertile lowland area with numerous streams, marshes and groves. The villages of Hallennes-lez-Haubourdin and Capinghem were only a few kilometers from Lille, the capital of the region.",
    geographyP2: "The landscape was characterized by a mosaic of arable land, meadows and forests. The Bois d'Haubourdin — the forest where Hubert's family worked as woodcutters — was one of the many forest areas that crossed the region. These forests provided not only wood, but also shelter for outlaws and deserters during the war years.",
    
    politicalTitle: "Political Upheavals",
    politicalP1: "Until 1668, the region belonged to the Spanish Netherlands, a remnant of the old Burgundian empire. The Treaty of Aix-la-Chapelle (1668) transferred the territory to France, but this transfer was far from peaceful. Louis XIV considered the Netherlands his rightful inheritance and was determined to annex the entire territory.",
    politicalP2: "The French annexation meant a complete upheaval for the local population. The language of the courts changed from Flemish to French. Local customs (customary law) were revised. New taxes were introduced. French officials replaced local administrators. The intendant de Flandre was given unlimited power over daily life.",
    politicalP3: "Particularly impactful was the francisation: the systematic policy of replacing the Flemish language and culture with French. Although Picard (a Romance language related to French) had been spoken in the Lille area for centuries, the last traces of Flemish influence were now erased.",
    
    economicTitle: "Economic Reality",
    economicP1: "The economy of the region rested on three pillars: agriculture, textile production and crafts. Agriculture produced grain, flax and hops. The textile industry — especially linen production — employed thousands of weavers, spinners and bleachers. The craft sector included blacksmiths, carpenters, coopers, joiners and woodcutters.",
    economicP2: "The wars of Louis XIV devastated this economy. Armies marched through the land and demanded food, horses and lodging. Soldiers were quartered with civilians. Farms were plundered or burned down. The textile trade with the Netherlands — the traditional market — was disrupted by war.",
    economicP3: "Added to this were extraordinary taxes. The taille (land tax), the gabelle (salt tax) and the capitation (head tax) weighed heavily on the population. War contributions could ruin entire villages at once.",
    economicTable: [
      { item: "Grain (wheat)", price: "12-15 sols per rasière", note: "Doubled since 1660" },
      { item: "Daily wage laborer", price: "6-8 sols per day", note: "Unchanged" },
      { item: "Annual taille", price: "10-20 livres per household", note: "Tripled since 1668" },
      { item: "Billeting", price: "Variable", note: "Could last months" },
    ],
    
    religiousTitle: "Religious Repression",
    religiousP1: "The year 1685 marked a turning point in French religious policy. On October 18 — exactly six months after the marriage of Hubert and Antoinette — Louis XIV signed the Edict of Fontainebleau, revoking the Edict of Nantes. This meant the end of all religious tolerance in France.",
    religiousP2: "Although the Lille region was predominantly Catholic, the revocation also had consequences here. The Protestant minorities — especially in the textile towns — fled to the Netherlands, England or Germany. This caused a brain drain of skilled craftsmen and wealthy merchants.",
    religiousP3: "For the Catholic population, the revocation meant a stifling climate of religious control. The Bishop of Tournai — under whose jurisdiction the region fell — was given extensive powers. Baptismal, marriage and death registers became mandatory. The pastor became an extension of the state.",
    religiousP4: "The situation of mixed families was particularly bitter. Anyone with a Protestant ancestor was viewed with suspicion. Anyone with a family member who had fled to the Netherlands could get into trouble. The dragonnades — the forced quartering of soldiers with Protestant families to force them to convert — were less violent in the Lille region than in the south of France, but the threat was always present.",
    
    socialTitle: "Social Structure",
    socialP1: "Society around Lille was strictly hierarchically organized. At the top stood the nobility and the higher clergy, followed by the wealthy merchants and lawyers. Below came the petite bourgeoisie: independent craftsmen, shopkeepers and farmers with their own land. At the bottom were the day laborers, servants, maids and poor.",
    socialP2: "The Deleforge family belonged to the independent craftsmen. As boquillons (woodcutters) and sawyers, they had an established trade with their own tools and a degree of independence. The Follet family stood higher on the social ladder: Jean Follet was a master-surgeon, a respected craft that required both medical knowledge and manual skill.",
    socialP3: "The marriage of Hubert and Antoinette was thus a socially mixed marriage. The fact that both families brought an equal dowry of 400 livres parisis indicates that they considered each other as equals — or that the Follets were willing to accept a slightly lower social status in exchange for other advantages.",
    
    dailyLifeTitle: "Daily Life",
    dailyLifeP1: "Life in a village like Hallennes around 1685 was hard but predictable — at least in peacetime. The day began at sunrise and ended at sunset. The year followed the rhythm of the seasons: sowing in spring, haymaking in summer, harvesting in autumn, chopping wood in winter.",
    dailyLifeP2: "Most houses were made of mud and wood, with thatched roofs. They consisted of one or two rooms, where the whole family lived, ate and slept. The kitchen was the heart of the house, where cooking was done over an open fire. Lighting came from candles or oil lamps.",
    dailyLifeP3: "The diet consisted mainly of bread, beans, peas, cabbage and bacon. Meat was a luxury, reserved for feast days. Beer was the daily drink — safer than water. Coffee and tea were unknown; wine was expensive and rare.",
    dailyLifeP4: "Sunday was the day of the church and of the community. After mass, the villagers gathered in the square, where news was exchanged, business was done and marriages were discussed. It was also the day when the pastor read the royal edicts — the only way most villagers heard news from Paris or Versailles.",
    
    migrationTitle: "The Migration Route to Flanders",
    migrationP1: "The migration of Hubert and Antoinette to Izegem around 1699 was part of a larger movement. Thousands of French — both Protestants and Catholics — moved to the Southern Netherlands, the Republic, England or Germany in the last decades of the seventeenth century.",
    migrationP2: "The route from Hallennes to Izegem was relatively short: about 50 kilometers, which could be covered on foot in two to three days. The road went via Menen and Kortrijk, or via Tourcoing and Mouscron. Both routes crossed the border between France and the Spanish Netherlands — a border that constantly shifted through war and diplomacy during those years.",
    migrationP3: "Why exactly Izegem? The answer probably lies in the forests of the Mandel valley and the presence of a community of woodcutters. Hubert found work there as a boquillon — the same trade his family had practiced for generations. Moreover, Izegem was far enough from the border to be relatively safe, but close enough to maintain contacts with the old region.",

    // The Francization of French Flanders
    francisationTitle: "The Francization of French Flanders",
    francisationIntro: "The transition of French Flanders from a Dutch-speaking to a French-speaking region was not a natural process, but the result of a systematic language policy that would last more than two centuries. This process of francization would also affect the Deleforge family name.",
    francisationTimeline: [
      { year: "1659", event: "Treaty of the Pyrenees", description: "France acquires the first parts of Flanders. The language border begins to shift." },
      { year: "1668", event: "Treaty of Aix-la-Chapelle", description: "Lille and surroundings become definitively French. Local Flemish dialects come under pressure." },
      { year: "1684", event: "Ordinance of Villers-Cotterêts extended", description: "French becomes the only permitted language in courts and official documents." },
      { year: "1789", event: "French Revolution", description: "The revolutionaries see linguistic diversity as a threat to unity. 'Un peuple, une langue' becomes the motto." },
      { year: "1794", event: "Barère Report", description: "Flemish and other minority languages are labeled as 'the languages of counter-revolution'." },
      { year: "1833", event: "Guizot Law", description: "Compulsory primary education is introduced — exclusively in French. Children are punished for speaking Flemish." },
    ],
    francisationImpactTitle: "The 'signe' system",
    francisationImpactP1: "A particularly humiliating instrument was the so-called 'signe' system in schools. A child who spoke Flemish received a wooden board hung around their neck with 'Parlez français' or 'It is forbidden to speak Flemish' written on it. This child then had to catch another child speaking Flemish to pass on the board. At the end of the day, the child wearing the sign was punished.",
    francisationImpactP2: "This system — which would continue well into the twentieth century — created a generation that was ashamed of their mother tongue. Parents stopped speaking Flemish at home to spare their children the humiliation.",
    francisationFamilyTitle: "Impact on the family name",
    francisationFamilyP1: "The francization also explains the evolution of our family name. In French documents, 'Deleforge' was written — a Frenchified spelling. When the family migrated to Flanders, this became 'Deforce' or 'De Force', and later 'Deforche' in the Flemish registers. The name followed the language borders, as it were.",
    francisationFamilyP2: "It is ironic that the family left an area that was losing its Flemish character to settle in a region that would retain its Flemish identity. Hubert's choice to move to Izegem was perhaps also a choice for a language and culture that were being suppressed in his birthplace.",
    
    // The French Revolution
    frenchRevolutionTitle: "The French Revolution (1789-1799): Upheaval and Terror",
    frenchRevolutionIntro: "Although the Deleforge family had migrated to Flanders around 1699, the descendants who remained in French Flanders lived through one of the most turbulent periods in European history. The French Revolution would forever change the face of the region.",
    frenchRevolutionCausesTitle: "Causes of the Revolution",
    frenchRevolutionCausesP1: "In the 1780s, France was in deep crisis. The treasury was empty due to costly wars — including support for the American Revolution. The harvests failed in 1788, causing bread prices to soar to unprecedented heights. In French Flanders, where the textile industry was already under pressure from English competition, this led to widespread hunger and unemployment.",
    frenchRevolutionCausesP2: "The estate system — with the privileged nobility and clergy versus the taxed Third Estate — was no longer sustainable. When King Louis XVI convened the Estates-General in May 1789 to address the financial crisis, the spark was lit.",
    frenchRevolutionEventsTitle: "Revolutionary Events in French Flanders",
    frenchRevolutionEventsP1: "On July 14, 1789, the Bastille was stormed in Paris. The news reached Lille within days and led to spontaneous popular uprisings. The 'Grande Peur' (Great Fear) spread: rumors of noble conspiracies and foreign invasions led peasants to attack their landlords and burn archives.",
    frenchRevolutionEventsP2: "In the Châtellenie de Lille, monasteries were closed, church property nationalized, and old Flemish traditions banned. The guillotine was set up in the Place du Lion d'Or in Lille. Between 1793 and 1794, dozens of 'enemies of the revolution' were beheaded here — nobles, priests, but also ordinary citizens suspected of counter-revolutionary sympathies.",
    frenchRevolutionTerrorTitle: "The Terror (1793-1794)",
    frenchRevolutionTerrorP1: "The Reign of Terror under Robespierre hit French Flanders hard. The region was on the front line of the war against Austria and the United Provinces. Representatives-on-mission were given virtually unlimited power to hunt down 'counter-revolutionaries'.",
    frenchRevolutionTerrorP2: "Catholicism was temporarily banned. Churches were looted, renamed 'Temples of Reason' or used as storage facilities. Priests who refused to take the oath to the constitution were banished or executed. In many villages around Lille, Dunkirk and Hazebrouck, the bell towers were demolished — symbols of the ancien régime.",
    frenchRevolutionTerrorP3: "The calendar was reformed: 1792 became 'Year I' of the Republic. Sunday was abolished. Christian holidays were replaced by revolutionary celebrations. Names of places and people were 'de-Christianized' — Jean became 'Brutus', Marie became 'Liberté'.",
    frenchRevolutionLanguageTitle: "Language Repression in the Name of Unity",
    frenchRevolutionLanguageP1: "Federalism and superstition speak Breton; emigration and hatred of the Republic speak German; counter-revolution speaks Italian, and fanaticism speaks Basque. Let us destroy these instruments of harm and error.",
    frenchRevolutionLanguageP2: "Although Flemish was not specifically mentioned in this report, it fell under the same repression. The local Picard and Flemish dialects were persecuted. Only French was permitted in official documents, education and justice. This policy would lay the foundation for the systematic francization of the 19th and 20th centuries.",
    frenchRevolutionImpactTitle: "Legacy for French Flanders",
    frenchRevolutionImpactP1: "The Revolution brought fundamental changes: feudal rights were abolished, the Church lost its lands and power, and civil equality was constitutionally guaranteed. But the price was high: thousands of victims, devastated churches, torn families and a trauma that would last for generations.",
    frenchRevolutionImpactP2: "For the Deleforges who remained in French Flanders, the Revolution meant a definitive break with the past. The old church where their ancestors had been baptized was looted or demolished. The parish registers — our main genealogical sources — were partly destroyed. The traditional society in which their ancestors had lived no longer existed.",
    frenchRevolutionImpactP3: "It is significant that the migration of Hubert and Antoinette to Flanders, a century earlier, had protected them from this catastrophe. Their descendants in Izegem lived under Austrian and later Dutch rule, where the revolutionary terror never struck with the same intensity.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Failed harvest", description: "Bread prices doubled. Hunger riots throughout French Flanders." },
      { year: "July 14, 1789", event: "Storming of the Bastille", description: "Beginning of the Revolution. News reaches Lille within days." },
      { year: "Aug 1789", event: "Abolition of feudalism", description: "Noble privileges are abolished. Peasants refuse to pay rent." },
      { year: "1790", event: "Civil Constitution of the Clergy", description: "Priests must take an oath. Many refuse and are persecuted." },
      { year: "1792", event: "War & Republic", description: "France declares war on Austria. The monarchy is abolished." },
      { year: "1793-1794", event: "The Terror", description: "Mass executions. Guillotine in Lille. Churches looted and closed." },
      { year: "1794", event: "Barère Report", description: "Regional languages are banned. Only French permitted." },
      { year: "1799", event: "Napoleon seizes power", description: "End of the Revolution. Beginning of the Empire." },
    ],

    unrestP1: "In the second half of the seventeenth century, a veil of unrest hung over the villages around Lille. It was a region where a quiet, tenacious order had existed for generations: small farmers, craftsmen, woodworkers, tenant farmers and weavers who lived in a recognizable rhythm. But when Hubert Deleforge was born in 1662 in Hallennes-lez-Haubourdin, that rhythm was already broken.",
    unrestP2: "Hallennes and Capinghem, the birthplace of Antoinette Follet, were at the heart of the old Châtellenie de Lille, an area that had been part of the County of Flanders for centuries, but where Picard was the everyday language and French the language of administration. It was a world of border identities, where people learned to live with overlapping sovereignties and changing loyalties.",
    unrestP3: "Hubert grew up in a time when war was no longer something known only by hearsay. The armies of Louis XIV passed through the region, sometimes visible in the fields for months. There were years when hardly any harvest could be gathered; other years were dominated by billeting, where soldiers were housed with families who already had little to share.",
    unrestP4: "The War of Devolution (1667-1668) brought the region under French rule. The Dutch War (1672-1678) made the situation worse. The Nine Years' War (1688-1697) devastated entire villages. By the end of the seventeenth century, it was clear: those who could leave, did.",
    unrestP5: "In 1685, the year of Hubert's marriage to Antoinette, Louis XIV revoked the Edict of Nantes. This meant the end of religious tolerance for Protestants. Although most inhabitants of the region were Catholic, the revocation created a climate of fear and control. The Church gained more power, the State more grip on daily life.",
    schemaHeaders: ["Period", "Context", "Effect on family"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes still part of the Spanish Netherlands", effect: "Relatively stable situation" },
      { period: "1668-1678", context: "Under French rule (Peace of Aix-la-Chapelle)", effect: "More pressure; higher taxes" },
      { period: "1678-1685", context: "Full integration into France", effect: "Religious control and forced conversions" },
      { period: "1685-1697", context: "Revocation of Edict of Nantes; Nine Years' War", effect: "Religious persecution; migration wave" },
      { period: "1697-1700", context: "Region devastated despite Peace of Ryswick", effect: "Hubert migrates to Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "War of Spanish Succession", effect: "Family takes root in Flanders" },
    ],
    deleforgeTitle: "The Deleforge Family",
    deleforgeP1: "The Deleforge family had roots in craftsmanship: forestry, woodworking, farm management, hedge maintenance and small carpentry. They were independent workers who knew their place in the village community, but who also depended on stable local conditions.",
    deleforgeP2: "The oldest known ancestor was Bauduin Deleforge, born around 1550 and died in 1613 in Halluin. His son Hypolite married around 1620 in Santes. His son Hubert senior married Marie Grimbel from Beaucamps-Ligny. They were the parents of our founding ancestor Hubert.",
    folletTitle: "The Follet Family",
    folletP1: "Antoinette's father, master surgeon Jean Follet, enjoyed renown beyond Capinghem. Surgeons in the seventeenth century were highly trained craftsmen who treated wounds, set bones and sometimes performed minor operations. Jean Follet had a great reputation as a tenacious healer throughout the region.",
    folletP2: "Antoinette's mother was Jeanne Lambin, originally from Quesnoy-sur-Deûle. At the marriage contract of 1685, she was a widow. She was assisted by her son Antoine, also a surgeon, and her brother Laurens Ricourt.",
    contractIntro: "This contract is the most important historical family document. It was drawn up on April 18, 1685 before notary Jacques Anselme Le Francq in Lille and follows the coutume de Lille, a legal system that offered more protection to women than in many surrounding regions. The contract is preserved in the Archives Départementales du Nord.",
    groomTitle: "Groom's side:",
    groomItems: [
      "Hubert Deleforge, young man from Hallennes",
      "Assisted by his parents Hubert Deleforge and Marie Grimbel",
      "Uncle Pierre Cordon from Loos as witness",
      "Dowry: 400 pounds parisis, 3 rasières of wheat, 2 pairs of sheets, 6 ells of woolen cloth"
    ],
    brideTitle: "Bride's side:",
    brideItems: [
      "Antoinette Follet, daughter of the late master Jean Follet from Capinghem",
      "Assisted by her mother Jeanne Lambin, brother Antoine (surgeon), uncle Laurens Ricourt",
      "Dowry: 400 pounds parisis, 2 pairs of shrouds, 6 napkins, clothing for the wedding day"
    ],
    specialTitle: "Special provisions:",
    specialItems: [
      "Antoinette retains the right to her jewelry and personal possessions",
      "The dowry must be repaid in case of childlessness",
      "Acquired goods are shared according to fixed proportions",
      "The bride's mother grants her daughter the lease rights to a farm of two bonniers (~2.5 hectares)"
    ],
    contractEnd: "The total value of the dowry — 800 pounds parisis — corresponds to approximately two to three annual wages of a well-earning craftsman. This indicates that both families belonged to the prosperous middle class.",
    arrivalP1: "Izegem around 1700 was not a large town, but a developing village. It had an active community of farmers, craftsmen and woodworkers. The nearby Mandel valley offered wood, water, peat and employment.",
    arrivalP2: "For someone with Hubert's skills, this was a place where one could literally start anew. In the early years of the eighteenth century, we find Hubert as a boquillon (woodcutter), a profession well known in the Mandel region.",
    arrivalP3: "The choice to move to Izegem around 1699 determined the course of our family history. Without that step, the Izegem branch of the Deleforge/Deforce family would never have existed.",
    integrationIntro: "The family integrated quickly into West Flanders, within the span of one generation:",
    integrationItems: [
      { name: "Daughter Antonia", text: "married in 1714 Philippe Charles Rousseau, also an immigrant from Bondues. They had 10 children together." },
      { name: "Jacobus Franciscus", text: "(our direct ancestor) married in 1718 Veronica Barbier and settled in Ardooie. They had 9 children." },
      { name: "Son Albert", text: "married in 1719 Judoca Reynaert from Ingelmunster and became the founding ancestor of a numerous offspring." },
      { name: "The youngest son Hubert", text: "married Isabella De Man from Izegem and had 14 children with her." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Oldest known ancestor" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Son of Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Historical map of Izegem in 1643 by Antonius Sanderus",
    imgIzegemCaption: "Historical map of Izegem in 1643 by Antonius Sanderus",
    imgKerkAlt: "The Old St. Tillo Church, rebuilt from 1604, demolished in 1852",
    imgKerkCaption: "The Old St. Tillo Church (1604-1852) — Lithograph by Deroeck",
  };

  const contentES = {
    // Nueva sección: Flandes francesa alrededor de 1685
    frenchFlandersTitle: "Flandes Francesa hacia 1685: Una Región en Turbulencia",
    frenchFlandersExplainerTitle: "¿Qué es Flandes Francesa?",
    frenchFlandersExplainer: "Flandes Francesa (Flandre française) es la parte histórica de Flandes que ahora se encuentra en el norte de Francia. Incluye la región alrededor de Lille, Dunkerque y Hazebrouck. Este territorio fue conquistado por Luis XIV en 1668 y anexado a Francia. El flamenco se siguió hablando aquí hasta bien entrado el siglo XX. Nota: Flandes Francesa no es lo mismo que Valonia, que es una región francófona separada en Bélgica.",
    frenchFlandersIntro: "Para entender por qué Hubert Deleforge y Antoinette Follet abandonaron su tierra natal, debemos conocer el mundo en el que vivían. La Châtellenie de Lille — la región alrededor de Lille donde se encontraban Hallennes y Capinghem — era en 1685 una zona que aún temblaba tras décadas de guerra, conquista y cambios forzados.",
    
    geographyTitle: "Ubicación Geográfica",
    geographyP1: "La Châtellenie de Lille se extendía sobre un área de unos 900 kilómetros cuadrados, bordeada por el Lys al norte, el Deûle al este y el Scarpe al sur. Era una zona de tierras bajas fértiles con numerosos arroyos, pantanos y arboledas.",
    geographyP2: "El paisaje se caracterizaba por un mosaico de tierras de cultivo, prados y bosques. El Bois d'Haubourdin — el bosque donde trabajaba la familia de Hubert como leñadores — era uno de los muchos bosques que atravesaban la región.",
    
    politicalTitle: "Trastornos Políticos",
    politicalP1: "Hasta 1668, la región pertenecía a los Países Bajos españoles. El Tratado de Aquisgrán (1668) transfirió el territorio a Francia, pero esta transferencia estuvo lejos de ser pacífica.",
    politicalP2: "La anexión francesa significó un trastorno completo para la población local. El idioma de los tribunales cambió del flamenco al francés. Las costumbres locales fueron revisadas.",
    politicalP3: "Particularmente impactante fue la francización: la política sistemática de reemplazar el idioma y la cultura flamenca por el francés.",
    
    economicTitle: "Realidad Económica",
    economicP1: "La economía de la región se basaba en tres pilares: agricultura, producción textil y artesanía.",
    economicP2: "Las guerras de Luis XIV devastaron esta economía. Los ejércitos marchaban por el país exigiendo comida, caballos y alojamiento.",
    economicP3: "A esto se añadían impuestos extraordinarios. La taille, la gabelle y la capitación pesaban fuertemente sobre la población.",
    economicTable: [
      { item: "Grano (trigo)", price: "12-15 sols por rasière", note: "Duplicado desde 1660" },
      { item: "Salario diario obrero", price: "6-8 sols por día", note: "Sin cambios" },
      { item: "Taille anual", price: "10-20 libras por hogar", note: "Triplicado desde 1668" },
      { item: "Alojamiento de soldados", price: "Variable", note: "Podía durar meses" },
    ],
    
    religiousTitle: "Represión Religiosa",
    religiousP1: "El año 1685 marcó un punto de inflexión en la política religiosa francesa. El 18 de octubre, Luis XIV firmó el Edicto de Fontainebleau, revocando el Edicto de Nantes.",
    religiousP2: "Aunque la región de Lille era predominantemente católica, la revocación también tuvo consecuencias aquí.",
    religiousP3: "Para la población católica, la revocación significó un clima sofocante de control religioso.",
    religiousP4: "La situación de las familias mixtas era particularmente amarga.",
    
    socialTitle: "Estructura Social",
    socialP1: "La sociedad alrededor de Lille estaba estrictamente jerarquizada. En la cima estaban la nobleza y el alto clero.",
    socialP2: "La familia Deleforge pertenecía a los artesanos independientes. Como boquillons y aserradores, tenían un oficio establecido.",
    socialP3: "El matrimonio de Hubert y Antoinette era, por tanto, un matrimonio socialmente mixto.",
    
    dailyLifeTitle: "La Vida Cotidiana",
    dailyLifeP1: "La vida en un pueblo como Hallennes hacia 1685 era dura pero predecible. El día comenzaba al amanecer.",
    dailyLifeP2: "La mayoría de las casas eran de barro y madera, con techos de paja.",
    dailyLifeP3: "La dieta consistía principalmente en pan, judías, guisantes, col y tocino.",
    dailyLifeP4: "El domingo era el día de la iglesia y de la comunidad.",
    
    migrationTitle: "La Ruta Migratoria hacia Flandes",
    migrationP1: "La migración de Hubert y Antoinette a Izegem hacia 1699 formaba parte de un movimiento más amplio.",
    migrationP2: "La ruta de Hallennes a Izegem era relativamente corta: unos 50 kilómetros.",
    migrationP3: "¿Por qué precisamente Izegem? La respuesta probablemente está en los bosques del valle del Mandel.",

    // La francización de Flandes Francesa
    francisationTitle: "La francización de Flandes Francesa",
    francisationIntro: "La transición de Flandes Francesa de una región neerlandófona a una región francófona no fue un proceso natural, sino el resultado de una política lingüística sistemática que duraría más de dos siglos. Este proceso de francización también afectaría al apellido de los Deleforge.",
    francisationTimeline: [
      { year: "1659", event: "Tratado de los Pirineos", description: "Francia adquiere las primeras partes de Flandes. La frontera lingüística comienza a desplazarse." },
      { year: "1668", event: "Tratado de Aquisgrán", description: "Lille y sus alrededores se vuelven definitivamente franceses. Los dialectos flamencos locales quedan bajo presión." },
      { year: "1684", event: "Extensión de la Ordenanza de Villers-Cotterêts", description: "El francés se convierte en la única lengua permitida en los tribunales y documentos oficiales." },
      { year: "1789", event: "Revolución Francesa", description: "Los revolucionarios ven la diversidad lingüística como una amenaza para la unidad. 'Un peuple, une langue' se convierte en el lema." },
      { year: "1794", event: "Informe Barère", description: "El flamenco y otras lenguas minoritarias son etiquetados como 'las lenguas de la contrarrevolución'." },
      { year: "1833", event: "Ley Guizot", description: "Se introduce la educación primaria obligatoria — exclusivamente en francés. Los niños son castigados por hablar flamenco." },
    ],
    francisationImpactTitle: "El sistema del 'signe'",
    francisationImpactP1: "Un instrumento particularmente humillante era el llamado sistema del 'signe' en las escuelas. Un niño que hablaba flamenco recibía una tabla de madera colgada al cuello con 'Parlez français' o 'Está prohibido hablar flamenco' escrito en ella. Este niño tenía que sorprender a otro niño hablando flamenco para pasarle la tabla. Al final del día, el niño que llevaba el cartel era castigado.",
    francisationImpactP2: "Este sistema — que continuaría hasta bien entrado el siglo XX — creó una generación que se avergonzaba de su lengua materna. Los padres dejaron de hablar flamenco en casa para ahorrar a sus hijos la humillación.",
    francisationFamilyTitle: "Impacto en el apellido",
    francisationFamilyP1: "La francización también explica la evolución de nuestro apellido. En los documentos franceses se escribía 'Deleforge' — una ortografía afrancesada. Cuando la familia emigró a Flandes, esto se convirtió en 'Deforce' o 'De Force', y más tarde 'Deforche' en los registros flamencos. El nombre siguió, por así decirlo, las fronteras lingüísticas.",
    francisationFamilyP2: "Es irónico que la familia dejara una región que estaba perdiendo su carácter flamenco para establecerse en una zona que mantendría su identidad flamenca. La elección de Hubert de mudarse a Izegem fue quizás también una elección por un idioma y una cultura que estaban siendo suprimidos en su lugar de nacimiento.",
    
    // La Revolución Francesa
    frenchRevolutionTitle: "La Revolución Francesa (1789-1799): Trastorno y Terror",
    frenchRevolutionIntro: "Aunque la familia Deleforge había emigrado a Flandes hacia 1699, los descendientes que permanecieron en Flandes Francesa vivieron uno de los períodos más turbulentos de la historia europea. La Revolución Francesa cambiaría para siempre el rostro de la región.",
    frenchRevolutionCausesTitle: "Causas de la Revolución",
    frenchRevolutionCausesP1: "En la década de 1780, Francia atravesaba una crisis profunda. El tesoro estaba vacío debido a guerras costosas — incluido el apoyo a la Revolución Americana. Las cosechas fracasaron en 1788, haciendo que los precios del pan se dispararan a niveles sin precedentes.",
    frenchRevolutionCausesP2: "El sistema de estados — con la nobleza y el clero privilegiados frente al Tercer Estado gravado con impuestos — ya no era sostenible. Cuando el rey Luis XVI convocó los Estados Generales en mayo de 1789, la chispa se encendió.",
    frenchRevolutionEventsTitle: "Eventos Revolucionarios en Flandes Francesa",
    frenchRevolutionEventsP1: "El 14 de julio de 1789, la Bastilla fue tomada por asalto en París. La noticia llegó a Lille en pocos días y provocó levantamientos populares espontáneos. El 'Grande Peur' (Gran Miedo) se extendió.",
    frenchRevolutionEventsP2: "En la Châtellenie de Lille, los monasterios fueron cerrados, los bienes de la Iglesia nacionalizados. La guillotina se instaló en la Place du Lion d'Or en Lille. Entre 1793 y 1794, decenas de 'enemigos de la revolución' fueron decapitados aquí.",
    frenchRevolutionTerrorTitle: "El Terror (1793-1794)",
    frenchRevolutionTerrorP1: "El Reinado del Terror bajo Robespierre golpeó duramente a Flandes Francesa. La región estaba en primera línea de la guerra contra Austria. Los representantes en misión recibieron poderes prácticamente ilimitados.",
    frenchRevolutionTerrorP2: "El catolicismo fue temporalmente prohibido. Las iglesias fueron saqueadas, renombradas 'Templos de la Razón' o utilizadas como almacenes. Los sacerdotes que se negaban a prestar juramento fueron desterrados o ejecutados.",
    frenchRevolutionTerrorP3: "El calendario fue reformado: 1792 se convirtió en el 'Año I' de la República. El domingo fue abolido. Las festividades cristianas fueron reemplazadas por celebraciones revolucionarias.",
    frenchRevolutionLanguageTitle: "Represión Lingüística en Nombre de la Unidad",
    frenchRevolutionLanguageP1: "El federalismo y la superstición hablan bretón; la emigración y el odio a la República hablan alemán; la contrarrevolución habla italiano, y el fanatismo habla vasco. Destruyamos estos instrumentos de daño y error.",
    frenchRevolutionLanguageP2: "Aunque el flamenco no fue mencionado específicamente en este informe, cayó bajo la misma represión. Los dialectos picardos y flamencos locales fueron perseguidos. Solo el francés estaba permitido en documentos oficiales, educación y justicia.",
    frenchRevolutionImpactTitle: "Legado para Flandes Francesa",
    frenchRevolutionImpactP1: "La Revolución trajo cambios fundamentales: los derechos feudales fueron abolidos, la Iglesia perdió sus tierras y poder, y la igualdad civil fue garantizada constitucionalmente. Pero el precio fue alto: miles de víctimas, iglesias devastadas, familias desgarradas y un trauma que duraría generaciones.",
    frenchRevolutionImpactP2: "Para los Deleforge que permanecieron en Flandes Francesa, la Revolución significó una ruptura definitiva con el pasado. La vieja iglesia donde sus antepasados habían sido bautizados fue saqueada o demolida.",
    frenchRevolutionImpactP3: "Es significativo que la migración de Hubert y Antoinette a Flandes, un siglo antes, los había protegido de esta catástrofe. Sus descendientes en Izegem vivían bajo dominio austríaco y luego holandés, donde el terror revolucionario nunca golpeó con la misma intensidad.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Cosecha fallida", description: "Los precios del pan se duplicaron. Revueltas de hambre en toda Flandes Francesa." },
      { year: "14 julio 1789", event: "Toma de la Bastilla", description: "Comienzo de la Revolución. La noticia llega a Lille en días." },
      { year: "Ago 1789", event: "Abolición del feudalismo", description: "Los privilegios nobiliarios son abolidos." },
      { year: "1790", event: "Constitución Civil del Clero", description: "Los sacerdotes deben prestar juramento. Muchos se niegan y son perseguidos." },
      { year: "1792", event: "Guerra y República", description: "Francia declara la guerra a Austria. La monarquía es abolida." },
      { year: "1793-1794", event: "El Terror", description: "Ejecuciones masivas. Guillotina en Lille. Iglesias saqueadas y cerradas." },
      { year: "1794", event: "Informe Barère", description: "Las lenguas regionales son prohibidas. Solo se permite el francés." },
      { year: "1799", event: "Napoleón toma el poder", description: "Fin de la Revolución. Comienzo del Imperio." },
    ],

    unrestP1: "En la segunda mitad del siglo XVII, un velo de inquietud se cernía sobre los pueblos alrededor de Lille. Era una región donde un orden silencioso y tenaz había existido durante generaciones: pequeños agricultores, artesanos, trabajadores de la madera, arrendatarios y tejedores que vivían en un ritmo reconocible. Pero cuando Hubert Deleforge nació en 1662 en Hallennes-lez-Haubourdin, ese ritmo ya estaba roto.",
    unrestP2: "Hallennes y Capinghem, el lugar de nacimiento de Antoinette Follet, estaban en el corazón de la antigua Châtellenie de Lille, un área que había sido parte del Condado de Flandes durante siglos, pero donde el picardo era el idioma cotidiano y el francés el idioma de la administración. Era un mundo de identidades fronterizas, donde la gente aprendía a vivir con soberanías superpuestas y lealtades cambiantes.",
    unrestP3: "Hubert creció en una época en que la guerra ya no era algo conocido solo de oídas. Los ejércitos de Luis XIV pasaban por la región, a veces visibles en los campos durante meses. Había años en que apenas se podía cosechar; otros años estaban dominados por el alojamiento de soldados en familias que ya tenían poco que compartir.",
    unrestP4: "La Guerra de Devolución (1667-1668) puso la región bajo el dominio francés. La Guerra Holandesa (1672-1678) empeoró la situación. La Guerra de los Nueve Años (1688-1697) devastó pueblos enteros. A finales del siglo XVII, estaba claro: los que podían irse, lo hacían.",
    unrestP5: "En 1685, el año del matrimonio de Hubert con Antoinette, Luis XIV revocó el Edicto de Nantes. Esto significó el fin de la tolerancia religiosa para los protestantes. Aunque la mayoría de los habitantes de la región eran católicos, la revocación creó un clima de miedo y control.",
    schemaHeaders: ["Período", "Contexto", "Efecto en la familia"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes aún parte de los Países Bajos españoles", effect: "Situación relativamente estable" },
      { period: "1668-1678", context: "Bajo dominio francés (Paz de Aquisgrán)", effect: "Más presión; impuestos más altos" },
      { period: "1678-1685", context: "Integración completa en Francia", effect: "Control religioso y conversiones forzadas" },
      { period: "1685-1697", context: "Revocación del Edicto de Nantes; Guerra de los Nueve Años", effect: "Persecución religiosa; ola migratoria" },
      { period: "1697-1700", context: "Región devastada a pesar de la Paz de Ryswick", effect: "Hubert migra a Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Guerra de Sucesión Española", effect: "La familia se establece en Flandes" },
    ],
    deleforgeTitle: "Familia Deleforge",
    deleforgeP1: "La familia Deleforge tenía raíces en la artesanía: silvicultura, trabajo de la madera, gestión de granjas, mantenimiento de setos y pequeña carpintería. Eran trabajadores independientes que conocían su lugar en la comunidad del pueblo, pero que también dependían de condiciones locales estables.",
    deleforgeP2: "El ancestro más antiguo conocido era Bauduin Deleforge, nacido alrededor de 1550 y fallecido en 1613 en Halluin. Su hijo Hypolite se casó alrededor de 1620 en Santes. Su hijo Hubert senior se casó con Marie Grimbel de Beaucamps-Ligny. Ellos fueron los padres de nuestro ancestro fundador Hubert.",
    folletTitle: "Familia Follet",
    folletP1: "El padre de Antoinette, el maestro cirujano Jean Follet, gozaba de renombre más allá de Capinghem. Los cirujanos en el siglo XVII eran artesanos altamente capacitados que trataban heridas, componían huesos y a veces realizaban operaciones menores.",
    folletP2: "La madre de Antoinette era Jeanne Lambin, originaria de Quesnoy-sur-Deûle. En el contrato matrimonial de 1685, era viuda. Estaba asistida por su hijo Antoine, también cirujano, y su hermano Laurens Ricourt.",
    contractIntro: "Este contrato es el documento histórico familiar más importante. Fue redactado el 18 de abril de 1685 ante el notario Jacques Anselme Le Francq en Lille y sigue la coutume de Lille, un sistema legal que ofrecía más protección a las mujeres que en muchas regiones circundantes. El contrato se conserva en los Archives Départementales du Nord.",
    groomTitle: "Lado del novio:",
    groomItems: [
      "Hubert Deleforge, joven de Hallennes",
      "Asistido por sus padres Hubert Deleforge y Marie Grimbel",
      "Tío Pierre Cordon de Loos como testigo",
      "Dote: 400 libras parisis, 3 rasières de trigo, 2 pares de sábanas, 6 varas de tela de lana"
    ],
    brideTitle: "Lado de la novia:",
    brideItems: [
      "Antoinette Follet, hija del difunto maestro Jean Follet de Capinghem",
      "Asistida por su madre Jeanne Lambin, hermano Antoine (cirujano), tío Laurens Ricourt",
      "Dote: 400 libras parisis, 2 pares de mortajas, 6 servilletas, ropa para el día de la boda"
    ],
    specialTitle: "Disposiciones especiales:",
    specialItems: [
      "Antoinette conserva el derecho a sus joyas y posesiones personales",
      "La dote debe ser devuelta en caso de falta de hijos",
      "Los bienes adquiridos se comparten según proporciones fijas",
      "La madre de la novia otorga a su hija el derecho de arrendamiento de una granja de dos bonniers (~2,5 hectáreas)"
    ],
    contractEnd: "El valor total de la dote — 800 libras parisis — corresponde aproximadamente a dos o tres salarios anuales de un artesano bien remunerado. Esto indica que ambas familias pertenecían a la clase media próspera.",
    arrivalP1: "Izegem alrededor de 1700 no era una ciudad grande, sino un pueblo en desarrollo. Tenía una comunidad activa de agricultores, artesanos y trabajadores de la madera. El cercano valle del Mandel ofrecía madera, agua, turba y empleo.",
    arrivalP2: "Para alguien con las habilidades de Hubert, este era un lugar donde se podía literalmente empezar de nuevo. En los primeros años del siglo XVIII, encontramos a Hubert como boquillon (leñador), un oficio bien conocido en la región del Mandel.",
    arrivalP3: "La elección de trasladarse a Izegem alrededor de 1699 determinó el curso de nuestra historia familiar. Sin ese paso, la rama de Izegem de la familia Deleforge/Deforce nunca habría existido.",
    integrationIntro: "La familia se integró rápidamente en Flandes Occidental, en el transcurso de una generación:",
    integrationItems: [
      { name: "La hija Antonia", text: "se casó en 1714 con Philippe Charles Rousseau, también inmigrante de Bondues. Tuvieron 10 hijos juntos." },
      { name: "Jacobus Franciscus", text: "(nuestro ancestro directo) se casó en 1718 con Veronica Barbier y se estableció en Ardooie. Tuvieron 9 hijos." },
      { name: "El hijo Albert", text: "se casó en 1719 con Judoca Reynaert de Ingelmunster y se convirtió en ancestro fundador de una numerosa descendencia." },
      { name: "El hijo menor Hubert", text: "se casó con Isabella De Man de Izegem y tuvo 14 hijos con ella." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Ancestro más antiguo conocido" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Hijo de Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Mapa histórico de Izegem en 1643 por Antonius Sanderus",
    imgIzegemCaption: "Mapa histórico de Izegem en 1643 por Antonius Sanderus",
    imgKerkAlt: "La Antigua Iglesia de San Tillo, reconstruida desde 1604, demolida en 1852",
    imgKerkCaption: "La Antigua Iglesia de San Tillo (1604-1852) — Litografía de Deroeck",
  };

  const contentDE = {
    // Neue Sektion: Französisch-Flandern um 1685
    frenchFlandersTitle: "Französisch-Flandern um 1685: Eine Region im Umbruch",
    frenchFlandersExplainerTitle: "Was ist Französisch-Flandern?",
    frenchFlandersExplainer: "Französisch-Flandern (Flandre française) ist der historische Teil Flanderns, der heute in Nordfrankreich liegt. Es umfasst die Region um Lille, Dünkirchen (Dunkerque) und Hazebrouck. Dieses Gebiet wurde 1668 von Ludwig XIV. erobert und Frankreich angegliedert. Bis weit ins 20. Jahrhundert wurde hier noch Flämisch gesprochen. Hinweis: Französisch-Flandern ist nicht dasselbe wie Wallonien, das eine separate französischsprachige Region in Belgien ist.",
    frenchFlandersIntro: "Um zu verstehen, warum Hubert Deleforge und Antoinette Follet ihre Heimat verließen, müssen wir die Welt kennen, in der sie lebten. Die Châtellenie de Lille — das Gebiet um Lille, wo Hallennes und Capinghem lagen — war 1685 eine Region, die noch von Jahrzehnten des Krieges, der Eroberung und des erzwungenen Wandels erschüttert war.",
    
    geographyTitle: "Geografische Lage",
    geographyP1: "Die Châtellenie de Lille erstreckte sich über ein Gebiet von etwa 900 Quadratkilometern, begrenzt von der Leie im Norden, der Deûle im Osten und der Scarpe im Süden. Es war ein fruchtbares Tiefland mit zahlreichen Bächen, Sümpfen und Wäldern. Die Dörfer Hallennes-lez-Haubourdin und Capinghem lagen nur wenige Kilometer von Lille, der Hauptstadt der Region, entfernt.",
    geographyP2: "Die Landschaft war geprägt von einem Mosaik aus Ackerland, Weiden und Wäldern. Der Bois d'Haubourdin — der Wald, in dem Huberts Familie als Holzfäller arbeitete — war einer von vielen Waldgebieten, die die Region durchzogen. Diese Wälder lieferten nicht nur Holz, sondern boten während der Kriegsjahre auch Unterschlupf für Geächtete und Deserteure.",
    
    politicalTitle: "Politische Umwälzungen",
    politicalP1: "Bis 1668 gehörte die Region zu den Spanischen Niederlanden, einem Überbleibsel des alten Burgunderreiches. Der Friede von Aachen (1668) übertrug das Gebiet an Frankreich, doch diese Übergabe war alles andere als friedlich. Ludwig XIV. betrachtete die Niederlande als sein rechtmäßiges Erbe und war entschlossen, das gesamte Gebiet zu annektieren.",
    politicalP2: "Die französische Annexion bedeutete einen vollständigen Umbruch für die lokale Bevölkerung. Die Sprache der Gerichte wechselte von Flämisch zu Französisch. Die lokalen Gewohnheitsrechte wurden überarbeitet. Neue Steuern wurden eingeführt. Französische Beamte ersetzten die lokalen Verwalter. Der Intendant de Flandre erhielt unbegrenzte Macht über das tägliche Leben.",
    politicalP3: "Besonders einschneidend war die Französisierung: die systematische Politik, die flämische Sprache und Kultur durch die französische zu ersetzen. Obwohl in der Region um Lille seit Jahrhunderten Pikardisch (eine romanische Sprache, die mit dem Französischen verwandt ist) gesprochen wurde, wurden nun auch die letzten Spuren flämischen Einflusses ausgelöscht.",
    
    economicTitle: "Wirtschaftliche Realität",
    economicP1: "Die Wirtschaft der Region stützte sich auf drei Säulen: Landwirtschaft, Textilproduktion und Handwerk. Die Landwirtschaft produzierte Getreide, Flachs und Hopfen. Die Textilindustrie — vor allem die Leinenproduktion — gab Tausenden von Webern, Spinnern und Bleichern Arbeit. Der Handwerkssektor umfasste Schmiede, Zimmerleute, Küfer, Schreiner und Holzfäller.",
    economicP2: "Die Kriege Ludwigs XIV. verwüsteten diese Wirtschaft. Armeen zogen durch das Land und forderten Nahrung, Pferde und Unterkunft. Soldaten wurden bei Bürgern einquartiert. Bauernhöfe wurden geplündert oder niedergebrannt. Der Textilhandel mit den Niederlanden — dem traditionellen Absatzmarkt — wurde durch den Krieg unterbrochen.",
    economicP3: "Hinzu kamen außerordentliche Steuern. Die Taille (Grundsteuer), die Gabelle (Salzsteuer) und die Capitation (Kopfsteuer) lasteten schwer auf der Bevölkerung. Besonders die Kriegskontributionen — erzwungene Kriegsbeiträge — konnten ganze Dörfer auf einen Schlag ruinieren.",
    economicTable: [
      { item: "Getreide (Weizen)", price: "12-15 Sols pro Rasière", note: "Verdoppelt seit 1660" },
      { item: "Tageslohn Arbeiter", price: "6-8 Sols pro Tag", note: "Unverändert" },
      { item: "Jährliche Taille", price: "10-20 Livres pro Haushalt", note: "Verdreifacht seit 1668" },
      { item: "Einquartierung", price: "Variabel", note: "Konnte Monate dauern" },
    ],
    
    religiousTitle: "Religiöse Unterdrückung",
    religiousP1: "Das Jahr 1685 markierte einen Wendepunkt in der französischen Religionspolitik. Am 18. Oktober — genau sechs Monate nach der Hochzeit von Hubert und Antoinette — unterzeichnete Ludwig XIV. das Edikt von Fontainebleau, mit dem das Edikt von Nantes widerrufen wurde. Dies bedeutete das Ende jeglicher religiöser Toleranz in Frankreich.",
    religiousP2: "Obwohl die Region um Lille überwiegend katholisch war, hatte die Widerrufung auch hier Folgen. Die protestantischen Minderheiten — vor allem in den Textilstädten — flohen in die Niederlande, nach England oder Deutschland. Dies verursachte eine Abwanderung qualifizierter Handwerker und wohlhabender Kaufleute.",
    religiousP3: "Für die katholische Bevölkerung bedeutete die Widerrufung ein erdrückendes Klima religiöser Kontrolle. Der Bischof von Tournai — unter dessen Jurisdiktion die Region fiel — erhielt erweiterte Befugnisse. Tauf-, Heirats- und Sterberegister wurden verpflichtend. Der Pfarrer wurde zum verlängerten Arm des Staates.",
    religiousP4: "Besonders bitter war die Situation für gemischte Familien. Wer einen protestantischen Vorfahren hatte, wurde mit Misstrauen betrachtet. Wer ein Familienmitglied hatte, das in die Niederlande geflohen war, konnte in Schwierigkeiten geraten. Die Dragonnaden — die erzwungene Einquartierung von Soldaten bei protestantischen Familien, um sie zur Bekehrung zu zwingen — waren in der Region um Lille weniger heftig als im Süden Frankreichs, aber die Drohung war immer präsent.",
    
    socialTitle: "Soziale Struktur",
    socialP1: "Die Gesellschaft um Lille war streng hierarchisch geordnet. An der Spitze standen der Adel und der höhere Klerus, gefolgt von reichen Kaufleuten und Juristen. Darunter kam das Kleinbürgertum: selbständige Handwerker, Ladenbesitzer und Bauern mit eigenem Land. Ganz unten standen Tagelöhner, Knechte, Dienstmädchen und Arme.",
    socialP2: "Die Familie Deleforge gehörte zu den selbständigen Handwerkern. Als Boquillons (Holzfäller) und Holzsäger hatten sie ein festes Gewerbe mit eigenem Werkzeug und einem gewissen Grad an Unabhängigkeit. Die Familie Follet stand höher auf der sozialen Leiter: Jean Follet war Meisterchirurg, ein angesehenes Handwerk, das sowohl medizinisches Wissen als auch handwerkliches Geschick erforderte.",
    socialP3: "Die Ehe von Hubert und Antoinette war also eine sozial gemischte Ehe. Dass beide Familien eine gleiche Mitgift von 400 Pfund Parisis einbrachten, deutet darauf hin, dass sie sich als gleichwertig betrachteten — oder dass die Follets bereit waren, einen etwas niedrigeren sozialen Status im Austausch für andere Vorteile zu akzeptieren.",
    
    dailyLifeTitle: "Das tägliche Leben",
    dailyLifeP1: "Das Leben in einem Dorf wie Hallennes um 1685 war hart, aber vorhersehbar — zumindest in Friedenszeiten. Der Tag begann bei Sonnenaufgang und endete bei Sonnenuntergang. Das Jahr folgte dem Rhythmus der Jahreszeiten: Säen im Frühjahr, Heumachen im Sommer, Ernte im Herbst, Holzfällen im Winter.",
    dailyLifeP2: "Die meisten Häuser waren aus Lehm und Holz mit Strohdächern. Sie bestanden aus einem oder zwei Räumen, in denen die ganze Familie lebte, aß und schlief. Die Küche war das Herz des Hauses, wo auf offenem Feuer gekocht wurde. Beleuchtung kam von Kerzen oder Öllampen.",
    dailyLifeP3: "Die Ernährung bestand hauptsächlich aus Brot, Bohnen, Erbsen, Kohl und Speck. Fleisch war ein Luxus, der Festtagen vorbehalten war. Bier war das tägliche Getränk — sicherer als Wasser. Kaffee und Tee waren unbekannt; Wein war teuer und selten.",
    dailyLifeP4: "Der Sonntag war der Tag der Kirche und der Gemeinschaft. Nach der Messe versammelten sich die Dorfbewohner auf dem Platz, wo Neuigkeiten ausgetauscht, Geschäfte gemacht und Ehen besprochen wurden. Es war auch der Tag, an dem der Pfarrer die königlichen Edikte vorlas — die einzige Möglichkeit, wie die meisten Dorfbewohner Nachrichten aus Paris oder Versailles hörten.",
    
    migrationTitle: "Die Migrationsroute nach Flandern",
    migrationP1: "Die Migration von Hubert und Antoinette nach Izegem um 1699 war Teil einer größeren Bewegung. Tausende Franzosen — sowohl Protestanten als auch Katholiken — zogen in den letzten Jahrzehnten des 17. Jahrhunderts in die Südlichen Niederlande, die Republik, nach England oder Deutschland.",
    migrationP2: "Die Strecke von Hallennes nach Izegem war relativ kurz: etwa 50 Kilometer, die in zwei bis drei Tagen zu Fuß zurückgelegt werden konnten. Der Weg führte über Menen und Kortrijk oder über Tourcoing und Mouscron. Beide Routen kreuzten die Grenze zwischen Frankreich und den Spanischen Niederlanden — eine Grenze, die in jenen Jahren durch Krieg und Diplomatie ständig verschoben wurde.",
    migrationP3: "Warum gerade Izegem? Die Antwort liegt wahrscheinlich in den Wäldern des Mandeltals und der Anwesenheit einer Gemeinschaft von Holzfällern. Hubert fand dort Arbeit als Boquillon — derselbe Beruf, den seine Familie seit Generationen ausübte. Außerdem war Izegem weit genug von der Grenze entfernt, um relativ sicher zu sein, aber nah genug, um Kontakte zur alten Heimat aufrechtzuerhalten.",
    
    // Die Französisierung
    francisationTitle: "Die Französisierung von Französisch-Flandern",
    francisationIntro: "Der Übergang von Französisch-Flandern von einem flämischsprachigen zu einem französischsprachigen Gebiet war kein natürlicher Prozess, sondern das Ergebnis einer systematischen Sprachpolitik, die mehr als zwei Jahrhunderte dauern sollte. Dieser Prozess der Französisierung sollte auch den Familiennamen der Deleforges betreffen.",
    francisationTimeline: [
      { year: "1659", event: "Pyrenäenfrieden", description: "Frankreich erwirbt die ersten Teile Flanderns. Die Sprachgrenze beginnt sich zu verschieben." },
      { year: "1668", event: "Frieden von Aachen", description: "Lille und Umgebung werden endgültig französisch. Die lokalen flämischen Dialekte geraten unter Druck." },
      { year: "1684", event: "Ordonnanz von Villers-Cotterêts erweitert", description: "Französisch wird zur einzigen erlaubten Sprache in Gerichten und offiziellen Dokumenten." },
      { year: "1789", event: "Französische Revolution", description: "Die Revolutionäre sehen Sprachvielfalt als Bedrohung der Einheit. 'Un peuple, une langue' wird zum Motto." },
      { year: "1794", event: "Rapport Barère", description: "Flämisch und andere Minderheitensprachen werden als 'die Sprachen der Konterrevolution' bezeichnet." },
      { year: "1833", event: "Guizot-Gesetz", description: "Pflichtschulunterricht wird eingeführt — ausschließlich auf Französisch. Kinder werden für das Sprechen von Flämisch bestraft." },
    ],
    francisationImpactTitle: "Das 'Signe'-System",
    francisationImpactP1: "Ein besonders demütigendes Instrument war das sogenannte 'Signe'-System in den Schulen. Ein Kind, das Flämisch sprach, bekam ein Holzschild um den Hals gehängt mit der Aufschrift 'Parlez français' oder 'Il est défendu de parler flamand'. Dieses Kind musste dann ein anderes Kind ertappen, das Flämisch sprach, um das Schild weiterzugeben. Am Ende des Tages wurde das Kind mit dem Schild bestraft.",
    francisationImpactP2: "Dieses System — das bis weit ins 20. Jahrhundert andauern sollte — schuf eine Generation, die sich ihrer Muttersprache schämte. Eltern hörten auf, zu Hause Flämisch zu sprechen, um ihren Kindern die Demütigung zu ersparen.",
    francisationFamilyTitle: "Auswirkungen auf den Familiennamen",
    francisationFamilyP1: "Die Französisierung erklärt auch die Entwicklung unseres Familiennamens. In französischen Dokumenten wurde 'Deleforge' geschrieben — eine französisierte Schreibweise. Als die Familie nach Flandern auswanderte, wurde daraus 'Deforce' oder 'De Force', und später in den flämischen Registern 'Deforche'. Der Name folgte sozusagen den Sprachgrenzen.",
    francisationFamilyP2: "Es ist ironisch, dass die Familie aus einem Gebiet fortzog, das seinen flämischen Charakter verlor, um sich in einer Region niederzulassen, die ihre flämische Identität bewahren sollte. Die Entscheidung Huberts, nach Izegem zu ziehen, war vielleicht auch eine Entscheidung für eine Sprache und Kultur, die in seiner Heimat unterdrückt wurden.",
    
    // Die Französische Revolution
    frenchRevolutionTitle: "Die Französische Revolution (1789-1799): Umbruch und Terror",
    frenchRevolutionIntro: "Obwohl die Familie Deleforge bereits um 1699 nach Flandern ausgewandert war, blieben Nachkommen in Französisch-Flandern zurück und erlebten eine der turbulentesten Perioden der europäischen Geschichte. Die Französische Revolution sollte das Gesicht der Region für immer verändern.",
    frenchRevolutionCausesTitle: "Ursachen der Revolution",
    frenchRevolutionCausesP1: "In den 1780er Jahren befand sich Frankreich in einer tiefen Krise. Die Staatskasse war leer durch kostspielige Kriege — darunter die Unterstützung der Amerikanischen Revolution. Die Ernten von 1788 misslangen, wodurch die Brotpreise auf nie dagewesene Höhen stiegen. In Französisch-Flandern, wo die Textilindustrie bereits durch englische Konkurrenz unter Druck stand, führte dies zu weit verbreitetem Hunger und Arbeitslosigkeit.",
    frenchRevolutionCausesP2: "Die Ständegesellschaft — mit dem privilegierten Adel und Klerus gegenüber dem besteuerten Dritten Stand — war nicht mehr haltbar. Als König Ludwig XVI. im Mai 1789 die Generalstände einberief, um die Finanzkrise zu bewältigen, war der Funke gezündet.",
    frenchRevolutionEventsTitle: "Revolutionäre Ereignisse in Französisch-Flandern",
    frenchRevolutionEventsP1: "Am 14. Juli 1789 wurde die Bastille in Paris gestürmt. Die Nachricht erreichte Lille innerhalb von Tagen und führte zu spontanen Volksaufständen. Die 'Grande Peur' (Große Angst) griff um sich: Gerüchte über adlige Verschwörungen und ausländische Invasionen veranlassten Bauern, ihre Grundherren anzugreifen und Archive zu verbrennen.",
    frenchRevolutionEventsP2: "In der Kastelei von Lille wurden Klöster geschlossen, Kirchengüter verstaatlicht und die alten flämischen Traditionen verboten. Die Guillotine wurde auf der Place du Lion d'Or in Lille aufgestellt. Zwischen 1793 und 1794 wurden hier Dutzende 'Feinde der Revolution' enthauptet — Adlige, Priester, aber auch gewöhnliche Bürger, die antirevolutionärer Sympathien verdächtigt wurden.",
    frenchRevolutionTerrorTitle: "Der Terror (1793-1794)",
    frenchRevolutionTerrorP1: "Die Schreckensherrschaft unter Robespierre traf Französisch-Flandern hart. Die Region lag an der Frontlinie des Krieges gegen Österreich und die Vereinigten Provinzen. Repräsentanten en mission erhielten nahezu unbegrenzte Macht, 'Konterrevolutionäre' aufzuspüren.",
    frenchRevolutionTerrorP2: "Der Katholizismus wurde vorübergehend verboten. Kirchen wurden geplündert, zu 'Tempeln der Vernunft' umbenannt oder als Lagerräume genutzt. Priester, die sich weigerten, den Eid auf die Verfassung abzulegen, wurden verbannt oder hingerichtet. In vielen Dörfern um Lille, Dünkirchen und Hazebrouck wurden die Kirchtürme abgerissen — Symbole des Ancien Régime.",
    frenchRevolutionTerrorP3: "Der Kalender wurde reformiert: 1792 wurde zum 'Jahr I' der Republik. Der Sonntag wurde abgeschafft. Christliche Feiertage wurden durch revolutionäre Feiern ersetzt. Namen von Orten und Personen wurden 'entchristlicht' — Jean wurde 'Brutus', Marie wurde 'Liberté'.",
    frenchRevolutionLanguageTitle: "Sprachunterdrückung im Namen der Einheit",
    frenchRevolutionLanguageP1: "Die Revolutionäre sahen regionale Sprachen als Bedrohung der nationalen Einheit. Der berüchtigte Rapport Barère vom Januar 1794 erklärte: 'Der Föderalismus und der Aberglaube sprechen Bretonisch; die Emigration und der Hass gegen die Republik sprechen Deutsch; die Konterrevolution spricht Italienisch, und der Fanatismus spricht Baskisch. Lasst uns diese Instrumente des Schadens und des Irrtums zerstören.'",
    frenchRevolutionLanguageP2: "Obwohl Flämisch in diesem spezifischen Bericht nicht erwähnt wurde, fiel es unter dieselbe Unterdrückung. Die lokalen pikardischen und flämischen Dialekte wurden verfolgt. Nur Französisch war in offiziellen Dokumenten, Schulen und Gerichten erlaubt. Diese Politik sollte die Grundlage für die spätere systematische Französisierung des 19. und 20. Jahrhunderts legen.",
    frenchRevolutionImpactTitle: "Vermächtnis für Französisch-Flandern",
    frenchRevolutionImpactP1: "Die Revolution brachte fundamentale Veränderungen: Die Feudalrechte wurden abgeschafft, die Kirche verlor ihre Ländereien und Macht, und bürgerliche Gleichheit wurde verfassungsmäßig verankert. Aber der Preis war hoch: Tausende Opfer, zerstörte Kirchen, zerrissene Familien und ein Trauma, das Generationen andauern sollte.",
    frenchRevolutionImpactP2: "Für die in Französisch-Flandern zurückgebliebenen Deleforges bedeutete die Revolution einen endgültigen Bruch mit der Vergangenheit. Die alte Kirche, in der ihre Vorfahren getauft worden waren, war geplündert oder abgerissen. Die Pfarrregister — unsere wichtigsten genealogischen Quellen — waren teilweise zerstört. Die traditionelle Gesellschaft, in der ihre Vorfahren gelebt hatten, existierte nicht mehr.",
    frenchRevolutionImpactP3: "Es ist bezeichnend, dass die Migration von Hubert und Antoinette nach Flandern, ein Jahrhundert zuvor, sie vor dieser Katastrophe bewahrt hatte. Ihre Nachkommen in Izegem lebten unter österreichischer und später niederländischer Herrschaft, wo der revolutionäre Terror nie in gleichem Maße zuschlug.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Missernte", description: "Brotpreise verdoppelten sich. Hungerunruhen in ganz Französisch-Flandern." },
      { year: "14. Juli 1789", event: "Sturm auf die Bastille", description: "Beginn der Revolution. Die Nachricht erreicht Lille innerhalb von Tagen." },
      { year: "Aug 1789", event: "Abschaffung des Feudalismus", description: "Adelsprivilegien werden aufgehoben. Bauern weigern sich, Pacht zu zahlen." },
      { year: "1790", event: "Zivilverfassung des Klerus", description: "Priester müssen den Eid ablegen. Viele weigern sich und werden verfolgt." },
      { year: "1792", event: "Krieg & Republik", description: "Frankreich erklärt Österreich den Krieg. Die Monarchie wird abgeschafft." },
      { year: "1793-1794", event: "Der Terror", description: "Massenhinrichtungen. Guillotine in Lille. Kirchen geplündert und geschlossen." },
      { year: "1794", event: "Rapport Barère", description: "Regionalsprachen werden verboten. Nur Französisch erlaubt." },
      { year: "1799", event: "Napoleon ergreift die Macht", description: "Ende der Revolution. Beginn des Kaiserreichs." },
    ],
    
    unrestP1: "In der zweiten Hälfte des 17. Jahrhunderts lag ein Schleier der Unruhe über den Dörfern um Lille. Es war eine Region, in der seit Generationen eine stille, zähe Ordnung bestanden hatte: kleine Bauern, Handwerker, Holzarbeiter, Pächter und Weber, die in einem erkennbaren Rhythmus lebten. Doch als Hubert Deleforge 1662 in Hallennes-lez-Haubourdin geboren wurde, war dieser Rhythmus bereits gebrochen.",
    unrestP2: "Hallennes und Capinghem, der Geburtsort von Antoinette Follet, lagen im Herzen der alten Châtellenie de Lille, einem Gebiet, das jahrhundertelang zur Grafschaft Flandern gehört hatte, in dem aber Pikardisch die Umgangssprache und Französisch die Sprache der Verwaltung war. Es war eine Welt der Grenzidentitäten, in der man lernte, mit überlappenden Herrschaften und wechselnden Loyalitäten zu leben.",
    unrestP3: "Hubert wuchs in einer Zeit auf, in der Krieg nicht mehr nur vom Hörensagen bekannt war. Die Armeen Ludwigs XIV. zogen durch die Region, manchmal monatelang sichtbar auf den Feldern. Es gab Jahre, in denen kaum geerntet werden konnte; andere Jahre wurden von Einquartierungen dominiert, bei denen Soldaten bei Familien untergebracht wurden, die bereits wenig zu teilen hatten.",
    unrestP4: "Der Devolutionskrieg (1667-1668) brachte die Region unter französische Herrschaft. Der Holländische Krieg (1672-1678) verschlimmerte die Situation. Der Neunjährige Krieg (1688-1697) verwüstete ganze Dörfer. Gegen Ende des 17. Jahrhunderts war klar: Wer gehen konnte, tat es.",
    unrestP5: "1685, im Jahr von Huberts Hochzeit mit Antoinette, widerrief Ludwig XIV. das Edikt von Nantes. Dies bedeutete das Ende der religiösen Toleranz für Protestanten. Obwohl die meisten Bewohner der Region Katholiken waren, schuf die Widerrufung ein Klima der Angst und Kontrolle. Die Kirche erhielt mehr Macht, der Staat mehr Zugriff auf das tägliche Leben.",
    schemaHeaders: ["Zeitraum", "Kontext", "Auswirkung auf die Familie"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes noch Teil der Spanischen Niederlande", effect: "Relativ stabile Situation" },
      { period: "1668-1678", context: "Unter französischer Herrschaft (Friede von Aachen)", effect: "Mehr Druck; höhere Abgaben" },
      { period: "1678-1685", context: "Vollständige Integration in Frankreich", effect: "Religiöse Kontrolle und Zwangsbekehrungen" },
      { period: "1685-1697", context: "Widerruf des Edikts von Nantes; Neunjähriger Krieg", effect: "Religiöse Verfolgung; Migrationswelle" },
      { period: "1697-1700", context: "Region trotz Frieden von Rijswijk verwüstet", effect: "Hubert migriert nach Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Spanischer Erbfolgekrieg", effect: "Familie fasst Wurzeln in Flandern" },
    ],
    deleforgeTitle: "Familie Deleforge",
    deleforgeP1: "Die Familie Deleforge hatte ihre Wurzeln im Handwerk: Forstwirtschaft, Holzbearbeitung, Verwaltung von Pachthöfen, Pflege von Hecken und kleine Zimmererarbeiten. Es waren Selbständige, die ihren Platz in der Dorfgemeinschaft kannten, aber auch von stabilen lokalen Verhältnissen abhängig waren.",
    deleforgeP2: "Der älteste bekannte Vorfahre war Bauduin Deleforge, der um 1550 geboren wurde und 1613 in Halluin starb. Sein Sohn Hypolite heiratete um 1620 in Santes. Dessen Sohn Hubert senior heiratete Marie Grimbel aus Beaucamps-Ligny. Sie waren die Eltern unseres Stammvaters Hubert.",
    folletTitle: "Familie Follet",
    folletP1: "Antoinettes Vater, Meisterchirurg Jean Follet, genoss über Capinghem hinaus Ansehen. Chirurgen waren im 17. Jahrhundert hochqualifizierte Handwerker, die Wunden behandelten, Knochen richteten und manchmal kleine Operationen durchführten. Jean Follet war in der ganzen Region als hartnäckiger Heiler bekannt.",
    folletP2: "Die Mutter von Antoinette war Jeanne Lambin aus Quesnoy-sur-Deûle. Zum Zeitpunkt des Ehevertrags von 1685 war sie Witwe. Sie wurde von ihrem Sohn Antoine, ebenfalls Chirurg, und ihrem Bruder Laurens Ricourt begleitet.",
    contractIntro: "Dieser Vertrag ist das allerwichtigste historische Familiendokument. Er wurde am 18. April 1685 vor Notar Jacques Anselme Le Francq in Lille aufgesetzt und folgt der Coutume de Lille, einem Rechtssystem, das Frauen mehr Schutz bot als in vielen umliegenden Regionen. Der Vertrag ist in den Archives Départementales du Nord erhalten.",
    groomTitle: "Seite des Bräutigams:",
    groomItems: [
      "Hubert Deleforge, junger Mann aus Hallennes",
      "Begleitet von seinen Eltern Hubert Deleforge und Marie Grimbel",
      "Onkel Pierre Cordon aus Loos als Zeuge",
      "Mitgift: 400 Pfund Parisis, 3 Rasières Weizen, 2 Paar Laken, 6 Ellen Wollstoff"
    ],
    brideTitle: "Seite der Braut:",
    brideItems: [
      "Antoinette Follet, Tochter des verstorbenen Meisters Jean Follet aus Capinghem",
      "Begleitet von Mutter Jeanne Lambin, Bruder Antoine (Chirurg), Onkel Laurens Ricourt",
      "Mitgift: 400 Pfund Parisis, 2 Paar Leichentücher, 6 Servietten, Kleidung für den Hochzeitstag"
    ],
    specialTitle: "Besondere Bestimmungen:",
    specialItems: [
      "Antoinette behält das Recht an ihrem Schmuck und persönlichen Besitz",
      "Die Mitgift muss bei Kinderlosigkeit zurückerstattet werden",
      "Erworbene Güter werden nach festgelegten Proportionen geteilt",
      "Die Mutter der Braut gewährt ihrer Tochter das Pachtrecht an einem Hof von zwei Bonniers (~2,5 Hektar)"
    ],
    contractEnd: "Der Gesamtwert der Mitgift — 800 Pfund Parisis — entspricht etwa zwei bis drei Jahreslöhnen eines gut verdienenden Handwerkers. Dies deutet darauf hin, dass beide Familien zum wohlhabenden Mittelstand gehörten.",
    arrivalP1: "Izegem war um 1700 keine große Stadt, sondern ein sich entwickelndes Dorf. Es hatte eine aktive Gemeinschaft von Bauern, Handwerkern und Holzarbeitern. Das nahe gelegene Mandeltal bot Holz, Wasser, Torf und Beschäftigung.",
    arrivalP2: "Für jemanden mit Huberts Fähigkeiten war dies ein Ort, an dem man buchstäblich von vorne anfangen konnte. In den ersten Jahren des 18. Jahrhunderts finden wir Hubert als Boquillon (Holzfäller) wieder, ein Beruf, der in der Region um die Mandel wohlbekannt war.",
    arrivalP3: "Die Entscheidung, um 1699 nach Izegem zu ziehen, hat den Lauf unserer Familiengeschichte bestimmt. Ohne diesen Schritt wäre der Izegemer Zweig der Familie Deleforge/Deforce nie entstanden.",
    integrationIntro: "Die Familie integrierte sich schnell in Westflandern, innerhalb einer Generation:",
    integrationItems: [
      { name: "Tochter Antonia", text: "heiratete 1714 Philippe Charles Rousseau, ebenfalls ein Einwanderer aus Bondues. Sie hatten zusammen 10 Kinder." },
      { name: "Jacobus Franciscus", text: "(unser direkter Vorfahre) heiratete 1718 Veronica Barbier und ließ sich in Ardooie nieder. Sie hatten 9 Kinder." },
      { name: "Sohn Albert", text: "heiratete 1719 Judoca Reynaert aus Ingelmunster und wurde dort Stammvater einer zahlreichen Nachkommenschaft." },
      { name: "Der jüngste Sohn Hubert", text: "heiratete die Izegemerin Isabella De Man und hatte mit ihr 14 Kinder." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Ältester bekannter Vorfahre" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Sohn von Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Historische Karte von Izegem im Jahr 1643 von Antonius Sanderus",
    imgIzegemCaption: "Historische Karte von Izegem im Jahr 1643 von Antonius Sanderus",
    imgKerkAlt: "Die Alte Sankt-Tillo-Kirche, ab 1604 wiederaufgebaut, 1852 abgerissen",
    imgKerkCaption: "Die Alte Sankt-Tillo-Kirche (1604-1852) — Lithografie von Deroeck",
  };

  const contentSV = {
    // Franska Flandern omkring 1685
    frenchFlandersTitle: "Franska Flandern omkring 1685: En region i uppror",
    frenchFlandersExplainerTitle: "Vad är Franska Flandern?",
    frenchFlandersExplainer: "Franska Flandern (Flandre française) är den historiska delen av Flandern som nu ligger i norra Frankrike. Det omfattar regionen runt Lille, Dunkerque och Hazebrouck. Detta område erövrades 1668 av Ludvig XIV och anslöts till Frankrike. Fram till långt in på 1900-talet talade man fortfarande flamländska här. Obs: Franska Flandern är inte detsamma som Vallonien, som är en separat fransktalande region i Belgien.",
    frenchFlandersIntro: "För att förstå varför Hubert Deleforge och Antoinette Follet lämnade sin hemtrakt måste vi känna till den värld de levde i. Châtellenie de Lille — området runt Lille där Hallennes och Capinghem låg — var 1685 en region som fortfarande skakade av årtionden av krig, erövring och påtvingad förändring.",
    
    geographyTitle: "Geografiskt läge",
    geographyP1: "Châtellenie de Lille sträckte sig över ett område på cirka 900 kvadratkilometer, begränsat av Leie i norr, Deûle i öster och Scarpe i söder. Det var ett bördigt lågland med otaliga bäckar, träsk och skogspartier. Byarna Hallennes-lez-Haubourdin och Capinghem låg bara några kilometer från Lille, regionens huvudstad.",
    geographyP2: "Landskapet präglades av en mosaik av åkermark, betesmarker och skogar. Bois d'Haubourdin — skogen där Huberts familj arbetade som vedhuggare — var ett av de många skogsområden som genomkorsade regionen.",
    
    politicalTitle: "Politiska omvälvningar",
    politicalP1: "Fram till 1668 tillhörde regionen de Spanska Nederländerna, en rest av det gamla burgundiska riket. Freden i Aachen (1668) överförde området till Frankrike, men denna överlämning var allt annat än fredlig.",
    politicalP2: "Den franska annekteringen innebar en fullständig omvälvning för lokalbefolkningen. Domstolsspråket ändrades från flamländska till franska. Lokala sedvanerätter reviderades. Nya skatter infördes.",
    politicalP3: "Särskilt ingripande var förfranskningen: den systematiska politiken att ersätta det flamländska språket och kulturen med det franska.",
    
    economicTitle: "Ekonomisk verklighet",
    economicP1: "Regionens ekonomi vilade på tre pelare: jordbruk, textilproduktion och hantverk. Jordbruket producerade spannmål, lin och humle. Textilindustrin gav arbete åt tusentals vävare, spinnare och blekare.",
    economicP2: "Ludvig XIV:s krig ödelade denna ekonomi. Arméer drog genom landet och krävde mat, hästar och logi.",
    economicP3: "Därtill kom extraordinära skatter. Taille (jordskatt), gabelle (saltskatt) och capitation (huvudskatt) tyngde befolkningen hårt.",
    economicTable: [
      { item: "Spannmål (vete)", price: "12-15 sols per rasière", note: "Fördubblat sedan 1660" },
      { item: "Daglön arbetare", price: "6-8 sols per dag", note: "Oförändrad" },
      { item: "Årlig taille", price: "10-20 livres per hushåll", note: "Tredubblat sedan 1668" },
      { item: "Inkvartering", price: "Varierande", note: "Kunde pågå i månader" },
    ],
    
    religiousTitle: "Religiöst förtryck",
    religiousP1: "År 1685 markerade en vändpunkt i fransk religionspolitik. Den 18 oktober — exakt sex månader efter Huberts och Antoinettes bröllop — undertecknade Ludvig XIV ediktet från Fontainebleau, som upphävde ediktet från Nantes. Detta innebar slutet för all religiös tolerans i Frankrike.",
    religiousP2: "Även om regionen runt Lille var övervägande katolsk hade upphävandet konsekvenser även här. De protestantiska minoriteterna — särskilt i textilstäderna — flydde till Nederländerna, England eller Tyskland.",
    religiousP3: "För den katolska befolkningen innebar upphävandet ett kvävande klimat av religiös kontroll.",
    religiousP4: "Situationen var särskilt bitter för blandade familjer. Den som hade en protestantisk förfader betraktades med misstro.",
    
    socialTitle: "Social struktur",
    socialP1: "Samhället runt Lille var strikt hierarkiskt ordnat. I toppen stod adeln och det högre prästerskapet, följt av rika köpmän och jurister.",
    socialP2: "Familjen Deleforge tillhörde de självständiga hantverkarna. Som boquillons (vedhuggare) och sågare hade de ett etablerat yrke med egna verktyg.",
    socialP3: "Äktenskapet mellan Hubert och Antoinette var alltså ett socialt blandat äktenskap. Att båda familjerna bidrog med lika hemgift om 400 livres parisis tyder på att de ansåg sig jämbördiga.",
    
    dailyLifeTitle: "Vardagslivet",
    dailyLifeP1: "Livet i en by som Hallennes omkring 1685 var hårt men förutsägbart — åtminstone i fredstid. Dagen började vid soluppgång och slutade vid solnedgång.",
    dailyLifeP2: "De flesta hus var byggda av lera och trä med halmtak. De bestod av ett eller två rum där hela familjen bodde, åt och sov.",
    dailyLifeP3: "Kosten bestod huvudsakligen av bröd, bönor, ärtor, kål och fläsk. Kött var en lyx, förbehållen högtidsdagar.",
    dailyLifeP4: "Söndagen var kyrkans och gemenskapens dag. Efter mässan samlades byborna på torget där nyheter utbyttes och affärer gjordes.",
    
    migrationTitle: "Migrationsvägen till Flandern",
    migrationP1: "Huberts och Antoinettes migration till Izegem omkring 1699 var del av en större rörelse. Tusentals fransmän — både protestanter och katoliker — flyttade till de södra Nederländerna under 1600-talets sista årtionden.",
    migrationP2: "Vägen från Hallennes till Izegem var relativt kort: cirka 50 kilometer, som kunde tillryggaläggas till fots på två till tre dagar.",
    migrationP3: "Varför just Izegem? Svaret ligger troligen i Mandeldalens skogar och närvaron av en vedhuggargemenskap. Hubert fann arbete där som boquillon.",
    
    francisationTitle: "Förfranskningen av Franska Flandern",
    francisationIntro: "Övergången av Franska Flandern från ett flamländsktalande till ett fransktalande område var inte en naturlig process, utan resultatet av en systematisk språkpolitik som skulle pågå i mer än två århundraden.",
    francisationTimeline: [
      { year: "1659", event: "Pyrenéfreden", description: "Frankrike förvärvar de första delarna av Flandern." },
      { year: "1668", event: "Freden i Aachen", description: "Lille och omgivningar blir definitivt franska." },
      { year: "1684", event: "Förordningen från Villers-Cotterêts utvidgas", description: "Franska blir det enda tillåtna språket i domstolar." },
      { year: "1789", event: "Franska revolutionen", description: "Revolutionärerna ser språkmångfald som ett hot mot enheten." },
      { year: "1794", event: "Barère-rapporten", description: "Flamländska och andra minoritetsspråk stämplas som 'kontrarevolutionens språk'." },
      { year: "1833", event: "Guizot-lagen", description: "Obligatorisk grundskoleutbildning införs — uteslutande på franska." },
    ],
    francisationImpactTitle: "'Signe'-systemet",
    francisationImpactP1: "Ett särskilt förnedrande instrument var det så kallade 'signe'-systemet i skolorna. Ett barn som talade flamländska fick en träskylt hängd runt halsen.",
    francisationImpactP2: "Detta system — som skulle fortsätta långt in på 1900-talet — skapade en generation som skämdes för sitt modersmål.",
    francisationFamilyTitle: "Inverkan på familjenamnet",
    francisationFamilyP1: "Förfranskningen förklarar också utvecklingen av vårt familjenamn. I franska dokument skrevs 'Deleforge' — en förfranskad stavning. När familjen migrerade till Flandern blev det 'Deforce' eller 'De Force', och senare 'Deforche' i de flamländska registren.",
    francisationFamilyP2: "Det är ironiskt att familjen lämnade ett område som höll på att förlora sin flamländska karaktär för att bosätta sig i en region som skulle bevara sin flamländska identitet.",
    
    frenchRevolutionTitle: "Franska revolutionen (1789-1799): Omvälvning och terror",
    frenchRevolutionIntro: "Även om familjen Deleforge redan omkring 1699 hade migrerat till Flandern, stannade ättlingar kvar i Franska Flandern och upplevde en av de mest turbulenta perioderna i Europas historia.",
    frenchRevolutionCausesTitle: "Revolutionens orsaker",
    frenchRevolutionCausesP1: "Under 1780-talet befann sig Frankrike i djup kris. Statskassan var tom på grund av kostsamma krig. Skördarna misslyckades 1788, vilket fick brödpriserna att skjuta i höjden.",
    frenchRevolutionCausesP2: "Ståndssamhället — med den privilegierade adeln och prästerskapet mot det beskattade tredje ståndet — var inte längre hållbart.",
    frenchRevolutionEventsTitle: "Revolutionära händelser i Franska Flandern",
    frenchRevolutionEventsP1: "Den 14 juli 1789 stormades Bastiljen i Paris. Nyheten nådde Lille inom dagar och ledde till spontana folkuppror.",
    frenchRevolutionEventsP2: "I Châtellenie de Lille stängdes kloster, kyrklig egendom nationaliserades och gamla flamländska traditioner förbjöds.",
    frenchRevolutionTerrorTitle: "Terrorn (1793-1794)",
    frenchRevolutionTerrorP1: "Skräckväldet under Robespierre drabbade Franska Flandern hårt. Regionen låg i frontlinjen för kriget mot Österrike.",
    frenchRevolutionTerrorP2: "Katolicismen förbjöds tillfälligt. Kyrkor plundrades, döptes om till 'Förnuftets tempel' eller användes som lager.",
    frenchRevolutionTerrorP3: "Kalendern reformerades: 1792 blev 'År I' av Republiken. Söndagen avskaffades.",
    frenchRevolutionLanguageTitle: "Språkförtryck i enhetens namn",
    frenchRevolutionLanguageP1: "Revolutionärerna såg regionala språk som ett hot mot den nationella enheten.",
    frenchRevolutionLanguageP2: "Även om flamländska inte specifikt nämndes i rapporten föll det under samma förtryck.",
    frenchRevolutionImpactTitle: "Arvet för Franska Flandern",
    frenchRevolutionImpactP1: "Revolutionen förde med sig grundläggande förändringar: feodala rättigheter avskaffades, kyrkan förlorade sina marker och makt.",
    frenchRevolutionImpactP2: "För Deleforgerna som stannade kvar i Franska Flandern innebar revolutionen en definitiv brytning med det förflutna.",
    frenchRevolutionImpactP3: "Det är betydelsefullt att Huberts och Antoinettes migration till Flandern, ett sekel tidigare, hade skyddat dem från denna katastrof.",
    frenchRevolutionTimeline: [
      { year: "1788", event: "Misslyckad skörd", description: "Brödpriserna fördubblades. Hungerkravaller i hela Franska Flandern." },
      { year: "14 juli 1789", event: "Stormningen av Bastiljen", description: "Revolutionens början. Nyheten når Lille inom dagar." },
      { year: "Aug 1789", event: "Feodalismens avskaffande", description: "Adelns privilegier avskaffas." },
      { year: "1790", event: "Prästerskapets civila konstitution", description: "Präster måste avlägga ed." },
      { year: "1792", event: "Krig & Republik", description: "Frankrike förklarar Österrike krig. Monarkin avskaffas." },
      { year: "1793-1794", event: "Terrorn", description: "Massavrättningar. Giljotinen i Lille." },
      { year: "1794", event: "Barère-rapporten", description: "Regionala språk förbjuds." },
      { year: "1799", event: "Napoleon tar makten", description: "Revolutionens slut. Imperiets början." },
    ],
    
    unrestP1: "Under 1600-talets andra hälft hängde en slöja av oro över byarna runt Lille. Det var en region där en tyst, seg ordning hade funnits i generationer: småbönder, hantverkare, skogsarbetare, arrendatorer och vävare som levde i en igenkännlig rytm. Men när Hubert Deleforge föddes 1662 i Hallennes-lez-Haubourdin var denna rytm redan bruten.",
    unrestP2: "Hallennes och Capinghem, Antoinette Follets födelseort, låg i hjärtat av den gamla Châtellenie de Lille, ett område som i århundraden hade tillhört grevskapet Flandern, men där pikardiska var vardagsspråket och franska förvaltningens språk.",
    unrestP3: "Hubert växte upp i en tid då krig inte längre bara var något man kände till från hörsägen. Ludvig XIV:s arméer passerade genom regionen, ibland synliga på fälten i månader.",
    unrestP4: "Devolutionskriget (1667-1668) förde regionen under fransk överhöghet. Holländska kriget (1672-1678) förvärrade situationen. Nio års kriget (1688-1697) ödelade hela byar.",
    unrestP5: "1685, året för Huberts bröllop med Antoinette, upphävde Ludvig XIV ediktet från Nantes. Detta innebar slutet för religiös tolerans för protestanter.",
    schemaHeaders: ["Period", "Kontext", "Effekt på familjen"],
    schemaRows: [
      { period: "1650-1668", context: "Hallennes fortfarande del av Spanska Nederländerna", effect: "Relativt stabil situation" },
      { period: "1668-1678", context: "Under fransk överhöghet (Freden i Aachen)", effect: "Mer tryck; högre skatter" },
      { period: "1678-1685", context: "Fullständig integration i Frankrike", effect: "Religiös kontroll och tvångsomvändelser" },
      { period: "1685-1697", context: "Upphävande av ediktet från Nantes; Nio års kriget", effect: "Religiös förföljelse; migrationsvåg" },
      { period: "1697-1700", context: "Regionen ödelagd trots freden i Rijswijk", effect: "Hubert migrerar till Izegem (1699)", highlight: true },
      { period: "1700-1710", context: "Spanska tronföljdskriget", effect: "Familjen slår rot i Flandern" },
    ],
    deleforgeTitle: "Familjen Deleforge",
    deleforgeP1: "Familjen Deleforge hade sina rötter i hantverket: skogsbruk, träbearbetning, gårdsförvaltning, häckskötsel och mindre snickeriarbeten.",
    deleforgeP2: "Den äldste kända förfadern var Bauduin Deleforge, född omkring 1550 och död 1613 i Halluin.",
    folletTitle: "Familjen Follet",
    folletP1: "Antoinettes far, mästerkirurg Jean Follet, åtnjöt anseende bortom Capinghem. Kirurger var på 1600-talet högt kvalificerade hantverkare.",
    folletP2: "Antoinettes mor var Jeanne Lambin från Quesnoy-sur-Deûle. Vid äktenskapskontraktet 1685 var hon änka.",
    contractIntro: "Detta kontrakt är det viktigaste historiska familjedokumentet. Det upprättades den 18 april 1685 inför notarie Jacques Anselme Le Francq i Lille.",
    groomTitle: "Brudgummens sida:",
    groomItems: [
      "Hubert Deleforge, ung man från Hallennes",
      "Åtföljd av sina föräldrar Hubert Deleforge och Marie Grimbel",
      "Farbror Pierre Cordon från Loos som vittne",
      "Hemgift: 400 livres parisis, 3 rasières vete, 2 par lakan, 6 alnar ylltyg"
    ],
    brideTitle: "Brudens sida:",
    brideItems: [
      "Antoinette Follet, dotter till framlidne mäster Jean Follet från Capinghem",
      "Åtföljd av mor Jeanne Lambin, bror Antoine (kirurg), morbror Laurens Ricourt",
      "Hemgift: 400 livres parisis, 2 par svepningar, 6 servetter, kläder för bröllopsdagen"
    ],
    specialTitle: "Särskilda bestämmelser:",
    specialItems: [
      "Antoinette behåller rätten till sina smycken och personliga ägodelar",
      "Hemgiften måste återbetalas vid barnlöshet",
      "Förvärvad egendom delas enligt fastställda proportioner",
      "Brudens mor beviljar sin dotter arrenderätten till en gård på två bonniers (~2,5 hektar)"
    ],
    contractEnd: "Det totala värdet av hemgiften — 800 livres parisis — motsvarar ungefär två till tre årslöner för en välbetalad hantverkare. Detta tyder på att båda familjerna tillhörde den välbärgade medelklassen.",
    arrivalP1: "Izegem omkring 1700 var ingen stor stad, utan en växande by. Den hade en aktiv gemenskap av bönder, hantverkare och skogsarbetare.",
    arrivalP2: "För någon med Huberts färdigheter var detta en plats där man bokstavligen kunde börja om. Under 1700-talets första år finner vi Hubert som boquillon (vedhuggare).",
    arrivalP3: "Beslutet att flytta till Izegem omkring 1699 har bestämt vår familjehistorias förlopp. Utan detta steg hade Izegem-grenen av familjen Deleforge/Deforce aldrig funnits.",
    integrationIntro: "Familjen integrerades snabbt i Västflandern, inom en generation:",
    integrationItems: [
      { name: "Dottern Antonia", text: "gifte sig 1714 med Philippe Charles Rousseau, också en invandrare från Bondues. De fick tillsammans 10 barn." },
      { name: "Jacobus Franciscus", text: "(vår direkta förfader) gifte sig 1718 med Veronica Barbier och bosatte sig i Ardooie. De fick 9 barn." },
      { name: "Sonen Albert", text: "gifte sig 1719 med Judoca Reynaert från Ingelmunster och blev stamfar för en talrik avkomma." },
      { name: "Yngste sonen Hubert", text: "gifte sig med Isabella De Man från Izegem och fick med henne 14 barn." },
    ],
    lineageData: [
      { name: "Bauduin Deleforge", years: "~1550 – 1613", place: "Halluin", note: "Äldste kända förfader" },
      { name: "Hypolite Deleforge", years: "~1590 – ?", place: "Santes", note: "Son till Bauduin" },
      { name: "Hubert Deleforge senior", years: "~1630 – ?", place: "Hallennes", note: "× Marie Grimbel" },
      { name: "Hubert Deleforge", years: "1662 – 1729", place: "Hallennes → Izegem", note: "× Antoinette Follet (1685)" },
      { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772", place: "Izegem → Ardooie", note: "× Veronica Barbier (1718)" },
    ],
    imgIzegemAlt: "Historisk karta över Izegem år 1643 av Antonius Sanderus",
    imgIzegemCaption: "Historisk karta över Izegem år 1643 av Antonius Sanderus",
    imgKerkAlt: "Gamla Sankt-Tillo-kyrkan, återuppbyggd från 1604, riven 1852",
    imgKerkCaption: "Gamla Sankt-Tillo-kyrkan (1604-1852) — Litografi av Deroeck",
  };

  const content = language === 'fr' ? contentFR : language === 'pcd' ? contentPCD : language === 'vls' ? contentVLS : language === 'en' ? contentEN : language === 'es' ? contentES : language === 'de' ? contentDE : language === 'sv' ? contentSV : contentNL;

  return (
    <section id="stamouders" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('stamouders.title')}
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('stamouders.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Nieuwe sectie: Frans-Vlaanderen rond 1685 */}
        {content.frenchFlandersTitle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-16"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
              {content.frenchFlandersTitle}
            </h3>
            
            {/* Infobox: Wat is Frans-Vlaanderen? */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="text-xl">ℹ️</span>
                    {content.frenchFlandersExplainerTitle}
                  </h4>
                  <p className="text-foreground/80 leading-relaxed">
                    {content.frenchFlandersExplainer}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-foreground/80 mb-8 italic border-l-4 border-primary/30 pl-4">
              {content.frenchFlandersIntro}
            </p>

            {/* Afbeeldingen galerij */}
            <div className="mb-10">
              <figure className="relative overflow-hidden rounded-xl shadow-lg max-w-md">
                <img 
                  src={marktLille} 
                  alt={language === 'nl' ? 'Marktdag in Rijsel rond 1680' : language === 'fr' ? 'Jour de marché à Lille vers 1680' : language === 'en' ? 'Market day in Lille around 1680' : language === 'de' ? 'Markttag in Lille um 1680' : language === 'es' ? 'Día de mercado en Lille hacia 1680' : language === 'sv' ? 'Marknadsdag i Lille omkring 1680' : 'Marktdag in Rijsel rond 1680'}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-sm">
                  <AiLabel className="mb-1" />
                  {language === 'nl' ? 'Marktdag in Rijsel (ca. 1680)' : language === 'fr' ? 'Jour de marché à Lille (env. 1680)' : language === 'en' ? 'Market day in Lille (c. 1680)' : language === 'de' ? 'Markttag in Lille (ca. 1680)' : language === 'es' ? 'Día de mercado en Lille (aprox. 1680)' : language === 'sv' ? 'Marknadsdag i Lille (ca 1680)' : 'Marktdag in Rijsel (ca. 1680)'}
                </figcaption>
              </figure>
            </div>

            {/* Uitklapbare content voor Frans-Vlaanderen details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {/* Geografische situering */}
                  <div className="mb-10">
                    <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">📍</span>
                      {content.geographyTitle}
                    </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.geographyP1}</p>
                <p>{content.geographyP2}</p>
              </div>
              
              {/* Interactieve kaart Hallennes */}
              <div className="mt-8 ml-10">
                <HallennesKaart />
              </div>
            </div>

            {/* Politieke omwentelingen */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">⚔️</span>
                {content.politicalTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.politicalP1}</p>
                
                {/* Afbeelding: Lodewijk XIV en zijn leger */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={lodewijkXivLeger} 
                      alt={language === 'nl' ? 'Lodewijk XIV leidt zijn leger door Vlaanderen, 17e eeuw' : 
                           language === 'fr' ? "Louis XIV mène son armée à travers la Flandre, XVIIe siècle" : 
                           language === 'en' ? 'Louis XIV leads his army through Flanders, 17th century' :
                           language === 'es' ? 'Luis XIV lidera su ejército a través de Flandes, siglo XVII' :
                           "Lodewyk XIV leidt zyn leger deur Vloanderen, 17e ieuw"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'De legers van Lodewijk XIV veroverden Frans-Vlaanderen in 1668 — het begin van een nieuwe orde' : 
                         language === 'fr' ? "Les armées de Louis XIV ont conquis la Flandre française en 1668 — le début d'un nouvel ordre" : 
                         language === 'en' ? "The armies of Louis XIV conquered French Flanders in 1668 — the beginning of a new order" :
                         language === 'es' ? "Los ejércitos de Luis XIV conquistaron Flandes francés en 1668 — el inicio de un nuevo orden" :
                         "De legers van Lodewyk XIV veroverden Fransch-Vloanderen in 1668 — 't begin van e nieuwen orde"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.politicalP2}</p>
                <p>{content.politicalP3}</p>
              </div>
            </div>

            {/* Economische realiteit */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">💰</span>
                {content.economicTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.economicP1}</p>
                
                {/* Afbeelding: Vlaamse markt */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={vlaamseMarkt} 
                      alt={language === 'nl' ? '17e-eeuwse Vlaamse markt met linnenhandelaren en kooplieden' : 
                           language === 'fr' ? "Marché flamand du XVIIe siècle avec marchands de lin et commerçants" : 
                           language === 'en' ? '17th century Flemish market with linen merchants and traders' :
                           language === 'es' ? 'Mercado flamenco del siglo XVII con comerciantes de lino y mercaderes' :
                           "17e-ieuwsche Vlaamsche meerkt mee linnenkoopluu en handelaars"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'Marktdag in Frans-Vlaanderen: linnen, graan en textiel vormden de economische ruggengraat' : 
                         language === 'fr' ? "Jour de marché en Flandre française : le lin, le grain et les textiles formaient l'épine dorsale économique" : 
                         language === 'en' ? 'Market day in French Flanders: linen, grain and textiles formed the economic backbone' :
                         language === 'es' ? 'Día de mercado en Flandes francés: el lino, el grano y los textiles formaban la columna vertebral económica' :
                         "Meerktdag in Frans-Vlaanderen: linnen, groan en textiel wierden de rêgegraat van de economie"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.economicP2}</p>
                <p>{content.economicP3}</p>
              </div>
              {content.economicTable && (
                <div className="ml-10 mt-6 overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-border">
                    <thead>
                      <tr className="bg-primary/10">
                        <th className="border border-border p-3 text-left font-serif">{language === 'nl' ? 'Item' : language === 'fr' ? 'Article' : language === 'en' ? 'Item' : language === 'de' ? 'Artikel' : language === 'es' ? 'Artículo' : language === 'sv' ? 'Artikel' : 'Item'}</th>
                        <th className="border border-border p-3 text-left font-serif">{language === 'nl' ? 'Prijs (ca. 1685)' : language === 'fr' ? 'Prix (env. 1685)' : language === 'en' ? 'Price (c. 1685)' : language === 'de' ? 'Preis (ca. 1685)' : language === 'es' ? 'Precio (aprox. 1685)' : language === 'sv' ? 'Pris (ca 1685)' : 'Pries (ca. 1685)'}</th>
                        <th className="border border-border p-3 text-left font-serif">{language === 'nl' ? 'Opmerking' : language === 'fr' ? 'Remarque' : language === 'en' ? 'Note' : language === 'de' ? 'Anmerkung' : language === 'es' ? 'Nota' : language === 'sv' ? 'Anmärkning' : 'Opmirking'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/80">
                      {content.economicTable.map((row, i) => (
                        <tr key={i} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                          <td className="border border-border p-3 font-medium">{row.item}</td>
                          <td className="border border-border p-3">{row.price}</td>
                          <td className="border border-border p-3 text-muted-foreground">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Religieuze repressie */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">⛪</span>
                {content.religiousTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.religiousP1}</p>
                
                {/* Afbeelding: Kerk en religieuze bijeenkomst */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={kerkMis} 
                      alt={language === 'nl' ? 'Katholieke kerkdienst in Vlaanderen, 17e eeuw' : 
                           language === 'fr' ? "Messe catholique en Flandre, XVIIe siècle" : 
                           language === 'en' ? 'Catholic church service in Flanders, 17th century' :
                           language === 'de' ? 'Katholischer Gottesdienst in Flandern, 17. Jahrhundert' :
                           language === 'es' ? 'Misa católica en Flandes, siglo XVII' :
                           language === 'sv' ? 'Katolsk gudstjänst i Flandern, 1600-talet' :
                           "Katholieke kerkdienst in Vloanderen, 17e ieuw"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'De kerk als instrument van controle: na 1685 werd religieuze tolerantie afgeschaft' : 
                         language === 'fr' ? "L'église comme instrument de contrôle : après 1685, la tolérance religieuse fut abolie" : 
                         language === 'en' ? 'The church as instrument of control: after 1685, religious tolerance was abolished' :
                         language === 'de' ? 'Die Kirche als Kontrollinstrument: nach 1685 wurde die religiöse Toleranz abgeschafft' :
                         language === 'es' ? 'La iglesia como instrumento de control: después de 1685, la tolerancia religiosa fue abolida' :
                         language === 'sv' ? 'Kyrkan som kontrollinstrument: efter 1685 avskaffades religiös tolerans' :
                         "De kerke as instrument van controle: noa 1685 wierd religieuze tolerantie afgeschaft"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.religiousP2}</p>
                <p>{content.religiousP3}</p>
                <p>{content.religiousP4}</p>
              </div>
            </div>

            {/* Sociale structuur */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">👥</span>
                {content.socialTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.socialP1}</p>
                
                {/* Afbeelding: Standenmaatschappij */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={standenmaatschappij} 
                      alt={language === 'nl' ? 'De 17e-eeuwse standenmaatschappij in Vlaanderen' : 
                           language === 'fr' ? "La société d'ordres du XVIIe siècle en Flandre" : 
                           language === 'en' ? 'The 17th century class society in Flanders' :
                           language === 'es' ? 'La sociedad estamental del siglo XVII en Flandes' :
                           "De 17e-ieuwsche standenmoatschappye in Vloanderen"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'De standenmaatschappij: adel, geestelijkheid, burgerij en boeren — elk met hun eigen plaats' : 
                         language === 'fr' ? "La société d'ordres : noblesse, clergé, bourgeoisie et paysans — chacun à sa place" : 
                         language === 'en' ? 'The class society: nobility, clergy, bourgeoisie and peasants — each in their place' :
                         language === 'es' ? 'La sociedad estamental: nobleza, clero, burguesía y campesinos — cada uno en su lugar' :
                         "De standenmoatschappye: adel, geestelijkheid, burgerij en boeren — elk mee under eigen ploatse"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.socialP2}</p>
                <p>{content.socialP3}</p>
              </div>
            </div>

            {/* Het dagelijks leven */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">🏠</span>
                {content.dailyLifeTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.dailyLifeP1}</p>
                
                {/* Afbeelding: Interieur van een Vlaams boerenhuis */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={boerenhuisInterieur} 
                      alt={language === 'nl' ? 'Interieur van een 17e-eeuws Vlaams boerenhuis met open haard en strodak' : 
                           language === 'fr' ? 'Intérieur d\'une maison paysanne flamande du XVIIe siècle avec cheminée ouverte et toit de chaume' : 
                           language === 'en' ? 'Interior of a 17th century Flemish peasant cottage with open hearth and thatched roof' :
                           language === 'es' ? 'Interior de una casa campesina flamenca del siglo XVII con chimenea abierta y techo de paja' :
                           language === 'de' ? 'Innenraum eines flämischen Bauernhauses aus dem 17. Jahrhundert mit offenem Herd und Strohdach' :
                           'Binnekant van e 17e-ieuwsch Vlaamsch boerenhuus mee open vuur en strooien dak'}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'Interieur van een typisch 17e-eeuws Vlaams boerenhuis: de open haard als hart van het gezinsleven' : 
                         language === 'fr' ? 'Intérieur d\'une maison paysanne flamande typique du XVIIe siècle : le foyer ouvert au cœur de la vie familiale' : 
                         language === 'en' ? 'Interior of a typical 17th century Flemish peasant cottage: the open hearth as the heart of family life' :
                         language === 'es' ? 'Interior de una casa campesina flamenca típica del siglo XVII: el hogar abierto como corazón de la vida familiar' :
                         language === 'de' ? 'Innenraum eines typischen flämischen Bauernhauses aus dem 17. Jahrhundert: der offene Herd als Mittelpunkt des Familienlebens' :
                         "Binnekant van een typisch 17e-ieuwsch Vlaamsch boerenhuus: den open heerd as 't hart van 't gezinsleven"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.dailyLifeP2}</p>
                
                {/* Afbeelding: Typische 17e-eeuwse maaltijd */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={vlaamseMaaltijd} 
                      alt={language === 'nl' ? 'Typische 17e-eeuwse Vlaamse boerenmaaltijd met brood, bonen, erwten en spek' : 
                           language === 'fr' ? "Repas paysan flamand typique du XVIIe siècle avec pain, haricots, pois et lard" : 
                           language === 'en' ? 'Typical 17th century Flemish peasant meal with bread, beans, peas and bacon' :
                           language === 'es' ? 'Comida campesina flamenca típica del siglo XVII con pan, judías, guisantes y tocino' :
                           language === 'de' ? 'Typische flämische Bauernmahlzeit aus dem 17. Jahrhundert mit Brot, Bohnen, Erbsen und Speck' :
                           "Typisch 17e-ieuwsch Vlaamsch boerenmaal mee brood, boonen, erwten en spek"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'Dagelijkse kost: roggebrood, bonen- en erwtenstoofpot, kool, spek en bier' : 
                         language === 'fr' ? "Nourriture quotidienne : pain de seigle, ragoût de haricots et pois, chou, lard et bière" : 
                         language === 'en' ? 'Daily fare: rye bread, bean and pea stew, cabbage, bacon and beer' :
                         language === 'es' ? 'Comida diaria: pan de centeno, guiso de judías y guisantes, col, tocino y cerveza' :
                         language === 'de' ? 'Tägliche Kost: Roggenbrot, Bohnen- und Erbseneintopf, Kohl, Speck und Bier' :
                         "Dagelijksche kost: roggebrood, boonen- en erwtenstoofpot, kool, spek en bier"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.dailyLifeP3}</p>
                <p>{content.dailyLifeP4}</p>
                
                {/* Afbeelding: Dorpsplein na de zondagsmis */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={dorpspleinZondagsmis} 
                      alt={language === 'nl' ? 'Vlaams dorpsplein na de zondagsmis, 17e eeuw' : 
                           language === 'fr' ? "Place de village flamand après la messe du dimanche, XVIIe siècle" : 
                           language === 'en' ? 'Flemish village square after Sunday mass, 17th century' :
                           language === 'es' ? 'Plaza del pueblo flamenco después de la misa del domingo, siglo XVII' :
                           language === 'de' ? 'Flämischer Dorfplatz nach der Sonntagsmesse, 17. Jahrhundert' :
                           "Vlaamsch dorpsplein noa de zundagsmisse, 17e ieuw"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'Na de mis: het dorpsplein als hart van het gemeenschapsleven' : 
                         language === 'fr' ? "Après la messe : la place du village comme cœur de la vie communautaire" : 
                         language === 'en' ? 'After mass: the village square as the heart of community life' :
                         language === 'es' ? 'Después de la misa: la plaza del pueblo como corazón de la vida comunitaria' :
                         language === 'de' ? 'Nach der Messe: der Dorfplatz als Mittelpunkt des Gemeinschaftslebens' :
                         "Noa de misse: 't dorpsplein as herte van 't gemeenschapsleven"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            {/* De migratieroute naar Vlaanderen */}
            <div className="mb-10">
              <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">🚶</span>
                {content.migrationTitle}
              </h4>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4 ml-10">
                <p>{content.migrationP1}</p>
                
                {/* Afbeelding: Migratieroute */}
                <div className="my-8 not-prose">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={migratieReis} 
                      alt={language === 'nl' ? 'Vlaamse familie op migratieroute van Hallennes naar Izegem rond 1699' : 
                           language === 'fr' ? "Famille flamande sur la route de migration de Hallennes à Izegem vers 1699" : 
                           language === 'en' ? 'Flemish family on migration route from Hallennes to Izegem around 1699' :
                           language === 'es' ? 'Familia flamenca en ruta de migración de Hallennes a Izegem alrededor de 1699' :
                           language === 'de' ? 'Flämische Familie auf der Migrationsroute von Hallennes nach Izegem um 1699' :
                           "Vlaamsche familie op migratieroute van Hallennes noar Izegem rond 1699"}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'De reis van Hallennes naar Izegem: circa 50 kilometer te voet door het Vlaamse land' : 
                         language === 'fr' ? "Le voyage de Hallennes à Izegem : environ 50 kilomètres à pied à travers les Flandres" : 
                         language === 'en' ? 'The journey from Hallennes to Izegem: about 50 kilometers on foot through Flanders' :
                         language === 'es' ? 'El viaje de Hallennes a Izegem: unos 50 kilómetros a pie por Flandes' :
                         language === 'de' ? 'Die Reise von Hallennes nach Izegem: etwa 50 Kilometer zu Fuß durch Flandern' :
                         "De reis van Hallennes noar Izegem: circa 50 kilometer te voet deur 't Vlaamsche land"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
                <p>{content.migrationP2}</p>
                <p>{content.migrationP3}</p>
              </div>
            </div>

            {/* De Verfransing van Frans-Vlaanderen */}
            {content.francisationTitle && (
              <div className="mb-10">
                <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">🗣️</span>
                  {content.francisationTitle}
                </h4>
                <div className="ml-10 space-y-6">
                  <p className="text-foreground/80 leading-relaxed">{content.francisationIntro}</p>
                  
                  {/* Tijdlijn van de verfransing */}
                  {content.francisationTimeline && (
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30" />
                      <div className="space-y-4">
                        {content.francisationTimeline.map((item: { year: string; event: string; description: string }, index: number) => (
                          <div key={index} className="relative pl-10">
                            <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-accent border-2 border-background shadow-sm" />
                            <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-accent">{item.year}</span>
                                <span className="font-serif font-semibold text-primary">{item.event}</span>
                              </div>
                              <p className="text-sm text-foreground/70">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Afbeelding: Taalonderdrukking in scholen */}
                  <div className="my-8 not-prose">
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={schoolVerfransing} 
                        alt={language === 'nl' ? 'School in Frans-Vlaanderen met taalonderdrukking, 19e eeuw' : 
                             language === 'fr' ? "École en Flandre française avec répression linguistique, XIXe siècle" : 
                             language === 'en' ? 'School in French Flanders with language suppression, 19th century' :
                             language === 'es' ? 'Escuela en Flandes francés con represión lingüística, siglo XIX' :
                             language === 'de' ? 'Schule in Französisch-Flandern mit Sprachunterdrückung, 19. Jahrhundert' :
                             "Schole in Fransch-Vloanderen mee taalonderdrukking, 19e ieuw"}
                        className="w-full h-auto max-h-[500px] object-cover"
                      />
                      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                        <AiLabel className="mb-2" />
                        <p className="text-sm font-medium">
                          {language === 'nl' ? '"Parlez français": Vlaamse kinderen werden gestraft voor het spreken van hun moedertaal' : 
                           language === 'fr' ? '"Parlez français" : les enfants flamands étaient punis pour parler leur langue maternelle' : 
                           language === 'en' ? '"Parlez français": Flemish children were punished for speaking their native language' :
                           language === 'es' ? '"Parlez français": los niños flamencos eran castigados por hablar su lengua materna' :
                           language === 'de' ? '"Parlez français": Flämische Kinder wurden bestraft, wenn sie ihre Muttersprache sprachen' :
                           '"Parlez français": Vlaamsche kinders wierden gestraft veur \'t spreken van under moedertale'}
                        </p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* Het signe-systeem */}
                  {content.francisationImpactTitle && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 mt-6">
                      <h5 className="font-serif font-bold text-destructive mb-3 flex items-center gap-2">
                        <span className="text-lg">⚠️</span>
                        {content.francisationImpactTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.francisationImpactP1}</p>
                        <p>{content.francisationImpactP2}</p>
                      </div>
                    </div>
                  )}

                  {/* Impact op de familienaam */}
                  {content.francisationFamilyTitle && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h5 className="font-serif font-bold text-primary mb-3 flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        {content.francisationFamilyTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.francisationFamilyP1}</p>
                        <p>{content.francisationFamilyP2}</p>
                      </div>
                      {/* Visuele weergave van naamsevolutie */}
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                        <span className="bg-muted px-3 py-1 rounded-full font-medium">Deleforge</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="bg-muted px-3 py-1 rounded-full font-medium">De Force</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="bg-muted px-3 py-1 rounded-full font-medium">Deforce</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="bg-primary/20 px-3 py-1 rounded-full font-medium text-primary">Deforche</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* De Franse Revolutie */}
            {content.frenchRevolutionTitle && (
              <div className="mb-10">
                <h4 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">🔥</span>
                  {content.frenchRevolutionTitle}
                </h4>
                <div className="ml-10 space-y-6">
                  {/* Afbeelding Bestorming van de Bastille */}
                  <div className="relative w-full aspect-video md:aspect-[21/9] mb-6 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={bestormingBastille} 
                      alt={language === 'nl' ? 'De Bestorming van de Bastille, 14 juli 1789' : 
                           language === 'fr' ? 'La prise de la Bastille, 14 juillet 1789' : 
                           language === 'en' ? 'The Storming of the Bastille, July 14, 1789' : 
                           language === 'es' ? 'La Toma de la Bastilla, 14 de julio de 1789' : 
                           language === 'de' ? 'Der Sturm auf die Bastille, 14. Juli 1789' :
                           'De Bestorming van de Bastille, 14 juli 1789'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-medium">
                        {language === 'nl' ? 'De Bestorming van de Bastille, 14 juli 1789' : 
                         language === 'fr' ? 'La prise de la Bastille, 14 juillet 1789' : 
                         language === 'en' ? 'The Storming of the Bastille, July 14, 1789' : 
                         language === 'es' ? 'La Toma de la Bastilla, 14 de julio de 1789' : 
                         language === 'de' ? 'Der Sturm auf die Bastille, 14. Juli 1789' :
                         'De Bestorming van de Bastille, 14 juli 1789'}
                      </p>
                    </div>
                    <AiLabel className="bottom-2 right-2" />
                  </div>
                  <p className="text-foreground/80 leading-relaxed italic border-l-4 border-destructive/30 pl-4">{content.frenchRevolutionIntro}</p>
                  
                  {/* Oorzaken */}
                  {content.frenchRevolutionCausesTitle && (
                    <div className="mt-6">
                      <h5 className="font-serif font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        {content.frenchRevolutionCausesTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.frenchRevolutionCausesP1}</p>
                        <p>{content.frenchRevolutionCausesP2}</p>
                      </div>
                    </div>
                  )}

                  {/* Tijdlijn van de revolutie */}
                  {content.frenchRevolutionTimeline && (
                    <div className="relative mt-8">
                      <h5 className="font-serif font-bold text-foreground mb-4">
                        {language === 'nl' ? 'Tijdlijn van de Revolutie' : 
                         language === 'fr' ? 'Chronologie de la Révolution' : 
                         language === 'en' ? 'Timeline of the Revolution' : 
                         language === 'es' ? 'Cronología de la Revolución' : 
                         language === 'de' ? 'Zeitleiste der Revolution' :
                         language === 'pcd' ? 'Chronologie del Révolution' :
                         language === 'vls' ? 'Tijdlijn van de Revolutie' :
                         'Tijdlijn van de Revolutie'}
                      </h5>
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-destructive/30" />
                      <div className="space-y-4">
                        {content.frenchRevolutionTimeline.map((item: { year: string; event: string; description: string }, index: number) => (
                          <div key={index} className="relative pl-10">
                            <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-destructive border-2 border-background shadow-sm" />
                            <div className="bg-background p-4 rounded-lg border border-destructive/20 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-bold text-destructive">{item.year}</span>
                                <span className="font-serif font-semibold text-foreground">{item.event}</span>
                              </div>
                              <p className="text-sm text-foreground/70">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gebeurtenissen */}
                  {content.frenchRevolutionEventsTitle && (
                    <div className="mt-8">
                      <h5 className="font-serif font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-lg">⚔️</span>
                        {content.frenchRevolutionEventsTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.frenchRevolutionEventsP1}</p>
                        <p>{content.frenchRevolutionEventsP2}</p>
                      </div>
                    </div>
                  )}

                  {/* De Terreur */}
                  {content.frenchRevolutionTerrorTitle && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 mt-6">
                      <h5 className="font-serif font-bold text-destructive mb-3 flex items-center gap-2">
                        <span className="text-lg">💀</span>
                        {content.frenchRevolutionTerrorTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.frenchRevolutionTerrorP1}</p>
                        <p>{content.frenchRevolutionTerrorP2}</p>
                        <p>{content.frenchRevolutionTerrorP3}</p>
                      </div>
                    </div>
                  )}

                  {/* Taalrepressie */}
                  {content.frenchRevolutionLanguageTitle && (
                    <div className="mt-6">
                      <h5 className="font-serif font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-lg">🗣️</span>
                        {content.frenchRevolutionLanguageTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p className="italic border-l-4 border-muted pl-4">"{content.frenchRevolutionLanguageP1}"</p>
                        <p>{content.frenchRevolutionLanguageP2}</p>
                      </div>
                    </div>
                  )}

                  {/* Nalatenschap */}
                  {content.frenchRevolutionImpactTitle && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
                      <h5 className="font-serif font-bold text-primary mb-3 flex items-center gap-2">
                        <span className="text-lg">📜</span>
                        {content.frenchRevolutionImpactTitle}
                      </h5>
                      <div className="prose prose-sm max-w-none text-foreground/80 space-y-3">
                        <p>{content.frenchRevolutionImpactP1}</p>
                        <p>{content.frenchRevolutionImpactP2}</p>
                        <p className="font-medium text-primary">{content.frenchRevolutionImpactP3}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lees meer/minder knop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Button
            variant="outline"
            onClick={() => {
              if (isExpanded) {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              setIsExpanded(!isExpanded);
            }}
            className="group flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                {language === 'nl' ? 'Lees minder' : 
                 language === 'fr' ? 'Lire moins' : 
                 language === 'en' ? 'Read less' : 
                 language === 'es' ? 'Leer menos' : 
                 language === 'de' ? 'Weniger lesen' :
                 language === 'pcd' ? 'Lire moins' : 
                 language === 'vls' ? 'Liest minder' :
                 'Lees minder'}
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                {language === 'nl' ? 'Lees het volledige verhaal van de stamouders' : 
                 language === 'fr' ? 'Lire l\'histoire complète des ancêtres' : 
                 language === 'en' ? 'Read the full story of the founding ancestors' : 
                 language === 'es' ? 'Leer la historia completa de los antepasados' : 
                 language === 'de' ? 'Die vollständige Geschichte der Stammeltern lesen' :
                 language === 'pcd' ? 'Lire l\'histoére compléte des anchtres' : 
                 language === 'vls' ? "Liest 't volledig verhaal van de stamouders" :
                 'Lees het volledige verhaal van de stamouders'}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Uitklapbare hoofdcontent */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Een land in beroering */}
              <div className="mb-12">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                  {t('stamouders.unrest')}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                  <p>{content.unrestP1}</p>
                  <p>{content.unrestP2}</p>
                  <p>{content.unrestP3}</p>
                  <p>{content.unrestP4}</p>
                  <p>{content.unrestP5}</p>
                </div>
              </div>

              {/* Chronologisch schema */}
              <div className="mb-12 overflow-x-auto">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                  {t('stamouders.schema')}
                </h3>
                <table className="w-full text-sm border-collapse border border-border">
                  <thead>
                    <tr className="bg-primary/10">
                      {content.schemaHeaders.map((header, i) => (
                        <th key={i} className="border border-border p-3 text-left font-serif">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    {content.schemaRows.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                        <td className="border border-border p-3 font-medium">{row.period}</td>
                        <td className="border border-border p-3">{row.context}</td>
                        <td className={`border border-border p-3 ${row.highlight ? "font-semibold text-accent" : ""}`}>{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* De families */}
              <div className="mb-12">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                  {t('stamouders.families')}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-background p-6 rounded-lg shadow-card border border-border">
                    <h4 className="font-serif text-xl font-bold text-primary mb-3">{content.deleforgeTitle}</h4>
                    <div className="text-foreground/80 leading-relaxed space-y-3">
                      <p>{content.deleforgeP1}</p>
                      <p>{content.deleforgeP2}</p>
                    </div>
                  </div>
                  <div className="bg-background p-6 rounded-lg shadow-card border border-border">
                    <h4 className="font-serif text-xl font-bold text-primary mb-3">{content.folletTitle}</h4>
                    <div className="text-foreground/80 leading-relaxed space-y-3">
                      <p>{content.folletP1}</p>
                      <p>{content.folletP2}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Het huwelijkscontract */}
              <div className="mb-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  {t('stamouders.contract')}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {content.contractIntro}
                </p>
                
                {/* Afbeelding: Huwelijksceremonie bij notaris */}
                <div className="my-8">
                  <figure className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={huwelijksceremonieNotaris} 
                      alt={language === 'nl' ? 'Ondertekening van een huwelijkscontract bij de notaris, 17e eeuw' : 
                           language === 'fr' ? "Signature d'un contrat de mariage chez le notaire, XVIIe siècle" : 
                           language === 'en' ? 'Signing of a marriage contract at the notary, 17th century' :
                           language === 'es' ? 'Firma de un contrato matrimonial ante el notario, siglo XVII' :
                           language === 'de' ? 'Unterzeichnung eines Ehevertrags beim Notar, 17. Jahrhundert' :
                           "Ondertekening van e huwelykscuntract by den notaris, 17e ieuw"}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <AiLabel className="mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'nl' ? 'Het huwelijkscontract werd getekend voor notaris Jacques Anselme Le Francq te Lille op 18 april 1685' : 
                         language === 'fr' ? "Le contrat de mariage a été signé devant le notaire Jacques Anselme Le Francq à Lille le 18 avril 1685" : 
                         language === 'en' ? 'The marriage contract was signed before notary Jacques Anselme Le Francq in Lille on April 18, 1685' :
                         language === 'es' ? 'El contrato matrimonial fue firmado ante el notario Jacques Anselme Le Francq en Lille el 18 de abril de 1685' :
                         language === 'de' ? 'Der Ehevertrag wurde am 18. April 1685 vor Notar Jacques Anselme Le Francq in Lille unterzeichnet' :
                         "'t Huwelykscuntract wierd getekend vôor notaris Jacques Anselme Le Francq te Rysel op 18 april 1685"}
                      </p>
                    </figcaption>
                  </figure>
                </div>
                
{/* Originele documenten huwelijkscontract 1685 */}
                <div className="my-8 p-6 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-serif font-bold text-primary text-lg">
                        {language === 'nl' ? 'Notariële Huwelijksakte 18 april 1685' : 
                         language === 'fr' ? 'Acte de mariage notarié du 18 avril 1685' : 
                         language === 'en' ? 'Notarial Marriage Act April 18, 1685' :
                         language === 'es' ? 'Acta notarial de matrimonio del 18 de abril de 1685' :
                         language === 'de' ? 'Notarielle Eheurkunde vom 18. April 1685' :
                         "Notariële Huwelyksoakte 18 april 1685"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'nl' ? 'Opgemaakt te Lille (Rijsel) door notaris Jacques Anselme Le Francq' : 
                         language === 'fr' ? 'Rédigé à Lille par le notaire Jacques Anselme Le Francq' : 
                         language === 'en' ? 'Drawn up in Lille by notary Jacques Anselme Le Francq' :
                         language === 'es' ? 'Redactado en Lille por el notario Jacques Anselme Le Francq' :
                         language === 'de' ? 'Aufgesetzt in Lille durch Notar Jacques Anselme Le Francq' :
                         "Opgemakt te Rysel deur notaris Jacques Anselme Le Francq"}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    {language === 'nl' ? 'Deze unieke documenten tonen het oorspronkelijke huwelijkscontract met de handtekeningen van de familieleden en de complete transcriptie.' : 
                     language === 'fr' ? 'Ces documents uniques montrent le contrat de mariage original avec les signatures des membres de la famille et la transcription complète.' : 
                     language === 'en' ? 'These unique documents show the original marriage contract with the signatures of family members and the complete transcription.' :
                     language === 'es' ? 'Estos documentos únicos muestran el contrato matrimonial original con las firmas de los miembros de la familia y la transcripción completa.' :
                     language === 'de' ? 'Diese einzigartigen Dokumente zeigen den originalen Ehevertrag mit den Unterschriften der Familienmitglieder und die vollständige Transkription.' :
                     "Dezen unieke dokementen tôonen 't oorsprunkelik huwelykscuntract mee de handtekenings en de complete transkriptie."}
                  </p>
                  
                  <div className="grid gap-6">
                    {/* Pagina 1 - Titelpagina met handtekeningen */}
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={huwelijkscontractPagina1} 
                        alt={language === 'nl' ? 'Titelpagina huwelijkscontract 1685 met handtekeningen' : 
                             language === 'fr' ? 'Page de titre du contrat de mariage 1685 avec signatures' : 
                             'Title page marriage contract 1685 with signatures'}
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'nl' ? 'Huwelijkscontract Hubert DELEFORGE & Antoinette Follet — Lille 18/04/1685' : 
                           language === 'fr' ? 'Contrat de mariage Hubert DELEFORGE & Antoinette Follet — Lille 18/04/1685' : 
                           'Marriage contract Hubert DELEFORGE & Antoinette Follet — Lille 18/04/1685'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'nl' ? 'Bron: Archives Départementales du Nord, TAB 7462/26 du 18/04/1685 – Lille – Ct de mariage' : 
                           language === 'fr' ? 'Source: Archives Départementales du Nord, TAB 7462/26 du 18/04/1685 – Lille – Ct de mariage' : 
                           'Source: Archives Départementales du Nord, TAB 7462/26 du 18/04/1685 – Lille – Ct de mariage'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {language === 'nl' ? 'Document-reconstructie gecoördineerd door Marc Deforce, met medewerking van Agnes Scamps, raphaelle, graffit en Johan Claus.' : 
                           language === 'fr' ? 'Reconstruction du document coordonnée par Marc Deforce, avec la collaboration de Agnes Scamps, raphaelle, graffit et Johan Claus.' : 
                           'Document reconstruction coordinated by Marc Deforce, with collaboration from Agnes Scamps, raphaelle, graffit and Johan Claus.'}
                        </p>
                      </figcaption>
                    </figure>
                    
                    {/* Pagina 2 - Eerste pagina met transcriptie */}
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={huwelijkscontractPagina2} 
                        alt={language === 'nl' ? 'Eerste pagina huwelijkscontract met transcriptie' : 
                             language === 'fr' ? 'Première page du contrat de mariage avec transcription' : 
                             'First page of marriage contract with transcription'}
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'nl' ? '1ère page — Comparutie van de partijen' : 
                           language === 'fr' ? '1ère page — Comparution des parties' : 
                           '1st page — Appearance of the parties'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'nl' ? 'Links: origineel handschrift — Rechts: transcriptie met annotaties' : 
                           language === 'fr' ? 'Gauche: manuscrit original — Droite: transcription avec annotations' : 
                           'Left: original manuscript — Right: transcription with annotations'}
                        </p>
                      </figcaption>
                    </figure>
                    
                    {/* Pagina 3 - Tweede pagina met transcriptie */}
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={huwelijkscontractPagina3} 
                        alt={language === 'nl' ? 'Tweede pagina huwelijkscontract met transcriptie' : 
                             language === 'fr' ? 'Deuxième page du contrat de mariage avec transcription' : 
                             'Second page of marriage contract with transcription'}
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'nl' ? '2e page — Bruidsschat en bepalingen' : 
                           language === 'fr' ? '2e page — Dot et dispositions' : 
                           '2nd page — Dowry and provisions'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'nl' ? 'Links: origineel handschrift — Rechts: transcriptie met annotaties' : 
                           language === 'fr' ? 'Gauche: manuscrit original — Droite: transcription avec annotations' : 
                           'Left: original manuscript — Right: transcription with annotations'}
                        </p>
                      </figcaption>
                    </figure>
                    
                    {/* Pagina 4 - Derde pagina met transcriptie */}
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={huwelijkscontractPagina4} 
                        alt={language === 'nl' ? 'Derde pagina huwelijkscontract met transcriptie' : 
                             language === 'fr' ? 'Troisième page du contrat de mariage avec transcription' : 
                             'Third page of marriage contract with transcription'}
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'nl' ? '3e page — Voorwaarden bij overlijden' : 
                           language === 'fr' ? '3e page — Conditions en cas de décès' : 
                           '3rd page — Conditions in case of death'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'nl' ? 'Links: origineel handschrift — Rechts: transcriptie met annotaties' : 
                           language === 'fr' ? 'Gauche: manuscrit original — Droite: transcription avec annotations' : 
                           'Left: original manuscript — Right: transcription with annotations'}
                        </p>
                      </figcaption>
                    </figure>
                    
                    {/* Pagina 5 - Vierde pagina met handtekeningen */}
                    <figure className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={huwelijkscontractPagina5} 
                        alt={language === 'nl' ? 'Vierde pagina huwelijkscontract met handtekeningen' : 
                             language === 'fr' ? 'Quatrième page du contrat de mariage avec signatures' : 
                             'Fourth page of marriage contract with signatures'}
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === 'nl' ? '4e page — Handtekeningen en afsluiting' : 
                           language === 'fr' ? '4e page — Signatures et conclusion' : 
                           '4th page — Signatures and conclusion'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'nl' ? 'Links: origineel handschrift met handtekeningen — Rechts: transcriptie met annotaties' : 
                           language === 'fr' ? 'Gauche: manuscrit original avec signatures — Droite: transcription avec annotations' : 
                           'Left: original manuscript with signatures — Right: transcription with annotations'}
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2">{content.groomTitle}</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1">
                      {content.groomItems.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2">{content.brideTitle}</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1">
                      {content.brideItems.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-serif font-bold text-primary mb-2">{content.specialTitle}</h4>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    {content.specialItems.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  {content.contractEnd}
                </p>
              </div>

              {/* De aankomst in Izegem */}
              <div className="mb-12">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                  {t('stamouders.arrival')}
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                    <p>{content.arrivalP1}</p>
                    <p>{content.arrivalP2}</p>
                    <p>{content.arrivalP3}</p>
                  </div>
                  <div className="space-y-4">
                    <figure className="rounded-lg overflow-hidden shadow-card">
                      <img 
                        src={izegemKaart} 
                        alt={content.imgIzegemAlt} 
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-3 text-sm text-muted-foreground text-center">
                        {content.imgIzegemCaption}
                      </figcaption>
                    </figure>
                    <figure className="rounded-lg overflow-hidden shadow-card">
                      <img 
                        src={oudeKerk} 
                        alt={content.imgKerkAlt} 
                        className="w-full h-auto"
                      />
                      <figcaption className="bg-background p-3 text-sm text-muted-foreground text-center">
                        {content.imgKerkCaption}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>

              {/* Integratie */}
              <div className="p-8 bg-background rounded-lg shadow-card border border-border mb-12">
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  {t('stamouders.integration')}
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {content.integrationIntro}
                </p>
                <ul className="space-y-3 text-foreground/80">
                  {content.integrationItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-bold">•</span>
                      <span><strong>{item.name}</strong> {item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* De voorouderlijke lijn */}
              <div className="p-8 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
                  {t('stamouders.lineage')}
                </h3>
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    {content.lineageData.map((person, index) => (
                      <div key={person.name} className="flex flex-col items-center">
                        <div className="bg-background p-4 rounded-lg shadow-card border border-border w-full max-w-md text-center">
                          <p className="font-serif font-bold text-primary">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.years}</p>
                          <p className="text-xs text-accent">{person.place}</p>
                          <p className="text-xs text-muted-foreground italic mt-1">{person.note}</p>
                        </div>
                        {index < content.lineageData.length - 1 && (
                          <div className="w-0.5 h-6 bg-accent/50" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <ShareButton sectionId="stamouders" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Stamouders;
