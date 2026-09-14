import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Building2, Flame, TrendingUp, ShieldCheck } from "lucide-react";
import ReadMore from "@/components/ui/ReadMore";
import ShareButton from "@/components/ui/ShareButton";
import bevrijdingTank from "@/assets/bevrijding-tank-izegem-1944.jpg";
import verslagboekCover from "@/assets/verslagboek-pvba-cover.jpg";
import verslagboekJaarverslag from "@/assets/verslagboek-pvba-jaarverslag.jpg";
import dfMeubellabel from "@/assets/df-meubellabel.jpg";
import blauweOpel from "@/assets/blauwe-opel-1950.jpg";
import blauweOpelColor from "@/assets/blauwe-opel-1950-color.jpg";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import AiLabel from "@/components/ui/AiLabel";
import meubelbeurs from "@/assets/meubelbeurs-kleinmeubelen.jpg";
import brandSchade1 from "@/assets/brand-schade-1.jpg";
import meubelbeursColor from "@/assets/meubelbeurs-kleinmeubelen-color.jpg";
import brandSchade2 from "@/assets/brand-schade-2.jpg";
import brandSchade3 from "@/assets/brand-schade-3.jpg";
import brandSchade4 from "@/assets/brand-schade-4.jpg";
import brandSchade5 from "@/assets/brand-schade-5.jpg";
import brandKrant from "@/assets/brand-krant-standaard.jpg";
import werkhuizenstraat from "@/assets/werkhuizenstraat-gebouwen.jpg";
import werkhuizenstraatColor from "@/assets/werkhuizenstraat-gebouwen-color.jpg";
import bereniceBureau from "@/assets/berenice-bureau-1954.jpg";
import bereniceBureauColor from "@/assets/berenice-bureau-1954-color.jpg";
import bereniceKever from "@/assets/berenice-met-kever.jpg";
import bereniceKeverColor from "@/assets/berenice-met-kever-color.jpg";
import ieeRapport from "@/assets/iee-rapport-pagina.jpg";
import salonMeuble from "@/assets/salon-meuble-paris.jpg";
import salonMeubleColor from "@/assets/salon-meuble-paris-color.jpg";
import catalogusPrijslijst1 from "@/assets/catalogus-prijslijst-1.jpg";
import catalogusPrijslijst2 from "@/assets/catalogus-prijslijst-2.jpg";
import catalogusPrijslijst3 from "@/assets/catalogus-prijslijst-3.jpg";
import catalogusPrijslijst4 from "@/assets/catalogus-prijslijst-4.jpg";
import catalogusPrijslijst5 from "@/assets/catalogus-prijslijst-5.jpg";
import catalogusPrijslijst6 from "@/assets/catalogus-prijslijst-6.jpg";
import catalogusPrijslijst7 from "@/assets/catalogus-prijslijst-7.jpg";
import catalogusPrijslijst8 from "@/assets/catalogus-prijslijst-8.jpg";
import faillissementsverkoop from "@/assets/faillissementsverkoop.jpg";


