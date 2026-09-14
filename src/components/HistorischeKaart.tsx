import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { MapPin, Info, Map, X, ZoomIn, Play, GripVertical } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import historical videos and images
import videoForge from "@/assets/video-forge-1890s.mp4";
import videoFlemishVillage from "@/assets/video-flemish-village.mp4";
import videoLille from "@/assets/video-lille-1890s.mp4";
import videoBoquillon from "@/assets/video-boquillon-forest.mp4";
import videoCountryside from "@/assets/video-flemish-countryside.mp4";
import videoMarket from "@/assets/video-french-flanders-market.mp4";
import videoCarpenter from "@/assets/video-carpenter-workshop.mp4";
import oudeKaartVlaanderen from "@/assets/oude-kaart-vlaanderen.jpg";
import MapComparisonSlider from "@/components/MapComparisonSlider";

interface Location {
  name: string;
  nameFr?: string;
  lat: number;
  lng: number;
  descriptionNL: string;
  descriptionFR: string;
  descriptionDE?: string;
  descriptionEN?: string;
  descriptionES?: string;
  period?: string;
  type: "origin" | "ancestor" | "destination";
  churchImage?: string;
  historicalImage?: string;
  historicalImageDescNL?: string;
  historicalImageDescFR?: string;
  historicalImageDescDE?: string;
  historicalImageDescEN?: string;
  historicalImageDescES?: string;
  historicalVideo?: string;
  historicalVideoDescNL?: string;
  historicalVideoDescFR?: string;
  historicalVideoDescDE?: string;
  historicalVideoDescEN?: string;
  historicalVideoDescES?: string;
}

