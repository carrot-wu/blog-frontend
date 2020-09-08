import { useEffect, useRef } from 'react';
import { isPlainObject } from '@utils/checkType';

type Callback<T> = (cur: T, prev?: T) => void;

type Config = {
  //是否首次变化执行,默认useState初始化会执行一次
  immediate: boolean;
};
/**
 * @desc 侦听数据变化钩子(类似于vue中的watch方法)
 * @param {any} dep    需要侦听的数据
 * @param {function} callback - 数据变化时的回调,参数为变化前的值
 * @param { Object } config   配置,immediate为true则首次变化执行
 */

function useWatch<T>(dep: T, callback: Callback<T>, config?: Config) {
  const { immediate = true } = isPlainObject(config) ? config : {};
  const prev = useRef<T>();
  // 初始化标示位
  const init = useRef(false);

  useEffect(() => {
    const execute = () => callback(dep, prev.current);
    // 默认为false
    if (!init.current) {
      init.current = true;
      if (immediate) {
        execute();
      }
    } else {
      execute();
    }
    prev.current = dep;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

export default useWatch;
