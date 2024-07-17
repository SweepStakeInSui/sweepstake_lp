'use client';

import { useEffect, useRef } from 'react';

import s from './style.module.scss';

export default function PreLoader() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // useGSAP(() => {
  //   gsap.to(wrapperRef.current, {
  //     duration: 1.5,
  //     opacity: 0,
  //     onComplete: () => {
  //       gsap.to(wrapperRef.current, {
  //         visibility: 'hidden',
  //       });
  //     },
  //   });
  // }, {});

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // const supportsPassive = false;
    // try {
    //   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    //     get: function () { supportsPassive = true; }
    //   }));
    // } catch(e) {}

    // const wheelOpt = supportsPassive ? { passive: false } : false;
    // const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // const disableScroll = () => {
    //   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    //   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    //   window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    //   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    // };
  }, []);

  return <div className={s.preLoader} ref={wrapperRef} />;
}
