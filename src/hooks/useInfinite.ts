import { useState, useCallback } from "react";
export interface LoadFnParams<T = any> {
  pageNum: number;
  pageSize: number;
}
// 列表接口返回的数据
export interface FnRes<T = any> {
  // 下一页
  nextPage?: number;
  // 总页数
  totalPage: number;
  list: T[];
  [propName: string]: any;
}
// return出去的加载函数类型
export interface LoadFnInterface<T = any> {
  (params: LoadFnParams<T>): Promise<FnRes<T>>;
}
// 默认数据接口
interface OptionsInterface {
  // 一页多少个
  pageSize?: number;
  defaultPage?: number;
}
// 返回出去的数据接口
interface InfiniteRes<T> {
  load: () => void;
  loading: boolean;
  hasMore: boolean;
  list: T[];
  error: Error | null;
  clear: () => void;
}
export default function useInfinite<T = any>(
  loadFn: LoadFnInterface<T>,
  options: OptionsInterface = {}
): InfiniteRes<T> {
  const { pageSize = 10, defaultPage = 1 } = options;
  // loadFn 是一个异步函数 最终返回的res 包含 {data, pageNo, totalPage}
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(defaultPage);
  const [dataList, setDataList] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const initLoad = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await loadFn({ pageNum, pageSize });
      let { nextPage, totalPage, list } = result;
      setDataList(dataList.concat(list));
      nextPage = nextPage || (pageNum + 1)
      setPageNum(nextPage);
      if (nextPage > totalPage) {
        setHasMore(false);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [loadFn, pageNum, pageSize, dataList]);

  const clear = useCallback(() => {
    setLoading(false);
    setPageNum(defaultPage);
    setDataList([]);
    setHasMore(true);
    setError(null);
  }, [defaultPage]);

  return {
    load: initLoad,
    loading,
    hasMore,
    list:dataList,
    error,
    clear
  };
}
