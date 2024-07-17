import cn from 'classnames';

import { Typography } from '../Typography';
import s from './style.module.scss';

interface IChip {
  className?: string;
  text: string;
}

export default function Chip({ className, text }: IChip): React.ReactNode {
  return (
    <div className={cn(className, s.chip)}>
      <Typography variant="caption">{text}</Typography>
    </div>
  );
}
