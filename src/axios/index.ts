import {AxiosConfig, AixosStaic, extend} from "./type"
import Axios from "./core/Axios"
import defaults from "./default"
import mergeConfig from "./core/mergeConfig";
import Cancel, {isCancel} from "./cancel/Cancel";
import CancelToken from "./cancel/CancelToken";

function createInstance(config: AxiosConfig): AixosStaic {
  const axiosInstance = new Axios(config)
  // 获取request方法 同时制定实例的this对象
  const instance = Axios.prototype.request.bind(axiosInstance)
  extend(instance, axiosInstance)
  return instance as AixosStaic
}

const axios = createInstance(defaults)
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}
axios.isCancel = isCancel
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.all = function (promises) {
  return Promise.all(promises)
}
axios.spread = function (callback) {
  return function(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
export default axios
