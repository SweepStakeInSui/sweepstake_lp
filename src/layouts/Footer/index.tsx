import Container from '../Container';
import s from './style.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <Container className={s.footer_container}>Footer</Container>
    </footer>
  );
}