const Familiebedrijf = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const readMoreLabel = language === 'en' ? 'Read more' : language === 'fr' ? 'Lire la suite' : language === 'sv' ? 'Läs mer' : 'Lees meer';
  const readLessLabel = language === 'en' ? 'Read less' : language === 'fr' ? 'Lire moins' : language === 'sv' ? 'Läs mindre' : 'Lees minder';

  const content = {
    nl: {
      sectionTitle: "Het familiebedrijf",
      subtitle: 'PVBA "Marcel Deforce & Zonen" (1945-1980)',
      eenmanszaakTitle: "Eénmanszaak wordt vennootschap",
      bevrijdingText: "Izegem werd bevrijd op 8 september 1944. Geallieerde pantserwagens reden de stad binnen vanuit de richting van Sint-Eloois-Winkel en maakten een einde aan de Duitse bezetting. De oorlog was daarmee niet voorbij, maar het gewone leven begon zich voorzichtig te herstellen. In de bevrijde gebieden werd opnieuw vooruitgedacht, plannen werden voorzichtig afgestoft, verwachtingen hernomen. Ook in het meubelatelier van Marcel Deforce begon die beweging. Zijn zonen werkten al mee; het atelier was al lang geen eenmanszaak meer in de dagelijkse praktijk, al bleef het juridisch zo bestaan.",
      zonenLeeftijden: "Begin 1945 stonden de zonen op een kruispunt van leeftijden en verantwoordelijkheden: Georges werd 24, André 19, Daniël 18 en Lucien 16. Hun samenwerking vroeg om een formelere structuur. Die werd gevonden in het statuut van een PVBA (Personenvennootschap met Beperkte Aansprakelijkheid) — een rechtsvorm die pas sinds 1935 bestond. De oprichtingsakte werd geregistreerd op 5 juni 1945, enkele weken na de wapenstilstand van 8 mei en het definitieve einde van de oorlog.",
      tankCaption: "Een typische straatscène bij de bevrijding van Izegem in september 1944. De mensen poseren op een stukgeschoten tank.",
      tankDetail: "Links vooraan: Georges Deforce. Boven in het midden (met halsdoek): Simonne Vandeputte.",
      verslagenboekCaption: "Het verslagenboek van de nieuwe PVBA, en het eerste jaarverslag, in het typische kriebel-handschrift van Georges.",
      patriarchText: "De vorm veranderde, de verhoudingen nauwelijks. Marcel bleef de patriarch, de beslisser, de man bij wie uiteindelijk alles samenkwam. In de praktijk bleef hij handelen alsof het atelier zijn persoonlijke verlengstuk was. Dat blijkt ook uit het eerste jaarverslag van 4 maart 1946: van de 250 aandelen bezat hij er 244, in onverdeeldheid met zijn echtgenote Madeleine. Zoon Georges en dochter Maria hadden elk drie aandelen. De vennootschap was formeel correct — drie aandeelhouders waren wettelijk vereist — maar inhoudelijk bleef ze een pro-forma constructie.",
      vennotenText: "Aanvankelijk werd van de meewerkende broers alleen Georges vennoot, met het statuut van zelfstandige. De andere broers bleven als arbeiders ingeschreven. Pas op de Algemene Vergadering van 7 maart 1949 werden ook André en Daniël vennoten. Lucien zou maar tijdelijk meewerken om daarna een opleiding Technisch Ingenieur te gaan volgen in Oostende. Hij werd geen partner in de firma; zijn loopbaan zou zich elders afspelen.",
      verloningText: "Hun verloning bleef beperkt. Marcel koos resoluut voor herinvestering: het bedrijf moest veiliggesteld worden, reserves opgebouwd. Dat beleid ging gepaard met spanningen. De communicatie tussen vader en zonen verliep stroef; ook onder de broers zelf groeide weinig openheid.",
      georgesUitstapText: "Die situatie verhardde nog toen Georges — met instemming van zijn vader — uit de vennootschap stapte en zich liet inschrijven als bediende. Met een groeiend gezin bood dat statuut toegang tot kinderbijslag, die voor zelfstandigen in die tijd nauwelijks iets voorstelde. Voor zijn broers voelde het als een ongelijkheid die moeilijk te verteren was.",
      naijverText: "Naijver en wrevel nestelden zich dieper. Als opgroeiende puber ving ik flarden op. Gesprekken die plots stilvielen, halve zinnen, verhitte stemmen achter gesloten deuren. Het ging over jaloezie, over de verdeling van inkomsten — ook en vooral van de zwarte inkomsten — over taakverdeling, over erkenning. Het waren woorden die niet voor kinderoren bedoeld waren, maar die zich toch vastzetten.",
      labelCaption: "Elk te leveren meubel werd voorzien van dit label met productnummer en kleurcode",
      // Groei
      groeiTitle: "Groei en expansie",
      groeiText1: "Tóch was er niet alleen spanning. De jaren na de oorlog brachten ook groei. De economie trok aan, het werk nam toe. Het atelier werd uitgebreid, deels door aankoop, deels door huur van aanpalende percelen in de Werkhuizenstraat.",
      groeiText2: "Marcel sprak in die jaren soms met weemoed. Het handgesculpteerde werk, het ambacht dat hij had geleerd en verfijnd, moest plaatsmaken voor meer machinaal seriewerk. De volumes werden groter, het klantenbestand breidde zich uit. Leveringen konden niet langer te voet met de stootkar. Eerst volstond een blauwe Opel personenwagen met bagagedrager voor het wegbrengen van kleinere meubels, daarna een witte Volkswagen Kever. Maar rond 1954 werd een Volkswagen-camionette aangekocht met een stevige bagagedrager. Zo konden nu ook grotere meubelstukken vervoerd worden en kon er stilaan een kliënteel worden opgebouwd in een veel ruimere regio. In de vroege jaren zestig zou daar nog een grotere vrachtwagen bij komen. Naarmate de meubelproductie werd opgeschaald werden ook de leveringsritten frequenter en werd er een extra werknemer aangeworven als vaste chauffeur.",
      opelCaption: "De blauwe Opel, de eerste auto waarmee leveringen werden gedaan. Hier: een zondagse uitstap in 1950 naar Veurne, Marcel met zijn broer Cyrille. In de auto: Félice, toen 15 j.",
      aanbodText: "Het aanbod groeide mee en werd diverser. Naast de klassieke kleinmeubelen zoals salontafeltjes, plantenstaanders, kapstokken enz. werd het gamma geleidelijk aan uitgebreid met een serie dressoirs, wandkasten, complete eetkamers en slaapkamers. Dat alles kon besteld worden in verschillende afwerking: donker of bleek vernist, wit craquelé, traditionele gesculpteerde Louis XV-stijl of de meer sobere en massiever ogende 'vlaamse stijl'.",
      bereniceBureauCaption: "Bérénice Deforce aan haar bureau in het kantoor van de meubelmakerij, ca. 1954.",
      bereniceKeverCaption: "Bérénice Deforce met de Volkswagen Kever (nummerplaat T.3661) in de Werkhuizenstraat te Izegem. Op de achtergrond: een Pearl Limonaden-vrachtwagen.",
      bereniceText: "Na afronding van haar humaniora-studies aan het 'Institut La Vallée Bailly' in Braine l'Alleud in juli 1951 kwam ook zus Bérénice meewerken in de zaak. Ze deed vooral bureauwerk, maar was ook een gretig chauffeur om leveringen te doen. Zo leerde ze Max Autier kennen, wiens ouders een meubelzaak hadden in Naast (Soignies). In september 1955 zou ze met hem trouwen en verhuisde ze naar Naast.",
      verkoopText: "De verkoop bleef stijgen. Jaarlijkse deelname aan de Meubelbeurs op de Heizel in Brussel werd een vaste waarde. Daardoor groeide een klantenbestand over heel België en later ook in het noorden van Frankrijk, tot in Normandië. Drie freelance vertegenwoordigers, betaald op commissiebasis, onderhielden tussentijds de commerciële contacten en zorgden voor een constante stroom bestellingen. Typisch voor het groeiverhaal: bij momenten noteerden die vertegenwoordigers meer bestellingen dan de productie aankon. Zij waren immers gemotiveerd om zoveel mogelijk commissie op te strijken. Voor de klanten betekende dat dan dikwijls onaangenaam verlengde leveringstermijnen.",
      taakverdelingText: "Geleidelijk kregen de zonen meer zeggenschap. Er ontstond een functionele taakverdeling: Georges nam verkoop, leveringen en een deel van de administratie op zich; André werd verantwoordelijk voor de productie en tekende, vanuit zijn artistieke aanleg, nieuwe modellen; Daniël leidde de afwerking en vooral de vernisafdeling.",
      beursCaption: "In de vroegste deelnames aan de jaarlijkse Meubelbeurs werden alleen kleinmeubelen tentoongesteld.",
      // Brand
      brandTitle: "Brand!",
      brandText1: "Vrijdag 11 december 1963 begon als een gewone schooldag. Ik was bijna zeventien en zat in de Poësis-klas — het voorlaatste jaar Latijn-Grieks. In de loop van de voormiddag viel in het College de elektriciteit uit. Er ontstond onrust toen we door het raam een grote zwarte rookkolom zagen opstijgen, nauwelijks honderd meter van de school vandaan. Na tien minuten, misschien een kwartier, kwam het licht terug. De leraar probeerde de les te hervatten. Toen werd er op de deur geklopt. Ik werd uit de klas gehaald. Op de gang kwam ik mijn broer Luc tegen, ook hij was weggehaald. Er was iets gebeurd, zei men voorzichtig. We mochten gaan kijken.",
      brandText2: "De rook kwam van de brand die het familie-meubelbedrijf verwoestte. Wie ons meenam — vader, oom, iemand anders — weet ik niet meer. Enkele minuten later stonden we op de Van Den Bogaerdelaan, voor de grote garagepoort van de firma. Achterin lag het atelier: ingestort, uitgebrand, onherkenbaar. Het vroor streng. Wat me het meest is bijgebleven zijn de ijspegels: bevroren bluswater dat als stalactieten aan balken en muren hing. Toen enkele dagen later foto's werden genomen om de schade op te meten, lag alles onder een dikke laag sneeuw.",
      brandText3: "De oorzaak van de brand werd nooit officieel vastgesteld. Men vermoedde een kortsluiting of vonk in de vernisafdeling, waar door het spuitvernissen voortdurend een brandbare nevel hing. De bovenverdieping, grotendeels in hout opgetrokken, werd volledig vernield. De meeste bakstenen zijmuren bleven overeind. De machinezaal had een betonnen plafond; de meeste machines bleven gespaard. Op donderdag 17 januari 1964 zou in de Heizelpaleizen de 26ste Meubelbeurs van Brussel openen. De volledige voorraad meubelen die klaarstond voor de beurs — opgepoetst, verpakt — was verloren gegaan.",
      brandText4: "Grootvader Marcel had de brand vanuit zijn woonkamer van nabij gezien. Hij raakte in paniek, vreesde dat de brand het woonhuis zou bereiken. Hij was fysiek en mentaal compleet ontredderd. De klap was zwaar en hij zou van dat trauma niet meer herstellen. Minder dan een jaar later overleed hij.",
      brandSchadeCaption: "Enkele foto's die werden gemaakt om de schade te overzien, als bewijsmateriaal voor de verzekering.",
      brandKrantCaption: "Nieuwsbericht in De Standaard van 12-13 januari 1963",
      // Veerkracht
      veerkrachtTitle: "Veerkracht na het vuur",
      veerkrachtText1: "De ravage was groot, maar niet totaal. Het woonhuis bleef gespaard, afgescheiden van het atelier door een binnentuin van ongeveer vijftien meter. De brandweer had een groot deel van het kantoor kunnen ontruimen: boekhouding en administratieve documenten waren gered, net als het reclame-drukwerk voor de komende meubelbeurs.",
      herstelText: "Over het herstel zelf is weinig documentatie bewaard gebleven. Begrijpelijk. In die fase ging het om handelen, niet om archiveren. Puin ruimen, daken herstellen. De broers Deforce voerden, samen met hun arbeiders, veel herstellingswerken zelf uit. De arbeiders werden tussendoor ook tijdelijk werkloos gesteld — een noodzakelijke kostenbesparing. De verzekering vergoedde het grootste deel van de schade, inclusief een deel van het omzetverlies. De uitbetaling vergde tijd en dekte niet alles, maar bood wel ademruimte. Dat hielp toch duidelijk het trauma verzachten voor de gezinnen die van het bedrijf moesten leven. In mijn persoonlijke herinnering liep het dagelijks leven in ons gezin gewoon door, zonder veel weerslag van het drama dat zich had afgespeeld.",
      veerkrachtText2: "De machinezaal werd afgescheiden van het puin en kon relatief snel opnieuw functioneren. De houtvoorraad was intact gebleven: die lag gestapeld op een terrein op de hoek van de Meibloemstraat en Meensestraat, op zo'n 150 meter van het afgebrande atelier. Er was dus materiaal beschikbaar om mee te werken.",
      veerkrachtText3: "De deelname aan de Brusselse Meubelbeurs — amper een week na de brand — ging gewoon door, zij het met geïmproviseerde middelen. Om de expostand in te vullen werden meubelen geleend uit de toonzalen van klanten en zelfs enkele meubelen van de eigen huiskamer meegenomen. Samen met het uit de brand geredde reclamedrukwerken kon er dus toch ge-exposeerd en verkocht worden. Het zo recente nieuws van de brandramp bracht ook veel sympathie van klanten en van collega-fabrikanten met zich mee. Een deel van de heropstartende productie werd zelfs in onderaanneming bij enkele van die collega's geplaatst.",
      veerkrachtText4: "De brand werd geen breuklijn. Wat overeind bleef, was het vakmanschap. Gebouwen en machines konden verloren gaan; kennis, ervaring en reputatie niet. In een sector waar vertrouwen en kwaliteit cruciaal waren, vormde dat menselijke kapitaal de basis voor een nieuwe start.",
      marktText: "Ook de economische context speelde mee. De markt bleef bestaan. De firma had zich al vóór 1963 buiten het lokale afzetgebied gepositioneerd. Dat netwerk verdween niet in de vlammen. De vraag naar kwaliteitsmeubilair bleef groot, in een periode van economische groei en woningbouw. Zo kon de firma, eenmaal de ergste schade verwerkt, opnieuw aanknopen bij een markt die vooruit wilde — en niet bleef stilstaan bij wat verloren was gegaan.",
      // Erfenisverdeling
      erfenisTitle: "De erfenisverdeling en reorganisatie van het bedrijf",
      erfenisText1: "Het plotse overlijden van Marcel Deforce in december 1963 betekende voor heel de familie opnieuw een behoorlijk traumatische gebeurtenis. En er was niet alleen de rouw om de persoon: hij had namelijk geen testament opgemaakt. Bij leven had hij weliswaar mondeling en bij herhaling uitgesproken dat hij het maar normaal vond dat zijn meewerkende zonen het bedrijf zouden verderzetten. Zij hadden immers niet lang kunnen studeren, waren jong moeten beginnen werken om het inkomen van het gezin te helpen opbouwen. Zij financierden dus mee de opvoeding van hun jongere broers en zussen, die daardoor de kans kregen hun eigen weg in het leven te kunnen bepalen. De firmanaam was trouwens ondubbelzinnig gekozen \"Marcel Deforce & Zonen\".",
      erfenisText2: "De afwezigheid van een testament liet wettelijk slechts één mogelijke optie toe: een gelijke verdeling van de hele erfenis over de erfgenamen: alle zonen en dochters gelijk; rekening houdend met het bevoorrechte deel voor de weduwe. Dat bracht natuurlijk een hoop heibel met zich mee. Er groeide onmin en ruzie in de familie, want het zag er naar uit dat het meubelbedrijf nog vele jaren zou gehypothekeerd worden door alle financiële baten te moeten aanwenden om alle rechthebbenden hun deel te kunnen uitbetalen. Het alternatief zou erin bestaan hebben, het bedrijf met inbegrip van het vastgoed te verkopen en zo de geldmiddelen te verdelen, maar dan waren de drie zonen die in het bedrijf werkten hun werk en hun hele toekomst kwijt.",
      erfenisText3: "Als eerste stap werd reeds op 29 december een 'Buitengewone Algemene Vergadering' van de PVBA gehouden. In het Verslagenboek vinden we een vrij ingewikkelde herverdeling van de aandelen terug. Maar de impasse bleef: er was geen werkbare regeling voor de toekomst waar alle betrokkenen konden achterstaan.",
      erfenisText4: "Mijn vader, Georges, was binnen de firma degene die de meeste externe contacten had. Hij vond een manier om de impasse te doorbreken. Door zijn connecties met de middenstandsorganisatie NCMV werd een extern consultants-bureau aangesteld met een dubbele opdracht. Eerste prioriteit was het opstellen van een ontwerp van overeenkomst voor de erfenisverdeling, op een manier die zou toelaten dat het meubelbedrijf verder bleef bestaan.",
      erfenisText5: "Het tweede deel van de opdracht was een doorlichting en efficiëntie-studie van de meubelfabriek, om de toekomst optimaal veilig te stellen. De wederopbouw na de brand was immers nog niet voltooid.",
      erfenisText6: "Op 17 maart 1964 reeds werd een overeenkomst afgesloten met de firma \"Installation Efficiency Engineering\" (Düsseldorf, Rotterdam, Brussel, Wien, Barcelona).",
      ieeCaption: "Eén van de ca 80 pagina's van het IEE rapport",
      erfenisOvereenkomst1: "Alle niet-meewerkende erfgenamen verkochten hun aandelen aan de PVBA, en moeder Madeleine zag af van onmiddellijke inning van de haar toekomende geldmiddelen.",
      erfenisOvereenkomst2: "De eigendom van het woonhuis werd overgedragen aan de PVBA, mits levenslang vruchtgebruik voor Madeleine.",
      erfenisOvereenkomst3: "Er werd daarnaast een aparte overeenkomst opgesteld voor de terugbetaling in termijnen i.v.m. de aandelenverkoop en de verdeling van de liquide middelen aan alle gerechtigden.",
      erfenisDoorlichting: "Het bedrijf werd in de weken daarna door de consultants volledig doorgelicht op basis van een studie van accountant Guido Verhaeghe uit Roeselare, die de financiële toestand per 31/12/1963 analyseerde. Het resultaat was een uitvoerig rapport over prijscalculatie, kostenanalyse, financieel beheer, boekhouding met een uitgekiend rekeningschema en een nieuw in te voeren systeem van \"doorschrijfboekhouding\", productie-organisatie, lay-out van de fabriek met herplaatsing van alle machines om een efficiënte work flow mogelijk te maken.",
      erfenisVeranderingen: "De bedrijfsgebouwen ondergingen een radicale verandering, vloerniveaus werden aangepast, machines werden herschikt, er verschenen veiligheidsmaatregelen, nooduitgangen werden voorzien, de goederenstroom werd in een logische volgorde gerangschikt, er kwamen afzuigtoestellen om houtschaveling te verzamelen en om de stof- en vernisnevels af te voeren, de vernis-afdeling werd veilig afgeschermd, enzovoort. Kortom: de aanbevelingen van de IEE-consultants werden ter harte genomen en grondig geïmplementeerd.",
      erfenisKantoor: "Het bedrijfskantoor verhuisde naar een nieuwbouw in de achtertuin van het aanpalende huis van nonkel André en tante Francine. Ook daar waren de veranderingen duidelijk.",
      erfenisJobstudent: "Als ik vandaag dat rapport nog eens nalees, herken ik de vele veranderingen die ik destijds nog heb zien gebeuren. Want tussen 1964 en 1969 werkte ik (on)regelmatig in de schoolvakanties als jobstudent mee in het bedrijf: kleine klusjes, boodschappen doen, meereiden met de camion of camionette als \"convoyeur\", laden en lossen van de meubelen...",
      erfenisFrancine: "Bij periodes hielp ik Francine in het bureau en hielp bij het invoeren van de nieuwe boekhouding en het toepassen van de nieuwe administratieve maatregelen die de consultants hadden voorgesteld.",
      erfenisAnecdote: "Anecdote: Eén van de meer nederige karweien die me werden toevertrouwd was naar het postkantoor gaan om 'fiscale zegels' te kopen. Toch een verantwoordelijke taak, want ik kreeg daartoe veel cash mee. Er was toen immers nog geen BTW (in België pas ingevoerd in 1971). Er was de \"overdrachtstaks\". De verschuldigde 6% belasting op verkopen werd gedaan door het aanbrengen van een fiscaal zegel: de zegel diende te worden doorgeknipt, de helft ervan werd gekleefd op het origineel van de verkoopfactuur (bestemd voor de klant), de andere helft op een carbon-kopie, als bewijs te bewaren in een verkoopfacturen-klassement. Die zegels moesten ook met een krabbel, een paraaf of handtekening \"ontwaard\" worden. Die taks werd mee aangerekend aan de klant, en verhoogde dus de verkoopprijs; hij was niet aftrekbaar zoals later de BTW. Vele uren heb ik gespendeerd aan dat kleven van takszegels...",
      // Gouden jaren 60
      goudenJarenTitle: "De gouden jaren '60",
      goudenJarenText1: "De \"Golden Sixties\" verwijst naar de periode van ongeveer 1958 tot 1973, waarin België een uitzonderlijke economische groei en welvaartstoename kende. Dit betekende een tijd van snelle industrialisering, hoge productiviteit en bijna volledige tewerkstelling. De lonen stegen, de koopkracht nam sterk toe en steeds meer gezinnen konden zich duurzame consumptiegoederen veroorloven zoals een auto, koelkast, televisie of wasmachine. De woningbouw bloeide en het eigen huis werd voor brede lagen van de bevolking haalbaar. Tegelijk breidde de welvaartsstaat zich uit: betere sociale zekerheid, pensioenen, gezondheidszorg en onderwijs. Grote infrastructuurprojecten (autosnelwegen, havens, Expo 58) versterkten het optimisme.",
      goudenJarenText2: "Dat alles was uitstekend nieuws voor de meubelnijverheid, die enorm profiteerde van de heersende consumptiedrang. Het toeval, het lot? wilde dat de brandramp en noodzaak tot reorganisatie van de meubelfabriek eigenlijk toesloeg op het 'best mogelijke moment'. 1963 was een topjaar voor de Belgische meubelindustrie. Op de meubelbeurs waren er meer dan 300 exposanten. Terwijl de beursvloer in 1963 nog gedomineerd werd door de klassieke \"Vlaamse Eik\", was er dat jaar veel ophef over de zogenoemde \"scandinavische lijn\" — lichtere houtsoorten zoals teak en slankere poten — die definitief doorbrak bij het grotere publiek.",
      goudenJarenText3: "De jaarlijkse meubelbeurs werd een vaste waarde. In die deelname werd flink geïnvesteerd want daar werden grote hoeveelheden orders genoteerd die maandenlang voor productie zorgden. Het was dé plek om nieuwe klanten aan te trekken, uit binnen- en buitenland: meer en meer werd er verkocht in Frankrijk. Enkele keren, zoals bvb in 1967 en in 1975 zouden ze om hun Franse kliënteel uit te breiden zelfs deelnemen aan de Salon International du Meuble in Parijs, in het Parc des Expositions, Porte de Versailles.",
      goudenJarenText4: "Die investering in expo-deelnames gold enerzijds voor het huren van een vrij grote standruimte die elegant werd ingericht en — zoals toen nog de normaalste zaak van de wereld was — voorzien van een ruime voorraad drank en sigaretten om de klanten mee te verwennen.",
      salonCaption: "Salon International du Meuble. Paris. 1975.",
      goudenJarenReclame: "Anderzijds werd geleidelijk aan meer aandacht besteed aan het reclamedrukwerk. Vandaag vinden we het normaal om op onze PC of laptop zelf onze teksten en foto's tot leuke documenten en reclamedrukwerk om te toveren. Vóór het computertijdperk lag het wat moeilijker. Wilde men snel zelf iets produceren, bv. een prijslijst, dan werd dit met de schrijfmachine gedaan. Een heel karwei, want tikfouten en slordigheden of mislukte bladschikking herstellen kon soms alleen maar goedkomen door helemaal opnieuw te beginnen. Het vermenigvuldigen gebeurde met de stencil-machine. Het alternatief was naar de drukker stappen om professioneel uitziend drukwerk te bestellen.",
      goudenJarenArtex: "Onder druk van grotere concurrenten die iedereen begonnen te overtroeven met luxueus kleurendrukwerk, konden ook de kleinere bedrijven niet achterblijven. De firma Deforce deed daartoe een beroep op het reclamebureau Artex van Jef Pattyn (1930–2006), een vriend van mijn vader Georges, die zijn bedrijf oorspronkelijk in 1958 als een zeefdrukkerij had opgericht. In 1967 maakte hij de cruciale sprong naar een \"full-service\" reclamebureau, inclusief eigen ontwerpstudio en drukkerij. Het bureau is nog steeds een gevestigde waarde in Izegem, inmiddels onder leiding van de volgende generatie.",
      // Succes en verval
      succesTitle: "Succes en verval liggen dicht bij elkaar",
      succesText1: "De zaken gingen uitstekend, de verkoop liep vlot, het geld kwam binnen. Mijn ouders moesten stilaan minder krampachtig-zuinig met het huishoudbudget omgaan bij het grootbrengen van hun negen kinderen. Naar het einde van de jaren '60 toe konden ze zich zelfs regelmatig een buitenlandse reis of een cruise permitteren, ter vervanging van de vroegere zondagse daguitstappen naar de kust met de camionette van de firma.",
      catalogusCaption: "Kleurig reclamedrukwerk, alleen voor grote klanten, afgewisseld met gestencilde prijslijsten",
      succesText2: "Grote luxe is er nooit geweest, maar ze werden redelijk welgesteld. Ze bewogen zich met veel voldoening in kringen van de Izegemse middenstand.",
      succesText3: "De succesperiode van de firma duurde echter slechts een tiental jaar. Het toppunt van de hele Izegemse meubelsector was in de jaren '70 al gauw voorbij. Een eerste teken aan de wand was het faillissement van de grote meubelfabriek Rousseau in 1972. Dat faillissement was een belangrijke gebeurtenis in de lokale meubelbranche en veroorzaakte destijds veel onrust in de stad. Er kwam stilaan veel meer buitenlandse concurrentie; de export naar Frankrijk slabakte, grootschalige producenten konden meer kwaliteit leveren tegen een lagere prijs. Grondstoffen werden duurder, de mode evolueerde sneller dan men kon volgen, de familiale structuur van het bedrijf werd een handicap: ze hadden met hard werk en vakkennis als meubelmakers het bedrijf grootgebracht, maar hadden niet de management-capaciteiten die broodnodig waren om te kunnen blijven bestaan in een krimpende conjunctuur. De Golden Sixties eindigden abrupt met de oliecrisis van 1973, die een einde maakte aan de langdurige economische voorspoed.",
      succesText4: "De remedies om aan de teruggang weerstand te bieden waren — in theorie — gekend: meer investeren en minder potverteren, meer specialiseren, verkoop en productie toespitsen op de sterkst presterende artikelen in de plaats van altijd een breed gamma te willen aanbieden. Efficiënter en grootschaliger produceren. Professioneler management. Desnoods een fusie aangaan met concullega's om samen te overleven in de plaats van elk apart ten onder te gaan...",
      eindeTitle: "Het verhaal loopt ten einde in februari 1980",
      eindeText1: "Ze aarzelden te lang om daadkrachtig in te grijpen. Bij gebrek aan professionele management-vaardigheden steunden ze bijna uitsluitend op hun vakkennis, ervaring en werkkracht. Zoals zoveel van hun collega's in de sector leidde hun koppig West-Vlaams karakter ertoe dat ze op de tanden beten, harder werkten en elk op hun eigen manier ten onder gingen.",
      eindeText2: "Mijn vader, Georges, had intussen in 1972 afstand gedaan van zijn bediendenstatuut en was opnieuw aandeelhouder en zaakvoerder geworden. Maar hij werd ziek en moest in 1978 om gezondheidsredenen ontslag nemen. Hij werd permanent op ziekteverlof gesteld. Na een leven lang te veel gerookt te hebben kreeg hij long-emfyseem en later nog kanker erbij. Al die jaren in een meubelfabriek werken, waar de lucht constant verzadigd was van houtstof, van lijm- en vernisdampen deden daar ook geen deugd aan gedaan.",
      eindeText3: "De overblijvende zaakvoerders, de broers André en Daniel hielden de boot nog een paar jaar drijvende maar op 29 februari 1980 werd noodgedwongen het faillissement van de firma aangevraagd.",
      eindeText4: "De afwikkeling van het faillissement bracht nog heel wat verwikkelingen mee. Na de openbare verkoop van alle activa in december 1980 kwam de Bank van Roeselare & West-Vlaanderen in juni 1981 nog met een vordering per aangetekende brief, voor een bedrag van 245.526 F, op basis van een borgstelling die de drie broers, Georges, André en Daniel in 1964 als een onderdeel bij de afwikkeling van de erfenis van hun vader hadden ondertekend..."
    },
    en: {
      sectionTitle: "The Family Business",
      subtitle: 'PVBA "Marcel Deforce & Sons" (1945-1980)',
      eenmanszaakTitle: "Sole proprietorship becomes a company",
      bevrijdingText: "Izegem was liberated on September 8, 1944. Allied armored vehicles entered the city from the direction of Sint-Eloois-Winkel and put an end to the German occupation. The war was not over, but normal life cautiously began to recover. In the liberated areas, people started thinking ahead again, plans were cautiously dusted off, expectations resumed. This movement also began in Marcel Deforce's furniture workshop. His sons were already working alongside him; the workshop had long ceased to be a sole proprietorship in daily practice, though it remained so legally.",
      zonenLeeftijden: "At the beginning of 1945, the sons were at a crossroads of ages and responsibilities: Georges turned 24, André 19, Daniël 18 and Lucien 16. Their collaboration called for a more formal structure. This was found in the status of a PVBA (Limited Liability Partnership) — a legal form that had only existed since 1935. The founding deed was registered on June 5, 1945, a few weeks after the armistice of May 8 and the definitive end of the war.",
      tankCaption: "A typical street scene during the liberation of Izegem in September 1944. People pose on a destroyed tank.",
      tankDetail: "Front left: Georges Deforce. Top center (with neckerchief): Simonne Vandeputte.",
      verslagenboekCaption: "The minute book of the new PVBA, and the first annual report, in Georges' typical scrawling handwriting.",
      patriarchText: "The form changed, the relationships barely. Marcel remained the patriarch, the decision-maker, the man where everything ultimately came together. In practice, he continued to act as if the workshop were his personal extension. This is also evident from the first annual report of March 4, 1946: of the 250 shares, he owned 244, in joint ownership with his wife Madeleine. Son Georges and daughter Maria each had three shares. The company was formally correct — three shareholders were legally required — but in substance it remained a pro-forma construction.",
      vennotenText: "Initially, only Georges of the working brothers became a partner, with the status of self-employed. The other brothers remained registered as workers. It was not until the General Meeting of March 7, 1949 that André and Daniël also became partners. Lucien would only work temporarily before pursuing a Technical Engineer education in Ostend. He did not become a partner in the firm; his career would unfold elsewhere.",
      verloningText: "Their remuneration remained limited. Marcel resolutely chose reinvestment: the business had to be secured, reserves built up. This policy was accompanied by tensions. Communication between father and sons was strained; among the brothers themselves, little openness developed.",
      georgesUitstapText: "The situation hardened further when Georges — with his father's consent — stepped out of the partnership and had himself registered as an employee. With a growing family, this status provided access to child benefits, which for the self-employed at that time amounted to practically nothing. For his brothers, it felt like an inequality that was hard to digest.",
      naijverText: "Jealousy and resentment nestled deeper. As a growing teenager, I caught fragments. Conversations that suddenly fell silent, half sentences, heated voices behind closed doors. It was about jealousy, about the distribution of income — especially the undeclared income — about task division, about recognition. These were words not meant for children's ears, but that stuck nonetheless.",
      labelCaption: "Each piece of furniture to be delivered was provided with this label with product number and color code",
      groeiTitle: "Growth and expansion",
      groeiText1: "Yet there was not only tension. The post-war years also brought growth. The economy picked up, work increased. The workshop was expanded, partly through purchase, partly through rental of adjacent plots on Werkhuizenstraat.",
      groeiText2: "Marcel sometimes spoke with nostalgia in those years. The hand-sculpted work, the craft he had learned and refined, had to make way for more mechanical serial production. Volumes grew, the customer base expanded. Deliveries could no longer be done on foot with the pushcart. First a blue Opel car with luggage rack sufficed for transporting smaller furniture, then a white Volkswagen Beetle. Around 1954, a Volkswagen van with a sturdy luggage rack was purchased. This allowed larger furniture pieces to be transported and a clientele to be gradually built up in a much wider region. In the early sixties, a larger truck would be added. As furniture production scaled up, delivery runs became more frequent and an additional employee was hired as a permanent driver.",
      opelCaption: "The blue Opel, the first car used for deliveries. Here: a Sunday outing in 1950 to Veurne, Marcel with his brother Cyrille. In the car: Félice, then 15 years old.",
      aanbodText: "The product range grew and became more diverse. Alongside the classic small furniture such as coffee tables, plant stands, coat racks etc., the range was gradually expanded with a series of sideboards, wall cabinets, complete dining rooms and bedrooms. All could be ordered in different finishes: dark or light varnished, white craquelé, traditional sculpted Louis XV style or the more sober and massive-looking 'Flemish style'.",
      bereniceBureauCaption: "Bérénice Deforce at her desk in the furniture workshop office, ca. 1954.",
      bereniceKeverCaption: "Bérénice Deforce with the Volkswagen Beetle (license plate T.3661) in Werkhuizenstraat, Izegem. In the background: a Pearl Lemonade truck.",
      bereniceText: "After completing her secondary education at the 'Institut La Vallée Bailly' in Braine l'Alleud in July 1951, sister Bérénice also joined the business. She mainly did office work but was also an eager driver for deliveries. This is how she met Max Autier, whose parents had a furniture shop in Naast (Soignies). In September 1955 she married him and moved to Naast.",
      verkoopText: "Sales continued to rise. Annual participation in the Furniture Fair at the Heysel in Brussels became a fixture. This built a customer base across Belgium and later also in northern France, as far as Normandy. Three freelance representatives, paid on commission, maintained commercial contacts and ensured a constant stream of orders. Typical of the growth story: at times those representatives noted more orders than production could handle. They were motivated to earn as much commission as possible. For customers, this often meant unpleasantly extended delivery times.",
      taakverdelingText: "Gradually the sons gained more authority. A functional division of tasks emerged: Georges took on sales, deliveries and part of the administration; André became responsible for production and, drawing on his artistic talent, designed new models; Daniël led the finishing and especially the varnishing department.",
      beursCaption: "In the earliest participations at the annual Furniture Fair, only small furniture was exhibited.",
      brandTitle: "Fire!",
      brandText1: "Friday December 11, 1963 began as an ordinary school day. I was nearly seventeen and sat in the Poësis class — the penultimate year of Latin-Greek. During the morning, the electricity went out at the College. Unrest arose when through the window we saw a large black column of smoke rising, barely a hundred meters from the school. After ten minutes, perhaps a quarter of an hour, the lights came back on. The teacher tried to resume the lesson. Then there was a knock on the door. I was pulled from class. In the hallway I met my brother Luc, he too had been taken out. Something had happened, they said cautiously. We were allowed to go see.",
      brandText2: "The smoke came from the fire that destroyed the family furniture business. Who took us — father, uncle, someone else — I no longer remember. Minutes later we stood on Van Den Bogaerdelaan, in front of the large garage gate of the firm. At the back lay the workshop: collapsed, burned out, unrecognizable. It was freezing hard. What stayed with me most are the icicles: frozen extinguishing water hanging like stalactites from beams and walls. When photos were taken a few days later to assess the damage, everything lay under a thick layer of snow.",
      brandText3: "The cause of the fire was never officially established. A short circuit or spark in the varnishing department was suspected, where the spray varnishing constantly created a flammable mist. The upper floor, largely constructed of wood, was completely destroyed. Most brick side walls remained standing. The machine room had a concrete ceiling; most machines were spared. On Thursday January 17, 1964, the 26th Brussels Furniture Fair would open at the Heysel. The entire stock of furniture ready for the fair — polished, packed — was lost.",
      brandText4: "Grandfather Marcel had seen the fire from close by in his living room. He panicked, fearing the fire would reach the house. He was physically and mentally completely devastated. The blow was heavy and he would never recover from this trauma. Less than a year later, he passed away.",
      brandSchadeCaption: "Several photos taken to survey the damage, as evidence for the insurance.",
      brandKrantCaption: "News report in De Standaard, January 12-13, 1963",
      veerkrachtTitle: "Resilience after the fire",
      veerkrachtText1: "The devastation was great, but not total. The house was spared, separated from the workshop by an inner garden of about fifteen meters. The fire brigade had managed to evacuate a large part of the office: accounting and administrative documents were saved, as was the promotional printing for the upcoming furniture fair.",
      herstelText: "Little documentation of the recovery itself has survived. Understandably. In that phase it was about action, not archiving. Clearing rubble, repairing roofs. The Deforce brothers, together with their workers, carried out much of the repair work themselves. The workers were also temporarily laid off in between — a necessary cost saving. The insurance covered most of the damage, including part of the loss of turnover. The payout took time and didn't cover everything, but it provided breathing space. This clearly helped soften the trauma for the families who depended on the business. In my personal memory, daily life in our family just continued, without much impact from the drama that had unfolded.",
      veerkrachtText2: "The machine room was separated from the rubble and could function again relatively quickly. The wood supply had remained intact: it was stacked on a plot at the corner of Meibloemstraat and Meensestraat, some 150 meters from the burned workshop. There was thus material available to work with.",
      veerkrachtText3: "Participation in the Brussels Furniture Fair — barely a week after the fire — went ahead, albeit with improvised means. To fill the exhibition stand, furniture was borrowed from customers' showrooms and even some pieces from their own living room were taken along. Together with the promotional materials saved from the fire, exhibiting and selling was thus still possible. The recent news of the fire disaster also brought much sympathy from customers and fellow manufacturers. Part of the restarting production was even subcontracted to some of those colleagues.",
      veerkrachtText4: "The fire did not become a breaking point. What remained standing was the craftsmanship. Buildings and machines could be lost; knowledge, experience and reputation could not. In a sector where trust and quality were crucial, that human capital formed the basis for a new start.",
      marktText: "The economic context also played a role. The market continued to exist. The firm had already positioned itself beyond the local sales area before 1963. That network did not disappear in the flames. Demand for quality furniture remained strong, in a period of economic growth and housing construction. Thus the firm, once the worst damage was processed, could reconnect with a market that wanted to move forward — and did not dwell on what had been lost.",
      erfenisTitle: "The inheritance division and reorganization of the business",
      erfenisText1: "The sudden death of Marcel Deforce in December 1963 was once again a thoroughly traumatic event for the entire family. And it was not just the mourning for the person: he had not drawn up a will. During his lifetime he had repeatedly stated verbally that he considered it only normal that his working sons would continue the business. They had not been able to study for long, had to start working young to help build the family income. They thus co-financed the upbringing of their younger brothers and sisters. The company name was unambiguously chosen \"Marcel Deforce & Sons\".",
      erfenisText2: "The absence of a will legally left only one possible option: an equal division of the entire inheritance among the heirs: all sons and daughters equal; taking into account the privileged share for the widow. That naturally brought a lot of trouble. Discord and quarrels grew in the family, as it looked like the furniture business would be mortgaged for many years by having to use all financial proceeds to pay out all entitled parties their share. The alternative would have been to sell the business including the real estate and thus divide the funds, but then the three sons working in the business would have lost their work and their entire future.",
      erfenisText3: "As a first step, an 'Extraordinary General Meeting' of the PVBA was already held on December 29. In the Minutes Book we find a fairly complicated redistribution of shares. But the impasse remained: there was no workable arrangement for the future that all parties could support.",
      erfenisText4: "My father, Georges, was the one within the firm who had the most external contacts. He found a way to break the impasse. Through his connections with the middle-class organization NCMV, an external consulting firm was appointed with a dual assignment. First priority was drafting a settlement agreement for the inheritance division, in a way that would allow the furniture business to continue.",
      erfenisText5: "The second part of the assignment was an audit and efficiency study of the furniture factory, to optimally secure the future. The reconstruction after the fire was, after all, not yet completed.",
      erfenisText6: "As early as March 17, 1964, an agreement was concluded with the firm \"Installation Efficiency Engineering\" (Düsseldorf, Rotterdam, Brussels, Vienna, Barcelona).",
      ieeCaption: "One of the approximately 80 pages of the IEE report",
      erfenisOvereenkomst1: "All non-working heirs sold their shares to the PVBA, and mother Madeleine waived immediate collection of the funds due to her.",
      erfenisOvereenkomst2: "Ownership of the family home was transferred to the PVBA, with lifelong usufruct for Madeleine.",
      erfenisOvereenkomst3: "A separate agreement was also drawn up for the repayment in installments regarding the share sale and the distribution of liquid assets to all entitled parties.",
      erfenisDoorlichting: "In the following weeks, the consultants thoroughly audited the business based on a study by accountant Guido Verhaeghe from Roeselare, who analyzed the financial situation as of 31/12/1963. The result was an extensive report on price calculation, cost analysis, financial management, accounting with an ingenious chart of accounts and a new system of \"carbon copy accounting\", production organization, factory layout with relocation of all machines to enable an efficient workflow.",
      erfenisVeranderingen: "The business premises underwent a radical change: floor levels were adjusted, machines were rearranged, safety measures appeared, emergency exits were provided, the flow of goods was arranged in a logical sequence, extraction systems were installed to collect wood shavings and to remove dust and varnish mist, the varnishing department was safely shielded, and so on. In short: the recommendations of the IEE consultants were taken to heart and thoroughly implemented.",
      erfenisKantoor: "The business office moved to a new building in the backyard of the adjacent house of uncle André and aunt Francine. There too, the changes were clearly visible.",
      erfenisJobstudent: "When I reread that report today, I recognize the many changes I witnessed back then. Between 1964 and 1969 I worked (ir)regularly during school holidays as a student in the business: small jobs, running errands, riding along with the truck as a 'convoy', loading and unloading furniture...",
      erfenisFrancine: "At times I helped Francine in the office and assisted with implementing the new accounting and applying the new administrative measures the consultants had proposed.",
      erfenisAnecdote: "Anecdote: One of the more humble tasks entrusted to me was going to the post office to buy 'fiscal stamps'. Still a responsible task, as I was given a lot of cash for it. There was no VAT yet (only introduced in Belgium in 1971). There was the 'transfer tax'. The 6% tax due on sales was paid by affixing a fiscal stamp: the stamp had to be cut in half, one half was glued to the original sales invoice (for the customer), the other half to a carbon copy, to be kept as proof in a sales invoice file. Many hours I spent gluing those tax stamps...",
      goudenJarenTitle: "The Golden Sixties",
      goudenJarenText1: "The 'Golden Sixties' refers to the period from approximately 1958 to 1973, during which Belgium experienced exceptional economic growth and increasing prosperity. This was a time of rapid industrialization, high productivity and nearly full employment. Wages rose, purchasing power increased strongly and more and more families could afford durable consumer goods such as a car, refrigerator, television or washing machine.",
      goudenJarenText2: "All this was excellent news for the furniture industry, which enormously benefited from the prevailing consumer drive. Coincidence, fate? dictated that the fire disaster and need for reorganization of the furniture factory actually struck at the 'best possible moment'. 1963 was a peak year for the Belgian furniture industry. At the furniture fair there were more than 300 exhibitors. While the show floor in 1963 was still dominated by the classic 'Flemish Oak', that year there was much excitement about the so-called 'Scandinavian line' — lighter wood types like teak and slimmer legs — which definitively broke through with the wider public.",
      goudenJarenText3: "The annual furniture fair became a fixture. Participation was heavily invested in as large quantities of orders were noted there that provided months of production. It was the place to attract new customers, from home and abroad: more and more was sold in France. Several times, such as in 1967 and 1975, they would even participate in the Salon International du Meuble in Paris, at the Parc des Expositions, Porte de Versailles.",
      goudenJarenText4: "This investment in expo participation meant renting a fairly large, elegantly furnished exhibition space — and, as was perfectly normal at the time — stocked with ample supplies of drinks and cigarettes to pamper the customers.",
      salonCaption: "Salon International du Meuble. Paris. 1975.",
      goudenJarenReclame: "On the other hand, gradually more attention was paid to promotional printing. Today we find it normal to create attractive documents and advertising material on our PC or laptop. Before the computer age, things were more difficult. If you wanted to quickly produce something yourself, e.g. a price list, it was done with a typewriter. Quite an undertaking, as correcting typos or failed page layouts could sometimes only be fixed by starting all over again. Multiplication was done with a stencil machine.",
      goudenJarenArtex: "Under pressure from larger competitors who were outdoing everyone with luxurious color printing, smaller companies could not fall behind. The Deforce firm called upon the advertising agency Artex of Jef Pattyn (1930–2006), a friend of my father Georges, who had originally founded his business in 1958 as a silk-screen printing company. In 1967, he made the crucial leap to a 'full-service' advertising agency, including its own design studio and printing press. The agency is still an established name in Izegem, now led by the next generation.",
      succesTitle: "Success and decline are close neighbors",
      succesText1: "Business was excellent, sales ran smoothly, money came in. My parents gradually had to be less anxiously frugal with the household budget while raising their nine children. Towards the end of the '60s, they could even regularly afford a foreign trip or a cruise, replacing the former Sunday day trips to the coast with the van.",
      catalogusCaption: "Colorful promotional printing, only for major clients, alternated with stenciled price lists",
      succesText2: "There was never great luxury, but they became reasonably well-off. They moved with great satisfaction in circles of the Izegem middle class.",
      succesText3: "However, the success period of the firm lasted only about ten years. The peak of the entire Izegem furniture sector was already over by the 1970s. A first warning sign was the bankruptcy of the large furniture factory Rousseau in 1972. That bankruptcy was an important event in the local furniture industry and caused much unrest in the city at the time. Foreign competition gradually increased; exports to France faltered, large-scale producers could deliver more quality at a lower price. Raw materials became more expensive, fashion evolved faster than one could follow, the family structure of the business became a handicap: they had built the business with hard work and expertise as furniture makers, but lacked the management capabilities desperately needed to survive in a shrinking economy. The Golden Sixties ended abruptly with the oil crisis of 1973, which put an end to the long-lasting economic prosperity.",
      succesText4: "The remedies to resist the decline were — in theory — known: invest more and spend less, specialize more, focus sales and production on the best-performing items instead of always wanting to offer a broad range. Produce more efficiently and on a larger scale. More professional management. If necessary, merge with colleagues to survive together instead of each going under separately...",
      eindeTitle: "The story ends in February 1980",
      eindeText1: "They hesitated too long to intervene decisively. Lacking professional management skills, they relied almost exclusively on their craftsmanship, experience and work ethic. Like so many of their colleagues in the sector, their stubborn West Flemish character led them to grit their teeth, work harder and each go under in their own way.",
      eindeText2: "My father, Georges, had meanwhile in 1972 given up his employee status and had once again become a shareholder and manager. But he became ill and had to resign in 1978 for health reasons. He was permanently placed on sick leave. After a lifetime of smoking too much, he developed pulmonary emphysema and later cancer as well. All those years working in a furniture factory, where the air was constantly saturated with wood dust, glue and varnish fumes, did no good either.",
      eindeText3: "The remaining managers, brothers André and Daniel, kept the boat afloat for a few more years but on February 29, 1980, the bankruptcy of the firm was reluctantly filed.",
      eindeText4: "The settlement of the bankruptcy brought quite a few complications. After the public sale of all assets in December 1980, the Bank van Roeselare & West-Vlaanderen came in June 1981 with a claim by registered letter, for an amount of 245,526 F, based on an order that the three brothers, Georges, André and Daniel had signed in 1964 as part of the settlement of their father's estate..."
    },
    fr: {
      sectionTitle: "L'entreprise familiale",
      subtitle: 'PVBA "Marcel Deforce & Fils" (1945-1980)',
      eenmanszaakTitle: "L'entreprise individuelle devient société",
      bevrijdingText: "Izegem fut libérée le 8 septembre 1944. Des blindés alliés pénétrèrent dans la ville depuis la direction de Sint-Eloois-Winkel et mirent fin à l'occupation allemande. La guerre n'était pas finie, mais la vie normale commença prudemment à se rétablir. Dans les régions libérées, on recommença à penser à l'avenir, les plans furent prudemment dépoussiérés, les attentes reprises. Ce mouvement commença aussi dans l'atelier de meubles de Marcel Deforce. Ses fils y travaillaient déjà ; l'atelier n'était plus depuis longtemps une entreprise individuelle dans la pratique quotidienne, même s'il le restait juridiquement.",
      zonenLeeftijden: "Début 1945, les fils se trouvaient à un carrefour d'âges et de responsabilités : Georges allait avoir 24 ans, André 19, Daniël 18 et Lucien 16. Leur collaboration demandait une structure plus formelle. Celle-ci fut trouvée dans le statut d'une PVBA (Société de Personnes à Responsabilité Limitée) — une forme juridique qui n'existait que depuis 1935. L'acte constitutif fut enregistré le 5 juin 1945, quelques semaines après l'armistice du 8 mai et la fin définitive de la guerre.",
      tankCaption: "Une scène de rue typique lors de la libération d'Izegem en septembre 1944. Les gens posent sur un char détruit.",
      tankDetail: "À gauche devant : Georges Deforce. En haut au milieu (avec foulard) : Simonne Vandeputte.",
      verslagenboekCaption: "Le livre des procès-verbaux de la nouvelle PVBA, et le premier rapport annuel, dans l'écriture typiquement griffonnée de Georges.",
      patriarchText: "La forme changea, les rapports à peine. Marcel resta le patriarche, le décideur, l'homme chez qui tout convergeait. En pratique, il continuait à agir comme si l'atelier était son prolongement personnel. Cela ressort aussi du premier rapport annuel du 4 mars 1946 : sur les 250 parts, il en possédait 244, en indivision avec son épouse Madeleine. Le fils Georges et la fille Maria avaient chacun trois parts. La société était formellement correcte — trois actionnaires étaient légalement requis — mais dans le fond, elle restait une construction pro forma.",
      vennotenText: "Au départ, seul Georges parmi les frères travailleurs devint associé, avec le statut d'indépendant. Les autres frères restèrent inscrits comme ouvriers. Ce n'est qu'à l'Assemblée Générale du 7 mars 1949 qu'André et Daniël devinrent également associés. Lucien ne travaillerait que temporairement avant de suivre une formation d'Ingénieur Technique à Ostende. Il ne devint pas associé dans la firme ; sa carrière se déroulerait ailleurs.",
      verloningText: "Leur rémunération resta limitée. Marcel choisit résolument le réinvestissement : l'entreprise devait être sécurisée, des réserves constituées. Cette politique s'accompagna de tensions. La communication entre père et fils était tendue ; entre les frères eux-mêmes, peu d'ouverture se développa.",
      georgesUitstapText: "La situation se durcit encore lorsque Georges — avec l'accord de son père — quitta la société et se fit inscrire comme employé. Avec une famille grandissante, ce statut donnait accès aux allocations familiales, qui pour les indépendants de l'époque ne représentaient pratiquement rien. Pour ses frères, cela ressemblait à une inégalité difficile à digérer.",
      naijverText: "La jalousie et le ressentiment s'enracinèrent plus profondément. Adolescent en pleine croissance, je captais des bribes. Des conversations qui s'interrompaient brusquement, des demi-phrases, des voix échauffées derrière des portes closes. Il était question de jalousie, de répartition des revenus — surtout des revenus non déclarés — de répartition des tâches, de reconnaissance. C'étaient des mots qui n'étaient pas destinés aux oreilles des enfants, mais qui se gravaient quand même.",
      labelCaption: "Chaque meuble à livrer était pourvu de cette étiquette avec numéro de produit et code couleur",
      groeiTitle: "Croissance et expansion",
      groeiText1: "Pourtant, il n'y avait pas que des tensions. Les années d'après-guerre apportèrent aussi la croissance. L'économie reprit, le travail augmenta. L'atelier fut agrandi, en partie par achat, en partie par location de parcelles adjacentes dans la Werkhuizenstraat.",
      groeiText2: "Marcel parlait parfois avec nostalgie en ces années. Le travail sculpté à la main, l'artisanat qu'il avait appris et perfectionné, devait céder la place à une production mécanique en série. Les volumes augmentèrent, la clientèle s'élargit. Les livraisons ne pouvaient plus se faire à pied avec la charrette à bras. D'abord une Opel bleue avec porte-bagages suffisait, puis une Coccinelle Volkswagen blanche. Vers 1954, une camionnette Volkswagen avec un solide porte-bagages fut achetée. Cela permit de transporter des meubles plus grands et de constituer progressivement une clientèle dans une région beaucoup plus large. Au début des années soixante, un plus grand camion s'y ajouterait. À mesure que la production s'intensifiait, les tournées de livraison devenaient plus fréquentes et un employé supplémentaire fut embauché comme chauffeur permanent.",
      opelCaption: "L'Opel bleue, la première voiture utilisée pour les livraisons. Ici : une sortie dominicale en 1950 à Furnes, Marcel avec son frère Cyrille. Dans la voiture : Félice, alors 15 ans.",
      aanbodText: "L'offre grandit et se diversifia. Outre les petits meubles classiques tels que tables de salon, porte-plantes, portemanteaux etc., la gamme fut progressivement élargie avec une série de dressoirs, armoires murales, salles à manger et chambres complètes. Le tout pouvait être commandé en différentes finitions : vernis foncé ou clair, craquelé blanc, style Louis XV sculpté traditionnel ou le style 'flamand' plus sobre et massif.",
      bereniceBureauCaption: "Bérénice Deforce à son bureau dans les locaux de l'atelier de meubles, vers 1954.",
      bereniceKeverCaption: "Bérénice Deforce avec la Coccinelle Volkswagen (plaque T.3661) dans la Werkhuizenstraat à Izegem. À l'arrière-plan : un camion Pearl Limonades.",
      bereniceText: "Après ses études secondaires à l'Institut La Vallée Bailly à Braine l'Alleud en juillet 1951, la sœur Bérénice rejoignit aussi l'entreprise. Elle faisait surtout du travail de bureau, mais était aussi un chauffeur enthousiaste pour les livraisons. C'est ainsi qu'elle rencontra Max Autier, dont les parents avaient un magasin de meubles à Naast (Soignies). En septembre 1955, elle l'épousa et s'installa à Naast.",
      verkoopText: "Les ventes continuaient à augmenter. La participation annuelle au Salon du Meuble au Heysel à Bruxelles devint incontournable. Cela permit de développer une clientèle dans toute la Belgique et plus tard dans le nord de la France, jusqu'en Normandie. Trois représentants freelance, payés à la commission, entretenaient les contacts commerciaux et assuraient un flux constant de commandes. Typique du récit de croissance : par moments, ces représentants enregistraient plus de commandes que la production ne pouvait absorber. Ils étaient motivés pour engranger le maximum de commissions. Pour les clients, cela signifiait souvent des délais de livraison désagréablement allongés.",
      taakverdelingText: "Progressivement, les fils gagnèrent en autorité. Une répartition fonctionnelle des tâches se mit en place : Georges s'occupa des ventes, des livraisons et d'une partie de l'administration ; André devint responsable de la production et, grâce à son talent artistique, dessina de nouveaux modèles ; Daniël dirigea la finition et surtout le département de vernissage.",
      beursCaption: "Lors des premières participations au Salon annuel du Meuble, seuls les petits meubles étaient exposés.",
      brandTitle: "Incendie !",
      brandText1: "Le vendredi 11 décembre 1963 commença comme un jour d'école ordinaire. J'avais presque dix-sept ans et j'étais en classe de Poésie — l'avant-dernière année de Latin-Grec. Au cours de la matinée, l'électricité fut coupée au Collège. L'inquiétude monta quand, par la fenêtre, nous vîmes une grande colonne de fumée noire s'élever, à peine à cent mètres de l'école. Au bout de dix minutes, peut-être un quart d'heure, la lumière revint. Le professeur essaya de reprendre le cours. Puis on frappa à la porte. Je fus retiré de la classe. Dans le couloir, je croisai mon frère Luc, lui aussi avait été appelé. Quelque chose s'était passé, dit-on prudemment. Nous pouvions aller voir.",
      brandText2: "La fumée provenait de l'incendie qui ravagea l'entreprise familiale de meubles. Qui nous emmena — père, oncle, quelqu'un d'autre — je ne m'en souviens plus. Quelques minutes plus tard, nous étions sur la Van Den Bogaerdelaan, devant la grande porte du garage de la firme. Au fond gisait l'atelier : effondré, calciné, méconnaissable. Il gelait à pierre fendre. Ce qui m'est resté le plus, ce sont les stalactites de glace : l'eau d'extinction gelée qui pendait aux poutres et aux murs. Quand des photos furent prises quelques jours plus tard pour évaluer les dégâts, tout était recouvert d'une épaisse couche de neige.",
      brandText3: "La cause de l'incendie ne fut jamais officiellement établie. On soupçonna un court-circuit ou une étincelle dans le département de vernissage, où le vernissage au pistolet créait en permanence un brouillard inflammable. L'étage supérieur, largement construit en bois, fut entièrement détruit. La plupart des murs latéraux en briques restèrent debout. La salle des machines avait un plafond en béton ; la plupart des machines furent épargnées. Le jeudi 17 janvier 1964, la 26e Foire du Meuble de Bruxelles devait ouvrir au Heysel. Tout le stock de meubles prêt pour le salon — poli, emballé — était perdu.",
      brandText4: "Grand-père Marcel avait vu l'incendie de près depuis son salon. Il paniqua, craignant que le feu n'atteigne la maison. Il était physiquement et mentalement complètement dévasté. Le choc fut terrible et il ne se remettrait jamais de ce traumatisme. Moins d'un an plus tard, il décéda.",
      brandSchadeCaption: "Quelques photos prises pour évaluer les dégâts, comme preuves pour l'assurance.",
      brandKrantCaption: "Article de presse dans De Standaard du 12-13 janvier 1963",
      veerkrachtTitle: "Résilience après le feu",
      veerkrachtText1: "Les ravages étaient importants, mais pas totaux. La maison d'habitation fut épargnée, séparée de l'atelier par un jardin intérieur d'environ quinze mètres. Les pompiers avaient pu évacuer une grande partie du bureau : la comptabilité et les documents administratifs furent sauvés, ainsi que les imprimés publicitaires pour le prochain salon.",
      herstelText: "Peu de documentation sur la récupération elle-même a été conservée. Compréhensible. Dans cette phase, il s'agissait d'agir, pas d'archiver. Déblayer les décombres, réparer les toits. Les frères Deforce, avec leurs ouvriers, effectuèrent eux-mêmes une grande partie des travaux de réparation. Les ouvriers furent aussi temporairement mis au chômage entre-temps — une économie nécessaire. L'assurance couvrit la majeure partie des dégâts, y compris une partie de la perte de chiffre d'affaires. Le paiement prit du temps et ne couvrit pas tout, mais offrit un répit. Cela aida clairement à adoucir le traumatisme pour les familles qui dépendaient de l'entreprise. Dans mon souvenir personnel, la vie quotidienne dans notre famille continua tout simplement, sans grand retentissement du drame qui s'était déroulé.",
      veerkrachtText2: "La salle des machines fut séparée des décombres et put refonctionner relativement vite. Le stock de bois était resté intact : il était empilé sur un terrain au coin de la Meibloemstraat et de la Meensestraat, à environ 150 mètres de l'atelier incendié. Il y avait donc du matériel disponible pour travailler.",
      veerkrachtText3: "La participation au Salon du Meuble de Bruxelles — à peine une semaine après l'incendie — eut quand même lieu, avec des moyens improvisés. Pour remplir le stand, des meubles furent empruntés aux showrooms des clients et même quelques pièces du propre salon familial furent emmenées. Avec les imprimés publicitaires sauvés de l'incendie, on put donc quand même exposer et vendre. La récente nouvelle du sinistre suscita aussi beaucoup de sympathie de la part des clients et des collègues fabricants. Une partie de la production redémarrante fut même sous-traitée chez certains de ces collègues.",
      veerkrachtText4: "L'incendie ne devint pas une ligne de fracture. Ce qui resta debout, c'était le savoir-faire. Les bâtiments et les machines pouvaient être perdus ; les connaissances, l'expérience et la réputation, non. Dans un secteur où la confiance et la qualité étaient cruciales, ce capital humain forma la base d'un nouveau départ.",
      marktText: "Le contexte économique joua aussi un rôle. Le marché continuait d'exister. La firme s'était déjà positionnée au-delà du marché local avant 1963. Ce réseau ne disparut pas dans les flammes. La demande de mobilier de qualité resta forte, dans une période de croissance économique et de construction de logements. Ainsi la firme, une fois les pires dégâts surmontés, put renouer avec un marché qui voulait avancer — et ne s'attardait pas sur ce qui avait été perdu.",
      erfenisTitle: "Le partage de l'héritage et la réorganisation de l'entreprise",
      erfenisText1: "Le décès soudain de Marcel Deforce en décembre 1963 fut à nouveau un événement profondément traumatisant pour toute la famille. Et il n'y avait pas seulement le deuil de la personne : il n'avait pas rédigé de testament. De son vivant, il avait maintes fois exprimé oralement qu'il trouvait normal que ses fils qui travaillaient dans l'entreprise la poursuivent. Ils n'avaient en effet pas pu faire de longues études, avaient dû commencer à travailler jeunes pour contribuer aux revenus du ménage. Ils cofinancèrent ainsi l'éducation de leurs frères et sœurs plus jeunes, qui eurent grâce à eux la chance de déterminer leur propre chemin dans la vie. Le nom de la firme avait d'ailleurs été choisi sans ambiguïté : \"Marcel Deforce & Fils\".",
      erfenisText2: "L'absence de testament ne laissait légalement qu'une seule option possible : un partage égal de l'ensemble de l'héritage entre les héritiers : tous les fils et filles à parts égales, en tenant compte de la part privilégiée pour la veuve. Cela provoqua naturellement beaucoup de remous. La discorde et les querelles grandirent dans la famille, car il apparaissait que l'entreprise de meubles serait hypothéquée pendant de nombreuses années, tous les revenus devant servir à payer leur part à tous les ayants droit. L'alternative aurait été de vendre l'entreprise, y compris l'immobilier, et de répartir les fonds, mais alors les trois fils qui y travaillaient auraient perdu leur emploi et tout leur avenir.",
      erfenisText3: "Comme première étape, une 'Assemblée Générale Extraordinaire' de la PVBA fut déjà tenue le 29 décembre. Dans le Livre des Procès-verbaux, on trouve une redistribution assez compliquée des parts. Mais l'impasse persista : il n'y avait pas d'arrangement viable pour l'avenir que toutes les parties pouvaient soutenir.",
      erfenisText4: "Mon père, Georges, était celui qui avait le plus de contacts extérieurs au sein de la firme. Il trouva un moyen de sortir de l'impasse. Grâce à ses relations avec l'organisation patronale NCMV, un bureau de consultants externe fut mandaté avec une double mission. La première priorité était la rédaction d'un projet d'accord pour le partage de l'héritage, d'une manière qui permettrait à l'entreprise de meubles de continuer à exister.",
      erfenisText5: "La seconde partie de la mission était un audit et une étude d'efficacité de la fabrique de meubles, afin de garantir au mieux l'avenir. La reconstruction après l'incendie n'était en effet pas encore achevée.",
      erfenisText6: "Dès le 17 mars 1964, un accord fut conclu avec la firme \"Installation Efficiency Engineering\" (Düsseldorf, Rotterdam, Bruxelles, Vienne, Barcelone).",
      ieeCaption: "Une des quelque 80 pages du rapport IEE",
      erfenisOvereenkomst1: "Tous les héritiers non-travailleurs vendirent leurs parts à la PVBA, et la mère Madeleine renonça à l'encaissement immédiat des fonds qui lui revenaient.",
      erfenisOvereenkomst2: "La propriété de la maison d'habitation fut transférée à la PVBA, avec usufruit viager pour Madeleine.",
      erfenisOvereenkomst3: "Un accord séparé fut également établi pour le remboursement par échéances concernant la vente des parts et la distribution des liquidités à tous les ayants droit.",
      erfenisDoorlichting: "L'entreprise fut entièrement auditée par les consultants dans les semaines qui suivirent, sur base d'une étude de l'expert-comptable Guido Verhaeghe de Roulers, qui analysa la situation financière au 31/12/1963. Le résultat fut un rapport détaillé sur le calcul des prix, l'analyse des coûts, la gestion financière, la comptabilité avec un plan comptable ingénieux et un nouveau système de « comptabilité au carbone », l'organisation de la production, l'agencement de l'usine avec le repositionnement de toutes les machines pour permettre un flux de travail efficace.",
      erfenisVeranderingen: "Les bâtiments de l'entreprise subirent un changement radical : les niveaux des sols furent adaptés, les machines réorganisées, des mesures de sécurité apparurent, des sorties de secours furent aménagées, le flux de marchandises fut ordonné logiquement, des systèmes d'aspiration furent installés pour collecter les copeaux de bois et évacuer les poussières et brouillards de vernis, le département de vernissage fut sécurisé, etc. Bref : les recommandations des consultants IEE furent prises à cœur et mises en œuvre en profondeur.",
      erfenisKantoor: "Le bureau de l'entreprise déménagea dans une construction neuve dans le jardin arrière de la maison voisine de l'oncle André et de la tante Francine. Là aussi, les changements étaient clairement visibles.",
      erfenisJobstudent: "Quand je relis aujourd'hui ce rapport, je reconnais les nombreux changements que j'ai vus se produire à l'époque. Car entre 1964 et 1969, je travaillais (ir)régulièrement pendant les vacances scolaires comme étudiant jobiste dans l'entreprise : petits boulots, courses, accompagner le camion comme « convoyeur », charger et décharger les meubles...",
      erfenisFrancine: "Par moments, j'aidais Francine au bureau et participais à l'introduction de la nouvelle comptabilité et à l'application des nouvelles mesures administratives proposées par les consultants.",
      erfenisAnecdote: "Anecdote : l'une des tâches les plus humbles qui m'étaient confiées était d'aller acheter des « timbres fiscaux » à la poste. Une tâche tout de même responsable, car on me confiait beaucoup d'argent liquide. Il n'y avait pas encore de TVA (introduite en Belgique seulement en 1971). Il y avait la « taxe de transmission ». Les 6% de taxe due sur les ventes étaient acquittés par l'apposition d'un timbre fiscal : le timbre devait être coupé en deux, une moitié collée sur l'original de la facture de vente (destinée au client), l'autre moitié sur un double au carbone, à conserver comme preuve. De nombreuses heures j'ai passées à coller ces timbres fiscaux...",
      goudenJarenTitle: "Les années dorées '60",
      goudenJarenText1: "Les « Golden Sixties » désignent la période d'environ 1958 à 1973, pendant laquelle la Belgique connut une croissance économique exceptionnelle et une augmentation de la prospérité. Ce fut une époque d'industrialisation rapide, de haute productivité et de quasi plein emploi. Les salaires augmentèrent, le pouvoir d'achat s'accrut fortement et de plus en plus de familles purent se permettre des biens de consommation durables comme une voiture, un réfrigérateur, une télévision ou une machine à laver. La construction de logements fleurit et la maison propre devint accessible à de larges couches de la population. Parallèlement, l'État-providence s'élargit : meilleure sécurité sociale, pensions, soins de santé et enseignement. De grands projets d'infrastructure (autoroutes, ports, Expo 58) renforcèrent l'optimisme.",
      goudenJarenText2: "Tout cela était une excellente nouvelle pour l'industrie du meuble, qui profita énormément de la frénésie de consommation ambiante. Le hasard, le destin ? voulut que la catastrophe de l'incendie et la nécessité de réorganisation de la fabrique de meubles frappèrent en fait au « meilleur moment possible ». 1963 fut une année record pour l'industrie belge du meuble. À la foire, il y avait plus de 300 exposants. Tandis que le parquet de la foire en 1963 était encore dominé par le classique « Chêne flamand », il y eut cette année-là beaucoup d'agitation autour de la « ligne scandinave » — des essences de bois plus claires comme le teck et des pieds plus fins — qui perça définitivement auprès du grand public.",
      goudenJarenText3: "La foire annuelle du meuble devint un rendez-vous incontournable. On y investissait considérablement car de grandes quantités de commandes y étaient enregistrées, assurant des mois de production. C'était le lieu pour attirer de nouveaux clients, de l'intérieur et de l'étranger : de plus en plus était vendu en France. Plusieurs fois, comme en 1967 et 1975, ils participèrent même au Salon International du Meuble à Paris, au Parc des Expositions, Porte de Versailles.",
      goudenJarenText4: "Cet investissement dans les participations aux expositions impliquait d'une part la location d'un espace d'exposition assez grand, élégamment aménagé et — comme c'était encore la chose la plus normale du monde à l'époque — pourvu d'un généreux stock de boissons et de cigarettes pour choyer les clients.",
      salonCaption: "Salon International du Meuble. Paris. 1975.",
      goudenJarenReclame: "D'autre part, une attention croissante fut accordée aux imprimés publicitaires. Aujourd'hui nous trouvons normal de créer nous-mêmes sur notre PC ou ordinateur portable des documents attrayants et du matériel publicitaire. Avant l'ère informatique, les choses étaient plus compliquées. Si l'on voulait produire rapidement quelque chose soi-même, par exemple une liste de prix, on le faisait à la machine à écrire. Tout un travail, car corriger les fautes de frappe ou une mise en page ratée ne pouvait parfois se faire qu'en recommençant tout à zéro. La multiplication se faisait au stencil.",
      goudenJarenArtex: "Sous la pression de concurrents plus importants qui surpassaient tout le monde avec des imprimés couleur luxueux, les plus petites entreprises ne pouvaient rester en retrait. La firme Deforce fit appel à l'agence publicitaire Artex de Jef Pattyn (1930–2006), un ami de mon père Georges, qui avait fondé son entreprise à l'origine en 1958 comme imprimerie sérigraphique. En 1967, il fit le saut crucial vers une agence publicitaire « full-service », avec son propre studio de création et son imprimerie. L'agence est toujours une valeur établie à Izegem, désormais sous la direction de la génération suivante.",
      succesTitle: "Succès et déclin sont proches voisins",
      succesText1: "Les affaires allaient excellemment, les ventes marchaient bien, l'argent rentrait. Mes parents devaient progressivement moins compter chaque sou du budget ménager pour élever leurs neuf enfants. Vers la fin des années '60, ils pouvaient même se permettre régulièrement un voyage à l'étranger ou une croisière, en remplacement des anciennes sorties dominicales à la côte en camionnette.",
      catalogusCaption: "Imprimés publicitaires en couleur, réservés aux grands clients, alternés avec des listes de prix ronéotypées",
      succesText2: "Il n'y a jamais eu de grand luxe, mais ils devenaient raisonnablement aisés. Ils évoluaient avec beaucoup de satisfaction dans les cercles de la classe moyenne d'Izegem.",
      succesText3: "La période de succès de la firme ne dura cependant qu'une dizaine d'années. L'apogée de tout le secteur du meuble d'Izegem était déjà passé dans les années '70. Un premier signe avant-coureur fut la faillite de la grande usine de meubles Rousseau en 1972. Cette faillite fut un événement important dans le secteur local du meuble et causa beaucoup d'agitation dans la ville. La concurrence étrangère augmenta progressivement ; les exportations vers la France fléchirent, les producteurs à grande échelle pouvaient fournir plus de qualité à un prix inférieur. Les matières premières devinrent plus chères, la mode évoluait plus vite qu'on ne pouvait suivre, la structure familiale de l'entreprise devint un handicap. Les Golden Sixties prirent fin brusquement avec la crise pétrolière de 1973, qui mit fin à la longue prospérité économique.",
      succesText4: "Les remèdes pour résister au déclin étaient — en théorie — connus : investir davantage et moins dilapider, se spécialiser davantage, concentrer les ventes et la production sur les articles les plus performants au lieu de toujours vouloir offrir une large gamme. Produire plus efficacement et à plus grande échelle. Un management plus professionnel. Au besoin, fusionner avec des collègues pour survivre ensemble plutôt que de sombrer chacun séparément...",
      eindeTitle: "L'histoire se termine en février 1980",
      eindeText1: "Ils hésitèrent trop longtemps à intervenir de manière décisive. Faute de compétences professionnelles en gestion, ils s'appuyaient presque exclusivement sur leur savoir-faire, leur expérience et leur force de travail. Comme tant de leurs collègues du secteur, leur caractère têtu de Flandre occidentale les amena à serrer les dents, travailler plus dur et sombrer chacun à sa manière.",
      eindeText2: "Mon père, Georges, avait entre-temps en 1972 renoncé à son statut d'employé et était redevenu actionnaire et gérant. Mais il tomba malade et dut démissionner en 1978 pour raisons de santé. Il fut placé en congé de maladie permanent. Après avoir trop fumé toute sa vie, il développa un emphysème pulmonaire puis un cancer. Toutes ces années passées à travailler dans une fabrique de meubles, où l'air était constamment saturé de poussière de bois, de vapeurs de colle et de vernis, n'y avaient pas contribué non plus.",
      eindeText3: "Les dirigeants restants, les frères André et Daniel, maintinrent le bateau à flot encore quelques années mais le 29 février 1980, la faillite de la firme fut demandée de force.",
      eindeText4: "Le règlement de la faillite entraîna encore bien des complications. Après la vente publique de tous les actifs en décembre 1980, la Bank van Roeselare & West-Vlaanderen se manifesta en juin 1981 avec une créance par lettre recommandée, pour un montant de 245.526 F, sur base d'une commande que les trois frères, Georges, André et Daniel avaient signée en 1964 dans le cadre du règlement de la succession de leur père..."
    },
    sv: {
      sectionTitle: "Familjeföretaget",
      subtitle: 'PVBA "Marcel Deforce & Söner" (1945-1980)',
      eenmanszaakTitle: "Enskild firma blir bolag",
      bevrijdingText: "Izegem befriades den 8 september 1944. Allierade pansarfordon körde in i staden från riktningen Sint-Eloois-Winkel och avslutade den tyska ockupationen. Kriget var inte över, men det vanliga livet började försiktigt återhämta sig. I de befriade områdena började man tänka framåt igen, planer dammades försiktigt av, förväntningar återupptogs. Även i Marcel Deforces möbelverkstad började denna rörelse. Hans söner arbetade redan med; verkstaden hade i praktiken länge upphört att vara en enskild firma, även om den juridiskt förblev det.",
      zonenLeeftijden: "I början av 1945 stod sönerna vid ett vägskäl av åldrar och ansvar: Georges blev 24, André 19, Daniël 18 och Lucien 16. Deras samarbete krävde en mer formell struktur. Denna hittades i formen av ett PVBA (Personligt bolag med begränsat ansvar) — en bolagsform som bara hade funnits sedan 1935. Stiftelseurkunden registrerades den 5 juni 1945, några veckor efter vapenstilleståndet den 8 maj och det definitiva krigets slut.",
      tankCaption: "En typisk gatuvy vid befrielsen av Izegem i september 1944. Folk poserar på en sönderskjuten stridsvagn.",
      tankDetail: "Längst till vänster: Georges Deforce. Överst i mitten (med halsduk): Simonne Vandeputte.",
      verslagenboekCaption: "Protokollboken för det nya bolaget, och den första årsredovisningen, i Georges typiska kråkstil.",
      patriarchText: "Formen förändrades, förhållandena knappt. Marcel förblev patriarken, beslutsfattaren, mannen hos vilken allt i slutändan samlades. I praktiken fortsatte han att agera som om verkstaden var hans personliga förlängning. Detta framgår även av den första årsredovisningen den 4 mars 1946: av de 250 aktierna ägde han 244, i samägande med sin hustru Madeleine. Sonen Georges och dottern Maria hade vardera tre aktier.",
      vennotenText: "Inledningsvis blev bara Georges av de arbetande bröderna delägare, med status som egenföretagare. De andra bröderna förblev registrerade som arbetare. Det var först vid den ordinarie bolagsstämman den 7 mars 1949 som André och Daniël också blev delägare. Lucien skulle bara arbeta tillfälligt innan han utbildade sig till Teknisk Ingenjör i Ostende.",
      verloningText: "Deras ersättning förblev begränsad. Marcel valde resolut återinvestering: företaget måste säkras, reserver byggas upp. Denna politik åtföljdes av spänningar. Kommunikationen mellan far och söner var ansträngd.",
      georgesUitstapText: "Situationen hårdnade ytterligare när Georges — med faderns samtycke — lämnade bolaget och registrerade sig som anställd. Med en växande familj gav denna status tillgång till barnbidrag, som för egenföretagare vid den tiden inte var nämnvärd. För hans bröder kändes det som en ojämlikhet som var svår att smälta.",
      naijverText: "Avundsjuka och bitterhet rotade sig djupare. Som uppväxande tonåring fångade jag fragment. Samtal som plötsligt tystnade, halva meningar, upphetsade röster bakom stängda dörrar. Det handlade om svartsjuka, om fördelningen av inkomster — särskilt de svarta inkomsterna — om arbetsfördelning, om erkännande. Det var ord som inte var avsedda för barnaöron, men som ändå fastnade.",
      labelCaption: "Varje möbel som skulle levereras försågs med denna etikett med produktnummer och färgkod",
      groeiTitle: "Tillväxt och expansion",
      groeiText1: "Ändå var det inte bara spänningar. Efterkrigsåren förde också tillväxt med sig. Ekonomin återhämtade sig, arbetet ökade. Verkstaden utvidgades, delvis genom köp, delvis genom uthyrning av angränsande tomter på Werkhuizenstraat.",
      groeiText2: "Marcel talade ibland med vemod under dessa år. Det handsnidade arbetet, hantverket han hade lärt sig och förfinat, fick ge vika för mer maskinell serieproduktion. Volymerna växte, kundbasen utökades. Leveranser kunde inte längre göras till fots med skottkärra. Först räckte en blå Opel personbil med takräcke för mindre möbler, sedan en vit Volkswagen Bubbla. Omkring 1954 köptes en Volkswagen-skåpbil med ett stadigt lastutrymme. Så kunde nu även större möbler transporteras och en kundkrets gradvis byggas upp i en mycket bredare region. I början av sextiotalet tillkom en större lastbil. Allteftersom möbelproduktionen skalades upp blev leveransturerna tätare och en extra anställd anlitades som fast chaufför.",
      opelCaption: "Den blå Opeln, den första bilen som användes för leveranser. Här: en söndagsutflykt 1950 till Veurne, Marcel med sin bror Cyrille. I bilen: Félice, då 15 år.",
      aanbodText: "Utbudet växte och blev mer mångsidigt. Utöver de klassiska småmöblerna som soffbord, blomstersställ, klädhängare etc. utökades sortimentet gradvis med serier av byråer, väggskåp, kompletta matrum och sovrum. Allt kunde beställas i olika ytbehandlingar: mörk eller ljus lack, vit craquelé, traditionell skulpterad Louis XV-stil eller den mer avskalade och massiva 'flamländska stilen'.",
      bereniceBureauCaption: "Bérénice Deforce vid sitt skrivbord på möbelverkstadens kontor, ca 1954.",
      bereniceKeverCaption: "Bérénice Deforce med Volkswagen Bubblan (registreringsskylt T.3661) i Werkhuizenstraat, Izegem. I bakgrunden: en Pearl Lemonad-lastbil.",
      bereniceText: "Efter sin gymnasieutbildning vid 'Institut La Vallée Bailly' i Braine l'Alleud i juli 1951 anslöt sig systern Bérénice också till företaget. Hon skötte främst kontorsarbete men var också en ivrig chaufför för leveranser. Så träffade hon Max Autier, vars föräldrar hade en möbelaffär i Naast (Soignies). I september 1955 gifte hon sig med honom och flyttade till Naast.",
      verkoopText: "Försäljningen fortsatte att stiga. Årligt deltagande i Möbelmässan på Heysel i Bryssel blev en fast punkt. Detta byggde upp en kundbas över hela Belgien och senare även i norra Frankrike, ända till Normandie. Tre frilansande representanter, betalda på provision, upprätthöll de kommersiella kontakterna och säkerställde ett konstant flöde av beställningar. Typiskt för tillväxtberättelsen: ibland registrerade dessa representanter fler beställningar än produktionen kunde hantera. De var motiverade att dra in så mycket provision som möjligt. För kunderna innebar detta ofta obehagligt förlängda leveranstider.",
      taakverdelingText: "Gradvis fick sönerna mer inflytande. En funktionell arbetsfördelning uppstod: Georges tog hand om försäljning, leveranser och en del av administrationen; André blev ansvarig för produktionen och ritade, med sin konstnärliga begåvning, nya modeller; Daniël ledde ytbehandlingen och särskilt lackeringsavdelningen.",
      beursCaption: "Vid de tidigaste deltagandena på den årliga Möbelmässan ställdes bara småmöbler ut.",
      brandTitle: "Brand!",
      brandText1: "Fredagen den 11 december 1963 började som en vanlig skoldag. Jag var nästan sjutton och satt i Poësis-klassen — näst sista året Latin-Grekiska. Under förmiddagen slogs strömmen ut på College. Oro uppstod när vi genom fönstret såg en stor svart rökpelare stiga upp, knappt hundra meter från skolan. Efter tio minuter, kanske en kvart, kom ljuset tillbaka. Läraren försökte återuppta lektionen. Sedan knackade det på dörren. Jag hämtades ut ur klassen. I korridoren mötte jag min bror Luc, även han hade hämtats. Något hade hänt, sade man försiktigt. Vi fick gå och titta.",
      brandText2: "Röken kom från branden som förstörde familjens möbelföretag. Vem som tog oss dit — far, farbror, någon annan — minns jag inte längre. Några minuter senare stod vi på Van Den Bogaerdelaan, framför firmans stora garageport. Längst bak låg verkstaden: rasad, utbränd, oigenkännlig. Det var sträng frost. Det som stannat mest hos mig är istapparna: fruset släckningsvatten som hängde som stalaktiter från bjälkar och väggar. När foton togs några dagar senare för att bedöma skadorna, låg allt under ett tjockt snötäcke.",
      brandText3: "Brandorsaken fastställdes aldrig officiellt. Man misstänkte en kortslutning eller gnista i lackeringsavdelningen, där sprutlackeringen ständigt skapade en brandfarlig dimma. Övervåningen, till stor del byggd i trä, förstördes helt. De flesta tegelväggar på sidorna stod kvar. Maskinrummet hade ett betongtak; de flesta maskiner skonades. Torsdagen den 17 januari 1964 skulle den 26:e Möbelmässan i Bryssel öppna på Heysel. Hela lagret av möbler som stod redo för mässan — polerade, förpackade — hade gått förlorat.",
      brandText4: "Farfar Marcel hade sett branden på nära håll från sitt vardagsrum. Han fick panik, fruktade att elden skulle nå bostadshuset. Han var fysiskt och mentalt fullständigt förkrossad. Slaget var hårt och han skulle aldrig återhämta sig från detta trauma. Mindre än ett år senare avled han.",
      brandSchadeCaption: "Foton som togs för att överblicka skadorna, som bevisunderlag för försäkringen.",
      brandKrantCaption: "Nyhetsartikel i De Standaard den 12-13 januari 1963",
      veerkrachtTitle: "Motståndskraft efter elden",
      veerkrachtText1: "Förödelsen var stor, men inte total. Bostadshuset skonades, avskilt från verkstaden av en innergård på cirka femton meter. Brandkåren hade lyckats evakuera en stor del av kontoret: bokföring och administrativa dokument räddades, liksom reklammaterialet för den kommande möbelmässan.",
      herstelText: "Lite dokumentation om själva återhämtningen har bevarats. Förståeligt. I den fasen handlade det om att agera, inte att arkivera. Röja spillror, reparera tak. Bröderna Deforce utförde, tillsammans med sina arbetare, själva mycket av reparationsarbetet. Arbetarna ställdes också tillfälligt permitterade emellanåt — en nödvändig kostnadsbesparing. Försäkringen täckte större delen av skadorna, inklusive en del av omsättningsförlusten. Utbetalningen tog tid och täckte inte allt, men gav andrum. Det hjälpte tydligt att mildra traumat för familjerna som var beroende av företaget. I mitt personliga minne fortsatte vardagslivet i vår familj bara som vanligt, utan mycket avverkan av dramat som hade utspelat sig.",
      veerkrachtText2: "Maskinrummet separerades från spillrorna och kunde fungera relativt snabbt igen. Trälagret hade förblivit intakt: det låg staplat på en tomt i hörnet av Meibloemstraat och Meensestraat, cirka 150 meter från den nedbrända verkstaden. Det fanns alltså material tillgängligt att arbeta med.",
      veerkrachtText3: "Deltagandet i Bryssels Möbelmässa — knappt en vecka efter branden — genomfördes ändå, om än med improviserade medel. För att fylla utställningsmontern lånades möbler från kunders visningsrum och till och med några möbler från det egna vardagsrummet togs med. Tillsammans med reklammaterialet som räddats ur branden kunde man ändå ställa ut och sälja. Det färska nyheten om brandkatastrofen väckte också stor sympati från kunder och kollegor bland tillverkarna. En del av den återstartande produktionen lades till och med ut på entreprenad hos några av dessa kollegor.",
      veerkrachtText4: "Branden blev ingen brytpunkt. Det som stod kvar var hantverkskunnandet. Byggnader och maskiner kunde gå förlorade; kunskap, erfarenhet och rykte kunde det inte. I en sektor där förtroende och kvalitet var avgörande, utgjorde det mänskliga kapitalet grunden för en nystart.",
      marktText: "Även det ekonomiska sammanhanget spelade in. Marknaden fortsatte att existera. Firman hade redan före 1963 positionerat sig utanför det lokala avsättningsområdet. Det nätverket försvann inte i lågorna. Efterfrågan på kvalitetsmöbler förblev stark, i en period av ekonomisk tillväxt och bostadsbyggande. Så kunde firman, när de värsta skadorna var bearbetade, åter ansluta till en marknad som ville framåt — och inte fastnade vid det som hade gått förlorat.",
      erfenisTitle: "Arvsdelningen och omorganisationen av företaget",
      erfenisText1: "Marcel Deforces plötsliga bortgång i december 1963 var återigen en djupt traumatisk händelse för hela familjen. Och det handlade inte bara om sorgen efter personen: han hade inte upprättat något testamente. Under sin livstid hade han visserligen muntligt och vid upprepade tillfällen uttryckt att han ansåg det bara normalt att hans arbetande söner skulle driva företaget vidare. De hade ju inte kunnat studera länge, hade fått börja arbeta unga för att hjälpa till att bygga upp familjens inkomst. De medfinansierade alltså uppfostran av sina yngre bröder och systrar, som därigenom fick möjlighet att bestämma sin egen väg i livet. Firmanamnet var dessutom entydigt valt: \"Marcel Deforce & Söner\".",
      erfenisText2: "Avsaknaden av testamente lämnade juridiskt bara ett alternativ: en jämn fördelning av hela arvet mellan arvingarna: alla söner och döttrar lika; med hänsyn till den privilegierade andelen för änkan. Det medförde naturligtvis en hel del bråk. Osämja och gräl växte i familjen, för det såg ut som att möbelföretaget under många år skulle belastas av att alla ekonomiska intäkter måste användas för att betala alla rättsinnehavare deras del. Alternativet hade varit att sälja företaget inklusive fastigheten och därigenom fördela medlen, men då hade de tre söner som arbetade i företaget förlorat sitt arbete och hela sin framtid.",
      erfenisText3: "Som ett första steg hölls redan den 29 december en 'Extraordinär bolagsstämma' för bolaget. I protokollboken finner vi en ganska komplicerad omfördelning av aktierna. Men dödläget kvarstod: det fanns inget fungerande arrangemang för framtiden som alla berörda kunde ställa sig bakom.",
      erfenisText4: "Min far Georges var den inom firman som hade flest externa kontakter. Han hittade en väg att bryta dödläget. Genom sina kontakter med småföretagarorganisationen NCMV anlitades ett externt konsultföretag med ett dubbelt uppdrag. Första prioritet var att utarbeta ett förslag till överenskommelse för arvsdelningen, på ett sätt som skulle göra det möjligt för möbelföretaget att fortsätta existera.",
      erfenisText5: "Den andra delen av uppdraget var en granskning och effektivitetsstudie av möbelfabriken, för att optimalt trygga framtiden. Återuppbyggnaden efter branden var ju ännu inte avslutad.",
      erfenisText6: "Redan den 17 mars 1964 slöts ett avtal med firman \"Installation Efficiency Engineering\" (Düsseldorf, Rotterdam, Bryssel, Wien, Barcelona).",
      ieeCaption: "En av de ca 80 sidorna i IEE-rapporten",
      erfenisOvereenkomst1: "Alla icke-arbetande arvingar sålde sina andelar till bolaget, och modern Madeleine avstod från omedelbar indrivning av de medel som tillkom henne.",
      erfenisOvereenkomst2: "Ägandet av bostadshuset överfördes till bolaget, med livslång nyttjanderätt för Madeleine.",
      erfenisOvereenkomst3: "Ett separat avtal upprättades också för återbetalning i omgångar avseende aktieförsäljningen och fördelningen av likvida medel till alla rättsinnehavare.",
      erfenisDoorlichting: "Företaget granskades grundligt av konsulterna under de följande veckorna, baserat på en studie av revisor Guido Verhaeghe från Roeselare, som analyserade den finansiella situationen per 31/12/1963. Resultatet blev en omfattande rapport om priskalkylering, kostnadsanalys, ekonomisk förvaltning, bokföring med ett genomtänkt kontoschema och ett nytt system för \"genomskrivningsbokföring\", produktionsorganisation, fabrikslayout med omplacering av alla maskiner för att möjliggöra ett effektivt arbetsflöde.",
      erfenisVeranderingen: "Företagslokalerna genomgick en radikal förändring: golvnivåer anpassades, maskiner omplacerades, säkerhetsåtgärder infördes, nödutgångar anordnades, godsflödet ordnades i logisk följd, utsugningsanläggningar installerades för att samla upp träspån och avlägsna damm- och lackdimma, lackeringsavdelningen säkrades, och så vidare. Kort sagt: IEE-konsulternas rekommendationer togs på allvar och genomfördes grundligt.",
      erfenisKantoor: "Företagskontoret flyttade till en nybyggnad i bakgården till farbror Andrés och moster Francines intilliggande hus. Även där var förändringarna tydliga.",
      erfenisJobstudent: "När jag idag läser om den rapporten känner jag igen de många förändringar som jag såg ske på den tiden. Mellan 1964 och 1969 arbetade jag oregelbundet under skollov som studentjobbare i företaget: småjobb, ärenden, åka med lastbilen som 'konvojör', lasta och lossa möbler...",
      erfenisFrancine: "Periodvis hjälpte jag Francine på kontoret och assisterade med införandet av den nya bokföringen och tillämpningen av de nya administrativa åtgärder som konsulterna hade föreslagit.",
      erfenisAnecdote: "Anekdot: En av de mer ödmjuka uppgifterna som anförtroddes mig var att gå till postkontoret och köpa 'skattefrimärken'. Ändå en ansvarsfull uppgift, för jag fick med mig mycket kontanter. Det fanns ännu ingen moms (infördes i Belgien först 1971). Det fanns 'omsättningsskatten'. De 6% skatt som var skyldig vid försäljning betalades genom att fästa ett skattefrimärke: frimärket skulle klippas itu, ena halvan klistrades på originalet av försäljningsfakturan (avsedd för kunden), den andra halvan på en karbonkopia, att bevaras som bevis. Många timmar ägnade jag åt att klistra dessa skattefrimärken...",
      goudenJarenTitle: "De gyllene 60-talet",
      goudenJarenText1: "De 'Golden Sixties' syftar på perioden ungefär 1958 till 1973, då Belgien upplevde exceptionell ekonomisk tillväxt och ökat välstånd. Det var en tid av snabb industrialisering, hög produktivitet och nästan full sysselsättning. Lönerna steg, köpkraften ökade starkt och allt fler familjer hade råd med varaktiga konsumtionsvaror som bil, kylskåp, TV eller tvättmaskin. Bostadsbyggandet blomstrade och det egna hemmet blev inom räckhåll för breda befolkningslager. Samtidigt utvidgades välfärdsstaten: bättre social trygghet, pensioner, sjukvård och utbildning. Stora infrastrukturprojekt (motorvägar, hamnar, Expo 58) förstärkte optimismen.",
      goudenJarenText2: "Allt detta var utmärkta nyheter för möbelindustrin, som enormt gynnades av den rådande konsumtionsivern. Slumpen, ödet? ville att brandkatastrofen och behovet av omorganisation av möbelfabriken faktiskt slog till vid det 'bäst möjliga ögonblicket'. 1963 var ett toppår för den belgiska möbelindustrin. På möbelmässan fanns det mer än 300 utställare. Medan mässgolvet 1963 fortfarande dominerades av den klassiska 'Flamländska Eken', väckte den så kallade 'skandinaviska linjen' — lättare träslag som teak och smalare ben — stor uppmärksamhet och slog definitivt igenom hos den bredare publiken.",
      goudenJarenText3: "Den årliga möbelmässan blev en fast punkt. I det deltagandet investerades kraftigt eftersom stora mängder beställningar noterades där som gav månaders produktion. Det var platsen att attrahera nya kunder, från in- och utland: mer och mer såldes i Frankrike. Flera gånger, som t.ex. 1967 och 1975, deltog de till och med i Salon International du Meuble i Paris, i Parc des Expositions, Porte de Versailles.",
      goudenJarenText4: "Investeringen i mässdeltaganden innebar dels att hyra ett ganska stort, elegant inrett utställningsutrymme och — som var den mest naturliga sak i världen på den tiden — försett med ett generöst lager av drycker och cigaretter för att uppvakta kunderna.",
      salonCaption: "Salon International du Meuble. Paris. 1975.",
      goudenJarenReclame: "Å andra sidan ägnades gradvis mer uppmärksamhet åt reklammaterial. Idag tycker vi det är naturligt att på vår dator skapa snygga dokument och reklammaterial. Före datoråldern var det svårare. Ville man snabbt producera något själv, t.ex. en prislista, gjordes det med skrivmaskin. Ett helt företag, för att korrigera skrivfel eller misslyckad sidlayout kunde ibland bara åtgärdas genom att börja om från början. Mångfaldigandet gjordes med stencilmaskin.",
      goudenJarenArtex: "Under tryck från större konkurrenter som började överträffa alla med lyxiga färgtryck kunde inte heller de mindre företagen sitta stilla. Firman Deforce anlitade reklambyrån Artex av Jef Pattyn (1930–2006), en vän till min far Georges, som ursprungligen hade grundat sitt företag 1958 som ett serigrafitryckeri. 1967 tog han det avgörande steget till en 'fullservice'-reklambyrå, inklusive egen designstudio och tryckeri. Byrån är fortfarande ett etablerat namn i Izegem, numera under ledning av nästa generation.",
      succesTitle: "Framgång och nedgång ligger nära varandra",
      succesText1: "Affärerna gick utmärkt, försäljningen löpte smidigt, pengarna strömmade in. Mina föräldrar behövde gradvis vara mindre krampaktigt sparsamma med hushållsbudgeten när de fostrade sina nio barn. Mot slutet av 60-talet kunde de till och med regelbundet unna sig utlandsresor eller kryssningar, istället för de tidigare söndagsutflykterna till kusten med skåpbilen.",
      catalogusCaption: "Färgglatt reklammaterial, bara för stora kunder, blandat med stencilerade prislistor",
      succesText2: "Stor lyx har det aldrig varit, men de blev rimligt välbärgade. De rörde sig med stor tillfredsställelse i Izegems medelklasskretsar.",
      succesText3: "Framgångsperioden för firman varade dock bara ungefär tio år. Höjdpunkten för hela Izegems möbelsektor var redan förbi på 1970-talet. Ett första varningstecken var konkursen för den stora möbelfabriken Rousseau 1972. Den konkursen var en viktig händelse i den lokala möbelbranschen och orsakade mycket oro i staden. Utländsk konkurrens ökade gradvis; exporten till Frankrike mattades, storskaliga producenter kunde leverera bättre kvalitet till lägre pris. Råvaror blev dyrare, modet utvecklades snabbare än man kunde följa, familjens företagsstruktur blev ett handikapp: de hade byggt upp företaget med hårt arbete och yrkeskunnande som möbelsnickare, men saknade de managementförmågor som var desperat nödvändiga för att överleva i en krympande konjunktur. De gyllene sextiotalet tog abrupt slut med oljekrisen 1973, som avslutade det långvariga ekonomiska välståndet.",
      succesText4: "Botemedlen för att motstå nedgången var — i teorin — kända: investera mer och slösa mindre, specialisera sig mer, fokusera försäljning och produktion på de mest lönsamma artiklarna istället för att alltid vilja erbjuda ett brett sortiment. Producera effektivare och i större skala. Mer professionell styrning. Vid behov gå samman med kollegor för att överleva tillsammans istället för att gå under var för sig...",
      eindeTitle: "Berättelsen slutar i februari 1980",
      eindeText1: "De tvekade för länge med att ingripa resolut. I brist på professionella managementförmågor förlitade de sig nästan uteslutande på sitt hantverk, sin erfarenhet och sin arbetsförmåga. Liksom så många av sina kollegor i branschen ledde deras envist västflamländska karaktär till att de bet ihop, arbetade hårdare och gick under var och en på sitt sätt.",
      eindeText2: "Min far Georges hade under tiden 1972 givit upp sin anställdstatus och hade åter blivit delägare och företagsledare. Men han blev sjuk och var tvungen att avgå 1978 av hälsoskäl. Han placerades permanent på sjukledighet. Efter ett liv av alltför mycket rökning fick han lungemfysem och senare även cancer. Alla de åren i en möbelfabrik, där luften ständigt var mättad av trädamm, lim- och lackångor, gjorde inte saken bättre.",
      eindeText3: "De kvarvarande företagsledarna, bröderna André och Daniel, höll båten flytande ännu några år men den 29 februari 1980 ansöktes nödtvunget om firmans konkurs.",
      eindeText4: "Avvecklingen av konkursen medförde ännu en hel del komplikationer. Efter den offentliga försäljningen av alla tillgångar i december 1980 kom Bank van Roeselare & West-Vlaanderen i juni 1981 med ett krav via rekommenderat brev, på ett belopp av 245.526 F, baserat på en beställning som de tre bröderna, Georges, André och Daniel hade undertecknat 1964 som en del av avvecklingen av deras fars arv..."
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <section id="familiebedrijf" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-6xl font-serif text-primary/30 block mb-2">9</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">{t.sectionTitle}</h2>
          <p className="text-xl text-primary/80 font-medium">{t.subtitle}</p>
          <div className="flex justify-center mt-4">
            <ShareButton
              title={t.sectionTitle}
              sectionId="familiebedrijf"
            />
          </div>
        </motion.div>

        {/* Eénmanszaak wordt vennootschap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {t.eenmanszaakTitle}
            </h3>
            <p>{t.bevrijdingText}</p>
            <p>{t.zonenLeeftijden}</p>
          </div>

          {/* Tank/bevrijding foto */}
          <figure className="my-6">
            <img 
              src={bevrijdingTank} 
              alt={t.tankCaption}
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
              {t.tankCaption}
              <br />
              <span className="text-xs">{t.tankDetail}</span>
            </figcaption>
          </figure>
        </motion.div>

        {/* Verslagenboek & patriarchale structuur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 max-w-3xl mx-auto mt-12"
        >
          {/* Verslagenboek foto's */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <figure className="text-center cursor-pointer" onClick={() => setFullscreenImage(verslagboekCover)}>
              <img
                src={verslagboekCover}
                alt={t.verslagenboekCaption}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
            </figure>
            <figure className="text-center cursor-pointer" onClick={() => setFullscreenImage(verslagboekJaarverslag)}>
              <img
                src={verslagboekJaarverslag}
                alt={t.verslagenboekCaption}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
            </figure>
          </div>
          <p className="text-sm text-muted-foreground italic text-center">{t.verslagenboekCaption}</p>

          <div className="prose prose-lg text-foreground/80">
            <p>{t.patriarchText}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.vennotenText}</p>
              <p>{t.verloningText}</p>
              <p>{t.georgesUitstapText}</p>
              <p>{t.naijverText}</p>
            </div>
          </ReadMore>
        </motion.div>

        {/* DF Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 max-w-md mx-auto mt-12"
        >
          <figure className="text-center cursor-pointer" onClick={() => setFullscreenImage(dfMeubellabel)}>
            <img
              src={dfMeubellabel}
              alt={t.labelCaption}
              className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground italic">
              {t.labelCaption}
            </figcaption>
          </figure>
        </motion.div>

        {/* Groei en expansie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t.groeiTitle}
            </h3>
            <p>{t.groeiText1}</p>
            <p>{t.groeiText2}</p>
          </div>

          {/* Werkhuizenstraat gebouwen - origineel en ingekleurd */}
          <figure className="my-6 relative">
            <AiLabel />
            <ImageComparisonSlider
              leftImage={werkhuizenstraat}
              rightImage={werkhuizenstraatColor}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
            />
            <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
              De gebouwen van de meubelfabriek Deforce in de Werkhuizenstraat te Izegem, ca. 1960.
            </figcaption>
          </figure>

          {/* Blauwe Opel - origineel en ingekleurd */}
          <figure className="my-6 relative">
            <AiLabel />
            <ImageComparisonSlider
              leftImage={blauweOpel}
              rightImage={blauweOpelColor}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
            />
            <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
              {t.opelCaption}
            </figcaption>
          </figure>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.aanbodText}</p>
            </div>

            {/* Bérénice foto's - origineel en ingekleurd */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <figure className="relative">
                <AiLabel />
                <ImageComparisonSlider
                  leftImage={bereniceBureau}
                  rightImage={bereniceBureauColor}
                  leftLabel="Origineel"
                  rightLabel="Ingekleurd"
                />
                <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                  {t.bereniceBureauCaption}
                </figcaption>
              </figure>
              <figure className="relative">
                <AiLabel />
                <ImageComparisonSlider
                  leftImage={bereniceKever}
                  rightImage={bereniceKeverColor}
                  leftLabel="Origineel"
                  rightLabel="Ingekleurd"
                />
                <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                  {t.bereniceKeverCaption}
                </figcaption>
              </figure>
            </div>

            <div className="prose prose-lg text-foreground/80">
              <p>{t.bereniceText}</p>
              <p>{t.verkoopText}</p>
              <p>{t.taakverdelingText}</p>
            </div>

            {/* Meubelbeurs - ingekleurd */}
            <figure className="my-6 relative cursor-pointer" onClick={() => setFullscreenImage(meubelbeursColor)}>
              <AiLabel />
              <img
                src={meubelbeursColor}
                alt={t.beursCaption}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.beursCaption}
              </figcaption>
            </figure>
          </ReadMore>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-destructive flex items-center gap-2">
              <Flame className="w-5 h-5" />
              {t.brandTitle}
            </h3>
            <p>{t.brandText1}</p>
            <p>{t.brandText2}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.brandText3}</p>
              <p>{t.brandText4}</p>
            </div>

            {/* Brand schade foto's */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
              {[brandSchade1, brandSchade2, brandSchade3, brandSchade4, brandSchade5].map((img, i) => (
                <figure key={i} className="cursor-pointer" onClick={() => setFullscreenImage(img)}>
                  <img
                    src={img}
                    alt={`${t.brandSchadeCaption} ${i + 1}`}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
              <figure className="cursor-pointer" onClick={() => setFullscreenImage(brandKrant)}>
                <img
                  src={brandKrant}
                  alt={t.brandKrantCaption}
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
            <p className="text-sm text-muted-foreground italic text-center">Enkele foto's die werden gemaakt om de schade te overzien na de brand van 11 december 1963 in de meubelfabriek Deforce aan de Werkhuizenstraat te Izegem.</p>
          </ReadMore>
        </motion.div>

        {/* Veerkracht na het vuur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              {t.veerkrachtTitle}
            </h3>
            <p>{t.veerkrachtText1}</p>
            <p>{t.herstelText}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.veerkrachtText2}</p>
              <p>{t.veerkrachtText3}</p>
              <p>{t.veerkrachtText4}</p>
              <p>{t.marktText}</p>
            </div>
          </ReadMore>
        </motion.div>

        {/* Erfenisverdeling en reorganisatie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {t.erfenisTitle}
            </h3>
            <p>{t.erfenisText1}</p>
            <p>{t.erfenisText2}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.erfenisText3}</p>
              <p>{t.erfenisText4}</p>
              <p>{t.erfenisText5}</p>
              <p>{t.erfenisText6}</p>

              <ul className="list-disc pl-5 space-y-2 my-4">
                <li>{t.erfenisOvereenkomst1}</li>
                <li>{t.erfenisOvereenkomst2}</li>
                <li>{t.erfenisOvereenkomst3}</li>
              </ul>

              <p>{t.erfenisDoorlichting}</p>
            </div>

            {/* IEE Rapport */}
            <figure className="my-6 relative cursor-pointer" onClick={() => setFullscreenImage(ieeRapport)}>
              <img
                src={ieeRapport}
                alt={t.ieeCaption}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                loading="lazy"
              />
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.ieeCaption}
              </figcaption>
            </figure>

            <div className="prose prose-lg text-foreground/80">
              <p>{t.erfenisVeranderingen}</p>
              <p>{t.erfenisKantoor}</p>
              <p>{t.erfenisJobstudent}</p>
              <p>{t.erfenisFrancine}</p>
              <p className="italic bg-secondary/30 p-4 rounded-lg">{t.erfenisAnecdote}</p>
            </div>
          </ReadMore>
        </motion.div>

        {/* De gouden jaren '60 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t.goudenJarenTitle}
            </h3>
            <p>{t.goudenJarenText1}</p>
            <p>{t.goudenJarenText2}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.goudenJarenText3}</p>
              <p>{t.goudenJarenText4}</p>
            </div>

            {/* Salon du Meuble Paris - Comparison Slider */}
            <div className="my-6 max-w-2xl mx-auto relative">
              <AiLabel />
              <ImageComparisonSlider
                leftImage={salonMeuble}
                rightImage={salonMeubleColor}
                leftLabel="Origineel"
                rightLabel="Gekleurd"
              />
              <p className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.salonCaption}
              </p>
            </div>

            <div className="prose prose-lg text-foreground/80">
              <p>{t.goudenJarenReclame}</p>
              <p>{t.goudenJarenArtex}</p>
            </div>
          </ReadMore>
        </motion.div>

        {/* Succes en verval */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-y-6 max-w-3xl mx-auto mt-16"
        >
          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t.succesTitle}
            </h3>
            <p>{t.succesText1}</p>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            {/* Catalogus/prijslijst foto's */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
              {[catalogusPrijslijst1, catalogusPrijslijst2, catalogusPrijslijst3, catalogusPrijslijst4, catalogusPrijslijst5, catalogusPrijslijst6, catalogusPrijslijst7, catalogusPrijslijst8].map((img, i) => (
                <figure key={i} className="cursor-pointer relative" onClick={() => setFullscreenImage(img)}>
                  <img
                    src={img}
                    alt={`${t.catalogusCaption} ${i + 1}`}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow aspect-[3/4] object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic text-center">{t.catalogusCaption}</p>
          </ReadMore>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <p>{t.succesText2}</p>
              <p>{t.succesText3}</p>
              <p>{t.succesText4}</p>

              <h4 className="font-serif text-xl text-primary flex items-center gap-2 !mt-8">
                <ShieldCheck className="w-5 h-5" />
                {t.eindeTitle}
              </h4>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-4 flex-1">
                  <p>{t.eindeText1}</p>
                  <p>{t.eindeText2}</p>
                  <p>{t.eindeText3}</p>
                  <p>{t.eindeText4}</p>
                </div>
                <figure className="md:w-64 flex-shrink-0 cursor-pointer" onClick={() => setFullscreenImage(faillissementsverkoop)}>
                  <img
                    src={faillissementsverkoop}
                    alt="Faillissementsverkoop - Recht van hoger bod, Notaris Guido Sabbe"
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">Faillissementsverkoop december 1980</figcaption>
                </figure>
              </div>
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

export default Familiebedrijf;
