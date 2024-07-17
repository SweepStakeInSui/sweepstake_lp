'use client';

import useUiContext from '@contexts/uiContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

interface Props extends PropsWithChildren {
  project: string;
  projectBefore?: string;
  children?: ReactNode;
}

const ProjectIndicatorWrapper = ({
  project,
  projectBefore,
  children,
}: Props): ReactElement => {
  const { setActiveProject } = useUiContext();
  const refTrigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gc = gsap.context(() => {
      ScrollTrigger.create({
        trigger: refTrigger.current,
        start: 'center bottom',
        end: 'bottom bottom',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveProject(project);
          }
        },
        onLeaveBack: () => {
          if (projectBefore) {
            setActiveProject(projectBefore);
          }
        },
      });
    }, [refTrigger]);
    return () => gc.revert();
  }, [project, projectBefore, setActiveProject]);

  return <div ref={refTrigger}>{children}</div>;
};

export default ProjectIndicatorWrapper;
