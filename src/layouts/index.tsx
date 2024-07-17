'use client';

import gsap from 'gsap';
import React, { useRef } from 'react';

import { Cursor } from '@/components/Cursor';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useIsDesktop, useIsMobile } from '@/hooks/useWindowSize';
import { useAnimationStore } from '@/store/animation';

import BorderDeco from './BorderDeco';
import Footer from './Footer';
import LenisScroller from './Lenis';
import MobileNavBar from './MobileNavBar';
import type { INavList } from './NavBar';
import NavBar from './NavBar';
import PreLoader from './PreLoader';
import s from './style.module.scss';

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: Readonly<ILayout>): React.ReactNode {
  const navlist: INavList[] = [
    {
      name: 'Projects',
      link: 'projects',
    },
    {
      name: 'About',
      link: 'about',
    },
    // {
    //   name: 'Genarts',
    //   link: '/genarts',
    // },
    {
      name: "Let's talk",
      link: 'contact',
    },
  ];

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
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

      {isDesktop && <Cursor isEnter={isPageEnter} />}

      <main ref={mainRef}>{children}</main>
      {!isMobile && <BorderDeco />}
      {isMobile ? (
        <MobileNavBar navlist={navlist} />
      ) : (
        <div ref={navbarRef} className={s.navbar}>
          <NavBar navlist={navlist} />
        </div>
      )}
      <Footer />
    </LenisScroller>
  );
}
