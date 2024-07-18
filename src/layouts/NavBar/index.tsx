import { useLenis } from '@studio-freight/react-lenis';

import ConnectWalletBtn from '@/components/ConnectWalletBtn';
import Flex from '@/components/Flex';
import SvgIcon from '@/components/SvgIcon';
import { useIsMobile } from '@/hooks/useWindowSize';

import Container from '../Container';
import s from './style.module.scss';

export default function NavBar() {
  const lenis = useLenis();
  const isMobile = useIsMobile();

  return (
    <Container className={s.navbar}>
      <Flex className={s.navbar_inner}>
        <button
          className={s.navbar_logo__mobile}
          onClick={() => {
            lenis.stop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            lenis.start();
          }}
        >
          {isMobile ? (
            <SvgIcon
              src="/logos/square-logo.svg"
              aria-label="Sweepstake logo"
            />
          ) : (
            <SvgIcon src="/logos/logo.svg" aria-label="Sweepstake logo" />
          )}
        </button>

        <ConnectWalletBtn />
      </Flex>
    </Container>
  );
}
