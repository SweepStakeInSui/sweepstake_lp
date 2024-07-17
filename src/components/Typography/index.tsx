'use client';

import cn from 'classnames';
import React, { forwardRef } from 'react';

import { titleFont } from '@/constants/font-styles';

import styles from './style.module.scss';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'label'
  | 'body'
  | 'caption'
  | 'description'
  | 'button';
type TypographyColor = 'accent' | 'primary' | 'secondary';

export interface TypographyProps extends React.HTMLProps<HTMLOrSVGElement> {
  color?: TypographyColor;
  variant?: TypographyVariant;
  tag?: React.ElementType;
  target?: string;
  href?: string;
  isTitle?: boolean;
}

export const Typography = forwardRef((props: TypographyProps, ref: unknown) => {
  const {
    color = 'primary',
    variant = 'caption',
    tag: Tag = 'p',
    className,
    children,
    isTitle = false,
    ...restProps
  } = props;

  return (
    <Tag
      {...restProps}
      ref={ref}
      className={cn(
        styles.typography,
        color ? styles[color] : null,
        styles[variant],
        className,
        isTitle && titleFont.className,
      )}
    >
      {children}
    </Tag>
  );
});

Typography.displayName = 'Typography';
