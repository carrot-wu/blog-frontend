import {useCallback, useState} from "react";
import {isFunction} from "utils/checkType";

// 约束传入useSetState的类型
type ISetState<U> = U | ((...args: any[]) => U)

// 返回方法的参数类型 setState() 允许接收两种参数 传统的直接对象数据 或者是一个函数 函数的话参数是上一次state的值
type ReturnStateMethods<U> = Partial<U> | ((state: U) => Partial<U>)
export default function useSetState<T extends object>(initObj:ISetState<T>): [T, (state: ReturnStateMethods<T>) => void] {
  const [state, setState] = useState<T>(initObj)
  const newSetState = useCallback((state: ReturnStateMethods<T>) => {
    let newState = state
    setState((prevState:T) => {
      if(isFunction(state)){
        newState = state(prevState)
      }
      return {...prevState, ...newState}
    })
  }, [])
  return [state, newSetState]
}
