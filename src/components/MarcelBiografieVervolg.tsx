import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ZoomIn, X, Users, Building, Home, Medal, Heart, Briefcase, Play, Sparkles } from "lucide-react";
import drieZusjesVideo from "@/assets/drie-zusjes-ai-video.mp4";
import ReadMore from "@/components/ui/ReadMore";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import AiLabel from "@/components/ui/AiLabel";

import atelier1942 from "@/assets/atelier-1942.jpg";
import madeleineRodeKruis from "@/assets/madeleine-rode-kruis.jpg";
import gezinZilverenJubileum from "@/assets/gezin-zilveren-jubileum-1943.jpg";
import nieuwHuisVdb from "@/assets/nieuw-huis-vdb.jpg";
import bouwplanVerbouwing from "@/assets/bouwplan-verbouwing.jpg";
import nieuweVoorgevel1946 from "@/assets/nieuwe-voorgevel-1946.jpg";
import huwelijksfotoTrap from "@/assets/huwelijksfoto-trap.jpg";
import gezinsbond1961 from "@/assets/gezinsbond-1961.jpg";
import briefhoofdMarcel from "@/assets/briefhoofd-marcel-deforce.jpg";
import catalogusCreations from "@/assets/catalogus-creations-mobilier.jpg";
import meublesModernesBoek from "@/assets/meubles-modernes-boek.jpg";
import meublesModernesParisiens from "@/assets/meubles-modernes-parisiens.jpg";
import attestOnmisbareZoon from "@/assets/attest-onmisbare-zoon.jpg";
import stamboomMagdalena from "@/assets/stamboom-magdalena-geldof.jpg";
import drieZusjes from "@/assets/drie-zusjes-1950-color.jpg";
import gezinsbondArtikel from "@/assets/gezinsbond-krantenartikel.jpg";
import huldigingMoeders1960 from "@/assets/huldiging-moeders-1960.jpg";
import laatsteFotoMadeleine from "@/assets/laatste-foto-madeleine.jpg";
import marcelOpgebaard from "@/assets/marcel-opgebaard-1963.jpg";
import begrafenisZonen from "@/assets/begrafenis-zonen-1963.jpg";
import rouwkapelMarcel from "@/assets/rouwkapel-marcel-1963.jpg";

