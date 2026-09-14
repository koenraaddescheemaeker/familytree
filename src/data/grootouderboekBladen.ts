import p1 from "@/assets/grootouderboek-p1.jpg";
import p2 from "@/assets/grootouderboek-p2.jpg";
import p3 from "@/assets/grootouderboek-p3.jpg";
import p5 from "@/assets/grootouderboek-p5.jpg";
import p6 from "@/assets/grootouderboek-p6.jpg";
import p7 from "@/assets/grootouderboek-p7.jpg";
import p8 from "@/assets/grootouderboek-p8.jpg";
import p14 from "@/assets/grootouderboek-p14.jpg";
import p15 from "@/assets/grootouderboek-p15.jpg";
import p16 from "@/assets/grootouderboek-p16.jpg";
import p17 from "@/assets/grootouderboek-p17.jpg";
import p18 from "@/assets/grootouderboek-p18.jpg";
import p19 from "@/assets/grootouderboek-p19.jpg";
import p20 from "@/assets/grootouderboek-p20.jpg";
import p21 from "@/assets/grootouderboek-p21.jpg";
import p22 from "@/assets/grootouderboek-p22.jpg";
import p23 from "@/assets/grootouderboek-p23.jpg";
import p24 from "@/assets/grootouderboek-p24.jpg";
import p26 from "@/assets/grootouderboek-p26.jpg";
import p27 from "@/assets/grootouderboek-p27.jpg";
import p28 from "@/assets/grootouderboek-p28.jpg";
import p29 from "@/assets/grootouderboek-p29.jpg";
import p30 from "@/assets/grootouderboek-p30.jpg";
import p31 from "@/assets/grootouderboek-p31.jpg";
import p32 from "@/assets/grootouderboek-p32.jpg";

export type Blad = {
  nr: string;
  titel: string;
  src: string;
  alt: string;
  transcriptie: { vraag: string; antwoord: string }[];
};

