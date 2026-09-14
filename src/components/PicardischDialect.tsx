import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages, MapPin, BookOpen, History, Users, Film, Heart, MessageCircle, Sparkles, Home, ExternalLink } from "lucide-react";
import { ChtiAudioButton } from "@/components/ui/ChtiAudioButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import kaartVlaanderen from "@/assets/kaart-vlaanderen-1700.jpg";
import migratieKaart from "@/assets/migratie-kaart-frans-vlaanderen.jpg";

const contentNL = {
  title: "Het Picardisch Dialect",
  subtitle: "De taal van onze voorouders in de Weppes-streek",
  intro: "Onze stamouders Hubert Deleforge en Antoinette Follet spraken Picardisch, een Romaanse taal die tot op heden gesproken wordt in het noorden van Frankrijk en delen van België. Het is geen Frans dialect, maar een zelfstandige taal met een rijke literatuur en eigen grammatica.",
  
  weppesTitle: "De Weppes-streek",
  weppesText: "De Weppes is een historische landstreek ten zuidwesten van Rijsel (Lille), tussen de Deûle en de Leie. Dorpen als Hallennes-lez-Haubourdin, Capinghem, Santes en Beaucamps-Ligny — de geboorteplaatsen van onze voorouders — liggen allemaal in dit gebied. In de 17e eeuw was dit een agrarische regio met veel kleine boerderijen en ambachtslieden.",
  
  languageTitle: "Een levende taal",
  languageText: "Het Picardisch (ch'ti in het noorden, rouchi in Valencijn) werd eeuwenlang door alle lagen van de bevolking gesproken. Pas vanaf de 19e eeuw, met de invoering van verplicht Frans onderwijs, begon de taal te verdwijnen uit het dagelijks leven. Vandaag spreken nog ongeveer 500.000 mensen Picardisch, vooral ouderen in landelijke gebieden.",
  
  chtiTitle: "De Ch'tis — Een culturele identiteit",
  chtiText: "De term 'Ch'ti' verwijst naar de inwoners van de Nord-Pas-de-Calais regio die het Picardisch dialect spreken. Het woord komt van de typisch Picardische uitspraak 'ch'ti' voor 'celui-ci' (deze hier). Lange tijd werd de Ch'ti-cultuur met spot bekeken door andere Fransen, die de regio associeerden met koude, regen en mijnbouw. Dit veranderde dramatisch in 2008 met de komedie 'Bienvenue chez les Ch'tis' van Dany Boon — de meest succesvolle Franse film ooit met 20 miljoen bioscoopbezoekers. De film bracht trots terug in de regionale identiteit en liet de warmte en gastvrijheid van de Ch'tis zien aan heel Frankrijk.",
  chtiCategories: {
    greetings: "Begroetingen",
    exclamations: "Uitroepen",
    love: "Liefde & Genegenheid",
    daily: "Dagelijks leven",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Hoe gaat het?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Hallo, schat!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Dag, mijn jongen!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Tot ziens!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "Dat is geweldig!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Hemeltje!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Miljard beenderen! (verbazing)", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Ik hou van je, schat", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Je bent mijn hartje", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Kom me een kusje geven", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "Ik heb honger als een wolf", category: "daily" },
    { expression: "I pleut des cordes", meaning: "Het regent pijpenstelen", category: "daily" },
  ],
  
  familyTitle: "Onze taalkundige erfenis",
  familyText: "De familienaam 'Deleforge' is zelf Picardisch: het is de samensmelting van 'de la forge' (van de smidse). In het standaard-Frans zou dit 'Delaforge' zijn. Ook andere kenmerken van onze familiegeschiedenis — zoals de spelling van namen in oude akten — verraden de Picardische oorsprong.",
  
  featuresTitle: "Kenmerken van het Picardisch",
  features: [
    { label: "ch voor c", example: "ch'est (c'est), cha (ça)" },
    { label: "Wegvallen van klinkers", example: "l' maison (la maison)" },
    { label: "Eigen woordenschat", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Nasale uitspraak", example: "in plaats van 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "In Hallennes, Capinghem en Santes spraken onze voorouders Picardisch — de taal van het hart.",
  
  imageCaption1: "Kaart van de Zuidelijke Nederlanden rond 1700, met de Weppes-streek",
  imageCaption2: "De migratieroute van Hallennes naar Izegem (ca. 50 km)",
};

const contentFR = {
  title: "Le Dialecte Picard",
  subtitle: "La langue de nos ancêtres dans la région des Weppes",
  intro: "Nos ancêtres fondateurs Hubert Deleforge et Antoinette Follet parlaient le picard, une langue romane encore parlée aujourd'hui dans le nord de la France et certaines parties de la Belgique. Ce n'est pas un dialecte du français, mais une langue à part entière avec une riche littérature et sa propre grammaire.",
  
  weppesTitle: "La Région des Weppes",
  weppesText: "Les Weppes sont une région historique au sud-ouest de Lille, entre la Deûle et la Lys. Des villages comme Hallennes-lez-Haubourdin, Capinghem, Santes et Beaucamps-Ligny — les lieux de naissance de nos ancêtres — se trouvent tous dans cette zone. Au XVIIe siècle, c'était une région agricole avec de nombreuses petites fermes et artisans.",
  
  languageTitle: "Une langue vivante",
  languageText: "Le picard (ch'ti dans le Nord, rouchi à Valenciennes) a été parlé pendant des siècles par toutes les couches de la population. Ce n'est qu'à partir du XIXe siècle, avec l'introduction de l'enseignement obligatoire en français, que la langue a commencé à disparaître de la vie quotidienne. Aujourd'hui, environ 500 000 personnes parlent encore le picard, principalement des personnes âgées dans les zones rurales.",
  
  chtiTitle: "Les Ch'tis — Une identité culturelle",
  chtiText: "Le terme 'Ch'ti' désigne les habitants de la région Nord-Pas-de-Calais qui parlent le dialecte picard. Le mot vient de la prononciation typiquement picarde 'ch'ti' pour 'celui-ci'. Longtemps, la culture ch'ti a été moquée par les autres Français, qui associaient la région au froid, à la pluie et aux mines de charbon. Cela a radicalement changé en 2008 avec la comédie 'Bienvenue chez les Ch'tis' de Dany Boon — le plus grand succès du cinéma français avec 20 millions d'entrées. Le film a redonné fierté à l'identité régionale et a montré la chaleur et l'hospitalité des Ch'tis à toute la France.",
  chtiCategories: {
    greetings: "Salutations",
    exclamations: "Exclamations",
    love: "Amour & Affection",
    daily: "Vie quotidienne",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Comment ça va?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Bonjour, chéri!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Salut, mon garçon!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Au revoir!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "C'est génial!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Mon Dieu!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Milliard d'os! (surprise)", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Je t'aime, mon chéri", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Tu es mon petit cœur", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Viens me faire un bisou", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "J'ai faim comme un loup", category: "daily" },
    { expression: "I pleut des cordes", meaning: "Il pleut des cordes", category: "daily" },
  ],
  
  familyTitle: "Notre héritage linguistique",
  familyText: "Le nom de famille 'Deleforge' est lui-même picard : c'est la fusion de 'de la forge'. En français standard, ce serait 'Delaforge'. D'autres caractéristiques de notre histoire familiale — comme l'orthographe des noms dans les anciens actes — trahissent l'origine picarde.",
  
  featuresTitle: "Caractéristiques du picard",
  features: [
    { label: "ch au lieu de c", example: "ch'est (c'est), cha (ça)" },
    { label: "Élision des voyelles", example: "l' maison (la maison)" },
    { label: "Vocabulaire propre", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Prononciation nasale", example: "'in' au lieu de 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "À Hallennes, Capinghem et Santes, nos ancêtres parlaient le picard — la langue du cœur.",
  
  imageCaption1: "Carte des Pays-Bas méridionaux vers 1700, avec la région des Weppes",
  imageCaption2: "La route de migration de Hallennes vers Izegem (env. 50 km)",
};

const contentPCD = {
  title: "Ch' Picard",
  subtitle: "L' langue d' nos anchêtes dins l' région des Weppes",
  intro: "Nos anchêtes fondateurs Hubert Deleforge pi Antoinette Follet parloient ch' picard, eune langue romane incor parlée à ch't'heure dins l' nord d' la France pi dins des parties d' la Belgique. Ch'n'est point un dialecque du français, mé eune vraie langue aveuc eune riche littérature pi s' propre grammaire.",
  
  weppesTitle: "L' Région des Weppes",
  weppesText: "Les Weppes ch'est eune région histourique au sud-ouest d' Lile, intre l' Deûle pi l' Lys. Des villages comme Hallennes-lez-Haubourdin, Capinghem, Santes pi Beaucamps-Ligny — les lieus d' naissance d' nos anchêtes — s' trouvtent tous dins chete zone. Au XVIIe siècle, ch'étot eune région agricole aveuc gramint d' p'tites fermes pi artisans.",
  
  languageTitle: "Eune langue vivante",
  languageText: "Ch' picard (ch'ti dins l' Nord, rouchi à Valenchin) a té parlé pendant des siècles par toutes les couches d' la population. Ch'n'est qu'à partir du XIXe siècle, aveuc l'introduction d' l'inseignemint obligatoire in français, qu' la langue a commincé à disparaître d' la vie d' tous les jours. À ch't'heure, environ 500 000 gins parlent incor ch' picard, surtout des vieus dins les zones rurales.",
  
  chtiTitle: "Les Ch'tis — Eune identité culturelle",
  chtiText: "Ch' mot 'Ch'ti' désigne les gins du Nord-Pas-de-Calais qui parlent ch' dialecque picard. Ch' mot vient d' la prononciation typiquemint picarde 'ch'ti' pour 'celui-ci'. Longtemps, la culture ch'ti a té moquée par les eutes Français, qui associoient la région au froid, à l' pleuve pi aux mines d' carbon. Cha a radicalemint changé in 2008 aveuc la comédie 'Bienvenue chez les Ch'tis' d' Dany Boon — ch' pus grand succès du cinéma français aveuc 20 millions d'entrées. Ch' film a rdonné fierté à l'identité régionale pi a montré la chaleur pi l'hospitalité des Ch'tis à toute la France.",
  chtiCategories: {
    greetings: "Salutations",
    exclamations: "Exclamations",
    love: "Amour pi Affection",
    daily: "Vie d' tous les jours",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Comment cha va?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Bonjour, min p'tit!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Salut, min garchon!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "À l'arvoïure!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "Ch'est génial!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Mon Diu!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Milliard d'os!", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Ej t'aime, min p'tit", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "T'es min p'tit cœur", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Viens m'faire un bisou", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "J'ai faim comme un leu", category: "daily" },
    { expression: "I pleut des cordes", meaning: "I pleut des cordes", category: "daily" },
  ],
  
  familyTitle: "Note héritage linguistique",
  familyText: "L' nom d' famile 'Deleforge' est lui-même picard : ch'est l' fusion d' 'de la forge'. In français standard, ch' serot 'Delaforge'. D'eutes caractéristiques d' note histouère familiale — comme l'orthographe des noms dins les anchiennes actes — trahissent l'origine picarde.",
  
  featuresTitle: "Caractéristiques du picard",
  features: [
    { label: "ch au lieu d' c", example: "ch'est (c'est), cha (ça)" },
    { label: "Élision des voyelles", example: "l' maison (la maison)" },
    { label: "Vocabulaire propre", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Prononciation nasale", example: "'in' au lieu d' 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  
  imageCaption1: "Carte des Pays-Bas méridionaux vers 1700, aveuc l' région des Weppes",
  imageCaption2: "L' route d' migration d' Hallennes vers Izegem (environ 50 km)",
};

const contentVLS = {
  title: "T Pikoards Dialect",
  subtitle: "De tale van uuze vôorouders in de Weppes-streeke",
  intro: "Uuze stamouders Hubert Deleforge en Antoinette Follet sproaken Pikoards, e Romaanse tale die tot op vandoage gesproken wordt in t noorden van Frankryk en deeln van België. T is geen Frans dialect, mor e zelfstandige tale me e ryke literatuur en eigen grammatica.",
  
  weppesTitle: "De Weppes-streeke",
  weppesText: "De Weppes is e historische lândstreeke ten zuudwesten van Rysel (Lille), tussen de Deûle en de Leie. Dorpn gelyk Hallennes-lez-Haubourdin, Capinghem, Santes en Beaucamps-Ligny — de geboarteploatsen van uuze vôorouders — liggn ollen in dit gebied. In de 17e eeuw was dit e agrarische regio me vele kleine boerderyën en ambachtslien.",
  
  languageTitle: "E leevende tale",
  languageText: "T Pikoards (ch'ti in t noorden, rouchi in Valencyn) wierd eeuwenlank deur ol de loagen van de bevolking gesproken. Pas vanoaf de 19e eeuw, me de invoering van verplicht Frans onderwys, begost de tale te verdwynen uut t dagelieks leevn. Vandoage spreken nog omtrent 500.000 mensn Pikoards, vôoral ouderen in lândelike gebieden.",
  
  chtiTitle: "De Ch'tis — E culturele identiteit",
  chtiText: "De term 'Ch'ti' verwyst noar de inwôoners van de Nord-Pas-de-Calais regio die t Pikoards dialect spreken. T woord komt van de typisch Pikoardische uutspraoke 'ch'ti' vôor 'celui-ci' (deze hier). Lange tyd wierd de Ch'ti-cultuur me spot bekeken deur ândre Fransen, die de regio associeerden me koue, regen en mynbouw. Dit veranderde drastisch in 2008 me de komedie 'Bienvenue chez les Ch'tis' van Dany Boon — de meest succesvolle Franse film ooit me 20 miljoen bioscoopbezoekers. De film brocht trots terug in de regionale identiteit en liet de warmte en gastvryheid van de Ch'tis zien an heel Frankryk.",
  chtiCategories: {
    greetings: "Begroetingen",
    exclamations: "Uutroepn",
    love: "Liefde & Genegenheid",
    daily: "Dagelieks leevn",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Oe goat t?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Goeiendak, schat!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Dag, myn joenk!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Tot ziens!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "Da is geweldig!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Hemeltje!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Miljoard beendern!", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Ik ou van je, schat", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Je zyt myn hertje", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Kom m' e kusje geevn", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "K'è onger gelyk e wolf", category: "daily" },
    { expression: "I pleut des cordes", meaning: "T regent pypesteltn", category: "daily" },
  ],
  
  familyTitle: "Uuze taalkundige erfenisse",
  familyText: "De familienoame 'Deleforge' is zelve Pikoards: t is de soamensmeltinge van 'de la forge' (van de smidse). In t standaard-Frans zou dit 'Delaforge' zyn. Ook ândre kenmerken van uuze familiegeschiedenisse — gelyk de spelling van noamen in oude akten — verraodn de Pikoardische oorsprong.",
  
  featuresTitle: "Kenmerken van t Pikoards",
  features: [
    { label: "ch vôo c", example: "ch'est (c'est), cha (ça)" },
    { label: "Wegvalln van klinkers", example: "l' maison (la maison)" },
    { label: "Eigen woordenschat", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Nasale uutspraoke", example: "in in ploatse van 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "In Hallennes, Capinghem en Santes sproaken uuze vôorouders Pikoards — de tale van t herte.",
  
  imageCaption1: "Koarte van de Zuudelike Nederlandn round 1700, me de Weppes-streeke",
  imageCaption2: "De migroasjeroute van Hallennes noar Izegem (ca. 50 km)",
};

const contentDE = {
  title: "Der Picardische Dialekt",
  subtitle: "Die Sprache unserer Vorfahren in der Weppes-Region",
  intro: "Unsere Stammväter Hubert Deleforge und Antoinette Follet sprachen Picardisch, eine romanische Sprache, die bis heute im Norden Frankreichs und in Teilen Belgiens gesprochen wird. Es ist kein französischer Dialekt, sondern eine eigenständige Sprache mit einer reichen Literatur und eigener Grammatik.",
  
  weppesTitle: "Die Weppes-Region",
  weppesText: "Die Weppes ist eine historische Landschaft südwestlich von Lille, zwischen der Deûle und der Leie. Dörfer wie Hallennes-lez-Haubourdin, Capinghem, Santes und Beaucamps-Ligny — die Geburtsorte unserer Vorfahren — liegen alle in diesem Gebiet. Im 17. Jahrhundert war dies eine landwirtschaftliche Region mit vielen kleinen Bauernhöfen und Handwerkern.",
  
  languageTitle: "Eine lebendige Sprache",
  languageText: "Das Picardische (Ch'ti im Norden, Rouchi in Valenciennes) wurde jahrhundertelang von allen Bevölkerungsschichten gesprochen. Erst ab dem 19. Jahrhundert, mit der Einführung der französischen Schulpflicht, begann die Sprache aus dem Alltag zu verschwinden. Heute sprechen noch etwa 500.000 Menschen Picardisch, vor allem ältere Menschen in ländlichen Gebieten.",
  
  chtiTitle: "Die Ch'tis — Eine kulturelle Identität",
  chtiText: "Der Begriff 'Ch'ti' bezeichnet die Einwohner der Region Nord-Pas-de-Calais, die den picardischen Dialekt sprechen. Das Wort stammt von der typisch picardischen Aussprache 'ch'ti' für 'celui-ci' (dieser hier). Lange Zeit wurde die Ch'ti-Kultur von anderen Franzosen belächelt, die die Region mit Kälte, Regen und Bergbau assoziierten. Dies änderte sich dramatisch 2008 mit der Komödie 'Willkommen bei den Sch'tis' von Dany Boon — dem erfolgreichsten französischen Film aller Zeiten mit 20 Millionen Kinobesuchern. Der Film brachte den Stolz auf die regionale Identität zurück und zeigte ganz Frankreich die Wärme und Gastfreundschaft der Ch'tis.",
  chtiCategories: {
    greetings: "Begrüßungen",
    exclamations: "Ausrufe",
    love: "Liebe & Zuneigung",
    daily: "Alltag",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Wie geht es dir?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Hallo, Schatz!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Hallo, mein Junge!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Auf Wiedersehen!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "Das ist großartig!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Mein Gott!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Milliarde Knochen!", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Ich liebe dich, Schatz", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Du bist mein Herzchen", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Gib mir ein Küsschen", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "Ich habe Hunger wie ein Wolf", category: "daily" },
    { expression: "I pleut des cordes", meaning: "Es regnet Bindfäden", category: "daily" },
  ],
  
  familyTitle: "Unser sprachliches Erbe",
  familyText: "Der Familienname 'Deleforge' ist selbst picardisch: Es ist die Verschmelzung von 'de la forge' (von der Schmiede). Im Standardfranzösischen wäre dies 'Delaforge'. Auch andere Merkmale unserer Familiengeschichte — wie die Schreibweise von Namen in alten Urkunden — verraten den picardischen Ursprung.",
  
  featuresTitle: "Merkmale des Picardischen",
  features: [
    { label: "ch statt c", example: "ch'est (c'est), cha (ça)" },
    { label: "Vokalausfall", example: "l' maison (la maison)" },
    { label: "Eigener Wortschatz", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Nasale Aussprache", example: "'in' statt 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "In Hallennes, Capinghem und Santes sprachen unsere Vorfahren Picardisch — die Sprache des Herzens.",
  
  imageCaption1: "Karte der Südlichen Niederlande um 1700, mit der Weppes-Region",
  imageCaption2: "Die Migrationsroute von Hallennes nach Izegem (ca. 50 km)",
};

const contentEN = {
  title: "The Picard Dialect",
  subtitle: "The language of our ancestors in the Weppes region",
  intro: "Our founding ancestors Hubert Deleforge and Antoinette Follet spoke Picard, a Romance language still spoken today in northern France and parts of Belgium. It is not a French dialect, but an independent language with a rich literature and its own grammar.",
  
  weppesTitle: "The Weppes Region",
  weppesText: "The Weppes is a historical region southwest of Lille, between the Deûle and the Leie rivers. Villages like Hallennes-lez-Haubourdin, Capinghem, Santes and Beaucamps-Ligny — the birthplaces of our ancestors — are all located in this area. In the 17th century, this was an agricultural region with many small farms and craftsmen.",
  
  languageTitle: "A Living Language",
  languageText: "Picard (ch'ti in the north, rouchi in Valenciennes) was spoken for centuries by all layers of the population. It was only from the 19th century, with the introduction of compulsory French education, that the language began to disappear from daily life. Today, about 500,000 people still speak Picard, mainly elderly people in rural areas.",
  
  chtiTitle: "The Ch'tis — A Cultural Identity",
  chtiText: "The term 'Ch'ti' refers to the inhabitants of the Nord-Pas-de-Calais region who speak the Picard dialect. The word comes from the typical Picard pronunciation 'ch'ti' for 'celui-ci' (this one here). For a long time, Ch'ti culture was mocked by other French people, who associated the region with cold, rain, and mining. This changed dramatically in 2008 with the comedy 'Welcome to the Sticks' (Bienvenue chez les Ch'tis) by Dany Boon — the most successful French film ever with 20 million cinema visitors. The film brought pride back to regional identity and showed all of France the warmth and hospitality of the Ch'tis.",
  chtiCategories: {
    greetings: "Greetings",
    exclamations: "Exclamations",
    love: "Love & Affection",
    daily: "Daily life",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "How are you?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Hello, sweetheart!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Hi, my boy!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Goodbye!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "That's awesome!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Good heavens!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "Billion bones! (surprise)", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "I love you, sweetheart", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "You're my little heart", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Come give me a kiss", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "I'm hungry as a wolf", category: "daily" },
    { expression: "I pleut des cordes", meaning: "It's raining cats and dogs", category: "daily" },
  ],
  
  familyTitle: "Our Linguistic Heritage",
  familyText: "The family name 'Deleforge' is itself Picard: it is the fusion of 'de la forge' (from the forge). In standard French, this would be 'Delaforge'. Other features of our family history — such as the spelling of names in old documents — also betray the Picard origin.",
  
  featuresTitle: "Features of Picard",
  features: [
    { label: "ch for c", example: "ch'est (c'est), cha (ça)" },
    { label: "Vowel elision", example: "l' maison (la maison)" },
    { label: "Own vocabulary", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Nasal pronunciation", example: "'in' instead of 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "In Hallennes, Capinghem and Santes, our ancestors spoke Picard — the language of the heart.",
  
  imageCaption1: "Map of the Southern Netherlands around 1700, with the Weppes region",
  imageCaption2: "The migration route from Hallennes to Izegem (approx. 50 km)",
};

const contentES = {
  title: "El Dialecto Picardo",
  subtitle: "El idioma de nuestros antepasados en la región de Weppes",
  intro: "Nuestros ancestros fundadores Hubert Deleforge y Antoinette Follet hablaban picardo, una lengua romance que todavía se habla hoy en el norte de Francia y partes de Bélgica. No es un dialecto del francés, sino una lengua independiente con una rica literatura y gramática propia.",
  
  weppesTitle: "La Región de Weppes",
  weppesText: "Weppes es una región histórica al suroeste de Lille, entre el Deûle y el Lys. Pueblos como Hallennes-lez-Haubourdin, Capinghem, Santes y Beaucamps-Ligny — los lugares de nacimiento de nuestros antepasados — se encuentran todos en esta zona. En el siglo XVII, era una región agrícola con muchas pequeñas granjas y artesanos.",
  
  languageTitle: "Una Lengua Viva",
  languageText: "El picardo (ch'ti en el norte, rouchi en Valenciennes) fue hablado durante siglos por todas las capas de la población. Solo a partir del siglo XIX, con la introducción de la educación obligatoria en francés, la lengua comenzó a desaparecer de la vida diaria. Hoy, unas 500.000 personas todavía hablan picardo, principalmente ancianos en zonas rurales.",
  
  chtiTitle: "Los Ch'tis — Una Identidad Cultural",
  chtiText: "El término 'Ch'ti' se refiere a los habitantes de la región Nord-Pas-de-Calais que hablan el dialecto picardo. La palabra proviene de la pronunciación típicamente picarda 'ch'ti' para 'celui-ci' (este de aquí). Durante mucho tiempo, la cultura Ch'ti fue objeto de burla por parte de otros franceses, que asociaban la región con el frío, la lluvia y la minería. Esto cambió drásticamente en 2008 con la comedia 'Bienvenidos al Norte' (Bienvenue chez les Ch'tis) de Dany Boon — la película francesa más exitosa de todos los tiempos con 20 millones de espectadores. La película devolvió el orgullo a la identidad regional y mostró a toda Francia la calidez y hospitalidad de los Ch'tis.",
  chtiCategories: {
    greetings: "Saludos",
    exclamations: "Exclamaciones",
    love: "Amor y Afecto",
    daily: "Vida cotidiana",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "¿Cómo estás?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "¡Hola, cariño!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "¡Hola, muchacho!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "¡Adiós!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "¡Eso es genial!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "¡Dios mío!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "¡Mil millones de huesos!", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Te quiero, cariño", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Eres mi corazoncito", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Ven a darme un beso", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "Tengo hambre como un lobo", category: "daily" },
    { expression: "I pleut des cordes", meaning: "Llueve a cántaros", category: "daily" },
  ],
  
  familyTitle: "Nuestra Herencia Lingüística",
  familyText: "El apellido 'Deleforge' es en sí mismo picardo: es la fusión de 'de la forge' (de la forja). En francés estándar, esto sería 'Delaforge'. Otras características de nuestra historia familiar — como la ortografía de los nombres en documentos antiguos — también revelan el origen picardo.",
  
  featuresTitle: "Características del Picardo",
  features: [
    { label: "ch en lugar de c", example: "ch'est (c'est), cha (ça)" },
    { label: "Elisión de vocales", example: "l' maison (la maison)" },
    { label: "Vocabulario propio", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Pronunciación nasal", example: "'in' en lugar de 'en', 'an'" },
  ],
  
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "En Hallennes, Capinghem y Santes, nuestros antepasados hablaban picardo — el idioma del corazón.",
  
  imageCaption1: "Mapa de los Países Bajos del Sur alrededor de 1700, con la región de Weppes",
  imageCaption2: "La ruta de migración de Hallennes a Izegem (aprox. 50 km)",
};

const contentSV = {
  title: "Den picardiska dialekten",
  subtitle: "Våra förfäders språk i Weppes-regionen",
  intro: "Våra stamfäder Hubert Deleforge och Antoinette Follet talade picardiska, ett romanskt språk som fortfarande talas i norra Frankrike och delar av Belgien. Det är inte en fransk dialekt, utan ett självständigt språk med en rik litteratur och egen grammatik.",
  weppesTitle: "Weppes-regionen",
  weppesText: "Weppes är ett historiskt landskap sydväst om Lille, mellan floderna Deûle och Leie. Byar som Hallennes-lez-Haubourdin, Capinghem, Santes och Beaucamps-Ligny — våra förfäders födelseorter — ligger alla i detta område. Under 1600-talet var det en jordbruksregion med många små gårdar och hantverkare.",
  languageTitle: "Ett levande språk",
  languageText: "Picardiska (ch'ti i norr, rouchi i Valenciennes) talades i århundraden av alla samhällsskikt. Det var först under 1800-talet, med införandet av obligatorisk franskundervisning, som språket började försvinna från vardagen. Idag talar omkring 500 000 personer fortfarande picardiska, främst äldre på landsbygden.",
  chtiTitle: "Ch'tis — En kulturell identitet",
  chtiText: "Termen 'Ch'ti' syftar på invånarna i regionen Nord-Pas-de-Calais som talar den picardiska dialekten. Ordet kommer från det typiskt picardiska uttalet 'ch'ti' för 'celui-ci' (den här). Under lång tid förlöjligades Ch'ti-kulturen av andra fransmän, som förknippade regionen med kyla, regn och gruvdrift. Detta förändrades dramatiskt 2008 med komedien 'Bienvenue chez les Ch'tis' av Dany Boon — den mest framgångsrika franska filmen någonsin med 20 miljoner biobesökare.",
  chtiCategories: {
    greetings: "Hälsningar",
    exclamations: "Utrop",
    love: "Kärlek & Tillgivenhet",
    daily: "Vardagsliv",
  },
  chtiExpressions: [
    { expression: "Cha va ti?", meaning: "Hur mår du?", category: "greetings" },
    { expression: "Bonjour, biloute!", meaning: "Hej, älskling!", category: "greetings" },
    { expression: "Salut, min garchon!", meaning: "Hej, min pojke!", category: "greetings" },
    { expression: "À l'arvoïure!", meaning: "Adjö!", category: "greetings" },
    { expression: "Ch'est du carbon!", meaning: "Det är fantastiskt!", category: "exclamations" },
    { expression: "Vingt dieusse!", meaning: "Herregud!", category: "exclamations" },
    { expression: "Milliard ed'z'os!", meaning: "En miljard ben!", category: "exclamations" },
    { expression: "Ej t'aime, min biloute", meaning: "Jag älskar dig, älskling", category: "love" },
    { expression: "T'es min p'tit cœur", meaning: "Du är mitt lilla hjärta", category: "love" },
    { expression: "Viens m'faire un bisou", meaning: "Kom och ge mig en puss", category: "love" },
    { expression: "J'ai faim comme un leu", meaning: "Jag är hungrig som en varg", category: "daily" },
    { expression: "I pleut des cordes", meaning: "Det regnar som spön i backen", category: "daily" },
  ],
  familyTitle: "Vårt språkliga arv",
  familyText: "Familjenamnet 'Deleforge' är i sig picardiskt: det är en sammanslagning av 'de la forge' (från smedjan). På standardfranska skulle det vara 'Delaforge'. Andra drag i vår familjehistoria — som stavningen av namn i gamla dokument — avslöjar också det picardiska ursprunget.",
  featuresTitle: "Picardiskans kännetecken",
  features: [
    { label: "ch istället för c", example: "ch'est (c'est), cha (ça)" },
    { label: "Vokalelision", example: "l' maison (la maison)" },
    { label: "Eget ordförråd", example: "éfant (enfant), gramint (beaucoup)" },
    { label: "Nasalt uttal", example: "'in' istället för 'en', 'an'" },
  ],
  quote: "In Hallennes, Capinghem pi Santes, nos anchêtes parloient ch' picard — l' langue du cœur.",
  quoteTranslation: "I Hallennes, Capinghem och Santes talade våra förfäder picardiska — hjärtats språk.",
  imageCaption1: "Karta över Södra Nederländerna omkring 1700, med Weppes-regionen",
  imageCaption2: "Migrationsrutten från Hallennes till Izegem (ca 50 km)",
};

const PicardischDialect = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'fr': return contentFR;
      case 'pcd': return contentPCD;
      case 'vls': return contentVLS;
      case 'en': return contentEN;
      case 'es': return contentES;
      case 'de': return contentDE;
      case 'sv': return contentSV;
      default: return contentNL;
    }
  };

  const content = getContent();

  return (
    <section id="picardisch" className="section-padding bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="w-8 h-8 text-primary" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              {language === 'nl' ? 'Taalkundige Erfenis' : language === 'vls' ? 'Taalkundige Erfenisse' : language === 'de' ? 'Sprachliches Erbe' : language === 'en' ? 'Linguistic Heritage' : language === 'es' ? 'Herencia Lingüística' : 'Héritage Linguistique'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {content.title}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none text-foreground/85 font-sans leading-relaxed mb-12"
        >
          <p className="text-lg">{content.intro}</p>
        </motion.div>

        {/* Quote in Picard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mb-12"
        >
          <p className="font-serif text-xl italic text-primary mb-2">
            "{content.quote}"
          </p>
          <p className="text-sm text-muted-foreground">
            — {content.quoteTranslation}
          </p>
        </motion.div>

        {/* Grid with sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Weppes Region */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card p-6 rounded-lg shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                {content.weppesTitle}
              </h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {content.weppesText}
            </p>
          </motion.div>

          {/* Living Language */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card p-6 rounded-lg shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                {content.languageTitle}
              </h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {content.languageText}
            </p>
          </motion.div>

          {/* Family Heritage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card p-6 rounded-lg shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <History className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                {content.familyTitle}
              </h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {content.familyText}
            </p>
          </motion.div>

          {/* Language Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card p-6 rounded-lg shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">
                {content.featuresTitle}
              </h3>
            </div>
            <ul className="space-y-3">
              {content.features.map((feature, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-medium text-primary">{feature.label}</span>
                  <span className="text-sm text-muted-foreground font-mono">{feature.example}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Ch'tis Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 rounded-xl border border-primary/20 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Film className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">
              {content.chtiTitle}
            </h3>
          </div>
          
          <p className="text-foreground/85 leading-relaxed mb-6 text-lg">
            {content.chtiText}
          </p>

          {/* Ch'ti Expressions with Categories */}
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-accent" />
              <h4 className="font-serif font-semibold text-primary">
                {language === 'nl' ? "Typische Ch'ti-uitdrukkingen" : 
                 language === 'de' ? "Typische Ch'ti-Ausdrücke" :
                 language === 'en' ? "Typical Ch'ti expressions" :
                 language === 'es' ? "Expresiones típicas Ch'ti" :
                 language === 'vls' ? "Typische Ch'ti-uutdrukkingen" :
                 "Expressions typiques ch'ti"}
              </h4>
            </div>
            
            <Tabs defaultValue="greetings" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-background/50">
                <TabsTrigger value="greetings" className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{content.chtiCategories.greetings}</span>
                </TabsTrigger>
                <TabsTrigger value="exclamations" className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{content.chtiCategories.exclamations}</span>
                </TabsTrigger>
                <TabsTrigger value="love" className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <Heart className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{content.chtiCategories.love}</span>
                </TabsTrigger>
                <TabsTrigger value="daily" className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{content.chtiCategories.daily}</span>
                </TabsTrigger>
              </TabsList>
              
              {(['greetings', 'exclamations', 'love', 'daily'] as const).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.chtiExpressions
                      .filter((expr) => expr.category === category)
                      .map((expr, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start gap-2 p-3 bg-background/50 rounded-lg border border-border/30 hover:border-primary/30 hover:bg-background/80 transition-all"
                        >
                          <ChtiAudioButton text={expr.expression} className="mt-0.5 flex-shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-mono text-primary font-medium">
                              "{expr.expression}"
                            </span>
                            <span className="text-sm text-muted-foreground mt-0.5">
                              → {expr.meaning}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Link to full dictionary */}
            <div className="mt-6 text-center">
              <Link to="/chti-woordenboek">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  {language === 'nl' ? "Bekijk het volledige Ch'ti woordenboek" :
                   language === 'de' ? "Das vollständige Ch'ti Wörterbuch ansehen" :
                   language === 'en' ? "View the full Ch'ti dictionary" :
                   language === 'es' ? "Ver el diccionario Ch'ti completo" :
                   language === 'vls' ? "Bekiek 't volledig Ch'ti woordenboek" :
                   "Voir le dictionnaire Ch'ti complet"}
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default PicardischDialect;
