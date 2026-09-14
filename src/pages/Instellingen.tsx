import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, BellOff, Shield, Eye, EyeOff, Save, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Instellingen = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Settings state - stored in localStorage
  const [settings, setSettings] = useState({
    emailNotifications: true,
    updateNotifications: true,
    achievementNotifications: true,
    showProfilePublic: false,
    showActivityPublic: false,
    allowAnalytics: true,
  });

  const translations = {
    nl: {
      title: "Instellingen",
      subtitle: "Beheer je notificaties en privacy voorkeuren",
      back: "Terug",
      notifications: "Notificaties",
      notificationsDesc: "Beheer hoe je meldingen ontvangt",
      emailNotifications: "E-mail notificaties",
      emailNotificationsDesc: "Ontvang updates via e-mail",
      updateNotifications: "Site updates",
      updateNotificationsDesc: "Meldingen over nieuwe functies en inhoud",
      achievementNotifications: "Prestatie meldingen",
      achievementNotificationsDesc: "Geluid en melding bij nieuwe prestaties",
      privacy: "Privacy",
      privacyDesc: "Beheer je privacy instellingen",
      showProfilePublic: "Profiel openbaar",
      showProfilePublicDesc: "Laat anderen je profielinformatie zien",
      showActivityPublic: "Activiteit openbaar",
      showActivityPublicDesc: "Laat anderen je activiteit en scores zien",
      allowAnalytics: "Analytische gegevens",
      allowAnalyticsDesc: "Help ons de site te verbeteren met anonieme gegevens",
      save: "Opslaan",
      saved: "Opgeslagen!",
      loginRequired: "Je moet ingelogd zijn om instellingen te wijzigen",
    },
    en: {
      title: "Settings",
      subtitle: "Manage your notifications and privacy preferences",
      back: "Back",
      notifications: "Notifications",
      notificationsDesc: "Manage how you receive notifications",
      emailNotifications: "Email notifications",
      emailNotificationsDesc: "Receive updates via email",
      updateNotifications: "Site updates",
      updateNotificationsDesc: "Notifications about new features and content",
      achievementNotifications: "Achievement notifications",
      achievementNotificationsDesc: "Sound and notification for new achievements",
      privacy: "Privacy",
      privacyDesc: "Manage your privacy settings",
      showProfilePublic: "Public profile",
      showProfilePublicDesc: "Let others see your profile information",
      showActivityPublic: "Public activity",
      showActivityPublicDesc: "Let others see your activity and scores",
      allowAnalytics: "Analytics data",
      allowAnalyticsDesc: "Help us improve the site with anonymous data",
      save: "Save",
      saved: "Saved!",
      loginRequired: "You must be logged in to change settings",
    },
    de: {
      title: "Einstellungen",
      subtitle: "Verwalten Sie Ihre Benachrichtigungen und Datenschutzeinstellungen",
      back: "Zurück",
      notifications: "Benachrichtigungen",
      notificationsDesc: "Verwalten Sie, wie Sie Benachrichtigungen erhalten",
      emailNotifications: "E-Mail-Benachrichtigungen",
      emailNotificationsDesc: "Erhalten Sie Updates per E-Mail",
      updateNotifications: "Site-Updates",
      updateNotificationsDesc: "Benachrichtigungen über neue Funktionen und Inhalte",
      achievementNotifications: "Erfolgsbenachrichtigungen",
      achievementNotificationsDesc: "Ton und Benachrichtigung bei neuen Erfolgen",
      privacy: "Datenschutz",
      privacyDesc: "Verwalten Sie Ihre Datenschutzeinstellungen",
      showProfilePublic: "Öffentliches Profil",
      showProfilePublicDesc: "Lassen Sie andere Ihre Profilinformationen sehen",
      showActivityPublic: "Öffentliche Aktivität",
      showActivityPublicDesc: "Lassen Sie andere Ihre Aktivität und Punktzahlen sehen",
      allowAnalytics: "Analysedaten",
      allowAnalyticsDesc: "Helfen Sie uns, die Website mit anonymen Daten zu verbessern",
      save: "Speichern",
      saved: "Gespeichert!",
      loginRequired: "Sie müssen angemeldet sein, um Einstellungen zu ändern",
    },
    fr: {
      title: "Paramètres",
      subtitle: "Gérez vos notifications et préférences de confidentialité",
      back: "Retour",
      notifications: "Notifications",
      notificationsDesc: "Gérez comment vous recevez les notifications",
      emailNotifications: "Notifications par e-mail",
      emailNotificationsDesc: "Recevez des mises à jour par e-mail",
      updateNotifications: "Mises à jour du site",
      updateNotificationsDesc: "Notifications sur les nouvelles fonctionnalités et contenus",
      achievementNotifications: "Notifications de réussite",
      achievementNotificationsDesc: "Son et notification pour les nouvelles réussites",
      privacy: "Confidentialité",
      privacyDesc: "Gérez vos paramètres de confidentialité",
      showProfilePublic: "Profil public",
      showProfilePublicDesc: "Laissez les autres voir vos informations de profil",
      showActivityPublic: "Activité publique",
      showActivityPublicDesc: "Laissez les autres voir votre activité et vos scores",
      allowAnalytics: "Données analytiques",
      allowAnalyticsDesc: "Aidez-nous à améliorer le site avec des données anonymes",
      save: "Enregistrer",
      saved: "Enregistré!",
      loginRequired: "Vous devez être connecté pour modifier les paramètres",
    },
    es: {
      title: "Configuración",
      subtitle: "Administra tus notificaciones y preferencias de privacidad",
      back: "Volver",
      notifications: "Notificaciones",
      notificationsDesc: "Administra cómo recibes notificaciones",
      emailNotifications: "Notificaciones por correo",
      emailNotificationsDesc: "Recibe actualizaciones por correo electrónico",
      updateNotifications: "Actualizaciones del sitio",
      updateNotificationsDesc: "Notificaciones sobre nuevas funciones y contenido",
      achievementNotifications: "Notificaciones de logros",
      achievementNotificationsDesc: "Sonido y notificación para nuevos logros",
      privacy: "Privacidad",
      privacyDesc: "Administra tu configuración de privacidad",
      showProfilePublic: "Perfil público",
      showProfilePublicDesc: "Permite que otros vean tu información de perfil",
      showActivityPublic: "Actividad pública",
      showActivityPublicDesc: "Permite que otros vean tu actividad y puntuaciones",
      allowAnalytics: "Datos analíticos",
      allowAnalyticsDesc: "Ayúdanos a mejorar el sitio con datos anónimos",
      save: "Guardar",
      saved: "¡Guardado!",
      loginRequired: "Debes iniciar sesión para cambiar la configuración",
    },
    pcd: {
      title: "Réglages",
      subtitle: "Manèje tes notifications pi tes préférences de confidentialité",
      back: "Artour",
      notifications: "Notifications",
      notificationsDesc: "Manèje commint t'arçois tes notifications",
      emailNotifications: "Notifications par mail",
      emailNotificationsDesc: "Arçois des mises à jour par mail",
      updateNotifications: "Mises à jour du site",
      updateNotificationsDesc: "Notifications su les nouvelles fonctions pi contenus",
      achievementNotifications: "Notifications d'réussite",
      achievementNotificationsDesc: "Son pi notification pour les nouvelles réussites",
      privacy: "Confidentialité",
      privacyDesc: "Manèje tes réglages de confidentialité",
      showProfilePublic: "Profil public",
      showProfilePublicDesc: "Laisse les eutes vir tes informations de profil",
      showActivityPublic: "Activité publique",
      showActivityPublicDesc: "Laisse les eutes vir ton activité pi tes scores",
      allowAnalytics: "Données analytiques",
      allowAnalyticsDesc: "Aide-nous à améliorer l'site avec des données anonymes",
      save: "Sauvegarder",
      saved: "Sauvegardé!",
      loginRequired: "Te dois ête connecté pour canger les réglages",
    },
    vls: {
      title: "Instellingen",
      subtitle: "Beheer je notificaties en privacy voorkeuren",
      back: "Terug",
      notifications: "Meldingen",
      notificationsDesc: "Beheer hoe da je meldingen krijgt",
      emailNotifications: "E-mail meldingen",
      emailNotificationsDesc: "Krijg updates via e-mail",
      updateNotifications: "Site updates",
      updateNotificationsDesc: "Meldingen over nieuwe functies en inhoud",
      achievementNotifications: "Prestatie meldingen",
      achievementNotificationsDesc: "Geluid en melding bij nieuwe prestaties",
      privacy: "Privacy",
      privacyDesc: "Beheer je privacy instellingen",
      showProfilePublic: "Profiel openboar",
      showProfilePublicDesc: "Loat andere je profielinformatie zien",
      showActivityPublic: "Activiteit openboar",
      showActivityPublicDesc: "Loat andere je activiteit en scores zien",
      allowAnalytics: "Analytische gegevens",
      allowAnalyticsDesc: "Help ons de site te verbeteren met anonieme gegevens",
      save: "Opsloage",
      saved: "Opgesloagd!",
      loginRequired: "Je moet ingelogd zyn om instellingen te wyzigen",
    },
    sv: {
      title: "Inställningar",
      subtitle: "Hantera dina aviseringar och sekretessinställningar",
      back: "Tillbaka",
      notifications: "Aviseringar",
      notificationsDesc: "Hantera hur du får aviseringar",
      emailNotifications: "E-postaviseringar",
      emailNotificationsDesc: "Få uppdateringar via e-post",
      updateNotifications: "Webbplatsuppdateringar",
      updateNotificationsDesc: "Aviseringar om nya funktioner och innehåll",
      achievementNotifications: "Prestationsaviseringar",
      achievementNotificationsDesc: "Ljud och avisering vid nya prestationer",
      privacy: "Sekretess",
      privacyDesc: "Hantera dina sekretessinställningar",
      showProfilePublic: "Offentlig profil",
      showProfilePublicDesc: "Låt andra se din profilinformation",
      showActivityPublic: "Offentlig aktivitet",
      showActivityPublicDesc: "Låt andra se din aktivitet och poäng",
      allowAnalytics: "Analysdata",
      allowAnalyticsDesc: "Hjälp oss förbättra webbplatsen med anonym data",
      save: "Spara",
      saved: "Sparat!",
      loginRequired: "Du måste vara inloggad för att ändra inställningar",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.nl;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings');
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = () => {
    setSaving(true);
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      toast({
        title: t.saved,
        duration: 2000,
      });
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.loginRequired}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.notifications}</CardTitle>
                  <CardDescription>{t.notificationsDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">{t.emailNotifications}</label>
                  <p className="text-xs text-muted-foreground">{t.emailNotificationsDesc}</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">{t.updateNotifications}</label>
                  <p className="text-xs text-muted-foreground">{t.updateNotificationsDesc}</p>
                </div>
                <Switch
                  checked={settings.updateNotifications}
                  onCheckedChange={(checked) => updateSetting('updateNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">{t.achievementNotifications}</label>
                  <p className="text-xs text-muted-foreground">{t.achievementNotificationsDesc}</p>
                </div>
                <Switch
                  checked={settings.achievementNotifications}
                  onCheckedChange={(checked) => updateSetting('achievementNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.privacy}</CardTitle>
                  <CardDescription>{t.privacyDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  <div>
                    <label className="text-sm font-medium">{t.showProfilePublic}</label>
                    <p className="text-xs text-muted-foreground">{t.showProfilePublicDesc}</p>
                  </div>
                </div>
                <Switch
                  checked={settings.showProfilePublic}
                  onCheckedChange={(checked) => updateSetting('showProfilePublic', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">{t.showActivityPublic}</label>
                  <p className="text-xs text-muted-foreground">{t.showActivityPublicDesc}</p>
                </div>
                <Switch
                  checked={settings.showActivityPublic}
                  onCheckedChange={(checked) => updateSetting('showActivityPublic', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">{t.allowAnalytics}</label>
                  <p className="text-xs text-muted-foreground">{t.allowAnalyticsDesc}</p>
                </div>
                <Switch
                  checked={settings.allowAnalytics}
                  onCheckedChange={(checked) => updateSetting('allowAnalytics', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={saving}
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : saved ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saved ? t.saved : t.save}
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Instellingen;
