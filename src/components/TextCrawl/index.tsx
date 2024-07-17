import { Typography } from '../Typography';
import s from './style.module.scss';

type TextCrawlProps = {
  text: string | string[];
};

export default function TextCrawl({ text }: TextCrawlProps) {
  if (typeof text === 'string') {
    return (
      <div className={s.textCrawl_wrapper}>
        <div className={s.textCrawl_boxes}>
          {[...Array(10)].map((e) => (
            <Typography
              variant="display2"
              color="secondary"
              key={e}
              className={s.textCrawl_box}
            >
              {text}
            </Typography>
          ))}
        </div>
      </div>
    );
  }
  return <div className={s.textCrawl_wrapper} />;
}
