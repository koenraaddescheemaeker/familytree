import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, BookOpen, Users } from "lucide-react";
import ReadMore from "@/components/ui/ReadMore";
import ShareButton from "@/components/ui/ShareButton";
import AiLabel from "@/components/ui/AiLabel";
import portretkaderVerschaeve from "@/assets/portretkader-verschaeve.jpg";
import portretkaderDetail from "@/assets/portretkader-detail-1.jpg";
import portretkaderGrootmoeder from "@/assets/portretkader-grootmoeder.jpg";
import antoonVandromme from "@/assets/antoon-vandromme.jpg";
import antoonVandrommeColor from "@/assets/antoon-vandromme-color.jpg";

const Verschaeve = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const readMoreLabel = language === 'en' ? 'Read more' : language === 'fr' ? 'Lire la suite' : language === 'sv' ? 'Läs mer' : 'Lees meer';
  const readLessLabel = language === 'en' ? 'Read less' : language === 'fr' ? 'Lire moins' : language === 'sv' ? 'Läs mindre' : 'Lees minder';

  const content = {
    nl: {
      partTitle: "Deel III — VARIA",
      partSubtitle: "Wetenswaardigheden & anecdotes uit alle hoeken van de stamboom",
      sectionTitle: "Over Cyriel Verschaeve",
      sectionSubtitle: "(1874–1949)",
      intro: "Er valt niet aan te ontsnappen, dit verhaal over de destijds befaamde, bewonderde, maar later beruchte, verfoeide en zelfs veroordeelde priester-dichter moet hier verteld worden.",
      kaderTitle: "Een kader, twee tijden",
      kaderText1: "Het eikenhouten kader heeft een complexe geschiedenis. De neutraliteit ervan verdween in 1947, toen in het kader het portret van Cyriel Verschaeve werd geplaatst. Dat grote kader — het fameuze houten pronkstuk dat in de woonkamer hing — behoort tot mijn vroegste herinneringen. Als kind stond ik ervoor, klein gemaakt door zijn omvang. Het portret erin straalde een ernst uit die ik niet kon duiden, maar die me stil kreeg. Het was duidelijk iemand die belangrijk moest zijn. Tegelijk was ik ook gedurende heel mijn jeugd enorm onder de indruk van het kunstige vakmanschap van mijn grootvader.",
      kaderAnecdote: "Tante Monique vertrouwde mij ooit toe dat het verhaal ging dat het oorspronkelijk Marcel's bedoeling was het portret van zijn vrouw, Madeleine, er in aan te brengen en dat thuis op te hangen. Zij zou dat pertinent geweigerd hebben omdat ze vond dat dit veel te aanstellerig zou overkomen.",
      familieband: "De moeder van Cyriel Verschaeve was een Deforce! Zijn overgrootvader was een broer van de overgrootvader van Marcel Deforce. Hij was dus (verre) familie. Het is dus niet abnormaal dat men in de familie er al jarenlang prat op ging een beroemdheid in de familie te hebben; ze waren er trots op al lang voordat hij zijn kwalijke reputatie verwierf.",
      portretkaderCaption: "Het portretkader gemaakt door Marcel Deforce, met daarin het portret van Cyriel Verschaeve",
      portretkaderDetailCaption: "Het kader met het portret van Marcel Deforce (Peter) — om de maker te eren",
      portretkaderGrootmoederCaption: "Het kader met het portret van Magdalena Geldof (Grote Meter) — zoals de auteur het liever ziet",
      symboliekTitle: "Symboliek en erfgoed",
      symboliekText1: "Het aanbrengen van dit portret in een monumentaal, bijna sacraal aandoend kader was geen louter esthetische keuze, maar werd een daad met duidelijke symbolische implicaties.",
      symboliekText2: "Er is een spanningsveld tussen kader en portret: Het kader is ouder dan zijn inhoud en werd niet voor Verschaeve ontworpen. Toch verleent het hem, eenmaal geplaatst, een symbolisch gewicht dat hij niet vanzelfsprekend bezit. De ambachtelijke esthetiek van circa 1915 wordt zo ingezet om een figuur uit een latere, moreel beladen context te omlijsten en te legitimeren. Het object wordt daarmee geen neutrale drager van herinnering, maar een actief instrument in de constructie van betekenis.",
      symboliekText3: "Vandaag kan dit geheel niet los worden gezien van zijn gelaagde geschiedenis. Het is een samengesteld object waarin verschillende tijden, intenties en waardesystemen samenkomen — en met elkaar botsen, ook binnen de familie. Enerzijds is er het kader als product van hoogstaand vakmanschap, ontstaan in een periode waarin ambacht en traditie centraal stonden. Anderzijds is er het portret, toegevoegd in een naoorlogse context waarin herinnering, schuld en ideologische erfenissen nog scherp werden betwist.",
      symboliekText4: "Juist die spanning maakt het object relevant. Het toont hoe erfgoed niet statisch is, maar voortdurend van betekenis verandert naargelang van gebruik en context. Dit kader vertelt daarom niet alleen iets over een ambachtsman of over Cyriel Verschaeve, maar ook over de mechanismen van herinnering en verheerlijking — en over de noodzaak om zulke objecten vandaag kritisch te blijven benaderen.",
      persoonlijkeNoot: "Ik bewaar het kader in zijn originele toestand, als waardevol en antiek object, als familie-erfgoed. Het portret van Cyriel Verschaeve heb ik eruit gehaald en bewaar het apart. Zelf zie ik het liever zo: ofwel het beeld van mijn grootmoeder erin, om de oorspronkelijke bedoeling te visualiseren, ofwel het portret van mijn grootvader Marcel om de maker te eren.",
      vandrommeTitle: "Antoon Vandromme...",
      vandrommeText1: "De man die het portret van Cyriel Verschaeve heeft getekend is, zeker in culturele kringen, een zeer bekende Izegemnaar. Hoe en waarom en wanneer dat tot stand is gekomen, blijft een open vraag. (Op de achterkant heeft ooit iemand (Gabriël Deforce?) met een groene stift genoteerd: 1947). Misschien was het een opdracht, misschien een gebaar uit bewondering. In elk geval maakte hij een nauwkeurige weergave van een foto die vandaag nog vlot terug te vinden is. De tekening is gemaakt met zachte pastelkrijt (soft pastels) op getint papier.",
      vandrommeText2: "ANTOON VANDROMME, geboren in 1922 was beroepshalve onderwijzer (Torhout, 1942) aan het Sint-Jozefcollege te Izegem en tekenleraar (Brussel, 1948) aan de Stedelijke Leergangen te Izegem. In 1960 was hij medestichter van de heemkundige kring 'TEN MANDERE' en 26 jaar lang redacteur van dit gelijknamig tijdschrift. Sedert 1988 behoort hij nog tot de redactieraad van dit periodiek en werd hij ondervoorzitter van deze vereniging.",
      vandrommePublicaties: "Naar aanleiding van zijn werk verschenen er naast tientallen artikels in 'TEN MANDERE' verder van hem:",
      vandrommeList: [
        "IZEGEM VROEGER EN NU (1974), m.m.v. de bestuursleden van T.M. Drukkerij-Uitgeverij: Hochepied, Izegem.",
        "E.H. LEOPOLD SLOSSE EN HET IZEGEMSE SLOSSEFONDS (1983) samen met een inhoudstafel van het 25-delig Izegemse Slossefonds, m.m.v. de bestuursleden van T.M. uitgave: T.M.",
        "KAPELLEN TE IZEGEM, een kapelnummer in de reeks T.M. nr. 72 (1985).",
        "Medewerker aan GESCHIEDENIS VAN IZEGEM (1985), Uitgever: T.M. Izegem.",
      ],
      vandrommeSlot: "A. Vandromme werkte mee aan diverse geschiedkundige en artistieke tentoonstellingen in Izegem en aan de inrichting van het Nationaal Schoeisel- (1967) en het Nationaal Borstelmuseum (1988).",
      vandrommeCaption: "Antoon Vandromme — tekenaar van het portret van Cyriel Verschaeve",
      stamboomTitle: "Familieband Deforce – Verschaeve",
      overzichtTitle: "Cyriel Verschaeve (1874–1949): kort overzicht",
      inleidingTitle: "I. Inleiding",
      inleiding: "Cyriel Verschaeve was een priester-dichter, essayist en ideologisch denker binnen de Vlaamse beweging. Zijn naam blijft tot op vandaag omstreden vanwege zijn culturele invloed enerzijds en zijn collaboratie met nazi-Duitsland tijdens de Tweede Wereldoorlog anderzijds.",
      jeugdTitle: "II. Leven en loopbaan",
      jeugd1Title: "1. Jeugd en opleiding (1874–1898)",
      jeugd1: "Geboren in Ardooie in 1874, volgde Verschaeve middelbare studies in Roeselare en tot priesteropleiding in Brugge. In 1897 werd hij tot priester gewijd.",
      jeugd2Title: "2. Leraar, cultuurwerker en dichter (1898–1914)",
      jeugd2: "Verschaeve werkte als onderpastoor in Alveringem, waar hij uitgroeide tot een cultureel boegbeeld van het Vlaamse katholieke nationalisme. Hij schreef mystiek-religieuze en symbolistische poëzie, beïnvloed door Duitse filosofie en romantiek.",
      jeugd3Title: "3. De Eerste Wereldoorlog en activisme (1914–1918)",
      jeugd3: "Tijdens WO I stond hij ideologisch aan de zijde van het activisme. Zijn gedicht \"Aan de IJzer\" groeide uit tot een symbool van Vlaamse strijd en rouw. Hoewel niet politiek actief, werd hij na de oorlog als activistisch gezind beschouwd.",
      jeugd4Title: "4. Tussen de oorlogen (1919–1940)",
      jeugd4: "Verschaeve werd een moreel en ideologisch mentor van het radicaliserende Vlaams-nationalisme. Zijn essays en voordrachten benadrukten religieus-nationalistische idealen, het belang van offer en heldendom en de culturele verheffing van Vlaanderen.",
      jeugd5Title: "5. De Tweede Wereldoorlog en collaboratie (1940–1944)",
      jeugd5: "Tijdens WO II collaboreerde Verschaeve openlijk met nazi-Duitsland. Hij steunde Vlaamse SS-vrijwilligers en zag in Duitsland een kans op een Vlaamse staat. Hierdoor werd hij na de oorlog zwaar veroordeeld.",
      jeugd6Title: "6. Ballingschap en dood (1944–1949)",
      jeugd6: "Naar Oostenrijk gevlucht werd hij in België ter dood veroordeeld bij verstek. Hij overleed in 1949 in Solbad Hall. Zijn stoffelijke resten werden in 1973 door extreemrechtse leden naar Vlaanderen overgebracht.",
      literatuurTitle: "III. Literatuur, filosofie en esthetica",
      literatuur: "Zijn werk omvat poëzie, essays en drama, gekenmerkt door mystiek-religieuze symboliek, retorische stijl en nadruk op heldendom en nationale verheffing. Hoewel stilistisch sterk, blijft zijn oeuvre ideologisch beladen.",
      receptieTitle: "IV. Receptie en controverse",
      receptie: "Verschaeve wordt erkend als invloedrijk schrijver binnen de Vlaamse beweging, maar zijn collaboratie werpt een blijvende schaduw over zijn reputatie. Historici beoordelen hem als een getalenteerd auteur die politiek ontspoorde.",
    },
    en: {
      partTitle: "Part III — VARIA",
      partSubtitle: "Curiosities & anecdotes from all corners of the family tree",
      sectionTitle: "About Cyriel Verschaeve",
      sectionSubtitle: "(1874–1949)",
      intro: "There is no escaping it — this story about the once famous, admired, but later notorious, reviled and even convicted priest-poet must be told here.",
      kaderTitle: "A frame, two eras",
      kaderText1: "The oak frame has a complex history. Its neutrality disappeared in 1947, when the portrait of Cyriel Verschaeve was placed inside. That large frame — the famous wooden showpiece that hung in the living room — belongs to my earliest memories. As a child I stood before it, made small by its size. The portrait radiated a seriousness I could not interpret, but that silenced me. It was clearly someone who had to be important. At the same time, throughout my youth I was enormously impressed by the artistic craftsmanship of my grandfather.",
      kaderAnecdote: "Aunt Monique once confided to me that the story went that it was originally Marcel's intention to place his wife Madeleine's portrait inside and hang it at home. She would have adamantly refused because she felt it would come across as far too pretentious.",
      familieband: "The mother of Cyriel Verschaeve was a Deforce! His great-grandfather was a brother of Marcel Deforce's great-grandfather. He was therefore (distant) family. It is thus not unusual that the family had long prided itself on having a celebrity in the family; they were proud of it long before he acquired his sinister reputation.",
      portretkaderCaption: "The portrait frame made by Marcel Deforce, containing the portrait of Cyriel Verschaeve",
      portretkaderDetailCaption: "The frame with the portrait of Marcel Deforce (Peter) — honouring the maker",
      portretkaderGrootmoederCaption: "The frame with the portrait of Magdalena Geldof (Grote Meter) — as the author prefers to see it",
      symboliekTitle: "Symbolism and heritage",
      symboliekText1: "Placing this portrait in a monumental, almost sacral-looking frame was not a merely aesthetic choice, but became an act with clear symbolic implications.",
      symboliekText2: "There is a tension between frame and portrait: The frame is older than its content and was not designed for Verschaeve. Yet once placed, it lends him a symbolic weight he does not inherently possess. The artisanal aesthetics of circa 1915 are thus deployed to frame and legitimize a figure from a later, morally charged context. The object thereby becomes not a neutral carrier of memory, but an active instrument in the construction of meaning.",
      symboliekText3: "Today this ensemble cannot be seen apart from its layered history. It is a composite object in which different times, intentions and value systems converge — and collide, also within the family. On one hand there is the frame as a product of outstanding craftsmanship, created in a period when craft and tradition were central. On the other hand there is the portrait, added in a post-war context where memory, guilt and ideological legacies were still sharply contested.",
      symboliekText4: "It is precisely this tension that makes the object relevant. It shows how heritage is not static, but constantly changes meaning depending on use and context. This frame therefore tells us not only something about a craftsman or about Cyriel Verschaeve, but also about the mechanisms of memory and glorification — and about the necessity of continuing to approach such objects critically today.",
      persoonlijkeNoot: "I keep the frame in its original condition, as a valuable and antique object, as family heritage. I have removed the portrait of Cyriel Verschaeve and keep it separately. Personally, I prefer to see it this way: either the image of my grandmother inside, to visualize the original intention, or the portrait of my grandfather Marcel to honour the maker.",
      vandrommeTitle: "Antoon Vandromme...",
      vandrommeText1: "The man who drew the portrait of Cyriel Verschaeve is, certainly in cultural circles, a very well-known citizen of Izegem. How, why and when this came about remains an open question. (On the back, someone (Gabriël Deforce?) once noted in green marker: 1947). Perhaps it was a commission, perhaps a gesture of admiration. In any case, he made an accurate rendering of a photograph that is still easily found today. The drawing was made with soft pastels on tinted paper.",
      vandrommeText2: "ANTOON VANDROMME, born in 1922, was by profession a teacher (Torhout, 1942) at Sint-Jozefcollege in Izegem and a drawing teacher (Brussels, 1948) at the Municipal Courses in Izegem. In 1960 he co-founded the local history society 'TEN MANDERE' and was editor of the eponymous journal for 26 years. Since 1988 he has been on the editorial board and became vice-chairman of this association.",
      vandrommePublicaties: "In addition to dozens of articles in 'TEN MANDERE', the following works of his were published:",
      vandrommeList: [
        "IZEGEM VROEGER EN NU (1974), with the cooperation of T.M. board members. Printer-Publisher: Hochepied, Izegem.",
        "E.H. LEOPOLD SLOSSE EN HET IZEGEMSE SLOSSEFONDS (1983) together with a table of contents of the 25-volume Izegem Slosse Fund, with T.M. board members. Publication: T.M.",
        "KAPELLEN TE IZEGEM, a chapel issue in the T.M. series nr. 72 (1985).",
        "Contributor to GESCHIEDENIS VAN IZEGEM (1985), Publisher: T.M. Izegem.",
      ],
      vandrommeSlot: "A. Vandromme contributed to various historical and artistic exhibitions in Izegem and to the establishment of the National Footwear Museum (1967) and the National Brush Museum (1988).",
      vandrommeCaption: "Antoon Vandromme — artist of the portrait of Cyriel Verschaeve",
      stamboomTitle: "Family connection Deforce – Verschaeve",
      overzichtTitle: "Cyriel Verschaeve (1874–1949): brief overview",
      inleidingTitle: "I. Introduction",
      inleiding: "Cyriel Verschaeve was a priest-poet, essayist and ideological thinker within the Flemish movement. His name remains controversial to this day because of his cultural influence on the one hand and his collaboration with Nazi Germany during World War II on the other.",
      jeugdTitle: "II. Life and career",
      jeugd1Title: "1. Youth and education (1874–1898)",
      jeugd1: "Born in Ardooie in 1874, Verschaeve followed secondary studies in Roeselare and priestly training in Bruges. In 1897 he was ordained as a priest.",
      jeugd2Title: "2. Teacher, cultural worker and poet (1898–1914)",
      jeugd2: "Verschaeve worked as an assistant pastor in Alveringem, where he grew into a cultural figurehead of Flemish Catholic nationalism. He wrote mystical-religious and symbolist poetry, influenced by German philosophy and Romanticism.",
      jeugd3Title: "3. The First World War and activism (1914–1918)",
      jeugd3: "During WWI he ideologically sided with activism. His poem 'At the Yser' grew into a symbol of Flemish struggle and grief. Although not politically active, he was considered activist-minded after the war.",
      jeugd4Title: "4. Between the wars (1919–1940)",
      jeugd4: "Verschaeve became a moral and ideological mentor of radicalizing Flemish nationalism. His essays and lectures emphasized religious-nationalist ideals, the importance of sacrifice and heroism and the cultural elevation of Flanders.",
      jeugd5Title: "5. The Second World War and collaboration (1940–1944)",
      jeugd5: "During WWII Verschaeve openly collaborated with Nazi Germany. He supported Flemish SS volunteers and saw in Germany an opportunity for a Flemish state. As a result, he was severely condemned after the war.",
      jeugd6Title: "6. Exile and death (1944–1949)",
      jeugd6: "Having fled to Austria, he was sentenced to death in absentia in Belgium. He died in 1949 in Solbad Hall. His remains were transferred to Flanders in 1973 by far-right members.",
      literatuurTitle: "III. Literature, philosophy and aesthetics",
      literatuur: "His work encompasses poetry, essays and drama, characterized by mystical-religious symbolism, rhetorical style and emphasis on heroism and national elevation. Although stylistically strong, his oeuvre remains ideologically charged.",
      receptieTitle: "IV. Reception and controversy",
      receptie: "Verschaeve is recognized as an influential writer within the Flemish movement, but his collaboration casts a lasting shadow over his reputation. Historians judge him as a talented author who derailed politically.",
    },
    fr: {
      partTitle: "Partie III — VARIA",
      partSubtitle: "Curiosités & anecdotes de tous les coins de l'arbre généalogique",
      sectionTitle: "À propos de Cyriel Verschaeve",
      sectionSubtitle: "(1874–1949)",
      intro: "On ne peut y échapper, cette histoire sur le prêtre-poète autrefois célèbre et admiré, mais plus tard tristement célèbre, honni et même condamné, doit être racontée ici.",
      kaderTitle: "Un cadre, deux époques",
      kaderText1: "Le cadre en chêne a une histoire complexe. Sa neutralité a disparu en 1947, lorsque le portrait de Cyriel Verschaeve y fut placé. Ce grand cadre — la fameuse pièce d'apparat en bois qui ornait le salon — fait partie de mes plus anciens souvenirs. Enfant, je me tenais devant, rapetissé par ses dimensions. Le portrait dégageait une gravité que je ne pouvais interpréter, mais qui me réduisait au silence. C'était manifestement quelqu'un d'important. En même temps, durant toute ma jeunesse, j'étais énormément impressionné par l'habileté artisanale de mon grand-père.",
      kaderAnecdote: "Tante Monique m'a un jour confié que, selon le récit familial, l'intention originale de Marcel était d'y placer le portrait de son épouse, Madeleine, et de l'accrocher chez eux. Elle aurait catégoriquement refusé, trouvant cela bien trop prétentieux.",
      familieband: "La mère de Cyriel Verschaeve était une Deforce ! Son arrière-grand-père était un frère de l'arrière-grand-père de Marcel Deforce. Il était donc de la famille (éloignée). Il n'est donc pas anormal que la famille se soit longtemps enorgueillie d'avoir une célébrité parmi eux ; ils en étaient fiers bien avant qu'il n'acquière sa funeste réputation.",
      portretkaderCaption: "Le cadre portrait réalisé par Marcel Deforce, contenant le portrait de Cyriel Verschaeve",
      portretkaderDetailCaption: "Le cadre avec le portrait de Marcel Deforce (Peter) — en hommage au créateur",
      portretkaderGrootmoederCaption: "Le cadre avec le portrait de Magdalena Geldof (Grote Meter) — tel que l'auteur préfère le voir",
      symboliekTitle: "Symbolisme et patrimoine",
      symboliekText1: "Placer ce portrait dans un cadre monumental, d'aspect presque sacré, ne fut pas un choix purement esthétique, mais devint un acte aux implications symboliques évidentes.",
      symboliekText2: "Il existe une tension entre le cadre et le portrait : le cadre est plus ancien que son contenu et n'a pas été conçu pour Verschaeve. Pourtant, une fois placé, il lui confère un poids symbolique qu'il ne possède pas intrinsèquement. L'esthétique artisanale d'environ 1915 est ainsi mobilisée pour encadrer et légitimer une figure issue d'un contexte ultérieur moralement chargé. L'objet devient dès lors non pas un porteur neutre de mémoire, mais un instrument actif dans la construction du sens.",
      symboliekText3: "Aujourd'hui, cet ensemble ne peut être dissocié de son histoire stratifiée. C'est un objet composite où différentes époques, intentions et systèmes de valeurs convergent — et s'entrechoquent, y compris au sein de la famille. D'un côté, le cadre comme produit d'un artisanat de haut niveau, né à une époque où l'artisanat et la tradition étaient au cœur des préoccupations. De l'autre, le portrait, ajouté dans un contexte d'après-guerre où mémoire, culpabilité et héritages idéologiques étaient encore vivement contestés.",
      symboliekText4: "C'est précisément cette tension qui rend l'objet pertinent. Elle montre comment le patrimoine n'est pas statique, mais change constamment de signification selon l'usage et le contexte. Ce cadre raconte donc non seulement quelque chose sur un artisan ou sur Cyriel Verschaeve, mais aussi sur les mécanismes de la mémoire et de la glorification — et sur la nécessité de continuer à aborder ces objets de manière critique aujourd'hui.",
      persoonlijkeNoot: "Je conserve le cadre dans son état d'origine, comme un objet précieux et antique, comme un patrimoine familial. J'ai retiré le portrait de Cyriel Verschaeve et je le conserve séparément. Personnellement, je préfère le voir ainsi : soit l'image de ma grand-mère à l'intérieur, pour visualiser l'intention originale, soit le portrait de mon grand-père Marcel pour honorer le créateur.",
      vandrommeTitle: "Antoon Vandromme...",
      vandrommeText1: "L'homme qui a dessiné le portrait de Cyriel Verschaeve est, certainement dans les milieux culturels, un Izégeois très connu. Comment, pourquoi et quand cela s'est produit reste une question ouverte. (Au dos, quelqu'un (Gabriël Deforce ?) a noté un jour au marqueur vert : 1947). C'était peut-être une commande, peut-être un geste d'admiration. En tout cas, il a réalisé une reproduction fidèle d'une photo que l'on retrouve encore facilement aujourd'hui. Le dessin a été réalisé avec des pastels tendres (soft pastels) sur papier teinté.",
      vandrommeText2: "ANTOON VANDROMME, né en 1922, était de profession instituteur (Torhout, 1942) au Collège Saint-Joseph d'Izegem et professeur de dessin (Bruxelles, 1948) aux Cours Municipaux d'Izegem. En 1960, il cofonda le cercle d'histoire locale 'TEN MANDERE' et fut rédacteur de la revue éponyme pendant 26 ans. Depuis 1988, il fait partie du comité de rédaction et est devenu vice-président de cette association.",
      vandrommePublicaties: "Outre des dizaines d'articles dans 'TEN MANDERE', les ouvrages suivants ont été publiés :",
      vandrommeList: [
        "IZEGEM VROEGER EN NU (1974), avec la collaboration des administrateurs de T.M. Imprimerie-Édition : Hochepied, Izegem.",
        "E.H. LEOPOLD SLOSSE EN HET IZEGEMSE SLOSSEFONDS (1983) avec une table des matières du Fonds Slosse en 25 volumes d'Izegem, avec les administrateurs de T.M. Édition : T.M.",
        "KAPELLEN TE IZEGEM, un numéro sur les chapelles dans la série T.M. n° 72 (1985).",
        "Collaborateur à GESCHIEDENIS VAN IZEGEM (1985), Éditeur : T.M. Izegem.",
      ],
      vandrommeSlot: "A. Vandromme a contribué à diverses expositions historiques et artistiques à Izegem et à l'aménagement du Musée National de la Chaussure (1967) et du Musée National de la Brosse (1988).",
      vandrommeCaption: "Antoon Vandromme — dessinateur du portrait de Cyriel Verschaeve",
      stamboomTitle: "Lien familial Deforce – Verschaeve",
      overzichtTitle: "Cyriel Verschaeve (1874–1949) : bref aperçu",
      inleidingTitle: "I. Introduction",
      inleiding: "Cyriel Verschaeve était un prêtre-poète, essayiste et penseur idéologique au sein du mouvement flamand. Son nom reste controversé jusqu'à aujourd'hui en raison de son influence culturelle d'une part et de sa collaboration avec l'Allemagne nazie pendant la Seconde Guerre mondiale d'autre part.",
      jeugdTitle: "II. Vie et carrière",
      jeugd1Title: "1. Jeunesse et formation (1874–1898)",
      jeugd1: "Né à Ardooie en 1874, Verschaeve suivit des études secondaires à Roulers et une formation sacerdotale à Bruges. En 1897, il fut ordonné prêtre.",
      jeugd2Title: "2. Enseignant, animateur culturel et poète (1898–1914)",
      jeugd2: "Verschaeve travailla comme vicaire à Alveringem, où il devint une figure de proue culturelle du nationalisme catholique flamand. Il écrivit de la poésie mystico-religieuse et symboliste, influencée par la philosophie et le romantisme allemands.",
      jeugd3Title: "3. La Première Guerre mondiale et l'activisme (1914–1918)",
      jeugd3: "Pendant la Première Guerre mondiale, il se rangea idéologiquement du côté de l'activisme. Son poème « À l'Yser » devint un symbole de la lutte et du deuil flamands. Bien que politiquement inactif, il fut considéré après la guerre comme un sympathisant activiste.",
      jeugd4Title: "4. L'entre-deux-guerres (1919–1940)",
      jeugd4: "Verschaeve devint un mentor moral et idéologique du nationalisme flamand en voie de radicalisation. Ses essais et conférences mettaient l'accent sur les idéaux religieux-nationalistes, l'importance du sacrifice et de l'héroïsme et l'élévation culturelle de la Flandre.",
      jeugd5Title: "5. La Seconde Guerre mondiale et la collaboration (1940–1944)",
      jeugd5: "Pendant la Seconde Guerre mondiale, Verschaeve collabora ouvertement avec l'Allemagne nazie. Il soutint les volontaires flamands de la SS et vit dans l'Allemagne une chance pour un État flamand. Il fut sévèrement condamné après la guerre.",
      jeugd6Title: "6. Exil et mort (1944–1949)",
      jeugd6: "Ayant fui en Autriche, il fut condamné à mort par contumace en Belgique. Il mourut en 1949 à Solbad Hall. Ses restes furent transférés en Flandre en 1973 par des membres d'extrême droite.",
      literatuurTitle: "III. Littérature, philosophie et esthétique",
      literatuur: "Son œuvre comprend poésie, essais et théâtre, caractérisés par un symbolisme mystico-religieux, un style rhétorique et une insistance sur l'héroïsme et l'élévation nationale. Bien que stylistiquement fort, son œuvre reste idéologiquement chargée.",
      receptieTitle: "IV. Réception et controverse",
      receptie: "Verschaeve est reconnu comme un écrivain influent au sein du mouvement flamand, mais sa collaboration jette une ombre durable sur sa réputation. Les historiens le jugent comme un auteur talentueux qui a déraillé politiquement.",
    },
    sv: {
      partTitle: "Del III — VARIA",
      partSubtitle: "Kuriositeter & anekdoter från alla hörn av släktträdet",
      sectionTitle: "Om Cyriel Verschaeve",
      sectionSubtitle: "(1874–1949)",
      intro: "Det går inte att undvika — denna berättelse om den en gång berömde, beundrade, men senare ökände, avskydde och till och med dömde prästdiktaren måste berättas här.",
      kaderTitle: "En ram, två epoker",
      kaderText1: "Ekramen har en komplex historia. Dess neutralitet försvann 1947, när porträttet av Cyriel Verschaeve placerades i den. Den stora ramen — det berömda trä-prydnadsstycket som hängde i vardagsrummet — hör till mina tidigaste minnen. Som barn stod jag framför den, förminskad av dess storlek. Porträttet utstrålade ett allvar som jag inte kunde tolka, men som tystade mig. Det var uppenbarligen någon som måste vara viktig. Samtidigt var jag under hela min ungdom enormt imponerad av min farfars konstnärliga hantverksskicklighet.",
      kaderAnecdote: "Tant Monique anförtrodde mig en gång att historien var att det ursprungligen var Marcels avsikt att placera sin hustru Madeleines porträtt i ramen och hänga den hemma. Hon ska bestämt ha vägrat för att hon tyckte att det skulle vara alldeles för pretentiöst.",
      familieband: "Cyriel Verschaeves mor var en Deforce! Hans farfars far var en bror till Marcel Deforces farfars far. Han var alltså (avlägsen) familj. Det är alltså inte onormalt att familjen länge hade berömdit sig av att ha en berömdhet i familjen; de var stolta över det långt innan han fick sitt onda rykte.",
      portretkaderCaption: "Porträttramen gjord av Marcel Deforce, med porträttet av Cyriel Verschaeve",
      portretkaderDetailCaption: "Ramen med porträttet av Marcel Deforce (Peter) — för att hedra skaparen",
      portretkaderGrootmoederCaption: "Ramen med porträttet av Magdalena Geldof (Grote Meter) — som författaren föredrar att se den",
      symboliekTitle: "Symbolik och arv",
      symboliekText1: "Att placera detta porträtt i en monumental, nästan sakral ram var inte ett rent estetiskt val, utan blev en handling med tydliga symboliska implikationer.",
      symboliekText2: "Det finns ett spänningsfält mellan ram och porträtt: Ramen är äldre än sitt innehåll och designades inte för Verschaeve. Ändå ger den honom, väl placerad, en symbolisk tyngd som han inte naturligt besitter. Den hantverksmässiga estetiken från cirka 1915 används således för att rama in och legitimera en figur från en senare, moraliskt laddad kontext. Objektet blir därmed inte en neutral bärare av minne, utan ett aktivt instrument i konstruktionen av mening.",
      symboliekText3: "Idag kan denna helhet inte ses skild från sin skiktade historia. Det är ett sammansatt objekt där olika tider, intentioner och värdesystem möts — och kolliderar, även inom familjen. Å ena sidan finns ramen som en produkt av enastående hantverk, skapad i en period då hantverk och tradition var centrala. Å andra sidan finns porträttet, tillagt i en efterkrigskontext där minne, skuld och ideologiska arv fortfarande hett debatterades.",
      symboliekText4: "Det är just denna spänning som gör objektet relevant. Det visar hur arv inte är statiskt, utan ständigt förändrar betydelse beroende på användning och kontext. Denna ram berättar därför inte bara något om en hantverkare eller om Cyriel Verschaeve, utan också om minnets och förhärligandets mekanismer — och om nödvändigheten att fortsätta närma sig sådana objekt kritiskt idag.",
      persoonlijkeNoot: "Jag bevarar ramen i sitt ursprungliga skick, som ett värdefullt och antikt föremål, som familjearv. Porträttet av Cyriel Verschaeve har jag tagit ut och förvarar det separat. Själv ser jag det helst så: antingen min farmors bild i den, för att visualisera den ursprungliga avsikten, eller porträttet av min farfar Marcel för att hedra skaparen.",
      vandrommeTitle: "Antoon Vandromme...",
      vandrommeText1: "Mannen som tecknade porträttet av Cyriel Verschaeve är, åtminstone i kulturella kretsar, en mycket känd Izegembo. Hur, varför och när detta kom till stånd förblir en öppen fråga. (På baksidan har någon (Gabriël Deforce?) en gång antecknat med grön penna: 1947). Kanske var det ett uppdrag, kanske en gest av beundran. I vilket fall som helst gjorde han en noggrann återgivning av ett foto som fortfarande är lätt att hitta idag. Teckningen gjordes med mjuka pastellkrita (soft pastels) på tonat papper.",
      vandrommeText2: "ANTOON VANDROMME, född 1922, var till yrket lärare (Torhout, 1942) vid Sint-Jozefcollege i Izegem och teckningslärare (Bryssel, 1948) vid Stedelijke Leergangen i Izegem. 1960 var han medgrundare av hembygdsföreningen 'TEN MANDERE' och redaktör för den liknamnda tidskriften i 26 år. Sedan 1988 tillhör han fortfarande redaktionsrådet och blev vice ordförande för föreningen.",
      vandrommePublicaties: "Utöver dussintals artiklar i 'TEN MANDERE' publicerades följande verk av honom:",
      vandrommeList: [
        "IZEGEM VROEGER EN NU (1974), med medverkan av T.M:s styrelseledamöter. Tryckeri-Förlag: Hochepied, Izegem.",
        "E.H. LEOPOLD SLOSSE EN HET IZEGEMSE SLOSSEFONDS (1983) tillsammans med en innehållsförteckning till det 25-deliga Izegem Slossefonden, med T.M:s styrelseledamöter. Utgåva: T.M.",
        "KAPELLEN TE IZEGEM, ett kapellnummer i T.M.-serien nr. 72 (1985).",
        "Medarbetare i GESCHIEDENIS VAN IZEGEM (1985), Utgivare: T.M. Izegem.",
      ],
      vandrommeSlot: "A. Vandromme bidrog till diverse historiska och konstnärliga utställningar i Izegem och till inrättandet av Nationella Skomuseet (1967) och Nationella Borstmuseet (1988).",
      vandrommeCaption: "Antoon Vandromme — tecknaren av porträttet av Cyriel Verschaeve",
      stamboomTitle: "Familjeband Deforce – Verschaeve",
      overzichtTitle: "Cyriel Verschaeve (1874–1949): kort översikt",
      inleidingTitle: "I. Inledning",
      inleiding: "Cyriel Verschaeve var en prästdiktare, essäist och ideologisk tänkare inom den flamländska rörelsen. Hans namn förblir kontroversiellt än idag på grund av hans kulturella inflytande å ena sidan och hans samarbete med Nazityskland under andra världskriget å den andra.",
      jeugdTitle: "II. Liv och karriär",
      jeugd1Title: "1. Ungdom och utbildning (1874–1898)",
      jeugd1: "Född i Ardooie 1874, följde Verschaeve gymnasiestudier i Roeselare och prästutbildning i Brygge. 1897 prästvigdes han.",
      jeugd2Title: "2. Lärare, kulturarbetare och poet (1898–1914)",
      jeugd2: "Verschaeve arbetade som komminister i Alveringem, där han växte till en kulturell galjonsfigur för flamländsk katolsk nationalism. Han skrev mystisk-religiös och symbolistisk poesi, påverkad av tysk filosofi och romantik.",
      jeugd3Title: "3. Första världskriget och aktivismen (1914–1918)",
      jeugd3: "Under första världskriget stod han ideologiskt på aktivismens sida. Hans dikt 'Vid Yser' växte till en symbol för flamländsk kamp och sorg. Även om han inte var politiskt aktiv, ansågs han efter kriget ha aktivistiska sympatier.",
      jeugd4Title: "4. Mellan krigen (1919–1940)",
      jeugd4: "Verschaeve blev en moralisk och ideologisk mentor för den radikaliserande flamländska nationalismen. Hans essäer och föreläsningar betonade religiöst-nationalistiska ideal, vikten av uppoffring och hjältemod samt den kulturella upphöjelsen av Flandern.",
      jeugd5Title: "5. Andra världskriget och kollaborationen (1940–1944)",
      jeugd5: "Under andra världskriget kollaborerade Verschaeve öppet med Nazityskland. Han stödde flamländska SS-frivilliga och såg i Tyskland en möjlighet för en flamländsk stat. Som följd dömdes han hårt efter kriget.",
      jeugd6Title: "6. Exil och död (1944–1949)",
      jeugd6: "Efter att ha flytt till Österrike dömdes han i sin frånvaro till döden i Belgien. Han avled 1949 i Solbad Hall. Hans kvarlevor överfördes 1973 till Flandern av högerextrema medlemmar.",
      literatuurTitle: "III. Litteratur, filosofi och estetik",
      literatuur: "Hans verk omfattar poesi, essäer och dramatik, kännetecknade av mystisk-religiös symbolik, retorisk stil och betoning av hjältemod och nationell upphöjelse. Även om det är stilistiskt starkt, förblir hans verk ideologiskt laddat.",
      receptieTitle: "IV. Mottagande och kontrovers",
      receptie: "Verschaeve erkänns som en inflytelserik författare inom den flamländska rörelsen, men hans kollaboration kastar en bestående skugga över hans rykte. Historiker bedömer honom som en begåvad författare som spårade ur politiskt.",
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  // Family tree data for the connection
  const familyTree = [
    { left: "Georgius Delforce 1731–1807", right: "", connector: "& 1761 Maria Genoveva Van Damme 1741–1810" },
    { left: "Bernardus Delforche 1769–1845", right: "Petrus Augustinus Delforge 1773–1840", leftSub: "& 1792 Clara Agnes Reynier 1771–1801", rightSub: "& 1795 Caecilia Callens 1773–1853" },
    { left: "Joris Delforche 1793–1859", right: "Jean François Deforche 1815–1871", leftSub: "& 1822 Anne Theresia Vannieuwenhuyse 1797–1869", rightSub: "& 1840 Francisca Vandewalle 1813–1897" },
    { left: "Melanie Deforche 1837–1906", right: "Charles Louis Deforce 1857–1938", leftSub: "& 1863 Francis Verschaeve 1830–1909", rightSub: "& 1884 Marie Leonie Vandenbroucke 1862–1897" },
    { left: "Cyriel Verschaeve 1874–1949", right: "Marcel August Deforce 1894–1963" },
  ];

  return (
    <section id="verschaeve" className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Part III Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-primary/60 font-medium mb-2">{t.partTitle}</p>
          <p className="text-md text-muted-foreground italic mb-8">{t.partSubtitle}</p>
          <span className="text-6xl font-serif text-primary/30 block mb-2">11</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-2">{t.sectionTitle}</h2>
          <p className="text-xl text-primary/80 font-medium">{t.sectionSubtitle}</p>
          <div className="flex justify-center mt-4">
            <ShareButton title={t.sectionTitle} sectionId="verschaeve" />
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <p className="text-lg text-foreground/80 italic">{t.intro}</p>

          <div className="prose prose-lg text-foreground/80">
            <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t.kaderTitle}
            </h3>
            <p>{t.kaderText1}</p>
            <p className="italic text-muted-foreground">({t.kaderAnecdote})</p>
            <p>{t.familieband}</p>
          </div>

          {/* Portretkader foto */}
          <figure className="my-8 cursor-pointer" onClick={() => setFullscreenImage(portretkaderVerschaeve)}>
            <img
              src={portretkaderVerschaeve}
              alt={t.portretkaderCaption}
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
              {t.portretkaderCaption}
            </figcaption>
          </figure>

          {/* Symboliek sectie */}
          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <h3 className="font-serif text-2xl text-primary">{t.symboliekTitle}</h3>
              <p>{t.symboliekText1}</p>
              <p>{t.symboliekText2}</p>
              <p>{t.symboliekText3}</p>
              <p>{t.symboliekText4}</p>

              {/* Persoonlijke noot */}
              <blockquote className="border-l-4 border-primary/40 pl-4 italic bg-secondary/30 py-3 rounded-r-lg">
                {t.persoonlijkeNoot}
              </blockquote>

              {/* Twee kaderfoto's naast elkaar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(portretkaderDetail)}>
                  <img
                    src={portretkaderDetail}
                    alt={t.portretkaderDetailCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-accent/40"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.portretkaderDetailCaption}
                    <span className="block text-xs mt-1 text-accent">Placeholder</span>
                  </figcaption>
                </figure>
                <figure className="cursor-pointer" onClick={() => setFullscreenImage(portretkaderGrootmoeder)}>
                  <img
                    src={portretkaderGrootmoeder}
                    alt={t.portretkaderGrootmoederCaption}
                    className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-dashed border-accent/40"
                    loading="lazy"
                  />
                  <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                    {t.portretkaderGrootmoederCaption}
                    <span className="block text-xs mt-1 text-accent">Placeholder</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </ReadMore>
        </motion.div>

        {/* Stamboom / Family Tree Connection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <h3 className="font-serif text-xl text-primary flex items-center gap-2 mb-6">
            <Users className="w-5 h-5" />
            {t.stamboomTitle}
          </h3>
          <div className="bg-card/50 rounded-lg p-4 md:p-6 border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {familyTree.map((row, i) => (
                  <tr key={i} className={i < familyTree.length - 1 ? "border-b border-border/50" : ""}>
                    <td className="py-3 pr-4 text-left align-top">
                      <span className="font-medium text-foreground">{row.left}</span>
                      {row.leftSub && <span className="block text-xs text-muted-foreground">{row.leftSub}</span>}
                    </td>
                    <td className="py-3 px-2 text-center align-top text-muted-foreground">
                      {row.right && "│"}
                    </td>
                    <td className="py-3 pl-4 text-right align-top">
                      {row.right && (
                        <>
                          <span className="font-medium text-foreground">{row.right}</span>
                          {row.rightSub && <span className="block text-xs text-muted-foreground">{row.rightSub}</span>}
                        </>
                      )}
                      {row.connector && <span className="block text-xs text-muted-foreground">{row.connector}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Overzicht */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <h3 className="font-serif text-2xl text-primary mb-6">{t.overzichtTitle}</h3>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <h4 className="font-serif text-lg text-primary">{t.inleidingTitle}</h4>
              <p>{t.inleiding}</p>

              <h4 className="font-serif text-lg text-primary !mt-6">{t.jeugdTitle}</h4>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd1Title}</h5>
              <p>{t.jeugd1}</p>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd2Title}</h5>
              <p>{t.jeugd2}</p>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd3Title}</h5>
              <p>{t.jeugd3}</p>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd4Title}</h5>
              <p>{t.jeugd4}</p>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd5Title}</h5>
              <p>{t.jeugd5}</p>

              <h5 className="font-medium text-foreground !mt-4">{t.jeugd6Title}</h5>
              <p>{t.jeugd6}</p>

              <h4 className="font-serif text-lg text-primary !mt-6">{t.literatuurTitle}</h4>
              <p>{t.literatuur}</p>

              <h4 className="font-serif text-lg text-primary !mt-6">{t.receptieTitle}</h4>
              <p>{t.receptie}</p>
            </div>
          </ReadMore>
        </motion.div>

        {/* Antoon Vandromme sectie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <h3 className="font-serif text-2xl text-primary mb-6">{t.vandrommeTitle}</h3>

          <div className="md:flex md:gap-6 mb-6">
            <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0 cursor-pointer overflow-hidden rounded-lg" onClick={() => setFullscreenImage(antoonVandrommeColor)}>
              <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow" style={{ margin: '-2px' }}>
                <img
                  src={antoonVandrommeColor}
                  alt={t.vandrommeCaption}
                  className="w-full object-cover scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-sm text-muted-foreground italic mt-2 text-center">
                {t.vandrommeCaption}
                <span className="relative inline-block"><AiLabel className="relative" /></span>
              </figcaption>
            </figure>
            <div className="prose prose-lg text-foreground/80">
              <p>{t.vandrommeText1}</p>
            </div>
          </div>

          <ReadMore label={readMoreLabel} collapsedLabel={readLessLabel}>
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <p>{t.vandrommeText2}</p>
              <p>{t.vandrommePublicaties}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.vandrommeList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>{t.vandrommeSlot}</p>
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

export default Verschaeve;
