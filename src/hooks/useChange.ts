import { useCallback, useState } from 'react';

export default function useChange<T>(initState: T | (() => T)) {
  const [value, setValue] = useState<T>(initState);
  // 原生change事件
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return {
    value,
    setValue,
    bindEvent: {
      value,
      onChange,
    },
    bind: {
      value,
      onChange: setValue,
    },
  };
}
