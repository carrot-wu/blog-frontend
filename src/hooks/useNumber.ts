import useMethods from './useMethods';

interface UseNumberMethods<T = number> {
  increment: (value: T) => T;
  decrement: (value: T) => T;
  add: (value: T, num: number) => T;
  dec: (value: T, num: number) => T;
}
const methods: UseNumberMethods = {
  increment(value) {
    return value + 1;
  },
  decrement(value) {
    return value - 1;
  },
  add(value, num: number) {
    return value + num;
  },
  dec(value, num: number) {
    return value - num;
  },
};

/**
 *
 * @param {number} initState 初始值
 * @returns {[number, ReturnMethods<UseNumberMethods<number>, number>]}
 */
function useNumber(initState: number) {
  return useMethods(initState, methods);
}

export default useNumber;
