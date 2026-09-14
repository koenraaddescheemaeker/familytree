import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Volume2, BookOpen, MessageCircle, Heart, Home, Sparkles, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChtiAudioButton, RemainingAudioRequests } from '@/components/ui/ChtiAudioButton';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { dictionaryEntries, type DictionaryEntry } from "@/data/chtiWoordenboek";


const categoryConfig = {
  greetings: { icon: MessageCircle, label: { nl: "Begroetingen", en: "Greetings", fr: "Salutations", de: "Begrüßungen", es: "Saludos" }, color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  exclamations: { icon: Sparkles, label: { nl: "Uitroepen", en: "Exclamations", fr: "Exclamations", de: "Ausrufe", es: "Exclamaciones" }, color: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  love: { icon: Heart, label: { nl: "Liefde", en: "Love", fr: "Amour", de: "Liebe", es: "Amor" }, color: "bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  daily: { icon: Home, label: { nl: "Dagelijks", en: "Daily", fr: "Quotidien", de: "Alltag", es: "Diario" }, color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" },
  food: { icon: Home, label: { nl: "Eten", en: "Food", fr: "Nourriture", de: "Essen", es: "Comida" }, color: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  weather: { icon: Home, label: { nl: "Weer", en: "Weather", fr: "Météo", de: "Wetter", es: "Clima" }, color: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" },
  family: { icon: Home, label: { nl: "Familie", en: "Family", fr: "Famille", de: "Familie", es: "Familia" }, color: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  work: { icon: Home, label: { nl: "Werk", en: "Work", fr: "Travail", de: "Arbeit", es: "Trabajo" }, color: "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30" },
};

const ChtiWoordenboek = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const texts = {
    title: language === 'nl' ? "Ch'ti Woordenboek" :
           language === 'fr' ? "Dictionnaire Ch'ti" :
           language === 'de' ? "Ch'ti Wörterbuch" :
           language === 'es' ? "Diccionario Ch'ti" :
           "Ch'ti Dictionary",
    subtitle: language === 'nl' ? "Ontdek de Picardische taal van onze voorouders" :
              language === 'fr' ? "Découvrez la langue picarde de nos ancêtres" :
              language === 'de' ? "Entdecken Sie die pikardische Sprache unserer Vorfahren" :
              language === 'es' ? "Descubre el idioma picardo de nuestros antepasados" :
              "Discover the Picard language of our ancestors",
    searchPlaceholder: language === 'nl' ? "Zoek een uitdrukking..." :
                       language === 'fr' ? "Chercher une expression..." :
                       language === 'de' ? "Ausdruck suchen..." :
                       language === 'es' ? "Buscar una expresión..." :
                       "Search an expression...",
    allCategories: language === 'nl' ? "Alle categorieën" :
                   language === 'fr' ? "Toutes les catégories" :
                   language === 'de' ? "Alle Kategorien" :
                   language === 'es' ? "Todas las categorías" :
                   "All categories",
    noResults: language === 'nl' ? "Geen resultaten gevonden" :
               language === 'fr' ? "Aucun résultat trouvé" :
               language === 'de' ? "Keine Ergebnisse gefunden" :
               language === 'es' ? "No se encontraron resultados" :
               "No results found",
    pronunciation: language === 'nl' ? "Uitspraak" :
                   language === 'fr' ? "Prononciation" :
                   language === 'de' ? "Aussprache" :
                   language === 'es' ? "Pronunciación" :
                   "Pronunciation",
    example: language === 'nl' ? "Voorbeeld" :
             language === 'fr' ? "Exemple" :
             language === 'de' ? "Beispiel" :
             language === 'es' ? "Ejemplo" :
             "Example",
    back: language === 'nl' ? "Terug" :
          language === 'fr' ? "Retour" :
          language === 'de' ? "Zurück" :
          language === 'es' ? "Volver" :
          "Back",
    entries: language === 'nl' ? "uitdrukkingen" :
             language === 'fr' ? "expressions" :
             language === 'de' ? "Ausdrücke" :
             language === 'es' ? "expresiones" :
             "expressions",
  };

  const filteredEntries = useMemo(() => {
    return dictionaryEntries.filter(entry => {
      const matchesSearch = searchQuery === '' || 
        entry.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/#picardisch">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {texts.back}
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {texts.title}
                </h1>
                <p className="text-muted-foreground">
                  {texts.subtitle}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Audio Requests Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-4"
          >
            <RemainingAudioRequests />
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={texts.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                <Filter className="w-4 h-4 mr-1" />
                {texts.allCategories}
              </Button>
              {categories.map(cat => {
                const config = categoryConfig[cat];
                const Icon = config.icon;
                const label = config.label[language as keyof typeof config.label] || config.label.en;
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full"
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </Button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
              {filteredEntries.length} {texts.entries}
            </p>
          </motion.div>

          {/* Dictionary Entries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredEntries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="col-span-full text-center py-12"
                >
                  <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-lg">{texts.noResults}</p>
                </motion.div>
              ) : (
                filteredEntries.map((entry, index) => {
                  const config = categoryConfig[entry.category];
                  const categoryLabel = config.label[language as keyof typeof config.label] || config.label.en;
                  
                  return (
                    <motion.div
                      key={entry.expression}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.02 }}
                      layout
                      className="bg-card rounded-xl border border-border p-4 hover:shadow-lg hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={`text-xs ${config.color}`}>
                              {categoryLabel}
                            </Badge>
                          </div>
                          
                          <h3 className="font-serif text-lg font-semibold text-foreground mb-1 truncate">
                            {entry.expression}
                          </h3>
                          <p className="text-muted-foreground">
                            {entry.meaning}
                          </p>
                          
                          {entry.pronunciation && (
                            <p className="text-sm text-primary/70 mt-2">
                              <span className="font-medium">{texts.pronunciation}:</span> [{entry.pronunciation}]
                            </p>
                          )}
                          
                          {entry.example && (
                            <p className="text-sm text-muted-foreground/80 mt-1 italic">
                              <span className="font-medium not-italic">{texts.example}:</span> "{entry.example}"
                            </p>
                          )}
                        </div>
                        
                        <ChtiAudioButton 
                          text={entry.expression} 
                          className="shrink-0"
                        />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChtiWoordenboek;
