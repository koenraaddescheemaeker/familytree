import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Baby, Hammer, Medal, ZoomIn, X, Dog, Users, Heart, BookOpen, Home, Award } from "lucide-react";
import marcelJongeJaren from "@/assets/marcel-jonge-jaren.jpg";
import portretkader1915 from "@/assets/marcel-portretkader-1915.jpg";

import loekiVideo from "@/assets/loekie-video.mp4";
import marcelSoldaat from "@/assets/marcel-soldaat.jpg";
import juwelenkistje from "@/assets/juwelenkistje.jpg";
import mobilisatieZakboekjeBinnen from "@/assets/mobilisatie-zakboekje-binnen.jpg";
import mobilisatieZakboekje2 from "@/assets/mobilisatie-zakboekje-2.jpg";
import fotoDochtertje1919 from "@/assets/foto-dochtertje-1919.jpg";
import mariaGeorges1923 from "@/assets/maria-georges-1923-color.jpg";
import joorisDeforce1925 from "@/assets/jooris-deforce-1925-color.jpg";
import oudHuisVdb1927 from "@/assets/oud-huis-vdb-1927-color.jpg";
import reclamestandVakmanschap from "@/assets/reclamestand-vakmanschap.jpg";
import AiLabel from "@/components/ui/AiLabel";
import MarcelBiografieVervolg from "@/components/MarcelBiografieVervolg";

