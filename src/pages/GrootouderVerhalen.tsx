import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Quote, Loader2, PenLine, Eye, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { grootouderVraagGroepen } from "@/data/grootouderVragen";

type Verhaal = {
  id: string;
  naam: string;
  woonplaats: string | null;
  geboortejaar: string | null;
  relatie: string | null;
  antwoorden: Record<string, string>;
  foto_url: string | null;
  created_at: string;
  approved?: boolean;
};

const GrootouderVerhalen = () => {
  const [verhalen, setVerhalen] = useState<Verhaal[]>([]);
  const [fotos, setFotos] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const tekenFotos = useCallback(async (rijen: Verhaal[]) => {
    const paden = rijen.map((r) => r.foto_url).filter((p): p is string => !!p);
    if (!paden.length) return;
    const { data: signed } = await supabase.storage.from("grootouder-fotos").createSignedUrls(paden, 3600);
    const map: Record<string, string> = {};
    signed?.forEach((s) => {
      if (s.path && s.signedUrl) map[s.path] = s.signedUrl;
    });
    setFotos((prev) => ({ ...prev, ...map }));
  }, []);

  const laadPubliek = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc("get_approved_grootouder_verhalen");
    if (error) console.error(error);
    const rijen = ((data ?? []) as unknown as Verhaal[]).map((r) => ({
      ...r,
      approved: true,
      antwoorden: (r.antwoorden ?? {}) as Record<string, string>,
    }));
    setVerhalen(rijen);
    setIsLoading(false);
    tekenFotos(rijen);
  }, [tekenFotos]);

  const laadPreview = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("grootouder_verhalen")
      .select("id, naam, woonplaats, geboortejaar, relatie, antwoorden, foto_url, approved, created_at")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    const rijen = ((data ?? []) as unknown as Verhaal[]).map((r) => ({
      ...r,
      antwoorden: (r.antwoorden ?? {}) as Record<string, string>,
    }));
    setVerhalen(rijen);
    setIsLoading(false);
    tekenFotos(rijen);
  }, [tekenFotos]);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
        setIsModerator(!!roles?.some((r) => r.role === "admin" || r.role === "moderator"));
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (previewMode && isModerator) laadPreview();
    else laadPubliek();
  }, [previewMode, isModerator, laadPreview, laadPubliek]);

  const aantalConcept = verhalen.filter((v) => v.approved === false).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-5xl">
        <Link to="/grootouderboek" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Terug naar het Grootouderboek van Simonne
        </Link>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-semibold">Bijlage</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
            Grootouderverhalen uit de familie
          </h1>
          <p className="mt-4 text-foreground/80 leading-relaxed max-w-3xl">
            Grootouders, grootooms en groottantes uit de familie beantwoorden dezelfde vragen als Simonne Vandeputte
            in haar Grootouderboek — ook wie geen kinderen of kleinkinderen heeft.
            Zo groeit deze bijlage uit tot een verzameling levensverhalen van meerdere generaties.
          </p>
          <Button asChild className="mt-6">
            <Link to="/grootouderboek-invullen">
              <PenLine className="h-4 w-4 mr-2" />
              Vul zelf de vragenlijst in
            </Link>
          </Button>
        </motion.header>

        {isModerator && (
          <div className="mb-8 rounded-xl border border-primary/40 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Adminpreview</p>
                <p className="text-sm text-muted-foreground">
                  {previewMode
                    ? "U ziet nu ook nog niet-goedgekeurde inzendingen. Dit is enkel voor u zichtbaar; bezoekers zien alleen gepubliceerde verhalen."
                    : "U ziet de pagina zoals bezoekers ze zien."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Switch id="preview-mode" checked={previewMode} onCheckedChange={setPreviewMode} />
              <Label htmlFor="preview-mode" className="text-sm cursor-pointer">Concepten tonen</Label>
              <Button asChild size="sm" variant="outline">
                <Link to="/moderatie/grootouderverhalen">Moderatie</Link>
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : verhalen.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/70 bg-card/40 p-10 text-center">
            <p className="text-foreground/80">
              {previewMode
                ? "Er zijn nog geen inzendingen ontvangen."
                : "Er zijn nog geen verhalen gepubliceerd. Bent u grootouder, grootoom of groottante in deze familie — met of zonder kinderen? Vul dan als eerste de vragenlijst in."}
            </p>
          </div>
        ) : (
          <>
            {previewMode && (
              <p className="mb-6 text-sm text-muted-foreground">
                {verhalen.length} inzending(en) — waarvan {aantalConcept} nog niet gepubliceerd.
              </p>
            )}
            <div className="space-y-14">
              {verhalen.map((v, i) => (
                <motion.article
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.2) }}
                  className={`rounded-xl border bg-card/50 p-6 ${
                    v.approved === false ? "border-dashed border-primary/50 bg-primary/[0.03]" : "border-border/60"
                  }`}
                >
                  <header className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    {v.foto_url && fotos[v.foto_url] && (
                      <img
                        src={fotos[v.foto_url]}
                        alt={`Portret van ${v.naam}`}
                        loading="lazy"
                        className="w-24 h-24 rounded-full object-cover border border-border/60"
                      />
                    )}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-serif font-bold text-foreground">{v.naam}</h2>
                          {(() => {
                            const rel = (v.relatie || "").trim();
                            const zonder = /zonder\s+(kinderen of kleinkinderen|kinderen|kleinkinderen)/i.test(rel);
                            const base = rel.replace(/zonder\s+(kinderen of kleinkinderen|kinderen|kleinkinderen)\s*/i, "").replace(/,\s*$/, "").trim();
                            return (
                              <>
                                {base && (
                                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    {base}
                                  </span>
                                )}
                                {zonder && (
                                  <span className="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                                    Zonder kinderen of kleinkinderen
                                  </span>
                                )}
                              </>
                            );
                          })()}
                          {previewMode && (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                v.approved === false
                                  ? "bg-primary/15 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Eye className="h-3 w-3" />
                              {v.approved === false ? "Concept — niet publiek" : "Gepubliceerd"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {[v.geboortejaar && `geboren ${v.geboortejaar}`, v.woonplaats].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                  </header>

                  <div className="space-y-8">
                    {grootouderVraagGroepen.map((groep) => {
                      const items = groep.vragen.filter((q) => (v.antwoorden[q.id] ?? "").trim().length > 0);
                      if (!items.length) return null;
                      return (
                        <section key={groep.id}>
                          <h3 className="text-lg font-serif font-bold text-primary mb-3">{groep.titel}</h3>
                          <div className="space-y-4">
                            {items.map((q) => (
                              <div key={q.id} className="rounded-lg border border-border/50 bg-card/60 p-4">
                                <p className="font-semibold text-foreground text-sm">{q.vraag}</p>
                                <p className="mt-1 text-foreground/85 italic leading-relaxed flex gap-2">
                                  <Quote className="h-4 w-4 text-primary/60 flex-shrink-0 mt-1" />
                                  <span className="whitespace-pre-line">{v.antwoorden[q.id]}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GrootouderVerhalen;
