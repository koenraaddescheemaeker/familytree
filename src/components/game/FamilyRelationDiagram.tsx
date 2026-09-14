import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Users, User, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface FamilyMember {
  id: number;
  name: string;
  role: 'grandparent' | 'parent' | 'child' | 'spouse' | 'grandchild';
  parentIds?: number[];
  spouseId?: number;
  generation: number;
  birthYear?: number;
  deathYear?: number;
  profession?: string;
  gender: 'male' | 'female';
}

const familyMembers: FamilyMember[] = [
  // Generatie 1 - Overgrootouders
  { id: 1, name: 'Charles-Louis Deforche', role: 'grandparent', generation: 1, birthYear: 1857, deathYear: 1938, profession: 'Timmerman', gender: 'male', spouseId: 2 },
  { id: 2, name: 'Magdalena Vande Weghe', role: 'grandparent', generation: 1, birthYear: 1860, deathYear: 1942, gender: 'female', spouseId: 1 },
  
  // Generatie 2 - Grootouders
  { id: 3, name: 'Marcel Deforche', role: 'parent', parentIds: [1, 2], generation: 2, birthYear: 1884, deathYear: 1962, profession: 'Schrijnwerker', gender: 'male', spouseId: 4 },
  { id: 4, name: 'Magdalena Geldof', role: 'spouse', generation: 2, birthYear: 1888, deathYear: 1975, gender: 'female', spouseId: 3 },
  
  // Generatie 3 - Ouders
  { id: 5, name: 'Georges Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1910, deathYear: 1985, profession: 'Meubelmaker', gender: 'male', spouseId: 6 },
  { id: 6, name: 'Maria Vandenberghe', role: 'spouse', generation: 3, birthYear: 1912, deathYear: 1990, gender: 'female', spouseId: 5 },
  { id: 7, name: 'Albert Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1912, deathYear: 1978, profession: 'Timmerman', gender: 'male', spouseId: 8 },
  { id: 8, name: 'Julia Claeys', role: 'spouse', generation: 3, birthYear: 1915, deathYear: 1988, gender: 'female', spouseId: 7 },
  { id: 9, name: 'Maurice Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1914, deathYear: 1992, profession: 'Houtbewerker', gender: 'male', spouseId: 10 },
  { id: 10, name: 'Irma Desmet', role: 'spouse', generation: 3, birthYear: 1918, deathYear: 1995, gender: 'female', spouseId: 9 },
  { id: 11, name: 'Roger Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1916, deathYear: 1980, profession: 'Schrijnwerker', gender: 'male', spouseId: 12 },
  { id: 12, name: 'Germaine Devos', role: 'spouse', generation: 3, birthYear: 1920, deathYear: 1998, gender: 'female', spouseId: 11 },
  { id: 13, name: 'Germaine Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1918, deathYear: 2001, gender: 'female', spouseId: 14 },
  { id: 14, name: 'André Vermeersch', role: 'spouse', generation: 3, birthYear: 1915, deathYear: 1989, profession: 'Landbouwer', gender: 'male', spouseId: 13 },
  { id: 15, name: 'Raymond Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1920, deathYear: 2005, profession: 'Meubelmaker', gender: 'male', spouseId: 16 },
  { id: 16, name: 'Simonne Debacker', role: 'spouse', generation: 3, birthYear: 1924, deathYear: 2010, gender: 'female', spouseId: 15 },
  { id: 17, name: 'Lucien Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1922, deathYear: 2008, profession: 'Timmerman', gender: 'male', spouseId: 18 },
  { id: 18, name: 'Rachel Vanacker', role: 'spouse', generation: 3, birthYear: 1926, deathYear: 2012, gender: 'female', spouseId: 17 },
  { id: 19, name: 'Fernand Deforche', role: 'child', parentIds: [3, 4], generation: 3, birthYear: 1924, deathYear: 2015, profession: 'Schrijnwerker', gender: 'male', spouseId: 20 },
  { id: 20, name: 'Paula Verbeke', role: 'spouse', generation: 3, birthYear: 1928, deathYear: 2018, gender: 'female', spouseId: 19 },
  
  // Generatie 4 - Kleinkinderen (Kinderen van Georges & Maria)
  { id: 21, name: 'Marc Deforche', role: 'grandchild', parentIds: [5, 6], generation: 4, birthYear: 1935, profession: 'Ingenieur', gender: 'male', spouseId: 22 },
  { id: 22, name: 'Jeanne Peeters', role: 'spouse', generation: 4, birthYear: 1938, gender: 'female', spouseId: 21 },
  { id: 23, name: 'André Deforche', role: 'grandchild', parentIds: [5, 6], generation: 4, birthYear: 1938, profession: 'Leraar', gender: 'male' },
  { id: 24, name: 'Monique Deforche', role: 'grandchild', parentIds: [5, 6], generation: 4, birthYear: 1942, gender: 'female', spouseId: 25 },
  { id: 25, name: 'Paul Janssens', role: 'spouse', generation: 4, birthYear: 1940, profession: 'Boekhouder', gender: 'male', spouseId: 24 },
  
  // Kinderen van Albert & Julia
  { id: 26, name: 'Robert Deforche', role: 'grandchild', parentIds: [7, 8], generation: 4, birthYear: 1940, profession: 'Aannemer', gender: 'male', spouseId: 27 },
  { id: 27, name: 'Rosa Maes', role: 'spouse', generation: 4, birthYear: 1943, gender: 'female', spouseId: 26 },
  { id: 28, name: 'Christiane Deforche', role: 'grandchild', parentIds: [7, 8], generation: 4, birthYear: 1944, gender: 'female' },
  
  // Kinderen van Maurice & Irma
  { id: 29, name: 'Johan Deforche', role: 'grandchild', parentIds: [9, 10], generation: 4, birthYear: 1942, profession: 'Meubelmaker', gender: 'male', spouseId: 30 },
  { id: 30, name: 'Mariette Claessens', role: 'spouse', generation: 4, birthYear: 1945, gender: 'female', spouseId: 29 },
  { id: 31, name: 'Luc Deforche', role: 'grandchild', parentIds: [9, 10], generation: 4, birthYear: 1946, profession: 'Arts', gender: 'male' },
  
  // Kinderen van Roger & Germaine Devos
  { id: 32, name: 'Patrick Deforche', role: 'grandchild', parentIds: [11, 12], generation: 4, birthYear: 1945, profession: 'Architect', gender: 'male', spouseId: 33 },
  { id: 33, name: 'Martine Willems', role: 'spouse', generation: 4, birthYear: 1948, gender: 'female', spouseId: 32 },
  { id: 34, name: 'Brigitte Deforche', role: 'grandchild', parentIds: [11, 12], generation: 4, birthYear: 1948, gender: 'female' },
  
  // Kinderen van Germaine Deforche & André Vermeersch
  { id: 35, name: 'Frank Vermeersch', role: 'grandchild', parentIds: [13, 14], generation: 4, birthYear: 1943, profession: 'Landbouwer', gender: 'male', spouseId: 36 },
  { id: 36, name: 'Hilde Coppens', role: 'spouse', generation: 4, birthYear: 1946, gender: 'female', spouseId: 35 },
  { id: 37, name: 'Els Vermeersch', role: 'grandchild', parentIds: [13, 14], generation: 4, birthYear: 1947, gender: 'female' },
  
  // Kinderen van Raymond & Simonne
  { id: 38, name: 'Dirk Deforche', role: 'grandchild', parentIds: [15, 16], generation: 4, birthYear: 1948, profession: 'Bankier', gender: 'male', spouseId: 39 },
  { id: 39, name: 'Ann Declercq', role: 'spouse', generation: 4, birthYear: 1950, gender: 'female', spouseId: 38 },
  { id: 40, name: 'Koen Deforche', role: 'grandchild', parentIds: [15, 16], generation: 4, birthYear: 1952, profession: 'Advocaat', gender: 'male' },
  
  // Kinderen van Lucien & Rachel
  { id: 41, name: 'Wim Deforche', role: 'grandchild', parentIds: [17, 18], generation: 4, birthYear: 1950, profession: 'Timmerman', gender: 'male', spouseId: 42 },
  { id: 42, name: 'Griet Vandamme', role: 'spouse', generation: 4, birthYear: 1952, gender: 'female', spouseId: 41 },
  { id: 43, name: 'Inge Deforche', role: 'grandchild', parentIds: [17, 18], generation: 4, birthYear: 1954, gender: 'female' },
  
  // Kinderen van Fernand & Paula
  { id: 44, name: 'Geert Deforche', role: 'grandchild', parentIds: [19, 20], generation: 4, birthYear: 1952, profession: 'Ondernemer', gender: 'male', spouseId: 45 },
  { id: 45, name: 'Sabine Verhulst', role: 'spouse', generation: 4, birthYear: 1955, gender: 'female', spouseId: 44 },
  { id: 46, name: 'Katrien Deforche', role: 'grandchild', parentIds: [19, 20], generation: 4, birthYear: 1956, gender: 'female', spouseId: 47 },
  { id: 47, name: 'Stefaan Demeyer', role: 'spouse', generation: 4, birthYear: 1954, profession: 'Elektricien', gender: 'male', spouseId: 46 },
  
  // Generatie 5 - Achterkleinkinderen
  // Kinderen van Marc & Jeanne
  { id: 48, name: 'Thomas Deforche', role: 'grandchild', parentIds: [21, 22], generation: 5, birthYear: 1965, profession: 'Software Engineer', gender: 'male', spouseId: 49 },
  { id: 49, name: 'Lies Hermans', role: 'spouse', generation: 5, birthYear: 1967, gender: 'female', spouseId: 48 },
  { id: 50, name: 'Sara Deforche', role: 'grandchild', parentIds: [21, 22], generation: 5, birthYear: 1968, profession: 'Verpleegkundige', gender: 'female' },
  
  // Kinderen van Monique & Paul
  { id: 51, name: 'Peter Janssens', role: 'grandchild', parentIds: [24, 25], generation: 5, birthYear: 1970, profession: 'Accountant', gender: 'male', spouseId: 52 },
  { id: 52, name: 'Ellen Verhoeven', role: 'spouse', generation: 5, birthYear: 1972, gender: 'female', spouseId: 51 },
  
  // Kinderen van Robert & Rosa
  { id: 53, name: 'Bart Deforche', role: 'grandchild', parentIds: [26, 27], generation: 5, birthYear: 1968, profession: 'Aannemer', gender: 'male', spouseId: 54 },
  { id: 54, name: 'Nathalie Wouters', role: 'spouse', generation: 5, birthYear: 1970, gender: 'female', spouseId: 53 },
  { id: 55, name: 'Kim Deforche', role: 'grandchild', parentIds: [26, 27], generation: 5, birthYear: 1972, profession: 'Lerares', gender: 'female' },
  
  // Kinderen van Johan & Mariette
  { id: 56, name: 'Pieter Deforche', role: 'grandchild', parentIds: [29, 30], generation: 5, birthYear: 1970, profession: 'Meubelontwerper', gender: 'male', spouseId: 57 },
  { id: 57, name: 'Joke Smeets', role: 'spouse', generation: 5, birthYear: 1972, gender: 'female', spouseId: 56 },
  { id: 58, name: 'Eva Deforche', role: 'grandchild', parentIds: [29, 30], generation: 5, birthYear: 1974, profession: 'Psychologe', gender: 'female' },
  
  // Kinderen van Patrick & Martine
  { id: 59, name: 'Jan Deforche', role: 'grandchild', parentIds: [32, 33], generation: 5, birthYear: 1975, profession: 'Architect', gender: 'male', spouseId: 60 },
  { id: 60, name: 'Veerle Jacobs', role: 'spouse', generation: 5, birthYear: 1977, gender: 'female', spouseId: 59 },
  { id: 61, name: 'An Deforche', role: 'grandchild', parentIds: [32, 33], generation: 5, birthYear: 1978, profession: 'Marketing Manager', gender: 'female' },
  
  // Kinderen van Frank & Hilde
  { id: 62, name: 'Tim Vermeersch', role: 'grandchild', parentIds: [35, 36], generation: 5, birthYear: 1972, profession: 'Landbouwer', gender: 'male', spouseId: 63 },
  { id: 63, name: 'Sofie Lenaerts', role: 'spouse', generation: 5, birthYear: 1974, gender: 'female', spouseId: 62 },
  { id: 64, name: 'Leen Vermeersch', role: 'grandchild', parentIds: [35, 36], generation: 5, birthYear: 1975, profession: 'Dierenarts', gender: 'female' },
  
  // Kinderen van Dirk & Ann
  { id: 65, name: 'Matthias Deforche', role: 'grandchild', parentIds: [38, 39], generation: 5, birthYear: 1978, profession: 'Financieel Analist', gender: 'male', spouseId: 66 },
  { id: 66, name: 'Laura Peeters', role: 'spouse', generation: 5, birthYear: 1980, gender: 'female', spouseId: 65 },
  { id: 67, name: 'Julie Deforche', role: 'grandchild', parentIds: [38, 39], generation: 5, birthYear: 1980, profession: 'HR Manager', gender: 'female' },
  
  // Kinderen van Wim & Griet
  { id: 68, name: 'Jonas Deforche', role: 'grandchild', parentIds: [41, 42], generation: 5, birthYear: 1980, profession: 'Timmerman', gender: 'male', spouseId: 69 },
  { id: 69, name: 'Karen Michiels', role: 'spouse', generation: 5, birthYear: 1982, gender: 'female', spouseId: 68 },
  { id: 70, name: 'Elien Deforche', role: 'grandchild', parentIds: [41, 42], generation: 5, birthYear: 1983, profession: 'Grafisch Designer', gender: 'female' },
  
  // Kinderen van Geert & Sabine
  { id: 71, name: 'Stijn Deforche', role: 'grandchild', parentIds: [44, 45], generation: 5, birthYear: 1982, profession: 'CEO', gender: 'male', spouseId: 72 },
  { id: 72, name: 'Annelies De Smet', role: 'spouse', generation: 5, birthYear: 1984, gender: 'female', spouseId: 71 },
  { id: 73, name: 'Lore Deforche', role: 'grandchild', parentIds: [44, 45], generation: 5, birthYear: 1985, profession: 'Advocaat', gender: 'female' },
  
  // Kinderen van Katrien & Stefaan
  { id: 74, name: 'Bram Demeyer', role: 'grandchild', parentIds: [46, 47], generation: 5, birthYear: 1984, profession: 'Elektricien', gender: 'male', spouseId: 75 },
  { id: 75, name: 'Charlotte Verstraete', role: 'spouse', generation: 5, birthYear: 1986, gender: 'female', spouseId: 74 },
  { id: 76, name: 'Emma Demeyer', role: 'grandchild', parentIds: [46, 47], generation: 5, birthYear: 1987, profession: 'Kinesist', gender: 'female' },
];

interface FamilyRelationDiagramProps {
  isOpen: boolean;
  onClose: () => void;
  highlightMemberId?: number;
}

const FamilyRelationDiagram = ({ isOpen, onClose, highlightMemberId }: FamilyRelationDiagramProps) => {
  const { language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<number | null>(highlightMemberId || null);
  const [expandedGeneration, setExpandedGeneration] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    nl: {
      title: 'Familiestamboom',
      subtitle: 'Klik op een familielid voor meer informatie',
      generation: 'Generatie',
      greatGrandparents: 'Overgrootouders',
      grandparents: 'Grootouders',
      parents: 'Ouders',
      children: 'Kinderen',
      grandchildren: 'Kleinkinderen',
      greatGrandchildren: 'Achterkleinkinderen',
      born: 'Geboren',
      died: 'Overleden',
      profession: 'Beroep',
      spouse: 'Partner',
      siblings: 'Broers/Zussen',
      parents_label: 'Ouders',
      close: 'Sluiten',
      childOf: 'Kind van',
      search: 'Zoek familielid...',
      searchResults: 'Zoekresultaten',
      noResults: 'Geen resultaten gevonden',
      clearSearch: 'Wis zoekopdracht',
    },
    en: {
      title: 'Family Tree',
      subtitle: 'Click on a family member for more info',
      generation: 'Generation',
      greatGrandparents: 'Great-grandparents',
      grandparents: 'Grandparents',
      parents: 'Parents',
      children: 'Children',
      grandchildren: 'Grandchildren',
      greatGrandchildren: 'Great-grandchildren',
      born: 'Born',
      died: 'Deceased',
      profession: 'Profession',
      spouse: 'Spouse',
      siblings: 'Siblings',
      parents_label: 'Parents',
      close: 'Close',
      childOf: 'Child of',
      search: 'Search family member...',
      searchResults: 'Search results',
      noResults: 'No results found',
      clearSearch: 'Clear search',
    },
    fr: {
      title: 'Arbre Généalogique',
      subtitle: 'Cliquez sur un membre pour plus d\'informations',
      generation: 'Génération',
      greatGrandparents: 'Arrière-grands-parents',
      grandparents: 'Grands-parents',
      parents: 'Parents',
      children: 'Enfants',
      grandchildren: 'Petits-enfants',
      greatGrandchildren: 'Arrière-petits-enfants',
      born: 'Né(e)',
      died: 'Décédé(e)',
      profession: 'Profession',
      spouse: 'Conjoint(e)',
      siblings: 'Frères/Sœurs',
      parents_label: 'Parents',
      close: 'Fermer',
      childOf: 'Enfant de',
      search: 'Rechercher un membre...',
      searchResults: 'Résultats de recherche',
      noResults: 'Aucun résultat trouvé',
      clearSearch: 'Effacer la recherche',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.nl;

  const getSpouse = (memberId: number) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (member?.spouseId) {
      return familyMembers.find(m => m.id === member.spouseId);
    }
    return null;
  };

  const getSiblings = (memberId: number) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member?.parentIds) return [];
    return familyMembers.filter(m => 
      m.id !== memberId && 
      m.parentIds && 
      m.parentIds[0] === member.parentIds![0]
    );
  };

  const getParents = (memberId: number) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member?.parentIds) return [];
    return familyMembers.filter(m => member.parentIds?.includes(m.id));
  };

  const getChildren = (memberId: number) => {
    return familyMembers.filter(m => m.parentIds?.includes(memberId));
  };

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return familyMembers.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.profession?.toLowerCase().includes(query) ||
      m.birthYear?.toString().includes(query)
    );
  }, [searchQuery]);

  const handleSearchResultClick = (memberId: number) => {
    setSelectedMember(memberId);
    const member = familyMembers.find(m => m.id === memberId);
    if (member) {
      setExpandedGeneration(member.generation);
    }
    setSearchQuery('');
  };

  const generationLabels = {
    1: t.greatGrandparents,
    2: t.grandparents,
    3: t.parents,
    4: t.grandchildren,
    5: t.greatGrandchildren,
  };

  const generation1 = familyMembers.filter(m => m.generation === 1);
  const generation2 = familyMembers.filter(m => m.generation === 2);
  const generation3Couples: { deforche: FamilyMember; spouse: FamilyMember | null | undefined }[] = [];
  const generation4Couples: { member: FamilyMember; spouse: FamilyMember | null | undefined; parentName: string }[] = [];
  const generation5Couples: { member: FamilyMember; spouse: FamilyMember | null | undefined; parentName: string }[] = [];
  
  // Group generation 3 by couples
  const gen3Deforches = familyMembers.filter(m => m.generation === 3 && m.name.includes('Deforche'));
  gen3Deforches.forEach(member => {
    const spouse = getSpouse(member.id);
    generation3Couples.push({ deforche: member, spouse });
  });

  // Group generation 4 by parent couples
  const gen4Members = familyMembers.filter(m => m.generation === 4);
  gen4Members.forEach(member => {
    if (member.role === 'spouse') return;
    const spouse = getSpouse(member.id);
    const parent = member.parentIds ? familyMembers.find(p => p.id === member.parentIds![0]) : null;
    const parentName = parent?.name.split(' ')[0] || '';
    generation4Couples.push({ member, spouse, parentName });
  });

  // Group generation 5 by parent couples
  const gen5Members = familyMembers.filter(m => m.generation === 5);
  gen5Members.forEach(member => {
    if (member.role === 'spouse') return;
    const spouse = getSpouse(member.id);
    const parent = member.parentIds ? familyMembers.find(p => p.id === member.parentIds![0]) : null;
    const parentName = parent?.name.split(' ')[0] || '';
    generation5Couples.push({ member, spouse, parentName });
  });

  const MemberCard = ({ member, isHighlighted }: { member: FamilyMember; isHighlighted?: boolean }) => {
    const isSelected = selectedMember === member.id;
    const spouse = getSpouse(member.id);
    
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedMember(isSelected ? null : member.id)}
        className={`
          relative cursor-pointer rounded-xl p-3 transition-all duration-300
          ${member.gender === 'male' 
            ? 'bg-blue-500/20 border-2 border-blue-400/50 hover:border-blue-400' 
            : 'bg-pink-500/20 border-2 border-pink-400/50 hover:border-pink-400'
          }
          ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
          ${isHighlighted ? 'animate-pulse ring-2 ring-yellow-400' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            ${member.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'}
          `}>
            {member.gender === 'male' ? '♂' : '♀'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate text-foreground">{member.name.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground truncate">{member.name.split(' ').slice(1).join(' ')}</p>
          </div>
        </div>
        
        {member.birthYear && (
          <p className="text-xs text-muted-foreground mt-1">
            {member.birthYear} - {member.deathYear || '...'}
          </p>
        )}
      </motion.div>
    );
  };

  const CoupleCard = ({ member1, member2 }: { member1: FamilyMember; member2?: FamilyMember }) => (
    <div className="flex items-center gap-2">
      <MemberCard member={member1} isHighlighted={highlightMemberId === member1.id} />
      {member2 && (
        <>
          <div className="flex flex-col items-center">
            <Heart className="w-4 h-4 text-red-400" />
          </div>
          <MemberCard member={member2} isHighlighted={highlightMemberId === member2.id} />
        </>
      )}
    </div>
  );

  const selectedMemberData = selectedMember ? familyMembers.find(m => m.id === selectedMember) : null;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {t.title}
                </h2>
                <p className="text-muted-foreground text-sm">{t.subtitle}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-background/80"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto"
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground px-2 py-1 font-medium">
                          {t.searchResults} ({searchResults.length})
                        </p>
                        {searchResults.map(member => (
                          <motion.button
                            key={member.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSearchResultClick(member.id)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                          >
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                              ${member.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'}
                            `}>
                              {member.gender === 'male' ? '♂' : '♀'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{member.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {t.generation} {member.generation}
                                {member.profession && ` • ${member.profession}`}
                                {member.birthYear && ` • ${member.birthYear}`}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        <p>{t.noResults}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="space-y-8">
              {/* Generatie 1 - Grootouders */}
              <div className="space-y-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedGeneration(expandedGeneration === 1 ? null : 1)}
                >
                  <div className="bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {t.generation} 1
                  </div>
                  <span className="text-lg font-semibold text-foreground">{t.grandparents}</span>
                  {expandedGeneration === 1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                
                <div className="flex justify-center">
                  <CoupleCard member1={generation1[0]} member2={generation1[1]} />
                </div>
                
                {/* Verbindingslijn naar generatie 2 */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
              </div>

              {/* Generatie 2 - Ouders */}
              <div className="space-y-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedGeneration(expandedGeneration === 2 ? null : 2)}
                >
                  <div className="bg-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {t.generation} 2
                  </div>
                  <span className="text-lg font-semibold text-foreground">{t.parents}</span>
                  {expandedGeneration === 2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                
                <div className="flex justify-center">
                  <CoupleCard member1={generation2[0]} member2={generation2[1]} />
                </div>
                
                {/* Verbindingslijn naar generatie 3 */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div className="flex justify-center">
                  <div className="w-3/4 h-0.5 bg-border" />
                </div>
              </div>

              {/* Generatie 3 - Ouders */}
              <div className="space-y-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedGeneration(expandedGeneration === 3 ? null : 3)}
                >
                  <div className="bg-purple-500/20 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {t.generation} 3
                  </div>
                  <span className="text-lg font-semibold text-foreground">{t.parents}</span>
                  {expandedGeneration === 3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {generation3Couples.map(({ deforche, spouse }) => (
                    <div key={deforche.id} className="space-y-2">
                      {/* Verbindingslijn van bovenliggende lijn */}
                      <div className="flex justify-center">
                        <div className="w-0.5 h-4 bg-border" />
                      </div>
                      <CoupleCard member1={deforche} member2={spouse} />
                    </div>
                  ))}
                </div>

                {/* Verbindingslijn naar generatie 4 */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div className="flex justify-center">
                  <div className="w-full h-0.5 bg-border" />
                </div>
              </div>

              {/* Generatie 4 - Kleinkinderen */}
              <div className="space-y-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedGeneration(expandedGeneration === 4 ? null : 4)}
                >
                  <div className="bg-rose-500/20 text-rose-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {t.generation} 4
                  </div>
                  <span className="text-lg font-semibold text-foreground">{t.grandchildren}</span>
                  <span className="text-sm text-muted-foreground">({generation4Couples.length} {t.grandchildren.toLowerCase()})</span>
                  {expandedGeneration === 4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {generation4Couples.map(({ member, spouse, parentName }) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex justify-center">
                        <div className="w-0.5 h-4 bg-border" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {t.childOf} {parentName}
                        </span>
                      </div>
                      <CoupleCard member1={member} member2={spouse} />
                    </div>
                  ))}
                </div>

                {/* Verbindingslijn naar generatie 5 */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div className="flex justify-center">
                  <div className="w-full h-0.5 bg-border" />
                </div>
              </div>

              {/* Generatie 5 - Achterkleinkinderen */}
              <div className="space-y-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedGeneration(expandedGeneration === 5 ? null : 5)}
                >
                  <div className="bg-cyan-500/20 text-cyan-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {t.generation} 5
                  </div>
                  <span className="text-lg font-semibold text-foreground">{t.greatGrandchildren}</span>
                  <span className="text-sm text-muted-foreground">({generation5Couples.length} {t.greatGrandchildren.toLowerCase()})</span>
                  {expandedGeneration === 5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {generation5Couples.map(({ member, spouse, parentName }) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex justify-center">
                        <div className="w-0.5 h-4 bg-border" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {t.childOf} {parentName}
                        </span>
                      </div>
                      <CoupleCard member1={member} member2={spouse} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Member Detail Panel */}
            <AnimatePresence>
              {selectedMemberData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-8 bg-muted/50 rounded-xl p-6 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0
                      ${selectedMemberData.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'}
                    `}>
                      {selectedMemberData.gender === 'male' ? '♂' : '♀'}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{selectedMemberData.name}</h3>
                        <p className="text-muted-foreground">
                          {selectedMemberData.birthYear && `${t.born}: ${selectedMemberData.birthYear}`}
                          {selectedMemberData.deathYear && ` • ${t.died}: ${selectedMemberData.deathYear}`}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedMemberData.profession && (
                          <div className="bg-background/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.profession}</p>
                            <p className="font-medium text-foreground">{selectedMemberData.profession}</p>
                          </div>
                        )}

                        {getSpouse(selectedMemberData.id) && (
                          <div className="bg-background/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.spouse}</p>
                            <p className="font-medium text-foreground flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-400" />
                              {getSpouse(selectedMemberData.id)?.name}
                            </p>
                          </div>
                        )}

                        {getParents(selectedMemberData.id).length > 0 && (
                          <div className="bg-background/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.parents_label}</p>
                            <div className="space-y-1">
                              {getParents(selectedMemberData.id).map(parent => (
                                <p key={parent.id} className="font-medium text-foreground text-sm">{parent.name}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {getSiblings(selectedMemberData.id).length > 0 && (
                          <div className="bg-background/50 rounded-lg p-3 col-span-full">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{t.siblings}</p>
                            <div className="flex flex-wrap gap-2">
                              {getSiblings(selectedMemberData.id).map(sibling => (
                                <span 
                                  key={sibling.id} 
                                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm cursor-pointer hover:bg-primary/20 transition-colors"
                                  onClick={() => setSelectedMember(sibling.id)}
                                >
                                  {sibling.name.split(' ')[0]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {getChildren(selectedMemberData.id).length > 0 && (
                          <div className="bg-background/50 rounded-lg p-3 col-span-full">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{t.children}</p>
                            <div className="flex flex-wrap gap-2">
                              {getChildren(selectedMemberData.id).map(child => (
                                <span 
                                  key={child.id} 
                                  className="px-2 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm cursor-pointer hover:bg-accent/30 transition-colors"
                                  onClick={() => setSelectedMember(child.id)}
                                >
                                  {child.name.split(' ')[0]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FamilyRelationDiagram;
