import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

import s from './style.module.scss';

interface IFadingSequenceProps {
  images: string[];
}

export default function FadingSequence({
  images,
}: Readonly<IFadingSequenceProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });
      const fadeDuration = 1.5;
      const stayDuration = 3;

      gsap.set(imagesRef.current[0], { autoAlpha: 1 });
      tl.to(imagesRef.current.slice(1), {
        delay: stayDuration,
        autoAlpha: 1,
        duration: fadeDuration,
        stagger: stayDuration + fadeDuration,
      })
        // hide each one after the next one finishes fading in on top of it. Exclude the final image because we'll handle the crossfade with the first image with a tween at the end.
        .to(
          imagesRef.current.slice(0, imagesRef.current.length - 1),
          {
            autoAlpha: 0,
            duration: stayDuration,
            stagger: stayDuration + fadeDuration,
          },
          stayDuration + fadeDuration,
        )
        // show the first image (but it won't be visible yet because the last image is on top of it)
        .set(imagesRef.current[0], { autoAlpha: 1 })
        // now fade out the last image so that the first one is showing again
        .to(
          imagesRef.current[imagesRef.current.length - 1],
          { autoAlpha: 0, duration: fadeDuration },
          `+=${stayDuration}`,
        );
    },
    { scope: containerRef },
  );

  return (
    <div className={s.a} ref={containerRef}>
      {images.map((src, index) => (
        <Image
          key={src}
          ref={(el): void => {
            imagesRef.current[index] = el as HTMLImageElement;
          }}
          className={s.imgt}
          // style={{ backgroundImage: `url(${src})` }}
          src={src}
          fill
          alt={src}
        />
      ))}
    </div>
  );
}
