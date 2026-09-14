import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Quote, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import { bladen } from "@/data/grootouderboekBladen";

const Grootouderboek = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <Link
          to="/#ouders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar het hoofdstuk &ldquo;Jooris &amp; Simonne&rdquo;
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 mb-10"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-semibold">Bijlage</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
            Het Grootouderboek van Simonne Vandeputte
          </h1>
          <p className="mt-4 text-foreground/80 leading-relaxed max-w-3xl">
            Een invulboek dat omstreeks 1992 door kleindochter Barbara Declercq aan haar grootmoeder Simonne Vandeputte
            (1929-2012) geschonken werd als schoolopdracht. Door de vele vragen te beantwoorden schreef zij een ware
            levensbeschrijving neer: haar jeugd in de Roeselaarsestraat, het gezin Vandeputte, de oorlogsjaren en het
            Izegem van de jaren 1930 en &rsquo;40. Het boek werd ingescand enkele dagen na haar begrafenis, op de dag
            dat zij 88 zou geworden zijn; het origineel wordt bewaard door Barbara.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-3xl">
            Niet alle bladen werden ingevuld — vandaar de onregelmatige nummering. Onder elke scan staat een
            transcriptie, met minimale aanpassingen omwille van de leesbaarheid.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/grootouderverhalen"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              Grootouderverhalen uit de familie
            </Link>
            <Link
              to="/grootouderboek-invullen"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <PenLine className="h-4 w-4" />
              Vul zelf de vragenlijst in
            </Link>
          </div>
        </motion.header>

        <div className="space-y-14">
          {bladen.map((blad, i) => (
            <motion.article
              key={blad.nr}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.2) }}
              className="grid gap-6 md:grid-cols-2 md:items-start"
            >
              <figure className="rounded-lg overflow-hidden border border-border/60 bg-card/60 shadow-md">
                <ImageMagnifier src={blad.src} alt={blad.alt} className="w-full h-auto" />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border/60">
                  Blad {blad.nr} — {blad.titel}. Handschrift van Simonne Vandeputte, ca. 1992.
                </figcaption>
              </figure>

              <div className="space-y-4">
                <h2 className="text-xl font-serif font-bold text-foreground">
                  <span className="text-primary mr-2">{blad.nr}.</span>
                  {blad.titel}
                </h2>
                {blad.transcriptie.map((item) => (
                  <div key={item.vraag} className="rounded-lg border border-border/50 bg-card/50 p-4">
                    <p className="font-semibold text-foreground text-sm">{item.vraag}</p>
                    <p className="mt-1 text-foreground/85 italic leading-relaxed flex gap-2">
                      <Quote className="h-4 w-4 text-primary/60 flex-shrink-0 mt-1" />
                      <span>{item.antwoord}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Grootouderboek;
