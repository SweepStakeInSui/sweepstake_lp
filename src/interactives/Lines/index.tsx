'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import React, { useRef } from 'react';

import useHeadingChars from './useHeadingChars';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  isObserver?: boolean;
}

type TypeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function HeadingChars({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<TypeRef>(null);

  useHeadingChars({
    refContent,
    delayTrigger,
    delayEnter,
    isObserver,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
