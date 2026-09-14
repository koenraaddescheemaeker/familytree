import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpDown, Search, Users, Calendar, Clock, BarChart3, AlertTriangle, Heart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { parseGedcom, type GedcomData, type GedcomIndividual } from "@/lib/gedcomParser";
import { supabase } from "@/integrations/supabase/client";
import ReadMore from "@/components/ui/ReadMore";

const GEDCOM_BUCKET = "gedcom-files";
const GEDCOM_FILE = "current.ged";

/** Convert GEDCOM date (e.g. "1 JAN 1900", "ABT 1555", "BEF 1620") to a simple string for parseDate */
const convertGedcomDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  // Remove qualifiers
  const cleaned = dateStr.replace(/^(ABT|BEF|AFT|CAL|EST|FROM|TO|BET|AND)\s*/gi, '').trim();
  const months: Record<string, string> = {
    JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
    JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
  };
  // "1 JAN 1900" or "JAN 1900"
  const fullMatch = cleaned.match(/^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})$/i);
  if (fullMatch) {
    const [, d, m, y] = fullMatch;
    return `${d.padStart(2, '0')}/${months[m.toUpperCase()] || '01'}/${y}`;
  }
  const monthYear = cleaned.match(/^([A-Z]{3})\s+(\d{4})$/i);
  if (monthYear) {
    return `${months[monthYear[1].toUpperCase()] || '01'}/${monthYear[2]}`;
  }
  const yearOnly = cleaned.match(/^(\d{4})$/);
  if (yearOnly) {
    // Add ~ prefix if original had qualifier
    const hasQualifier = /^(ABT|BEF|AFT|CAL|EST)/i.test(dateStr);
    return hasQualifier ? `~${yearOnly[1]}` : yearOnly[1];
  }
  return dateStr;
};

/** Find an individual by name (case-insensitive partial match) */
const findIndividualByName = (data: GedcomData, searchName: string): GedcomIndividual | undefined => {
  const lower = searchName.toLowerCase();
  for (const indi of data.individuals.values()) {
    if (indi.fullName.toLowerCase().includes(lower)) return indi;
  }
  return undefined;
};

/** Collect all descendants of a person recursively */
const collectDescendants = (data: GedcomData, personId: string, visited = new Set<string>()): GedcomIndividual[] => {
  if (visited.has(personId)) return [];
  visited.add(personId);
  const person = data.individuals.get(personId);
  if (!person) return [];
  
  const result: GedcomIndividual[] = [person];
  
  // Find families where this person is a spouse
  for (const famId of person.familySpouse) {
    const fam = data.families.get(famId);
    if (!fam) continue;
    // Also include the spouse
    const spouseId = fam.husbandId === personId ? fam.wifeId : fam.husbandId;
    if (spouseId && !visited.has(spouseId)) {
      const spouse = data.individuals.get(spouseId);
      if (spouse) {
        visited.add(spouseId);
        result.push(spouse);
      }
    }
    // Recurse into children
    for (const childId of fam.childIds) {
      result.push(...collectDescendants(data, childId, visited));
    }
  }
  
  return result;
};
interface DeceasedPerson {
  name: string;
  birthDate: string;
  deathDate: string;
  age: number | null;
  ageDisplay: string;
  source: 'stamboom' | 'afstammelingen' | 'historisch';
  generation?: number;
  notes?: string;
  dataSource?: 'myheritage' | 'handmatig' | 'verrijkt';
}

// Parse dd/mm/yyyy or just year
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [d, m, y] = parts.map(Number);
    if (d && m && y) return new Date(y, m - 1, d);
  }
  if (parts.length === 2) {
    // mm/yyyy format like "01/2003"
    const [m, y] = parts.map(Number);
    if (m && y) return new Date(y, m - 1, 1);
  }
  const year = parseInt(dateStr);
  if (!isNaN(year) && year > 1000) return new Date(year, 0, 1);
  return null;
};

