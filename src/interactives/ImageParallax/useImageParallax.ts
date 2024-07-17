/* eslint-disable no-param-reassign */

'use client';

import useWindowResize from '@hooks/useWindowSize';
import { useLenis } from '@studio-freight/react-lenis';
import { MathMap } from '@utils/mathUtils';
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import s from './styles.module.scss';

interface IuseImageParallax {
  refWrap: MutableRefObject<HTMLDivElement | null>;
  refContent: MutableRefObject<
    HTMLDivElement | HTMLImageElement | HTMLVideoElement | null
  >;
  offset?: number;
  scale?: number;
}

export default function useImageParallax({
  refWrap,
  refContent,
  offset = 2,
  scale = 1.05,
}: IuseImageParallax): void {
  const refOptions = useRef({
    isFirstRender: false,
  });
  const { width, isDesktop } = useWindowResize();

  const runParallax = useCallback((): void => {
    const rectWrap = refWrap.current?.getBoundingClientRect();
    if (!rectWrap || !isDesktop) return;
    const { innerHeight: height } = window;
    const disParallax = Math.abs((scale - 1) * rectWrap.height);

    const rageTrigger = MathMap(
      height + rectWrap.height / 2,
      height,
      0,
      -disParallax * 2,
      disParallax,
    );
    const current = MathMap(
      rectWrap.top + rectWrap.height / 2,
      height,
      0,
      -disParallax * 2,
      disParallax,
    );

    if (Math.abs(current) >= Math.abs(rageTrigger)) {
      if (!refOptions.current.isFirstRender && refContent.current) {
        refContent.current.style.transform = `translate3d(0px, ${rageTrigger * offset}px, 0px)`;
        refOptions.current.isFirstRender = true;
      }
      return;
    }

    if (refContent.current) {
      refContent.current.style.transform = `translate3d(0, ${current * offset}px, 0)`;
      refContent.current.style.backfaceVisibility = `hidden`;
      refContent.current.style.willChange = `transform`;
      refContent.current.style.overflow = `hidden`;
      refContent.current.style.inset = `0px`;
    }
  }, [offset, refContent, refWrap, scale, isDesktop]);

  useEffect(() => {
    if (refWrap.current) refWrap.current.style.height = '';
    if (refContent.current) refContent.current.style.height = '';

    const rectWrap = refWrap.current?.getBoundingClientRect();
    if (!rectWrap || scale < 1 || !isDesktop) return;

    refWrap.current?.classList.add(s.imgParallax);
    refContent.current?.classList.add(s.imgParallax_el);

    if (refContent.current) {
      refContent.current.style.height = `${rectWrap.height * scale}px`;
      refContent.current.style.maxWidth = `none`;
    }

    if (refWrap.current) refWrap.current.style.height = `${rectWrap.height}px`;
  }, [refContent, refWrap, scale, width, isDesktop]);

  useLenis(runParallax, [isDesktop]);
}
