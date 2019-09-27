// 定义默认配置对象
import {AxiosConfig} from "./type"
import processHeaders from "./utils/processHeaders"
import handleData, {parseData} from "./utils/processData"

const defaults: AxiosConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    // 一开始对data和headers做处理 所以原先方法dispatchRequest对headers和data的处理放到这里来
    function(data: any, headers?: any): any{
      processHeaders(data, headers)
      return handleData(data)
    }
  ],
  // 同理最开始也要对response进行默认处理
  transformResponse: [
    function(data: any): any{
      return parseData(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
