'use client';

import useUiContext from '@contexts/uiContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useRef } from 'react';

interface Props extends PropsWithChildren {
  section: '/' | 'projects' | 'about' | 'contact';
  sectionBefore?: '/' | 'projects' | 'about' | 'contact';
  children?: ReactNode;
}

const SectionIndicatorWrapper = ({
  section,
  sectionBefore,
  children,
}: Props): ReactElement => {
  const { setActiveSection } = useUiContext();
  const refTrigger = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gc = gsap.context(() => {
        ScrollTrigger.create({
          trigger: refTrigger.current,
          start: 'top 75%',
          end: 'bottom bottom',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(section);
            }
          },
          onLeaveBack: () => {
            if (sectionBefore) {
              setActiveSection(sectionBefore);
            }
          },
        });
      }, [refTrigger]);
      return () => gc.revert();
    },
    { dependencies: [section, sectionBefore, setActiveSection] },
  );

  return <div ref={refTrigger}>{children}</div>;
};

export default SectionIndicatorWrapper;
