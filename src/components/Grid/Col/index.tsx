import React from 'react';

import s from './style.module.scss';

interface IColProps {
  children?: React.ReactNode;
  span?: number;
  start?: number;
  smSpan?: number;
  smStart?: number;
  mdSpan?: number;
  mdStart?: number;
  lgSpan?: number;
  lgStart?: number;
  className?: string;
}

export default function Col({
  children,
  span,
  start,
  smSpan,
  smStart,
  mdSpan,
  mdStart,
  lgSpan,
  lgStart,
  className = '',
}: Readonly<IColProps>) {
  return (
    <div
      className={[
        s.col,
        span && s[`span-${span}`],
        start && s[`start-${start}`],
        smSpan && s[`sm-span-${smSpan}`],
        smStart && s[`sm-start-${smStart}`],
        mdSpan && s[`md-span-${mdSpan}`],
        mdStart && s[`md-start-${mdStart}`],
        lgSpan && s[`lg-span-${lgSpan}`],
        lgStart && s[`lg-start-${lgStart}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
