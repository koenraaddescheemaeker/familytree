import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import UserSectionTools from './UserSectionTools';
import { supabase } from '@/integrations/supabase/client';

interface SectionTrackerProps {
  sectionId: string;
  children: React.ReactNode;
}

const sectionNames: Record<string, string> = {
  'voorwoord': 'Voorwoord',
  'tijdlijn': 'Tijdlijn',
  'zoektocht': 'De Zoektocht',
  'naamgeschiedenis': 'Naamgeschiedenis',
  'picardisch': 'Picardisch Dialect',
  'historische-kaart': 'Historische Kaart',
  'kaart': 'Interactieve Kaart',
  'stamouders': 'Stamouders',
  'oorlogen': 'Oorlogsgeschiedenis',
  'oorlogskaart': 'Oorlogskaart',
  'vakmanschap': 'Vakmanschap',
  'charles-louis': 'Charles Louis',
  'generaties': 'Generatie Tijdlijn',
  'galerij': 'Fotogalerij',
  'videos': 'Videogalerij',
  'stamboom': 'Stamboom',
  'familie': 'Familie',
  'bronnen': 'Bronnen',
  'quiz': 'Quiz',
  'spellen': 'Spellen',
  'gastboek': 'Gastboek',
  'contact': 'Contact',
};

const SectionTracker = ({ sectionId, children }: SectionTrackerProps) => {
  const { markSectionVisited } = useGame();
  const hasBeenVisible = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible.current) {
            hasBeenVisible.current = true;
            markSectionVisited(sectionId);
          }
        });
      },
      { threshold: 0.2 } // 20% of the section must be visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [sectionId, markSectionVisited]);

  return (
    <div ref={elementRef} id={sectionId} className="relative">
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm border border-border/50">
          <UserSectionTools 
            sectionId={sectionId} 
            sectionName={sectionNames[sectionId] || sectionId} 
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionTracker;
