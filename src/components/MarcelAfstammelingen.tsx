import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Search, Users, ChevronDown, ChevronUp, BarChart3, Heart, Calendar, TrendingUp, ArrowUpDown, ArrowUp, ArrowDown, Download, Loader2, TableIcon, GitBranch } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import FamilyTreeView from "./FamilyTreeView";
import { ScrollArea } from "@/components/ui/scroll-area";

type SortField = 'naam' | 'geboortedatum' | 'leeftijd' | null;
type SortDirection = 'asc' | 'desc';
// Helper functie om leeftijd te berekenen
const berekenLeeftijd = (geboortedatum: string, overlijdensdatum: string): number | null => {
  if (!geboortedatum) return null;
  
  const parseDatum = (datum: string): Date | null => {
    const parts = datum.split('/');
    if (parts.length !== 3) return null;
    const [dag, maand, jaar] = parts.map(Number);
    if (isNaN(dag) || isNaN(maand) || isNaN(jaar)) return null;
    return new Date(jaar, maand - 1, dag);
  };
  
  const geboorte = parseDatum(geboortedatum);
  if (!geboorte) return null;
  
  const eindDatum = overlijdensdatum ? parseDatum(overlijdensdatum) : new Date();
  if (!eindDatum) return null;
  
  let leeftijd = eindDatum.getFullYear() - geboorte.getFullYear();
  const maandVerschil = eindDatum.getMonth() - geboorte.getMonth();
  if (maandVerschil < 0 || (maandVerschil === 0 && eindDatum.getDate() < geboorte.getDate())) {
    leeftijd--;
  }
  
  return leeftijd >= 0 ? leeftijd : null;
};

// Afstammelingen data van Marcel August Deforce
interface Partner {
  naam: string;
  huwelijksdatum: string;
}

interface Afstammeling {
  nr: string;
  naam: string;
  geboortedatum: string;
  overlijdensdatum: string;
  partners: Partner[];
  generatie: number;
}

// Helper om oude partner/huwelijksdatum format te behouden voor backwards compatibility
const getFirstPartner = (p: Afstammeling): string => p.partners[0]?.naam || "";
const getFirstHuwelijk = (p: Afstammeling): string => p.partners[0]?.huwelijksdatum || "";

