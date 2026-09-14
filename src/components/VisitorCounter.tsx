import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const registerVisit = async () => {
      // Check if this visitor has already been counted today
      const today = new Date().toDateString();
      const visitorKey = `deforce_visitor_${today}`;
      const existingVisitorId = localStorage.getItem(visitorKey);

      if (!existingVisitorId) {
        // Generate a simple anonymous visitor ID
        const visitorId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        
        // Store in localStorage to prevent duplicate counting
        localStorage.setItem(visitorKey, visitorId);

        // Insert the visit
        await supabase.from("site_visits").insert({
          visitor_id: visitorId,
          page_path: window.location.pathname,
        });
      }
    };

    const fetchVisitorCount = async () => {
      try {
        // Count unique visitors
        const { count, error } = await supabase
          .from("site_visits")
          .select("visitor_id", { count: "exact", head: true });

        if (error) {
          console.error("Error fetching visitor count:", error);
          return;
        }

        setVisitorCount(count || 0);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    registerVisit();
    fetchVisitorCount();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-primary/10 border border-primary/20"
    >
      <Users className="w-4 h-4 text-primary" />
      <span className="font-serif text-sm text-primary">
        {isLoading ? (
          <span className="animate-pulse">---</span>
        ) : (
          <>
            <span className="font-semibold">{visitorCount?.toLocaleString()}</span>{" "}
            {t("footer.visitors")}
          </>
        )}
      </span>
    </motion.div>
  );
};

export default VisitorCounter;
