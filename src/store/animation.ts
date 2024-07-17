'use client';

import useObHeightChange from '@hooks/useObHeightChange';
import { signal } from '@preact/signals-react';
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useMemo } from 'react';

type TUseAnimationState = {
  pageStatus: TPageStatus;
  isPageEnter: boolean;
  isPageLeave: boolean;
  isLoaded: boolean;
  pageOnce: boolean;
  isFirstLoad: boolean;
  setPageStatus: (status: TPageStatus) => void;
  onCompleteLoaded: () => void;
  scrollHeight: number;
  setIsFirstLoad: () => void;
};

type TPageStatus =
  | 'PAGE_ENTER'
  | 'PAGE_LOADED'
  | 'PAGE_LEAVE'
  | 'PAGE_EXIT'
  | 'PAGE_ONCE';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

const pageStatus = signal<TPageStatus>('PAGE_ONCE');
const isPageEnter = signal(false);
const isPageLeave = signal(false);
const pageOnce = signal(false);
const isFirstLoad = signal(true);

function scrollRestoration(): void {
  window.scrollTo(0, 0);
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }
}

export const useAnimationStore = (): TUseAnimationState => {
  useSignals();
  const { scrollHeight } = useObHeightChange();

  const isLoaded = useMemo((): boolean => {
    return pageStatus.value === 'PAGE_LOADED';
  }, [pageStatus.value]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scrollHeight]);

  const setPageEnter = (status: boolean): void => {
    isPageEnter.value = status;
  };

  const setPageLeave = (status: boolean): void => {
    isPageLeave.value = status;
  };

  const setPageStatus = (status: TPageStatus): void => {
    pageStatus.value = status;
  };

  const setIsFirstLoad = (): void => {
    isFirstLoad.value = false;
  };

  const onCompleteLoaded = useCallback(() => {
    setPageStatus('PAGE_ENTER');
  }, []);

  useSignalEffect(() => {
    scrollRestoration();
    pageOnce.value = true;
    setPageStatus('PAGE_LOADED');
  });

  useSignalEffect(() => {
    setPageLeave(pageStatus.value === 'PAGE_LOADED');
    setPageEnter(pageStatus.value === 'PAGE_ENTER');
  });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scrollHeight]);

  return {
    pageStatus: pageStatus.value,
    isPageEnter: isPageEnter.value,
    isPageLeave: isPageLeave.value,
    isLoaded,
    isFirstLoad: isFirstLoad.value,
    pageOnce: pageOnce.value,
    scrollHeight,
    setPageStatus,
    onCompleteLoaded,
    setIsFirstLoad,
  };
};
