import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import Flex from '@/components/Flex';

import { Typography } from '../../components/Typography';
import s from './style.module.scss';

export default function RollingCounter() {
  const n1Ref = useRef<HTMLDivElement | null>(null);
  const n2Ref = useRef<HTMLDivElement | null>(null);
  const n3Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      repeat: -1,
      repeatDelay: 1,
      paused: true,
    });

    const maxTime = 3;
    tl.add('p1')
      .to(
        n1Ref.current,
        { y: '-=80rem', repeat: 9, duration: maxTime / 10 },
        'p1',
      )
      .to(
        n2Ref.current,
        { y: '-=80rem', repeat: 1, duration: maxTime / 2 },
        'p1',
      )
      .to(n3Ref.current, { y: '-=8rem', duration: maxTime }, 'p1');

    gsap.to(tl, maxTime, { progress: 1, ease: 'power3.inOut' });
  }, []);
  return (
    <Flex className={s.counter}>
      <div className={s.numbmask}>
        <Typography
          ref={n3Ref}
          isTitle
          variant="h3"
          color="secondary"
          className={s.numb}
        >
          0 1 2 3 4 5 6 7 8 9 0
        </Typography>
      </div>
      <div className={s.numbmask}>
        <Typography
          ref={n2Ref}
          isTitle
          variant="h3"
          color="secondary"
          className={s.numb}
        >
          0 1 2 3 4 5 6 7 8 9 0
        </Typography>
      </div>
      <div className={s.numbmask}>
        <Typography
          ref={n1Ref}
          isTitle
          variant="h3"
          color="secondary"
          className={s.numb}
        >
          0 1 2 3 4 5 6 7 8 9 0
        </Typography>
      </div>
      <div className={s.percent}>
        <Typography isTitle variant="h3" color="secondary" className={s.numb}>
          %
        </Typography>
      </div>
    </Flex>
  );
}
