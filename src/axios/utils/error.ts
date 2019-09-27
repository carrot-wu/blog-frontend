import {AxiosConfig, AxiosResponse} from "../type"

interface AxiosErrorInterface {
  message: string,
  config: AxiosConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(errorObj : AxiosErrorInterface) {
    const { message, config, code, request, response} = errorObj
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(errorObj : AxiosErrorInterface): AxiosError {
  return new AxiosError(errorObj)
}
