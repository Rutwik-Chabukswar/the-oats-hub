/**
 * useMediaQuery — SSR-safe responsive breakpoint hook.
 *
 * Returns `false` during SSR and initial hydration to prevent mismatch.
 * Only evaluates the media query after the component has mounted.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Hook to check if a media query matches (SSR-safe).
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query))
    }

    const matchMedia = window.matchMedia(query)

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}
