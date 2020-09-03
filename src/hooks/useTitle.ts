import { useEffect } from 'react';

export default function useTitle(
  inTitle: string | void,
  leftTitle?: string
): void {
  useEffect(() => {
    if (inTitle) {
      document.title = inTitle;
    }
    return () => {
      if (leftTitle) {
        document.title = leftTitle;
      }
    };
  }, [inTitle, leftTitle]);
}
