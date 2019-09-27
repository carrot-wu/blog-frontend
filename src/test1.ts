import axios from './axios'
import {AxiosConfig} from "./axios/type"
const config: AxiosConfig = {url: 'dd', method: 'get'}

interface Result {
  message: string,
  code: number
}
function test(): void {
  axios.request<Result>(config)
}
export default test
