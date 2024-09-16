'use client';

import './index.scss';

import Stack from '@components/Stack';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PageTransition = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack className="loading z-50 fixed top-0 left-0 w-screen h-screen bg-bg-container flex items-center justify-center">
      <div className="relative w-full h-full">
        <div
          className={`relative w-fit top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${!isLoading ? 'logoWrapper' : ''}`}
        >
          <Image
            src="/logos/square-logo.png"
            alt="logo"
            width={100}
            height={100}
            className="grayscale"
          />
          <Image
            src="/logos/square-logo.png"
            alt="logo"
            width={100}
            height={100}
            className={`absolute top-0 ${isLoading ? 'logoSquare-grayscale' : ''}`}
          />
        </div>
        <div
          className={`absolute w-fit top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] logoText ${!isLoading ? 'logoTextAni' : ''}`}
        >
          <Image
            src="/logos/logo-text.png"
            alt="logo"
            width={300}
            height={100}
          />
        </div>
      </div>
    </Stack>
  );
};

export default PageTransition;
