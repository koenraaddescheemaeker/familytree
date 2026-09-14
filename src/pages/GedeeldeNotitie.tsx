import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StickyNote, Calendar, Eye, AlertCircle, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface SharedNote {
  id: string;
  share_token: string;
  created_at: string;
  expires_at: string | null;
  view_count: number;
  section_id: string;
  content: string;
  note_created_at: string;
  note_updated_at: string;
}

const GedeeldeNotitie = () => {
  const { t } = useLanguage();
  const { token } = useParams<{ token: string }>();
  const [note, setNote] = useState<SharedNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section names use nav translations
  const getSectionName = (sectionId: string): string => {
    const navKey = `nav.${sectionId.replace('-', '')}`;
    const translated = t(navKey);
    // If no translation found, return the sectionId with first letter capitalized
    if (translated === navKey) {
      return sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ');
    }
    return translated;
  };

  useEffect(() => {
    const fetchSharedNote = async () => {
      if (!token) {
        setError(t('sharedNote.invalidToken'));
        setIsLoading(false);
        return;
      }

      // Validate token format
      if (token.length !== 32 || !/^[a-f0-9]+$/.test(token)) {
        setError(t('sharedNote.invalidFormat'));
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .rpc('get_shared_note', { p_share_token: token });

      if (fetchError) {
        console.error('Error fetching shared note:', fetchError);
        setError(t('sharedNote.fetchError'));
        setIsLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setError(t('sharedNote.notFound'));
        setIsLoading(false);
        return;
      }

      setNote(data[0] as SharedNote);
      setIsLoading(false);
    };

    fetchSharedNote();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-24 max-w-2xl">
          <div className="space-y-4">
            <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
            <div className="h-64 bg-muted/50 rounded-lg animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-24 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive/50" />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t('sharedNote.notFoundTitle')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error || t('sharedNote.notAvailable')}
            </p>
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                {t('sharedNote.goHome')}
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const sectionName = getSectionName(note.section_id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              <StickyNote className="h-4 w-4" />
              {t('sharedNote.badge')}
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              {t('sharedNote.noteFor')} "{sectionName}"
            </h1>
            <p className="text-muted-foreground text-sm">
              {t('sharedNote.fromHistory')}
            </p>
          </div>

          {/* Note Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-lg"
          >
            <p className="whitespace-pre-wrap text-foreground/90 text-lg leading-relaxed">
              {note.content}
            </p>
          </motion.div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {t('sharedNote.lastEdited')}: {new Date(note.note_updated_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{note.view_count} {t('sharedNote.timesViewed')}</span>
            </div>
            {note.expires_at && (
              <div className="flex items-center gap-1 text-amber-600">
                <Clock className="h-4 w-4" />
                <span>
                  {t('sharedNote.expires')}: {new Date(note.expires_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground mb-4">
              {t('sharedNote.discoverMore')}
            </p>
            <Button asChild size="lg">
              <Link to={`/#${note.section_id}`}>
                {t('sharedNote.viewHistory')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default GedeeldeNotitie;
