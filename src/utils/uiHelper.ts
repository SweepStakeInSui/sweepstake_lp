import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import type { IAnimationElement } from '@/types/common';

export const pageScrollTop = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

export const checkPageScrolled = (): boolean => {
  return pageScrollTop() > 10;
};

export const isSafariChecked = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const getDelay = ({
  refContentCurrent,
  delayEnter = 0,
  delayTrigger = 0,
}: {
  refContentCurrent: IAnimationElement | null;
  delayEnter?: number;
  delayTrigger?: number;
}): number => {
  if (!refContentCurrent) return 0;
  const { top } = refContentCurrent.getBoundingClientRect();
  if (top > window.innerHeight || checkPageScrolled()) {
    return delayTrigger;
  }
  return delayEnter;
};

export const getSpaceTrigger = (el: IAnimationElement | null): number => {
  const trigger = window.innerHeight / 5;
  if (!el) return trigger;

  const { height } = el.getBoundingClientRect();
  if (height < trigger) return height;
  return trigger;
};

// eslint-disable-next-line
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null;

  return function (...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function bodyReady(): void {
  document.body.classList.add('is-ready');
}

export const gRefresh = (timeout = 1000): void => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, timeout);
};

export const easingScrolling = (x: number): number => {
  return 1 - (1 - x) ** 4;
};

export const easingPining = (x: number): number => {
  return 1 - (1 - x) ** 4;
};

export const easeInOutSine = (x: number): number => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const easeOutCubic = (x: number): number => {
  return 1 - (1 - x) ** 3;
};

export const easeInOutQuad = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
};

export function easeInQuart(x: number): number {
  return x * x * x * x;
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function easeOutQuint(x: number): number {
  return 1 - (1 - x) ** 5;
}

export function easeLenis(t: number): number {
  return Math.min(1, 1.001 - 2 ** (-10 * t));
}

const preTouch = (e: TouchEvent): boolean => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export function lockTouchStart(): void {
  document.body.style.pointerEvents = 'none';
  window.addEventListener('touchstart', preTouch);
  window.addEventListener('touchend', preTouch);
  window.addEventListener('touchmove', preTouch);

  document.addEventListener('touchstart', preTouch);
  document.addEventListener('touchend', preTouch);
  document.addEventListener('touchmove', preTouch);

  document.body.addEventListener('touchstart', preTouch);
  document.body.addEventListener('touchend', preTouch);
  document.body.addEventListener('touchmove', preTouch);
}

export function unLockTouchStart(): void {
  document.body.style.pointerEvents = 'auto';

  window.removeEventListener('touchstart', preTouch);
  window.removeEventListener('touchend', preTouch);
  window.removeEventListener('touchmove', preTouch);

  document.removeEventListener('touchstart', preTouch);
  document.removeEventListener('touchend', preTouch);
  document.removeEventListener('touchmove', preTouch);

  document.body.removeEventListener('touchstart', preTouch);
  document.body.removeEventListener('touchend', preTouch);
  document.body.removeEventListener('touchmove', preTouch);
}

export function monthsUntil(from: number, to?: number): number {
  const fromTime = new Date(from);
  const currentDate = to ? new Date(to) : new Date();

  const yearDiff = currentDate.getFullYear() - fromTime.getFullYear();
  const monthDiff = currentDate.getMonth() - fromTime.getMonth();

  return yearDiff * 12 + monthDiff;
}
