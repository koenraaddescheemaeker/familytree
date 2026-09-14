import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Trash2, Edit3, Save, X, ArrowLeft, ExternalLink, Search, Download, FileText, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ShareNoteButton from '@/components/ShareNoteButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface Note {
  id: string;
  section_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const MijnNotities = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // Get section name using nav translations
  const getSectionName = (sectionId: string): string => {
    const navKey = `nav.${sectionId.replace('-', '')}`;
    const translated = t(navKey);
    if (translated === navKey) {
      return sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ');
    }
    return translated;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUserId(session.user.id);
      fetchNotes(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchNotes = async (uid: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', uid)
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
    setIsLoading(false);
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
      if (userId) fetchNotes(userId);
      toast.success(t('myNotes.updated'));
    } else {
      toast.error(t('myNotes.updateError'));
    }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('user_notes')
      .delete()
      .eq('id', id);

    if (!error) {
      setNotes(notes.filter(n => n.id !== id));
      toast.success(t('myNotes.deleted'));
    } else {
      toast.error(t('myNotes.deleteError'));
    }
  };

  const goToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  // Export functions
  const generateTextContent = () => {
    const groupedNotes = notes.reduce((acc, note) => {
      if (!acc[note.section_id]) {
        acc[note.section_id] = [];
      }
      acc[note.section_id].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    let content = '═══════════════════════════════════════════\n';
    content += `        ${t('myNotes.exportTitle')}\n`;
    content += '═══════════════════════════════════════════\n\n';
    content += `${t('myNotes.exportedOn')}: ${new Date().toLocaleDateString()}\n`;
    content += `${t('myNotes.totalNotes')}: ${notes.length}\n\n`;
    content += '───────────────────────────────────────────\n\n';

    Object.entries(groupedNotes).forEach(([sectionId, sectionNotes]) => {
      const sectionName = getSectionName(sectionId);
      content += `▌ ${sectionName.toUpperCase()}\n`;
      content += '─'.repeat(40) + '\n\n';

      sectionNotes.forEach((note, index) => {
        content += `  ${index + 1}. ${note.content}\n\n`;
        content += `     📅 ${new Date(note.updated_at).toLocaleDateString()}\n\n`;
      });
      content += '\n';
    });

    content += '───────────────────────────────────────────\n';
    content += '  Deforce Familiegeschiedenis - boekdeforce600.lovable.app\n';
    content += '═══════════════════════════════════════════\n';

    return content;
  };

  const exportAsText = () => {
    if (notes.length === 0) {
      toast.error(t('myNotes.noNotesToExport'));
      return;
    }

    const content = generateTextContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mijn-notities-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t('myNotes.exportedText'));
  };

  const exportAsMarkdown = () => {
    if (notes.length === 0) {
      toast.error(t('myNotes.noNotesToExport'));
      return;
    }

    const groupedNotes = notes.reduce((acc, note) => {
      if (!acc[note.section_id]) {
        acc[note.section_id] = [];
      }
      acc[note.section_id].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    let content = `# ${t('myNotes.title')} - Deforce Familiegeschiedenis\n\n`;
    content += `> ${t('myNotes.exportedOn')} ${new Date().toLocaleDateString()}\n\n`;
    content += `**${t('myNotes.totalNotes')}:** ${notes.length}\n\n---\n\n`;

    Object.entries(groupedNotes).forEach(([sectionId, sectionNotes]) => {
      const sectionName = getSectionName(sectionId);
      content += `## ${sectionName}\n\n`;

      sectionNotes.forEach((note) => {
        content += `### 📝 Note\n\n`;
        content += `${note.content}\n\n`;
        content += `*${t('myNotes.lastEdited')}: ${new Date(note.updated_at).toLocaleDateString()}*\n\n`;
        content += '---\n\n';
      });
    });

    content += '\n---\n\n*[Deforce Familiegeschiedenis](https://boekdeforce600.lovable.app)*\n';

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mijn-notities-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t('myNotes.exportedMarkdown'));
  };

  const exportAsHtml = () => {
    if (notes.length === 0) {
      toast.error(t('myNotes.noNotesToExport'));
      return;
    }

    const groupedNotes = notes.reduce((acc, note) => {
      if (!acc[note.section_id]) {
        acc[note.section_id] = [];
      }
      acc[note.section_id].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    let content = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('myNotes.title')} - Deforce Familiegeschiedenis</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: Georgia, 'Times New Roman', serif; 
      line-height: 1.6; 
      color: #2c2c2c; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px 20px;
      background: #faf9f6;
    }
    h1 { 
      color: #8B4513; 
      margin-bottom: 10px; 
      font-size: 2.5em;
      border-bottom: 3px double #8B4513;
      padding-bottom: 15px;
    }
    .meta { 
      color: #666; 
      margin-bottom: 30px; 
      font-style: italic;
    }
    h2 { 
      color: #A0522D; 
      margin: 40px 0 20px; 
      font-size: 1.5em;
      border-left: 4px solid #8B4513;
      padding-left: 15px;
    }
    .note { 
      background: white; 
      border: 1px solid #e0d5c5; 
      border-radius: 8px; 
      padding: 20px; 
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .note-content { 
      white-space: pre-wrap; 
      margin-bottom: 10px;
    }
    .note-date { 
      font-size: 0.85em; 
      color: #888; 
      font-style: italic;
      border-top: 1px solid #e0d5c5;
      padding-top: 10px;
      margin-top: 10px;
    }
    footer { 
      margin-top: 50px; 
      text-align: center; 
      color: #888; 
      font-size: 0.9em;
      border-top: 1px solid #e0d5c5;
      padding-top: 20px;
    }
    a { color: #8B4513; }
    @media print {
      body { background: white; }
      .note { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>📝 ${t('myNotes.title')}</h1>
  <p class="meta">
    Deforce Familiegeschiedenis<br>
    ${t('myNotes.exportedOn')} ${new Date().toLocaleDateString()}<br>
    <strong>${notes.length} ${notes.length === 1 ? t('myNotes.noteCountSingular') : t('myNotes.noteCount')}</strong>
  </p>
`;

    Object.entries(groupedNotes).forEach(([sectionId, sectionNotes]) => {
      const sectionName = getSectionName(sectionId);
      content += `  <h2>${sectionName}</h2>\n`;

      sectionNotes.forEach((note) => {
        const escapedContent = note.content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        content += `  <div class="note">
    <div class="note-content">${escapedContent}</div>
    <div class="note-date">${t('myNotes.lastEdited')}: ${new Date(note.updated_at).toLocaleDateString()}</div>
  </div>\n`;
      });
    });

    content += `
  <footer>
    <p>Deforce Familiegeschiedenis</p>
    <p><a href="https://boekdeforce600.lovable.app">boekdeforce600.lovable.app</a></p>
  </footer>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mijn-notities-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t('myNotes.exportedHtml'));
  };

  const filteredNotes = notes.filter(note => {
    const sectionName = getSectionName(note.section_id);
    return (
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sectionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Group notes by section
  const groupedNotes = filteredNotes.reduce((acc, note) => {
    if (!acc[note.section_id]) {
      acc[note.section_id] = [];
    }
    acc[note.section_id].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
                <StickyNote className="h-8 w-8" />
                {t('myNotes.title')}
              </h1>
              <p className="text-muted-foreground mt-1">
                {notes.length} {notes.length === 1 ? t('myNotes.noteCountSingular') : t('myNotes.noteCount')}
              </p>
            </div>
            {notes.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('myNotes.export')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportAsText} className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    {t('myNotes.exportText')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportAsMarkdown} className="gap-2 cursor-pointer">
                    <FileDown className="h-4 w-4" />
                    {t('myNotes.exportMarkdown')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportAsHtml} className="gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    {t('myNotes.exportHtml')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('myNotes.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Notes List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <StickyNote className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              {searchQuery ? (
                <>
                  <h2 className="text-xl font-medium text-muted-foreground mb-2">
                    {t('myNotes.noResults')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('myNotes.tryOtherSearch')}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-medium text-muted-foreground mb-2">
                    {t('myNotes.noNotes')}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t('myNotes.addNotes')}
                  </p>
                  <Button onClick={() => navigate('/')}>
                    {t('myNotes.goToHistory')}
                  </Button>
                </>
              )}
            </motion.div>
          ) : (
            <div className="space-y-8">
              <AnimatePresence>
                {Object.entries(groupedNotes).map(([sectionId, sectionNotes]) => (
                  <motion.div
                    key={sectionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    {/* Section Header */}
                    <div className="flex items-center justify-between">
                      <h2 className="font-serif text-xl font-semibold text-primary">
                        {getSectionName(sectionId)}
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => goToSection(sectionId)}
                        className="text-muted-foreground hover:text-primary gap-1"
                      >
                        {t('myNotes.goToSection')}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Notes for this section */}
                    <div className="space-y-3">
                      {sectionNotes.map((note) => (
                        <motion.div
                          key={note.id}
                          layout
                          className="p-4 rounded-lg bg-card border border-border shadow-sm"
                        >
                          {editingId === note.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="min-h-[100px]"
                                autoFocus
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
                                  <X className="h-4 w-4 mr-1" />
                                  {t('myNotes.cancel')}
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateNote(note.id)}
                                  disabled={!editContent.trim()}
                                >
                                  <Save className="h-4 w-4 mr-1" />
                                  {t('myNotes.save')}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="whitespace-pre-wrap text-foreground/90 mb-3">
                                {note.content}
                              </p>
                              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                <span className="text-xs text-muted-foreground">
                                  {t('myNotes.lastEdited')}: {new Date(note.updated_at).toLocaleDateString()}
                                </span>
                                <div className="flex gap-1">
                                  {userId && (
                                    <ShareNoteButton noteId={note.id} userId={userId} />
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingId(note.id);
                                      setEditContent(note.content);
                                    }}
                                  >
                                    <Edit3 className="h-4 w-4 mr-1" />
                                    {t('myNotes.edit')}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => deleteNote(note.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    {t('myNotes.delete')}
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default MijnNotities;
