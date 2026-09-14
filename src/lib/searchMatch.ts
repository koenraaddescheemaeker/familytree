// Fuzzy matching helpers for the site search.
// Handles diacritics, spelling variants (Deforce/Delforge), phonetic Dutch/French
// quirks (ij/y, k/c, oo/o) and typos via bounded Levenshtein distance.

/** Lowercase + strip diacritics + collapse punctuation. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rough phonetic key so "Iseghem"/"Izegem" or "Jooris"/"Joris" collapse together. */
export function phoneticKey(word: string): string {
  return normalize(word)
    .replace(/ck/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/ph/g, 'f')
    .replace(/qu/g, 'k')
    .replace(/c/g, 'k')
    .replace(/z/g, 's')
    .replace(/y/g, 'i')
    .replace(/ij/g, 'i')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'u')
    .replace(/(.)\1+/g, '$1')
    .replace(/e$/g, '');
}

// Known name/term variants. Each group is fully interchangeable.
const VARIANT_GROUPS: string[][] = [
  ['deforce', 'delforce', 'delforge', 'deleforge', 'de force', 'deforse', 'deforze'],
  ['izegem', 'iseghem', 'yzegem', 'emelgem', 'ingelmunster'],
  ['jooris', 'joris', 'georges', 'george', 'geo'],
  ['simonne', 'simone', 'simonna'],
  ['vandeputte', 'van de putte', 'vandeput', 'van de put'],
  ['grootouderboek', 'grootouder boek', 'grootoudersboek', 'oma boek', 'omaboek', 'memoires', 'herinneringen'],
  ['stamboom', 'genealogie', 'familietree', 'family tree', 'arbre'],
  ['meubelmaker', 'schrijnwerker', 'timmerman', 'houtbewerker', 'ebenist', 'ebeniste'],
  ['oorlog', 'wereldoorlog', 'wo1', 'wo2', 'ww1', 'ww2', 'guerre', 'war', '1940', '1944'],
  ['foto', 'fotos', 'photo', 'photos', 'afbeelding', 'beeld', 'prent'],
  ['dialect', 'picardisch', 'chti', 'chtimi', 'ptois', 'patois', 'vlaams'],
  ['overledenen', 'overleden', 'doden', 'begraven', 'doodsprentje'],
  ['bosseniers', 'boogschutters', 'gilde', 'papegay', 'papegaai'],
  ['hallennes', 'capinghem', 'rijsel', 'lille', 'frans vlaanderen', 'french flanders'],
  ['marcel', 'marcelle', 'marcell'],
  ['magdalena', 'magdalene', 'madeleine', 'magda', 'leentje'],
  ['emile', 'emiel', 'geldof', 'geldhof'],
  ['grootouder', 'grootouders', 'oma', 'opa', 'bomma', 'bompa', 'grootmoeder', 'grootvader', 'grands parents', 'grandparents', 'abuelos'],
  ['verhaal', 'verhalen', 'getuigenis', 'story', 'stories', 'recit', 'recits', 'relato'],
  ['kerk', 'parochie', 'pastoor', 'priester', 'religie', 'geloof', 'eglise'],
  ['school', 'onderwijs', 'klas', 'schooltijd', 'ecole', 'nonnen', 'zusters'],
  ['huwelijk', 'trouw', 'trouwen', 'bruiloft', 'mariage', 'wedding', 'boda'],
  ['geboorte', 'geboren', 'naissance', 'birth', 'doopsel', 'gedoopt'],
  ['kaart', 'landkaart', 'map', 'carte', 'plattegrond'],
  ['bedrijf', 'familiebedrijf', 'fabriek', 'atelier', 'werkplaats', 'zaak', 'handel'],
  ['dna', 'genetisch', 'haplogroep', 'genetica', 'test'],
  ['bijlage', 'bijlagen', 'annexe', 'appendix', 'anexo'],
  ['goslar', 'dwangarbeid', 'verplichte tewerkstelling', 'duitsland', 'allemagne'],
  ['jodenvervolging', 'joden', 'holocaust', 'razzia', 'deportatie'],
  ['burgemeester', 'burgemeesters', 'schepen', 'gemeentebestuur', 'maire'],
  ['woordenboek', 'lexicon', 'dictionnaire', 'dictionary', 'woorden'],
];