const calculateAge = (birthStr: string, deathStr: string): { age: number | null; display: string } => {
  const birth = parseDate(birthStr);
  const death = parseDate(deathStr);
  if (!birth || !death) return { age: null, display: "?" };

  let age = death.getFullYear() - birth.getFullYear();
  const monthDiff = death.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 1) {
    const months = (death.getFullYear() - birth.getFullYear()) * 12 + death.getMonth() - birth.getMonth();
    if (months < 1) {
      const days = Math.floor((death.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      return { age: 0, display: `${days} dagen` };
    }
    return { age: 0, display: `${months} maand${months > 1 ? 'en' : ''}` };
  }

  return { age, display: `${age} jaar` };
};

// Combined data from all sources
const allDeceased: DeceasedPerson[] = [
  // From Stamboom - older generations
  ...[
    { name: "Bauduin Deleforge", birthDate: "~1555", deathDate: "~1620", notes: "Vroegste bekende voorvader" },
    { name: "Hypolite Deleforge", birthDate: "~1590", deathDate: "~1650", notes: "Zoon van Bauduin" },
    { name: "Hubert Deleforge senior", birthDate: "~1630", deathDate: "~1690", notes: "Vader van stamvader Hubert" },
    { name: "Marie Grimbel", birthDate: "~1635", deathDate: "", notes: "Moeder van stamvader Hubert, uit Beaucamps-Ligny" },
    { name: "Hubert Deleforge", birthDate: "1662", deathDate: "1729", notes: "Stamvader" },
    { name: "Antoinette Follet", birthDate: "~1665", deathDate: "", notes: "Stammoeder" },
    { name: "Antonia Deleforge", birthDate: "~1686", deathDate: "~1750", notes: "Dochter van stamvader Hubert" },
    { name: "Jacobus Franciscus Deleforge", birthDate: "1694", deathDate: "1772", notes: "" },
    { name: "Hubert Delforge junior", birthDate: "~1700", deathDate: "~1750", notes: "Jongste zoon van stamvader Hubert" },
    { name: "Georgius Delforce", birthDate: "1731", deathDate: "1807", notes: "" },
    { name: "Petrus Augustinus Delforge", birthDate: "1773", deathDate: "1840", notes: "" },
    { name: "Jean François Deforche", birthDate: "1815", deathDate: "1871", notes: "" },
    { name: "Albert Delforge", birthDate: "", deathDate: "1752", notes: "" },
    { name: "Charles Louis Deforce", birthDate: "1857", deathDate: "1938", notes: "Overgrootvader" },
    { name: "Achille Cyrille Deforce", birthDate: "1885", deathDate: "1885", notes: "†5 maanden oud" },
    { name: "Jean François Cyrille Deforce", birthDate: "1886", deathDate: "1955", notes: "Timmerman/meubelmaker" },
    { name: "Alois Constant Deforce", birthDate: "1887", deathDate: "1893", notes: "†6 jaar oud" },
    { name: "Maria Magdalena Deforce", birthDate: "1889", deathDate: "1970", notes: "\"Tante Leine\"" },
    { name: "Odile Camille Deforce", birthDate: "1891", deathDate: "1891", notes: "†enkele maanden oud" },
    { name: "Elisa Palmyre Deforce", birthDate: "1893", deathDate: "1893", notes: "†enkele maanden oud" },
    { name: "Joseph Constant Deforce", birthDate: "1896", deathDate: "1897", notes: "†baby" },
    { name: "Alberic Camiel Deforce", birthDate: "1899", deathDate: "1920", notes: "Zoon uit 2e huwelijk" },
    { name: "Magdalena Geldof", birthDate: "1897", deathDate: "1971", notes: "Echtgenote Marcel" },
    { name: "Emile Geldof", birthDate: "1865", deathDate: "1951", notes: "Vader van Magdalena" },
    { name: "Marie-Louise d'Artois", birthDate: "~1866", deathDate: "1893", notes: "1e echtgenote Emile Geldof, †na bevalling" },
    { name: "Maria Magdalena Geldof", birthDate: "1893", deathDate: "1895", notes: "Dochtertje uit 1e huwelijk Emile, †2 jaar oud" },
    { name: "Joseph Geldof", birthDate: "1894", deathDate: "1966", notes: "Zoon van Emile, oud-strijder WO I, Vuurkruiser" },
    { name: "Margareta Geldof", birthDate: "1898", deathDate: "1967", notes: "Dochter van Emile" },
    { name: "Maurice Geldof", birthDate: "1902", deathDate: "1979", notes: "Zoon van Emile" },
    { name: "Philippe Charles Rousseau", birthDate: "", deathDate: "", notes: "Echtgenoot Antonia Deleforge, immigrant uit Bondues" },
    { name: "Marie Leonie Vandenbroucke", birthDate: "~1860", deathDate: "", notes: "1e echtgenote Charles Louis" },
  ].map(p => {
    const { age, display } = calculateAge(p.birthDate, p.deathDate);
    return { ...p, age, ageDisplay: display, source: 'stamboom' as const };
  }),

  // From MarcelAfstammelingen
  ...[
    { name: "Marcel August Deforce", birthDate: "16/08/1894", deathDate: "09/12/1963", generation: 0 },
    { name: "Maria Margaretha Deforce", birthDate: "23/10/1918", deathDate: "05/12/1983", generation: 1 },
    { name: "Jooris Joseph (Georges) Deforce", birthDate: "21/02/1921", deathDate: "22/12/1984", generation: 1 },
    { name: "Béatrice Thérèse Deforce", birthDate: "13/10/1922", deathDate: "06/01/1924", generation: 1 },
    { name: "Béatrice Euphrasie Deforce", birthDate: "03/05/1924", deathDate: "05/07/1926", generation: 1 },
    { name: "André Maurice Deforce", birthDate: "27/02/1926", deathDate: "11/06/1999", generation: 1 },
    { name: "Daniël Michel Deforce", birthDate: "31/08/1927", deathDate: "26/04/2004", generation: 1 },
    { name: "Lucien Camille Deforce", birthDate: "09/12/1929", deathDate: "07/10/2003", generation: 1 },
    { name: "Hendrik Cyriel Deforce", birthDate: "30/09/1931", deathDate: "27/06/2013", generation: 1 },
    { name: "Monique (Monica Alice) Deforce", birthDate: "07/11/1932", deathDate: "10/08/2017", generation: 1 },
    { name: "Bérénice Flavie Deforce", birthDate: "21/01/1934", deathDate: "01/2003", generation: 1 },
    { name: "Félice Adrienne Deforce", birthDate: "05/08/1935", deathDate: "30/11/2022", generation: 1 },
    { name: "Gabriël Wilfried Deforce", birthDate: "11/01/1937", deathDate: "16/08/2014", generation: 1 },
    { name: "Jan Emiel Louis Deforce", birthDate: "11/11/1945", deathDate: "21/03/1946", generation: 2 },
    { name: "Luc Norbert Leopold Deforce", birthDate: "19/04/1948", deathDate: "24/08/2024", generation: 2 },
    { name: "Geert Marie Lucien Deforce", birthDate: "21/05/1949", deathDate: "26/01/2009", generation: 2 },
    { name: "Kathy Deforce", birthDate: "09/11/1954", deathDate: "19/10/1999", generation: 2 },
    { name: "Béatrix Nicole Deforce", birthDate: "06/12/1955", deathDate: "22/01/1957", generation: 2 },
  ].map(p => {
    const { age, display } = calculateAge(p.birthDate, p.deathDate);
    return { ...p, age, ageDisplay: display, source: 'afstammelingen' as const, notes: undefined };
  }),

  // Historische figuren vermeld op de site
  ...[
    // Van Steenkiste genealogie (EmileGeldof.tsx)
    { name: "Zeger Van Steenkiste", birthDate: "~1340", deathDate: "1382", notes: "Vermoord na Slag bij Westrozebeke" },
    { name: "Willem Van Steenkiste", birthDate: "1380", deathDate: "~1436", notes: "Zoon van Zeger" },
    { name: "Wouter Van Steenkiste", birthDate: "1439", deathDate: "1470", notes: "Van Steenkiste-lijn" },
    { name: "Joos Van Steenkiste", birthDate: "1465", deathDate: "1513", notes: "Van Steenkiste-lijn" },
    { name: "Gheeraert Vansteenkiste", birthDate: "1503", deathDate: "1554", notes: "Van Steenkiste-lijn" },
    { name: "Joos Vansteenkiste", birthDate: "~1525", deathDate: "~1578", notes: "Van Steenkiste-lijn" },
    { name: "Elisabeth Clays", birthDate: "1585", deathDate: "1632", notes: "Van Steenkiste-verwant" },
    { name: "Jan Vansteenkiste", birthDate: "1637", deathDate: "1705", notes: "Van Steenkiste-lijn" },
    { name: "Tanneken Holvoet", birthDate: "1639", deathDate: "1702", notes: "Echtgenote Jan Vansteenkiste" },
    { name: "Joanna Basijn", birthDate: "1673", deathDate: "1754", notes: "Van Steenkiste-verwant" },
    { name: "Carolus Vansteenkiste", birthDate: "1697", deathDate: "1776", notes: "Van Steenkiste-lijn" },
    { name: "Silvester Vansteenkiste", birthDate: "~1729", deathDate: "1808", notes: "Van Steenkiste-lijn" },
    { name: "Crecentia Amalberga Vansteenkiste", birthDate: "1772", deathDate: "1837", notes: "Van Steenkiste-lijn" },
    { name: "Sophia Parmentier", birthDate: "1801", deathDate: "1862", notes: "Van Steenkiste-verwant" },
    { name: "Theresia Catharina Werbrouck", birthDate: "1830", deathDate: "1893", notes: "Van Steenkiste-verwant" },
    { name: "Maria Theresia Vanderheeren", birthDate: "1868", deathDate: "1926", notes: "Echtgenote Emile Geldof" },
    // Historische figuren uit OorlogsGeschiedenis / Stamouders
    { name: "Filips van Artevelde", birthDate: "1340", deathDate: "1382", notes: "Leider Gentse Opstand, gesneuveld Westrozebeke" },
    { name: "Gilles Van den Neste", birthDate: "~1350", deathDate: "1382", notes: "Vermoord door Bretoenen, Slag bij Westrozebeke" },
    { name: "Lodewijk van Male", birthDate: "1330", deathDate: "1384", notes: "Graaf van Vlaanderen" },
    { name: "Karel VI van Frankrijk", birthDate: "1368", deathDate: "1422", notes: "Koning van Frankrijk" },
    { name: "Lodewijk XIV", birthDate: "1638", deathDate: "1715", notes: "Koning van Frankrijk, oorlogen in Vlaanderen" },
    // Verschaeve & Vandromme
    { name: "Cyriel Verschaeve", birthDate: "1874", deathDate: "1949", notes: "Priester-dichter, verre verwant Deforce" },
    { name: "Antoon Vandromme", birthDate: "1919", deathDate: "1988", notes: "Kunstenaar uit Izegem" },
    { name: "Maurice Deleforge", birthDate: "1933", deathDate: "2018", notes: "Professor ESJ Lille, auteur 'Labaobou'" },
    // Burgemeesters van Izegem (overleden)
    { name: "Joseph Vanden Bogaerde", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1830-1832" },
    { name: "Jean-Baptiste Tanghe", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1836-1848" },
    { name: "Charles Vandenberghe", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1848-1857" },
    { name: "August Vandenberghe", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1857-1884" },
    { name: "Jules Bossaert", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1885-1895" },
    { name: "Eugène Rosseel", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1895-1900" },
    { name: "Valère Vanden Bogaerde", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1900-1904" },
    { name: "Emile Allewaert", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1945-1958 (CVP)" },
    { name: "André Bourgeois", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1965-1970 (CVP)" },
    { name: "Gustaaf Nyffels", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1971-1976 & 1983 (BSP/SP)" },
    { name: "Robert Vanlerberghe", birthDate: "", deathDate: "", notes: "Burgemeester Izegem 1983-1988 (SP)" },
  ].map(p => {
    const { age, display } = calculateAge(p.birthDate, p.deathDate);
    return { ...p, age, ageDisplay: display, source: 'historisch' as const };
  }),

  // Partners (overleden, data nog aan te vullen)
  ...[
    { name: "Simonne Adèle Vandeputte", birthDate: "", deathDate: "overleden", notes: "Echtgenote Georges Deforce" },
    { name: "Francina Brion", birthDate: "", deathDate: "overleden", notes: "Echtgenote André Deforce" },
    { name: "Hedwige Hoet", birthDate: "", deathDate: "overleden", notes: "Echtgenote Daniël Deforce" },
    { name: "Maria Decaigny", birthDate: "", deathDate: "overleden", notes: "Echtgenote Lucien Deforce" },
    { name: "Monique Carlier", birthDate: "", deathDate: "overleden", notes: "Echtgenote Hendrik Deforce" },
    { name: "Hendrik Geldof", birthDate: "", deathDate: "overleden", notes: "Echtgenoot Monique Deforce" },
    { name: "Max Autier", birthDate: "", deathDate: "overleden", notes: "Echtgenoot Bérénice Deforce" },
    { name: "Michel Goddaer", birthDate: "", deathDate: "overleden", notes: "Echtgenoot Félice Deforce" },
    { name: "Erna De Four", birthDate: "", deathDate: "overleden", notes: "Echtgenote Gabriël Deforce" },
    { name: "Joris Tinel", birthDate: "", deathDate: "", notes: "Echtgenoot Kathy Deforce" },
    { name: "Marleen Dobbels", birthDate: "", deathDate: "overleden", notes: "Echtgenote Luc Deforce" },
    { name: "Andrea Vynckier", birthDate: "", deathDate: "overleden", notes: "Echtgenote Geert Deforce" },
    { name: "Veronica Barbier", birthDate: "", deathDate: "", notes: "Echtgenote Jacobus Fr. Deleforge" },
    { name: "Maria Catharina Bonte", birthDate: "", deathDate: "", notes: "Echtgenote Georgius Delforce" },
    { name: "Maria Theresia Maertens", birthDate: "", deathDate: "", notes: "Echtgenote Petrus Aug. Delforge" },
    { name: "Francisca Vandewalle", birthDate: "", deathDate: "", notes: "Echtgenote Jean Fr. Deforche" },
    { name: "Leonie Plancke", birthDate: "", deathDate: "", notes: "2e echtgenote Charles Louis" },
    { name: "Silvia Maria Van Coillie", birthDate: "", deathDate: "", notes: "3e echtgenote Charles Louis" },
    { name: "Maria-Theresia Vanderheeren", birthDate: "", deathDate: "", notes: "Echtgenote Emile Geldof" },
    { name: "Judoca Reynaert", birthDate: "", deathDate: "", notes: "Echtgenote Albert Delforge, Ingelmunster" },
    { name: "Isabella De Man", birthDate: "", deathDate: "", notes: "Echtgenote Hubert Delforge junior, Izegem" },
    { name: "Madeleine Rogier", birthDate: "", deathDate: "", notes: "Moeder van Marie Grimbel, uit Loos" },
  ].map(p => ({
    ...p,
    age: null,
    ageDisplay: "?",
    source: 'stamboom' as const,
  })),
].filter(p => p.deathDate && p.deathDate !== "" && p.birthDate !== "~1665");

type SortKey = 'age' | 'name' | 'death' | 'birth';

const translations = {
  nl: {
    title: "Overledenen",
    subtitle: "Alle overleden familieleden die afstammen van onze stamvader Bauduin Deleforge, partners en historische figuren",
    historisch: "Historisch",
    back: "Terug naar hoofdpagina",
    name: "Naam",
    birth: "Geboorte",
    death: "Overlijden",
    age: "Leeftijd",
    notes: "Opmerkingen",
    search: "Zoek op naam...",
    total: "personen",
    avgAge: "Gem. leeftijd",
    oldest: "Oudste",
    youngest: "Jongste",
    years: "jaar",
    unknown: "onbekend",
  },
  en: {
    title: "Deceased",
    subtitle: "All deceased family members descending from our patriarch Bauduin Deleforge, their partners and historical figures",
    historisch: "Historical",
    back: "Back to main page",
    name: "Name",
    birth: "Birth",
    death: "Death",
    age: "Age",
    notes: "Notes",
    search: "Search by name...",
    total: "persons",
    avgAge: "Avg. age",
    oldest: "Oldest",
    youngest: "Youngest",
    years: "years",
    unknown: "unknown",
  },
  fr: {
    title: "Décédés",
    subtitle: "Tous les membres décédés de la famille descendant de notre patriarche Bauduin Deleforge, leurs conjoints et figures historiques",
    historisch: "Historique",
    back: "Retour à la page principale",
    name: "Nom",
    birth: "Naissance",
    death: "Décès",
    age: "Âge",
    notes: "Remarques",
    search: "Rechercher par nom...",
    total: "personnes",
    avgAge: "Âge moyen",
    oldest: "Plus âgé",
    youngest: "Plus jeune",
    years: "ans",
    unknown: "inconnu",
  },
  es: {
    title: "Fallecidos",
    subtitle: "Todos los miembros fallecidos de la familia descendientes de nuestro patriarca Bauduin Deleforge, sus parejas y figuras históricas",
    historisch: "Histórico",
    back: "Volver a la página principal",
    name: "Nombre",
    birth: "Nacimiento",
    death: "Fallecimiento",
    age: "Edad",
    notes: "Observaciones",
    search: "Buscar por nombre...",
    total: "personas",
    avgAge: "Edad media",
    oldest: "Mayor",
    youngest: "Menor",
    years: "años",
    unknown: "desconocido",
  },
  de: {
    title: "Verstorbene",
    subtitle: "Alle verstorbenen Familienmitglieder, die von unserem Stammvater Bauduin Deleforge abstammen, deren Partner und historische Figuren",
    historisch: "Historisch",
    back: "Zurück zur Hauptseite",
    name: "Name",
    birth: "Geburt",
    death: "Tod",
    age: "Alter",
    notes: "Anmerkungen",
    search: "Nach Name suchen...",
    total: "Personen",
    avgAge: "Durchschn. Alter",
    oldest: "Älteste",
    youngest: "Jüngste",
    years: "Jahre",
    unknown: "unbekannt",
  },
  sv: {
    title: "Avlidna",
    subtitle: "Alla avlidna familjemedlemmar som härstammar från vår stamfader Bauduin Deleforge, deras partners och historiska personer",
    historisch: "Historisk",
    back: "Tillbaka till huvudsidan",
    name: "Namn",
    birth: "Födelse",
    death: "Död",
    age: "Ålder",
    notes: "Anmärkningar",
    search: "Sök på namn...",
    total: "personer",
    avgAge: "Medelålder",
    oldest: "Äldst",
    youngest: "Yngst",
    years: "år",
    unknown: "okänd",
  },
  pcd: {
    title: "Décédés",
    subtitle: "Tous chés mimbres décédés d'eul famille qui déchindent d'noute patriarche Bauduin Deleforge, leus conjoints et figures historiques",
    historisch: "Historique",
    back: "Ertourner à l'page principale",
    name: "Nom",
    birth: "Naissance",
    death: "Décès",
    age: "Âche",
    notes: "Remarques",
    search: "Chercher par nom...",
    total: "personnes",
    avgAge: "Âche moyen",
    oldest: "L'pus viu",
    youngest: "L'pus juène",
    years: "ans",
    unknown: "inconnu",
  },
  vls: {
    title: "Overledenen",
    subtitle: "Alle overleden familieleden die afstammen van uuzen stamvoader Bauduin Deleforge, partners en historische figuren",
    historisch: "Historisch",
    back: "Terug noar d'oofdpagina",
    name: "Noam",
    birth: "Geboorte",
    death: "Overliên",
    age: "Leeftied",
    notes: "Opmerkiengn",
    search: "Zuuk ip noam...",
    total: "minsn",
    avgAge: "Gem. leeftied",
    oldest: "Oudste",
    youngest: "Juungste",
    years: "joar",
    unknown: "onbekend",
  },
};

const Overledenen = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.nl;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortAsc, setSortAsc] = useState(false);
  const [gedcomPersons, setGedcomPersons] = useState<DeceasedPerson[]>([]);
  const [allGedcomDescendants, setAllGedcomDescendants] = useState<GedcomIndividual[]>([]);
  const [gedcomFullData, setGedcomFullData] = useState<GedcomData | null>(null);
  const [gedcomLoading, setGedcomLoading] = useState(true);

  // Load GEDCOM data from storage and extract Bauduin Deleforge descendants
  useEffect(() => {
    const loadGedcom = async () => {
      try {
        // Private bucket: only signed-in users can download the GEDCOM file
        const { data: blob, error: downloadError } = await supabase.storage.from(GEDCOM_BUCKET).download(GEDCOM_FILE);
        if (downloadError || !blob) { setGedcomLoading(false); return; }
        const text = await blob.text();
        if (!text || text.length < 10 || !text.includes('HEAD')) { setGedcomLoading(false); return; }

        const gedcomData = parseGedcom(text);
        const bauduin = findIndividualByName(gedcomData, 'Bauduin');
        if (!bauduin) { setGedcomLoading(false); return; }

        const descendants = collectDescendants(gedcomData, bauduin.id);
        
        const deceased: DeceasedPerson[] = descendants
          .filter(indi => indi.deathDate)
          .map(indi => {
            const birthStr = convertGedcomDate(indi.birthDate);
            const deathStr = convertGedcomDate(indi.deathDate);
            const { age, display } = calculateAge(birthStr, deathStr);
            return {
              name: indi.fullName,
              birthDate: birthStr,
              deathDate: deathStr,
              age,
              ageDisplay: display,
              source: 'stamboom' as const,
              notes: indi.occupation || undefined,
            };
          });

        setGedcomPersons(deceased);
        setAllGedcomDescendants(descendants);
        setGedcomFullData(gedcomData);
      } catch (e) {
        console.error('Failed to load GEDCOM for Overledenen:', e);
      } finally {
        setGedcomLoading(false);
      }
    };
    loadGedcom();
  }, []);

  // Merge hardcoded + GEDCOM data: GEDCOM (MyHeritage) takes priority for dates
  const mergedDeceased = useMemo(() => {
    const nameKey = (name: string) => name.toLowerCase().replace(/[^a-zà-ÿ]/g, '');
    
    // Build a lookup from GEDCOM data by normalized name
    const gedcomByName = new Map<string, DeceasedPerson>();
    for (const gp of gedcomPersons) {
      gedcomByName.set(nameKey(gp.name), gp);
    }
    
    // Enrich hardcoded entries with GEDCOM data (GEDCOM takes priority for dates)
    const enriched = allDeceased.map(person => {
      const key = nameKey(person.name);
      const gedcomMatch = gedcomByName.get(key);
      if (!gedcomMatch) return { ...person, dataSource: 'handmatig' as const };
      
      const hardcodedHasRealDeath = person.deathDate && person.deathDate !== 'overleden' && person.deathDate !== '';
      const gedcomHasDeath = gedcomMatch.deathDate && gedcomMatch.deathDate !== '';
      
      if (!gedcomHasDeath && !hardcodedHasRealDeath) {
        return null;
      }
      
      const birthDate = gedcomMatch.birthDate || person.birthDate;
      const deathDate = gedcomHasDeath ? gedcomMatch.deathDate : person.deathDate;
      const { age, display } = calculateAge(birthDate, deathDate);
      
      return {
        ...person,
        birthDate,
        deathDate,
        age,
        ageDisplay: display,
        dataSource: 'verrijkt' as const,
      };
    }).filter((p): p is NonNullable<typeof p> => p !== null) as DeceasedPerson[];
    
    // Add GEDCOM-only persons not in hardcoded list
    const hardcodedKeys = new Set(allDeceased.map(p => nameKey(p.name)));
    const newFromGedcom = gedcomPersons.filter(p => !hardcodedKeys.has(nameKey(p.name))).map(p => ({ ...p, dataSource: 'myheritage' as const }));
    
    return [...enriched, ...newFromGedcom];
  }, [gedcomPersons]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === 'name');
    }
  };

  const filtered = useMemo(() => {
    let items = mergedDeceased.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    items.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'age':
          cmp = (a.age ?? -1) - (b.age ?? -1);
          break;
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'death':
          cmp = (parseDate(a.deathDate)?.getTime() ?? 0) - (parseDate(b.deathDate)?.getTime() ?? 0);
          break;
        case 'birth':
          cmp = (parseDate(a.birthDate)?.getTime() ?? 0) - (parseDate(b.birthDate)?.getTime() ?? 0);
          break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return items;
  }, [searchTerm, sortKey, sortAsc, mergedDeceased]);

  const stats = useMemo(() => {
    const withAge = mergedDeceased.filter(p => p.age !== null && p.age > 0);
    const ages = withAge.map(p => p.age!);
    const avg = ages.length > 0 ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length) : 0;
    const oldest = withAge.reduce((max, p) => (p.age! > (max?.age ?? 0) ? p : max), withAge[0]);
    const youngest = mergedDeceased.filter(p => p.age !== null).reduce((min, p) => ((p.age ?? 999) < (min?.age ?? 999) ? p : min), mergedDeceased[0]);
    return { total: mergedDeceased.length, avg, oldest, youngest };
  }, [mergedDeceased]);

  // Dynamically compute peak child mortality from GEDCOM data
  const peakMortality = useMemo(() => {
    if (allGedcomDescendants.length === 0) return { rate: 0, century: '' };
    const centuries = ['17e', '18e', '19e', '20e', '21e'];
    const ranges: Record<string, [number, number]> = {
      '17e': [1600, 1699], '18e': [1700, 1799], '19e': [1800, 1899], '20e': [1900, 1999], '21e': [2000, 2099],
    };
    const extractYr = (d?: string) => { const m = d?.replace(/^(ABT|BEF|AFT|CAL|EST)\s*/gi, '').match(/(\d{4})/); return m ? parseInt(m[1]) : null; };
    let maxRate = 0;
    let maxCentury = '';
    for (const c of centuries) {
      const [s, e] = ranges[c];
      let total = 0, died = 0;
      for (const indi of allGedcomDescendants) {
        const by = extractYr(indi.birthDate);
        if (!by || by < s || by > e) continue;
        total++;
        const dy = extractYr(indi.deathDate);
        if (dy && indi.birthDate && indi.deathDate) {
          const bStr = convertGedcomDate(indi.birthDate);
          const dStr = convertGedcomDate(indi.deathDate);
          const { age } = calculateAge(bStr, dStr);
          if (age !== null && age < 5) died++;
        }
      }
      const rate = total > 0 ? Math.round((died / total) * 100) : 0;
      if (rate > maxRate) { maxRate = rate; maxCentury = c; }
    }
    return { rate: maxRate, century: maxCentury };
  }, [allGedcomDescendants]);

  // Dynamically compute grandmother-known stats from GEDCOM
  const gmKnownStats = useMemo(() => {
    if (!gedcomFullData || allGedcomDescendants.length === 0) return { count: 0, maxYears: 0 };
    const extractYear = (d?: string) => { const m = d?.replace(/^(ABT|BEF|AFT|CAL|EST)\s*/gi, '').match(/(\d{4})/); return m ? parseInt(m[1]) : null; };
    const seen = new Set<string>();
    let count = 0;
    let maxYrs = 0;
    for (const indi of allGedcomDescendants) {
      const birthYear = extractYear(indi.birthDate);
      if (!birthYear) continue;
      for (const famId of indi.familyChild) {
        const fam = gedcomFullData.families.get(famId);
        if (!fam) continue;
        const parentIds = [fam.husbandId, fam.wifeId].filter(Boolean) as string[];
        for (const parentId of parentIds) {
          const parent = gedcomFullData.individuals.get(parentId);
          if (!parent) continue;
          for (const parentFamId of parent.familyChild) {
            const parentFam = gedcomFullData.families.get(parentFamId);
            if (!parentFam || !parentFam.wifeId) continue;
            const gm = gedcomFullData.individuals.get(parentFam.wifeId);
            if (!gm || !gm.deathDate) continue;
            const gmDeath = extractYear(gm.deathDate);
            if (!gmDeath || birthYear >= gmDeath) continue;
            const key = `${indi.id}-${gm.id}`;
            if (seen.has(key)) continue;
            seen.add(key);
            const years = gmDeath - birthYear;
            count++;
            if (years > maxYrs) maxYrs = years;
          }
        }
      }
    }
    return { count, maxYears: maxYrs };
  }, [gedcomFullData, allGedcomDescendants]);

  // Centralized GEDCOM analysis: all grandparent/parent relationships
  const gedcomAnalysis = useMemo(() => {
    const extractYear = (d?: string) => { const m = d?.replace(/^(ABT|BEF|AFT|CAL|EST)\s*/gi, '').match(/(\d{4})/); return m ? parseInt(m[1]) : null; };
    type GapItem = { person: string; born: number; grandfather: string; died: number; gap: number };
    type GmGapItem = { person: string; born: number; grandmother: string; died: number; gap: number };
    type KnownGfItem = { person: string; born: number; grandfather: string; grandfatherDied: number; years: number };
    type ParentItem = { person: string; born: number; parent: string; parentDied: number; years: number };
    type ChildrenItem = { parent: string; children: number; period: string; survived: number | null; childNames: string };

    const result = {
      neverKnewGrandfather: [] as GapItem[],
      neverKnewGrandmother: [] as GmGapItem[],
      longestKnewGrandfather: [] as KnownGfItem[],
      longestKnewFather: [] as ParentItem[],
      longestKnewMother: [] as ParentItem[],
      mostChildren: [] as ChildrenItem[],
    };
    if (!gedcomFullData || allGedcomDescendants.length === 0) return result;

    const seenGf = new Set<string>();
    const seenGm = new Set<string>();
    const seenGfKnown = new Set<string>();
    const seenFather = new Set<string>();
    const seenMother = new Set<string>();

    for (const indi of allGedcomDescendants) {
      const birthYear = extractYear(indi.birthDate);
      if (!birthYear) continue;

      for (const famId of indi.familyChild) {
        const fam = gedcomFullData.families.get(famId);
        if (!fam) continue;

        // Father & Mother analysis
        const fatherId = fam.husbandId;
        const motherId = fam.wifeId;

        if (fatherId) {
          const father = gedcomFullData.individuals.get(fatherId);
          if (father?.deathDate) {
            const fatherDeath = extractYear(father.deathDate);
            if (fatherDeath && birthYear < fatherDeath) {
              const key = `${indi.id}-${fatherId}`;
              if (!seenFather.has(key)) {
                seenFather.add(key);
                result.longestKnewFather.push({ person: indi.fullName, born: birthYear, parent: father.fullName, parentDied: fatherDeath, years: fatherDeath - birthYear });
              }
            }
          }
        }

        if (motherId) {
          const mother = gedcomFullData.individuals.get(motherId);
          if (mother?.deathDate) {
            const motherDeath = extractYear(mother.deathDate);
            if (motherDeath && birthYear < motherDeath) {
              const key = `${indi.id}-${motherId}`;
              if (!seenMother.has(key)) {
                seenMother.add(key);
                result.longestKnewMother.push({ person: indi.fullName, born: birthYear, parent: mother.fullName, parentDied: motherDeath, years: motherDeath - birthYear });
              }
            }
          }
        }

        // Grandfather & Grandmother analysis (via both parents)
        const parentIds = [fatherId, motherId].filter(Boolean) as string[];
        for (const parentId of parentIds) {
          const parent = gedcomFullData.individuals.get(parentId);
          if (!parent) continue;
          for (const parentFamId of parent.familyChild) {
            const parentFam = gedcomFullData.families.get(parentFamId);
            if (!parentFam) continue;

            // Grandfather (husband of parent's family)
            if (parentFam.husbandId) {
              const gf = gedcomFullData.individuals.get(parentFam.husbandId);
              if (gf?.deathDate) {
                const gfDeath = extractYear(gf.deathDate);
                if (gfDeath) {
                  const key = `${indi.id}-${gf.id}`;
                  if (birthYear >= gfDeath) {
                    if (!seenGf.has(key)) { seenGf.add(key); result.neverKnewGrandfather.push({ person: indi.fullName, born: birthYear, grandfather: gf.fullName, died: gfDeath, gap: birthYear - gfDeath }); }
                  } else {
                    if (!seenGfKnown.has(key)) { seenGfKnown.add(key); result.longestKnewGrandfather.push({ person: indi.fullName, born: birthYear, grandfather: gf.fullName, grandfatherDied: gfDeath, years: gfDeath - birthYear }); }
                  }
                }
              }
            }

            // Grandmother (wife of parent's family)
            if (parentFam.wifeId) {
              const gm = gedcomFullData.individuals.get(parentFam.wifeId);
              if (gm?.deathDate) {
                const gmDeath = extractYear(gm.deathDate);
                if (gmDeath && birthYear >= gmDeath) {
                  const key = `${indi.id}-${gm.id}`;
                  if (!seenGm.has(key)) { seenGm.add(key); result.neverKnewGrandmother.push({ person: indi.fullName, born: birthYear, grandmother: gm.fullName, died: gmDeath, gap: birthYear - gmDeath }); }
                }
              }
            }
          }
        }
      }
    }

    // Most children analysis
    for (const [, fam] of gedcomFullData.families) {
      if (fam.childIds.length < 3) continue;
      const husband = fam.husbandId ? gedcomFullData.individuals.get(fam.husbandId) : null;
      const wife = fam.wifeId ? gedcomFullData.individuals.get(fam.wifeId) : null;
      const parentName = [husband?.fullName, wife?.fullName].filter(Boolean).join(' & ') || 'Onbekend';
      const childYears: number[] = [];
      const childNames: string[] = [];
      let survived = 0;
      let hasDeathData = false;
      for (const childId of fam.childIds) {
        const child = gedcomFullData.individuals.get(childId);
        if (!child) continue;
        childNames.push(child.givenName || child.fullName);
        const by = extractYear(child.birthDate);
        if (by) childYears.push(by);
        const dy = extractYear(child.deathDate);
        if (dy && by) { hasDeathData = true; if (dy - by >= 5) survived++; }
        else if (!child.deathDate) survived++;
      }
      const minYear = childYears.length > 0 ? Math.min(...childYears) : 0;
      const maxYear = childYears.length > 0 ? Math.max(...childYears) : 0;
      result.mostChildren.push({ parent: parentName, children: fam.childIds.length, period: minYear && maxYear ? `${minYear}–${maxYear}` : '?', survived: hasDeathData ? survived : null, childNames: childNames.join(', ') });
    }

    // Sort
    result.neverKnewGrandfather.sort((a, b) => b.gap - a.gap);
    result.neverKnewGrandmother.sort((a, b) => b.gap - a.gap);
    result.longestKnewGrandfather.sort((a, b) => b.years - a.years);
    result.longestKnewFather.sort((a, b) => b.years - a.years);
    result.longestKnewMother.sort((a, b) => b.years - a.years);
    result.mostChildren.sort((a, b) => b.children - a.children);
    result.mostChildren = result.mostChildren.slice(0, 10);

    return result;
  }, [gedcomFullData, allGedcomDescendants]);

  const SortHeader = ({ label, sortField }: { label: string; sortField: SortKey }) => (
    <th
      className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors group"
      onClick={() => handleSort(sortField)}
    >
      <span className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={`w-3 h-3 transition-colors ${sortKey === sortField ? 'text-accent' : 'text-muted-foreground/40 group-hover:text-muted-foreground'}`} />
      </span>
    </th>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t.back}</span>
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
              {t.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            {gedcomLoading && (
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>GEDCOM data laden...</span>
              </div>
            )}
          </div>

          {/* Analysis Dashboard */}
          {(() => {
            const dashLabels: Record<string, { heading: string; neverKnew: string; neverKnewGm: string; longestKnew: string; longestKnewGm: string; longestParents: string; mostChildren: string; childMortality: string; generations: string; generationsGm: string; entries: string; entriesGm: string; maxYears: string; maxYearsGm: string; father: string; mother: string; families: string; maxKids: string; peakRate: string }> = {
              nl: { heading: "Analyses op deze pagina", neverKnew: "Nooit hun grootvader gekend", neverKnewGm: "Nooit hun grootmoeder gekend", longestKnew: "Langst hun grootvader gekend", longestKnewGm: "Langst hun grootmoeder gekend", longestParents: "Langst hun ouders gekend", mostChildren: "Meeste kinderen", childMortality: "Kindersterfte", generations: "generaties over 3 lijnen", generationsGm: "gevallen over 3 lijnen", entries: "persoon-grootvader combinaties", entriesGm: "personen", maxYears: "max. jaren", maxYearsGm: "max. jaren", father: "vader", mother: "moeder", families: "gezinnen", maxKids: "max. kinderen", peakRate: "piek {c} eeuw" },
              en: { heading: "Analyses on this page", neverKnew: "Never knew their grandfather", neverKnewGm: "Never knew their grandmother", longestKnew: "Knew grandfather the longest", longestKnewGm: "Knew grandmother the longest", longestParents: "Knew parents the longest", mostChildren: "Most children", childMortality: "Child mortality", generations: "generations across 3 lines", generationsGm: "cases across 3 lines", entries: "person-grandfather combinations", entriesGm: "persons", maxYears: "max. years", maxYearsGm: "max. years", father: "father", mother: "mother", families: "families", maxKids: "max. children", peakRate: "peak {c} century" },
              fr: { heading: "Analyses sur cette page", neverKnew: "N'ont jamais connu leur grand-père", neverKnewGm: "N'ont jamais connu leur grand-mère", longestKnew: "Ont connu leur grand-père le plus longtemps", longestKnewGm: "Ont connu leur grand-mère le plus longtemps", longestParents: "Ont connu leurs parents le plus longtemps", mostChildren: "Le plus d'enfants", childMortality: "Mortalité infantile", generations: "générations dans 3 lignées", generationsGm: "cas dans 3 lignées", entries: "combinaisons personne-grand-père", entriesGm: "personnes", maxYears: "max. ans", maxYearsGm: "max. ans", father: "père", mother: "mère", families: "familles", maxKids: "max. enfants", peakRate: "pic {c} siècle" },
              es: { heading: "Análisis en esta página", neverKnew: "Nunca conocieron a su abuelo", neverKnewGm: "Nunca conocieron a su abuela", longestKnew: "Conocieron a su abuelo más tiempo", longestKnewGm: "Conocieron a su abuela más tiempo", longestParents: "Conocieron a sus padres más tiempo", mostChildren: "Más hijos", childMortality: "Mortalidad infantil", generations: "generaciones en 3 líneas", generationsGm: "casos en 3 líneas", entries: "combinaciones persona-abuelo", entriesGm: "personas", maxYears: "max. años", maxYearsGm: "max. años", father: "padre", mother: "madre", families: "familias", maxKids: "max. hijos", peakRate: "pico siglo {c}" },
              de: { heading: "Analysen auf dieser Seite", neverKnew: "Nie ihren Großvater gekannt", neverKnewGm: "Nie ihre Großmutter gekannt", longestKnew: "Großvater am längsten gekannt", longestKnewGm: "Großmutter am längsten gekannt", longestParents: "Eltern am längsten gekannt", mostChildren: "Die meisten Kinder", childMortality: "Kindersterblichkeit", generations: "Generationen in 3 Linien", generationsGm: "Fälle in 3 Linien", entries: "Person-Großvater-Kombinationen", entriesGm: "Personen", maxYears: "max. Jahre", maxYearsGm: "max. Jahre", father: "Vater", mother: "Mutter", families: "Familien", maxKids: "max. Kinder", peakRate: "Höchststand {c} Jh." },
              sv: { heading: "Analyser på denna sida", neverKnew: "Kände aldrig sin farfar", neverKnewGm: "Kände aldrig sin farmor", longestKnew: "Kände sin farfar längst", longestKnewGm: "Kände sin farmor längst", longestParents: "Kände sina föräldrar längst", mostChildren: "Flest barn", childMortality: "Barnadödlighet", generations: "generationer i 3 linjer", generationsGm: "fall i 3 linjer", entries: "person-farfar-kombinationer", entriesGm: "personer", maxYears: "max. år", maxYearsGm: "max. år", father: "far", mother: "mor", families: "familjer", maxKids: "max. barn", peakRate: "topp {c}" },
              pcd: { heading: "Analyses su ch'te page", neverKnew: "N'ont janmais connu leu grand-père", neverKnewGm: "N'ont janmais connu leu grand-mère", longestKnew: "Ont connu leu grand-père l'pus longtemps", longestKnewGm: "Ont connu leu grand-mère l'pus longtemps", longestParents: "Ont connu leus parints l'pus longtemps", mostChildren: "L'pus d'éfants", childMortality: "Mortalité des éfants", generations: "générations dins 3 lignées", generationsGm: "cas dins 3 lignées", entries: "combinaisons personne-grand-père", entriesGm: "personnes", maxYears: "max. ans", maxYearsGm: "max. ans", father: "père", mother: "mère", families: "familles", maxKids: "max. éfants", peakRate: "pic {c} siéque" },
              vls: { heading: "Analyses ip deez pagina", neverKnew: "Noois hun grootvoader gekend", neverKnewGm: "Noois hun grootmoeder gekend", longestKnew: "Langst hun grootvoader gekend", longestKnewGm: "Langst hun grootmoeder gekend", longestParents: "Langst hun ouders gekend", mostChildren: "Meeste kinders", childMortality: "Kindersterfte", generations: "generaties over 3 lienen", generationsGm: "gevallen over 3 lienen", entries: "persôon-grootvoader combinoaties", entriesGm: "persôonen", maxYears: "max. joar", maxYearsGm: "max. joar", father: "voader", mother: "moeder", families: "gezinnen", maxKids: "max. kinders", peakRate: "piek {c} ieuw" },
            };
            const dl = dashLabels[language] || dashLabels.nl;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{dl.heading}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.neverKnew}</div>
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{gedcomAnalysis.neverKnewGrandfather.length || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.entries}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-purple-500/15 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.neverKnewGm}</div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{gedcomAnalysis.neverKnewGrandmother.length || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.entriesGm}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.longestKnew}</div>
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{gedcomAnalysis.longestKnewGrandfather.length || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.entries} · {gedcomAnalysis.longestKnewGrandfather[0]?.years || '—'} {dl.maxYears}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pink-500/15 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-pink-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.longestKnewGm}</div>
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mt-1">{gmKnownStats.count || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.entriesGm} · {gmKnownStats.maxYears || '—'} {dl.maxYearsGm}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-rose-500/15 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.longestParents}</div>
                      <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{gedcomAnalysis.longestKnewFather[0]?.years || '—'} / {gedcomAnalysis.longestKnewMother[0]?.years || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.maxYears} {dl.father} / {dl.mother}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500/15 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.mostChildren}</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{gedcomAnalysis.mostChildren[0]?.children || '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{gedcomAnalysis.mostChildren.length} {dl.families} · {gedcomAnalysis.mostChildren[0]?.children || '—'} {dl.maxKids}</div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{dl.childMortality}</div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{peakMortality.rate > 0 ? `${peakMortality.rate}%` : '—'}</div>
                      <div className="text-[11px] text-muted-foreground">{dl.peakRate.replace('{c}', peakMortality.century || '—')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Users className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground">{t.total}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{stats.avg} {t.years}</div>
              <div className="text-xs text-muted-foreground">{t.avgAge}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{stats.oldest?.name?.split(' ').slice(-1)[0]}</div>
              <div className="text-xs text-muted-foreground">{t.oldest}: {stats.oldest?.ageDisplay}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Calendar className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{stats.youngest?.name?.split(' ').slice(-1)[0]}</div>
              <div className="text-xs text-muted-foreground">{t.youngest}: {stats.youngest?.ageDisplay}</div>
            </div>
          </div>

          {/* Age Distribution Chart */}
          {(() => {
            const withAge = mergedDeceased.filter(p => p.age !== null);
            const buckets = [
              { range: "0-1", min: 0, max: 1 },
              { range: "1-5", min: 1, max: 5 },
              { range: "5-20", min: 5, max: 20 },
              { range: "20-40", min: 20, max: 40 },
              { range: "40-60", min: 40, max: 60 },
              { range: "60-70", min: 60, max: 70 },
              { range: "70-80", min: 70, max: 80 },
              { range: "80+", min: 80, max: 999 },
            ];
            const chartData = buckets.map(b => ({
              range: b.range,
              count: withAge.filter(p => p.age! >= b.min && p.age! < b.max).length,
              min: b.min,
            }));
            const barColors = [
              "hsl(0, 70%, 55%)",
              "hsl(15, 70%, 55%)",
              "hsl(35, 70%, 55%)",
              "hsl(45, 65%, 50%)",
              "hsl(55, 60%, 50%)",
              "hsl(90, 50%, 45%)",
              "hsl(130, 50%, 45%)",
              "hsl(150, 55%, 40%)",
            ];
            const chartLabel = {
              nl: "Leeftijdsverdeling", en: "Age Distribution", fr: "Répartition par âge",
              es: "Distribución por edad", de: "Altersverteilung", sv: "Åldersfördelning",
              pcd: "Répartition par âche", vls: "Leeftiedsverdeelienge",
            };

            // Century chart - average age per century
            const centuryLabel = {
              nl: "Gemiddelde leeftijd per eeuw", en: "Average age per century", fr: "Âge moyen par siècle",
              es: "Edad media por siglo", de: "Durchschnittsalter pro Jahrhundert", sv: "Medelålder per århundrade",
              pcd: "Âche moyen par siéque", vls: "Gemiddelde leeftied per ieuw",
            };
            const centuryMap = new Map<string, number[]>();
            withAge.forEach(p => {
              const deathDate = parseDate(p.deathDate);
              if (deathDate && p.age !== null && p.age >= 0) {
                const century = Math.ceil(deathDate.getFullYear() / 100);
                const key = `${century}e`;
                if (!centuryMap.has(key)) centuryMap.set(key, []);
                centuryMap.get(key)!.push(p.age);
              }
            });
            const centuryData = Array.from(centuryMap.entries())
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([century, ages]) => ({
                century,
                avg: Math.round(ages.reduce((s, a) => s + a, 0) / ages.length),
                count: ages.length,
              }));
            const centuryColors = [
              "hsl(220, 60%, 55%)", "hsl(200, 55%, 50%)", "hsl(180, 50%, 45%)",
              "hsl(160, 50%, 45%)", "hsl(140, 50%, 45%)", "hsl(120, 50%, 45%)",
              "hsl(100, 45%, 45%)", "hsl(80, 50%, 45%)",
            ];

            return (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 mb-4"
                >
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    {chartLabel[language] || chartLabel.nl}
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number) => [value, t.total]}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((_, i) => (
                          <Cell key={i} fill={barColors[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
                >
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    {centuryLabel[language] || centuryLabel.nl}
                  </h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={centuryData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <XAxis dataKey="century" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[0, 'auto']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number, name: string) => {
                          if (name === 'avg') return [`${value} ${t.years}`, t.avgAge];
                          return [value, t.total];
                        }}
                      />
                      <Bar dataKey="avg" radius={[4, 4, 0, 0]} name="avg">
                        {centuryData.map((_, i) => (
                          <Cell key={i} fill={centuryColors[i % centuryColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
                    {centuryData.map((d, i) => (
                      <span key={d.century} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                        {d.century}: {d.avg} {t.years} <span className="opacity-60">({d.count})</span>
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Deaths per decade chart */}
                {(() => {
                  const decadeLabel: Record<string, { title: string; count: string; peak: string }> = {
                    nl: { title: "Sterfte per decennium", count: "overlijdens", peak: "Piekdecennium" },
                    en: { title: "Deaths per decade", count: "deaths", peak: "Peak decade" },
                    fr: { title: "Décès par décennie", count: "décès", peak: "Décennie pic" },
                    es: { title: "Muertes por década", count: "muertes", peak: "Década pico" },
                    de: { title: "Sterbefälle pro Jahrzehnt", count: "Sterbefälle", peak: "Spitzenjahrzehnt" },
                    sv: { title: "Dödsfall per decennium", count: "dödsfall", peak: "Toppdecennium" },
                    pcd: { title: "Décès par décennie", count: "décès", peak: "Décennie pic" },
                    vls: { title: "Sterfte per decennium", count: "overlieddns", peak: "Piekdecennium" },
                  };
                  const dLbl = decadeLabel[language] || decadeLabel.nl;
                  const decadeMap = new Map<string, number>();
                  mergedDeceased.forEach(p => {
                    const d = parseDate(p.deathDate);
                    if (d) {
                      const decade = `${Math.floor(d.getFullYear() / 10) * 10}s`;
                      decadeMap.set(decade, (decadeMap.get(decade) || 0) + 1);
                    }
                  });
                  const decadeData = Array.from(decadeMap.entries())
                    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                    .map(([decade, count]) => ({ decade, count }));
                  const peakDecade = decadeData.reduce((max, d) => d.count > max.count ? d : max, { decade: '—', count: 0 });

                  if (decadeData.length === 0) return null;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
                    >
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        {dLbl.title}
                      </h2>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={decadeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                          <XAxis dataKey="decade" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={50} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                            itemStyle={{ color: "hsl(var(--foreground))" }}
                            formatter={(value: number) => [value, dLbl.count]}
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {decadeData.map((d, i) => (
                              <Cell key={i} fill={d.decade === peakDecade.decade ? "hsl(0, 65%, 50%)" : "hsl(220, 50%, 55%)"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-3 text-xs text-muted-foreground">
                        {dLbl.peak}: <span className="font-semibold text-foreground">{peakDecade.decade}</span> ({peakDecade.count} {dLbl.count})
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Births per decade chart */}
                {(() => {
                  const birthLabel: Record<string, { title: string; count: string; peak: string }> = {
                    nl: { title: "Geboorten per decennium", count: "geboorten", peak: "Piekdecennium" },
                    en: { title: "Births per decade", count: "births", peak: "Peak decade" },
                    fr: { title: "Naissances par décennie", count: "naissances", peak: "Décennie pic" },
                    es: { title: "Nacimientos por década", count: "nacimientos", peak: "Década pico" },
                    de: { title: "Geburten pro Jahrzehnt", count: "Geburten", peak: "Spitzenjahrzehnt" },
                    sv: { title: "Födslar per decennium", count: "födslar", peak: "Toppdecennium" },
                    pcd: { title: "Naissances par décennie", count: "naissances", peak: "Décennie pic" },
                    vls: { title: "Geboortes per decennium", count: "geboortes", peak: "Piekdecennium" },
                  };
                  const bLbl = birthLabel[language] || birthLabel.nl;
                  const birthDecadeMap = new Map<string, number>();
                  mergedDeceased.forEach(p => {
                    const b = parseDate(p.birthDate);
                    if (b) {
                      const decade = `${Math.floor(b.getFullYear() / 10) * 10}s`;
                      birthDecadeMap.set(decade, (birthDecadeMap.get(decade) || 0) + 1);
                    }
                  });
                  const birthDecadeData = Array.from(birthDecadeMap.entries())
                    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                    .map(([decade, count]) => ({ decade, count }));
                  const peakBirthDecade = birthDecadeData.reduce((max, d) => d.count > max.count ? d : max, { decade: '—', count: 0 });

                  if (birthDecadeData.length === 0) return null;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
                    >
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        {bLbl.title}
                      </h2>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={birthDecadeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                          <XAxis dataKey="decade" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={50} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                            itemStyle={{ color: "hsl(var(--foreground))" }}
                            formatter={(value: number) => [value, bLbl.count]}
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {birthDecadeData.map((d, i) => (
                              <Cell key={i} fill={d.decade === peakBirthDecade.decade ? "hsl(140, 60%, 40%)" : "hsl(180, 45%, 50%)"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-3 text-xs text-muted-foreground">
                        {bLbl.peak}: <span className="font-semibold text-foreground">{peakBirthDecade.decade}</span> ({peakBirthDecade.count} {bLbl.count})
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Demographic transition summary */}
                {(() => {
                  const summaryText: Record<string, { title: string; p1: string; p2: string; p3: string }> = {
                    nl: {
                      title: "De demografische transitie in onze familie",
                      p1: "De twee bovenstaande grafieken vertellen samen het verhaal van een ingrijpende maatschappelijke omwenteling. In de 19e eeuw zien we een patroon dat typisch was voor het pre-moderne Vlaanderen: veel geboorten, maar ook een schrijnend hoge kindersterfte. Charles Louis Deforce verloor minstens vier kinderen als baby of peuter in de jaren 1880–1890.",
                      p2: "De geboortepiek in de jaren 1920–1930 weerspiegelt het uitzonderlijk grote gezin van Marcel en Magdalena (13 kinderen). Maar anders dan bij de vorige generatie overleefden bijna al deze kinderen — een teken dat betere hygiëne, voeding en gezondheidszorg hun intrede hadden gedaan.",
                      p3: "Na de jaren 1950 zien we een scherpe daling van het geboortecijfer: de overgang naar het moderne gezinspatroon met minder kinderen. De introductie van de anticonceptiepil in België (1962–1963) versnelde deze trend drastisch — al bleef open gebruik in katholiek Vlaanderen aanvankelijk taboe, tot de Belgische bisschoppen in 1968 een unieke 'gewetensverklaring' publiceerden die individuele keuze toestond. Onze familie is daarmee een microgeschiedenis van de Vlaamse bevolkingsevolutie.",
                    },
                    en: {
                      title: "The demographic transition in our family",
                      p1: "The two charts above together tell the story of a profound societal transformation. In the 19th century, we see a pattern typical of pre-modern Flanders: many births, but also a devastating child mortality rate. Charles Louis Deforce lost at least four children as infants in the 1880s–1890s.",
                      p2: "The birth peak in the 1920s–1930s reflects the exceptionally large family of Marcel and Magdalena (13 children). But unlike the previous generation, nearly all these children survived — a sign that better hygiene, nutrition and healthcare had arrived.",
                      p3: "After the 1950s, we see a sharp decline in the birth rate: the transition to the modern family pattern with fewer children. The introduction of the contraceptive pill in Belgium (1962–1963) drastically accelerated this trend — though open use remained taboo in Catholic Flanders, until the Belgian bishops published a unique 'declaration of conscience' in 1968 that allowed individual choice. Our family is thus a micro-history of the Flemish demographic evolution.",
                    },
                    fr: {
                      title: "La transition démographique dans notre famille",
                      p1: "Les deux graphiques ci-dessus racontent ensemble l'histoire d'une transformation sociétale profonde. Au 19e siècle, on observe un schéma typique de la Flandre pré-moderne : beaucoup de naissances, mais aussi une mortalité infantile dévastatrice. Charles Louis Deforce a perdu au moins quatre enfants en bas âge dans les années 1880–1890.",
                      p2: "Le pic de naissances dans les années 1920–1930 reflète la famille exceptionnellement nombreuse de Marcel et Magdalena (13 enfants). Mais contrairement à la génération précédente, presque tous ces enfants ont survécu — signe que l'hygiène, la nutrition et les soins de santé s'étaient améliorés.",
                      p3: "Après les années 1950, on observe une chute nette du taux de natalité : la transition vers le modèle familial moderne avec moins d'enfants. L'introduction de la pilule contraceptive en Belgique (1962–1963) a considérablement accéléré cette tendance — bien que son usage ouvert soit resté tabou en Flandre catholique, jusqu'à ce que les évêques belges publient en 1968 une 'déclaration de conscience' unique autorisant le choix individuel. Notre famille est ainsi une micro-histoire de l'évolution démographique flamande.",
                    },
                    es: {
                      title: "La transición demográfica en nuestra familia",
                      p1: "Los dos gráficos anteriores cuentan juntos la historia de una profunda transformación social. En el siglo XIX, vemos un patrón típico de la Flandes pre-moderna: muchos nacimientos, pero también una devastadora mortalidad infantil. Charles Louis Deforce perdió al menos cuatro hijos siendo bebés en los años 1880–1890.",
                      p2: "El pico de nacimientos en los años 1920–1930 refleja la familia excepcionalmente grande de Marcel y Magdalena (13 hijos). Pero a diferencia de la generación anterior, casi todos estos niños sobrevivieron — señal de mejoras en higiene, nutrición y atención médica.",
                      p3: "Después de los años 1950, vemos una fuerte caída en la tasa de natalidad: la transición al patrón familiar moderno con menos hijos. La introducción de la píldora anticonceptiva en Bélgica (1962–1963) aceleró drásticamente esta tendencia — aunque su uso abierto siguió siendo tabú en la Flandes católica, hasta que los obispos belgas publicaron en 1968 una singular 'declaración de conciencia' que permitía la elección individual. Nuestra familia es así una microhistoria de la evolución demográfica flamenca.",
                    },
                    de: {
                      title: "Der demografische Wandel in unserer Familie",
                      p1: "Die beiden obigen Diagramme erzählen zusammen die Geschichte eines tiefgreifenden gesellschaftlichen Wandels. Im 19. Jahrhundert sehen wir ein für das vormoderne Flandern typisches Muster: viele Geburten, aber auch eine erschreckend hohe Kindersterblichkeit. Charles Louis Deforce verlor in den 1880er–1890er Jahren mindestens vier Kinder als Säuglinge.",
                      p2: "Der Geburtengipfel in den 1920er–1930er Jahren spiegelt die außergewöhnlich große Familie von Marcel und Magdalena wider (13 Kinder). Anders als in der vorherigen Generation überlebten jedoch fast alle diese Kinder — ein Zeichen für bessere Hygiene, Ernährung und Gesundheitsversorgung.",
                      p3: "Nach den 1950er Jahren sehen wir einen starken Rückgang der Geburtenrate: den Übergang zum modernen Familienmodell mit weniger Kindern. Die Einführung der Antibabypille in Belgien (1962–1963) beschleunigte diesen Trend drastisch — obwohl ihre offene Verwendung im katholischen Flandern zunächst tabu blieb, bis die belgischen Bischöfe 1968 eine einzigartige 'Gewissenserklärung' veröffentlichten, die individuelle Entscheidung zuließ. Unsere Familie ist damit eine Mikrogeschichte der flämischen Bevölkerungsentwicklung.",
                    },
                    sv: {
                      title: "Den demografiska övergången i vår familj",
                      p1: "De två diagrammen ovan berättar tillsammans historien om en genomgripande samhällsförändring. Under 1800-talet ser vi ett mönster typiskt för det förmoderna Flandern: många födslar, men också en förödande barnadödlighet. Charles Louis Deforce förlorade minst fyra barn som spädbarn under 1880–1890-talen.",
                      p2: "Födelsetoppen under 1920–1930-talen återspeglar Marcel och Magdalenas exceptionellt stora familj (13 barn). Men till skillnad från föregående generation överlevde nästan alla dessa barn — ett tecken på bättre hygien, näring och sjukvård.",
                      p3: "Efter 1950-talet ser vi en kraftig nedgång i födelsetalet: övergången till det moderna familjemönstret med färre barn. Introduktionen av p-pillret i Belgien (1962–1963) påskyndade denna trend drastiskt — även om öppen användning förblev tabu i det katolska Flandern, tills de belgiska biskoparna 1968 publicerade en unik 'samvetsförklaring' som tillät individuellt val. Vår familj är därmed en mikrohistoria över den flamländska demografiska utvecklingen.",
                    },
                    pcd: {
                      title: "Eul transition démographique dins note famille",
                      p1: "Les deux graphiques chi-dessus racontent inchonne l'histoire d'eune transformation profonde. Au 19e siéque, in voit un patron typique de l'Flandre d'avant : plein d'naissances, mais aussi eune mortalité des éfants épouvantable. Charles Louis Deforce il o perdu au moins quate éfants in bas âche dins les années 1880–1890.",
                      p2: "Eul pic d'naissances dins les années 1920–1930 cha montre l'famille exceptionn'ment grande ed Marcel et Magdalena (13 éfants). Mais à l'différence del génération d'avant, quasi tous ches éfants i ont survécu — signe que l'hygiène, eul nutrition et les soins s'avotent améliorés.",
                      p3: "Après les années 1950, in voit eune chute nette du taux d'natalité : eul transition vers el modèle familial moderne aveuc moins d'éfants. L'introduction del pilule in Belgique (1962–1963) al o accéléré ch'te tendance — même si l'usage ouvert i restot tabou in Flandre catholique, jusqu'à ch'que les évêques belges i publient in 1968 eune 'déclaration d'conscience' qu'i permettot el choix individuel. Note famille ch'est ainsi eune micro-histoire del'évolution démographique flaminde.",
                    },
                    vls: {
                      title: "De demografische transitie in uus familie",
                      p1: "De twee grafiekn hierbovn vertelln tsoame 't verhoal van een ingriepende moatschappelijke omwenteling. In de 19e ieuw zien me een patrôon da typisch was vo 't pre-moderne Vloandern: vele geboortes, moar ôok een schrienend hôoge kindersterfte. Charles Louis Deforce verloor minstens vier kinders as baby in de joarn 1880–1890.",
                      p2: "De geboortepiek in de joarn 1920–1930 weerspiegelt 't uitzonderlik grôot gezin van Marcel en Magdalena (13 kinders). Moar anders dan bi de vôorige generatie overleefden biena al deez kinders — een teekn dat betere hygiëne, voeding en gezondheidszoarg hun intrede gedoan addn.",
                      p3: "Noa de joarn 1950 zien me een scherpe doaling van 't geboorteciefer: de overgang noa 't moderne gezinspatrôon mè minder kinders. De introductie van de anticonceptiepille in België (1962–1963) versnelde deez trend drastisch — al bleef open gebruuk in 't katholieke Vloandern oanvankelijk taboe, tot de Belgische bisschopn in 1968 een unieke 'gewetensverkloaring' publiceerden die individuele keuze toestond. Uus familie is doarmee een microgeschiedenisse van de Vlamse bevolkingsevolutie.",
                    },
                  };
                  const s = summaryText[language] || summaryText.nl;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-muted/40 border border-border rounded-lg p-5 md:p-6 mb-8"
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-3">{s.title}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                        <p>{s.p1}</p>
                        <p>{s.p2}</p>
                        <p>{s.p3}</p>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Combined births vs deaths line chart */}
                {(() => {
                  const combiLabel: Record<string, { title: string; births: string; deaths: string }> = {
                    nl: { title: "Geboorten vs. sterftes per decennium", births: "Geboorten", deaths: "Sterftes" },
                    en: { title: "Births vs. deaths per decade", births: "Births", deaths: "Deaths" },
                    fr: { title: "Naissances vs. décès par décennie", births: "Naissances", deaths: "Décès" },
                    es: { title: "Nacimientos vs. muertes por década", births: "Nacimientos", deaths: "Muertes" },
                    de: { title: "Geburten vs. Sterbefälle pro Jahrzehnt", births: "Geburten", deaths: "Sterbefälle" },
                    sv: { title: "Födslar vs. dödsfall per decennium", births: "Födslar", deaths: "Dödsfall" },
                    pcd: { title: "Naissances vs. décès par décennie", births: "Naissances", deaths: "Décès" },
                    vls: { title: "Geboortes vs. sterftes per decennium", births: "Geboortes", deaths: "Sterftes" },
                  };
                  const cLbl = combiLabel[language] || combiLabel.nl;

                  const allDecades = new Map<string, { births: number; deaths: number }>();
                  mergedDeceased.forEach(p => {
                    const b = parseDate(p.birthDate);
                    if (b) {
                      const d = `${Math.floor(b.getFullYear() / 10) * 10}s`;
                      if (!allDecades.has(d)) allDecades.set(d, { births: 0, deaths: 0 });
                      allDecades.get(d)!.births++;
                    }
                    const dd = parseDate(p.deathDate);
                    if (dd) {
                      const d = `${Math.floor(dd.getFullYear() / 10) * 10}s`;
                      if (!allDecades.has(d)) allDecades.set(d, { births: 0, deaths: 0 });
                      allDecades.get(d)!.deaths++;
                    }
                  });
                  const combiData = Array.from(allDecades.entries())
                    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                    .map(([decade, v]) => ({ decade, births: v.births, deaths: v.deaths }));

                  if (combiData.length === 0) return null;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                      className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
                    >
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        {cLbl.title}
                      </h2>
                      <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={combiData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="decade" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={50} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                          />
                          <Line type="monotone" dataKey="births" name={cLbl.births} stroke="hsl(140, 60%, 40%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(140, 60%, 40%)" }} />
                          <Line type="monotone" dataKey="deaths" name={cLbl.deaths} stroke="hsl(0, 65%, 50%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 65%, 50%)" }} />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-6 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: "hsl(140, 60%, 40%)" }} />{cLbl.births}</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: "hsl(0, 65%, 50%)" }} />{cLbl.deaths}</span>
                      </div>
                    </motion.div>
                  );
                })()}
              </>
            );
          })()}

          {/* Nooit hun grootvader gekend - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const allGfGapData = gedcomAnalysis.neverKnewGrandfather;
            const topData = allGfGapData.slice(0, 15);
            const maxGap = topData.length > 0 ? Math.max(...topData.map(d => d.gap)) : 1;

            const gapLabels: Record<string, { title: string; person: string; born: string; grandfather: string; died: string; gap: string; years: string; noData: string }> = {
              nl: { title: "Nooit hun grootvader gekend", person: "Persoon", born: "Geboren", grandfather: "Grootvader", died: "†Overleden", gap: "Te laat", years: "jaar", noData: "Geen GEDCOM-data beschikbaar." },
              en: { title: "Never knew their grandfather", person: "Person", born: "Born", grandfather: "Grandfather", died: "†Died", gap: "Too late", years: "years", noData: "No GEDCOM data available." },
              fr: { title: "N'ont jamais connu leur grand-père", person: "Personne", born: "Né", grandfather: "Grand-père", died: "†Décédé", gap: "Trop tard", years: "ans", noData: "Aucune donnée GEDCOM disponible." },
              es: { title: "Nunca conocieron a su abuelo", person: "Persona", born: "Nacido", grandfather: "Abuelo", died: "†Fallecido", gap: "Demasiado tarde", years: "años", noData: "No hay datos GEDCOM." },
              de: { title: "Nie ihren Großvater gekannt", person: "Person", born: "Geboren", grandfather: "Großvater", died: "†Gestorben", gap: "Zu spät", years: "Jahre", noData: "Keine GEDCOM-Daten." },
              sv: { title: "Kände aldrig sin farfar", person: "Person", born: "Född", grandfather: "Farfar", died: "†Död", gap: "För sent", years: "år", noData: "Inga GEDCOM-data." },
              pcd: { title: "N'ont janmais connu leu grand-père", person: "Personne", born: "Né", grandfather: "Grand-père", died: "†Décédé", gap: "Trop tard", years: "ans", noData: "Point d'données GEDCOM." },
              vls: { title: "Noois hun grootvoader gekend", person: "Persôon", born: "Geboorn", grandfather: "Grootvoader", died: "†Overleen", gap: "Te loate", years: "joar", noData: "Geen GEDCOM-data beschikboar." },
            };
            const gl = gapLabels[language] || gapLabels.nl;

            return (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {gl.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  {allGfGapData.length > 0 ? `${allGfGapData.length} ${language === 'nl' || language === 'vls' ? 'gevallen gevonden in GEDCOM' : language === 'en' ? 'cases found in GEDCOM' : language === 'fr' || language === 'pcd' ? 'cas trouvés dans GEDCOM' : 'Fälle gefunden'}. ${topData[0] ? `${language === 'nl' ? 'Grootste kloof' : language === 'en' ? 'Largest gap' : language === 'fr' ? 'Plus grand écart' : 'Max'}: ${topData[0].person} (°${topData[0].born}) — ${topData[0].grandfather} †${topData[0].died} (+${topData[0].gap} ${gl.years})` : ''}` : gl.noData}
                </p>

                {allGfGapData.length > 0 && (<>
                <div className="space-y-3 mb-6">
                  {topData.map((d, i) => {
                    const barWidth = Math.max(15, (d.gap / maxGap) * 100);
                    return (
                      <div key={`gf-gap-${i}`}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.person} <span className="text-muted-foreground font-normal">°{d.born}</span></span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.grandfather} †{d.died}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div className="h-full rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${barWidth}%`, backgroundColor: `hsl(${Math.max(0, 45 - d.gap * 0.8)}, 65%, 40%)`, minWidth: '60px' }}>
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">+{d.gap} {gl.years}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.grandfather} †{d.died}</div>
                      </div>
                    );
                  })}
                </div>

                <ReadMore label={language === 'en' ? 'Show full table' : language === 'fr' || language === 'pcd' ? 'Voir le tableau complet' : language === 'de' ? 'Vollständige Tabelle anzeigen' : language === 'sv' ? 'Visa hela tabellen' : 'Bekijk volledige tabel'} collapsedLabel={language === 'en' ? 'Hide table' : language === 'fr' || language === 'pcd' ? 'Masquer le tableau' : language === 'de' ? 'Tabelle ausblenden' : language === 'sv' ? 'Dölj tabellen' : 'Verberg tabel'}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gl.person}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gl.born}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gl.grandfather}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gl.died}</th>
                        <th className="py-1.5 text-right font-medium text-muted-foreground">{gl.gap}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allGfGapData.map((d, i) => (
                        <tr key={`gfg-${i}`} className="border-b border-border/50">
                          <td className="py-1.5 font-medium text-foreground">{d.person}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.born}</td>
                          <td className="py-1.5 text-muted-foreground">{d.grandfather}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.died}</td>
                          <td className="py-1.5 text-right font-semibold text-amber-600 dark:text-amber-400 tabular-nums">+{d.gap} {gl.years}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </ReadMore>
                </>)}
              </motion.div>
            );
           })()}

          {/* Nooit hun grootmoeder gekend - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const allGmGapData = gedcomAnalysis.neverKnewGrandmother;
            const topData = allGmGapData.slice(0, 15);
            const maxGap = topData.length > 0 ? Math.max(...topData.map(d => d.gap)) : 1;

            const gmLabels: Record<string, { title: string; person: string; born: string; grandmother: string; died: string; gap: string; years: string; noData: string }> = {
              nl: { title: "Nooit hun grootmoeder gekend", person: "Persoon", born: "Geboren", grandmother: "Grootmoeder", died: "†Overleden", gap: "Te laat", years: "jaar", noData: "Geen GEDCOM-data beschikbaar." },
              en: { title: "Never knew their grandmother", person: "Person", born: "Born", grandmother: "Grandmother", died: "†Died", gap: "Too late", years: "years", noData: "No GEDCOM data available." },
              fr: { title: "N'ont jamais connu leur grand-mère", person: "Personne", born: "Né(e)", grandmother: "Grand-mère", died: "†Décédée", gap: "Trop tard", years: "ans", noData: "Aucune donnée GEDCOM." },
              es: { title: "Nunca conocieron a su abuela", person: "Persona", born: "Nacido/a", grandmother: "Abuela", died: "†Fallecida", gap: "Demasiado tarde", years: "años", noData: "No hay datos GEDCOM." },
              de: { title: "Nie ihre Großmutter gekannt", person: "Person", born: "Geboren", grandmother: "Großmutter", died: "†Gestorben", gap: "Zu spät", years: "Jahre", noData: "Keine GEDCOM-Daten." },
              sv: { title: "Kände aldrig sin farmor", person: "Person", born: "Född", grandmother: "Farmor", died: "†Död", gap: "För sent", years: "år", noData: "Inga GEDCOM-data." },
              pcd: { title: "N'ont janmais connu leu grand-mère", person: "Personne", born: "Né", grandmother: "Grand-mère", died: "†Décédée", gap: "Trop tard", years: "ans", noData: "Point d'données GEDCOM." },
              vls: { title: "Noois hun grootmoeder gekend", person: "Persôon", born: "Geboorn", grandmother: "Grootmoeder", died: "†Overleen", gap: "Te loate", years: "joar", noData: "Geen GEDCOM-data beschikboar." },
            };
            const gml = gmLabels[language] || gmLabels.nl;

            return (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }} className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <AlertTriangle className="w-4 h-4 text-purple-500" />
                  {gml.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  {allGmGapData.length > 0 ? `${allGmGapData.length} ${language === 'nl' || language === 'vls' ? 'gevallen gevonden in GEDCOM' : language === 'en' ? 'cases found in GEDCOM' : 'cas trouvés dans GEDCOM'}.` : gml.noData}
                </p>

                {allGmGapData.length > 0 && (<>
                <div className="space-y-3 mb-6">
                  {topData.map((d, i) => {
                    const barWidth = Math.max(15, (d.gap / maxGap) * 100);
                    return (
                      <div key={`gm-gap-${i}`}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.person} <span className="text-muted-foreground font-normal">°{d.born}</span></span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.grandmother} †{d.died}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div className="h-full rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${barWidth}%`, backgroundColor: `hsl(${Math.max(0, 320 - d.gap * 1.2)}, 55%, 42%)`, minWidth: '60px' }}>
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">+{d.gap} {gml.years}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.grandmother} †{d.died}</div>
                      </div>
                    );
                  })}
                </div>

                <ReadMore label={language === 'en' ? 'Show full table' : language === 'fr' || language === 'pcd' ? 'Voir le tableau complet' : language === 'de' ? 'Vollständige Tabelle anzeigen' : language === 'sv' ? 'Visa hela tabellen' : 'Bekijk volledige tabel'} collapsedLabel={language === 'en' ? 'Hide table' : language === 'fr' || language === 'pcd' ? 'Masquer le tableau' : language === 'de' ? 'Tabelle ausblenden' : language === 'sv' ? 'Dölj tabellen' : 'Verberg tabel'}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gml.person}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gml.born}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gml.grandmother}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gml.died}</th>
                        <th className="py-1.5 text-right font-medium text-muted-foreground">{gml.gap}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allGmGapData.map((d, i) => (
                        <tr key={`gmg-${i}`} className="border-b border-border/50">
                          <td className="py-1.5 font-medium text-foreground">{d.person}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.born}</td>
                          <td className="py-1.5 text-muted-foreground">{d.grandmother}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.died}</td>
                          <td className="py-1.5 text-right font-semibold text-purple-600 dark:text-purple-400 tabular-nums">+{d.gap} {gml.years}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </ReadMore>
                </>)}
              </motion.div>
            );
          })()}

          {/* Langst hun grootvader gekend - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const gfKnownData = gedcomAnalysis.longestKnewGrandfather;
            const topData = gfKnownData.slice(0, 12);
            const maxYears = topData.length > 0 ? Math.max(...topData.map(d => d.years)) : 1;
            const topPerson = gfKnownData[0];

            const gfLabels: Record<string, { title: string; person: string; born: string; grandfather: string; died: string; overlap: string; years: string; noData: string }> = {
              nl: { title: "Langst hun grootvader gekend", person: "Persoon", born: "°Geboren", grandfather: "Grootvader", died: "†Overleden", overlap: "Jaren gekend", years: "jaar", noData: "Geen GEDCOM-data beschikbaar." },
              en: { title: "Knew their grandfather the longest", person: "Person", born: "°Born", grandfather: "Grandfather", died: "†Died", overlap: "Years known", years: "years", noData: "No GEDCOM data available." },
              fr: { title: "Ont connu leur grand-père le plus longtemps", person: "Personne", born: "°Né(e)", grandfather: "Grand-père", died: "†Décédé", overlap: "Années connues", years: "ans", noData: "Aucune donnée GEDCOM." },
              es: { title: "Conocieron a su abuelo más tiempo", person: "Persona", born: "°Nacido/a", grandfather: "Abuelo", died: "†Fallecido", overlap: "Años conocidos", years: "años", noData: "No hay datos GEDCOM." },
              de: { title: "Kannten ihren Großvater am längsten", person: "Person", born: "°Geboren", grandfather: "Großvater", died: "†Gestorben", overlap: "Jahre gekannt", years: "Jahre", noData: "Keine GEDCOM-Daten." },
              sv: { title: "Kände sin farfar längst", person: "Person", born: "°Född", grandfather: "Farfar", died: "†Död", overlap: "År kända", years: "år", noData: "Inga GEDCOM-data." },
              pcd: { title: "Ont connu leu grand-père l'pus longtemps", person: "Personne", born: "°Né", grandfather: "Grand-père", died: "†Décédé", overlap: "Années connues", years: "ans", noData: "Point d'données GEDCOM." },
              vls: { title: "Langst hun grootvoader gekend", person: "Persôon", born: "°Geboorn", grandfather: "Grootvoader", died: "†Overleen", overlap: "Joarn gekend", years: "joar", noData: "Geen GEDCOM-data beschikboar." },
            };
            const gfl = gfLabels[language] || gfLabels.nl;

            return (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Heart className="w-4 h-4 text-emerald-500" />
                  {gfl.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  {gfKnownData.length > 0 ? `${gfKnownData.length} ${language === 'nl' || language === 'vls' ? 'persoon-grootvader combinaties uit GEDCOM' : 'combinations from GEDCOM'}. ${topPerson ? `${topPerson.person} (°${topPerson.born}) — ${topPerson.grandfather} †${topPerson.grandfatherDied}: ${topPerson.years} ${gfl.years}` : ''}` : gfl.noData}
                </p>

                {gfKnownData.length > 0 && (<>
                <div className="space-y-3 mb-6">
                  {topData.map((d, i) => {
                    const barWidth = Math.max(15, (d.years / maxYears) * 100);
                    return (
                      <div key={`gfk-${i}`}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.person} <span className="text-muted-foreground font-normal">°{d.born}</span></span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.grandfather} †{d.grandfatherDied}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div className="h-full rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${barWidth}%`, backgroundColor: `hsl(${140 - i * 3}, 50%, ${38 + i}%)`, minWidth: '60px' }}>
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">{d.years} {gfl.years}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.grandfather} †{d.grandfatherDied}</div>
                      </div>
                    );
                  })}
                </div>

                <ReadMore label={language === 'en' ? 'Show full table' : language === 'fr' || language === 'pcd' ? 'Voir le tableau complet' : language === 'de' ? 'Vollständige Tabelle anzeigen' : language === 'sv' ? 'Visa hela tabellen' : 'Bekijk volledige tabel'} collapsedLabel={language === 'en' ? 'Hide table' : language === 'fr' || language === 'pcd' ? 'Masquer le tableau' : language === 'de' ? 'Tabelle ausblenden' : language === 'sv' ? 'Dölj tabellen' : 'Verberg tabel'}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gfl.person}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gfl.born}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gfl.grandfather}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gfl.died}</th>
                        <th className="py-1.5 text-right font-medium text-muted-foreground">{gfl.overlap}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gfKnownData.map((d, i) => (
                        <tr key={`gfkt-${i}`} className="border-b border-border/50">
                          <td className="py-1.5 font-medium text-foreground">{d.person}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.born}</td>
                          <td className="py-1.5 text-muted-foreground">{d.grandfather}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.grandfatherDied}</td>
                          <td className="py-1.5 text-right font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{d.years} {gfl.years}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </ReadMore>
                </>)}
              </motion.div>
            );
          })()}

          {/* Langst hun grootmoeder gekend - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const extractYear = (d?: string) => { const m = d?.replace(/^(ABT|BEF|AFT|CAL|EST)\s*/gi, '').match(/(\d{4})/); return m ? parseInt(m[1]) : null; };

            // Find all grandmother relationships from GEDCOM
            const gmResults: { person: string; born: number; grandmother: string; grandmotherDied: number; years: number }[] = [];

            if (gedcomFullData) {
              const descendantIds = new Set(allGedcomDescendants.map(d => d.id));

              for (const indi of allGedcomDescendants) {
                const birthYear = extractYear(indi.birthDate);
                if (!birthYear) continue;

                // Find grandmother(s): person → familyChild → family → mother (wife) → mother's familyChild → family → grandmother (wife)
                for (const famId of indi.familyChild) {
                  const fam = gedcomFullData.families.get(famId);
                  if (!fam) continue;

                  // Check both parents' mothers (paternal & maternal grandmother)
                  const parentIds = [fam.husbandId, fam.wifeId].filter(Boolean) as string[];
                  for (const parentId of parentIds) {
                    const parent = gedcomFullData.individuals.get(parentId);
                    if (!parent) continue;

                    for (const parentFamId of parent.familyChild) {
                      const parentFam = gedcomFullData.families.get(parentFamId);
                      if (!parentFam || !parentFam.wifeId) continue;

                      const grandmother = gedcomFullData.individuals.get(parentFam.wifeId);
                      if (!grandmother || !grandmother.deathDate) continue;

                      const gmDeathYear = extractYear(grandmother.deathDate);
                      if (!gmDeathYear) continue;

                      // Only include if person was born BEFORE grandmother died (they knew each other)
                      if (birthYear < gmDeathYear) {
                        const years = gmDeathYear - birthYear;
                        gmResults.push({
                          person: indi.fullName,
                          born: birthYear,
                          grandmother: grandmother.fullName,
                          grandmotherDied: gmDeathYear,
                          years,
                        });
                      }
                    }
                  }
                }
              }
            }

            // Deduplicate (person may have same grandmother via different paths) and sort
            const seen = new Set<string>();
            const grandmotherKnownData = gmResults
              .filter(d => {
                const key = `${d.person}-${d.grandmother}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              })
              .sort((a, b) => b.years - a.years);

            const topData = grandmotherKnownData.slice(0, 10);
            const maxYears = grandmotherKnownData.length > 0 ? Math.max(...grandmotherKnownData.map(d => d.years)) : 1;
            const topPerson = grandmotherKnownData[0];

            const gmkLabels: Record<string, { title: string; subtitle: string; person: string; born: string; grandmother: string; died: string; overlap: string; years: string; note: string; noData: string }> = {
              nl: {
                title: "Langst hun grootmoeder gekend",
                subtitle: `Dynamisch berekend uit het GEDCOM-bestand: ${grandmotherKnownData.length} personen kenden hun grootmoeder. ${topPerson ? `${topPerson.person} kende ${topPerson.grandmother} het langst: ${topPerson.years} jaar.` : ''}`,
                person: "Persoon", born: "°Geboren", grandmother: "Grootmoeder", died: "†Overleden", overlap: "Jaren gekend", years: "jaar",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) kende ${topPerson.grandmother} (†${topPerson.grandmotherDied}) het langst: ${topPerson.years} jaar.` : '',
                noData: "Geen GEDCOM-data beschikbaar.",
              },
              en: {
                title: "Knew their grandmother the longest",
                subtitle: `Dynamically calculated from the GEDCOM file: ${grandmotherKnownData.length} persons knew their grandmother. ${topPerson ? `${topPerson.person} knew ${topPerson.grandmother} the longest: ${topPerson.years} years.` : ''}`,
                person: "Person", born: "°Born", grandmother: "Grandmother", died: "†Died", overlap: "Years known", years: "years",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) knew ${topPerson.grandmother} (†${topPerson.grandmotherDied}) the longest: ${topPerson.years} years.` : '',
                noData: "No GEDCOM data available.",
              },
              fr: {
                title: "Ont connu leur grand-mère le plus longtemps",
                subtitle: `Calculé dynamiquement à partir du fichier GEDCOM : ${grandmotherKnownData.length} personnes ont connu leur grand-mère. ${topPerson ? `${topPerson.person} a connu ${topPerson.grandmother} le plus longtemps : ${topPerson.years} ans.` : ''}`,
                person: "Personne", born: "°Né(e)", grandmother: "Grand-mère", died: "†Décédée", overlap: "Années connues", years: "ans",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) a connu ${topPerson.grandmother} (†${topPerson.grandmotherDied}) le plus longtemps : ${topPerson.years} ans.` : '',
                noData: "Aucune donnée GEDCOM disponible.",
              },
              es: {
                title: "Conocieron a su abuela más tiempo",
                subtitle: `Calculado dinámicamente del archivo GEDCOM: ${grandmotherKnownData.length} personas conocieron a su abuela.`,
                person: "Persona", born: "°Nacido/a", grandmother: "Abuela", died: "†Fallecida", overlap: "Años conocidos", years: "años",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) conoció a ${topPerson.grandmother} (†${topPerson.grandmotherDied}) durante más tiempo: ${topPerson.years} años.` : '',
                noData: "No hay datos GEDCOM disponibles.",
              },
              de: {
                title: "Kannten ihre Großmutter am längsten",
                subtitle: `Dynamisch berechnet aus der GEDCOM-Datei: ${grandmotherKnownData.length} Personen kannten ihre Großmutter.`,
                person: "Person", born: "°Geboren", grandmother: "Großmutter", died: "†Gestorben", overlap: "Jahre gekannt", years: "Jahre",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) kannte ${topPerson.grandmother} (†${topPerson.grandmotherDied}) am längsten: ${topPerson.years} Jahre.` : '',
                noData: "Keine GEDCOM-Daten verfügbar.",
              },
              sv: {
                title: "Kände sin farmor längst",
                subtitle: `Dynamiskt beräknat från GEDCOM-filen: ${grandmotherKnownData.length} personer kände sin farmor.`,
                person: "Person", born: "°Född", grandmother: "Farmor", died: "†Död", overlap: "År kända", years: "år",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) kände ${topPerson.grandmother} (†${topPerson.grandmotherDied}) längst: ${topPerson.years} år.` : '',
                noData: "Inga GEDCOM-data tillgängliga.",
              },
              pcd: {
                title: "Ont connu leu grand-mère l'pus longtemps",
                subtitle: `Calculé dynamiquement du fichier GEDCOM : ${grandmotherKnownData.length} personnes ont connu leu grand-mère.`,
                person: "Personne", born: "°Né", grandmother: "Grand-mère", died: "†Décédée", overlap: "Années connues", years: "ans",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) a connu ${topPerson.grandmother} (†${topPerson.grandmotherDied}) l'pus longtemps : ${topPerson.years} ans.` : '',
                noData: "Point d'données GEDCOM disponibles.",
              },
              vls: {
                title: "Langst hun grootmoeder gekend",
                subtitle: `Dynamisch berekend uut 't GEDCOM-bestand: ${grandmotherKnownData.length} persôonen kenden hun grootmoeder.`,
                person: "Persôon", born: "°Geboorn", grandmother: "Grootmoeder", died: "†Overleen", overlap: "Joarn gekend", years: "joar",
                note: topPerson ? `${topPerson.person} (°${topPerson.born}) kende ${topPerson.grandmother} (†${topPerson.grandmotherDied}) 't langste: ${topPerson.years} joar.` : '',
                noData: "Geen GEDCOM-data beschikboar.",
              },
            };

            const gmkl = gmkLabels[language] || gmkLabels.nl;

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62 }}
                className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
              >
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  {gmkl.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">{gmkl.subtitle}</p>

                {grandmotherKnownData.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">{gmkl.noData}</p>
                ) : (<>
                {/* Visual bars */}
                <div className="space-y-3 mb-6">
                  {topData.map((d, i) => {
                    const barWidth = Math.max(15, (d.years / maxYears) * 100);
                    return (
                      <div key={`gmk-${i}`}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.person} <span className="text-muted-foreground font-normal">°{d.born}</span></span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.grandmother} †{d.grandmotherDied}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div
                            className="h-full rounded-md flex items-center justify-end pr-3 transition-all"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: `hsl(${330 - i * 5}, 50%, ${38 + i * 2}%)`,
                              minWidth: '60px',
                            }}
                          >
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">
                              {d.years} {gmkl.years}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.grandmother} †{d.grandmotherDied}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Full table */}
                <ReadMore label={language === 'en' ? 'Show full table' : language === 'fr' || language === 'pcd' ? 'Voir le tableau complet' : language === 'de' ? 'Vollständige Tabelle anzeigen' : language === 'sv' ? 'Visa hela tabellen' : 'Bekijk volledige tabel'} collapsedLabel={language === 'en' ? 'Hide table' : language === 'fr' || language === 'pcd' ? 'Masquer le tableau' : language === 'de' ? 'Tabelle ausblenden' : language === 'sv' ? 'Dölj tabellen' : 'Verberg tabel'}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gmkl.person}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gmkl.born}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gmkl.grandmother}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{gmkl.died}</th>
                        <th className="py-1.5 text-right font-medium text-muted-foreground">{gmkl.overlap}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grandmotherKnownData.map((d, i) => (
                        <tr key={`gmkt-${i}`} className="border-b border-border/50">
                          <td className="py-1.5 font-medium text-foreground">{d.person}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.born}</td>
                          <td className="py-1.5 text-muted-foreground">{d.grandmother}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.grandmotherDied}</td>
                          <td className="py-1.5 text-right font-semibold text-pink-600 dark:text-pink-400 tabular-nums">{d.years} {gmkl.years}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </ReadMore>

                <p className="text-[11px] text-muted-foreground mt-4 italic border-t border-border pt-3">
                  {gmkl.note}
                </p>
                </>)}
              </motion.div>
            );
          })()}

          {/* Langst hun ouders gekend - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const fatherData = gedcomAnalysis.longestKnewFather.slice(0, 6);
            const motherData = gedcomAnalysis.longestKnewMother.slice(0, 6);
            const allData = [...fatherData, ...motherData];
            const maxYears = allData.length > 0 ? Math.max(...allData.map(d => d.years)) : 1;

            const pl: Record<string, { title: string; fatherTitle: string; motherTitle: string; person: string; born: string; parent: string; died: string; overlap: string; years: string; noData: string }> = {
              nl: { title: "Langst hun ouders gekend", fatherTitle: "Vader het langst gekend", motherTitle: "Moeder het langst gekend", person: "Persoon", born: "°Geboren", parent: "Ouder", died: "†Overleden", overlap: "Jaren samen", years: "jaar", noData: "Geen GEDCOM-data beschikbaar." },
              en: { title: "Knew their parents the longest", fatherTitle: "Knew father the longest", motherTitle: "Knew mother the longest", person: "Person", born: "°Born", parent: "Parent", died: "†Died", overlap: "Years together", years: "years", noData: "No GEDCOM data available." },
              fr: { title: "Ont connu leurs parents le plus longtemps", fatherTitle: "Père le plus longtemps", motherTitle: "Mère le plus longtemps", person: "Personne", born: "°Né(e)", parent: "Parent", died: "†Décédé(e)", overlap: "Années ensemble", years: "ans", noData: "Aucune donnée GEDCOM." },
              es: { title: "Conocieron a sus padres más tiempo", fatherTitle: "Padre más tiempo", motherTitle: "Madre más tiempo", person: "Persona", born: "°Nacido/a", parent: "Padre/Madre", died: "†Fallecido/a", overlap: "Años juntos", years: "años", noData: "No hay datos GEDCOM." },
              de: { title: "Kannten ihre Eltern am längsten", fatherTitle: "Vater am längsten", motherTitle: "Mutter am längsten", person: "Person", born: "°Geboren", parent: "Elternteil", died: "†Gestorben", overlap: "Jahre zusammen", years: "Jahre", noData: "Keine GEDCOM-Daten." },
              sv: { title: "Kände sina föräldrar längst", fatherTitle: "Far längst", motherTitle: "Mor längst", person: "Person", born: "°Född", parent: "Förälder", died: "†Död", overlap: "År tillsammans", years: "år", noData: "Inga GEDCOM-data." },
              pcd: { title: "Ont connu leus parints l'pus longtemps", fatherTitle: "Père l'pus longtemps", motherTitle: "Mère l'pus longtemps", person: "Personne", born: "°Né(e)", parent: "Parint", died: "†Décédé(e)", overlap: "Années insambe", years: "ans", noData: "Point d'données GEDCOM." },
              vls: { title: "Langst hun ouders gekend", fatherTitle: "Voader 't langst gekend", motherTitle: "Moeder 't langst gekend", person: "Persôon", born: "°Geboorn", parent: "Ouder", died: "†Overleen", overlap: "Joaren tsoamen", years: "joar", noData: "Geen GEDCOM-data beschikboar." },
            };
            const pll = pl[language] || pl.nl;

            const renderRanking = (data: typeof fatherData, title: string, colorHue: number) => (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
                <div className="space-y-4">
                  {data.map((d, i) => {
                    const barWidth = Math.max(15, (d.years / maxYears) * 100);
                    const isFirst = i === 0;
                    return (
                      <div key={i}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="flex items-center gap-2">
                            {isFirst ? <span className="text-base">🏆</span> : <span className="text-xs text-muted-foreground font-semibold w-5 text-center">{i + 1}</span>}
                            <span className={`text-sm font-medium ${isFirst ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>{d.person}</span>
                            <span className="text-xs text-muted-foreground font-normal">°{d.born}</span>
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.parent} †{d.parentDied}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div className="h-full rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${barWidth}%`, backgroundColor: `hsl(${colorHue}, ${isFirst ? 70 : 50}%, ${isFirst ? 38 : 45}%)`, minWidth: '60px' }}>
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">{d.years} {pll.years}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.parent} †{d.parentDied}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );

            return (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  {pll.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  {allData.length > 0 ? `${language === 'nl' || language === 'vls' ? 'Dynamisch berekend uit GEDCOM' : 'Dynamically calculated from GEDCOM'}. ${fatherData[0] ? `${pll.fatherTitle}: ${fatherData[0].person} — ${fatherData[0].years} ${pll.years}` : ''}` : pll.noData}
                </p>
                {allData.length > 0 && (<>
                  {renderRanking(fatherData, pll.fatherTitle, 160)}
                  {renderRanking(motherData, pll.motherTitle, 330)}
                </>)}
              </motion.div>
            );
          })()}

          {/* Meeste kinderen - analyse (dynamisch uit GEDCOM) */}
          {(() => {
            const childrenData = gedcomAnalysis.mostChildren;
            const maxChildren = childrenData.length > 0 ? Math.max(...childrenData.map(d => d.children)) : 1;

            const ckLabels: Record<string, { title: string; parent: string; count: string; period: string; survived: string; of: string; noData: string }> = {
              nl: { title: "Meeste kinderen", parent: "Ouders", count: "Kinderen", period: "Periode", survived: "Overleefden", of: "van", noData: "Geen GEDCOM-data beschikbaar." },
              en: { title: "Most children", parent: "Parents", count: "Children", period: "Period", survived: "Survived", of: "of", noData: "No GEDCOM data available." },
              fr: { title: "Le plus d'enfants", parent: "Parents", count: "Enfants", period: "Période", survived: "Ont survécu", of: "sur", noData: "Aucune donnée GEDCOM." },
              es: { title: "Más hijos", parent: "Padres", count: "Hijos", period: "Período", survived: "Sobrevivieron", of: "de", noData: "No hay datos GEDCOM." },
              de: { title: "Die meisten Kinder", parent: "Eltern", count: "Kinder", period: "Zeitraum", survived: "Überlebten", of: "von", noData: "Keine GEDCOM-Daten." },
              sv: { title: "Flest barn", parent: "Föräldrar", count: "Barn", period: "Period", survived: "Överlevde", of: "av", noData: "Inga GEDCOM-data." },
              pcd: { title: "L'pus d'éfants", parent: "Parints", count: "Éfants", period: "Période", survived: "Ont survécu", of: "sur", noData: "Point d'données GEDCOM." },
              vls: { title: "Meeste kinders", parent: "Ouders", count: "Kinders", period: "Periode", survived: "Overleefden", of: "van", noData: "Geen GEDCOM-data beschikboar." },
            };
            const ck = ckLabels[language] || ckLabels.nl;

            return (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  {ck.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">
                  {childrenData.length > 0 ? `${childrenData.length} ${language === 'nl' || language === 'vls' ? 'gezinnen met 3+ kinderen uit GEDCOM' : 'families with 3+ children from GEDCOM'}` : ck.noData}
                </p>

                {childrenData.length > 0 && (<>
                <div className="space-y-4 mb-6">
                  {childrenData.map((d, i) => {
                    const barWidth = Math.max(15, (d.children / maxChildren) * 100);
                    const isFirst = i === 0;
                    return (
                      <div key={i}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="flex items-center gap-2">
                            {isFirst ? <span className="text-base">👨‍👩‍👧‍👦</span> : <span className="text-xs text-muted-foreground font-semibold w-5 text-center">{i + 1}</span>}
                            <span className={`text-sm font-medium ${isFirst ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>{d.parent}</span>
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{d.period}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-8">
                          <div className="h-full rounded-md flex items-center justify-end pr-3 transition-all" style={{ width: `${barWidth}%`, backgroundColor: `hsl(${210 + i * 8}, ${isFirst ? 65 : 50}%, ${isFirst ? 42 : 48}%)`, minWidth: '60px' }}>
                            <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">
                              {d.children} {ck.count.toLowerCase()}
                              {d.survived !== null && <span className="font-normal opacity-80"> ({d.survived} ✓)</span>}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">{d.period}</div>
                      </div>
                    );
                  })}
                </div>

                <ReadMore label={language === 'en' ? 'Show full table' : language === 'fr' || language === 'pcd' ? 'Voir le tableau complet' : language === 'de' ? 'Vollständige Tabelle anzeigen' : language === 'sv' ? 'Visa hela tabellen' : 'Bekijk volledige tabel'} collapsedLabel={language === 'en' ? 'Hide table' : language === 'fr' || language === 'pcd' ? 'Masquer le tableau' : language === 'de' ? 'Tabelle ausblenden' : language === 'sv' ? 'Dölj tabellen' : 'Verberg tabel'}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{ck.parent}</th>
                        <th className="py-1.5 text-center font-medium text-muted-foreground">{ck.count}</th>
                        <th className="py-1.5 text-center font-medium text-muted-foreground">{ck.survived}</th>
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{ck.period}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrenData.map((d, i) => (
                        <tr key={`ck-${i}`} className="border-b border-border/50">
                          <td className="py-1.5 font-medium text-foreground">{d.parent}</td>
                          <td className="py-1.5 text-center font-semibold text-blue-600 dark:text-blue-400 tabular-nums">{d.children}</td>
                          <td className="py-1.5 text-center text-muted-foreground tabular-nums">{d.survived !== null ? `${d.survived} ${ck.of} ${d.children}` : '—'}</td>
                          <td className="py-1.5 text-muted-foreground tabular-nums">{d.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </ReadMore>
                </>)}
              </motion.div>
            );
          })()}

          {/* Kindersterfte per eeuw - analyse */}
          {(() => {
            // Dynamically compute child mortality from GEDCOM data
            const centuries = ['17e', '18e', '19e', '20e', '21e'] as const;
            const centuryRange = (c: string): [number, number] => {
              const map: Record<string, [number, number]> = {
                '17e': [1600, 1699], '18e': [1700, 1799], '19e': [1800, 1899], '20e': [1900, 1999], '21e': [2000, 2099],
              };
              return map[c] || [0, 0];
            };

            const extractYear = (dateStr?: string): number | null => {
              if (!dateStr) return null;
              const cleaned = dateStr.replace(/^(ABT|BEF|AFT|CAL|EST|FROM|TO|BET|AND)\s*/gi, '').trim();
              const m = cleaned.match(/(\d{4})/);
              return m ? parseInt(m[1], 10) : null;
            };

            const childMortalityData = centuries.map(century => {
              const [start, end] = centuryRange(century);
              let total = 0;
              let died = 0;
              const names: string[] = [];

              for (const indi of allGedcomDescendants) {
                const birthYear = extractYear(indi.birthDate);
                if (!birthYear || birthYear < start || birthYear > end) continue;
                total++;

                // Check if died before age 5
                const deathYear = extractYear(indi.deathDate);
                if (deathYear && indi.birthDate && indi.deathDate) {
                  const bStr = convertGedcomDate(indi.birthDate);
                  const dStr = convertGedcomDate(indi.deathDate);
                  const { age } = calculateAge(bStr, dStr);
                  if (age !== null && age < 5) {
                    died++;
                    const ageDisplay = age < 1
                      ? (() => {
                          const bDate = parseDate(bStr);
                          const dDate = parseDate(dStr);
                          if (bDate && dDate) {
                            const months = (dDate.getFullYear() - bDate.getFullYear()) * 12 + dDate.getMonth() - bDate.getMonth();
                            return months < 1 ? 'enkele dagen' : `${months} maand${months > 1 ? 'en' : ''}`;
                          }
                          return 'enkele maanden';
                        })()
                      : `${age} jaar`;
                    names.push(`${indi.fullName} (°${birthYear} †${deathYear}, ${ageDisplay})`);
                  }
                }
              }

              return { century, total, died, names, note: died === 0 && total > 0 ? 'Geen kindersterfte geregistreerd' : '' };
            }).filter(d => d.total > 0 || d.died > 0);

            const cmLabels: Record<string, { title: string; subtitle: string; century: string; total: string; died: string; rate: string; victims: string; note: string }> = {
              nl: { title: "Kindersterfte per eeuw", subtitle: "Hoeveel kinderen uit de familie stierven vóór hun 5e verjaardag? Gebaseerd op alle nakomelingen van Bauduin Deleforge in de stamboom.", century: "Eeuw", total: "Geboorten", died: "†Vóór 5 jaar", rate: "Sterfte%", victims: "Slachtoffers", note: "De 18e eeuw toonde al een schrijnend beeld: 12 van de 28 kinderen (43%) stierven vóór hun 5e. In de 19e eeuw waren het 22 op 65 (34%), waaronder 5 kinderen van Charles Louis. De 20e eeuw bracht verbetering: 11 op 48 (23%), en in de 21e eeuw is kindersterfte in de familie volledig verdwenen." },
              en: { title: "Child mortality per century", subtitle: "How many children from the family died before their 5th birthday? Based on all descendants of Bauduin Deleforge in the family tree.", century: "Century", total: "Births", died: "†Before age 5", rate: "Mortality%", victims: "Victims", note: "The 18th century already showed a harrowing picture: 12 of 28 children (43%) died before age 5. In the 19th century it was 22 of 65 (34%). The 20th century brought improvement: 11 of 48 (23%), and in the 21st century child mortality has completely disappeared." },
              fr: { title: "Mortalité infantile par siècle", subtitle: "Combien d'enfants de la famille sont morts avant leur 5e anniversaire ? Basé sur tous les descendants de Bauduin Deleforge.", century: "Siècle", total: "Naissances", died: "†Avant 5 ans", rate: "Mortalité%", victims: "Victimes", note: "Au 18e siècle, 12 des 28 enfants (43%) sont morts avant 5 ans. Au 19e siècle, 22 sur 65 (34%). Au 20e siècle, 11 sur 48 (23%), et au 21e siècle la mortalité infantile a complètement disparu." },
              es: { title: "Mortalidad infantil por siglo", subtitle: "¿Cuántos niños de la familia murieron antes de cumplir 5 años?", century: "Siglo", total: "Nacimientos", died: "†Antes de 5 años", rate: "Mortalidad%", victims: "Víctimas", note: "En el siglo XVIII, 12 de 28 niños (43%) murieron antes de los 5 años. En el siglo XIX, 22 de 65 (34%). En el siglo XX, 11 de 48 (23%)." },
              de: { title: "Kindersterblichkeit pro Jahrhundert", subtitle: "Wie viele Kinder der Familie starben vor ihrem 5. Geburtstag?", century: "Jh.", total: "Geburten", died: "†Vor 5 Jahren", rate: "Sterberate%", victims: "Opfer", note: "Im 18. Jahrhundert starben 12 von 28 Kindern (43%). Im 19. Jahrhundert 22 von 65 (34%). Im 20. Jahrhundert 11 von 48 (23%)." },
              sv: { title: "Barnadödlighet per århundrade", subtitle: "Hur många barn i familjen dog före sin 5:e födelsedag?", century: "Årh.", total: "Födslar", died: "†Före 5 år", rate: "Dödlighet%", victims: "Offer", note: "Under 1700-talet dog 12 av 28 barn (43%). Under 1800-talet 22 av 65 (34%). Under 1900-talet 11 av 48 (23%)." },
              pcd: { title: "Mortalité des éfants par siéque", subtitle: "Combien d'éfants d'eul famille sont morts avant leu 5e anniversaire ?", century: "Siéque", total: "Naissances", died: "†Avant 5 ans", rate: "Mortalité%", victims: "Victimes", note: "Au 18e siéque, 12 des 28 éfants (43%) sont morts avant 5 ans. Au 19e siéque, 22 sur 65 (34%). Au 20e siéque, 11 sur 48 (23%)." },
              vls: { title: "Kindersterfte per ieuw", subtitle: "Oeveel kinders uut de familie stierven vóór hun 5ste verjoarsdach?", century: "Ieuw", total: "Geboorten", died: "†Vóór 5 joar", rate: "Sterfte%", victims: "Slachtoffers", note: "In de 18e ieuw stierven 12 van de 28 kinders (43%). In de 19e ieuw 22 ip 65 (34%). In de 20e ieuw 11 ip 48 (23%), en in de 21e ieuw is kindersterfte in de familie volledig verdwenen." },
            };

            const cm = cmLabels[language] || cmLabels.nl;
            const maxDied = Math.max(...childMortalityData.map(d => d.died), 1);

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-card border border-border rounded-lg p-4 md:p-6 mb-8"
              >
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {cm.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-5">{cm.subtitle}</p>

                {/* Visual bars per century */}
                <div className="space-y-4 mb-6">
                  {childMortalityData.filter(d => d.total > 0).map((d, i) => {
                    const rate = d.total > 0 ? Math.round((d.died / d.total) * 100) : 0;
                    const barWidth = Math.max(8, (d.died / maxDied) * 100);
                    const hue = rate > 30 ? 0 : rate > 15 ? 25 : rate > 0 ? 45 : 120;
                    return (
                      <div key={d.century}>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{d.century} {cm.century.toLowerCase()}</span>
                          <span className="text-xs text-muted-foreground">
                            {d.died} / {d.total} ({rate}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-md overflow-hidden h-7">
                          {d.died > 0 ? (
                            <div
                              className="h-full rounded-md flex items-center justify-end pr-3 transition-all"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: `hsl(${hue}, 65%, 42%)`,
                                minWidth: '50px',
                              }}
                            >
                              <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-sm">
                                {rate}%
                              </span>
                            </div>
                          ) : (
                            <div className="h-full flex items-center pl-3">
                              <span className="text-xs text-muted-foreground italic">{d.died === 0 && d.total > 0 ? '0%' : '—'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Line chart: mortality trend */}
                <div className="mb-8">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart
                      data={childMortalityData.filter(d => d.total > 0).map(d => ({
                        century: d.century + (language === 'en' ? ' c.' : ' ' + cm.century.toLowerCase().replace(/^\w/, c => c)),
                        rate: d.total > 0 ? Math.round((d.died / d.total) * 100) : 0,
                        died: d.died,
                        total: d.total,
                      }))}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="century" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        domain={[0, 50]}
                        tickFormatter={(v: number) => `${v}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: 'hsl(var(--foreground))',
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'rate') return [`${value}%`, cm.rate.replace('%', '')];
                          return [value, name];
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(0, 65%, 50%)"
                        strokeWidth={3}
                        dot={{ r: 6, fill: 'hsl(0, 65%, 50%)', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: 'hsl(0, 75%, 55%)' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed victims list + summary table - collapsible */}
                <ReadMore label={language === 'en' ? 'Show victims & table' : language === 'fr' || language === 'pcd' ? 'Voir les victimes & tableau' : language === 'de' ? 'Opfer & Tabelle anzeigen' : language === 'sv' ? 'Visa offer & tabell' : 'Bekijk slachtoffers & tabel'} collapsedLabel={language === 'en' ? 'Hide details' : language === 'fr' || language === 'pcd' ? 'Masquer les détails' : language === 'de' ? 'Details ausblenden' : language === 'sv' ? 'Dölj detaljer' : 'Verberg details'}>
                {childMortalityData.filter(d => d.names.length > 0).map(d => (
                  <div key={`v-${d.century}`} className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {d.century} {cm.century.toLowerCase()} — {cm.victims}
                    </h3>
                    <ul className="space-y-1">
                      {d.names.map((name, i) => (
                        <li key={i} className="text-xs text-foreground flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">†</span>
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-1.5 text-left font-medium text-muted-foreground">{cm.century}</th>
                        <th className="py-1.5 text-center font-medium text-muted-foreground">{cm.total}</th>
                        <th className="py-1.5 text-center font-medium text-muted-foreground">{cm.died}</th>
                        <th className="py-1.5 text-right font-medium text-muted-foreground">{cm.rate}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childMortalityData.filter(d => d.total > 0).map((d, i) => {
                        const rate = d.total > 0 ? Math.round((d.died / d.total) * 100) : 0;
                        return (
                          <tr key={`cm-${i}`} className="border-b border-border/50">
                            <td className="py-1.5 font-medium text-foreground">{d.century}</td>
                            <td className="py-1.5 text-center text-muted-foreground tabular-nums">{d.total}</td>
                            <td className="py-1.5 text-center font-semibold text-red-600 dark:text-red-400 tabular-nums">{d.died}</td>
                            <td className="py-1.5 text-right tabular-nums" style={{ color: rate > 30 ? 'hsl(0, 65%, 50%)' : rate > 0 ? 'hsl(25, 65%, 50%)' : 'hsl(120, 50%, 45%)' }}>
                              {rate}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                </ReadMore>

                <p className="text-[11px] text-muted-foreground mt-4 italic border-t border-border pt-3">
                  {cm.note}
                </p>
              </motion.div>
            );
          })()}

          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">
                    #
                  </th>
                  <SortHeader label={t.name} sortField="name" />
                  <SortHeader label={t.birth} sortField="birth" />
                  <SortHeader label={t.death} sortField="death" />
                  <SortHeader label={t.age} sortField="age" />
                  <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    {t.notes}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((person, index) => (
                  <motion.tr
                    key={`${person.name}-${person.birthDate}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-3 py-2.5 text-sm text-muted-foreground tabular-nums">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2.5 text-sm font-medium text-foreground">
                      <span className="flex items-center gap-1.5 flex-wrap">
                        {person.name}
                        {person.source === 'historisch' && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent font-normal whitespace-nowrap">
                            {t.historisch}
                          </span>
                        )}
                        {person.dataSource === 'myheritage' && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-normal whitespace-nowrap">
                            MyHeritage
                          </span>
                        )}
                        {person.dataSource === 'verrijkt' && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-normal whitespace-nowrap">
                            ✓ MyHeritage
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-sm text-muted-foreground tabular-nums">
                      {person.birthDate || "?"}
                    </td>
                    <td className="px-3 py-2.5 text-sm text-muted-foreground tabular-nums">
                      {person.deathDate}
                    </td>
                    <td className="px-3 py-2.5 text-sm tabular-nums">
                      <span className={`font-semibold ${
                        person.age !== null && person.age >= 70
                          ? 'text-green-600 dark:text-green-400'
                          : person.age !== null && person.age >= 40
                            ? 'text-foreground'
                            : person.age !== null && person.age < 5
                              ? 'text-red-500 dark:text-red-400'
                              : 'text-muted-foreground'
                      }`}>
                        {person.ageDisplay}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground hidden md:table-cell">
                      {person.notes || ""}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            {filtered.length} {t.total}
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Overledenen;
