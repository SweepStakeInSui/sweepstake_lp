'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import Button from '@/components/Button';
import { Typography } from '@/components/Typography';
import Container from '@/layouts/Container';

import s from './style.module.scss';

export default function MainHero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (globeRef.current)
        gsap.to(globeRef.current, {
          scale: 1,
          opacity: 1,
          delay: 1.7,
          duration: 1.5,
        });

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          delay: 1.3,
          duration: 1,
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          delay: 1,
          duration: 1,
        });
      }
    },
    { dependencies: [globeRef.current, buttonRef.current, titleRef.current] },
  );

  return (
    <Container className={s.hero}>
      <div className={s.hero_title_wrapper}>
        <div ref={titleRef} className={s.hero_title_inner}>
          <Typography tag="h1" variant="display2" className={s.hero_title}>
            The next-gen prediction market is coming
          </Typography>
        </div>

        <div ref={buttonRef} className={s.hero_button_wrapper}>
          <Button>Visit X (Twitter)</Button>
        </div>
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
