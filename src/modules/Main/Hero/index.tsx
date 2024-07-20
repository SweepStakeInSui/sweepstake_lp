'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import Button from '@/components/Button';
import { Typography } from '@/components/Typography';
import Container from '@/layouts/Container';

import s from './style.module.scss';

export default function MainHero() {
  const decorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (decorRef.current)
        gsap.to(decorRef.current, {
          opacity: 1,
          delay: 1.6,
          duration: 1,
        });

      if (globeRef.current)
        gsap.to(globeRef.current, {
          scale: 1,
          opacity: 1,
          delay: 1.7,
          duration: 1.5,
          y: '-5%',
        });

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          delay: 2.5,
          duration: 0.5,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1,
          delay: 1.5,
          duration: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        });
      }
    },
    { dependencies: [globeRef.current, buttonRef.current, titleRef.current] },
  );

  return (
    <Container className={s.hero}>
      <div className={s.hero_decor} ref={decorRef} />
      <div className={s.hero_title_wrapper}>
        <div className={s.hero_title_inner} ref={titleRef}>
          <Typography tag="h1" variant="display2" className={s.hero_title}>
            The next-gen prediction market is coming
          </Typography>
        </div>
        <a
          href="https://x.com/SweepstakeMkt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div ref={buttonRef} className={s.hero_button_wrapper}>
            <Button>Visit X (Twitter)</Button>
          </div>
        </a>
      </div>

      <div ref={globeRef} className={s.hero_video_wrapper}>
        <video autoPlay loop muted playsInline className={s.hero_video}>
          <source src="/videos/globe.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Container>
  );
}
