import { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';

interface Note {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface SectionNotesProps {
  sectionId: string;
  sectionName: string;
}

const SectionNotes = ({ sectionId, sectionName }: SectionNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [editContent, setEditContent] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const { t, language } = useLanguage();

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
        setNotes([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId && isOpen) {
      fetchNotes();
    }
  }, [userId, isOpen, sectionId]);

  const fetchNotes = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', userId)
      .eq('section_id', sectionId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
  };

  const addNote = async () => {
    if (!userId || !newNote.trim()) return;

    const { error } = await supabase
      .from('user_notes')
      .insert({ 
        user_id: userId, 
        section_id: sectionId, 
        content: newNote.trim() 
      });

    if (!error) {
      setNewNote('');
      setIsAdding(false);
      fetchNotes();
      toast.success(t('section.noteSaved'));
    } else {
      toast.error(t('section.couldNotSave'));
    }
  };

  const updateNote = async (id: string) => {
    if (!editContent.trim()) return;

    const { error } = await supabase
      .from('user_notes')
      .update({ content: editContent.trim() })
      .eq('id', id);

    if (!error) {
      setEditingId(null);
      setEditContent('');
      fetchNotes();
      toast.success(t('section.noteUpdated'));
    } else {
      toast.error(t('section.couldNotUpdate'));
    }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('user_notes')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchNotes();
      toast.success(t('section.noteDeleted'));
    } else {
      toast.error(t('section.couldNotDelete'));
    }
  };

  // Get the appropriate locale for date formatting
  const getLocale = () => {
    const localeMap: Record<string, string> = {
      nl: 'nl-NL',
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      es: 'es-ES',
      pcd: 'fr-FR',
      vls: 'nl-BE'
    };
    return localeMap[language] || 'nl-NL';
  };

  if (!userId) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary relative"
          aria-label={t('section.viewNotes')}
        >
          <StickyNote className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{t('section.notes')}</span>
          {notes.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
              {notes.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{t('section.notesFor')} {sectionName}</h4>
            {!isAdding && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdding(true)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Textarea
                  placeholder={t('section.writeNote')}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAdding(false);
                      setNewNote('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={addNote}
                    disabled={!newNote.trim()}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {t('section.save')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notes.length === 0 && !isAdding ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t('section.noNotes')}
              </p>
            ) : (
              notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-muted/50 space-y-2"
                >
                  {editingId === note.id ? (
                    <>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingId(null);
                            setEditContent('');
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateNote(note.id)}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.updated_at).toLocaleDateString(getLocale())}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setEditingId(note.id);
                              setEditContent(note.content);
                            }}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => deleteNote(note.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SectionNotes;