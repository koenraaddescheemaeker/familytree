import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Archive, FileText, ExternalLink, MapPin, Church, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Source {
  titleNL: string;
  titleFR: string;
  titleEN: string;
  titleES: string;
  titleDE: string;
  titlePCD: string;
  titleVLS: string;
  titleSV?: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionDE: string;
  descriptionPCD: string;
  descriptionVLS: string;
  descriptionSV?: string;
  link?: string;
  icon: React.ReactNode;
}

interface SourceCategory {
  categoryNL: string;
  categoryFR: string;
  categoryEN: string;
  categoryES: string;
  categoryDE: string;
  categoryPCD: string;
  categoryVLS: string;
  categorySV?: string;
  sources: Source[];
}

const sourceCategories: SourceCategory[] = [
  {
    categoryNL: "Parochieregisters & Burgerlijke Stand",
    categoryFR: "Registres paroissiaux & État civil",
    categoryEN: "Parish Registers & Civil Registry",
    categoryES: "Registros Parroquiales & Registro Civil",
    categoryDE: "Kirchenbücher & Standesamt",
    categoryPCD: "Régisses d'paroiche & État civile",
    categoryVLS: "Parochieregisters & Borgerlyken Stand",
    categorySV: "Församlingsregister & Folkbokföring",
    sources: [
      {
        titleNL: "Rijksarchief België - Parochieregisters Izegem",
        titleFR: "Archives de l'État Belgique - Registres paroissiaux Izegem",
        titleEN: "State Archives Belgium - Parish Registers Izegem",
        titleES: "Archivos del Estado Bélgica - Registros Parroquiales Izegem",
        titleDE: "Staatsarchiv Belgien - Kirchenbücher Izegem",
        titlePCD: "Archîves éd l'État Bèlgique - Régisses d'paroiche Izegem",
        titleVLS: "Ryksarchief België - Parochieregisters Izegem",
        titleSV: "Riksarkivet Belgien - Församlingsregister Izegem",
        descriptionNL: "Doop-, huwelijks- en overlijdensakten van de parochie Izegem (1600-1796). Belangrijkste bron voor de vroege generaties Deleforge/Delforce/Deforce.",
        descriptionFR: "Actes de baptême, mariage et décès de la paroisse d'Izegem (1600-1796). Source principale pour les premières générations Deleforge/Delforce/Deforce.",
        descriptionEN: "Baptism, marriage and death records of the Izegem parish (1600-1796). Main source for the early Deleforge/Delforce/Deforce generations.",
        descriptionES: "Actas de bautismo, matrimonio y defunción de la parroquia de Izegem (1600-1796). Fuente principal para las primeras generaciones Deleforge/Delforce/Deforce.",
        descriptionDE: "Tauf-, Heirats- und Sterbeurkunden der Pfarrei Izegem (1600-1796). Hauptquelle für die frühen Generationen Deleforge/Delforce/Deforce.",
        descriptionPCD: "Actes éd batème, mariache et décès d'el paroiche d'Izegem (1600-1796). Source principale pour les preumières générateons Deleforge/Delforce/Deforce.",
        descriptionVLS: "Dôop-, huweliks- en overlydensakten van de parochie Izegem (1600-1796). Belangrykste bron vôor de vroege generoaties Deleforge/Delforce/Deforce.",
        descriptionSV: "Dop-, vigsel- och dödshandlingar från Izegem församling (1600-1796). Huvudkälla för de tidiga generationerna Deleforge/Delforce/Deforce.",
        link: "https://search.arch.be",
        icon: <Church className="w-5 h-5" />
      },
      {
        titleNL: "Rijksarchief België - Parochieregisters Emelgem",
        titleFR: "Archives de l'État Belgique - Registres paroissiaux Emelgem",
        titleEN: "State Archives Belgium - Parish Registers Emelgem",
        titleES: "Archivos del Estado Bélgica - Registros Parroquiales Emelgem",
        titleDE: "Staatsarchiv Belgien - Kirchenbücher Emelgem",
        titlePCD: "Archîves éd l'État Bèlgique - Régisses d'paroiche Emelgem",
        titleVLS: "Ryksarchief België - Parochieregisters Emelgem",
        titleSV: "Riksarkivet Belgien - Församlingsregister Emelgem",
        descriptionNL: "Parochieregisters van Emelgem, waar meerdere generaties van de familie woonden en werkten als houtbewerkers.",
        descriptionFR: "Registres paroissiaux d'Emelgem, où plusieurs générations de la famille ont vécu et travaillé comme travailleurs du bois.",
        descriptionEN: "Parish registers of Emelgem, where several generations of the family lived and worked as woodworkers.",
        descriptionES: "Registros parroquiales de Emelgem, donde varias generaciones de la familia vivieron y trabajaron como trabajadores de la madera.",
        descriptionDE: "Kirchenbücher von Emelgem, wo mehrere Generationen der Familie lebten und als Holzarbeiter tätig waren.",
        descriptionPCD: "Régisses d'paroiche d'Emelgem, ousqu' plusiors générateons d'el famille ont vétchu et ouvré comme boquillons.",
        descriptionVLS: "Parochieregisters van Emelgem, woar meerdere generoaties van de familie woonden en werkten als houtbewerkers.",
        descriptionSV: "Församlingsregister från Emelgem, där flera generationer av familjen bodde och arbetade som träarbetare.",
        link: "https://search.arch.be",
        icon: <Church className="w-5 h-5" />
      },
      {
        titleNL: "Archives Départementales du Nord - Lille",
        titleFR: "Archives Départementales du Nord - Lille",
        titleEN: "Departmental Archives of the North - Lille",
        titleES: "Archivos Departamentales del Norte - Lille",
        titleDE: "Departementsarchiv Nord - Lille",
        titlePCD: "Archîves Départémintales du Nord - Lille",
        titleVLS: "Archives Départementales du Nord - Rysel",
        titleSV: "Departementsarkivet i Nord - Lille",
        descriptionNL: "Huwelijksakte Hubert Deleforge & Antoinette Follet (18 april 1685). Verkoopakte eigendom Hallennes (1699).",
        descriptionFR: "Acte de mariage Hubert Deleforge & Antoinette Follet (18 avril 1685). Acte de vente propriété Hallennes (1699).",
        descriptionEN: "Marriage certificate Hubert Deleforge & Antoinette Follet (April 18, 1685). Sale deed property Hallennes (1699).",
        descriptionES: "Acta de matrimonio Hubert Deleforge & Antoinette Follet (18 de abril de 1685). Escritura de venta propiedad Hallennes (1699).",
        descriptionDE: "Heiratsurkunde Hubert Deleforge & Antoinette Follet (18. April 1685). Kaufvertrag Grundstück Hallennes (1699).",
        descriptionPCD: "Acte éd mariache Hubert Deleforge & Antoinette Follet (18 avri 1685). Acte éd vinte propriété Hallennes (1699).",
        descriptionVLS: "Huweleksakte Hubert Deleforge & Antoinette Follet (18 april 1685). Verkôopakte eigendom Hallennes (1699).",
        descriptionSV: "Vigselbevis Hubert Deleforge & Antoinette Follet (18 april 1685). Köpebrev fastighet Hallennes (1699).",
        link: "https://archivesdepartementales.lenord.fr",
        icon: <Archive className="w-5 h-5" />
      },
      {
        titleNL: "Burgerlijke Stand Izegem (vanaf 1796)",
        titleFR: "État civil Izegem (à partir de 1796)",
        titleEN: "Civil Registry Izegem (from 1796)",
        titleES: "Registro Civil Izegem (desde 1796)",
        titleDE: "Standesamt Izegem (ab 1796)",
        titlePCD: "État civile Izegem (à partir éd 1796)",
        titleVLS: "Borgerlyken Stand Izegem (vanaf 1796)",
        titleSV: "Folkbokföring Izegem (från 1796)",
        descriptionNL: "Geboorte-, huwelijks- en overlijdensakten na de invoering van de burgerlijke stand onder Napoleon.",
        descriptionFR: "Actes de naissance, mariage et décès après l'introduction de l'état civil sous Napoléon.",
        descriptionEN: "Birth, marriage and death certificates after the introduction of civil registration under Napoleon.",
        descriptionES: "Actas de nacimiento, matrimonio y defunción tras la introducción del registro civil bajo Napoleón.",
        descriptionDE: "Geburts-, Heirats- und Sterbeurkunden nach der Einführung des Standesamtes unter Napoleon.",
        descriptionPCD: "Actes éd naissance, mariache et décès après l'introducteon d'l'état civile sous Napoléon.",
        descriptionVLS: "Geboorte-, huweliks- en overlydensakten noa de invoerienge van de borgerlyken stand onder Napoleon.",
        descriptionSV: "Födelse-, vigsel- och dödsbevis efter införandet av folkbokföring under Napoleon.",
        icon: <FileText className="w-5 h-5" />
      }
    ]
  },
  {
    categoryNL: "Militaire Archieven",
    categoryFR: "Archives militaires",
    categoryEN: "Military Archives",
    categoryES: "Archivos Militares",
    categoryDE: "Militärarchive",
    categoryPCD: "Archîves militaires",
    categoryVLS: "Militaire Archieven",
    categorySV: "Militärarkiv",
    sources: [
      {
        titleNL: "Koninklijk Museum van het Leger - Brussel",
        titleFR: "Musée Royal de l'Armée - Bruxelles",
        titleEN: "Royal Museum of the Armed Forces - Brussels",
        titleES: "Museo Real del Ejército - Bruselas",
        titleDE: "Königliches Armeemuseum - Brüssel",
        titlePCD: "Musée Royal d'l'Armée - Brusselles",
        titleVLS: "Keuninkelyk Museum van 't Leger - Brussel",
        titleSV: "Kungliga Armémuseet - Bryssel",
        descriptionNL: "Militaire stamboeken Charles Louis Deforce: legerdienst 1877-1880 als mineur bij de genie.",
        descriptionFR: "Livrets militaires Charles Louis Deforce : service militaire 1877-1880 comme mineur au génie.",
        descriptionEN: "Military service records Charles Louis Deforce: army service 1877-1880 as miner in the engineering corps.",
        descriptionES: "Registros de servicio militar Charles Louis Deforce: servicio militar 1877-1880 como minero en el cuerpo de ingenieros.",
        descriptionDE: "Militärische Stammbücher Charles Louis Deforce: Militärdienst 1877-1880 als Mineur beim Pionierbataillon.",
        descriptionPCD: "Livréts militaires Charles Louis Deforce : service militaire 1877-1880 comme mineur au génie.",
        descriptionVLS: "Militaire stamboeken Charles Louis Deforce: legerdienst 1877-1880 as mineur by de genie.",
        descriptionSV: "Militära stamrullor Charles Louis Deforce: militärtjänst 1877-1880 som minör vid ingenjörkåren.",
        link: "https://www.klm-mra.be",
        icon: <Users className="w-5 h-5" />
      },
      {
        titleNL: "In Flanders Fields Museum - Ieper",
        titleFR: "In Flanders Fields Museum - Ypres",
        titleEN: "In Flanders Fields Museum - Ypres",
        titleES: "Museo In Flanders Fields - Ypres",
        titleDE: "In Flanders Fields Museum - Ypern",
        titlePCD: "In Flanders Fields Museum - Ieper",
        titleVLS: "In Flanders Fields Museum - Ieper",
        titleSV: "In Flanders Fields Museum - Ypern",
        descriptionNL: "Documentatie over de IJzerlinie en het leven in bezet België tijdens WO1 (1914-1918).",
        descriptionFR: "Documentation sur la ligne de l'Yser et la vie en Belgique occupée pendant la Première Guerre mondiale (1914-1918).",
        descriptionEN: "Documentation about the Yser Line and life in occupied Belgium during WWI (1914-1918).",
        descriptionES: "Documentación sobre la Línea del Yser y la vida en Bélgica ocupada durante la Primera Guerra Mundial (1914-1918).",
        descriptionDE: "Dokumentation über die Yser-Linie und das Leben im besetzten Belgien während des Ersten Weltkriegs (1914-1918).",
        descriptionPCD: "Documentateon su l'ligne d'l'Yser et l'vie in Bèlgique occupée durant l'Preumière Guère Mondiale (1914-1918).",
        descriptionVLS: "Documentoatie over de Yzerlinie en 't leven in bezet België tydens WO1 (1914-1918).",
        descriptionSV: "Dokumentation om Yser-linjen och livet i ockuperade Belgien under första världskriget (1914-1918).",
        link: "https://www.inflandersfields.be",
        icon: <MapPin className="w-5 h-5" />
      }
    ]
  },
  {
    categoryNL: "Historische Kaarten",
    categoryFR: "Cartes historiques",
    categoryEN: "Historical Maps",
    categoryES: "Mapas Históricos",
    categoryDE: "Historische Karten",
    categoryPCD: "Cartes histôriques",
    categoryVLS: "Historische Koarten",
    categorySV: "Historiska kartor",
    sources: [
      {
        titleNL: "Ferrariskaart (1771-1778)",
        titleFR: "Carte de Ferraris (1771-1778)",
        titleEN: "Ferraris Map (1771-1778)",
        titleES: "Mapa de Ferraris (1771-1778)",
        titleDE: "Ferrariskarte (1771-1778)",
        titlePCD: "Carte éd Ferraris (1771-1778)",
        titleVLS: "Ferrariskoarte (1771-1778)",
        titleSV: "Ferrariskarta (1771-1778)",
        descriptionNL: "De Kabinetskaart van de Oostenrijkse Nederlanden door graaf de Ferraris. Toont Izegem, Emelgem en omgeving in de 18e eeuw.",
        descriptionFR: "La Carte de Cabinet des Pays-Bas autrichiens par le comte de Ferraris. Montre Izegem, Emelgem et environs au XVIIIe siècle.",
        descriptionEN: "The Cabinet Map of the Austrian Netherlands by Count de Ferraris. Shows Izegem, Emelgem and surroundings in the 18th century.",
        descriptionES: "El Mapa de Gabinete de los Países Bajos Austríacos por el Conde de Ferraris. Muestra Izegem, Emelgem y alrededores en el siglo XVIII.",
        descriptionDE: "Die Kabinettskarte der Österreichischen Niederlande von Graf de Ferraris. Zeigt Izegem, Emelgem und Umgebung im 18. Jahrhundert.",
        descriptionPCD: "L'Carte éd Cabinet des Pays-Bas autrichiens par el conte de Ferraris. Montre Izegem, Emelgem et alintours au XVIIIe siècle.",
        descriptionVLS: "De Kabinetskoarte van de Ôostenryksche Nederlanden deur graaf de Ferraris. Toont Izegem, Emelgem en omgevienge in de 18e eiuw.",
        descriptionSV: "Kabinettskartan över Österrikiska Nederländerna av greve de Ferraris. Visar Izegem, Emelgem och omgivningar på 1700-talet.",
        link: "https://www.kbr.be/nl/ferraris",
        icon: <MapPin className="w-5 h-5" />
      },
      {
        titleNL: "Popp-kaarten (1842-1879)",
        titleFR: "Plans Popp (1842-1879)",
        titleEN: "Popp Maps (1842-1879)",
        titleES: "Mapas Popp (1842-1879)",
        titleDE: "Popp-Karten (1842-1879)",
        titlePCD: "Plans Popp (1842-1879)",
        titleVLS: "Popp-koarten (1842-1879)",
        titleSV: "Popp-kartor (1842-1879)",
        descriptionNL: "Kadastrale atlas van België door Philippe-Christian Popp. Gedetailleerde perceelskaarten met eigenaars.",
        descriptionFR: "Atlas cadastral de Belgique par Philippe-Christian Popp. Plans parcellaires détaillés avec propriétaires.",
        descriptionEN: "Cadastral atlas of Belgium by Philippe-Christian Popp. Detailed parcel maps with owners.",
        descriptionES: "Atlas catastral de Bélgica por Philippe-Christian Popp. Mapas parcelarios detallados con propietarios.",
        descriptionDE: "Katasteratlas von Belgien von Philippe-Christian Popp. Detaillierte Flurkarten mit Eigentümern.",
        descriptionPCD: "Atlas cadastral d'Bèlgique par Philippe-Christian Popp. Plans parcellaires détaillés aveuc propriétaires.",
        descriptionVLS: "Kadastrale atlas van België deur Philippe-Christian Popp. Gedetailleerde perceelskoarten met eigenoars.",
        descriptionSV: "Katasteratlas över Belgien av Philippe-Christian Popp. Detaljerade fastighetskartor med ägare.",
        link: "https://www.kbr.be",
        icon: <MapPin className="w-5 h-5" />
      }
    ]
  },
  {
    categoryNL: "Secundaire Bronnen & Literatuur",
    categoryFR: "Sources secondaires & Littérature",
    categoryEN: "Secondary Sources & Literature",
    categoryES: "Fuentes Secundarias & Literatura",
    categoryDE: "Sekundärquellen & Literatur",
    categoryPCD: "Sources secoundaires & Littérature",
    categoryVLS: "Secundaire Bronnen & Literatuur",
    categorySV: "Sekundärkällor & Litteratur",
    sources: [
      {
        titleNL: "Heemkundige Kring Ten Mandere - Izegem",
        titleFR: "Cercle d'histoire locale Ten Mandere - Izegem",
        titleEN: "Local History Society Ten Mandere - Izegem",
        titleES: "Círculo de Historia Local Ten Mandere - Izegem",
        titleDE: "Heimatkundlicher Verein Ten Mandere - Izegem",
        titlePCD: "Cercle d'histoére locale Ten Mandere - Izegem",
        titleVLS: "Heemkundige Kring Ten Mandere - Izegem",
        titleSV: "Hembygdsföreningen Ten Mandere - Izegem",
        descriptionNL: "Heemkundig tijdschrift en archief voor Izegem, Emelgem en Kachtem. Uitgebreid archief met indexen op persoonsnaam. Open elke zaterdag 9.15-11.30u in het stadhuis (Korenmarkt 9, 4e verdieping). Contact: info@tenmandere.be",
        descriptionFR: "Revue et archives d'histoire locale pour Izegem, Emelgem et Kachtem. Archives complètes avec index par nom. Ouvert chaque samedi 9h15-11h30 à la mairie (Korenmarkt 9, 4e étage). Contact: info@tenmandere.be",
        descriptionEN: "Local history journal and archive for Izegem, Emelgem and Kachtem. Extensive archive with name indexes. Open every Saturday 9:15-11:30 at the town hall (Korenmarkt 9, 4th floor). Contact: info@tenmandere.be",
        descriptionES: "Revista y archivo de historia local para Izegem, Emelgem y Kachtem. Archivo extenso con índices de nombres. Abierto cada sábado 9:15-11:30 en el ayuntamiento (Korenmarkt 9, 4º piso). Contacto: info@tenmandere.be",
        descriptionDE: "Heimatkundliche Zeitschrift und Archiv für Izegem, Emelgem und Kachtem. Umfangreiches Archiv mit Namensregistern. Jeden Samstag 9:15-11:30 im Rathaus (Korenmarkt 9, 4. Stock) geöffnet. Kontakt: info@tenmandere.be",
        descriptionPCD: "Revue et archîves d'histoére locale pour Izegem, Emelgem et Kachtem. Archîves complètes aveuc index par nom. Ouvert chaque samedi 9h15-11h30 al mairie (Korenmarkt 9, 4e étache). Contact: info@tenmandere.be",
        descriptionVLS: "Heemkundig tydschrift en archief vôor Izegem, Emelgem en Kachtem. Uutgebreid archief met indexen op persôonsnôame. Open elke zoaterdag 9.15-11.30u in 't stadhuis (Korenmarkt 9, 4e verdieping). Contact: info@tenmandere.be",
        descriptionSV: "Hembygdstidskrift och arkiv för Izegem, Emelgem och Kachtem. Omfattande arkiv med namnregister. Öppet varje lördag 9.15-11.30 i stadshuset (Korenmarkt 9, 4:e våningen). Kontakt: info@tenmandere.be",
        link: "https://www.tenmandere.be",
        icon: <Archive className="w-5 h-5" />
      },
      {
        titleNL: "Stadsarchief Izegem",
        titleFR: "Archives municipales d'Izegem",
        titleEN: "Izegem City Archives",
        titleES: "Archivo Municipal de Izegem",
        titleDE: "Stadtarchiv Izegem",
        titlePCD: "Archîves municipales d'Izegem",
        titleVLS: "Stadsarchief Izegem",
        titleSV: "Izegems stadsarkiv",
        descriptionNL: "Archieven van de stad Izegem, Kachtem en Emelgem. Kerkfabrieksarchieven, kadastergegevens en gemeentelijke documenten. Enkel op afspraak. Contact: archief@izegem.be",
        descriptionFR: "Archives de la ville d'Izegem, Kachtem et Emelgem. Archives des fabriques d'église, données cadastrales et documents municipaux. Sur rendez-vous uniquement. Contact: archief@izegem.be",
        descriptionEN: "Archives of the city of Izegem, Kachtem and Emelgem. Church fabric archives, cadastral data and municipal documents. By appointment only. Contact: archief@izegem.be",
        descriptionES: "Archivos de la ciudad de Izegem, Kachtem y Emelgem. Archivos de fábricas de iglesias, datos catastrales y documentos municipales. Solo con cita previa. Contacto: archief@izegem.be",
        descriptionDE: "Archive der Stadt Izegem, Kachtem und Emelgem. Kirchenfabrikarchive, Katasterdaten und kommunale Dokumente. Nur nach Vereinbarung. Kontakt: archief@izegem.be",
        descriptionPCD: "Archîves d'el ville d'Izegem, Kachtem et Emelgem. Archîves des fabriques d'églîse, données cadastrales et documents municipaux. Su rindez-vous seulement. Contact: archief@izegem.be",
        descriptionVLS: "Archieven van de stad Izegem, Kachtem en Emelgem. Kerkfabrieksarchieven, kadastergegevens en gemeentelyke documenten. Enkel op ofsprôake. Contact: archief@izegem.be",
        descriptionSV: "Arkiv för staden Izegem, Kachtem och Emelgem. Kyrkoarkiv, fastighetsdata och kommunala dokument. Endast efter tidsbokning. Kontakt: archief@izegem.be",
        link: "https://www.izegem.be/archief",
        icon: <Archive className="w-5 h-5" />
      },
      {
        titleNL: "Lokale Geschiedkundige Publicaties",
        titleFR: "Publications historiques locales",
        titleEN: "Local Historical Publications",
        titleES: "Publicaciones Históricas Locales",
        titleDE: "Lokale historische Publikationen",
        titlePCD: "Publicateons histôriques locales",
        titleVLS: "Lokale Geschiedkundige Publicoaties",
        titleSV: "Lokala historiska publikationer",
        descriptionNL: "Publicaties over ambachten, gilden en het dagelijks leven in Izegem door de eeuwen heen.",
        descriptionFR: "Publications sur les métiers, guildes et la vie quotidienne à Izegem à travers les siècles.",
        descriptionEN: "Publications about crafts, guilds and daily life in Izegem through the centuries.",
        descriptionES: "Publicaciones sobre oficios, gremios y la vida cotidiana en Izegem a través de los siglos.",
        descriptionDE: "Publikationen über Handwerk, Zünfte und das Alltagsleben in Izegem durch die Jahrhunderte.",
        descriptionPCD: "Publicateons su les métiers, guildes et l'vie dé tos les jours à Izegem à travers les siècles.",
        descriptionVLS: "Publicoaties over ambachten, gilden en 't dageliks leven in Izegem deur de eiuwen ene.",
        descriptionSV: "Publikationer om hantverk, skrån och vardagslivet i Izegem genom århundradena.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        titleNL: "De Vlaamse Textielnijverheid (1750-1900)",
        titleFR: "L'industrie textile flamande (1750-1900)",
        titleEN: "The Flemish Textile Industry (1750-1900)",
        titleES: "La Industria Textil Flamenca (1750-1900)",
        titleDE: "Die flämische Textilindustrie (1750-1900)",
        titlePCD: "L'industrîe textile flaminde (1750-1900)",
        titleVLS: "De Vlaamsche Textielnevereid (1750-1900)",
        titleSV: "Den flamländska textilindustrin (1750-1900)",
        descriptionNL: "Academische studies over de opkomst en neergang van de linnennijverheid en de impact op plattelandsgemeenschappen.",
        descriptionFR: "Études académiques sur l'essor et le déclin de l'industrie linière et l'impact sur les communautés rurales.",
        descriptionEN: "Academic studies on the rise and fall of the linen industry and the impact on rural communities.",
        descriptionES: "Estudios académicos sobre el auge y declive de la industria del lino y el impacto en las comunidades rurales.",
        descriptionDE: "Akademische Studien über Aufstieg und Niedergang der Leinenindustrie und die Auswirkungen auf ländliche Gemeinschaften.",
        descriptionPCD: "Études académiques su l'essor et l'déclin d'l'industrîe linière et l'impact su les communautés rurales.",
        descriptionVLS: "Akademische studies over de opkomst en neergank van de linnennevereid en de impact op plattelandsgemeenschappen.",
        descriptionSV: "Akademiska studier om linnenindustrins uppgång och fall och påverkan på landsbygdssamhällen.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        titleNL: "Les Boquillons de Flandre française",
        titleFR: "Les Boquillons de Flandre française",
        titleEN: "The Boquillons of French Flanders",
        titleES: "Los Boquillons de Flandes Francés",
        titleDE: "Die Boquillons von Französisch-Flandern",
        titlePCD: "Les Boquillons d'Flande française",
        titleVLS: "De Boquillons van Fransch Vlaanderen",
        titleSV: "Boquillons från Franska Flandern",
        descriptionNL: "Studie over het traditionele beroep van houtarbeiders in de bossen rond Lille (17e-18e eeuw).",
        descriptionFR: "Étude sur le métier traditionnel des travailleurs du bois dans les forêts autour de Lille (XVIIe-XVIIIe siècle).",
        descriptionEN: "Study on the traditional profession of woodworkers in the forests around Lille (17th-18th century).",
        descriptionES: "Estudio sobre la profesión tradicional de los trabajadores de la madera en los bosques alrededor de Lille (siglos XVII-XVIII).",
        descriptionDE: "Studie über das traditionelle Handwerk der Holzarbeiter in den Wäldern um Lille (17.-18. Jahrhundert).",
        descriptionPCD: "Étude su l'métier traditeonnel des boquillons dins les bos alintour d'Lille (XVIIe-XVIIIe siècle).",
        descriptionVLS: "Studie over 't traditionele beroep van houtarbeiders in de bosschen rond Rysel (17e-18e eiuw).",
        descriptionSV: "Studie om det traditionella yrket träarbetare i skogarna runt Lille (1600-1700-talet).",
        icon: <BookOpen className="w-5 h-5" />
      }
    ]
  },
  {
    categoryNL: "Online Genealogische Databanken",
    categoryFR: "Bases de données généalogiques en ligne",
    categoryEN: "Online Genealogical Databases",
    categoryES: "Bases de Datos Genealógicas en Línea",
    categoryDE: "Online-Genealogische Datenbanken",
    categoryPCD: "Bases éd données généalogiques in ligne",
    categoryVLS: "Online Genealogische Databanken",
    categorySV: "Genealogiska databaser online",
    sources: [
      {
        titleNL: "FamilySearch",
        titleFR: "FamilySearch",
        titleEN: "FamilySearch",
        titleES: "FamilySearch",
        titleDE: "FamilySearch",
        titlePCD: "FamilySearch",
        titleVLS: "FamilySearch",
        titleSV: "FamilySearch",
        descriptionNL: "Gedigitaliseerde parochie- en burgerlijke standregisters van België en Noord-Frankrijk.",
        descriptionFR: "Registres paroissiaux et d'état civil numérisés de Belgique et du Nord de la France.",
        descriptionEN: "Digitized parish and civil registration records from Belgium and Northern France.",
        descriptionES: "Registros parroquiales y de registro civil digitalizados de Bélgica y el norte de Francia.",
        descriptionDE: "Digitalisierte Kirchenbücher und Standesamtsregister aus Belgien und Nordfrankreich.",
        descriptionPCD: "Régisses d'paroiche et d'état civile numérisés d'Bèlgique et du Nord d'el France.",
        descriptionVLS: "Gedigitaliseerde parochie- en borgerlyke standregisters van België en Noord-Frankryk.",
        descriptionSV: "Digitaliserade församlings- och folkbokföringsregister från Belgien och norra Frankrike.",
        link: "https://www.familysearch.org",
        icon: <Users className="w-5 h-5" />
      },
      {
        titleNL: "Geneanet",
        titleFR: "Geneanet",
        titleEN: "Geneanet",
        titleES: "Geneanet",
        titleDE: "Geneanet",
        titlePCD: "Geneanet",
        titleVLS: "Geneanet",
        titleSV: "Geneanet",
        descriptionNL: "Stambomen en genealogische gegevens gedeeld door onderzoekers wereldwijd.",
        descriptionFR: "Arbres généalogiques et données partagés par des chercheurs du monde entier.",
        descriptionEN: "Family trees and genealogical data shared by researchers worldwide.",
        descriptionES: "Árboles genealógicos y datos compartidos por investigadores de todo el mundo.",
        descriptionDE: "Stammbäume und genealogische Daten, die von Forschern weltweit geteilt werden.",
        descriptionPCD: "Arbres généalogiques et données partajés par des chercheurs du monne intier.",
        descriptionVLS: "Stambôomen en genealogische gegevens gedeeld deur onderzoekers weireldwyd.",
        descriptionSV: "Släktträd och genealogiska data delade av forskare världen över.",
        link: "https://www.geneanet.org",
        icon: <Users className="w-5 h-5" />
      },
      {
        titleNL: "Rijksarchief België - Zoeken naar personen",
        titleFR: "Archives de l'État Belgique - Recherche de personnes",
        titleEN: "State Archives Belgium - Person Search",
        titleES: "Archivos del Estado Bélgica - Búsqueda de Personas",
        titleDE: "Staatsarchiv Belgien - Personensuche",
        titlePCD: "Archîves éd l'État Bèlgique - Rechèrche éd personnes",
        titleVLS: "Ryksarchief België - Zoeken noar persôonen",
        titleSV: "Riksarkivet Belgien - Personsökning",
        descriptionNL: "Digitale toegang tot gescande archiefstukken en indexen van het Belgisch Rijksarchief.",
        descriptionFR: "Accès numérique aux documents d'archives numérisés et index des Archives de l'État belge.",
        descriptionEN: "Digital access to scanned archive documents and indexes of the Belgian State Archives.",
        descriptionES: "Acceso digital a documentos de archivo escaneados e índices de los Archivos del Estado belga.",
        descriptionDE: "Digitaler Zugang zu gescannten Archivdokumenten und Indizes des Belgischen Staatsarchivs.",
        descriptionPCD: "Accès numérique eux documents d'archîves numérisés et index des Archîves éd l'État bèlge.",
        descriptionVLS: "Digitale toegang tot gescande archiefstukken en indexen van 't Belgisch Ryksarchief.",
        descriptionSV: "Digital tillgång till skannade arkivdokument och register från Belgiens riksarkiv.",
        link: "https://search.arch.be",
        icon: <Archive className="w-5 h-5" />
      }
    ]
  }
];

