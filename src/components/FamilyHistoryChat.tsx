import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/family-history-chat`;

const FamilyHistoryChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const { toast } = useToast();

  const translations = {
    nl: {
      title: "Familiegeschiedenis Assistent",
      placeholder: "Stel een vraag over de Deforche familie...",
      welcome: "Welkom! Ik ben uw gids door de geschiedenis van de familie Deforche. Klik op een suggestie hieronder of stel uw eigen vraag!",
      error: "Er ging iets mis. Probeer het opnieuw.",
      rateLimit: "Te veel verzoeken. Wacht even en probeer opnieuw.",
      suggestions: [
        "Wie is de auteur?",
        "Wie maakte deze website?",
        "Wanneer waren de familiereünies?",
        "Wie waren Marcel en Magdalena?",
        "Wie waren de stamouders?",
        "Wat betekent de naam Deforche?",
      ],
    },
    fr: {
      title: "Assistant d'Histoire Familiale",
      placeholder: "Posez une question sur la famille Deforche...",
      welcome: "Bienvenue ! Je suis votre guide à travers l'histoire de la famille Deforche. Cliquez sur une suggestion ci-dessous ou posez votre propre question !",
      error: "Une erreur s'est produite. Réessayez.",
      rateLimit: "Trop de demandes. Attendez un moment et réessayez.",
      suggestions: [
        "Qui est l'auteur ?",
        "Qui a créé ce site web ?",
        "Quand ont eu lieu les réunions de famille ?",
        "Qui étaient Marcel et Magdalena ?",
        "Qui étaient les ancêtres fondateurs ?",
        "Que signifie le nom Deforche ?",
      ],
    },
    en: {
      title: "Family History Assistant",
      placeholder: "Ask a question about the Deforche family...",
      welcome: "Welcome! I'm your guide through the history of the Deforche family. Click a suggestion below or ask your own question!",
      error: "Something went wrong. Please try again.",
      rateLimit: "Too many requests. Please wait and try again.",
      suggestions: [
        "Who is the author?",
        "Who made this website?",
        "When were the family reunions?",
        "Who were Marcel and Magdalena?",
        "Who were the founding ancestors?",
        "What does the name Deforche mean?",
      ],
    },
    es: {
      title: "Asistente de Historia Familiar",
      placeholder: "Haz una pregunta sobre la familia Deforche...",
      welcome: "¡Bienvenido! Soy su guía a través de la historia de la familia Deforche. ¡Haga clic en una sugerencia o haga su propia pregunta!",
      error: "Algo salió mal. Inténtalo de nuevo.",
      rateLimit: "Demasiadas solicitudes. Espere e intente de nuevo.",
      suggestions: [
        "¿Quién es el autor?",
        "¿Quién creó este sitio web?",
        "¿Cuándo fueron las reuniones familiares?",
        "¿Quiénes fueron Marcel y Magdalena?",
        "¿Quiénes fueron los antepasados fundadores?",
        "¿Qué significa el nombre Deforche?",
      ],
    },
    pcd: {
      title: "Assistant d'Histoire Familiale",
      placeholder: "Posez eune question sus la famille Deforche...",
      welcome: "Bénvénue ! Jé sus vote guide à travers l'histoire d'la famille Deforche. Cliquez sus eune suggestion ou posez vote question !",
      error: "Eune erreur s'est produite. Réessayez.",
      rateLimit: "Trop d'demandes. Attindez in momint.",
      suggestions: [
        "Qui qu'ch'est l'auteur ?",
        "Qui qu'a fait ch'site web ?",
        "Quand qu'ch'étoéent les réunions d'famille ?",
        "Qui qu'ch'étoéent Marcel et Magdalena ?",
        "Qui qu'ch'étoéent les anchtres ?",
        "Qué qu'cha veut dire Deforche ?",
      ],
    },
    de: {
      title: "Familiengeschichte Assistent",
      placeholder: "Stelle eine Frage über die Familie Deforche...",
      welcome: "Willkommen! Ich bin Ihr Führer durch die Geschichte der Familie Deforche. Klicken Sie auf einen Vorschlag oder stellen Sie Ihre eigene Frage!",
      error: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
      rateLimit: "Zu viele Anfragen. Bitte warten Sie und versuchen Sie es erneut.",
      suggestions: [
        "Wer ist der Autor?",
        "Wer hat diese Website erstellt?",
        "Wann fanden die Familientreffen statt?",
        "Wer waren Marcel und Magdalena?",
        "Wer waren die Gründungsvorfahren?",
        "Was bedeutet der Name Deforche?",
      ],
    },
    vls: {
      title: "Familiegeschiedenisse Assistent",
      placeholder: "Stel e vroage over de Deforche familie...",
      welcome: "Welkom! Ik ben je gids deur de geschiedenisse van de familie Deforche. Klikt op e suggestie of stel je eigen vroage!",
      error: "Der ging iet mis. Probeer t opniew.",
      rateLimit: "Te veel verzoekn. Wacht efkes en probeer opniew.",
      suggestions: [
        "Wie is den auteur?",
        "Wie ei deze website gemoakt?",
        "Wanneer woarn de familiereünies?",
        "Wie woarn Marcel en Magdalena?",
        "Wie woarn de stamouders?",
        "Wa betekent de noame Deforche?",
      ],
    },
  };

  const text = translations[language as keyof typeof translations] || translations.nl;

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: text.welcome }]);
    }
  }, [isOpen, text.welcome]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    // Hide suggestions after first user message
    setShowSuggestions(false);

    const userMessage: Message = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          language 
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          throw new Error(text.rateLimit);
        }
        throw new Error(errorData.error || text.error);
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add initial assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, put it back
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch { /* ignore */ }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: text.error,
        description: error instanceof Error ? error.message : text.error,
      });
      // Remove the empty assistant message if there was an error
      if (assistantContent === "") {
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
              aria-label={text.title}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold text-sm">{text.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setMessages([{ role: "assistant", content: text.welcome }]);
                      setShowSuggestions(true);
                      setInput("");
                    }}
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    title="Nieuw gesprek"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.content || (
                        <span className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Suggestion Chips */}
                {showSuggestions && messages.length <= 1 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {text.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(suggestion)}
                        className="px-3 py-1.5 text-xs bg-accent/50 hover:bg-accent text-accent-foreground rounded-full transition-colors border border-border hover:border-primary/50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={text.placeholder}
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FamilyHistoryChat;
