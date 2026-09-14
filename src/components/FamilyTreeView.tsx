import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Users, Heart, Calendar, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface TreeNode {
  person: Afstammeling;
  children: TreeNode[];
}

interface FamilyTreeViewProps {
  data: Afstammeling[];
}

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

const generatieColors: Record<number, { bg: string; border: string; text: string }> = {
  0: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-700 dark:text-amber-400" },
  1: { bg: "bg-primary/20", border: "border-primary/50", text: "text-primary" },
  2: { bg: "bg-accent/20", border: "border-accent/50", text: "text-accent" },
  3: { bg: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-700 dark:text-emerald-400" },
  4: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-700 dark:text-purple-400" },
};

const TreeNodeComponent = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children.length > 0;
  const leeftijd = berekenLeeftijd(node.person.geboortedatum, node.person.overlijdensdatum);
  const isDeceased = !!node.person.overlijdensdatum;
  const colors = generatieColors[node.person.generatie] || generatieColors[4];

  return (
    <div className="relative">
      {/* Connector line */}
      {level > 0 && (
        <div className="absolute left-0 top-0 w-6 h-1/2 border-l-2 border-b-2 border-border rounded-bl-lg -translate-x-6" />
      )}
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: level * 0.05 }}
        className={`relative ${colors.bg} ${colors.border} border-2 rounded-xl p-4 mb-2 shadow-sm hover:shadow-md transition-shadow`}
      >
        {/* Expand/collapse button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors z-10"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Person icon */}
          <div className={`w-10 h-10 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}>
            <User className={`w-5 h-5 ${colors.text}`} />
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-muted-foreground">{node.person.nr}</span>
              <h4 className={`font-semibold ${isDeceased ? 'text-muted-foreground' : 'text-foreground'}`}>
                {node.person.naam}
                {isDeceased && <span className="ml-1 text-xs">†</span>}
              </h4>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
              {node.person.geboortedatum && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {node.person.geboortedatum}
                  {node.person.overlijdensdatum && ` - ${node.person.overlijdensdatum}`}
                </span>
              )}
              {leeftijd !== null && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                  {leeftijd} jaar{isDeceased ? '' : ''}
                </span>
              )}
            </div>

            {/* Partner info */}
            {node.person.partners.length > 0 && (
              <div className="mt-2 space-y-1">
                {node.person.partners.map((partner, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Heart className={`w-3 h-3 ${node.person.partners.length > 1 ? 'text-rose-400' : 'text-rose-500'}`} />
                    <span className="text-foreground">{partner.naam}</span>
                    {partner.huwelijksdatum && (
                      <span className="text-muted-foreground text-xs">({partner.huwelijksdatum})</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Children count badge */}
          {hasChildren && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
              <Users className="w-3 h-3" />
              {node.children.length}
            </div>
          )}
        </div>
      </motion.div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="ml-8 pl-4 border-l-2 border-border"
        >
          {node.children.map((child, idx) => (
            <TreeNodeComponent key={child.person.nr} node={child} level={level + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const FamilyTreeView = ({ data }: FamilyTreeViewProps) => {
  const { t } = useLanguage();

  // Build tree structure from flat data
  const treeData = useMemo(() => {
    // Find root (Marcel - generatie 0)
    const root = data.find(p => p.generatie === 0);
    if (!root) return null;

    // Helper to find children based on nr pattern
    const findChildren = (parentNr: string, parentGeneratie: number): TreeNode[] => {
      const cleanParentNr = parentNr.replace(/\.$/, '');
      
      return data
        .filter(p => {
          if (p.generatie !== parentGeneratie + 1) return false;
          
          const cleanNr = p.nr.replace(/\.$/, '');
          
          // For root (generatie 0), find all generatie 1
          if (parentGeneratie === 0) {
            // Generatie 1 has simple numbers like "1", "2", etc.
            return !cleanNr.includes('.');
          }
          
          // For others, check if this is a direct child
          const parts = cleanNr.split('.');
          const parentParts = cleanParentNr.split('.');
          
          // Child should have exactly one more level
          if (parts.length !== parentParts.length + 1) return false;
          
          // All parent parts should match
          for (let i = 0; i < parentParts.length; i++) {
            if (parts[i] !== parentParts[i]) return false;
          }
          
          return true;
        })
        .map(child => ({
          person: child,
          children: findChildren(child.nr, child.generatie)
        }))
        .sort((a, b) => {
          // Sort by nr
          const aNr = a.person.nr.replace(/\.$/, '').split('.').map(Number);
          const bNr = b.person.nr.replace(/\.$/, '').split('.').map(Number);
          for (let i = 0; i < Math.max(aNr.length, bNr.length); i++) {
            if ((aNr[i] || 0) !== (bNr[i] || 0)) {
              return (aNr[i] || 0) - (bNr[i] || 0);
            }
          }
          return 0;
        });
    };

    return {
      person: root,
      children: findChildren(root.nr, root.generatie)
    } as TreeNode;
  }, [data]);

  // Legend
  const legend = [
    { gen: 0, label: t('marcel.gen0') },
    { gen: 1, label: t('marcel.gen1') },
    { gen: 2, label: t('marcel.gen2') },
    { gen: 3, label: t('marcel.gen3') },
    { gen: 4, label: t('marcel.gen4') },
  ];

  if (!treeData) {
    return <div className="text-muted-foreground">Geen data gevonden</div>;
  }

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium text-muted-foreground mr-2">Legenda:</span>
        {legend.map(({ gen, label }) => {
          const colors = generatieColors[gen];
          return (
            <span
              key={gen}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${colors.bg} ${colors.border} border ${colors.text}`}
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* Tree */}
      <div className="p-4">
        <TreeNodeComponent node={treeData} level={0} />
      </div>
    </div>
  );
};

export default FamilyTreeView;
