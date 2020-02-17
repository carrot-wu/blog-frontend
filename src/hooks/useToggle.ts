import useMethods from "./useMethods"

interface UseToggleMethods<T = boolean> {
  toggle:(value:T) => T
  setFalse:() => T
  setTrue:() => T
}
const methods:UseToggleMethods = {
  toggle(value) {
    return !value
  },
  setFalse() {
    return false
  },
  setTrue() {
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
