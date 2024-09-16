import Link from 'next/link';

import Button from '../Button';

export default function ConnectWalletBtn() {
  return (
    <Link target="_blank" href="https://sweepstake-seven.vercel.app/">
      <Button color="secondary">Launch app</Button>
    </Link>
  );
}