const MarcelBiografieVervolg = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const content = {
    nl: {
      kinderenTitle: "Het groeiende gezin",
      kinderenText: "Marcel was een harde werker, die niet spaarde op zijn werkuren en gelukkig was Madeleine een sterke vrouw om een snel aangroeiend gezin te besturen: de kinderen volgden elkaar snel op:",
      kinderenLijst: [
        "In mei 1924 werd weer een dochter geboren, die ze opnieuw Beatrijs noemden ('Béatrice Euphrasie'), ook deze dochter zou jong sterven, slechts 3 jaar oud, in augustus 1927.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Ten slotte 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "De ondernemer",
      bedrijfText: "Grootvader Marcel wist van aanpakken: hij maakte demonstratiemodellen, hij ging letterlijk de boer op om ter plaatse offertes te maken voor aangepast meubilair met rijke gesculpteerde ornamenten, hij bestelde boeken in Brussel en Parijs met modellen van 'moderne' meubelen op grote posters, die hij presenteerde aan zijn klanten, om ze zelf na te maken. Hij ontwierp een bedrijfslogo en creëerde zich een imago. Naast sculpteur zette hij zich ook in de markt als ambachtelijk meubelmaker. Hij deed het allemaal op eigen kracht als zelfstandige éénmanszaak.",
      zonenText: "Toen hij meer werk kreeg dan hij aankon, nam hij een paar medewerkers in dienst. Zoon Georges, toen hij in 1936 zijn diploma van lager-middelbaar had behaald, moest thuisblijven en meewerken in de zaak. Hetzelfde zou later gebeuren met de volgende zonen: André en Daniël. Lucien mocht verder studeren tot technisch ingenieur, kwam toch ook enkele jaren in het familiebedrijf meewerken om daarna zijn eigen gang te gaan. Ook de neven Gaspard en Antoon, zonen van Marcel's broer Cyrille, kwamen er op een gegeven moment in dienst.",
      atelierCaption: "In het atelier, 1942. Onscherp op de voorgrond links: Georges, rechts André.",
      merknaamText: "Vanaf het einde van de jaren '30 werd als merknaam van het familiebedrijf de benaming 'Marcel Deforce & Zonen' gehanteerd. Maar het was en bleef een één-manszaak waar Marcel als patriarch de absolute leiding had, alle beslissingen zelf nam en weinig inspraak van zijn zonen duldde.",
      frustratieTekst: "De broers kwamen ook niet altijd goed overeen. Met hun stugge karakters kropten ze veel frustraties op en waren niet al te best in onderlinge communicatie. Ze vonden dat ze hard moesten werken en voelden zich onderbetaald (kregen minder betaald dan het overige personeel, ze werkten immers als bijdrage voor het gezin waar ze genoten van kost en inwoon, hun vader vond dat vanzelfsprekend). Ze voelden zich ook wel ondergewaardeerd.",
      pvbaText: "Het zou nog duren tot juni 1945 voor het familiebedrijf in een vennootschap (P.V.B.A) werd ondergebracht, maar ook daar behield Marcel het leeuwendeel van de aandelen voor zichzelf, zodat hij de onbetwiste enige baas bleef.",
      oorlogTitle: "De oorlogsperiode 1940-1945",
      oorlogText: "Bij de Duitse inval in 1940 kwam Marcel, op een leeftijd van 46 jaar, al niet meer in aanmerking om als soldaat te worden opgeroepen en ontsnapte hij dus weerom door omstandigheden buiten zijn wil aan een oorlog. Er was natuurlijk de Duitse bezetting met beperkte bewegingsvrijheid en occasionele voedselschaarste. Het dagelijks leven was niet gemakkelijk, maar kon toch min of meer zijn routinematige gang gaan. De kinderen gingen naar school, het werk in het meubelatelier kon doorgaan, er werd geld verdiend…",
      weinigVerhalenText: "Achteraf bekeken valt het me nu op, dat mijn grootouders en mijn nonkels en tantes daar nooit veel over verteld hebben; ze zijn die periode blijkbaar zonder veel avontuur of indrukwekkende gebeurtenissen doorgekomen.",
      georgesText: "De uitzondering hierop was mijn vader, Georges/Jooris, de enige van de kinderen die al volwassen was bij het begin van de oorlog. Hij werd — zoals zovele jongvolwassenen in die tijd — door de Duitsers opgevorderd om in Duitsland te gaan werken. Hij beleefde een intense en avontuurlijke periode. (Zijn belevenissen komen verder in dit boek uitgebreider aan bod).",
      attestText: "Peter vond het maar niks zijn zoon te moeten missen bij het werk in het atelier; hij deed een vergeefse poging door een plechtige brief te richten aan de overheden met een verklaring hoe onmisbaar zijn zoon wel was. Jammer dat dit document niet gedateerd is, en het is ook niet duidelijk aan welke instantie die verklaring gericht was:",
      attestCaption: "Attest van Marcel Deforce: zijn zoon Joris is \"een onmisbare hulp en steun\" in het familiebedrijf",
      overvloedWerkText: "Er was dus — ondanks de oorlogsomstandigheden — blijkbaar toch overvloed aan werk!",
      ruilhandelText: "Betalingen gebeurden vaak via ruilhandel, met voedsel (een goed deel van de klanten waren boeren!) of brandstof in plaats van geld. Controle van kleine zelfstandige ambachten door de bezetter bleef beperkt — de focus lag op grote bedrijven, strategische sectoren (metaal, textiel, voeding…). Veel activiteiten gebeurden noodgedwongen buiten de officiële boekhouding. Zo hield het atelier zich overeind, balancerend tussen wettelijkheid en praktische overleving.",
      groteMeterOorlogText: "Ook Grote Meter had overvloed aan werk. De oudste dochter Maria was daarbij haar steun en toeverlaat, zij was — haast vanzelfsprekend in die tijd — al vroeg van school thuisgebleven om het huishouden te helpen beredderen en haar moeder bij te staan bij de opvoeding en verzorging van haar resem jongere broers en zussen.",
      sociaalEngagementText: "Madeleine was daarnaast ook sociaal geëngageerd: ze maakte zich verdienstelijk bij de voedselbedeling, bij de raadplegingen van de 'Gezondheidsdienst' en het Rode Kruis en werd bestuurslid bij de Bond van Talrijke Gezinnen. (Later 'Bond van Kroostrijke Gezinnen', daarna 'Bond van Grote en Jonge Gezinnen', recent werd dat gewoon de 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine bij het Rode Kruis (uiterst links)",
      zilverenHuwelijkText: "Het gezin op 10 januari 1943 — ter gelegenheid van het zilveren huwelijksjubileum.",
      zilverenHuwelijkCaption: "vlnr: op de voorste rij: Monique - Hendrik (Rik) - Bérénice - Félice - Marcel - Madeleine - Gabriël (Gaby); achteraan: André - Lucien - Daniël - Maria - Jooris (Georges)",
      nieuwHuisTitle: "Het nieuwe huis",
      nieuwHuisText: "Eens te meer word ik geconfronteerd met grote lacunes in de beschikbare informatie, het gebrek aan documenten, de verloren gegane mondelinge overleveringen: hoe en wanneer, en vooral met welke financiële middelen mijn grootouders erin slaagden het huis naast het hunne te kopen en te verbouwen. Niet te vergeten dat ze intussen een gezin met 10 kinderen aan het grootbrengen waren.",
      zakenText: "In elk geval, de zaken moeten goed gelopen hebben en flink wat winst opgeleverd. De wettelijke normen qua boekhouding en fiscaliteit waren toen voor een zelfstandige ondernemer nog niet wat ze tegenwoordig zijn en een flink deel in het zwart werken was vrij gebruikelijk.",
      bezettingWerkText: "De Duitse bezetting veranderde weliswaar het dagelijkse werk in de Izegemse schrijnwerkerij volledig. Door houtschaarste en strenge rantsoenering moesten er steeds vaker worden terugvallen op recuperatiemateriaal. Officiële leveringen liepen stroef en de administratie werd zwaarder, maar het atelier bleef draaien dankzij improvisatie. Klanten bleven meubels bestellen: kasten, tafels, wiegjes, slaapkamermeubels, ingebouwde kasten, deur- en raambeslag. Dikwijls bescheiden, maar onmisbaar.",
      nieuwHuisLinks: "Links: het nieuwe/verbouwde huis (recente foto: het ziet er in 2026 nog steeds onveranderd uit sinds 1945!)",
      bouwplanText: "We beschikken nog over de originele tekeningen voor de verbouwing, van de architect Emiel Allewaert. Het plan geeft de indruk dat er, mits behoud van een paar kelders, een volledig nieuw huis werd gebouwd na afbraak van het aangekochte oude huis. De architect, Emiel Allewaert, was vele jaren lang burgermeester van Izegem en later ook volksvertegenwoordiger en senator.",
      eersteFotoText: "Eén van de eerste foto's die ooit genomen werden aan de nieuwe voorgevel, in het voorjaar 1946.",
      inrichtingText: "Bij de inrichting van het huis werd veel hout gebruikt. Dat was immers ook de voordeligste manier: het hout aankopen aan professionele condities en het zelf verwerken en plaatsen, met de hulp van de zonen en de medewerkers van het meubelatelier.",
      representatiefText: "Het huis zou van meet af aan duidelijk ook een representatieve functie vervullen, het moest het aanwezige vakmanschap uitstralen. Het werd dan ook zowat als een toonzaal ingericht, met overal hoge houten lambriseringen, statige deuren en in de inkomhal een imposante trap, alles in eikenhout en in dezelfde stijl uitgewerkt, met overal gesculpteerde ornamenten.",
      doorlopendeGangText: "Vanuit de inkomhal was er een rechtstreeks doorlopende gang naar de achterdeur en via de achtertuin recht naar het atelier. Daardoor was het gelijkvloers in twee delen gesplitst, wat niet altijd zo handig was want de keuken bevond zich aan de andere kant van de gang dan de eetkamer. Maar het was heel bewust zo gedaan: klanten, leveranciers, bezoekers... werden altijd aan de voordeur ontvangen en doorheen het huis naar het atelier geleid, zodat ze niet anders konden dan onder de indruk komen van het imposante interieur.",
      huwelijksfotoText: "Bij elk huwelijk van één van de dochters of zonen, als dat in Izegem plaatsvond, werd steevast een foto genomen in de inkomhal, aan de voet van de trap.",
      naOorlogseTitle: "De na-oorlogse periode",
      naOorlogsText: "Grootvader Marcel werkte hard aan het ontwikkelen van zijn sculptuur- en kleinmeubelwerkplaats tot een meubelbedrijf, met de hulp van zijn drie oudste zonen.",
      groteMeterNaOorlogText: "Madeleine, Grote Meter, legde zich toe op de opvoeding van haar jongere kinderen, nog enkele jaren met de hulp van oudste dochter Maria.",
      vlaamsgezindText: "Ondanks hun vlaamsgezinde ingesteldheid waren ze ook echte Belgen: als je iemand wil worden, als je iets wil betekenen in deze maatschappij dan 'moet ge uw frans kennen'. Dat was in die generatie toch een overtuiging die er diep ingebakken zat.",
      pensionaatText: "Madeleine was zelf enkele jaren in het Frans naar school geweest en samen met haar man beslisten ze de dochters Monique, Bérénice en Félice op pensionaat te sturen bij de nonnen in Braine l'Alleud zodra ze de leeftijd bereikten om naar het middelbaar te gaan.",
      meisjesText: "De meisjes hadden er dé plezante tijd van hun leven en leerden ernaast etiquette en 'goede manieren' — perfect Frans spreken en schrijven. Het nadeel was wel dat ze nooit een gedegen kennis van het Nederlands opgedaan hebben.",
      gezinsbondText: "Madeleine liet zich meer en meer opmerken in het sociale leven in Izegem, daarbij bewust ook aansluitend bij de 'betere klasse' van zelfstandigen. Ze was al langer lid van de Bond van Kroostrijke Gezinnen (die al in 1922 in Izegem onder de naam van 'Bond van Talrijke Gezinnen' gesticht was door Emiel Allewaert — inderdaad: de architect en burgermeester).",
      gezinsbondCaption: "Bij de wijding van de nieuwe vlag in 1961: vlnr. stadssecretaris Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, burgemeester Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt van het hoofdbestuur, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert en Julien Demeurisse.",
      gezinsbondArtikelText: "De Gezinsbond (oorspronkelijk 'Bond van Talrijke Gezinnen') werd in juni 1922 in Izegem gesticht door Emiel Allewaert, destijds burgemeester en senator. Na 80 jaar werking kreeg de beweging al drie namen. De tweede naam was 'Bond van Kroostrijke Gezinnen', daarna 'Bond van Grote en Jonge Gezinnen', en recent werd dat gewoon de 'Gezinsbond'. Door haar engagement kwam Madeleine al gauw in het bestuur terecht.",
      nieuwHuisRechts: "Rechts: op de plek van het vroegere huis kwam later, in de jaren '60, het huis van zoon André en zijn gezin. De bruine poort gaf doorgang naar de meubelfabriek. Daar was de standplaats van de camion, tegelijk de plek waar de leveringen werden klaargezet en waar de camion geladen werd.",
      eersteFotoDetail: "Sommige gezichten kan ik niet identificeren (buren?). In de koets: Jan Deforce (11/11/45 – 21/03/1946), mijn ouder broertje, overleden door wiegedood, vóór mijn geboorte.",
      clickToEnlarge: "Klik om te vergroten",
      close: "Sluiten"
    },
    en: {
      kinderenTitle: "The Growing Family",
      kinderenText: "Marcel was a hard worker who didn't spare his working hours, and fortunately Madeleine was a strong woman to manage a rapidly growing family: the children followed each other quickly:",
      kinderenLijst: [
        "In May 1924 another daughter was born, whom they again named Beatrijs ('Béatrice Euphrasie'), this daughter would also die young, only 3 years old, in August 1927.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Finally 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "The Entrepreneur",
      bedrijfText: "Grandfather Marcel knew how to get things done: he made demonstration models, literally went from farm to farm to make on-site quotes for custom furniture with rich sculpted ornaments. He ordered books from Brussels and Paris with models of 'modern' furniture on large posters, which he presented to his customers to recreate himself. He designed a company logo and created an image for himself. Besides sculptor, he also positioned himself as a craftsman furniture maker.",
      zonenText: "When he had more work than he could handle, he hired a few employees. Son Georges, when he obtained his lower secondary diploma in 1936, had to stay home and work in the business. The same would happen later with the next sons: André and Daniël.",
      atelierCaption: "In the workshop, 1942. Blurred in the foreground left: Georges, right André.",
      merknaamText: "From the end of the '30s, the brand name of the family business became 'Marcel Deforce & Sons'. But it was and remained a one-man business where Marcel as patriarch had absolute control.",
      frustratieTekst: "The brothers didn't always get along well. With their stubborn characters they bottled up many frustrations and weren't very good at mutual communication.",
      pvbaText: "It would take until June 1945 before the family business was incorporated into a company (P.V.B.A), but even there Marcel kept the lion's share of the shares for himself.",
      oorlogTitle: "The War Period 1940-1945",
      oorlogText: "At the German invasion in 1940, Marcel, at the age of 46, was no longer eligible to be called up as a soldier and thus escaped a war once again through circumstances beyond his control.",
      weinigVerhalenText: "In retrospect, I notice now that my grandparents and my uncles and aunts never talked much about it; they apparently got through that period without much adventure.",
      georgesText: "The exception was my father, Georges/Jooris, the only one of the children who was already an adult at the start of the war. He was — like so many young adults at that time — requisitioned by the Germans to work in Germany. He lived through an intense and adventurous period. (His experiences are covered more extensively later in this book).",
      attestText: "Peter was not at all pleased about having to miss his son at work in the workshop; he made a futile attempt by writing a solemn letter to the authorities with a declaration of how indispensable his son was. Unfortunately this document is not dated, and it is also unclear to which authority the declaration was addressed:",
      attestCaption: "Certificate from Marcel Deforce: his son Joris is 'an indispensable help and support' in the family business",
      overvloedWerkText: "So there was — despite the war circumstances — apparently still plenty of work!",
      ruilhandelText: "Payments were often made through barter, with food (a good portion of the clients were farmers!) or fuel instead of money.",
      groteMeterOorlogText: "Grote Meter also had plenty of work. The eldest daughter Maria was her support and refuge.",
      sociaalEngagementText: "Madeleine was also socially engaged: she made herself useful in food distribution, at the consultations of the 'Health Service' and the Red Cross, and became a board member of the League of Large Families. (Later 'Bond van Kroostrijke Gezinnen', then 'Bond van Grote en Jonge Gezinnen', recently just the 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine at the Red Cross (far left)",
      zilverenHuwelijkText: "The family on January 10, 1943 — on the occasion of the silver wedding anniversary.",
      zilverenHuwelijkCaption: "l-r: front row: Monique - Hendrik (Rik) - Bérénice - Félice - Marcel - Madeleine - Gabriël (Gaby); back: André - Lucien - Daniël - Maria - Jooris (Georges)",
      nieuwHuisTitle: "The New House",
      nieuwHuisText: "Once again I'm confronted with major gaps in available information: how and when, and especially with what financial means my grandparents managed to buy and renovate the house next to theirs.",
      zakenText: "In any case, business must have been good and generated considerable profit.",
      bezettingWerkText: "The German occupation completely changed daily work in the Izegem carpentry shop. Due to wood shortages and strict rationing, they had to increasingly fall back on salvage material. Customers continued to order furniture: cabinets, tables, cradles, bedroom furniture, built-in closets, door and window fittings. Often modest, but indispensable.",
      nieuwHuisLinks: "Left: the new/renovated house (recent photo: it still looks unchanged since 1945 in 2026!)",
      bouwplanText: "We still have the original drawings for the renovation, by architect Emiel Allewaert. The plan suggests that a completely new house was built after demolishing the purchased old house.",
      eersteFotoText: "One of the first photos ever taken at the new facade, in spring 1946.",
      inrichtingText: "Much wood was used in the interior of the house. That was also the cheapest way: buying wood at professional rates and processing and installing it yourself.",
      representatiefText: "The house would clearly also serve a representative function from the start, it had to radiate the craftsmanship present. It was therefore furnished almost like a showroom.",
      doorlopendeGangText: "From the entrance hall there was a direct passage to the back door and through the backyard straight to the workshop.",
      huwelijksfotoText: "At each wedding of one of the daughters or sons, if it took place in Izegem, a photo was invariably taken in the entrance hall, at the foot of the stairs.",
      naOorlogseTitle: "The Post-War Period",
      naOorlogsText: "Grandfather Marcel worked hard to develop his sculpture and small furniture workshop into a furniture business.",
      groteMeterNaOorlogText: "Madeleine, Grote Meter, devoted herself to raising her younger children.",
      vlaamsgezindText: "Despite their Flemish-minded attitude, they were also true Belgians: if you want to be someone, if you want to mean something in this society then 'you must know your French'.",
      pensionaatText: "Madeleine had herself been to school in French for a few years and together with her husband they decided to send daughters Monique, Bérénice and Félice to boarding school with the nuns in Braine l'Alleud.",
      meisjesText: "The girls had the time of their lives there and learned etiquette and 'good manners' — to speak and write perfect French.",
      gezinsbondText: "Madeleine became more and more noticeable in social life in Izegem, consciously joining the 'better class' of self-employed. She had long been a member of the League of Large Families (founded in Izegem in 1922 as the 'Bond van Talrijke Gezinnen' by Emiel Allewaert — indeed: the architect and mayor).",
      gezinsbondCaption: "At the blessing of the new flag in 1961: l-r town clerk Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, mayor Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt from headquarters, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert and Julien Demeurisse.",
      gezinsbondArtikelText: "The Gezinsbond (originally 'Bond van Talrijke Gezinnen') was founded in Izegem in June 1922 by Emiel Allewaert, then mayor and senator. After 80 years the movement already had three names. The second name was 'Bond van Kroostrijke Gezinnen', then 'Bond van Grote en Jonge Gezinnen', and recently it simply became 'Gezinsbond'. Through her commitment, Madeleine soon found herself on the board.",
      nieuwHuisRechts: "Right: on the site of the former house, the house of son André and his family was built later in the 1960s. The brown gate gave access to the furniture factory. That was where the truck was parked, and also where deliveries were prepared and the truck was loaded.",
      eersteFotoDetail: "Some faces I cannot identify (neighbours?). In the pram: Jan Deforce (11/11/45 – 21/03/1946), my older brother, who died of cot death before I was born.",
      clickToEnlarge: "Click to enlarge",
      close: "Close"
    },
    fr: {
      kinderenTitle: "La famille grandissante",
      kinderenText: "Marcel était un travailleur acharné qui ne ménageait pas ses heures de travail, et heureusement Madeleine était une femme forte pour gérer une famille en croissance rapide:",
      kinderenLijst: [
        "En mai 1924, une autre fille est née, qu'ils ont de nouveau appelée Beatrijs, cette fille mourrait aussi jeune, à seulement 3 ans.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Finalement 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "L'entrepreneur",
      bedrijfText: "Grand-père Marcel savait comment s'y prendre: il fabriquait des modèles de démonstration, allait littéralement de ferme en ferme pour faire des devis sur place.",
      zonenText: "Quand il avait plus de travail qu'il ne pouvait en gérer, il a embauché quelques employés. Son fils Georges, après avoir obtenu son diplôme en 1936, a dû rester à la maison et travailler dans l'entreprise.",
      atelierCaption: "Dans l'atelier, 1942. Flou au premier plan à gauche: Georges, à droite André.",
      merknaamText: "À partir de la fin des années '30, la marque de l'entreprise familiale est devenue 'Marcel Deforce & Fils'.",
      frustratieTekst: "Les frères ne s'entendaient pas toujours bien. Avec leurs caractères têtus, ils refoulaient beaucoup de frustrations.",
      pvbaText: "Il faudra attendre juin 1945 pour que l'entreprise familiale soit constituée en société.",
      oorlogTitle: "La période de guerre 1940-1945",
      oorlogText: "Lors de l'invasion allemande en 1940, Marcel, à 46 ans, n'était plus éligible pour être appelé comme soldat.",
      weinigVerhalenText: "Avec le recul, je remarque maintenant que mes grands-parents n'en ont jamais beaucoup parlé.",
      georgesText: "L'exception était mon père, Georges/Jooris, le seul des enfants déjà adulte au début de la guerre. Il a été réquisitionné par les Allemands pour travailler en Allemagne. Il a vécu une période intense et aventureuse. (Ses aventures seront abordées plus en détail plus loin dans ce livre).",
      attestText: "Peter n'appréciait guère de devoir se passer de son fils au travail dans l'atelier ; il fit une tentative vaine en adressant une lettre solennelle aux autorités déclarant combien son fils était indispensable. Malheureusement ce document n'est pas daté, et on ne sait pas non plus à quelle instance cette déclaration était adressée :",
      attestCaption: "Attestation de Marcel Deforce : son fils Joris est « une aide et un soutien indispensables » dans l'entreprise familiale",
      overvloedWerkText: "Il y avait donc — malgré les circonstances de guerre — apparemment encore abondance de travail !",
      ruilhandelText: "Les paiements se faisaient souvent par troc, avec de la nourriture ou du combustible au lieu de l'argent.",
      groteMeterOorlogText: "Grande Marraine avait aussi beaucoup de travail. La fille aînée Maria était son soutien.",
      sociaalEngagementText: "Madeleine était aussi socialement engagée : elle s'est rendue utile dans la distribution de nourriture et à la Croix-Rouge et est devenue membre du conseil de la Ligue des Familles Nombreuses. (Plus tard 'Bond van Kroostrijke Gezinnen', puis 'Bond van Grote en Jonge Gezinnen', récemment simplement la 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine à la Croix-Rouge (tout à gauche)",
      zilverenHuwelijkText: "La famille le 10 janvier 1943 — à l'occasion des noces d'argent.",
      zilverenHuwelijkCaption: "de g. à d.: premier rang: Monique - Hendrik (Rik) - Bérénice - Félice - Marcel - Madeleine - Gabriël (Gaby); arrière: André - Lucien - Daniël - Maria - Jooris (Georges)",
      nieuwHuisTitle: "La nouvelle maison",
      nieuwHuisText: "Une fois de plus, je suis confronté à de grandes lacunes dans les informations disponibles: comment et quand mes grands-parents ont réussi à acheter et rénover la maison voisine.",
      zakenText: "En tout cas, les affaires ont dû bien marcher et générer un bénéfice considérable.",
      bezettingWerkText: "L'occupation allemande a complètement changé le travail quotidien dans la menuiserie d'Izegem. Les clients continuaient à commander des meubles : armoires, tables, berceaux, meubles de chambre, placards encastrés. Souvent modestes, mais indispensables.",
      nieuwHuisLinks: "À gauche: la maison nouvelle/rénovée (photo récente: elle a toujours le même aspect depuis 1945!)",
      bouwplanText: "Nous avons encore les dessins originaux de la rénovation, de l'architecte Emiel Allewaert.",
      eersteFotoText: "L'une des premières photos jamais prises à la nouvelle façade, au printemps 1946.",
      inrichtingText: "Beaucoup de bois a été utilisé dans l'aménagement de la maison.",
      representatiefText: "La maison devait clairement aussi remplir une fonction représentative dès le départ.",
      doorlopendeGangText: "Depuis le hall d'entrée, il y avait un passage direct vers la porte arrière et vers l'atelier.",
      huwelijksfotoText: "À chaque mariage d'une des filles ou fils, si cela avait lieu à Izegem, une photo était invariablement prise dans le hall d'entrée.",
      naOorlogseTitle: "L'après-guerre",
      naOorlogsText: "Grand-père Marcel a travaillé dur pour développer son atelier de sculpture en une entreprise de meubles.",
      groteMeterNaOorlogText: "Madeleine, Grande Marraine, s'est consacrée à l'éducation de ses jeunes enfants.",
      vlaamsgezindText: "Malgré leur attitude pro-flamande, ils étaient aussi de vrais Belges: il fallait 'connaître son français'.",
      pensionaatText: "Madeleine avait elle-même été à l'école en français et avec son mari, ils ont décidé d'envoyer les filles au pensionnat chez les religieuses de Braine l'Alleud.",
      meisjesText: "Les filles y ont passé le meilleur moment de leur vie et ont appris l'étiquette et les 'bonnes manières'.",
      gezinsbondText: "Madeleine s'est fait remarquer de plus en plus dans la vie sociale d'Izegem, rejoignant consciemment la 'classe supérieure' des indépendants. Elle était depuis longtemps membre de la Ligue des Familles Nombreuses (fondée à Izegem en 1922 sous le nom de 'Bond van Talrijke Gezinnen' par Emiel Allewaert — en effet : l'architecte et bourgmestre).",
      gezinsbondCaption: "À la bénédiction du nouveau drapeau en 1961 : de g. à d. secrétaire communal Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, bourgmestre Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt du siège central, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert et Julien Demeurisse.",
      gezinsbondArtikelText: "La Gezinsbond (à l'origine 'Bond van Talrijke Gezinnen') a été fondée à Izegem en juin 1922 par Emiel Allewaert, alors bourgmestre et sénateur. Après 80 ans, le mouvement a déjà porté trois noms. Le deuxième nom était 'Bond van Kroostrijke Gezinnen', puis 'Bond van Grote en Jonge Gezinnen', et récemment c'est devenu simplement la 'Gezinsbond'. Grâce à son engagement, Madeleine s'est rapidement retrouvée au conseil d'administration.",
      nieuwHuisRechts: "À droite : à l'emplacement de l'ancienne maison, la maison du fils André et de sa famille a été construite plus tard, dans les années '60. Le portail brun donnait accès à la fabrique de meubles. C'était l'emplacement du camion, et aussi l'endroit où les livraisons étaient préparées et le camion chargé.",
      eersteFotoDetail: "Certains visages je ne peux pas les identifier (des voisins ?). Dans le landau : Jan Deforce (11/11/45 – 21/03/1946), mon frère aîné, décédé de mort subite du nourrisson, avant ma naissance.",
      clickToEnlarge: "Cliquez pour agrandir",
      close: "Fermer"
    },
    de: {
      kinderenTitle: "Die wachsende Familie",
      kinderenText: "Marcel war ein harter Arbeiter, und glücklicherweise war Madeleine eine starke Frau, um eine schnell wachsende Familie zu führen:",
      kinderenLijst: [
        "Im Mai 1924 wurde wieder eine Tochter geboren, die sie erneut Beatrijs nannten, auch diese Tochter würde jung sterben.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Schließlich 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "Der Unternehmer",
      bedrijfText: "Großvater Marcel wusste, wie man anpackt: Er machte Demonstrationsmodelle, ging buchstäblich von Hof zu Hof, um vor Ort Angebote zu machen.",
      zonenText: "Als er mehr Arbeit hatte, als er bewältigen konnte, stellte er einige Mitarbeiter ein.",
      atelierCaption: "In der Werkstatt, 1942. Unscharf im Vordergrund links: Georges, rechts André.",
      merknaamText: "Ab Ende der 30er Jahre wurde der Markenname 'Marcel Deforce & Söhne' verwendet.",
      frustratieTekst: "Die Brüder verstanden sich nicht immer gut.",
      pvbaText: "Es dauerte bis Juni 1945, bis das Familienunternehmen in eine Gesellschaft umgewandelt wurde.",
      oorlogTitle: "Die Kriegszeit 1940-1945",
      oorlogText: "Beim deutschen Einmarsch 1940 war Marcel mit 46 Jahren nicht mehr für den Militärdienst in Frage gekommen.",
      weinigVerhalenText: "Im Nachhinein fällt mir auf, dass meine Großeltern nie viel darüber erzählt haben.",
      georgesText: "Die Ausnahme war mein Vater Georges/Jooris, der einzige, der zu Kriegsbeginn schon erwachsen war. Er wurde von den Deutschen zur Arbeit nach Deutschland verpflichtet. Er erlebte eine intensive und abenteuerliche Zeit. (Seine Erlebnisse werden später in diesem Buch ausführlicher behandelt).",
      attestText: "Peter fand es gar nicht gut, seinen Sohn bei der Arbeit in der Werkstatt entbehren zu müssen; er unternahm einen vergeblichen Versuch, indem er einen feierlichen Brief an die Behörden richtete mit einer Erklärung, wie unentbehrlich sein Sohn sei. Leider ist dieses Dokument nicht datiert, und es ist auch unklar, an welche Instanz die Erklärung gerichtet war:",
      attestCaption: "Bescheinigung von Marcel Deforce: sein Sohn Joris ist ‚eine unentbehrliche Hilfe und Stütze' im Familienbetrieb",
      overvloedWerkText: "Es gab also — trotz der Kriegsumstände — offenbar noch reichlich Arbeit!",
      ruilhandelText: "Zahlungen erfolgten oft durch Tauschhandel, mit Lebensmitteln oder Brennstoff statt Geld.",
      groteMeterOorlogText: "Große Patin hatte auch viel Arbeit. Die älteste Tochter Maria war ihre Stütze.",
      sociaalEngagementText: "Madeleine war auch sozial engagiert: beim Roten Kreuz und bei der Lebensmittelverteilung und wurde Vorstandsmitglied des Bundes der kinderreichen Familien. (Später 'Bond van Kroostrijke Gezinnen', dann 'Bond van Grote en Jonge Gezinnen', kürzlich einfach 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine beim Roten Kreuz (ganz links)",
      zilverenHuwelijkText: "Die Familie am 10. Januar 1943 — anlässlich der Silberhochzeit.",
      zilverenHuwelijkCaption: "v.l.n.r.: vordere Reihe: Monique - Hendrik - Bérénice - Félice - Marcel - Madeleine - Gabriël; hinten: André - Lucien - Daniël - Maria - Jooris",
      nieuwHuisTitle: "Das neue Haus",
      nieuwHuisText: "Wieder einmal werde ich mit großen Lücken in den verfügbaren Informationen konfrontiert.",
      zakenText: "Jedenfalls müssen die Geschäfte gut gelaufen sein.",
      bezettingWerkText: "Die deutsche Besatzung veränderte die tägliche Arbeit in der Tischlerei vollständig. Kunden bestellten weiterhin Möbel: Schränke, Tische, Wiegen, Schlafzimmermöbel, Einbauschränke. Oft bescheiden, aber unentbehrlich.",
      nieuwHuisLinks: "Links: das neue/renovierte Haus (Foto: sieht 2026 noch genauso aus wie 1945!)",
      bouwplanText: "Wir haben noch die Originalzeichnungen für den Umbau vom Architekten Emiel Allewaert.",
      eersteFotoText: "Eines der ersten Fotos an der neuen Fassade, im Frühjahr 1946.",
      inrichtingText: "Bei der Einrichtung des Hauses wurde viel Holz verwendet.",
      representatiefText: "Das Haus sollte von Anfang an auch eine repräsentative Funktion erfüllen.",
      doorlopendeGangText: "Von der Eingangshalle führte ein direkter Gang zur Hintertür und zur Werkstatt.",
      huwelijksfotoText: "Bei jeder Hochzeit wurde unweigerlich ein Foto in der Eingangshalle gemacht.",
      naOorlogseTitle: "Die Nachkriegszeit",
      naOorlogsText: "Großvater Marcel arbeitete hart daran, seine Werkstatt zu einem Möbelunternehmen zu entwickeln.",
      groteMeterNaOorlogText: "Madeleine widmete sich der Erziehung ihrer jüngeren Kinder.",
      vlaamsgezindText: "Trotz ihrer flämisch-gesinnten Einstellung waren sie auch echte Belgier.",
      pensionaatText: "Madeleine war selbst einige Jahre auf Französisch zur Schule gegangen und sie beschlossen, die Töchter ins Pensionat zu schicken.",
      meisjesText: "Die Mädchen hatten dort die Zeit ihres Lebens und lernten Etikette.",
      gezinsbondText: "Madeleine machte sich im gesellschaftlichen Leben von Izegem immer mehr bemerkbar und schloss sich bewusst der 'besseren Klasse' der Selbstständigen an. Sie war schon länger Mitglied des Bundes kinderreicher Familien (1922 in Izegem als 'Bond van Talrijke Gezinnen' von Emiel Allewaert gegründet — in der Tat: der Architekt und Bürgermeister).",
      gezinsbondCaption: "Bei der Weihe der neuen Fahne 1961: v.l.n.r. Stadtsekretär Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, Bürgermeister Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt vom Hauptvorstand, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert und Julien Demeurisse.",
      gezinsbondArtikelText: "Der Gezinsbond (ursprünglich 'Bond van Talrijke Gezinnen') wurde im Juni 1922 in Izegem von Emiel Allewaert gegründet, damals Bürgermeister und Senator. Nach 80 Jahren hatte die Bewegung bereits drei Namen getragen. Der zweite Name war 'Bond van Kroostrijke Gezinnen', dann 'Bond van Grote en Jonge Gezinnen', und kürzlich wurde es einfach 'Gezinsbond'. Durch ihr Engagement kam Madeleine bald in den Vorstand.",
      nieuwHuisRechts: "Rechts: An der Stelle des ehemaligen Hauses wurde später in den 60er Jahren das Haus von Sohn André und seiner Familie gebaut. Das braune Tor gab Zugang zur Möbelfabrik. Dort stand der Lastwagen, und dort wurden auch die Lieferungen vorbereitet und der Lastwagen beladen.",
      eersteFotoDetail: "Einige Gesichter kann ich nicht identifizieren (Nachbarn?). Im Kinderwagen: Jan Deforce (11.11.45 – 21.03.1946), mein älterer Bruder, an plötzlichem Kindstod verstorben, vor meiner Geburt.",
      clickToEnlarge: "Zum Vergrößern klicken",
      close: "Schließen"
    },
    es: {
      kinderenTitle: "La familia en crecimiento",
      kinderenText: "Marcel era un trabajador duro, y afortunadamente Madeleine era una mujer fuerte para manejar una familia en rápido crecimiento:",
      kinderenLijst: [
        "En mayo de 1924 nació otra hija, que también llamaron Beatrijs, esta hija también moriría joven.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Finalmente 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "El empresario",
      bedrijfText: "El abuelo Marcel sabía cómo hacer las cosas: hacía modelos de demostración, iba literalmente de granja en granja.",
      zonenText: "Cuando tenía más trabajo del que podía manejar, contrató a algunos empleados.",
      atelierCaption: "En el taller, 1942. Borroso en primer plano izquierda: Georges, derecha André.",
      merknaamText: "Desde finales de los '30, la marca de la empresa familiar se convirtió en 'Marcel Deforce & Hijos'.",
      frustratieTekst: "Los hermanos no siempre se llevaban bien.",
      pvbaText: "Tomaría hasta junio de 1945 para que la empresa familiar se constituyera como sociedad.",
      oorlogTitle: "El período de guerra 1940-1945",
      oorlogText: "En la invasión alemana de 1940, Marcel, a sus 46 años, ya no era elegible para ser llamado como soldado.",
      weinigVerhalenText: "En retrospectiva, noto que mis abuelos nunca hablaron mucho de eso.",
      georgesText: "La excepción fue mi padre, Georges/Jooris, el único que ya era adulto al inicio de la guerra. Fue requisado por los alemanes para trabajar en Alemania. Vivió un período intenso y aventurero. (Sus vivencias se abordarán con más detalle más adelante en este libro).",
      attestText: "A Peter no le gustaba nada tener que prescindir de su hijo en el trabajo del taller; hizo un intento infructuoso escribiendo una carta solemne a las autoridades declarando lo indispensable que era su hijo. Lamentablemente este documento no está fechado, y tampoco está claro a qué instancia iba dirigida la declaración:",
      attestCaption: "Certificado de Marcel Deforce: su hijo Joris es 'una ayuda y apoyo indispensable' en la empresa familiar",
      overvloedWerkText: "Así que había — a pesar de las circunstancias de guerra — aparentemente todavía abundancia de trabajo!",
      ruilhandelText: "Los pagos se hacían a menudo por trueque, con comida o combustible en lugar de dinero.",
      groteMeterOorlogText: "La Gran Madrina también tenía mucho trabajo. La hija mayor María era su apoyo.",
      sociaalEngagementText: "Madeleine también estaba socialmente comprometida: en la Cruz Roja y en la distribución de alimentos, y se convirtió en miembro de la junta de la Liga de Familias Numerosas. (Más tarde 'Bond van Kroostrijke Gezinnen', luego 'Bond van Grote en Jonge Gezinnen', recientemente simplemente 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine en la Cruz Roja (extremo izquierdo)",
      zilverenHuwelijkText: "La familia el 10 de enero de 1943 — con motivo de las bodas de plata.",
      zilverenHuwelijkCaption: "de izq. a der.: fila delantera: Monique - Hendrik - Bérénice - Félice - Marcel - Madeleine - Gabriël; atrás: André - Lucien - Daniël - Maria - Jooris",
      nieuwHuisTitle: "La nueva casa",
      nieuwHuisText: "Una vez más me enfrento a grandes lagunas en la información disponible.",
      zakenText: "En cualquier caso, los negocios debieron ir bien.",
      bezettingWerkText: "La ocupación alemana cambió completamente el trabajo diario en la carpintería. Los clientes seguían encargando muebles: armarios, mesas, cunas, muebles de dormitorio, armarios empotrados. A menudo modestos, pero indispensables.",
      nieuwHuisLinks: "Izquierda: la casa nueva/renovada (foto reciente: ¡sigue igual desde 1945!)",
      bouwplanText: "Todavía tenemos los planos originales de la renovación del arquitecto Emiel Allewaert.",
      eersteFotoText: "Una de las primeras fotos tomadas en la nueva fachada, primavera 1946.",
      inrichtingText: "Se usó mucha madera en el interior de la casa.",
      representatiefText: "La casa debía cumplir claramente una función representativa desde el principio.",
      doorlopendeGangText: "Desde el vestíbulo había un pasaje directo hacia la puerta trasera y el taller.",
      huwelijksfotoText: "En cada boda se tomaba invariablemente una foto en el vestíbulo.",
      naOorlogseTitle: "El período de posguerra",
      naOorlogsText: "El abuelo Marcel trabajó duro para desarrollar su taller en una empresa de muebles.",
      groteMeterNaOorlogText: "Madeleine se dedicó a criar a sus hijos menores.",
      vlaamsgezindText: "A pesar de su actitud pro-flamenca, también eran verdaderos belgas.",
      pensionaatText: "Madeleine había ido a la escuela en francés y decidieron enviar a las hijas al internado.",
      meisjesText: "Las chicas pasaron allí el mejor tiempo de sus vidas y aprendieron etiqueta.",
      gezinsbondText: "Madeleine se hizo notar cada vez más en la vida social de Izegem, uniéndose conscientemente a la 'clase superior' de autónomos. Había sido miembro desde hacía tiempo de la Liga de Familias Numerosas (fundada en Izegem en 1922 como 'Bond van Talrijke Gezinnen' por Emiel Allewaert — en efecto: el arquitecto y alcalde).",
      gezinsbondCaption: "En la bendición de la nueva bandera en 1961: de izq. a der. secretario municipal Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, alcalde Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt de la sede central, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert y Julien Demeurisse.",
      gezinsbondArtikelText: "El Gezinsbond (originalmente 'Bond van Talrijke Gezinnen') fue fundado en Izegem en junio de 1922 por Emiel Allewaert, entonces alcalde y senador. Después de 80 años, el movimiento ya había tenido tres nombres. El segundo nombre fue 'Bond van Kroostrijke Gezinnen', luego 'Bond van Grote en Jonge Gezinnen', y recientemente se convirtió simplemente en 'Gezinsbond'. Gracias a su compromiso, Madeleine pronto se encontró en la junta directiva.",
      nieuwHuisRechts: "Derecha: en el lugar de la antigua casa se construyó más tarde, en los años 60, la casa del hijo André y su familia. El portón marrón daba acceso a la fábrica de muebles. Allí estaba estacionado el camión, y también era el lugar donde se preparaban las entregas y se cargaba el camión.",
      eersteFotoDetail: "Algunos rostros no puedo identificarlos (¿vecinos?). En el cochecito: Jan Deforce (11/11/45 – 21/03/1946), mi hermano mayor, fallecido por muerte súbita del lactante, antes de mi nacimiento.",
      clickToEnlarge: "Haga clic para ampliar",
      close: "Cerrar"
    },
    vls: {
      kinderenTitle: "'t Groeiende gezin",
      kinderenText: "Marcel wos 'n harden werker, en gelukkig wos Madeleine 'n sterke vrouwe voe 'n snel aangroeiend gezin te bestieren:",
      kinderenLijst: [
        "In mei 1924 wier were 'n dochter geboorn, die ze opnieuw Beatrijs nuumden, ook deze dochter zou jong stervn.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Ten slottn 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "Den ondernemer",
      bedrijfText: "Grootvoader Marcel wist van oanpakkn: hee moaktj demonstratiemodellen, hee gieng letterlik de boer op.",
      zonenText: "Toe'n hee mé werk ad dan da'j oan kon, nam hee 'n poar medewerkers in dienst.",
      atelierCaption: "In 't atelier, 1942. Onscherp op de voorgrond links: Georges, rechts André.",
      merknaamText: "Vanof 't einde van de joaren '30 wier de merknaam 'Marcel Deforce & Zeunes' gebruukt.",
      frustratieTekst: "De broers kwamen ook nie oltied goed overéen.",
      pvbaText: "'t Zou nog duurn tot juni 1945 voe 't familiebedriever in 'n vennootschap gebracht wier.",
      oorlogTitle: "De oorlogstied 1940-1945",
      oorlogText: "Bie de Duutse inval in 1940 kwam Marcel, op 'n ouderdom van 46 joar, nie mé in oanmerking voe opgeroepn te worrn.",
      weinigVerhalenText: "Achteraf bekekn valt 't me nu op dat mien grootouders der nooit vele over verteld em.",
      georgesText: "De uutzondering wos mienen voader, Georges/Jooris, de énige die al volwassn wos bie 't begin van de oorlog. Hee wier door de Duutsers opgeroepn voe in Duutsland te goan werkn. Hee beleefde 'n intense en avontuurlike periode. (Zien belevenissn kommn verder in dit boek uutgebreider oan bod).",
      attestText: "Peter vond 't moar niks zienen zeune te moettn missn bie 't werk in 't atelier; hee dee 'n vergeefse poging deur 'n plechtige brief te richtn oan de overheidn mee 'n verkloring oe onmisboar da zienen zeune wel wos. Jammoer da da document nie gedateerd is, en 't is ook nie duudlik oan welke instantie da die verkloring gericht wos:",
      attestCaption: "Attest van Marcel Deforce: zienen zeune Joris is 'n onmisbare hulpe en steun in 't familiebedriever",
      overvloedWerkText: "Der wos dus — ondanks de oorlogsomstandigheidn — bliekboar toch overvloed oan werk!",
      ruilhandelText: "Betoalingen gebeurden dikwils via ruilhandel, mee etn of brandstof in plak van geld.",
      groteMeterOorlogText: "Grote Meter ad ook overvloed oan werk. De oudste dochter Maria wos heur steun en toeverloat.",
      sociaalEngagementText: "Madeleine wos ook sociaal geëngageerd: bie 't Rode Kruis en de voedselbedeling en wier bestuurslid bie de Bond van Talrieke Gezinntn. (Loater 'Bond van Kroostrike Gezinntn', dan 'Bond van Groote en Jonge Gezinntn', recint gewoon de 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine bie 't Rode Kruis (uiterst links)",
      zilverenHuwelijkText: "'t Gezin op 10 januari 1943 — voe 't zilvern huwelijksjubileum.",
      zilverenHuwelijkCaption: "vlnr: op de voorste rij: Monique - Hendrik - Bérénice - Félice - Marcel - Madeleine - Gabriël; achteroan: André - Lucien - Daniël - Maria - Jooris",
      nieuwHuisTitle: "'t Nieuwe hus",
      nieuwHuisText: "Wereens wor ik geconfronteerd mee grote lacunes in de beschikbare informoatie.",
      zakenText: "In elk geval, de zoaken moettn goed gelopen em.",
      bezettingWerkText: "De Duutse bezetting veranderde 't dagelikse werk in de Izegemse schrienwerkerie volledig. Klantn bleevn meubels bestelln: kastn, tofels, wiegsjes, sloopkamermeubels, ingebouwde kastn. Dikwils bescheidn, moar onmisboar.",
      nieuwHuisLinks: "Links: 't nieuwe hus (recente foto: 't ziet der in 2026 nog steeds onveranderd uut!)",
      bouwplanText: "We beschikkn nog over de originele tekeningen van architect Emiel Allewaert.",
      eersteFotoText: "Éen van de eeste foto's oan de nieuwe voorgevel, in 't voorjoar 1946.",
      inrichtingText: "Bie de inrichting van 't hus wier vele hout gebruukt.",
      representatiefText: "'t Hus zou van meetof oan ook 'n representatieve functie vervulln.",
      doorlopendeGangText: "Vanuut de inkomhal wos der 'n rechtstreeks doorlopende gang noar de achterdeure.",
      huwelijksfotoText: "Bie elk huwelijk wier steevoast 'n foto gemoakt in de inkomhal.",
      naOorlogseTitle: "De no-oorlogse periode",
      naOorlogsText: "Grootvoader Marcel werktj hard oan 't ontwikkeln van zien werkplak tot 'n meubelbedriever.",
      groteMeterNaOorlogText: "Madeleine, Grote Meter, lei zich toe op de opvoeding van heur jongere kinders.",
      vlaamsgezindText: "Ondanks hun vlaamsgezinde ingesteldheid woarn ze ook echte Belgen.",
      pensionaatText: "Madeleine ad zelf 'n poar joar in 't Frans school geweest en ze beslisten de dochters op pensionoat te sturen.",
      meisjesText: "De miesjes addn der dé plezante tied van hun levn.",
      gezinsbondText: "Madeleine liet zich mé en mé opmerkn in 't sociaal levn in Izegem, doarbie bewust oanslutend bie de 'betere klasse' van zelfstandigen. Ze wos al langer lid van de Bond van Kroostrike Gezinntn (die al in 1922 in Izegem onder de naam van 'Bond van Talrike Gezinntn' gesticht wos deur Emiel Allewaert — inderdoad: den architekt en burgemeester).",
      gezinsbondCaption: "Bie de wieding van de nieuwe vlagge in 1961: vlnr. stadssecretaris Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, burgemeester Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt van 't hoofdbestuur, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert en Julien Demeurisse.",
      gezinsbondArtikelText: "De Gezinsbond (oorspronklik 'Bond van Talrike Gezinntn') wier in juni 1922 in Izegem gesticht deur Emiel Allewaert, destijds burgemeester en senatoer. No 80 joar werking kreegs de beweging al drie noamen. De tweede noam wos 'Bond van Kroostrike Gezinntn', daarnoa 'Bond van Groote en Jonge Gezinntn', en recint wier da gewoon de 'Gezinsbond'. Deur heur engagement kwam Madeleine al gauw in 't bestuur terecht.",
      nieuwHuisRechts: "Rechts: op de plekke van 't vroeger hus kwam loater, in de joaren '60, 't hus van zeune André en zien gezin. De bruune poorte gaf doorgang noar de meubelfabriek. Doar wos de standplak van de camion, tegelijk de plekke woar da de leveringen kloargezet wierden en woar da de camion geloadn wier.",
      eersteFotoDetail: "Sommige gezichtn kan 'k nie identificeern (gebuurn?). In de koetse: Jan Deforce (11/11/45 – 21/03/1946), mienen ouder broere, gestorven deur wiegedood, voe mien geboorte.",
      clickToEnlarge: "Klik voe te vergrotn",
      close: "Slutn"
    },
    pcd: {
      kinderenTitle: "L'famile qu'grandit",
      kinderenText: "Marcel il étoét in dur travailleu, et heureusement Madeleine al étoét eune forte femme pour diriger eune famile qu'grandissoét vite:",
      kinderenLijst: [
        "In mai 1924, eune aut fille al est née, qu'is ont core appelée Beatrijs, ete fille al mouroét ossi jeune.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Enfin 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "L'entrepreneur",
      bedrijfText: "Grand-père Marcel i savoét coumint s'y prinde: i faisoét des modèles ed démonstration, i alloét littéralémint d'ferme in ferme.",
      zonenText: "Quand il avoét pu d'travail qu'i pouvoét faire, il a embauché quéques ouvriers.",
      atelierCaption: "Dins l'atelier, 1942. Flou au premier plan à gauche: Georges, à droite André.",
      merknaamText: "À partir d'la fin des années '30, l'nom d'marque ed l'entreprise familiale est d'venu 'Marcel Deforce & Fils'.",
      frustratieTekst: "Les frères is n'étoent point toudis d'accord.",
      pvbaText: "I faudroét attinde juin 1945 pour qu'l'entreprise deviengne eune société.",
      oorlogTitle: "L'période ed guerre 1940-1945",
      oorlogText: "À l'invasion allemande in 1940, Marcel, à 46 ans, i n'étoét pus éligibe pour être appelé comme soldat.",
      weinigVerhalenText: "Aveuc l'recul, j'remarque qu'mes grands-parents n'ont jamais bécop parlé d'cha.",
      georgesText: "L'exception ch'étoét min père, Georges/Jooris, l'seul qu'étoét déjà adulte au début d'la guerre. Il a été réquisitionné par les Allemands pour travaillier in Allemagne. Il a vécu eune période intense et aventureuse. (Ses aventures is sont racontées pus loin dins ch'live).",
      attestText: "Peter i trouvoét cha point bé d'dévouér s'passer d'sin fieu au travail dins l'atelier ; il a fait eune tentative in envoyant eune lettre solennelle aux autorités pour dire combien qu'sin fieu étoét indispensabe. Dommage qu'ch'document i n'est point daté, et on n'sait point non pus à quelle instance cha étoét adressé :",
      attestCaption: "Attestation ed Marcel Deforce : sin fieu Joris ch'est « eune aide et in soutien indispensabes » dins l'entreprise familiale",
      overvloedWerkText: "I y avoét donc — malgré les circonstances d'guerre — apparamment incor bécop d'travail !",
      ruilhandelText: "Les paiements s'faisoent souvint par troc, aveuc d'la nourriture ou du combustibe.",
      groteMeterOorlogText: "Grand'Mérin al avoét ossi bécop d'travail. L'fille aînée Maria al étoét s'n soutien.",
      sociaalEngagementText: "Madeleine al étoét ossi socialment engagée: à la Croix-Rouge et à la distribution d'nourriture et al est d'venue membre du conseil d'la Ligue des Familes Nombreuses. (Pus tard 'Bond van Kroostrijke Gezinnen', pis 'Bond van Grote en Jonge Gezinnen', récemmint tout simplemint la 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine à la Croix-Rouge (tout à gauche)",
      zilverenHuwelijkText: "L'famile el 10 janvier 1943 — pour les noces d'argint.",
      zilverenHuwelijkCaption: "d'gauche à droite: rang d'avant: Monique - Hendrik - Bérénice - Félice - Marcel - Madeleine - Gabriël; derrière: André - Lucien - Daniël - Maria - Jooris",
      nieuwHuisTitle: "L'nouvèle maison",
      nieuwHuisText: "Incor eune fois j'sus confronté à des grandes lacunes dins les informations disponibles.",
      zakenText: "In tout cas, les affaires ont dû bé marcher.",
      bezettingWerkText: "L'occupation allemande al a complètement changé l'travail quotidien dins la minuiserie. Les clients is continuoent à commander des meubles : armoires, tabes, berceaux, meubles ed chambe. Souvint modestes, mais indispensabes.",
      nieuwHuisLinks: "À gauche: la maison nouvèle/rénovée (photo récente: al a toudis l'même aspect depuis 1945!)",
      bouwplanText: "Os avons incor les dessins originaux d'l'architecque Emiel Allewaert.",
      eersteFotoText: "Eune des premières photos à la nouvèle façade, au printimps 1946.",
      inrichtingText: "Bécop d'bos a été utilisé dins l'aménagement d'la maison.",
      representatiefText: "La maison al devoét ossi remplir eune fonction représentative dès l'début.",
      doorlopendeGangText: "Depuis l'hall d'entrée, i y avoét in passage direct vers la porte arrière et l'atelier.",
      huwelijksfotoText: "À chaque mariage, eune photo étoét invariablémint prise dins l'hall d'entrée.",
      naOorlogseTitle: "L'après-guerre",
      naOorlogsText: "Grand-père Marcel i travailloét dur pour développer sin atelier in eune entreprise ed meubles.",
      groteMeterNaOorlogText: "Madeleine, Grand'Mérin, al s'est consacrée à l'éducation d'ses jeunes infants.",
      vlaamsgezindText: "Malgré leur attitude pro-flamande, is étoent ossi d'vrais Belges.",
      pensionaatText: "Madeleine al avoét été à l'école in français et is ont décidé d'invoyer les filles au pensionnat.",
      meisjesText: "Les filles is ont passé l'meilleur moment d'leur vie là-bas.",
      gezinsbondText: "Madeleine al s'est fait remarquer d'pus in pus dins la vie sociale d'Izegem, in rejoignant consciemment la 'classe supérieure' des indépendants. Al étoét d'longue date membre ed la Ligue des Familes Nombreuses (fondée à Izegem in 1922 sous l'nom ed 'Bond van Talrijke Gezinnen' par Emiel Allewaert — in effet : l'architecque et bourgmestre).",
      gezinsbondCaption: "À la bénédiction du nouviau drapeau in 1961 : d'gauche à droite secrétaire communal Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, bourgmestre Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt du siège cintral, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert et Julien Demeurisse.",
      gezinsbondArtikelText: "El Gezinsbond (à l'origine 'Bond van Talrijke Gezinnen') al a été fondée à Izegem in juin 1922 par Emiel Allewaert, alors bourgmestre et sénateur. Après 80 ans, l'mouvemint il avoét déjà porté trois noms. L'deuxième nom ch'étoét 'Bond van Kroostrijke Gezinnen', pis 'Bond van Grote en Jonge Gezinnen', et récemmint ch'est d'venu tout simplemint la 'Gezinsbond'. Grâce à sin engagemint, Madeleine al s'est vite r'trouvée au conseil d'administration.",
      nieuwHuisRechts: "À droite : à l'emplacemint d'l'ancienne maison, la maison du fieu André et d'sa famile al a été construite pus tard, dins les années '60. L'portail brun i donnoét accès à la fabrique ed meubles. Ch'étoét l'emplacemint du camion, et ossi l'indroét où les livraisons étoent préparées et l'camion chargé.",
      eersteFotoDetail: "Quéques visages j'peux point les identifier (des voisins ?). Dins l'landau : Jan Deforce (11/11/45 – 21/03/1946), min frère aîné, décédé d'mort subite du nourrisson, avant m'naissance.",
      clickToEnlarge: "Cliquez pour agrandir",
      close: "Fermer"
    },
    sv: {
      kinderenTitle: "Den växande familjen",
      kinderenText: "Marcel var en hård arbetare, och lyckligtvis var Madeleine en stark kvinna för att hantera en snabbt växande familj:",
      kinderenLijst: [
        "I maj 1924 föddes ytterligare en dotter som de återigen kallade Beatrijs, även denna dotter skulle dö ung.",
        "7/02/1926: André",
        "31/08/1927: Daniël",
        "09/12/1929: Lucien",
        "30/09/1931: Hendrik",
        "07/09/1932: Monique",
        "21/01/1934: Bérénice",
        "5/08/1935: Félice",
        "Slutligen 11/01/1937: Gabriël"
      ],
      bedrijfTitle: "Företagaren",
      bedrijfText: "Farfar Marcel visste hur man tar tag i saker: han gjorde demonstrationsmodeller, gick bokstavligen från gård till gård.",
      zonenText: "När han hade mer arbete än han kunde hantera anställde han några medarbetare.",
      atelierCaption: "I verkstaden, 1942. Suddigt i förgrunden till vänster: Georges, till höger André.",
      merknaamText: "Från slutet av 30-talet blev varumärket 'Marcel Deforce & Söner'.",
      frustratieTekst: "Bröderna kom inte alltid överens.",
      pvbaText: "Det skulle dröja till juni 1945 innan familjeföretaget ombildades till bolag.",
      oorlogTitle: "Krigsperioden 1940-1945",
      oorlogText: "Vid den tyska invasionen 1940 var Marcel, vid 46 års ålder, inte längre kvalificerad för militärtjänst.",
      weinigVerhalenText: "I efterhand märker jag att mina mor- och farföräldrar aldrig pratade mycket om det.",
      georgesText: "Undantaget var min far, Georges/Jooris, den enda som redan var vuxen vid krigets början. Han rekvirerades av tyskarna för arbete i Tyskland. Han upplevde en intensiv och äventyrlig period. (Hans upplevelser behandlas mer utförligt senare i denna bok).",
      attestText: "Peter tyckte inte alls om att behöva avvara sin son vid arbetet i verkstaden; han gjorde ett fruktlöst försök genom att skriva ett högtidligt brev till myndigheterna med en förklaring om hur oumbärlig hans son var. Tyvärr är detta dokument inte daterat, och det är inte heller klart till vilken instans förklaringen riktades:",
      attestCaption: "Intyg från Marcel Deforce: hans son Joris är 'en oumbärlig hjälp och stöd' i familjeföretaget",
      overvloedWerkText: "Det fanns alltså — trots krigsomständigheterna — tydligen fortfarande gott om arbete!",
      ruilhandelText: "Betalningar skedde ofta genom byteshandel, med mat eller bränsle istället för pengar.",
      groteMeterOorlogText: "Stor Gudmor hade också gott om arbete. Äldsta dottern Maria var hennes stöd.",
      sociaalEngagementText: "Madeleine var också socialt engagerad: vid Röda Korset och vid matutdelning och blev styrelseledamot i Förbundet för stora familjer. (Senare 'Bond van Kroostrijke Gezinnen', sedan 'Bond van Grote en Jonge Gezinnen', nyligen helt enkelt 'Gezinsbond'.)",
      rodeKruisCaption: "Madeleine vid Röda Korset (längst till vänster)",
      zilverenHuwelijkText: "Familjen den 10 januari 1943 — vid silverbröllpet.",
      zilverenHuwelijkCaption: "v.t.h.: främre raden: Monique - Hendrik - Bérénice - Félice - Marcel - Madeleine - Gabriël; bak: André - Lucien - Daniël - Maria - Jooris",
      nieuwHuisTitle: "Det nya huset",
      nieuwHuisText: "Återigen konfronteras jag med stora luckor i tillgänglig information.",
      zakenText: "I alla fall måste affärerna ha gått bra.",
      bezettingWerkText: "Den tyska ockupationen förändrade helt det dagliga arbetet i snickeriet. Kunder fortsatte att beställa möbler: skåp, bord, vaggor, sovrumsmöbler, inbyggda skåp. Ofta anspråkslöst, men oumbärligt.",
      nieuwHuisLinks: "Vänster: det nya/renoverade huset (nytt foto: ser fortfarande likadant ut sedan 1945!)",
      bouwplanText: "Vi har fortfarande originalritningarna från arkitekt Emiel Allewaert.",
      eersteFotoText: "Ett av de första fotona vid den nya fasaden, våren 1946.",
      inrichtingText: "Mycket trä användes vid inredningen av huset.",
      representatiefText: "Huset skulle tydligt också fylla en representativ funktion från början.",
      doorlopendeGangText: "Från entrén fanns en direkt passage till bakdörren och verkstaden.",
      huwelijksfotoText: "Vid varje bröllop togs ofelbart ett foto i entrén.",
      naOorlogseTitle: "Efterkrigstiden",
      naOorlogsText: "Farfar Marcel arbetade hårt för att utveckla sin verkstad till ett möbelföretag.",
      groteMeterNaOorlogText: "Madeleine ägnade sig åt att uppfostra sina yngre barn.",
      vlaamsgezindText: "Trots sin flamländska inställning var de också äkta belgare.",
      pensionaatText: "Madeleine hade själv gått i skola på franska och de beslutade att skicka döttrarna till internatskola.",
      meisjesText: "Flickorna hade den bästa tiden av sitt liv där.",
      gezinsbondText: "Madeleine blev allt mer märkbar i Izegems sociala liv och anslöt sig medvetet till den 'bättre klassen' av egenföretagare. Hon hade länge varit medlem i Förbundet för stora familjer (grundat i Izegem 1922 som 'Bond van Talrijke Gezinnen' av Emiel Allewaert — just det: arkitekten och borgmästaren).",
      gezinsbondCaption: "Vid invigningen av den nya flaggan 1961: fr.v.t.h. stadssekreterare Michiel Tanghe, Noël Sintobin, Jules Vandeputte, Bruno Vandekerckhove, Camiel Verhaeghe, Marcel Clarisse, Alberic Denys, Raymond Werbrouck, Jozef Tytgat, Magdalena Geldof, Julien Stove, Gaspar Martin, borgmästare Jules Sintobin, Michel Terryn, Eugeen Debusschere, Remi Vandeputte, Valeer Deboodt från huvudstyrelsen, Henri Vangroenweghe, Raphaël Stragier, Pieter Tanghe, Daniël Verbeke, Maurice Bogaert och Julien Demeurisse.",
      gezinsbondArtikelText: "Gezinsbond (ursprungligen 'Bond van Talrijke Gezinnen') grundades i Izegem i juni 1922 av Emiel Allewaert, dåvarande borgmästare och senator. Efter 80 års verksamhet hade rörelsen redan haft tre namn. Det andra namnet var 'Bond van Kroostrijke Gezinnen', sedan 'Bond van Grote en Jonge Gezinnen', och nyligen blev det helt enkelt 'Gezinsbond'. Genom sitt engagemang hamnade Madeleine snart i styrelsen.",
      nieuwHuisRechts: "Höger: på platsen för det tidigare huset byggdes senare, på 60-talet, huset för sonen André och hans familj. Den bruna porten gav tillgång till möbelfabriken. Där stod lastbilen parkerad, och där förbereddes också leveranserna och lastades lastbilen.",
      eersteFotoDetail: "Vissa ansikten kan jag inte identifiera (grannar?). I barnvagnen: Jan Deforce (11/11/45 – 21/03/1946), min äldre bror, som dog i plötslig spädbarnsdöd, före min födelse.",
      clickToEnlarge: "Klicka för att förstora",
      close: "Stäng"
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <div ref={ref} className="space-y-12">
      {/* Kinderen section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t.kinderenTitle}
          </h3>
          <p>{t.kinderenText}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t.kinderenLijst.map((item, i) => (
              <li key={i} className="text-foreground/70">{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Bedrijf section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {t.bedrijfTitle}
          </h3>
          <p>{t.bedrijfText}</p>
        </div>

        <div className="prose prose-lg text-foreground/80">
          <p>{t.zonenText}</p>
        </div>

        <figure className="cursor-pointer group" onClick={() => setFullscreenImage(atelier1942)}>
          <div className="relative max-w-md mx-auto">
            <img src={atelier1942} alt={t.atelierCaption} className="w-full rounded-lg shadow-elevated" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">{t.atelierCaption}</figcaption>
        </figure>

        <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
          {/* 4 ondernemer foto's */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <figure className="cursor-pointer group" onClick={() => setFullscreenImage(briefhoofdMarcel)}>
              <div className="relative">
                <img src={briefhoofdMarcel} alt="Briefhoofd Marcel Deforce-Geldof" className="w-full rounded-lg shadow-elevated object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-1 text-xs text-muted-foreground italic text-center">Briefhoofd: Schrijnwerkerij Marcel Deforce-Geldof</figcaption>
            </figure>
            <figure className="cursor-pointer group" onClick={() => setFullscreenImage(catalogusCreations)}>
              <div className="relative">
                <img src={catalogusCreations} alt="Catalogus Les Dernières Créations du Mobilier" className="w-full rounded-lg shadow-elevated object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-1 text-xs text-muted-foreground italic text-center">Catalogus: Les Dernières Créations du Mobilier</figcaption>
            </figure>
            <figure className="cursor-pointer group" onClick={() => setFullscreenImage(meublesModernesBoek)}>
              <div className="relative">
                <img src={meublesModernesBoek} alt="Meubles Modernes en Bois Massif" className="w-full rounded-lg shadow-elevated object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-1 text-xs text-muted-foreground italic text-center">Meubles Modernes en Bois Massif – J. Arnoult, Paris</figcaption>
            </figure>
            <figure className="cursor-pointer group" onClick={() => setFullscreenImage(meublesModernesParisiens)}>
              <div className="relative">
                <img src={meublesModernesParisiens} alt="Meubles Modernes Parisiens" className="w-full rounded-lg shadow-elevated object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-1 text-xs text-muted-foreground italic text-center">Meubles Modernes Parisiens – ontwerptekening</figcaption>
            </figure>
          </div>

          <div className="prose prose-lg text-foreground/80">
            <p>{t.merknaamText}</p>
            <p>{t.frustratieTekst}</p>
            <p>{t.pvbaText}</p>
          </div>
        </ReadMore>
      </motion.div>

      {/* Oorlog section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Medal className="w-5 h-5" />
            {t.oorlogTitle}
          </h3>
          <p>{t.oorlogText}</p>
          <p className="italic">{t.weinigVerhalenText}</p>
          <p>{t.georgesText}</p>
        </div>

        <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
          <div className="prose prose-lg text-foreground/80">
            <p>{t.attestText}</p>
            <figure className="my-4">
              <div 
                className="relative cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => setFullscreenImage(attestOnmisbareZoon)}
              >
                <img 
                  src={attestOnmisbareZoon} 
                  alt={t.attestCaption}
                  className="w-full max-w-lg mx-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
              <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                {t.attestCaption}
              </figcaption>
            </figure>
            <p className="font-semibold">{t.overvloedWerkText}</p>
            <p>{t.ruilhandelText}</p>
          </div>
        </ReadMore>
      </motion.div>

      {/* Grote Meter tijdens oorlog */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <p>{t.groteMeterOorlogText}</p>
          <p>{t.sociaalEngagementText}</p>
        </div>

        <figure className="cursor-pointer group" onClick={() => setFullscreenImage(madeleineRodeKruis)}>
          <div className="relative max-w-md mx-auto">
            <img src={madeleineRodeKruis} alt={t.rodeKruisCaption} className="w-full rounded-lg shadow-elevated" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">{t.rodeKruisCaption}</figcaption>
        </figure>
      </motion.div>

      {/* Zilveren huwelijk */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-4 max-w-4xl mx-auto"
      >
        <p className="text-center text-foreground/80 font-medium">{t.zilverenHuwelijkText}</p>
        <figure className="cursor-pointer group" onClick={() => setFullscreenImage(gezinZilverenJubileum)}>
          <div className="relative">
            <img src={gezinZilverenJubileum} alt={t.zilverenHuwelijkCaption} className="w-full rounded-lg shadow-elevated" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">{t.zilverenHuwelijkCaption}</figcaption>
        </figure>
      </motion.div>

      {/* Nieuw huis section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            {t.nieuwHuisTitle}
          </h3>
          <p>{t.nieuwHuisText}</p>
          <p>{t.zakenText}</p>
          <p>{t.bezettingWerkText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="cursor-pointer group" onClick={() => setFullscreenImage(nieuwHuisVdb)}>
            <div className="relative">
              <img src={nieuwHuisVdb} alt={t.nieuwHuisLinks} className="w-full rounded-lg shadow-elevated" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground italic text-center">{t.nieuwHuisLinks}</figcaption>
            {'nieuwHuisRechts' in t && (
              <p className="mt-2 text-xs text-muted-foreground italic text-center">{(t as any).nieuwHuisRechts}</p>
            )}
          </figure>

          <figure className="cursor-pointer group" onClick={() => setFullscreenImage(bouwplanVerbouwing)}>
            <div className="relative">
              <img src={bouwplanVerbouwing} alt={t.bouwplanText} className="w-full rounded-lg shadow-elevated" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </figure>
        </div>

        <div className="prose prose-lg text-foreground/80">
          <p>{t.bouwplanText}</p>
        </div>

        <figure className="cursor-pointer group" onClick={() => setFullscreenImage(nieuweVoorgevel1946)}>
          <div className="relative max-w-lg mx-auto">
            <img src={nieuweVoorgevel1946} alt={t.eersteFotoText} className="w-full rounded-lg shadow-elevated" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">{t.eersteFotoText}</figcaption>
          {'eersteFotoDetail' in t && (
            <p className="mt-1 text-xs text-muted-foreground/70 italic text-center">{(t as any).eersteFotoDetail}</p>
          )}
        </figure>

        <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
          <div className="prose prose-lg text-foreground/80">
            <p>{t.inrichtingText}</p>
            <p>{t.representatiefText}</p>
            <p>{t.doorlopendeGangText}</p>
            <p>{t.huwelijksfotoText}</p>
          </div>

          <figure className="cursor-pointer group mt-4" onClick={() => setFullscreenImage(huwelijksfotoTrap)}>
            <div className="relative max-w-md mx-auto">
              <img src={huwelijksfotoTrap} alt="Huwelijksfoto in de inkomhal" className="w-full rounded-lg shadow-elevated" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </figure>
        </ReadMore>
      </motion.div>

      {/* Na-oorlogse periode */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Building className="w-5 h-5" />
            {t.naOorlogseTitle}
          </h3>
          <p>{t.naOorlogsText}</p>
          <p>{t.groteMeterNaOorlogText}</p>
        </div>

        <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
          <div className="prose prose-lg text-foreground/80">
            <p>{t.vlaamsgezindText}</p>
            <p>{t.pensionaatText}</p>
            <p>{t.meisjesText}</p>
          </div>
        </ReadMore>

        {/* Drie zusjes - Monique, Bérénice, Félice */}
        <figure className="cursor-pointer group mt-8" onClick={() => setActiveVideo(drieZusjesVideo)}>
          <div className="relative max-w-2xl mx-auto">
            <AiLabel className="top-2 left-2" />
            <img src={drieZusjes} alt="Monique, Bérénice en Félice Deforce, ca. 1950" className="w-full rounded-lg shadow-elevated" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <Play className="w-4 h-4" />
                <span>{language === 'en' ? 'Watch AI video' : language === 'fr' ? 'Voir la vidéo IA' : 'Bekijk AI-video'}</span>
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">
            {language === 'en' ? 'The three sisters: Monique, Bérénice and Félice (ca. 1950)' : language === 'fr' ? 'Les trois sœurs : Monique, Bérénice et Félice (ca. 1950)' : 'De drie zusjes: Monique, Bérénice en Félice (ca. 1950)'}
          </figcaption>
        </figure>

        {/* Stamboom Magdalena Geldof - 180° gedraaid met vergrootglas */}
        <figure className="mt-8">
          <div className="relative mx-auto cursor-pointer" onClick={() => setFullscreenImage(stamboomMagdalena)}>
            <ImageMagnifier
              src={stamboomMagdalena}
              alt="Stamboom Magdalena Geldof"
              className="overflow-hidden"
              imgClassName="w-full rounded-lg shadow-elevated"
              rotation={180}
            />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">
            {language === 'en' ? 'Family tree of Magdalena Geldof' : language === 'fr' ? 'Arbre généalogique de Magdalena Geldof' : 'Stamboom van Magdalena Geldof'}
          </figcaption>
        </figure>
      </motion.div>

      {/* Gezinsbond */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h4 className="font-semibold text-primary flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Gezinsbond
          </h4>
          <p>{t.gezinsbondText}</p>
          {'gezinsbondArtikelText' in t && (
            <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
              <p className="mt-2">{(t as any).gezinsbondArtikelText}</p>
            </ReadMore>
          )}
        </div>


        {/* Gezinsbond krantenartikel */}
        <figure className="cursor-pointer group mt-4" onClick={() => setFullscreenImage(gezinsbondArtikel)}>
          <div className="relative max-w-xl mx-auto">
            <img src={gezinsbondArtikel} alt="Krantenartikel Gezinsbond 80 jaar" className="w-full rounded-lg shadow-elevated" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">
            {language === 'en' ? 'Newspaper article: Izegem Gezinsbond celebrates 80th anniversary (2002)' : language === 'fr' ? 'Article de journal : le Gezinsbond d\'Izegem fête ses 80 ans (2002)' : 'Krantenartikel: Izegemse Gezinsbond viert 80ste verjaardag (2002)'}
          </figcaption>
        </figure>

        {/* Huldiging moeders van 10+ kinderen & Gezinsbond vervolg */}
        <div className="prose prose-lg text-foreground/80 mt-6">
          <ReadMore label={language === 'en' ? 'Read more' : 'Lees meer'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
            <p>
              {language === 'en' 
                ? 'She joined the board and would remain engaged there for many years. Repeatedly she appears in a prominent place in the group photos published in the Krant van West-Vlaanderen at yet another \'Day of the Family\', at a tribute to Mothers of 10 or more children or at the celebration of 60, 70, 80 years of the Gezinsbond. Nice detail: in some of those photos, both my mother, Simonne Vandeputte, and my grandmother Madeleine Geldof appear together.'
                : language === 'fr'
                ? 'Elle est entrée au conseil d\'administration et s\'y est engagée pendant de nombreuses années. À maintes reprises, elle figure en bonne place dans les photos de groupe publiées dans le Krant van West-Vlaanderen lors d\'une « Journée de la Famille », d\'un hommage aux Mères de 10 enfants ou plus, ou de la célébration des 60, 70, 80 ans de la Gezinsbond. Détail amusant : sur certaines de ces photos, ma mère, Simonne Vandeputte, et ma grand-mère Madeleine Geldof figurent ensemble.'
                : 'Ze kwam in het bestuur terecht en zou zich daar nog vele jaren engageren. Bij herhaling prijkt ze op een prominente plaats in de groepsfoto\'s die in de Krant van West-Vlaanderen verschenen bij nog eens een \'Dag van het Gezin\', bij een huldiging van de Moeders van 10 of meer kinderen of bij de viering van 60, 70, 80 jaar bestaan van de Gezinsbond. Leuk detail: op sommige van die foto\'s staan zowel mijn moeder, Simonne Vandeputte, als mijn grootmoeder Madeleine Geldof samen in beeld.'}
            </p>
            <figure className="my-6">
              <img 
                src={huldigingMoeders1960} 
                alt={language === 'en' 
                  ? 'Izegem, ca. 1960 — Tribute to Mothers of 10 or more children' 
                  : language === 'fr' 
                  ? 'Izegem, ca. 1960 — Hommage aux mères de 10 enfants ou plus' 
                  : 'Izegem, ca. 1960 — Huldiging van de moeders van 10 of meer kinderen'}
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
              />
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {language === 'en' 
                  ? 'Izegem, ca. 1960 — Tribute to Mothers of 10 or more children. Front left, seated: Madeleine Geldof; directly behind her: Simonne Vandeputte. A damaged black/white photo, restored and colorized with AI.'
                  : language === 'fr'
                  ? 'Izegem, ca. 1960 — Hommage aux mères de 10 enfants ou plus. À l\'avant gauche, assise : Madeleine Geldof ; juste derrière elle : Simonne Vandeputte. Une photo noir/blanc endommagée, restaurée et colorisée par IA.'
                  : 'Izegem, ca. 1960 — Huldiging van de moeders van 10 of meer kinderen. Vooraan uiterst links, zittend: Madeleine Geldof, recht achter haar: Simonne Vandeputte. Een beschadigde zwart/wit foto, met AI gerestaureerd en ingekleurd.'}
              </figcaption>
            </figure>
          </ReadMore>
        </div>
      </motion.div>

      {/* Laatste foto's Madeleine & overlijden */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <p className="italic border-l-4 border-primary/30 pl-4">
            {language === 'en'
              ? 'The last photos taken of Madeleine Geldof: on September 17, 1971, the wedding day of Luc Deforce and Marleen Dobbels. She passed away shortly thereafter on October 22, 1971.'
              : language === 'fr'
              ? 'Les dernières photos prises de Madeleine Geldof : le 17 septembre 1971, le jour du mariage de Luc Deforce et Marleen Dobbels. Elle est décédée peu après, le 22 octobre 1971.'
              : 'De laatste foto\'s die van Madeleine Geldof werden gemaakt: op 17 september 1971, de huwelijksdag van Luc Deforce en Marleen Dobbels. Ze overleed kort daarna op 22 oktober 1971.'}
          </p>
          <figure className="my-6">
            <img 
              src={laatsteFotoMadeleine} 
              alt={language === 'en' 
                ? 'Last photo of Madeleine Geldof, September 17, 1971' 
                : language === 'fr' 
                ? 'Dernière photo de Madeleine Geldof, 17 septembre 1971' 
                : 'Laatste foto van Madeleine Geldof, 17 september 1971'}
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
              {language === 'en' 
                ? '17 September 1971 — Last photo of Madeleine Geldof, on the wedding day of Luc Deforce and Marleen Dobbels. She passed away on 22 October 1971.'
                : language === 'fr'
                ? '17 septembre 1971 — Dernière photo de Madeleine Geldof, le jour du mariage de Luc Deforce et Marleen Dobbels. Elle est décédée le 22 octobre 1971.'
                : '17 september 1971 — Laatste foto van Madeleine Geldof, op de huwelijksdag van Luc Deforce en Marleen Dobbels. Ze overleed op 22 oktober 1971.'}
            </figcaption>
          </figure>
        </div>
      </motion.div>

      {/* Overlijden Marcel Deforce */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Heart className="w-5 h-5" />
            {language === 'en' ? 'Marcel Deforce, deceased December 9, 1963' : language === 'fr' ? 'Marcel Deforce, décédé le 9 décembre 1963' : 'Marcel Deforce, overleden op 9 december 1963'}
          </h3>
          <p>
            {language === 'en'
              ? 'On a Friday morning in January 1963, a fire broke out that reduced the largest part of my grandfather\'s furniture factory to ashes. From his residence, which fortunately was spared from the fire, he was a witness in total panic to how his life\'s work was reduced to rubble within the shortest time. It was the beginning of the end for him; his health was already failing and mentally he could no longer overcome this setback. Less than a year later he died, on December 9.'
              : language === 'fr'
              ? 'Un vendredi matin de janvier 1963, un incendie éclata qui réduisit en cendres la plus grande partie de la fabrique de meubles de mon grand-père. Depuis sa maison d\'habitation, épargnée par le feu, il fut le témoin paniqué de la destruction de l\'œuvre de sa vie en un rien de temps. Ce fut pour lui le début de la fin ; sa santé déclinait déjà et mentalement il ne surmonta plus ce revers. Moins d\'un an plus tard, il décéda, le 9 décembre.'
              : 'Op een vrijdagmorgen in januari 1963 brak een brand uit die het grootste deel van de meubelfabriek van mijn grootvader in de as legde. Vanuit zijn woonhuis, dat gelukkig van de brand gespaard bleef, was hij in totale paniek getuige van hoe zijn levenswerk binnen de kortste keren tot puin werd herleid. Het was voor hem het begin van het einde, het ging al niet goed met zijn gezondheid en ook mentaal kwam hij deze tegenslag niet meer te boven. Minder dan een jaar later overleed hij, op 9 december.'}
          </p>
          <p className="italic text-sm text-muted-foreground">
            {language === 'en' ? '(about the fire: see next chapter)' : language === 'fr' ? '(à propos de l\'incendie : voir le chapitre suivant)' : '(over de brand: zie verder in volgend hoofdstuk)'}
          </p>
        </div>

        <ReadMore label={language === 'en' ? 'Read more about the funeral' : language === 'fr' ? 'En savoir plus sur les funérailles' : 'Lees meer over de begrafenis'} collapsedLabel={language === 'en' ? 'Read less' : 'Lees minder'}>
          <div className="prose prose-lg text-foreground/80">
            <p>
              {language === 'en'
                ? 'It was the first time in my life that I was confronted with a death up close. A rather impressive experience, for a whole series of events was set in motion according to all traditional rules and with great solemnity. In my experience it was also one of the last funerals that took place entirely according to the old customary traditions:'
                : language === 'fr'
                ? 'C\'était la première fois de ma vie que j\'étais confronté de près à un décès. Une expérience assez impressionnante, car tout un cérémonial se mit en marche selon les règles traditionnelles et avec une grande solennité. C\'était à mon souvenir aussi l\'une des dernières funérailles qui se déroulèrent entièrement selon les anciennes coutumes :'
                : 'Het was de eerste keer in mijn leven dat ik van nabij met een overlijden werd geconfronteerd. Een behoorlijk indrukwekkende ervaring, want er kwam een heel gebeuren op gang volgens alle traditionele regels en met grote plechtstatigheid. Het was in mijn ervaring tegelijk ook één van de laatste begrafenissen die volledig volgens de oude gebruikelijke geplogenheden verliepen:'}
            </p>
            <p>
              {language === 'en'
                ? 'The deceased was laid out at home in the front room. The whole family came in turns to pay their last respects; after two days the remains were placed in the coffin. Black canopies were hung over the doors. On the day of the funeral, the front door was also provided with a large black canopy and the coffin was solemnly carried outside and loaded into the funeral coach. The coach was drawn by two horses. In procession they went to the church, everyone in black mourning clothes, which had been rented for the occasion. In the church, men and women still sat traditionally separated, each on one side. My brother Luc and I were the only grandchildren who were allowed to participate in the entire ceremony.'
                : language === 'fr'
                ? 'Le défunt fut exposé à domicile dans le salon. Toute la famille venait à tour de rôle rendre un dernier hommage ; après deux jours, la dépouille fut mise en bière. Des baldaquins noirs furent suspendus aux portes. Le jour des funérailles, la porte d\'entrée fut également pourvue d\'un grand baldaquin noir et le cercueil fut solennellement porté dehors et chargé dans le corbillard. Le corbillard était tiré par deux chevaux. En cortège, on se rendit à l\'église, tous en vêtements de deuil noirs, loués pour l\'occasion. À l\'église, hommes et femmes étaient encore traditionnellement séparés de chaque côté. Mon frère Luc et moi-même étions les seuls petits-enfants autorisés à participer à toute la cérémonie.'
                : 'De overledene werd thuis opgebaard in de voorkamer. Heel de familie kwam beurtelings een afscheidsgroet brengen, na twee dagen werd het stoffelijk overschot er gekist. Over de deuren werden zwarte baldakijnen opgehangen. Op de dag van de begrafenis werd ook de voordeur van een groot zwart baldakijn voorzien en werd de kist plechtig naar buiten gedragen en in de begrafeniskoets geladen. De koets werd getrokken door twee paarden. In stoet ging het naar de kerk, iedereen in zwarte rouwkledij, die voor de gelegenheid gehuurd was. In de kerk zaten mannen en vrouwen nog traditioneel gescheiden elk aan één kant. Mijn broer Luc en ikzelf waren de enige kleinkinderen die aan de hele plechtigheid mochten deelnemen.'}
            </p>
            <p>
              {language === 'en'
                ? 'Of the entire event, of the funeral procession and the ceremony, a photo reportage was also made, of which unfortunately only a few rare photos could be found.'
                : language === 'fr'
                ? 'De tout l\'événement, du cortège funèbre et de la cérémonie, un reportage photographique fut également réalisé, dont malheureusement seules quelques rares photos ont pu être retrouvées.'
                : 'Van het hele gebeuren, van de rouwstoet en de plechtigheid, werd er ook een fotoreportage gemaakt, waarvan er jammer genoeg maar een paar zeldzame foto\'s waren terug te vinden.'}
            </p>

            {/* Begrafenisfoto's Marcel Deforce */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <figure>
                <img 
                  src={marcelOpgebaard} 
                  alt={language === 'en' ? 'Marcel Deforce laid out, December 1963' : language === 'fr' ? 'Marcel Deforce exposé, décembre 1963' : 'Marcel Deforce opgebaard, december 1963'}
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  onClick={() => setFullscreenImage(marcelOpgebaard)}
                />
                <figcaption className="text-xs text-muted-foreground italic mt-2 text-center">
                  {language === 'en' ? 'Marcel Deforce laid out, December 1963' : language === 'fr' ? 'Marcel Deforce exposé, décembre 1963' : 'Marcel Deforce opgebaard, december 1963'}
                </figcaption>
              </figure>
              <figure>
                <img 
                  src={rouwkapelMarcel} 
                  alt={language === 'en' ? 'Funeral chapel Marcel Deforce, 1963' : language === 'fr' ? 'Chapelle funéraire Marcel Deforce, 1963' : 'Rouwkapel Marcel Deforce, 1963'}
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  onClick={() => setFullscreenImage(rouwkapelMarcel)}
                />
                <figcaption className="text-xs text-muted-foreground italic mt-2 text-center">
                  {language === 'en' ? 'The coffin is carried into the funeral chapel' : language === 'fr' ? 'Le cercueil est porté dans la chapelle funéraire' : 'De kist wordt de rouwkapel binnengedragen'}
                </figcaption>
              </figure>
              <figure>
                <img 
                  src={begrafenisZonen} 
                  alt={language === 'en' ? 'Sons of Marcel Deforce at the funeral, 1963' : language === 'fr' ? 'Les fils de Marcel Deforce aux funérailles, 1963' : 'Zonen van Marcel Deforce op de begrafenis, 1963'}
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  onClick={() => setFullscreenImage(begrafenisZonen)}
                />
                <figcaption className="text-xs text-muted-foreground italic mt-2 text-center">
                  {language === 'en' ? 'The sons at the funeral of Marcel Deforce, December 1963' : language === 'fr' ? 'Les fils aux funérailles de Marcel Deforce, décembre 1963' : 'De zonen op de begrafenis van Marcel Deforce, december 1963'}
                </figcaption>
              </figure>
            </div>
          </div>
        </ReadMore>
      </motion.div>

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
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain"
            style={fullscreenImage === stamboomMagdalena ? { transform: 'rotate(180deg)' } : undefined}
          />
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
              aria-label="Close"
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
    </div>
  );
};

export default MarcelBiografieVervolg;
