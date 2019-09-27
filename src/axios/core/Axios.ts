import {AxiosConfig, AxiosPromise, AxiosResponse, RejectFn, ResolveFn} from "../type"
import dispatchRequest, {transformUrl} from "./dispatchRequest"
import InterceptorManager from "../utils/InterceptorManager"
import mergeConfig from "./mergeConfig"

// 实例拦截器属性接口
// 请求前和后拦截函数
interface Interceptors {
  request: InterceptorManager<AxiosConfig>,
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolveFn: ResolveFn<T> | ((config: AxiosConfig) => AxiosPromise),
  rejectFn?: RejectFn
}

export default class Axios {
  interceptors: Interceptors
  defaults: AxiosConfig

  constructor(initConfig: AxiosConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }

  request(config: AxiosConfig): AxiosPromise {
    config = mergeConfig(this.defaults, config)
    // 声明promise的链 用于链式调用
    const chain: PromiseChain<any>[] = [{
      resolveFn: dispatchRequest,
      rejectFn: undefined
    }]
    this.interceptors.request.forEach(interceptor => chain.unshift(interceptor))
    this.interceptors.response.forEach(interceptor => chain.push(interceptor))

    //链式调用连中的方法
    let promise = Promise.resolve(config)
    promise = chain.reduce((prev, cur) => {
      const {resolveFn, rejectFn} = cur
      return prev.then(resolveFn, rejectFn)
    }, promise)
    return (promise as AxiosPromise)
  }

  getUri(config: AxiosConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformUrl(config)
  }
  get(url: string, config?: AxiosConfig): AxiosPromise {
    return this.request(Object.assign((config || {}), {url, method: 'get'}))
  }

  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this.request(Object.assign((config || {}), {url, method: 'delete', data}))
  }

  delete(url: string, config?: AxiosConfig): AxiosPromise {
    return this.request(Object.assign((config || {}), {url, method: 'delete'}))
  }

  option(url: string, config?: AxiosConfig): AxiosPromise {
    return this.request(Object.assign((config || {}), {url, method: 'option'}))
  }
}