const locations: Location[] = [
  {
    name: "Hallennes-lez-Haubourdin",
    lat: 50.5847,
    lng: 2.9397,
    descriptionNL: "Geboorteplaats van Hubert Deleforge (1662). Hier werd de verkoopakte van 1699 ondertekend.",
    descriptionFR: "Lieu de naissance de Hubert Deleforge (1662). C'est ici que l'acte de vente de 1699 fut signé.",
    descriptionDE: "Geburtsort von Hubert Deleforge (1662). Hier wurde die Verkaufsurkunde von 1699 unterzeichnet.",
    descriptionEN: "Birthplace of Hubert Deleforge (1662). Here the deed of sale of 1699 was signed.",
    descriptionES: "Lugar de nacimiento de Hubert Deleforge (1662). Aquí se firmó el acta de venta de 1699.",
    period: "1662 - 1699",
    type: "origin",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Hallennes-lez-Haubourdin_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Martin.JPG/800px-Hallennes-lez-Haubourdin_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Martin.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/118._%E2%80%93_Lille._%E2%80%94_La_Grand%27Place_un_Jour_de_Bourse.jpg/800px-118._%E2%80%93_Lille._%E2%80%94_La_Grand%27Place_un_Jour_de_Bourse.jpg",
    historicalImageDescNL: "De Grote Markt van Rijsel op een beursdag, eind 19e eeuw",
    historicalImageDescFR: "La Grand'Place de Lille un jour de Bourse, fin du XIXe siècle",
    historicalImageDescDE: "Der Große Markt von Lille an einem Börsentag, Ende des 19. Jahrhunderts",
    historicalImageDescEN: "The Grand Place of Lille on a stock exchange day, late 19th century",
    historicalImageDescES: "La Grand Place de Lille en un día de bolsa, finales del siglo XIX",
    historicalVideo: videoForge,
    historicalVideoDescNL: "Smidse in werking - verwijst naar de familienaam 'Deleforge' (van de smidse)",
    historicalVideoDescFR: "Forge en activité - référence au nom de famille 'Deleforge' (de la forge)",
    historicalVideoDescDE: "Schmiede in Betrieb - Bezug zum Familiennamen 'Deleforge' (von der Schmiede)",
    historicalVideoDescEN: "Forge in operation - reference to the family name 'Deleforge' (from the forge)",
    historicalVideoDescES: "Forja en funcionamiento - referencia al apellido 'Deleforge' (de la forja)",
  },
  {
    name: "Santes",
    lat: 50.5719,
    lng: 2.9606,
    descriptionNL: "Woonplaats van de familie Deleforge. Hypolite Deleforge (~1590) trouwde hier rond 1620.",
    descriptionFR: "Lieu de résidence de la famille Deleforge. Hypolite Deleforge (~1590) s'y maria vers 1620.",
    descriptionDE: "Wohnort der Familie Deleforge. Hypolite Deleforge (~1590) heiratete hier um 1620.",
    descriptionEN: "Residence of the Deleforge family. Hypolite Deleforge (~1590) married here around 1620.",
    descriptionES: "Residencia de la familia Deleforge. Hypolite Deleforge (~1590) se casó aquí alrededor de 1620.",
    period: "~1620",
    type: "origin",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Santes_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Pierre.JPG/800px-Santes_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Pierre.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Jielbeaumadier_flers_chateau.jpg/800px-Jielbeaumadier_flers_chateau.jpg",
    historicalImageDescNL: "Kasteel van Flers, typisch voor de regio rond Santes",
    historicalImageDescFR: "Château de Flers, typique de la région autour de Santes",
    historicalImageDescDE: "Schloss Flers, typisch für die Region um Santes",
    historicalImageDescEN: "Flers Castle, typical of the region around Santes",
    historicalImageDescES: "Castillo de Flers, típico de la región alrededor de Santes",
    historicalVideo: videoBoquillon,
    historicalVideoDescNL: "Boquillon (houthakker) aan het werk in het bos - het beroep van de eerste Deleforge",
    historicalVideoDescFR: "Boquillon (bûcheron) au travail dans la forêt - le métier du premier Deleforge",
    historicalVideoDescDE: "Boquillon (Holzfäller) bei der Arbeit im Wald - der Beruf des ersten Deleforge",
    historicalVideoDescEN: "Boquillon (woodcutter) at work in the forest - the profession of the first Deleforge",
    historicalVideoDescES: "Boquillon (leñador) trabajando en el bosque - la profesión del primer Deleforge",
  },
  {
    name: "Beaucamps-Ligny",
    lat: 50.5542,
    lng: 2.9103,
    descriptionNL: "Geboorteplaats van Marie Grimbel (~1630), echtgenote van Hubert Deleforge senior.",
    descriptionFR: "Lieu de naissance de Marie Grimbel (~1630), épouse de Hubert Deleforge senior.",
    descriptionDE: "Geburtsort von Marie Grimbel (~1630), Ehefrau von Hubert Deleforge Senior.",
    descriptionEN: "Birthplace of Marie Grimbel (~1630), wife of Hubert Deleforge senior.",
    descriptionES: "Lugar de nacimiento de Marie Grimbel (~1630), esposa de Hubert Deleforge senior.",
    period: "~1630",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Beaucamps-Ligny_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Vaast.JPG/800px-Beaucamps-Ligny_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Vaast.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/BOUVINES_-_Panorama_de_la_Bataille_de_Bouvines_%2827_Juillet_1214%29.jpeg/800px-BOUVINES_-_Panorama_de_la_Bataille_de_Bouvines_%2827_Juillet_1214%29.jpeg",
    historicalImageDescNL: "Panorama van de Slag bij Bouvines (1214), historische regio",
    historicalImageDescFR: "Panorama de la Bataille de Bouvines (1214), région historique",
    historicalImageDescDE: "Panorama der Schlacht bei Bouvines (1214), historische Region",
    historicalImageDescEN: "Panorama of the Battle of Bouvines (1214), historical region",
    historicalImageDescES: "Panorama de la Batalla de Bouvines (1214), región histórica",
  },
  {
    name: "Capinghem",
    lat: 50.6333,
    lng: 2.9667,
    descriptionNL: "Locatie van eigendom vermeld in de erfenisakte van 1712. Hier bezaten de voorouders grond.",
    descriptionFR: "Lieu de propriété mentionné dans l'acte de succession de 1712. Les ancêtres y possédaient des terres.",
    descriptionDE: "Eigentumsort erwähnt in der Erbschaftsurkunde von 1712. Hier besaßen die Vorfahren Land.",
    descriptionEN: "Property location mentioned in the inheritance deed of 1712. Here the ancestors owned land.",
    descriptionES: "Ubicación de propiedad mencionada en el acta de herencia de 1712. Aquí los antepasados poseían tierras.",
    period: "1711-1712",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Eglise_de_Capinghem_-_1.JPG/800px-Eglise_de_Capinghem_-_1.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jielbeaumadier_ascq_gare1900.jpg/800px-Jielbeaumadier_ascq_gare1900.jpg",
    historicalImageDescNL: "Station van Ascq rond 1900, nabij Capinghem",
    historicalImageDescFR: "Gare d'Ascq vers 1900, près de Capinghem",
    historicalImageDescDE: "Bahnhof von Ascq um 1900, nahe Capinghem",
    historicalImageDescEN: "Ascq railway station around 1900, near Capinghem",
    historicalImageDescES: "Estación de Ascq alrededor de 1900, cerca de Capinghem",
  },
  {
    name: "Loos",
    nameFr: "Loos-lez-Lille",
    lat: 50.6103,
    lng: 3.0175,
    descriptionNL: "Woonplaats van Michel Grimbel (~1598-1685) en Madeleine Rogier. Voorouders langs moederszijde.",
    descriptionFR: "Lieu de résidence de Michel Grimbel (~1598-1685) et Madeleine Rogier. Ancêtres du côté maternel.",
    descriptionDE: "Wohnort von Michel Grimbel (~1598-1685) und Madeleine Rogier. Vorfahren mütterlicherseits.",
    descriptionEN: "Residence of Michel Grimbel (~1598-1685) and Madeleine Rogier. Ancestors on the maternal side.",
    descriptionES: "Residencia de Michel Grimbel (~1598-1685) y Madeleine Rogier. Antepasados por parte materna.",
    period: "~1598 - 1685",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Loos_%28Nord%29_-_Église_Saint-Christophe.jpg/800px-Loos_%28Nord%29_-_Église_Saint-Christophe.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/15._-_LILLE._-_La_Place_de_Tourcoing.JPG/800px-15._-_LILLE._-_La_Place_de_Tourcoing.JPG",
    historicalImageDescNL: "Historische ansichtkaart van de Place de Tourcoing",
    historicalImageDescFR: "Carte postale historique de la Place de Tourcoing",
    historicalImageDescDE: "Historische Postkarte vom Place de Tourcoing",
    historicalImageDescEN: "Historic postcard of the Place de Tourcoing",
    historicalImageDescES: "Postal histórica de la Place de Tourcoing",
  },
  {
    name: "Halluin",
    lat: 50.7831,
    lng: 3.1244,
    descriptionNL: "Overlijdensplaats van Bauduin Deleforge (†1613), de oudste bekende voorvader (~1550).",
    descriptionFR: "Lieu de décès de Bauduin Deleforge (†1613), le plus ancien ancêtre connu (~1550).",
    descriptionDE: "Sterbeort von Bauduin Deleforge (†1613), dem ältesten bekannten Vorfahren (~1550).",
    descriptionEN: "Place of death of Bauduin Deleforge (†1613), the oldest known ancestor (~1550).",
    descriptionES: "Lugar de fallecimiento de Bauduin Deleforge (†1613), el antepasado conocido más antiguo (~1550).",
    period: "~1550 - 1613",
    type: "origin",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Halluin_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Hilaire.JPG/800px-Halluin_%28Nord%2C_Fr%29_%C3%A9glise_Saint-Hilaire.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Halluin.%C3%89glise_Saint-Hilaire_d%27Halluin.jpg/800px-Halluin.%C3%89glise_Saint-Hilaire_d%27Halluin.jpg",
    historicalImageDescNL: "Historische ansichtkaart van de Sint-Hilariuskerk van Halluin",
    historicalImageDescFR: "Carte postale ancienne de l'église Saint-Hilaire d'Halluin",
    historicalImageDescDE: "Historische Postkarte der Sankt-Hilarius-Kirche von Halluin",
    historicalImageDescEN: "Historic postcard of the Saint Hilaire Church of Halluin",
    historicalImageDescES: "Postal antigua de la iglesia Saint-Hilaire de Halluin",
  },
  {
    name: "Wavrin",
    lat: 50.5744,
    lng: 2.9356,
    descriptionNL: "Gemeente in de Weppes-streek waar meerdere familieleden woonden.",
    descriptionFR: "Commune de la région des Weppes où plusieurs membres de la famille vivaient.",
    descriptionDE: "Gemeinde in der Weppes-Region, wo mehrere Familienmitglieder lebten.",
    descriptionEN: "Municipality in the Weppes region where several family members lived.",
    descriptionES: "Municipio en la región de Weppes donde vivían varios miembros de la familia.",
    period: "16e-17e eeuw",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wavrin_eglise.JPG/800px-Wavrin_eglise.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Gare_de_Wattrelos_%281900%29.jpg/800px-Gare_de_Wattrelos_%281900%29.jpg",
    historicalImageDescNL: "Station van Wattrelos rond 1900, typisch voor de regio",
    historicalImageDescFR: "Gare de Wattrelos vers 1900, typique de la région",
    historicalImageDescDE: "Bahnhof Wattrelos um 1900, typisch für die Region",
    historicalImageDescEN: "Wattrelos railway station around 1900, typical of the region",
    historicalImageDescES: "Estación de Wattrelos alrededor de 1900, típica de la región",
    historicalVideo: videoCountryside,
    historicalVideoDescNL: "Het Vlaamse platteland rond 1900 - de weg van Frankrijk naar West-Vlaanderen",
    historicalVideoDescFR: "La campagne flamande vers 1900 - le chemin de France vers la Flandre Occidentale",
    historicalVideoDescDE: "Die flämische Landschaft um 1900 - der Weg von Frankreich nach Westflandern",
    historicalVideoDescEN: "The Flemish countryside around 1900 - the way from France to West Flanders",
    historicalVideoDescES: "El campo flamenco alrededor de 1900 - el camino de Francia a Flandes Occidental",
  },
  {
    name: "Rijsel",
    nameFr: "Lille",
    lat: 50.6292,
    lng: 3.0573,
    descriptionNL: "Hoofdstad van de regio. Administratief centrum waar veel akten werden opgesteld.",
    descriptionFR: "Capitale de la région. Centre administratif où de nombreux actes ont été rédigés.",
    descriptionDE: "Hauptstadt der Region. Verwaltungszentrum, wo viele Urkunden erstellt wurden.",
    descriptionEN: "Capital of the region. Administrative center where many deeds were drawn up.",
    descriptionES: "Capital de la región. Centro administrativo donde se redactaron muchos documentos.",
    period: "Regionaal centrum",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Lille_Eglise_St_Maurice.jpg/800px-Lille_Eglise_St_Maurice.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/129._-_Lille._%E2%80%94_L%27%C3%89glise_Saint_Maurice.jpg/800px-129._-_Lille._%E2%80%94_L%27%C3%89glise_Saint_Maurice.jpg",
    historicalImageDescNL: "Historische ansichtkaart van de Sint-Mauritiuskerk te Rijsel",
    historicalImageDescFR: "Carte postale ancienne de l'église Saint-Maurice à Lille",
    historicalImageDescDE: "Historische Postkarte der Sankt-Mauritius-Kirche in Lille",
    historicalImageDescEN: "Historic postcard of Saint Maurice Church in Lille",
    historicalImageDescES: "Postal antigua de la iglesia Saint-Maurice en Lille",
    historicalVideo: videoLille,
    historicalVideoDescNL: "Straatbeeld van Rijsel, eind 19e eeuw",
    historicalVideoDescFR: "Scène de rue à Lille, fin du XIXe siècle",
    historicalVideoDescDE: "Straßenszene in Lille, Ende des 19. Jahrhunderts",
    historicalVideoDescEN: "Street scene in Lille, late 19th century",
    historicalVideoDescES: "Escena callejera en Lille, finales del siglo XIX",
  },
  {
    name: "Premesques",
    lat: 50.6356,
    lng: 2.9453,
    descriptionNL: "Woonplaats van Jean Baptiste Follet, broer van Antoinette Follet.",
    descriptionFR: "Lieu de résidence de Jean Baptiste Follet, frère d'Antoinette Follet.",
    descriptionDE: "Wohnort von Jean Baptiste Follet, Bruder von Antoinette Follet.",
    descriptionEN: "Residence of Jean Baptiste Follet, brother of Antoinette Follet.",
    descriptionES: "Residencia de Jean Baptiste Follet, hermano de Antoinette Follet.",
    period: "Begin 18e eeuw",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pr%C3%A9mesquesEglise.jpg/800px-Pr%C3%A9mesquesEglise.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ch%C3%A2teau_de_Pr%C3%A9mesques_%28Pr%C3%A9mesques%29_%282%29.jpg/800px-Ch%C3%A2teau_de_Pr%C3%A9mesques_%28Pr%C3%A9mesques%29_%282%29.jpg",
    historicalImageDescNL: "Kasteel van Prémesques, historisch landgoed",
    historicalImageDescFR: "Château de Prémesques, domaine historique",
    historicalImageDescDE: "Schloss Prémesques, historisches Anwesen",
    historicalImageDescEN: "Prémesques Castle, historic estate",
    historicalImageDescES: "Castillo de Prémesques, finca histórica",
  },
  {
    name: "Hazebrouck",
    nameFr: "Hazebrouck",
    lat: 50.7256,
    lng: 2.5392,
    descriptionNL: "Historische stad in Frans-Vlaanderen. Belangrijk regionaal centrum in de Weppes-streek.",
    descriptionFR: "Ville historique en Flandre française. Centre régional important dans la région des Weppes.",
    descriptionDE: "Historische Stadt in Französisch-Flandern. Wichtiges regionales Zentrum in der Weppes-Region.",
    descriptionEN: "Historic town in French Flanders. Important regional center in the Weppes region.",
    descriptionES: "Ciudad histórica en Flandes francés. Centro regional importante en la región de Weppes.",
    period: "16e-17e eeuw",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Eglise_saint_eloi_hazebrouck.jpg/800px-Eglise_saint_eloi_hazebrouck.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hazebrouck.Rue_de_l%27%C3%89glise.jpg/800px-Hazebrouck.Rue_de_l%27%C3%89glise.jpg",
    historicalImageDescNL: "Rue de l'Église in Hazebrouck met zicht op de kerk, begin 20e eeuw",
    historicalImageDescFR: "Rue de l'Église à Hazebrouck avec vue sur l'église, début XXe siècle",
    historicalImageDescDE: "Rue de l'Église in Hazebrouck mit Blick auf die Kirche, Anfang 20. Jahrhundert",
    historicalImageDescEN: "Rue de l'Église in Hazebrouck with view of the church, early 20th century",
    historicalImageDescES: "Rue de l'Église en Hazebrouck con vista a la iglesia, principios del siglo XX",
    historicalVideo: videoMarket,
    historicalVideoDescNL: "Marktplein in Frans-Vlaanderen, eind 19e eeuw",
    historicalVideoDescFR: "Place du marché en Flandre française, fin du XIXe siècle",
    historicalVideoDescDE: "Marktplatz in Französisch-Flandern, Ende des 19. Jahrhunderts",
    historicalVideoDescEN: "Market square in French Flanders, late 19th century",
    historicalVideoDescES: "Plaza del mercado en Flandes francés, finales del siglo XIX",
  },
  {
    name: "Nieppe",
    lat: 50.7003,
    lng: 2.8314,
    descriptionNL: "Gemeente in Frans-Vlaanderen aan de Leie, nabij Armentières.",
    descriptionFR: "Commune en Flandre française sur la Lys, près d'Armentières.",
    descriptionDE: "Gemeinde in Französisch-Flandern an der Leie, nahe Armentières.",
    descriptionEN: "Municipality in French Flanders on the Lys, near Armentières.",
    descriptionES: "Municipio en Flandes francés sobre el Lys, cerca de Armentières.",
    period: "16e-17e eeuw",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Nieppe_-_Eglise_Saint-Martin.jpg/800px-Nieppe_-_Eglise_Saint-Martin.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/10_-_Nieppe_%E2%80%94_Rue_d%27Armenti%C3%A8res.jpg/800px-10_-_Nieppe_%E2%80%94_Rue_d%27Armenti%C3%A8res.jpg",
    historicalImageDescNL: "Rue d'Armentières in Nieppe, historische straatscène",
    historicalImageDescFR: "Rue d'Armentières à Nieppe, scène de rue historique",
    historicalImageDescDE: "Rue d'Armentières in Nieppe, historische Straßenszene",
    historicalImageDescEN: "Rue d'Armentières in Nieppe, historic street scene",
    historicalImageDescES: "Rue d'Armentières en Nieppe, escena callejera histórica",
  },
  {
    name: "Quesnoy-sur-Deûle",
    lat: 50.7014,
    lng: 2.9947,
    descriptionNL: "Geboorteplaats van Jeanne Lambin (~1635), voorouder van Antoinette Follet.",
    descriptionFR: "Lieu de naissance de Jeanne Lambin (~1635), ancêtre d'Antoinette Follet.",
    descriptionDE: "Geburtsort von Jeanne Lambin (~1635), Vorfahrin von Antoinette Follet.",
    descriptionEN: "Birthplace of Jeanne Lambin (~1635), ancestor of Antoinette Follet.",
    descriptionES: "Lugar de nacimiento de Jeanne Lambin (~1635), antepasada de Antoinette Follet.",
    period: "~1575 - 1635",
    type: "ancestor",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Quesnoy_eglise_ext.jpg/800px-Quesnoy_eglise_ext.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Quesnoy_mairie_face.jpg/800px-Quesnoy_mairie_face.jpg",
    historicalImageDescNL: "Het historische stadhuis van Quesnoy-sur-Deûle",
    historicalImageDescFR: "L'hôtel de ville historique de Quesnoy-sur-Deûle",
    historicalImageDescDE: "Das historische Rathaus von Quesnoy-sur-Deûle",
    historicalImageDescEN: "The historic town hall of Quesnoy-sur-Deûle",
    historicalImageDescES: "El ayuntamiento histórico de Quesnoy-sur-Deûle",
  },
  {
    name: "Emelgem",
    lat: 50.9167,
    lng: 3.2333,
    descriptionNL: "Eerste vermelding van Hubert Deleforge als 'ex Hemelgem' in 1699. Tussenstop op weg naar Izegem.",
    descriptionFR: "Première mention de Hubert Deleforge comme 'ex Hemelgem' en 1699. Étape vers Izegem.",
    descriptionDE: "Erste Erwähnung von Hubert Deleforge als 'ex Hemelgem' im Jahr 1699. Zwischenstopp auf dem Weg nach Izegem.",
    descriptionEN: "First mention of Hubert Deleforge as 'ex Hemelgem' in 1699. Stopover on the way to Izegem.",
    descriptionES: "Primera mención de Hubert Deleforge como 'ex Hemelgem' en 1699. Parada en el camino a Izegem.",
    period: "1699",
    type: "destination",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Emelgem_Sint-Pieterskerk.JPG/800px-Emelgem_Sint-Pieterskerk.JPG",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/De_dorpstimmerman_by_Tony_Lodewijk_George_Offermans_%281854-1911%29.jpg/800px-De_dorpstimmerman_by_Tony_Lodewijk_George_Offermans_%281854-1911%29.jpg",
    historicalImageDescNL: "De Dorpstimmerman, schilderij van Tony Offermans (1854-1911), Belgisch kunstenaar",
    historicalImageDescFR: "Le Menuisier du village, peinture de Tony Offermans (1854-1911), artiste belge",
    historicalImageDescDE: "Der Dorfzimmermann, Gemälde von Tony Offermans (1854-1911), belgischer Künstler",
    historicalImageDescEN: "The Village Carpenter, painting by Tony Offermans (1854-1911), Belgian artist",
    historicalImageDescES: "El Carpintero del pueblo, pintura de Tony Offermans (1854-1911), artista belga",
    historicalVideo: videoCarpenter,
    historicalVideoDescNL: "Timmerman aan het werk - het ambacht dat de familie Deforce zou uitoefenen",
    historicalVideoDescFR: "Menuisier au travail - le métier que la famille Deforce allait exercer",
    historicalVideoDescDE: "Zimmermann bei der Arbeit - das Handwerk, das die Familie Deforce ausüben würde",
    historicalVideoDescEN: "Carpenter at work - the craft that the Deforce family would practice",
    historicalVideoDescES: "Carpintero trabajando - el oficio que practicaría la familia Deforce",
  },
  {
    name: "Izegem",
    lat: 50.9094,
    lng: 3.2142,
    descriptionNL: "Eindbestemming van Hubert Deleforge. Hier vestigde de familie zich permanent vanaf ~1705.",
    descriptionFR: "Destination finale de Hubert Deleforge. La famille s'y installa définitivement à partir de ~1705.",
    descriptionDE: "Endziel von Hubert Deleforge. Hier ließ sich die Familie ab ~1705 dauerhaft nieder.",
    descriptionEN: "Final destination of Hubert Deleforge. Here the family settled permanently from ~1705.",
    descriptionES: "Destino final de Hubert Deleforge. Aquí la familia se estableció permanentemente desde ~1705.",
    period: "1705 - heden",
    type: "destination",
    churchImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sint-Tillokerk_Izegem%2C_foto_genomen_vanuit_de_Sint-Tillostraat.jpg/800px-Sint-Tillokerk_Izegem%2C_foto_genomen_vanuit_de_Sint-Tillostraat.jpg",
    historicalImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Timmerman_zittend_op_een_schaafbank_in_zijn_werkplaats%2C_RP-T-FM-144.jpg/800px-Timmerman_zittend_op_een_schaafbank_in_zijn_werkplaats%2C_RP-T-FM-144.jpg",
    historicalImageDescNL: "Timmerman in zijn werkplaats, 19e-eeuwse prent uit het Rijksmuseum",
    historicalImageDescFR: "Menuisier dans son atelier, estampe du XIXe siècle du Rijksmuseum",
    historicalImageDescDE: "Zimmermann in seiner Werkstatt, Druck aus dem 19. Jahrhundert aus dem Rijksmuseum",
    historicalImageDescEN: "Carpenter in his workshop, 19th century print from the Rijksmuseum",
    historicalImageDescES: "Carpintero en su taller, grabado del siglo XIX del Rijksmuseum",
    historicalVideo: videoFlemishVillage,
    historicalVideoDescNL: "Vlaams dorpsleven, begin 20e eeuw",
    historicalVideoDescFR: "Vie de village flamand, début du XXe siècle",
    historicalVideoDescDE: "Flämisches Dorfleben, Anfang des 20. Jahrhunderts",
    historicalVideoDescEN: "Flemish village life, early 20th century",
    historicalVideoDescES: "Vida de pueblo flamenco, principios del siglo XX",
  },
];

