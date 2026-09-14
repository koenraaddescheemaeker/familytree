import { useRef } from "react";
import { useInView, UseInViewOptions } from "framer-motion";

interface UseInViewAnimationOptions {
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  amount?: number | "some" | "all";
}

/**
 * Custom hook for viewport-based animations.
 * Only triggers animations when elements scroll into view,
 * reducing forced reflows on initial page load.
 */
export function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin,
    amount: options.amount ?? 0.1,
  });

  return { ref, isInView };
}

export default useInViewAnimation;
