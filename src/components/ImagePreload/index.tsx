'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';

import s from './styles.module.scss';

const ImagePreload = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [isLoaded, setIsloaded] = useState(false);

  return (
    <div ref={ref} className={`${s.imagePreload} ${isLoaded && s.isLoaded}`}>
      <Image
        className={`${props.className} ${s.imagePreload_origin}`}
        onLoad={(): void => setIsloaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
      <Image
        className={`${props.className} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={10}
        height={10}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePreload.displayName = 'ImagePreload';
export default ImagePreload;
