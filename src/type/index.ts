export interface IResponseConfig<T = any> {
  resultCode: number
  resultMsg: string
  status: number
  data: T
}
type NameType = string | number

interface Person1<T extends NameType> {
  name:T;
  age: number;
}
// 可行
const person1: Person1<string> = {
  name: 'cxk',
  age: 12
}
// 可行
const person2: Person1<number> = {
  name: 100,
  age: 12
}
// 约束泛型只能为string和number类型
const person3: Person1<boolean> = {
  name: true,
  age: 12
}

interface Person {
  name: string;
  age: number;
  location: string;
}

const person: Person = {
  name: 'carrotWu',
  age: 24,
  location: 'guanghzhou'

}
// 返回Person对象成员名称
type K1 = keyof Person; // name" | "age" | "location
type kValue = Person[K1] // string | number

function pick<T, k extends keyof T>(obj:T, names: k[]): T[k][] {
  return names.map(name => obj[name])
}
pick(person, ['name', 'location'])

interface Person3 {
  name: string;
  age: number;
  location: string;
}

type Partial<T> = {[K in keyof T] ?: T[K] }
type PersonPartial = Partial<Person3>

type Same<T, U> = T extends U ? T : never;
type same = Same<string | number, number>;  // number

type Diff<T, U> = T extends U ? never : T;
type diff = Diff<string | number, number | boolean>;  // string

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type FilterProterName<T, U> = { [K in keyof T] : Exclude<T[K], Function>} 

type R = FilterProterName<Part, number>;

const tttt: R = {
  id: 123
}
console.log(tttt)
class A {
  x = 0;
  y = 0;
  visible = false;
  render() {
      return 1;
  }
}

type RemoveProperties<T> = {
  readonly [P in keyof T]: T[P] extends Function ? T[P] : never//;
};

type dd = RemoveProperties<A>