import {Canceler, CancelExecutor, CancelTokenSource, CancelTokenStatic} from "../type";
import Cancel from "./Cancel"

interface ResolvePromise {
  (reason?: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    //exectutor 传入resolve方法
    executor((message) => {
      if(this.reason) return false
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if(this.reason) throw this.reason
  }
  // 创建实例的静态方法
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken( c => {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }
}
