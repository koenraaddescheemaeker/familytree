/**
 * GEDCOM (.ged) file parser
 * Parses GEDCOM 5.5/5.5.1 format files (as exported by MyHeritage, Ancestry, etc.)
 * and returns structured family data.
 */

export interface GedcomIndividual {
  id: string;
  givenName: string;
  surname: string;
  fullName: string;
  sex: 'M' | 'F' | 'U';
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  occupation?: string;
  note?: string;
  familySpouse: string[];   // FAMS - families where this person is a spouse
  familyChild: string[];    // FAMC - families where this person is a child
}

export interface GedcomFamily {
  id: string;
  husbandId?: string;
  wifeId?: string;
  childIds: string[];
  marriageDate?: string;
  marriagePlace?: string;
}

export interface GedcomData {
  individuals: Map<string, GedcomIndividual>;
  families: Map<string, GedcomFamily>;
  source?: string;
}

export interface GedcomTreeNode {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  birthPlace?: string;
  deathPlace?: string;
  sex: 'M' | 'F' | 'U';
  spouse?: string;
  spouseBirth?: string;
  marriageDate?: string;
  occupation?: string;
  note?: string;
  children: GedcomTreeNode[];
}

interface GedcomLine {
  level: number;
  tag: string;
  value: string;
  xref: string;
}

function parseLine(line: string): GedcomLine | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // Match: LEVEL [XREF] TAG [VALUE]
  const match = trimmed.match(/^(\d+)\s+(?:(@\S+@)\s+)?(\S+)\s*(.*)?$/);
  if (!match) return null;

  return {
    level: parseInt(match[1], 10),
    xref: match[2] || '',
    tag: match[3],
    value: (match[4] || '').trim(),
  };
}

export function parseGedcom(text: string): GedcomData {
  const lines = text.split(/\r?\n/);
  const individuals = new Map<string, GedcomIndividual>();
  const families = new Map<string, GedcomFamily>();
  let source: string | undefined;

  let i = 0;

  while (i < lines.length) {
    const parsed = parseLine(lines[i]);
    if (!parsed) { i++; continue; }

    if (parsed.level === 0 && parsed.xref && parsed.tag === 'INDI') {
      const indi = parseIndividual(lines, i, parsed.xref);
      individuals.set(indi.individual.id, indi.individual);
      i = indi.nextIndex;
    } else if (parsed.level === 0 && parsed.xref && parsed.tag === 'FAM') {
      const fam = parseFamily(lines, i, parsed.xref);
      families.set(fam.family.id, fam.family);
      i = fam.nextIndex;
    } else if (parsed.level === 1 && parsed.tag === 'SOUR' && parsed.value) {
      source = parsed.value;
      i++;
    } else {
      i++;
    }
  }

  return { individuals, families, source };
}

