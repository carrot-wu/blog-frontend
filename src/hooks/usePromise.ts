import {useCallback, useState} from 'react';
import {IResponseConfig, ReturnParamsType} from 'type';
import {isArray, isPlainObject} from "utils/checkType";


type PromiseFn<U> = (...params: any[]) => Promise<IResponseConfig<U>>

// 一些默认的配置
interface PromiseOptions {
  // 默认数值， 用于初始化时的显示
  defaultData?: any;
  reqInterceptors?: () => void;
  resInterceptors?: () => void;
}

// 返回的对象类型
interface PromiseRes<U, T> {
  // 用于进行调用的方法
  loadFn: T;
  // loading状态
  loading: boolean;
  // 请求的返回值
  res: IResponseConfig<U>;
  // 请求错误时的error
  error: Error | null;
}

// 函数重载
function usePromise<U, T extends PromiseFn<U>>(
  loadFn: T,
): PromiseRes<U,T>;
function usePromise<U, T extends PromiseFn<U>>(
  loadFn: T,
  depListOrOptions: any[] | PromiseOptions
): PromiseRes<U,T>;
function usePromise<U, T extends PromiseFn<U>>(
  loadFn: T,
  depList: any[],
  options: PromiseOptions
): PromiseRes<U,T>;

/**
 * 用于封装请求的自定义hooks方法
 * @param {T} loadFn promise方法
 * @param {any[] | PromiseOptions} depList 依赖数组
 * @param {PromiseOptions} options 一些自定义的配置
 * @returns {PromiseRes<U, T>}
 */
function usePromise<U, T extends PromiseFn<U>>(
  loadFn: T,
  depList?: any[] | PromiseOptions,
  options?: PromiseOptions,
): PromiseRes<U,T> {
  //重载
  let _options:PromiseOptions
  let _depList: any[]
  _depList = isArray(depList) ? depList : []
  _options = (isPlainObject(depList) && !isArray(depList)) ? depList : (options || {})

  const {defaultData = {data: {}}} = _options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IResponseConfig<U>>(defaultData);
  const [error, setError] = useState<Error | null>(null);

  const initLoad = useCallback(async (...params: ReturnParamsType<T>) => {
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
    loadFn: initLoad as T,
    res: data,
    loading,
    error,
  };
}

export default usePromise
