import { useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface QueuedAction {
  id: string;
  action: () => Promise<unknown>;
  description: string;
  retryCount: number;
  maxRetries: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Global queue to persist across component instances
let actionQueue: QueuedAction[] = [];
let isProcessing = false;

export const useRetryQueue = () => {
  const { t } = useLanguage();
  const isOnline = useRef(navigator.onLine);

  const processQueue = useCallback(async () => {
    if (isProcessing || actionQueue.length === 0 || !navigator.onLine) return;
    
    isProcessing = true;
    const successfulIds: string[] = [];
    const failedActions: QueuedAction[] = [];

    for (const item of actionQueue) {
      try {
        await item.action();
        successfulIds.push(item.id);
      } catch (error) {
        if (item.retryCount < item.maxRetries) {
          failedActions.push({ ...item, retryCount: item.retryCount + 1 });
        } else {
          console.error(`Action "${item.description}" failed after ${item.maxRetries} retries:`, error);
        }
      }
    }

    actionQueue = failedActions;
    isProcessing = false;

    if (successfulIds.length > 0) {
      toast({
        title: t('errors.backOnline'),
        description: t('errors.syncComplete').replace('{count}', successfulIds.length.toString()),
        duration: 3000,
      });
    }
  }, [t]);

  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      // Small delay to ensure connection is stable
      setTimeout(() => {
        processQueue();
      }, RETRY_DELAY);
    };

    const handleOffline = () => {
      isOnline.current = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Process any pending items on mount if online
    if (navigator.onLine && actionQueue.length > 0) {
      processQueue();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [processQueue]);

  const addToQueue = useCallback((
    action: () => Promise<unknown>,
    description: string,
    maxRetries: number = MAX_RETRIES
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    actionQueue.push({
      id,
      action,
      description,
      retryCount: 0,
      maxRetries,
    });
    return id;
  }, []);

  const executeWithRetry = useCallback(async <T>(
    action: () => Promise<T>,
    description: string = 'Database action'
  ): Promise<T> => {
    // If online, execute immediately
    if (navigator.onLine) {
      try {
        return await action();
      } catch (error) {
        // If failed and might be a network error, queue for retry
        if (!navigator.onLine || isNetworkError(error)) {
          addToQueue(action, description);
          toast({
            title: t('errors.offlineMode'),
            description: t('errors.actionQueued'),
            duration: 3000,
          });
          throw error;
        }
        throw error;
      }
    } else {
      // If offline, queue the action
      addToQueue(action, description);
      toast({
        title: t('errors.offlineMode'),
        description: t('errors.actionQueued'),
        duration: 3000,
      });
      throw new Error('Offline - action queued for retry');
    }
  }, [addToQueue, t]);

  const getQueueLength = useCallback(() => actionQueue.length, []);

  const clearQueue = useCallback(() => {
    actionQueue = [];
  }, []);

  return {
    executeWithRetry,
    addToQueue,
    getQueueLength,
    clearQueue,
    processQueue,
  };
};

// Helper to detect network-related errors
function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  if (error instanceof Error) {
    const networkErrorMessages = [
      'network',
      'failed to fetch',
      'networkerror',
      'connection',
      'offline',
      'timeout',
    ];
    return networkErrorMessages.some(msg => 
      error.message.toLowerCase().includes(msg)
    );
  }
  return false;
}
