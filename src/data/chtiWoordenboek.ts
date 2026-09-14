export interface DictionaryEntry {
  expression: string;
  meaning: string;
  category: 'greetings' | 'exclamations' | 'love' | 'daily' | 'food' | 'weather' | 'family' | 'work';
  pronunciation?: string;
  example?: string;
}

export const dictionaryEntries: DictionaryEntry[] = [
  // Begroetingen
  { expression: "Cha va ti?", meaning: "Hoe gaat het?", category: "greetings", pronunciation: "sha va ti", example: "Cha va ti, min biloute?" },
  { expression: "Bonjour, biloute!", meaning: "Hallo, schat!", category: "greetings", pronunciation: "bon-zhoor bi-loot" },
  { expression: "Salut, min garchon!", meaning: "Dag, mijn jongen!", category: "greetings", pronunciation: "sa-lü min gar-shon" },
  { expression: "À l'arvoïure!", meaning: "Tot ziens!", category: "greetings", pronunciation: "a lar-vwee-ür" },
  { expression: "Bonsoir, mes gins!", meaning: "Goedenavond, mensen!", category: "greetings", pronunciation: "bon-swaar mez zhins" },
  
  // Uitroepen
  { expression: "Ch'est du carbon!", meaning: "Dat is geweldig!", category: "exclamations", pronunciation: "shet dü kar-bon" },
  { expression: "Vingt dieusse!", meaning: "Hemeltje!", category: "exclamations", pronunciation: "vint dyeus" },
  { expression: "Milliard ed'z'os!", meaning: "Miljard beenderen! (verbazing)", category: "exclamations", pronunciation: "mil-yar ed zos" },
  { expression: "Hein biloute!", meaning: "Hé schat!", category: "exclamations", pronunciation: "eyn bi-loot" },
  { expression: "Baisse eut' tête!", meaning: "Kijk uit! (letterlijk: buig je hoofd)", category: "exclamations", pronunciation: "bez ü tet" },
  
  // Liefde & Genegenheid
  { expression: "Ej t'aime, min biloute", meaning: "Ik hou van je, schat", category: "love", pronunciation: "ezh tem min bi-loot" },
  { expression: "T'es min p'tit cœur", meaning: "Je bent mijn hartje", category: "love", pronunciation: "tez min ptit keur" },
  { expression: "Viens m'faire un bisou", meaning: "Kom me een kusje geven", category: "love", pronunciation: "vyehn mfer un bi-zoo" },
  { expression: "Min p'tit quinquin", meaning: "Mijn kleine kind (slaapliedje)", category: "love", pronunciation: "min ptit kehn-kehn" },
  { expression: "T'es min trésor", meaning: "Je bent mijn schat", category: "love", pronunciation: "tez min trey-zor" },
  
  // Dagelijks leven
  { expression: "J'ai faim comme un leu", meaning: "Ik heb honger als een wolf", category: "daily", pronunciation: "zhey fahm kom uhn leu" },
  { expression: "I pleut des cordes", meaning: "Het regent pijpenstelen", category: "daily", pronunciation: "ee pleu dey kord" },
  { expression: "Ej sus fatigué", meaning: "Ik ben moe", category: "daily", pronunciation: "ezh sü fa-ti-gey" },
  { expression: "Ej m'in va", meaning: "Ik ga weg", category: "daily", pronunciation: "ezh min va" },
  { expression: "Cha fait gramint d'temps", meaning: "Dat is lang geleden", category: "daily", pronunciation: "sha fey gra-mint dtom" },
  
  // Eten & Drinken
  { expression: "Ej veux minger", meaning: "Ik wil eten", category: "food", pronunciation: "ezh veu min-zhey" },
  { expression: "Un p'tit verre", meaning: "Een glaasje (drinken)", category: "food", pronunciation: "uhn ptit ver" },
  { expression: "Des carbonades", meaning: "Stoofvlees", category: "food", pronunciation: "dey kar-bo-nad" },
  { expression: "L' pain d'épices", meaning: "Ontbijtkoek", category: "food", pronunciation: "l pan dey-pis" },
  { expression: "Des moules-frites", meaning: "Mosselen met friet", category: "food", pronunciation: "dey mool freet" },
  
  // Weer
  { expression: "I fait froid", meaning: "Het is koud", category: "weather", pronunciation: "ee fey frwa" },
  { expression: "I fait caud", meaning: "Het is warm", category: "weather", pronunciation: "ee fey ko" },
  { expression: "I drache", meaning: "Het regent hard", category: "weather", pronunciation: "ee drash" },
  { expression: "L' soleil brilloche", meaning: "De zon schijnt", category: "weather", pronunciation: "l so-ley bri-yosh" },
  { expression: "I fait doux", meaning: "Het is zacht weer", category: "weather", pronunciation: "ee fey doo" },
  
  // Familie
  { expression: "Min père", meaning: "Mijn vader", category: "family", pronunciation: "min per" },
  { expression: "M' mère", meaning: "Mijn moeder", category: "family", pronunciation: "m mer" },
  { expression: "Mes gins", meaning: "Mijn mensen/familie", category: "family", pronunciation: "mey zhins" },
  { expression: "L' tiot", meaning: "De kleine (kind)", category: "family", pronunciation: "l tyo" },
  { expression: "L' grand-père", meaning: "De grootvader", category: "family", pronunciation: "l grahn-per" },
  
  // Werk
  { expression: "Aller à l'ouvrage", meaning: "Naar het werk gaan", category: "work", pronunciation: "a-ley a loo-vrazh" },
  { expression: "Tertous les jours", meaning: "Elke dag", category: "work", pronunciation: "ter-too ley zhoor" },
  { expression: "L' forge", meaning: "De smidse", category: "work", pronunciation: "l forzh" },
  { expression: "Un' cabarette", meaning: "Een kroeg/café", category: "work", pronunciation: "ün ka-ba-ret" },
  { expression: "L' carbon", meaning: "De steenkool (mijnwerk)", category: "work", pronunciation: "l kar-bon" },
];
