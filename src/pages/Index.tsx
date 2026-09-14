import { lazy, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import GlobalImageNumbering from "@/components/GlobalImageNumbering";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import ReadingProgress from "@/components/ReadingProgress";
import ExplorationComplete from "@/components/ExplorationComplete";
import UpdateNotification from "@/components/UpdateNotification";
import AdminUpdateManager from "@/components/AdminUpdateManager";
import FamilyHistoryChat from "@/components/FamilyHistoryChat";
import RegisterBanner from "@/components/RegisterBanner";
import ConstructionBanner from "@/components/ConstructionBanner";
import SectionTracker from "@/components/SectionTracker";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Upload, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Lazy load all heavy content sections
const Voorwoord = lazy(() => import("@/components/Voorwoord"));
const Timeline = lazy(() => import("@/components/Timeline"));
const Zoektocht = lazy(() => import("@/components/Zoektocht"));
const PicardischDialect = lazy(() => import("@/components/PicardischDialect"));
const HistorischeKaart = lazy(() => import("@/components/HistorischeKaart"));
const InteractieveKaart = lazy(() => import("@/components/InteractieveKaart"));
const Mandelvallei = lazy(() => import("@/components/Mandelvallei"));
const IzegemTijdlijn = lazy(() => import("@/components/IzegemTijdlijn"));
const Burgemeesters = lazy(() => import("@/components/Burgemeesters"));
const Stamouders = lazy(() => import("@/components/Stamouders"));
const OorlogsGeschiedenis = lazy(() => import("@/components/OorlogsGeschiedenis"));
const OorlogsKaart = lazy(() => import("@/components/OorlogsKaart"));
const Vakmanschap = lazy(() => import("@/components/Vakmanschap"));
const CharlesLouis = lazy(() => import("@/components/CharlesLouis"));
const EmileGeldof = lazy(() => import("@/components/EmileGeldof"));
const Grootouders = lazy(() => import("@/components/Grootouders"));
const Familiebedrijf = lazy(() => import("@/components/Familiebedrijf"));
const Ouders = lazy(() => import("@/components/Ouders"));
const Verschaeve = lazy(() => import("@/components/Verschaeve"));
const DNAOnderzoek = lazy(() => import("@/components/DNAOnderzoek"));
const GeneratieTijdlijn = lazy(() => import("@/components/GeneratieTijdlijn"));
const FotoGalerij = lazy(() => import("@/components/FotoGalerij"));
const VideoGalerij = lazy(() => import("@/components/VideoGalerij"));
const Stamboom = lazy(() => import("@/components/Stamboom"));
const GedcomImport = lazy(() => import("@/components/GedcomImport"));
const Familie = lazy(() => import("@/components/Familie"));
const Bronnen = lazy(() => import("@/components/Bronnen"));
const Quiz = lazy(() => import("@/components/Quiz"));
const GameHub = lazy(() => import("@/components/game/GameHub"));
const Gastboek = lazy(() => import("@/components/Gastboek"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
);

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);
        if (data?.some(r => r.role === 'admin')) {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase.from('user_roles').select('role').eq('user_id', session.user.id).then(({ data }) => {
          setIsAdmin(data?.some(r => r.role === 'admin') ?? false);
        });
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen" role="application" aria-label="Deforce Familiegeschiedenis">
      <a 
        href="#main-content" 
        className="skip-link"
        aria-label="Ga direct naar hoofdinhoud"
      >
        Skip to main content
      </a>
      <GlobalImageNumbering />
      <RegisterBanner />
      <Navigation />
      <ScrollToTop />
      <ReadingProgress />
      <ExplorationComplete />
      <UpdateNotification />
      <AdminUpdateManager />
      <FamilyHistoryChat />
      <main id="main-content" role="main" aria-label="Hoofdinhoud">
        <Hero />
        <ConstructionBanner />
        <Suspense fallback={<SectionLoader />}>
          <SectionTracker sectionId="voorwoord">
            <Voorwoord />
          </SectionTracker>
          <SectionTracker sectionId="tijdlijn">
            <Timeline />
          </SectionTracker>
          <SectionTracker sectionId="zoektocht">
            <Zoektocht />
          </SectionTracker>
          <SectionTracker sectionId="picardisch">
            <PicardischDialect />
          </SectionTracker>
          <SectionTracker sectionId="historische-kaart">
            <HistorischeKaart />
          </SectionTracker>
          <SectionTracker sectionId="kaart">
            <InteractieveKaart />
          </SectionTracker>
          <SectionTracker sectionId="mandelvallei">
            <Mandelvallei />
          </SectionTracker>
          <SectionTracker sectionId="izegem-tijdlijn">
            <IzegemTijdlijn />
          </SectionTracker>
          <SectionTracker sectionId="burgemeesters">
            <Burgemeesters />
          </SectionTracker>
          <SectionTracker sectionId="stamouders">
            <Stamouders />
          </SectionTracker>
          <SectionTracker sectionId="oorlogen">
            <OorlogsGeschiedenis />
          </SectionTracker>
          <SectionTracker sectionId="oorlogskaart">
            <OorlogsKaart />
          </SectionTracker>
          <SectionTracker sectionId="vakmanschap">
            <Vakmanschap />
          </SectionTracker>
          <SectionTracker sectionId="charles-louis">
            <CharlesLouis />
          </SectionTracker>
          <SectionTracker sectionId="emile-geldof">
            <EmileGeldof />
          </SectionTracker>
          <SectionTracker sectionId="grootouders">
            <Grootouders />
          </SectionTracker>
          <SectionTracker sectionId="familiebedrijf">
            <Familiebedrijf />
          </SectionTracker>
          <SectionTracker sectionId="ouders">
            <Ouders />
          </SectionTracker>
          <SectionTracker sectionId="verschaeve">
            <Verschaeve />
          </SectionTracker>
          <SectionTracker sectionId="dna-onderzoek">
            <DNAOnderzoek />
          </SectionTracker>
          <SectionTracker sectionId="generaties">
            <GeneratieTijdlijn />
          </SectionTracker>
          <SectionTracker sectionId="galerij">
            <FotoGalerij />
          </SectionTracker>
          <SectionTracker sectionId="videos">
            <VideoGalerij />
          </SectionTracker>
          <SectionTracker sectionId="stamboom">
            <Stamboom />
          </SectionTracker>
          <SectionTracker sectionId="gedcom-import">
            <div id="gedcom-import" className="scroll-mt-24">
              <Collapsible>
                <CollapsibleTrigger asChild>
                   <Button variant="outline" className="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 py-6 text-base font-semibold border-2 border-primary/30 hover:border-primary/60 bg-card/80 backdrop-blur-sm shadow-md whitespace-normal text-center leading-snug min-h-[4rem]">
                     <Upload className="h-5 w-5 text-primary flex-shrink-0" />
                     <span>Alle afstammelingen van Bauduin Deleforge + partners en voorouders van Marc Deforce</span>
                     <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 [[data-state=open]_&]:rotate-180 flex-shrink-0" />
                   </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <GedcomImport isAdmin={isAdmin} />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </SectionTracker>
          <SectionTracker sectionId="familie">
            <Familie />
          </SectionTracker>
          <SectionTracker sectionId="bronnen">
            <Bronnen />
          </SectionTracker>
          <SectionTracker sectionId="quiz">
            <Quiz />
          </SectionTracker>
          <SectionTracker sectionId="spellen">
            <GameHub />
          </SectionTracker>
          <SectionTracker sectionId="gastboek">
            <Gastboek />
          </SectionTracker>
          <SectionTracker sectionId="contact">
            <Contact />
          </SectionTracker>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
