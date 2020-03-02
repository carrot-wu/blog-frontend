type TypeChecker = {
  number: number
  boolean: boolean
  array: Array<any>
  object: object
  function: (...args: any[]) => any
  string: string
  null: null
  undefined: undefined
  symbol: symbol
  date: Date
  error: Error
}
const toString = Object.prototype.toString
const checkType = <U extends keyof TypeChecker>(type: U) => {
  // 检查是否相应的类型
  return function(val: unknown):val is TypeChecker[U]{
    return toString.call(val).slice(8, -1) === type.toLowerCase()
  }
}
export const isNumber = checkType('number')
export const isArray = checkType('array')
export const isBoolean = checkType('boolean')
export const isPlainObject = checkType('object')
export const isFunction = checkType('function')
export const isUndefined= checkType('undefined')
export const isString = checkType('string')
export const isSymbol = checkType('symbol')
export const isDate = checkType('date')
export const isError = checkType('error')
