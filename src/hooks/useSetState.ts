import {useCallback, useState, useEffect, useRef} from "react";
import {isFunction} from "utils/checkType";

// 约束传入useSetState的类型
type ISetState<U> = U | ((...args: any[]) => U)

// 返回方法的参数类型 setState() 允许接收两种参数 传统的直接对象数据 或者是一个函数 函数的话参数是上一次state的值
type ReturnStateMethods<U> = Partial<U> | ((state: U) => Partial<U>)

type ReturnSetStateFn<T> = (state: ReturnStateMethods<T>, cb?: (...args: any[]) => void) => void
/**
 * 模拟class组件的setState方法
 * @param {ISetState<T>} initObj
 * @returns {[T, ((state: ReturnStateMethods<T>) => void)]}
 */
export default function useSetState<T extends object>(initObj:ISetState<T>): [T, ReturnSetStateFn<T>] {
  const [state, setState] = useState<T>(initObj)
  // 通过useRef缓存cb方法用于下面的useEffect进行渲染
  const executeCb = useRef<(...args: any[]) => void>()
  const mySetState = useCallback<ReturnSetStateFn<T>>((state, cb) => {
    let newState = state
    setState((prevState:T) => {
      executeCb.current = cb
      if(isFunction(state)){
        newState = state(prevState)
      }
      return {...prevState, ...newState}
    })
  }, [])
  useEffect(() => {
    const {current: cb} = executeCb
    isFunction(cb) && cb()
    // eslint-disable-next-line
  }, [executeCb.current])
  return [state, mySetState]
}
