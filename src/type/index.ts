export interface IResponseConfig<T = any> {
  resultCode: number;
  resultMsg: string;
  status: number;
  data: T;
}

// 获取函数的参数类型
export type ReturnParamsType<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : any;

// 剔除接口中的符合的类型
