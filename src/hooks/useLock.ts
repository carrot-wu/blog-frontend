import { useCallback, useState } from 'react';

/**
 * 类似于函数节流 初次触发后只能在delay毫秒之后才能重新触发执行
 * @param eventFn 执行的回调函数
 * @param delay 延迟
 */
export default function useLock<T extends any[], P>(eventFn: (...args: T) => P, delay: number = 500) {
  const [lock, setLock] = useState(false);

  const lockFn = useCallback(
    (...args: T) => {
      if (lock) {
        return;
      }
      setLock(true);
      setTimeout(() => setLock(false), delay);
      return eventFn(...args);
    },
    [delay, eventFn, lock]
  );

  return lockFn;
}
