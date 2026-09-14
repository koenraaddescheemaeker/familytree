import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSearchContent, SearchResult, SearchResultType } from '@/data/searchData';
import { supabase } from '@/integrations/supabase/client';

export type { SearchResult, SearchResultType };
export type FilterType = 'all' | SearchResultType;

// Local storage key for recent searches
const RECENT_SEARCHES_KEY = 'deforce-recent-searches';
const MAX_RECENT_SEARCHES = 10;

import { fuzzyMatchTerm, matchQuality, normalize, tokenize, expandTerm } from '@/lib/searchMatch';

// Cache of normalized searchable text per item, so fuzzy matching stays cheap
const searchTextCache = new WeakMap<SearchResult, { text: string; tokens: string[] }>();

function getSearchable(item: SearchResult) {
  const cached = searchTextCache.get(item);
  if (cached) return cached;
  const raw = [
    item.titleNL, item.titleFR, item.titleEN || '', item.titleES || '',
    item.titlePCD || '', item.titleVLS || '',
    item.descriptionNL, item.descriptionFR, item.descriptionEN || '', item.descriptionES || '',
    item.keywordsNL || '', item.keywordsFR || '', item.keywordsEN || '', item.keywordsES || '',
    item.keywordsPCD || '', item.keywordsVLS || '',
    item.year || '', item.category || '',
  ].join(' ');
  const text = normalize(raw);
  const entry = { text, tokens: tokenize(text) };
  searchTextCache.set(item, entry);
  return entry;
}

function matchesItem(term: string, item: SearchResult): boolean {
  const { text, tokens } = getSearchable(item);
  return fuzzyMatchTerm(term, text, tokens);
}

