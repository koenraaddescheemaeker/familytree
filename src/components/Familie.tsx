import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Maximize2, User } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import MarcelAfstammelingen from "@/components/MarcelAfstammelingen";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";

// Data voor personen op de 1962 foto
interface PersonData {
  name: string;
  fatherId: number | null;
  motherId: number | null;
}

const personenData: Record<number, PersonData> = {
  1: { name: "Hedwige Hoet", fatherId: null, motherId: null },
  2: { name: "Luc Deforce", fatherId: 31, motherId: 19 },
  3: { name: "Félice Deforce", fatherId: 25, motherId: 29 },
  4: { name: "Michel Goddaer", fatherId: null, motherId: null },
  5: { name: "Marc Deforce", fatherId: 31, motherId: 19 },
  6: { name: "Erna de Four", fatherId: null, motherId: null },
  7: { name: "Gabriël Deforce", fatherId: 25, motherId: 29 },
  8: { name: "Maria Decaigny", fatherId: null, motherId: null },
  9: { name: "Lucien Deforce", fatherId: 25, motherId: 29 },
  10: { name: "Hendrik Deforce", fatherId: 25, motherId: 29 },
  11: { name: "Caroline Goddaer", fatherId: 4, motherId: 3 },
  13: { name: "Geert Deforce", fatherId: 31, motherId: 19 },
  14: { name: "Monique Deforce", fatherId: 25, motherId: 29 },
  15: { name: "Patrick Deforce", fatherId: 10, motherId: 16 },
  16: { name: "Monique Carter", fatherId: null, motherId: null },
  17: { name: "Ann Deforce", fatherId: 31, motherId: 19 },
  18: { name: "Hans Deforce", fatherId: 31, motherId: 19 },
  19: { name: "Simonne Vandeputte", fatherId: null, motherId: null },
  20: { name: "Francina Brion", fatherId: null, motherId: null },
  21: { name: "Max Autier", fatherId: null, motherId: null },
  22: { name: "Daniel Deforce", fatherId: 25, motherId: 29 },
  23: { name: "Rosemie Deforce", fatherId: 31, motherId: 19 },
  24: { name: "Maria Deforce", fatherId: 25, motherId: 29 },
  25: { name: "Marcel Deforce", fatherId: null, motherId: null },
  26: { name: "Leen Deforce", fatherId: 31, motherId: 19 },
  27: { name: "Micheline Goddaer", fatherId: 4, motherId: 3 },
  28: { name: "Karel Goddaer", fatherId: 4, motherId: 3 },
  29: { name: "Magdalena Geldof", fatherId: null, motherId: null },
  30: { name: "Karien Deforce", fatherId: 31, motherId: 19 },
  31: { name: "Georges Deforce", fatherId: 25, motherId: 29 },
  32: { name: "Pascale Autier", fatherId: 21, motherId: 33 },
  33: { name: "Bérénice Deforce", fatherId: 25, motherId: 29 },
  34: { name: "Kathy Deforce", fatherId: 31, motherId: 19 },
  35: { name: "André Deforce", fatherId: 25, motherId: 29 },
};
import reunion1962 from "@/assets/reunion-1962.jpg";
import reunion1962color from "@/assets/reunion-1962-color.jpg";
import reunion2024 from "@/assets/reunion-2024-new.jpg";
import gezinsfoto1943 from "@/assets/gezinsfoto-1943.jpg";
import gezinsfoto1943color from "@/assets/gezinsfoto-1943-color.jpg";
import reunion1966bw from "@/assets/reunion-1966-bw.jpg";
import reunion1966color from "@/assets/reunion-1966-color.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

