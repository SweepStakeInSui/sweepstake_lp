'use client';

import { useGSAP } from '@gsap/react';
import { useAnimationStore } from '@store/animation';
import { getDelay } from '@utils/uiHelper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef } from 'react';

import s from './styles.module.scss';

interface ILine extends PropsWithChildren {
  delayTrigger?: number;
  duration?: number;
  delayEnter?: number;
}

export default function Line({
  duration,
  delayTrigger,
  delayEnter,
}: ILine): JSX.Element {
  const { isPageLeave, isPageEnter } = useAnimationStore();
  const lineRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  const animationIn = contextSafe((): void => {
    const delay = getDelay({
      refContentCurrent: lineRef.current,
      delayEnter,
      delayTrigger,
    });
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: duration || 1.2,
      delay,
      ease: 'power3.out',
      transformOrigin: 'left center',
    });
  });

  const animationOut = contextSafe((): void => {
    if (!lineRef.current) return;
    gsap.set(lineRef.current, {
      scaleX: 0,
    });
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (isPageEnter)
      ScrollTrigger.create({
        trigger: lineRef.current,
        start: '+=20% bottom',
        onEnter: () => animationIn(),
        once: true,
      });
  }, [isPageEnter]);
  useEffect(() => {
    animationOut();
  }, [animationOut, isPageLeave]);

  return <div ref={lineRef} className={s.line} />;
}
