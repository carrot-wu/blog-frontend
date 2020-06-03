import {useCallback, useEffect, useState} from 'react';
import {isArray, isPlainObject} from "@utils/checkType";

type PromiseFn<R,P extends any[]> = (...args: P) => Promise<R>

// 一些默认的配置
interface PromiseOptions {
  // 默认数值， 用于初始化时的显示
  defaultData?: any;
  reqInterceptors?: () => void;
  resInterceptors?: () => void;
  immediate?: false
}

// 返回的对象类型
interface PromiseRes<T, R> {
  // 用于进行调用的方法
  promiseFn: T;
  // loading状态
  loading: boolean;
  // 请求的返回值
  res: R;
  // 请求错误时的error
  error: Error | null;
}

// 函数重载
function usePromise<R, P extends any[]>(
  promiseFn: PromiseFn<R,P>,
): PromiseRes<PromiseFn<R,P>, R>
function usePromise<R, P extends any[]>(
  promiseFn: PromiseFn<R,P>,
  depListOrOptions: any[] | PromiseOptions
): PromiseRes<PromiseFn<R,P>, R>
function usePromise<R, P extends any[]>(
  promiseFn: PromiseFn<R,P>,
  depList: any[],
  options: PromiseOptions,
): PromiseRes<PromiseFn<R,P>, R>
/**
 * 用于封装请求的自定义hooks方法
 * @param {PromiseFn<R, P>} promiseFn 传入的promise方法
 * @param {any[] | PromiseOptions} depList depList 依赖数组
 * @param {PromiseOptions} options 一些自定义的配置
 * @returns {PromiseRes<PromiseFn<R, P>, R>}
 */
function usePromise<R, P extends any[]>(
  promiseFn: PromiseFn<R,P>,
  depList?: any[] | PromiseOptions,
  options?: PromiseOptions,
): PromiseRes<PromiseFn<R,P>, R> {
  //重载
  let _options:PromiseOptions
  let _depList: any[]
  _depList = isArray(depList) ? depList : []
  _options = (isPlainObject(depList) && !isArray(depList)) ? depList : (options || {})

  const {defaultData = {data: {}}, immediate} = _options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<R>(defaultData);
  const [error, setError] = useState<Error | null>(null);

  // 返回出去的promise函数
  const returnPromise = useCallback(async (...params: P) => {
    try {
      setError(null);
      setLoading(true);
      const result = await promiseFn(...params);
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

  useEffect(() => {
    if(immediate) {
      // @ts-ignore
      returnPromise()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    promiseFn: returnPromise,
    res: data,
    loading,
    error,
  };
}

export default usePromise
