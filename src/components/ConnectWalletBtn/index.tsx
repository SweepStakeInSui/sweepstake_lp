import Link from 'next/link';

import Button from '../Button';

export default function ConnectWalletBtn() {
  return (
    <Link target="_blank" href="https://app.sweepstakes.market/">
      <Button color="secondary">Launch app</Button>
    </Link>
  );
}
