import { League_Gothic, Victor_Mono } from 'next/font/google';

export const titleFont = League_Gothic({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const contentFont = Victor_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});
