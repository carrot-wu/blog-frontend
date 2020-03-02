// 检查类型的策略模式
type TypeChecker = {
  number: number;
  boolean: boolean;
  array: Array<any>;
  object: object;
  promise: Promise<any>;
  asyncFunction: (...args: any[]) => Promise<any>;
  string: string;
  null: null;
  undefined: undefined;
  symbol: symbol;
  date: Date;
  error: Error;
};
const typeToString = Object.prototype.toString
const checkType = <U extends keyof TypeChecker>(type: U) => (val: unknown): val is TypeChecker[U] => (
  typeToString
    .call(val)
    .slice(8, -1)
    .toLowerCase() === type.toLowerCase()
)
const isNumber = checkType('number');
const isArray = checkType('array');
const isBoolean = checkType('boolean');
const isPlainObject = checkType('object');
const isAsyncFunction = checkType('asyncFunction');
const isPromise = checkType('promise');
const isUndefined = checkType('undefined');
const isString = checkType('string');
const isSymbol = checkType('symbol');
const isDate = checkType('date');
const isError = checkType('error');


const isFunction = (val: unknown): val is Function => typeof val === 'function'
export {
  isNumber,
  isArray,
  isBoolean,
  isPlainObject,
  isFunction,
  isPromise,
  isAsyncFunction,
  isUndefined,
  isString,
  isSymbol,
  isDate,
  isError
}
