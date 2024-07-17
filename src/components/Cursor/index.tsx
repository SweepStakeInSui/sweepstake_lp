'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import s from './style.module.scss';

interface ICursor {
  isEnter: boolean;
}

export function Cursor({ isEnter }: Readonly<ICursor>) {
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');

    if (isEnter) gsap.to(cursor, { opacity: 1 });
  }, [isEnter]);

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a');

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 15 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 });
    };

    const onMouseLeftWindow = (event: MouseEvent) => {
      const from = event.relatedTarget || (event as any).toElement;
      if (!from || from.nodeName === 'HTML') {
        gsap.to(cursor, { scale: 0 });
      } else {
        gsap.to(cursor, { scale: 1 });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', (e) => onMouseLeftWindow(e));

    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });
  });

  return (
    <div id="custom-cursor" className={s.cursor}>
      <span className={s.cursor_text} ref={cursorTextRef}>
        View
      </span>
    </div>
  );
}
