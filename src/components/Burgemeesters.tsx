import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import stadhuisIzegem from "@/assets/stadhuis-izegem-gevel.jpg";

interface Mayor {
  name: string;
  period: string;
  party?: string;
}

const izegemMayors: Mayor[] = [
  // 19e eeuw (vóór volledige verificatie beschikbaar)
  { name: "Joseph Vanden Bogaerde", period: "1830-1832" },
  { name: "Jean-Baptiste Tanghe", period: "1836-1848" },
  { name: "Charles Vandenberghe", period: "1848-1857" },
  { name: "August Vandenberghe", period: "1857-1884" },
  { name: "Jules Bossaert", period: "1885-1895" },
  { name: "Eugène Rosseel", period: "1895-1900" },
  { name: "Valère Vanden Bogaerde", period: "1900-1904" },
  // 20e eeuw - geverifieerd via Wikipedia
  { name: "Emile Allewaert", period: "1945-1958", party: "CVP" },
  { name: "André Bourgeois", period: "1965-1970", party: "CVP" },
  { name: "Gustaaf Nyffels", period: "1971-1976", party: "BSP" },
  { name: "Gustaaf Nyffels", period: "1983", party: "SP" },
  { name: "Robert Vanlerberghe", period: "1983-1988", party: "SP" },
  { name: "Willy Verledens", period: "1993-2007", party: "CVP" },
  { name: "Gerda Mylle", period: "2007-2012", party: "CD&V" },
  { name: "Bert Maertens", period: "2013-2024", party: "N-VA" },
  { name: "Kurt Grymonprez", period: "2024-heden", party: "cd&v" },
];

