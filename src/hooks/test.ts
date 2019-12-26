import {useState} from 'react'

// // 约束对象值为函数类型
// type Methods<T> = {
//   [keys: string]: (value: T, ...args: any[]) => T;
// }
//
// // 返回对象为一个新的对象函数
// type ReturnMethods = {
//   [keys: string]: (...args: any[]) => void;
// }
// function useMethods<T, K extends Methods<T>>(
//   initState: T,
//   methods: K
// ): [T, ReturnMethods] {
//   const [value, setValue] = useState<T>(() => initState);
//   const boundMethods = Object.keys(methods).reduce((newMethods, name) => {
//     const fn = methods[name];
//     newMethods[name] = (...args: any[]) => {
//       setValue(value => fn(value, ...args));
//     }
//     return newMethods;
//   }, {} as ReturnMethods);
//   return [value, boundMethods];
// }
//
// interface NumberMethods{
//   increment: (value: number) => number
//   decrement: (value: number) => number
// }
// const methods:Methods<number> = {
//   increment(value) {
//     return value + 1;
//   },
//   decrement(value) {
//     return value - 1;
//   },
//   addNumber(value, num: number){
//     return value + num
//   }
// }

// const [value, returnMethods] = useMethods(1, methods);

/* ------------------------2------------------------*/

// interface Methods<T> {
//   [keys: string]: (value: T, ...args: any[]) => T;
// }
//
// // 获取除了state本身自外的其他函数参数
// type GetExtraParams<U, T> = U extends (value: T, ...args: infer P) => void ? P : never
//
// // 映射类型生成返回的函数对象
// type ReturnMethods<U, T> = {
//   [P in keyof U]: (...args: GetExtraParams<U[P], T>) => void;
// }
//
// function useReducerHook<T, K extends Methods<T>>(
//   initState: T,
//   methods: K
// ): [T, ReturnMethods<K, T>] {
//   const [value, setValue] = useState<T>(() => initState);
//   const methodsTypes = Object.keys(methods) as Array<keyof K>
//   const boundMethods = methodsTypes.reduce((newMethods, name) => {
//     const fn = methods[name];
//     newMethods[name] = (...args: any[]) => {
//       setValue(value => fn(value, ...args));
//     }
//     return newMethods;
//   }, {} as ReturnMethods<K, T>);
//   return [value, boundMethods];
// }
//
// interface NumberMethods{
//   increment: (value: number) => number
//   decrement: (value: number) => number
//   addNumber: (value: number, num:number) => number
// }
// //const methods:Methods<number>
// const methods = {
//   increment(value: number) {
//     return value + 1;
//   },
//   decrement(value: number) {
//     return value - 1;
//   },
//   addNumber(value: number, num: number){
//     return value + num
//   }
// }
// const [value, hhhh] = useReducerHook(1, methods);
// hhhh.addNumber('123')

/*------------------------------------------3-------------------*/

// // 筛选出符合函数的类型
// type FilterMethods<K, U> = {
//   [P in keyof K]: K[P] extends (value: U, ...args: any[]) => U ? K[P] : never
// }
//
// // 获取除了state本身自外的其他函数参数
// type GetExtraParams<U, T> = U extends (value: T, ...args: infer P) => void ? P : never
//
// // 映射类型生成返回的函数对象
// type ReturnMethods<U, T> = {
//   [P in keyof U]: (...args: GetExtraParams<U[P], T>) => void;
// }
//
// /**
//  *  接受一个值和方法进行hooks化
//  * @param {T} initState 初始化值
//  * @param {K} methods 需要hooks话的方法
//  * @returns {[T, ReturnMethods<K, T>]}
//  */
// function useMethods<T, K extends FilterMethods<K, T>>(
//   initState: T,
//   methods: K
// ): [T, ReturnMethods<K, T>] {
//   const [value, setValue] = useState<T>(() => initState);
//   const methodsTypes = Object.keys(methods) as Array<keyof K>
//   const boundMethods = methodsTypes.reduce((newMethods, name) => {
//     const fn = methods[name];
//     if (typeof fn === 'function') {
//       newMethods[name] = (...args: any[]) => {
//         setValue(value => fn(value, ...args));
//       }
//     }
//     return newMethods;
//   }, {} as ReturnMethods<K, T>);
//   return [value, boundMethods];
// }
// interface NumberMethods{
//   increment: (value: number) => number
//   decrement: (value: number) => number
//   addNumber: (value: number, num:number) => number
// }
// const methods:NumberMethods = {
//   increment(value) {
//     return value + 1;
//   },
//   decrement(value) {
//     return value - 1;
//   },
//   addNumber(value, num){
//     return value + num
//   }
// }
// const [value, hhhh] = useMethods(1, methods);
// hhhh.addNumber('123')
