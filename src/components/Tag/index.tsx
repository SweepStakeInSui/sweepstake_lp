import cn from 'classnames';
import React from 'react';

import s from './style.module.scss';

type TagColor = 'primary' | 'white' | 'success' | 'danger';

interface ITag
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color: TagColor;
}

export default function Tag({ color, children, className, ...props }: ITag) {
  return (
    <div {...props} className={cn(s.container, s[color], className)}>
      {children}
    </div>
  );
}
