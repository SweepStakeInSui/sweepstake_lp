import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { useRef } from 'react';

import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Stack from '@/components/Stack';
import { Typography } from '@/components/Typography';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

import s from './style.module.scss';
import Time from './Time';

export default function BorderDeco() {
  const lenis = useLenis();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftCornerRef = useRef<HTMLDivElement | null>(null);
  const bottomRightCornerRef = useRef<HTMLDivElement | null>(null);

  useScrollTrigger(
    {
      trigger: scrollRef,
      onEnter: () => {
        gsap.to(topLeftRef.current, {
          y: -100,
          opacity: 0,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });

        gsap.to(bottomLeftRef.current, {
          top: `2.4rem`,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });

        gsap.to(topRightRef.current, {
          y: -100,
          opacity: 0,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });

        gsap.to(bottomRightRef.current, {
          top: `2.4rem`,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });

        gsap.to(bottomLeftCornerRef.current, {
          bottom: `2.4rem`,
          opacity: 1,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });

        gsap.to(bottomRightCornerRef.current, {
          bottom: `2.4rem`,
          opacity: 1,
          scrollTrigger: {
            start: 'top top',
            end: () => {
              return `+=${window.innerHeight * 0.75} top`;
            },
            scrub: 1,
          },
        });
      },
    },
    [],
  );

  return (
    <>
      <div ref={scrollRef} className={s.borderDeco_scroll} />
      <div className={s.borderDeco}>
        <Flex className={s.borderDeco_item} ref={topLeftRef}>
          <div className={s.borderDeco_dot} />
          <Typography variant="description">
            Open for any collaborations and offers
          </Typography>
        </Flex>

        <Stack className={s.borderDeco_item} ref={topRightRef}>
          <Typography variant="description">Portfolio</Typography>
          <Typography variant="description">v2024</Typography>
        </Stack>

        <div className={s.borderDeco_item} ref={bottomLeftRef}>
          <Time />
        </div>

        <Stack className={s.borderDeco_item} ref={bottomRightRef}>
          <Typography variant="description">Built with love</Typography>
          <Typography variant="description">by THO LE</Typography>
        </Stack>

        <div className={s.borderDeco_item} ref={bottomLeftCornerRef} />
        <div className={s.borderDeco_item} ref={bottomRightCornerRef} />

        <Button
          className={s.borderDeco_logo}
          onClick={() => {
            lenis.stop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            lenis.start();
          }}
        >
          <Typography isTitle className={s.borderDeco_logo_text}>
            THOLE©
          </Typography>
        </Button>
      </div>
    </>
  );
}
