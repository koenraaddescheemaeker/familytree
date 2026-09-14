import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FavoriteButtonProps {
  sectionId: string;
  sectionName: string;
}

const FavoriteButton = ({ sectionId, sectionName }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        checkFavorite(session.user.id);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        checkFavorite(session.user.id);
      } else {
        setUserId(null);
        setIsFavorite(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [sectionId]);

  const checkFavorite = async (uid: string) => {
    const { data } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', uid)
      .eq('section_id', sectionId)
      .maybeSingle();
    
    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', userId)
          .eq('section_id', sectionId);
        
        setIsFavorite(false);
        toast.success(`${sectionName} ${t('section.removedFromFavorites')}`);
      } else {
        await supabase
          .from('user_favorites')
          .insert({ user_id: userId, section_id: sectionId });
        
        setIsFavorite(true);
        toast.success(`${sectionName} ${t('section.addedToFavorites')}`);
      }
    } catch (error) {
      toast.error(t('section.somethingWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className="gap-2 text-muted-foreground hover:text-primary"
      aria-label={isFavorite ? t('section.removeFromFavorites') : t('section.addToFavorites')}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isFavorite ? 'filled' : 'empty'}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </motion.div>
      </AnimatePresence>
      <span className="hidden sm:inline text-xs">
        {t('section.favorite')}
      </span>
    </Button>
  );
};

export default FavoriteButton;