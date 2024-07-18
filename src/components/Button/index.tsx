import type { TypographyProps } from '@components/Typography';
import cn from 'classnames';
import React from 'react';

import styles from './style.module.scss';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'default' | 'styled';
export type ButtonColor = 'inherit' | 'primary' | 'secondary';
export type ButtonType = JSX.IntrinsicElements['button']['type'];
export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
  > {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  color?: ButtonColor | TypographyProps['color'];
  loading?: boolean;
  block?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export default function Button(props: Readonly<ButtonProps>): React.ReactNode {
  const {
    children,
    type = 'button',
    disabled,
    variant = 'solid',
    className,
    size = 'md',
    shape = 'default',
    loading,
    block,
    color = 'primary',
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      disabled={loading || disabled}
      type={type || 'button'}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        styles[shape],
        loading ? styles.loading : null,
        color ? styles[color] : null,
        disabled || loading ? styles.disabled : null,
        block ? styles.block : null,
        className,
      )}
    >
      {children}

      {loading && (
        <span className={styles.loader}>
          <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
          </svg>
        </span>
      )}
    </button>
  );
}
