'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Stack from '@/components/Stack';
import { Typography } from '@/components/Typography';
import Container from '@/layouts/Container';

import s from './style.module.scss';

export default function NotFoundModule() {
  const router = useRouter();

  return (
    <Container className={s.notFound}>
      <Stack className={s.notFound_stack}>
        <Typography color="secondary" variant="display2" isTitle>
          Not Found
        </Typography>
        <Typography color="secondary" className={s.notFound_text}>
          404 Error. Could not find requested resource
        </Typography>
        <Link href="/">
          <Button
            variant="solid"
            color="secondary"
            className={s.notFound_btn}
            onClick={() => router.push('/')}
          >
            <Typography>Head Back Home</Typography>
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