const afstammelingenData: Afstammeling[] = [
  // Stamvader - Marcel zelf
  { nr: "0.", naam: "Marcel August Deforce", geboortedatum: "16/08/1894", overlijdensdatum: "09/12/1963", partners: [{ naam: "Magdalena Geldof", huwelijksdatum: "09/01/1918" }], generatie: 0 },
  
  // Generatie 1 - Kinderen van Marcel
  { nr: "1.", naam: "Maria Margaretha Deforce", geboortedatum: "23/10/1918", overlijdensdatum: "05/12/1983", partners: [], generatie: 1 },
  { nr: "2.", naam: "Jooris Joseph (Georges) Deforce", geboortedatum: "21/02/1921", overlijdensdatum: "22/12/1984", partners: [{ naam: "Simonne Adèle Vandeputte", huwelijksdatum: "07/06/1945" }], generatie: 1 },
  { nr: "3.", naam: "Béatrice Thérèse Deforce", geboortedatum: "13/10/1922", overlijdensdatum: "06/01/1924", partners: [], generatie: 1 },
  { nr: "4.", naam: "Béatrice Euphrasie Deforce", geboortedatum: "03/05/1924", overlijdensdatum: "05/07/1926", partners: [], generatie: 1 },
  { nr: "5.", naam: "André Maurice Deforce", geboortedatum: "27/02/1926", overlijdensdatum: "11/06/1999", partners: [{ naam: "Francina Brion", huwelijksdatum: "24/02/1954" }], generatie: 1 },
  { nr: "6.", naam: "Daniël Michel Deforce", geboortedatum: "31/08/1927", overlijdensdatum: "26/04/2004", partners: [{ naam: "Hedwige Hoet", huwelijksdatum: "14/07/1962" }], generatie: 1 },
  { nr: "7.", naam: "Lucien Camille Deforce", geboortedatum: "09/12/1929", overlijdensdatum: "07/10/2003", partners: [{ naam: "Maria Decaigny", huwelijksdatum: "25/01/1958" }], generatie: 1 },
  { nr: "8.", naam: "Hendrik Cyriel Deforce", geboortedatum: "30/09/1931", overlijdensdatum: "27/06/2013", partners: [{ naam: "Monique Carlier", huwelijksdatum: "09/07/1960" }], generatie: 1 },
  { nr: "9.", naam: "Monique (Monica Alice) Deforce", geboortedatum: "07/11/1932", overlijdensdatum: "10/08/2017", partners: [{ naam: "Hendrik Geldof", huwelijksdatum: "10/07/1973" }], generatie: 1 },
  { nr: "10.", naam: "Bérénice Flavie Deforce", geboortedatum: "21/01/1934", overlijdensdatum: "01/2003", partners: [{ naam: "Max Autier", huwelijksdatum: "03/09/1955" }], generatie: 1 },
  { nr: "11.", naam: "Félice Adrienne Deforce", geboortedatum: "05/08/1935", overlijdensdatum: "30/11/2022", partners: [{ naam: "Michel Goddaer", huwelijksdatum: "09/07/1957" }], generatie: 1 },
  { nr: "12.", naam: "Gabriël Wilfried Deforce", geboortedatum: "11/01/1937", overlijdensdatum: "16/08/2014", partners: [{ naam: "Erna De Four", huwelijksdatum: "28/12/1963" }], generatie: 1 },

  // Generatie 2 - Kleinkinderen van Marcel
  { nr: "2.1.", naam: "Jan Emiel Louis Deforce", geboortedatum: "11/11/1945", overlijdensdatum: "21/03/1946", partners: [], generatie: 2 },
  { nr: "2.2.", naam: "Marc Marcel Frans Deforce", geboortedatum: "22/12/1946", overlijdensdatum: "", partners: [{ naam: "Lut Van Hijfte", huwelijksdatum: "15/01/1972" }], generatie: 2 },
  { nr: "2.3.", naam: "Luc Norbert Leopold Deforce", geboortedatum: "19/04/1948", overlijdensdatum: "24/08/2024", partners: [{ naam: "Marleen Dobbels", huwelijksdatum: "17/09/1971" }], generatie: 2 },
  { nr: "2.4.", naam: "Geert Marie Lucien Deforce", geboortedatum: "21/05/1949", overlijdensdatum: "26/01/2009", partners: [{ naam: "Andrea Vynckier", huwelijksdatum: "14/07/1972" }], generatie: 2 },
  { nr: "2.5.", naam: "Ann Deforce", geboortedatum: "22/07/1950", overlijdensdatum: "", partners: [{ naam: "Johan Declercq", huwelijksdatum: "1978" }], generatie: 2 },
  { nr: "2.6.", naam: "Hans Daniël Jozef Deforce", geboortedatum: "31/03/1952", overlijdensdatum: "", partners: [{ naam: "Trees Deleu", huwelijksdatum: "16/10/1973" }, { naam: "Lena Dewolf", huwelijksdatum: "samenwonend" }, { naam: "Andrea Waeyenbergh", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "2.7.", naam: "Rosemie Deforce", geboortedatum: "21/06/1953", overlijdensdatum: "", partners: [{ naam: "Luc Bekaert", huwelijksdatum: "06/10/1973" }], generatie: 2 },
  { nr: "2.8.", naam: "Kathy Deforce", geboortedatum: "09/11/1954", overlijdensdatum: "19/10/1999", partners: [{ naam: "Joris Tinel", huwelijksdatum: "26/04/1976" }], generatie: 2 },
  { nr: "2.9.", naam: "Béatrix Nicole Deforce", geboortedatum: "06/12/1955", overlijdensdatum: "22/01/1957", partners: [], generatie: 2 },
  { nr: "2.10.", naam: "Leen Deforce", geboortedatum: "18/04/1958", overlijdensdatum: "", partners: [{ naam: "Dirk Muylle", huwelijksdatum: "1978" }, { naam: "Koen Descheemaeker", huwelijksdatum: "13/05/1988" }], generatie: 2 },
  { nr: "2.11.", naam: "Karien Deforce", geboortedatum: "20/01/1962", overlijdensdatum: "", partners: [{ naam: "Manu Behaeghe", huwelijksdatum: "05/02/1988" }], generatie: 2 },
  { nr: "5.1.", naam: "Lieve Deforce", geboortedatum: "03/05/1963", overlijdensdatum: "", partners: [{ naam: "Ronny D'hoore", huwelijksdatum: "03/05/1986" }], generatie: 2 },
  { nr: "5.2.", naam: "Hans Deforce", geboortedatum: "19/08/1964", overlijdensdatum: "", partners: [{ naam: "Ann Dhoore", huwelijksdatum: "11/04/1986" }], generatie: 2 },
  { nr: "6.1.", naam: "Greet Deforce", geboortedatum: "23/02/1963", overlijdensdatum: "", partners: [{ naam: "Paul De Leyn", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "6.2.", naam: "Jo Deforce", geboortedatum: "13/05/1964", overlijdensdatum: "", partners: [{ naam: "Lieke Schoofs", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "6.3.", naam: "Wim Deforce", geboortedatum: "02/07/1965", overlijdensdatum: "", partners: [{ naam: "Viviane Vandeweyer", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "7.1.", naam: "Günter Kartak", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 2 },
  { nr: "8.1.", naam: "Patrick Deforce", geboortedatum: "02/02/1962", overlijdensdatum: "", partners: [{ naam: "Inge Vanbets", huwelijksdatum: "samenwonend" }, { naam: "Sigrid Blondeel", huwelijksdatum: "18/09/2009" }, { naam: "Gratienne Cooman", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "8.2.", naam: "Isabelle Deforce", geboortedatum: "22/02/1963", overlijdensdatum: "", partners: [{ naam: "Marc Vander Haegen", huwelijksdatum: "14/08/1989" }, { naam: "Alain Meerman", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "8.3.", naam: "Stefan Deforce", geboortedatum: "30/07/1964", overlijdensdatum: "", partners: [{ naam: "Linda Colombier", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "10.1.", naam: "Philippe Autier", geboortedatum: "29/12/1956", overlijdensdatum: "", partners: [{ naam: "Anne Brédart", huwelijksdatum: "25/04/1987" }], generatie: 2 },
  { nr: "10.2.", naam: "Pascale Autier", geboortedatum: "10/04/1961", overlijdensdatum: "", partners: [{ naam: "Michel Lauwers", huwelijksdatum: "23/08/1986" }], generatie: 2 },
  { nr: "10.3.", naam: "Marianne Autier", geboortedatum: "18/09/1963", overlijdensdatum: "", partners: [{ naam: "Jean-Louis Brédart", huwelijksdatum: "14/07/1990" }], generatie: 2 },
  { nr: "11.1.", naam: "Micheline Goddaer", geboortedatum: "24/04/1958", overlijdensdatum: "", partners: [{ naam: "Jo Gilbert", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "11.2.", naam: "Karel Goddaer", geboortedatum: "28/09/1959", overlijdensdatum: "", partners: [{ naam: "Nele Ghijs", huwelijksdatum: "25/03/2022" }], generatie: 2 },
  { nr: "11.3.", naam: "Caroline Goddaer", geboortedatum: "04/07/1961", overlijdensdatum: "", partners: [{ naam: "Raf Coppens", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "11.4.", naam: "Lieve Goddaer", geboortedatum: "10/01/1965", overlijdensdatum: "", partners: [{ naam: "Bernard Bruggeman", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "11.5.", naam: "Christian Ongena", geboortedatum: "05/05/1970", overlijdensdatum: "", partners: [{ naam: "Ilse Goethals", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "12.1.", naam: "Lily Deforce", geboortedatum: "24/03/1965", overlijdensdatum: "", partners: [{ naam: "Joris Vermeesch", huwelijksdatum: "22/07/1989" }], generatie: 2 },
  { nr: "12.2.", naam: "Griet Deforce", geboortedatum: "23/02/1966", overlijdensdatum: "", partners: [{ naam: "Erik Vermeersch", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "12.3.", naam: "Miriam Deforce", geboortedatum: "24/03/1968", overlijdensdatum: "", partners: [{ naam: "Eddy Baert", huwelijksdatum: "samenwonend" }, { naam: "Sandra Vellemans", huwelijksdatum: "samenwonend" }], generatie: 2 },
  { nr: "12.4.", naam: "Johan Deforce", geboortedatum: "22/12/1970", overlijdensdatum: "", partners: [{ naam: "Katrien Van Cauwenberghe", huwelijksdatum: "samenwonend" }], generatie: 2 },

  // Generatie 3 - Achterkleinkinderen
  { nr: "2.2.1.", naam: "Veerle Gudrun Greet Deforce", geboortedatum: "16/12/1972", overlijdensdatum: "", partners: [{ naam: "Wim Vrij", huwelijksdatum: "25/06/2003" }], generatie: 3 },
  { nr: "2.2.2.", naam: "Koen Maurits Jooris Deforce", geboortedatum: "30/09/1974", overlijdensdatum: "", partners: [{ naam: "Mieken Katrien Roels", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.2.3.", naam: "Karen Deforce", geboortedatum: "28/04/1977", overlijdensdatum: "", partners: [{ naam: "Geert Abts", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.3.1.", naam: "Lieselotte Deforce", geboortedatum: "16/02/1973", overlijdensdatum: "", partners: [{ naam: "Jeroen Hanssens", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.3.2.", naam: "Tom Deforce", geboortedatum: "17/09/1974", overlijdensdatum: "", partners: [{ naam: "Erika Zwiener", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.4.1.", naam: "Bilbo Deforce", geboortedatum: "19/02/1978", overlijdensdatum: "", partners: [{ naam: "Annelies Verbelen", huwelijksdatum: "20/08/2004" }], generatie: 3 },
  { nr: "2.5.1.", naam: "Barbara Declercq", geboortedatum: "05/09/1980", overlijdensdatum: "", partners: [{ naam: "Johannes Eneman", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.6.1.", naam: "Ramses Deforce", geboortedatum: "07/01/1975", overlijdensdatum: "", partners: [{ naam: "Kristel Maho", huwelijksdatum: "10/09/1999" }, { naam: "Véronique Dumonceau", huwelijksdatum: "16/10/2010" }, { naam: "Laetitia Mercier", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.6.2.", naam: "Rebekka Deforce", geboortedatum: "09/06/1981", overlijdensdatum: "", partners: [{ naam: "Ben Van Leemput", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.6.3.", naam: "Jasperina Deforce", geboortedatum: "25/09/1987", overlijdensdatum: "", partners: [{ naam: "Bram Lips", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.8.1.", naam: "Kevin Tinel", geboortedatum: "14/04/1975", overlijdensdatum: "", partners: [{ naam: "Mieke Verhaeghe", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.8.2.", naam: "Maya Tinel", geboortedatum: "03/12/1979", overlijdensdatum: "", partners: [{ naam: "Dries Vanwynsberghe", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.10.1.", naam: "Dieter Muylle", geboortedatum: "25/06/1978", overlijdensdatum: "", partners: [{ naam: "Sofie", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.10.2.", naam: "Ellen Muylle", geboortedatum: "30/04/1980", overlijdensdatum: "", partners: [{ naam: "Els Janssens", huwelijksdatum: "28/08/2015" }], generatie: 3 },
  { nr: "2.11.1.", naam: "Margot Behaeghe", geboortedatum: "14/12/1989", overlijdensdatum: "", partners: [{ naam: "Ian Vanwalleghem", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "2.11.2.", naam: "Anton Behaeghe", geboortedatum: "28/02/1992", overlijdensdatum: "", partners: [{ naam: "Florence Vandenweghe", huwelijksdatum: "14/09/2024" }], generatie: 3 },
  { nr: "5.1.1.", naam: "Celine D'hoore", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "5.2.1.", naam: "Joey Deforce", geboortedatum: "24/11/1987", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "5.2.2.", naam: "Nicky Deforce", geboortedatum: "25/09/1990", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "6.1.1.", naam: "Jan De Leyn", geboortedatum: "30/08/1990", overlijdensdatum: "", partners: [{ naam: "Cara Van Meerbeeck", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "6.1.2.", naam: "Tom De Leyn", geboortedatum: "05/04/1993", overlijdensdatum: "", partners: [{ naam: "Andreas Percy", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "6.2.1.", naam: "Bob Deforce", geboortedatum: "21/12/2001", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "6.3.1.", naam: "Sophie Deforce", geboortedatum: "2002", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "6.3.2.", naam: "Cédric Deforce", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "8.1.1.", naam: "Dakota Deforce", geboortedatum: "04/11/1992", overlijdensdatum: "", partners: [{ naam: "Joren Demeulenaere", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "8.1.2.", naam: "Utah Deforce", geboortedatum: "08/01/1996", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "8.1.3.", naam: "Indiana Deforce", geboortedatum: "07/12/1997", overlijdensdatum: "", partners: [{ naam: "Jens", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "8.2.1.", naam: "Gil Vander Haegen", geboortedatum: "28/03/1989", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "8.2.2.", naam: "Mik Vander Haegen", geboortedatum: "26/01/1991", overlijdensdatum: "", partners: [{ naam: "Jana", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "8.2.3.", naam: "Mel Vander Haegen", geboortedatum: "29/09/1992", overlijdensdatum: "", partners: [{ naam: "Natasha", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "8.3.1.", naam: "Zeno Blondeel", geboortedatum: "", overlijdensdatum: "", partners: [{ naam: "Viviane Dip", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "8.3.2.", naam: "Jona Blondeel", geboortedatum: "", overlijdensdatum: "", partners: [{ naam: "Danae Giakoumakis", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "10.1.1.", naam: "Anton Autier", geboortedatum: "28/03/1991", overlijdensdatum: "", partners: [{ naam: "Sara Cnockaert", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "10.1.2.", naam: "Gilles Autier", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "10.2.1.", naam: "Martin Lauwers", geboortedatum: "27/12/1984", overlijdensdatum: "", partners: [{ naam: "Linda Duclos", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "10.2.2.", naam: "Louis Lauwers", geboortedatum: "22/01/1987", overlijdensdatum: "", partners: [{ naam: "Aurélie Vanden Berghe", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "10.2.3.", naam: "Maxime Lauwers", geboortedatum: "21/12/1991", overlijdensdatum: "", partners: [{ naam: "Sophie Maloteau", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "10.3.1.", naam: "Aura Brédart", geboortedatum: "13/06/1991", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "10.3.2.", naam: "Tuan Brédart", geboortedatum: "30/01/1993", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "11.1.1.", naam: "Naomi Gilbert", geboortedatum: "08/07/1988", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "11.1.2.", naam: "Zeno Gilbert", geboortedatum: "15/04/1990", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.1.1.", naam: "Brecht Vermeesch", geboortedatum: "04/01/1995", overlijdensdatum: "", partners: [{ naam: "Hanna Vaernewyck", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "12.1.2.", naam: "Helena Vermeesch", geboortedatum: "07/12/1997", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.1.3.", naam: "Mathilde Vermeesch", geboortedatum: "30/04/1999", overlijdensdatum: "", partners: [{ naam: "Valentijn Coosemans", huwelijksdatum: "samenwonend" }], generatie: 3 },
  { nr: "12.3.1.", naam: "Daan Baert", geboortedatum: "23/04/1998", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.3.2.", naam: "Tijs Baert", geboortedatum: "01/07/1999", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.3.3.", naam: "Annelies Baert", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.3.4.", naam: "Thomas Baert", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.4.1.", naam: "Victor Deforce", geboortedatum: "08/05/2001", overlijdensdatum: "", partners: [], generatie: 3 },
  { nr: "12.4.2.", naam: "Jacob Deforce", geboortedatum: "14/06/2003", overlijdensdatum: "", partners: [], generatie: 3 },

  // Generatie 4 - Betachterkleinkinderen
  { nr: "2.2.1.1.", naam: "Anna Karen Rika Vrij", geboortedatum: "28/11/2004", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.2.1.2.", naam: "Korneel Victor Manu Vrij", geboortedatum: "19/04/2006", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.2.2.1.", naam: "Marie Deforce", geboortedatum: "25/10/2006", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.2.3.1.", naam: "Pierjan Deforce", geboortedatum: "16/10/2007", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.2.3.2.", naam: "Toon Deforce", geboortedatum: "21/10/2010", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.2.3.3.", naam: "Kamiel Deforce", geboortedatum: "21/10/2010", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.3.1.1.", naam: "Winok Hanssens", geboortedatum: "04/09/2000", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.3.1.2.", naam: "Lobke Hanssens", geboortedatum: "13/07/2002", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.3.2.1.", naam: "Khalil Deforce", geboortedatum: "18/08/2007", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.3.2.2.", naam: "Uma Deforce", geboortedatum: "10/12/2009", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.4.1.1.", naam: "Ruben Deforce", geboortedatum: "17/10/2006", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.4.1.2.", naam: "Amber Deforce", geboortedatum: "30/04/2009", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.5.1.1.", naam: "Niels Eneman", geboortedatum: "02/04/2008", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.5.1.2.", naam: "Mathias Eneman", geboortedatum: "31/01/2011", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.5.1.3.", naam: "Janne Eneman", geboortedatum: "24/09/2014", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.6.1.1.", naam: "Lysha Deforce", geboortedatum: "28/10/1997", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.6.1.2.", naam: "Jelle Deforce", geboortedatum: "04/09/2000", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.6.3.1.", naam: "Nino Lips", geboortedatum: "11/12/2022", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.1.1.", naam: "Myrthe Tinel", geboortedatum: "23/02/2001", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.1.2.", naam: "Linde Tinel", geboortedatum: "22/04/2003", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.1.3.", naam: "Joran Tinel", geboortedatum: "20/05/2006", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.1.4.", naam: "Mare Tinel", geboortedatum: "05/08/2009", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.2.1.", naam: "Lucy Vanwynsberghe", geboortedatum: "20/12/2005", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.8.2.2.", naam: "Ceryl Vanwynsberghe", geboortedatum: "24/04/2008", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.11.1.1.", naam: "Babette Vanwalleghem", geboortedatum: "30/09/2017", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "2.11.1.2.", naam: "Cyriel Vanwalleghem", geboortedatum: "28/04/2020", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "6.1.1.1.", naam: "Renaat De Leyn", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "6.1.1.2.", naam: "Sylvester De Leyn", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.1.1.1.", naam: "Matteo Autier", geboortedatum: "25/06/2024", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.1.1.", naam: "Delia Lauwers-Duclos", geboortedatum: "20/06/2014", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.1.2.", naam: "Sol Lauwers-Duclos", geboortedatum: "20/11/2017", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.2.1.", naam: "Sasha Lauwers", geboortedatum: "07/03/2020", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.3.1.", naam: "Marcus Lauwers-Maloteau", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.3.2.", naam: "Léon Lauwers-Maloteau", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 4 },
  { nr: "10.2.3.3.", naam: "Jeanne Lauwers-Maloteau", geboortedatum: "", overlijdensdatum: "", partners: [], generatie: 4 },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

type ViewMode = 'table' | 'tree';

const MarcelAfstammelingen = () => {
  const { t } = useLanguage();
  const [selectedGeneratie, setSelectedGeneratie] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Helper functie om geboortedatum te parsen naar timestamp voor sortering
  const parseDateToTimestamp = (dateStr: string): number => {
    if (!dateStr) return 0;
    const parts = dateStr.split('/');
    if (parts.length === 1 && parts[0].length === 4) {
      // Alleen jaar
      return new Date(parseInt(parts[0]), 0, 1).getTime();
    }
    if (parts.length !== 3) return 0;
    const [dag, maand, jaar] = parts.map(Number);
    if (isNaN(dag) || isNaN(maand) || isNaN(jaar)) return 0;
    return new Date(jaar, maand - 1, dag).getTime();
  };

  // Toggle sortering
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1" />
      : <ArrowDown className="w-3 h-3 ml-1" />;
  };

  const generatieLabels: Record<number, string> = {
    0: t('marcel.gen0'),
    1: t('marcel.gen1'),
    2: t('marcel.gen2'),
    3: t('marcel.gen3'),
    4: t('marcel.gen4'),
  };

  const generatieColors: Record<number, string> = {
    0: "bg-amber-500/20 text-amber-700 border-amber-500/30 dark:text-amber-400",
    1: "bg-primary/20 text-primary border-primary/30",
    2: "bg-accent/20 text-accent border-accent/30",
    3: "bg-secondary text-secondary-foreground border-secondary",
    4: "bg-muted text-muted-foreground border-border",
  };

  const filteredData = useMemo(() => {
    let data = [...afstammelingenData];
    
    if (selectedGeneratie !== null) {
      data = data.filter(p => p.generatie === selectedGeneratie);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(p => 
        p.naam.toLowerCase().includes(term) ||
        p.partners.some(partner => partner.naam.toLowerCase().includes(term))
      );
    }

    // Sorteren
    if (sortField) {
      data.sort((a, b) => {
        let comparison = 0;
        
        if (sortField === 'naam') {
          comparison = a.naam.localeCompare(b.naam, 'nl');
        } else if (sortField === 'geboortedatum') {
          const timestampA = parseDateToTimestamp(a.geboortedatum);
          const timestampB = parseDateToTimestamp(b.geboortedatum);
          comparison = timestampA - timestampB;
        } else if (sortField === 'leeftijd') {
          const leeftijdA = berekenLeeftijd(a.geboortedatum, a.overlijdensdatum) ?? -1;
          const leeftijdB = berekenLeeftijd(b.geboortedatum, b.overlijdensdatum) ?? -1;
          comparison = leeftijdA - leeftijdB;
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return data;
  }, [selectedGeneratie, searchTerm, sortField, sortDirection]);

  const generatieCounts = useMemo(() => {
    const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    afstammelingenData.forEach(p => {
      counts[p.generatie]++;
    });
    return counts;
  }, []);

  // PDF Export functie
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Maak een tijdelijke container voor de PDF
      const container = document.createElement('div');
      container.style.padding = '20px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.backgroundColor = '#ffffff';
      container.style.color = '#000000';
      
      // Header - using safe DOM methods to prevent XSS
      const header = document.createElement('div');
      
      const h1 = document.createElement('h1');
      h1.style.cssText = 'font-size: 24px; margin-bottom: 8px; color: #1a1a1a;';
      h1.textContent = 'Afstammelingen Marcel August Deforce';
      header.appendChild(h1);
      
      const p = document.createElement('p');
      p.style.cssText = 'font-size: 12px; color: #666; margin-bottom: 20px;';
      p.textContent = `Gegenereerd op ${new Date().toLocaleDateString('nl-BE')} • ${filteredData.length} personen`;
      header.appendChild(p);
      
      container.appendChild(header);
      
      // Tabel
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.fontSize = '10px';
      
      // Tabel header and body - using safe DOM methods to prevent XSS
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.style.backgroundColor = '#f3f4f6';
      
      const headers = ['Nr.', 'Naam', 'Geboortedatum', 'Overlijdensdatum', 'Leeftijd', 'Partner', 'Huwelijk', 'Gen.'];
      headers.forEach(text => {
        const th = document.createElement('th');
        th.style.cssText = 'border: 1px solid #d1d5db; padding: 8px; text-align: left;';
        th.textContent = text;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      filteredData.forEach((p, idx) => {
        const leeftijd = berekenLeeftijd(p.geboortedatum, p.overlijdensdatum);
        const isOverleden = p.overlijdensdatum !== "";
        
        const row = document.createElement('tr');
        row.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f9fafb';
        
        const cellData = [
          p.nr,
          p.naam,
          p.geboortedatum || '—',
          p.overlijdensdatum || '—',
          leeftijd !== null ? `${leeftijd}${isOverleden ? '' : ' ✓'}` : '—',
          p.partners.length > 0 ? p.partners.map(pt => pt.naam + (pt.huwelijksdatum ? ` (${pt.huwelijksdatum})` : '')).join(', ') : '—',
          p.partners.length > 0 ? p.partners.map(pt => pt.huwelijksdatum || '—').join(', ') : '—',
          p.generatie
        ];
        
        cellData.forEach((text, cellIdx) => {
          const td = document.createElement('td');
          td.style.cssText = 'border: 1px solid #d1d5db; padding: 6px;';
          if (cellIdx === 1) td.style.fontWeight = '500';
          if (cellIdx === 7) td.style.textAlign = 'center';
          td.textContent = String(text);
          row.appendChild(td);
        });
        
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      container.appendChild(table);
      
      // PDF opties
      const options = {
        margin: 10,
        filename: `afstammelingen-marcel-deforce-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };
      
      await html2pdf().set(options).from(container).save();
      toast.success(t('marcel.exportSuccess'));
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error(t('marcel.exportError'));
    } finally {
      setIsExporting(false);
    }
  }, [filteredData, t]);

  // Statistieken berekenen
  const statistics = useMemo(() => {
    const parseDate = (dateStr: string): Date | null => {
      if (!dateStr) return null;
      const parts = dateStr.split('/');
      if (parts.length !== 3) return null;
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };

    const calculateAge = (birthStr: string, deathStr: string): number | null => {
      const birthDate = parseDate(birthStr);
      const deathDate = deathStr ? parseDate(deathStr) : new Date();
      if (!birthDate || !deathDate) return null;
      
      let age = deathDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = deathDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && deathDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age > 0 && age < 150 ? age : null;
    };

    // Gemiddelde leeftijd (alleen van overleden personen)
    const deceasedAges = afstammelingenData
      .filter(p => p.overlijdensdatum)
      .map(p => calculateAge(p.geboortedatum, p.overlijdensdatum))
      .filter((age): age is number => age !== null);
    
    const avgAge = deceasedAges.length > 0 
      ? Math.round(deceasedAges.reduce((a, b) => a + b, 0) / deceasedAges.length) 
      : 0;

    // Nog levende personen
    const livingCount = afstammelingenData.filter(p => !p.overlijdensdatum).length;

    // Partnernamen frequentie
    const partnerFirstNames: Record<string, number> = {};
    afstammelingenData.forEach(p => {
      p.partners.forEach(partner => {
        if (partner.naam) {
          const firstName = partner.naam.split(' ')[0];
          partnerFirstNames[firstName] = (partnerFirstNames[firstName] || 0) + 1;
        }
      });
    });
    const topPartnerNames = Object.entries(partnerFirstNames)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Familienamen frequentie
    const familyNames: Record<string, number> = {};
    afstammelingenData.forEach(p => {
      const nameParts = p.naam.split(' ');
      const lastName = nameParts[nameParts.length - 1];
      familyNames[lastName] = (familyNames[lastName] || 0) + 1;
    });
    const topFamilyNames = Object.entries(familyNames)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Huwelijksmaand statistieken
    const marriageMonths: Record<number, number> = {};
    afstammelingenData.forEach(p => {
      p.partners.forEach(partner => {
        if (partner.huwelijksdatum) {
          const parts = partner.huwelijksdatum.split('/');
          if (parts.length === 3) {
            const month = parseInt(parts[1]);
            marriageMonths[month] = (marriageMonths[month] || 0) + 1;
          }
        }
      });
    });
    const monthNames = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    const topMarriageMonth = Object.entries(marriageMonths)
      .sort((a, b) => b[1] - a[1])[0];
    const popularMarriageMonth = topMarriageMonth 
      ? { month: monthNames[parseInt(topMarriageMonth[0]) - 1], count: topMarriageMonth[1] }
      : null;

    // Aantal gehuwden
    const marriedCount = afstammelingenData.filter(p => p.partners.length > 0).length;

    // Gemiddeld aantal kinderen per ouder (gen 2 en 3)
    const childrenPerParent: Record<string, number> = {};
    afstammelingenData.forEach(p => {
      if (p.generatie > 1) {
        const parentNr = p.nr.split('.').slice(0, -1).join('.') + '.';
        childrenPerParent[parentNr] = (childrenPerParent[parentNr] || 0) + 1;
      }
    });
    const childCounts = Object.values(childrenPerParent);
    const avgChildren = childCounts.length > 0
      ? (childCounts.reduce((a, b) => a + b, 0) / childCounts.length).toFixed(1)
      : '0';

    return {
      avgAge,
      livingCount,
      deceasedCount: deceasedAges.length,
      topPartnerNames,
      topFamilyNames,
      popularMarriageMonth,
      marriedCount,
      avgChildren,
      totalCount: afstammelingenData.length,
    };
  }, []);

  const [showStatistics, setShowStatistics] = useState(false);

  const displayData = filteredData;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
          <Users className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-accent">{t('marcel.bijlage')}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">
          {t('marcel.title')}
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('marcel.subtitle')}
        </p>
      </div>

      {/* Stamvader Info */}
      <div className="bg-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h4 className="font-serif text-xl text-primary mb-1">Marcel August Deforce</h4>
            <p className="text-sm text-muted-foreground">16/08/1894 – 09/12/1963</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{t('marcel.married')}</p>
            <p className="font-medium text-foreground">Magdalena Geldof</p>
            <p className="text-sm text-muted-foreground">09/01/1918</p>
          </div>
        </div>
      </div>

      {/* Statistieken Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowStatistics(!showStatistics)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all font-medium text-sm"
        >
          <BarChart3 className="w-4 h-4" />
          {showStatistics ? t('marcel.hideStats') : t('marcel.showStats')}
          {showStatistics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Statistieken Panel */}
      {showStatistics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Leeftijd Statistiek */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{t('marcel.statAge')}</span>
            </div>
            <p className="text-3xl font-bold text-primary">{statistics.avgAge} <span className="text-lg font-normal">{t('marcel.years')}</span></p>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.livingCount} {t('marcel.living')} • {statistics.deceasedCount} {t('marcel.deceased')}
            </p>
          </div>

          {/* Huwelijken Statistiek */}
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-accent" />
              <span className="text-xs font-medium text-accent uppercase tracking-wider">{t('marcel.statMarriages')}</span>
            </div>
            <p className="text-3xl font-bold text-accent">{statistics.marriedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.popularMarriageMonth && (
                <>{t('marcel.popularMonth')}: <strong>{statistics.popularMarriageMonth.month}</strong> ({statistics.popularMarriageMonth.count}x)</>
              )}
            </p>
          </div>

          {/* Kinderen Statistiek */}
          <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-secondary-foreground" />
              <span className="text-xs font-medium text-secondary-foreground uppercase tracking-wider">{t('marcel.statChildren')}</span>
            </div>
            <p className="text-3xl font-bold text-secondary-foreground">{statistics.avgChildren}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('marcel.perFamily')}</p>
          </div>

          {/* Familienamen Statistiek */}
          <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('marcel.statNames')}</span>
            </div>
            <div className="space-y-1">
              {statistics.topFamilyNames.slice(0, 3).map(([name, count], idx) => (
                <div key={name} className="flex justify-between text-sm">
                  <span className={idx === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}>{name}</span>
                  <span className="text-muted-foreground">{count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Populaire Partnernamen */}
          <div className="md:col-span-2 bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{t('marcel.topPartnerNames')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statistics.topPartnerNames.map(([name, count]) => (
                <span key={name} className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                  {name} <span className="text-xs text-accent/70">({count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Generatie Overzicht */}
          <div className="md:col-span-2 bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{t('marcel.genOverview')}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((gen) => (
                <div key={gen} className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 ${generatieColors[gen]}`}>
                    {generatieCounts[gen]}
                  </div>
                  <p className="text-xs text-muted-foreground">{generatieLabels[gen]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Zoekbalk & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Zoekbalk */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('marcel.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        
        {/* Generatie Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGeneratie(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedGeneratie === null
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-background text-muted-foreground hover:bg-secondary border border-border"
            }`}
          >
            {t('marcel.all')} ({afstammelingenData.length})
          </button>
          {[0, 1, 2, 3, 4].map((gen) => (
            <button
              key={gen}
              onClick={() => setSelectedGeneratie(selectedGeneratie === gen ? null : gen)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedGeneratie === gen
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:bg-secondary border border-border"
              }`}
            >
              {generatieLabels[gen]} ({generatieCounts[gen]})
            </button>
          ))}
        </div>
      </div>

      {/* Resultaten Info + View Toggle + Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <p className="text-sm text-muted-foreground">
          <strong>{filteredData.length}</strong> {t('marcel.results')}
        </p>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg border border-border p-1 bg-background">
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'table' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              {t('marcel.viewTable')}
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === 'tree' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              {t('marcel.viewTree')}
            </button>
          </div>
          
          {/* Export Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('marcel.exporting')}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t('marcel.exportPdf')}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tree View */}
      {viewMode === 'tree' && (
        <FamilyTreeView data={afstammelingenData} />
      )}

      {/* Tabel */}
      {viewMode === 'table' && (
        <>
      <div className="bg-background rounded-lg shadow-vintage border border-border overflow-hidden">
        <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nr.</th>
                <th 
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                  onClick={() => handleSort('naam')}
                >
                  <span className="inline-flex items-center">
                    {t('marcel.colNaam')}
                    <SortIcon field="naam" />
                  </span>
                </th>
                <th 
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell cursor-pointer hover:text-foreground transition-colors select-none"
                  onClick={() => handleSort('geboortedatum')}
                >
                  <span className="inline-flex items-center">
                    {t('marcel.colGeboorte')}
                    <SortIcon field="geboortedatum" />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">{t('marcel.colPartner')}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">{t('marcel.colHuwelijk')}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">{t('marcel.colOverlijden')}</th>
                <th 
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell cursor-pointer hover:text-foreground transition-colors select-none"
                  onClick={() => handleSort('leeftijd')}
                >
                  <span className="inline-flex items-center">
                    {t('marcel.colLeeftijd')}
                    <SortIcon field="leeftijd" />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('marcel.colGen')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayData.map((persoon, index) => {
                const leeftijd = berekenLeeftijd(persoon.geboortedatum, persoon.overlijdensdatum);
                const isOverleden = persoon.overlijdensdatum !== "";
                
                return (
                  <motion.tr
                    key={persoon.nr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{persoon.nr}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{persoon.naam}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{persoon.geboortedatum}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                      {persoon.partners.length > 0 ? (
                        <div className="space-y-1">
                          {persoon.partners.map((partner, idx) => (
                            <div key={idx} className={persoon.partners.length > 1 ? "flex items-center gap-1" : ""}>
                              {persoon.partners.length > 1 && <span className="text-xs text-muted-foreground/60">{idx + 1}.</span>}
                              <span>{partner.naam}</span>
                            </div>
                          ))}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                      {persoon.partners.length > 0 ? (
                        <div className="space-y-1">
                          {persoon.partners.map((partner, idx) => (
                            <div key={idx}>{partner.huwelijksdatum || "—"}</div>
                          ))}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden xl:table-cell">{persoon.overlijdensdatum || "—"}</td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      {leeftijd !== null ? (
                        <span className={isOverleden ? "text-muted-foreground" : "text-primary font-medium"}>
                          {leeftijd} {isOverleden ? "" : "✓"}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${generatieColors[persoon.generatie]}`}>
                        {persoon.generatie}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </ScrollArea>
      </div>

      {/* Legenda */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {[0, 1, 2, 3, 4].map((gen) => (
          <div key={gen} className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${generatieColors[gen]}`}>
              {gen}
            </span>
            <span className="text-sm text-muted-foreground">{generatieLabels[gen]}</span>
          </div>
        ))}
      </div>
      </>
      )}
    </motion.div>
  );
};

export default MarcelAfstammelingen;
