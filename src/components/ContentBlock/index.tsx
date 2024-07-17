import cn from 'classnames';

import { Typography } from '../Typography';
import s from './style.module.scss';

interface IContentBlock {
  isRightAligned?: boolean;
  title: string;
  content: string[];
  hasTopBorder?: boolean;
  color?: 'primary' | 'secondary' | 'accent';
  desc?: string;
}

export default function ContentBlock({
  isRightAligned = false,
  title,
  content,
  hasTopBorder = true,
  color = 'primary',
  desc,
}: IContentBlock) {
  return (
    <div
      className={cn(
        s.contentBlock,
        isRightAligned ? s.rightAlign : '',
        hasTopBorder ? s.topBorder : '',
      )}
    >
      <Typography
        className={s.contentBlock_title}
        variant="subtitle2"
        color={color}
      >
        {title}
      </Typography>
      <div className={s.contentBlock_content}>
        {content?.map((text) => (
          <Typography key={text} color={color}>
            {text}
          </Typography>
        ))}
        <Typography variant="description">{desc}</Typography>
      </div>
    </div>
  );
}
