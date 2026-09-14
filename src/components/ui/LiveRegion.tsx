import { useEffect, useState } from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearAfter?: number;
}

/**
 * A component that announces messages to screen readers using ARIA live regions.
 * 
 * @param message - The message to announce
 * @param politeness - 'polite' waits for user to finish, 'assertive' interrupts immediately
 * @param clearAfter - Time in ms to clear the message (default: 5000)
 */
const LiveRegion = ({ message, politeness = 'polite', clearAfter = 5000 }: LiveRegionProps) => {
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
};

export default LiveRegion;
