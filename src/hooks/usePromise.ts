import {useCallback, useState} from 'react';
import {IResponseConfig, ReturnParamsType} from '@/type';
import {isArray, isPlainObject} from "@/utils/checkType";

// 限制传入的函数类型
export interface PromiseFn<T = any> {
  (...params: any[]): Promise<IResponseConfig<T>>;
}

type PromiseFnParams<T> = ReturnParamsType<PromiseFn<T>>

interface PromiseOptions {
  defaultData?: any;
  reqInterceptors?: () => void;
  resInterceptors?: () => void;
}

interface PromiseRes<T> {
  loadFn: (...params: PromiseFnParams<T>) => Promise<IResponseConfig<T>>;
  loading: boolean;
  res: IResponseConfig<T>;
  error: Error | null;
}

function usePromise<T = any>(
  loadFn: PromiseFn<T>,
): PromiseRes<T>;
function usePromise<T = any>(
  loadFn: PromiseFn<T>,
  depListOrOptions: any[] | PromiseOptions
): PromiseRes<T>;
function usePromise<T = any>(
  loadFn: PromiseFn<T>,
  depList: any[],
  options: PromiseOptions
): PromiseRes<T>;

function usePromise<T = any>(
  loadFn: PromiseFn<T>,
  depList?: any[] | PromiseOptions,
  options?: PromiseOptions,
): PromiseRes<T> {
  //重载
  let _options:PromiseOptions
  let _depList: any[]
  _depList = isArray(depList) ? depList : []
  _options = (isPlainObject(depList) && !isArray(depList)) ? depList : (options || {})

  const {defaultData = {data: {}}} = _options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IResponseConfig<T>>(defaultData);
  const [error, setError] = useState<Error | null>(null);

  const initLoad = useCallback(async (...params: PromiseFnParams<T>) => {
    try {
      setError(null);
      setLoading(true);
      const result = await loadFn(...params);
      setData(result);
      setLoading(false);
      return result
    } catch (e) {
      setLoading(false);
      setError(e);
      return Promise.reject(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [..._depList])

  return {
    loadFn: initLoad,
    res: data,
    loading,
    error,
  };
}

export default usePromise
