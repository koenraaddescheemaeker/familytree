import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Send, User, MapPin, Users, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  location: string | null;
  relation: string | null;
  created_at: string;
}

const entrySchema = z.object({
  name: z.string().trim().min(2, "Naam moet minstens 2 karakters bevatten").max(100, "Naam mag maximaal 100 karakters bevatten"),
  message: z.string().trim().min(10, "Bericht moet minstens 10 karakters bevatten").max(1000, "Bericht mag maximaal 1000 karakters bevatten"),
  location: z.string().trim().max(100, "Locatie mag maximaal 100 karakters bevatten").optional().or(z.literal("")),
  relation: z.string().trim().max(100, "Relatie mag maximaal 100 karakters bevatten").optional().or(z.literal(""))
});

const Gastboek = () => {
  const { language, t } = useLanguage();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    location: "",
    relation: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const translations: Record<string, Record<string, string>> = {
    title: {
      nl: "Gastenboek",
      en: "Guestbook",
      fr: "Livre d'or",
      es: "Libro de visitas",
      pcd: "Live d'or",
      vls: "Gastenboek",
      de: "Gästebuch"
    },
    subtitle: {
      nl: "Laat een bericht achter voor de familie",
      en: "Leave a message for the family",
      fr: "Laissez un message pour la famille",
      es: "Deja un mensaje para la familia",
      pcd: "Laissez un messache pou l'famile",
      vls: "Loat een bericht achter voe de familie",
      de: "Hinterlassen Sie eine Nachricht für die Familie"
    },
    writeMessage: {
      nl: "Schrijf een bericht",
      en: "Write a message",
      fr: "Écrire un message",
      es: "Escribir un mensaje",
      pcd: "Écrire un messache",
      vls: "Schryf een bericht",
      de: "Nachricht schreiben"
    },
    name: {
      nl: "Naam",
      en: "Name",
      fr: "Nom",
      es: "Nombre",
      pcd: "Nom",
      vls: "Noame",
      de: "Name"
    },
    message: {
      nl: "Bericht",
      en: "Message",
      fr: "Message",
      es: "Mensaje",
      pcd: "Messache",
      vls: "Bericht",
      de: "Nachricht"
    },
    location: {
      nl: "Woonplaats (optioneel)",
      en: "Location (optional)",
      fr: "Lieu (optionnel)",
      es: "Ubicación (opcional)",
      pcd: "Lieu (optionnel)",
      vls: "Woenploatse (optioneel)",
      de: "Wohnort (optional)"
    },
    relation: {
      nl: "Relatie tot de familie (optioneel)",
      en: "Relation to the family (optional)",
      fr: "Lien avec la famille (optionnel)",
      es: "Relación con la familia (opcional)",
      pcd: "Lien avec l'famile (optionnel)",
      vls: "Relatie tou de familie (optioneel)",
      de: "Beziehung zur Familie (optional)"
    },
    submit: {
      nl: "Verstuur bericht",
      en: "Send message",
      fr: "Envoyer le message",
      es: "Enviar mensaje",
      pcd: "Invoyer l'messache",
      vls: "Verstuurt bericht",
      de: "Nachricht senden"
    },
    cancel: {
      nl: "Annuleren",
      en: "Cancel",
      fr: "Annuler",
      es: "Cancelar",
      pcd: "Annuler",
      vls: "Annuleren",
      de: "Abbrechen"
    },
    success: {
      nl: "Bedankt voor uw bericht! Het wordt na goedkeuring zichtbaar.",
      en: "Thank you for your message! It will be visible after approval.",
      fr: "Merci pour votre message! Il sera visible après approbation.",
      es: "¡Gracias por tu mensaje! Será visible después de la aprobación.",
      pcd: "Merci pou vo messache! I s'ra visible après approbation.",
      vls: "Bedankt voe uwe bericht! Het wordt na goedkeuring zichtbaar.",
      de: "Vielen Dank für Ihre Nachricht! Sie wird nach Genehmigung sichtbar."
    },
    error: {
      nl: "Er ging iets mis. Probeer het opnieuw.",
      en: "Something went wrong. Please try again.",
      fr: "Une erreur s'est produite. Veuillez réessayer.",
      es: "Algo salió mal. Por favor, inténtalo de nuevo.",
      pcd: "I a eu eune erreur. Réessayez.",
      vls: "Der ging iet mis. Probeert opnieuw.",
      de: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut."
    },
    noEntries: {
      nl: "Nog geen berichten. Wees de eerste!",
      en: "No messages yet. Be the first!",
      fr: "Pas encore de messages. Soyez le premier!",
      es: "Aún no hay mensajes. ¡Sé el primero!",
      pcd: "Pont d'messaches. Soyez l'premier!",
      vls: "Nog geen berichtn. Zy de eerste!",
      de: "Noch keine Nachrichten. Seien Sie der Erste!"
    },
    loading: {
      nl: "Berichten laden...",
      en: "Loading messages...",
      fr: "Chargement des messages...",
      es: "Cargando mensajes...",
      pcd: "Chargemint des messaches...",
      vls: "Berichtn laden...",
      de: "Nachrichten werden geladen..."
    },
    messagePlaceholder: {
      nl: "Deel uw gedachten over deze familiegeschiedenis...",
      en: "Share your thoughts about this family history...",
      fr: "Partagez vos pensées sur cette histoire familiale...",
      es: "Comparte tus pensamientos sobre esta historia familiar...",
      pcd: "Partachez vos pinsées su c't'histoère d'famile...",
      vls: "Deelt uwe gedachtn over deze familiegeschiedenis...",
      de: "Teilen Sie Ihre Gedanken zu dieser Familiengeschichte..."
    },
    relationPlaceholder: {
      nl: "bijv. Achterkleinzoon, Geïnteresseerde, Genealoog...",
      en: "e.g. Great-grandchild, Interested party, Genealogist...",
      fr: "p.ex. Arrière-petit-fils, Intéressé, Généalogiste...",
      es: "ej. Bisnieto, Interesado, Genealogista...",
      pcd: "p.ex. Arriére-ptit-fils, Intéressé, Généalogisse...",
      vls: "bvb. Achterkleinzeune, Geïnteresseerde, Genealoog...",
      de: "z.B. Urenkel, Interessierter, Genealoge..."
    }
  };

  const getText = (key: string) => translations[key]?.[language] || translations[key]?.nl || key;

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      // Use public view to protect visitor privacy (excludes visitor_id)
      const { data, error } = await supabase
        .from("guestbook_entries_public")
        .select("id, name, message, location, relation, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching guestbook entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVisitorId = () => {
    let visitorId = localStorage.getItem("deforce_visitor_id");
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("deforce_visitor_id", visitorId);
    }
    return visitorId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = entrySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const visitorId = getVisitorId();
      const { error } = await supabase.from("guestbook_entries").insert({
        name: formData.name.trim(),
        message: formData.message.trim(),
        location: formData.location.trim() || null,
        relation: formData.relation.trim() || null,
        visitor_id: visitorId
      });

      if (error) throw error;

      // Send notification to moderator (don't await, let it run in background)
      supabase.functions.invoke("notify-moderator", {
        body: {
          name: formData.name.trim(),
          message: formData.message.trim(),
          location: formData.location.trim() || undefined,
          relation: formData.relation.trim() || undefined
        }
      }).catch(err => console.error("Failed to send moderator notification:", err));

      toast.success(getText("success"));
      setFormData({ name: "", message: "", location: "", relation: "" });
      setShowForm(false);
      fetchEntries();
    } catch (error) {
      console.error("Error submitting guestbook entry:", error);
      toast.error(getText("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const locale = language === "nl" || language === "vls" ? "nl-NL" : 
                   language === "fr" || language === "pcd" ? "fr-FR" : 
                   language === "es" ? "es-ES" : 
                   language === "de" ? "de-DE" : "en-US";
    return date.toLocaleDateString(locale, options);
  };

  return (
    <section id="gastenboek" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              {getText("title")}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getText("subtitle")}
          </p>
        </motion.div>

        {/* Write Message Button */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              {getText("writeMessage")}
            </button>
          </motion.div>
        )}

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elevated">
                <div className="grid gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline-block mr-2" />
                      {getText("name")} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.name ? "border-destructive" : "border-border"} focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors`}
                      maxLength={100}
                      required
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline-block mr-2" />
                      {getText("location")}
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.location ? "border-destructive" : "border-border"} focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors`}
                      maxLength={100}
                    />
                    {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
                  </div>

                  {/* Relation */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Users className="w-4 h-4 inline-block mr-2" />
                      {getText("relation")}
                    </label>
                    <input
                      type="text"
                      value={formData.relation}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.relation ? "border-destructive" : "border-border"} focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors`}
                      placeholder={getText("relationPlaceholder")}
                      maxLength={100}
                    />
                    {errors.relation && <p className="text-sm text-destructive mt-1">{errors.relation}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MessageSquare className="w-4 h-4 inline-block mr-2" />
                      {getText("message")} *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.message ? "border-destructive" : "border-border"} focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none`}
                      rows={5}
                      maxLength={1000}
                      placeholder={getText("messagePlaceholder")}
                      required
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {formData.message.length}/1000
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
                    >
                      {getText("cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {getText("submit")}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">{getText("loading")}</span>
            </div>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg text-muted-foreground">{getText("noEntries")}</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{entry.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          {entry.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {entry.location}
                            </span>
                          )}
                          {entry.relation && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {entry.relation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(entry.created_at)}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {entry.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gastboek;