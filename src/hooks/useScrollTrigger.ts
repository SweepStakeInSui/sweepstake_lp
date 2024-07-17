/* eslint-disable*/
import { gsap } from 'gsap';
import type { default as ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

type IProp = {
  trigger: MutableRefObject<
    HTMLDivElement | HTMLElement | HTMLHeadingElement | null
  >;
  start?: string | number | ((self: ScrollTrigger) => string | number);
  end?: string | number | ((self: ScrollTrigger) => string | number);
  pin?: boolean | string | HTMLElement;
  anticipatePin?: number;
  markers?: boolean;
  scrub?: number | boolean;
  snap?: any;
  onEnter?: (self: ScrollTrigger) => void;
  onEnterBack?: (self: ScrollTrigger) => void;
  onLeave?: () => void;
  onLeaveBack?: () => void;
  onToggle?: (self: ScrollTrigger) => void;
  onUpdate?: (self: ScrollTrigger) => void;
};

export const useScrollTrigger = (
  {
    trigger,
    start,
    end,
    pin,
    anticipatePin,
    markers,
    scrub,
    snap,
    onEnter,
    onEnterBack,
    onLeave,
    onLeaveBack,
    onToggle,
    onUpdate,
  }: IProp,
  deep = new Array<any>(),
): any => {
  const refOg = useRef<any>({ scroller: null, timeOut: null });
  useEffect(() => {
    if (trigger) {
      const ScrollTrigger = require('gsap/ScrollTrigger').default;
      gsap.registerPlugin(ScrollTrigger);
      refOg.current.id = (Math.random() * 1000000000).toString();
      refOg.current.scroller && refOg.current.scroller.refresh();
      refOg.current.scroller = ScrollTrigger.create({
        trigger: trigger.current,
        id: refOg.current.id,
        start,
        markers,
        end,
        scrub,
        pin,
        snap,
        anticipatePin,
        onUpdate,
        onToggle,
        onEnter,
        onEnterBack,
        onLeave,
        onLeaveBack,
      });
    }
    return () => {
      if (refOg.current.scroller) {
        refOg.current.scroller.refresh();
        refOg.current.scroller && refOg.current.scroller.kill();
      }
    };
  }, [...[trigger, end], ...deep]);

  return refOg.current.scroller;
};
