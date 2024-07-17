import cn from 'classnames';
import { forwardRef } from 'react';

interface IContainer {
  className?: string;
  children: React.ReactNode;
}

const Container = forwardRef(
  ({ className, children }: IContainer, ref: React.Ref<HTMLElement>) => {
    return (
      <section ref={ref} className={cn(className, 'container')}>
        {children}
      </section>
    );
  },
);

Container.displayName = 'Container';

export default Container;
