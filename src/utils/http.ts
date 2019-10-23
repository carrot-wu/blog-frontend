import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError
} from 'axios'
import { IResponseConfig } from '@/type'

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

interface ICodeMessage {
  [index: number]: string
}
const codeMessage:ICodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 封装请求响应 Error
 */
export class ResError extends Error {
  public status: number

  public errorCode: number

  public requestUrl: string

  public constructor(resErrorConfig: IResErrorConfig) {
    const { status, message, errorCode, requestUrl } = resErrorConfig
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
export default class Http {
  public instance: AxiosInstance

  /**
   * create a request instance
   *
   * @param {Object} options
   * @param {Object} options.defaults axios的默认设置
   * @param {Object} options.interceptors 拦截器设置
   */
  constructor({ defaults = {}, interceptors = {} }: IRequestOpts) {
    // eslint-disable-next-line no-multi-assign
    const instance = (this.instance = axios.create({
      ...defaults,
      timeout: 50000,
    }));
    instance.interceptors.request.use(cfg => cfg, err => Promise.reject(err))

    /**
     * 请求失败拦截器 检验是什么类型的错误 网络错误或者自定义错误
     * @param {AxiosError} err
     * @returns {Promise<ResError>}
     */
    function resErrorFn(err: AxiosError): Promise<ResError> {
      const { response, request } = err;
      let errorParams: IResErrorConfig = {
        status: 1000,
        message: '网络错误',
        errorCode: 1000,
        requestUrl: request.url,
      };
      if (response) {
        const { data = {}, status } = response
        const { resultMsg } = data
        const errorText = resultMsg || codeMessage[status] || response.statusText;
        errorParams = {
          status,
          message: errorText,
          errorCode: status,
          requestUrl: request.url,
        }
      } else {
        errorParams = {
          status: 9999,
          message: '网络错误',
          errorCode: 9999,
          requestUrl: request.url,
        }
      }
      return Promise.reject(
        new ResError(errorParams),
      )
    }

    instance.interceptors.response.use(
      interceptors.resHandler || (res => res),
      interceptors.errHandler || resErrorFn,
    )
  }

  head<T>(url: string) {
    return this.instance.head<T>(url)
  }

  async get<T>(url: string, params: object = {}, config: AxiosRequestConfig = {}) {
    const res = await this.instance.get<IResponseConfig<T>>(url, { ...config, params })
    return res.data
  }

  delete<T>(url: string) {
    return this.instance.delete<T>(url)
  }

  async post<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    const res = await this.instance.post<IResponseConfig<T>>(url, data, config)
    return res.data
  }

  put<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config)
  }

  patch<T>(url: string, data?: object, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config)
  }
}
