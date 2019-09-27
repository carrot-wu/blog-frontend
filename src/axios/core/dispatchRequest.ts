import {AxiosConfig, AxiosPromise, AxiosResponse} from "../type"
import xhr from './xhr'
import {bulidURL} from '../utils/urlHelper'
import {flattenHeaders} from "../utils/headers"
import transform from "./transform"

function dispatchRequest(config: AxiosConfig): AxiosPromise {
  ifCancelTokenHasBeenUsed(config)
  processConfig(config)
  return xhr(config).then(response => transformResponseData(response))
}

function processConfig(config: AxiosConfig): void {
  const {
    data,
    headers,
    transformRequest,
    method
  } = config
  config.url = transformUrl(config)
  config.data = transform(data, headers, transformRequest)
  config.headers = flattenHeaders(headers, method!)
}

export function transformUrl(config: AxiosConfig): string {
  const {url, params} = config
  // 为了扩展 get request方法 所以axiosConfig为可选 但是在处理请求时时一定有的 所以直接断言
  // 断言有的话直接 url!
  return bulidURL((url! as string), params)
}

function transformResponseData(response: AxiosResponse): AxiosResponse {
  const {data, headers, config} = response
  response.data = transform(data, headers, config.transformResponse)
  return response
}

function ifCancelTokenHasBeenUsed(config: AxiosConfig) {
  if(config.cancelToken){
    config.cancelToken.throwIfRequested()
  }
}
export default dispatchRequest
