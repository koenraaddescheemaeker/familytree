import { useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

export const useSectionTracker = (sectionId: string) => {
  const { markSectionVisited } = useGame();
  const hasBeenVisible = useRef(false);

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
      { threshold: 0.3 } // 30% of the section must be visible
    );

    // Find the section element by id
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId, markSectionVisited]);
};
