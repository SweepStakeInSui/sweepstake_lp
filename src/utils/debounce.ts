/* eslint-disable */
type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export default function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number,
): DebouncedFunction<T> {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, ms);
  };
}
