'use client';

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import debounce from '@/utils/debounce';

import s from './style.module.scss';

// import { Typography } from '@components/Typography';

const cx = classNames.bind(s);

interface IDimension {
  columns: number;
  rows: number;
  boxSize?: number;
}

interface IBoxesGrid {
  color?: 'light' | 'dark';
}

export default function BoxesGrid({ color = 'dark' }: IBoxesGrid) {
  const className = color === 'dark' ? 'dark' : 'light';
  const gridRef = useRef<HTMLDivElement | null>(null);

  const calculateColumns = (): {
    columns: number;
    rows: number;
    boxSize: number;
  } => {
    if (gridRef.current) {
      const computedStyles = window.getComputedStyle(gridRef.current);
      const { gridTemplateColumns } = computedStyles;

      const columns = gridTemplateColumns.split(' ').length;
      const boxSize = window.innerWidth / columns;

      // Calculate the number of rows based on the box size and window height
      const rows = Math.floor(window.innerHeight / boxSize);

      return { columns, rows, boxSize };
    }

    return { columns: 0, rows: 0, boxSize: 0 };
  };

  const [boxes, setBoxes] = useState<React.JSX.Element[]>([]);
  const [dimensions, setDimensions] = useState<IDimension | null>(
    calculateColumns(),
  );

  useEffect(() => {
    if (gridRef && !dimensions?.columns) setDimensions(calculateColumns());

    if (!dimensions) return;
    const currentBoxes = [];
    const topLeft = 0;
    const topRight = dimensions.columns - 2;
    const bottomRight = (dimensions.rows - 2) * dimensions.columns;
    const bottomLeft = (dimensions.rows - 1) * dimensions.columns - 2;
    for (let i = 0; i < dimensions.columns * dimensions.rows; i += 1) {
      currentBoxes.push(
        <div
          className={cx(
            'display-box',
            `${
              i === topLeft ||
              i === topRight ||
              i === bottomRight ||
              i === bottomLeft
                ? s.plus
                : ''
            }`,
          )}
          key={i}
        >
          {/* <Typography variant="description">{i}</Typography> */}
        </div>,
      );
    }
    setBoxes(currentBoxes);
  }, [gridRef, dimensions]);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions(calculateColumns());
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.addEventListener('resize', debouncedHandleResize);
    };
  }, [dimensions]);

  return (
    <div
      ref={gridRef}
      className={cx(
        'grid-display',
        'grid sm:grid-cols-16 xs:grid-cols-6',
        className,
      )}
    >
      {boxes}
    </div>
  );
}
