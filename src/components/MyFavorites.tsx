import { useState, useEffect } from 'react';
import { Heart, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Favorite {
  id: string;
  section_id: string;
  created_at: string;
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

const MyFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setUserId(null);
        setFavorites([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId && isOpen) {
      fetchFavorites();
    }
  }, [userId, isOpen]);

  const fetchFavorites = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFavorites(data);
    }
  };

  const removeFavorite = async (id: string, sectionId: string) => {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', id);

    if (!error) {
      setFavorites(favorites.filter(f => f.id !== id));
      toast.success(`${sectionNames[sectionId] || sectionId} verwijderd uit favorieten`);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!userId) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 relative"
          aria-label="Mijn favorieten"
        >
          <Heart className="h-4 w-4" />
          <span className="hidden md:inline">Favorieten</span>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Mijn Favorieten
          </SheetTitle>
          <SheetDescription>
            Jouw opgeslagen secties voor later
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          <AnimatePresence>
            {favorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nog geen favorieten opgeslagen</p>
                <p className="text-sm mt-2">
                  Klik op het hartje bij een sectie om deze op te slaan
                </p>
              </motion.div>
            ) : (
              favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <button
                    onClick={() => scrollToSection(favorite.section_id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500 flex-shrink-0" />
                    <span className="font-medium text-sm">
                      {sectionNames[favorite.section_id] || favorite.section_id}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFavorite(favorite.id, favorite.section_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyFavorites;
