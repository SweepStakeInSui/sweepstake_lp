import useSplitType from '@hooks/useSpitType';
import { getDelay } from '@utils/uiHelper';
import { gsap } from 'gsap';
import type { MutableRefObject } from 'react';
import { useCallback } from 'react';

import type { IAnimationElement } from '@/types/common';

import s from './style.module.scss';

interface IUseHeadingFadeInChars {
  refContent: MutableRefObject<IAnimationElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  duration?: number;
}

export default function useHeadingFadeInChars({
  refContent,
  delayTrigger,
  delayEnter,
  duration,
}: IUseHeadingFadeInChars): {
  animationHide: () => void;
  animationIn: (delay?: number) => void;
  animationOut: () => void;
} {
  const { splitter } = useSplitType({
    refTarget: refContent,
    types: 'lines,words,chars',
  });

  const pageHide = useCallback(() => {
    // splitter?.lines && gsap.set(splitter.words, { y: '100%', overwrite: 'auto' });
    // splitter?.chars && gsap.set(splitter.chars, { y: '100%', overwrite: 'auto' });
    if (splitter?.chars)
      gsap.set(splitter.chars, {
        opacity: 0.2,
        overwrite: 'auto',
      });
  }, [splitter]);

  const animationIn = useCallback(
    (delayIn?: number) => {
      const delay = getDelay({
        refContentCurrent: refContent.current,
        delayEnter,
        delayTrigger,
      });

      // splitter?.lines?.length &&
      //   splitter?.lines?.forEach((line, key) => {
      //     const words = line.querySelectorAll('.word');
      //     gsap.to(words, {
      //       y: '0%',
      //       delay: (delayIn || delay) + key / 10,
      //       ease: 'power3.out',
      //       duration: 1.2,
      //       stagger: 0.15,
      //       markers: true,
      //     });
      //   });

      // splitter?.chars?.length &&
      //   splitter?.chars?.forEach((char, key) => {
      //     gsap.to(char, {
      //       y: '0%',
      //       delay: (delayIn || delay) + key / 10,
      //       ease: 'power3.out',
      //       duration: 1.2,
      //       stagger: 0.15,
      //     });
      //   });

      if (splitter?.chars?.length)
        splitter?.chars?.forEach((char, key) => {
          gsap.to(char, {
            opacity: 1,
            delay: (delayIn || delay) + key / 10,
            ease: 'power3.out',
            duration: 1.2,
            stagger: 0.15,
          });
        });
    },
    [delayEnter, delayTrigger, refContent, splitter],
  );

  const animationOut = useCallback(() => {
    if (splitter?.lines?.length)
      gsap.to(splitter.lines, {
        scrollTrigger: refContent.current,
        stagger: 0.15,
        y: '0%',
        ease: 'power3.out',
        duration: duration || 1.2,
      });
  }, [refContent, splitter]);

  refContent.current?.classList.add(s.LineMask);
  return { animationHide: pageHide, animationIn, animationOut };
}