const VARIANT_INDEX: Map<string, string[]> = (() => {
  // Merge groups that share a word so variants stay transitive.
  const merged: Set<string>[] = [];
  for (const group of VARIANT_GROUPS) {
    const normalized = group.map(normalize).filter(Boolean);
    const hits = merged.filter(set => normalized.some(word => set.has(word)));
    if (hits.length === 0) {
      merged.push(new Set(normalized));
      continue;
    }
    const target = hits[0];
    normalized.forEach(word => target.add(word));
    for (const other of hits.slice(1)) {
      other.forEach(word => target.add(word));
      merged.splice(merged.indexOf(other), 1);
    }
  }

  const map = new Map<string, string[]>();
  for (const set of merged) {
    const list = Array.from(set);
    for (const word of list) map.set(word, list);
  }
  return map;
})();


/** Expand a search term into its known variants (always includes the term itself). */
export function expandTerm(term: string): string[] {
  const base = normalize(term);
  const variants = new Set<string>([base]);
  const stems = [base, base.replace(/(en|s|e)$/, '')].filter(w => w.length >= 3);
  for (const stem of stems) {
    const group = VARIANT_INDEX.get(stem);
    if (group) group.forEach(v => variants.add(v));
  }
  return Array.from(variants).filter(Boolean);
}


/** Levenshtein distance, aborts early once it exceeds `max`. */
export function levenshtein(a: string, b: string, max = 3): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      curr[j] = value;
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

/** Typo tolerance scaled to word length. */
function allowedDistance(term: string): number {
  if (term.length <= 3) return 0;
  if (term.length <= 5) return 1;
  if (term.length <= 8) return 2;
  return 3;
}

/** Split normalized text into word tokens. */
export function tokenize(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

/**
 * Does `term` match anywhere in `text`?
 * Tries, in order: substring, variant substring, prefix on a token,
 * phonetic token equality, and finally bounded Levenshtein on tokens.
 */
export function fuzzyMatchTerm(term: string, normalizedText: string, tokens?: string[]): boolean {
  const variants = expandTerm(term);
  for (const variant of variants) {
    if (!variant) continue;
    if (normalizedText.includes(variant)) return true;
  }

  const words = tokens ?? normalizedText.split(' ').filter(Boolean);

  for (const variant of variants) {
    if (variant.length < 3) continue;
    const max = allowedDistance(variant);
    const variantPhonetic = phoneticKey(variant);

    for (const word of words) {
      // prefix match ("delforg" -> "delforge")
      if (word.startsWith(variant) || variant.startsWith(word)) {
        if (Math.abs(word.length - variant.length) <= max + 1) return true;
      }
      if (variantPhonetic.length >= 3 && phoneticKey(word) === variantPhonetic) return true;
      if (max > 0 && levenshtein(variant, word, max) <= max) return true;
    }
  }

  return false;
}

/** 0..1 quality of the best match for `term` in `text` (used for ranking). */
export function matchQuality(term: string, normalizedText: string, tokens?: string[]): number {
  const variants = expandTerm(term);
  const base = normalize(term);

  for (const variant of variants) {
    if (variant && normalizedText.includes(variant)) {
      return variant === base ? 1 : 0.9;
    }
  }

  const words = tokens ?? normalizedText.split(' ').filter(Boolean);
  let best = 0;
  for (const variant of variants) {
    if (variant.length < 3) continue;
    const max = allowedDistance(variant);
    for (const word of words) {
      if (word.startsWith(variant)) {
        best = Math.max(best, 0.85);
        continue;
      }
      if (max > 0) {
        const distance = levenshtein(variant, word, max);
        if (distance <= max) {
          best = Math.max(best, 0.8 - distance * 0.15);
        }
      }
      if (phoneticKey(word) === phoneticKey(variant)) {
        best = Math.max(best, 0.7);
      }
    }
  }
  return best;
}