export const bladen: Blad[] = [
  {
    nr: "1",
    titel: "Titelblad",
    src: p1,
    alt: "Titelblad van Het Grootouderboek van Simonne Vandeputte",
    transcriptie: [
      {
        vraag: "Het Grootouderboek — een boek met herinneringen van grootouders om te geven aan hun kleinkinderen",
        antwoord:
          "Dit is een boek dat omstreeks 1992 in het kader van een schoolopdracht door Barbara Declercq ten geschenke werd gegeven aan haar grootmoeder, Simonne Vandeputte. Door het invullen van de vele vragen komt hier een ware levensbeschrijving tot stand. (Niet alle bladen waren ingevuld, vandaar de disparate nummering.) Dit boek werd ingescand enkele dagen na haar begrafenis, op de dag dat zij 88 zou geworden zijn. Het origineel wordt verder door Barbara bewaard. Het is het belangrijkste item van haar erfenis, en wordt hierbij ter beschikking gesteld van al haar nakomelingen. — Marc Deforce, 18 september 2012",
      },
    ],
  },
  {
    nr: "2",
    titel: "Inleiding van de uitgever",
    src: p2,
    alt: "Inleidende tekst van het Grootouderboek",
    transcriptie: [
      {
        vraag: "Inleiding",
        antwoord:
          "Dit is een boek voor, van en over grootouders. Grootouders kunnen aan de hand van voorgedrukte vragen een beeld geven van hún jeugd, hún ouders, hún leven. Op die manier wordt dit boek een blijvende herinnering om te geven aan hun kleinkinderen. Kleinkinderen hebben er behoefte aan meer te weten over hun afkomst, hun wortels. Ook droevige of pijnlijke herinneringen kunnen van veel waarde zijn voor de komende generaties.",
      },
    ],
  },
  {
    nr: "3",
    titel: "Uw afkomst",
    src: p3,
    alt: "Handgeschreven blad 'Uw afkomst' uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Waar, wanneer en onder welke omstandigheden bent u geboren?",
        antwoord:
          "Op 18 september 1929 werd ik geboren in Izegem, in een huis nr. 325 in de Roeselaarsestraat, als tweede meisje in ons gezin waar ze eigenlijk een jongen verwachtten.",
      },
      {
        vraag: "Welke namen kreeg u? Was u naar iemand vernoemd?",
        antwoord:
          "Op het stadhuis werd ik aangegeven als Adèle, op dwingend verzoek van mijn Meter, maar mijn Moeder doopte mij tot Simonne.",
      },
      {
        vraag: "Hoe heetten uw ouders, uit welke streek waren ze afkomstig en wat was hun beroep?",
        antwoord:
          "Vader was geboren te Izegem uit een groot gezin: Norbert Vandeputte, zoon van Emiel Vandeputte en Adèle Dedaele. Na het teloorgaan van de borstelfabriek werd hij winkelier-haarkapper. Moeder, geboren te Emelgem, was schoenstikster en werd prima winkelierster. Van Vader overleden in 1959 op 24 januari was er geen enkele foto, enkel de eerste nog maar toegelaten foto in ons paspoort — dus ik heb het alleen van hem als 19-jarige in een muziekmaatschappij.",
      },
      {
        vraag: "Had u broers en zusters?",
        antwoord:
          "Een meisje werd 2½ jaar vóór mij geboren en genaamd Elisabeth, wat tot Elza verkort werd. Dan waren er nog tweemaal doodgeboren jongetjes na mij. Dit had wel een grote nawerking op ons gezin: wij hadden allemaal zo graag een jongentje gehad.",
      },
    ],
  },
  {
    nr: "5",
    titel: "Thuis, ouders en godsdienst",
    src: p5,
    alt: "Handgeschreven blad over het gezinsleven uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Was het gezellig thuis? Werden er spelletjes gedaan, voorgelezen, muziek gemaakt?",
        antwoord:
          "Vader was muzikant, speelde klarinet en saxofoon, was ook in een zangkoor en in de eerste toneelgroep die in Izegem opgericht werd, en waarin zijn vader telkens de hoofdrollen speelde. Moeder kon heel goed zingen, en zo werd er bij ons veel gezongen en iets opgevoerd. Maar de enige concerten die wij konden bijwonen waren de zondagnamiddag op een kiosk op de Grote Markt in de zomer.",
      },
      {
        vraag: "Waren uw ouders streng?",
        antwoord:
          "Ze waren vooral bereid met ons te spelen; het was dus een losse, hartelijke atmosfeer, maar heel streng op zedelijk gebied.",
      },
      {
        vraag: "Ging u met het gezin wel eens een dagje uit? Hoe? Waarheen?",
        antwoord:
          "Daar waren geen mogelijkheden toe: geen vrije tijd (de winkel was ook op zondag open), geen vervoer. Maar iedere zondag na 5 uur verplicht bezoek aan de ouders van mijn vader, die 85 jaar waren, en daar kwam de familie bijeen. Grote invloed op mijn kinderleven had een zuster van mijn moeder, gehuwd met Jean Bourgeois, burgemeester van Emelgem: zij behoorden bij de gegoeden die een auto hadden, en zij namen mijn zuster en mij mee de zondag naar zee — wij waren dus bevoorrecht.",
      },
      {
        vraag: "Welke rol speelde godsdienst in het gezinsleven?",
        antwoord:
          "Mijn Vader was een voorvechter van het socialisme, omwille van sociale bewogenheid en de gelijkheid van de arbeidersklasse (Anseele, Van Acker, priester Daens). Ons Moeder was zeer vroom en katholiek; bijgevolg hadden wij de twee uitersten in ons gezin. Mijn zuster is dus atheïst geworden en ik een zeer katholiek kind.",
      },
    ],
  },
  {
    nr: "6",
    titel: "Welstand, grootouders en hoogtepunten",
    src: p6,
    alt: "Handgeschreven blad over welstand en grootouders uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Waren uw ouders arm of rijk? Heeft dit voor u een rol gespeeld?",
        antwoord:
          "Mijn ouders waren hardwerkende middenstanders; wij hadden dus een zekere welstand door hun ijver. Doch toen ik bijna 16 was brak de oorlog uit, 10 mei 1940, en toen lag ons leven ondersteboven. Voor mij was het een diep aangrijpende ervaring, met gevolgen zodat ik niet studeren kon (financieel niet mogelijk). Het waren zeer triestige jaren 1940-45, echte hongerwinters. Wij zijn er met zeer veel moeite en hard werken weer bovenop geraakt, maar toen waren mijn meisjesjaren voorbij.",
      },
      {
        vraag: "Hebt u uw grootouders gekend?",
        antwoord:
          "Ik heb ze heel goed gekend, maar ze waren heel streng, veel meer dan ons ouders, dus niet aantrekkelijk voor ons. Grootvader langs vaderszijde was borstelfabrikant geweest, heeft zich kapot gewerkt en niet tegen de industrialisatie kunnen optornen. De teloorgang van de borstelindustrie in Izegem 1930-1950 was volledig; wat later volgde de schoenindustrie op dezelfde manier. Wij gingen er dus iedere zondagnamiddag, maar nooit langer.",
      },
      {
        vraag: "Had u ook 'speciale' ooms en tantes?",
        antwoord:
          "De speciale oom was voor mij Nonkel Jean, die mij meenam naar zee; hij was een joviale figuur en met invloed. Nonkel had ook een grote hof met vijver en eendjes en overal vogels; uren heb ik met hem daar doorgebracht en veel liefde voor de natuur opgedaan.",
      },
      {
        vraag: "Herinnert u zich hoogtepunten uit het gezinsleven?",
        antwoord:
          "Niettegenstaande de drukte en lange uren werken maakten mijn ouders tijd om bepaalde dagen gezellig te maken: verjaardagen, kerstavond en Nieuwjaar. Er werd gebakken, een glaasje wijn gedronken, verteld, gezongen, piano gespeeld. Doch alles viel weg toen ik 16 jaar was, omwille van de oorlog.",
      },
    ],
  },
  {
    nr: "7",
    titel: "Dieptepunten en vakanties",
    src: p7,
    alt: "Handgeschreven blad over dieptepunten en vakanties uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Dieptepunten?",
        antwoord:
          "Nogmaals de oorlog. Daarvoor was alles zo rustig, kalm, vredig, maar ons leven werd ondersteboven gekeerd die 10 mei 1940. Alles afgeschermd, er mocht geen licht buiten te zien zijn, iedere avond massa's bommenwerpers boven ons hoofd, de dreiging, het gevaar. Het was heel erg.",
      },
      {
        vraag: "Vakanties met het hele gezin?",
        antwoord:
          "Nooit gezien: Vader en Moeder hadden geen vakantie, nooit. Maar de eerste zondag van september was het kermis, en dan met het gezin naar de kermis, na het smakelijk bereide konijntje en het eten van een goeie taart (één keer per jaar dus).",
      },
      {
        vraag: "Bij de lege fotokader",
        antwoord:
          "Geen enkele foto van Vader en Moeder, maar de beelden zie ik nog altijd voor mij: op kermiszondag was de winkel open tot 's middags, iedereen bij ons had een witte voorschoot aan en kwam om beurten of samen in het deurgat staan; de meeste voorbijgangers bleven een ogenblik staan praten, iedereen in kermisstemming, en zon erop. Zo zie ik het nog altijd voor mij: een tevreden en gelukkig gezin op de beste dag van 't jaar.",
      },
    ],
  },
  {
    nr: "8",
    titel: "Uw kindertijd (2-12 jaar)",
    src: p8,
    alt: "Handgeschreven blad 'Uw kindertijd' uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Waar woonde u in uw kinderjaren? Bestaat het huis nog?",
        antwoord:
          "In 't zelfde huis waar ik geboren ben, gebleven dus tot ik huwde op 21 jaar. Het huis staat er nog altijd; het is niet breed, maar wel diep (vier plaatsen naast elkaar). De tuin was diep doch is nu ingekort. De omgeving is dezelfde gebleven, maar de straten zijn banen geworden met zeer veel verkeer. Nu kunnen de kinderen er niet meer spelen, maar wij speelden met de bal tegen de muur, wij hinkelden op straat; het waren aardewegen. Ik had zeer vrolijke kinderjaren met de meisjes in de straat.",
      },
      {
        vraag: "Waren er in die tijd nog dienstmeisjes of ander huishoudelijk personeel?",
        antwoord:
          "Wij hadden altijd een vaste hulp voor Vader in 't coiffeursalon; zo hadden wij jarenlang een Gerard, een zeer mooie jongen waarvan ik het lievelingetje was (hij was 16 en ik 5), dan Pierre Vanneste ook 6 jaar lang. En Moeder had altijd een winkelmeisje uit het gehuchte om te helpen tegen vereenzaming.",
      },
      {
        vraag: "Had u een huisdier?",
        antwoord:
          "Wij hadden altijd katjes; mijn zus en ik konden niet zonder. Als wij een nest jonge katjes hadden, brachten wij kinderen mee van onze school en dan werd er gekozen. Onze voornaamste huisgenoten waren de katten en de keuken, want onze ouders waren altijd bezig. Vriendinnetjes mochten niet aan huis komen, maar zolang het niet donker was mochten wij op straat en de ganse buurt was ons domein. Voor ons huis was een aardewegje dat leidde naar het kasteel van Bogaerts (nu Wallemote), en daar trokken wij iedere dag naartoe met een groep van 10 à 15 kinderen; de oude weiden en bomen waren ons domein, wij klommen op de knotwilgen. Wij plukten bloemen in de weiden en brachten die prompt naar de Paterskerk (capucienen).",
      },
    ],
  },
  {
    nr: "14",
    titel: "De tienerjaren (10-20 jaar)",
    src: p14,
    alt: "Handgeschreven blad 'De tienerjaren' uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Welke taken had u thuis?",
        antwoord:
          "Van 15 jaar: de post en de bank waren voor mij, en de soepbedeling, wat ik als een grote vernedering aanzag, na het pensionaat.",
      },
      { vraag: "Kreeg u zakgeld?", antwoord: "Geen frank." },
      { vraag: "Van welke vervoermiddelen werd er bij u thuis gebruik gemaakt?", antwoord: "De fiets." },
      { vraag: "Heeft u voortgezet onderwijs gevolgd en hoe lang?", antwoord: "Lager onderwijs, gestopt door de oorlog." },
      {
        vraag: "Welke vakken vond u het leukst?",
        antwoord: "Alles van taal en alle vakken eigenlijk; een hekel aan alles wat met wiskunde te maken had.",
      },
      { vraag: "Hebt u op school of thuis seksuele voorlichting gehad?", antwoord: "Geen enkele." },
    ],
  },
  {
    nr: "15",
    titel: "Sport en muziek",
    src: p15,
    alt: "Handgeschreven blad over sport en muziek uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Deed u aan sport?",
        antwoord:
          "In 1939 werd in Izegem het eerste zwembad geopend en ik was bij de vijf anderen in de klas die mocht gaan zwemmen in de zomer; ik was toen 10 jaar en ging altijd na school. En in school hadden wij turnen.",
      },
      {
        vraag: "Speelde u een muziekinstrument? Waarom juist dat instrument?",
        antwoord:
          "Mijn zuster en ik mochten piano leren in school (de grote mode in de burgerij) en ons Vader haalde prompt een piano in huis (tweedehands). Wij hebben ons altijd mee geamuseerd, maar het is nooit ernstig doorgekomen.",
      },
    ],
  },
  {
    nr: "16",
    titel: "Toneel, clubs, liedjes en kleding",
    src: p16,
    alt: "Handgeschreven blad over toneel, clubs en muziek uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Deed u wel eens mee in toneelstukjes of muziekuitvoeringen?",
        antwoord:
          "In school zeker! Ik wist dat ik aanleg had voor toneel, maar was veel te bedeesd, dus liet ik gewoonlijk de grotere rollen afsnoepen van andere leerlingen.",
      },
      {
        vraag: "Was er dan veel publiek?",
        antwoord: "Zeker, al de ouders van de leerlingen. Mijn ouders niet: de winkel was nooit gesloten.",
      },
      {
        vraag: "Was u lid van een club?",
        antwoord:
          "Door de jongen die ik ontmoet heb toen ik 16 jaar was, mocht ik aan mijn 17 jaar mee naar de I.R.Z.C., de Izegemse Roei- en Zeilclub. Mijn vriend maakte een kano zelf; van zeilen heb ik niets gezien, er was geen geld.",
      },
      {
        vraag: "Welke liedjes waren populair?",
        antwoord:
          "Vóór '40 alle Franse liedjes: 'La mer' van Ch. Trenet, 'Ma pomme' van M. Chevalier, 'Le paysan', alle liedjes van Tino Rossi, Edith Piaf, 'Je ne regrette rien', Rina Ketty.",
      },
      {
        vraag: "Zat u op dansles? Welke dans was erg in?",
        antwoord:
          "Geen dans, vanaf '40 was alles verboden. De liedjes in de radio waren alles wat we hadden, dus zongen wij de hele dag door. De B.R.T. was verplicht alle Duitse muziek te spelen, en wij zongen alle Duitse liedjes vlot mee: Rudy Schuricke (charmezanger), Marlène Dietrich, Zarah Leander enz.",
      },
      {
        vraag: "Hoe was u gekleed?",
        antwoord: "Op school niets anders dan uniform: een blauw plooirokje met witte bloes. In de vakantie eenvoudige katoenen jurkjes.",
      },
    ],
  },
  {
    nr: "17",
    titel: "Invloeden, ouders en de eerste liefde",
    src: p17,
    alt: "Handgeschreven blad over invloeden en de eerste liefde uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Waren er mensen of zaken die van invloed waren op uw denken en handelen indertijd? Waarom?",
        antwoord:
          "Alles overkwam mij, wij hadden geen inspraak, wij ondergingen alles. Na onze Franse opvoeding gingen wij op 10 mei 1940 over van het Frans naar het Nederlands.",
      },
      {
        vraag: "Kon u als tiener opschieten met uw ouders?",
        antwoord: "Zeer goed, ik zocht bescherming bij mijn ouders — het was nodig.",
      },
      {
        vraag: "Hoe gingen jongens en meisjes met elkaar om?",
        antwoord:
          "In 't geheel niet. Wij als meisjes mochten niet eens kijken naar een jongen, dan was onze Vader sterk geaffronteerd. Wij werden verondersteld geen jongens te kennen, vermits wij geen kennissen hadden — tot op het ogenblik dat ik de Engelse les volgde in de nijverheidsschool in Izegem, op mijn 17e. Als ik met Vader 's avonds ging wandelen en wij kwamen een jongen tegen die naar mij glimlachte, dan zei ik: 'het is iemand van de Engelse les', want dat was gemengd — en dan moest ik een hele uitleg geven over zijn familie, wie dat wel juist was. De eerste jongen die mij aansprak op straat bekende mij dat hij al een hele tijd verliefd op mij was. Hij had zulke mooie grote zwarte ogen die aantrokken en dwongen dat ik niet kon weerstaan, een zwarte krullekop. Ik was 16,5 jaar en onmiddellijk ook verliefd — en 5 jaar later ook getrouwd.",
      },
    ],
  },
  {
    nr: "18",
    titel: "Familietradities en feestdagen",
    src: p18,
    alt: "Handgeschreven blad over familietradities en feestdagen uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Werd er bij u thuis Sinterklaas, Kerstmis, Oud en Nieuw gevierd? Hoe?",
        antwoord:
          "Sinterklaas: boven de 10 jaar, ja, toen was er een koekenpeerd bij de koffie. Kerstmis: ja, mijn Moeder maakte een koetong klaar, heel lekker, en op kerstavond mochten wij een glaasje rode wijn meedrinken. Oud en nieuw: 's avonds een glaasje wijn, en nieuwjaarsdag moesten wij aan de broers en zusters van onze ouders een nieuwjaar gaan wensen — en wij kregen van iedere familie een frank. Dat telden wij dan doodgelukkig, en dan de spaarpot in.",
      },
      {
        vraag: "Hoe werden verjaardagen gevierd?",
        antwoord:
          "Niet gevierd, maar wel eens genoemd. Ook de feestdagen of liever naamdagen: wij hadden allemaal een naam die van een heilige kwam, en het naamfeest werd meer genoemd — maar dat was al.",
      },
    ],
  },
  {
    nr: "19",
    titel: "Cadeautjes en kerkelijke hoogdagen",
    src: p19,
    alt: "Handgeschreven blad over cadeautjes en kerkelijke feestdagen uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Herinnert u zich nog iets van de cadeautjes waar u erg blij mee was?",
        antwoord: "Met Nieuwjaar kregen wij een nieuwe pyjama, en natuurlijk waren wij blij.",
      },
      {
        vraag: "Werden er nog andere (kerkelijke) gedenkdagen bij u thuis gevierd?",
        antwoord:
          "Pasen was een hoogdag en werd ook gevierd met een mis. 's Middags goed eten dat Moeder klaarmaakte — gewoonlijk was dat vol-au-vent. Maar wij kregen altijd iets nieuws met Pasen: mantel of tailleur in zomerkleuren, en dat was zeer belangrijk. En ook een hoogdag om te gaan wensen bij de familie en weer van elk een frank krijgen.",
      },
      {
        vraag: "Welke andere familietradities hadden een bijzondere betekenis voor u?",
        antwoord: "Pinksteren (zelfde schema als Pasen, maar geen nieuwe kleren).",
      },
    ],
  },
  {
    nr: "20",
    titel: "Uw leven vóór uw huwelijk",
    src: p20,
    alt: "Handgeschreven blad 'Uw leven vóór uw huwelijk' uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Wanneer heeft u uw beroepsopleiding voltooid?",
        antwoord:
          "De school stopte na het 3e jaar middelbaar (15 jaar). Niets was dus afgemaakt, maar er was een grote crisis en mijn ouders konden dat niet meer betalen.",
      },
      {
        vraag: "Wanneer bent u zelfstandig gaan wonen?",
        antwoord:
          "Toen ik trouwde op mijn 21e met mijn echtgenoot. Ik kende hem toen bijna 5 jaar (hij mocht 1 keer per week thuis komen).",
      },
      {
        vraag: "Wanneer kreeg u uw eerste baan?",
        antwoord:
          "Aan mijn 15 jaar, toen mijn oom zei — omdat ik zo'n mooie uitslag had, 92%, de 2e van mijn klas — dat hij een plaatsje vrij had op het bureel (schoenfabriek), en mijn ouders het geld dringend nodig hadden.",
      },
      {
        vraag: "Was uw salaris groot genoeg om van te leven?",
        antwoord:
          "Alles ging naar mijn ouders tot de dag waarop ik trouwde. Dat was bij iedereen zo, het was de gewoonte in die tijd en nog lang daarna. Ik verdiende 2,60 fr. per uur en mijn ouders waren zeer gelukkig met de inkomsten.",
      },
      {
        vraag: "Hoe zag uw leven er toen uit? Had u vrienden en vriendinnen?",
        antwoord:
          "Vriendinnen van school niet, doordat iedereen verder naar school ging en ik gaan werken. Maar op mijn 17e, toen ik mijn verloofde leerde kennen — hij was 3½ jaar ouder dan ik — toen mocht ik mee naar de kanoclub waarvan hij secretaris was. Toen mocht ik mee naar de club en dan hadden wij vrienden. Ik mocht de zondagnamiddag mee gaan roeien, en thuis zijn als het donker werd.",
      },
    ],
  },
  {
    nr: "21",
    titel: "Carrière, Gent en de oorlog",
    src: p21,
    alt: "Handgeschreven blad over haar carrière en de oorlogsjaren uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Hoe is het verder gegaan met uw 'carrière'?",
        antwoord:
          "In het jaar 1942, toen ik weer eens wenend thuis kwam omdat ik mij zo vernederd voelde, zei mijn vader: dat kan niet meer, gij blijft thuis en gij gaat mijn kapsalon overnemen. Ik ga niet herensalon en de tweede plaats maken — gij krijgt de eerste plaats, ik ga u een salon aankopen en gij begint te werken. Maar als gij een beroep wilt leren, dan moet dat in orde zijn. En hij schreef naar professor Hillaert in Gent, en ik mocht onmiddellijk ernaartoe. Vader zocht een plaats in Gent waarbij ik daar mocht logeren; de eerste drie dagen van de week — dat waren mensen waarmee we thuis zaken deden — en ik trok de maandagochtend op tot de woensdagavond. Eenzame jaren waren dat.",
      },
      {
        vraag: "En de oproeping voor Duitsland?",
        antwoord:
          "In februari 1943 werden alle jongeren tussen 18 en 25 jaar opgeroepen om naar Duitsland te gaan werken. Op 15 februari vertrok mijn zuster met haar verloofde en de mijne met dezelfde trein. Ik stond alleen, zonder broeders of zusters, geen vriendinnen. Ik vertrok met de trein; verkaste mij van uur af, in Gent moest ik de bus want ik kende er niets van — maar ik heb wel heel Gent leren kennen. Alleen: ik heb overal om ter rapst moeten lopen want het krioelde van de Duitse soldaten. Toch zijn wij erin geslaagd om wekelijks van de Scheldestraat naar het Nederlands toneel te rennen met André en Andrea, en later nog een hoopje vrienden samen te komen en in de foyer tijdens de pauze alles te bespreken. Dat waren de jongen en het meisje waar ik verbleef.",
      },
    ],
  },
  {
    nr: "22",
    titel: "Uw huwelijk — de eerste ontmoeting",
    src: p22,
    alt: "Handgeschreven blad 'Uw huwelijk' uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Waar en hoe ontmoette u opa voor het eerst?",
        antwoord:
          "In het najaar 1946, in de Roeselaarsestraat op de fiets. Hij deed me afstappen en zei dat hij allang verliefd was op mij.",
      },
      {
        vraag: "Hoe oud was u toen u elkaar ontmoette?",
        antwoord: "16½ jaar.",
      },
      {
        vraag: "Werd u meteen verliefd op elkaar? Door welke eigenschappen van de ander?",
        antwoord:
          "Ik was direct verliefd op zijn prachtige zwarte ogen en krulletjes en zijn gestalte — maar zeker niet klaar voor de liefde. Wij hebben langzaamaan, één keer per week, elkaar leren kennen: opvattingen, principes, doeleinden, hobby's.",
      },
    ],
  },
  {
    nr: "23",
    titel: "Verkeringstijd en de huwelijksdag",
    src: p23,
    alt: "Handgeschreven blad over de verkeringstijd en het huwelijk uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Wat vond u leuk om samen te doen? Wat herinnert u zich nog goed van uw verkeringstijd?",
        antwoord:
          "Dat wij samen konden gaan roeien op de vaart in clubverband. De donderdagavond, één keer per week, mocht hij een paar uur naar mijn huis komen en wij zaten aan tafel bij mijn ouders. Hij bracht alle soorten boeken om samen te lezen, later meubelboeken waarin wij onze slaapkamer zouden kiezen van model, omdat hij ze zelf zou maken: een donkerrode slaapkamer in palissanderhout.",
      },
      {
        vraag: "Werd er aan de ouders van de bruid om de hand van hun dochter gevraagd? Hoe ging dat?",
        antwoord:
          "Hij kwam vragen aan mijn ouders om kennis te mogen hebben met mij, maar verschoof toen mijn moeder zei dat ik veel te jong was. Maar aan de hand van foto's die hij maakte, raakte hij toch een tijdje later binnen.",
      },
      {
        vraag: "Waar en wanneer werd het huwelijk voltrokken? Hoe oud was u toen?",
        antwoord:
          "Gehuwd op 6 juni 1945 op het stadhuis om 5 u. 's morgens; gehuwd op 7 juni in mijn parochiekerk H. Hart te Izegem om 10.30 u. Ik had 3 maanden te kort om 21 te zijn.",
      },
      {
        vraag: "Wat droeg u bij die gelegenheid?",
        antwoord:
          "Ik koos een wit lang kleed in satijn, dat was toen zeer chic, en wij hadden er samen voor gespaard. Het was toen de gewoonte om na het huwelijksfeest of diner van kledij te veranderen, en dus koos ik 's avonds een lichtblauw kleedje voor het avondfeest. Het diner en avondfeest had allemaal plaats in het huis van mijn man op de Vandenbogaerdelaan te Izegem — er waren toen nog geen restaurants, toch niet in Izegem.",
      },
    ],
  },
  {
    nr: "24",
    titel: "De trouwdag",
    src: p24,
    alt: "Handgeschreven blad over de trouwdag uit het Grootouderboek",
    transcriptie: [
      {
        vraag: "Vertelt u eens iets over uw trouwdag.",
        antwoord:
          "Mijn verloofde kwam mij afhalen thuis, in de Roeselaarsestraat aan de Paterskerk. Hij was met zijn Vader (de moeders telden nog niet mee), en toen zijn wij in de bestelde koets met twee paarden met mijn Vader naar de kerk gereden: wij in de eerste koets en de vaders in de tweede.",
      },
      {
        vraag: "Hebt u een huwelijksreis gemaakt?",
        antwoord:
          "Geen reis, er waren geen centjes. En op een donderdag gehuwd en de zaterdagmorgen om 7 u. op 't werk — ik had dus één dag vrij.",
      },
    ],
  },
  {
    nr: "26",
    titel: "Het huwelijk en de geboorte van de kinderen",
    src: p26,
    alt: "Handgeschreven blad over het huwelijk en de geboorte van de elf kinderen",
    transcriptie: [
      {
        vraag: "Hoe vond u het om getrouwd te zijn?",
        antwoord: "Heerlijk, eindelijk zelfstandig en onze grootste droom vervuld.",
      },
      {
        vraag: "Wanneer hebt u uw eerste kind gekregen?",
        antwoord: "Op 11 nov. 1945, onze Jan.",
      },
      {
        vraag: "Kunt u iets vertellen over de geboorte van mijn vader/moeder?",
        antwoord:
          "Ik kan van alle elf de bijzonderheden vertellen van vóór de geboorte en van daarna. Ons eerste kindje Jan is geboren op 11 november '45 en gestorven in maart '46. Ons 2e is Marc, geb. 22 december '46, dan volgde Sus 17 april '48, Geert 21 mei '49, Ann 20 juli '50, Hans 31 maart '52, Rosemary 22 juni '53, Katy 9 november '54, Beatrijs dec. '56 (gestorven in maart '57). En dan hadden wij nog twee achterkomertjes die in feite niet konden geboren worden, zei de huisdokter: en dat was Marleen 18 april 1958 en Karien 21 januari 1962.",
      },
    ],
  },
  {
    nr: "27",
    titel: "Het waren andere tijden…",
    src: p27,
    alt: "Handgeschreven blad over speelgoed, winkelen, vervoer, geld, arbeid en koken",
    transcriptie: [
      {
        vraag: "Bent u vaker getrouwd geweest?",
        antwoord: "(niet ingevuld)",
      },
      {
        vraag: "Speelgoed",
        antwoord:
          "Een pop kreeg ik met St. Niklaas, maar typisch was: wij speelden met alles. Steentjes, dat was ons geld, en wij speelden winkeltje met denkbeeldige dingen.",
      },
      {
        vraag: "Winkelen",
        antwoord:
          "Ik herinner mij meest ledige etalages en ledige winkels van 1940 tot 1945, en dan beetje bij beetje kwam er iets. Maar wij reden met de fiets naar Kortrijk omdat er daar iets meer in de etalages lag, en dat was prachtig.",
      },
      {
        vraag: "Vervoer",
        antwoord: "De fiets en te voet.",
      },
      {
        vraag: "Geld/economie",
        antwoord:
          "Mijn 1e loon in de fabriekperiode 1940 was 2,60 fr. per uur. Toen volgde de operatie Gutt.",
      },
      {
        vraag: "Arbeid",
        antwoord: "Alles en iedereen werkte voor Duitsland tot 1945.",
      },
      {
        vraag: "Koken",
        antwoord:
          "Heelemaal niets kende ik ervan tot ik trouwde. Toen moest ik wel: dan raad vragend aan mijn moeder, dan een paar kookboeken en veel liefde eraan te pas gekomen.",
      },
    ],
  },
  {
    nr: "28",
    titel: "Kinderen grootbrengen — toen en nu",
    src: p28,
    alt: "Handgeschreven blad over kinderen grootbrengen en het verschil tussen toen en nu",
    transcriptie: [
      {
        vraag: "Kinderen grootbrengen",
        antwoord: "Totale inzet — en veel vreugde eraan beleefd.",
      },
      {
        vraag: "Wat hebben we nu wel en toen niet?",
        antwoord: "Verwarming – voeding – kultuur. Alles, je kunt het niet vergelijken.",
      },
      {
        vraag: "Wat hadden we toen nog wel, en nu niet meer?",
        antwoord:
          "De vriendschap onder de buren. Iedereen stond of zat buiten, er was een grote samenhorigheid onder de mensen. Iedereen passeerde te voet of met de fiets en iedereen zei goedendag — daardoor kende iedereen iedereen.",
      },
    ],
  },
  {
    nr: "29",
    titel: "Grote gebeurtenissen in uw leven…",
    src: p29,
    alt: "Handgeschreven blad over de oorlogsjaren, de crisisjaren en het uitbreken van WO II",
    transcriptie: [
      {
        vraag: "Hebt u nog herinneringen aan de eerste wereldoorlog? Aan de distributie? De Spaanse griep?",
        antwoord:
          "Ik was 16 jaar toen de tweede oorlog uitbrak. Wij werden wakker gemaakt door de bommen die vielen op vliegveld Wevelgem 's morgens de 10 mei 1940, en iedereen liep de straat op in nachtgewaad.",
      },
      {
        vraag: "Hebt u nog herinneringen aan de jaren dertig, de crisisjaren?",
        antwoord:
          "Het was twee keer mobilisatie, maar hadden niets tekort (nog niet). De Verdinaso's die soms betoging hielden in de straten.",
      },
      {
        vraag: "Het uitbreken van de tweede wereldoorlog?",
        antwoord:
          "10 mei 1940, ik was nog géén 16. Van de 1e winter was er schaarste in kolen en werd dus pons verbrand (gruis van kolen), en dat bakte toe en gaf niet veel warmte. Wij zaten met onze voeten op de leurende stoof en breidden dikke pulls van oude sajette. Er waren rantsoenbonnen, ieder persoon een aantal grammen, dus van alles veel te weinig.",
      },
      {
        vraag: "Het bombardement van Rotterdam? De capitulatie?",
        antwoord:
          "Dat hoorden wij in de radio (het commentaar). Dus hadden wij aanhoudend honger en koud; er was bedeling van soep (Winterhulp).",
      },
    ],
  },
  {
    nr: "30",
    titel: "Bezetting, bevrijding en de watersnoodramp",
    src: p30,
    alt: "Handgeschreven blad over de jodenvervolging, de hongerwinter, de bezetting en de bevrijding",
    transcriptie: [
      {
        vraag: "De jodenvervolging?",
        antwoord:
          "Wij hebben er pas over gehoord aan het eind van de oorlog, maar één uitzondering: ik heb de sluiters zien oppakken in de fabriek van mijn oom in jan. 1941 — 'g' waren er zacht mee, het was een joel.",
      },
      {
        vraag: "De hongerwinter?",
        antwoord: "Er waren drie uitzonderlijke koude winters, en honger hadden wij de hele tijd.",
      },
      {
        vraag: "Gebeurtenissen en avonturen in de bezettingstijd?",
        antwoord:
          "Aanhouding van mijn zus en ik in 1941 in kasteel (de tuinen) van Wallemote, omdat wij foto's maakten van het kasteel op haar 20e verjaardag. Toen wij werden meteen gevoerd naar de Kriegskommandatur in Roeselare.",
      },
      {
        vraag: "De bevrijding?",
        antwoord:
          "Niet te beschrijven, en vaak ongeregeld: ruiten ingooien, mensen zien geslagen worden met stokken, stelen, grijpen uit de uitgeslagen etalages door het krapuul van de straat, de Engelsen die toekwamen, chocolade, cornedbeef, sigaretten, de algemene vreugde van de bevrijding.",
      },
      {
        vraag: "Hebt u de watersnoodramp van 1953 meegemaakt?",
        antwoord:
          "Ja, maar als toeschouwer. Nederland was het ergst getroffen; wij volgden alles per radio – televisie.",
      },
      {
        vraag: "Andere belangrijke gebeurtenissen in Nederland, in de wereld?",
        antwoord: "Wij hadden nog geen T.V., dus zagen wij niet veel van de wereld.",
      },
    ],
  },
  {
    nr: "31",
    titel: "Wonen als volwassene en de grootste reis",
    src: p31,
    alt: "Handgeschreven blad over de woonplaatsen als volwassene en de uitstappen naar zee",
    transcriptie: [
      {
        vraag: "Waar heeft u als volwassene gewoond? Waar heeft u met het meeste plezier gewoond en waarom?",
        antwoord:
          "De eerste 2 jaren na mijn huwelijk hebben wij meegewoond op de Vandenbogaerdelaan in Izegem bij de dame waar mijn man ondergedoken was onder de oorlog (er was in '45 niet gebouwd en er waren geen huizen te krijgen). Toen was er ruzie over betalen van elektriciteit en mijn vader wou dat wij direct verhuisden naar thuis in de Roeselaarsestraat. Daar hebben wij juist 1 jaar gewoond, en dat was ideaal. Maar toen kocht mijn man een huis in Emelgem, en daar zat ik dan met Marc die toen 1½ jaar was.",
      },
      {
        vraag: "Wat was de grootste reis die u als volwassene ondernomen heeft?",
        antwoord:
          "Van reizen was geen sprake, alleen werken. Wij waren 23 jaar gehuwd vooraleer wij de 1e reis gemaakt hebben. Wij gingen wel naar zee, eerst met de trein, later met de kindjes in de camionette van grootvader naar zee. Wij hebben veel plezier beleefd: 't waren later ook banden, luchtmatrassen, kastelen in 't zand gebouwd, gezwommen, de picknick mee in de camionette; en onderweg zingen en zingen — maar wij waren ondertussen met zijn tienen. En op de terugweg kochten wij in Staden drie zakjes frieten, en aten dat op in de auto.",
      },
    ],
  },
  {
    nr: "32",
    titel: "Militaire dienst, levenslessen en het moederhuis",
    src: p32,
    alt: "Handgeschreven blad over de verplichte tewerkstelling van Va, levenslessen en het moederhuis",
    transcriptie: [
      {
        vraag: "Bent u in militaire dienst geweest? Misschien was u zelfs betrokken bij oorlogshandelingen?",
        antwoord:
          "Va is nooit in dienst geweest, maar wel opgeëist door de Duitsers (alle mannen van 19 tot 35 moesten naar Duitsland gaan werken). En Va is in Goslar gemoeten, nog over Hildesheim in het Harzgebergte. Toen is hij mogen in verlof komen, en hier gebleven — ondergedoken voor de rest van de oorlog.",
      },
      {
        vraag: "Als we de school buiten beschouwing laten, wat is dan het belangrijkste dat u geleerd heeft?",
        antwoord: "Leren leven, opvangen en aanvaarden.",
      },
      {
        vraag: "Bent u ooit in het ziekenhuis opgenomen, en waarvoor dan wel?",
        antwoord:
          "Niet voor ziekte, maar om de twee jaar in het moederhuis voor 10 dagen. Het was heel pijnlijk maar tegelijk heel vreugdevolle dagen, intens beleefd. Va bracht iedere keer een hele tros bloemen mee en ik had veel bezoek met cadeautjes; ik lag er in een eenpersoonskamer en verzorgd als een prinses.",
      },
    ],
  },
];
