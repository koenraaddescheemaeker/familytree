import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

// Banner reappears after 1 hour (in milliseconds)
const REAPPEAR_DELAY_MS = 60 * 60 * 1000;

const RegisterBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      // Check if banner was dismissed and if enough time has passed
      const dismissedAt = localStorage.getItem('register-banner-dismissed-at');
      const canShowAgain = !dismissedAt || (Date.now() - parseInt(dismissedAt, 10)) > REAPPEAR_DELAY_MS;
      
      if (!session && canShowAgain) {
        setIsVisible(true);
      }
    };
    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsVisible(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Make sure the fixed navigation is pushed below this banner when visible.
  useEffect(() => {
    if (!isVisible || isDismissed) {
      document.documentElement.style.removeProperty('--register-banner-offset');
      return;
    }

    const height = bannerRef.current?.offsetHeight ?? 0;
    document.documentElement.style.setProperty('--register-banner-offset', `${height}px`);

    return () => {
      document.documentElement.style.removeProperty('--register-banner-offset');
    };
  }, [isVisible, isDismissed]);

  // Auto-hide banner after 10 seconds
  useEffect(() => {
    if (!isVisible || isDismissed) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, 10000);

    return () => clearTimeout(timer);
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('register-banner-dismissed-at', Date.now().toString());
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return createPortal(
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            boxShadow: [
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "0 8px 15px -3px rgba(0, 0, 0, 0.2)",
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            ]
          }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-3 px-4 fixed top-0 left-0 right-0 z-[1000] pointer-events-auto"
        >
          <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 animate-bounce" />
              <span className="font-medium text-sm md:text-base">{t('banner.register')}</span>
            </div>
            <motion.a
              href="/auth"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0.4)",
                  "0 0 20px 4px rgba(255, 255, 255, 0.6)",
                  "0 0 0 0 rgba(255, 255, 255, 0.4)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-primary-foreground/90 transition-colors cursor-pointer pointer-events-auto relative z-[1001]"
            >
              <UserPlus className="w-4 h-4" />
              {t('banner.registerButton')}
            </motion.a>
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors pointer-events-auto"
              aria-label={t('banner.dismiss')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default RegisterBanner;
