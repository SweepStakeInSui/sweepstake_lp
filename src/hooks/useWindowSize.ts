import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect';
import type { Signal } from '@preact/signals-react';
import { useComputed, useSignal, useSignalEffect } from '@preact/signals-react';
import debounce from '@utils/debounce';
import { useMemo, useState } from 'react';

import { breakpoints } from '@/constants/breakpoints';

interface IDimension {
  width: Signal<number>;
  height: Signal<number>;
  isMobile: Signal<boolean>;
  isTablet: Signal<boolean>;
  isDesktop: Signal<boolean>;
  scrollHeight: Signal<number>;
}

const useWindowSize = (): IDimension => {
  const width = useSignal(0);
  const height = useSignal(0);
  const scrollHeight = useSignal(0);

  const listener = (): void => {
    width.value = window.innerWidth || document.body.clientWidth;
    height.value = window.innerHeight || document.body.clientHeight;
    scrollHeight.value = document.body.scrollHeight;
  };

  const deBounceListener = debounce(listener, 150);
  useIsomorphicLayoutEffect(() => {
    deBounceListener();
    window?.addEventListener?.('resize', deBounceListener);
    return () => {
      window?.removeEventListener?.('resize', deBounceListener);
    };
  }, []);

  const isMobile = useComputed(() => width.value < breakpoints.md);
  const isTablet = useComputed(
    () => width.value >= breakpoints.md && width.value < breakpoints.xl,
  );
  const isDesktop = useComputed(() => width.value >= breakpoints.xl);

  return useMemo(() => {
    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      scrollHeight,
    };
  }, [width, height, scrollHeight]);
};

export const useIsMobile = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isMobile } = useWindowSize();
  useSignalEffect((): void => {
    setIs(isMobile.value);
  });

  return is;
};

export const useIsDesktop = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isDesktop } = useWindowSize();
  useSignalEffect((): void => {
    setIs(isDesktop.value);
  });

  return is;
};

export const useIsTablet = (): boolean => {
  const [is, setIs] = useState<boolean>(false);
  const { isTablet } = useWindowSize();
  useSignalEffect((): void => {
    setIs(isTablet.value);
  });

  return is;
};

export default useWindowSize;
