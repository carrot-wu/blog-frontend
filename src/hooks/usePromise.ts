import { useState } from 'react';
import { IResponseConfig } from '@/type';

export interface ILoadFn<T = any> {
  (...params: any[]): Promise<IResponseConfig<T>>;
}

interface ILoadFnOptions {
  defaultData?: any;
  reqInterceptors?: () => void;
  resInterceptors?: () => void;
}
interface InfiniteRes<T> {
  loadFn: (...params: any[]) => Promise<any>;
  loading: boolean;
  res: IResponseConfig<T>;
  error: Error | null;
}
export default function usePromise<T = any>(
  loadFn: ILoadFn<T>,
  options: ILoadFnOptions = {},
): InfiniteRes<T> {
  const { defaultData = {data: {}} } = options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IResponseConfig<T>>(defaultData);
  const [error, setError] = useState<Error | null>(null);

  const initLoad = async (...params: any[]) => {
    try {
      setError(null);
      setLoading(true);
      const result = await loadFn(...params);
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadFn: initLoad,
    res: data,
    loading,
    error,
  };
}
