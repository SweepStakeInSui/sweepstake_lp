import cn from 'classnames';

import { Typography } from '../Typography';
import s from './style.module.scss';

type SectionTitleProps = {
  index: number;
  title: string;
} & React.HTMLProps<HTMLOrSVGElement>;

export default function SectionTitle({
  index,
  title,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('relative', className)}>
      <Typography variant="description" className={s.sectionTitle_index}>
        {`${index < 10 ? '0' : ''}${index}`}.
      </Typography>
      <Typography variant="h3" className={s.sectionTitle_title}>
        {title}
      </Typography>
    </div>
  );
}