function parseIndividual(lines: string[], startIndex: number, xref: string) {
  const indi: GedcomIndividual = {
    id: xref,
    givenName: '',
    surname: '',
    fullName: '',
    sex: 'U',
    familySpouse: [],
    familyChild: [],
  };

  let i = startIndex + 1;
  let currentEvent = '';

  while (i < lines.length) {
    const p = parseLine(lines[i]);
    if (!p) { i++; continue; }
    if (p.level === 0) break;

    if (p.level === 1) {
      currentEvent = '';
      switch (p.tag) {
        case 'NAME':
          indi.fullName = p.value.replace(/\//g, '').trim();
          break;
        case 'SEX':
          indi.sex = (p.value === 'M' || p.value === 'F') ? p.value : 'U';
          break;
        case 'BIRT': currentEvent = 'BIRT'; break;
        case 'DEAT': currentEvent = 'DEAT'; break;
        case 'OCCU': indi.occupation = p.value; break;
        case 'NOTE': indi.note = p.value; break;
        case 'FAMS': indi.familySpouse.push(p.value); break;
        case 'FAMC': indi.familyChild.push(p.value); break;
      }
    } else if (p.level === 2) {
      if (p.tag === 'GIVN') indi.givenName = p.value;
      if (p.tag === 'SURN') indi.surname = p.value;
      if (p.tag === 'DATE') {
        if (currentEvent === 'BIRT') indi.birthDate = p.value;
        if (currentEvent === 'DEAT') indi.deathDate = p.value;
      }
      if (p.tag === 'PLAC') {
        if (currentEvent === 'BIRT') indi.birthPlace = p.value;
        if (currentEvent === 'DEAT') indi.deathPlace = p.value;
      }
      if (p.tag === 'CONC' || p.tag === 'CONT') {
        if (indi.note) indi.note += (p.tag === 'CONT' ? '\n' : '') + p.value;
      }
    }
    i++;
  }

  if (!indi.fullName && (indi.givenName || indi.surname)) {
    indi.fullName = `${indi.givenName} ${indi.surname}`.trim();
  }

  return { individual: indi, nextIndex: i };
}

function parseFamily(lines: string[], startIndex: number, xref: string) {
  const fam: GedcomFamily = {
    id: xref,
    childIds: [],
  };

  let i = startIndex + 1;
  let currentEvent = '';

  while (i < lines.length) {
    const p = parseLine(lines[i]);
    if (!p) { i++; continue; }
    if (p.level === 0) break;

    if (p.level === 1) {
      currentEvent = '';
      switch (p.tag) {
        case 'HUSB': fam.husbandId = p.value; break;
        case 'WIFE': fam.wifeId = p.value; break;
        case 'CHIL': fam.childIds.push(p.value); break;
        case 'MARR': currentEvent = 'MARR'; break;
      }
    } else if (p.level === 2) {
      if (currentEvent === 'MARR') {
        if (p.tag === 'DATE') fam.marriageDate = p.value;
        if (p.tag === 'PLAC') fam.marriagePlace = p.value;
      }
    }
    i++;
  }

  return { family: fam, nextIndex: i };
}

/**
 * Build a tree structure from parsed GEDCOM data.
 * Finds root ancestors (people who are not children in any family) and builds downward.
 */
export function buildTreeFromGedcom(data: GedcomData): GedcomTreeNode[] {
  const { individuals, families } = data;

  // Find people who are children in some family
  const childIds = new Set<string>();
  families.forEach(fam => {
    fam.childIds.forEach(id => childIds.add(id));
  });

  // Root individuals = those not a child in any family
  const rootIds = Array.from(individuals.keys()).filter(id => !childIds.has(id));

  function buildNode(personId: string, visited: Set<string>): GedcomTreeNode | null {
    if (visited.has(personId)) return null;
    visited.add(personId);

    const person = individuals.get(personId);
    if (!person) return null;

    // Find spouse info from first FAMS family
    let spouseName: string | undefined;
    let spouseBirth: string | undefined;
    let marriageDate: string | undefined;
    const allChildren: GedcomTreeNode[] = [];

    for (const famId of person.familySpouse) {
      const fam = families.get(famId);
      if (!fam) continue;

      // Find spouse
      const spouseId = fam.husbandId === personId ? fam.wifeId : fam.husbandId;
      if (spouseId && !spouseName) {
        const spouse = individuals.get(spouseId);
        if (spouse) {
          spouseName = spouse.fullName;
          spouseBirth = spouse.birthDate;
        }
      }
      if (fam.marriageDate && !marriageDate) {
        marriageDate = fam.marriageDate;
      }

      // Build children
      for (const childId of fam.childIds) {
        const childNode = buildNode(childId, visited);
        if (childNode) allChildren.push(childNode);
      }
    }

    return {
      id: personId,
      name: person.fullName || 'Onbekend',
      birth: person.birthDate,
      death: person.deathDate,
      birthPlace: person.birthPlace,
      deathPlace: person.deathPlace,
      sex: person.sex,
      spouse: spouseName,
      spouseBirth,
      marriageDate,
      occupation: person.occupation,
      note: person.note,
      children: allChildren,
    };
  }

  const visited = new Set<string>();
  const trees: GedcomTreeNode[] = [];

  for (const rootId of rootIds) {
    const node = buildNode(rootId, visited);
    if (node) trees.push(node);
  }

  // Sort: largest tree first
  trees.sort((a, b) => countDescendants(b) - countDescendants(a));

  return trees;
}

function countDescendants(node: GedcomTreeNode): number {
  let count = 1;
  for (const child of node.children) {
    count += countDescendants(child);
  }
  return count;
}

/** Get statistics from GEDCOM data */
export function getGedcomStats(data: GedcomData) {
  const indis = Array.from(data.individuals.values());
  return {
    totalIndividuals: indis.length,
    totalFamilies: data.families.size,
    males: indis.filter(i => i.sex === 'M').length,
    females: indis.filter(i => i.sex === 'F').length,
    withBirthDate: indis.filter(i => i.birthDate).length,
    withDeathDate: indis.filter(i => i.deathDate).length,
    surnames: [...new Set(indis.map(i => i.surname).filter(Boolean))].sort(),
  };
}
