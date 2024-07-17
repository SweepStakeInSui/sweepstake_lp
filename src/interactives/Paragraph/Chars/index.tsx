'use client';

import { useAnimationStore } from '@store/animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { PropsWithChildren, ReactElement } from 'react';
import React, { useEffect, useRef } from 'react';

import useParagraphTypingChars from '@/interactives/Paragraph/Chars/useParagraphTypingChars';

interface ParagraphTypingCharsProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  duration?: number;
}

type TRef =
  | HTMLDivElement
  | HTMLSpanElement
  | HTMLHeadingElement
  | HTMLParagraphElement;

export default function ParagraphTypingChars({
  children,
  delayEnter,
  delayTrigger,
  duration,
}: ParagraphTypingCharsProps): ReactElement {
  const refContent = useRef<TRef>(null);
  const { isPageEnter, isPageLeave } = useAnimationStore();

  const { animationIn, animationHide } = useParagraphTypingChars({
    refContent,
    delayTrigger,
    delayEnter,
    duration,
  });

  useEffect(() => {
    animationHide();
  }, [animationHide, isPageLeave]);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      if (isPageEnter)
        ScrollTrigger.create({
          trigger: refContent.current,
          start: '+=20% bottom',
          onEnter: () => animationIn(),
          once: true,
        });
    }, [refContent]);

    return () => gsapContext.revert();
  }, [animationIn, isPageEnter]);

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
