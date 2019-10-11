import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError
} from 'axios'

import { IResponseConfig } from 'types'
interface IResErrorConfig {
  status: number
  message: string
  errorCode: number
  requestUrl: string
}

interface IOptsInterceptors {
  resHandler?: (res: AxiosResponse<IResponseConfig>) => AxiosResponse<IResponseConfig> | Promise<AxiosResponse<IResponseConfig>>
  errHandler?: (error: AxiosError) => Promise<ResError>
}

interface IRequestOpts {
  defaults?: AxiosRequestConfig
  interceptors?: IOptsInterceptors
}

/**
 * 封装请求响应 Error
 */
export class ResError extends Error {
  public status: number
  public errorCode: number
  public requestUrl: string

  public constructor(resErrorConfig: IResErrorConfig) {
    const {status, message, errorCode, requestUrl} = resErrorConfig
    super(message)
    this.status = status
    this.errorCode = errorCode
    this.requestUrl = requestUrl
  }
}

/**
 * 封装 axios, 对外提供统一的 http 请求工具
 * 支持 get, post, put, patch, delete
 */
export default class Request {
  public instance: AxiosInstance

  /**
   * create a request instance
   *
   * @param {Object} options
   * @param {Object} options.defaults axios的默认设置
   * @param {Object} options.interceptors 拦截器设置
   */
  constructor({defaults = {}, interceptors = {}}: IRequestOpts) {

    const instance = (this.instance = axios.create({
      ...defaults,
      timeout: 50000
    }))

    instance.interceptors.request.use(cfg => cfg, err => Promise.reject(err))

    function resErrorFn(err: AxiosError): Promise<ResError> {
      const {response, message, request} = err
      const errorParams = response ? {
        status: response.status,
        message,
        errorCode: response.status,
        requestUrl: request.url
      } : {
        status: 1000,
        message : '网络错误',
        errorCode: 1000,
        requestUrl: request.url
      }
      return Promise.reject(
        new ResError(errorParams)
      )
    }

    instance.interceptors.response.use(
      interceptors.resHandler || (res => res),
      interceptors.errHandler || resErrorFn
    )
  }

  head<T>(url: string) {
    return this.instance.head<T>(url)
  }

  get<T>(url: string, params: object = {}, config: AxiosRequestConfig = {}) {
    return this.instance.get<IResponseConfig<T>>(url, { ...config, params})
  }

  delete(url: string) {
    return this.instance.delete(url)
  }

  post(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config)
  }

  put(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config)
  }

  patch(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.patch(url, data, config)
  }
}
