import { MathMap } from '@utils/mathUtils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

import useUiContext from '@/contexts/uiContext';
import type { IAnimationElement } from '@/types/common';

interface IProps {
  trigger: MutableRefObject<IAnimationElement | null>;
  threshold?: number;
  isObserver?: boolean;
  initAnimation: () => void;
  playAnimation: () => void;
  disabled?: boolean;
}

export default function useAnimation({
  trigger,
  initAnimation,
  playAnimation,
  isObserver,
  threshold,
  disabled,
}: IProps): void {
  // const { animationStatus } = usePageEffectContext();
  const { pageStatus } = useUiContext();
  const refObserver = useRef<IntersectionObserver | null>(null);

  useEffect((): void => {
    if (disabled) return undefined;
    if (pageStatus === 'PAGE_LOADED') initAnimation();
    return undefined;
  }, [initAnimation, pageStatus, disabled]);

  useEffect(() => {
    if (disabled) return undefined;
    const gsapContext = gsap.context(() => {
      let calcTheshold = threshold || 0;

      if (calcTheshold === undefined && trigger.current) {
        const { height, top } = trigger.current.getBoundingClientRect();
        if (top >= window.innerHeight) {
          calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
          calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
        }
      }

      if (!isObserver) {
        if (pageStatus === 'PAGE_LOADED')
          ScrollTrigger.create({
            trigger: trigger.current,
            onEnter: () => playAnimation(),
            start: `top+=${calcTheshold}% bottom`,
            once: true,
          });
      } else {
        refObserver.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              playAnimation();
              if (trigger.current)
                refObserver.current?.unobserve(trigger.current);
              refObserver.current?.disconnect();
            }
          },
          { threshold: calcTheshold / 100 },
        );
        if (pageStatus === 'PAGE_LOADED')
          if (trigger.current) refObserver.current?.observe(trigger.current);
      }
    }, [trigger]);

    return () => {
      gsapContext.revert();
      refObserver.current?.disconnect();
    };
  }, [playAnimation, pageStatus, disabled]);
}
