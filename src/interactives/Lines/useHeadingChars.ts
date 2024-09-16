import useAnimation from '@hooks/useAnimation';
import useSplitType from '@hooks/useSpitType';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import type { MutableRefObject } from 'react';
import { useCallback } from 'react';

import s from './style.module.scss';

interface IUseParagraphLines {
  refContent: MutableRefObject<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | null
  >;
  delayTrigger?: number;
  delayEnter?: number;
  offset?: number;
  isObserver?: boolean;
}

export default function useParagraphLines({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
  isObserver,
}: IUseParagraphLines): { words: HTMLElement[] | undefined | null } {
  const { splitter } = useSplitType({
    refTarget: refContent,
    types: 'lines,words,chars',
  });

  const initAnimation = useCallback(() => {
    if (!splitter?.chars) return;
    refContent.current?.classList.add(s.headingChars);
    gsap.killTweensOf(splitter?.chars);
    gsap.set(splitter?.chars, { y: '100%' });
  }, [refContent, splitter?.chars]);

  const playAnimation = useCallback(() => {
    if (!splitter?.chars) return;
    const delay = getDelay({
      refContentCurrent: refContent.current,
      delayEnter,
      delayTrigger,
    });
    gsap.to(splitter?.chars, {
      stagger: 0.01,
      y: '0%',
      duration: 1.6,
      ease: 'power3.out',
      delay: offset ? -offset : delay,
      overwrite: 'auto',
    });
  }, [delayEnter, delayTrigger, offset, refContent, splitter?.words]);

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
  });
  return { words: splitter?.words };
}
