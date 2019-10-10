
export interface IResponseConfig<T = any> {
  resultCode: number
  resultMsg: string
  status: number
  resultData: T
}
