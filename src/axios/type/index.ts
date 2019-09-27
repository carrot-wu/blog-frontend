import InterceptorManager from "../utils/InterceptorManager"

export type Methods =
  'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'option'
  | 'OPTION'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

export interface AxiosConfig {
  url?: string,
  method?: Methods,
  params?: any,
  data?: any,
  headers?: any,
  timeout?: number,
  responseType?: XMLHttpRequestResponseType,
  transformRequest?: AxiosTransform | AxiosTransform[],
  transformResponse?: AxiosTransform | AxiosTransform[],
  cancelToken?: CancelToken,
  withCredentials?: boolean,
  onDownloadProgress?: (event: ProgressEvent) => void,
  onUploadProgress?: (event: ProgressEvent) => void,

  [propName: string]: any
}

// 在request的过程中我们可以传一个泛型T来约束返回值data
// 泛型T从 Axios类 - AxiosPromise -AxiosResponse 逐级传递
// 默认any
export interface AxiosResponse<T = any> {
  data: T,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosConfig,
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosError extends Error {
  config: AxiosConfig,
  code?: string | null,
  isAxiosError: boolean,
  request: any,
  response: AxiosResponse
}

export interface Axios {
  Interceptors?: {
    request: InterceptorManager<AxiosConfig>,
    response: InterceptorManager<AxiosResponse>
  }
  defaults: AxiosConfig

  request<T = any>(config: AxiosConfig): AxiosPromise<T>,

  get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>,

  delete<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>,

  option<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>,

  post<T = any>(url: string, data: any, config?: AxiosConfig): AxiosPromise<T>,
  getUri(config:AxiosConfig): string
}

// 用接口表示函数
// 用继承 那么这个接口表示不仅仅是函数 而且还有上面Axios接口的属性
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosConfig): AxiosPromise<T>
}

export interface AixosStaic extends AxiosInstance {
  create(config?: AxiosConfig): AxiosInstance,

  // axios实例取消请求属性
  CancelToken: CancelTokenStatic,
  Cancel: CancelStatic,

  isCancel(value: any): boolean,
  // all是一个泛型 接受一个数组 数组类型为传入的泛型或者泛型promise
  // 返回值也是一个promise 不过promise resolve的值是泛型数组
  // 类似于promise.all<string>([promise<string>, promise<string>]) => promise <string[]>
  all<T>(promises: (T | Promise<T>)[]): Promise<T[]>,
  spread<T,U>(callback:(...args: T[]) => U): (arr: T[]) => U,
  Axios: AxiosClassStatic
}

export interface AxiosClassStatic {
  new(config: AxiosConfig): Axios
}
// 对象合并
export function extend<T, F>(to: T, from: F): T & F {
  for (const key in from) {
    (to as T & F)[key] = from[key] as any
  }
  return (to as T & F)
}

/**
 * axios拦截器的管理类
 * T 泛型 能够处理 request 或者 response两种类型
 */
export interface AxiosInterceptorManager<T> {
  // 拦截器两种方法 一种是use 加入拦截方法
  // 其中resolve 其实成功回调方法
  // 返回值为拦截器id 用于下面的eject方法用于接触拦截
  use(resolveFn: ResolveFn<T>, rejectFn?: RejectFn): number,

  eject(id: number): void
}

// resolve函数接口
// 接受config泛型 然后返回config 或者promise config
export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface AxiosTransform {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>,
  reason?: Cancel,

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken,
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken,

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}
