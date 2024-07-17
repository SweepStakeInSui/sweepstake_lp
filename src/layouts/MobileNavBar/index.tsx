'use client';

import Button from '@components/Button';
import cn from 'classnames';
import { useState } from 'react';

import Flex from '@/components/Flex';
import IconButton from '@/components/IconButton';
import Stack from '@/components/Stack';
import { Typography } from '@/components/Typography';
import useUiContext from '@/contexts/uiContext';

import s from './style.module.scss';

export interface INavList {
  name: string | React.ReactNode;
  link?: string;
}

type IMobileNavBar = {
  navlist: INavList[];
};

export default function MobileNavBar({ navlist }: Readonly<IMobileNavBar>) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection } = useUiContext();

  return (
    <nav className={cn(s.mnavbar_wrapper, isOpen && s.open)}>
      <Stack className={cn(s.mnavbar_inner, isOpen && s.open)}>
        <Flex className={cn(s.mnavbar_inner_logo)}>
          <Typography
            isTitle
            color="secondary"
            className={cn(s.mnavbar_inner_logo_text)}
          >
            THOLE©
          </Typography>
          <IconButton
            icon="/icons/burger.svg"
            aria-label="menu"
            onClick={(): void => {
              document.body.style.overflow = isOpen ? 'auto' : 'hidden';
              setIsOpen(!isOpen);
            }}
          />
        </Flex>

        <Stack className={s.menu}>
          <div className={cn(s.mnavbar_inner_bottom, isOpen && s.open)}>
            <Stack>
              {navlist?.map((link) => (
                <Flex
                  className={s.mnavbar_button_wrapper}
                  key={`$navBtn_${link.name}`}
                >
                  <Typography color="secondary">
                    {link.link === activeSection && '>'}
                  </Typography>
                  <Button
                    color="secondary"
                    variant="ghost"
                    className={s.mnavbar_button}
                  >
                    {link.name}
                  </Button>
                </Flex>
              ))}
            </Stack>
          </div>

          <Typography color="secondary">
            © 2024 - THO LE - All rights reserved
          </Typography>
        </Stack>
      </Stack>
    </nav>
  );
}