const Burgemeesters = () => {
  const { language } = useLanguage();

  const translations = {
    nl: {
      badge: "Lokaal Bestuur",
      title: "Burgemeesters van Izegem & Emelgem",
      subtitle: "De lokale leiders door de eeuwen heen — van de eerste Belgische onafhankelijkheid tot vandaag",
      izegem: "Burgemeesters van Izegem",
      izegemDesc: "Vanaf de Belgische onafhankelijkheid in 1830 tot heden",
      emelgem: "Burgemeesters van Emelgem",
      emelgemDesc: "Tot de fusie met Izegem in 1965",
      context: "Historische Context",
      contextText1: "Toen de familie Deforce zich rond 1699 in Izegem vestigde, was het lokaal bestuur nog heel anders georganiseerd. Pas na de Belgische onafhankelijkheid in 1830 kreeg Izegem een eigen burgemeester in de moderne zin van het woord.",
      contextText2: "Emelgem, waar ook veel Deforces woonden, was tot 1965 een zelfstandige gemeente. In 1977 volgde Kachtem met de tweede grote fusiegolf.",
      noData: "Geen volledige lijst beschikbaar",
      noDataDesc: "Voor Emelgem is geen volledige lijst van burgemeesters bewaard gebleven in de openbare archieven. Het stadsarchief van Izegem (archief@izegem.be) kan mogelijk helpen met specifieke onderzoeksvragen.",
      period: "Ambtsperiode",
      party: "Partij",
      current: "huidig",
      merged: "Fusie 1965",
      mergedText: "Op 1 januari 1965 werd Emelgem administratief bij Izegem gevoegd. Kachtem volgde pas op 1 januari 1977.",
      townHallCaption: "Stadhuis van Izegem aan de Korenmarkt — beschermd monument sinds 1981",
      photoCredit: "Foto: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Let op: De periode 1904-1945 en 1958-1965 is onvolledig gedocumenteerd. Neem contact op met het stadsarchief van Izegem (archief@izegem.be) voor meer informatie.",
    },
    en: {
      badge: "Local Government",
      title: "Mayors of Izegem & Emelgem",
      subtitle: "Local leaders through the centuries — from Belgian independence to the present day",
      izegem: "Mayors of Izegem",
      izegemDesc: "From Belgian independence in 1830 to the present",
      emelgem: "Mayors of Emelgem",
      emelgemDesc: "Until the merger with Izegem in 1965",
      context: "Historical Context",
      contextText1: "When the Deforce family settled in Izegem around 1699, local government was organized very differently. It was only after Belgian independence in 1830 that Izegem got its own mayor in the modern sense.",
      contextText2: "Emelgem, where many Deforces also lived, was an independent municipality until 1965. Kachtem followed in the second wave of mergers in 1977.",
      noData: "No complete list available",
      noDataDesc: "No complete list of mayors for Emelgem has been preserved in public archives. The Izegem city archive (archief@izegem.be) may be able to help with specific research questions.",
      period: "Term of office",
      party: "Party",
      current: "current",
      merged: "Merger 1965",
      mergedText: "On January 1, 1965, Emelgem was administratively incorporated into Izegem. Kachtem followed on January 1, 1977.",
      townHallCaption: "Izegem Town Hall on Korenmarkt — protected monument since 1981",
      photoCredit: "Photo: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Note: The periods 1904-1945 and 1958-1965 are incompletely documented. Contact the Izegem city archive (archief@izegem.be) for more information.",
    },
    fr: {
      badge: "Administration Locale",
      title: "Bourgmestres d'Izegem & Emelgem",
      subtitle: "Les dirigeants locaux à travers les siècles — de l'indépendance belge à nos jours",
      izegem: "Bourgmestres d'Izegem",
      izegemDesc: "Depuis l'indépendance belge en 1830 jusqu'à aujourd'hui",
      emelgem: "Bourgmestres d'Emelgem",
      emelgemDesc: "Jusqu'à la fusion avec Izegem en 1965",
      context: "Contexte Historique",
      contextText1: "Lorsque la famille Deforce s'est installée à Izegem vers 1699, l'administration locale était organisée très différemment. Ce n'est qu'après l'indépendance belge en 1830 qu'Izegem a eu son propre bourgmestre au sens moderne.",
      contextText2: "Emelgem, où vivaient également de nombreux Deforce, était une commune indépendante jusqu'en 1965. Kachtem a suivi lors de la deuxième vague de fusions en 1977.",
      noData: "Pas de liste complète disponible",
      noDataDesc: "Aucune liste complète des bourgmestres d'Emelgem n'a été conservée dans les archives publiques. Les archives municipales d'Izegem (archief@izegem.be) peuvent aider pour des questions de recherche spécifiques.",
      period: "Mandat",
      party: "Parti",
      current: "actuel",
      merged: "Fusion 1965",
      mergedText: "Le 1er janvier 1965, Emelgem a été administrativement rattachée à Izegem. Kachtem a suivi le 1er janvier 1977.",
      townHallCaption: "Hôtel de ville d'Izegem sur le Korenmarkt — monument protégé depuis 1981",
      photoCredit: "Photo: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Remarque : Les périodes 1904-1945 et 1958-1965 sont incomplètement documentées. Contactez les archives municipales d'Izegem (archief@izegem.be) pour plus d'informations.",
    },
    de: {
      badge: "Lokale Verwaltung",
      title: "Bürgermeister von Izegem & Emelgem",
      subtitle: "Die lokalen Führer durch die Jahrhunderte — von der belgischen Unabhängigkeit bis heute",
      izegem: "Bürgermeister von Izegem",
      izegemDesc: "Von der belgischen Unabhängigkeit 1830 bis heute",
      emelgem: "Bürgermeister von Emelgem",
      emelgemDesc: "Bis zur Fusion mit Izegem 1965",
      context: "Historischer Kontext",
      contextText1: "Als sich die Familie Deforce um 1699 in Izegem niederließ, war die Kommunalverwaltung noch ganz anders organisiert. Erst nach der belgischen Unabhängigkeit 1830 bekam Izegem einen eigenen Bürgermeister im modernen Sinne.",
      contextText2: "Emelgem, wo auch viele Deforces lebten, war bis 1965 eine eigenständige Gemeinde. Kachtem folgte in der zweiten Fusionswelle 1977.",
      noData: "Keine vollständige Liste verfügbar",
      noDataDesc: "Für Emelgem ist keine vollständige Liste der Bürgermeister in öffentlichen Archiven erhalten. Das Stadtarchiv Izegem (archief@izegem.be) kann bei spezifischen Forschungsfragen helfen.",
      period: "Amtszeit",
      party: "Partei",
      current: "aktuell",
      merged: "Fusion 1965",
      mergedText: "Am 1. Januar 1965 wurde Emelgem administrativ mit Izegem zusammengelegt. Kachtem folgte am 1. Januar 1977.",
      townHallCaption: "Rathaus von Izegem am Korenmarkt — seit 1981 unter Denkmalschutz",
      photoCredit: "Foto: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Hinweis: Die Zeiträume 1904-1945 und 1958-1965 sind unvollständig dokumentiert. Kontaktieren Sie das Stadtarchiv Izegem (archief@izegem.be) für weitere Informationen.",
    },
    es: {
      badge: "Gobierno Local",
      title: "Alcaldes de Izegem y Emelgem",
      subtitle: "Los líderes locales a través de los siglos — desde la independencia belga hasta hoy",
      izegem: "Alcaldes de Izegem",
      izegemDesc: "Desde la independencia belga en 1830 hasta la actualidad",
      emelgem: "Alcaldes de Emelgem",
      emelgemDesc: "Hasta la fusión con Izegem en 1965",
      context: "Contexto Histórico",
      contextText1: "Cuando la familia Deforce se estableció en Izegem alrededor de 1699, el gobierno local estaba organizado de manera muy diferente. Solo después de la independencia belga en 1830 Izegem tuvo su propio alcalde en el sentido moderno.",
      contextText2: "Emelgem, donde también vivían muchos Deforce, fue un municipio independiente hasta 1965. Kachtem siguió en la segunda ola de fusiones en 1977.",
      noData: "Sin lista completa disponible",
      noDataDesc: "No se ha conservado ninguna lista completa de alcaldes de Emelgem en los archivos públicos. El archivo municipal de Izegem (archief@izegem.be) puede ayudar con preguntas de investigación específicas.",
      period: "Mandato",
      party: "Partido",
      current: "actual",
      merged: "Fusión 1965",
      mergedText: "El 1 de enero de 1965, Emelgem fue incorporada administrativamente a Izegem. Kachtem siguió el 1 de enero de 1977.",
      townHallCaption: "Ayuntamiento de Izegem en Korenmarkt — monumento protegido desde 1981",
      photoCredit: "Foto: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Nota: Los períodos 1904-1945 y 1958-1965 están documentados de forma incompleta. Contacte el archivo municipal de Izegem (archief@izegem.be) para más información.",
    },
    pcd: {
      badge: "Administrasion Locale",
      title: "Mayeurs d'Izegem & Emelgem",
      subtitle: "Les dirigints locaux à travers les siékes — d'l'indépindance belche à nos jours",
      izegem: "Mayeurs d'Izegem",
      izegemDesc: "Dépis l'indépindance belche in 1830 juque à aujord'hui",
      emelgem: "Mayeurs d'Emelgem",
      emelgemDesc: "Juque à l'fusion avuc Izegem in 1965",
      context: "Contéxte Historique",
      contextText1: "Quand l'famile Deforce s'a instalé à Izegem vers 1699, l'administrasion locale étot organisée bien autermint. C'est seulemint après l'indépindance belche in 1830 qu'Izegem a yeu sin propre mayeur au sins moderne.",
      contextText2: "Emelgem, ouque vivotent aussi biacop éd Deforce, étot eune comune indépindante juque à 1965. Kachtem a suivi dins l'deuxième vague éd fusions in 1977.",
      noData: "Point d'liste compléte disponibe",
      noDataDesc: "Aucune liste compléte des mayeurs d'Emelgem n'a été conservée dins les archives publiques. Les archives municipales d'Izegem (archief@izegem.be) peuvte aider pour des quéstions éd recherke spécifiques.",
      period: "Mandat",
      party: "Parti",
      current: "actuel",
      merged: "Fusion 1965",
      mergedText: "Él 1er d'janvié 1965, Emelgem a été administrativement rattachée à Izegem. Kachtem a suivi l'1er d'janvié 1977.",
      townHallCaption: "Mâzon d'vile d'Izegem sul Korenmarkt — monumint protégé dépis 1981",
      photoCredit: "Foto: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Remarque : Les périodes 1904-1945 et 1958-1965 sont incomplètemint documintées. Contactez les archives municipales d'Izegem (archief@izegem.be) pour pus d'informations.",
    },
    vls: {
      badge: "Lokaal Bestuur",
      title: "Burgemeesters van Izegem & Emelgem",
      subtitle: "De lokale leiders deur de eeuwen heen — van de Belgische onafhankelijkheid tot vandoage",
      izegem: "Burgemeesters van Izegem",
      izegemDesc: "Sinds de Belgische onafhankelijkheid in 1830 tot nu",
      emelgem: "Burgemeesters van Emelgem",
      emelgemDesc: "Tot de fusie mee Izegem in 1965",
      context: "Historische Context",
      contextText1: "Toen de familie Deforce hun rond 1699 in Izegem vestigde, wos t lokaal bestuur nog heel anders georganiseerd. Pas noa de Belgische onafhankelijkheid in 1830 kreeg Izegem e eigen burgemeester in de moderne zin van t woord.",
      contextText2: "Emelgem, woar oak vele Deforces wônden, wos tot 1965 e zelfstandige gemeente. Kachtem volgde in de tweede fusiegolf in 1977.",
      noData: "Gin volledige lieste beschikboar",
      noDataDesc: "Vôor Emelgem is der gin volledige lieste van burgemeesters bewoard gebleven in de openbare archieven. T stadsarchief van Izegem (archief@izegem.be) kan meugeliks helpen mee specifieke onderzoeksvroagen.",
      period: "Ambtsperiode",
      party: "Partye",
      current: "huidig",
      merged: "Fusie 1965",
      mergedText: "Op 1 januari 1965 wier Emelgem administratief bie Izegem gevoegd. Kachtem volgde op 1 januari 1977.",
      townHallCaption: "Stoahuis van Izegem an de Korenmarkt — beschermd monument sinds 1981",
      photoCredit: "Foto: Onroerend Erfgoed Vlaanderen",
      incompleteNote: "Let op: De periode 1904-1945 en 1958-1965 is onvolledig gedocumenteerd. Neem contact op mee t stadsarchief van Izegem (archief@izegem.be) vôor meer informatie.",
    },
  };

  const t = translations[language] || translations.nl;

  return (
    <section id="burgemeesters" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Town Hall Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <figure className="relative overflow-hidden rounded-xl">
            <img
              src={stadhuisIzegem}
              alt={t.townHallCaption}
              className="w-full h-64 md:h-80 object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm md:text-base font-medium">
                {t.townHallCaption}
              </p>
              <p className="text-white/70 text-xs">
                {t.photoCredit}
              </p>
            </figcaption>
          </figure>
        </motion.div>

        {/* Historical Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="w-5 h-5 text-primary" />
                {t.context}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t.contextText1}</p>
              <p className="text-muted-foreground">{t.contextText2}</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Izegem Mayors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t.izegem}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.izegemDesc}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {izegemMayors.map((mayor, index) => (
                    <motion.div
                      key={mayor.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        index === izegemMayors.length - 1
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-foreground">{mayor.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {mayor.period.includes("heden") 
                              ? mayor.period.replace("heden", t.current)
                              : mayor.period}
                          </span>
                        </div>
                      </div>
                      {mayor.party && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {mayor.party}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Incomplete periods note */}
                <div className="mt-4 p-3 rounded-lg bg-muted border border-primary/30">
                  <p className="text-sm text-muted-foreground">
                    ⚠️ {t.incompleteNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emelgem Mayors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t.emelgem}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{t.emelgemDesc}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* No data message */}
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <h4 className="font-medium text-foreground mb-2">{t.noData}</h4>
                  <p className="text-sm text-muted-foreground">{t.noDataDesc}</p>
                </div>

                <Separator />

                {/* Merger info */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {t.merged}
                  </h4>
                  <p className="text-sm text-muted-foreground">{t.mergedText}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Burgemeesters;
