type valType =
  'String'
  | 'Function'
  | 'Boolean'
  | 'Number'
  | 'Null'
  | 'Undefined'
  | 'Array'
  | 'Date'
  | 'Symbol'
  | 'Object'

function isType(type: valType) {
  return function (val: any): boolean {
    return Object.prototype.toString.call(val).slice(8,-1) === type
  }
}

export const isString= isType('String')
export const isFunction = isType('Function')
export const isBoolean = isType('Boolean')
export const isNumber = isType('Number')
export const isArray = isType('Array')
export const isDate = isType('Date')
export const isSymbol = isType('Symbol')
export const isUndefined = isType('Undefined')
export const isNull = isType('Null')
export const isPlainObject = isType('Object')
export function isObject(val: any):boolean {
  return typeof val === 'object' && val !== null
}