// Calculate relevance score for sorting
function calculateRelevance(item: SearchResult, searchTerms: string[], language: string): number {
  let score = 0;
  
  // Get the right language fields
  const title = language === 'nl' ? item.titleNL :
                language === 'fr' ? item.titleFR :
                language === 'en' ? (item.titleEN || item.titleNL) :
                language === 'es' ? (item.titleES || item.titleNL) :
                language === 'pcd' ? (item.titlePCD || item.titleFR) :
                item.titleNL;
                
  const description = language === 'nl' ? item.descriptionNL :
                      language === 'fr' ? item.descriptionFR :
                      language === 'en' ? (item.descriptionEN || item.descriptionNL) :
                      language === 'es' ? (item.descriptionES || item.descriptionNL) :
                      language === 'pcd' ? (item.descriptionPCD || item.descriptionFR) :
                      item.descriptionNL;
                      
  const keywords = language === 'nl' ? (item.keywordsNL || '') :
                   language === 'fr' ? (item.keywordsFR || '') :
                   language === 'en' ? (item.keywordsEN || item.keywordsNL || '') :
                   language === 'es' ? (item.keywordsES || item.keywordsNL || '') :
                   language === 'pcd' ? (item.keywordsPCD || item.keywordsFR || '') :
                   (item.keywordsNL || '');
  
  const titleLower = title.toLowerCase();
  const descriptionLower = description.toLowerCase();
  const keywordsLower = keywords.toLowerCase();
  
  for (const rawTerm of searchTerms) {
    const variants = expandTerm(rawTerm);
    const termLower = variants.find(v => (titleLower + ' ' + keywordsLower + ' ' + descriptionLower).includes(v)) || rawTerm.toLowerCase();
    
    // Exact title match = highest score
    if (titleLower === termLower) {
      score += 100;
    }
    // Title starts with term
    else if (titleLower.startsWith(termLower)) {
      score += 80;
    }
    // Title contains term
    else if (titleLower.includes(termLower)) {
      score += 60;
    }
    // Keywords contain term
    if (keywordsLower.includes(termLower)) {
      score += 40;
    }
    // Description contains term
    if (descriptionLower.includes(termLower)) {
      score += 20;
    }
    // Year match
    if (item.year && item.year.includes(rawTerm)) {
      score += 50;
    }
    // Category match
    if (item.category && item.category.toLowerCase().includes(termLower)) {
      score += 20;
    }
  }
  
  // Importance bonus
  if (item.importance === 'high') score += 25;
  else if (item.importance === 'medium') score += 10;
  
  // Type bonus (persons and events are often more relevant)
  if (item.type === 'person') score += 15;
  if (item.type === 'event') score += 12;
  if (item.type === 'place') score += 10;
  
  return score;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [siteUpdates, setSiteUpdates] = useState<SearchResult[]>([]);
  const [bijlageVerhalen, setBijlageVerhalen] = useState<SearchResult[]>([]);
  const { language } = useLanguage();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent searches:', e);
    }
  }, []);

  // Fetch site updates for search
  useEffect(() => {
    const fetchUpdates = async () => {
      const { data, error } = await supabase
        .from('site_updates_public')
        .select('id, title, description, created_at')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        const updateResults: SearchResult[] = data.map(update => ({
          id: `update-${update.id}`,
          type: 'update' as SearchResultType,
          titleNL: update.title || '',
          titleFR: update.title || '',
          titleEN: update.title || '',
          titleES: update.title || '',
          titlePCD: update.title || '',
          titleVLS: update.title || '',
          descriptionNL: update.description || 'Site update',
          descriptionFR: update.description || 'Mise à jour du site',
          descriptionEN: update.description || 'Site update',
          descriptionES: update.description || 'Actualización del sitio',
          descriptionPCD: update.description || 'Mise à jour du site',
          descriptionVLS: update.description || 'Site update',
          href: '#voorwoord',
          category: 'update',
          keywordsNL: `update nieuw ${update.title} ${update.description || ''}`,
          keywordsFR: `mise à jour nouveau ${update.title} ${update.description || ''}`,
          keywordsEN: `update new ${update.title} ${update.description || ''}`,
          keywordsES: `actualización nuevo ${update.title} ${update.description || ''}`,
          year: update.created_at ? new Date(update.created_at).getFullYear().toString() : undefined,
          importance: 'medium' as const,
        }));
        setSiteUpdates(updateResults);
      }
    };
    
    fetchUpdates();
  }, []);

  // Fetch published grandparent stories (appendix) so their full texts are searchable
  useEffect(() => {
    const fetchVerhalen = async () => {
      const { data, error } = await supabase.rpc('get_approved_grootouder_verhalen');
      if (error || !data) return;
      const rows = data as Array<{
        id: string;
        naam: string;
        woonplaats: string | null;
        geboortejaar: string | null;
        relatie: string | null;
        antwoorden: Record<string, string> | null;
      }>;
      setBijlageVerhalen(
        rows.map((row) => {
          const tekst = Object.values(row.antwoorden || {}).join(' ');
          const titel = `Grootouderverhaal — ${row.naam}`;
          const omschrijving =
            tekst.length > 160 ? `${tekst.slice(0, 160).trimEnd()}…` : tekst || 'Grootouderverhaal uit de familie';
          return {
            id: `verhaal-${row.id}`,
            type: 'text' as SearchResultType,
            titleNL: titel,
            titleFR: `Récit de grands-parents — ${row.naam}`,
            titleEN: `Grandparent story — ${row.naam}`,
            titleES: `Relato de abuelos — ${row.naam}`,
            titleVLS: titel,
            descriptionNL: omschrijving,
            descriptionFR: omschrijving,
            descriptionEN: omschrijving,
            descriptionES: omschrijving,
            href: '/grootouderverhalen',
            category: 'bijlagen',
            keywordsNL: `grootouderverhalen bijlage ${row.naam} ${row.relatie || ''} ${row.woonplaats || ''} ${row.geboortejaar || ''} ${tekst}`,
            keywordsFR: `récits grands-parents annexe ${row.naam} ${tekst}`,
            keywordsEN: `grandparent stories appendix ${row.naam} ${tekst}`,
            keywordsES: `relatos abuelos anexo ${row.naam} ${tekst}`,
            year: row.geboortejaar || undefined,
            importance: 'medium' as const,
          };
        })
      );
    };

    fetchVerhalen();
  }, []);

  // Save search to recent
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
      const updated = [searchQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent searches:', e);
      }
      return updated;
    });
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      console.error('Failed to clear recent searches:', e);
    }
  }, []);

  // Get search content lazily - combine static content with dynamic updates
  const allContent = useMemo(
    () => [...getSearchContent(), ...siteUpdates, ...bijlageVerhalen],
    [siteUpdates, bijlageVerhalen]
  );

  // Filter and search
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = normalize(query).split(' ').filter(t => t.length > 0);
    if (searchTerms.length === 0) return [];

    const scoped = allContent.filter(
      item => selectedFilter === 'all' || item.type === selectedFilter
    );

    // Strict: every term must match. Fallback: at least one term matches,
    // zodat spelfouten of extra woorden nog steeds resultaten geven.
    let filtered = scoped.filter(item => searchTerms.every(term => matchesItem(term, item)));
    if (filtered.length === 0 && searchTerms.length > 1) {
      filtered = scoped.filter(item => searchTerms.some(term => matchesItem(term, item)));
    }


    // Sort by relevance (fuzzy quality weighs in, so exact hits stay on top)
    return filtered
      .map(item => {
        const { text, tokens } = getSearchable(item);
        const quality = searchTerms.reduce(
          (sum, term) => sum + matchQuality(term, text, tokens),
          0
        ) / searchTerms.length;
        return { item, score: calculateRelevance(item, searchTerms, language) * (0.5 + quality) };
      })
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }, [query, selectedFilter, allContent, language]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of results) {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type].push(result);
    }
    return groups;
  }, [results]);

  // Get available filters based on results
  const availableFilters = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = normalize(query).split(' ').filter(t => t.length > 0);
    const types = new Set<SearchResultType>();

    allContent.forEach(item => {
      if (searchTerms.every(term => matchesItem(term, item))) {
        types.add(item.type);
      }
    });

    return Array.from(types);
  }, [query, allContent]);

  // Count results per type
  const resultCounts = useMemo(() => {
    if (!query.trim()) return {};

    const searchTerms = normalize(query).split(' ').filter(t => t.length > 0);
    const counts: Record<string, number> = {};

    allContent.forEach(item => {
      if (searchTerms.every(term => matchesItem(term, item))) {
        counts[item.type] = (counts[item.type] || 0) + 1;
      }
    });

    return counts;
  }, [query, allContent]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSelectedFilter('all');
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    if (query.trim()) {
      saveRecentSearch(query.trim());
    }
    setQuery('');
    setSelectedFilter('all');
  }, [query, saveRecentSearch]);

  const selectRecentSearch = useCallback((search: string) => {
    setQuery(search);
  }, []);

  return {
    query,
    setQuery,
    results,
    groupedResults,
    isOpen,
    openSearch,
    closeSearch,
    clearSearch,
    language,
    selectedFilter,
    setSelectedFilter,
    availableFilters,
    resultCounts,
    recentSearches,
    selectRecentSearch,
    clearRecentSearches,
    saveRecentSearch,
  };
}
