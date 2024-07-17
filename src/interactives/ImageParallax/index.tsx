'use client';

import React, { useRef } from 'react';

import ImagePreload from '@/components/ImagePreload';

import s from './styles.module.scss';
import useImageParallax from './useImageParallax';

interface IImageParallax {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  scale?: number;
  className?: string;
}

export default function ImageParallax({
  src,
  alt,
  className = '',
  width,
  height,
  scale,
}: IImageParallax): React.ReactNode {
  const refWrap = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLImageElement | null>(null);

  useImageParallax({ refWrap, refContent, scale });
  return (
    <div className={`${s.imgParallax} imgParallax`}>
      <div
        ref={refWrap}
        className={`${className} ${s.imgParallax_inner} imgParallax_inner`}
      >
        <ImagePreload
          width={width}
          height={height}
          ref={refContent}
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
}
