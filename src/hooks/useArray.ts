import useMethods from './useMethods';

interface UseArrayMethods<T extends any[]> {
  plainPush: (value: T, ...args: T) => T;
  plainPop: (value: T) => T;
  plainUnshift: (value: T, ...args: T) => T;
  plainShift: (value: T) => T;
}

/**
 *
 * @param {boolean} initState 初始值
 * @returns {[number, ReturnMethods<UseNumberMethods<number>, number>]}
 */
function useArray<T>(initState: T[]) {
  const methods: UseArrayMethods<T[]> = {
    plainPush(value, ...args) {
      return [...value, ...args];
    },
    plainPop(value) {
      return value.slice(0, -1);
    },
    plainUnshift(value, ...args) {
      return [...args, ...value];
    },
    plainShift(value) {
      return value.slice(1);
    },
  };

  return useMethods(initState, methods);
}

export default useArray;
