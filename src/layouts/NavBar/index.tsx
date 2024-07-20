import Image from 'next/image';

import ConnectWalletBtn from '@/components/ConnectWalletBtn';
import Flex from '@/components/Flex';
import { useIsMobile } from '@/hooks/useWindowSize';

import Container from '../Container';
import s from './style.module.scss';

export default function NavBar() {
  const isMobile = useIsMobile();

  return (
    <Container className={s.navbar}>
      <Flex className={s.navbar_inner}>
        <div className={s.navbar_logo}>
          {isMobile ? (
            <div className={s.navbar_logo__mobile}>
              <Image src="/logos/square-logo.png" alt="Sweepstake logo" fill />
            </div>
          ) : (
            <div className={s.navbar_logo__desktop}>
              <Image src="/logos/logo.png" alt="Sweepstake logo" fill />
            </div>
          )}
        </div>

        <ConnectWalletBtn />
      </Flex>
    </Container>
  );
}
