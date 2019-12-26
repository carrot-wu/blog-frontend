import useMethods from "./useMethods"

interface UseToggleMethods<T = boolean> {
  toggle:(value:T) => T
  makeFalse:(value:T) => T
  makeTrue:(value:T) => T
}
const methods:UseToggleMethods = {
  toggle(value) {
    return !value
  },
  makeFalse(value: boolean) {
    return false
  },
  makeTrue(value: boolean) {
    return true
  },
}

/**
 *
 * @param {boolean} initState 初始值
 * @returns {[number, ReturnMethods<UseNumberMethods<number>, number>]}
 */
function useToggle(initState: boolean) {
  return useMethods(initState, methods)
}

export default useToggle
