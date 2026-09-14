import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GameProvider } from "@/contexts/GameContext";
import { ReadingModeProvider } from "@/contexts/ReadingModeContext";
import AchievementPopup from "@/components/game/AchievementPopup";
import ErrorBoundary from "@/components/ErrorBoundary";
import { OfflineBanner } from "@/components/OfflineBanner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import GastboekModeratie from "./pages/GastboekModeratie";
import ChtiWoordenboek from "./pages/ChtiWoordenboek";
import Instellingen from "./pages/Instellingen";
import MijnNotities from "./pages/MijnNotities";
import GedeeldeNotitie from "./pages/GedeeldeNotitie";
import AdminAnalytics from "./pages/AdminAnalytics";
import NotFound from "./pages/NotFound";
import Overledenen from "./pages/Overledenen";
import Hoofdstukken from "./pages/Hoofdstukken";
import Grootouderboek from "./pages/Grootouderboek";
import GrootouderVragenlijst from "./pages/GrootouderVragenlijst";
import GrootouderVerhalen from "./pages/GrootouderVerhalen";
import GrootouderVerhalenModeratie from "./pages/GrootouderVerhalenModeratie";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ReadingModeProvider>
            <LanguageProvider>
              <GameProvider>
                <Toaster />
                <Sonner />
                <OfflineBanner />
                <AchievementPopup />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/moderatie" element={<GastboekModeratie />} />
                    <Route path="/chti-woordenboek" element={<ChtiWoordenboek />} />
                    <Route path="/instellingen" element={<Instellingen />} />
                    <Route path="/mijn-notities" element={<MijnNotities />} />
                    <Route path="/gedeelde-notitie/:token" element={<GedeeldeNotitie />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/overledenen" element={<Overledenen />} />
                    <Route path="/hoofdstukken" element={<Hoofdstukken />} />
                    <Route path="/grootouderboek" element={<Grootouderboek />} />
                    <Route path="/grootouderboek-invullen" element={<GrootouderVragenlijst />} />
                    <Route path="/grootouderverhalen" element={<GrootouderVerhalen />} />
                    <Route path="/moderatie/grootouderverhalen" element={<GrootouderVerhalenModeratie />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </GameProvider>
            </LanguageProvider>
          </ReadingModeProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;