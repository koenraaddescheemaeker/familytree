import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContentGateProps {
  children: ReactNode;
}

const ContentGate = ({ children }: ContentGateProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show content normally if user is logged in or still loading
  if (isLoading || user) {
    return <>{children}</>;
  }

  // Show teaser with gradient blur for non-authenticated users
  return (
    <div className="relative overflow-hidden">
      {/* Content with gradient mask - first part visible, rest blurred */}
      <div className="relative">
        {/* Visible teaser section */}
        <motion.div 
          className="pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 300px, transparent 500px)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 300px, transparent 500px)",
          }}
        >
          {children}
        </motion.div>
        
        {/* Blurred section that shows through */}
        <motion.div 
          className="absolute inset-0 blur-md pointer-events-none select-none" 
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 250px, black 450px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 250px, black 450px)",
          }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Overlay with registration prompt - positioned lower */}
      <motion.div 
        className="absolute inset-x-0 top-[350px] bottom-0 flex items-start justify-center pt-16 bg-gradient-to-b from-transparent via-background/80 to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="text-center p-8 max-w-md mx-4 bg-card rounded-xl shadow-lg border sticky top-8"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.7, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
          >
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            {t('gate.title')}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            {t('gate.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <Button onClick={() => navigate("/auth")} size="lg">
              {t('gate.register')}
            </Button>
            <Button variant="outline" onClick={() => navigate("/auth")} size="lg">
              {t('gate.login')}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContentGate;
