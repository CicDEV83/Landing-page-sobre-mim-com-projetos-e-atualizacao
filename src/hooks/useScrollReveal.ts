import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = "0% 0% -10% 0%";
const DEFAULT_TRIGGER_ONCE = true;

function getPrefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollReveal<T extends HTMLElement>({
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
  triggerOnce = DEFAULT_TRIGGER_ONCE,
}: UseScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  const [isVisible, setIsVisible] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || getPrefersReducedMotion()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce]);

  return {
    elementRef,
    isVisible,
  };
}