const Bronnen = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const getCategory = (cat: SourceCategory) => {
    switch (language) {
      case 'fr': return cat.categoryFR;
      case 'en': return cat.categoryEN;
      case 'es': return cat.categoryES;
      case 'de': return cat.categoryDE;
      case 'pcd': return cat.categoryPCD;
      case 'vls': return cat.categoryVLS;
      case 'sv': return cat.categorySV || cat.categoryEN;
      default: return cat.categoryNL;
    }
  };

  const getTitle = (source: Source) => {
    switch (language) {
      case 'fr': return source.titleFR;
      case 'en': return source.titleEN;
      case 'es': return source.titleES;
      case 'de': return source.titleDE;
      case 'pcd': return source.titlePCD;
      case 'vls': return source.titleVLS;
      case 'sv': return source.titleSV || source.titleEN;
      default: return source.titleNL;
    }
  };

  const getDescription = (source: Source) => {
    switch (language) {
      case 'fr': return source.descriptionFR;
      case 'en': return source.descriptionEN;
      case 'es': return source.descriptionES;
      case 'de': return source.descriptionDE;
      case 'pcd': return source.descriptionPCD;
      case 'vls': return source.descriptionVLS;
      case 'sv': return source.descriptionSV || source.descriptionEN;
      default: return source.descriptionNL;
    }
  };

  const sectionLabel: Record<string, string> = {
    nl: 'Documentatie',
    fr: 'Documentation',
    en: 'Documentation',
    es: 'Documentación',
    de: 'Dokumentation',
    pcd: 'Documentateon',
    vls: 'Documentoatie',
    sv: 'Dokumentation'
  };

  const sectionTitle: Record<string, string> = {
    nl: 'Bronnen & Archieven',
    fr: 'Sources & Archives',
    en: 'Sources & Archives',
    es: 'Fuentes & Archivos',
    de: 'Quellen & Archive',
    pcd: 'Sources & Archîves',
    vls: 'Bronnen & Archieven',
    sv: 'Källor & Arkiv'
  };

  const sectionSubtitle: Record<string, string> = {
    nl: "Overzicht van de primaire en secundaire bronnen gebruikt voor het genealogisch onderzoek van de familie Deforce.",
    fr: "Aperçu des sources primaires et secondaires utilisées pour la recherche généalogique de la famille Deforce.",
    en: "Overview of primary and secondary sources used for the genealogical research of the Deforce family.",
    es: "Resumen de las fuentes primarias y secundarias utilizadas para la investigación genealógica de la familia Deforce.",
    de: "Übersicht der primären und sekundären Quellen, die für die genealogische Forschung der Familie Deforce verwendet wurden.",
    pcd: "Aperchu des sources primaires et secoundaires utilisées pour l'rechèrche généalogique d'el famille Deforce.",
    vls: "Overzicht van de primaire en secundaire bronnen gebruikt vôor 't genealogisch onderzoek van de familie Deforce.",
    sv: "Översikt över primära och sekundära källor som används för den genealogiska forskningen om familjen Deforce."
  };

  const externalLinkLabel: Record<string, string> = {
    nl: 'Open externe link',
    fr: 'Ouvrir le lien externe',
    en: 'Open external link',
    es: 'Abrir enlace externo',
    de: 'Externen Link öffnen',
    pcd: 'Ouvrir el lien extèrne',
    vls: 'Open externe link',
    sv: 'Öppna extern länk'
  };

  const disclaimerText: Record<string, string> = {
    nl: "Dit genealogisch onderzoek is een werk in uitvoering. Sommige informatie kan onvolledig zijn of herzien worden. Correcties en aanvullingen zijn welkom.",
    fr: "Cette recherche généalogique est un travail en cours. Certaines informations peuvent être incomplètes ou sujettes à révision. Des corrections et ajouts sont les bienvenus.",
    en: "This genealogical research is a work in progress. Some information may be incomplete or subject to revision. Corrections and additions are welcome.",
    es: "Esta investigación genealógica es un trabajo en progreso. Alguna información puede estar incompleta o sujeta a revisión. Las correcciones y adiciones son bienvenidas.",
    de: "Diese genealogische Forschung ist ein laufendes Projekt. Einige Informationen können unvollständig sein oder überarbeitet werden. Korrekturen und Ergänzungen sind willkommen.",
    pcd: "Chel rechèrche généalogique est un ouvrage in cours. Quèques informations pouront ête incomplètes ou sujettes à réviseon. Des correcteons et ajouts sont les bienvenus.",
    vls: "Dit genealogisch onderzoek is e werk in uutvoerienge. Sommige informoatie kan onvolledig zyn of herzien worden. Correcties en aanvullingen zyn welkom.",
    sv: "Denna genealogiska forskning är ett pågående arbete. Viss information kan vara ofullständig eller kan komma att revideras. Korrigeringar och tillägg är välkomna."
  };

  const lang = language as string;

  return (
    <section id="bronnen" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm">
            {sectionLabel[lang]}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {sectionTitle[lang]}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle[lang]}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="multiple" className="space-y-4">
            {sourceCategories.map((category, categoryIndex) => (
              <AccordionItem 
                key={categoryIndex} 
                value={`category-${categoryIndex}`}
                className="bg-background border border-border rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <Archive className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {getCategory(category)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({category.sources.length})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4 pt-2">
                    {category.sources.map((source, sourceIndex) => (
                      <div 
                        key={sourceIndex}
                        className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-border/50"
                      >
                        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg h-fit">
                          {source.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-foreground">
                              {getTitle(source)}
                            </h4>
                            {source.link && (
                              <a 
                                href={source.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-1.5 hover:bg-accent/20 rounded transition-colors"
                                aria-label={externalLinkLabel[lang]}
                              >
                                <ExternalLink className="w-4 h-4 text-accent" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getDescription(source)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            {disclaimerText[lang]}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Bronnen;
