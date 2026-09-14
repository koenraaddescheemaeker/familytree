import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Loader2, Send, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { grootouderVraagGroepen } from "@/data/grootouderVragen";

const schema = z.object({
  naam: z.string().trim().min(2, "Vul uw naam in").max(100, "Naam is te lang"),
  woonplaats: z.string().trim().max(100, "Woonplaats is te lang"),
  geboortejaar: z.string().trim().max(20, "Geboortejaar is te lang"),
  relatie: z.string().trim().max(150, "Beschrijving is te lang"),
  email: z.union([z.string().trim().email("Ongeldig e-mailadres").max(255), z.literal("")]),
});

const MAX_FOTO_BYTES = 5 * 1024 * 1024;
const ZONDER_QUALIFIER = "zonder kinderen of kleinkinderen";

const GrootouderVragenlijst = () => {
  const [naam, setNaam] = useState("");
  const [woonplaats, setWoonplaats] = useState("");
  const [geboortejaar, setGeboortejaar] = useState("");
  const [relatie, setRelatie] = useState("");
  const [zonderKinderen, setZonderKinderen] = useState(false);
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [antwoorden, setAntwoorden] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [verzonden, setVerzonden] = useState(false);

  useEffect(() => {
    setZonderKinderen(new RegExp(`\\b${ZONDER_QUALIFIER}\\b`, "i").test(relatie));
  }, [relatie]);

  const setAntwoord = (id: string, waarde: string) =>
    setAntwoorden((prev) => ({ ...prev, [id]: waarde.slice(0, 4000) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ naam, woonplaats, geboortejaar, relatie, email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const ingevuld = Object.values(antwoorden).filter((a) => a.trim().length > 0).length;
    if (ingevuld === 0) {
      toast.error("Beantwoord minstens één vraag.");
      return;
    }

    setIsSaving(true);
    try {
      let fotoPad: string | null = null;
      if (foto) {
        if (foto.size > MAX_FOTO_BYTES) {
          toast.error("De foto mag maximaal 5 MB groot zijn.");
          setIsSaving(false);
          return;
        }
        const ext = (foto.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
        const pad = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("grootouder-fotos")
          .upload(pad, foto, { contentType: foto.type || "image/jpeg" });
        if (uploadError) throw uploadError;
        fotoPad = pad;
      }

      const { error } = await supabase.from("grootouder_verhalen").insert({
        naam: parsed.data.naam,
        woonplaats: parsed.data.woonplaats || null,
        geboortejaar: parsed.data.geboortejaar || null,
        relatie: parsed.data.relatie || null,
        email: parsed.data.email || null,
        antwoorden,
        foto_url: fotoPad,
        approved: false,
      });
      if (error) throw error;
      setVerzonden(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("Verzenden is niet gelukt. Probeer het later opnieuw.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        <Link to="/grootouderverhalen" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Naar de gepubliceerde grootouderverhalen
        </Link>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-semibold">Bijlage — meedoen</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
            Vul uw eigen Grootouderboek in
          </h1>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Elke oudere familielid kan hier dezelfde vragen beantwoorden als Simonne Vandeputte in 1992 deed:
            grootouders, maar uitdrukkelijk ook grootooms en groottantes — ook wie geen kinderen of kleinkinderen heeft.
            Elk levensverhaal hoort in de familiekroniek thuis. U hoeft niet alles in te vullen — elk antwoord telt.
            Na nazicht wordt uw verhaal gepubliceerd in het bijlagehoofdstuk &ldquo;Grootouderverhalen&rdquo;.
          </p>
        </motion.header>

        {verzonden ? (
          <div className="rounded-xl border border-border/60 bg-card/70 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-foreground">Bedankt voor uw verhaal!</h2>
            <p className="mt-3 text-foreground/80">
              Uw antwoorden zijn goed ontvangen. Na goedkeuring verschijnen ze in het bijlagehoofdstuk.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild><Link to="/grootouderverhalen">Bekijk de verhalen</Link></Button>
              <Button variant="outline" asChild><Link to="/">Terug naar de startpagina</Link></Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="rounded-xl border border-border/60 bg-card/60 p-6 space-y-4">
              <h2 className="text-xl font-serif font-bold text-foreground">Over uzelf</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="naam">Naam *</Label>
                  <Input id="naam" value={naam} maxLength={100} onChange={(e) => setNaam(e.target.value)} placeholder="Voor- en familienaam" required />
                </div>
                <div>
                  <Label htmlFor="geboortejaar">Geboortejaar</Label>
                  <Input id="geboortejaar" value={geboortejaar} maxLength={20} onChange={(e) => setGeboortejaar(e.target.value)} placeholder="bv. 1938" />
                </div>
                <div>
                  <Label htmlFor="woonplaats">Woonplaats</Label>
                  <Input id="woonplaats" value={woonplaats} maxLength={100} onChange={(e) => setWoonplaats(e.target.value)} placeholder="bv. Izegem" />
                </div>
                <div>
                  <Label htmlFor="relatie">Band met de familie</Label>
                  <Input
                    id="relatie"
                    list="relatie-opties"
                    value={relatie}
                    maxLength={150}
                    onChange={(e) => setRelatie(e.target.value)}
                    placeholder="bv. groottante, zus van Georges Deforce"
                  />
                  <datalist id="relatie-opties">
                    <option value="Grootouder" />
                    <option value="Grootoom" />
                    <option value="Groottante" />
                    <option value="Oom" />
                    <option value="Tante" />
                    <option value="Aangetrouwd familielid" />
                  </datalist>
                  <div className="mt-2 flex items-start gap-2">
                    <input
                      id="zonder-kinderen"
                      type="checkbox"
                      checked={zonderKinderen}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRelatie((prev) => {
                          const clean = prev.replace(new RegExp(`\\b${ZONDER_QUALIFIER}\\b`, "i"), "").replace(/,\s*$/, "").trim();
                          return checked ? (clean ? `${clean} ${ZONDER_QUALIFIER}` : ZONDER_QUALIFIER) : clean;
                        });
                      }}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <Label htmlFor="zonder-kinderen" className="text-sm font-normal text-foreground/80 cursor-pointer leading-snug">
                      Ik heb geen kinderen of kleinkinderen
                    </Label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">E-mail (niet publiek, enkel om u te contacteren)</Label>
                  <Input id="email" type="email" value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} placeholder="naam@voorbeeld.be" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="foto" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" /> Portretfoto (optioneel, max. 5 MB)
                  </Label>
                  <Input id="foto" type="file" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] ?? null)} />
                  {foto && <p className="mt-1 text-xs text-muted-foreground">Gekozen: {foto.name}</p>}
                </div>
              </div>
            </section>

            {grootouderVraagGroepen.map((groep) => (
              <section key={groep.id} className="rounded-xl border border-border/60 bg-card/60 p-6 space-y-5">
                <h2 className="text-xl font-serif font-bold text-foreground">{groep.titel}</h2>
                {groep.vragen.map((v) => (
                  <div key={v.id}>
                    <Label htmlFor={v.id} className="leading-snug">{v.vraag}</Label>
                    <Textarea
                      id={v.id}
                      value={antwoorden[v.id] ?? ""}
                      onChange={(e) => setAntwoord(v.id, e.target.value)}
                      rows={v.lang ? 4 : 2}
                      maxLength={4000}
                      className="mt-1"
                    />
                  </div>
                ))}
              </section>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <p className="text-sm text-muted-foreground">Uw verhaal wordt pas gepubliceerd na goedkeuring.</p>
              <Button type="submit" size="lg" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Verhaal insturen
              </Button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GrootouderVragenlijst;
