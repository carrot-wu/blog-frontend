import {useState} from "react";
import {isFunction} from "utils/checkType";

interface IReturnSetStatFn<T> {
  (state: (Partial<T> | ((prevObjState:T) => Partial<T>))): void
}
export default function useSetState<T extends object>(state: T | ((...args:any[]) => T)):[T, IReturnSetStatFn<T>] {
  const [objState, setObjState] = useState<T>(state)
  function returnSetObjFn(state: Partial<T> | ((prevObjState:T) => Partial<T>)) {
    // 函数的话执行这个函数获得需要浅拷贝的对象
    const needSetState:Partial<T> = isFunction(state) ? state(objState) : state
    return setObjState((prevState) => ({
      ...prevState,
      ...needSetState
    }))
  }
  return [objState, returnSetObjFn]
}
