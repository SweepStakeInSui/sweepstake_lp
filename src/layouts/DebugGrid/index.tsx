'use client';

import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import Grid from '@/components/Grid';
import Col from '@/components/Grid/Col';

import Container from '../Container';
import s from './style.module.scss';

const cx = classNames.bind(s);

export default function DebugGrid() {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown: (ev: KeyboardEvent) => void = useCallback(
    (ev: KeyboardEvent) => {
      const { key } = ev;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 'G') {
        localStorage.setItem('isGrid', String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird],
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={cx('grid-debug', `${isGird ? '' : 'hidden'}`)}>
      <Container>
        <Grid>
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col span={1} className={cx('debug_col')} />
          <Col className={cx('debug_col', 'debug_col__last')} />
          <Col className={cx('debug_col', 'debug_col__last')} />
          <Col className={cx('debug_col', 'debug_col__last')} />
          <Col className={cx('debug_col', 'debug_col__last')} />
        </Grid>
      </Container>
    </div>
  );
}
