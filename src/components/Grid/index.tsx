import { forwardRef } from 'react';

import s from './style.module.scss';

interface IGrid {
  cols?: number;
  smCols?: number;
  mdCols?: number;
  lgCols?: number;
  className?: string;
  children: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, IGrid>(function Grid(
  { cols, smCols, mdCols, lgCols, className, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${s[`cols__${cols}`]} ${s.grid}
        ${smCols && s[`sm_cols__${smCols}`]}
        ${mdCols && s[`md_cols__${mdCols}`]}
        ${lgCols && s[`lg_cols__${lgCols}`]}
        ${className}`}
    >
      {children}
    </div>
  );
});

export default Grid;