// Volledige index van familienamen uit de PDF (Bijlage 2)
const familienamenIndex: Record<string, string[]> = {
  "A": [
    "Abeel (8)", "Abel (4)", "Abts (25)", "Accou (1)", "Adaems (1)", "Adam (2)", "Aernaut (3)", 
    "Alavaine (1)", "Algoed (1)", "Algoedt (3)", "Algoet (7)", "Alonso (1)", "Ameloot (1)", 
    "Amerlijnck (2)", "Amerlinck (18)", "Ameye (7)", "Ampe (6)", "Anderson (1)", "Andries (5)", 
    "Andrieux (2)", "Angeletti (3)", "Angillis (9)", "Anneca (1)", "Anseeuw (1)", "Antheunisse (1)", 
    "Anthuenis (7)", "Aren(t)s (2)", "Arents (1)", "Ariens (1)", "Ariensdr (1)", "Array (1)", 
    "Arteel (1)", "Assecan (1)", "Asselberghs (3)", "Audenaerde (1)", "Autier (7)", "Axters (1)", 
    "Azou (2)", "Artois (D') (17)", "Aultrive (D') (1)", "Autricourt (D') (1)", "AXELE (d') (2)", 
    "Axel (de) (2)", "Aken (van) (1)", "Ath (van) (1)", "Axel (van) (2)", "Axel (von) (1)"
  ],
  "B": [
    "BENOIT (1)", "BLONDEEL (7)", "BOURGEOIS (8)", "BRUGGEMAN (1)", "BULLE (1)", "Baeckelandt (1)", 
    "Baeckelant (1)", "Baeclant (2)", "Baeghe (5)", "Baekeland (1)", "Baekelandt (1)", "Baelde (4)", 
    "Baele (3)", "Baelen (3)", "Baert (24)", "Baes (10)", "Baete (3)", "Bage (1)", "Bagein (1)", 
    "Baghe (1)", "Bagin (4)", "Balaen (1)", "Balberghe (1)", "Ballegeer (1)", "Ballyn (1)", 
    "Bals (2)", "Banckaert (2)", "Bankaert (2)", "Barbe (1)", "Barbier (5)", "Bardoel (6)", 
    "Baron (1)", "Barsand (1)", "Basijn (8)", "Basin (1)", "Basselier (12)", "Basyn (10)", 
    "Batteau (3)", "Batteau (of Battheu) (4)", "Bauprez (2)", "Bauwe (1)", "Bauwens (14)", 
    "Bayaerts (1)", "Beauprez (1)", "Beausaert (4)", "Becaert (1)", "Beel (1)", "Beelaert (1)", 
    "Beels (1)", "Beerlandt (1)", "Beernaert (34)", "Beeusaert (1)", "Beeuwsaert (9)", "Begeijn (1)", 
    "Begein (1)", "Begeyn (1)", "Beghein (9)", "Beghin (2)", "Begijn (1)", "Behaege (1)", 
    "Behaeghe (15)", "Behaghele (2)", "Beheydt (1)", "Bekaert (6)", "Beke (3)", "Belaen (4)", 
    "Benoit (1)", "Bentein (2)", "Berckel (4)", "Bergman (1)", "Berkel (1)", "Berlam (1)", 
    "Berlamont (7)", "Berlemont (4)", "Bernaert (9)", "Bernard (1)", "Berouw (14)", "Bert (6)", 
    "Bertram (1)", "Beulcque (5)", "Beulque (6)", "Bevernagie (1)", "Biebuyck (1)", "Biesbrouck (1)", 
    "Billiau (1)", "Billiet (4)", "Bils (2)", "Bincquet (1)", "Bisschop (1)", "Blanchet (1)", 
    "Blanckaert (6)", "Blancke (1)", "Blancquart (1)", "Blauwblomme (1)", "Blesseel (1)", "Blieck (1)", 
    "Blomme (14)", "Blondeel (6)", "Blontrock (1)", "Blootacker (2)", "Blot (1)", "Bocquet (2)", 
    "Boelens (6)", "Boelins (5)", "Boene (1)", "Boens (2)", "Bogaert (6)", "Boidechon (1)", 
    "Boidin (2)", "Boldens (1)", "Bollaers (1)", "Bolle (2)", "Bolliau (1)", "Bolliere (2)", 
    "Bonduelle (4)", "Bonenfant (1)", "Bonnard (3)", "Bonte (22)", "Bontinck (1)", "Bonvicini (1)", 
    "Boon (2)", "Boone (65)", "Boptel (1)", "Bosch (17)", "Bosmans (3)", "Bossée (1)", "Bossuijt (1)", 
    "Bossuut (1)", "Bossuyt (50)", "Bostoen (1)", "Bostyn (1)", "Botterman (1)", "Bouche (1)", 
    "Boucherie (1)", "Bouchier (1)", "Bouckaert (16)", "Boucké (25)", "Boucket (1)", "Boucque (1)", 
    "Bouderez (3)", "Bouderij (1)", "Boudré (8)", "Boudrez (1)", "Boudry (1)", "Boulens (2)", 
    "Bourgeois (96)", "Bourgognon (1)", "Bourgois (1)", "Bouten (1)", "Bouvry (6)", "Brabaent (1)", 
    "Braban (2)", "Brabant (37)", "Bracke (12)", "Brackez (1)", "Bracquez (2)", "Braeckman (2)", 
    "Braem (2)", "Braet (2)", "Braeye (9)", "Bral (8)", "Branders (1)", "Brauns (1)", "Brédart (4)", 
    "Bree (1)", "Breemeersch (1)", "Brenghier (1)", "Brengier (1)", "Bridelance (1)", "Brion (8)", 
    "Brouckaert (5)", "Brouwers (4)", "Bruggeman (12)", "Bruijckere (1)", "Brulez (2)", "Bruneel (8)", 
    "Bruwier (1)", "Bruyneel (3)", "Bruynooghe (3)", "Bryon (1)", "Brysse (1)", "Buijsse (2)", 
    "Bulcaen (1)", "Bulckaen (1)", "Bulcke (1)", "Bultinck (2)", "Burette (18)", "Bussay (1)", 
    "Busschaert (4)", "Buuse (1)", "Buwez (1)", "Buyck (1)", "Buyle (1)", "Buyse (27)", "Buysse (45)", 
    "Buyssens (1)", "Buyze (1)"
  ],
  "C": [
    "CALLENS (5)", "CAPIAU (3)", "CLINCKEMAILLIE (9)", "COENE (1)", "Caboor (12)", "Caenepeel (1)", 
    "Cagnie (1)", "Calewaert (15)", "Callebert (9)", "Callens (33)", "Callewaerdt (1)", 
    "Callewaert (72)", "Cally (1)", "Caluaert (1)", "Caluwaert (1)", "Camelbeke (1)", "Campbell (3)", 
    "Camus (1)", "Camutin (1)", "Caniere (2)", "Cannaert (1)", "Canovas (1)", "Capelle (4)", 
    "Capiau (10)", "Cappeau (2)", "Cappelle (3)", "Cappelleman (2)", "Carbon (4)", "Carchon (1)", 
    "Cardo (6)", "Carette (3)", "Carius (2)", "Carlier (19)", "Carly (2)", "Carnin (1)", 
    "Carolus (1)", "Carre (1)", "Carton (4)", "Casaert (1)", "Casier (34)", "Castelain (2)", 
    "Castelein (10)", "Casteleyn (1)", "Cateau (1)", "Catelyn (1)", "Catteau (2)", "Catulle (9)", 
    "Cau (11)", "Caulier (6)", "Caullet (5)", "Cauwe (1)", "Cauwelier (1)", "Caux (3)", "Cazier (2)", 
    "Celi (1)", "Ceulenaere (1)", "Ceuninck (1)", "Ceuterick (1)", "Charels (1)", "Charles (1)", 
    "Charlet (1)", "Chielens (2)", "Christiaen (3)", "Christiaens (11)", "Claeijs (3)", 
    "Claerbout (3)", "Claerebout (1)", "Claerhout (27)", "Claes (1)", "Claessen (1)", "Claeys (9)", 
    "Claeysens (2)", "Claeyssen (13)", "Claus (17)", "Clauwaert (2)", "Clays (5)", "Clement (24)", 
    "Clément (14)", "Clemmen (1)", "Clemminck (3)", "Clerycq (1)", "Cleyman (3)", "Clincke (2)", 
    "Clinckemaillie (2)", "Clioisy (1)", "Cloet (6)", "Clubouw (1)", "Clynckemaillie (1)", 
    "Cneuvels (1)", "Cnockaert (2)", "Cnudde (3)", "Cockaerts (1)", "Cockheyt (5)", "Codron (7)", 
    "Coemelck (14)", "Coene (2)", "Coesens (3)", "Coffyn (2)", "Cogghe (3)", "Coillie (1)", 
    "Colbrandt (3)", "Colbrant (1)", "Colgaert (1)", "Colins (2)", "Colle (2)", "Colombier (1)", 
    "Colpaert (1)", "Commeine (4)", "Commeyne (1)", "Commijne (1)", "Compernolle (1)", "Cool (7)", 
    "Coolen (23)", "Coolombier (1)", "Cools (3)", "Coolsaet (1)", "Coopman (1)", "Coorens (1)", 
    "Coosemans (1)", "Coppe (2)", "Coppejans (1)", "Coppens (10)", "Cordonnier (1)", "Corneillie (1)", 
    "Cornelis (3)", "Cornelissen (1)", "Cornelust (1)", "Cornille (1)", "Corteborst (2)", 
    "Corteville (3)", "Costeur (2)", "Cottyn (4)", "Coubout (2)", "Couchez (1)", "Coucke (33)", 
    "Couckhuijt (2)", "Couckhuyt (11)", "Couckuyt (4)", "Coudenys (1)", "Coudyzer (1)", "Coulon (1)", 
    "Courtens (1)", "Courtois (1)", "Coussee (5)", "Coussée (4)", "Coussement (2)", "Coustenoble (2)", 
    "Couttere (1)", "Coutters (1)", "Couvreur (14)", "Couwet (1)", "Covelier (1)", "Cox (1)", 
    "Craeijmeesch (1)", "Craeijnest (2)", "Craeimeesch (1)", "Craeye (1)", "Craeymeersch (13)", 
    "Craeynest (3)", "Crasset (1)", "Craye (11)", "Criel (10)", "Croën (1)", "Crols (2)", 
    "Crombé (1)", "Crombee (1)", "Crombez (9)", "Croonen (1)", "Crop (21)", "Croubels (1)", 
    "Crucke (2)", "Cruplant (3)", "Cruwenaere (1)", "Cruypelandt (3)", "Cruypelant (1)", 
    "Cuelenaere (9)", "Cuveele (4)", "Cuvelier (2)", "Cuypers (2)"
  ],
  "D": [
    "DECLERCQ (2)", "DEDECKERE (1)", "DEFORCHE (3)", "DELAERE (3)", "DELHEYE (1)", "DELVA (1)", 
    "DEMEULENAERE (1)", "DEPORTE (1)", "DEVOLDERE (1)", "DEVOS (5)", "DUBOIS (1)", "DUPON (6)", 
    "DUPONT (1)", "Dael (1)", "Daelmen (1)", "Daenens (1)", "Dalderen (1)", "Daldine (1)", 
    "Dalle (2)", "Dalongueville (1)", "Damman (11)", "Damours (12)", "Dams (5)", "Dansee (1)", 
    "Danset (1)", "Darre (1)", "David (9)", "De Backer (3)", "De Backere (4)", "De Baene (2)", 
    "De Baets (3)", "De Bel (1)", "De Bergh (6)", "De Beuf (2)", "De Beule (6)", "De Blaere (2)", 
    "De Blauwe (2)", "De Bleecker (1)", "De Bock (9)", "De Booser (1)", "De Bouzanton (1)", 
    "De Boyser (1)", "De Brabander (1)", "De Brabandere (14)", "De Brievere (1)", "De Brouwer (7)", 
    "De Bruijcker (3)", "De Bruycker (1)", "De Bruyckere (3)", "De Bruyne (5)", "De Buck (2)", 
    "De Burggraeve (2)", "De Busscher (1)", "De Busschere (1)", "De Buysschere (1)", "De Caluwe (4)", 
    "De Capmaeckere (1)", "De Causemaecker (1)", "De Causmaecker (2)", "De Ceuleners (1)", 
    "De Ceuninck (1)", "De Chièvres (1)", "De Clerck (19)", "De Clercq (11)", "De Clerq (2)", 
    "De Cock (2)", "De Coene (1)", "De Cokere (10)", "De Coninck (5)", "De Corte (3)", 
    "De Costere (10)", "De Coutere (2)", "De Coutre (1)", "De Couttere (1)", "De Craemer (1)", 
    "De Craene (63)", "De Crock (3)", "De Cysoing (1)", "De Dapper (1)", "De Decker (2)", 
    "De Deckere (6)", "De Deurwaerder (1)", "De Deyne (2)", "De Deynse (1)", "De Dobbelaere (1)", 
    "De Dycker (1)", "De Force (4)", "De Forche (87)", "De Forse (1)", "De Four (15)", 
    "De Fraeye (2)", "De Froidmont (1)", "De Ganck (2)", "De Gavere (1)", "De Graat (1)", 
    "De Gravelin (1)", "De Grijse (2)", "De Groote (7)", "De Grote (1)", "De Gryze (2)", 
    "De Hane (1)", "De Hornes (1)", "De Hullu (3)", "De Hulst (1)", "De Hulster (9)", 
    "De Hulsters (1)", "De Jaeger (2)", "De Jaegher (9)", "De Jaeghere (2)", "De Jagere (8)", 
    "De Jagher (4)", "De Joncheere (2)", "De Jonckheere (1)", "De Jonghe (1)", "De Keirschieter (1)", 
    "De Kesel (2)", "De Ketele (2)", "De Keyser (1)", "De Keyzer (3)", "De Kimpe (9)", "De Klerk (1)", 
    "De Kock (9)", "De La Haye (1)", "De Laere (8)", "De Laie (1)", "De Landtsheer (1)", 
    "De Lannoy (2)", "De Lanoo (1)", "De Lanoy (2)", "De Le Motte (3)", "De Leersnijder (8)", 
    "De Leeuw (1)", "De Letter (2)", "De Leu (2)", "De Leyn (5)", "De Lie (2)", "De Lievin (1)", 
    "De Lille (2)", "De Ly (1)", "De Maesschalck (1)", "De Man (1)", "De Manghelaere (1)", 
    "De Meester (1)", "De Meestere (2)", "De Meijere (1)", "De Meulenaere (3)", "De Mey (1)", 
    "De Meyer (2)", "De Meyere (2)", "De Montfrancq (1)", "De Moor (2)", "De Muelenaere (1)", 
    "De Muér (1)", "De Munck (10)", "De Muynck (29)", "De Muyt (1)", "De Navigheer (6)", "De Nijs (1)", 
    "De Nolf (18)", "De Nys (1)", "De Paepe (3)", "De Panneken (1)", "De Pape (13)", "De Pauw (12)", 
    "De Peutevin (1)", "De Poorter (2)", "De Poortere (4)", "De Pover (2)", "De Praetere (1)", 
    "De Praitere (5)", "De Preitere (1)", "De Prez (2)", "De Putter (1)", "De Puydt (22)", 
    "De Raet (2)", "De Rechter (1)", "De Regge (3)", "De Reu (3)", "De Rieu (1)", "De Rijcke (6)", 
    "De Rijckere (1)", "De Roo (40)", "De Roover (1)", "De Roucx (1)", "De Rousseux (1)", 
    "De Rubbel (1)", "De Ruijter (2)", "De Ruijttere (1)", "De Ruyter (1)", "De Ruytere (2)", 
    "De Rycke (17)", "De Sains (4)", "De Scheemaeker (7)", "De Scheider (1)", "De Schepper (1)", 
    "De Schieter (1)", "De Scouthetene (1)", "De Seyn (3)", "De Sloover (4)", "De Smedt (1)", 
    "De Smet (20)", "De Snick (6)", "De Soete (1)", "De Stobbeleere (1)", "De Sutter (2)", 
    "De Taeye (1)", "De Vannemaecker (1)", "De Varweraere (1)", "De Vilder (1)", "De Vilé (2)", 
    "De Visch (10)", "De Vlam (1)", "De Vogelaere (1)", "De Voghel (1)", "De Vonck (1)", "De Vos (20)", 
    "De Vriendt (4)", "De Vylder (1)", "De Waele (3)", "De Walsche (9)", "De Wandel (1)", 
    "De Wandele (1)", "De Wastines (1)", "De Waudripont (1)", "De Weerd (1)", "De Weerdt (2)", 
    "De Wever (3)", "De Wevere (1)", "De Weweire (3)", "De Wilde (2)", "De Winne (3)", "De Wint (1)", 
    "De Wispelaere (2)", "De Witte (14)", "De Wolf (1)", "De Wulf (14)", "Debacker (8)", 
    "Debackere (32)", "Debaene (3)", "Debaere (1)", "Debaes (11)", "Debaets (5)", "Debaix (1)", 
    "Debal (1)", "Debals (1)", "Debbaut (9)", "Debecker (1)", "Debel (3)", "Debergh (3)", 
    "Deblaere (3)", "Deblauwe (25)", "Deblock (1)", "Debo (1)", "Debode (8)", "Debonnez (1)", 
    "Deboo (5)", "Deboodt (5)", "Deboosere (1)", "Debouvez (1)", "Debrabander (1)", "Debrabandere (5)", 
    "Debrauwere (1)", "Debreuck (4)", "Debruijne (1)", "Debruykere (1)", "Debruyne (12)", "Debuck (1)", 
    "Debuf (2)", "Debuijsscher (1)", "Debuisson (1)", "Debusscher (1)", "Debusschere (23)", 
    "Decadt (2)", "Decaigny (7)", "Decaluwe (2)", "Decaluwé (1)", "Decambray (1)", "Decancq (2)", 
    "Decanniere (3)", "Decantere (1)", "Decapmaker (7)", "Decaut (4)", "Deceuman (3)", "Deceunick (1)", 
    "Deceuninck (5)", "Decin (1)", "Deckers (2)", "Declerck (14)", "Declercq (45)", "Declerq (1)", 
    "Decloedt (3)", "Decock (6)", "Decocker (1)", "Decocq (1)", "Decoene (25)", "Decoster (8)", 
    "Decottenie (1)", "Decoutere (3)", "Decraene (6)", "Decraeye (1)", "Decramer (1)", "Decroix (10)", 
    "Decrop (2)", "Decuypere (2)", "Dedaeyere (1)", "Dedeckere (6)", "Dedeene (3)", "Dedeine (1)", 
    "Dedene (1)", "Dedeurwaerder (3)", "Dedeyne (1)", "Deduytschaever (2)", "Defevere (1)", 
    "Defoort (1)", "Deforce (324)", "Deforche (537)", "Deforge (7)", "Deforse (3)", "Deforsse (1)", 
    "Defossez (2)", "Defraeye (3)", "Defrancq (1)", "Defuystere (1)", "Degeest (4)", "Degeldere (1)", 
    "Degraende (1)", "Degrande (10)", "Degrave (1)", "Degrendele (1)", "Degrise (1)", "Degroote (4)", 
    "Degruytere (1)", "Degryse (10)", "Degryze (2)", "Dehaene (2)", "Deheijghere (1)", "Dehens (1)", 
    "Dehondt (1)", "Dehullu (3)", "Dejaegher (1)", "Dejaeghere (2)", "Dejan (2)", "Dejoncheere (2)", 
    "Dejonckheere (8)", "Dejonghe (17)", "Dekeirschieter (1)", "Dekeirsschieter (1)", "Dekens (1)", 
    "Deketelaere (1)", "Dekeyser (2)", "Dekimpe (4)", "Deknock (2)", "Dekoker (1)", "Dekwae (2)", 
    "Del Camere (1)", "Del Dicke (2)", "Del Forge (3)", "Del Pozo (1)", "Del Voye (1)", "Delabie (1)", 
    "Delaere (45)", "Delaey (17)", "Delahousse (2)", "Delange (1)", "Delanghe (1)", "Delanoy (2)", 
    "Delbaere (1)", "Delbecque (1)", "Delbeecke (1)", "Delcambre (6)", "Deldaele (62)", "Deldalle (1)", 
    "Deldicq (2)", "Delecambre (1)", "Deleersnyder (1)", "Deleforge (66)", "Deleporte (1)", 
    "Delerue (1)", "Deleu (17)", "Deleva (1)", "Deleye (2)", "Delez (1)", "Delf (2)", "Delforce (80)", 
    "Delforche (18)", "Delforge (42)", "Delforghe (1)", "Delforse (11)", "Delforsse (1)", "Delft (7)", 
    "Dellaert (11)", "Delmotte (1)", "Delobel (1)", "Delrue (1)", "Delseyne (2)", "Deltombe (2)", 
    "Deltomme (7)", "Delva (12)", "Delvae (1)", "Delvoye (1)", "Dely (5)", "Demaegt (2)", "Deman (10)", 
    "Demare (7)", "Demaré (18)", "Demarez (2)", "Demariere (2)", "Démarquet (2)", "Demarrez (1)", 
    "Demasure (1)", "Demazieres (1)", "Demeester (4)", "Demeijere (2)", "Demely (1)", "Demets (1)", 
    "Demeulemeester (4)", "Demeulenaere (27)", "Demeurisse (1)", "Demeyer (10)", "Demeyere (6)", 
    "Demonie (3)", "Demoor (1)", "Demuelenaere (1)", "Demulenaere (1)", "Demulenare (1)", 
    "Demunck (1)", "Demuynck (32)", "Demuysere (2)", "Den Backer (1)", "Deneire (5)", "Denglos (1)", 
    "Denijs (2)", "Denolf (2)", "Denoo (2)", "Denys (8)", "Depaepe (1)", "Depan (1)", "Depauw (4)", 
    "Depla (1)", "Depondt (4)", "Depoorter (11)", "Depoortere (8)", "Depré (4)", "Depreitere (12)", 
    "Deprest (2)", "Deprez (9)", "Deprince (1)", "Depuydt (15)", "Deraedt (3)", "Derieuw (1)", 
    "Derijckere (1)", "Dermaut (3)", "Deroncq (2)", "Deronne (1)", "Deroo (3)", "Deroulers (1)", 
    "Deruddere (1)", "Deruyter (4)", "Dervaux (10)", "Derveaux (2)", "Derycke (6)", "Deryckere (3)", 
    "Derynck (3)", "Descamps (5)", "Deschamp (1)", "Descheemaecker (1)", "Descheemaeker (3)", 
    "Deschepper (3)", "Deschodt (1)", "Deschrijvere (1)", "Deschryvere (2)", "Deseine (2)", 
    "Desender (1)", "Deseure (3)", "Deseyn (1)", "Desgigot (1)", "Desimpel (1)", "Desimpelaere (1)", 
    "Desimpelare (1)", "Desloover (1)", "Desmedt (4)", "Desmet (60)", "Desmettre (16)", "Desobry (3)", 
    "Despiere (1)", "Desplenter (1)", "Despriet (1)", "Desrousseaux (1)", "Desserrano (1)", 
    "Destien (1)", "Destieux (1)", "Detavernier (3)", "Deugd (1)", "Deuninck (1)", "Deurwaerder (2)", 
    "Devaere (14)", "Devarrewaere (1)", "Develter (4)", "Develtere (2)", "Deven (4)", "Devenyns (6)", 
    "Deverrewaere (1)", "Devers (1)", "Deververaere (1)", "Devlieger (3)", "Devoghele (3)", 
    "Devolder (3)", "Devoldere (7)", "Devoldre (2)", "Devos (21)", "Devriendt (5)", "Devriese (6)", 
    "Devroe (2)", "Devroedt (1)", "Devynck (1)", "Dewaele (4)", "Dewancker (1)", "Dewiele (2)", 
    "Dewilde (7)", "Dewitte (9)", "Dewolf (7)", "Deworm (1)", "Dewulf (40)", "Dezitter (2)", 
    "Dhaene (1)", "Dhaenens (4)", "Dhaese (3)", "Dhalluin (1)", "Dhanens (1)", "Dhanins (13)", 
    "Dhayere (2)", "Dhoest (1)", "Dhondt (10)", "Dhont (2)", "Dhooge (3)", "Dhoore (1)", 
    "Dhulster (4)", "Dhulstere (4)", "Dierckens (1)", "Dierick (1)", "Dierijck (1)", "Dierkens (1)", 
    "Dijkshoorn (1)", "Dip (1)", "Dirks (1)", "Dobbelaere (2)", "Dobbels (8)", "Doelman (19)", 
    "Dollé (12)", "Donckerwolcke (1)", "Dont (2)", "Doom (4)", "Doop (19)", "Doornaert (1)", 
    "Doppegieter (1)", "Dossche (1)", "Douchy (2)", "Dreser (1)", "Drieghe (1)", "Driesens (3)", 
    "Driessens (7)", "Drieux (2)", "Druwaert (1)", "Druyts (1)", "Du Pon (1)", "Dubaere (6)", 
    "Dubois (7)", "Dubuisson (2)", "Duchattoir (3)", "Duclos (1)", "Dufoort (3)", "Dufour (1)", 
    "Dufromont (1)", "Duhamel (1)", "Duijtschaever (1)", "Duitschaever (1)", "Dumolein (2)", 
    "Dumonceau (1)", "Dumortier (2)", "Dumoulein (1)", "Dupon (9)", "Dupont (14)", "Dupuicht (1)", 
    "Durang (1)", "Duriez (2)", "Dusein (1)", "Dusselier (2)", "Duthoy (8)", "Dutilly (1)", 
    "Dutoict (1)", "Dutoit (1)", "Dutre (1)", "Duufhuuse (1)", "Duville (2)", "Duvillier (1)", 
    "Duyck (9)", "Duyvejonck (1)"
  ],
  "E": [
    "EYLAND (7)", "Ebo (1)", "Eeckaert (1)", "Eeckhout (5)", "Eeckman (9)", "Eggermont (1)", 
    "Egghermont (1)", "Eizmundi (1)", "Elias (1)", "Emelgeer (2)", "Emmery (1)", "Eneman (19)", 
    "Engels (3)", "Erweghe (1)", "Eumann (1)", "Everaert (1)", "Evrart (1)", "Eyland (11)", "Eyns (1)"
  ],
  "F": [
    "FACON (2)", "Fagot (1)", "Falk (1)", "Farasijn (3)", "Farasyn (3)", "Favarcken (1)", 
    "Favark (1)", "Favarquen (1)", "Fernandez (2)", "Ferré (1)", "Fervacque (1)", "Feryn (1)", 
    "Feys (36)", "Fiedalan (1)", "Fiem (6)", "Fiems (1)", "Fieuws (1)", "Fillekes (1)", "Fioen (5)", 
    "Flasseel (2)", "Flipo (1)", "Flippo (1)", "Floreijn (11)", "Floren (2)", "Floreyn (1)", 
    "Florin (2)", "Floryn (5)", "Flosse (2)", "Flouret (1)", "Foers (1)", "Folens (5)", "Follens (2)", 
    "Follet (7)", "Fontaine (1)", "Fonteyne (1)", "Force (10)", "Forcé (4)", "Forcez (1)", 
    "Forche (2)", "Foré (1)", "Formesyn (4)", "Formet (1)", "Forret (5)", "Forrez (1)", "Forse (1)", 
    "Forsé (4)", "Fossez (1)", "Foubert (4)", "Foulon (2)", "Fourment (3)", "Fournier (1)", 
    "Fraeye (3)", "Fraeyman (2)", "Franco (2)", "Françoijs (1)", "Fransoijs (1)", "Franssens (1)", 
    "Frederik (1)", "Fremault (1)", "Fremaut (4)", "Froyman (1)"
  ],
  "G": [
    "GHESQUIÈRE (5)", "GRANTRAIN (1)", "GRIMBEL (3)", "Gabriel (1)", "Gadeine (1)", "Gadeyne (2)", 
    "Gailliaert (2)", "Gallois (1)", "Galloo (11)", "Galus (1)", "Garcia (19)", "Gardeyn (1)", 
    "Gardin (1)", "Garemyn (1)", "Garreveot (1)", "Garson (1)", "Gautbeens (1)", "Geens (1)", 
    "Geerolf (1)", "Geirnaert (12)", "Gekier (1)", "Gekiere (3)", "Geldhof (53)", "Geldof (132)", 
    "Gellynck (2)", "Genbrugge (3)", "Génin (1)", "Germonprez (1)", "Gerrits (1)", "Gersin (1)", 
    "Ghekiere (1)", "Gheldhof (1)", "Gheldof (14)", "Ghequiere (1)", "Ghesquiere (49)", 
    "Ghesquire (2)", "Gheysen (5)", "Gheysens (2)", "Ghijs (1)", "Ghijsels (1)", "Ghoosens (1)", 
    "Ghoossens (1)", "Ghysbrecht (2)", "Ghyselen (2)", "Ghyselinck (1)", "Ghysels (1)", 
    "Giakoumakis (1)", "Gieleghem (1)", "Gielen (4)", "Gijselman (2)", "Gilbert (4)", "Gillebert (1)", 
    "Gilles (5)", "Gillewijtens (1)", "Gillis (4)", "Girard (1)", "Glorian (1)", "Glorie (1)", 
    "Glorieux (1)", "Gobeir (1)", "Gobeyn (1)", "Gobyn (3)", "Goddaer (8)", "Goddeeris (3)", 
    "Godderis (8)", "Goddeyn (1)", "Goddijns (1)", "Godefroy (1)", "Goderis (1)", "Godtschalck (2)", 
    "Goedelque (1)", "Goemaere (8)", "Goeminne (3)", "Goetalsch (1)", "Goethals (30)", "Gomez (1)", 
    "Gondrij (1)", "Goossens (5)", "Goudeseune (1)", "Goudezeune (1)", "Goumri (2)", "Gouwentak (2)", 
    "Govaere (2)", "Grahovec (1)", "Grandel (2)", "Grard (1)", "Grenut (1)", "Grijspeerdt (5)", 
    "Grijspeert (1)", "Grimbel (8)", "Grinbel (1)", "Grispert (2)", "Grootaert (13)", "Groothaert (3)", 
    "Gruyaert (1)", "Grymonprez (14)", "Gryspeerdt (1)", "Gryspeert (6)", "Guillemyn (3)", "Guns (1)", 
    "Gunst (1)"
  ],
  "H": [
    "HORRÉ (3)", "HOUTHOOFD (13)", "Haccart (8)", "Haeck (1)", "Haelsters (2)", "Haelterman (1)", 
    "Haemers (1)", "Haenebalcke (8)", "Haentjens (2)", "Haerinck (2)", "Haers (2)", "Haeverbeke (1)", 
    "Haghedoorne (1)", "Hamerlinck (8)", "Hamers (1)", "Hammens (5)", "Hannekin (1)", "Hanssens (4)", 
    "Haquet (1)", "Harinck (1)", "Hauspie (1)", "Hautekeete (3)", "Havick (1)", "Hebberecht (4)", 
    "Hecker (1)", "Heeckman (1)", "Heene (1)", "Heerinck (1)", "Heffinck (1)", "Heggermont (2)", 
    "Heila (1)", "Heine (1)", "Helewaut (3)", "Hellebuijck (1)", "Hellebuyck (8)", "Hellinckx (1)", 
    "Hemerijck (1)", "Henderickx (1)", "Henderyckx (1)", "Hendrickx (1)", "Hendrikx (1)", 
    "Hennebert (1)", "Henrion (1)", "Hereman (1)", "Herman (5)", "Hermonie (1)", "Hernalsteen (1)", 
    "Herpoelaert (1)", "Herreman (2)", "Herremans (1)", "Hespespaen (1)", "Heus (17)", "Heycke (1)", 
    "Heydricx (1)", "Heyerick (2)", "Heygers (1)", "Heyndrickx (2)", "Heynen (1)", "Heyns (3)", 
    "Heynsens (2)", "Hilderson (2)", "Hillegeer (1)", "Hillewaere (2)", "Hillewaert (2)", "Himpe (3)", 
    "Himpens (1)", "Himschoot (2)", "Hindryckx (1)", "Hinou (1)", "Hoeghsteel (1)", "Hoet (16)", 
    "Hofman (3)", "Hogervorst (1)", "Hollebeke (1)", "Holoffe (1)", "Holvoet (17)", "Hombrouck (1)", 
    "Honorez (2)", "Hoofts (2)", "Hoogendam (1)", "Hoorewegh (1)", "Hoorms (1)", "Hoorn (1)", 
    "Hoornaert (31)", "Horenweg (1)", "Horre (6)", "Horré (10)", "Horrez (1)", "Horsch (1)", 
    "Hoste (7)", "Hostekint (6)", "Hostens (5)", "Houbarijs (1)", "Houtekar (3)", "Houthave (2)", 
    "Houthoofd (34)", "Houthooft (14)", "Houttekar (1)", "Houwaard (3)", "Houwen (3)", "Hubau (1)", 
    "Huijsman (1)", "Humbou (1)", "Hutsebaut (1)", "Huus (4)", "Huwart (1)", "Huyghe (6)", "Huys (12)", 
    "Huysentruyt (8)", "Huyvetters (1)"
  ],
  "I": [
    "Ide (2)", "Imbrecht (1)", "Impe (9)", "Impens (1)", "Ingelbeen (1)", "Inghels (1)", 
    "Inglebert (3)", "Inion (1)", "Intizar (2)", "Isacker (3)"
  ],
  "J": [
    "Jacob (1)", "Jacops (1)", "Jaeckens (3)", "Jama (1)", "Janssens (5)", "Japick (2)", "Jaques (1)", 
    "Jonckheer (3)", "Jongejan (1)", "Joye (6)", "Julie (1)"
  ],
  "K": [
    "KESTELOOT (3)", "Kammerlinx (1)", "Kamoen (11)", "Karbin (1)", "Kartak (1)", "Keignaert (1)", 
    "Keirsbilck (2)", "Kempinck (2)", "Kemps (1)", "Kenners (1)", "Kennes (2)", "Kerckhof (4)", 
    "Kerckhove (2)", "Kerkhof (4)", "Kerkhove (1)", "Kesteloot (29)", "Ketelaer (1)", "Keuckelinck (1)", 
    "Keukenmeester (1)", "Keurse (1)", "Kindt (31)", "Kint (2)", "Klein (1)", "Klinckemaillie (3)", 
    "Knockaert (1)", "Knudde (1)", "Koedel (1)", "Koolmees (1)", "Koppert (9)", "Kouckhuyt (2)", 
    "Krokaert (1)", "Kruithof (1)"
  ],
  "L": [
    "LAMBIN (8)", "LAMOTE (1)", "LAMOTTE (1)", "LOUWAEGE (1)", "La Motte (3)", "Labeeuw (1)", 
    "Labens (4)", "Lacressonnière (3)", "Ladrisou (2)", "Laebens (1)", "Lafaut (10)", "Lafere (2)", 
    "Laforce (2)", "Laga (1)", "Lagae (4)", "Lagaise (1)", "Lagrou (2)", "Lahousse (1)", "Lahure (1)", 
    "Lamaire (5)", "Lambert (2)", "Lambin (4)", "Lambrecht (5)", "Lameire (1)", "Lammertijn (7)", 
    "Lammmens (1)", "Lamont (2)", "Lamote (3)", "Lamotte (1)", "Lampaert (1)", "Lampe (1)", 
    "Lanckriet (3)", "Landmeter (1)", "Landuyt (14)", "Langedock (1)", "Langedocq (1)", 
    "Langenbick (3)", "Langendoen (1)", "Langevelt (2)", "Lannoo (4)", "Lannoy (1)", "Lansens (3)", 
    "Lanssens (15)", "Lapeere (4)", "Lapeire (9)", "Lapeirre (2)", "Laperre (1)", "Laquiere (2)", 
    "Lateur (1)", "Lathem (1)", "Latrez (1)", "Laurez (6)", "Laute (4)", "Lautte (1)", "Lauwereins (1)", 
    "Lauwers (11)", "Lava (1)", "Lavae (1)", "Lavrauw (3)", "Le Bouteillier de Senlis (1)", 
    "Le Compte (1)", "Le Fault (1)", "Le Gley (1)", "Le Keux (2)", "Le Loup (15)", "Le Pla (2)", 
    "Le Roy (1)", "Le Teincturier (1)", "Lechat (1)", "Leclercq (1)", "Leclerq (1)", "Lecluijse (1)", 
    "Lecluyse (1)", "Lecomte (2)", "Lecoutere (15)", "Leeganck (2)", "Leeman (1)", "Leenderts (1)", 
    "Leenknecht (5)", "Leenknegt (1)", "Lefebure (2)", "Lefebvre (5)", "Lefever (1)", "Lefevere (6)", 
    "Lefevre (2)", "Legiers (9)", "Legrand (1)", "Leins (1)", "Lejaegere (2)", "Leleu (1)", 
    "Lelong (5)", "Leloup (4)", "Lemaire (4)", "Lemaistre (3)", "Lemiegre (1)", "Lenee (1)", 
    "Lenez (2)", "Lenoir (1)", "Lepelaere (1)", "Lepere (1)", "Lepez (1)", "Lepla (1)", "Leplat (2)", 
    "Lepoutre (3)", "Leprauw (1)", "Lerberghe (1)", "Lernoud (1)", "Lerouge (2)", "Leroy (1)", 
    "Lesaege (2)", "Lesage (1)", "Lesoen (4)", "Lesy (4)", "Leuntjes (1)", "Leveugle (1)", 
    "Lewage (11)", "Leyman (1)", "Leyn (2)", "Leys (4)", "Lezy (1)", "Libberecht (1)", "Libert (1)", 
    "Liebaert (1)", "Liegent (1)", "Liepe (1)", "Lietaert (3)", "Liétart (1)", "Lievrouw (1)", 
    "Lins (1)", "Linseele (1)", "Lippens (97)", "Lips (2)", "Lobbestael (5)", "Localin (3)", 
    "Locquet (1)", "Lodewijck (1)", "Loessaert (1)", "Logara (1)", "Loker (1)", "Loncke (7)", 
    "Longerloot (2)", "Lonneville (5)", "Loobuijck (1)", "Loobuyck (1)", "Looij (1)", "Lopez (1)", 
    "Loquet (1)", "Louage (6)", "Louffaert (1)", "Louwagie (1)", "Louwy (1)", "Louy (1)", 
    "Lowagie (1)", "Loyson (3)", "Ludovicus (2)", "Lugtenburg (1)", "Lust (3)", "Lutaert (1)", 
    "Luttens (9)", "Lybaert (1)", "Lybeer (2)", "Lycke (2)", "Lyneel (1)"
  ],
  "M": [
    "MAERTENS (1)", "MAES (3)", "MARSILLE (8)", "MERCKAERT (1)", "MOENS (1)", "Maddens (3)", 
    "Maeckelbergh (1)", "Maelfait (5)", "Maelfeyt (1)", "Maenhout (1)", "Maerte (1)", "Maertens (4)", 
    "Maes (54)", "Maeyaert (2)", "Mafaut (1)", "Mahieu (2)", "Maho (1)", "Maleyne (1)", "Malfait (6)", 
    "Maloteau (1)", "Manach (1)", "Manderick (1)", "Mandeville (1)", "Manhaeve (25)", "Mannes (2)", 
    "Mansis (1)", "Maras (1)", "Marchand (17)", "Marchelier (1)", "Mareel (4)", "Margot (1)", 
    "Maria (3)", "Mariman (6)", "Marischael (1)", "Marissael (1)", "Marlière (1)", "Marreel (1)", 
    "Marres (4)", "Marsille (9)", "Martens (20)", "Martin (14)", "Martine (1)", "Marysse (4)", 
    "Masschau (1)", "Masschelin (2)", "Masscho (23)", "Masselis (4)", "Masure (1)", "Mathys (1)", 
    "Mattan (2)", "Mattang (3)", "Mattens (1)", "Matthijs (2)", "Maucry (1)", "Maurice (6)", 
    "Maysonnade (1)", "Mazereeuw (1)", "Mazure (1)", "McCartney (3)", "Mechelinck (1)", "Meerman (1)", 
    "Meerschaert (2)", "Meerschman (5)", "Meersseman (4)", "Meeschaert (1)", "Meganck (3)", 
    "Meire (1)", "Melis (1)", "Melsens (1)", "Mercaert (1)", "Merckaert (1)", "Merlein (1)", 
    "Mernhout (1)", "Messelier (8)", "Messeyne (1)", "Messiaen (2)", "Mestdag (2)", "Mestdagh (36)", 
    "Meulebrouck (3)", "Meuleman (1)", "Meunier (1)", "Meurisse (3)", "Meuwis (1)", "Meuxels (1)", 
    "Meyfroidt (7)", "Meyfroit (1)", "Meyfroot (2)", "Migerode (1)", "Millan (2)", "Millecamps (1)", 
    "Millon (1)", "Minnaert (11)", "Minne (2)", "Misseyne (1)", "Missuwe (1)", "Mistiaen (3)", 
    "Mittenaere (2)", "Moen (1)", "Moens (2)", "Moerman (1)", "Molins (2)", "Mollet (1)", "Mollier (1)", 
    "Molly (18)", "Mommens (2)", "Monsere (2)", "Monserez (2)", "Montens (1)", "Monteyne (1)", 
    "Moreels (3)", "Morel (3)", "Morsa (6)", "Mortier (19)", "Moyaert (1)", "Mule (9)", "Mulier (4)", 
    "Mulleman (1)", "Mullier (1)", "Muylaert (1)", "Muylle (16)", "Muys (2)", "Myny (2)"
  ],
  "N": [
    "NOORDERMEER (1)", "Naert (23)", "Naessens (6)", "Naets (1)", "Nastelynck (1)", "Navigheer (14)", 
    "Neeleman (36)", "Neels (2)", "Neerinck (17)", "Neijt (11)", "Neirijnck (1)", "Neirinck (2)", 
    "Neit (3)", "Neleman (8)", "Nevelsteen (1)", "Neyrinck (2)", "Neyt (27)", "Neyts (1)", "Nicod (1)", 
    "Nieuwenhuijse (1)", "Nimmegeers (1)", "Nn (2)", "Nobel (1)", "Nolf (1)", "Nollet (8)", 
    "Nonckele (5)", "Nonkel (2)", "Noordermeer (36)", "Nooteboom (2)", "Nootenboom (1)", "Noppe (25)", 
    "Normon (14)", "Notebaert (2)", "Notenboom (12)", "Notteboom (3)", "Nouten (1)", "Noyelle (3)", 
    "Noyez (4)", "Nutens (1)", "Nuttens (2)", "Nuytten (2)", "Nuyttens (2)", "Nys (1)"
  ],
  "O": [
    "OOSTERLYNCK (5)", "Olieman (64)", "Olieux (1)", "Olij (6)", "Olijman (11)", "Olivier (19)", 
    "Ollevier (6)", "Oly (3)", "Omez (3)", "Ommeslaeger (1)", "Ongena (2)", "Onraet (2)", "Onree (1)", 
    "Ooghe (9)", "Oosterlinck (10)", "Oosterlynck (13)", "Oostvogels (4)", "Opsomer (1)", "Ostijn (1)", 
    "Ostyn (19)", "Ottevaere (4)", "Ottoy (1)", "Outers (1)", "Outhaeve (1)"
  ],
  "P": [
    "PANNECOUCKE (3)", "PARMENTIER (1)", "PATTYN (23)", "PAUL (1)", "POTTIE (2)", "Palinck (2)", 
    "Panne (1)", "Pannecoucke (45)", "Pardoen (2)", "Pareit (1)", "Paridons (2)", "Parmentier (34)", 
    "Parree (1)", "Parreit (1)", "Pasture (1)", "Paternostre (1)", "Patfoort (1)", "Pathier (1)", 
    "Patin (1)", "Patteeuw (4)", "Pattijn (4)", "Pattison (1)", "Pattyn (38)", "Patyn (4)", "Paul (1)", 
    "Pauls (1)", "Pauweleyn (2)", "Pauwels (7)", "Pector (1)", "Peel (1)", "Peene (2)", 
    "Peersegael (2)", "Peire (1)", "Peiren (1)", "Peisman (15)", "Penez (5)", "Percy (1)", 
    "Perneel (3)", "Perreman (1)", "Persijn (1)", "Persyn (2)", "Pesant (2)", "Petit (1)", 
    "Peveroen (3)", "Philippot (2)", "Phlips (1)", "Phyfferoen (9)", "Picavet (3)", "Pickavet (1)", 
    "Piergoot (1)", "Pierloot (1)", "Pieters (7)", "Pijferoen (1)", "Pijffroen (1)", "Pille (13)", 
    "Pinckers (1)", "Pincquel (2)", "Pinoit (1)", "Piron (2)", "Planckaert (3)", "Plancke (7)", 
    "Planke (1)", "Plasje (1)", "Plasschaert (1)", "Plateau (6)", "Platteeuw (3)", "Plets (6)", 
    "Ploeger (1)", "Plovie (3)", "Poelmans (1)", "Poelvoorde (1)", "Poirier (1)", "Polderman (2)", 
    "Pollet (1)", "Pollin (11)", "Poorteman (1)", "Popelier (16)", "Porte (4)", "Portenaert (1)", 
    "Post (1)", "Pottie (3)", "Pottier (1)", "Pouckens (1)", "Priem (17)", "Proot (2)", 
    "Provoost (17)", "Provost (1)", "Pruijmstraat (1)", "Pumont (1)", "Pussemier (1)", "Puylaert (3)", 
    "Pyfferoen (7)", "Pynoo (1)", "Pype (2)"
  ],
  "Q": [
    "Quackelbeen (1)", "Quaegebeur (9)", "Quakebeke (1)", "Quequin (1)", "Quincqué (6)"
  ],
  "R": [
    "RIGOLE (5)", "ROHAERT (1)", "ROSKAM (1)", "Rabau (1)", "Rabaut (1)", "Rabauwt (1)", "Radé (1)", 
    "Raes (9)", "Raman (2)", "Ramaut (1)", "Ramboer (1)", "Ramon (3)", "Ranson (2)", "Rapoeye (2)", 
    "Rapoye (2)", "Raveschot (1)", "Rayez (1)", "Reblauwe (1)", "Rebre (1)", "Rebrie (1)", 
    "Rebrij (1)", "Rebry (2)", "Rédélé (1)", "Reijerkerk (2)", "Reijniers (6)", "Remaut (1)", 
    "Remerij (1)", "Remmerie (3)", "Renier (5)", "Reynaert (5)", "Reynier (4)", "Reyniers (18)", 
    "Reyns (2)", "Rickier (1)", "Ricourt (1)", "Riekoort (1)", "Rigole (11)", "Rigolle (1)", 
    "Rijdoen (2)", "Ringoot (1)", "Robaeys (2)", "Robait (1)", "Robbe (8)", "Robbens (3)", 
    "Robbrecht (1)", "Robeijs (2)", "Robert (1)", "Robesyn (1)", "Robyn (1)", "Rodenburg (74)", 
    "Rodenburgh (4)", "Roegiers (17)", "Roegiest (1)", "Roelandt (6)", "Roelens (40)", "Roels (37)", 
    "Roete (1)", "Rogez (2)", "Rogge (1)", "Rogier (1)", "Rogiers (4)", "Rohaert (8)", 
    "Rommelaere (2)", "Romon (5)", "Romond (1)", "Rondelez (1)", "Ronse (1)", "Room (10)", 
    "Roose (19)", "Rooseboom (1)", "Rose (1)", "Roselle (2)", "Rosenquest (1)", "Rosine (1)", 
    "Rosseel (7)", "Rossel (1)", "Rosselle (23)", "Rostijne (1)", "Rotsaert (2)", "Rottey (3)", 
    "Rotze (1)", "Rougiers (1)", "Rousseau (43)", "Roy (1)", "Ruell (1)", "Ruelle (3)", "Ruyant (1)", 
    "Ryckaert (18)", "Rycke (1)", "Ryckewaert (1)", "Ryde (1)", "Rygole (1)"
  ],
  "S": [
    "SAMOY (1)", "SEYNAEVE (1)", "SWANCAERTS (1)", "Sabbe (20)", "Saelens (6)", "Sagon (1)", 
    "Saintobin (1)", "Salomez (3)", "Salomon (1)", "Samijn (2)", "Samin (1)", "Samoy (7)", 
    "Samyn (6)", "Sanders (2)", "Santens (1)", "Sarasien (1)", "Sarre (2)", "Sarroo (2)", 
    "Schacht (1)", "Schalkens (1)", "Scharre (1)", "Schauvlieger (1)", "Scheemaekers (1)", 
    "Scheemakers (4)", "Scheir (6)", "Scheire (3)", "Scheldeman (12)", "Schelfhout (1)", "Schelpe (2)", 
    "Schelstraete (2)", "Schepens (2)", "Scherpereel (5)", "Schier (2)", "Schipper (1)", 
    "Schippers (7)", "Schoenemann (1)", "Schoofs (2)", "Schotte (4)", "Schouteten (3)", 
    "Schruyters (1)", "Schuddebeurs (2)", "Segaert (1)", "Segers (14)", "Seghers (6)", "Semal (2)", 
    "Semetier (2)", "Senaeve (2)", "Sequedin (1)", "Serroels (1)", "Serron (1)", "Serrus (1)", 
    "Serry (1)", "Sette (1)", "Severnels (1)", "Seynaeve (15)", "Seys (9)", "Sgraven (1)", 
    "Sillekens (1)", "Simoens (16)", "Simons (2)", "Simoskie (1)", "Simpelare (1)", "Sinnaeve (1)", 
    "Sinnesael (1)", "Sintobin (13)", "Sioen (4)", "Sittermans (1)", "Six (18)", "Slabbinck (1)", 
    "Slambrouck (1)", "Slock (11)", "Slootweg (19)", "Smalle (2)", "Smessaert (1)", "Smet (2)", 
    "Smets (3)", "Smits (1)", "Snauwaert (18)", "Snoeck (8)", "Snouck (1)", "Sobry (1)", "Soenen (6)", 
    "Soenens (1)", "Soens (6)", "Soetaert (10)", "Soete (1)", "Sohier (1)", "Soil (1)", "Sones (1)", 
    "Sonneville (4)", "Sorytou (1)", "Souphie (1)", "Spooren (3)", "Spriet (12)", "Spruytte (1)", 
    "Spyckinck (1)", "Staelens (5)", "Staes (9)", "Staesen (2)", "Stalins (1)", "Standaert (5)", 
    "Stassaert (1)", "Stecolorum (2)", "Steelandt (1)", "Steelant (2)", "Steen (10)", 
    "Steenbakker (1)", "Steenbeke (8)", "Steenkiste (2)", "Steeno (4)", "Steijaert (4)", 
    "Stevelinck (1)", "Stevesyns (2)", "Steyaert (13)", "Stockelman (2)", "Stolck (1)", "Stolk (1)", 
    "Stopano (3)", "Storme (7)", "Stove (5)", "Stragier (4)", "Strauven (1)", "Streso (2)", 
    "Strobbe (2)", "Strynckx (10)", "Stutins (2)", "Suikers (1)", "Suply (9)", "Supply (18)", 
    "Surmont (7)", "Swaenepoel (4)", "Symoens (4)", "Synave (3)", "Synhave (2)", "Sys (2)"
  ],
  "T": [
    "T'Joens (1)", "TERRYN (6)", "Tachez (1)", "Tack (13)", "Taets (1)", "Taillieu (2)", "Take (1)", 
    "Tallien (1)", "Tallir (1)", "Tamsin (14)", "Tamson (3)", "Tange (2)", "Tanghe (64)", 
    "Tavernier (3)", "Tayspil (4)", "Teerlinck (1)", "Teirlinck (1)", "Temmerman (4)", 
    "Temmermans (1)", "Termote (3)", "Terriere (4)", "Terrière (3)", "Terry (1)", "Terryn (15)", 
    "Teruwe (1)", "Teys (3)", "Theunynck (5)", "Thevelin (1)", "Thevissen (1)", "Thibau (1)", 
    "Thienpont (4)", "Thomas (1)", "Thorré (1)", "Thurman (6)", "Thybaut (1)", "Tiberghien (3)", 
    "Tietgat (4)", "Tijbaut (1)", "Tijtgadt (2)", "Tijtgat (3)", "Tilleman (1)", "Tillieu (1)", 
    "Timmerman (139)", "Tinel (27)", "Titelin (1)", "Titgat (1)", "Toebat (3)", "Tollet (1)", 
    "Tondat (1)", "Torman (8)", "Toulouse (1)", "Tourlousse (1)", "Touw (9)", "Trachet (2)", 
    "Trappeniers (1)", "Tratsaert (6)", "Tremerie (1)", "Treurniet (19)", "Tricot (3)", 
    "Trypsteen (12)", "Tuerloot (1)", "Turman (1)", "Turpijn (1)", "Tutin (13)", "Tutins (2)", 
    "Tuuten (8)", "Tuyttens (2)", "Tydtgat (1)", "Tys (1)", "Tytgat (14)", "Tyvaert (1)"
  ],
  "U": [
    "Ugalde (1)", "Uijtenbogaard (1)", "Uijthol (1)", "Uithol (1)", "Ulyn (1)", "Uyttenhove (4)", 
    "Uytterschaut (2)"
  ],
  "V": [
    "VANDAMME (1)", "VANDEGINSTE (4)", "VANDEKERCKHOVE (6)", "VANDENBULCKE (2)", "VANDENBUSSCHE (1)", 
    "VANDEWALLE (1)", "VANSEVEREN (1)", "VERHULST (1)", "VEROUSTRAETE (3)", "VEYS (1)", "VI (1)", 
    "VINCHANT (1)", "VINCKIER (6)", "VLAG (1)", "VYNCKE (1)", "Vaereman (1)", "Vaernewyck (1)", 
    "Valcke (3)", "Valckendebosch (1)", "Valencijn (1)", "Van Acker (7)", "Van Ackere (2)", 
    "Van Aelst (1)", "Van Allemeersch (1)", "Van Antwerpen (2)", "Van Ath (2)", "Van Axel (8)", 
    "Van Bastelaere (2)", "Van Bauwel (1)", "Van Beaumont (1)", "Van Becelaere (1)", "Van Belaan (1)", 
    "Van Belle (9)", "Van Belleghem (31)", "Van Besien (5)", "Van Biervliet (1)", "Van Brabant (3)", 
    "Van Braey (1)", "Van Bruane (4)", "Van Brugge (1)", "Van Bunder (1)", "Van Cadsant (2)", 
    "Van Caeneghem (1)", "Van Campenhout (1)", "Van Cauter (1)", "Van Cauwenberghe (3)", 
    "Van Coilge (5)", "Van Coille (2)", "Van Coillie (18)", "Van Colen (3)", "Van Collie (1)", 
    "Van Compernolle (6)", "Van Coylde (7)", "Van Craynest (1)", "Van Crombrugge (1)", 
    "Van Daele (10)", "Van Dale (1)", "Van Dam (1)", "Van Damme (37)", "Van De Cappelle (1)", 
    "Van De Driessche (1)", "Van De Ginste (1)", "Van De Hostine (5)", "Van De Keere (1)", 
    "Van De Kerchove (1)", "Van De Kerkhove (6)", "Van De Maele (6)", "Van De Male (10)", 
    "Van De Ostine (1)", "Van De Rosteyne (1)", "Van De Rostyne (1)", "Van De Velde (12)", 
    "Van De Walle (8)", "Van De Wiele (3)", "Van De Woestyne (1)", "Van Dekerkhove (1)", 
    "Van Den Abeele (1)", "Van Den Berg (2)", "Van Den Bergh (1)", "Van Den Berghe (3)", 
    "Van Den Bossche (2)", "Van Den Broeck (1)", "Van Den Broucke (5)", "Van Den Bussche (1)", 
    "Van Den Driessche (1)", "Van Den Fonteyne (2)", "Van Den Hende (4)", "Van Denbriele (1)", 
    "Van Der Eijk (1)", "Van Der Genst (10)", "Van Der Ginst (6)", "Van Der Hostine (1)", 
    "Van Der Meersch (1)", "Van Der Moest (1)", "Van Der Straeten (2)", "Van Dierendonck (1)", 
    "Van Dommele (8)", "Van Doorne (2)", "Van Drome (1)", "Van Durme (4)", "Van Dyck (3)", 
    "Van Eechoute (1)", "Van Eeckhout (3)", "Van Eeckhoutte (1)", "Van Eeke (4)", "Van Eenoo (6)", 
    "Van Eenooghe (1)", "Van Eesvelde (2)", "Van Eetvelde (1)", "Van Elslande (2)", "Van Essche (1)", 
    "Van Essene (2)", "Van Este (1)", "Van Eynde (1)", "Van Gampelaere (4)", "Van Gavere (1)", 
    "Van Geit (2)", "Van Gent (1)", "Van Gheluwe (4)", "Van Gleiberg (1)", "Van Goethem (1)", 
    "Van Groenweghe (1)", "Van Haecke (2)", "Van Haelewijn (2)", "Van Halewyn (2)", "Van Hamme (3)", 
    "Van Haute (1)", "Van Haverbeke (2)", "Van Hecke (30)", "Van Hee (2)", "Van Heedeghem (2)", 
    "Van Heesvelde (1)", "Van Heghe (4)", "Van Heirsele (2)", "Van Henegouwen (1)", 
    "Van Herrewege (1)", "Van Herreweghe (1)", "Van Herzeele (5)", "Van Heule (3)", "Van Hevel (3)", 
    "Van Heynen (1)", "Van Hijfte (264)", "Van Hoe (1)", "Van Hoecke (87)", "Van Hoete (1)", 
    "Van Holle (1)", "Van Hollebeke (2)", "Van Honacker (6)", "Van Hoorne (1)", "Van Hoorneweder (2)", 
    "Van Hooteghem (1)", "Van Hormewege (1)", "Van Houtte (1)", "Van Hulle (7)", "Van Hulse (1)", 
    "Van Hyfte (15)", "Van Isacker (2)", "Van Iseghem (15)", "Van Keirsbilck (1)", 
    "Van Kerrebroeck (8)", "Van Kesbilck (2)", "Van Kierlieu (1)", "Van Kinderen (1)", 
    "Van Laerberghe (2)", "Van Laere (2)", "Van Landeghem (4)", "Van Langendonck (3)", 
    "Van Langenhove (1)", "Van Leemput (1)", "Van Leeuwe (1)", "Van Lent (1)", "Van Lerberghe (18)", 
    "Van Lijssebettens (1)", "Van Loo (5)", "Van Luxembourg (1)", "Van Maele (24)", 
    "Van Maldeghem (4)", "Van Malderen (6)", "Van Meenen (5)", "Van Meenene (1)", "Van Meensel (1)", 
    "Van Meerbeeck (1)", "Van Meerhaeghe (1)", "Van Meessaert (1)", "Van Mellaerts (3)", 
    "Van Melle (8)", "Van Meulebrouck (2)", "Van Middelem (5)", "Van Moen (2)", "Van Moffaert (2)", 
    "Van Moortel (2)", "Van Morlanwlez (1)", "Van Nenis (2)", "Van Neste (9)", 
    "Van Nieuwenhuyse (3)", "Van Onacker (1)", "Van Ongevalle (1)", "Van Oost (5)", 
    "Van Ooteghem (2)", "Van Overschelde (2)", "Van Overvelt (4)", "Van Overwalle (1)", 
    "Van Pamel (1)", "Van Parijs (4)", "Van Parys (3)", "Van Peteghem (1)", "Van Pottelberghe (1)", 
    "Van Poucke (6)", "Van Quaethem (4)", "Van Quickelberge (1)", "Van Raes (1)", "Van Renteghem (1)", 
    "Van Rentergem (1)", "Van Renterghem (4)", "Van Rijckeghem (1)", "Van Rillaer (1)", 
    "Van Robaeys (1)", "Van Roeulx (4)", "Van Rysselberghe (1)", "Van Saemslagh (1)", 
    "Van Schoonacker (6)", "Van Sele (1)", "Van Spaendonck (1)", "Van Speijbroeck (1)", 
    "Van Speybroeck (6)", "Van Speybroek (2)", "Van Speybrouck (1)", "Van Steen (3)", 
    "Van Steenberge (1)", "Van Steenberghe (1)", "Van Steenbrugge (1)", "Van Steenkiste (42)", 
    "Van Suucke (1)", "Van Swynvoorde (1)", "Van Tente (1)", "Van Ter Straeten (1)", "Van Thienen (4)", 
    "Van Thournout (2)", "Van Tomme (1)", "Van Tyghem (1)", "Van Verdeghem (3)", "Van Vlaenderen (22)", 
    "Van Volsem (1)", "Van Vooren (31)", "Van Waes (40)", "Van Walleghem (4)", "Van Wassenhove (3)", 
    "Van Wildemeerch (1)", "Van Wildemeersch (1)", "Van Yper (2)", "Van Ypere (1)", "Van Zele (1)", 
    "Van Zeveren (33)", "Van Zielegem (2)", "Van Zwynvoorde (2)", "Van de Keere (2)", 
    "Van de Maele (13)", "Van de Moortel (2)", "Van de Poele (1)", "Van de Putte (2)", 
    "Van de Roestijne (1)", "Van de Roestyne (4)", "Van de Rostijne (67)", "Van de Rostijnen (1)", 
    "Van de Rostinne (1)", "Van de Veire (2)", "Van de Velde (2)", "Van de Voorde (1)", 
    "Van de Walle (2)", "Van de Woestijne (15)", "Van de Wostijne (1)", "Van de pitte (1)", 
    "Van den Abeele (2)", "Van den Berghe (10)", "Van den Bossche (3)", "Van den Broucke (2)", 
    "Van den Bulcke (2)", "Van den Driessche (2)", "Van den Hende (1)", "Van den bussche (1)", 
    "Van der Heeren (2)", "Van der Kinderen (2)", "Van der Spek (1)", "Vanacker (2)", "Vanackere (3)", 
    "Vanan (1)", "Vanantwerpen (3)", "Vanaverbeke (1)", "Vanbecelaere (2)", "Vanbelle (1)", 
    "Vanbesien (30)", "Vanbets (1)", "Vanbiervliet (1)", "Vanbreuseghem (1)", "Vancalbergh (1)", 
    "Vancayzeele (1)", "Vanclooster (1)", "Vancoille (1)", "Vancoillie (23)", "Vancompernolle (4)", 
    "Vancoppenolle (4)", "Vancouter (5)", "Vancoylde (1)", "Vancraynest (1)", "Vancuyck (2)", 
    "Vandaele (12)", "Vandamme (29)", "Vande Capelle (1)", "Vande Geinst (1)", "Vande Geinste (1)", 
    "Vande Kempinck (1)", "Vande Kerckhove (5)", "Vande Moortele (2)", "Vande Putte (4)", 
    "Vande Venne (1)", "Vande Walle (25)", "Vande Wiele (2)", "Vande Winckele (1)", 
    "Vandecandelaere (1)", "Vandecapelle (3)", "Vandecappelle (11)", "Vandecasteele (12)", 
    "Vandedoolaeghe (1)", "Vandeginste (23)", "Vandekeere (3)", "Vandekerckhove (28)", 
    "Vandekerkhove (4)", "Vandemaele (1)", "Vanden Abeele (1)", "Vanden Berghe (3)", 
    "Vanden Broeck (1)", "Vanden Bulcke (12)", "Vanden Bussche (4)", "Vanden Hecke (1)", 
    "Vanden Houtte (2)", "Vanden Neste (8)", "Vanden bussche (1)", "Vandenabeele (11)", 
    "Vandenameele (13)", "Vandenaweele (1)", "Vandenbempt (4)", "Vandenberghe (20)", 
    "Vandenborre (1)", "Vandenbroucke (28)", "Vandenbulcke (3)", "Vandenbussche (20)", 
    "Vandendorpe (4)", "Vandendriessche (7)", "Vandeneede (1)", "Vandenheede (1)", "Vandenneste (6)", 
    "Vandennoortgat (1)", "Vandenpanhuyzen (1)", "Vandenterghem (6)", "Vandenwal (1)", 
    "Vandenweghe (1)", "Vandepitte (4)", "Vandeputte (129)", "Vander Beke (3)", "Vander Elst (2)", 
    "Vander Geinst (2)", "Vander Geinste (2)", "Vander Gheinste (2)", "Vander Ghinste (1)", 
    "Vander Ginst (1)", "Vander Haegen (4)", "Vander Hamme (10)", "Vander Heeren (7)", 
    "Vander Hulst (3)", "Vander Kindert (1)", "Vander Schuere (1)", "Vander Vennet (1)", 
    "Vanderbeke (12)", "Vanderbeken (1)", "Vanderdonckt (5)", "Vanderghinst (4)", "Vandergucht (1)", 
    "Vanderhaeghe (2)", "Vanderhaeghen (2)", "Vanderhaghe (1)", "Vanderheere (1)", 
    "Vanderheeren (73)", "Vanderhelst (7)", "Vanderkimpen (3)", "Vandermeersch (3)", 
    "Vandermeersen (1)", "Vanderougstraete (1)", "Vanderplaetsen (1)", "Vandersteene (3)", 
    "Vanderstraete (1)", "Vandesteene (5)", "Vandevelde (5)", "Vandevijvere (5)", 
    "Vandevisscherie (3)", "Vandevivere (3)", "Vandevoorde (1)", "Vandevyver (1)", "Vandevyvere (7)", 
    "Vandewaetere (4)", "Vandewal (1)", "Vandewalle (45)", "Vandeweyer (1)", "Vandewiele (28)", 
    "Vandicke (1)", "Vandierendonck (2)", "Vandommele (17)", "Vandooren (1)", "Vandoorne (21)", 
    "Vandorpe (6)", "Vandromme (6)", "Vanduffel (3)", "Vandycke (1)", "Vanelslander (1)", 
    "Vanfleteren (1)", "Vangaveren (2)", "Vangheenberghe (1)", "Vangheluwe (1)", "Vangilbergen (1)", 
    "Vangroenweghe (5)", "Vangrootloon (1)", "Vanhaecke (1)", "Vanhaezebrouck (1)", "Vanhalewyn (2)", 
    "Vanhauwaert (112)", "Vanhaverbeke (33)", "Vanhecke (18)", "Vanhee (18)", "Vanheule (15)", 
    "Vanhollebeke (1)", "Vanhoorne (2)", "Vanhopplinus (1)", "Vanhove (2)", "Vanhulle (2)", 
    "Vanhyfte (1)", "Vankeersbilck (14)", "Vankeirsbilck (13)", "Vankerchove (1)", "Vankerckhove (2)", 
    "Vanlaer (1)", "Vanlandeghem (16)", "Vanlerberghe (10)", "Vanloocke (1)", "Vanloot (1)", 
    "Vanluchene (6)", "Vanmaele (1)", "Vanmarcke (1)", "Vanmeenen (5)", "Vanmellaerts (1)", 
    "Vanmoerkerk (2)", "Vanmoerkerke (9)", "Vanneste (26)", "Vannieukerke (2)", 
    "Vannieuwenhuyse (29)", "Vannieuwenhuyze (1)", "Vanooteghem (1)", "Vanoudenaerde (2)", 
    "Vanouplines (1)", "Vanoutrijve (1)", "Vanoutryve (4)", "Vanoverbeke (2)", "Vanoverschelde (2)", 
    "Vanpachtenbeke (1)", "Vanparys (1)", "Vanpeteghem (11)", "Vanpoucke (5)", "Vanpraet (1)", 
    "Vanraes (1)", "Vanrapenbusch (1)", "Vanrenterghem (1)", "Vanriet (2)", "Vanroose (1)", 
    "Vanrumbeke (1)", "Vanryckeghem (3)", "Vansevecote (5)", "Vanseveren (4)", "Vanslambroeck (1)", 
    "Vanslambrouck (4)", "Vansteelandt (2)", "Vansteendamme (1)", "Vansteene (1)", 
    "Vansteenhuyse (1)", "Vansteenkiste (35)", "Vanthoest (1)", "Vanthomme (1)", "Vanthournout (6)", 
    "Vanthuyne (5)", "Vantomme (2)", "Vantorre (1)", "Vantroyen (1)", "Vanvught (1)", 
    "Vanwalleghem (7)", "Vanwassenhove (3)", "Vanwonterghem (1)", "Vanwynsberghe (9)", 
    "Vanzieleghem (2)", "Veenman (2)", "Veldeman (1)", "Velghe (6)", "Vellemans (1)", "Vennekens (1)", 
    "Vens (13)", "Ver Mercke (2)", "Verbaenen (1)", "Verbanck (8)", "Verbeeck (1)", "Verbeest (1)", 
    "Verbeke (27)", "Verbeken (2)", "Verbelen (1)", "Verbeure (2)", "Verbeyst (2)", "Verbilt (5)", 
    "Verbrugge (5)", "Verbrugghe (26)", "Vercaemst (2)", "Vercaigne (11)", "Vercaingne (1)", 
    "Vercamert (1)", "Vercammen (3)", "Vercoutere (1)", "Vercruijsse (1)", "Vercruysse (12)", 
    "Verdegem (2)", "Verdeure (1)", "Verdonck (2)", "Verduyn (2)", "Vereecke (40)", "Vereecken (1)", 
    "Verelle (1)", "Verellen (1)", "Verelst (6)", "Verfailie (1)", "Verfaille (2)", "Verfaillie (41)", 
    "Vergote (10)", "Verguldt (1)", "Verhaegen (2)", "Verhaeghe (11)", "Verhaeghen (1)", 
    "Verhaest (4)", "Verhamme (3)", "Verheecke (2)", "Verheerde (1)", "Verheesen (1)", 
    "Verhegghe (2)", "Verheije (1)", "Verhelle (54)", "Verhelst (5)", "Verheye (5)", "Verhille (3)", 
    "Verhoest (4)", "Verhoeve (2)", "Verhoeven (5)", "Verholle (1)", "Verhoogstraete (1)", 
    "Verhoote (1)", "Verhoutaeve (1)", "Verhouttaeve (1)", "Verhoye (1)", "Verhulst (40)", 
    "Verkain (2)", "Verkerrest (1)", "Verkerst (1)", "Verkest (1)", "Verkyndert (2)", "Verla (2)", 
    "Verleden (1)", "Verledens (2)", "Verleye (2)", "Verlijnde (1)", "Verlinde (7)", "Verlodt (27)", 
    "Vermaat (22)", "Vermandel (13)", "Vermander (13)", "Vermandere (4)", "Vermarcke (10)", 
    "Vermaut (6)", "Vermeer (1)", "Vermeers (2)", "Vermeersch (35)", "Vermeesch (12)", 
    "Vermeire (11)", "Vermet (1)", "Vermeulen (39)", "Vermote (5)", "Vernackt (1)", "Vernock (8)", 
    "Veroye (1)", "Verplaetse (1)", "Verplancke (1)", "Verpoort (3)", "Verpoorten (1)", 
    "Verquoillie (1)", "Verriest (1)", "Verrij (11)", "Versavel (1)", "Versavele (1)", 
    "Verschaere (1)", "Verschaete (15)", "Verschaeve (7)", "Verschelde (4)", "Verscheure (18)", 
    "Verschoore (11)", "Verschoot (1)", "Verschorre (1)", "Verschuere (1)", "Versprille (2)", 
    "Verstaen (5)", "Verstraete (62)", "Verthoest (1)", "Vervaeke (5)", "Vervaeren (1)", 
    "Vervaet (2)", "Vervisch (5)", "Viaene (8)", "Viane (5)", "Victoor (1)", "Victor (3)", 
    "Vielle (2)", "Vierstraete (3)", "Vijncke (8)", "Villerius (12)", "Vincke (1)", "Vinckier (9)", 
    "Vinckt (1)", "Vindevoghel (1)", "Vingerling (2)", "Visser (1)", "Vitse (1)", "Vlaeminck (1)", 
    "Vlag (12)", "Vlamijnck (2)", "Vlaminck (4)", "Vlerick (1)", "Vlieghe (9)", "Vliet (1)", 
    "Vogelaar (1)", "Voisin (1)", "Volckaert (13)", "Voordeckers (1)", "Vormezeele (1)", 
    "Vreugdenhil (24)", "Vrij (33)", "Vrijmoet (1)", "Vroman (13)", "Vromman (2)", "Vromont (7)", 
    "Vuylsteke (7)", "Vyncke (8)", "Vynckier (3)", "Vyvey (1)"
  ],
  "W": [
    "WAEYENBERGH (3)", "WERBROUCK (14)", "Waeghe (1)", "Waelens (1)", "Waelput (1)", 
    "Waeyenbergh (4)", "Walgraeve (1)", "Wallaert (4)", "Wallaeys (1)", "Wallecam (1)", 
    "Walravens (3)", "Wancour (1)", "Wandels (1)", "Wanneyn (1)", "Wanzeele (2)", "Warlop (1)", 
    "Warnez (3)", "Waselynck (1)", "Wastijn (1)", "Wastyn (1)", "Waterinckx (1)", "Watteel (1)", 
    "Wattijn (1)", "Wattyn (1)", "Wautermartens (2)", "Wauters (11)", "Wautier (1)", "Wedaeghe (1)", 
    "Weewauters (1)", "Wellez (1)", "Wens (1)", "Werbrouck (84)", "Wernez (2)", "Werrebrouck (1)", 
    "Westdijk (4)", "Wiensberghe (1)", "Wijns (1)", "Wijtinck (2)", "Wilain (1)", "Wildemauwe (1)", 
    "Willaert (3)", "Willaeys (1)", "Willain (2)", "Wille (2)", "Willecomme (3)", "Willem (18)", 
    "Willems (7)", "Willemyns (8)", "Williame (1)", "Willikeyri (1)", "Willocqeau (2)", "Windels (70)", 
    "Windey (8)", "Wiseur (1)", "Wisse van Borssele (1)", "Wisselijnck (2)", "Witdoect (1)", 
    "Witdouck (1)", "Wittevronghel (3)", "Wittoek (1)", "Wittouck (2)", "Wojciechowska (1)", 
    "Wolfcaries (1)", "Wolfcarius (17)", "Wostyn (1)", "Woutermans (1)", "Wouters (3)", 
    "Wulfaert (1)", "Wulgaerts (3)", "Wullaert (6)", "Wybo (1)", "Wydaeghe (15)", "Wyffels (2)", 
    "Wylein (4)", "Wylin (1)", "Wyseur (10)", "Wytinck (3)"
  ],
  "Y": ["Yates (1)"],
  "Z": [
    "Zandijk (1)", "Zdanaviciute (1)", "Zeebroeck (1)", "Zeebrouck (10)", "Zeeuw (1)", "Zegers (1)", 
    "Zibers (1)", "Zmurek (1)", "Zonneveld (1)", "Zuliani (1)", "Zwiener (3)"
  ]
};

