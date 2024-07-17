import cn from 'classnames';

import type {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../Button';
import SvgIcon from '../SvgIcon';
import type { TypographyProps } from '../Typography';
import s from './style.module.scss';

export interface IIconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
  > {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  color?: ButtonColor | TypographyProps['color'];
  loading?: boolean;
  block?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isRound?: boolean;
  icon: string;
}
export default function IconButton(props: Readonly<IIconButtonProps>) {
  const {
    icon,
    isRound = true,
    type = 'button',
    disabled,
    variant = 'plain',
    className,
    size = 'md',
    shape = 'default',
    loading,
    block,
    color = 'inherit',
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      disabled={loading || disabled}
      type={type || 'button'}
      className={cn(
        s.iconButton,
        s[variant],
        s[size],
        s[shape],
        loading ? s.loading : null,
        color ? s[color] : null,
        disabled || loading ? s.disabled : null,
        block ? s.block : null,
        className,
        isRound && s.rounded,
      )}
    >
      <SvgIcon src={icon} />
    </button>
  );
}
