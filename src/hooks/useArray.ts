import useMethods from "./useMethods"

interface UseArrayMethods<T extends any[]> {
  push:(value:T, ...args: T) => T
  pop:(value:T) => T
  unshift:(value:T, ...args: T) => T
  shift:(value:T) => T
}

/**
 *
 * @param {boolean} initState 初始值
 * @returns {[number, ReturnMethods<UseNumberMethods<number>, number>]}
 */
function useArray<T>(initState: T[]) {
  const methods:UseArrayMethods<T[]> = {
    push(value, ...args) {
      return [...value, ...args]
    },
    pop(value) {
      return value.slice(0, -1)
    },
    unshift(value, ...args) {
      return [...args, ...value]
    },
    shift(value) {
      return value.slice(1)
    },
  }

  return useMethods(initState, methods)
}

export default useArray