const bronnenNL = [
  { category: "Archieven", items: ["Rijksarchief Gent & Brugge", "Archives Départementales du Nord (Lille)", "Parochieregisters West-Vlaanderen", "Stadsarchief Izegem & Roeselare"] },
  { category: "Websites", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
  { category: "Literatuur", items: ["Historische studies Leie-regio", "Ambachtsregisters houtbewerking", "Coutume de Lille (rechtsstelsel)", "Demografische studies 17e-18e eeuw"] }
];

const bronnenFR = [
  { category: "Archives", items: ["Archives de l'État Gand & Bruges", "Archives Départementales du Nord (Lille)", "Registres paroissiaux Flandre Occidentale", "Archives municipales Izegem & Roulers"] },
  { category: "Sites Web", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
  { category: "Littérature", items: ["Études historiques région de la Lys", "Registres des métiers du bois", "Coutume de Lille (système juridique)", "Études démographiques 17e-18e siècle"] }
];

const Familie = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fullscreenPhoto, setFullscreenPhoto] = useState<{ src: string; title: string; desc: string; showNumbers?: boolean; photoId?: string } | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const { language } = useLanguage();

  const handleLabelClick = (e: React.MouseEvent, personId: number) => {
    e.stopPropagation();
    setSelectedPerson(selectedPerson === personId ? null : personId);
  };

  const getPersonName = (id: number | null): string | null => {
    if (id === null || !personenData[id]) return null;
    return personenData[id].name;
  };

  const getChildrenCount = (personId: number): number => {
    return Object.values(personenData).filter(
      person => person.fatherId === personId || person.motherId === personId
    ).length;
  };

  const getChildren = (personId: number): { id: number; name: string }[] => {
    return Object.entries(personenData)
      .filter(([_, person]) => person.fatherId === personId || person.motherId === personId)
      .map(([id, person]) => ({ id: Number(id), name: person.name }));
  };

  const getPartner = (personId: number): { id: number; name: string } | null => {
    // Zoek kinderen van deze persoon
    const children = Object.values(personenData).filter(
      person => person.fatherId === personId || person.motherId === personId
    );
    
    if (children.length === 0) return null;
    
    // Haal de partner ID uit het eerste kind
    const firstChild = children[0];
    const partnerId = firstChild.fatherId === personId ? firstChild.motherId : firstChild.fatherId;
    
    if (partnerId === null || !personenData[partnerId]) return null;
    
    return { id: partnerId, name: personenData[partnerId].name };
  };

  const letters = Object.keys(familienamenIndex);
  const totalNames = Object.values(familienamenIndex).reduce((acc, names) => acc + names.length, 0);

  const bronnenPCD = [
    { category: "Archives", items: ["Archives de l'État Gand & Bruges", "Archives Départementales du Nord (Lille)", "Registres paroissiaux Flandre Occidentale", "Archives municipales Izegem & Roulers"] },
    { category: "Sites Web", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
    { category: "Littérature", items: ["Études historiques région de la Lys", "Registres des métiers du bois", "Coutume de Lille (système juridique)", "Études démographiques 17e-18e siècle"] }
  ];
  
  const bronnenVLS = [
    { category: "Archieven", items: ["Ryksarchief Gent & Brugge", "Archives Départementales du Nord (Rijsel)", "Prochieregisters West-Vloandern", "Stadsarchief Izegem & Roeselare"] },
    { category: "Websites", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
    { category: "Literatuur", items: ["Historische studies Leie-regio", "Ambachtsregisters houtbewerking", "Coutume de Lille (rechtsstelsel)", "Demografische studies 17e-18e ieuw"] }
  ];
  
  const bronnenEN = [
    { category: "Archives", items: ["State Archives Ghent & Bruges", "Departmental Archives of the North (Lille)", "Parish Registers West Flanders", "City Archives Izegem & Roeselare"] },
    { category: "Websites", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
    { category: "Literature", items: ["Historical studies Lys region", "Woodworking guild registers", "Coutume de Lille (legal system)", "Demographic studies 17th-18th century"] }
  ];
  
  const bronnenES = [
    { category: "Archivos", items: ["Archivos del Estado Gante y Brujas", "Archivos Departamentales del Norte (Lille)", "Registros parroquiales Flandes Occidental", "Archivos municipales Izegem y Roeselare"] },
    { category: "Sitios Web", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
    { category: "Literatura", items: ["Estudios históricos región del Lys", "Registros de gremios de carpintería", "Coutume de Lille (sistema legal)", "Estudios demográficos siglos XVII-XVIII"] }
  ];
  
  const bronnenDE = [
    { category: "Archive", items: ["Staatsarchive Gent & Brügge", "Departementalarchive des Nordens (Lille)", "Kirchenbücher Westflandern", "Stadtarchive Izegem & Roeselare"] },
    { category: "Websites", items: ["Geneanet.org", "FamilySearch.org", "Rijksarchief.be", "MyHeritage.com"] },
    { category: "Literatur", items: ["Historische Studien Leie-Region", "Holzverarbeitungs-Zunftregister", "Coutume de Lille (Rechtssystem)", "Demographische Studien 17.-18. Jahrhundert"] }
  ];
  
  const bronnenMap: Record<string, typeof bronnenNL> = {
    nl: bronnenNL, fr: bronnenFR, pcd: bronnenPCD, vls: bronnenVLS, en: bronnenEN, es: bronnenES, de: bronnenDE
  };
  const bronnen = bronnenMap[language] || bronnenNL;

  const content = {
    nl: {
      subtitle: "Bijlagen & Documenten",
      title: "Familie & Index",
      clickToEnlarge: "💡 Klik om te vergroten en de namen en relaties te bekijken",
      father: "Vader:",
      mother: "Moeder:",
      partner: "Partner:",
      childrenOnPhoto: "Kinderen op foto:",
      parentsNotOnPhoto: "Ouders niet op foto",
      description: `Familieportretten, volledige huwelijksakte uit 1685, en een index van ${totalNames}+ familienamen`,
      reunion1962Title: "Familiereünie 1962",
      reunion1962Desc: "Grote familiereünie in Izegem, bij het ouderlijke huis in de Vandenbogaerdelaan 27.",
      reunion1966Title: "Familiereünie 1966",
      reunion1966Desc: "Izegem, familiereünie zomer 1966",
      reunion2024Title: "Familiereünie 2024",
      reunion2024Desc: "112 afstammelingen van Marcel Deforce & Magdalena Geldof kwamen samen in Het Prullenbos te Laarne.",
      gezinsfoto1943Title: "Gezinsfoto 10 januari 1943",
      gezinsfoto1943Desc: "Het gezin Marcel Deforce & Magdalena Geldof met hun 10 kinderen. De nummers verwijzen naar dezelfde personen op de foto van 1962.",
      akteTitle: "Notariële Huwelijksakte 18 april 1685",
      akteSubtitle: "Opgemaakt te Lille (Rijsel) door notaris",
      verschenenTitle: "Verschenen Personen",
      verschenenIntro: "Er verschenen persoonlijk voor de notaris:",
      bruidegom: "Hubert Deleforge, jonge ongehuwde man, wonend te Hallennes, bijgestaan door zijn vader en moeder Hubert Deleforge en Marie Grimbel, eveneens wonend te Hallennes, en door zijn oom Pierre Cordon uit Loos.",
      bruid: "Antoinette Follet, jonge ongehuwde vrouw, dochter van wijlen meester Jean Follet, wonend te Capinghem, bijgestaan door haar moeder Jeanne Lambin, haar broer Antoine Follet, chirurgijn te Lomme, en haar oom Laurens Ricourt.",
      giftenBruidegom: "Huwelijksgiften Bruidegomskant",
      giftenBruidegomIntro: "De ouders van de bruidegom schenken aan hun zoon:",
      giftenBruidegomItems: ["400 pond parisis", "3 rasières tarwe", "2 paar lakens (bedgarnituren)", "6 el lakenstof (~6 meter wollen stof)"],
      giftenBruidegomNote: "Dit is zijn volledig aandeel (\"portement\") in de erfenis.",
      giftenBruid: "Huwelijksgiften Bruidskant",
      giftenBruidIntro: "De moeder van de bruid, Jeanne Lambin, schenkt haar dochter:",
      giftenBruidItems: ["400 pond parisis", "2 paar lijkwaden (linnen doeken)", "Één paar van grof linnen, één van fijn linnen", "6 servetten", "Kleding en versiering voor de trouwdag"],
      overlijdenTitle: "Voorwaarden bij Overlijden",
      overlijdenHubert: "Als Hubert vóór Antoinette overlijdt:",
      overlijdenHubertItems: ["Antoinette behoudt al haar kleding, juwelen en bezittingen", "Haar bruidsschat van 400 pond wordt teruggegeven", "Zij ontvangt 134 pond parisis als weduwegift (douaire)", "Naar keuze: in nalatenschap blijven óf vertrekken met eigen bezit"],
      overlijdenAntoinette: "Als Antoinette vóór Hubert overlijdt zonder kinderen:",
      overlijdenAntoinetteItems: ["De weduwnaar moet 268 pond parisis terugbetalen aan haar erfgenamen", "Dit is ongeveer twee derde van haar inbreng"],
      grondbezitTitle: "Grondbezit en Pacht",
      grondbezitText: "De moeder van de bruid, Jeanne Lambin, kent aan haar dochter het huurrecht (bail) toe van een hoeve van twee bonniers en tien centièmes (ongeveer 2,5 hectare), eigendom van de heer de La Haye, die zij zelf in pacht had. Antoinette en haar toekomstige man mogen die pacht voortzetten.",
      slotTitle: "Slotclausules",
      slotIntro: "De akte wordt verleden te Lille op 18 april 1685, in aanwezigheid van:",
      slotGetuigen: ["Jacques Deleforge, zoon van wijlen Michel (getuige)", "Simon Cauche, arbeider te Capinghem (getuige)"],
      slotMarge: "In de marge: De ouders verklaren dat kinderen uit dit huwelijk volledig zullen delen in nalatenschappen, ook boven ooms en tantes, in afwijking van de gewoonte.",
      indexTitle: "Bijlage 2: Volledige Index van Familienamen",
      indexSubtitle: "familienamen gedocumenteerd in de stamboom (bron: Geneanet)",
      meestVoorkomend: "Meest voorkomend:",
      namen: "namen",
      klikOmTeBekijken: "Klik op een letter hierboven om alle familienamen te bekijken",
      bronnenTitle: "Bijlage 3: Geraadpleegde Bronnen",
      stats: [
        { label: "Familienamen", value: `${totalNames}+` },
        { label: "Generaties", value: "15+" },
        { label: "Jaren onderzoek", value: "600" },
        { label: "Documenten", value: "500+" },
      ],
      nawoordTitle: "Een levend document",
      nawoordP1: "Dit familieverhaal is geen eindpunt, maar een startpunt. De komende generaties worden uitgenodigd om verder te zoeken: nieuwe gegevens toe te voegen, bronnen op te diepen, verbanden scherper te trekken.",
      nawoordP2: "De stamboom op MyHeritage bevat inmiddels duizenden namen en honderden documenten. Veel vragen blijven onbeantwoord: Waarom precies trok Hubert naar Izegem? Welke contacten had hij daar al? Wat gebeurde er met de achtergebleven familieleden?",
      nawoordQuote: "\"Dit is geen volledige familiegeschiedenis — het is een verzameling verhalen over de mensen die ons voorafgingen.\""
    },
    fr: {
      subtitle: "Annexes & Documents",
      title: "Famille & Index",
      clickToEnlarge: "💡 Cliquez pour agrandir et voir les noms et relations",
      father: "Père:",
      mother: "Mère:",
      partner: "Partenaire:",
      childrenOnPhoto: "Enfants sur la photo:",
      parentsNotOnPhoto: "Parents pas sur la photo",
      description: `Portraits de famille, acte de mariage complet de 1685, et un index de ${totalNames}+ noms de famille`,
      reunion1962Title: "Réunion de famille 1962",
      reunion1962Desc: "Grande réunion de famille à Izegem, près de la maison parentale au Vandenbogaerdelaan 27.",
      reunion1966Title: "Réunion de famille 1966",
      reunion1966Desc: "Izegem, réunion de famille été 1966",
      reunion2024Title: "Réunion de famille 2024",
      reunion2024Desc: "112 descendants de Marcel Deforce & Magdalena Geldof se sont réunis à Het Prullenbos à Laarne.",
      gezinsfoto1943Title: "Photo de famille 10 janvier 1943",
      gezinsfoto1943Desc: "La famille Marcel Deforce & Magdalena Geldof avec leurs 10 enfants. Les numéros renvoient aux mêmes personnes sur la photo de 1962.",
      akteTitle: "Acte de Mariage Notarié 18 avril 1685",
      akteSubtitle: "Établi à Lille par le notaire",
      verschenenTitle: "Personnes Présentes",
      verschenenIntro: "Ont comparu personnellement devant le notaire:",
      bruidegom: "Hubert Deleforge, jeune homme célibataire, demeurant à Hallennes, assisté de son père et de sa mère Hubert Deleforge et Marie Grimbel, également demeurant à Hallennes, et de son oncle Pierre Cordon de Loos.",
      bruid: "Antoinette Follet, jeune femme célibataire, fille de feu maître Jean Follet, demeurant à Capinghem, assistée de sa mère Jeanne Lambin, de son frère Antoine Follet, chirurgien à Lomme, et de son oncle Laurens Ricourt.",
      giftenBruidegom: "Dons de Mariage Côté Époux",
      giftenBruidegomIntro: "Les parents du marié offrent à leur fils:",
      giftenBruidegomItems: ["400 livres parisis", "3 rasières de blé", "2 paires de draps (garnitures de lit)", "6 aunes de tissu de laine (~6 mètres)"],
      giftenBruidegomNote: "C'est sa part complète (\"portement\") dans l'héritage.",
      giftenBruid: "Dons de Mariage Côté Épouse",
      giftenBruidIntro: "La mère de la mariée, Jeanne Lambin, offre à sa fille:",
      giftenBruidItems: ["400 livres parisis", "2 paires de linceuls (toiles de lin)", "Une paire de lin grossier, une de lin fin", "6 serviettes", "Vêtements et ornements pour le jour du mariage"],
      overlijdenTitle: "Conditions en Cas de Décès",
      overlijdenHubert: "Si Hubert décède avant Antoinette:",
      overlijdenHubertItems: ["Antoinette conserve tous ses vêtements, bijoux et biens", "Sa dot de 400 livres lui est restituée", "Elle reçoit 134 livres parisis comme douaire", "Au choix: rester dans la succession ou partir avec ses biens"],
      overlijdenAntoinette: "Si Antoinette décède avant Hubert sans enfants:",
      overlijdenAntoinetteItems: ["Le veuf doit rembourser 268 livres parisis à ses héritiers", "C'est environ deux tiers de son apport"],
      grondbezitTitle: "Propriété Foncière et Bail",
      grondbezitText: "La mère de la mariée, Jeanne Lambin, accorde à sa fille le droit de bail d'une ferme de deux bonniers et dix centièmes (environ 2,5 hectares), propriété du seigneur de La Haye, qu'elle tenait elle-même en bail. Antoinette et son futur mari peuvent continuer ce bail.",
      slotTitle: "Clauses Finales",
      slotIntro: "L'acte est passé à Lille le 18 avril 1685, en présence de:",
      slotGetuigen: ["Jacques Deleforge, fils de feu Michel (témoin)", "Simon Cauche, ouvrier à Capinghem (témoin)"],
      slotMarge: "En marge: Les parents déclarent que les enfants de ce mariage partageront pleinement les successions, même au-dessus des oncles et tantes, par dérogation à la coutume.",
      indexTitle: "Annexe 2: Index Complet des Noms de Famille",
      indexSubtitle: "noms de famille documentés dans l'arbre généalogique (source: Geneanet)",
      meestVoorkomend: "Les plus fréquents:",
      namen: "noms",
      klikOmTeBekijken: "Cliquez sur une lettre ci-dessus pour voir tous les noms de famille",
      bronnenTitle: "Annexe 3: Sources Consultées",
      stats: [
        { label: "Noms de famille", value: `${totalNames}+` },
        { label: "Générations", value: "15+" },
        { label: "Années de recherche", value: "600" },
        { label: "Documents", value: "500+" },
      ],
      nawoordTitle: "Un document vivant",
      nawoordP1: "Cette histoire familiale n'est pas une fin, mais un début. Les générations futures sont invitées à poursuivre les recherches: ajouter de nouvelles données, découvrir des sources, affiner les liens.",
      nawoordP2: "L'arbre généalogique sur MyHeritage contient désormais des milliers de noms et des centaines de documents. De nombreuses questions restent sans réponse: Pourquoi exactement Hubert est-il allé à Izegem? Quels contacts y avait-il déjà? Qu'est-il arrivé aux membres de la famille restés?",
      nawoordQuote: "\"Ce n'est pas une histoire familiale complète — c'est une collection de récits sur les personnes qui nous ont précédés.\""
    },
    pcd: {
      subtitle: "Annekes & Documints",
      title: "Famille & Indéque",
      clickToEnlarge: "💡 Cliquez pour agrandir et voér les noms et relationes",
      father: "Pére:",
      mother: "Mére:",
      partner: "Partenaire:",
      childrenOnPhoto: "Éfants sus l'photo:",
      parentsNotOnPhoto: "Parints pas sus l'photo",
      description: `Portraits d'famille, acte d'mariage complet d'1685, et in indéque éd ${totalNames}+ noms d'famille`,
      reunion1962Title: "Réunion familiére 1962",
      reunion1962Desc: "Grande réunion familiére à Izegem, près d'la mason parentale au Vandenbogaerdelaan 27.",
      reunion1966Title: "Réunion familiére 1966",
      reunion1966Desc: "Izegem, réunion familiére été 1966",
      reunion2024Title: "Réunion familiére 2024",
      reunion2024Desc: "112 deschindants d'Marcel Deforce & Magdalena Geldof s'sont réunis à Het Prullenbos à Laarne.",
      gezinsfoto1943Title: "Photo d'famille 10 janvié 1943",
      gezinsfoto1943Desc: "L'famille Marcel Deforce & Magdalena Geldof aveuc leus 10 éfants. Les numèros renvoyent aux mêmes personnes sus l'photo d'1962.",
      akteTitle: "Acte d'Mariage Notarié 18 avril 1685",
      akteSubtitle: "Établi à Lille par l'notaire",
      verschenenTitle: "Personnes Présintes",
      verschenenIntro: "Ont comparu personellemint devant l'notaire:",
      bruidegom: "Hubert Deleforge, jonne homme célibataire, demeurant à Hallennes, assisté d'sin pére et d'sa mére Hubert Deleforge et Marie Grimbel, égalemint demeurant à Hallennes, et d'sin oncle Pierre Cordon d'Loos.",
      bruid: "Antoinette Follet, jonne femme célibataire, fille d'feu maître Jean Follet, demeurant à Capinghem, assistée d'sa mére Jeanne Lambin, d'sin fréte Antoine Follet, chirurgien à Lomme, et d'sin oncle Laurens Ricourt.",
      giftenBruidegom: "Dons d'Mariage Côté Époux",
      giftenBruidegomIntro: "Les parints du marié offrint à leu fils:",
      giftenBruidegomItems: ["400 livres parisis", "3 rasières d'blé", "2 paires d'draps (garnitures d'lit)", "6 aunes d'tissu d'laine (~6 métres)"],
      giftenBruidegomNote: "Ch'est sa part compléte (\"portement\") dins l'héritage.",
      giftenBruid: "Dons d'Mariage Côté Épouse",
      giftenBruidIntro: "La mére d'la mariée, Jeanne Lambin, offre à s'fille:",
      giftenBruidItems: ["400 livres parisis", "2 paires d'linceuls (toiles d'lin)", "Eune paire d'lin grossier, eune d'lin fin", "6 serviettes", "Vêtimints et ornimints pour l'jour du mariage"],
      overlijdenTitle: "Conditiones in Cas d'Décés",
      overlijdenHubert: "Si Hubert décéde avant Antoinette:",
      overlijdenHubertItems: ["Antoinette conserve tous ses vêtimints, bijoux et biens", "Sa dot d'400 livres lui est restituée", "Elle reçoit 134 livres parisis comme douaire", "Au choés: rester dins la succession ou partir aveuc ses biens"],
      overlijdenAntoinette: "Si Antoinette décéde avant Hubert sans éfants:",
      overlijdenAntoinetteItems: ["L'veuf doit rimbourser 268 livres parisis à ses héritiers", "Ch'est environ deux tiers d'sin apport"],
      grondbezitTitle: "Propriété Fonciére et Bail",
      grondbezitText: "La mére d'la mariée, Jeanne Lambin, accorde à s'fille l'droit d'bail d'eune ferme d'deux bonniers et dix centiémes (environ 2,5 hectares), propriété du seigneur d'La Haye, qu'elle t'nos elle-méme in bail. Antoinette et sin futur mari pouvont continuer ch'bail.",
      slotTitle: "Clauses Finales",
      slotIntro: "L'acte est passé à Lille l'18 avril 1685, in présince d':",
      slotGetuigen: ["Jacques Deleforge, fils d'feu Michel (témoin)", "Simon Cauche, ouvrier à Capinghem (témoin)"],
      slotMarge: "In marge: Les parints déclarint qu'les éfants d'ch'mariage partagiront plénemint les successiones, méme au-d'ssus des oncles et tantes, par dérogation à la coutume.",
      indexTitle: "Anneke 2: Indéque Complet des Noms d'Famille",
      indexSubtitle: "noms d'famille documintés dins l'abe généalogique (source: Geneanet)",
      meestVoorkomend: "Les pus fréquints:",
      namen: "noms",
      klikOmTeBekijken: "Cliquez sus eune lettre chi-d'ssus pour voér tous les noms d'famille",
      bronnenTitle: "Anneke 3: Sources Consultées",
      stats: [
        { label: "Noms d'famille", value: `${totalNames}+` },
        { label: "Générationes", value: "15+" },
        { label: "Années d'récherche", value: "600" },
        { label: "Documints", value: "500+" },
      ],
      nawoordTitle: "In documint vivant",
      nawoordP1: "Chte histoère familiére n'est point eune fin, mais in début. Les générationes à v'nir sont invitées à poursuive les récherches: ajouter éd' nouvelles données, découvrir des sources, affiner les lins.",
      nawoordP2: "L'abe généalogique sus MyHeritage contint désormais des miés d'noms et des chintaines d'documints. D'nombreuses questiones restent sans réponse: Pourcoi exactemint Hubert est-i allé à Izegem? Quels contacs y avos-ti déjà? Qu'est-c'qui est arrivé aux mimbres d'la famille restés?",
      nawoordQuote: "\"Ch'n'est point eune histoère familiére compléte — ch'est eune collection d'récits sus les gins qu'i nous ont précédé.\""
    },
    vls: {
      subtitle: "Bijloagen & Papieren",
      title: "Familie & Index",
      clickToEnlarge: "💡 Klikt om te vergrotn en de noamen en relaties te bekykn",
      father: "Voader:",
      mother: "Moeder:",
      partner: "Partner:",
      childrenOnPhoto: "Kinders up de foto:",
      parentsNotOnPhoto: "Ouders nie up de foto",
      description: `Familieportretten, 't volledig trouwcontract van 1685, en ne index van ${totalNames}+ familienamen`,
      reunion1962Title: "Familiereünie 1962",
      reunion1962Desc: "Groote familiereünie in Izegem, bij 't ouderluk huis an de Vandenbogaerdelaan 27.",
      reunion1966Title: "Familiereünie 1966",
      reunion1966Desc: "Izegem, familiereünie zomer 1966",
      reunion2024Title: "Familiereünie 2024",
      reunion2024Desc: "112 noazoaten van Marcel Deforce & Magdalena Geldof woaren same in Het Prullenbos in Loarne.",
      gezinsfoto1943Title: "Gezinsfoto 10 januoari 1943",
      gezinsfoto1943Desc: "'t Gezin Marcel Deforce & Magdalena Geldof mee hun 10 kinders. De numers verwyzn noa dezelfde minschen up de foto van 1962.",
      akteTitle: "Notarieel Trouwcontract 18 april 1685",
      akteSubtitle: "Opgestyld in Rijsel deur de notaris",
      verschenenTitle: "Verschenen Minschen",
      verschenenIntro: "Ze zyn perseunluk verschenen veur de notaris:",
      bruidegom: "Hubert Deleforge, jonkman, woenende te Hallennes, bystoan deur zyn voader en zyn moeder Hubert Deleforge en Marie Grimbel, ook woenende te Hallennes, en deur zyn nonkel Pierre Cordon van Loos.",
      bruid: "Antoinette Follet, jonge dochter, dochter van wylen meester Jean Follet, woenende te Capinghem, bystoan deur hoar moeder Jeanne Lambin, hoar broer Antoine Follet, chirurgyn te Lomme, en hoar nonkel Laurens Ricourt.",
      giftenBruidegom: "Trouwgiften Bruidegomskant",
      giftenBruidegomIntro: "De ouders van de bruidegom geevn an hun zeune:",
      giftenBruidegomItems: ["400 pond parisis", "3 rasieren korenaore", "2 poaren loakens (bedgoed)", "6 ellen wollengoet (~6 meters)"],
      giftenBruidegomNote: "Da es zyn volledig deel (\"portement\") in 't erfenis.",
      giftenBruid: "Trouwgiften Bruidskant",
      giftenBruidIntro: "De moeder van de bruud, Jeanne Lambin, gift an hoar dochter:",
      giftenBruidItems: ["400 pond parisis", "2 poaren lykwoaden (lynen doeken)", "Ien poar grof linnen, ien poar fyn linnen", "6 servietten", "Klieren en opschik veur de trouwdag"],
      overlijdenTitle: "Kondities by Overlyden",
      overlijdenHubert: "A Hubert doodgoat veur Antoinette:",
      overlijdenHubertItems: ["Antoinette behout al hoar klieren, juwelen en goed", "Hoar bruudsschat van 400 pond wordt teruggegeven", "Zy krygt 134 pond parisis als weduwegift", "Noar keuze: in de erfenisse bluven of me hoar eigen goed vertrekken"],
      overlijdenAntoinette: "A Antoinette doodgoat veur Hubert zonder kinders:",
      overlijdenAntoinetteItems: ["De weduwnoar moet 268 pond parisis teruggeven an hoar erfgenoamen", "Da es ongeveer twee derden van hoar inbreng"],
      grondbezitTitle: "Grond en Pacht",
      grondbezitText: "De moeder van de bruud, Jeanne Lambin, gift an hoar dochter 't pachtrecht van ne hoeve van twee bonniers en tien centiémes (circa 2,5 hectoare), eigendom van de heer de La Haye, die zy zelf in pacht had. Antoinette en hoar toekomstige man moogn die pacht voortzettn.",
      slotTitle: "Slotbepoalingsn",
      slotIntro: "D'akte werd verleden te Rijsel up 18 april 1685, in de anwezigheid van:",
      slotGetuigen: ["Jacques Deleforge, zeune van wylen Michel (getuuge)", "Simon Cauche, werkman te Capinghem (getuuge)"],
      slotMarge: "In de marge: D'ouders verkloaren da de kinders uut dit huweluk volledig zulln deiln in de erfenissen, ook boven nonkels en tantes, in afwyking van de gewoente.",
      indexTitle: "Bijloage 2: Volledigen Index van Familienamen",
      indexSubtitle: "familienamen gedocumenteerd in de stamboom (bron: Geneanet)",
      meestVoorkomend: "Meest veurkoamend:",
      namen: "noamen",
      klikOmTeBekijken: "Klikt up ne letter hierbooven om alle familienamen te bekykn",
      bronnenTitle: "Bijloage 3: Geraodpleegde Bronnen",
      stats: [
        { label: "Familienamen", value: `${totalNames}+` },
        { label: "Generoaties", value: "15+" },
        { label: "Joar onderzoek", value: "600" },
        { label: "Papieren", value: "500+" },
      ],
      nawoordTitle: "Ne levend document",
      nawoordP1: "Dit familieverhaal es geen eindpunt, mo ne starthoak. De volgende generoaties wordn uutgenodigd om voader te zoekn: nieuwe gegevens by te voegn, bronnen op te delvn, verbandn scherper te trekkn.",
      nawoordP2: "De stamboom up MyHeritage bevat intussen duuzenden noamen en honderden papieren. Vele vroagn bluven onbeantwoord: Woerom just trok Hubert noar Izegem? Welke contaktn had 'n doar al? Wat es gebeerd me de achtergebleven familieleden?",
      nawoordQuote: "\"Dit es geen volledige familiegeschiedenis — 't es ne verzoameling verhaoln over de minschen die veur ons geleeft enn.\""
    },
    en: {
      subtitle: "Appendices & Documents",
      title: "Family & Index",
      clickToEnlarge: "💡 Click to enlarge and view names and relations",
      father: "Father:",
      mother: "Mother:",
      partner: "Partner:",
      childrenOnPhoto: "Children in photo:",
      parentsNotOnPhoto: "Parents not in photo",
      description: `Family portraits, complete marriage contract from 1685, and an index of ${totalNames}+ family names`,
      reunion1962Title: "Family Reunion 1962",
      reunion1962Desc: "Large family reunion in Izegem, at the parental home at Vandenbogaerdelaan 27.",
      reunion1966Title: "Family Reunion 1966",
      reunion1966Desc: "Izegem, family reunion summer 1966",
      reunion2024Title: "Family Reunion 2024",
      reunion2024Desc: "112 descendants of Marcel Deforce & Magdalena Geldof gathered at Het Prullenbos in Laarne.",
      gezinsfoto1943Title: "Family Photo January 10, 1943",
      gezinsfoto1943Desc: "The family of Marcel Deforce & Magdalena Geldof with their 10 children. The numbers refer to the same persons in the 1962 photo.",
      akteTitle: "Notarial Marriage Contract April 18, 1685",
      akteSubtitle: "Drawn up in Lille by the notary",
      verschenenTitle: "Persons Present",
      verschenenIntro: "The following appeared personally before the notary:",
      bruidegom: "Hubert Deleforge, young unmarried man, residing in Hallennes, assisted by his father and mother Hubert Deleforge and Marie Grimbel, also residing in Hallennes, and by his uncle Pierre Cordon from Loos.",
      bruid: "Antoinette Follet, young unmarried woman, daughter of the late master Jean Follet, residing in Capinghem, assisted by her mother Jeanne Lambin, her brother Antoine Follet, surgeon in Lomme, and her uncle Laurens Ricourt.",
      giftenBruidegom: "Wedding Gifts Groom's Side",
      giftenBruidegomIntro: "The groom's parents give their son:",
      giftenBruidegomItems: ["400 pounds parisis", "3 rasières of wheat", "2 pairs of sheets (bed linens)", "6 ells of woolen cloth (~6 meters)"],
      giftenBruidegomNote: "This is his full share (\"portement\") in the inheritance.",
      giftenBruid: "Wedding Gifts Bride's Side",
      giftenBruidIntro: "The bride's mother, Jeanne Lambin, gives her daughter:",
      giftenBruidItems: ["400 pounds parisis", "2 pairs of shrouds (linen cloths)", "One pair of coarse linen, one of fine linen", "6 napkins", "Clothing and adornments for the wedding day"],
      overlijdenTitle: "Conditions Upon Death",
      overlijdenHubert: "If Hubert dies before Antoinette:",
      overlijdenHubertItems: ["Antoinette keeps all her clothing, jewelry and possessions", "Her dowry of 400 pounds is returned", "She receives 134 pounds parisis as widow's dower", "Her choice: stay in the estate or leave with her own property"],
      overlijdenAntoinette: "If Antoinette dies before Hubert without children:",
      overlijdenAntoinetteItems: ["The widower must repay 268 pounds parisis to her heirs", "This is approximately two-thirds of her contribution"],
      grondbezitTitle: "Land Ownership and Lease",
      grondbezitText: "The bride's mother, Jeanne Lambin, grants her daughter the lease rights to a farm of two bonniers and ten centièmes (approximately 2.5 hectares), property of Mr. de La Haye, which she herself held in lease. Antoinette and her future husband may continue this lease.",
      slotTitle: "Final Clauses",
      slotIntro: "The deed was executed in Lille on April 18, 1685, in the presence of:",
      slotGetuigen: ["Jacques Deleforge, son of the late Michel (witness)", "Simon Cauche, laborer in Capinghem (witness)"],
      slotMarge: "In the margin: The parents declare that children from this marriage will fully share in inheritances, even above uncles and aunts, deviating from custom.",
      indexTitle: "Appendix 2: Complete Index of Family Names",
      indexSubtitle: "family names documented in the family tree (source: Geneanet)",
      meestVoorkomend: "Most common:",
      namen: "names",
      klikOmTeBekijken: "Click on a letter above to view all family names",
      bronnenTitle: "Appendix 3: Consulted Sources",
      stats: [
        { label: "Family names", value: `${totalNames}+` },
        { label: "Generations", value: "15+" },
        { label: "Years of research", value: "600" },
        { label: "Documents", value: "500+" },
      ],
      nawoordTitle: "A living document",
      nawoordP1: "This family story is not an endpoint, but a starting point. Future generations are invited to continue searching: adding new data, uncovering sources, sharpening connections.",
      nawoordP2: "The family tree on MyHeritage now contains thousands of names and hundreds of documents. Many questions remain unanswered: Why exactly did Hubert go to Izegem? What contacts did he already have there? What happened to the family members left behind?",
      nawoordQuote: "\"This is not a complete family history — it is a collection of stories about the people who came before us.\""
    },
    es: {
      subtitle: "Anexos y Documentos",
      title: "Familia e Índice",
      clickToEnlarge: "💡 Haga clic para ampliar y ver nombres y relaciones",
      father: "Padre:",
      mother: "Madre:",
      partner: "Pareja:",
      childrenOnPhoto: "Hijos en la foto:",
      parentsNotOnPhoto: "Padres no en la foto",
      description: `Retratos familiares, contrato matrimonial completo de 1685, e índice de ${totalNames}+ apellidos`,
      reunion1962Title: "Reunión Familiar 1962",
      reunion1962Desc: "Gran reunión familiar en Izegem, en la casa paterna en Vandenbogaerdelaan 27.",
      reunion1966Title: "Reunión Familiar 1966",
      reunion1966Desc: "Izegem, reunión familiar verano 1966",
      reunion2024Title: "Reunión Familiar 2024",
      reunion2024Desc: "112 descendientes de Marcel Deforce y Magdalena Geldof se reunieron en Het Prullenbos en Laarne.",
      gezinsfoto1943Title: "Foto Familiar 10 de enero de 1943",
      gezinsfoto1943Desc: "La familia Marcel Deforce & Magdalena Geldof con sus 10 hijos. Los números se refieren a las mismas personas en la foto de 1962.",
      akteTitle: "Contrato Matrimonial Notarial 18 de abril de 1685",
      akteSubtitle: "Redactado en Lille por el notario",
      verschenenTitle: "Personas Presentes",
      verschenenIntro: "Comparecieron personalmente ante el notario:",
      bruidegom: "Hubert Deleforge, joven soltero, residente en Hallennes, asistido por su padre y madre Hubert Deleforge y Marie Grimbel, también residentes en Hallennes, y por su tío Pierre Cordon de Loos.",
      bruid: "Antoinette Follet, joven soltera, hija del difunto maestro Jean Follet, residente en Capinghem, asistida por su madre Jeanne Lambin, su hermano Antoine Follet, cirujano en Lomme, y su tío Laurens Ricourt.",
      giftenBruidegom: "Regalos de Boda Lado del Novio",
      giftenBruidegomIntro: "Los padres del novio dan a su hijo:",
      giftenBruidegomItems: ["400 libras parisis", "3 rasières de trigo", "2 pares de sábanas (ropa de cama)", "6 codos de tela de lana (~6 metros)"],
      giftenBruidegomNote: "Esta es su parte completa (\"portement\") en la herencia.",
      giftenBruid: "Regalos de Boda Lado de la Novia",
      giftenBruidIntro: "La madre de la novia, Jeanne Lambin, da a su hija:",
      giftenBruidItems: ["400 libras parisis", "2 pares de sudarios (telas de lino)", "Un par de lino grueso, uno de lino fino", "6 servilletas", "Ropa y adornos para el día de la boda"],
      overlijdenTitle: "Condiciones en Caso de Fallecimiento",
      overlijdenHubert: "Si Hubert muere antes que Antoinette:",
      overlijdenHubertItems: ["Antoinette conserva toda su ropa, joyas y posesiones", "Se le devuelve su dote de 400 libras", "Recibe 134 libras parisis como dote de viuda", "A su elección: quedarse en la herencia o irse con sus propios bienes"],
      overlijdenAntoinette: "Si Antoinette muere antes que Hubert sin hijos:",
      overlijdenAntoinetteItems: ["El viudo debe devolver 268 libras parisis a sus herederos", "Esto es aproximadamente dos tercios de su aportación"],
      grondbezitTitle: "Propiedad de Tierra y Arrendamiento",
      grondbezitText: "La madre de la novia, Jeanne Lambin, otorga a su hija los derechos de arrendamiento de una granja de dos bonniers y diez centièmes (aproximadamente 2,5 hectáreas), propiedad del señor de La Haye, que ella misma tenía en arrendamiento. Antoinette y su futuro esposo pueden continuar este arrendamiento.",
      slotTitle: "Cláusulas Finales",
      slotIntro: "El acta fue otorgada en Lille el 18 de abril de 1685, en presencia de:",
      slotGetuigen: ["Jacques Deleforge, hijo del difunto Michel (testigo)", "Simon Cauche, trabajador en Capinghem (testigo)"],
      slotMarge: "En el margen: Los padres declaran que los hijos de este matrimonio compartirán plenamente las herencias, incluso por encima de tíos y tías, desviándose de la costumbre.",
      indexTitle: "Anexo 2: Índice Completo de Apellidos",
      indexSubtitle: "apellidos documentados en el árbol genealógico (fuente: Geneanet)",
      meestVoorkomend: "Más comunes:",
      namen: "nombres",
      klikOmTeBekijken: "Haga clic en una letra arriba para ver todos los apellidos",
      bronnenTitle: "Anexo 3: Fuentes Consultadas",
      stats: [
        { label: "Apellidos", value: `${totalNames}+` },
        { label: "Generaciones", value: "15+" },
        { label: "Años de investigación", value: "600" },
        { label: "Documentos", value: "500+" },
      ],
      nawoordTitle: "Un documento vivo",
      nawoordP1: "Esta historia familiar no es un punto final, sino un punto de partida. Se invita a las generaciones futuras a continuar buscando: agregar nuevos datos, descubrir fuentes, afinar conexiones.",
      nawoordP2: "El árbol genealógico en MyHeritage ahora contiene miles de nombres y cientos de documentos. Muchas preguntas quedan sin respuesta: ¿Por qué exactamente fue Hubert a Izegem? ¿Qué contactos tenía ya allí? ¿Qué pasó con los familiares que se quedaron?",
      nawoordQuote: "\"Esta no es una historia familiar completa — es una colección de historias sobre las personas que nos precedieron.\""
    },
    de: {
      subtitle: "Anhänge & Dokumente",
      title: "Familie & Index",
      clickToEnlarge: "💡 Klicken zum Vergrößern und Anzeigen von Namen und Beziehungen",
      father: "Vater:",
      mother: "Mutter:",
      partner: "Partner:",
      childrenOnPhoto: "Kinder auf dem Foto:",
      parentsNotOnPhoto: "Eltern nicht auf dem Foto",
      description: `Familienporträts, vollständiger Ehevertrag von 1685 und ein Index von ${totalNames}+ Familiennamen`,
      reunion1962Title: "Familientreffen 1962",
      reunion1962Desc: "Großes Familientreffen in Izegem, am elterlichen Haus in der Vandenbogaerdelaan 27.",
      reunion1966Title: "Familientreffen 1966",
      reunion1966Desc: "Izegem, Familientreffen Sommer 1966",
      reunion2024Title: "Familientreffen 2024",
      reunion2024Desc: "112 Nachkommen von Marcel Deforce & Magdalena Geldof kamen in Het Prullenbos in Laarne zusammen.",
      gezinsfoto1943Title: "Familienfoto 10. Januar 1943",
      gezinsfoto1943Desc: "Die Familie Marcel Deforce & Magdalena Geldof mit ihren 10 Kindern. Die Nummern verweisen auf dieselben Personen auf dem Foto von 1962.",
      akteTitle: "Notarieller Ehevertrag vom 18. April 1685",
      akteSubtitle: "Aufgesetzt in Lille durch den Notar",
      verschenenTitle: "Anwesende Personen",
      verschenenIntro: "Es erschienen persönlich vor dem Notar:",
      bruidegom: "Hubert Deleforge, junger unverheirateter Mann, wohnhaft in Hallennes, begleitet von seinem Vater und seiner Mutter Hubert Deleforge und Marie Grimbel, ebenfalls wohnhaft in Hallennes, und von seinem Onkel Pierre Cordon aus Loos.",
      bruid: "Antoinette Follet, junge unverheiratete Frau, Tochter des verstorbenen Meisters Jean Follet, wohnhaft in Capinghem, begleitet von ihrer Mutter Jeanne Lambin, ihrem Bruder Antoine Follet, Chirurg in Lomme, und ihrem Onkel Laurens Ricourt.",
      giftenBruidegom: "Hochzeitsgeschenke Bräutigamseite",
      giftenBruidegomIntro: "Die Eltern des Bräutigams geben ihrem Sohn:",
      giftenBruidegomItems: ["400 Pfund Parisis", "3 Rasières Weizen", "2 Paar Laken (Bettwäsche)", "6 Ellen Wollstoff (~6 Meter)"],
      giftenBruidegomNote: "Dies ist sein vollständiger Anteil (\"portement\") am Erbe.",
      giftenBruid: "Hochzeitsgeschenke Brautseite",
      giftenBruidIntro: "Die Mutter der Braut, Jeanne Lambin, gibt ihrer Tochter:",
      giftenBruidItems: ["400 Pfund Parisis", "2 Paar Leichentücher (Leinentücher)", "Ein Paar aus grobem Leinen, eines aus feinem Leinen", "6 Servietten", "Kleidung und Schmuck für den Hochzeitstag"],
      overlijdenTitle: "Bedingungen im Todesfall",
      overlijdenHubert: "Wenn Hubert vor Antoinette stirbt:",
      overlijdenHubertItems: ["Antoinette behält alle ihre Kleidung, Schmuck und Besitz", "Ihre Mitgift von 400 Pfund wird zurückgegeben", "Sie erhält 134 Pfund Parisis als Witwengabe", "Wahlmöglichkeit: im Nachlass bleiben oder mit eigenem Besitz gehen"],
      overlijdenAntoinette: "Wenn Antoinette vor Hubert ohne Kinder stirbt:",
      overlijdenAntoinetteItems: ["Der Witwer muss 268 Pfund Parisis an ihre Erben zurückzahlen", "Das ist ungefähr zwei Drittel ihres Beitrags"],
      grondbezitTitle: "Grundbesitz und Pacht",
      grondbezitText: "Die Mutter der Braut, Jeanne Lambin, gewährt ihrer Tochter das Pachtrecht eines Hofes von zwei Bonniers und zehn Centièmes (etwa 2,5 Hektar), Eigentum des Herrn de La Haye, den sie selbst gepachtet hatte. Antoinette und ihr zukünftiger Mann dürfen diese Pacht fortsetzen.",
      slotTitle: "Schlussklauseln",
      slotIntro: "Die Urkunde wurde am 18. April 1685 in Lille aufgesetzt, in Anwesenheit von:",
      slotGetuigen: ["Jacques Deleforge, Sohn des verstorbenen Michel (Zeuge)", "Simon Cauche, Arbeiter in Capinghem (Zeuge)"],
      slotMarge: "Am Rand: Die Eltern erklären, dass Kinder aus dieser Ehe vollständig an Erbschaften teilhaben werden, auch vor Onkeln und Tanten, abweichend vom Brauch.",
      indexTitle: "Anhang 2: Vollständiger Index der Familiennamen",
      indexSubtitle: "Familiennamen dokumentiert im Stammbaum (Quelle: Geneanet)",
      meestVoorkomend: "Am häufigsten:",
      namen: "Namen",
      klikOmTeBekijken: "Klicken Sie auf einen Buchstaben oben, um alle Familiennamen anzuzeigen",
      bronnenTitle: "Anhang 3: Konsultierte Quellen",
      stats: [
        { label: "Familiennamen", value: `${totalNames}+` },
        { label: "Generationen", value: "15+" },
        { label: "Jahre Forschung", value: "600" },
        { label: "Dokumente", value: "500+" },
      ],
      nawoordTitle: "Ein lebendiges Dokument",
      nawoordP1: "Diese Familiengeschichte ist kein Endpunkt, sondern ein Ausgangspunkt. Zukünftige Generationen sind eingeladen, weiter zu suchen: neue Daten hinzuzufügen, Quellen zu entdecken, Verbindungen zu schärfen.",
      nawoordP2: "Der Stammbaum auf MyHeritage enthält jetzt Tausende von Namen und Hunderte von Dokumenten. Viele Fragen bleiben unbeantwortet: Warum genau ging Hubert nach Izegem? Welche Kontakte hatte er dort bereits? Was geschah mit den zurückgebliebenen Familienmitgliedern?",
      nawoordQuote: "\"Dies ist keine vollständige Familiengeschichte — es ist eine Sammlung von Geschichten über die Menschen, die vor uns kamen.\""
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <section id="familie" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm">
            {t.subtitle}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {t.title}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Gezinsfoto 1943 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <ImageComparisonSlider
              leftImage={gezinsfoto1943}
              rightImage={gezinsfoto1943color}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
              overlay={
                <div className="pointer-events-auto">
                  {/* Achterste rij (staand) - van links naar rechts: 35, 9, 22, 10, 7, 24, 31 */}
                  <div className="absolute top-[35%] left-[15%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 35)}>35</div>
                  <div className="absolute top-[35%] left-[35%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 9)}>9</div>
                  <div className="absolute top-[32%] left-[45%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 22)}>22</div>
                  <div className="absolute top-[55%] left-[23%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 10)}>10</div>
                  <div className="absolute top-[60%] left-[86%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 7)}>7</div>
                  <div className="absolute top-[40%] left-[72%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 24)}>24</div>
                  <div className="absolute top-[30%] left-[88%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 31)}>31</div>
                  {/* Middelste rij */}
                  <div className="absolute top-[65%] left-[10%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 14)}>14</div>
                  <div className="absolute top-[65%] left-[50%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 3)}>3</div>
                  <div className="absolute top-[55%] left-[36%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 33)}>33</div>
                  {/* Ouders zittend */}
                  <div className="absolute top-[47%] left-[62%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 25)}>25</div>
                  <div className="absolute top-[50%] left-[80%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 29)}>29</div>
                </div>
              }
            />
            <div className="p-4 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                {t.gezinsfoto1943Title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                {t.gezinsfoto1943Desc}
              </p>
            </div>
            {/* Fullscreen knop */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setFullscreenPhoto({ src: gezinsfoto1943, title: t.gezinsfoto1943Title, desc: t.gezinsfoto1943Desc, showNumbers: true, photoId: '1943' })}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors text-sm text-muted-foreground"
              >
                <Maximize2 className="w-4 h-4" />
                {t.clickToEnlarge}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Familiereünies */}
        {/* Familiereünie 1962 - Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <ImageComparisonSlider
              leftImage={reunion1962}
              rightImage={reunion1962color}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
              overlay={
                <div className="pointer-events-auto">
                  {/* Achterste rij */}
                  {/* Achterste rij */}
                  <div className="absolute top-[40%] left-[6%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 1)}>1</div>
                  <div className="absolute top-[20%] left-[18%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 2)}>2</div>
                  <div className="absolute top-[24%] left-[28%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 3)}>3</div>
                  <div className="absolute top-[32%] left-[34%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 4)}>4</div>
                  <div className="absolute top-[18%] left-[44%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 5)}>5</div>
                  <div className="absolute top-[18%] left-[58%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 6)}>6</div>
                  <div className="absolute top-[30%] left-[64%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 7)}>7</div>
                  <div className="absolute top-[29%] left-[71%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 8)}>8</div>
                  <div className="absolute top-[28%] left-[78%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 9)}>9</div>
                  {/* Middelste rij */}
                  <div className="absolute top-[40%] left-[15%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 10)}>10</div>
                  <div className="absolute top-[36%] left-[25%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 11)}>11</div>
                  <div className="absolute top-[35%] left-[42%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 13)}>13</div>
                  <div className="absolute top-[41%] left-[48%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 14)}>14</div>
                  <div className="absolute top-[36%] left-[51%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 15)}>15</div>
                  <div className="absolute top-[40%] left-[56%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 16)}>16</div>
                  <div className="absolute top-[42%] left-[62%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 17)}>17</div>
                  <div className="absolute top-[48%] left-[67%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 18)}>18</div>
                  {/* Voorste rij (zittend) */}
                  <div className="absolute top-[42%] left-[75%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 19)}>19</div>
                  <div className="absolute top-[40%] left-[82%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 20)}>20</div>
                  <div className="absolute top-[42%] left-[89%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 21)}>21</div>
                  <div className="absolute top-[61%] left-[12%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 22)}>22</div>
                  <div className="absolute top-[52%] left-[18%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 23)}>23</div>
                  <div className="absolute top-[64%] left-[28%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 24)}>24</div>
                  <div className="absolute top-[58%] left-[36%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 25)}>25</div>
                  {/* Kinderen vooraan */}
                  <div className="absolute top-[61%] left-[42%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 26)}>26</div>
                  <div className="absolute top-[60%] left-[48%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 27)}>27</div>
                  <div className="absolute top-[63%] left-[53%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 28)}>28</div>
                  <div className="absolute top-[60%] left-[58%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 29)}>29</div>
                  <div className="absolute top-[63%] left-[68%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 30)}>30</div>
                  <div className="absolute top-[56%] left-[75%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 31)}>31</div>
                  <div className="absolute top-[64%] left-[80%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 32)}>32</div>
                  <div className="absolute top-[60%] left-[85%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 33)}>33</div>
                  <div className="absolute top-[60%] left-[92%] w-5 h-5 md:w-6 md:h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[7px] md:text-[9px] font-bold shadow-lg border border-background cursor-pointer hover:scale-125 transition-transform" onClick={(e) => handleLabelClick(e, 34)}>34</div>
                </div>
              }
            />
            <div className="p-4 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                {t.reunion1962Title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                {t.reunion1962Desc}
              </p>
            </div>
            {/* Persoon info panel */}
            <AnimatePresence>
              {selectedPerson && personenData[selectedPerson] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mx-4 mb-4 p-4 bg-card border border-border rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-serif text-lg font-semibold text-primary">
                        {personenData[selectedPerson].name}
                      </div>
                      <div className="text-xs text-muted-foreground">Nr. {selectedPerson}</div>
                    </div>
                    <button onClick={() => setSelectedPerson(null)} className="text-muted-foreground hover:text-foreground p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {(personenData[selectedPerson].fatherId || personenData[selectedPerson].motherId) && (
                    <div className="space-y-1 text-sm">
                      {personenData[selectedPerson].fatherId && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{t.father}</span>
                          <button 
                            onClick={() => setSelectedPerson(personenData[selectedPerson!].fatherId)}
                            className="text-primary hover:underline font-medium"
                          >
                            {getPersonName(personenData[selectedPerson].fatherId)} (#{personenData[selectedPerson].fatherId})
                          </button>
                        </div>
                      )}
                      {personenData[selectedPerson].motherId && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{t.mother}</span>
                          <button 
                            onClick={() => setSelectedPerson(personenData[selectedPerson!].motherId)}
                            className="text-primary hover:underline font-medium"
                          >
                            {getPersonName(personenData[selectedPerson].motherId)} (#{personenData[selectedPerson].motherId})
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {getPartner(selectedPerson) && (
                    <div className="flex items-center gap-2 text-sm mt-2 pt-2 border-t border-border">
                      <span className="text-muted-foreground">{t.partner}</span>
                      <button 
                        onClick={() => setSelectedPerson(getPartner(selectedPerson!)?.id ?? null)}
                        className="text-primary hover:underline font-medium"
                      >
                        {getPartner(selectedPerson)?.name} (#{getPartner(selectedPerson)?.id})
                      </button>
                    </div>
                  )}

                  {getChildren(selectedPerson).length > 0 && (
                    <div className="text-sm mt-2 pt-2 border-t border-border">
                      <span className="text-muted-foreground">{t.childrenOnPhoto}</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {getChildren(selectedPerson).map(child => (
                          <button 
                            key={child.id}
                            onClick={() => setSelectedPerson(child.id)}
                            className="text-primary hover:underline font-medium"
                          >
                            {child.name} (#{child.id})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Familiereünie 1966 - Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <ImageComparisonSlider
              leftImage={reunion1966bw}
              rightImage={reunion1966color}
              leftLabel="Origineel"
              rightLabel="Ingekleurd"
            />
            <div className="p-4 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                {t.reunion1966Title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                {t.reunion1966Desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Familiereünie 2024 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="photo-frame relative group cursor-pointer max-w-4xl mx-auto"
            onClick={() => setFullscreenPhoto({ src: reunion2024, title: t.reunion2024Title, desc: t.reunion2024Desc, showNumbers: false })}
          >
            <img
              src={reunion2024}
              alt={t.reunion2024Title}
              className="w-full h-auto rounded-md"
            />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full">
                <Maximize2 className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                {t.reunion2024Title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                {t.reunion2024Desc}
              </p>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {fullscreenPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setFullscreenPhoto(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-card rounded-full border border-border hover:bg-secondary transition-colors z-10"
                onClick={() => setFullscreenPhoto(null)}
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={fullscreenPhoto.src}
                    alt={fullscreenPhoto.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-elevated"
                  />
                  {fullscreenPhoto.showNumbers && fullscreenPhoto.photoId === '1962' && (
                    <>
                      {/* Nummerlabels voor personen - Achterste rij (borst/schouder niveau) */}
                      <button onClick={(e) => handleLabelClick(e, 1)} className={`absolute top-[40%] left-[6%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 1 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>1</button>
                      <button onClick={(e) => handleLabelClick(e, 2)} className={`absolute top-[20%] left-[18%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 2 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>2</button>
                      <button onClick={(e) => handleLabelClick(e, 3)} className={`absolute top-[24%] left-[28%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 3 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>3</button>
                      <button onClick={(e) => handleLabelClick(e, 4)} className={`absolute top-[32%] left-[34%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 4 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>4</button>
                      <button onClick={(e) => handleLabelClick(e, 5)} className={`absolute top-[18%] left-[44%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 5 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>5</button>
                      <button onClick={(e) => handleLabelClick(e, 6)} className={`absolute top-[18%] left-[58%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 6 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>6</button>
                      <button onClick={(e) => handleLabelClick(e, 7)} className={`absolute top-[30%] left-[64%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 7 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>7</button>
                      <button onClick={(e) => handleLabelClick(e, 8)} className={`absolute top-[29%] left-[71%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 8 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>8</button>
                      <button onClick={(e) => handleLabelClick(e, 9)} className={`absolute top-[28%] left-[78%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 9 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>9</button>
                      {/* Middelste rij */}
                      <button onClick={(e) => handleLabelClick(e, 10)} className={`absolute top-[40%] left-[15%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 10 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>10</button>
                      <button onClick={(e) => handleLabelClick(e, 11)} className={`absolute top-[36%] left-[25%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 11 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>11</button>
                      
                      <button onClick={(e) => handleLabelClick(e, 13)} className={`absolute top-[35%] left-[42%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 13 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>13</button>
                      <button onClick={(e) => handleLabelClick(e, 14)} className={`absolute top-[41%] left-[48%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 14 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>14</button>
                      <button onClick={(e) => handleLabelClick(e, 15)} className={`absolute top-[36%] left-[51%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 15 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>15</button>
                      <button onClick={(e) => handleLabelClick(e, 16)} className={`absolute top-[40%] left-[56%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 16 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>16</button>
                      <button onClick={(e) => handleLabelClick(e, 17)} className={`absolute top-[42%] left-[62%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 17 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>17</button>
                      <button onClick={(e) => handleLabelClick(e, 18)} className={`absolute top-[48%] left-[67%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 18 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>18</button>
                      {/* Voorste rij (zittend) */}
                      <button onClick={(e) => handleLabelClick(e, 19)} className={`absolute top-[42%] left-[75%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 19 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>19</button>
                      <button onClick={(e) => handleLabelClick(e, 20)} className={`absolute top-[40%] left-[82%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 20 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>20</button>
                      <button onClick={(e) => handleLabelClick(e, 21)} className={`absolute top-[42%] left-[89%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 21 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>21</button>
                      <button onClick={(e) => handleLabelClick(e, 22)} className={`absolute top-[61%] left-[12%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 22 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>22</button>
                      <button onClick={(e) => handleLabelClick(e, 23)} className={`absolute top-[52%] left-[18%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 23 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>23</button>
                      <button onClick={(e) => handleLabelClick(e, 24)} className={`absolute top-[64%] left-[28%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 24 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>24</button>
                      <button onClick={(e) => handleLabelClick(e, 25)} className={`absolute top-[58%] left-[36%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 25 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>25</button>
                      {/* Kinderen vooraan */}
                      <button onClick={(e) => handleLabelClick(e, 26)} className={`absolute top-[61%] left-[42%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 26 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>26</button>
                      <button onClick={(e) => handleLabelClick(e, 27)} className={`absolute top-[60%] left-[48%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 27 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>27</button>
                      <button onClick={(e) => handleLabelClick(e, 28)} className={`absolute top-[63%] left-[53%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 28 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>28</button>
                      <button onClick={(e) => handleLabelClick(e, 29)} className={`absolute top-[60%] left-[58%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 29 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>29</button>
                      <button onClick={(e) => handleLabelClick(e, 30)} className={`absolute top-[63%] left-[68%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 30 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>30</button>
                      <button onClick={(e) => handleLabelClick(e, 31)} className={`absolute top-[56%] left-[75%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 31 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>31</button>
                      <button onClick={(e) => handleLabelClick(e, 32)} className={`absolute top-[64%] left-[80%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 32 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>32</button>
                      <button onClick={(e) => handleLabelClick(e, 33)} className={`absolute top-[60%] left-[85%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 33 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>33</button>
                      <button onClick={(e) => handleLabelClick(e, 34)} className={`absolute top-[60%] left-[92%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 34 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-muted text-muted-foreground'}`}>34</button>
                    </>
                  )}
                  
                  {fullscreenPhoto.showNumbers && fullscreenPhoto.photoId === '1943' && (
                    <>
                      {/* Nummerlabels voor 1943 foto - posities voor gezinsfoto */}
                      {/* Achterste rij (staand) - van links naar rechts: 9, 10, 7, 24, 31 */}
                      <button onClick={(e) => handleLabelClick(e, 9)} className={`absolute top-[35%] left-[35%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 9 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>9</button>
                      <button onClick={(e) => handleLabelClick(e, 10)} className={`absolute top-[55%] left-[23%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 10 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>10</button>
                      <button onClick={(e) => handleLabelClick(e, 7)} className={`absolute top-[60%] left-[86%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 7 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>7</button>
                      <button onClick={(e) => handleLabelClick(e, 24)} className={`absolute top-[40%] left-[72%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 24 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>24</button>
                      <button onClick={(e) => handleLabelClick(e, 31)} className={`absolute top-[30%] left-[88%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 31 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>31</button>
                      {/* Middelste rij (kinderen staand + ouders zittend) */}
                      <button onClick={(e) => handleLabelClick(e, 14)} className={`absolute top-[65%] left-[10%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 14 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>14</button>
                      <button onClick={(e) => handleLabelClick(e, 22)} className={`absolute top-[32%] left-[45%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 22 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>22</button>
                      <button onClick={(e) => handleLabelClick(e, 3)} className={`absolute top-[65%] left-[50%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 3 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>3</button>
                      <button onClick={(e) => handleLabelClick(e, 33)} className={`absolute top-[55%] left-[36%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 33 ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-accent text-accent-foreground'}`}>33</button>
                      {/* Ouders zittend */}
                      <button onClick={(e) => handleLabelClick(e, 25)} className={`absolute top-[47%] left-[62%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 25 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>25</button>
                      <button onClick={(e) => handleLabelClick(e, 29)} className={`absolute top-[50%] left-[80%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 29 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-secondary text-secondary-foreground'}`}>29</button>
                      {/* André Deforce - niet aanwezig op reunie 1962 */}
                      <button onClick={(e) => handleLabelClick(e, 35)} className={`absolute top-[35%] left-[15%] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg border-2 border-background cursor-pointer transition-transform hover:scale-125 ${selectedPerson === 35 ? 'bg-accent text-accent-foreground ring-2 ring-accent' : 'bg-primary text-primary-foreground'}`}>35</button>
                    </>
                  )}
                  
                  {fullscreenPhoto.showNumbers && (
                      <AnimatePresence>
                        {selectedPerson && personenData[selectedPerson] && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded-lg shadow-elevated border border-border p-4 min-w-[280px] max-w-[350px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-serif text-lg font-semibold text-primary">
                                  {personenData[selectedPerson].name}
                                </div>
                                <div className="text-xs text-muted-foreground">Nr. {selectedPerson}</div>
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedPerson(null); }}
                                className="ml-auto p-1 hover:bg-secondary rounded-full transition-colors"
                              >
                                <X className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                            
                            {(personenData[selectedPerson].fatherId || personenData[selectedPerson].motherId) && (
                              <div className="space-y-2 text-sm">
                                {personenData[selectedPerson].fatherId && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{t.father}</span>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setSelectedPerson(personenData[selectedPerson].fatherId); }}
                                      className="text-green-600 hover:underline font-medium"
                                    >
                                      {getPersonName(personenData[selectedPerson].fatherId)} (#{personenData[selectedPerson].fatherId})
                                    </button>
                                  </div>
                                )}
                                {personenData[selectedPerson].motherId && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{t.mother}</span>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setSelectedPerson(personenData[selectedPerson].motherId); }}
                                      className="text-green-600 hover:underline font-medium"
                                    >
                                      {getPersonName(personenData[selectedPerson].motherId)} (#{personenData[selectedPerson].motherId})
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {getPartner(selectedPerson) && (
                              <div className="flex items-center gap-2 text-sm mt-2 pt-2 border-t border-border">
                                <span className="text-muted-foreground">{t.partner}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedPerson(getPartner(selectedPerson)!.id); }}
                                  className="text-purple-600 hover:underline font-medium"
                                >
                                  {getPartner(selectedPerson)!.name} (#{getPartner(selectedPerson)!.id})
                                </button>
                              </div>
                            )}

                            {getChildren(selectedPerson).length > 0 && (
                              <div className="text-sm mt-2 pt-2 border-t border-border">
                                <span className="text-muted-foreground">{t.childrenOnPhoto}</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {getChildren(selectedPerson).map((child) => (
                                    <button
                                      key={child.id}
                                      onClick={(e) => { e.stopPropagation(); setSelectedPerson(child.id); }}
                                      className="text-blue-600 hover:underline font-medium text-xs bg-secondary/50 px-2 py-0.5 rounded"
                                    >
                                      {child.name} (#{child.id})
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {!personenData[selectedPerson].fatherId && !personenData[selectedPerson].motherId && getChildrenCount(selectedPerson) === 0 && (
                              <p className="text-sm text-muted-foreground italic">
                                {t.parentsNotOnPhoto}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-2xl font-semibold text-primary">
                    {fullscreenPhoto.title}
                  </h3>
                  <p className="font-sans text-muted-foreground mt-2">
                    {fullscreenPhoto.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volledige Huwelijksakte 1685 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-background rounded-lg p-6 md:p-8 shadow-vintage border border-border"
        >
          <h3 className="font-serif text-2xl text-primary mb-4">
            {t.akteTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t.akteSubtitle} <strong>Jacques Anselme Le Francq</strong>
          </p>
          
          {/* Verschenen personen */}
          <div className="mb-6">
            <h4 className="font-serif text-lg text-accent mb-3">{t.verschenenTitle}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {t.verschenenIntro}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t.bruidegom}
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t.bruid}
                </p>
              </div>
            </div>
          </div>

          {/* Huwelijksgiften */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-primary/5 p-5 rounded-lg border-l-4 border-primary">
              <h4 className="font-serif text-lg text-primary mb-3">{t.giftenBruidegom}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t.giftenBruidegomIntro}
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {t.giftenBruidegomItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                {t.giftenBruidegomNote}
              </p>
            </div>
            
            <div className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent">
              <h4 className="font-serif text-lg text-accent mb-3">{t.giftenBruid}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t.giftenBruidIntro}
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {t.giftenBruidItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Voorwaarden bij overlijden */}
          <div className="mb-6 p-5 bg-secondary/30 rounded-lg">
            <h4 className="font-serif text-lg text-primary mb-3">{t.overlijdenTitle}</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">{t.overlijdenHubert}</p>
                <ul className="list-disc list-inside space-y-1">
                  {t.overlijdenHubertItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">{t.overlijdenAntoinette}</p>
                <ul className="list-disc list-inside space-y-1">
                  {t.overlijdenAntoinetteItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Grondbezit */}
          <div className="mb-6 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
            <h4 className="font-serif text-lg text-accent mb-2">{t.grondbezitTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {t.grondbezitText}
            </p>
          </div>

          {/* Slotclausules */}
          <div className="p-4 bg-primary/5 rounded-lg">
            <h4 className="font-serif text-lg text-primary mb-2">{t.slotTitle}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              {t.slotIntro}
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside mb-3">
              {t.slotGetuigen.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground italic">
              {t.slotMarge}
            </p>
          </div>
        </motion.div>

        {/* Volledige Familienamen Index */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl text-primary mb-4 text-center">
            {t.indexTitle}
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            <strong>{totalNames}+</strong> {t.indexSubtitle}
          </p>
          
          {/* Letter Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                className={`w-10 h-10 rounded-lg font-serif text-lg transition-all ${
                  selectedLetter === letter
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-background text-muted-foreground hover:bg-secondary border border-border"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Meest voorkomende namen */}
          <div className="mb-6 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-background px-4 py-3 rounded-full shadow-vintage text-sm">
              <span className="font-serif text-primary">{t.meestVoorkomend}</span>
              <span className="text-accent font-semibold">Deforche (537)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent font-semibold">Deforce (324)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent font-semibold">Van Hijfte (264)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent font-semibold">Timmerman (139)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent font-semibold">Geldof (132)</span>
            </div>
          </div>

          {/* Selected Letter Content */}
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-background p-6 rounded-lg shadow-vintage border border-border mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-2xl text-accent">{selectedLetter}</h4>
                <span className="text-sm text-muted-foreground">
                  {familienamenIndex[selectedLetter].length} {t.namen}
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {familienamenIndex[selectedLetter].join(", ")}
                </p>
              </div>
            </motion.div>
          )}

          {!selectedLetter && (
            <p className="text-center text-sm text-muted-foreground italic">
              {t.klikOmTeBekijken}
            </p>
          )}
        </motion.div>

        {/* Marcel Afstammelingen */}
        <MarcelAfstammelingen />

        {/* Bronnen */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif text-2xl text-primary mb-8 text-center">
            {t.bronnenTitle}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {bronnen.map((bron, index) => (
              <motion.div
                key={bron.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-background p-6 rounded-lg shadow-vintage border border-border"
              >
                <h4 className="font-serif text-lg text-accent mb-4">{bron.category}</h4>
                <ul className="space-y-2">
                  {bron.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistieken */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-background rounded-lg shadow-sm border border-border"
            >
              <div className="font-serif text-2xl md:text-3xl text-accent mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Nawoord */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 bg-primary/5 rounded-lg border border-primary/20"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-4 text-center">
            {t.nawoordTitle}
          </h3>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              {t.nawoordP1}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t.nawoordP2}
            </p>
            <p className="font-serif italic text-primary text-lg">
              {t.nawoordQuote}
            </p>
            <div className="flex justify-center mt-6">
              <ShareButton sectionId="familie" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Familie;
