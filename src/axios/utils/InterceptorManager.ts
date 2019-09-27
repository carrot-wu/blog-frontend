import {RejectFn, ResolveFn} from "../type"

interface Interceptors<T> {
  resolveFn: ResolveFn<T>,
  rejectFn?: RejectFn
}

interface ForEachFn<T> {
  (interceptor: Interceptors<T>): void
}

export default class InterceptorManager<T> {
  // 私有的构造数组
  private interceptors: Array<Interceptors<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加拦截器
  use(resolveFn: ResolveFn<T>, rejectFn?: RejectFn): number {
    const interceptor: Interceptors<T> = {
      resolveFn,
      rejectFn
    }
    this.interceptors.push(interceptor)
    // 返回id 返回当前数组长度
    return this.interceptors.length - 1
  }
  // 向外暴露一个可以循环的方法
  forEach(fn: ForEachFn<T>): void {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor)
    })
  }

  eject(id: number): void {
    // 因为保存的是长度 为了长度不发生变化 那么不允许修改长度 直接置为null即可
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }
}