const MarcelBiografie = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const content = {
    nl: {
      groteMeterTitle: "Grote Meter en Kleine Meter",
      groteMeterText: "De éne grootmoeder (Magdalena, maar door iedereen Madeleine genoemd) noemde ik 'Grote Meter', want dat was een statige oma die altijd met veel gezag sprak en op mij een strenge indruk maakte. De andere – mijn moeder's moeder, een zachtaardiger karakter – werd dan 'Kleine Meter'. Na mij hebben mijn broers en zussen en al mijn neven en nichten dat overgenomen en met zijn allen zijn we haar Grote Meter blijven noemen. Grootvader Marcel werd ook door iedereen Peter genoemd.",
      woonkamerText: "Ik heb nog altijd zeer levendige herinneringen aan de indrukwekkende woonkamer in het statige huis aan de Vanden Bogaardelaan. Op alle feestdagen, de kerkelijke 'Hoogdagen' (Allerheiligen, Kerstmis, Pasen, Hemelvaart) moesten we met het hele gezin verplicht op visite. Als kinderen kregen we volop warme chocolademelk en boterkoeken. We moesten wel stilzitten en geen rumoer maken want als kind werd je ingepeperd dat er moest gezwegen worden en je mocht niet storen als de grote mensen aan het spreken waren. Grote Meter was degene die voor de discipline zorgde!",
      loekiTitle: "Loeki",
      loekiText: "Van september 1954 tot februari 1955 kwam ik er – samen met mijn broer Luc – bijna dagelijks over de vloer bij Peter en Meter. We mochten 's middags bij Peter en Meter gaan eten, want die woonden vlakbij de school. Peter had een hond, een nijdige keffer: Loeki. Het was wel echt zijn lieveling ook al joeg die ons door zijn geblaf regelmatig flink wat schrik aan. Op een goede keer trapte ik eens per ongeluk op zijn staart en in een reflex heeft de hond me in mijn been gebeten. Het heeft wel bijna 40 jaar geduurd voor ik een beetje mijn schrik voor honden heb kunnen overwinnen…",
      jeugdjarenTitle: "De jeugdjaren van Marcel",
      jeugdjarenText: "Grootvader Marcel August Deforce werd geboren in Emelgem, in de wijk Vijfwegen. Hij kwam ter wereld in een huis waar het hout altijd aanwezig was. Hij groeide op als de zoon van een timmerman tijdens een tijd waarin een lagere-schoolopleiding meer dan voldoende werd geacht. Op zijn veertiende hoorde je te weten wie je was: iemand die thuis meehielp en mee verdiende, die zijn plaats kende in het familiale weefsel, die met zijn handen werkte.",
      avondonderwijsText: "'s Avonds zat Marcel opnieuw op een bank, maar dan in een klaslokaal van het avondonderwijs, waar hij de nodige bijscholing in technisch tekenen volgde om een bekwaam ambachtsman te kunnen worden. Hij verwierf er ook vorming in boekhouding en bedrijfsbeheer, wat nodig was om als zelfstandig ondernemer te kunnen functioneren.",
      houtsnijdersText: "Op een paar vergeelde foto's uit 1908 en 1910 staat hij samen met zijn vader, beiden lid van de 'Vereniging van Houtsnijders van Iseghem'. De mannen poseren in hun beste hemd, licht ongemakkelijk, alsof zij wisten dat deze foto niet enkel een momentopname was, maar een soort bewijs van bestaan, een registratie van ambachtelijke fierheid.",
      deBoerOpText: "Uit mijn kindertijd herinner ik me zijn verhalen. Hij ging, zoals hij zei, letterlijk 'de boer op': van hoeve naar burgermanshuis, om opmetingen te doen voor het plaatsen van ingebouwde meubelen. Lang voor hij aan het eiken hout begon, zat hij thuis avonden lang te tekenen. Daarna volgde het boetseren van de belangrijkste ornamenten in klei — een werk dat geduld vroeg en de juiste vochtigheid van het materiaal.",
      wo1Title: "Periode 1914-1918",
      wo1Text: "Het toeval heeft hem bij het uitbreken van de Eerste Wereldoorlog behoed voor het front. Op 16 augustus 1914 zou hij twintig worden – wat toen de leeftijdsgrens was om legerdienst te moeten doen. Hij was wel al enkele maanden tevoren gekeurd, en goed bevonden voor de dienst. Maar de oorlog begon net iets te vroeg en zo glipte hij door de mazen van het oproepnet.",
      verkeringTitle: "Verkering met Madeleine",
      verkeringText: "In die tijd had hij ook verkering gekregen met Madeleine, dochter van Emile Geldof, wijntapper in de wijk Bosmolens.",
      juwelenkistjeText: "Om haar hart te bekoren had hij in dezelfde periode een ander kunstwerkje gemaakt als cadeau: een juwelenkistje.",
      meesterwerkTitle: "Het Meesterwerk van 1915",
      meesterwerkText: "In 1915, op 21-jarige leeftijd reeds op het toppunt van zijn kunnen, produceerde hij een eerste meesterwerk: een imposant handgesculpteerd houten portretkader. Het zou daarna jarenlang meegenomen worden naar exposities en meubelbeurzen, als een van de pronkstukken, als toonbeeld van het sublieme vakmanschap.",
      kaderDetails: "Het kader ontstond in 1915, uitgevoerd in massieve eik en volledig met de hand gesneden. De afmetingen zijn: 1 m hoog en 70 cm breed; het weegt 12 kg. Op de achterkant zijn er enkele merktekens ingebeiteld o.a. de naam Marcel Deforce en datering: 22/5/1915.",
      iconografie: "De iconografie is zorgvuldig opgebouwd. Bovenaan troont een klassieke urn, geflankeerd door twee putti. Ook lager in de lijst keren deze kinderfiguren terug. Zij dragen kleine, goudkleurige metalen attributen — subtiele accenten die het donkere eikenhout doorbreken.",
      kaderLeeg: "Gedurende meer dan dertig jaar — van 1915 tot 1947 — bleef het kader leeg. Het stond symbool voor vakmanschap, traditie en continuïteit.",
      soldaatTitle: "Soldaat van de lichting 1914, verplaatst naar 1919",
      soldaatText: "Pas na de oorlog werd hij opgeroepen: op 19 juli 1919 trad hij in dienst. Samen met zijn leeftijdsgenoten en met degenen die tijdens de oorlogsperiode hun dienstplichtige leeftijd bereikt hadden werd hij na de wapenstilstand opgeroepen om de troepen die in de loopgraven hadden gevochten en die nu naar huis mochten, te gaan vervangen.",
      mobilisatieZakboekjeText: "In mijn familiearchief bewaar ik nog steeds zijn originele 'Livret de Mobilisation', zijn mobilisatie-zakboekje.",
      bezettingsmachtText: "Hij diende in Duitsland bij de Belgische bezettingsmacht, als 'paardenmeester' bij het 6° Regiment Artillerie, de kanonnen werden toen nog door paarden getrokken. Zijn actieve dienst eindigde in juni 1920 maar hij werd in 1921 nog twee keer voor enkele dagen terug opgeroepen om zich te registreren in de reservetroepen.",
      elsenbornText: "Op 18 mei verkreeg hij in de kazerne van Elsenborn zijn 'congé illimité', na eerst nog een medisch onderzoek (De Spaanse griep was een pandemie op europese schaal in de jaren 1918-1920!) Daarna, nog tot in 1934 moest hij zich jaarlijks gaan melden bij de Gendarmerie, ter controle van de beschikbaarheid ingeval van mobilisatie.",
      getrouwdText: "Intussen was hij op 9 januari 1918 getrouwd met zijn verloofde, Madeleine Geldof, en had met haar al een dochter: Maria, geboren op 23 oktober 1918.",
      inwonenText: "Dat betekent dus ook wel dat hij tijdens zijn legerdienst zijn vrouw en kind moest achterlaten; maar ze waren in goede handen: ze woonden in bij zijn schoonouders aan de Bosmolens. Daar zouden ze overigens nog blijven wonen tot ze in 1923 hun eigen stek vonden aan de VandenBogaardelaan in Izegem.",
      dochtertjeFotoText: "Vrij ontroerend: deze foto van het dochtertje die zij ergens in 1919 naar hem stuurde, de achterkant volgekrabbeld, met onder andere ook nog eens de belofte dat er vandaag nog een lange brief zal geschreven worden.",
      periode1920Title: "De periode 1920-1945",
      periode1920Text: "Over de jaren 1920 tot 1923 heerst totale onduidelijkheid, gewoonweg omdat er geen foto's of documenten terug te vinden zijn die op die periode betrekking hebben. Het koppel Marcel & Madeleine woonde blijkbaar aan de Bosmolens, inwonend bij haar ouderlijk gezin of in een eigen huurwoning in de buurt ervan.",
      geboortenText: "De enige bewezen feiten uit die jaren zijn de geboorte in januari 1921 van een zoon, Jooris (meestal Georges genoemd), mijn vader, en van een dochter Beatrijs ('Béatrice Thérèse') in oktober 1922. Dit kind leefde niet lang, het overleed in januari 1924.",
      verhuizingText: "Het is ook niet duidelijk of Marcel nog steeds bij zijn vader Louis meewerkte, of dat hij al een eigen zelfstandige werkzaamheid had. In elk geval moet hij in staat geweest zijn om een flinke spaarpot aan te leggen, want in 1923 — Hij was toen 29 jaar oud — verhuist het gezin naar de Burgermeester Van Den Bogaerdelaan 25 in Izegem, toen net buiten het centrum van de stad en nog half landelijk.",
      woningText: "Ze kochten er een vrij ruime woning, met voortuin en met een atelier erachter (hij noemde het steevast zijn 'werkwinkel'). In de loop van de jaren zou dit atelier zich uitbreiden met een paar aanlandende percelen en een achteruitgang krijgen aan de achterliggende parallelstraat, de Werkhuizenstraat.",
      burenText: "Als buren hadden ze daar onder meer de werkplaatsen van rolluikenfabrikant Windels (later WInsol) en zetelfabriek Durlet, en nog diverse andere ateliers.",
      oudeFotosCaption: "Een paar uiterst zeldzame foto's met het 'oude' huis in de Van Den Bogaerdelaan",
      reclamestandText: "Een reclamestandje in een tentoonstelling (plaats en datum waren niet meer te achterhalen), met voorbeelden van vakmanschap. Al deze elementen zullen later in 1945 in de woonkamer van het nieuwe huis geïntegreerd worden.",
      clickToEnlarge: "Klik om te vergroten",
      close: "Sluiten",
      imageCaption: "Marcel als jonge ambachtsman",
      kaderCaption: "Het portretkader uit 1915",
    },
    en: {
      groteMeterTitle: "Great Godmother and Little Godmother",
      groteMeterText: "One grandmother (Magdalena, but called Madeleine by everyone) I called 'Great Godmother', because she was a stately grandmother who always spoke with great authority and made a stern impression on me. The other – my mother's mother, a gentler character – was called 'Little Godmother'. After me, my brothers and sisters and all my nieces and nephews adopted this and we all continued to call her Great Godmother.",
      woonkamerText: "I still have very vivid memories of the impressive living room in the stately house on Vanden Bogaardelaan. On all feast days, the religious 'Holy Days' (All Saints, Christmas, Easter, Ascension) we had to visit with the whole family. As children, we got plenty of hot chocolate milk and butter cookies. But we had to sit still and make no noise because as a child you were taught to be silent and not disturb when the adults were talking.",
      loekiTitle: "Loeki",
      loekiText: "From September 1954 to February 1955, my brother Luc and I were at Peter and Meter's almost daily. We were allowed to eat lunch there because they lived close to the school. Peter had a dog, a snappy terrier: Loeki. Once I accidentally stepped on his tail and the dog bit me in my leg. It took almost 40 years before I could somewhat overcome my fear of dogs…",
      jeugdjarenTitle: "Marcel's Youth",
      jeugdjarenText: "Grandfather Marcel August Deforce was born in Emelgem, in the Vijfwegen district. He came into the world in a house where wood was always present. He grew up as the son of a carpenter during a time when an elementary school education was considered more than sufficient.",
      avondonderwijsText: "In the evenings, Marcel sat again on a bench, but then in a classroom of evening education, where he followed the necessary training in technical drawing to become a skilled craftsman.",
      houtsnijdersText: "In a few yellowed photographs from 1908 and 1910, he stands together with his father, both members of the 'Association of Woodcarvers of Iseghem'.",
      deBoerOpText: "From my childhood I remember his stories. He would literally 'go to the farmer': from farm to bourgeois house, to take measurements for built-in furniture. Long before he started on oak wood, he would spend evenings at home drawing.",
      wo1Title: "Period 1914-1918",
      wo1Text: "Chance protected him from the front at the outbreak of World War I. On August 16, 1914, he would turn twenty – which was then the age limit for military service. But the war began just a bit too early and so he slipped through the nets of the call-up.",
      verkeringTitle: "Courtship with Madeleine",
      verkeringText: "At that time he had also started courting Madeleine, daughter of Emile Geldof, a wine merchant in the Bosmolens district.",
      juwelenkistjeText: "To win her heart he made another little work of art as a gift during the same period: a jewelry box.",
      meesterwerkTitle: "The Masterpiece of 1915",
      meesterwerkText: "In 1915, at the age of 21 already at the peak of his abilities, he produced his first masterpiece: an imposing hand-sculpted wooden portrait frame. It would be taken to exhibitions and furniture fairs for years, as one of the showpieces.",
      kaderDetails: "The frame was created in 1915, made of solid oak and entirely hand-carved. The dimensions are: 1 m high and 70 cm wide; it weighs 12 kg.",
      iconografie: "The iconography is carefully constructed. At the top sits a classical urn, flanked by two putti. These child figures return lower in the frame as well.",
      kaderLeeg: "For more than thirty years — from 1915 to 1947 — the frame remained empty. It symbolized craftsmanship, tradition and continuity.",
      soldaatTitle: "Soldier of the 1914 class, postponed to 1919",
      soldaatText: "Only after the war was he called up: on July 19, 1919 he entered service. Together with his peers and those who had reached draft age during the war, he was called up after the armistice to replace the troops who had fought in the trenches and were now allowed to go home.",
      mobilisatieZakboekjeText: "In my family archive I still keep his original 'Livret de Mobilisation', his mobilization booklet.",
      bezettingsmachtText: "He served in Germany with the Belgian occupation forces, as 'horse master' with the 6th Regiment of Artillery, the cannons were still pulled by horses at the time. His active service ended in June 1920 but he was recalled twice in 1921 for a few days to register in the reserve troops.",
      elsenbornText: "On May 18 he received his 'congé illimité' at the Elsenborn barracks, after first undergoing a medical examination (The Spanish flu was a pandemic on a European scale in 1918-1920!) After that, until 1934 he had to report annually to the Gendarmerie, to verify availability in case of mobilization.",
      getrouwdText: "Meanwhile, on January 9, 1918 he had married his fiancée, Madeleine Geldof, and already had a daughter with her: Maria, born on October 23, 1918.",
      inwonenText: "This also meant that during his military service he had to leave his wife and child behind; but they were in good hands: they lived with his in-laws at Bosmolens. They would continue to live there until they found their own place on VandenBogaardelaan in Izegem in 1923.",
      dochtertjeFotoText: "Quite touching: this photo of their little daughter that she sent him somewhere in 1919, the back covered in scribbles, including the promise that a long letter would still be written today.",
      periode1920Title: "The period 1920-1945",
      periode1920Text: "There is complete uncertainty about the years 1920 to 1923, simply because there are no photos or documents to be found that relate to that period. The couple Marcel & Madeleine apparently lived at Bosmolens, living with her parental family or in their own rented house nearby.",
      geboortenText: "The only proven facts from those years are the birth in January 1921 of a son, Jooris (usually called Georges), my father, and of a daughter Beatrijs ('Béatrice Thérèse') in October 1922. This child did not live long, it died in January 1924.",
      verhuizingText: "It is also unclear whether Marcel was still working with his father Louis, or whether he already had his own independent business. In any case, he must have been able to save up a considerable nest egg, because in 1923 — He was then 29 years old — the family moved to Burgermeester Van Den Bogaerdelaan 25 in Izegem, then just outside the city center and still semi-rural.",
      woningText: "They bought a fairly spacious house there, with a front garden and a workshop behind it (he invariably called it his 'werkwinkel'). Over the years this workshop would expand with a few adjacent plots and get a rear exit to the parallel street behind, the Werkhuizenstraat.",
      burenText: "As neighbors they had, among others, the workshops of roller shutter manufacturer Windels (later WInsol) and armchair factory Durlet, and various other workshops.",
      oudeFotosCaption: "A few extremely rare photos with the 'old' house on Van Den Bogaerdelaan",
      reclamestandText: "An advertising display at an exhibition (place and date could no longer be traced), with examples of craftsmanship. All these elements would later in 1945 be integrated into the living room of the new house.",
      clickToEnlarge: "Click to enlarge",
      close: "Close",
      imageCaption: "Marcel as a young craftsman",
      kaderCaption: "The portrait frame from 1915",
    },
    fr: {
      groteMeterTitle: "Grande Marraine et Petite Marraine",
      groteMeterText: "L'une des grand-mères (Magdalena, mais appelée Madeleine par tous) je l'appelais 'Grande Marraine', car c'était une grand-mère majestueuse qui parlait toujours avec beaucoup d'autorité.",
      woonkamerText: "J'ai encore des souvenirs très vifs de l'impressionnant salon de la maison majestueuse de la Vanden Bogaardelaan. Lors de toutes les fêtes, les 'Jours Saints' (Toussaint, Noël, Pâques, Ascension), nous devions rendre visite en famille.",
      loekiTitle: "Loeki",
      loekiText: "De septembre 1954 à février 1955, j'allais presque quotidiennement chez Parrain et Marraine avec mon frère Luc. Parrain avait un chien, un petit roquet hargneux : Loeki.",
      jeugdjarenTitle: "La jeunesse de Marcel",
      jeugdjarenText: "Grand-père Marcel August Deforce est né à Emelgem, dans le quartier Vijfwegen. Il a grandi comme fils d'un menuisier.",
      avondonderwijsText: "Le soir, Marcel était assis sur un banc, mais dans une classe du cours du soir, où il suivait la formation nécessaire en dessin technique.",
      houtsnijdersText: "Sur quelques photos jaunies de 1908 et 1910, il pose avec son père, tous deux membres de l'Association des Sculpteurs sur Bois d'Iseghem.",
      deBoerOpText: "De mon enfance, je me souviens de ses histoires. Il allait littéralement 'faire la tournée' : de ferme en maison bourgeoise, pour prendre des mesures.",
      wo1Title: "Période 1914-1918",
      wo1Text: "Le hasard l'a protégé du front lors du déclenchement de la Première Guerre mondiale.",
      verkeringTitle: "Fiançailles avec Madeleine",
      verkeringText: "À cette époque, il avait également commencé à courtiser Madeleine, fille d'Emile Geldof, marchand de vin dans le quartier de Bosmolens.",
      juwelenkistjeText: "Pour conquérir son cœur, il avait fabriqué un autre petit chef-d'œuvre comme cadeau pendant la même période : un coffret à bijoux.",
      meesterwerkTitle: "Le Chef-d'œuvre de 1915",
      meesterwerkText: "En 1915, à 21 ans, il produisit son premier chef-d'œuvre : un imposant cadre de portrait en bois sculpté à la main.",
      kaderDetails: "Le cadre a été créé en 1915, en chêne massif et entièrement sculpté à la main. Dimensions : 1 m de haut et 70 cm de large ; poids : 12 kg.",
      iconografie: "L'iconographie est soigneusement construite. Au sommet trône une urne classique, flanquée de deux putti.",
      kaderLeeg: "Pendant plus de trente ans — de 1915 à 1947 — le cadre est resté vide.",
      soldaatTitle: "Soldat de la classe 1914, reporté à 1919",
      soldaatText: "Ce n'est qu'après la guerre qu'il a été appelé : le 19 juillet 1919, il est entré en service. Avec ses pairs et ceux qui avaient atteint l'âge de la conscription pendant la guerre, il a été appelé après l'armistice pour remplacer les troupes qui avaient combattu dans les tranchées.",
      mobilisatieZakboekjeText: "Dans mes archives familiales, je conserve toujours son 'Livret de Mobilisation' original.",
      bezettingsmachtText: "Il a servi en Allemagne dans les forces d'occupation belges, comme 'maître de chevaux' au 6e Régiment d'Artillerie, les canons étaient encore tirés par des chevaux à l'époque.",
      elsenbornText: "Le 18 mai, il a reçu son 'congé illimité' à la caserne d'Elsenborn, après avoir d'abord subi un examen médical (La grippe espagnole était une pandémie à l'échelle européenne en 1918-1920!)",
      getrouwdText: "Entre-temps, le 9 janvier 1918, il avait épousé sa fiancée, Madeleine Geldof, et avait déjà eu une fille avec elle : Maria, née le 23 octobre 1918.",
      inwonenText: "Cela signifiait aussi que pendant son service militaire, il devait laisser sa femme et son enfant ; mais elles étaient entre de bonnes mains : elles vivaient chez ses beaux-parents à Bosmolens.",
      dochtertjeFotoText: "Assez émouvant : cette photo de la petite fille qu'elle lui a envoyée quelque part en 1919, le dos couvert de gribouillis, y compris la promesse qu'une longue lettre serait encore écrite aujourd'hui.",
      periode1920Title: "La période 1920-1945",
      periode1920Text: "Il y a une incertitude totale sur les années 1920 à 1923, simplement parce qu'il n'y a pas de photos ou de documents qui se rapportent à cette période.",
      geboortenText: "Les seuls faits prouvés de ces années sont la naissance en janvier 1921 d'un fils, Jooris (généralement appelé Georges), mon père, et d'une fille Beatrijs en octobre 1922. Cet enfant n'a pas vécu longtemps, il est décédé en janvier 1924.",
      verhuizingText: "On ne sait pas non plus si Marcel travaillait encore avec son père Louis, ou s'il avait déjà sa propre entreprise indépendante. En 1923, la famille a déménagé au Burgermeester Van Den Bogaerdelaan 25 à Izegem.",
      woningText: "Ils y ont acheté une maison assez spacieuse, avec un jardin devant et un atelier derrière (il l'appelait toujours son 'werkwinkel').",
      burenText: "Comme voisins, ils avaient entre autres les ateliers du fabricant de volets roulants Windels (plus tard WInsol) et de la fabrique de fauteuils Durlet.",
      oudeFotosCaption: "Quelques photos extrêmement rares avec l'ancienne maison sur Van Den Bogaerdelaan",
      reclamestandText: "Un présentoir publicitaire lors d'une exposition, avec des exemples d'artisanat. Tous ces éléments seront intégrés plus tard en 1945 dans le salon de la nouvelle maison.",
      clickToEnlarge: "Cliquez pour agrandir",
      close: "Fermer",
      imageCaption: "Marcel jeune artisan",
      kaderCaption: "Le cadre-portrait de 1915",
    },
    de: {
      groteMeterTitle: "Große Patin und Kleine Patin",
      groteMeterText: "Eine Großmutter (Magdalena, aber von allen Madeleine genannt) nannte ich 'Große Patin', denn sie war eine würdevolle Oma, die immer mit viel Autorität sprach.",
      woonkamerText: "Ich habe noch immer sehr lebhafte Erinnerungen an das beeindruckende Wohnzimmer im stattlichen Haus an der Vanden Bogaardelaan.",
      loekiTitle: "Loeki",
      loekiText: "Von September 1954 bis Februar 1955 war ich fast täglich bei Pater und Meter. Pater hatte einen Hund, einen bissigen Kläffer: Loeki.",
      jeugdjarenTitle: "Marcels Jugendjahre",
      jeugdjarenText: "Großvater Marcel August Deforce wurde in Emelgem geboren, im Viertel Vijfwegen. Er wuchs als Sohn eines Tischlers auf.",
      avondonderwijsText: "Abends saß Marcel wieder auf einer Bank, aber dann in einem Klassenzimmer der Abendschule.",
      houtsnijdersText: "Auf einigen vergilbten Fotos von 1908 und 1910 steht er zusammen mit seinem Vater, beide Mitglieder des Holzschnitzer-Vereins von Iseghem.",
      deBoerOpText: "Aus meiner Kindheit erinnere ich mich an seine Geschichten. Er ging buchstäblich 'aufs Land': von Hof zu Bürgerhaus.",
      wo1Title: "Periode 1914-1918",
      wo1Text: "Der Zufall hat ihn beim Ausbruch des Ersten Weltkriegs vor der Front bewahrt.",
      verkeringTitle: "Beziehung mit Madeleine",
      verkeringText: "Zu dieser Zeit hatte er auch begonnen, Madeleine zu umwerben, Tochter von Emile Geldof, einem Weinhändler im Viertel Bosmolens.",
      juwelenkistjeText: "Um ihr Herz zu gewinnen, hatte er in derselben Zeit ein anderes kleines Kunstwerk als Geschenk gefertigt: ein Schmuckkästchen.",
      meesterwerkTitle: "Das Meisterwerk von 1915",
      meesterwerkText: "1915, im Alter von 21 Jahren, produzierte er sein erstes Meisterwerk: einen imposanten handgeschnitzten Holz-Porträtrahmen.",
      kaderDetails: "Der Rahmen entstand 1915, aus massiver Eiche und vollständig von Hand geschnitzt. Maße: 1 m hoch und 70 cm breit; Gewicht: 12 kg.",
      iconografie: "Die Ikonographie ist sorgfältig aufgebaut. Oben thront eine klassische Urne, flankiert von zwei Putten.",
      kaderLeeg: "Mehr als dreißig Jahre — von 1915 bis 1947 — blieb der Rahmen leer.",
      soldaatTitle: "Soldat der Klasse 1914, verschoben auf 1919",
      soldaatText: "Erst nach dem Krieg wurde er einberufen: Am 19. Juli 1919 trat er seinen Dienst an.",
      mobilisatieZakboekjeText: "In meinem Familienarchiv bewahre ich noch immer sein originales 'Livret de Mobilisation' auf.",
      bezettingsmachtText: "Er diente in Deutschland bei den belgischen Besatzungstruppen als 'Pferdemeister' beim 6. Artillerie-Regiment.",
      elsenbornText: "Am 18. Mai erhielt er in der Kaserne von Elsenborn seinen 'congé illimité', nach einer ärztlichen Untersuchung.",
      getrouwdText: "Inzwischen hatte er am 9. Januar 1918 seine Verlobte, Madeleine Geldof, geheiratet und hatte bereits eine Tochter: Maria, geboren am 23. Oktober 1918.",
      inwonenText: "Das bedeutete auch, dass er während seines Militärdienstes seine Frau und sein Kind zurücklassen musste.",
      dochtertjeFotoText: "Recht berührend: dieses Foto der kleinen Tochter, das sie ihm irgendwann 1919 schickte.",
      periode1920Title: "Die Periode 1920-1945",
      periode1920Text: "Über die Jahre 1920 bis 1923 herrscht völlige Unklarheit.",
      geboortenText: "Die einzigen bewiesenen Fakten aus diesen Jahren sind die Geburt eines Sohnes, Jooris, im Januar 1921 und einer Tochter Beatrijs im Oktober 1922.",
      verhuizingText: "1923 zog die Familie zur Burgermeester Van Den Bogaerdelaan 25 in Izegem.",
      woningText: "Sie kauften dort ein ziemlich geräumiges Haus mit Vorgarten und einer Werkstatt dahinter.",
      burenText: "Als Nachbarn hatten sie unter anderem die Werkstätten des Rollladenherstellers Windels und der Sesselfabrik Durlet.",
      oudeFotosCaption: "Einige äußerst seltene Fotos mit dem 'alten' Haus an der Van Den Bogaerdelaan",
      reclamestandText: "Ein Werbestand bei einer Ausstellung mit Beispielen des Handwerks. All diese Elemente werden später 1945 in das Wohnzimmer des neuen Hauses integriert.",
      clickToEnlarge: "Zum Vergrößern klicken",
      close: "Schließen",
      imageCaption: "Marcel als junger Handwerker",
      kaderCaption: "Der Porträtrahmen von 1915",
    },
    es: {
      groteMeterTitle: "Gran Madrina y Pequeña Madrina",
      groteMeterText: "A una abuela (Magdalena, pero llamada Madeleine por todos) la llamaba 'Gran Madrina', porque era una abuela majestuosa que siempre hablaba con mucha autoridad.",
      woonkamerText: "Todavía tengo recuerdos muy vívidos de la impresionante sala de estar de la majestuosa casa de Vanden Bogaardelaan.",
      loekiTitle: "Loeki",
      loekiText: "De septiembre de 1954 a febrero de 1955, mi hermano Luc y yo íbamos casi a diario a casa del Padrino y la Madrina. El Padrino tenía un perro, un terrier mordedor: Loeki.",
      jeugdjarenTitle: "La juventud de Marcel",
      jeugdjarenText: "El abuelo Marcel August Deforce nació en Emelgem, en el barrio de Vijfwegen. Creció como hijo de un carpintero.",
      avondonderwijsText: "Por las noches, Marcel se sentaba en un banco, pero en un aula de la escuela nocturna.",
      houtsnijdersText: "En algunas fotos amarillentas de 1908 y 1910, posa junto a su padre, ambos miembros de la Asociación de Talladores de Madera de Iseghem.",
      deBoerOpText: "De mi infancia recuerdo sus historias. Iba literalmente 'al campo': de granja en casa burguesa.",
      wo1Title: "Período 1914-1918",
      wo1Text: "La casualidad lo protegió del frente al estallar la Primera Guerra Mundial.",
      verkeringTitle: "Noviazgo con Madeleine",
      verkeringText: "En esa época también había comenzado a cortejar a Madeleine, hija de Emile Geldof, comerciante de vinos en el barrio de Bosmolens.",
      juwelenkistjeText: "Para conquistar su corazón, había fabricado otra pequeña obra de arte como regalo en el mismo período: un joyero.",
      meesterwerkTitle: "La Obra Maestra de 1915",
      meesterwerkText: "En 1915, a los 21 años, produjo su primera obra maestra: un imponente marco de retrato de madera tallado a mano.",
      kaderDetails: "El marco fue creado en 1915, en roble macizo y tallado completamente a mano. Dimensiones: 1 m de alto y 70 cm de ancho; peso: 12 kg.",
      iconografie: "La iconografía está cuidadosamente construida. En la parte superior hay una urna clásica, flanqueada por dos putti.",
      kaderLeeg: "Durante más de treinta años — de 1915 a 1947 — el marco permaneció vacío.",
      soldaatTitle: "Soldado de la clase de 1914, aplazado a 1919",
      soldaatText: "Solo después de la guerra fue llamado: el 19 de julio de 1919 entró en servicio.",
      mobilisatieZakboekjeText: "En mi archivo familiar todavía conservo su 'Livret de Mobilisation' original.",
      bezettingsmachtText: "Sirvió en Alemania con las fuerzas de ocupación belgas como 'maestro de caballos' en el 6° Regimiento de Artillería.",
      elsenbornText: "El 18 de mayo recibió su 'congé illimité' en el cuartel de Elsenborn, después de un examen médico.",
      getrouwdText: "Mientras tanto, el 9 de enero de 1918 se había casado con su prometida, Madeleine Geldof, y ya tenía una hija: Maria, nacida el 23 de octubre de 1918.",
      inwonenText: "Esto también significaba que durante su servicio militar tuvo que dejar a su esposa e hija.",
      dochtertjeFotoText: "Bastante conmovedor: esta foto de la hijita que ella le envió en algún momento de 1919.",
      periode1920Title: "El período 1920-1945",
      periode1920Text: "Hay total incertidumbre sobre los años 1920 a 1923.",
      geboortenText: "Los únicos hechos comprobados de esos años son el nacimiento de un hijo, Jooris, en enero de 1921 y de una hija Beatrijs en octubre de 1922.",
      verhuizingText: "En 1923 la familia se mudó a Burgermeester Van Den Bogaerdelaan 25 en Izegem.",
      woningText: "Allí compraron una casa bastante espaciosa con jardín delantero y un taller detrás.",
      burenText: "Como vecinos tenían los talleres del fabricante de persianas Windels y la fábrica de sillones Durlet.",
      oudeFotosCaption: "Algunas fotos extremadamente raras con la 'vieja' casa en Van Den Bogaerdelaan",
      reclamestandText: "Un expositor publicitario en una exposición con ejemplos de artesanía. Todos estos elementos se integrarán más tarde en 1945 en la sala de estar de la nueva casa.",
      clickToEnlarge: "Haga clic para ampliar",
      close: "Cerrar",
      imageCaption: "Marcel como joven artesano",
      kaderCaption: "El marco-retrato de 1915",
    },
    vls: {
      groteMeterTitle: "Grote Meter en Kleine Meter",
      groteMeterText: "D'éne grootmoeder (Magdalena, moa deur iederéen Madeleine genoemd) nuumde 'k 'Grote Meter', want dat wos 'n statigen oma die oltied mee vele gezag klaptj.",
      woonkamerText: "Ik em nog oltied zeer levendige herinneringen oan de indrukwekkende woonkoamer in 't statiege hus oan de Vanden Bogaardelaan.",
      loekiTitle: "Loeki",
      loekiText: "Van september 1954 tot februari 1955 kwam ek der – soamen mee mienen broer Luc – biekans dageliks over de vloer bie Peter en Meter. Peter a 'n hond, 'n nijdige keffer: Loeki.",
      jeugdjarenTitle: "De jonge joaren van Marcel",
      jeugdjarenText: "Grootvader Marcel August Deforce wier geboorn in Emelgem, in de wiek Vievewegen. Hee wier groot ols de zeune van 'n timmerman.",
      avondonderwijsText: "'s Oavends zat Marcel were op 'n bank, moa dan in 'n klaslokoal van 't oavondonderwies.",
      houtsnijdersText: "Op 'n poar vergeelde foto's uut 1908 en 1910 stoat hee soamen mee zienen vader, béden lid van de Vereniginge van Houtsniedrs van Izegem.",
      deBoerOpText: "Uut mien kindertied herinner ek me zien verhoaln. Hee gieng, gelik da'j zei, letterlik 'de boer op'.",
      wo1Title: "Periode 1914-1918",
      wo1Text: "'t Toeval eet hem bie 't uutbrekn van de Eerste Wéreldoorlog behoed voe 't front.",
      verkeringTitle: "Verkeringe mee Madeleine",
      verkeringText: "In die tied ad hee ook verkeringe gekregen mee Madeleine, dochter van Emile Geldof, wientapper in de wiek Bosmolens.",
      juwelenkistjeText: "Voe heur herte te winnen ad hee in dezelfste periode 'n ander kunstwerkje gemoakt ols cadeau: 'n juwelenkistje.",
      meesterwerkTitle: "Het Meesterstuk van 1915",
      meesterwerkText: "In 1915, op 21-joarigen ouderdom al op 't toppunt van zienen kunnen, moaktj hee 'n eeste meesterstuk: 'n imposant houtgesculpteerd portretkader.",
      kaderDetails: "Het kader ontstieng in 1915, uutgevoerd in massieve eik en volledig mee de hand gesnéen. De ofmetingen zien: 1 m hoog en 70 cm breed; 't weegt 12 kg.",
      iconografie: "De iconografie is zorgvuldig opgebouwd. Bovenoang troont 'n klassieke urne, geflankeerd deur twé putti.",
      kaderLeeg: "Gedurende mé dan dertig joar — van 1915 tot 1947 — bleef 't kader lég.",
      soldaatTitle: "Soldoat van de lichting 1914, verplaatst noar 1919",
      soldaatText: "Pas no de oorlog wier hee opgeroepen: op 19 juli 1919 trad hee in dienst.",
      mobilisatieZakboekjeText: "In mien familiearchief bewoar ik nog oltied zien originele 'Livret de Mobilisation'.",
      bezettingsmachtText: "Hee diende in Duutsland bie de Belgische bezettingsmacht, ols 'peerdemeester' bie 't 6° Regiment Artillerie.",
      elsenbornText: "Op 18 mei verkreeg hee in de kazerne van Elsenborn zienen 'congé illimité'.",
      getrouwdText: "Intussen wos hee op 9 januari 1918 getrouwd mee zien verloofde, Madeleine Geldof, en ad mee heur al 'n dochter: Maria.",
      inwonenText: "Dat betekent dus ook wel da'j tieds zien legerdienst zien vrouwe en kind moest achterloten.",
      dochtertjeFotoText: "Recht ontroerend: deze foto van 't dochtertje die ze erges in 1919 noar hem stuurde.",
      periode1920Title: "De periode 1920-1945",
      periode1920Text: "Over de joaren 1920 tot 1923 heerst totale onduidelijkheid.",
      geboortenText: "De enige bewezen feiten uut die joaren zien de geboorte van 'n zeune, Jooris, in januari 1921 en van 'n dochter Beatrijs in oktober 1922.",
      verhuizingText: "In 1923 verhuisde 't gezin noar de Burgermeester Van Den Bogaerdelaan 25 in Izegem.",
      woningText: "Ze kochten der 'n vrij ruim hus, mee voortuin en mee 'n atelier derachter.",
      burenText: "Ols buren adden ze der onder meer de werkplaotsn van rolluikenfabrikant Windels en zetelfabriek Durlet.",
      oudeFotosCaption: "Een poar uiterst zeldzame foto's mee 't 'oude' hus in de Van Den Bogaerdelaan",
      reclamestandText: "'n Reclamestandje in 'n tentoonstelling mee voorbeelden van vakmanschap.",
      clickToEnlarge: "Klik voe te vergrotn",
      close: "Slutn",
      imageCaption: "Marcel ols jongen ambachtsman",
      kaderCaption: "Het portretkader uut 1915",
    },
    pcd: {
      groteMeterTitle: "Grand'Mérin et Petite Mérin",
      groteMeterText: "Eune d'mes grand-mères (Magdalena, mais qu'tout l'monde appeloét Madeleine) j'l'appeloés 'Grand'Mérin', pace qu'al étoét eune grand-mère majestueuse.",
      woonkamerText: "J'ai toudis des souvnirs bé vifs du salon impressionnant d'l'maison majestueuse d'la Vanden Bogaardelaan.",
      loekiTitle: "Loeki",
      loekiText: "D'septembre 1954 à février 1955, j'alloés presqu' tous les jours chez Pèrin et Mérin aveuc min frère Luc. Pèrin avoét in kien, in tiot roquet hargneux : Loeki.",
      jeugdjarenTitle: "L'jonnesse ed Marcel",
      jeugdjarenText: "Grand-père Marcel August Deforce il est né à Emelgem, dins l'quartier Vijfwegen. Il a grandi comme fiu d'in minuisier.",
      avondonderwijsText: "L'souér, Marcel al s'asseyoét sur in banc, mais dins eune salle ed' classe d'l'école du souér.",
      houtsnijdersText: "Sur quéques portraits jaunis d'1908 et 1910, i pose aveuc sin père, tous les dux mimbes ed l'Association des Sculpteurs sur Bos d'Iseghem.",
      deBoerOpText: "D'min enfance, j'me rappelle ed ses histouères. I alloét littéralement 'faire l'tour'.",
      wo1Title: "Période 1914-1918",
      wo1Text: "L'hasard l'a protégé du front quand la Première Guerre mondioale al a commincé.",
      verkeringTitle: "Fiançailles aveuc Madeleine",
      verkeringText: "In ch'tans-lo i avoét aussi commincé à faire l'cour à Madeleine, fille d'Emile Geldof, marchand d'vin dins l'quartier d'Bosmolens.",
      juwelenkistjeText: "Pou gagner sin cœur i avoét fait eune aute petite œuv' d'art comme cadeau : eune cassette à bijoux.",
      meesterwerkTitle: "L'Chef-d'œuv' ed 1915",
      meesterwerkText: "In 1915, à 21 ans, i a produit sin premier chef-d'œuv' : in cadre d'portrait in bos sculpté à main.",
      kaderDetails: "L'cadre il a été créé in 1915, in chêne massif et tout sculpté à main. Dimensions : 1 m d'haut et 70 cm d'large ; poids : 12 kg.",
      iconografie: "L'iconographie al est soigneusement construite. In haut trône eune urne classique, flanquée d'dux putti.",
      kaderLeeg: "Pendant pus d'trente ans — d'1915 à 1947 — l'cadre il est resté vide.",
      soldaatTitle: "Soldat d'la classe 1914, reporté à 1919",
      soldaatText: "Ch'est seul'mint après l'guerre qu'i a été appelé : l'19 juillet 1919 il est entré in service.",
      mobilisatieZakboekjeText: "Dins mes archives d'famille j'ai toudis sin 'Livret de Mobilisation' original.",
      bezettingsmachtText: "I a servi in Allemagne aveuc les forces d'occupation belges, comme 'maître d'chevaux' au 6e Régiment d'Artillerie.",
      elsenbornText: "L'18 mai i a reçu sin 'congé illimité' à la caserne d'Elsenborn.",
      getrouwdText: "In attendant, l'9 janvier 1918 i s'avoét marié aveuc sin fiancée, Madeleine Geldof, et i avoét déjà eune fille : Maria.",
      inwonenText: "Cha signifioét aussi que pendant sin service militaire i devoét laisser s'femme et s'fille.",
      dochtertjeFotoText: "Bé émouvant : chte photo d'la tiote fille qu'elle li a envoyé in 1919.",
      periode1920Title: "L'période 1920-1945",
      periode1920Text: "I y a incertitude totale sur les années 1920 à 1923.",
      geboortenText: "Les seuls faits prouvés d'ches années-lo ch'est la naissance d'in fiu, Jooris, in janvier 1921 et d'eune fille Beatrijs in octobre 1922.",
      verhuizingText: "In 1923 la famille a déménagé au Burgermeester Van Den Bogaerdelaan 25 à Izegem.",
      woningText: "I z'ont acheté eune maison assez grande aveuc in jardin d'vant et in atelier d'derrière.",
      burenText: "Comme voisins i avoét les ateliers du fabricant d'volets roulants Windels et l'fabrique d'fauteuils Durlet.",
      oudeFotosCaption: "Quéques photos bé rares aveuc l'vieulle maison sur Van Den Bogaerdelaan",
      reclamestandText: "In présentoir publicitaire dins eune exposition aveuc des exemples d'artisanat.",
      clickToEnlarge: "Cliquez pour agrandir",
      close: "Fermer",
      imageCaption: "Marcel jeune artisan",
      kaderCaption: "L'cadre-portrait ed 1915",
    },
    sv: {
      groteMeterTitle: "Stora Gudmor och Lilla Gudmor",
      groteMeterText: "Den ena mormodern (Magdalena, men kallad Madeleine av alla) kallade jag 'Stora Gudmor', för hon var en ståtlig mormor som alltid talade med stor auktoritet.",
      woonkamerText: "Jag har fortfarande mycket levande minnen av det imponerande vardagsrummet i det ståtliga huset på Vanden Bogaardelaan.",
      loekiTitle: "Loeki",
      loekiText: "Från september 1954 till februari 1955 var jag och min bror Luc hos Gudfar och Gudmor nästan dagligen. Gudfar hade en hund, en ilsken terrier: Loeki.",
      jeugdjarenTitle: "Marcels ungdomsår",
      jeugdjarenText: "Farfar Marcel August Deforce föddes i Emelgem, i stadsdelen Vijfwegen. Han växte upp som son till en snickare.",
      avondonderwijsText: "På kvällarna satt Marcel återigen på en bänk, men då i ett klassrum för kvällsundervisning.",
      houtsnijdersText: "På några gulnade fotografier från 1908 och 1910 står han tillsammans med sin far, båda medlemmar i Träsnidareföreningen i Iseghem.",
      deBoerOpText: "Från min barndom minns jag hans berättelser. Han gick bokstavligen 'ut på landsbygden': från gård till borgarhus.",
      wo1Title: "Perioden 1914-1918",
      wo1Text: "Slumpen skyddade honom från fronten vid utbrottet av första världskriget.",
      verkeringTitle: "Uppvaktning av Madeleine",
      verkeringText: "Vid den tiden hade han också börjat uppvakta Madeleine, dotter till Emile Geldof, en vinhandlare i Bosmolens-området.",
      juwelenkistjeText: "För att vinna hennes hjärta hade han tillverkat ett annat litet konstverk som gåva under samma period: ett smyckeskrin.",
      meesterwerkTitle: "Mästerverket från 1915",
      meesterwerkText: "År 1915, vid 21 års ålder redan på toppen av sin förmåga, producerade han sitt första mästerverk: en imponerande handsnidad porträttram i trä.",
      kaderDetails: "Ramen skapades 1915, i massiv ek och helt handsnidad. Måtten är: 1 m hög och 70 cm bred; den väger 12 kg.",
      iconografie: "Ikonografin är noggrant uppbyggd. Högst upp tronar en klassisk urna, flankerad av två putti.",
      kaderLeeg: "I mer än trettio år — från 1915 till 1947 — förblev ramen tom.",
      soldaatTitle: "Soldat från klass 1914, uppskjuten till 1919",
      soldaatText: "Först efter kriget kallades han in: den 19 juli 1919 trädde han i tjänst.",
      mobilisatieZakboekjeText: "I mitt familjearkiv har jag fortfarande kvar hans original 'Livret de Mobilisation'.",
      bezettingsmachtText: "Han tjänstgjorde i Tyskland med de belgiska ockupationsstyrkorna som 'hästmästare' vid 6:e Artilleriregementet.",
      elsenbornText: "Den 18 maj fick han sin 'congé illimité' vid Elsenborn-kasernen.",
      getrouwdText: "Under tiden hade han den 9 januari 1918 gift sig med sin fästmö, Madeleine Geldof, och hade redan en dotter: Maria.",
      inwonenText: "Detta betydde också att han under sin militärtjänst var tvungen att lämna sin fru och sitt barn.",
      dochtertjeFotoText: "Ganska rörande: detta foto av lilla dottern som hon skickade till honom någon gång 1919.",
      periode1920Title: "Perioden 1920-1945",
      periode1920Text: "Det råder total osäkerhet om åren 1920 till 1923.",
      geboortenText: "De enda bevisade fakta från dessa år är födelsen av en son, Jooris, i januari 1921 och en dotter Beatrijs i oktober 1922.",
      verhuizingText: "1923 flyttade familjen till Burgermeester Van Den Bogaerdelaan 25 i Izegem.",
      woningText: "De köpte ett ganska rymligt hus med trädgård framtill och verkstad bakom.",
      burenText: "Som grannar hade de bland annat verkstäderna för rullgardinsfabrikanten Windels och fåtöljfabriken Durlet.",
      oudeFotosCaption: "Några extremt sällsynta foton med det 'gamla' huset på Van Den Bogaerdelaan",
      reclamestandText: "En reklammonter på en utställning med exempel på hantverk. Alla dessa element integrerades senare 1945 i vardagsrummet i det nya huset.",
      clickToEnlarge: "Klicka för att förstora",
      close: "Stäng",
      imageCaption: "Marcel som ung hantverkare",
      kaderCaption: "Portrettramen från 1915",
    },
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <div ref={ref} className="mt-16 space-y-12">
      {/* Grote Meter section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="prose prose-lg max-w-3xl mx-auto text-foreground/80"
      >
        <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
          <Users className="w-5 h-5" />
          {t.groteMeterTitle}
        </h3>
        <p>{t.groteMeterText}</p>
        <p>{t.woonkamerText}</p>
      </motion.div>

      {/* Loeki section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="p-6 bg-accent/5 border border-accent/20 rounded-lg max-w-3xl mx-auto"
      >
        <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
          <Dog className="w-4 h-4" />
          {t.loekiTitle}
        </h4>
        <p className="text-foreground/80 mb-4">{t.loekiText}</p>
        <figure className="text-center">
          <video
            src={loekiVideo}
            autoPlay
            loop
            muted
            playsInline
            className="max-w-xs mx-auto rounded-lg shadow-elevated"
          />
          <figcaption className="mt-2 text-sm text-muted-foreground italic">
            Loekie
            <span className="block text-xs mt-1 text-muted-foreground/70">
              {language === 'nl' && '🎬 Geanimeerd met AI'}
              {language === 'en' && '🎬 Animated with AI'}
              {language === 'fr' && '🎬 Animé par IA'}
              {language === 'de' && '🎬 Mit KI animiert'}
              {language === 'es' && '🎬 Animado con IA'}
              {language === 'vls' && '🎬 Geanimeerd mee AI'}
              {language === 'pcd' && "🎬 Animé par l'IA"}
              {language === 'sv' && '🎬 Animerad med AI'}
            </span>
          </figcaption>
        </figure>
      </motion.div>

      {/* Jeugdjaren section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Baby className="w-5 h-5" />
            {t.jeugdjarenTitle}
          </h3>
          <p>{t.jeugdjarenText}</p>
          <p>{t.avondonderwijsText}</p>
        </div>


        <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80">
          <p>{t.houtsnijdersText}</p>
          <p>{t.deBoerOpText}</p>
        </div>
      </motion.div>

      {/* WO1 section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="p-6 bg-card border border-border rounded-lg max-w-3xl mx-auto"
      >
        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <Medal className="w-4 h-4" />
          {t.wo1Title}
        </h4>
        <p className="text-foreground/80">{t.wo1Text}</p>
      </motion.div>

      {/* Verkering section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="p-6 bg-accent/5 border border-accent/20 rounded-lg max-w-3xl mx-auto"
      >
        <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          {'verkeringTitle' in t ? (t as any).verkeringTitle : 'Verkering met Madeleine'}
        </h4>
        <p className="text-foreground/80 mb-4">{'verkeringText' in t ? (t as any).verkeringText : ''}</p>
        <p className="text-foreground/80">{'juwelenkistjeText' in t ? (t as any).juwelenkistjeText : ''}</p>
      </motion.div>

      {/* Soldaat section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {/* Soldier photo above the title */}
        <figure 
          className="text-center cursor-pointer group"
          onClick={() => setFullscreenImage(marcelSoldaat)}
        >
          <div className="relative inline-block">
            <img
              src={marcelSoldaat}
              alt="Marcel Deforce als soldaat"
              className="w-48 md:w-56 rounded-lg shadow-elevated mx-auto"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground italic">
            Marcel Deforce
          </figcaption>
        </figure>

        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {'soldaatTitle' in t ? (t as any).soldaatTitle : 'Soldaat van de lichting 1914'}
          </h3>
          <p>{'soldaatText' in t ? (t as any).soldaatText : ''}</p>
          <p>{'mobilisatieZakboekjeText' in t ? (t as any).mobilisatieZakboekjeText : ''}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[juwelenkistje, mobilisatieZakboekjeBinnen, mobilisatieZakboekje2, fotoDochtertje1919].map((img, i) => (
            <figure key={i} className="cursor-pointer group" onClick={() => setFullscreenImage(img)}>
              <div className="relative">
                <img src={img} alt="Mobilisatie zakboekje" className="w-full rounded-lg shadow-elevated" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-2 py-1 rounded-full">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>
        <div className="prose prose-lg text-foreground/80">
          <p>{'bezettingsmachtText' in t ? (t as any).bezettingsmachtText : ''}</p>
          <p>{'elsenbornText' in t ? (t as any).elsenbornText : ''}</p>
          <p>{'getrouwdText' in t ? (t as any).getrouwdText : ''}</p>
          <p>{'inwonenText' in t ? (t as any).inwonenText : ''}</p>
          <p className="italic">{'dochtertjeFotoText' in t ? (t as any).dochtertjeFotoText : ''}</p>
        </div>
      </motion.div>

      {/* Periode 1920-1945 section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="prose prose-lg text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            {'periode1920Title' in t ? (t as any).periode1920Title : 'De periode 1920-1945'}
          </h3>
          <p>{'periode1920Text' in t ? (t as any).periode1920Text : ''}</p>
          <p>{'geboortenText' in t ? (t as any).geboortenText : ''}</p>
          <p>{'verhuizingText' in t ? (t as any).verhuizingText : ''}</p>
          <p>{'woningText' in t ? (t as any).woningText : ''}</p>
          <p>{'burenText' in t ? (t as any).burenText : ''}</p>
        </div>
        <p className="text-center text-sm text-muted-foreground italic">{'oudeFotosCaption' in t ? (t as any).oudeFotosCaption : ''}</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { img: mariaGeorges1923, caption: "Maria en Georges Deforce, 1923", alt: "Maria en Georges Deforce, 1923" },
            { img: joorisDeforce1925, caption: "Georges Deforce, 1925", alt: "Georges Deforce, 1925" },
            { img: oudHuisVdb1927, caption: "Maria, Georges, Monique en Bérénice Deforce, ca. 1927", alt: "Maria, Georges, Monique en Bérénice Deforce voor het huis, ca. 1927" }
          ].map((item, i) => (
            <figure key={i} className="cursor-pointer group" onClick={() => setFullscreenImage(item.img)}>
              <div className="relative">
                <img src={item.img} alt={item.alt} className="w-full rounded-lg shadow-elevated" />
                <AiLabel className="top-2 left-2" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-2 py-1 rounded-full">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </motion.div>

      {/* Reclamestand section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="p-6 bg-card border border-border rounded-lg max-w-3xl mx-auto"
      >
        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Vakmanschap
        </h4>
        <p className="text-foreground/80 mb-4">{'reclamestandText' in t ? (t as any).reclamestandText : ''}</p>
        <figure className="cursor-pointer group" onClick={() => setFullscreenImage(reclamestandVakmanschap)}>
          <div className="relative max-w-md mx-auto">
            <img src={reclamestandVakmanschap} alt="Reclamestand vakmanschap" className="w-full rounded-lg shadow-elevated object-contain" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        </figure>
      </motion.div>

      {/* Meesterwerk section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80">
          <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
            <Hammer className="w-5 h-5" />
            {t.meesterwerkTitle}
          </h3>
          <p>{t.meesterwerkText}</p>
        </div>

        {/* Kader image centered */}
        <div className="flex justify-center">
          <figure 
            className="text-center cursor-pointer group max-w-md"
            onClick={() => setFullscreenImage(portretkader1915)}
          >
            <div className="relative">
              <img
                src={portretkader1915}
                alt={t.kaderCaption}
                className="w-full rounded-lg shadow-elevated"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
            <figcaption className="mt-2 text-sm text-muted-foreground italic">
              {t.kaderCaption}
            </figcaption>
          </figure>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80">
          <p>{t.kaderDetails}</p>
          <p>{t.iconografie}</p>
          <p className="italic">{t.kaderLeeg}</p>
        </div>
      </motion.div>

      {/* Vervolg: Het groeiende gezin, oorlogsperiode, nieuw huis */}
      <MarcelBiografieVervolg />

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
          />
        </motion.div>
      )}
    </div>
  );
};

export default MarcelBiografie;
