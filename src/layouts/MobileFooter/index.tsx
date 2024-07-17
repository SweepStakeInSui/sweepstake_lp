import { useLenis } from '@studio-freight/react-lenis';
import Link from 'next/link';

import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Col from '@/components/Grid/Col';
import IconButton from '@/components/IconButton';
import Stack from '@/components/Stack';
import { Typography } from '@/components/Typography';

import Container from '../Container';
import s from './style.module.scss';

export default function MobileFooter() {
  const lenis = useLenis();

  return (
    <footer className={s.footer}>
      <Container className={s.footer_container}>
        <Stack className={s.footer_stack}>
          <Grid className={s.footer_top}>
            <Col span={4} lgSpan={6} className={s.footer_top_left}>
              <Link href="mailto:thole.sain.work@gmail.com">
                <Typography color="secondary" variant="h6">
                  thole.sain.work@gmail.com
                </Typography>
              </Link>

              <Col span={4} lgSpan={6} className={s.footer_top_right}>
                <Button>
                  <Typography color="secondary">Twitter</Typography>
                </Button>
                <Button>
                  <Typography color="secondary">Twitter</Typography>
                </Button>
                <Button>
                  <Typography color="secondary">Twitter</Typography>
                </Button>
              </Col>

              <Stack>
                <Typography color="secondary" variant="description">
                  Binh Thanh, Ho Chi Minh City
                </Typography>
                <Typography color="secondary" variant="description">
                  © 2024 - THO LE - All rights reserved
                </Typography>
              </Stack>
            </Col>
          </Grid>

          <Grid>
            <Col span={3} lgSpan={6} className={s.footer_bottom_left}>
              <Typography color="secondary" variant="description">
                Hope you enjoy
                <br />
                your time here
              </Typography>
              <Typography isTitle variant="display2" color="secondary">
                THANK
                <br />
                YOU ツ
              </Typography>
            </Col>
            <Col span={1} lgSpan={6} className={s.footer_bottom_right}>
              <IconButton
                isRound
                icon="/icons/arrow.svg"
                aria-label="back to top"
                variant="solid"
                color="secondary"
                size="lg"
                onClick={() => {
                  lenis.stop();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  lenis.start();
                }}
              />
            </Col>
          </Grid>
        </Stack>
      </Container>
    </footer>
  );
}
