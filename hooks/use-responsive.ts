'use client';

import React from "react"

import { useEffect, useState } from 'react';

/**
 * Hook to track if component is mounted (prevents hydration errors)
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * Hook to detect breakpoint changes
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBreakpoint('mobile');
      } else if (window.innerWidth < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook for responsive values based on breakpoint
 */
export function useResponsiveValue<T>(
  mobile: T,
  tablet?: T,
  desktop?: T
): T {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();

  if (!isMounted) return mobile;

  switch (breakpoint) {
    case 'tablet':
      return tablet ?? mobile;
    case 'desktop':
      return desktop ?? tablet ?? mobile;
    default:
      return mobile;
  }
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * Hook to detect if element is in viewport
 */
export function useInViewport(ref: React.RefObject<HTMLElement>) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isInViewport;
}
