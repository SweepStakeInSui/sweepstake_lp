import cn from 'classnames';
import React, { forwardRef } from 'react';

import s from './style.module.scss';

interface IStack {
  className?: string;
  children: React.ReactNode;
}

const Stack = forwardRef(
  ({ className, children }: IStack, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={cn(s.stack, className)}>
        {children}
      </div>
    );
  },
);

Stack.displayName = 'Stack';

export default Stack;
