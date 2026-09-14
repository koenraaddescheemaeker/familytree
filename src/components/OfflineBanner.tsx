import { useState, useEffect, useRef } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { t } = useLanguage();
  const wasOffline = useRef(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (wasOffline.current) {
        toast({
          title: t('errors.backOnline'),
          description: t('errors.connectionRestored'),
          duration: 3000,
        });
      }
      wasOffline.current = false;
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      wasOffline.current = true;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-destructive text-destructive-foreground py-3 px-4 flex items-center justify-center gap-2 shadow-lg"
          role="alert"
          aria-live="assertive"
        >
          <WifiOff className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium text-sm">{t('errors.offlineMode')}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
