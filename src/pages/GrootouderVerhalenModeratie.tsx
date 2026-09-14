import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Trash2, Loader2, Shield, EyeOff } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { grootouderVraagGroepen } from "@/data/grootouderVragen";

type Rij = {
  id: string;
  naam: string;
  woonplaats: string | null;
  geboortejaar: string | null;
  relatie: string | null;
  email: string | null;
  antwoorden: Record<string, string>;
  foto_url: string | null;
  approved: boolean;
  created_at: string;
};

const GrootouderVerhalenModeratie = () => {
  const navigate = useNavigate();
  const [rijen, setRijen] = useState<Rij[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heeftToegang, setHeeftToegang] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setHeeftToegang(false);
        setIsLoading(false);
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const ok = !!roles?.some((r) => r.role === "admin" || r.role === "moderator");
      setHeeftToegang(ok);
      if (ok) await laad();
      setIsLoading(false);
    };
    init();
  }, []);

  const laad = async () => {
    const { data, error } = await supabase
      .from("grootouder_verhalen")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Laden mislukt");
      return;
    }
    setRijen(((data ?? []) as unknown as Rij[]).map((r) => ({ ...r, antwoorden: (r.antwoorden ?? {}) as Record<string, string> })));
  };

  const zetStatus = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("grootouder_verhalen").update({ approved }).eq("id", id);
    if (error) return toast.error("Bijwerken mislukt");
    toast.success(approved ? "Gepubliceerd" : "Verborgen");
    laad();
  };

  const verwijder = async (id: string) => {
    const { error } = await supabase.from("grootouder_verhalen").delete().eq("id", id);
    if (error) return toast.error("Verwijderen mislukt");
    toast.success("Verwijderd");
    laad();
  };

  const zichtbaar = rijen.filter((r) =>
    filter === "all" ? true : filter === "pending" ? !r.approved : r.approved
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl">
        <Link to="/grootouderverhalen" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Naar de bijlage
        </Link>
        <h1 className="mt-6 mb-6 text-3xl font-serif font-bold text-foreground flex items-center gap-3">
          <Shield className="h-7 w-7 text-primary" /> Moderatie grootouderverhalen
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : !heeftToegang ? (
          <div className="rounded-xl border border-border/60 bg-card/60 p-8 text-center">
            <p className="text-foreground/80">U hebt geen toegang tot deze pagina.</p>
            <Button className="mt-4" onClick={() => navigate("/auth")}>Aanmelden</Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              {(["pending", "approved", "all"] as const).map((f) => (
                <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
                  {f === "pending" ? "Te beoordelen" : f === "approved" ? "Gepubliceerd" : "Alle"}
                </Button>
              ))}
            </div>

            {zichtbaar.length === 0 ? (
              <p className="text-muted-foreground">Geen inzendingen in deze weergave.</p>
            ) : (
              <div className="space-y-6">
                {zichtbaar.map((r) => (
                  <article key={r.id} className="rounded-xl border border-border/60 bg-card/50 p-5">
                    <header className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-serif font-bold text-foreground">{r.naam}</h2>
                        <p className="text-sm text-muted-foreground">
                          {[r.geboortejaar, r.woonplaats, r.email].filter(Boolean).join(" · ")}
                        </p>
                        {(() => {
                          const rel = (r.relatie || "").trim();
                          const zonder = /zonder\s+(kinderen of kleinkinderen|kinderen|kleinkinderen)/i.test(rel);
                          const base = rel.replace(/zonder\s+(kinderen of kleinkinderen|kinderen|kleinkinderen)\s*/i, "").replace(/,\s*$/, "").trim();
                          return (
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {base && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                  {base}
                                </span>
                              )}
                              {zonder && (
                                <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                                  Zonder kinderen of kleinkinderen
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex gap-2">
                        {r.approved ? (
                          <Button size="sm" variant="outline" onClick={() => zetStatus(r.id, false)}>
                            <EyeOff className="h-4 w-4 mr-1" /> Verbergen
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => zetStatus(r.id, true)}>
                            <Check className="h-4 w-4 mr-1" /> Publiceren
                          </Button>
                        )}
                        <Button size="sm" variant="destructive" onClick={() => verwijder(r.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </header>
                    <div className="mt-4 space-y-3">
                      {grootouderVraagGroepen.flatMap((g) => g.vragen)
                        .filter((q) => (r.antwoorden[q.id] ?? "").trim().length > 0)
                        .map((q) => (
                          <div key={q.id} className="rounded-lg border border-border/50 p-3">
                            <p className="text-sm font-semibold text-foreground">{q.vraag}</p>
                            <p className="text-sm text-foreground/85 whitespace-pre-line">{r.antwoorden[q.id]}</p>
                          </div>
                        ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GrootouderVerhalenModeratie;
