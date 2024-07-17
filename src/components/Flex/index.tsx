import cn from 'classnames';
import { forwardRef } from 'react';

import s from './style.module.scss';

interface IFlex {
  className?: string;
  children: React.ReactNode;
}

const Flex = forwardRef(
  ({ className, children }: IFlex, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={cn(s.flex, className)}>
        {children}
      </div>
    );
  },
);

Flex.displayName = 'Flex';

export default Flex;
