'use client';

import Button from '@components/Button';
import { useLenis } from '@studio-freight/react-lenis';
import cn from 'classnames';

import IconButton from '@/components/IconButton';
import { useScroll } from '@/contexts/ScrollContext';
import useUiContext from '@/contexts/uiContext';

import s from './style.module.scss';

export interface INavList {
  name: string | React.ReactNode;
  link: string;
}

type INavBar = {
  navlist: INavList[];
};

export default function NavBar({ navlist }: Readonly<INavBar>) {
  const { activeSection } = useUiContext();
  const { scrollTo } = useScroll();

  const lenis = useLenis();

  const handleLogoClick = () => {
    lenis.stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lenis.start();
  };

  return (
    <nav className={cn(s.navbar_wrapper)}>
      <div className={cn(s.navbar_inner)}>
        <IconButton
          variant="ghost"
          tabIndex={0}
          aria-label="Go to top"
          className={cn(s.navbar_inner_logo)}
          onKeyDown={handleLogoClick}
          onClick={handleLogoClick}
          icon="/icons/logo.svg"
        />
        {navlist?.map((link, index) => (
          <div className={s.navbar_btn} key={`$navBtn_${link.name}`}>
            <Button
              color="secondary"
              variant={`${index === navlist.length - 1 ? 'solid' : 'ghost'}`}
              className={
                activeSection === link.link && index !== navlist.length - 1
                  ? s.active
                  : ''
              }
              onClick={() => {
                scrollTo(link.link);
              }}
            >
              {link.name}
            </Button>
          </div>
        ))}
      </div>
    </nav>
  );
}
