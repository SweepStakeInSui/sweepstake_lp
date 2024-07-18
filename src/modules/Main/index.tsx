import MainHero from './Hero';
import s from './style.module.scss';

export default function MainModule() {
  return (
    <section className={s.main}>
      <MainHero />
    </section>
  );
}
