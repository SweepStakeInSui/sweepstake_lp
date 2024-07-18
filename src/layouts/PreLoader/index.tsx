'use client';

import { useGSAP } from '@gsap/react';
import { signal } from '@preact/signals-react';
import { useAnimationStore } from '@store/animation';
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

import Stack from '@/components/Stack';

import Container from '../Container';
import s from './style.module.scss';

interface IPreLoader {
  isLoaded: boolean;
  onCompleted: () => void;
}

export default function PreLoader({
  isLoaded,
  onCompleted,
}: Readonly<IPreLoader>) {
  const progress = signal(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { setIsFirstLoad } = useAnimationStore();
  const lenis = useLenis();

  useGSAP(() => {
    if (isLoaded && contentRef.current) {
      lenis.stop();
      const tl = gsap.timeline();
      const progressAnimation = tl.to(progress, {
        value: 100,
        duration: 0.75,
        ease: 'linear',
        onUpdate: () => {
          lenis.stop();

          const newProgress = Math.round(progress.value);
          if (progressBarRef.current) {
            progressBarRef.current?.style?.setProperty(
              '--po',
              `${newProgress / 100}`,
            );
          }
        },
        onComplete: () => {
          if (contentRef.current) {
            gsap.to(contentRef.current, {
              opacity: 0,
              delay: 0.5,
              duration: 0.5,
              onComplete: () => {
                lenis.start();

                setIsFirstLoad();
                contentRef.current?.remove();
                setTimeout(() => onCompleted(), 200);
              },
            });
          }
        },
      });

      return (): void => {
        progressAnimation.revert();
      };
    }
    return undefined;
  }, [isLoaded, onCompleted]);

  return (
    <Container className={s.preLoader_wrapper} ref={contentRef}>
      <Stack className={s.preLoader}>
        <div className={s.percent_wrapper}>
          <div className={s.percent} ref={progressBarRef} />
        </div>
      </Stack>
    </Container>
  );
}
