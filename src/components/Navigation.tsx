import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Search, ChevronDown, Check, Volume2, VolumeX, Trophy, Type, Contrast, FileDown, Eye, LogIn, LogOut, User, Menu, X, BookOpen, Settings, Heart, StickyNote, BarChart3, Shield, Star, Users, TreePine, Scroll, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame, ALL_SECTIONS } from "@/contexts/GameContext";
import { useReadingMode } from "@/contexts/ReadingModeContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import AchievementOverview from "./AchievementOverview";
import Leaderboard from "./Leaderboard";
import KeyboardShortcuts from "./KeyboardShortcuts";
import PdfExport from "./PdfExport";
import PrintPreview from "./PrintPreview";
import FlagIcon from "./ui/FlagIcon";
import MyFavorites from "./MyFavorites";
import { Medal, Keyboard } from "lucide-react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { useAchievementSound } from "@/hooks/useAchievementSound";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPdfExportOpen, setIsPdfExportOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newGuestbookCount, setNewGuestbookCount] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isSoundMuted, toggleSoundMute, achievements, visitedSections } = useGame();
  const { fontSize, setFontSize, highContrast, toggleHighContrast } = useReadingMode();
  const { playNotificationSound } = useAchievementSound();
  const { toast } = useToast();
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const fontSizeRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const previousCountRef = useRef(0);
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const sectionsVisited = visitedSections.size;
  const totalSections = ALL_SECTIONS.length;
  const progressPercentage = Math.round((sectionsVisited / totalSections) * 100);

  // Check for new guestbook entries
  useEffect(() => {
    const checkNewGuestbookEntries = async (isRealtime = false) => {
      const lastVisit = localStorage.getItem('lastGuestbookVisit');
      const lastVisitDate = lastVisit ? new Date(lastVisit) : new Date(0);
      
      // Use public view to protect visitor privacy (excludes visitor_id)
      const { data, error } = await supabase
        .from('guestbook_entries_public')
        .select('id, created_at, name')
        .gt('created_at', lastVisitDate.toISOString())
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        const newCount = data.length;
        // Play sound and show toast only when count increases from realtime update
        if (isRealtime && newCount > previousCountRef.current && data[0]) {
          playNotificationSound();
          toast({
            title: "Nieuw gastboekbericht",
            description: `${data[0].name} heeft een bericht achtergelaten`,
          });
        }
        previousCountRef.current = newCount;
        setNewGuestbookCount(newCount);
      }
    };

    checkNewGuestbookEntries(false);

    // Subscribe to new guestbook entries
    const channel = supabase
      .channel('guestbook-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook_entries',
          filter: 'approved=eq.true'
        },
        () => {
          checkNewGuestbookEntries(true);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'guestbook_entries'
        },
        () => {
          checkNewGuestbookEntries(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playNotificationSound, toast]);

  const markGuestbookAsRead = () => {
    localStorage.setItem('lastGuestbookVisit', new Date().toISOString());
    setNewGuestbookCount(0);
  };

  // Auth state and admin check
  useEffect(() => {
    const checkAdminRole = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);
        
        if (!error && data) {
          setIsAdmin(data.some(r => r.role === "admin"));
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => checkAdminRole(session.user.id), 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'nl', label: 'NL', nativeName: 'Nederlands' },
    { code: 'vls', label: 'VLS', nativeName: 'West-Vlams' },
    { code: 'fr', label: 'FR', nativeName: 'Français' },
    { code: 'pcd', label: 'PCD', nativeName: 'Picard' },
    { code: 'en', label: 'EN', nativeName: 'English' },
    { code: 'es', label: 'ES', nativeName: 'Español' },
    { code: 'de', label: 'DE', nativeName: 'Deutsch' },
    { code: 'sv', label: 'SV', nativeName: 'Svenska' },
  ];

  // Define important chapters with icons for visual distinction
  const importantChapters = ['#voorwoord', '#stamouders', '#grootouders', '#stamboom'];
  
  const getChapterIcon = (href: string) => {
    switch (href) {
      case '#voorwoord': return Scroll;
      case '#stamouders': return TreePine;
      case '#grootouders': return Users;
      case '#stamboom': return Star;
      case '#gedcom-import': return Upload;
      case '/grootouderboek': return BookOpen;
      default: return null;
    }
  };

  const navItems = [
    { label: t('nav.voorwoord'), href: "#voorwoord" },
    { label: t('nav.tijdlijn'), href: "#tijdlijn" },
    { label: t('nav.zoektocht'), href: "#zoektocht" },
    { label: t('nav.kaart'), href: "#kaart" },
    { label: t('nav.stamouders'), href: "#stamouders" },
    { label: t('nav.oorlogen'), href: "#oorlogen" },
    { label: t('nav.oorlogskaart'), href: "#oorlogskaart" },
    { label: t('nav.vakmanschap'), href: "#vakmanschap" },
    { label: t('nav.charles-louis'), href: "#charles-louis" },
    { label: t('nav.emile-geldof'), href: "#emile-geldof" },
    { label: t('nav.grootouders'), href: "#grootouders" },
    { label: t('nav.generaties'), href: "#generaties" },
    { label: t('nav.picardisch'), href: "#picardisch" },
    { label: t('nav.galerij'), href: "#galerij" },
    { label: t('nav.historischeKaart'), href: "#historische-kaart" },
    { label: t('nav.mandelvallei'), href: "#mandelvallei" },
    { label: t('nav.izegemTijdlijn'), href: "#izegem-tijdlijn" },
    { label: t('nav.stamboom'), href: "#stamboom" },
    { label: t('nav.gedcomImport'), href: "#gedcom-import" },
    { label: t('nav.familiebedrijf'), href: "#familiebedrijf" },
    { label: t('nav.ouders'), href: "#ouders" },
    { label: t('nav.verschaeve'), href: "#verschaeve" },
    { label: t('nav.dna'), href: "#dna-onderzoek" },
    { label: t('nav.burgemeesters'), href: "#burgemeesters" },
    { label: t('nav.videos'), href: "#videos" },
    { label: t('nav.bijlagen'), href: "#familie" },
    { label: t('nav.grootouderboek'), href: "/grootouderboek" },
    { label: t('nav.bronnen'), href: "#bronnen" },
    { label: t('nav.quiz'), href: "#quiz" },
    { label: t('nav.spellen'), href: "#spellen" },
    { label: t('nav.gastenboek'), href: "#gastenboek" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (fontSizeRef.current && !fontSizeRef.current.contains(event.target as Node)) {
        setIsFontSizeOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fontSizeOptions = [
    { value: 'normal' as const, label: { nl: 'Normaal', fr: 'Normal', en: 'Normal', es: 'Normal', pcd: 'Normal', vls: 'Normoal', de: 'Normal', sv: 'Normal' } },
    { value: 'large' as const, label: { nl: 'Groot', fr: 'Grand', en: 'Large', es: 'Grande', pcd: 'Grand', vls: 'Groôt', de: 'Groß', sv: 'Stor' } },
    { value: 'extra-large' as const, label: { nl: 'Extra groot', fr: 'Très grand', en: 'Extra large', es: 'Muy grande', pcd: 'Très grand', vls: 'Ekstra groôt', de: 'Sehr groß', sv: 'Extra stor' } },
  ];

  const readingModeLabel: Record<string, string> = {
    nl: 'Tekstgrootte',
    fr: 'Taille du texte',
    en: 'Text size',
    es: 'Tamaño del texto',
    pcd: 'Taille du tecse',
    vls: 'Tektstgrootte',
    de: 'Schriftgröße',
    sv: 'Textstorlek',
  };

  const highContrastLabel: Record<string, string> = {
    nl: 'Hoog contrast',
    fr: 'Contraste élevé',
    en: 'High contrast',
    es: 'Alto contraste',
    pcd: 'Haut contraste',
    vls: 'Hôog contrast',
    de: 'Hoher Kontrast',
    sv: 'Hög kontrast',
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Ctrl/Cmd + K: Search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Alt + H: Toggle high contrast
      if (e.altKey && e.key === "h") {
        e.preventDefault();
        toggleHighContrast();
      }
      
      // Alt + T: Cycle font size
      if (e.altKey && e.key === "t") {
        e.preventDefault();
        setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'extra-large' : 'normal');
      }
      
      // Alt + D: Toggle dark/light theme
      if (e.altKey && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
      
      // Alt + M: Toggle sound mute
      if (e.altKey && e.key === "m") {
        e.preventDefault();
        toggleSoundMute();
      }
      
      // ?: Show keyboard shortcuts
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
      
      // Ctrl/Cmd + Shift + P: Open print preview
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "p") {
        e.preventDefault();
        setIsPrintPreviewOpen(true);
        return;
      }
      
      // Ctrl/Cmd + P: Open PDF export
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        setIsPdfExportOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fontSize, toggleHighContrast, setFontSize, toggleTheme, toggleSoundMute]);

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setIsLanguageOpen(false);
  };

  return (
    <>
    <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    <AchievementOverview isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
    <Leaderboard isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    <KeyboardShortcuts isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    <PdfExport isOpen={isPdfExportOpen} onClose={() => setIsPdfExportOpen(false)} />
    <PrintPreview isOpen={isPrintPreviewOpen} onClose={() => setIsPrintPreviewOpen(false)} />
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="navigation"
      aria-label="Hoofdnavigatie"
      style={{ top: 'var(--register-banner-offset, 0px)' }}
      className={`fixed left-0 right-0 z-[900] transition-all duration-300 print:hidden ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-vintage py-3"
          : "bg-transparent py-6"
      }`}
    >
      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/30"
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Leesvoortgang: ${progressPercentage}%`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-accent via-gold to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-serif text-xl md:text-2xl font-semibold text-primary hover:text-accent transition-colors"
            aria-label="Deforce Familiegeschiedenis - Ga naar begin"
          >
            Deforce
          </a>
          {/* Progress indicator */}
          {isScrolled && progressPercentage > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20"
              aria-hidden="true"
            >
              <div className="w-12 h-1.5 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] font-medium text-accent tabular-nums">
                {progressPercentage}%
              </span>
            </motion.div>
          )}
        </div>

        {/* Desktop Navigation - Reduced to 7 items + Chapters dropdown */}
        <div className="hidden xl:flex items-center gap-3">
          <ul className="flex items-center gap-3" role="menubar" aria-label="Secties">
            {navItems.slice(0, 7).map((item) => (
              <li key={item.href} role="none" className="shrink-0">
                <a
                  href={item.href}
                  role="menuitem"
                  className="font-sans text-[10px] uppercase tracking-wider text-foreground/90 drop-shadow-sm hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Desktop Chapters Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                aria-label={language === 'sv' ? 'Alla kapitel' : language === 'de' ? 'Alle Kapitel' : language === 'en' ? 'All chapters' : language === 'fr' ? 'Tous les chapitres' : language === 'es' ? 'Todos los capítulos' : language === 'pcd' ? 'Tous chés capitres' : language === 'vls' ? 'Alle hoofdstukken' : 'Alle hoofdstukken'}
              >
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <ChevronDown className="w-3 h-3 text-primary" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 max-h-[70vh] overflow-y-auto bg-card border border-border shadow-elevated z-[950]"
            >
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                {language === 'sv' ? 'Alla kapitel' : language === 'de' ? 'Alle Kapitel' : language === 'en' ? 'All chapters' : language === 'fr' ? 'Tous les chapitres' : language === 'es' ? 'Todos los capítulos' : language === 'pcd' ? 'Tous chés capitres' : language === 'vls' ? 'Alle hoofdstukken' : 'Alle hoofdstukken'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <a href="/hoofdstukken" className="w-full flex items-center gap-2 text-sm font-medium text-primary">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {language === 'sv' ? 'Kapitelöversikt' : language === 'de' ? 'Kapitelübersicht' : language === 'en' ? 'Chapter overview' : language === 'fr' ? 'Aperçu des chapitres' : language === 'es' ? 'Índice de capítulos' : language === 'pcd' ? 'Aperchu dés capitres' : 'Hoofdstukoverzicht'}
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {navItems.map((item) => {
                const Icon = getChapterIcon(item.href);
                const isImportant = importantChapters.includes(item.href);
                const isGame = item.href === '#spellen';
                return (
                  <DropdownMenuItem key={item.href} asChild className={`cursor-pointer ${isImportant ? 'bg-primary/5' : ''} ${isGame ? 'opacity-70' : ''}`}>
                    <a
                      href={item.href}
                      className={`w-full flex items-center gap-2 text-sm ${isImportant ? 'text-primary font-medium' : isGame ? 'text-muted-foreground' : 'text-foreground'}`}
                    >
                      {Icon && <Icon className={`w-4 h-4 ${isGame ? 'text-muted-foreground' : 'text-primary'}`} />}
                      {item.label}
                      {isImportant && <Star className="w-3 h-3 text-gold ml-auto fill-gold" />}
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Overledenen - standalone nav button */}
          <a
            href="/overledenen"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors border border-accent/20 text-[10px] uppercase tracking-wider font-medium text-accent whitespace-nowrap"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {language === 'sv' ? 'Avlidna' : language === 'de' ? 'Verstorbene' : language === 'en' ? 'Deceased' : language === 'fr' ? 'Décédés' : language === 'es' ? 'Fallecidos' : language === 'pcd' ? 'Décédés' : language === 'vls' ? 'Overledenen' : 'Overledenen'}
          </a>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Overledenen - visible on tablet (md to xl) */}
          <a
            href="/overledenen"
            className="hidden md:flex xl:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent hover:bg-accent/90 transition-colors text-accent-foreground text-xs uppercase tracking-wider font-semibold whitespace-nowrap shadow-sm"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'sv' ? 'Avlidna' : language === 'de' ? 'Verstorbene' : language === 'en' ? 'Deceased' : language === 'fr' ? 'Décédés' : language === 'es' ? 'Fallecidos' : language === 'pcd' ? 'Décédés' : language === 'vls' ? 'Overledenen' : 'Overledenen'}</span>
          </a>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
            aria-label={t('nav.search')}
          >
            <Search className="w-3.5 h-3.5 text-primary" />
          </button>

          {/* Achievements Button - Always visible */}
          <button
            onClick={() => setIsAchievementsOpen(true)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors border border-gold/30"
            aria-label="Achievements"
          >
            <Trophy className="w-3.5 h-3.5 text-gold" />
            {unlockedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-gold-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {unlockedCount}
              </span>
            )}
          </button>

          {/* My Favorites - Only for logged in users */}
          <MyFavorites />
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
            aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-primary" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
              aria-label={t('nav.chooseLanguage')}
              aria-expanded={isLanguageOpen}
            >
              <FlagIcon language={language} className="w-5 h-4" />
              <ChevronDown className={`w-3 h-3 text-primary transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-lg shadow-elevated overflow-hidden z-50"
                >
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                          language === lang.code 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FlagIcon language={lang.code} className="w-5 h-4" />
                          <span>{lang.nativeName}</span>
                        </div>
                        {language === lang.code && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login/User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20 text-sm font-medium text-primary"
                  aria-label={language === 'sv' ? 'Användarmeny' : language === 'de' ? 'Benutzermenü' : language === 'en' ? 'User menu' : language === 'fr' ? 'Menu utilisateur' : language === 'es' ? 'Menú de usuario' : language === 'pcd' ? "Menu d'utilisateur" : language === 'vls' ? 'Gebruukersmenu' : 'Gebruikersmenu'}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline max-w-20 truncate">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg z-50">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/auth')} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  {language === 'sv' ? 'Profil' : language === 'de' ? 'Profil' : language === 'en' ? 'Profile' : language === 'fr' ? 'Profil' : language === 'es' ? 'Perfil' : language === 'pcd' ? 'Profil' : language === 'vls' ? 'Profiel' : 'Profiel'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/instellingen')} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  {language === 'sv' ? 'Inställningar' : language === 'de' ? 'Einstellungen' : language === 'en' ? 'Settings' : language === 'fr' ? 'Paramètres' : language === 'es' ? 'Configuración' : language === 'pcd' ? 'Paramètres' : language === 'vls' ? 'Instellingen' : 'Instellingen'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/mijn-notities')} className="cursor-pointer">
                  <StickyNote className="w-4 h-4 mr-2" />
                  {language === 'sv' ? 'Mina Anteckningar' : language === 'de' ? 'Meine Notizen' : language === 'en' ? 'My Notes' : language === 'fr' ? 'Mes Notes' : language === 'es' ? 'Mis Notas' : language === 'pcd' ? 'Mes Notes' : language === 'vls' ? 'Myn Nôoties' : 'Mijn Notities'}
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Admin
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate('/admin/analytics')} className="cursor-pointer">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/moderatie')} className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {language === 'sv' ? 'Gästbok Moderering' : language === 'de' ? 'Gästebuch Moderation' : language === 'en' ? 'Guestbook Moderation' : language === 'fr' ? 'Modération Livre d\'or' : language === 'es' ? 'Moderación Libro de visitas' : language === 'pcd' ? 'Modération Livre d\'or' : language === 'vls' ? 'Gastboek Moderatie' : 'Gastboek Moderatie'}
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  {language === 'sv' ? 'Logga ut' : language === 'de' ? 'Abmelden' : language === 'en' ? 'Logout' : language === 'fr' ? 'Déconnexion' : language === 'es' ? 'Cerrar sesión' : language === 'pcd' ? 'Déconnexion' : language === 'vls' ? 'Uutloggn' : 'Uitloggen'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-accent hover:bg-accent/90 transition-colors text-accent-foreground text-sm font-medium"
              aria-label={language === 'sv' ? 'Logga in' : language === 'de' ? 'Anmelden' : language === 'en' ? 'Login' : language === 'fr' ? 'Connexion' : language === 'es' ? 'Iniciar sesión' : language === 'pcd' ? 'Connexion' : language === 'vls' ? 'Inloggn' : 'Inloggen'}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'sv' ? 'Logga in' : language === 'de' ? 'Anmelden' : language === 'en' ? 'Login' : language === 'fr' ? 'Connexion' : language === 'es' ? 'Iniciar' : language === 'pcd' ? 'Connexion' : language === 'vls' ? 'Inloggn' : 'Inloggen'}</span>
            </button>
          )}
          {/* Tools Hamburger Menu */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
              aria-label="Menu"
              aria-expanded={isToolsMenuOpen}
            >
              {isToolsMenuOpen ? (
                <X className="w-4 h-4 text-primary" />
              ) : (
                <Menu className="w-4 h-4 text-primary" />
              )}
            </button>

            <AnimatePresence>
              {isToolsMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated overflow-hidden z-50"
                >
                  <div className="py-2">
                    {/* Auth */}
                    {user ? (
                      <button
                        onClick={() => { handleLogout(); setIsToolsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-primary" />
                        <span>{language === 'sv' ? 'Logga ut' : language === 'de' ? 'Abmelden' : language === 'en' ? 'Logout' : language === 'fr' ? 'Déconnexion' : language === 'es' ? 'Cerrar sesión' : language === 'pcd' ? 'Déconnexion' : language === 'vls' ? 'Uutloggn' : 'Uitloggen'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => { navigate('/auth'); setIsToolsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <LogIn className="w-4 h-4 text-accent" />
                        <span>{language === 'sv' ? 'Logga in' : language === 'de' ? 'Anmelden' : language === 'en' ? 'Login' : language === 'fr' ? 'Connexion' : language === 'es' ? 'Iniciar sesión' : language === 'pcd' ? 'Connexion' : language === 'vls' ? 'Inloggn' : 'Inloggen'}</span>
                      </button>
                    )}

                    <div className="h-px bg-border my-2" />

                    {/* Leaderboard */}
                    <button
                      onClick={() => { setIsLeaderboardOpen(true); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <Medal className="w-4 h-4 text-accent" />
                      <span>{language === 'sv' ? 'Topplista' : language === 'de' ? 'Rangliste' : language === 'en' ? 'Leaderboard' : language === 'fr' ? 'Classement' : language === 'es' ? 'Clasificación' : language === 'pcd' ? 'Classemint' : language === 'vls' ? 'Ranglist' : 'Ranglijst'}</span>
                    </button>

                    {/* Gastboek */}
                    <a
                      href="#gastenboek"
                      onClick={() => { markGuestbookAsRead(); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span>{t('nav.gastenboek')}</span>
                      {newGuestbookCount > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                          {newGuestbookCount}
                        </span>
                      )}
                    </a>

                    {/* Sound Toggle */}
                    <button
                      onClick={() => { toggleSoundMute(); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      {isSoundMuted ? (
                        <VolumeX className="w-4 h-4 text-primary" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-primary" />
                      )}
                      <span>{isSoundMuted 
                        ? (language === 'sv' ? 'Ljud på' : language === 'de' ? 'Ton an' : language === 'en' ? 'Sound on' : language === 'fr' ? 'Son activé' : language === 'es' ? 'Sonido activado' : language === 'pcd' ? 'Son activé' : language === 'vls' ? 'Geluid an' : 'Geluid aan')
                        : (language === 'sv' ? 'Ljud av' : language === 'de' ? 'Ton aus' : language === 'en' ? 'Sound off' : language === 'fr' ? 'Son désactivé' : language === 'es' ? 'Sonido desactivado' : language === 'pcd' ? 'Son désactivé' : language === 'vls' ? 'Geluid uut' : 'Geluid uit')
                      }</span>
                    </button>

                    {/* High Contrast */}
                    <button
                      onClick={() => { toggleHighContrast(); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Contrast className="w-4 h-4 text-primary" />
                        <span>{highContrastLabel[language] || highContrastLabel.nl}</span>
                      </div>
                      {highContrast && <Check className="w-4 h-4 text-primary" />}
                    </button>

                    {/* Font Size */}
                    <div className="px-4 py-2">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        {readingModeLabel[language] || readingModeLabel.nl}
                      </p>
                      <div className="flex gap-1">
                        {fontSizeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFontSize(option.value)}
                            className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                              fontSize === option.value 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {option.value === 'normal' ? 'A' : option.value === 'large' ? 'A+' : 'A++'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-border my-2" />

                    {/* Print Preview */}
                    <button
                      onClick={() => { setIsPrintPreviewOpen(true); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                      <span>{language === 'sv' ? 'Förhandsgranskning' : language === 'de' ? 'Druckvorschau' : language === 'en' ? 'Print preview' : language === 'fr' ? 'Aperçu avant impression' : language === 'es' ? 'Vista previa' : language === 'pcd' ? "Aperçu avant l'impression" : language === 'vls' ? 'Printvoorbeeld' : 'Afdrukvoorbeeld'}</span>
                    </button>

                    {/* PDF Export */}
                    <button
                      onClick={() => { setIsPdfExportOpen(true); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <FileDown className="w-4 h-4 text-primary" />
                      <span>{language === 'sv' ? 'Ladda ner PDF' : language === 'de' ? 'PDF herunterladen' : language === 'en' ? 'Download PDF' : language === 'fr' ? 'Télécharger PDF' : language === 'es' ? 'Descargar PDF' : language === 'pcd' ? 'Télékerker PDF' : language === 'vls' ? 'Download PDF' : 'Download PDF'}</span>
                    </button>

                    {/* Keyboard Shortcuts */}
                    <button
                      onClick={() => { setIsShortcutsOpen(true); setIsToolsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <Keyboard className="w-4 h-4 text-primary" />
                      <span>{language === 'sv' ? 'Tangentbordsgenvägar' : language === 'de' ? 'Tastenkürzel' : language === 'en' ? 'Keyboard shortcuts' : language === 'fr' ? 'Raccourcis clavier' : language === 'es' ? 'Atajos de teclado' : language === 'pcd' ? 'Raccourcis clavier' : language === 'vls' ? 'Sneltoetsn' : 'Sneltoetsen'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden flex flex-col gap-1.5 p-2"
            aria-label={t('nav.menu')}
          >
            <span
              className={`w-5 h-0.5 bg-primary transition-transform ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-primary transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-primary transition-transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="xl:hidden overflow-hidden bg-background/95 backdrop-blur-sm border-t border-border/50"
      >
        <div className="container mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="grid grid-cols-2 gap-2 mb-6">
            {navItems.map((item) => {
              const Icon = getChapterIcon(item.href);
              const isImportant = importantChapters.includes(item.href);
              const isGame = item.href === '#spellen';
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 font-sans text-xs uppercase tracking-wider transition-colors py-2.5 px-3 rounded-lg ${
                    isImportant 
                      ? 'text-primary font-medium bg-primary/10 hover:bg-primary/20 border border-primary/20' 
                      : isGame
                        ? 'text-muted-foreground/80 hover:text-muted-foreground hover:bg-muted/30'
                        : 'text-foreground/90 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 shrink-0 ${isGame ? 'text-muted-foreground/80' : 'text-primary'}`} />}
                  <span className="truncate">{item.label}</span>
                  {isImportant && <Star className="w-3 h-3 text-gold shrink-0 ml-auto fill-gold" />}
                </a>
              );
            })}
            {/* Overledenen - prominent link in mobile menu */}
            <a
              href="/overledenen"
              onClick={() => setIsOpen(false)}
              className="col-span-2 flex items-center gap-2 font-sans text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent font-medium transition-colors"
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>{language === 'sv' ? 'Avlidna (åldersstatistik)' : language === 'de' ? 'Verstorbene (Altersstatistik)' : language === 'en' ? 'Deceased (age statistics)' : language === 'fr' ? 'Décédés (statistiques d\'âge)' : language === 'es' ? 'Fallecidos (estadísticas de edad)' : language === 'pcd' ? 'Décédés (statistiques d\'âche)' : language === 'vls' ? 'Overledenen (leeftiedsstatistiekn)' : 'Overledenen (leeftijdsstatistieken)'}</span>
            </a>
          </nav>
          
          {/* Mobile Functions */}
          <div className="border-t border-border pt-4 mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {language === 'nl' ? 'Functies' : language === 'en' ? 'Features' : language === 'fr' ? 'Fonctions' : language === 'es' ? 'Funciones' : language === 'de' ? 'Funktionen' : language === 'pcd' ? 'Fonctions' : language === 'vls' ? 'Functies' : 'Functies'}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {/* Search */}
              <button
                onClick={() => { setIsSearchOpen(true); setIsOpen(false); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label={t('nav.search')}
              >
                <Search className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-foreground/90">{t('nav.search')}</span>
              </button>
              
              {/* Achievements */}
              <button
                onClick={() => { setIsAchievementsOpen(true); setIsOpen(false); }}
                className="relative flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                aria-label="Achievements"
              >
                <Trophy className="w-5 h-5 text-gold" />
                <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Trophäen' : language === 'en' ? 'Trophies' : language === 'fr' ? 'Trophées' : language === 'es' ? 'Trofeos' : language === 'pcd' ? 'Trophées' : language === 'vls' ? 'Trofeeën' : 'Trofeeën'}</span>
                {unlockedCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-gold-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unlockedCount}
                  </span>
                )}
              </button>
              
              {/* Leaderboard */}
              <button
                onClick={() => { setIsLeaderboardOpen(true); setIsOpen(false); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                aria-label="Leaderboard"
              >
                <Medal className="w-5 h-5 text-accent" />
                <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Rangliste' : language === 'en' ? 'Ranking' : language === 'fr' ? 'Classement' : language === 'es' ? 'Clasificación' : language === 'pcd' ? 'Classemint' : language === 'vls' ? 'Ranglist' : 'Ranglijst'}</span>
              </button>
              
              {/* Sound Toggle */}
              <button
                onClick={() => { toggleSoundMute(); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label={isSoundMuted ? (language === 'de' ? 'Ton an' : 'Geluid aan') : (language === 'de' ? 'Ton aus' : 'Geluid uit')}
              >
                {isSoundMuted ? (
                  <VolumeX className="w-5 h-5 text-primary" />
                ) : (
                  <Volume2 className="w-5 h-5 text-primary" />
                )}
                <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Ton' : language === 'en' ? 'Sound' : language === 'fr' ? 'Son' : language === 'es' ? 'Sonido' : language === 'pcd' ? 'Son' : language === 'vls' ? 'Geluid' : 'Geluid'}</span>
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={() => { toggleTheme(); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Thema' : language === 'en' ? 'Theme' : language === 'fr' ? 'Thème' : language === 'es' ? 'Tema' : language === 'pcd' ? 'Thème' : language === 'vls' ? 'Thema' : 'Thema'}</span>
              </button>
              
              {/* High Contrast */}
              <button
                onClick={() => { toggleHighContrast(); }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors ${
                  highContrast ? 'bg-primary text-primary-foreground' : 'bg-primary/10 hover:bg-primary/20'
                }`}
                aria-label={highContrastLabel[language] || highContrastLabel.nl}
              >
                <Contrast className={`w-5 h-5 ${highContrast ? 'text-primary-foreground' : 'text-primary'}`} />
                <span className={`text-[10px] ${highContrast ? 'text-primary-foreground' : 'text-foreground/90'}`}>Contrast</span>
              </button>
              
              {/* PDF Export */}
              <button
                onClick={() => { setIsPdfExportOpen(true); setIsOpen(false); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Download PDF"
              >
                <FileDown className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-foreground/90">PDF</span>
              </button>
              
              {/* Print Preview */}
              <button
                onClick={() => { setIsPrintPreviewOpen(true); setIsOpen(false); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Print preview"
              >
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-foreground/90">Print</span>
              </button>
              
              {/* Auth Button Mobile */}
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label={language === 'de' ? 'Abmelden' : language === 'en' ? 'Logout' : language === 'fr' ? 'Déconnexion' : language === 'es' ? 'Salir' : language === 'pcd' ? 'Déconnexion' : language === 'vls' ? 'Uutloggn' : 'Uitloggen'}
                >
                  <LogOut className="w-5 h-5 text-primary" />
                  <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Abmelden' : language === 'en' ? 'Logout' : language === 'fr' ? 'Déconnexion' : language === 'es' ? 'Salir' : language === 'pcd' ? 'Déconnexion' : language === 'vls' ? 'Uutloggn' : 'Uitloggen'}</span>
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/auth'); setIsOpen(false); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  aria-label={language === 'de' ? 'Anmelden' : language === 'en' ? 'Login' : language === 'fr' ? 'Connexion' : language === 'es' ? 'Entrar' : language === 'pcd' ? 'Connexion' : language === 'vls' ? 'Inloggn' : 'Inloggen'}
                >
                  <LogIn className="w-5 h-5 text-accent" />
                  <span className="text-[10px] text-foreground/90">{language === 'de' ? 'Anmelden' : language === 'en' ? 'Login' : language === 'fr' ? 'Connexion' : language === 'es' ? 'Entrar' : language === 'pcd' ? 'Connexion' : language === 'vls' ? 'Inloggn' : 'Inloggen'}</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Font Size Options */}
          <div className="border-t border-border pt-4 mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {readingModeLabel[language] || readingModeLabel.nl}
            </p>
            <div className="flex gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm transition-colors ${
                    fontSize === option.value 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span className={option.value === 'large' ? 'text-base' : option.value === 'extra-large' ? 'text-lg' : ''}>
                    {option.label[language] || option.label.nl}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Language Selector */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {language === 'nl' ? 'Taal' : language === 'en' ? 'Language' : language === 'fr' ? 'Langue' : language === 'es' ? 'Idioma' : language === 'de' ? 'Sprache' : language === 'pcd' ? 'Langue' : language === 'vls' ? 'Toale' : 'Taal'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageSelect(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    language === lang.code 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <FlagIcon language={lang.code} className="w-5 h-4" />
                  <span className="text-xs">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
    </>
  );
};

export default Navigation;