const HistorischeKaart = () => {
  const ref = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; name: string; type: 'modern' | 'historical' } | null>(null);
  const { language, t } = useLanguage();

  // Function to open lightbox - will be called from popup
  const openLightbox = useCallback((src: string, name: string, type: 'modern' | 'historical' = 'modern') => {
    setLightboxImage({ src, name, type });
  }, []);

  // Expose openLightbox to window for popup onclick
  useEffect(() => {
    (window as any).openTownHallLightbox = openLightbox;
    return () => {
      delete (window as any).openTownHallLightbox;
    };
  }, [openLightbox]);

  const getDescription = (loc: Location) => {
    switch (language) {
      case 'fr':
      case 'pcd':
        return loc.descriptionFR;
      case 'de':
        return loc.descriptionDE || loc.descriptionNL;
      case 'en':
        return loc.descriptionEN || loc.descriptionNL;
      case 'es':
        return loc.descriptionES || loc.descriptionNL;
      default:
        return loc.descriptionNL;
    }
  };

  const typeLabelNL = { origin: "Oorsprong", destination: "Eindbestemming", ancestor: "Voorouders" };
  const typeLabelFR = { origin: "Origine", destination: "Destination finale", ancestor: "Ancêtres" };
  const typeLabelPCD = { origin: "Origine", destination: "Destinatione finale", ancestor: "Anchtres" };
  const typeLabelVLS = { origin: "Herkomst", destination: "Eindbestemming", ancestor: "Vôorouders" };
  const typeLabelDE = { origin: "Ursprung", destination: "Endziel", ancestor: "Vorfahren" };
  const typeLabelEN = { origin: "Origin", destination: "Final destination", ancestor: "Ancestors" };
  const typeLabelES = { origin: "Origen", destination: "Destino final", ancestor: "Antepasados" };
  
  const getTypeLabel = (type: Location["type"]) => {
    switch (language) {
      case 'fr':
        return typeLabelFR[type];
      case 'pcd':
        return typeLabelPCD[type];
      case 'vls':
        return typeLabelVLS[type];
      case 'de':
        return typeLabelDE[type];
      case 'en':
        return typeLabelEN[type];
      case 'es':
        return typeLabelES[type];
      default:
        return typeLabelNL[type];
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([50.75, 3.05], 10);

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const createIcon = (type: Location["type"]) => {
      const color = type === "origin" ? "#b45309" : type === "destination" ? "#16a34a" : "#78350f";
      return L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 24px; 
          height: 24px; 
          background: ${color}; 
          border: 3px solid white; 
          border-radius: 50%; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
    };

    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createIcon(location.type),
      }).addTo(map);

      const typeLabel = (() => {
        switch (language) {
          case 'fr':
            return location.type === "origin" ? "Origine" : location.type === "destination" ? "Destination finale" : "Ancêtres";
          case 'pcd':
            return location.type === "origin" ? "Origine" : location.type === "destination" ? "Destinatione finale" : "Anchtres";
          case 'vls':
            return location.type === "origin" ? "Herkomst" : location.type === "destination" ? "Eindbestemming" : "Vôorouders";
          case 'de':
            return location.type === "origin" ? "Ursprung" : location.type === "destination" ? "Endziel" : "Vorfahren";
          case 'en':
            return location.type === "origin" ? "Origin" : location.type === "destination" ? "Final destination" : "Ancestors";
          case 'es':
            return location.type === "origin" ? "Origen" : location.type === "destination" ? "Destino final" : "Antepasados";
          default:
            return location.type === "origin" ? "Oorsprong" : location.type === "destination" ? "Eindbestemming" : "Voorouders";
        }
      })();

      const desc = (() => {
        switch (language) {
          case 'fr':
          case 'pcd':
            return location.descriptionFR;
          case 'de':
            return location.descriptionDE || location.descriptionNL;
          case 'en':
            return location.descriptionEN || location.descriptionNL;
          case 'es':
            return location.descriptionES || location.descriptionNL;
          default:
            return location.descriptionNL;
        }
      })();

      const churchLabel = (() => {
        switch (language) {
          case 'fr':
          case 'pcd':
            return "Église";
          case 'de':
            return "Kirche";
          case 'en':
            return "Church";
          case 'es':
            return "Iglesia";
          case 'vls':
            return "Kerke";
          default:
            return "Kerk";
        }
      })();

      const historicalLabel = (() => {
        switch (language) {
          case 'fr':
          case 'pcd':
            return "Photo historique";
          case 'de':
            return "Historisches Foto";
          case 'en':
            return "Historic photo";
          case 'es':
            return "Foto histórica";
          default:
            return "Historische foto";
        }
      })();

      const clickToEnlarge = (() => {
        switch (language) {
          case 'fr':
          case 'pcd':
            return "Cliquez pour agrandir";
          case 'de':
            return "Klicken zum Vergrößern";
          case 'en':
            return "Click to enlarge";
          case 'es':
            return "Haga clic para ampliar";
          case 'vls':
            return "Klikt om te vergrôotn";
          default:
            return "Klik om te vergroten";
        }
      })();

      const historicalImageDesc = (() => {
        switch (language) {
          case 'fr':
          case 'pcd':
            return location.historicalImageDescFR || '';
          case 'de':
            return location.historicalImageDescDE || location.historicalImageDescNL || '';
          case 'en':
            return location.historicalImageDescEN || location.historicalImageDescNL || '';
          case 'es':
            return location.historicalImageDescES || location.historicalImageDescNL || '';
          default:
            return location.historicalImageDescNL || '';
        }
      })();

      const hasImages = location.churchImage || location.historicalImage;
      const hasBothImages = location.churchImage && location.historicalImage;

      marker.bindPopup(`
        <div style="min-width: 240px; max-width: ${hasBothImages ? '320px' : '280px'}; font-family: system-ui, sans-serif;">
          ${hasImages ? `
            <div style="margin: -10px -10px 10px -10px; display: flex; gap: 2px; overflow: hidden; border-radius: 4px 4px 0 0;">
              ${location.churchImage ? `
                <div style="flex: 1; position: relative; cursor: pointer;" onclick="window.openTownHallLightbox('${location.churchImage}', '${location.name.replace(/'/g, "\\'")}', 'modern')">
                  <img 
                    src="${location.churchImage}" 
                    alt="${churchLabel} ${location.name}"
                    style="width: 100%; height: 100px; object-fit: cover; transition: opacity 0.2s;"
                    onmouseover="this.style.opacity='0.8'"
                    onmouseout="this.style.opacity='1'"
                    onerror="this.parentElement.style.display='none'"
                  />
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 16px 6px 4px 6px;">
                    <p style="margin: 0; font-size: 9px; color: white; text-align: center; font-weight: 500;">
                      ${churchLabel}
                    </p>
                  </div>
                  <div style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: white; padding: 3px 5px; border-radius: 3px; font-size: 9px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                  </div>
                </div>
              ` : ''}
              ${location.historicalImage ? `
                <div style="flex: 1; position: relative; cursor: pointer;" onclick="window.openTownHallLightbox('${location.historicalImage}', '${location.name.replace(/'/g, "\\'")}', 'historical')">
                  <img 
                    src="${location.historicalImage}" 
                    alt="${historicalLabel} ${location.name}"
                    style="width: 100%; height: 100px; object-fit: cover; transition: opacity 0.2s; filter: sepia(20%);"
                    onmouseover="this.style.opacity='0.8'"
                    onmouseout="this.style.opacity='1'"
                    onerror="this.parentElement.style.display='none'"
                  />
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 16px 6px 4px 6px;">
                    <p style="margin: 0; font-size: 9px; color: white; text-align: center; font-weight: 500;">
                      ${historicalLabel}
                    </p>
                  </div>
                  <div style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.6); color: white; padding: 3px 5px; border-radius: 3px; font-size: 9px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                  </div>
                </div>
              ` : ''}
            </div>
            ${historicalImageDesc ? `
              <p style="margin: -6px 0 8px 0; font-size: 10px; color: #78350f; text-align: center; font-style: italic; line-height: 1.3;">
                ${historicalImageDesc}
              </p>
            ` : ''}
            <p style="margin: ${historicalImageDesc ? '0' : '-6px'} 0 8px 0; font-size: 9px; color: #a1a1aa; text-align: center;">
              ${clickToEnlarge}
            </p>
          ` : ''}
          <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold; color: #78350f;">
            ${location.name}
          </h3>
          ${location.nameFr ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #666; font-style: italic;">(${location.nameFr})</p>` : ""}
          <span style="
            display: inline-block;
            padding: 2px 8px;
            background: ${location.type === "origin" ? "#fef3c7" : location.type === "destination" ? "#dcfce7" : "#fef9c3"};
            color: ${location.type === "origin" ? "#b45309" : location.type === "destination" ? "#16a34a" : "#78350f"};
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            margin-bottom: 8px;
          ">${typeLabel}</span>
          ${location.period ? `<p style="margin: 8px 0 4px 0; font-size: 12px; color: #b45309; font-weight: 500;">${location.period}</p>` : ""}
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #444; line-height: 1.4;">
            ${desc}
          </p>
        </div>
      `, { maxWidth: 340 });
    });

    const routePoints: L.LatLngExpression[] = [
      [50.5719, 2.9606],  // Santes
      [50.6333, 2.9667],  // Capinghem
      [50.7256, 2.5392],  // Hazebrouck
      [50.7003, 2.8314],  // Nieppe
      [50.9167, 3.2333],  // Emelgem
      [50.9094, 3.2142],  // Izegem
    ];

    L.polyline(routePoints, {
      color: "#78350f",
      weight: 3,
      opacity: 0.6,
      dashArray: "10, 10",
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [language]);

  useEffect(() => {
    if (selectedLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
        duration: 1,
      });
    }
  }, [selectedLocation]);

  const contentNL = {
    migrationText: "In 1699 ontvluchtten Hubert Deleforge en Antoinette Follet hun woonplaats Capinghem en trokken - na omzwervingen via Hazebrouck en Nieppe noordwaarts naar Emelgem, later Izegem. Deze migratie van ongeveer 50 kilometer markeerde het begin van onze West-Vlaamse familietak.",
  };

  const contentFR = {
    migrationText: "En 1699, Hubert Deleforge et Antoinette Follet fuirent leur domicile de Capinghem et se dirigèrent — après des détours par Hazebrouck et Nieppe — vers le nord jusqu'à Emelgem, puis Izegem. Cette migration d'environ 50 kilomètres marqua le début de notre branche familiale ouest-flamande.",
  };

  const contentPCD = {
    migrationText: "In 1699, Hubert Deleforge et Antoinette Follet s'insauvèr'te ed leu moéson d'Capinghem et s'dirigèr'te — après des détours par Hazebrouck et Nieppe — vers l'nord vers Emelgem, pis Izegem. Chte migratione d'environ 50 kilomètes marqua l'début d'note branche familiére ouest-flaminde.",
  };

  const contentVLS = {
    migrationText: "In 1699 vluchtten Hubert Deleforge en Antoinette Follet uut hun woenplekke Capinghem en trokken — via omzwerviengen langs Hazebrouck en Nieppe — noar 't noorden noar Emelgem, loater Izegem. Deze migroasje van omtrent 50 kilometer markeerde 't begin van uuze West-Vlaamsche familietak.",
  };

  const contentDE = {
    migrationText: "Im Jahr 1699 flohen Hubert Deleforge und Antoinette Follet aus ihrem Wohnort Capinghem und zogen — über Umwege durch Hazebrouck und Nieppe — nordwärts nach Emelgem, später Izegem. Diese Migration von etwa 50 Kilometern markierte den Beginn unseres westflämischen Familienzweigs.",
  };

  const contentEN = {
    migrationText: "In 1699, Hubert Deleforge and Antoinette Follet fled their home in Capinghem and — after wandering through Hazebrouck and Nieppe — headed north to Emelgem, later Izegem. This migration of about 50 kilometers marked the beginning of our West Flemish family branch.",
  };

  const contentES = {
    migrationText: "En 1699, Hubert Deleforge y Antoinette Follet huyeron de su hogar en Capinghem y — tras desvíos por Hazebrouck y Nieppe — se dirigieron al norte hacia Emelgem, luego Izegem. Esta migración de unos 50 kilómetros marcó el comienzo de nuestra rama familiar de Flandes Occidental.",
  };

  const contentSV = {
    migrationText: "År 1699 flydde Hubert Deleforge och Antoinette Follet från sin hemort Capinghem och begav sig — efter omvägar via Hazebrouck och Nieppe — norrut till Emelgem, senare Izegem. Denna migration på cirka 50 kilometer markerade början på vår västflamländska familjegren.",
  };

  const content = (() => {
    switch (language) {
      case 'fr':
        return contentFR;
      case 'pcd':
        return contentPCD;
      case 'vls':
        return contentVLS;
      case 'de':
        return contentDE;
      case 'en':
        return contentEN;
      case 'es':
        return contentES;
      case 'sv':
        return contentSV;
      default:
        return contentNL;
    }
  })();

  return (
    <section id="kaart" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('kaart.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('kaart.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Historical Map Comparison Slider - Old vs Modern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8"
        >
          <div className="text-center mb-4">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary">
              {language === 'fr' ? 'Comparez: Hier et Aujourd\'hui' 
                : language === 'de' ? 'Vergleich: Damals und Heute'
                : language === 'en' ? 'Compare: Then and Now'
                : language === 'es' ? 'Comparar: Ayer y Hoy'
                : language === 'pcd' ? 'Comparez: Hier pi Aujord\'hui'
                : language === 'vls' ? 'Vergelijk: Gistr en Nu'
                : 'Vergelijk: Toen en Nu'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'fr' ? 'Faites glisser le curseur pour comparer les cartes' 
                : language === 'de' ? 'Schieben Sie den Regler, um die Karten zu vergleichen'
                : language === 'en' ? 'Drag the slider to compare maps'
                : language === 'es' ? 'Arrastre el control deslizante para comparar mapas'
                : language === 'pcd' ? 'Glissez l\'curseur pour comparer les cartes'
                : language === 'vls' ? 'Schuuft de slider om de koartn te vergelijkn'
                : 'Schuif de slider om de kaarten te vergelijken'}
            </p>
          </div>
          
          <MapComparisonSlider 
            oldMapSrc={oudeKaartVlaanderen}
            language={language}
            onZoomClick={() => setLightboxImage({ 
              src: oudeKaartVlaanderen, 
              name: language === 'fr' ? 'Carte ancienne de la Flandre' : language === 'de' ? 'Alte Karte von Flandern' : language === 'en' ? 'Old map of Flanders' : language === 'es' ? 'Mapa antiguo de Flandes' : 'Oude kaart van Vlaanderen',
              type: 'historical'
            })}
          />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="font-sans text-sm text-foreground/80">
              {t('kaart.origin')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="font-sans text-sm text-foreground/80">
              {t('kaart.ancestors')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600" />
            <span className="font-sans text-sm text-foreground/80">
              {t('kaart.destination')}
            </span>
          </div>
        </motion.div>

        {/* Interactive Leaflet Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-lg overflow-hidden shadow-elevated border border-border"
        >
          <div 
            ref={mapRef}
            className="h-[400px] md:h-[500px] relative z-0"
          />
          <div className="absolute bottom-2 left-2 bg-background/90 px-3 py-1.5 rounded text-xs font-sans text-muted-foreground z-[1000]">
            <Map className="w-3 h-3 inline mr-1" />
            {t('kaart.click')}
          </div>
        </motion.div>

        {/* Location grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
            {t('kaart.locations')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                className={`bg-background p-4 rounded-lg border shadow-vintage cursor-pointer transition-all hover:shadow-card ${
                  selectedLocation?.name === location.name
                    ? "border-accent ring-2 ring-accent/20"
                    : "border-border"
                }`}
                onClick={() => setSelectedLocation(
                  selectedLocation?.name === location.name ? null : location
                )}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      location.type === "origin"
                        ? "text-accent"
                        : location.type === "destination"
                        ? "text-green-600"
                        : "text-primary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-primary truncate flex items-center gap-2">
                      {location.name}
                      {location.historicalVideo && (
                        <Play className="w-3 h-3 text-accent flex-shrink-0" />
                      )}
                    </h4>
                    {location.nameFr && (
                      <p className="text-xs text-muted-foreground italic">
                        ({location.nameFr})
                      </p>
                    )}
                    {location.period && (
                      <p className="text-xs text-accent font-medium mt-1">
                        {location.period}
                      </p>
                    )}
                    {location.historicalVideo && selectedLocation?.name !== location.name && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {language === 'fr' ? 'Vidéo disponible' : language === 'de' ? 'Video verfügbar' : language === 'en' ? 'Video available' : language === 'es' ? 'Video disponible' : 'Video beschikbaar'}
                      </p>
                    )}
                    {selectedLocation?.name === location.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-foreground/80 mt-2"
                      >
                        {getDescription(location)}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video section for selected location */}
        <AnimatePresence>
          {selectedLocation?.historicalVideo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8"
            >
              <div className="bg-background rounded-xl overflow-hidden border border-border shadow-card">
                <div className="p-4 border-b border-border bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-accent" />
                    <div>
                      <h4 className="font-serif font-semibold text-primary">
                        {language === 'fr' ? 'Film historique' : language === 'de' ? 'Historischer Film' : language === 'en' ? 'Historical film' : language === 'es' ? 'Película histórica' : 'Historisch filmfragment'}: {selectedLocation.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          switch (language) {
                            case 'fr':
                            case 'pcd':
                              return selectedLocation.historicalVideoDescFR;
                            case 'de':
                              return selectedLocation.historicalVideoDescDE || selectedLocation.historicalVideoDescNL;
                            case 'en':
                              return selectedLocation.historicalVideoDescEN || selectedLocation.historicalVideoDescNL;
                            case 'es':
                              return selectedLocation.historicalVideoDescES || selectedLocation.historicalVideoDescNL;
                            default:
                              return selectedLocation.historicalVideoDescNL;
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <video
                    src={selectedLocation.historicalVideo}
                    controls
                    className="w-full h-auto max-h-[400px] object-contain bg-black"
                    style={{ filter: 'sepia(0.2)' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 bg-background p-6 rounded-lg border border-border shadow-vintage"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-serif font-semibold text-primary mb-2">
                {t('kaart.migration')}
              </h4>
              <p className="font-sans text-foreground/80 leading-relaxed">
                {content.migrationText}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Town Hall Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
              aria-label={language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : 'Sluiten'}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={`${lightboxImage.type === 'historical' 
                  ? (language === 'fr' ? 'Photo historique' : language === 'de' ? 'Historisches Foto' : language === 'en' ? 'Historic photo' : language === 'es' ? 'Foto histórica' : 'Historische foto')
                  : (language === 'fr' ? 'Église' : language === 'de' ? 'Kirche' : language === 'en' ? 'Church' : language === 'es' ? 'Iglesia' : 'Kerk')
                } ${lightboxImage.name}`}
                className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-elevated ${
                  lightboxImage.type === 'historical' ? 'sepia-[0.15]' : ''
                }`}
              />
              <div className="bg-card px-6 py-3 rounded-lg border border-border text-center">
                <p className="text-sm text-muted-foreground">
                  {lightboxImage.type === 'historical' 
                    ? (language === 'fr' ? 'Photo historique' : language === 'de' ? 'Historisches Foto' : language === 'en' ? 'Historic photo' : language === 'es' ? 'Foto histórica' : 'Historische foto')
                    : (language === 'fr' ? 'Église' : language === 'de' ? 'Kirche' : language === 'en' ? 'Church' : language === 'es' ? 'Iglesia' : 'Kerk')
                  }
                </p>
                <h3 className="font-serif text-xl font-bold text-primary">
                  {lightboxImage.name}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HistorischeKaart;
