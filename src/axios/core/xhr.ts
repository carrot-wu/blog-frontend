import {AxiosConfig, AxiosPromise, AxiosResponse} from "../type"
import {parseHeaders} from "../utils/processHeaders"
import {createError} from "../utils/error"

export default function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      onDownloadProgress,
      onUploadProgress
    } = config
    const xhrRequest = new XMLHttpRequest()
    responseType && (xhrRequest.responseType = responseType)
    timeout && (xhrRequest.timeout = timeout)
    if (withCredentials) {
      xhrRequest.withCredentials = withCredentials
    }
    if(onDownloadProgress) {
      xhrRequest.onprogress = onDownloadProgress
    }
    if(onUploadProgress) {
      xhrRequest.upload.onprogress = onUploadProgress
    }

    xhrRequest.open(method.toUpperCase(), url!)
    xhrRequest.onreadystatechange = function handleLoad(): void {
      if (xhrRequest.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(xhrRequest.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhrRequest.responseText : xhrRequest.response
      const {status, statusText} = xhrRequest
      const axiosResponse: AxiosResponse = {
        data: responseData,
        headers: responseHeaders,
        status,
        statusText,
        config,
        request: xhrRequest
      }
      if (status >= 200 && status < 300) {
        resolve(axiosResponse)
      } else {
        reject(createError({
          message: `Request fail with status code ${status}`,
          config,
          request: xhrRequest,
          response: responseData
        }))
      }
    }
    xhrRequest.onerror = function handleError(): void {
      reject(createError({
        message: `Network Error`,
        config,
        request: xhrRequest,
      }))
    }
    xhrRequest.ontimeout = function handleTimeout(): void {
      reject(createError({
        message: `Timeout of ${timeout} ms`,
        config,
        request: xhrRequest,
        code: 'TIMEOUT'
      }))
    }

    Object.keys(headers).forEach(header => {
      if (data === null && header.toLowerCase() === 'content-type') {
        delete headers[header]
      } else {
        xhrRequest.setRequestHeader(header, headers[header])
      }
    })
    // 在send 之前 如果用户填写了cancelToKEN 并且调用了传入的resolve方法 那么会触发下面的then方法
    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        xhrRequest.abort()
        reject(reason)
      })
    }

    xhrRequest.send(data)

  })
}
