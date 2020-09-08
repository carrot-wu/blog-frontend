import { useState } from 'react';
import { isFunction } from '@utils/checkType';

// 灵感来源于知乎上的筛选出符合函数的类型
type FilterMethods<K, U> = {
  [P in keyof K]: K[P] extends (value: U, ...args: any[]) => U ? K[P] : never;
};

// 获取除了state本身自外的其他函数参数
type GetExtraParams<U, T> = U extends (value: T, ...args: infer P) => void ? P : never;

// 映射类型生成返回的函数对象
type ReturnMethods<U, T> = {
  [P in keyof U]: (...args: GetExtraParams<U[P], T>) => void;
};

/**
 *  接受一个值和方法进行hooks化
 * @param {T} initState 初始化值
 * @param {K} methods 需要hooks话的方法
 * @returns {[T, ReturnMethods<K, T>]}
 */
function useMethods<T, K extends FilterMethods<K, T>>(initState: T, methods: K): [T, ReturnMethods<K, T>] {
  const [value, setValue] = useState<T>(() => initState);
  const methodsTypes = Object.keys(methods) as Array<keyof K>;
  const boundMethods = methodsTypes.reduce((newMethods, name) => {
    const fn = methods[name];
    if (isFunction(fn)) {
      newMethods[name] = (...args: any[]) => {
        setValue((value) => fn(value, ...args));
      };
    }
    return newMethods;
  }, {} as ReturnMethods<K, T>);
  return [value, boundMethods];
}

export default useMethods;
