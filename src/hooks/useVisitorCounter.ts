import { useEffect, useState } from "react";

import {
  getVisitorCount,
  incrementVisitorCount,
} from "../services/visitorService";

const VISITOR_STORAGE_KEY = "portfolio-has-visited";

interface VisitorCounterState {
  count: number | null;
  isLoading: boolean;
  error: string | null;
}

export function useVisitorCounter(): VisitorCounterState {
  const [count, setCount] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadVisitorCount() {
      try {
        const hasVisited = localStorage.getItem(VISITOR_STORAGE_KEY) === "true";

        const visitorCount = hasVisited
          ? await getVisitorCount()
          : await incrementVisitorCount();

        if (!isMounted) {
          return;
        }

        if (!hasVisited) {
          localStorage.setItem(VISITOR_STORAGE_KEY, "true");
        }

        setCount(visitorCount);
        setError(null);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        console.error(
          "Falha ao carregar contador de visitantes:",
          requestError,
        );

        setError("Não foi possível carregar o contador.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    count,
    isLoading,
    error,
  };
}
