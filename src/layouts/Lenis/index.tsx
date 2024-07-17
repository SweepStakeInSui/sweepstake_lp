'use client';

import type Lenis from '@studio-freight/lenis';
import { ReactLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef } from 'react';

import { useAnimationStore } from '@/store/animation';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller) {
  const lenisRef = useRef<Lenis | null>(null);
  const { pageStatus } = useAnimationStore();

  useEffect(() => {
    lenisRef.current?.stop();
  }, []);

  useEffect(() => {
    if (pageStatus === 'PAGE_ENTER') {
      lenisRef.current?.start();
    } else {
      lenisRef.current?.stop();
    }
  }, [pageStatus]);

  useEffect(() => {
    function update(time: number): void {
      lenisRef.current?.raf(time * 1200);
    }
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} normalizeWheel>
      {children}
    </ReactLenis>
  );
}
