import { useMemo } from 'react';
import { format } from 'date-fns';

export default function useFormatDate(
  time: string | number,
  type: string = 'yyyy-MM-dd HH:MM',
) {
  return useMemo(() => {
    return time ? format(new Date(time), type) : '暂无';
  }, [time, type]);
}
