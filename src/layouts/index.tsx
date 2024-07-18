'use client';

import gsap from 'gsap';
import React, { useRef } from 'react';

import { Cursor } from '@/components/Cursor';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useIsDesktop } from '@/hooks/useWindowSize';
import { useAnimationStore } from '@/store/animation';

import LenisScroller from './Lenis';
import NavBar from './NavBar';
import PreLoader from './PreLoader';

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: Readonly<ILayout>): React.ReactNode {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  useScrollTrigger(
    {
      trigger: mainRef,
      start: 'bottom bottom',
      end: 'bottom+=100 bottom',
      onToggle: () => {
        gsap.to(navbarRef.current, {
          opacity: 0,
          pointerEvents: 'none',
        });
      },
      onLeaveBack: () => {
        gsap.to(navbarRef.current, {
          opacity: 1,
          pointerEvents: 'unset',
        });
      },
    },
    [],
  );

  const { isLoaded, isPageEnter, onCompleteLoaded } = useAnimationStore();

  return (
    <LenisScroller>
      <PreLoader isLoaded={isLoaded} onCompleted={onCompleteLoaded} />
      <NavBar />
      {isDesktop && <Cursor isEnter={isPageEnter} />}
      <main ref={mainRef}>{children}</main>
    </LenisScroller>
  );
}
